import { Base64urlString, base64urlToBuffer, bufferToBase64url } from "./base64url";
import { CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, PublicKeyCredentialWithAssertionJSON, PublicKeyCredentialWithAttestationJSON, PublicKeyCredentialWithClientExtensionResults } from "./json";
import { convert, convertValue, copyValue, optional, required, Schema } from "./schema-format";
import { credentialCreationOptions, credentialRequestOptions } from "./webauthn-schema";

export { supported } from "./webauthn";
export { schema } from "./webauthn-schema";
export { credentialCreationOptionsExtended };
export { credentialRequestOptionsExtended };

// shared

interface FullWebAuthnExtensionsJSON {
  appid?: string;
  txAuthSimple?: string;
  txAuthGeneric?: {
    contentType: string;
    content: Base64urlString;
  };
  authnSel?: Base64urlString[];
  exts?: boolean;
  uvi?: boolean;
  loc?: boolean;
  uvm?: boolean;
  authenticatorBiometricPerfBounds?: {
    FAR: number;
    FRR: number;
  };
}

const authenticationExtensionsClientInputsSchema: Schema = {
  appid: optional(copyValue),
  txAuthSimple: optional(copyValue),
  txAuthGeneric: optional({
    contentType: required(copyValue),
    content: required(convertValue),
  }),
  authnSel: optional([convertValue]),
  exts: optional(copyValue),
  uvi: optional(copyValue),
  loc: optional(copyValue),
  uvm: optional(copyValue),
  authenticatorBiometricPerfBounds: optional(copyValue),
};

const authenticationExtensionsClientOutputsSchema: Schema = {
  appid: optional(copyValue),
  authnSel: optional(copyValue),
  exts: optional(copyValue),
  loc: optional(copyValue),
  txAuthGeneric: optional(convertValue),
  txAuthSimple: optional(copyValue),
  uvi: optional(convertValue),
  uvm: optional(copyValue),
};

// create

interface PublicKeyCredentialCreationOptionsExtendedJSON extends PublicKeyCredentialCreationOptionsJSON {
  extensions?: FullWebAuthnExtensionsJSON;
}

export interface CredentialCreationOptionsExtendedJSON extends CredentialCreationOptionsJSON {
  publicKey: PublicKeyCredentialCreationOptionsExtendedJSON;
}

export interface PublicKeyCredentialWithAttestationExtendedResultsJSON extends PublicKeyCredentialWithAttestationJSON {
  clientExtensionResults: AuthenticationExtensionsClientOutputs;
}

const credentialCreationOptionsExtended: Schema = JSON.parse(JSON.stringify(credentialCreationOptions));
(credentialCreationOptionsExtended as any).publicKey.schema.extensions = optional(authenticationExtensionsClientInputsSchema);

const publicKeyCredentialWithAttestationExtended: Schema = JSON.parse(JSON.stringify(credentialCreationOptions));
(publicKeyCredentialWithAttestationExtended as any).clientExtensionResults = required(authenticationExtensionsClientOutputsSchema);

export async function createExtended(requestJSON: CredentialCreationOptionsExtendedJSON): Promise<PublicKeyCredentialWithAttestationExtendedResultsJSON> {
  const request = convert(base64urlToBuffer, credentialCreationOptionsExtended, requestJSON);
  const credential = (await navigator.credentials.create(request)) as PublicKeyCredentialWithClientExtensionResults;
  credential.clientExtensionResults = credential.getClientExtensionResults();
  return convert(bufferToBase64url, publicKeyCredentialWithAttestationExtended, credential);
}

// get

interface PublicKeyCredentialRequestOptionsExtendedJSON extends PublicKeyCredentialRequestOptionsJSON {
  extensions?: FullWebAuthnExtensionsJSON;
}

export interface CredentialRequestOptionsExtendedJSON extends CredentialRequestOptionsJSON {
  publicKey?: PublicKeyCredentialRequestOptionsExtendedJSON;
}

export interface PublicKeyCredentialWithAssertionExtendedResultsJSON extends PublicKeyCredentialWithAssertionJSON {
  clientExtensionResults: AuthenticationExtensionsClientOutputs;
}

const credentialRequestOptionsExtended: Schema = JSON.parse(JSON.stringify(credentialRequestOptions));
(credentialRequestOptionsExtended as any).publicKey.schema.extensions = optional(authenticationExtensionsClientInputsSchema);

const publicKeyCredentialWithAssertionExtended: Schema = JSON.parse(JSON.stringify(credentialCreationOptions));
(publicKeyCredentialWithAssertionExtended as any).clientExtensionResults = required(authenticationExtensionsClientOutputsSchema);

export async function getExtended(requestJSON: CredentialRequestOptionsExtendedJSON): Promise<PublicKeyCredentialWithAssertionExtendedResultsJSON> {
  const request = convert(base64urlToBuffer, credentialRequestOptionsExtended, requestJSON);
  const response = (await navigator.credentials.get(request)) as PublicKeyCredentialWithClientExtensionResults;
  response.clientExtensionResults = response.getClientExtensionResults();
  return convert(bufferToBase64url, publicKeyCredentialWithAssertionExtended, response);
}
