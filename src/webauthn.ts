import {base64ToBuffer, bufferToBase64} from "./base64";
import {CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, PublicKeyCredentialWithAssertionJSON, PublicKeyCredentialWithAttestationJSON} from "./json";
import {convert} from "./schema";
import {credentialCreationOptionsSchema, credentialRequestOptionsSchema, publicKeyCredentialWithAssertionSchema, publicKeyCredentialWithAttestationSchema} from "./webauthn-schema";

export async function create(requestJSON: CredentialCreationOptionsJSON): Promise<PublicKeyCredentialWithAttestationJSON> {
  const request = convert(base64ToBuffer, credentialCreationOptionsSchema, requestJSON);
  const credential = (await navigator.credentials.create(request)) as PublicKeyCredential;
  return convert(bufferToBase64, publicKeyCredentialWithAttestationSchema, credential);
}

export async function get(requestJSON: CredentialRequestOptionsJSON): Promise<PublicKeyCredentialWithAssertionJSON> {
  const request = convert(base64ToBuffer, credentialRequestOptionsSchema, requestJSON);
  const response = (await navigator.credentials.get(request)) as PublicKeyCredential;
  return convert(bufferToBase64, publicKeyCredentialWithAssertionSchema, response);
}
