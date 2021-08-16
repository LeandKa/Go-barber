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

export default function PasswordReset({route, navigation}) {
  const formRef = useRef(null);
  const {email} = route.params;

  async function onSubmit(data) {
    try {
      const schema = yup.object({
        newPassword: yup
          .string()
          .min(6, 'Minino de 6 caracteres')
          .required('Nova senha obrigatoria'),
        confirmPassword: yup
          .string()
          .min(6, 'Minino de 6 caracteres')
          .required('Senha e obrigartoria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put(`/users?email=${email}`);

      if (response.data) {
        alert(`Senha do email-${email} trocada com sucesso`);
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
        <TitlePage>Digite a sua nova senha</TitlePage>
        <Input name="newPassword" secure={true} text={'Novo Password'}>
          <EmailIcon />
        </Input>
        <Input
          name="confirmPassword"
          secure={true}
          text={'Confirme seu Password'}>
          <PassIcon />
        </Input>
        <Button onPress={() => formRef.current.submitForm()}>
          <ButtonText>Trocar</ButtonText>
        </Button>
        <ChangeLink onPress={onPress}>Voltar para login</ChangeLink>
      </Container>
    </Wrapper>
  );
}
