import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Title = styled.Text`
  color: white;
  font-size: 30px;
  padding: 20px;
`;

export const ProviderFlat = styled.FlatList`
  flex-grow: 0;
`;
export const Provider = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin: 20px;
  background: #3e3b47;
  border-radius: 10px;
`;

export const ProviderImage = styled.Image`
  height: 60px;
  width: 60px;
  margin-top: 2px;
  border-radius: 50px;
`;

export const ProviderDetails = styled.View`
  margin-left: 20px;
`;

export const ProviderInfo = styled.View`
  display: flex;
  flex-direction: row;
`;

export const InfoIcon = styled(Icon)`
  color: orange;
  margin-right: 10px;
  margin-top: 3px;
`;
export const InfoText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const TextProvider = styled.Text`
  position: relative;
  top: -10px;
  color: white;
  font-size: 20px;
`;
