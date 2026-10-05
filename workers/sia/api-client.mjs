export class CommerceNodeApi {
  constructor(env = process.env) {
    this.url = env.COMMERCE_OS_NODE_API;
    this.token = env.COMMERCE_OS_NODE_TOKEN;
    this.nodeId = env.COMMERCE_OS_NODE_ID;
    if (!this.url || !this.token || !this.nodeId) {
      throw new Error("MISSING_COMMERCE_OS_CONFIGURATION");
    }
  }

  async call(action, extra = {}) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ action, node_id: this.nodeId, ...extra }),
    });
    const text = await response.text();
    let payload;
    try { payload = text ? JSON.parse(text) : {}; }
    catch { throw new Error(`API_INVALID_JSON_${response.status}`); }
    if (!response.ok) throw new Error(`API_${response.status}: ${JSON.stringify(payload)}`);
    return payload;
  }
}
