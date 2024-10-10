import { Schema } from "../schema-format";
import {
  convertValue as convert,
  copyValue as copy,
  derived,
  optional,
  required,
} from "../convert";

// Shared by `create()` and `get()`.

const publicKeyCredentialDescriptorSchema: Schema = {
  type: required(copy),
  id: required(convert),
  transports: optional(copy),
};

const simplifiedExtensionsSchema: Schema = {
  appid: optional(copy),
  appidExclude: optional(copy),
  credProps: optional(copy),
};

const simplifiedClientExtensionResultsSchema = {
  appid: optional(copy),
  appidExclude: optional(copy),
  credProps: optional(copy),
};

// `navigator.create()` request

export const credentialCreationOptions: Schema = {
  publicKey: required({
    rp: required(copy),
    user: required({
      id: required(convert),
      name: required(copy),
      displayName: required(copy),
    }),

    challenge: required(convert),
    pubKeyCredParams: required(copy),

    timeout: optional(copy),
    excludeCredentials: optional([publicKeyCredentialDescriptorSchema]),
    authenticatorSelection: optional(copy),
    attestation: optional(copy),
    extensions: optional(simplifiedExtensionsSchema),
    hints: optional(copy),
  }),
  signal: optional(copy),
};

// `navigator.create()` response

export const publicKeyCredentialWithAttestation: Schema = {
  type: required(copy),
  id: required(copy),
  rawId: required(convert),
  authenticatorAttachment: optional(copy),
  response: required({
    clientDataJSON: required(convert),
    attestationObject: required(convert),
    transports: derived(
      copy,
      (response: any) => response.getTransports?.() || [],
    ),
  }),
  clientExtensionResults: derived(
    simplifiedClientExtensionResultsSchema,
    (pkc: PublicKeyCredential) => pkc.getClientExtensionResults(),
  ),
};

// `navigator.get()` request

export const credentialRequestOptions: Schema = {
  mediation: optional(copy),
  publicKey: required({
    challenge: required(convert),
    timeout: optional(copy),
    rpId: optional(copy),
    allowCredentials: optional([publicKeyCredentialDescriptorSchema]),
    userVerification: optional(copy),
    extensions: optional(simplifiedExtensionsSchema),
    hints: optional(copy),
  }),
  signal: optional(copy),
};

// `navigator.get()` response

export const publicKeyCredentialWithAssertion: Schema = {
  type: required(copy),
  id: required(copy),
  rawId: required(convert),
  authenticatorAttachment: optional(copy),
  response: required({
    clientDataJSON: required(convert),
    authenticatorData: required(convert),
    signature: required(convert),
    userHandle: required(convert),
  }),
  clientExtensionResults: derived(
    simplifiedClientExtensionResultsSchema,
    (pkc: PublicKeyCredential) => pkc.getClientExtensionResults(),
  ),
};

export const schema: { [s: string]: Schema } = {
  credentialCreationOptions,
  publicKeyCredentialWithAttestation,
  credentialRequestOptions,
  publicKeyCredentialWithAssertion,
};
