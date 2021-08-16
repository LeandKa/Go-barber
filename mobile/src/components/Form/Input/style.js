import styled from 'styled-components/native';

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  background: #232129;
  border-radius: 10px;
  width: 80%;
  border: ${props => props.error || '2px solid #ff9000'};
`;

export const TextInput = styled.TextInput`
  width: 80%;
  font-size: 20px;
  color: #666360;
  border: none;
`;

export const TextErro = styled.Text`
  color: red;
  font-size: 20px;
`;
