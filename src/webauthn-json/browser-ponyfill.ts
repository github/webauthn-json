import {
  createRequestFromJSON as parseCreationOptionsFromJSON,
  createResponseToJSON,
  getRequestFromJSON as parseRequestOptionsFromJSON,
  getResponseToJSON,
} from "./basic/api";
import { supported } from "./basic/supported";

import {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialWithAssertionJSON as AuthenticationResponseJSON,
  PublicKeyCredentialWithAttestationJSON as RegistrationResponseJSON,
} from "./basic/json";

export { parseCreationOptionsFromJSON, parseRequestOptionsFromJSON, supported };
export type {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
};

export interface RegistrationPublicKeyCredential extends PublicKeyCredential {
  toJSON(): RegistrationResponseJSON;
}

export async function create(
  options: CredentialCreationOptions,
): Promise<RegistrationPublicKeyCredential> {
  const response = (await navigator.credentials.create(
    options,
  )) as RegistrationPublicKeyCredential;
  response.toJSON = () => createResponseToJSON(response);
  return response;
}

export interface AuthenticationPublicKeyCredential extends PublicKeyCredential {
  toJSON(): AuthenticationResponseJSON;
}

export async function get(
  options: CredentialRequestOptions,
): Promise<AuthenticationPublicKeyCredential> {
  const response = (await navigator.credentials.get(
    options,
  )) as AuthenticationPublicKeyCredential;
  response.toJSON = () => getResponseToJSON(response);
  return response;
}
