import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

export const View = styled.View`
  flex: 1;
`;

export const Image = styled.Image`
  border-radius: 90px;
  background: white;
  width: 190px;
  height: 190px;
  align-self: center;
`;

export const IconContainer = styled.Text`
  background: #ff9000;
  position: relative;
  top: -30px;
  left: 130px;
  padding: 10px;
  width: 44px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const Input = styled(Icon)`
  font-size: 20px;
  margin-left: 10px;
  color: black;
`;
