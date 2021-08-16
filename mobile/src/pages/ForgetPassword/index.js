import React, {useRef} from 'react';
import * as yup from 'yup';
import {
  Container,
  EmailIcon,
  Logo,
  PassIcon,
  TitlePage,
  Button,
  ButtonText,
  ChangeLink,
} from './styles';
import logoPng from '~/assets/logo.png';
import Input from '~/components/Form/Input';
import Wrapper from '~/components/Layout/Wrapper';
import api from '~/services/api';

export default function ForgetPassword({navigation}) {
  const formRef = useRef(null);

  async function onSubmit(data) {
    try {
      const schema = yup.object({
        email: yup
          .string()
          .required('Email obrigatorio')
          .email('Digite um email valido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.get(`/forget?email=${data.email}`);

      if (response) {
        navigation.navigate('Password', {
          email: response.data.email,
        });
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
        <TitlePage>Digite o seu email</TitlePage>
        <Input name="email" secure={false} text={'Seu email'}>
          <EmailIcon />
        </Input>
        <Button onPress={() => formRef.current.submitForm()}>
          <ButtonText>Acessar</ButtonText>
        </Button>
        <ChangeLink onPress={onPress}>Voltar para login</ChangeLink>
      </Container>
    </Wrapper>
  );
}
