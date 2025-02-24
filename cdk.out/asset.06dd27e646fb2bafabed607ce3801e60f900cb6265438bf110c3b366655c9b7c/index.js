"use strict";var i=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var l=Object.prototype.hasOwnProperty;var u=(s,e)=>{for(var o in e)i(s,o,{get:e[o],enumerable:!0})},g=(s,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of d(e))!l.call(s,t)&&t!==o&&i(s,t,{get:()=>e[t],enumerable:!(r=c(e,t))||r.enumerable});return s};var h=s=>g(i({},"__esModule",{value:!0}),s);var S={};u(S,{handler:()=>y});module.exports=h(S);var y=async s=>{console.log("Lambda started"),console.log("Event:",JSON.stringify(s,null,2));let e={"Access-Control-Allow-Origin":"https://www.asaracing.live","Access-Control-Allow-Credentials":"true","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"};process.on("uncaughtException",o=>{console.error("Uncaught Exception:",o)}),process.on("unhandledRejection",o=>{console.error("Unhandled Rejection:",o)});try{if(s.httpMethod==="OPTIONS")return{statusCode:200,headers:e,body:""};if(s.httpMethod==="GET")return(s.headers.Cookie||"").split(";").find(n=>n.trim().startsWith("accessToken="))?.split("=")[1]?{statusCode:200,headers:e,body:JSON.stringify({valid:!0})}:{statusCode:401,headers:e,body:JSON.stringify({message:"No access token found"})};if(s.httpMethod==="POST"&&s.resource==="/auth/manage-session"){let t=JSON.parse(s.body||"{}"),{accessToken:a,idToken:n}=t;if(!a||!n)return{statusCode:400,headers:e,body:JSON.stringify({message:"Missing required tokens"})};let m=[`accessToken=${a}; Domain=.asaracing.live; Path=/; Secure; SameSite=None`,`idToken=${n}; Domain=.asaracing.live; Path=/; Secure; SameSite=None`];return{statusCode:200,headers:e,body:JSON.stringify({success:!0,accessTokenCookie:`accessToken=${a}; Domain=.asaracing.live; Path=/; Secure; SameSite=None`,idTokenCookie:`idToken=${n}; Domain=.asaracing.live; Path=/; Secure; SameSite=None`})}}if(!s.body)return{statusCode:400,headers:e,body:JSON.stringify({message:"Missing request body"})};let{accessToken:o,idToken:r}=JSON.parse(s.body);return!o||!r?{statusCode:400,headers:e,body:JSON.stringify({message:"Missing required tokens"})}:{statusCode:200,headers:{"Access-Control-Allow-Origin":"https://www.asaracing.live","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers","Access-Control-Allow-Credentials":"true","Access-Control-Max-Age":"300","Set-Cookie":[`accessToken=${o}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`,`idToken=${r}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`].join("; ")},body:JSON.stringify({success:!0})}}catch(o){return console.error("Error in handler:",o),{statusCode:500,headers:e,body:JSON.stringify({message:"Internal server error",error:o instanceof Error?o.message:String(o)})}}finally{console.log("Lambda finished")}};0&&(module.exports={handler});
//# sourceMappingURL=index.js.map
