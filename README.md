# `@github/webauthn-json`

`webauthn-json` is a client-side Javascript library that serves as convenience wrapper for the the [WebAuthn API](https://www.w3.org/TR/webauthn/) by encoding binary data using [base64url](https://w3c.github.io/webauthn/#sctn-dependencies) (also known as "websafe" or "urlsafe" base64).

The WebAuthn API itself takes input and output values that look almost like JSON, except that binary data is represented as `ArrayBuffer`s. Using `webauthn-json` allows the data to be sent from/to the server as normal JSON without client-side processing.

## Usage

1) Replace calls to `navigator.credentials.create()` with `create()`, and `navigator.credentials.get()` with `get()`.
2) Encode/decode binary values on the server as base64url.

### Example

Install using:

```shell
npm install --save @github/webauthn-json
```

Then:

```typescript
import {create} from "@github/webauthn-json"

async auth() {
  const request = await fetch("...");
  const response = create(request.json());
  await fetch("...", {
    method: "POST",
    body: JSON.stringify(response)
  });
}
```

See [here](https://github.com/github/webauthn-json/blob/gh-pages/src/src/index.ts) for fully working client-side [demo](https://github.github.com/webauthn-json/demo/) code.

### API

```typescript
function create(requestJSON: JSON): Promise<JSON>;
function get(requestJSON: JSON): Promise<JSON>;
function supported(): boolean;
```

## Schema

There are are several ways to encode JSON with binary fields. `webauthn-json` focuses on one simple approach: converting the known structure [using a simple (custom) schema format](https://github.com/github/webauthn-json/blob/master/src/webauthn-schema.ts). `webauthn-json` uses a few tricks for a compact schema encoding: the production build is about ≈2KB uncompressed (<1KB gzipped).

Right now, we only convert fields explicitly known to be used by the WebAuthn API. This means that you'll have to update to a newer version of this library if you want to use new fields in the future.

To print the current schema, run:

```shell
npx @github/webauthn-json schema
```

## Contributions

The scope of `webauthn-json` is fairly small — it's essentially feature-complete. However, we're happy to accept issues or pull requests that address the core goal of the project!
