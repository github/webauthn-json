import { Base64urlString } from "./base64url";

// Shared

export interface PublicKeyCredentialDescriptorJSON {
  type: PublicKeyCredentialType;
  id: Base64urlString;
  transports?: AuthenticatorTransport[];
}

interface SimpleWebAuthnExtensionsJSON {
  appid?: string;
  appidExclude?: string;
}

// `navigator.create()` request

interface PublicKeyCredentialUserEntityJSON extends PublicKeyCredentialEntity {
  displayName: string;
  id: Base64urlString;
}

export interface PublicKeyCredentialCreationOptionsJSON {
  rp: PublicKeyCredentialRpEntity;
  user: PublicKeyCredentialUserEntityJSON;

  challenge: Base64urlString;
  pubKeyCredParams: PublicKeyCredentialParameters[];

  timeout?: number;
  excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  attestation?: AttestationConveyancePreference;
  extensions?: SimpleWebAuthnExtensionsJSON;
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
  id: string;
  type: PublicKeyCredentialType;
  rawId: Base64urlString;
  response: AuthenticatorAttestationResponseJSON;
}

// `navigator.get()` request

export interface PublicKeyCredentialRequestOptionsJSON {
  challenge: Base64urlString;
  timeout?: number;
  rpId?: string;
  allowCredentials?: PublicKeyCredentialDescriptorJSON[];
  userVerification?: UserVerificationRequirement;
  extensions?: SimpleWebAuthnExtensionsJSON;
}

export interface CredentialRequestOptionsJSON {
  mediation?: CredentialMediationRequirement;
  publicKey?: PublicKeyCredentialRequestOptionsJSON;
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
