import {base64urlToBuffer, bufferToBase64url} from "./base64url";
import {CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, PublicKeyCredentialWithAssertionJSON, PublicKeyCredentialWithAttestationJSON} from "./json";
import {convert} from "./schema-format";
import {credentialCreationOptions, credentialRequestOptions, publicKeyCredentialWithAssertion, publicKeyCredentialWithAttestation} from "./webauthn-schema";

export async function create(requestJSON: CredentialCreationOptionsJSON): Promise<PublicKeyCredentialWithAttestationJSON> {
  const request = convert(base64urlToBuffer, credentialCreationOptions, requestJSON);
  const credential = (await navigator.credentials.create(request)) as PublicKeyCredential;
  return convert(bufferToBase64url, publicKeyCredentialWithAttestation, credential);
}

export async function get(requestJSON: CredentialRequestOptionsJSON): Promise<PublicKeyCredentialWithAssertionJSON> {
  const request = convert(base64urlToBuffer, credentialRequestOptions, requestJSON);
  const response = (await navigator.credentials.get(request)) as PublicKeyCredential;
  return convert(bufferToBase64url, publicKeyCredentialWithAssertion, response);
}

declare global {
  interface Window {
    PublicKeyCredential: any | undefined;
  }
}

// This function does a simple check to test for the credential management API
// functions we need, and an indication of public key credential authentication
// support.
// https://developers.google.com/web/updates/2018/03/webauthn-credential-management
export function supported(): boolean {
  return !!(navigator.credentials && navigator.credentials.create && navigator.credentials.get && window.PublicKeyCredential);
}
