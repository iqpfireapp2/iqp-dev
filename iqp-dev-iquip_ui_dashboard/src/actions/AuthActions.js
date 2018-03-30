import firebase from '../firebase';


export const EMAIL_CHANGED = "email_changed";
export const PASSWORD_CHANGED = "password_changed";
export const USER_LOGIN_SUCCESS = "login_user_success";
export const USER_LOGIN_FAIL = "user_login_Failed";
export const USER_LOGIN = "user_login";

export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
    };
};

export const passwordChanged = (text) => {
  return {
      type: PASSWORD_CHANGED,
      payload: text
    };
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {

  dispatch({ type: USER_LOGIN });

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
    //console.log('error');
    dispatch (
      {
        type: USER_LOGIN_FAIL
      }
  );
};

const loginUserSuccess = (dispatch, user) => {
    //console.log(user);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
};
