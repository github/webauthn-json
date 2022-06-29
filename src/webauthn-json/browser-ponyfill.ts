import {
  createExtendedRequestFromJSON as parseCreationOptionsFromJSON,
  createExtendedResponseToJSON,
  getExtendedRequestFromJSON as parseRequestOptionsFromJSON,
  getExtendedResponseToJSON,
  PublicKeyCredentialWithAssertionExtendedResultsJSON as AuthenticationResponseJSON,
  PublicKeyCredentialWithAttestationExtendedResultsJSON as RegistrationResponseJSON,
  supported,
} from "./extended";

export { parseCreationOptionsFromJSON, parseRequestOptionsFromJSON, supported };
export type { AuthenticationResponseJSON, RegistrationResponseJSON };

export interface RegistrationPublicKeyCredential extends PublicKeyCredential {
  toJSON(): RegistrationResponseJSON;
}

export async function create(
  options: CredentialCreationOptions,
): Promise<RegistrationPublicKeyCredential> {
  const response = (await navigator.credentials.create(
    options,
  )) as RegistrationPublicKeyCredential;
  response.toJSON = () => createExtendedResponseToJSON(response);
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
  response.toJSON = () => getExtendedResponseToJSON(response);
  return response;
}
