import { Base64urlString, base64urlToBuffer, bufferToBase64url } from "./base64url";
import { CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, PublicKeyCredentialWithAssertionJSON, PublicKeyCredentialWithAttestationJSON, PublicKeyCredentialWithClientExtensionResults } from "./json";
import { convert, convertValue, copyValue, optional, required, Schema } from "./schema-format";
import { credentialCreationOptions, credentialRequestOptions } from "./webauthn-schema";

export { supported } from "./webauthn";
export { schema } from "./webauthn-schema";
export { credentialCreationOptionsExtended };
export { credentialRequestOptionsExtended };

// shared

interface ExtendedExtensionsClientInputsJSON {
  appid?: string;
  appidExclude?: string;
  uvm?: boolean;
  credProps?: {
    first: Base64urlString,
    second?: Base64urlString
  };
  largeBlob?: {
    read?: boolean,
    write?: Base64urlString,
  }
}

interface ExtendedAuthenticationExtensionsClientOutputsJSON {
  appid?: boolean;
  appidExclude?: boolean;
  uvm?: [number, number, number][];
  credProps?: {
    rk: boolean;
  };
  largeBlob?: {
    read?: boolean,
    write?: Base64urlString,
  }
}

const authenticationExtensionsClientInputsSchema: Schema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  uvm: optional(copyValue),
  credProps: optional({
    first: required(convertValue),
    secod: optional(convertValue),
  }),
  largeBlob: optional({
    read: optional(copyValue),
    write: optional(convertValue),
  })
};

const authenticationExtensionsClientOutputsSchema: Schema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  uvm: optional(copyValue),
  credProps: optional(copyValue),
  largeBlob: optional({
    read: optional(copyValue),
    write: optional(convertValue)
  })
};

// create

interface PublicKeyCredentialCreationOptionsExtendedJSON extends PublicKeyCredentialCreationOptionsJSON {
  extensions?: ExtendedExtensionsClientInputsJSON;
}

export interface CredentialCreationOptionsExtendedJSON extends CredentialCreationOptionsJSON {
  publicKey: PublicKeyCredentialCreationOptionsExtendedJSON;
}

export interface PublicKeyCredentialWithAttestationExtendedResultsJSON extends PublicKeyCredentialWithAttestationJSON {
  clientExtensionResults: ExtendedAuthenticationExtensionsClientOutputsJSON;
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
  extensions?: ExtendedExtensionsClientInputsJSON;
}

export interface CredentialRequestOptionsExtendedJSON extends CredentialRequestOptionsJSON {
  publicKey?: PublicKeyCredentialRequestOptionsExtendedJSON;
}

export interface PublicKeyCredentialWithAssertionExtendedResultsJSON extends PublicKeyCredentialWithAssertionJSON {
  clientExtensionResults: ExtendedAuthenticationExtensionsClientOutputsJSON;
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
