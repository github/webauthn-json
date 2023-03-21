# WebAuthn Compat Notes

A document to track more specific nuances than <https://caniuse.com/?search=webauthn>
## macOS

| Functionality | Links | Chrome | Firefox | Safari |
|-|-|-|-|-|
| `residentKey` in `authenticatorSelection` | [spec](https://w3c.github.io/webauthn/#dom-authenticatorselectioncriteria-residentkey) | ✅ 109.0.5414.87 | ❌ 111.0a1 | ✅ 16.2 |
| `PublicKeyCredential.isConditionalMediationAvailable()` | [spec](https://w3c.github.io/webauthn/#dom-publickeycredential-isconditionalmediationavailable), [crbug](https://bugs.chromium.org/p/chromium/issues/detail?id=1330946) | ✅ 109.0.5414.87 | ❌ | ✅ 16+ |
| `largeBlob` extension | [spec](https://w3c.github.io/webauthn/#sctn-large-blob-extension), [crbug](https://bugs.chromium.org/p/chromium/issues/detail?id=1114875&colspec=ID%20Pri%20M%20Status%20Owner%20Summary%20OS%20Modified&x=m&y=releaseblock&cells=tiles&q=largeBlob&can=1), [chromestatus](https://chromestatus.com/feature/5657899357437952) | 🏁[^2][^3] | ❌[^4] | ❌[^4] |
| `authenticatorAttachment` on `PublicKeyCredential` return values | [spec](https://w3c.github.io/webauthn/#dom-publickeycredential-authenticatorattachment) | ✅ 109.0.5414.87 | ❌ 111.0a1 | ✅ 16.2 |
| `parseCreationOptionsFromJSON` and `parseRequestOptionsFromJSON` on `globalThis.PublicKeyCredential` | [spec](https://w3c.github.io/webauthn/#sctn-parseCreationOptionsFromJSON), [crbug](https://bugs.chromium.org/p/chromium/issues/detail?id=1401128), [bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1823782) | ❌ 109.0.5414.87 | ❌ 111.0a1 | ❌ 16.2 |
| Methods on `AuthenticatorAttestationResponse`: `getAuthenticatorData`, `getPublicKey`, `getPublicKeyAlgorithm`, `getTransports` | [spec](https://w3c.github.io/webauthn/#sctn-parseCreationOptionsFromJSON) | ✅ 109.0.5414.87 | ❌ 111.0a1 | ✅ 16.2 |
| Conditional mediation with allowlist | [spec PR](https://github.com/w3c/webauthn/issues/1793) | TODO | TODO | TODO |

[^2]: Flag: `chrome://flags/#enable-experimental-web-platform-features`
[^3]: Works with a YubiKey Bio but not Touch ID.
[^4]: Completely ignores the `largeBlob` extensions (e.g. doesn't fail when passed `largeBlob: {support: "required"}`)

- ✅ Fully implemented and available *without* a custom setting/flag.
- 🏁 Fully implemented and available *only with* a custom setting/flag.
- 🚧 Partially implemented or implementation drafted (may or may not be behind a flag).
- ❌ Unimplemented

## Useful links

- Look up what Chrome versions a commit is in: <https://omahaproxy.appspot.com/> ("Find Releases")
