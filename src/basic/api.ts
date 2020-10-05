import { base64urlToBuffer, bufferToBase64url } from "../base64url";
import { convert } from "../convert";
import {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialWithAssertionJSON,
  PublicKeyCredentialWithAttestationJSON,
  PublicKeyCredentialWithClientExtensionResults,
} from "./json";
import {
  credentialCreationOptions,
  credentialRequestOptions,
  publicKeyCredentialWithAssertion,
  publicKeyCredentialWithAttestation,
} from "./schema";

export function createRequestFromJSON(
  requestJSON: CredentialCreationOptionsJSON,
): CredentialCreationOptions {
  return convert(base64urlToBuffer, credentialCreationOptions, requestJSON);
}

export function createResponseToJSON(
  credential: PublicKeyCredential,
): PublicKeyCredentialWithAttestationJSON {
  const credentialWithClientExtensionResults = credential as PublicKeyCredentialWithClientExtensionResults;
  credentialWithClientExtensionResults.clientExtensionResults = credential.getClientExtensionResults();
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAttestation,
    credentialWithClientExtensionResults,
  );
}

export async function create(
  requestJSON: CredentialCreationOptionsJSON,
): Promise<PublicKeyCredentialWithAttestationJSON> {
  const credential = (await navigator.credentials.create(
    createRequestFromJSON(requestJSON),
  )) as PublicKeyCredential;
  return createResponseToJSON(credential);
}

export function getRequestFromJSON(
  requestJSON: CredentialRequestOptionsJSON,
): CredentialRequestOptions {
  return convert(base64urlToBuffer, credentialRequestOptions, requestJSON);
}

export function getResponseToJSON(
  credential: PublicKeyCredential,
): PublicKeyCredentialWithAssertionJSON {
  const credentialWithClientExtensionResults = credential as PublicKeyCredentialWithClientExtensionResults;
  credentialWithClientExtensionResults.clientExtensionResults = credential.getClientExtensionResults();
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAssertion,
    credentialWithClientExtensionResults,
  );
}

export async function get(
  requestJSON: CredentialRequestOptionsJSON,
): Promise<PublicKeyCredentialWithAssertionJSON> {
  const credential = (await navigator.credentials.get(
    getRequestFromJSON(requestJSON),
  )) as PublicKeyCredential;
  return getResponseToJSON(credential);
}

declare global {
  interface Window {
    PublicKeyCredential: PublicKeyCredential | undefined;
  }
}
