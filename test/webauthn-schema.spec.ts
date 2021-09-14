import { base64urlToBuffer, bufferToBase64url } from "../src/base64url";
import {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialWithClientExtensionResults,
} from "../src/basic/json";
import {
  credentialCreationOptions,
  credentialRequestOptions,
  publicKeyCredentialWithAssertion,
  publicKeyCredentialWithAttestation,
} from "../src/basic/schema";
import { convert } from "../src/convert";
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
          appidExclude: "https://example.com/trusted_facets",
          credProps: true,
        },
      },
    };
    const converted = convert(
      base64urlToBuffer,
      credentialCreationOptions,
      cco,
    );
    expect(converted.publicKey.user.name).toBe("test_user_name");
    expect(converted.publicKey.challenge).toEqualBuffer(
      new Uint8Array([
        76,
        68,
        147,
        248,
        33,
        192,
        44,
        177,
        13,
        24,
        79,
        211,
        17,
        36,
        254,
        8,
        112,
        11,
        44,
        67,
        70,
        19,
        244,
        196,
        73,
        63,
        130,
        28,
        2,
        203,
        16,
        209,
      ]),
    );
  });

  test("converts PublicKeyCredentialWithAttestationJSON", () => {
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
          credProps: {
            rk: true,
          },
        } as AuthenticationExtensionsClientOutputs),
    };
    const converted = convert(
      bufferToBase64url,
      publicKeyCredentialWithAttestation,
      pkcwa,
    );
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
        credProps: {
          rk: true,
        },
      },
    });
  });

  test("converts PublicKeyCredentialWithAttestationJSON in browsers without getTransports()", () => {
    const pkcwa: PublicKeyCredentialWithClientExtensionResults = {
      type: "public-key",
      id:
        "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: new Uint8Array([1, 2, 3, 4]),
      response: {
        clientDataJSON: new Uint8Array([9, 10, 11, 12]),
        attestationObject: new Uint8Array([13, 14, 15, 16]),
      } as AuthenticatorAttestationResponse,
      getClientExtensionResults: () =>
        ({
          appidExclude: true,
          credProps: {
            rk: true,
          },
        } as AuthenticationExtensionsClientOutputs),
    };
    const converted = convert(
      bufferToBase64url,
      publicKeyCredentialWithAttestation,
      pkcwa,
    );
    expect(converted).toEqual({
      type: "public-key",
      id:
        "URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENTIAL_ID-URL_SAFE_BASE_64_CREDENT",
      rawId: "AQIDBA",
      response: {
        attestationObject: "DQ4PEA",
        clientDataJSON: "CQoLDA",
        transports: [],
      },
      clientExtensionResults: {
        appidExclude: true,
        credProps: {
          rk: true,
        },
      },
    });
  });

  test("converts CredentialRequestOptionsJSON", () => {
    const cro: CredentialRequestOptionsJSON = {
      publicKey: {
        timeout: 30000,
        challenge: "TEST-CHALLENGE_TEST-CHALLENGE_TEST-CHALLENG",
        allowCredentials: [
          {
            type: "public-key",
            id:
              "CREDENTIAL-ID-1_CREDENTIAL-ID-1_CREDENTIAL-ID-1_CREDENTIAL-ID-1_CREDENTIAL-ID-1_CREDEN",
          },
          {
            type: "public-key",
            id:
              "CREDENTIAL-ID-2_CREDENTIAL-ID-2_CREDENTIAL-ID-2_CREDENTIAL-ID-2_CREDENTIAL-ID-2_CREDEN",
          },
        ],
        rpId: "example.com",
        extensions: {
          appid: "https://example.com/trusted_facets",
        },
      },
    };
    const converted = convert(base64urlToBuffer, credentialRequestOptions, cro);
    expect(converted.publicKey.timeout).toBe(30000);
    expect(converted.publicKey.allowCredentials[0].id).toEqualBuffer(
      new Uint8Array([
        9,
        17,
        3,
        16,
        212,
        200,
        0,
        191,
        136,
        15,
        237,
        127,
        9,
        17,
        3,
        16,
        212,
        200,
        0,
        191,
        136,
        15,
        237,
        127,
        9,
        17,
        3,
        16,
        212,
        200,
        0,
        191,
        136,
        15,
        237,
        127,
        9,
        17,
        3,
        16,
        212,
        200,
        0,
        191,
        136,
        15,
        237,
        127,
        9,
        17,
        3,
        16,
        212,
        200,
        0,
        191,
        136,
        15,
        237,
        127,
        9,
        17,
        3,
        16,
      ]),
    );
  });

  test("converts PublicKeyCredentialWithAssertionJSON", () => {
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
      getClientExtensionResults: () => ({
        appid: true,
      }),
    };
    const converted = convert(
      bufferToBase64url,
      publicKeyCredentialWithAssertion,
      pkcwa,
    );
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
        appid: true,
      },
    });
  });
});
