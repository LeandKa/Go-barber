import format from 'date-fns/format';
import React, {useEffect, useState} from 'react';
import {ptBR} from 'date-fns/locale';
import Wrapper from '~/components/Layout/Wrapper';
import {
  CheckIcon,
  Container,
  Schedule,
  Title,
  Button,
  ButtonText,
} from './style';

export default function Confirm({route, navigation}) {
  const {data} = route.params;

  return (
    <Wrapper>
      <Container>
        <CheckIcon name="check" />
        <Title>Agendamento Feito </Title>
        <Schedule>
          {format(new Date(data.data), 'PPPP', {locale: ptBR})}
        </Schedule>
        <Button onPress={() => navigation.navigate('Home')}>
          <ButtonText>Ok</ButtonText>
        </Button>
      </Container>
    </Wrapper>
  );
}
