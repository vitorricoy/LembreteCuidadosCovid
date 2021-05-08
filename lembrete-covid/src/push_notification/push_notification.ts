import firebase from 'firebase/app';
import '@firebase/messaging';
const { PROJECT_ID, AUTH_DOMAIN, API_KEY, STORAGE_BUCKET, APP_ID, MEASUREMENT_ID } = process.env;

export const inicializarFirebase = () => {
    firebase.initializeApp({
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: "837796714319",
      appId: APP_ID,
      measurementId: MEASUREMENT_ID
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

