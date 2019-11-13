import { convertValue as convert, copyValue as copy, optional, required, Schema } from "./schema-format";

// Shared by `create()` and `get()`.

const publicKeyCredentialDescriptorSchema: Schema = {
  type: required(copy),
  id: required(convert),
  transports: optional(copy),
};

const simplifiedExtensionsSchema: Schema = {
  appid: optional(copy),
};

// `navigator.create()` request

export const credentialCreationOptions: Schema = {
  publicKey: required({
    rp: required(copy),
    user: required({
      id: required(convert),
      name: required(copy),
      displayName: required(copy),
      icon: optional(copy),
    }),

    challenge: required(convert),
    pubKeyCredParams: required(copy),

    timeout: optional(copy),
    excludeCredentials: optional([publicKeyCredentialDescriptorSchema]),
    authenticatorSelection: optional(copy),
    attestation: optional(copy),
    extensions: optional(simplifiedExtensionsSchema),
  }),
  signal: optional(copy),
};

// `navigator.create()` response

export const publicKeyCredentialWithAttestation: Schema = {
  type: required(copy),
  id: required(copy),
  rawId: required(convert),
  response: required({
    clientDataJSON: required(convert),
    attestationObject: required(convert),
  }),
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
  }),
  signal: optional(copy),
};

// `navigator.get()` response

export const publicKeyCredentialWithAssertion: Schema = {
  type: required(copy),
  id: required(copy),
  rawId: required(convert),
  response: required({
    clientDataJSON: required(convert),
    authenticatorData: required(convert),
    signature: required(convert),
    userHandle: required(convert),
  }),
};

export const schema: { [s: string]: Schema } = {
  credentialCreationOptions,
  publicKeyCredentialWithAttestation,
  credentialRequestOptions,
  publicKeyCredentialWithAssertion,
};
