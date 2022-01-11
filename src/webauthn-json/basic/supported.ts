// This function does a simple check to test for the credential management API
// functions we need, and an indication of public key credential authentication
// support.
// https://developers.google.com/web/updates/2018/03/webauthn-credential-management

export function supported(): boolean {
  return !!(
    navigator.credentials &&
    navigator.credentials.create &&
    navigator.credentials.get &&
    window.PublicKeyCredential
  );
}
