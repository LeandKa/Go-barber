export function getSession({email, password}) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, password},
  };
}

export function getSessionSuccess(user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {user},
  };
}

export function updateSession(user) {
  return {
    type: '@auth/UPDATE_IN_REQUEST',
    payload: {user},
  };
}

export function getSessionFailed(message) {
  return {
    type: '@auth/SIGN_IN_FAILED',
    payload: message,
  };
}

export function getSessionOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
