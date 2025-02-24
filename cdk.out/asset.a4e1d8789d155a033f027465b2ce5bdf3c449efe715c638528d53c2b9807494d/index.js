"use strict";var n=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var y=Object.prototype.hasOwnProperty;var g=(s,e)=>{for(var o in e)n(s,o,{get:e[o],enumerable:!0})},h=(s,e,o,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of u(e))!y.call(s,r)&&r!==o&&n(s,r,{get:()=>e[r],enumerable:!(t=d(e,r))||t.enumerable});return s};var A=s=>h(n({},"__esModule",{value:!0}),s);var O={};g(O,{handler:()=>S});module.exports=A(O);var S=async s=>{let e={"Access-Control-Allow-Origin":"https://www.asaracing.live","Access-Control-Allow-Credentials":"true","Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"};console.log("Lambda started"),console.log("Event:",JSON.stringify(s,null,2)),process.on("uncaughtException",o=>{console.error("Uncaught Exception:",o)}),process.on("unhandledRejection",o=>{console.error("Unhandled Rejection:",o)});try{if(s.httpMethod==="OPTIONS")return{statusCode:200,headers:e,body:""};if(s.resource==="/auth/manage-session/verify"){let r=s.headers.Cookie||s.headers.cookie;return{statusCode:200,headers:e,body:JSON.stringify({cookiesPresent:!!r,cookies:r?C(r):null})}}if(s.httpMethod==="POST"&&s.resource==="/auth/manage-session"){let r=JSON.parse(s.body||"{}"),{accessToken:a,idToken:i}=r;if(!a||!i)return{statusCode:400,headers:e,body:JSON.stringify({message:"Missing required tokens"})};let c="HttpOnly; Secure; SameSite=None; Domain=asaracing.live; Path=/",l=[`accessToken=${a}; ${c}`,`idToken=${i}; ${c}`];return{statusCode:200,headers:{...e,"Set-Cookie":l},body:JSON.stringify({success:!0})}}if(!s.body)return{statusCode:400,headers:e,body:JSON.stringify({message:"Missing request body"})};let{accessToken:o,idToken:t}=JSON.parse(s.body);return!o||!t?{statusCode:400,headers:e,body:JSON.stringify({message:"Missing required tokens"})}:{statusCode:200,headers:{"Access-Control-Allow-Origin":"https://www.asaracing.live","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers","Access-Control-Allow-Credentials":"true","Access-Control-Max-Age":"300","Set-Cookie":[`accessToken=${o}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`,`idToken=${t}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`].join("; ")},body:JSON.stringify({success:!0})}}catch(o){return console.error("Error in handler:",o),{statusCode:500,headers:e,body:JSON.stringify({message:"Internal server error",error:o instanceof Error?o.message:String(o)})}}finally{console.log("Lambda finished")}};function C(s){return s.split(";").map(e=>e.trim()).reduce((e,o)=>{let[t,r]=o.split("=");return e[t]=r,e},{})}0&&(module.exports={handler});
//# sourceMappingURL=index.js.map
