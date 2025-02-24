"use strict";var i=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var g=(e,s)=>{for(var o in s)i(e,o,{get:s[o],enumerable:!0})},y=(e,s,o,r)=>{if(s&&typeof s=="object"||typeof s=="function")for(let t of d(s))!u.call(e,t)&&t!==o&&i(e,t,{get:()=>s[t],enumerable:!(r=l(s,t))||r.enumerable});return e};var h=e=>y(i({},"__esModule",{value:!0}),e);var C={};g(C,{handler:()=>A});module.exports=h(C);var A=async e=>{console.log("Lambda started"),console.log("Event:",JSON.stringify(e,null,2));let s={"Access-Control-Allow-Origin":"https://www.asaracing.live","Access-Control-Allow-Credentials":"true","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization,Cookie"};process.on("uncaughtException",o=>{console.error("Uncaught Exception:",o)}),process.on("unhandledRejection",o=>{console.error("Unhandled Rejection:",o)});try{if(e.httpMethod==="OPTIONS")return{statusCode:200,headers:s,body:""};if(e.httpMethod==="GET")return(e.headers.Cookie||"").split(";").find(n=>n.trim().startsWith("accessToken="))?.split("=")[1]?{statusCode:200,headers:s,body:JSON.stringify({valid:!0})}:{statusCode:401,headers:s,body:JSON.stringify({message:"No access token found"})};if(e.httpMethod==="POST"&&e.resource==="/auth/manage-session"){let t=JSON.parse(e.body||"{}"),{accessToken:a,idToken:n}=t;if(!a||!n)return{statusCode:400,headers:s,body:JSON.stringify({message:"Missing required tokens"})};let c=[`accessToken=${a}; HttpOnly; Secure; Domain=.asaracing.live; Path=/; SameSite=None`,`idToken=${n}; HttpOnly; Secure; Domain=.asaracing.live; Path=/; SameSite=None`];return{statusCode:200,headers:{"Access-Control-Allow-Origin":"https://www.asaracing.live","Access-Control-Allow-Credentials":"true","Access-Control-Allow-Headers":"Content-Type,Authorization,Cookie","Access-Control-Allow-Methods":"GET,POST,OPTIONS"},multiValueHeaders:{"Set-Cookie":c},body:JSON.stringify({success:!0})}}if(!e.body)return{statusCode:400,headers:s,body:JSON.stringify({message:"Missing request body"})};let{accessToken:o,idToken:r}=JSON.parse(e.body);return!o||!r?{statusCode:400,headers:s,body:JSON.stringify({message:"Missing required tokens"})}:{statusCode:200,headers:{"Access-Control-Allow-Origin":"https://www.asaracing.live","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers","Access-Control-Allow-Credentials":"true","Access-Control-Max-Age":"300","Set-Cookie":[`accessToken=${o}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`,`idToken=${r}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`].join("; ")},body:JSON.stringify({success:!0})}}catch(o){return console.error("Error in handler:",o),{statusCode:500,headers:s,body:JSON.stringify({message:"Internal server error",error:o instanceof Error?o.message:String(o)})}}finally{console.log("Lambda finished")}};0&&(module.exports={handler});
//# sourceMappingURL=index.js.map
