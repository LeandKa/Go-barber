import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IoIcon from 'react-native-vector-icons/Ionicons';
import {Form} from '@unform/mobile';

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 50px;
  background: transparent;
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

export const NameIcon = styled(IoIcon)`
  font-size: 25px;
  color: #ff9000;
  margin-left: 20px;
  margin-right: 20px;
`;

export const EmailIcon = styled(Icon)`
  font-size: 25px;
  color: #ff9000;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ScrollView = styled.ScrollView`
  background: transparent;
`;
export const Scroll = styled.KeyboardAvoidingView`
  background: transparent;
`;

export const PerfilForm = styled(Form)`
  flex: 1;
  align-items: center;
`;

export const PerfilButton = styled.TouchableOpacity`
  background: #ff9000;
  width: 80%;
  border-radius: 10px;
  margin-top: 15px;
  padding: 12px;
`;
export const TextButton = styled.Text`
  text-align: center;
  font-size: 20px;
`;
