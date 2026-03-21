import Vapi from "@vapi-ai/web"; 

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);


// import Vapi from "@vapi-ai/web";

// export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
// // import Vapi from "@vapi-ai/web";

// // const vapiToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

// // // ✅ Log on startup so we can see if token is loading correctly
// // if (!vapiToken) {
// //   console.error("❌ NEXT_PUBLIC_VAPI_WEB_TOKEN is missing from .env.local!");
// // } else {
// //   console.log("✅ VAPI token loaded:", vapiToken.substring(0, 8) + "...");
// // }

// // export const vapi = new Vapi(vapiToken!);     