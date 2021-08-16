import React, {useEffect} from 'react';
import {
  Container,
  HeaderTitle,
  HeaderViewTitle,
  HeaderName,
  HeaderImage,
  HeaderTouchImage,
} from './styles';
import {BASE_URL} from '@env';

export default function Header({name, avatar, navigation}) {
  return (
    <Container>
      <HeaderViewTitle>
        <HeaderTitle>Bem vindo,</HeaderTitle>
        <HeaderName>{name}</HeaderName>
      </HeaderViewTitle>
      <HeaderTouchImage onPress={() => navigation.navigate('Perfil')}>
        <HeaderImage
          source={{
            uri: `http://192.168.0.10:3000/images/avatar/${avatar}`,
          }}
        />
      </HeaderTouchImage>
    </Container>
  );
}
