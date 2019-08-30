// A minimal example to test `webauthn-json`.
// Note: do not hardcode values in production.

import { create, get } from "@github/webauthn-json"
import { saveRegistration, getRegistrations, setRegistrations, withStatus } from "./state";
import { PublicKeyCredentialDescriptorJSON } from "@github/webauthn-json/dist/src/json";

function registeredCredentials(): PublicKeyCredentialDescriptorJSON[] {
  return getRegistrations().map((reg) => ({
    id: reg.rawId,
    type: reg.type
  }))
}

async function register(): Promise<void> {
  saveRegistration(await create({
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      rp: { name: "Localhost, Inc." },
      user: { id: "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", name: "test_user", displayName: "Test User" },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      excludeCredentials: registeredCredentials()
    }
  }));
}

async function authenticate(): Promise<void> {
  await get({
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      allowCredentials: registeredCredentials()
    }
  });
}

async function clear(): Promise<void> {
  setRegistrations([]);
}

window.addEventListener("load", function () {
  try {
    document.querySelector("#register").addEventListener("click", withStatus("#register .status", register));
    document.querySelector("#authenticate").addEventListener("click", withStatus("#authenticate .status", authenticate));
    document.querySelector("#clear").addEventListener("click", withStatus("#clear .status", clear));
  } catch (e) {
    console.error(e);
  }
})
