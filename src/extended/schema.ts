import {
  credentialCreationOptions,
  credentialRequestOptions,
  publicKeyCredentialWithAssertion,
  publicKeyCredentialWithAttestation,
} from "../basic/schema";
import { convertValue, copyValue, optional, required } from "../convert";
import { Schema } from "../schema-format";

// shared

const authenticationExtensionsClientInputsSchema: Schema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  uvm: optional(copyValue),
  credProps: optional(copyValue),
  largeBlob: optional({
    support: optional(copyValue),
    read: optional(copyValue),
    write: optional(convertValue),
  }),
};

const authenticationExtensionsClientOutputsSchema: Schema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  uvm: optional(copyValue),
  credProps: optional(copyValue),
  largeBlob: optional({
    supported: optional(copyValue),
    blob: optional(convertValue),
    written: optional(copyValue),
  }),
};

// create

export const credentialCreationOptionsExtended: Schema = JSON.parse(
  JSON.stringify(credentialCreationOptions),
);
(credentialCreationOptionsExtended as any).publicKey.schema.extensions = optional(
  authenticationExtensionsClientInputsSchema,
);

export const publicKeyCredentialWithAttestationExtended: Schema = JSON.parse(
  JSON.stringify(publicKeyCredentialWithAttestation),
);
(publicKeyCredentialWithAttestationExtended as any).clientExtensionResults = required(
  authenticationExtensionsClientOutputsSchema,
);
// get

export const credentialRequestOptionsExtended: Schema = JSON.parse(
  JSON.stringify(credentialRequestOptions),
);
(credentialRequestOptionsExtended as any).publicKey.schema.extensions = optional(
  authenticationExtensionsClientInputsSchema,
);

export const publicKeyCredentialWithAssertionExtended: Schema = JSON.parse(
  JSON.stringify(publicKeyCredentialWithAssertion),
);
(publicKeyCredentialWithAssertionExtended as any).clientExtensionResults = required(
  authenticationExtensionsClientOutputsSchema,
);
