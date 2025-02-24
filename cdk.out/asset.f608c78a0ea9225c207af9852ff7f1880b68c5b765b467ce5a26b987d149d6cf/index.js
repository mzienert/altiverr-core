"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// asset-input/src/functions/auth/manage-session/index.ts
var manage_session_exports = {};
__export(manage_session_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(manage_session_exports);
var corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.asaracing.live",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Credentials": "true",
  "Vary": "Origin"
};
var handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ""
    };
  }
  try {
    if (event.resource === "/auth/manage-session/verify") {
      const cookies = event.headers.Cookie || event.headers.cookie;
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          cookiesPresent: !!cookies,
          cookies: cookies ? parseCookies(cookies) : null
        })
      };
    }
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Missing request body" })
      };
    }
    const { accessToken, idToken } = JSON.parse(event.body);
    if (!accessToken || !idToken) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Missing required tokens" })
      };
    }
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Set-Cookie": [
          `accessToken=${accessToken}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`,
          `idToken=${idToken}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`
        ].join("; ")
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Internal server error" })
    };
  }
};
function parseCookies(cookieString) {
  return cookieString.split(";").map((cookie) => cookie.trim()).reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {});
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
