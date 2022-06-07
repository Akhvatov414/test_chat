import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



const firebaseConfig = {
  apiKey: "AIzaSyDh39BW_CW8dG58OT6HZc9kWqLlKZvoCEA",
  authDomain: "chat-react-akhv.firebaseapp.com",
  projectId: "chat-react-akhv",
  storageBucket: "chat-react-akhv.appspot.com",
  messagingSenderId: "642352469927",
  appId: "1:642352469927:web:2850bf7e1823faea7c0882",
  measurementId: "G-X1MHLL7E0W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Создание контекста для авторизации
export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();


ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth,
      firestore
    }}>
      <App />
    </Context.Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);
