import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.actions";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });
  console.log(feedback);

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;




// import Image from "next/image";
// import { redirect } from "next/navigation";

// import Agent from "@/components/Agent";
// import { getRandomInterviewCover } from "@/lib/utils";

// import {
//   getFeedbackByInterviewId,
//   getInterviewById,
// } from "@/lib/actions/general.actions"; // ✅ FIX 1: was "general.actions" (wrong filename)
// import { getCurrentUser } from "@/lib/actions/auth.actions"; // ✅ FIX 2: was "auth.actions" (wrong filename)
// import DisplayTechIcons from "@/components/DisplayTechIcons";

// const InterviewDetails = async ({ params }: RouteParams) => {
//   const { id } = await params;

//   const user = await getCurrentUser();

//   // ✅ FIX 3: Guard against unauthenticated access — was missing, caused userId to be undefined
//   if (!user) redirect("/sign-in");

//   const interview = await getInterviewById(id);
//   if (!interview) redirect("/");

//   const feedback = await getFeedbackByInterviewId({
//     interviewId: id,
//     userId: user.id, // ✅ FIX 4: safe now — no need for ?. or ! since user is guaranteed above
//   });

//   return (
//     <>
//       <div className="flex flex-row gap-4 justify-between">
//         <div className="flex flex-row gap-4 items-center max-sm:flex-col">
//           <div className="flex flex-row gap-4 items-center">
//             <Image
//               src={getRandomInterviewCover()}
//               alt="cover-image"
//               width={40}
//               height={40}
//               className="rounded-full object-cover size-[40px]"
//             />
//             <h3 className="capitalize">{interview.role} Interview</h3>
//           </div>

//           <DisplayTechIcons techStack={interview.techstack} />
//         </div>

//         <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
//           {interview.type}
//         </p>
//       </div>

//       <Agent
//         userName={user.name}      // ✅ FIX 5: safe — no need for ?. or ! 
//         userId={user.id}
//         interviewId={id}
//         type="interview"
//         questions={interview.questions}
//         feedbackId={feedback?.id}
//       />
//     </>
//   );
// };

// export default InterviewDetails;