// // "use server";

// // import { auth, db } from "@/firebase/admin";
// // import { cookies } from "next/headers";

// // // Session duration (1 week)
// // const SESSION_DURATION = 60 * 60 * 24 * 7;

// // // Set session cookie
// // export async function setSessionCookie(idToken: string) {
// //   const cookieStore = await cookies();

// //   // Create session cookie
// //   const sessionCookie = await auth.createSessionCookie(idToken, {
// //     expiresIn: SESSION_DURATION * 1000, // milliseconds
// //   });

// //   // Set cookie in the browser
// //   cookieStore.set("session", sessionCookie, {
// //     maxAge: SESSION_DURATION,
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production",
// //     path: "/",
// //     sameSite: "lax",
// //   });
// // }

// // export async function signUp(params: SignUpParams) {
// //   const { uid, name, email } = params;

// //   try {
// //     // check if user exists in db
// //     const userRecord = await db.collection("users").doc(uid).get();
// //     if (userRecord.exists)
// //       return {
// //         success: false,
// //         message: "User already exists. Please sign in.",
// //       };

// //     // save user to db
// //     await db.collection("users").doc(uid).set({
// //       name,
// //       email,
// //       // profileURL,
// //       // resumeURL,
// //     });

// //     return {
// //       success: true,
// //       message: "Account created successfully. Please sign in.",
// //     };
// //   } catch (error: any) {
// //     console.error("Error creating user:", error);

// //     // Handle Firebase specific errors
// //     if (error.code === "auth/email-already-exists") {
// //       return {
// //         success: false,
// //         message: "This email is already in use",
// //       };
// //     }

// //     return {
// //       success: false,
// //       message: "Failed to create account. Please try again.",
// //     };
// //   }
// // }

// // export async function signIn(params: SignInParams) {
// //   const { email, idToken } = params;

// //   try {
// //     const userRecord = await auth.getUserByEmail(email);
// //     if (!userRecord)
// //       return {
// //         success: false,
// //         message: "User does not exist. Create an account.",
// //       };

// //     await setSessionCookie(idToken);
// //   } catch (error: any) {
// //     console.log("");

// //     return {
// //       success: false,
// //       message: "Failed to log into account. Please try again.",
// //     };
// //   }
// // }

// // // Sign out user by clearing the session cookie
// // export async function signOut() {
// //   const cookieStore = await cookies();

// //   cookieStore.delete("session");
// // }

// // // Get current user from session cookie
// // export async function getCurrentUser(): Promise<User | null> {
// //   const cookieStore = await cookies();

// //   const sessionCookie = cookieStore.get("session")?.value;
// //   if (!sessionCookie) return null;

// //   try {
// //     const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

// //     // get user info from db
// //     const userRecord = await db
// //       .collection("users")
// //       .doc(decodedClaims.uid)
// //       .get();
// //     if (!userRecord.exists) return null;

// //     return {
// //       ...userRecord.data(),
// //       id: userRecord.id,
// //     } as User;
// //   } catch (error) {
// //     console.log(error);

// //     // Invalid or expired session
// //     return null;
// //   }
// // }

// // // Check if user is authenticated
// // export async function isAuthenticated() {
// //   const user = await getCurrentUser();
// //   return !!user;
// // }
// // export async function getInterviewsByUserId(user:string): Promise<Interview[] | null>{
// //   const interviews = await db
// //   .collection('interviews')
// //   .where('userId', '==',user)
// //   .orderBy('createdAt','desc')
// //   .get();
// //   return interviews.docs.map((doc) => ({
// //     id:doc.id, 
// //     ...doc.data()
// //   }))as Interview[];
// // }

// // chatgpt version
// "use server";

// import { auth, db } from "@/firebase/admin";
// import { cookies } from "next/headers";

// /* ---------------- SESSION CONFIG ---------------- */

// const SESSION_DURATION = 60 * 60 * 24 * 7; // 1 week

// /* ---------------- SET SESSION COOKIE ---------------- */

// export async function setSessionCookie(idToken: string) {
// const cookieStore = await cookies();

// const sessionCookie = await auth.createSessionCookie(idToken, {
// expiresIn: SESSION_DURATION * 1000,
// });

// cookieStore.set("session", sessionCookie, {
// maxAge: SESSION_DURATION,
// httpOnly: true,
// secure: process.env.NODE_ENV === "production",
// path: "/",
// sameSite: "lax",
// });
// }

// /* ---------------- SIGN UP ---------------- */

// export async function signUp(params: SignUpParams) {
// const { uid, name, email } = params;

// try {
// const userRecord = await db.collection("users").doc(uid).get();

// if (userRecord.exists) {
//   return {
//     success: false,
//     message: "User already exists. Please sign in.",
//   };
// }

// await db.collection("users").doc(uid).set({
//   name,
//   email,
//   createdAt: new Date().toISOString(),
// });

// return {
//   success: true,
//   message: "Account created successfully. Please sign in.",
// };


// } catch (error: any) {
// console.error("Error creating user:", error);


// if (error.code === "auth/email-already-exists") {
//   return {
//     success: false,
//     message: "This email is already in use",
//   };
// }

// return {
//   success: false,
//   message: "Failed to create account. Please try again.",
// };


// }
// }

// /* ---------------- SIGN IN ---------------- */

// export async function signIn(params: SignInParams) {
// const { email, idToken } = params;

// try {
// const userRecord = await auth.getUserByEmail(email);


// if (!userRecord) {
//   return {
//     success: false,
//     message: "User does not exist. Please create an account.",
//   };
// }

// await setSessionCookie(idToken);

// return {
//   success: true,
//   message: "Login successful",
// };


// } catch (error) {
// console.error("Sign in error:", error);

// return {
//   success: false,
//   message: "Failed to log into account. Please try again.",
// };


// }
// }

// /* ---------------- SIGN OUT ---------------- */

// export async function signOut() {
// const cookieStore = await cookies();

// cookieStore.delete("session");

// return {
// success: true,
// message: "Logged out successfully",
// };
// }

// /* ---------------- GET CURRENT USER ---------------- */

// export async function getCurrentUser(): Promise<User | null> {
// const cookieStore = await cookies();
// const sessionCookie = cookieStore.get("session")?.value;

// if (!sessionCookie) return null;

// try {
// const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);


// const userRecord = await db
//   .collection("users")
//   .doc(decodedClaims.uid)
//   .get();

// if (!userRecord.exists) return null;

// return {
//   id: userRecord.id,
//   ...userRecord.data(),
// } as User;


// } catch (error) {
// console.error("Session verification failed:", error);
// return null;
// }
// }

// /* ---------------- CHECK AUTH ---------------- */

// export async function isAuthenticated() {
// const user = await getCurrentUser();
// return !!user;
// }


"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: unknown) {
    // ✅ FIX 1: Replaced `error: any` with `error: unknown` for type safety,
    // then narrowed the type before accessing .code property
    console.error("Error creating user:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "auth/email-already-exists"
    ) {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    // ✅ FIX 2: `auth.getUserByEmail` throws if user not found — it never returns null.
    // The original null check was unreachable and misleading.
    // The correct pattern is to let the catch block handle the not-found case.
    // However, we keep a guard here for extra safety using optional chaining.
    if (!userRecord?.uid)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCookie(idToken);

    // ✅ FIX 3: `signIn` had no return statement on the success path.
    // Callers expecting { success, message } would get `undefined` on success.
    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error: unknown) {
    // ✅ FIX 4: Replaced `error: any` with `error: unknown` for type safety
    // ✅ FIX 5: `console.log("")` was logging an empty string — replaced with actual error
    console.error("Error signing in:", error);

    // ✅ FIX 6: Handle specific Firebase error for user not found
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "auth/user-not-found"
    ) {
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };
    }

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    // ✅ FIX 7: `console.log(error)` on an expired/invalid session is noisy and 
    // misleading in production logs. This is an expected case, not a real error.
    // Use a silent return or a debug-level log instead.
    if (process.env.NODE_ENV === "development") {
      console.log("Session verification failed:", error);
    }

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}