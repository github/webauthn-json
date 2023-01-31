import { expect } from "@open-wc/testing";

import { base64urlToBuffer, bufferToBase64url } from "./base64url";
import { Schema } from "./schema-format";
import {
  convert,
  convertValue,
  copyValue,
  optional,
  required,
} from "./convert";

suite("conversion", () => {
  test("can handle empty schema", () => {
    const schema: Schema = {};
    expect(() => convert(base64urlToBuffer, schema, {})).not.to.throw();
  });

  test("copies a required `copy` value", () => {
    const schema: Schema = { number: { required: true, schema: "copy" } };
    const converted = convert(base64urlToBuffer, schema, { number: 4 });
    expect(converted.number).to.equal(4);
  });

  test("errors when a required `copy` value is missing", () => {
    const schema: Schema = { number: { required: true, schema: "copy" } };
    expect(() => convert(base64urlToBuffer, schema, {})).to.throw(
      /Missing key/,
    );
  });

  test("copies a required `convert` value", () => {
    const schema: Schema = { number: { required: true, schema: "convert" } };
    const converted = convert(base64urlToBuffer, schema, { number: "AA==" });
    expect(bufferToBase64url(converted.number)).to.equal(
      bufferToBase64url(new Uint8Array([0])),
    );
  });

  test("errors when a required `convert` value is missing", () => {
    const schema: Schema = { number: { required: true, schema: "convert" } };
    expect(() => convert(base64urlToBuffer, schema, {})).to.throw(
      /Missing key/,
    );
  });

  test("allows a missing optional value", () => {
    const schema: Schema = { number: { required: false, schema: "copy" } };
    const converted = convert(base64urlToBuffer, schema, {});
    expect(converted).not.to.haveOwnProperty("number");
  });

  test("ignores unknown properties", () => {
    const schema: Schema = { number: { required: false, schema: "copy" } };
    const converted = convert(base64urlToBuffer, schema, {
      number: 6,
      extra: "hi",
    });
    expect(converted.number).to.equal(6);
    expect(converted).not.haveOwnProperty("extra");
  });

  test("converts object", () => {
    const schema: Schema = {
      nestedObject: {
        required: true,
        schema: {
          number: { required: true, schema: "copy" },
          convertField: { required: true, schema: "convert" },
        },
      },
    };
    const converted = convert(base64urlToBuffer, schema, {
      nestedObject: { number: 7, convertField: "BB==" },
    });
    expect(converted.nestedObject.number).to.equal(7);
    expect(bufferToBase64url(converted.nestedObject.convertField)).to.equal(
      bufferToBase64url(new Uint8Array([4])),
    );
  });

  test("converts object list", () => {
    const schema: Schema = {
      nestedObjectList: {
        required: true,
        schema: [
          {
            number: { required: true, schema: "copy" },
            string: { required: false, schema: "copy" },
            convertField: { required: true, schema: "convert" },
          },
        ],
      },
    };
    const converted = convert(base64urlToBuffer, schema, {
      nestedObjectList: [
        { number: 8, string: "hi", convertField: "CC==" },
        { number: 9, convertField: "DD==" },
      ],
    });

    expect(converted.nestedObjectList).to.have.length(2);

    expect(converted.nestedObjectList[0].number).to.equal(8);
    expect(converted.nestedObjectList[0].string).to.equal("hi");
    expect(
      bufferToBase64url(converted.nestedObjectList[0].convertField),
    ).to.equal(bufferToBase64url(new Uint8Array([8])));

    expect(converted.nestedObjectList[1].number).to.equal(9);
    expect(converted.nestedObjectList[1]).not.to.haveOwnProperty("string");
    expect(
      bufferToBase64url(converted.nestedObjectList[1].convertField),
    ).to.equal(bufferToBase64url(new Uint8Array([12])));
  });
});

test("converts leaf lists", () => {
  const schema: Schema = ["convert"];
  const converted = convert(base64urlToBuffer, schema, ["EE", "FF"]);
  expect(converted).to.have.length(2);
  expect(bufferToBase64url(converted[0])).to.equal(
    bufferToBase64url(new Uint8Array([16])),
  );
  expect(bufferToBase64url(converted[1])).to.equal(
    bufferToBase64url(new Uint8Array([20])),
  );
});

suite("convenience functions", () => {
  test("can be called", () => {
    const schema: Schema = {
      a: required(copyValue),
      b: required(convertValue),
      c: optional(copyValue),
      d: optional(convertValue),
    };
    const converted = convert(base64urlToBuffer, schema, {
      a: 5,
      b: "EE",
      c: 7,
      d: "FF",
    });
    expect(converted.a).to.equal(5);
    expect(bufferToBase64url(converted.b)).to.equal(
      bufferToBase64url(new Uint8Array([16])),
    );
    expect(converted.c).to.equal(7);
    expect(bufferToBase64url(converted.d)).to.equal(
      bufferToBase64url(new Uint8Array([20])),
    );
  });

  test("enforce required value", () => {
    const schema: Schema = { number: required(copyValue) };
    expect(() => convert(base64urlToBuffer, schema, {})).to.throw(
      /Missing key/,
    );
  });

  test("allow leaving out optional value", () => {
    const schema: Schema = { number: { required: false, schema: "copy" } };
    const converted = convert(base64urlToBuffer, schema, {});
    expect(converted).not.to.haveOwnProperty("number");
  });
});

suite("conversion function", () => {
  function double(s: string): string {
    return s + s;
  }

  test("allows using an arbitrary conversion function", () => {
    const schema: Schema = {
      convertField: { required: true, schema: "convert" },
    };
    const converted = convert(double, schema, { convertField: "hi" });
    expect(converted.convertField).to.equal("hihi");
  });
});
