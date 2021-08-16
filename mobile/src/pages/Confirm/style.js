import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
`;

export const CheckIcon = styled(Icon)`
  font-size: 100px;
  color: green;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 30px;
`;

export const Schedule = styled.Text`
  color: #666360;
  font-size: 15px;
  flex-wrap: wrap;
  margin: 20px;
`;

export const Button = styled.TouchableOpacity`
  background: #ff9000;
  width: 80%;
  border-radius: 10px;
  margin-top: 15px;
`;

export const ButtonText = styled.Text`
  color: black;
  padding: 10px;
  text-align: center;
`;
