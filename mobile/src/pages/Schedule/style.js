import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background: #232129;
`;

export const HeaderText = styled.Text`
  color: white;
  font-size: 25px;
`;
export const IconBack = styled(Icon)`
  color: white;
  font-size: 25px;
  opacity: 0.3;
`;

export const HeaderTouchImage = styled.TouchableOpacity`
  border: 2px solid white;
  background: white;
  border-radius: 50px;
`;

export const HeaderImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 50px;
`;

export const ProviderFlat = styled.FlatList`
  flex-grow: 0;
`;

export const ProviderItem = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  padding: 10px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 5px;
  border-radius: 30px;
  background: ${props => props.backgroundColor};
`;

export const HourItem = styled.TouchableOpacity`
  height: 50px;
  padding: 10px;
  justify-content: center;
  margin-left: 15px;
  opacity: ${props => props.opacity};
  border-radius: 30px;
  background: ${props => props.backgroundColor};
`;

export const ProviderImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

export const ProviderText = styled.Text`
  color: white;
  font-size: 15px;
`;

export const CalendarText = styled.Text`
  color: white;
  padding: 30px;
  font-size: 25px;
  text-align: center;
`;

export const DateDisplay = styled.Text`
  font-size: 20px;
  text-align: center;
  color: white;
  margin-top: 20px;
`;
export const ProviderButton = styled.TouchableOpacity`
  background: #ff9000;
  width: 80%;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  margin-top: 15px;
  padding: 12px;
`;
export const TextButton = styled.Text`
  text-align: center;
  font-size: 20px;
`;
