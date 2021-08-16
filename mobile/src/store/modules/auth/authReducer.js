const initialState = {
  user: {},
  token: '',
  loading: false,
  isLogin: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST':
      return {
        loading: true,
        ...state,
      };
    case '@auth/SIGN_IN_SUCCESS':
      return {
        ...state,
        token: action.payload.user.token,
        user: action.payload,
        isLogin: true,
      };
    case '@auth/UPDATE_IN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case '@auth/SIGN_IN_FAILED':
      return {
        ...state,
        isLogin: false,
      };
    case '@auth/SIGN_OUT':
      return {
        token: '',
        user: {},
        isLogin: false,
      };
    default:
      return state;
  }
}
