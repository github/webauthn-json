import { base64urlToBuffer } from "../src/base64url";
import { credentialCreationOptionsExtended, CredentialCreationOptionsExtendedJSON } from "../src/extended";
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
          id: "TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USER-ID_TEST-USE",
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
          txAuthGeneric: {
            contentType: "image/png",
            content: "IMAGE-IMAGE-IMAGE-IMAGE-IMAGE-IMAGE-IMAGE-I",
          },
        },
      },
    };
    const converted: CredentialCreationOptions = convert(base64urlToBuffer, credentialCreationOptionsExtended, cco);
    expect(converted.publicKey!.extensions!.txAuthGeneric!.content).toEqualBuffer(new Uint8Array([32, 192, 6, 19, 226, 12, 0, 97, 62, 32, 192, 6, 19, 226, 12, 0, 97, 62, 32, 192, 6, 19, 226, 12, 0, 97, 62, 32, 192, 6, 19, 226]));
  });
});
