import { base64urlToBuffer } from "./base64url";
import { CredentialCreationOptionsExtendedJSON } from "./extended/json";
import { PublicKeyCredentialWithClientExtensionResults } from "./basic/json";
import { credentialCreationOptionsExtended } from "./extended/schema";
import {
  createExtendedResponseToJSON,
  getExtendedResponseToJSON,
} from "./extended/api";
import { convert } from "./convert";
import "./arraybuffer.jest";

describe("extended schema", () => {
  test("converts CredentialCreationOptionsExtendedJSON", () => {
    const cco: CredentialCreationOptionsExtendedJSON = {
      publicKey: {
        rp: {
          name: "Test Site",
        },
        user: {
          name: "test_user_name",
          displayName: "Test User Display Name",
          id:
            "TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USE",
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
        ],
        timeout: 30000,
        challenge: "TEST-CHALLENGE_TEST-CHALLENGE_TEST-CHALLENG",
        extensions: {
          largeBlob: {
            write: "LARGE-BLOB-LARGE-BLOB-LARGE-BLOB-LARGE-BLOB",
          },
        },
      },
    };
    // TODO: The type here should be `CredentialCreationOptions`, but the built-in TypeScript types don't contain `largeBlob` yet.
    const converted = convert(
      base64urlToBuffer,
      credentialCreationOptionsExtended,
      cco,
    );
    expect(converted.publicKey!.extensions!.largeBlob!.write).toEqualBuffer(
      new Uint8Array([
        0x2c,
        0x04,
        0x46,
        0x13,
        0xe0,
        0x4b,
        0x38,
        0x1f,
        0x8b,
        0x01,
        0x11,
        0x84,
        0xf8,
        0x12,
        0xce,
        0x07,
        0xe2,
        0xc0,
        0x44,
        0x61,
        0x3e,
        0x04,
        0xb3,
        0x81,
        0xf8,
        0xb0,
        0x11,
        0x18,
        0x4f,
        0x81,
        0x2c,
        0xe0,
      ]),
    );
  });

  test("converts PublicKeyCredentialWithClientExtensionResults with attestation", () => {
    const pkcwa: PublicKeyCredentialWithClientExtensionResults = {
      type: "public-key",
      id:
        "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: new Uint8Array([1, 2, 3, 4]),
      response: {
        clientDataJSON: new Uint8Array([9, 10, 11, 12]),
        attestationObject: new Uint8Array([13, 14, 15, 16]),
        getTransports: () => ["usb"],
      } as AuthenticatorAttestationResponse,
      getClientExtensionResults: () =>
        ({
          appidExclude: true,
          largeBlob: {
            supported: true,
          },
        } as AuthenticationExtensionsClientOutputs),
    };
    const converted = createExtendedResponseToJSON(pkcwa);
    expect(converted).toEqual({
      type: "public-key",
      id:
        "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: "AQIDBA",
      response: {
        attestationObject: "DQ4PEA",
        clientDataJSON: "CQoLDA",
        transports: ["usb"],
      },
      clientExtensionResults: {
        appidExclude: true,
        largeBlob: {
          supported: true,
        },
      },
    });
  });

  test("converts PublicKeyCredentialWithClientExtensionResults with assertion", () => {
    const pkcwa: PublicKeyCredentialWithClientExtensionResults = {
      type: "public-key",
      id:
        "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: new Uint8Array([1, 2, 3, 4]),
      response: {
        authenticatorData: new Uint8Array([5, 6, 7, 8]),
        clientDataJSON: new Uint8Array([9, 10, 11, 12]),
        signature: new Uint8Array([13, 14, 15, 16]),
        userHandle: null,
      } as AuthenticatorAssertionResponse,
      getClientExtensionResults: () =>
        ({
          largeBlob: {
            written: true,
          },
        } as AuthenticationExtensionsClientOutputs),
    };
    const converted = getExtendedResponseToJSON(pkcwa);
    expect(converted).toEqual({
      type: "public-key",
      id:
        "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: "AQIDBA",
      response: {
        authenticatorData: "BQYHCA",
        clientDataJSON: "CQoLDA",
        signature: "DQ4PEA",
        userHandle: null,
      },
      clientExtensionResults: {
        largeBlob: {
          written: true,
        },
      },
    });
  });
});
