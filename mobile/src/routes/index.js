import MainNavigator from './MainNavigator';
import {useSelector} from 'react-redux';

export default function Routes() {
  const {isLogin} = useSelector(state => state.auth);

  return MainNavigator(isLogin);
}
