/* tslint:disable:no-console */

import {schema} from "../index";

const help = `Usage: ${process.argv[1]} schema`;

const command = process.argv[2];
if (command === "schema") {
  console.log(JSON.stringify(schema, null, "  "));
} else {
  console.log(help);
}
