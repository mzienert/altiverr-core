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
var handler = async (event) => {
  if (event.resource === "/auth/session/verify") {
    const cookies = event.headers.Cookie || event.headers.cookie;
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
        "Access-Control-Allow-Credentials": "true"
      },
      body: JSON.stringify({
        cookiesPresent: !!cookies,
        cookies: cookies ? parseCookies(cookies) : null
      })
    };
  }
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing request body" })
      };
    }
    const { accessToken, idToken } = JSON.parse(event.body);
    console.log("Received tokens:", {
      accessTokenLength: accessToken?.length,
      idTokenLength: idToken?.length
    });
    if (!accessToken || !idToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required tokens" })
      };
    }
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1e3,
      path: "/"
      // Added to ensure cookies are sent for all paths
    };
    const cookies = [
      `accessToken=${accessToken}; ${serializeCookieOptions(cookieOptions)}`,
      `idToken=${idToken}; ${serializeCookieOptions(cookieOptions)}`
    ];
    console.log("Setting cookies:", cookies);
    const allowedOrigins = (process.env.ALLOWED_ORIGIN || "").split(",");
    const origin = event.headers.origin || event.headers.Origin;
    const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": cookies.join("; "),
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Credentials": "true"
      },
      body: JSON.stringify({
        success: true,
        cookiesSet: cookies.length
      })
    };
  } catch (error) {
    console.error("Session management error:", error);
    return {
      statusCode: 500,
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
function serializeCookieOptions(options) {
  const parts = [];
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.maxAge) parts.push(`Max-Age=${Math.floor(options.maxAge / 1e3)}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.path) parts.push(`Path=${options.path}`);
  return parts.join("; ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
