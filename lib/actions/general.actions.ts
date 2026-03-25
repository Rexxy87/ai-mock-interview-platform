// // "use server";

// // import { generateObject } from "ai";
// // import { google } from "@ai-sdk/google";

// // import { db } from "@/firebase/admin";
// // import { feedbackSchema } from "@/constants";

// // export async function createFeedback(params: CreateFeedbackParams) {
// //   const { interviewId, userId, transcript, feedbackId } = params;

// //   try {
// //     const formattedTranscript = transcript
// //       .map(
// //         (sentence: { role: string; content: string }) =>
// //           `- ${sentence.role}: ${sentence.content}\n`
// //       )
// //       .join("");

// //     const { object } = await generateObject({
// //       model: google("gemini-3-flash-preview", {
// //         structuredOutputs: false,
// //       }),
// //       schema: feedbackSchema,
// //       prompt: `
// //         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
// //         Transcript:
// //         ${formattedTranscript}

// //         Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
// //         - **Communication Skills**: Clarity, articulation, structured responses.
// //         - **Technical Knowledge**: Understanding of key concepts for the role.
// //         - **Problem-Solving**: Ability to analyze problems and propose solutions.
// //         - **Cultural & Role Fit**: Alignment with company values and job role.
// //         - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
// //         `,
// //       system:
// //         "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
// //     });

// //     const feedback = {
// //       interviewId: interviewId,
// //       userId: userId,
// //       totalScore: object.totalScore,
// //       categoryScores: object.categoryScores,
// //       strengths: object.strengths,
// //       areasForImprovement: object.areasForImprovement,
// //       finalAssessment: object.finalAssessment,
// //       createdAt: new Date().toISOString(),
// //     };

// //     let feedbackRef;

// //     if (feedbackId) {
// //       feedbackRef = db.collection("feedback").doc(feedbackId);
// //     } else {
// //       feedbackRef = db.collection("feedback").doc();
// //     }

// //     await feedbackRef.set(feedback);

// //     return { success: true, feedbackId: feedbackRef.id };
// //   } catch (error) {
// //     console.error("Error saving feedback:", error);
// //     return { success: false };
// //   }
// // }

// // export async function getInterviewById(id: string): Promise<Interview | null> {
// //   const interview = await db.collection("interviews").doc(id).get();

// //   return interview.data() as Interview | null;
// // }

// // export async function getFeedbackByInterviewId(
// //   params: GetFeedbackByInterviewIdParams
// // ): Promise<Feedback | null> {
// //   const { interviewId, userId } = params;

// //   const querySnapshot = await db
// //     .collection("feedback")
// //     .where("interviewId", "==", interviewId)
// //     .where("userId", "==", userId)
// //     .limit(1)
// //     .get();

// //   if (querySnapshot.empty) return null;

// //   const feedbackDoc = querySnapshot.docs[0];
// //   return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
// // }

// // export async function getLatestInterviews(
// //   params: GetLatestInterviewsParams
// // ): Promise<Interview[] | null> {
// //   const { userId, limit = 20 } = params;

// //   const interviews = await db
// //     .collection("interviews")
// //     .orderBy("createdAt", "desc")
// //     .where("finalized", "==", true)
// //     .where("userId", "!=", userId)
// //     .limit(limit)
// //     .get();

// //   return interviews.docs.map((doc) => ({
// //     id: doc.id,
// //     ...doc.data(),
// //   })) as Interview[];
// // }

// // export async function getInterviewsByUserId(
// //   userId: string
// // ): Promise<Interview[] | null> {
// //   const interviews = await db
// //     .collection("interviews")
// //     .where("userId", "==", userId)
// //     .orderBy("createdAt", "desc")
// //     .get();

// //   return interviews.docs.map((doc) => ({
// //     id: doc.id,
// //     ...doc.data(),
// //   })) as Interview[];
// // }

// "use server";

// import { generateObject } from "ai";
// import { google } from "@ai-sdk/google";

// import { db } from "@/firebase/admin";
// import { feedbackSchema } from "@/constants";

// // ✅ CREATE FEEDBACK
// export async function createFeedback(params: CreateFeedbackParams) {
//   const { interviewId, userId, transcript, feedbackId } = params;

//   try {
//     console.log("📥 createFeedback called with:", {
//       interviewId,
//       userId,
//       transcriptLength: transcript?.length,
//     });

//     // --- Format transcript ---
//     const formattedTranscript = transcript
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `- ${sentence.role}: ${sentence.content}\n`
//       )
//       .join("");

//     console.log("📝 Formatted Transcript:", formattedTranscript);

//     if (!formattedTranscript) {
//       console.error("❌ Empty transcript");
//       return { success: false };
//     }

//     console.log("🚀 Sending request to AI...");

//     // ✅ FIXED MODEL (removed structuredOutputs false)
//     const { object } = await generateObject({
//       model: google("gemini-3-flash-preview"),
//       schema: feedbackSchema,
//       prompt: `
// You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.

// Be strict. Do not be lenient. Highlight mistakes clearly.

// Transcript:
// ${formattedTranscript}

// Score from 0 to 100 in:
// - Communication Skills
// - Technical Knowledge
// - Problem-Solving
// - Cultural & Role Fit
// - Confidence & Clarity
//       `,
//       system:
//         "You are a professional interviewer analyzing a mock interview.",
//     });

//     console.log("🤖 AI Raw Response:", object);

//     // ✅ VALIDATE AI RESPONSE
//     if (!object || !object.totalScore) {
//       console.error("❌ Invalid AI response:", object);
//       return { success: false };
//     }

//     // --- Construct feedback ---
//     const feedback = {
//       interviewId,
//       userId,
//       totalScore: object.totalScore,
//       categoryScores: object.categoryScores,
//       strengths: object.strengths,
//       areasForImprovement: object.areasForImprovement,
//       finalAssessment: object.finalAssessment,
//       createdAt: new Date().toISOString(),
//     };

//     console.log("💾 Saving feedback to DB:", feedback);

//     // --- Save to Firebase ---
//     let feedbackRef;

//     if (feedbackId) {
//       feedbackRef = db.collection("feedback").doc(feedbackId);
//     } else {
//       feedbackRef = db.collection("feedback").doc();
//     }

//     await feedbackRef.set(feedback);

//     console.log("✅ Feedback saved with ID:", feedbackRef.id);

//     return { success: true, feedbackId: feedbackRef.id };
//   } catch (error) {
//     console.error("❌ Error saving feedback FULL:", error);
//     return { success: false };
//   }
// }

// // ✅ GET INTERVIEW
// export async function getInterviewById(
//   id: string
// ): Promise<Interview | null> {
//   console.log("📥 Fetching interview:", id);

//   const interview = await db.collection("interviews").doc(id).get();

//   if (!interview.exists) {
//     console.log("❌ Interview not found");
//     return null;
//   }

//   return interview.data() as Interview;
// }

// export async function getFeedbackByInterviewId(
//   params: GetFeedbackByInterviewIdParams
// ): Promise<Feedback | null> {
//   const { interviewId, userId } = params;

//   console.log("📥 Fetching feedback with:", { interviewId, userId });

//   const querySnapshot = await db
//     .collection("feedback")
//     .where("interviewId", "==", interviewId)
//     .where("userId", "==", userId)
//     .limit(1)
//     .get();

//   console.log("📦 Query result size:", querySnapshot.size);

//   if (querySnapshot.empty) {
//     console.log("❌ No feedback found with BOTH filters");

//     // 🔥 EXTRA DEBUG: check only interviewId
//     const debugSnapshot = await db
//       .collection("feedback")
//       .where("interviewId", "==", interviewId)
//       .get();

//     console.log("🧪 Debug (only interviewId) count:", debugSnapshot.size);

//     debugSnapshot.forEach((doc) => {
//       console.log("🧪 Found doc:", doc.id, doc.data());
//     });

//     return null;
//   }

//   const feedbackDoc = querySnapshot.docs[0];

//   console.log("✅ Feedback found:", feedbackDoc.id, feedbackDoc.data());

//   return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
// }

// // ✅ GET LATEST INTERVIEWS
// export async function getLatestInterviews(
//   params: GetLatestInterviewsParams
// ): Promise<Interview[] | null> {
//   const { userId, limit = 20 } = params;

//   console.log("📥 Fetching latest interviews");

//   const interviews = await db
//     .collection("interviews")
//     .orderBy("createdAt", "desc")
//     .where("finalized", "==", true)
//     .where("userId", "!=", userId)
//     .limit(limit)
//     .get();

//   return interviews.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Interview[];
// }

// // ✅ GET USER INTERVIEWS
// export async function getInterviewsByUserId(
//   userId: string
// ): Promise<Interview[] | null> {
//   console.log("📥 Fetching user interviews:", userId);

//   const interviews = await db
//     .collection("interviews")
//     .where("userId", "==", userId)
//     .orderBy("createdAt", "desc")
//     .get();

//   return interviews.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Interview[];
// }


"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

// ✅ CREATE FEEDBACK
export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    console.log("📥 createFeedback called with:", {
      interviewId,
      userId,
      transcriptLength: transcript?.length,
    });

    // --- Format transcript ---
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    console.log("📝 Formatted Transcript:", formattedTranscript);

    if (!formattedTranscript) {
      console.error("❌ Empty transcript");
      return { success: false };
    }

    // 🔥 TOGGLE (true = dummy, false = AI)
    const USE_DUMMY = true;

    let object;

    if (USE_DUMMY) {
      console.log("⚠️ Using DUMMY feedback");

      const dummyResponses = [
        {
          totalScore: 72,
          categoryScores: [
            { name: "Communication Skills", score: 75, comment: "Clear but slightly hesitant" },
            { name: "Technical Knowledge", score: 70, comment: "Good basics, needs depth" },
            { name: "Problem-Solving", score: 68, comment: "Average approach" },
            { name: "Cultural & Role Fit", score: 78, comment: "Good alignment" },
            { name: "Confidence & Clarity", score: 69, comment: "Needs more confidence" },
          ],
          strengths: ["Good communication", "Understands basics"],
          areasForImprovement: ["Deep technical knowledge", "Confidence"],
          finalAssessment: "A decent candidate with scope for improvement.",
        },
        {
          totalScore: 85,
          categoryScores: [
            { name: "Communication Skills", score: 88, comment: "Very clear and structured" },
            { name: "Technical Knowledge", score: 82, comment: "Strong understanding" },
            { name: "Problem-Solving", score: 84, comment: "Logical approach" },
            { name: "Cultural & Role Fit", score: 86, comment: "Great fit" },
            { name: "Confidence & Clarity", score: 85, comment: "Confident speaker" },
          ],
          strengths: ["Strong technical skills", "Confident"],
          areasForImprovement: ["Minor improvements needed"],
          finalAssessment: "A strong candidate ready for the role.",
        },
        {
          totalScore: 60,
          categoryScores: [
            { name: "Communication Skills", score: 58, comment: "Needs improvement" },
            { name: "Technical Knowledge", score: 55, comment: "Basic understanding only" },
            { name: "Problem-Solving", score: 60, comment: "Average" },
            { name: "Cultural & Role Fit", score: 65, comment: "Moderate fit" },
            { name: "Confidence & Clarity", score: 62, comment: "Low confidence" },
          ],
          strengths: ["Willing to try"],
          areasForImprovement: ["Technical knowledge", "Confidence"],
          finalAssessment: "Needs significant improvement before being job-ready.",
        },
        {
          totalScore: 90,
          categoryScores: [
            { name: "Communication Skills", score: 92, comment: "Excellent articulation" },
            { name: "Technical Knowledge", score: 89, comment: "Very strong" },
            { name: "Problem-Solving", score: 91, comment: "Great analytical skills" },
            { name: "Cultural & Role Fit", score: 90, comment: "Perfect fit" },
            { name: "Confidence & Clarity", score: 88, comment: "Very confident" },
          ],
          strengths: ["Excellent problem solving", "Highly confident"],
          areasForImprovement: ["Minor polishing"],
          finalAssessment: "Outstanding candidate.",
        },
      ];

      object =
        dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
    } else {
      console.log("🚀 Sending request to AI...");

      const res = await generateObject({
        model: google("gemini-2.0-flash"),
        schema: feedbackSchema,
        prompt: `
Analyze this interview transcript and generate structured feedback:

${formattedTranscript}
        `,
      });

      object = res.object;
      console.log("🤖 AI Raw Response:", object);
    }

    // --- Construct feedback ---
    const feedback = {
      interviewId,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    console.log("💾 Saving feedback to DB:", feedback);

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    console.log("✅ Feedback saved with ID:", feedbackRef.id);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error: any) {
    console.error("❌ FULL ERROR:", error);
    return { success: false };
  }
}

// ✅ GET INTERVIEW
export async function getInterviewById(
  id: string
): Promise<Interview | null> {
  console.log("📥 Fetching interview:", id);

  const interview = await db.collection("interviews").doc(id).get();

  if (!interview.exists) {
    console.log("❌ Interview not found");
    return null;
  }

  return interview.data() as Interview;
}

// ✅ GET FEEDBACK
export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  console.log("📥 Fetching feedback with:", { interviewId, userId });

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  console.log("📦 Query result size:", querySnapshot.size);

  if (querySnapshot.empty) {
    console.log("❌ No feedback found");
    return null;
  }

  const feedbackDoc = querySnapshot.docs[0];

  console.log("✅ Feedback found:", feedbackDoc.id);

  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

// ✅ GET LATEST INTERVIEWS
export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

// ✅ GET USER INTERVIEWS
export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}