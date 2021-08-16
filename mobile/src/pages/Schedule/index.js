import React, {useEffect, useState} from 'react';
import {Platform, Alert} from 'react-native';
import {format} from 'date-fns';
import {useSelector} from 'react-redux';
import Wrapper from '~/components/Layout/Wrapper';
import {HeaderText} from '../Perfil/style';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '~/services/api';
import {ptBR} from 'date-fns/locale';

import {
  Header,
  HeaderImage,
  IconBack,
  ProviderButton,
  TextButton,
  CalendarText,
  DateDisplay,
  HeaderTouchImage,
} from './style';
import Providers from './FlatLists/Providers';
import Hours from './FlatLists/Hours';
import {BASE_URL} from '@env';

export default function Schedule({route, navigation}) {
  const today = new Date();
  const {id} = route.params;
  const [providers, setProviders] = useState([]);
  const [hoursAvailable, setHoursAvailable] = useState([]);
  const [selectedId, setSelectedId] = useState(id);
  const [selectHour, setSelectHour] = useState('');
  const {user, token} = useSelector(state => state.auth);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(() => {
    async function getProviders() {
      try {
        const response = await api.get('/providers', {
          headers: {
            authorization: token,
          },
        });
        setProviders(response.data.user);
      } catch (error) {
        Alert.alert(error);
      }
    }
    async function getAvailableDate() {
      try {
        const response = await api.get(
          `/providers/available/${selectedId}?date=${today.getTime()}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        setHoursAvailable(response.data);
      } catch (error) {
        Alert.alert(error.response.data);
      }
    }

    getAvailableDate();

    getProviders();
  }, []);

  useEffect(() => {
    async function getAvailableDate() {
      const datas = new Date(date);
      console.log(date);
      try {
        const response = await api.get(
          `/providers/available/${selectedId}?date=${date.getTime()}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        setHoursAvailable(response.data);
      } catch (error) {
        Alert.alert(error.response.data);
      }
    }

    getAvailableDate();
  }, [selectedId]);

  useEffect(() => {
    async function getAvailableDate() {
      const datas = new Date(date);
      console.log(date);
      try {
        const response = await api.get(
          `/providers/available/${selectedId}?date=${date.getTime()}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        setHoursAvailable(response.data);
      } catch (error) {
        Alert.alert(error.response.data);
      }
    }

    getAvailableDate();
  }, [date]);

  const showMode = () => {
    setShow(!show);
  };

  const onSubmit = () => {
    async function submit() {
      try {
        const response = await api.post(
          '/appointments',
          {
            data: selectHour,
            provider_id: selectedId,
            user_id: user.user.id,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        navigation.navigate('Confirm', {
          data: response.data,
        });
      } catch (error) {
        Alert.alert(error.response.data);
      }
    }

    submit();
  };

  return (
    <Wrapper>
      <Header>
        <IconBack onPress={() => navigation.goBack()} name="arrow-left" />
        <HeaderText>Agendamento</HeaderText>
        <HeaderTouchImage onPress={() => navigation.navigate('Perfil')}>
          <HeaderImage
            source={{
              uri: `http://192.168.0.10:3000/images/avatar/${user.user.avatar.path}`,
            }}
          />
        </HeaderTouchImage>
      </Header>
      <Providers
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        providers={providers}
      />
      <CalendarText>Selecione a data</CalendarText>
      <ProviderButton onPress={showMode}>
        <TextButton>Abrir calendario</TextButton>
      </ProviderButton>
      <DateDisplay>{format(date, ' PPPP', {locale: ptBR})}</DateDisplay>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          minimumDate={new Date(today)}
          value={date}
          mode={'date'}
          themeVariant="dark"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}

      <CalendarText>Selecione um horario</CalendarText>
      <Hours
        hoursAvailable={hoursAvailable}
        selectHour={selectHour}
        setSelectHour={setSelectHour}
      />
      <ProviderButton onPress={onSubmit}>
        <TextButton>Agendar</TextButton>
      </ProviderButton>
    </Wrapper>
  );
}
