"use strict";var a=Object.defineProperty;var i=Object.getOwnPropertyDescriptor;var o=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var r=(n,e)=>{for(var s in e)a(n,s,{get:e[s],enumerable:!0})},h=(n,e,s,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of o(e))!u.call(n,t)&&t!==s&&a(n,t,{get:()=>e[t],enumerable:!(l=i(e,t))||l.enumerable});return n};var f=n=>h(a({},"__esModule",{value:!0}),n);var g={};r(g,{handler:()=>c});module.exports=f(g);var c=async n=>{let{session:e,request:s}=n;return s.userNotFound?{isValid:!1,failAuthentication:!0,issueTokens:!1}:e.length===0?{challengeName:"CUSTOM_CHALLENGE",issueTokens:!1,failAuthentication:!1}:e.length===1&&e[0].challengeName==="CUSTOM_CHALLENGE"?e[0].challengeResult===!0?{issueTokens:!0,failAuthentication:!1}:{issueTokens:!1,failAuthentication:!0}:{issueTokens:!1,failAuthentication:!0}};0&&(module.exports={handler});
//# sourceMappingURL=index.js.map
