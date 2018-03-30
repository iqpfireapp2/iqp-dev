import firebase from 'firebase';

//iqpfireapp@gmail.com
// const config = {
//   apiKey: "AIzaSyAsMT5GYJl1zIV0X7UkHx22XZf2RGrrvhY",
//   authDomain: "iqpfireapp-b047f.firebaseapp.com",
//   databaseURL: "https://iqpfireapp-b047f.firebaseio.com",
//   projectId: "iqpfireapp-b047f",
//   storageBucket: "iqpfireapp-b047f.appspot.com",
//   messagingSenderId: "858611799105"
// };

//iqpfireapp2@gmail.com
const config = {
  apiKey: "AIzaSyB_uTnr2EUZczOnTsk0CrI1lxy7MVKxrn4",
  authDomain: "iqpfireapp-faae2.firebaseapp.com",
  databaseURL: "https://iqpfireapp-faae2.firebaseio.com",
  projectId: "iqpfireapp-faae2",
  storageBucket: "iqpfireapp-faae2.appspot.com",
  messagingSenderId: "442593647530"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();