import { EMAIL_CHANGED, PASSWORD_CHANGED, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN } from '../actions/actions';

const INITIAL_STATE = {email: '', password: '', user: null, error: '', loading: false, loginSuccess: ''};

export default (state = INITIAL_STATE, action) =>  {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USER_LOGIN:
    return { ...state, loading: true, error: '' };
    case USER_LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, loginSuccess: 'true', user: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    default:
      return state;
  }
}
