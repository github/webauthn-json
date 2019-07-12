import {credentialCreationOptionsSchema, publicKeyCredentialWithAttestationSchema, credentialRequestOptionsSchema, publicKeyCredentialWithAssertionSchema} from "../src/webauthn-schema"

console.log(JSON.stringify({
  credentialCreationOptionsSchema, 
  publicKeyCredentialWithAttestationSchema,
  credentialRequestOptionsSchema,
  publicKeyCredentialWithAssertionSchema
}, null, "  "));
