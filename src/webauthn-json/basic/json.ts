import { Base64urlString } from "../base64url";

// Intermediate type needed for attaching client outputs to WebAuthn API call
// results before converting to JSON.

interface CredPropsAuthenticationExtensionsClientOutputsJSON {
  rk: boolean;
}

interface AuthenticationExtensionsClientOutputsJSON
  extends AuthenticationExtensionsClientOutputs {
  appidExclude?: boolean;
  credProps?: CredPropsAuthenticationExtensionsClientOutputsJSON;
}

type PublicKeyCredentialWithOptionalAuthenticatorAttachment =
  Partial<PublicKeyCredential> &
    Omit<PublicKeyCredential, "authenticatorAttachment">;

export interface PublicKeyCredentialWithClientExtensionResults
  extends PublicKeyCredentialWithOptionalAuthenticatorAttachment {
  authenticatorAttachment?: string | null;
  clientExtensionResults?: AuthenticationExtensionsClientOutputsJSON;
}

// Shared

type AuthenticatorTransportJSON = AuthenticatorTransport | "hybrid";

export interface PublicKeyCredentialDescriptorJSON {
  type: PublicKeyCredentialType;
  id: Base64urlString;
  transports?: AuthenticatorTransportJSON[];
}

interface SimpleWebAuthnExtensionsJSON {
  appid?: string;
  appidExclude?: string;
  credProps?: boolean;
}

interface SimpleClientExtensionResultsJSON {
  appid?: boolean;
  appidExclude?: boolean;
  credProps?: CredPropsAuthenticationExtensionsClientOutputsJSON;
}

interface PublicKeyCredentialJSON {
  id: string;
  type: PublicKeyCredentialType;
  rawId: Base64urlString;
  // TODO: This field is technically not optional in the spec, but Firefox hasn't implemented it.
  authenticatorAttachment?: AuthenticatorAttachment | null;
}

// `navigator.create()` request

interface PublicKeyCredentialUserEntityJSON extends PublicKeyCredentialEntity {
  displayName: string;
  id: Base64urlString;
}

type ResidentKeyRequirement = "discouraged" | "preferred" | "required";

interface AuthenticatorSelectionCriteriaJSON
  extends AuthenticatorSelectionCriteria {
  residentKey?: ResidentKeyRequirement;
}

export interface PublicKeyCredentialCreationOptionsJSON {
  rp: PublicKeyCredentialRpEntity;
  user: PublicKeyCredentialUserEntityJSON;
  challenge: Base64urlString;
  pubKeyCredParams: PublicKeyCredentialParameters[];
  timeout?: number;
  excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
  authenticatorSelection?: AuthenticatorSelectionCriteriaJSON;
  attestation?: AttestationConveyancePreference;
  extensions?: SimpleWebAuthnExtensionsJSON;
}

export interface CredentialCreationOptionsJSON {
  publicKey: PublicKeyCredentialCreationOptionsJSON;
  signal?: AbortSignal;
}

// `navigator.create()` response

export interface AuthenticatorAttestationResponseJSON {
  clientDataJSON: Base64urlString;
  attestationObject: Base64urlString;
  transports: AuthenticatorTransportJSON[];
}

export interface PublicKeyCredentialWithAttestationJSON
  extends PublicKeyCredentialJSON {
  response: AuthenticatorAttestationResponseJSON;
  clientExtensionResults: SimpleClientExtensionResultsJSON;
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

export interface PublicKeyCredentialWithAssertionJSON
  extends PublicKeyCredentialJSON {
  response: AuthenticatorAssertionResponseJSON;
  clientExtensionResults: SimpleClientExtensionResultsJSON;
}
