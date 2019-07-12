import {base64ToBuffer, bufferToBase64} from "../src/base64";
import {CredentialCreationOptionsJSON, CredentialRequestOptionsJSON} from "../src/json";
import {convert} from "../src/schema";
import {credentialCreationOptionsSchema, credentialRequestOptionsSchema, publicKeyCredentialWithAssertionSchema, publicKeyCredentialWithAttestationSchema} from "../src/webauthn-schema";
import "./arraybuffer";

describe("webauthn schema", () => {
  test("converts CredentialCreationOptionsJSON", () => {
    const cco: CredentialCreationOptionsJSON = {
      publicKey: {
        rp: {
          name: "Test Site",
        },
        user: {
          name: "test_user_name",
          displayName: "Test User Display Name",
          id: "TEST+USER+ID/TEST+USER+ID/TEST+USER+ID/TEST+USER+ID/TEST+USER+ID/TEST+USER+ID/TEST+USE==",
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
        ],
        timeout: 30000,
        challenge: "TEST+CHALLENGE/TEST+CHALLENGE/TEST+CHALLENG=",
      },
    };
    const converted = convert(base64ToBuffer, credentialCreationOptionsSchema, cco);
    expect(converted.publicKey.user.name).toBe("test_user_name");
    expect(converted.publicKey.challenge).toEqualBuffer(new Uint8Array([76, 68, 147, 248, 33, 192, 44, 177, 13, 24, 79, 211, 17, 36, 254, 8, 112, 11, 44, 67, 70, 19, 244, 196, 73, 63, 130, 28, 2, 203, 16, 209]));
  });

  test("converts PublicKeyCredentialWithAttestationJSON", () => {
    const pkcwa: PublicKeyCredential = {
      type: "public-key",
      id: "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: new Uint8Array([1, 2, 3, 4]),
      response: {
        clientDataJSON: new Uint8Array([9, 10, 11, 12]),
        attestationObject: new Uint8Array([13, 14, 15, 16]),
      },
    };
    const converted = convert(bufferToBase64, publicKeyCredentialWithAttestationSchema, pkcwa);
    expect(converted).toEqual({
      type: "public-key",
      id: "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: "AQIDBA==",
      response: {
        attestationObject: "DQ4PEA==",
        clientDataJSON: "CQoLDA==",
      },
    });
  });

  test("converts CredentialRequestOptionsJSON", () => {
    const cro: CredentialRequestOptionsJSON = {
      publicKey: {
        timeout: 30000,
        challenge: "TEST+CHALLENGE/TEST+CHALLENGE/TEST+CHALLENG=",
        allowCredentials: [
          {
            type: "public-key",
            id: "CREDENTIAL+ID+1/CREDENTIAL+ID+1/CREDENTIAL+ID+1/CREDENTIAL+ID+1/CREDENTIAL+ID+1/CREDEN==",
          },
          {
            type: "public-key",
            id: "CREDENTIAL+ID+2/CREDENTIAL+ID+2/CREDENTIAL+ID+2/CREDENTIAL+ID+2/CREDENTIAL+ID+2/CREDEN==",
          },
        ],
        rpId: "example.com",
        extensions: {
          appid: "https://example.com/trusted_facets",
        },
      },
    };
    const converted = convert(base64ToBuffer, credentialRequestOptionsSchema, cro);
    expect(converted.publicKey.timeout).toBe(30000);
    expect(converted.publicKey.allowCredentials[0].id).toEqualBuffer(new Uint8Array([9, 17, 3, 16, 212, 200, 0, 191, 136, 15, 237, 127, 9, 17, 3, 16, 212, 200, 0, 191, 136, 15, 237, 127, 9, 17, 3, 16, 212, 200, 0, 191, 136, 15, 237, 127, 9, 17, 3, 16, 212, 200, 0, 191, 136, 15, 237, 127, 9, 17, 3, 16, 212, 200, 0, 191, 136, 15, 237, 127, 9, 17, 3, 16]));
  });

  test("converts PublicKeyCredentialWithAssertionJSON", () => {
    const pkcwa: PublicKeyCredential = {
      type: "public-key",
      id: "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: new Uint8Array([1, 2, 3, 4]),
      response: {
        authenticatorData: new Uint8Array([5, 6, 7, 8]),
        clientDataJSON: new Uint8Array([9, 10, 11, 12]),
        signature: new Uint8Array([13, 14, 15, 16]),
        userHandle: null,
      },
    };
    const converted = convert(bufferToBase64, publicKeyCredentialWithAssertionSchema, pkcwa);
    expect(converted).toEqual({
      type: "public-key",
      id: "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: "AQIDBA==",
      response: {
        authenticatorData: "BQYHCA==",
        clientDataJSON: "CQoLDA==",
        signature: "DQ4PEA==",
        userHandle: null,
      },
    });
  });
});
