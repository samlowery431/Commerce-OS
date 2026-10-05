const API = process.env.COMMERCE_OS_NODE_API;
const TOKEN = process.env.COMMERCE_OS_NODE_TOKEN;
const NODE = process.env.COMMERCE_OS_NODE_ID;

if (!API || !TOKEN || !NODE) throw new Error("MISSING_COMMERCE_OS_CONFIGURATION");

const response = await fetch(API, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({ action: "sia_capabilities", node_id: NODE }),
});
const text = await response.text();
console.log("HTTP", response.status);
console.log(text.slice(0, 4000));
if (!response.ok) process.exitCode = 1;
