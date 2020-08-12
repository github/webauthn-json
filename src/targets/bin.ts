/* tslint:disable:no-console no-var-requires */

declare const version: string;
import { schema } from "../index";

const help = `Usage: ${process.argv[1]} schema`;

const command = process.argv[2];
if (command === "schema") {
  const schemaWithVersion = { ...schema, version };
  console.log(JSON.stringify(schemaWithVersion, null, "  "));
} else {
  console.log(help);
}
