import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIo from 'react-native-vector-icons/Ionicons';
import {Form} from '@unform/mobile';

export const Container = styled(Form)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.Image`
  height: 150px;
  width: 250px;
`;

export const TitlePage = styled.Text`
  font-size: 30px;
  color: white;
  margin-top: 40px;
  margin-bottom: 10px;
`;

export const EmailIcon = styled(Icon)`
  font-size: 5px;
  color: #ff9000;
  margin-left: 20px;
  margin-right: 20px;
`;
export const PassIcon = styled(Icon)`
  font-size: 25px;
  color: #ff9000;
  margin-left: 20px;
  margin-right: 20px;
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

export const ChangeLink = styled.Text`
  color: white;
  font-size: 20px;
  margin-top: 20px;
`;

export const LinkContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const ExitIcon = styled(IconIo)`
  font-size: 25px;
  color: #ff9000;
  margin-left: 20px;
  margin-right: 5px;
`;

export const LinkText = styled.Text`
  color: #ff9000;
`;
