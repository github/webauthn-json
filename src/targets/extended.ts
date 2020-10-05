// Basic

export * from "../index";

export {
  createRequestFromJSON,
  createResponseToJSON,
  getRequestFromJSON,
  getResponseToJSON,
} from "../basic/api";

import type {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialWithAssertionJSON,
  PublicKeyCredentialWithAttestationJSON,
} from "../basic/json";

export type {
  CredentialCreationOptionsJSON,
  PublicKeyCredentialWithAttestationJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialWithAssertionJSON,
};

// Extended

export {
  createExtended,
  createExtendedRequestFromJSON,
  createExtendedResponseToJSON,
  getExtended,
  getExtendedRequestFromJSON,
  getExtendedResponseToJSON,
} from "../extended/api";

import type {
  CredentialCreationOptionsExtendedJSON,
  CredentialRequestOptionsExtendedJSON,
  PublicKeyCredentialWithAssertionExtendedResultsJSON,
  PublicKeyCredentialWithAttestationExtendedResultsJSON,
} from "../extended/json";

export type {
  CredentialCreationOptionsExtendedJSON,
  CredentialRequestOptionsExtendedJSON,
  PublicKeyCredentialWithAssertionExtendedResultsJSON,
  PublicKeyCredentialWithAttestationExtendedResultsJSON,
};

// Conversion

export { base64urlToBuffer, bufferToBase64url } from "../base64url";
export { convert } from "../convert";
export { schema } from "../basic/schema";
