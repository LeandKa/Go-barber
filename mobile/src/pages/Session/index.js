import React, {useEffect, useRef} from 'react';
import Wrapper from '~/components/Layout/Wrapper';
import {
  Container,
  EmailIcon,
  Logo,
  PassIcon,
  TitlePage,
  Button,
  ButtonText,
  ChangeLink,
  LinkContainer,
  ExitIcon,
  LinkText,
} from './styles';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import logoPng from '~/assets/logo.png';
import Input from '~/components/Form/Input';
import {getSession} from '~/store/modules/auth/authAction';

export default function Session({navigation}) {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.auth);

  async function onSubmit(data) {
    try {
      const schema = yup.object({
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
      dispatch(getSession(data));
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

  useEffect(() => {
    if (isLogin) {
      navigation.navigate('Home');
    }
  }, [isLogin]);

  return (
    <Wrapper>
      <Container ref={formRef} onSubmit={onSubmit}>
        <Logo source={logoPng} />
        <TitlePage>Faça seu Logon</TitlePage>
        <Input name="email" secure={false} text={'Email'}>
          <EmailIcon />
        </Input>
        <Input name="password" secure={true} text={'Password'}>
          <PassIcon />
        </Input>
        <Button onPress={() => formRef.current.submitForm()}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <ChangeLink onPress={() => navigation.navigate('Forget')}>
          Esqueci minha senha
        </ChangeLink>

        <LinkContainer onPress={() => navigation.navigate('Create')}>
          <ExitIcon name="md-exit-outline" />
          <LinkText> Criar conta</LinkText>
        </LinkContainer>
      </Container>
    </Wrapper>
  );
}
