import { assertEquals } from "jsr:@std/assert@1";
import { handleSiaAction, SIA_ACTIONS, SIA_API_VERSION } from "./sia.ts";

Deno.test("sia_capabilities is deterministic and mutation-free", async () => {
  const db = new Proxy({}, { get() { throw new Error("database must not be touched"); } });
  const result = await handleSiaAction(db, "node-test", "sia_capabilities", {});
  assertEquals(result, {
    ok: true,
    node_id: "node-test",
    api_version: SIA_API_VERSION,
    actions: SIA_ACTIONS,
  });
});

Deno.test("unknown action falls through", async () => {
  assertEquals(await handleSiaAction({}, "node-test", "not_sia", {}), null);
});
