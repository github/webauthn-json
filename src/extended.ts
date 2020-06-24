import { Base64urlString, base64urlToBuffer, bufferToBase64url } from "./base64url";
import { CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, PublicKeyCredentialWithAssertionJSON, PublicKeyCredentialWithAttestationJSON } from "./json";
import { convert, convertValue, copyValue, optional, required, Schema } from "./schema-format";
import { credentialCreationOptions, credentialRequestOptions, publicKeyCredentialWithAssertion, publicKeyCredentialWithAttestation } from "./webauthn-schema";

export { supported } from "./webauthn";
export { schema } from "./webauthn-schema";
export { credentialCreationOptionsExtended };
export { credentialRequestOptionsExtended };

// shared

interface FullWebAuthnExtensionsJSON {
  appid?: string;
  appidExclude?: string;
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
  appidExclude: optional(copyValue),
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
  appidExclude: optional(copyValue),
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

export async function createExtended(requestJSON: CredentialCreationOptionsExtendedJSON): Promise<PublicKeyCredentialWithAttestationExtendedResultsJSON> {
  const request = convert(base64urlToBuffer, credentialCreationOptionsExtended, requestJSON);
  const credential = (await navigator.credentials.create(request)) as PublicKeyCredential;
  const responseJSON: PublicKeyCredentialWithAttestationExtendedResultsJSON = convert(bufferToBase64url, publicKeyCredentialWithAttestation, credential);
  responseJSON.clientExtensionResults = convert(bufferToBase64url, authenticationExtensionsClientOutputsSchema, credential.getClientExtensionResults());
  return responseJSON;
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

export async function getExtended(requestJSON: CredentialRequestOptionsExtendedJSON): Promise<PublicKeyCredentialWithAssertionExtendedResultsJSON> {
  const request = convert(base64urlToBuffer, credentialRequestOptionsExtended, requestJSON);
  const response = (await navigator.credentials.get(request)) as PublicKeyCredential;
  const responseJSON: PublicKeyCredentialWithAssertionExtendedResultsJSON = convert(bufferToBase64url, publicKeyCredentialWithAssertion, response);
  responseJSON.clientExtensionResults = convert(bufferToBase64url, authenticationExtensionsClientOutputsSchema, response.getClientExtensionResults());
  return responseJSON;
}
