import {convertValue as convert, copyValue as copy, optional, required, Schema} from "./schema";

// Shared by `create()` and `get()`.

const publicKeyCredentialDescriptorSchema: Schema = {
  type: required(copy),
  id: required(convert),
  transports: optional(copy),
};

// `navigator.create()` request

export const credentialCreationOptionsSchema: Schema = {
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
    extensions: optional(copy),
  }),
  signal: optional(copy),
};

// `navigator.create()` response

export const publicKeyCredentialWithAttestationSchema: Schema = {
  type: required(copy),
  id: required(copy),
  rawId: required(convert),
  response: required({
    clientDataJSON: required(convert),
    attestationObject: required(convert),
  }),
};

// `navigator.get()` request

export const credentialRequestOptionsSchema: Schema = {
  unmediated: optional(copy),
  mediation: optional(copy),
  publicKey: required({
    challenge: required(convert),
    timeout: optional(copy),
    rpId: optional(copy),
    allowCredentials: optional([publicKeyCredentialDescriptorSchema]),
    userVerification: optional(copy),
    extensions: optional(copy),
  }),
  signal: optional(copy),
};

// `navigator.get()` response

export const publicKeyCredentialWithAssertionSchema: Schema = {
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
