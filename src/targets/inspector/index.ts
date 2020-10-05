import "regenerator-runtime/runtime";
import "./inspector";
import { base64urlToBuffer } from "../../base64url";
import { CredentialCreationOptionsJSON } from "../../basic/json";
import { credentialCreationOptions } from "../../basic/schema";
import { convert } from "../../convert";

const createButton = document.createElement("button");
createButton.textContent = "create";
createButton.addEventListener("click", async () => {
  const json: CredentialCreationOptionsJSON = {
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      rp: { name: "Localhost, Inc." },
      user: {
        id: "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
        name: "test_user",
        displayName: "Test User",
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      excludeCredentials: [],
      authenticatorSelection: { userVerification: "discouraged" },
    },
  };
  const opts = convert(base64urlToBuffer, credentialCreationOptions, json);
  const results = await navigator.credentials.create(opts);
  return results;
});

const getButton = document.createElement("button");
getButton.textContent = "get";
getButton.addEventListener("click", async () => {
  const json: CredentialCreationOptionsJSON = {
    publicKey: {
      challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      rp: { name: "Localhost, Inc." },
      user: {
        id: "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
        name: "test_user",
        displayName: "Test User",
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      excludeCredentials: [],
      authenticatorSelection: { userVerification: "discouraged" },
    },
  };
  const opts = convert(base64urlToBuffer, credentialCreationOptions, json);
  const results = await navigator.credentials.get(opts);
  return results;
});

document.body.append(createButton);
document.body.append(getButton);

// createButton.click();
