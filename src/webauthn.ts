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
