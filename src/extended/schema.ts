import {
  credentialCreationOptions,
  credentialRequestOptions,
} from "../basic/schema";
import {
  convertValue,
  copyValue,
  optional,
  required,
  Schema,
} from "../schema-format";

// shared

const authenticationExtensionsClientInputsSchema: Schema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  uvm: optional(copyValue),
  credProps: optional({
    first: required(convertValue),
    secod: optional(convertValue),
  }),
  largeBlob: optional({
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
    read: optional(copyValue),
    write: optional(convertValue),
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
  JSON.stringify(credentialCreationOptions),
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
  JSON.stringify(credentialCreationOptions),
);
(publicKeyCredentialWithAssertionExtended as any).clientExtensionResults = required(
  authenticationExtensionsClientOutputsSchema,
);
