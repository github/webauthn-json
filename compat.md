# WebAuthn Compat Notes

A document to track more specific nuances than <https://caniuse.com/?search=webauthn>
## macOS

| Functionality | Links | Chrome | Firefox | Safari |
|-|-|-|-|-|
| `PublicKeyCredential.isConditionalMediationAvailable()` | [spec](https://w3c.github.io/webauthn/#dom-publickeycredential-isconditionalmediationavailable), [crbug](https://bugs.chromium.org/p/chromium/issues/detail?id=1330946) | 🏁 106.0.5220.0+[^1] | ❌ | ✅ 16+ |

[^1]: Flag: `chrome://flags/#webauthn-conditional-ui`

- ✅ Fully implemented and available *without* a custom setting/flag.
- 🏁 Fully implemented and available *only with* a custom setting/flag.
- 🚧 Partially implemented or implementation drafted (may or may not be behind a flag).
- ❌ Unimplemented

## Useful links

- Look up what Chrome versions a commit is in: <https://omahaproxy.appspot.com/> ("Find Releases")
