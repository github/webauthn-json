import {Base64urlString} from "./base64url";

// Shared

export interface PublicKeyCredentialDescriptorJSON {
  type: PublicKeyCredentialType;
  id: Base64urlString;
  transports?: AuthenticatorTransport[];
}

// `navigator.create()` request

// TODO(https://github.com/DefinitelyTyped/DefinitelyTyped/pull/36590): Change
// this back to `PublicKeyCredentialRpEntity`.
interface CorrectedPublicKeyCredentialRpEntity {
  id?: string;
  name: string;
  icon?: string;
}

interface PublicKeyCredentialUserEntityJSON {
  id: Base64urlString;
  name: string;
  icon?: string;
  displayName: string;
}

interface PublicKeyCredentialCreationOptionsJSON {
  rp: CorrectedPublicKeyCredentialRpEntity;
  user: PublicKeyCredentialUserEntityJSON;

  challenge: Base64urlString;
  pubKeyCredParams: PublicKeyCredentialParameters[];

  timeout?: number;
  excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  attestation?: AttestationConveyancePreference;
  extensions?: any;
}

export interface CredentialCreationOptionsJSON {
  publicKey: PublicKeyCredentialCreationOptionsJSON;
  signal?: AbortSignal;
}

// `navigator.create()` response

interface AuthenticatorAttestationResponseJSON {
  clientDataJSON: Base64urlString;
  attestationObject: Base64urlString;
}

export interface PublicKeyCredentialWithAttestationJSON {
  type: PublicKeyCredentialType;
  rawId: Base64urlString;
  response: AuthenticatorAttestationResponseJSON;
}

// `navigator.get()` request

interface PublicKeyCredentialRequestOptionsJSON {
  challenge: Base64urlString;
  timeout?: number;
  rpId?: string;
  allowCredentials?: PublicKeyCredentialDescriptorJSON[];
  userVerification?: UserVerificationRequirement;
  extensions?: any;
}

export interface CredentialRequestOptionsJSON {
  unmediated?: boolean;
  mediation?: "silent" | "optional" | "required";
  publicKey: PublicKeyCredentialRequestOptionsJSON;
  signal?: AbortSignal;
}

// `navigator.get()` response

interface AuthenticatorAssertionResponseJSON {
  clientDataJSON: Base64urlString;
  authenticatorData: Base64urlString;
  signature: Base64urlString;
  userHandle: Base64urlString | null;
}

export interface PublicKeyCredentialWithAssertionJSON {
  type: PublicKeyCredentialType;
  id: string;
  rawId: Base64urlString;
  response: AuthenticatorAssertionResponseJSON;
}
