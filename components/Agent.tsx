// // // // // "use client";

// // // // // import Image from "next/image";
// // // // // import { useState, useEffect } from "react";
// // // // // import { useRouter } from "next/navigation";

// // // // // import { cn } from "@/lib/utils";
// // // // // import { vapi } from "@/lib/vapi.sdk";
// // // // // import { interviewer } from "@/constants";
// // // // // import { createFeedback } from "@/lib/actions/general.actions";

// // // // // enum CallStatus {
// // // // //   INACTIVE = "INACTIVE",
// // // // //   CONNECTING = "CONNECTING",
// // // // //   ACTIVE = "ACTIVE",
// // // // //   FINISHED = "FINISHED",
// // // // // }

// // // // // interface SavedMessage {
// // // // //   role: "user" | "system" | "assistant";
// // // // //   content: string;
// // // // // }

// // // // // const Agent = ({
// // // // //   userName,
// // // // //   userId,
// // // // //   interviewId,
// // // // //   feedbackId,
// // // // //   type,
// // // // //   questions,
// // // // // }: AgentProps) => {
// // // // //   const router = useRouter();
// // // // //   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
// // // // //   const [messages, setMessages] = useState<SavedMessage[]>([]);
// // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // //   const [lastMessage, setLastMessage] = useState<string>("");

// // // // //   useEffect(() => {
// // // // //     const onCallStart = () => {
// // // // //       setCallStatus(CallStatus.ACTIVE);
// // // // //     };

// // // // //     const onCallEnd = () => {
// // // // //       setCallStatus(CallStatus.FINISHED);
// // // // //     };

// // // // //     const onMessage = (message: Message) => {
// // // // //       if (message.type === "transcript" && message.transcriptType === "final") {
// // // // //         const newMessage = { role: message.role, content: message.transcript };
// // // // //         setMessages((prev) => [...prev, newMessage]);
// // // // //       }
// // // // //     };

// // // // //     const onSpeechStart = () => {
// // // // //       console.log("speech start");
// // // // //       setIsSpeaking(true);
// // // // //     };

// // // // //     const onSpeechEnd = () => {
// // // // //       console.log("speech end");
// // // // //       setIsSpeaking(false);
// // // // //     };

// // // // //     const onError = (error: Error) => {
// // // // //       console.log("Error:", error);
// // // // //     };

// // // // //     vapi.on("call-start", onCallStart);
// // // // //     vapi.on("call-end", onCallEnd);
// // // // //     vapi.on("message", onMessage);
// // // // //     vapi.on("speech-start", onSpeechStart);
// // // // //     vapi.on("speech-end", onSpeechEnd);
// // // // //     vapi.on("error", onError);

// // // // //     return () => {
// // // // //       vapi.off("call-start", onCallStart);
// // // // //       vapi.off("call-end", onCallEnd);
// // // // //       vapi.off("message", onMessage);
// // // // //       vapi.off("speech-start", onSpeechStart);
// // // // //       vapi.off("speech-end", onSpeechEnd);
// // // // //       vapi.off("error", onError);
// // // // //     };
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (messages.length > 0) {
// // // // //       setLastMessage(messages[messages.length - 1].content);
// // // // //     }

// // // // //     const handleGenerateFeedback = async (messages: SavedMessage[]) => {
// // // // //       console.log("handleGenerateFeedback");

// // // // //       const { success, feedbackId: id } = await createFeedback({
// // // // //         interviewId: interviewId!,
// // // // //         userId: userId!,
// // // // //         transcript: messages,
// // // // //         feedbackId,
// // // // //       });

// // // // //       if (success && id) {
// // // // //         router.push(`/interview/${interviewId}/feedback`);
// // // // //       } else {
// // // // //         console.log("Error saving feedback");
// // // // //         router.push("/");
// // // // //       }
// // // // //     };

// // // // //     if (callStatus === CallStatus.FINISHED) {
// // // // //       if (type === "generate") {
// // // // //         router.push("/");
// // // // //       } else {
// // // // //         handleGenerateFeedback(messages);
// // // // //       }
// // // // //     }
// // // // //   }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

// // // // //   const handleCall = async () => {
// // // // //     setCallStatus(CallStatus.CONNECTING);

// // // // //     if (type === "generate") {
// // // // //       await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
// // // // //         variableValues: {
// // // // //           username: userName,
// // // // //           userid: userId,
// // // // //         },
// // // // //       });
// // // // //     } else {
// // // // //       let formattedQuestions = "";
// // // // //       if (questions) {
// // // // //         formattedQuestions = questions
// // // // //           .map((question) => `- ${question}`)
// // // // //           .join("\n");
// // // // //       }

// // // // //       await vapi.start(interviewer, {
// // // // //         variableValues: {
// // // // //           questions: formattedQuestions,
// // // // //         }, 
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleDisconnect = () => {
// // // // //     setCallStatus(CallStatus.FINISHED);
// // // // //     vapi.stop();
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <div className="call-view">
// // // // //         {/* AI Interviewer Card */}
// // // // //         <div className="card-interviewer">
// // // // //           <div className="avatar">
// // // // //             <Image
// // // // //               src="/ai-avatar.png"
// // // // //               alt="profile-image"
// // // // //               width={65}
// // // // //               height={54}
// // // // //               className="object-cover"
// // // // //             />
// // // // //             {isSpeaking && <span className="animate-speak" />}
// // // // //           </div>
// // // // //           <h3>AI Interviewer</h3>
// // // // //         </div>

// // // // //         {/* User Profile Card */}
// // // // //         <div className="card-border">
// // // // //           <div className="card-content">
// // // // //             <Image
// // // // //               src="/user-avatar.png"
// // // // //               alt="profile-image"
// // // // //               width={539}
// // // // //               height={539}
// // // // //               className="rounded-full object-cover size-[120px]"
// // // // //             />
// // // // //             <h3>{userName}</h3>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {messages.length > 0 && (
// // // // //         <div className="transcript-border">
// // // // //           <div className="transcript">
// // // // //             <p
// // // // //               key={lastMessage}
// // // // //               className={cn(
// // // // //                 "transition-opacity duration-500 opacity-0",
// // // // //                 "animate-fadeIn opacity-100"
// // // // //               )}
// // // // //             >
// // // // //               {lastMessage}
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="w-full flex justify-center">
// // // // //         {callStatus !== "ACTIVE" ? (
// // // // //           <button className="relative btn-call" onClick={() => handleCall()}>
// // // // //             <span
// // // // //               className={cn(
// // // // //                 "absolute animate-ping rounded-full opacity-75",
// // // // //                 callStatus !== "CONNECTING" && "hidden"
// // // // //               )}
// // // // //             />

// // // // //             <span className="relative">
// // // // //               {callStatus === "INACTIVE" || callStatus === "FINISHED"
// // // // //                 ? "Call"
// // // // //                 : ". . ."}
// // // // //             </span>
// // // // //           </button>
// // // // //         ) : (
// // // // //           <button className="btn-disconnect" onClick={() => handleDisconnect()}>
// // // // //             End
// // // // //           </button>
// // // // //         )}
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default Agent;




// // // // // // // "use client";

// // // // // // // import Image from "next/image";
// // // // // // // import { useState, useEffect, useRef } from "react";
// // // // // // // import { useRouter } from "next/navigation";

// // // // // // // import { cn } from "@/lib/utils";
// // // // // // // import { vapi } from "@/lib/vapi.sdk";
// // // // // // // import { interviewer } from "@/constants";
// // // // // // // import { createFeedback } from "@/lib/actions/general.actions";

// // // // // // // enum CallStatus {
// // // // // // // INACTIVE = "INACTIVE",
// // // // // // // CONNECTING = "CONNECTING",
// // // // // // // ACTIVE = "ACTIVE",
// // // // // // // FINISHED = "FINISHED",
// // // // // // // }

// // // // // // // interface SavedMessage {
// // // // // // // role: "user" | "system" | "assistant";
// // // // // // // content: string;
// // // // // // // }

// // // // // // // const Agent = ({
// // // // // // // userName,
// // // // // // // userId,
// // // // // // // interviewId,
// // // // // // // feedbackId,
// // // // // // // type,
// // // // // // // questions,
// // // // // // // }: AgentProps) => {
// // // // // // // const router = useRouter();

// // // // // // // const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
// // // // // // // const [messages, setMessages] = useState<SavedMessage[]>([]);
// // // // // // // const [isSpeaking, setIsSpeaking] = useState(false);
// // // // // // // const [lastMessage, setLastMessage] = useState("");

// // // // // // // // store transcript safely
// // // // // // // const transcriptRef = useRef<SavedMessage[]>([]);

// // // // // // // useEffect(() => {
// // // // // // // const onCallStart = () => {
// // // // // // // setCallStatus(CallStatus.ACTIVE);
// // // // // // // };


// // // // // // // const onCallEnd = async () => {
// // // // // // //   setCallStatus(CallStatus.FINISHED);

// // // // // // //   if (type === "generate") {
// // // // // // //     router.push("/");
// // // // // // //     return;
// // // // // // //   }

// // // // // // //   try {
// // // // // // //     const transcript = transcriptRef.current;

// // // // // // //     if (!transcript || transcript.length === 0) {
// // // // // // //       console.error("Transcript empty");
// // // // // // //       router.push("/");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const { success, feedbackId: id } = await createFeedback({
// // // // // // //       interviewId: interviewId!,
// // // // // // //       userId: userId!,
// // // // // // //       transcript,
// // // // // // //       feedbackId,
// // // // // // //     });

// // // // // // //     if (success && id) {
// // // // // // //       router.push(`/interview/${interviewId}/feedback`);
// // // // // // //     } else {
// // // // // // //       router.push("/");
// // // // // // //     }
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Feedback generation error", err);
// // // // // // //     router.push("/");
// // // // // // //   }
// // // // // // // };

// // // // // // // const onMessage = (message: Message) => {
// // // // // // //   if (message.type === "transcript" && message.transcriptType === "final") {
// // // // // // //     const newMessage = {
// // // // // // //       role: message.role,
// // // // // // //       content: message.transcript,
// // // // // // //     };

// // // // // // //     transcriptRef.current.push(newMessage);
// // // // // // //     setMessages((prev) => [...prev, newMessage]);
// // // // // // //     setLastMessage(message.transcript);
// // // // // // //   }
// // // // // // // };

// // // // // // // const onSpeechStart = () => {
// // // // // // //   setIsSpeaking(true);
// // // // // // // };

// // // // // // // const onSpeechEnd = () => {
// // // // // // //   setIsSpeaking(false);
// // // // // // // };

// // // // // // // const onError = (error: Error) => {
// // // // // // //   console.error("VAPI error:", error);
// // // // // // // };

// // // // // // // vapi.on("call-start", onCallStart);
// // // // // // // vapi.on("call-end", onCallEnd);
// // // // // // // vapi.on("message", onMessage);
// // // // // // // vapi.on("speech-start", onSpeechStart);
// // // // // // // vapi.on("speech-end", onSpeechEnd);
// // // // // // // vapi.on("error", onError);

// // // // // // // return () => {
// // // // // // //   vapi.off("call-start", onCallStart);
// // // // // // //   vapi.off("call-end", onCallEnd);
// // // // // // //   vapi.off("message", onMessage);
// // // // // // //   vapi.off("speech-start", onSpeechStart);
// // // // // // //   vapi.off("speech-end", onSpeechEnd);
// // // // // // //   vapi.off("error", onError);
// // // // // // // };


// // // // // // // }, [feedbackId, interviewId, router, type, userId]);

// // // // // // // const handleCall = async () => {
// // // // // // // setCallStatus(CallStatus.CONNECTING);


// // // // // // // if (type === "generate") {
// // // // // // //   await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
// // // // // // //     variableValues: {
// // // // // // //       username: userName,
// // // // // // //       userid: userId,
// // // // // // //     },
// // // // // // //   });
// // // // // // // } else {
// // // // // // //   let formattedQuestions = "";  

// // // // // // //   if (questions) {
// // // // // // //     formattedQuestions = questions
// // // // // // //       .map((question) => `- ${question}`)
// // // // // // //       .join("\n");
// // // // // // //   }

// // // // // // //   await vapi.start(interviewer, {
// // // // // // //     variableValues: {
// // // // // // //       questions: formattedQuestions,
// // // // // // //     },
// // // // // // //   });
// // // // // // // }


// // // // // // // };

// // // // // // // const handleDisconnect = () => {
// // // // // // // vapi.stop();
// // // // // // // };

// // // // // // // return (
// // // // // // // <> <div className="call-view"> <div className="card-interviewer"> <div className="avatar"> <Image
// // // // // // //            src="/ai-avatar.png"
// // // // // // //            alt="profile-image"
// // // // // // //            width={65}
// // // // // // //            height={54}
// // // // // // //            className="object-cover"
// // // // // // //          />
// // // // // // // {isSpeaking && <span className="animate-speak" />} </div> <h3>AI Interviewer</h3> </div>


// // // // // // //     <div className="card-border">
// // // // // // //       <div className="card-content">
// // // // // // //         <Image
// // // // // // //           src="/user-avatar.png"
// // // // // // //           alt="profile-image"
// // // // // // //           width={539}
// // // // // // //           height={539}
// // // // // // //           className="rounded-full object-cover size-[120px]"
// // // // // // //         />
// // // // // // //         <h3>{userName}</h3>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   </div>

// // // // // // //   {messages.length > 0 && (
// // // // // // //     <div className="transcript-border">
// // // // // // //       <div className="transcript">
// // // // // // //         <p
// // // // // // //           key={lastMessage}
// // // // // // //           className={cn(
// // // // // // //             "transition-opacity duration-500 opacity-0",
// // // // // // //             "animate-fadeIn opacity-100"
// // // // // // //           )}
// // // // // // //         >
// // // // // // //           {lastMessage}
// // // // // // //         </p>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   )}

// // // // // // //   <div className="w-full flex justify-center">
// // // // // // //     {callStatus !== "ACTIVE" ? (
// // // // // // //       <button className="relative btn-call" onClick={handleCall}>
// // // // // // //         <span
// // // // // // //           className={cn(
// // // // // // //             "absolute animate-ping rounded-full opacity-75",
// // // // // // //             callStatus !== "CONNECTING" && "hidden"
// // // // // // //           )}
// // // // // // //         />
// // // // // // //         <span className="relative">
// // // // // // //           {callStatus === "INACTIVE" || callStatus === "FINISHED"
// // // // // // //             ? "Call"
// // // // // // //             : "..."}
// // // // // // //         </span>
// // // // // // //       </button>
// // // // // // //     ) : (
// // // // // // //       <button className="btn-disconnect" onClick={handleDisconnect}>
// // // // // // //         End
// // // // // // //       </button>
// // // // // // //     )}
// // // // // // //   </div>
// // // // // // // </>


// // // // // // // );
// // // // // // // };

// // // // // // // export default Agent;

// // // // // // "use client";

// // // // // // import Image from "next/image";
// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useRouter } from "next/navigation";

// // // // // // import { cn } from "@/lib/utils";
// // // // // // import { vapi } from "@/lib/vapi.sdk";
// // // // // // import { interviewer } from "@/constants";
// // // // // // import { createFeedback } from "@/lib/actions/general.actions";

// // // // // // enum CallStatus {
// // // // // //   INACTIVE = "INACTIVE",
// // // // // //   CONNECTING = "CONNECTING",
// // // // // //   ACTIVE = "ACTIVE",
// // // // // //   FINISHED = "FINISHED",
// // // // // // }

// // // // // // interface SavedMessage {
// // // // // //   role: "user" | "system" | "assistant";
// // // // // //   content: string;
// // // // // // }

// // // // // // const Agent = ({
// // // // // //   userName,
// // // // // //   userId,
// // // // // //   interviewId,
// // // // // //   feedbackId,
// // // // // //   type,
// // // // // //   questions,
// // // // // // }: AgentProps) => {
// // // // // //   const router = useRouter();
// // // // // //   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
// // // // // //   const [messages, setMessages] = useState<SavedMessage[]>([]);
// // // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // // //   const [lastMessage, setLastMessage] = useState<string>("");

// // // // // //   useEffect(() => {
// // // // // //     const onCallStart = () => {
// // // // // //       setCallStatus(CallStatus.ACTIVE);
// // // // // //     };

// // // // // //     const onCallEnd = () => {
// // // // // //       setCallStatus(CallStatus.FINISHED);
// // // // // //     };

// // // // // //     const onMessage = (message: Message) => {
// // // // // //       if (message.type === "transcript" && message.transcriptType === "final") {
// // // // // //         const newMessage = { role: message.role, content: message.transcript };
// // // // // //         setMessages((prev) => [...prev, newMessage]);
// // // // // //       }
// // // // // //     };

// // // // // //     const onSpeechStart = () => {
// // // // // //       console.log("speech start");
// // // // // //       setIsSpeaking(true);
// // // // // //     };

// // // // // //     const onSpeechEnd = () => {
// // // // // //       console.log("speech end");
// // // // // //       setIsSpeaking(false);
// // // // // //     };

// // // // // //     const onError = (error: Error) => {
// // // // // //       console.log("Error:", error);
// // // // // //     };

// // // // // //     vapi.on("call-start", onCallStart);
// // // // // //     vapi.on("call-end", onCallEnd);
// // // // // //     vapi.on("message", onMessage);
// // // // // //     vapi.on("speech-start", onSpeechStart);
// // // // // //     vapi.on("speech-end", onSpeechEnd);
// // // // // //     vapi.on("error", onError);

// // // // // //     return () => {
// // // // // //       vapi.off("call-start", onCallStart);
// // // // // //       vapi.off("call-end", onCallEnd);
// // // // // //       vapi.off("message", onMessage);
// // // // // //       vapi.off("speech-start", onSpeechStart);
// // // // // //       vapi.off("speech-end", onSpeechEnd);
// // // // // //       vapi.off("error", onError);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     if (messages.length > 0) {
// // // // // //       setLastMessage(messages[messages.length - 1].content);
// // // // // //     }

// // // // // //     const handleGenerateFeedback = async (messages: SavedMessage[]) => {
// // // // // //       console.log("handleGenerateFeedback");

// // // // // //       const { success, feedbackId: id } = await createFeedback({
// // // // // //         interviewId: interviewId!,
// // // // // //         userId: userId!,
// // // // // //         transcript: messages,
// // // // // //         feedbackId,
// // // // // //       });

// // // // // //       if (success && id) {
// // // // // //         router.push(`/interview/${interviewId}/feedback`);
// // // // // //       } else {
// // // // // //         console.log("Error saving feedback");
// // // // // //         router.push("/");
// // // // // //       }
// // // // // //     };

// // // // // //     if (callStatus === CallStatus.FINISHED) {
// // // // // //       if (type === "generate") {
// // // // // //         router.push("/");
// // // // // //       } else {
// // // // // //         handleGenerateFeedback(messages);
// // // // // //       }
// // // // // //     }
// // // // // //   }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

// // // // // //   const handleCall = async () => {
// // // // // //     setCallStatus(CallStatus.CONNECTING);

// // // // // //     if (type === "generate") {
// // // // // //       await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
// // // // // //         variableValues: {
// // // // // //           username: userName,
// // // // // //           userid: userId,
// // // // // //         },
// // // // // //       });
// // // // // //     } else {
// // // // // //       let formattedQuestions = "";
// // // // // //       if (questions) {
// // // // // //         formattedQuestions = questions
// // // // // //           .map((question) => `- ${question}`)
// // // // // //           .join("\n");
// // // // // //       }

// // // // // //       await vapi.start(interviewer, {
// // // // // //         variableValues: {
// // // // // //           questions: formattedQuestions,
// // // // // //         },
// // // // // //       });
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDisconnect = () => {
// // // // // //     setCallStatus(CallStatus.FINISHED);
// // // // // //     vapi.stop();
// // // // // //   };

// // // // // //   return (
// // // // // //     <>
// // // // // //       <div className="call-view">
// // // // // //         {/* AI Interviewer Card */}
// // // // // //         <div className="card-interviewer">
// // // // // //           <div className="avatar">
// // // // // //             <Image
// // // // // //               src="/ai-avatar.png"
// // // // // //               alt="profile-image"
// // // // // //               width={65}
// // // // // //               height={54}
// // // // // //               className="object-cover"
// // // // // //             />
// // // // // //             {isSpeaking && <span className="animate-speak" />}
// // // // // //           </div>
// // // // // //           <h3>AI Interviewer</h3>
// // // // // //         </div>

// // // // // //         {/* User Profile Card */}
// // // // // //         <div className="card-border">
// // // // // //           <div className="card-content">
// // // // // //             <Image
// // // // // //               src="/user-avatar.png"
// // // // // //               alt="profile-image"
// // // // // //               width={539}
// // // // // //               height={539}
// // // // // //               className="rounded-full object-cover size-[120px]"
// // // // // //             />
// // // // // //             <h3>{userName}</h3>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {messages.length > 0 && (
// // // // // //         <div className="transcript-border">
// // // // // //           <div className="transcript">
// // // // // //             <p
// // // // // //               key={lastMessage}
// // // // // //               className={cn(
// // // // // //                 "transition-opacity duration-500 opacity-0",
// // // // // //                 "animate-fadeIn opacity-100"
// // // // // //               )}
// // // // // //             >
// // // // // //               {lastMessage}
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div className="w-full flex justify-center">
// // // // // //         {callStatus !== "ACTIVE" ? (
// // // // // //           <button className="relative btn-call" onClick={() => handleCall()}>
// // // // // //             <span
// // // // // //               className={cn(
// // // // // //                 "absolute animate-ping rounded-full opacity-75",
// // // // // //                 callStatus !== "CONNECTING" && "hidden"
// // // // // //               )}
// // // // // //             />

// // // // // //             <span className="relative">
// // // // // //               {callStatus === "INACTIVE" || callStatus === "FINISHED"
// // // // // //                 ? "Call"
// // // // // //                 : ". . ."}
// // // // // //             </span>
// // // // // //           </button>
// // // // // //         ) : (
// // // // // //           <button className="btn-disconnect" onClick={() => handleDisconnect()}>
// // // // // //             End
// // // // // //           </button>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default Agent;



// // // // "use client";

// // // // import Image from "next/image";
// // // // import { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";

// // // // import { cn } from "@/lib/utils";
// // // // import { vapi } from "@/lib/vapi.sdk";
// // // // import { interviewer } from "@/constants";
// // // // import { createFeedback } from "@/lib/actions/general.actions";

// // // // enum CallStatus {
// // // // INACTIVE = "INACTIVE",
// // // // CONNECTING = "CONNECTING",
// // // // ACTIVE = "ACTIVE",
// // // // FINISHED = "FINISHED",
// // // // }

// // // // interface SavedMessage {
// // // // role: "user" | "system" | "assistant";
// // // // content: string;
// // // // }

// // // // const Agent = ({
// // // // userName,
// // // // userId,
// // // // interviewId,
// // // // feedbackId,
// // // // type,
// // // // questions,
// // // // }: AgentProps) => {
// // // // const router = useRouter();

// // // // const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
// // // // const [messages, setMessages] = useState<SavedMessage[]>([]);
// // // // const [isSpeaking, setIsSpeaking] = useState(false);
// // // // const [lastMessage, setLastMessage] = useState<string>("");

// // // // useEffect(() => {
// // // // const onCallStart = () => {
// // // // console.log("📞 Call Started");
// // // // setCallStatus(CallStatus.ACTIVE);
// // // // };


// // // // const onCallEnd = () => {
// // // //   console.log("📴 Call Ended");
// // // //   setCallStatus(CallStatus.FINISHED);
// // // // };

// // // // const onMessage = (message: Message) => {
// // // //   if (message.type === "transcript" && message.transcriptType === "final") {
// // // //     const newMessage = { role: message.role, content: message.transcript };
// // // //     setMessages((prev) => [...prev, newMessage]);
// // // //   }
// // // // };

// // // // const onSpeechStart = () => {
// // // //   setIsSpeaking(true);
// // // // };

// // // // const onSpeechEnd = () => {
// // // //   setIsSpeaking(false);
// // // // };

// // // // const onError = (error: Error) => {
// // // //   console.error("🔥 VAPI ERROR:", error);
// // // // };

// // // // vapi.on("call-start", onCallStart);
// // // // vapi.on("call-end", onCallEnd);
// // // // vapi.on("message", onMessage);
// // // // vapi.on("speech-start", onSpeechStart);
// // // // vapi.on("speech-end", onSpeechEnd);
// // // // vapi.on("error", onError);

// // // // return () => {
// // // //   vapi.off("call-start", onCallStart);
// // // //   vapi.off("call-end", onCallEnd);
// // // //   vapi.off("message", onMessage);
// // // //   vapi.off("speech-start", onSpeechStart);
// // // //   vapi.off("speech-end", onSpeechEnd);
// // // //   vapi.off("error", onError);
// // // // };


// // // // }, []);

// // // // useEffect(() => {
// // // // if (messages.length > 0) {
// // // // setLastMessage(messages[messages.length - 1].content);
// // // // }


// // // // const handleGenerateFeedback = async (messages: SavedMessage[]) => {
// // // //   console.log("📝 Generating Feedback...");

// // // //   const { success, feedbackId: id } = await createFeedback({
// // // //     interviewId: interviewId!,
// // // //     userId: userId!,
// // // //     transcript: messages,
// // // //     feedbackId,
// // // //   });

// // // //   if (success && id) {
// // // //     router.push(`/interview/${interviewId}/feedback`);
// // // //   } else {
// // // //     console.log("❌ Error saving feedback");
// // // //     router.push("/");
// // // //   }
// // // // };

// // // // if (callStatus === CallStatus.FINISHED) {
// // // //   if (type === "generate") {
// // // //     router.push("/");
// // // //   } else {
// // // //     handleGenerateFeedback(messages);
// // // //   }
// // // // }


// // // // }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

// // // // const handleCall = async () => {
// // // // setCallStatus(CallStatus.CONNECTING);


// // // // try {
// // // //   // 🔥 STEP 1: Generate Questions via API
// // // //   if (type === "generate") {
// // // //     console.log("📡 Calling API to generate questions...");

// // // //     const res = await fetch("/api/vapi/generate", {
// // // //       method: "POST",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //       },
// // // //       body: JSON.stringify({
// // // //         type: "technical",
// // // //         role: "MERN Developer",
// // // //         level: "junior",
// // // //         techstack: "react,node,mongodb",
// // // //         amount: 5,
// // // //         userid: userId,
// // // //       }),
// // // //     });

// // // //     const data = await res.json();
// // // //     console.log("✅ API RESPONSE:", data);

// // // //     if (!data.success) {
// // // //       throw new Error("Failed to generate questions");
// // // //     }

// // // //     console.log("🚀 Starting VAPI...");

// // // //     // 🔥 STEP 2: Start VAPI AFTER AI generation
// // // //     console.log("VAPI WORKFLOW:", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
// // // //     await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
// // // //       variableValues: {
// // // //         username: userName,
// // // //         userid: userId,
// // // //       },
// // // //     });

// // // //   } else {
// // // //     // Existing interview flow
// // // //     let formattedQuestions = "";

// // // //     if (questions) {
// // // //       formattedQuestions = questions
// // // //         .map((question) => `- ${question}`)
// // // //         .join("\n");
// // // //     }

// // // //     await vapi.start(interviewer, {
// // // //       variableValues: {
// // // //         questions: formattedQuestions,
// // // //       },
// // // //     });
// // // //   }
// // // // } catch (error) {
// // // //   console.error("🔥 HANDLE CALL ERROR:", error);
// // // //   setCallStatus(CallStatus.INACTIVE);
// // // // }


// // // // };

// // // // const handleDisconnect = () => {
// // // // setCallStatus(CallStatus.FINISHED);
// // // // vapi.stop();
// // // // };

// // // // return (
// // // // <> <div className="call-view"> <div className="card-interviewer"> <div className="avatar"> <Image
// // // //            src="/ai-avatar.png"
// // // //            alt="profile-image"
// // // //            width={65}
// // // //            height={54}
// // // //            className="object-cover"
// // // //          />
// // // // {isSpeaking && <span className="animate-speak" />} </div> <h3>AI Interviewer</h3> </div>


// // // //     <div className="card-border">
// // // //       <div className="card-content">
// // // //         <Image
// // // //           src="/user-avatar.png"
// // // //           alt="profile-image"
// // // //           width={539}
// // // //           height={539}
// // // //           className="rounded-full object-cover size-[120px]"
// // // //         />
// // // //         <h3>{userName}</h3>
// // // //       </div>
// // // //     </div>
// // // //   </div>

// // // //   {messages.length > 0 && (
// // // //     <div className="transcript-border">
// // // //       <div className="transcript">
// // // //         <p
// // // //           key={lastMessage}
// // // //           className={cn(
// // // //             "transition-opacity duration-500 opacity-0",
// // // //             "animate-fadeIn opacity-100"
// // // //           )}
// // // //         >
// // // //           {lastMessage}
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   )}

// // // //   <div className="w-full flex justify-center">
// // // //     {callStatus !== "ACTIVE" ? (
// // // //       <button className="relative btn-call" onClick={handleCall}>
// // // //         <span
// // // //           className={cn(
// // // //             "absolute animate-ping rounded-full opacity-75",
// // // //             callStatus !== "CONNECTING" && "hidden"
// // // //           )}
// // // //         />
// // // //         <span className="relative">
// // // //           {callStatus === "INACTIVE" || callStatus === "FINISHED"
// // // //             ? "Call"
// // // //             : "..."}
// // // //         </span>
// // // //       </button>
// // // //     ) : (
// // // //       <button className="btn-disconnect" onClick={handleDisconnect}>
// // // //         End
// // // //       </button>
// // // //     )}
// // // //   </div>
// // // // </>


// // // // );
// // // // };

// // // // export default Agent;
// // // "use client";

// // // import Image from "next/image";
// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";

// // // import { cn } from "@/lib/utils";
// // // import { vapi } from "@/lib/vapi.sdk";
// // // import { interviewer } from "@/constants";
// // // import { createFeedback } from "@/lib/actions/general.actions";

// // // enum CallStatus {
// // //   INACTIVE = "INACTIVE",
// // //   CONNECTING = "CONNECTING",
// // //   ACTIVE = "ACTIVE",
// // //   FINISHED = "FINISHED",
// // // }

// // // interface SavedMessage {
// // //   role: "user" | "system" | "assistant";
// // //   content: string;
// // // }

// // // const Agent = ({
// // //   userName,
// // //   userId,
// // //   interviewId,
// // //   feedbackId,
// // //   type,
// // //   questions,
// // // }: AgentProps) => {
// // //   const router = useRouter();
// // //   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
// // //   const [messages, setMessages] = useState<SavedMessage[]>([]);
// // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // //   const [lastMessage, setLastMessage] = useState<string>("");

// // //   useEffect(() => {
// // //     const onCallStart = () => {
// // //       setCallStatus(CallStatus.ACTIVE);
// // //     };

// // //     const onCallEnd = () => {
// // //       setCallStatus(CallStatus.FINISHED);
// // //     };

// // //     const onMessage = (message: Message) => {
// // //       if (message.type === "transcript" && message.transcriptType === "final") {
// // //         const newMessage = { role: message.role, content: message.transcript };
// // //         setMessages((prev) => [...prev, newMessage]);
// // //       }
// // //     };

// // //     const onSpeechStart = () => {
// // //       console.log("speech start");
// // //       setIsSpeaking(true);
// // //     };

// // //     const onSpeechEnd = () => {
// // //       console.log("speech end");
// // //       setIsSpeaking(false);
// // //     };

// // //     const onError = (error: Error) => {
// // //       console.log("Error:", error);
// // //     };

// // //     vapi.on("call-start", onCallStart);
// // //     vapi.on("call-end", onCallEnd);
// // //     vapi.on("message", onMessage);
// // //     vapi.on("speech-start", onSpeechStart);
// // //     vapi.on("speech-end", onSpeechEnd);
// // //     vapi.on("error", onError);

// // //     return () => {
// // //       vapi.off("call-start", onCallStart);
// // //       vapi.off("call-end", onCallEnd);
// // //       vapi.off("message", onMessage);
// // //       vapi.off("speech-start", onSpeechStart);
// // //       vapi.off("speech-end", onSpeechEnd);
// // //       vapi.off("error", onError);
// // //     };
// // //   }, []);

// // //   useEffect(() => {
// // //     if (messages.length > 0) {
// // //       setLastMessage(messages[messages.length - 1].content);
// // //     }

// // //     const handleGenerateFeedback = async (messages: SavedMessage[]) => {
// // //       console.log("handleGenerateFeedback");

// // //       const { success, feedbackId: id } = await createFeedback({
// // //         interviewId: interviewId!,
// // //         userId: userId!,
// // //         transcript: messages,
// // //         feedbackId,
// // //       });

// // //       if (success && id) {
// // //         router.push(`/interview/${interviewId}/feedback`);
// // //       } else {
// // //         console.log("Error saving feedback");
// // //         router.push("/");
// // //       }
// // //     };

// // //     if (callStatus === CallStatus.FINISHED) {
// // //       if (type === "generate") {
// // //         router.push("/");
// // //       } else {
// // //         handleGenerateFeedback(messages);
// // //       }
// // //     }
// // //   }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

// // //   const handleCall = async () => {
// // //     setCallStatus(CallStatus.CONNECTING);

// // //     if (type === "generate") {
// // //       await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
// // //         variableValues: {
// // //           username: userName,
// // //           userid: userId,
// // //         },
// // //       });
// // //     } else {
// // //       let formattedQuestions = "";
// // //       if (questions) {
// // //         formattedQuestions = questions
// // //           .map((question) => `- ${question}`)
// // //           .join("\n");
// // //       }

// // //       await vapi.start(interviewer, {
// // //         variableValues: {
// // //           questions: formattedQuestions,
// // //         },
// // //       });
// // //     }
// // //   };

// // //   const handleDisconnect = () => {
// // //     setCallStatus(CallStatus.FINISHED);
// // //     vapi.stop();
// // //   };

// // //   return (
// // //     <>
// // //       <div className="call-view">
// // //         {/* AI Interviewer Card */}
// // //         <div className="card-interviewer">
// // //           <div className="avatar">
// // //             <Image
// // //               src="/ai-avatar.png"
// // //               alt="profile-image"
// // //               width={65}
// // //               height={54}
// // //               className="object-cover"
// // //             />
// // //             {isSpeaking && <span className="animate-speak" />}
// // //           </div>
// // //           <h3>AI Interviewer</h3>
// // //         </div>

// // //         {/* User Profile Card */}
// // //         <div className="card-border">
// // //           <div className="card-content">
// // //             <Image
// // //               src="/user-avatar.png"
// // //               alt="profile-image"
// // //               width={539}
// // //               height={539}
// // //               className="rounded-full object-cover size-[120px]"
// // //             />
// // //             <h3>{userName}</h3>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {messages.length > 0 && (
// // //         <div className="transcript-border">
// // //           <div className="transcript">
// // //             <p
// // //               key={lastMessage}
// // //               className={cn(
// // //                 "transition-opacity duration-500 opacity-0",
// // //                 "animate-fadeIn opacity-100"
// // //               )}
// // //             >
// // //               {lastMessage}
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="w-full flex justify-center">
// // //         {callStatus !== "ACTIVE" ? (
// // //           <button className="relative btn-call" onClick={() => handleCall()}>
// // //             <span
// // //               className={cn(
// // //                 "absolute animate-ping rounded-full opacity-75",
// // //                 callStatus !== "CONNECTING" && "hidden"
// // //               )}
// // //             />

// // //             <span className="relative">
// // //               {callStatus === "INACTIVE" || callStatus === "FINISHED"
// // //                 ? "Call"
// // //                 : ". . ."}
// // //             </span>
// // //           </button>
// // //         ) : (
// // //           <button className="btn-disconnect" onClick={() => handleDisconnect()}>
// // //             End
// // //           </button>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default Agent;


// // "use client";

// // import Image from "next/image";
// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // import { cn } from "@/lib/utils";
// // import { vapi } from "@/lib/vapi.sdk";
// // import { interviewer } from "@/constants";
// // import { createFeedback } from "@/lib/actions/general.actions";

// // enum CallStatus {
// //   INACTIVE = "INACTIVE",
// //   CONNECTING = "CONNECTING",
// //   ACTIVE = "ACTIVE",
// //   FINISHED = "FINISHED",
// // }

// // interface SavedMessage {
// //   role: "user" | "system" | "assistant";
// //   content: string;
// // }

// // const Agent = ({
// //   userName,
// //   userId,
// //   interviewId,
// //   feedbackId,
// //   type,
// //   questions,
// // }: AgentProps) => {
// //   const router = useRouter();
// //   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
// //   const [messages, setMessages] = useState<SavedMessage[]>([]);
// //   const [isSpeaking, setIsSpeaking] = useState(false);
// //   const [lastMessage, setLastMessage] = useState<string>("");

// //   useEffect(() => {
// //     const onCallStart = () => {
// //       setCallStatus(CallStatus.ACTIVE);
// //     };

// //     const onCallEnd = () => {
// //       setCallStatus(CallStatus.FINISHED);
// //     };

// //     const onMessage = (message: Message) => {
// //       if (message.type === "transcript" && message.transcriptType === "final") {
// //         const newMessage = { role: message.role, content: message.transcript };
// //         setMessages((prev) => [...prev, newMessage]);
// //       }
// //     };

// //     const onSpeechStart = () => {
// //       console.log("speech start");
// //       setIsSpeaking(true);
// //     };

// //     const onSpeechEnd = () => {
// //       console.log("speech end");
// //       setIsSpeaking(false);
// //     };

// //     const onError = (error: Error) => {
// //       console.log("Error:", error);
// //     };

// //     vapi.on("call-start", onCallStart);
// //     vapi.on("call-end", onCallEnd);
// //     vapi.on("message", onMessage);
// //     vapi.on("speech-start", onSpeechStart);
// //     vapi.on("speech-end", onSpeechEnd);
// //     vapi.on("error", onError);

// //     return () => {
// //       vapi.off("call-start", onCallStart);
// //       vapi.off("call-end", onCallEnd);
// //       vapi.off("message", onMessage);
// //       vapi.off("speech-start", onSpeechStart);
// //       vapi.off("speech-end", onSpeechEnd);
// //       vapi.off("error", onError);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (messages.length > 0) {
// //       setLastMessage(messages[messages.length - 1].content);
// //     }

// //     const handleGenerateFeedback = async (messages: SavedMessage[]) => {
// //       console.log("handleGenerateFeedback");

// //       const { success, feedbackId: id } = await createFeedback({
// //         interviewId: interviewId!,
// //         userId: userId!,
// //         transcript: messages,
// //         feedbackId,
// //       });

// //       if (success && id) {
// //         router.push(`/interview/${interviewId}/feedback`);
// //       } else {
// //         console.log("Error saving feedback");
// //         router.push("/");
// //       }
// //     };

// //     if (callStatus === CallStatus.FINISHED) {
// //       if (type === "generate") {
// //         router.push("/");
// //       } else {
// //         handleGenerateFeedback(messages);
// //       }
// //     }
// //   }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

// //   const handleCall = async () => {
// //     setCallStatus(CallStatus.CONNECTING);

// //     if (type === "generate") {
// //       await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
// //         variableValues: {
// //           username: userName,
// //           userid: userId,
// //         },
// //       });
// //     } else {
// //       let formattedQuestions = "";
// //       if (questions) {
// //         formattedQuestions = questions
// //           .map((question) => `- ${question}`)
// //           .join("\n");
// //       }

// //       await vapi.start(interviewer, {
// //         variableValues: {
// //           questions: formattedQuestions,
// //         },
// //       });
// //     }
// //   };

// //   const handleDisconnect = () => {
// //     setCallStatus(CallStatus.FINISHED);
// //     vapi.stop();
// //   };

// //   return (
// //     <>
// //       <div className="call-view">
// //         {/* AI Interviewer Card */}
// //         <div className="card-interviewer">
// //           <div className="avatar">
// //             <Image
// //               src="/ai-avatar.png"
// //               alt="profile-image"
// //               width={65}
// //               height={54}
// //               className="object-cover"
// //             />
// //             {isSpeaking && <span className="animate-speak" />}
// //           </div>
// //           <h3>AI Interviewer</h3>
// //         </div>

// //         {/* User Profile Card */}
// //         <div className="card-border">
// //           <div className="card-content">
// //             <Image
// //               src="/user-avatar.png"
// //               alt="profile-image"
// //               width={539}
// //               height={539}
// //               className="rounded-full object-cover size-[120px]"
// //             />
// //             <h3>{userName}</h3>
// //           </div>
// //         </div>
// //       </div>

// //       {messages.length > 0 && (
// //         <div className="transcript-border">
// //           <div className="transcript">
// //             <p
// //               key={lastMessage}
// //               className={cn(
// //                 "transition-opacity duration-500 opacity-0",
// //                 "animate-fadeIn opacity-100"
// //               )}
// //             >
// //               {lastMessage}
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       <div className="w-full flex justify-center">
// //         {callStatus !== "ACTIVE" ? (
// //           <button className="relative btn-call" onClick={() => handleCall()}>
// //             <span
// //               className={cn(
// //                 "absolute animate-ping rounded-full opacity-75",
// //                 callStatus !== "CONNECTING" && "hidden"
// //               )}
// //             />

// //             <span className="relative">
// //               {callStatus === "INACTIVE" || callStatus === "FINISHED"
// //                 ? "Call"
// //                 : ". . ."}
// //             </span>
// //           </button>
// //         ) : (
// //           <button className="btn-disconnect" onClick={() => handleDisconnect()}>
// //             End
// //           </button>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Agent;


// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { vapi } from "@/lib/vapi.sdk";
// import { interviewer } from "@/constants";
// import { createFeedback } from "@/lib/actions/general.actions";

// enum CallStatus {
//   INACTIVE = "INACTIVE",
//   CONNECTING = "CONNECTING",
//   ACTIVE = "ACTIVE",
//   FINISHED = "FINISHED",
// }

// interface SavedMessage {
//   role: "user" | "system" | "assistant";
//   content: string;
// }

// interface AgentProps {
//   userName: string;
//   userId: string;
//   interviewId: string;
//   feedbackId?: string;
//   type: "generate" | "existing";
//   questions?: string[];
// }

// const Agent = ({ userName, userId, interviewId, feedbackId, type, questions }: AgentProps) => {
//   const router = useRouter();
//   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
//   const [messages, setMessages] = useState<SavedMessage[]>([]);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const transcriptRef = useRef<SavedMessage[]>([]);

//   // --- VAPI Event Handlers ---
//   useEffect(() => {
//     const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
//     const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
//     const onMessage = (msg: any) => {
//       if (msg.type === "transcript" && msg.transcriptType === "final") {
//         const newMessage = { role: msg.role, content: msg.transcript };
//         transcriptRef.current.push(newMessage);
//         setMessages(prev => [...prev, newMessage]);
//       }
//     };
//     const onSpeechStart = () => setIsSpeaking(true);
//     const onSpeechEnd = () => setIsSpeaking(false);
//     const onError = (err: Error) => console.error("VAPI ERROR:", err);

//     vapi.on("call-start", onCallStart);
//     vapi.on("call-end", onCallEnd);
//     vapi.on("message", onMessage);
//     vapi.on("speech-start", onSpeechStart);
//     vapi.on("speech-end", onSpeechEnd);
//     vapi.on("error", onError);

//     return () => {
//       vapi.off("call-start", onCallStart);
//       vapi.off("call-end", onCallEnd);
//       vapi.off("message", onMessage);
//       vapi.off("speech-start", onSpeechStart);
//       vapi.off("speech-end", onSpeechEnd);
//       vapi.off("error", onError);
//     };
//   }, []);

//   // --- Handle Feedback After Call Ends ---
//   useEffect(() => {
//     const handleGenerateFeedback = async () => {
//       if (transcriptRef.current.length === 0) return;

//       console.log("📝 Generating Feedback...");
//       try {
//         const { success, feedbackId: id } = await createFeedback({
//           interviewId,
//           userId,
//           transcript: transcriptRef.current,
//           feedbackId,
//         });

//         if (success && id) router.push(`/interview/${interviewId}/feedback`);
//         else router.push("/");
//       } catch (err) {
//         console.error("Feedback generation failed:", err);
//         router.push("/");
//       }
//     };

//     if (callStatus === CallStatus.FINISHED && type !== "generate") {
//       handleGenerateFeedback();
//     }
//   }, [callStatus, feedbackId, interviewId, router, type, userId]);

//   // --- Handle Call Button ---
//   const handleCall = async () => {
//     setCallStatus(CallStatus.CONNECTING);

//     try {
//       if (type === "generate") {
//         console.log("🚀 Starting AI Workflow...");
//         await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
//           variableValues: { username: userName, userid: userId },
//         });
//       } else {
//         let formattedQuestions = "";
//         if (questions) {
//           formattedQuestions = questions.map(q => `- ${q}`).join("\n");
//         }
//         await vapi.start(interviewer, { variableValues: { questions: formattedQuestions } });
//       }
//     } catch (err) {
//       console.error("Call failed:", err);
//       setCallStatus(CallStatus.INACTIVE);
//     }
//   };

//   const handleDisconnect = () => {
//     setCallStatus(CallStatus.FINISHED);
//     vapi.stop();
//   };

//   const lastMessage = messages[messages.length - 1]?.content || "";

//   return (
//     <>
//       <div className="call-view">
//         <div className="card-interviewer">
//           <div className="avatar">
//             <Image src="/ai-avatar.png" alt="AI" width={65} height={54} />
//             {isSpeaking && <span className="animate-speak" />}
//           </div>
//           <h3>AI Interviewer</h3>
//         </div>

//         <div className="card-border">
//           <div className="card-content">
//             <Image src="/user-avatar.png" alt="User" width={120} height={120} className="rounded-full" />
//             <h3>{userName}</h3>
//           </div>
//         </div>
//       </div>

//       {messages.length > 0 && (
//         <div className="transcript-border">
//           <div className="transcript">
//             <p className={cn("transition-opacity duration-500 opacity-0 animate-fadeIn opacity-100")}>
//               {lastMessage}
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="w-full flex justify-center">
//         {callStatus !== CallStatus.ACTIVE ? (
//           <button className="relative btn-call" onClick={handleCall}>
//             <span className={cn("absolute animate-ping rounded-full opacity-75", callStatus !== "CONNECTING" && "hidden")} />
//             <span className="relative">{callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? "Call" : "..."}</span>
//           </button>
//         ) : (
//           <button className="btn-disconnect" onClick={handleDisconnect}>
//             End
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Agent;

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
  userName: string;
  userId: string;
  interviewId: string;
  feedbackId?: string;
  type: "generate" | "existing";
  questions?: string[];
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const transcriptRef = useRef<SavedMessage[]>([]);

  // --- VAPI Event Handlers ---
  useEffect(() => {
    const onCallStart = () => {
      console.log("📞 Call started");
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("📞 Call ended");
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (msg: any) => {
      if (msg.type === "transcript" && msg.transcriptType === "final") {
        const newMessage = { role: msg.role, content: msg.transcript };

        console.log("📝 Transcript message:", newMessage);

        transcriptRef.current.push(newMessage);
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (err: Error) => console.error("❌ VAPI ERROR:", err);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  // --- Handle Feedback After Call Ends ---
  useEffect(() => {
    const handleGenerateFeedback = async () => {
      console.log("📞 Call finished. Full transcript:", transcriptRef.current);

      if (transcriptRef.current.length === 0) {
        console.log("❌ No transcript found. Skipping feedback.");
        return;
      }

      console.log("📝 Generating Feedback...");

      try {
        const result = await createFeedback({
          interviewId,
          userId,
          transcript: transcriptRef.current,
          feedbackId,
        });

        console.log("✅ Feedback API Response:", result);

        if (result.success && result.feedbackId) {
          console.log("🚀 Redirecting to feedback page...");
          router.push(`/interview/${interviewId}/feedback`);
        } else {
          console.log("❌ Feedback creation failed");
          router.push("/");
        }
      } catch (err) {
        console.error("❌ Feedback generation failed:", err);
        router.push("/");
      }
    };

    // ✅ FIXED: Removed wrong condition
    if (callStatus === CallStatus.FINISHED) {
      handleGenerateFeedback();
    }
  }, [callStatus, feedbackId, interviewId, router, userId]);

  // --- Handle Call Button ---
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      if (type === "generate") {
        console.log("🚀 Starting AI Workflow...");
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: { username: userName, userid: userId },
        });
      } else {
        let formattedQuestions = "";
        if (questions) {
          formattedQuestions = questions.map((q) => `- ${q}`).join("\n");
        }

        await vapi.start(interviewer, {
          variableValues: { questions: formattedQuestions },
        });
      }
    } catch (err) {
      console.error("❌ Call failed:", err);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  // ✅ Improved disconnect reliability
  const handleDisconnect = () => {
    console.log("🔴 Manually ending call...");
    vapi.stop();

    setTimeout(() => {
      setCallStatus(CallStatus.FINISHED);
    }, 500);
  };

  const lastMessage = messages[messages.length - 1]?.content || "";

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="AI" width={65} height={54} />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User"
              width={120}
              height={120}
              className="rounded-full"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              className={cn(
                "transition-opacity duration-500 opacity-0 animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call" onClick={handleCall}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === CallStatus.INACTIVE ||
              callStatus === CallStatus.FINISHED
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;