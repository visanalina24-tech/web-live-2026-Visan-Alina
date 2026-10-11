import assert from "node:assert/strict";
import test from "node:test";
import { fetchWithPolicy } from "../public/fetch-policy.js";
test("zero reîncercări înseamnă o încercare, iar opțiunile rămân neschimbate", async () => {
  let calls = 0;
  const options = {
    fetchImpl: async () => {
      calls++;
      throw Error("offline");
    },
    retries: 0,
    setTimer: () => 9,
    clearTimer: () => {},
  };
  await assert.rejects(() => fetchWithPolicy("/x", options));
  assert.equal(calls, 1);
  assert.equal(options.retries, 0);
});
