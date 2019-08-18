import {base64urlToBuffer} from "../src/base64url";
import {convert, convertValue, copyValue, optional, required, Schema} from "../src/schema-format";
import "./arraybuffer";

describe("conversion", () => {
  test("can handle empty schema", () => {
    const schema: Schema = {};
    expect(() => convert(base64urlToBuffer, schema, {})).not.toThrow();
  });

  test("copies a required `copy` value", () => {
    const schema: Schema = {number: {required: true, schema: "copy"}};
    const converted = convert(base64urlToBuffer, schema, {number: 4});
    expect(converted.number).toBe(4);
  });

  test("errors when a required `copy` value is missing", () => {
    const schema: Schema = {number: {required: true, schema: "copy"}};
    expect(() => convert(base64urlToBuffer, schema, {})).toThrowError(/Missing key/);
  });

  test("copies a required `convert` value", () => {
    const schema: Schema = {number: {required: true, schema: "convert"}};
    const converted = convert(base64urlToBuffer, schema, {number: "AA=="});
    expect(converted.number).toEqualBuffer(new Uint8Array([0]));
  });

  test("errors when a required `convert` value is missing", () => {
    const schema: Schema = {number: {required: true, schema: "convert"}};
    expect(() => convert(base64urlToBuffer, schema, {})).toThrowError(/Missing key/);
  });

  test("copies an optional required copy value", () => {
    const schema: Schema = {number: {required: false, schema: "copy"}};
    const converted = convert(base64urlToBuffer, schema, {number: 5});
    expect(converted.number).toBe(5);
  });

  test("allows a missing optional value", () => {
    const schema: Schema = {number: {required: false, schema: "copy"}};
    const converted = convert(base64urlToBuffer, schema, {});
    expect(converted).not.toHaveProperty("number");
  });

  test("ignores unknown properties", () => {
    const schema: Schema = {number: {required: false, schema: "copy"}};
    const converted = convert(base64urlToBuffer, schema, {number: 6, extra: "hi"});
    expect(converted.number).toBe(6);
    expect(converted).not.toHaveProperty("extra");
  });

  test("converts object", () => {
    const schema: Schema = {
      nestedObject: {
        required: true,
        schema: {
          number: {required: true, schema: "copy"},
          convertField: {required: true, schema: "convert"},
        },
      },
    };
    const converted = convert(base64urlToBuffer, schema, {
      nestedObject: {number: 7, convertField: "BB=="},
    });
    expect(converted.nestedObject.number).toBe(7);
    expect(converted.nestedObject.convertField).toEqualBuffer(new Uint8Array([4]));
  });

  test("converts object list", () => {
    const schema: Schema = {
      nestedObjectList: {
        required: true,
        schema: [{
          number: {required: true, schema: "copy"},
          string: {required: false, schema: "copy"},
          convertField: {required: true, schema: "convert"},
        }],
      },
    };
    const converted = convert(base64urlToBuffer, schema, {
      nestedObjectList: [
        {number: 8, string: "hi", convertField: "CC=="},
        {number: 9, convertField: "DD=="},
      ],
    });

    expect(converted.nestedObjectList).toHaveLength(2);

    expect(converted.nestedObjectList[0].number).toBe(8);
    expect(converted.nestedObjectList[0].string).toBe("hi");
    expect(converted.nestedObjectList[0].convertField).toEqualBuffer(new Uint8Array([8]));

    expect(converted.nestedObjectList[1].number).toBe(9);
    expect(converted.nestedObjectList[1]).not.toHaveProperty("string");
    expect(converted.nestedObjectList[1].convertField).toEqualBuffer(new Uint8Array([12]));
  });
});

describe("convenience functions", () => {
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
    expect(converted.a).toBe(5);
    expect(converted.b).toEqualBuffer(new Uint8Array([16]));
    expect(converted.c).toBe(7);
    expect(converted.d).toEqualBuffer(new Uint8Array([20]));
  });

  test("enforce required value", () => {
    const schema: Schema = {number: required(copyValue)};
    expect(() => convert(base64urlToBuffer, schema, {})).toThrowError(/Missing key/);
  });

  test("allow leaving out optional value", () => {
    const schema: Schema = {number: {required: false, schema: "copy"}};
    const converted = convert(base64urlToBuffer, schema, {});
    expect(converted).not.toHaveProperty("number");
  });
});

describe("conversion function", () => {
  function double(s: string): string {
    return s + s;
  }

  test("allows using an arbitrary conversion function", () => {
    const schema: Schema = {convertField: {required: true, schema: "convert"}};
    const converted = convert(double, schema, {convertField: "hi"});
    expect(converted.convertField).toBe("hihi");
  });
});
