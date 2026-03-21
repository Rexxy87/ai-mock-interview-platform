// // // import { generateText } from "ai";
// // // import { google } from "@ai-sdk/google";

// // // import { db } from "@/firebase/admin";
// // // import { getRandomInterviewCover } from "@/lib/utils";

// // // export async function POST(request: Request) {
// // //   const { type, role, level, techstack, amount, userid } = await request.json();

// // //   try {
// // //     const { text: questions } = await generateText({
// // //       model: google("gemini-2.0-flash-001"),
// // //       prompt: `
// // // You are a professional job interviewer.

// // // You will ask the candidate interview questions one by one.

// // // Rules:
// // // - Ask ONLY one question at a time.
// // // - After asking a question, WAIT for the candidate to respond.
// // // - Do not ask the next question until the user finishes answering.
// // // - After the answer, ask the next question.
// // // - Continue until all questions are completed.

// // // Job role: ${role}
// // // Experience level: ${level}
// // // Tech stack: ${techstack}
// // // Focus: ${type}

// // // Prepare ${amount} interview questions.

// // // Return them as JSON:
// // // ["Question 1","Question 2","Question 3"]
// // // `
// // //    ,
// // //     });

// // //     const interview = {
// // //       role: role,
// // //       type: type,
// // //       level: level,
// // //       techstack: techstack.split(","),
// // //       questions: JSON.parse(questions),
// // //       userId: userid,
// // //       finalized: true,
// // //       coverImage: getRandomInterviewCover(),
// // //       createdAt: new Date().toISOString(),
// // //     };

// // //     await db.collection("interviews").add(interview);

// // //     return Response.json({ success: true }, { status: 200 });
// // //   } catch (error) {
// // //     console.error("Error:", error);
// // //     return Response.json({ success: false, error: error }, { status: 500 });
// // //   }
// // // }

// // // export async function GET() {
// // //   return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
// // // }



// // // // import { generateText } from "ai";
// // // // import { google } from "@ai-sdk/google";

// // // // import { db } from "@/firebase/admin";
// // // // import { getRandomInterviewCover } from "@/lib/utils";
// // // // import { getCurrentUser } from "@/lib/actions/auth.actions";

// // // // export async function POST(request: Request) {
// // // // try {
// // // // const body = await request.json();
// // // // const { type, role, level, techstack, amount } = body;


// // // // // Get logged in user from session
// // // // const user = await getCurrentUser();

// // // // if (!user) {
// // // //   return Response.json(
// // // //     { success: false, message: "User not authenticated" },
// // // //     { status: 401 }
// // // //   );
// // // // }

// // // // const { text } = await generateText({
// // // //   model: google("gemini-2.0-flash-001"),
// // // //   prompt: `

// // // // You are a professional job interviewer.

// // // // Generate ${amount} interview questions.

// // // // Role: ${role}
// // // // Level: ${level}
// // // // Tech stack: ${techstack}
// // // // Type: ${type}

// // // // Return ONLY JSON array:
// // // // ["Question 1","Question 2","Question 3"]
// // // // `,
// // // // });

// // // // const interview = {
// // // //   role,
// // // //   type,
// // // //   level,
// // // //   techstack: techstack.split(","),
// // // //   questions: JSON.parse(text),

// // // //   // Correct user id from session
// // // //   userId: user.id,

// // // //   finalized: true,
// // // //   coverImage: getRandomInterviewCover(),
// // // //   createdAt: new Date().toISOString(),
// // // // };

// // // // await db.collection("interviews").add(interview);

// // // // return Response.json({ success: true }, { status: 200 });


// // // // } catch (error) {
// // // // console.error("Interview generation error:", error);


// // // // return Response.json(
// // // //   { success: false, message: "Interview generation failed" },
// // // //   { status: 500 }
// // // // );


// // // // }
// // // // }

// // // // export async function GET() {
// // // // return Response.json({ success: true }, { status: 200 });
// // // // }


// // // // // import { generateText } from "ai";
// // // // // import { google } from "@ai-sdk/google";

// // // // // import { db } from "@/firebase/admin";
// // // // // import { getRandomInterviewCover } from "@/lib/utils";

// // // // // export async function POST(request: Request) {
// // // // //   try {
// // // // //     const body = await request.json();
// // // // //     const { type, role, level, techstack, amount, userid } = body;

// // // // //     // ✅ FIX 1: Validate all required fields are present
// // // // //     if (!type || !role || !level || !techstack || !amount || !userid) {
// // // // //       return Response.json(
// // // // //         { success: false, message: "Missing required fields" },
// // // // //         { status: 400 }
// // // // //       );
// // // // //     }

// // // // //     // ✅ FIX 2: Removed getCurrentUser() — this is an external VAPI webhook call,
// // // // //     // it has no browser session/cookies. getCurrentUser() always returned null here,
// // // // //     // causing every interview generation to fail with 401.
// // // // //     // Instead, use userid sent directly from Agent.tsx via VAPI variableValues.

// // // // //     const { text } = await generateText({
// // // // //       model: google("gemini-2.0-flash-001"),
// // // // //       prompt: `
// // // // // You are a professional job interviewer. Generate ${amount} interview questions.

// // // // // Role: ${role}
// // // // // Level: ${level}
// // // // // Tech stack: ${techstack}
// // // // // Type: ${type}

// // // // // Return ONLY a valid JSON array, no markdown, no code fences, no explanation:
// // // // // ["Question 1","Question 2","Question 3"]
// // // // // `,
// // // // //     });

// // // // //     // ✅ FIX 3: Strip markdown code fences before parsing — Gemini sometimes wraps
// // // // //     // response in ```json ... ``` which causes JSON.parse to crash
// // // // //     const cleanText = text
// // // // //       .replace(/```json/g, "")
// // // // //       .replace(/```/g, "")
// // // // //       .trim();

// // // // //     let questions: string[];
// // // // //     try {
// // // // //       questions = JSON.parse(cleanText);
// // // // //     } catch {
// // // // //       console.error("Failed to parse questions JSON:", cleanText);
// // // // //       return Response.json(
// // // // //         { success: false, message: "Failed to parse generated questions" },
// // // // //         { status: 500 }
// // // // //       );
// // // // //     }

// // // // //     // ✅ FIX 4: Safely handle techstack whether it's a string or already an array
// // // // //     const techstackArray = Array.isArray(techstack)
// // // // //       ? techstack
// // // // //       : techstack.split(",").map((t: string) => t.trim());

// // // // //     const interview = {
// // // // //       role,
// // // // //       type,
// // // // //       level,
// // // // //       techstack: techstackArray,
// // // // //       questions,
// // // // //       userId: userid,       // ✅ from VAPI body — matches what Agent.tsx sends
// // // // //       finalized: true,      // ✅ must be true for getLatestInterviews query to find it
// // // // //       coverImage: getRandomInterviewCover(),
// // // // //       createdAt: new Date().toISOString(),
// // // // //     };

// // // // //     await db.collection("interviews").add(interview);

// // // // //     return Response.json({ success: true }, { status: 200 });
// // // // //   } catch (error) {
// // // // //     console.error("Interview generation error:", error);
// // // // //     return Response.json(
// // // // //       { success: false, message: "Interview generation failed" },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // export async function GET() {
// // // // //   return Response.json({ success: true }, { status: 200 });
// // // // // // }
// // // // import { generateText } from "ai";
// // // // import { google } from "@ai-sdk/google";

// // // // import { db } from "@/firebase/admin";
// // // // import { getRandomInterviewCover } from "@/lib/utils";

// // // // export async function POST(request: Request) {
// // // //   const { type, role, level, techstack, amount, userid } = await request.json();

// // // //   try {
// // // //     const { text: questions } = await generateText({
// // // //       model: google("gemini-2.0-flash-001"),
// // // //       prompt: `Prepare questions for a job interview.
// // // //         The job role is ${role}.
// // // //         The job experience level is ${level}.
// // // //         The tech stack used in the job is: ${techstack}.
// // // //         The focus between behavioural and technical questions should lean towards: ${type}.
// // // //         The amount of questions required is: ${amount}.
// // // //         Please return only the questions, without any additional text.
// // // //         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
// // // //         Return the questions formatted like this:
// // // //         ["Question 1", "Question 2", "Question 3"]
        
// // // //         Thank you! <3
// // // //     `,
// // // //     });

// // // //     const interview = {
// // // //       role: role,
// // // //       type: type,
// // // //       level: level,
// // // //       techstack: techstack.split(","),
// // // //       questions: JSON.parse(questions),
// // // //       userId: userid,
// // // //       finalized: true,
// // // //       coverImage: getRandomInterviewCover(),
// // // //       createdAt: new Date().toISOString(),
// // // //     };

// // // //     await db.collection("interviews").add(interview);

// // // //     return Response.json({ success: true }, { status: 200 });
// // // //   } catch (error) {
// // // //     console.error("Error:", error);
// // // //     return Response.json({ success: false, error: error }, { status: 500 });
// // // //   }
// // // // }

// // // // export async function GET() {
// // // //   return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
// // // // }

// import { generateText } from "ai";
// import { google } from "@ai-sdk/google";

// import { db } from "@/firebase/admin";
// import { getRandomInterviewCover } from "@/lib/utils";

// export async function POST(request: Request) {
//   const { type, role, level, techstack, amount, userid } = await request.json();

//   try {
//     const { text: questions } = await generateText({
//       model: google("gemini-2.0-flash-001"),
//       prompt: `Prepare questions for a job interview.
//         The job role is ${role}.
//         The job experience level is ${level}.
//         The tech stack used in the job is: ${techstack}.
//         The focus between behavioural and technical questions should lean towards: ${type}.
//         The amount of questions required is: ${amount}.
//         Please return only the questions, without any additional text.
//         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//         Return the questions formatted like this:
//         ["Question 1", "Question 2", "Question 3"]
        
//         Thank you! <3
//     `,
//     });

//     const interview = {
//       role: role,
//       type: type,
//       level: level,
//       techstack: techstack.split(","),
//       questions: JSON.parse(questions),
//       userId: userid,
//       finalized: true,
//       coverImage: getRandomInterviewCover(),
//       createdAt: new Date().toISOString(),
//     };

//     await db.collection("interviews").add(interview);

//     return Response.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return Response.json({ success: false, error: error }, { status: 500 });
//   }
// }

// export async function GET() {
//   return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
// }


import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-3-flash-preview"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}