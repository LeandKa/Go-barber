import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '~/components/Layout/Header';
import Wrapper from '~/components/Layout/Wrapper';
import api from '~/services/api';
import {BASE_URL} from '@env';
import {
  Provider,
  ProviderImage,
  Title,
  TextProvider,
  ProviderDetails,
  ProviderInfo,
  InfoIcon,
  InfoText,
  ProviderFlat,
} from './styles';

export default function Home({navigation}) {
  const [providers, setProviders] = useState([]);
  const {user, token} = useSelector(state => state.auth);

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
        console.log(error);
      }
    }

    getProviders();
  }, []);

  return (
    <Wrapper>
      <Header
        name={user.user.name}
        avatar={user.user.avatar.path}
        navigation={navigation}
      />
      <Title>Provedores</Title>
      <ProviderFlat
        data={providers}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Provider
              onPress={() =>
                navigation.navigate('Schedule', {
                  id: item.id,
                })
              }>
              <ProviderImage
                source={{
                  uri: `http://192.168.0.10:3000/images/avatar/${item.avatar.path}`,
                }}
              />
              <ProviderDetails>
                <TextProvider>{item.name}</TextProvider>
                <ProviderInfo>
                  <InfoIcon name="calendar-o" />
                  <InfoText>Segunda a Sexta</InfoText>
                </ProviderInfo>
                <ProviderInfo>
                  <InfoIcon name="clock-o" />
                  <InfoText>8am to 6pm</InfoText>
                </ProviderInfo>
              </ProviderDetails>
            </Provider>
          );
        }}
      />
    </Wrapper>
  );
}
