
// // import {cert, getApps} from "firebase-admin/app";
// // import { initializeApp } from "firebase/app";


// // const initFirebaseAdmin = () => {

// //     const apps = getApps();

// //     if (!apps.length) {
// //         initializeApp({
// //             credential: cert({
// //                 projectId: process.env.FIREBASE_PROJECT_ID,
// //                 clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
// //                 privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
// //             })
// //         }) 
// //     }


// //     return{
// //         auth : getAuth()c
// //     }
// // }
// // export default initFirebaseAdmin;


// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";

// // Initialize Firebase Admin SDK
// function initFirebaseAdmin() {
//   const apps = getApps();

//   if (!apps.length) {
//     initializeApp({
//       credential: cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         // Replace newlines in the private key
//         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//       }),
//     });
//   }

//   return {
//     auth: getAuth(),
//     db: getFirestore(),
//   };
// }

// export const { auth, db } = initFirebaseAdmin();




// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";

// // Initialize Firebase Admin SDK
// function initFirebaseAdmin() {
//   const apps = getApps();

//   if (!apps.length) {
//     initializeApp({
//       credential: cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         // Replace newlines in the private key
//         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//         // privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//         // privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/"/g, ''),
//       }),
//     });
//   }

//   return {
//     auth: getAuth(),
//     db: getFirestore(),
//   };
// }

// export const { auth, db } = initFirebaseAdmin();




import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function initFirebaseAdmin() {
  if (!process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error("Firebase admin environment variables are not set properly.");
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();