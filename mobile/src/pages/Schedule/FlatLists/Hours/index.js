import React from 'react';
import {HourItem, ProviderText, ProviderFlat} from '../../style';

export default function Hours({hoursAvailable, setSelectHour, selectHour}) {
  const renderItem = ({item}) => {
    const backgroundColor = item.value === selectHour ? '#ff9000' : '#3e3b47';
    const opacity = !item.valie ? 0.1 : 1;
    return (
      <HourItem
        disabled={!item.valie}
        opacity={opacity}
        backgroundColor={backgroundColor}
        onPress={() => setSelectHour(item.value)}>
        <ProviderText>{item.time}</ProviderText>
      </HourItem>
    );
  };

  return (
    <ProviderFlat
      horizontal
      data={hoursAvailable}
      keyExtractor={item => item.time}
      renderItem={renderItem}
    />
  );
}
