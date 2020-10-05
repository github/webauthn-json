// We export these values in order so that they can be used to deduplicate
// schema definitions in minified JS code.

import { Schema } from "./schema-format";

// TODO: Parcel isn't deduplicating these values.
export const copyValue = "copy";
export const convertValue = "convert";

export function convert<From, To>(
  conversionFn: (v: From) => To,
  schema: Schema,
  input: any,
): any {
  if (schema === copyValue) {
    return input;
  }
  if (schema === convertValue) {
    return conversionFn(input);
  }
  if (schema instanceof Array) {
    return input.map((v: any) => convert<From, To>(conversionFn, schema[0], v));
  }
  if (schema instanceof Object) {
    const output: any = {};
    for (const [key, schemaField] of Object.entries(schema)) {
      if (!(key in input)) {
        if (schemaField.required) {
          throw new Error(`Missing key: ${key}`);
        }
        continue;
      }
      // Fields can be null (rather than missing or `undefined`), e.g. the
      // `userHandle` field of the `AuthenticatorAssertionResponse`:
      // https://www.w3.org/TR/webauthn/#iface-authenticatorassertionresponse
      if (input[key] == null) {
        output[key] = null;
        continue;
      }
      output[key] = convert<From, To>(
        conversionFn,
        schemaField.schema,
        input[key],
      );
    }
    return output;
  }
}

export function required(schema: Schema): any {
  return {
    required: true,
    schema,
  };
}

export function optional(schema: Schema): any {
  return {
    required: false,
    schema,
  };
}
