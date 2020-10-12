// A minimal example to test `webauthn-json`.
// Note: do not hardcode values in production.

import { PublicKeyCredentialDescriptorJSON } from "../../basic/json";
import { create, get, supported } from "../../index";
import {
  getRegistrations,
  saveRegistration,
  setRegistrations,
  withStatus,
} from "./state";

function registeredCredentials(): PublicKeyCredentialDescriptorJSON[] {
  return getRegistrations().map((reg) => ({
    id: reg.rawId,
    type: reg.type,
  }));
}

async function register(): Promise<void> {
  saveRegistration(
    await create({
      publicKey: {
        challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        rp: { name: "Localhost, Inc." },
        user: {
          id: "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
          name: "test_user",
          displayName: "Test User",
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        excludeCredentials: registeredCredentials(),
        authenticatorSelection: { userVerification: "discouraged" },
        extensions: {
          credProps: true,
        },
      },
    }),
  );
}

async function authenticate(): Promise<void> {
  await get({
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      allowCredentials: registeredCredentials(),
      userVerification: "discouraged",
    },
  });
}

async function clear(): Promise<void> {
  setRegistrations([]);
}

async function testSupported() {
  document.querySelector("#supported .status")!.textContent = "…";
  document.querySelector("#supported .status")!.textContent = supported()
    ? " ✅"
    : " ❌";
}

window.addEventListener("load", () => {
  try {
    document
      .querySelector("#register")!
      .addEventListener("click", withStatus("#register .status", register));
    document
      .querySelector("#authenticate")!
      .addEventListener(
        "click",
        withStatus("#authenticate .status", authenticate),
      );
    document
      .querySelector("#clear")!
      .addEventListener("click", withStatus("#clear .status", clear));
    document
      .querySelector("#supported")!
      .addEventListener("click", testSupported);
  } catch (e) {
    console.error(e);
  }
});
