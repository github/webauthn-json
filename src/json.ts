import {Base64String} from "./base64";

// Shared

export interface PublicKeyCredentialDescriptorJSON {
  type: PublicKeyCredentialType;
  id: Base64String;
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
  id: Base64String;
  name: string;
  icon?: string;
  displayName: string;
}

interface PublicKeyCredentialCreationOptionsJSON {
  rp: CorrectedPublicKeyCredentialRpEntity;
  user: PublicKeyCredentialUserEntityJSON;

  challenge: Base64String;
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
  clientDataJSON: Base64String;
  attestationObject: Base64String;
}

export interface PublicKeyCredentialWithAttestationJSON {
  type: PublicKeyCredentialType;
  rawId: Base64String;
  response: AuthenticatorAttestationResponseJSON;
}

// `navigator.get()` request

interface PublicKeyCredentialRequestOptionsJSON {
  challenge: Base64String;
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
  clientDataJSON: Base64String;
  authenticatorData: Base64String;
  signature: Base64String;
  userHandle: Base64String | null;
}

export interface PublicKeyCredentialWithAssertionJSON {
  type: PublicKeyCredentialType;
  id: string;
  rawId: Base64String;
  response: AuthenticatorAssertionResponseJSON;
}
