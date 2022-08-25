import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6t6ynvUKlcjj01xLzeLYpsebGOHAct00",
    authDomain: "mytrades-98dbf.firebaseapp.com",
    projectId: "mytrades-98dbf",
    storageBucket: "mytrades-98dbf.appspot.com",
    messagingSenderId: "976987622991",
    appId: "1:976987622991:web:ec36133e89d8e68a5e643a"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db;