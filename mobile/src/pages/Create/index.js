import React, {useRef} from 'react';
import * as yup from 'yup';
import Wrapper from '~/components/Layout/Wrapper';
import {
  Container,
  EmailIcon,
  Logo,
  PassIcon,
  TitlePage,
  Button,
  ButtonText,
  LinkContainer,
  ExitIcon,
  LinkText,
} from './styles';

import logoPng from '~/assets/logo.png';
import Input from '~/components/Form/Input';
import api from '~/services/api';

export default function Create({navigation}) {
  const formRef = useRef(null);

  async function onSubmit(data) {
    try {
      const schema = yup.object({
        name: yup
          .string()
          .required('Um nome e necessario')
          .min(3, 'Minino de 3 caracteres'),
        email: yup
          .string()
          .required('Email obrigatorio')
          .email('Digite um email valido'),
        password: yup
          .string()
          .min(6, 'Minino de 6 caracteres')
          .required('Senha e obrigartoria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);
      const response = await api.post('/user', {
        name: data.name,
        email: data.email,
      });
      if (response) {
        alert(`Usuario - ${response.data.name} criado com sucesso`);
      }
    } catch (error) {
      const validationErrors = {};
      if (error.response) {
        alert(`❌${error.response.data}`);
      }
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  const onPress = () => {
    navigation.navigate('Session');
  };

  return (
    <Wrapper>
      <Container ref={formRef} onSubmit={onSubmit}>
        <Logo source={logoPng} />
        <TitlePage>Crie a sua conta</TitlePage>
        <Input name="name" secure={false} text={'Nome'}>
          <EmailIcon />
        </Input>
        <Input name="email" secure={false} text={'Email'}>
          <EmailIcon />
        </Input>
        <Input name="password" secure={true} text={'Password'}>
          <PassIcon />
        </Input>
        <Button onPress={() => formRef.current.submitForm()}>
          <ButtonText>Entrar</ButtonText>
        </Button>

        <LinkContainer onPress={onPress}>
          <ExitIcon name="md-exit-outline" />
          <LinkText> Voltar para o login</LinkText>
        </LinkContainer>
      </Container>
    </Wrapper>
  );
}
