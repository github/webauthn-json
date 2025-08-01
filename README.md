⚠️ ⚠️ ⚠️

WebAuthn-json has been sunset. Now that all major browsers support WebAuthn we recommend invoking the native APIs

⚠️ ⚠️ ⚠️

# `@github/webauthn-json`

`@github/webauthn-json` is a client-side Javascript library that serves as convenience wrapper for the the [WebAuthn API](https://www.w3.org/TR/webauthn/) by encoding binary data using [base64url](https://w3c.github.io/webauthn/#sctn-dependencies) (also known as "websafe" or "urlsafe" base64).

The WebAuthn API itself takes input and output values that look almost like JSON, except that binary data is represented as `ArrayBuffer`s. Using `webauthn-json` allows the data to be sent from/to the server as normal JSON without any custom client-side processing. This will be possible [directly in the browser](https://w3c.github.io/webauthn/#sctn-parseCreationOptionsFromJSON) some day, but we're here for you until then.

## Usage

1. Replace calls:
  - `navigator.credentials.create(...)` with `create(parseCreationOptionsFromJSON(...))`.
  - `navigator.credentials.get(...)` with `get(parseRequestOptionsFromJSON(...))`.
2. Encode/decode binary values on the server as base64url.

### Example

Install using:

```shell
npm install --save @github/webauthn-json
```

Then:

```typescript
import {
  create,
  parseCreationOptionsFromJSON,
} from "@github/webauthn-json/browser-ponyfill";

const request = fetch("...");

async function createCredential() {
  const json = await (await request).json();
  const options = parseCreationOptionsFromJSON(json);
  const response = await create(options);
  fetch("...", {
    method: "POST",
    body: JSON.stringify(response),
  });
}
```

See [here](https://github.com/github/webauthn-json/blob/main/src/dev/demo/index.ts) for fully working client-side [demo](https://github.github.com/webauthn-json/demo/) code.

### API (browser ponyfill)

We now recommend using a [ponyfill](https://ponyfill.com/) for the [new JSON-based APIs](https://github.com/w3c/webauthn/issues/1683) in the WebAuthn spec:

```typescript
// @github/webauthn-json/browser-ponyfill

function supported(): boolean;

function parseCreationOptionsFromJSON(json: JSON): CredentialCreationOptions;
function parseRequestOptionsFromJSON(json: JSON): CredentialRequestOptions;

// You can call `.toJSON()` on the result or pass directly to `JSON.stringify()`.
function create(options: CredentialCreationOptions): Promise<PublicKeyCredential>;
// You can call `.toJSON()` on the result or pass directly to `JSON.stringify()`.
function get(options: CredentialRequestOptions): Promise<PublicKeyCredential>;
```

### API (main library)

This was the original simplified API, which remains supported.

```typescript
// @github/webauthn-json

function create(requestJSON: JSON): Promise<JSON>;
function get(requestJSON: JSON): Promise<JSON>;
function supported(): boolean;
```

## Schema

There are are several ways to encode JSON with binary fields. `@github/webauthn-json` focuses on one simple approach: converting the known structure [using a simple (custom) schema format](https://github.com/github/webauthn-json/blob/main/src/webauthn-json/schema-format.ts). `@github/webauthn-json` uses a few tricks for a compact schema encoding: the main build is about ≈1KB when minified and gzipped (although we publish unminified builds).

Right now, we only convert fields explicitly known to be used by the WebAuthn API. This means that you'll have to update to a newer version of this library if you want to use new fields in the future.

To print the current schema, run:

```shell
npx @github/webauthn-json schema
```

## Extensions

Modern browsers generally only support — and most sites only need to use — a small number of [extensions](https://w3c.github.io/webauthn/#sctn-defined-extensions). To save code size, `@github/webauthn-json` only includes the following extensions by default:

- [`appid`](https://w3c.github.io/webauthn/#sctn-appid-extension)
- [`appidExclude`](https://w3c.github.io/webauthn/#sctn-appid-exclude-extension)
- [`credProps`](https://w3c.github.io/webauthn/#sctn-authenticator-credential-properties-extension)

In addition, we handle the following info (that is not technically part of extensions):

- [`transports`](https://w3c.github.io/webauthn/#dom-authenticatorattestationresponse-transports-slot) (on `AuthenticatorAttestationResponse`)[^1]

[^1]: This comes from `getTransports()` on the `AuthenticatorAttestationResponse`. Note that we don't include its three sibling functions (`getAuthenticatorData()`, `getPublicKey()`, and `getPublicKeyAlgorithm()`), since they duplicates information that is available in other parts of the response. In particular, the authenticator data is available inside the signed [attestation object](https://w3c.github.io/webauthn/#attestation-object).


If you need to convert additional input or output extensions, use either of the following:

- `createExtended()` and `getExtended()` from `@github/webauthn-json/extended`.
- `parseExtendedCreationOptionsFromJSON()` and `parseExtendedRequestOptionsFromJSON()` from `@github/webauthn-json/browser-ponyfill/extended`.

## Contributions

The scope of `@github/webauthn-json` is fairly small — it's essentially feature-complete. However, we're happy to accept issues or pull requests that address the core goal of the project!
