import {
  base64urlToBuffer,
  bufferToBase64url,
  Base64urlString,
} from "../base64url";
import { convert } from "../convert";
import { AuthenticatorAttestationResponseJSON } from "../basic/json";
import {
  CredentialCreationOptionsExtendedJSON,
  CredentialRequestOptionsExtendedJSON,
  PublicKeyCredentialWithAssertionExtendedResultsJSON,
  PublicKeyCredentialWithAttestationExtendedResultsJSON,
  AuthenticatorAttestationResponseExtendedJSONCallable,
  AuthenticatorAttestationResponseExtendedJSONCallablePartial,
} from "./json";
import {
  credentialCreationOptionsExtended,
  credentialRequestOptionsExtended,
  publicKeyCredentialWithAssertionExtended,
  publicKeyCredentialWithAttestationExtended,
} from "./schema";

// create

export function createExtendedRequestFromJSON(
  requestJSON: CredentialCreationOptionsExtendedJSON,
): CredentialCreationOptions {
  return convert(
    base64urlToBuffer,
    credentialCreationOptionsExtended,
    requestJSON,
  );
}

export function createExtendedResponseToJSON(
  credential: PublicKeyCredential,
): PublicKeyCredentialWithAttestationExtendedResultsJSON {
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAttestationExtended,
    credential,
  );
}

interface AuthenticatorAttestationResponseExtendedCallablePartial {
  getTransports?: () => string[];
  getAuthenticatorData?: () => ArrayBuffer;
  getPublicKey?: () => ArrayBuffer | null;
  getPublicKeyAlgorithm?: () => COSEAlgorithmIdentifier;
}

function makeCallable(
  jsonResponse: AuthenticatorAttestationResponseJSON,
  credentialResponse: AuthenticatorAttestationResponseExtendedCallablePartial,
): AuthenticatorAttestationResponseExtendedJSONCallable {
  const callable: AuthenticatorAttestationResponseExtendedJSONCallablePartial = {};

  if (credentialResponse.getTransports) {
    callable.getTransports = (): string[] => {
      return credentialResponse.getTransports();
    };
  }

  if (credentialResponse.getAuthenticatorData) {
    callable.getAuthenticatorData = (): Base64urlString => {
      return bufferToBase64url(credentialResponse.getAuthenticatorData());
    };
  }

  if (credentialResponse.getPublicKey) {
    callable.getPublicKey = (): Base64urlString => {
      const publicKey = credentialResponse.getPublicKey();
      return publicKey && bufferToBase64url(publicKey);
    };
  }

  if (credentialResponse.getPublicKeyAlgorithm) {
    callable.getPublicKeyAlgorithm = (): COSEAlgorithmIdentifier => {
      return credentialResponse.getPublicKeyAlgorithm();
    };
  }

  const newJSON = Object.create(callable);
  Object.assign(newJSON, jsonResponse);
  return newJSON;
}

export async function createExtended(
  requestJSON: CredentialCreationOptionsExtendedJSON,
): Promise<PublicKeyCredentialWithAttestationExtendedResultsJSON> {
  const credential = (await navigator.credentials.create(
    createExtendedRequestFromJSON(requestJSON),
  )) as PublicKeyCredential;
  const json = createExtendedResponseToJSON(credential);
  json.response = makeCallable(
    json.response,
    credential.response as AuthenticatorAttestationResponseExtendedCallablePartial,
  );
  return json;
}

// get

export function getExtendedRequestFromJSON(
  requestJSON: CredentialRequestOptionsExtendedJSON,
): CredentialRequestOptions {
  return convert(
    base64urlToBuffer,
    credentialRequestOptionsExtended,
    requestJSON,
  );
}

export function getExtendedResponseToJSON(
  credential: PublicKeyCredential,
): PublicKeyCredentialWithAssertionExtendedResultsJSON {
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAssertionExtended,
    credential,
  );
}

export async function getExtended(
  requestJSON: CredentialRequestOptionsExtendedJSON,
): Promise<PublicKeyCredentialWithAssertionExtendedResultsJSON> {
  const credential = (await navigator.credentials.get(
    getExtendedRequestFromJSON(requestJSON),
  )) as PublicKeyCredential;
  return getExtendedResponseToJSON(credential);
}
