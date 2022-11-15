// This function does a simple check to test for the credential management API
// functions we need, and an indication of public key credential authentication
// support.
// https://developers.google.com/web/updates/2018/03/webauthn-credential-management

export function supported(): boolean {
  // rome-ignore format: Work around https://github.com/rome/tools/issues/3734
  return !!(
    // rome-ignore lint(style/useOptionalChain): Optional chaining creates more complicated ES2019 code
    navigator.credentials &&
    navigator.credentials.create &&
    navigator.credentials.get &&
    window.PublicKeyCredential
  );
}
