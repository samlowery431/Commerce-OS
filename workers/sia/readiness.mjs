import { CommerceNodeApi } from "./api-client.mjs";

const api = new CommerceNodeApi();
const capabilities = await api.call("sia_capabilities");
if (capabilities.api_version !== "sia_node_v0_1") {
  throw new Error(`UNSUPPORTED_SIA_API:${capabilities.api_version}`);
}
console.log("SIA_READY", capabilities.api_version);
