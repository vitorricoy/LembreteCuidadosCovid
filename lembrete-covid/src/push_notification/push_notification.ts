import firebase from 'firebase/app';
import '@firebase/messaging';
const { REACT_APP_PROJECT_ID, REACT_APP_AUTH_DOMAIN, REACT_APP_API_KEY, REACT_APP_STORAGE_BUCKET, REACT_APP_APP_ID, REACT_APP_MEASUREMENT_ID } = process.env;

export const inicializarFirebase = () => {
    firebase.initializeApp({
      apiKey: REACT_APP_API_KEY,
      authDomain: REACT_APP_AUTH_DOMAIN,
      projectId: REACT_APP_PROJECT_ID,
      storageBucket: REACT_APP_STORAGE_BUCKET,
      messagingSenderId: "837796714319",
      appId: REACT_APP_APP_ID,
      measurementId: REACT_APP_MEASUREMENT_ID
    });
}

export const pedirPermissaoParaReceberNotificacoes = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token do usuário:', token);
      window.localStorage.setItem("token_message", token);
      return token;
    } catch (error) {
      console.error(error);
    }
  }

