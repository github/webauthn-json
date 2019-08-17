import { PublicKeyCredentialWithAttestationJSON } from "@github/webauthn-json";

export function getRegistrations(): PublicKeyCredentialWithAttestationJSON[] {
  const registrations = JSON.parse(localStorage.webauthnExampleRegistrations || "[]");
  return registrations;
}

export function setRegistrations(registrations: PublicKeyCredentialWithAttestationJSON[], display: boolean = true): void {
  localStorage.webauthnExampleRegistrations = JSON.stringify(registrations, null, "  ");
  displayRegistrations();
}

export function addRegistration(registration: PublicKeyCredentialWithAttestationJSON): void {
  const registrations = getRegistrations();
  registrations.push(registration);
  setRegistrations(registrations);
}

function registrationElem(): HTMLTextAreaElement {
  return document.querySelector("#registrations");
}

export function displayRegistrations() {
  registrationElem().value = JSON.stringify(getRegistrations(), null, "  ");
}

export function withStatus(selector: string, fn: () => Promise<void>) {
  return async function() {
    document.querySelector(selector).textContent = "…";
    try {
      await fn();
      document.querySelector(selector).textContent = " ✅";
    } catch (e) {
      document.querySelector(selector).textContent = " ❌";
      console.error(e);
    }
  }
}

async function saveInput(): Promise<void> {
  registrationElem().style.backgroundColor = "rgba(255, 127, 0, 0.5)";
  try {
    setRegistrations(JSON.parse(registrationElem().value), false);
    registrationElem().style.backgroundColor = "rgba(0, 255, 0, 0.5)";
  } catch (e) {
    registrationElem().style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    console.error(e);
  }
}

window.addEventListener("load", function() {
  displayRegistrations();
  registrationElem().addEventListener("keyup", saveInput);
  registrationElem().addEventListener("change", saveInput);
  registrationElem().addEventListener("paste", saveInput);
})
