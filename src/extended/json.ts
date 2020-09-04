import { Base64urlString } from "../base64url";
import {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  PublicKeyCredentialWithAssertionJSON,
  PublicKeyCredentialWithAttestationJSON,
} from "../basic/json";

interface ExtendedExtensionsClientInputsJSON {
  appid?: string;
  appidExclude?: string;
  uvm?: boolean;
  credProps?: {
    first: Base64urlString;
    second?: Base64urlString;
  };
  largeBlob?: {
    read?: boolean;
    write?: Base64urlString;
  };
}

interface ExtendedAuthenticationExtensionsClientOutputsJSON {
  appid?: boolean;
  appidExclude?: boolean;
  uvm?: Array<[number, number, number]>;
  credProps?: {
    rk: boolean;
  };
  largeBlob?: {
    blob?: Base64urlString;
    written?: boolean;
  };
}

interface PublicKeyCredentialCreationOptionsExtendedJSON
  extends PublicKeyCredentialCreationOptionsJSON {
  extensions?: ExtendedExtensionsClientInputsJSON;
}

export interface CredentialCreationOptionsExtendedJSON
  extends CredentialCreationOptionsJSON {
  publicKey: PublicKeyCredentialCreationOptionsExtendedJSON;
}

export interface PublicKeyCredentialWithAttestationExtendedResultsJSON
  extends PublicKeyCredentialWithAttestationJSON {
  clientExtensionResults: ExtendedAuthenticationExtensionsClientOutputsJSON;
}

interface PublicKeyCredentialRequestOptionsExtendedJSON
  extends PublicKeyCredentialRequestOptionsJSON {
  extensions?: ExtendedExtensionsClientInputsJSON;
}

export interface CredentialRequestOptionsExtendedJSON
  extends CredentialRequestOptionsJSON {
  publicKey?: PublicKeyCredentialRequestOptionsExtendedJSON;
}

export interface PublicKeyCredentialWithAssertionExtendedResultsJSON
  extends PublicKeyCredentialWithAssertionJSON {
  clientExtensionResults: ExtendedAuthenticationExtensionsClientOutputsJSON;
}
