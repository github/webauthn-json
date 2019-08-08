import {base64urlToBuffer, bufferToBase64url} from "./base64url";
import {CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, PublicKeyCredentialWithAssertionJSON, PublicKeyCredentialWithAttestationJSON} from "./json";
import {convert} from "./schema";
import {credentialCreationOptionsSchema, credentialRequestOptionsSchema, publicKeyCredentialWithAssertionSchema, publicKeyCredentialWithAttestationSchema} from "./webauthn-schema";

export async function create(requestJSON: CredentialCreationOptionsJSON): Promise<PublicKeyCredentialWithAttestationJSON> {
  const request = convert(base64urlToBuffer, credentialCreationOptionsSchema, requestJSON);
  const credential = (await navigator.credentials.create(request)) as PublicKeyCredential;
  return convert(bufferToBase64url, publicKeyCredentialWithAttestationSchema, credential);
}

export async function get(requestJSON: CredentialRequestOptionsJSON): Promise<PublicKeyCredentialWithAssertionJSON> {
  const request = convert(base64urlToBuffer, credentialRequestOptionsSchema, requestJSON);
  const response = (await navigator.credentials.get(request)) as PublicKeyCredential;
  return convert(bufferToBase64url, publicKeyCredentialWithAssertionSchema, response);
}
