/* tslint:disable:no-console no-var-requires */

declare const WEBAUTHN_JSON_VERSION: string;
import { schema } from "../webauthn-json";

const help = `Usage: ${process.argv[1]} schema`;

const command = process.argv[2];
if (command === "schema") {
  const schemaWithVersion = { ...schema, version: WEBAUTHN_JSON_VERSION };
  console.log(JSON.stringify(schemaWithVersion, null, "  "));
} else {
  console.log(help);
}
