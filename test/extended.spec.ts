import { base64urlToBuffer } from "../src/base64url";
import { CredentialCreationOptionsExtendedJSON } from "../src/extended/json";
import { credentialCreationOptionsExtended } from "../src/extended/schema";
import { convert } from "../src/schema-format";
import "./arraybuffer";

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
});
