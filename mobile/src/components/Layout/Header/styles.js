import styled from 'styled-components/native';

export const Container = styled.View`
  background: #232129;
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderViewTitle = styled.View`
  color: white;
`;
export const HeaderTitle = styled.Text`
  color: #999591;
  font-size: 20px;
`;

export const HeaderName = styled.Text`
  color: #ff9000;
  font-size: 20px;
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
