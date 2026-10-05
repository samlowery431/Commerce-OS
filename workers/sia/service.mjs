import { CommerceNodeApi } from "./api-client.mjs";
const api = new CommerceNodeApi();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
console.log("Commerce OS SIA Worker V0.1 starting");
while (true) {
  try {
    const c = await api.call("sia_capabilities");
    if (c.api_version !== "sia_node_v0_1") throw new Error("UNSUPPORTED_SIA_API");
    console.log("SIA_READY", c.api_version);
    await sleep(900000);
  } catch (e) {
    console.error("SIA_LOOP_ERROR", e?.message || e);
    await sleep(60000);
  }
}
