"use strict";exports.handler=async t=>{let{session:e,request:n}=t;return n.userNotFound?{isValid:!1,failAuthentication:!0}:e.length===0?{challengeName:"CUSTOM_CHALLENGE",issueTokens:!1,failAuthentication:!1}:e.length===1&&e[0].challengeName==="CUSTOM_CHALLENGE"?e[0].challengeResult===!0?{issueTokens:!0,failAuthentication:!1}:{issueTokens:!1,failAuthentication:!0}:{issueTokens:!1,failAuthentication:!0}};
//# sourceMappingURL=index.js.map
