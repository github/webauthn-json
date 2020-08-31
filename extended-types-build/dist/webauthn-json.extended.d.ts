type Base64urlString = string;
export function base64urlToBuffer(baseurl64String: Base64urlString): ArrayBuffer;
export function bufferToBase64url(buffer: ArrayBuffer): Base64urlString;
type SchemaLeaf = "copy" | "convert";
interface SchemaObject {
    [property: string]: {
        required: boolean;
        schema: Schema;
    };
}
type SchemaArray = [SchemaObject] | [SchemaLeaf];
type Schema = SchemaLeaf | SchemaArray | SchemaObject;
export function convert<From, To>(conversionFn: (v: From) => To, schema: Schema, input: any): any;
declare function required(schema: Schema): any;
interface PublicKeyCredentialDescriptorJSON {
    type: PublicKeyCredentialType;
    id: Base64urlString;
    transports?: AuthenticatorTransport[];
}
interface SimpleWebAuthnExtensionsJSON {
    appid?: string;
    appidExclude?: string;
}
interface SimpleClientExtensionResultsJSON {
    appid?: boolean;
    appidExclude?: boolean;
}
interface PublicKeyCredentialUserEntityJSON extends PublicKeyCredentialEntity {
    displayName: string;
    id: Base64urlString;
}
type ResidentKeyRequirement = "discouraged" | "preferred" | "required";
interface AuthenticatorSelectionCriteriaJSON extends AuthenticatorSelectionCriteria {
    residentKey?: ResidentKeyRequirement;
}
interface PublicKeyCredentialCreationOptionsJSON {
    rp: PublicKeyCredentialRpEntity;
    user: PublicKeyCredentialUserEntityJSON;
    challenge: Base64urlString;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    timeout?: number;
    excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
    authenticatorSelection?: AuthenticatorSelectionCriteriaJSON;
    attestation?: AttestationConveyancePreference;
    extensions?: SimpleWebAuthnExtensionsJSON;
}
export interface CredentialCreationOptionsJSON {
    publicKey: PublicKeyCredentialCreationOptionsJSON;
    signal?: AbortSignal;
}
interface AuthenticatorAttestationResponseJSON {
    clientDataJSON: Base64urlString;
    attestationObject: Base64urlString;
}
export interface PublicKeyCredentialWithAttestationJSON {
    id: string;
    type: PublicKeyCredentialType;
    rawId: Base64urlString;
    response: AuthenticatorAttestationResponseJSON;
    clientExtensionResults: SimpleClientExtensionResultsJSON;
}
interface PublicKeyCredentialRequestOptionsJSON {
    challenge: Base64urlString;
    timeout?: number;
    rpId?: string;
    allowCredentials?: PublicKeyCredentialDescriptorJSON[];
    userVerification?: UserVerificationRequirement;
    extensions?: SimpleWebAuthnExtensionsJSON;
}
export interface CredentialRequestOptionsJSON {
    mediation?: CredentialMediationRequirement;
    publicKey?: PublicKeyCredentialRequestOptionsJSON;
    signal?: AbortSignal;
}
interface AuthenticatorAssertionResponseJSON {
    clientDataJSON: Base64urlString;
    authenticatorData: Base64urlString;
    signature: Base64urlString;
    userHandle: Base64urlString | null;
}
export interface PublicKeyCredentialWithAssertionJSON {
    type: PublicKeyCredentialType;
    id: string;
    rawId: Base64urlString;
    response: AuthenticatorAssertionResponseJSON;
    clientExtensionResults: SimpleClientExtensionResultsJSON;
}
export const schema: {
    [s: string]: Schema;
};
export function createRequestFromJSON(requestJSON: CredentialCreationOptionsJSON): CredentialCreationOptions;
export function createResponseToJSON(credential: PublicKeyCredential): PublicKeyCredentialWithAttestationJSON;
export function create(requestJSON: CredentialCreationOptionsJSON): Promise<PublicKeyCredentialWithAttestationJSON>;
export function getRequestFromJSON(requestJSON: CredentialRequestOptionsJSON): CredentialRequestOptions;
export function getResponseToJSON(credential: PublicKeyCredential): PublicKeyCredentialWithAssertionJSON;
export function get(requestJSON: CredentialRequestOptionsJSON): Promise<PublicKeyCredentialWithAssertionJSON>;
export function supported(): boolean;
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
        read?: boolean;
        write?: Base64urlString;
    };
}
interface PublicKeyCredentialCreationOptionsExtendedJSON extends PublicKeyCredentialCreationOptionsJSON {
    extensions?: ExtendedExtensionsClientInputsJSON;
}
export interface CredentialCreationOptionsExtendedJSON extends CredentialCreationOptionsJSON {
    publicKey: PublicKeyCredentialCreationOptionsExtendedJSON;
}
export interface PublicKeyCredentialWithAttestationExtendedResultsJSON extends PublicKeyCredentialWithAttestationJSON {
    clientExtensionResults: ExtendedAuthenticationExtensionsClientOutputsJSON;
}
interface PublicKeyCredentialRequestOptionsExtendedJSON extends PublicKeyCredentialRequestOptionsJSON {
    extensions?: ExtendedExtensionsClientInputsJSON;
}
export interface CredentialRequestOptionsExtendedJSON extends CredentialRequestOptionsJSON {
    publicKey?: PublicKeyCredentialRequestOptionsExtendedJSON;
}
export interface PublicKeyCredentialWithAssertionExtendedResultsJSON extends PublicKeyCredentialWithAssertionJSON {
    clientExtensionResults: ExtendedAuthenticationExtensionsClientOutputsJSON;
}
export function createExtendedRequestFromJSON(requestJSON: CredentialCreationOptionsExtendedJSON): CredentialCreationOptions;
export function createExtendedResponseToJSON(credential: PublicKeyCredential): PublicKeyCredentialWithAttestationExtendedResultsJSON;
export function createExtended(requestJSON: CredentialCreationOptionsJSON): Promise<PublicKeyCredentialWithAttestationJSON>;
export function getExtendedRequestFromJSON(requestJSON: CredentialRequestOptionsExtendedJSON): CredentialRequestOptions;
export function getExtendedResponseToJSON(credential: PublicKeyCredential): PublicKeyCredentialWithAssertionExtendedResultsJSON;
export function getExtended(requestJSON: CredentialRequestOptionsJSON): Promise<PublicKeyCredentialWithAssertionJSON>;

//# sourceMappingURL=webauthn-json.extended.d.ts.map
