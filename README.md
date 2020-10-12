# `@github/webauthn-json`

`@github/webauthn-json` is a client-side Javascript library that serves as convenience wrapper for the the [WebAuthn API](https://www.w3.org/TR/webauthn/) by encoding binary data using [base64url](https://w3c.github.io/webauthn/#sctn-dependencies) (also known as "websafe" or "urlsafe" base64).

The WebAuthn API itself takes input and output values that look almost like JSON, except that binary data is represented as `ArrayBuffer`s. Using `webauthn-json` allows the data to be sent from/to the server as normal JSON without client-side processing.

## Usage

1. Replace calls to `navigator.credentials.create()` with `create()`, and `navigator.credentials.get()` with `get()`.
2. Encode/decode binary values on the server as base64url.

### Example

Install using:

```shell
npm install --save @github/webauthn-json
```

Then:

```typescript
import {create} from "@github/webauthn-json"

const authRequest = fetch("...");
async auth() {
  const authResponse = await create((await authRequest).json());
  await fetch("...", {
    method: "POST",
    body: JSON.stringify(authResponse)
  });
}
```

See [here](https://github.com/github/webauthn-json/blob/main/src/targets/demo/index.ts) for fully working client-side [demo](https://github.github.com/webauthn-json/demo/) code.

### API

```typescript
function create(requestJSON: JSON): Promise<JSON>;
function get(requestJSON: JSON): Promise<JSON>;
function supported(): boolean;
```

## Schema

There are are several ways to encode JSON with binary fields. `@github/webauthn-json` focuses on one simple approach: converting the known structure [using a simple (custom) schema format](https://github.com/github/webauthn-json/blob/main/src/schema-format.ts). `@github/webauthn-json` uses a few tricks for a compact schema encoding: the production build is about ≈2KB uncompressed (<1KB gzipped).

Right now, we only convert fields explicitly known to be used by the WebAuthn API. This means that you'll have to update to a newer version of this library if you want to use new fields in the future.

To print the current schema, run:

```shell
npx @github/webauthn-json schema
```

## Extensions

Modern browsers generally only support — and most sites only need to use — a small number of [extensions](https://w3c.github.io/webauthn/#sctn-defined-extensions). To save code size, `@github/webauthn-json` only includes the following extensions by default:

- `appid`
- `appidExclude`
- [`credProps`](https://w3c.github.io/webauthn/#sctn-authenticator-credential-properties-extension)

If you need to convert additional input or output extensions, use `createExtended()` and `getExtended()` from `@github/webauthn-json/extended`.

## Contributions

The scope of `@github/webauthn-json` is fairly small — it's essentially feature-complete. However, we're happy to accept issues or pull requests that address the core goal of the project!
