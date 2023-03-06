// A minimal example to test `webauthn-json`.
// Note: do not hardcode values in production.

import { type PublicKeyCredentialDescriptorJSON } from "../../webauthn-json";
import {
  getRegistrations,
  saveRegistration,
  setRegistrations,
  withStatus,
} from "./state";
import {
  parseCreationOptionsFromJSON,
  create,
  get,
  parseRequestOptionsFromJSON,
  supported,
  AuthenticationPublicKeyCredential,
} from "../../webauthn-json/browser-ponyfill";

function registeredCredentials(): PublicKeyCredentialDescriptorJSON[] {
  return getRegistrations().map((reg) => ({
    id: reg.rawId,
    type: reg.type,
  }));
}

async function register(): Promise<void> {
  const cco = parseCreationOptionsFromJSON({
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      rp: { name: "Localhost, Inc." },
      user: {
        id: "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
        name: "test_user",
        displayName: "Test User",
      },
      pubKeyCredParams: [],
      excludeCredentials: registeredCredentials(),
      authenticatorSelection: { userVerification: "discouraged" },
      extensions: {
        credProps: true,
      },
    },
  });
  saveRegistration(await create(cco));
}

async function authenticate(options?: {
  conditionalMediation?: boolean;
}): Promise<AuthenticationPublicKeyCredential> {
  const cro = parseRequestOptionsFromJSON({
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      allowCredentials: registeredCredentials(),
      userVerification: "discouraged",
    },
  });
  return get(cro);
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

    if (
      new URL(location.href).searchParams.get(
        "conditional-mediation-prompt-on-load",
      ) === "true"
    ) {
      authenticate({ conditionalMediation: true }).then(console.log);
    }
  } catch (e) {
    console.error(e);
  }
});
