
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // appId: "1:455339459152:web:940c4749fbe1fea5820755",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,

  // apiKey: "AIzaSyBf8eUDI85DKtPniYHN-fWdFKwB6YUJClk",
  // authDomain: "mockai-c99bc.firebaseapp.com",
  // projectId: "mockai-c99bc",
  // storageBucket: "mockai-c99bc.firebasestorage.app",
  // messagingSenderId: "455339459152",
  // appId: "1:455339459152:web:30e2d94f4d760f11820755",
  // measurementId: "G-QE7GD01VQ2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);









// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAr3c-dLaM72I0Msf4FUp0x6gBm-StmGgQ",
//   authDomain: "mockai-c99bc.firebaseapp.com",
//   projectId: "mockai-c99bc",
//   storageBucket: "mockai-c99bc.firebasestorage.app",
//   messagingSenderId: "455339459152",
//   appId: "1:455339459152:web:940c4749fbe1fea5820755",
//   measurementId: "G-HZ54BB6W0G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



// // Import the functions you need from the SDKs you need
// import { getApp, getApps, initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // const analytics = getAnalytics(app);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// import { initializeApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// export const auth = getAuth(app);
// export const db = getFirestore(app);