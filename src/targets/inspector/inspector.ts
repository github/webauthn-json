import "regenerator-runtime/runtime";
import { bufferToBase64url } from "../../base64url";
import {
  createRequestFromJSON,
  createResponseToJSON,
  getRequestFromJSON,
  getResponseToJSON,
} from "../../basic/api";
import {
  credentialCreationOptions,
  credentialRequestOptions,
} from "../../basic/schema";

import { readFileSync } from "fs";
import { join } from "path";
import { convert } from "../../convert";
const indexStyle = readFileSync(join(__dirname, "index.css"), "utf8");

const originalCreate = navigator.credentials?.create.bind(
  navigator.credentials,
);

const originalGet = navigator.credentials?.get.bind(navigator.credentials);

if (!navigator.credentials) {
  (navigator as any).credentials = {};
}

export class WebAuthnInspector extends HTMLElement {
  shadow: ShadowRoot;
  contentWrapper: HTMLDivElement;
  header: HTMLDivElement;
  textareaWrapper: HTMLDivElement;
  textarea: HTMLTextAreaElement;
  controls: HTMLDivElement;
  closeButton: HTMLButtonElement;
  opButton: HTMLButtonElement;
  close: () => void;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });

    const cssElem: HTMLStyleElement = document.createElement("style");
    cssElem.textContent = indexStyle;
    this.shadow.appendChild(cssElem);

    this.contentWrapper = document.createElement("div");
    this.contentWrapper.classList.add("wrapper");
    this.shadow.appendChild(this.contentWrapper);

    this.header = document.createElement("div");
    this.header.textContent = "WebAuthn Request";
    this.header.classList.add("header");
    this.contentWrapper.appendChild(this.header);

    this.controls = document.createElement("div");
    this.controls.classList.add("controls");
    this.contentWrapper.appendChild(this.controls);

    this.textareaWrapper = document.createElement("div");
    this.textareaWrapper.classList.add("textarea-wrapper");
    this.contentWrapper.appendChild(this.textareaWrapper);

    this.textarea = document.createElement("textarea");
    this.textareaWrapper.appendChild(this.textarea);

    this.closeButton = document.createElement("button");
    this.closeButton.textContent = "Close";
    this.closeButton.addEventListener("click", () => {
      document.body.removeChild(this);
      if (this.close) {
        this.close();
      }
    });
    this.controls.appendChild(this.closeButton);

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy JSON";
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(this.textarea.value);
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy JSON";
      }, 1000);
    });
    this.controls.appendChild(copyButton);

    document.body.appendChild(this);
  }

  async create(
    options?: CredentialCreationOptions,
  ): Promise<Credential | null> {
    return new Promise((resolve, reject) => {
      this.close = () => {
        reject("WebAuthn inspector closed");
      };
      const json = convert(
        bufferToBase64url,
        credentialCreationOptions,
        options,
      );
      this.header.textContent = "WebAuthn Create Request";
      this.textarea.value = JSON.stringify(json, null, "  ");
      this.opButton = document.createElement("button");
      this.opButton.textContent = "Create";
      this.opButton.addEventListener("click", async () => {
        try {
          const requestJSON = JSON.parse(this.textarea.value!);
          const request = createRequestFromJSON(requestJSON);
          const response = await originalCreate(request);
          this.success("Create", createResponseToJSON(response));
          this.closeButton.textContent = "Respond";
          this.close = () => {
            resolve(response);
          };
        } catch (e) {
          this.failure("Create", e);
          this.close = () => {
            reject(e);
          };
        }
      });
      this.controls.appendChild(this.opButton);
    });
  }

  async get(options?: CredentialCreationOptions): Promise<Credential | null> {
    return new Promise((resolve, reject) => {
      this.close = () => {
        reject("WebAuthn inspector closed");
      };
      const json = convert(
        bufferToBase64url,
        credentialRequestOptions,
        options,
      );
      this.header.textContent = "WebAuthn Get Request";
      this.textarea.value = JSON.stringify(json, null, "  ");
      this.opButton = document.createElement("button");
      this.opButton.textContent = "Get";
      this.opButton.addEventListener("click", async () => {
        try {
          const requestJSON = JSON.parse(this.textarea.value!);
          const request = getRequestFromJSON(requestJSON);
          console.log(request);
          const response = await originalGet(request);
          this.success("Get", getResponseToJSON(response));
          this.closeButton.textContent = "Respond";
          this.close = () => {
            resolve(response);
          };
        } catch (e) {
          this.failure("Get", e);
          this.close = () => {
            reject(e);
          };
        }
      });
      this.controls.appendChild(this.opButton);
    });
  }

  success(op: string, responseJSON: any): void {
    this.controls.removeChild(this.opButton);
    this.header.textContent = `✅ WebAuthn ${op} Response`;
    this.contentWrapper.classList.add("success");
    this.textarea.value = JSON.stringify(responseJSON, null, "  ");
  }

  failure(op: string, e: Error): void {
    this.controls.removeChild(this.opButton);
    this.header.textContent = `❌ WebAuthn ${op} Response`;
    this.contentWrapper.classList.add("failure");
    this.textarea.value = e.toString();
  }
}

customElements.define("webauthn-inspector", WebAuthnInspector);

navigator.credentials.create = async function (
  options?: CredentialCreationOptions,
): Promise<Credential | null> {
  console.log(options);
  const interceptor = new WebAuthnInspector();
  return await interceptor.create(options);
};

navigator.credentials.get = async function (
  options?: CredentialCreationOptions,
): Promise<Credential | null> {
  const interceptor = new WebAuthnInspector();
  return await interceptor.get(options);
};

console.log("WebAuthn Inspector is active!");
