import React, {useContext, useEffect, useRef} from 'react';
import FileInput from '~/components/Form/FileInput';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import Input from '~/components/Form/Input';
import Wrapper from '~/components/Layout/Wrapper';
import {
  EmailIcon,
  Header,
  HeaderText,
  IconBack,
  NameIcon,
  PerfilButton,
  PerfilForm,
  Scroll,
  ScrollView,
  TextButton,
} from './style';
import {getSessionOut, updateSession} from '~/store/modules/auth/authAction';
import {Context} from '~/store/Context';
import api from '~/services/api';

export default function Perfil({navigation}) {
  const {uploadImage, avatar, setHasPreview} = useContext(Context);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.auth);

  useEffect(() => {
    formRef.current.setData({
      name: user.user.name,
      email: user.user.email,
    });
  }, []);

  async function onSubmit(data) {
    try {
      const schema = yup.object({
        email: yup
          .string()
          .required('Email obrigatorio')
          .email('Digite um email valido'),
        name: yup
          .string()
          .min(3, 'Minino de 3 caracteres')
          .required('Nome e obrigartorio'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await uploadImage(token);

      const avatarResponse = await uploadImage(token);

      if (avatarResponse) {
        const response = await api.put(
          `/perfil?id=${user.user.id}`,
          {
            name: data.name,
            email: data.email,
            avatar_id: avatarResponse.files.id,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (response) {
          dispatch(updateSession(response.data));
          alert('Usuario atualizado com sucesso');
        }
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
    navigation.goBack();
    setHasPreview(false);
  };

  return (
    <Wrapper>
      <ScrollView>
        <Scroll behavior="position">
          <Header>
            <IconBack onPress={onPress} name="arrow-left" />
            <HeaderText>Meu Perfil</HeaderText>
            <IconBack
              onPress={() => dispatch(getSessionOut())}
              name="power-off"
            />
          </Header>
          <PerfilForm ref={formRef} onSubmit={onSubmit}>
            <FileInput
              name="avatar_id"
              defaultValue={{
                id: user.user.avatar.id,
                url: user.user.avatar.path,
              }}
            />
            <Input name="name">
              <NameIcon />
            </Input>
            <Input name="email">
              <EmailIcon />
            </Input>

            <PerfilButton onPress={() => formRef.current.submitForm()}>
              <TextButton>Confirmar Mudanças</TextButton>
            </PerfilButton>
          </PerfilForm>
        </Scroll>
      </ScrollView>
    </Wrapper>
  );
}
