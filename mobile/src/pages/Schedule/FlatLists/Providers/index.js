import React from 'react';
import {
  ProviderFlat,
  ProviderText,
  ProviderItem,
  ProviderImage,
} from '~/pages/Schedule/style';
import {BASE_URL} from '@env';

export default function Providers({providers, selectedId, setSelectedId}) {
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#ff9000' : '#3e3b47';
    return (
      <ProviderItem
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}>
        <ProviderImage
          source={{
            uri: `http://192.168.0.10:3000/images/avatar/${item.avatar.path}`,
          }}
        />
        <ProviderText>{item.name}</ProviderText>
      </ProviderItem>
    );
  };

  return (
    <ProviderFlat
      data={providers}
      horizontal
      keyExtractor={item => item.id}
      extraData={selectedId}
      renderItem={renderItem}
    />
  );
}
