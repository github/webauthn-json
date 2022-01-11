import { PublicKeyCredentialWithAttestationJSON } from "../../basic/json";

export function getRegistrations(): PublicKeyCredentialWithAttestationJSON[] {
  const registrations = JSON.parse(
    localStorage.webauthnExampleRegistrations || "[]",
  );
  return registrations;
}

export function setRegistrations(
  registrations: PublicKeyCredentialWithAttestationJSON[],
  display: boolean = true,
): void {
  localStorage.webauthnExampleRegistrations = JSON.stringify(
    registrations,
    null,
    "  ",
  );
  displayRegistrations();
}

export function saveRegistration(
  registration: PublicKeyCredentialWithAttestationJSON,
): void {
  const registrations = getRegistrations();
  registrations.push(registration);
  setRegistrations(registrations);
}

function registrationElem(): HTMLTextAreaElement {
  return document.querySelector("#registrations")! as HTMLTextAreaElement;
}

export function displayRegistrations() {
  registrationElem().value = JSON.stringify(getRegistrations(), null, "  ");
}

export function withStatus(selector: string, fn: () => Promise<void>) {
  return async function () {
    document.querySelector("#error")!.textContent = "";
    document.querySelector(selector)!.textContent = "…";
    try {
      await fn();
      document.querySelector(selector)!.textContent = " ✅";
    } catch (e) {
      document.querySelector(selector)!.textContent = " ❌";
      console.error(e);
      document.querySelector("#error")!.textContent = e;
    }
  };
}

async function saveInput(): Promise<void> {
  document.querySelector("#error")!.textContent = "";
  registrationElem().style.backgroundColor = "rgba(255, 127, 0, 0.5)";
  try {
    setRegistrations(JSON.parse(registrationElem().value), false);
    registrationElem().style.backgroundColor = "rgba(0, 255, 0, 0.5)";
  } catch (e) {
    registrationElem().style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    console.error(e);
    document.querySelector("#error")!.textContent = e;
  }
}

window.addEventListener("load", () => {
  try {
    displayRegistrations();
    registrationElem().addEventListener("keyup", saveInput);
    registrationElem().addEventListener("change", saveInput);
    registrationElem().addEventListener("paste", saveInput);
  } catch (e) {
    console.error(e);
  }
});
