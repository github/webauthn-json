// A minimal example to test `webauthn-json`.
// Note: do not hardcode values in production.

import {create, get} from "@github/webauthn-json"
import { addRegistration, getRegistrations, setRegistrations, withStatus } from "./state";

async function register(): Promise<void> {
  addRegistration(await create({
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      rp: {name: "Localhost, Inc."},
      user: {id: "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", name: "test_user", displayName: "Test User"},
      pubKeyCredParams: [{type: "public-key", alg: -7}],
      excludeCredentials: getRegistrations().map((reg) => ({
        id: reg.rawId,
        type: reg.type
      }))
    }
  }));
}

async function authenticate(): Promise<void> {
  await get({
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      allowCredentials: getRegistrations().map((reg) => ({
        id: reg.rawId,
        type: reg.type
      }))
    }
  });
}

async function clear(): Promise<void> {
  setRegistrations([]);
}

window.addEventListener("load", function() {
  document.querySelector("#register").addEventListener("click", withStatus("#register .status", register));
  document.querySelector("#authenticate").addEventListener("click", withStatus("#authenticate .status", authenticate));
  document.querySelector("#clear").addEventListener("click", withStatus("#clear .status", clear));
})
