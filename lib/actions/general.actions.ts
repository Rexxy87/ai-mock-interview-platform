// // // "use server";

// // // import { generateObject } from "ai";
// // // import { google } from "@ai-sdk/google";

// // // import { db } from "@/firebase/admin";
// // // import { feedbackSchema } from "@/constants";

// // // export async function createFeedback(params: CreateFeedbackParams) {
// // //   const { interviewId, userId, transcript, feedbackId } = params;

// // //   try {
// // //     const formattedTranscript = transcript
// // //       .map(
// // //         (sentence: { role: string; content: string }) =>
// // //           `- ${sentence.role}: ${sentence.content}\n`
// // //       )
// // //       .join("");

// // //     const { object } = await generateObject({

// // //       model: google("gemini-2.0-flash-001"),
// // //       schema: feedbackSchema,
// // //       prompt: `
// // //         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
// // //         Transcript:
// // //         ${formattedTranscript}

// // //         Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
// // //         - **Communication Skills**: Clarity, articulation, structured responses.
// // //         - **Technical Knowledge**: Understanding of key concepts for the role.
// // //         - **Problem-Solving**: Ability to analyze problems and propose solutions.
// // //         - **Cultural & Role Fit**: Alignment with company values and job role.
// // //         - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
// // //         `,
// // //       system:
// // //         "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
// // //     });

// // //     const feedback = {
// // //       interviewId: interviewId,
// // //       userId: userId,
// // //       totalScore: object.totalScore,
// // //       categoryScores: object.categoryScores,
// // //       strengths: object.strengths,
// // //       areasForImprovement: object.areasForImprovement,
// // //       finalAssessment: object.finalAssessment,
// // //       createdAt: new Date().toISOString(),
// // //     };

// // //     let feedbackRef;

// // //     if (feedbackId) {
// // //       feedbackRef = db.collection("feedback").doc(feedbackId);
// // //     } else {
// // //       feedbackRef = db.collection("feedback").doc();
// // //     }

// // //     await feedbackRef.set(feedback);

// // //     return { success: true, feedbackId: feedbackRef.id };
// // //   } catch (error) {
// // //     console.error("Error saving feedback:", error);
// // //     return { success: false };
// // //   }
// // // }

// // // export async function getInterviewById(id: string): Promise<Interview | null> {
// // //   const interview = await db.collection("interviews").doc(id).get();

// // //   return interview.data() as Interview | null;
// // // }

// // // export async function getFeedbackByInterviewId(
// // //   params: GetFeedbackByInterviewIdParams
// // // ): Promise<Feedback | null> {
// // //   const { interviewId, userId } = params;

// // //   const querySnapshot = await db
// // //     .collection("feedback")
// // //     .where("interviewId", "==", interviewId)
// // //     .where("userId", "==", userId)
// // //     .limit(1)
// // //     .get();

// // //   if (querySnapshot.empty) return null;

// // //   const feedbackDoc = querySnapshot.docs[0];
// // //   return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
// // // }

// // // export async function getLatestInterviews(
// // //   params: GetLatestInterviewsParams
// // // ): Promise<Interview[] | null> {
// // //   const { userId, limit = 20 } = params;

// // //   const interviews = await db
// // //     .collection("interviews")
// // //     .orderBy("createdAt", "desc")
// // //     .where("finalized", "==", true)
// // //     .where("userId", "!=", userId)
// // //     .limit(limit)
// // //     .get();

// // //   return interviews.docs.map((doc) => ({
// // //     id: doc.id,
// // //     ...doc.data(),
// // //   })) as Interview[];
// // // }

// // // export async function getInterviewsByUserId(
// // //   userId: string
// // // ): Promise<Interview[] | null> {
// // //   const interviews = await db
// // //     .collection("interviews")
// // //     .where("userId", "==", userId)
// // //     .orderBy("createdAt", "desc")
// // //     .get();

// // //   return interviews.docs.map((doc) => ({
// // //     id: doc.id,
// // //     ...doc.data(),
// // //   })) as Interview[];
// // // }
// // "use server";

// // import { generateObject } from "ai";
// // import { google } from "@ai-sdk/google";

// // import { db } from "@/firebase/admin";
// // import { feedbackSchema } from "@/constants";

// // export async function createFeedback(params: CreateFeedbackParams) {
// // const { interviewId, userId, transcript, feedbackId } = params;

// // try {
// // console.log("------ FEEDBACK GENERATION STARTED ------");
// // console.log("Interview ID:", interviewId);
// // console.log("User ID:", userId);
// // console.log("Transcript length:", transcript?.length);


// // if (!transcript || transcript.length === 0) {
// //   console.log("Transcript is empty. Feedback cannot be generated.");
// //   return { success: false };
// // }

// // const formattedTranscript = transcript
// //   .map(
// //     (sentence: { role: string; content: string }) =>
// //      ` ${sentence.role}: ${sentence.content}\n`
// //   )
// //   .join("");

// // console.log("Formatted transcript:");
// // console.log(formattedTranscript);

// // const { object } = await generateObject({
// //   model: google("gemini-2.0-flash-001"),
// //   schema: feedbackSchema,
// //   prompt: `
// // You are an AI interviewer analyzing a mock interview.

// // Your task is to evaluate the candidate based on structured categories.

// // Transcript:
// // ${formattedTranscript}

// // Score the candidate from 0 to 100 in the following areas:

// // 1. Communication Skills
// // 2. Technical Knowledge
// // 3. Problem-Solving
// // 4. Cultural & Role Fit
// // 5. Confidence & Clarity

// // Be strict and highlight mistakes and improvement areas.
// // `,
// // system:
// // "You are a professional interviewer analyzing a mock interview.",
// // });


// // console.log("AI Feedback Generated:");
// // console.log(object);

// // const feedback = {
// //   interviewId: interviewId,
// //   userId: userId,
// //   totalScore: object.totalScore,
// //   categoryScores: object.categoryScores,
// //   strengths: object.strengths,
// //   areasForImprovement: object.areasForImprovement,
// //   finalAssessment: object.finalAssessment,
// //   createdAt: new Date().toISOString(),
// // };

// // console.log("Saving feedback to Firestore...");

// // let feedbackRef;

// // if (feedbackId) {
// //   feedbackRef = db.collection("feedback").doc(feedbackId);
// //   console.log("Updating existing feedback:", feedbackId);
// // } else {
// //   feedbackRef = db.collection("feedback").doc();
// //   console.log("Creating new feedback document:", feedbackRef.id);
// // }

// // await feedbackRef.set(feedback);

// // console.log("Feedback saved successfully!");
// // console.log("------ FEEDBACK GENERATION COMPLETE ------");

// // return { success: true, feedbackId: feedbackRef.id };


// // } catch (error) {
// // console.error("Error saving feedback:", error);
// // return { success: false };
// // }
// // }

// // export async function getInterviewById(id: string): Promise<Interview | null> {
// // console.log("Fetching interview:", id);

// // const interview = await db.collection("interviews").doc(id).get();

// // if (!interview.exists) {
// // console.log("Interview not found");
// // return null;
// // }

// // return interview.data() as Interview | null;
// // }

// // export async function getFeedbackByInterviewId(
// // params: GetFeedbackByInterviewIdParams
// // ): Promise<Feedback | null> {
// // const { interviewId, userId } = params;

// // console.log("Fetching feedback for interview:", interviewId);
// // console.log("User:", userId);

// // const querySnapshot = await db
// // .collection("feedback")
// // .where("interviewId", "==", interviewId)
// // .where("userId", "==", userId)
// // .limit(1)
// // .get();

// // if (querySnapshot.empty) {
// // console.log("No feedback found");
// // return null;
// // }

// // const feedbackDoc = querySnapshot.docs[0];

// // console.log("Feedback found:", feedbackDoc.id);

// // return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
// // }

// // export async function getLatestInterviews(
// // params: GetLatestInterviewsParams
// // ): Promise<Interview[] | null> {
// // const { userId, limit = 20 } = params;

// // console.log("Fetching latest interviews excluding user:", userId);

// // const interviews = await db
// // .collection("interviews")
// // .orderBy("createdAt", "desc")
// // .where("finalized", "==", true)
// // .where("userId", "!=", userId)
// // .limit(limit)
// // .get();

// // console.log("Latest interviews count:", interviews.size);

// // return interviews.docs.map((doc) => ({
// // id: doc.id,
// // ...doc.data(),
// // })) as Interview[];
// // }

// // export async function getInterviewsByUserId(
// // userId: string
// // ): Promise<Interview[] | null> {
// // console.log("Fetching interviews for user:", userId);

// // const interviews = await db
// // .collection("interviews")
// // .where("userId", "==", userId)
// // .orderBy("createdAt", "desc")
// // .get();

// // console.log("User interviews count:", interviews.size);

// // return interviews.docs.map((doc) => ({
// // id: doc.id,
// // ...doc.data(),
// // })) as Interview[];
// // }
// "use server";

// import { generateObject } from "ai";
// import { google } from "@ai-sdk/google";

// import { db } from "@/firebase/admin";
// import { feedbackSchema } from "@/constants";

// export async function createFeedback(params: CreateFeedbackParams) {
//   const { interviewId, userId, transcript, feedbackId } = params;

//   try {
//     const formattedTranscript = transcript
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `- ${sentence.role}: ${sentence.content}\n`
//       )
//       .join("");

//     const { object } = await generateObject({
//       model: google("gemini-2.0-flash-001", {
//         structuredOutputs: false,
//       }),
//       schema: feedbackSchema,
//       prompt: `
//         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
//         Transcript:
//         ${formattedTranscript}

//         Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
//         - **Communication Skills**: Clarity, articulation, structured responses.
//         - **Technical Knowledge**: Understanding of key concepts for the role.
//         - **Problem-Solving**: Ability to analyze problems and propose solutions.
//         - **Cultural & Role Fit**: Alignment with company values and job role.
//         - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
//         `,
//       system:
//         "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
//     });

//     const feedback = {
//       interviewId: interviewId,
//       userId: userId,
//       totalScore: object.totalScore,
//       categoryScores: object.categoryScores,
//       strengths: object.strengths,
//       areasForImprovement: object.areasForImprovement,
//       finalAssessment: object.finalAssessment,
//       createdAt: new Date().toISOString(),
//     };

//     let feedbackRef;

//     if (feedbackId) {
//       feedbackRef = db.collection("feedback").doc(feedbackId);
//     } else {
//       feedbackRef = db.collection("feedback").doc();
//     }

//     await feedbackRef.set(feedback);

//     return { success: true, feedbackId: feedbackRef.id };
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     // ✅ FIX 1: Return consistent shape — always include feedbackId (as undefined)
//     // so callers can safely destructure { success, feedbackId } without runtime errors
//     return { success: false, feedbackId: undefined };
//   }
// }

// export async function getInterviewById(id: string): Promise<Interview | null> {
//   // ✅ FIX 2: Wrap in try/catch — unhandled Firestore errors would crash the server action
//   try {
//     const interview = await db.collection("interviews").doc(id).get();

//     // ✅ FIX 3: Check if document exists before returning data
//     if (!interview.exists) return null;

//     return { id: interview.id, ...interview.data() } as Interview;
//   } catch (error) {
//     console.error("Error fetching interview by ID:", error);
//     return null;
//   }
// }

// export async function getFeedbackByInterviewId(
//   params: GetFeedbackByInterviewIdParams
// ): Promise<Feedback | null> {
//   // ✅ FIX 4: Wrap in try/catch — unhandled Firestore errors would crash the server action
//   try {
//     const { interviewId, userId } = params;

//     const querySnapshot = await db
//       .collection("feedback")
//       .where("interviewId", "==", interviewId)
//       .where("userId", "==", userId)
//       .limit(1)
//       .get();

//     if (querySnapshot.empty) return null;

//     const feedbackDoc = querySnapshot.docs[0];
//     return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
//   } catch (error) {
//     console.error("Error fetching feedback by interview ID:", error);
//     return null;
//   }
// }

// export async function getLatestInterviews(
//   params: GetLatestInterviewsParams
// ): Promise<Interview[] | null> {
//   // ✅ FIX 5: Wrap in try/catch — unhandled Firestore errors would crash the server action
//   try {
//     const { userId, limit = 20 } = params;

//     // ✅ FIX 6: Firestore requires the first orderBy field to match inequality filter field.
//     // Using "!=" on userId but orderBy("createdAt") causes a Firestore index/ordering error.
//     // Correct fix: move userId inequality filter to be handled client-side OR
//     // restructure query so orderBy matches the inequality field.
//     // Solution: fetch finalized interviews excluding current user safely:
//     const interviews = await db
//       .collection("interviews")
//       .where("finalized", "==", true)
//       .where("userId", "!=", userId)
//       .orderBy("userId")           // ✅ Must orderBy the inequality field first
//       .orderBy("createdAt", "desc") // ✅ Then orderBy createdAt
//       .limit(limit)
//       .get();

//     return interviews.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Interview[];
//   } catch (error) {
//     console.error("Error fetching latest interviews:", error);
//     return null;
//   }
// }

// export async function getInterviewsByUserId(
//   userId: string
// ): Promise<Interview[] | null> {
//   // ✅ FIX 7: Wrap in try/catch — unhandled Firestore errors would crash the server action
//   try {
//     const interviews = await db
//       .collection("interviews")
//       .where("userId", "==", userId)
//       .orderBy("createdAt", "desc")
//       .get();

//     return interviews.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Interview[];
//   } catch (error) {
//     console.error("Error fetching interviews by user ID:", error);
//     return null;
//   }
// }
"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      // ✅ FIX: removed structuredOutputs second argument — not supported in this version of @ai-sdk/google
      model: google("gemini-2.0-flash-001"),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    // ✅ FIX 1: Return consistent shape — always include feedbackId (as undefined)
    // so callers can safely destructure { success, feedbackId } without runtime errors
    return { success: false, feedbackId: undefined };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  // ✅ FIX 2: Wrap in try/catch — unhandled Firestore errors would crash the server action
  try {
    const interview = await db.collection("interviews").doc(id).get();

    // ✅ FIX 3: Check if document exists before returning data
    if (!interview.exists) return null;

    return { id: interview.id, ...interview.data() } as Interview;
  } catch (error) {
    console.error("Error fetching interview by ID:", error);
    return null;
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  // ✅ FIX 4: Wrap in try/catch — unhandled Firestore errors would crash the server action
  try {
    const { interviewId, userId } = params;

    const querySnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (querySnapshot.empty) return null;

    const feedbackDoc = querySnapshot.docs[0];
    return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
  } catch (error) {
    console.error("Error fetching feedback by interview ID:", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  // ✅ FIX 5: Wrap in try/catch — unhandled Firestore errors would crash the server action
  try {
    const { userId, limit = 20 } = params;

    // ✅ FIX 6: Firestore requires the first orderBy field to match inequality filter field.
    // Using "!=" on userId but orderBy("createdAt") causes a Firestore index/ordering error.
    // Correct fix: move userId inequality filter to be handled client-side OR
    // restructure query so orderBy matches the inequality field.
    // Solution: fetch finalized interviews excluding current user safely:
    const interviews = await db
      .collection("interviews")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .orderBy("userId")           // ✅ Must orderBy the inequality field first
      .orderBy("createdAt", "desc") // ✅ Then orderBy createdAt
      .limit(limit)
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching latest interviews:", error);
    return null;
  }
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  // ✅ FIX 7: Wrap in try/catch — unhandled Firestore errors would crash the server action
  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching interviews by user ID:", error);
    return null;
  }
}