import { base64urlToBuffer, bufferToBase64url } from "../src/base64url";
import "./arraybuffer";

describe("base64url", () => {
  test("should convert simple base64url values to `ArrayBuffer`", () => {
    expect(base64urlToBuffer("")).toEqualBuffer(new Uint8Array([]));
    expect(base64urlToBuffer("AA")).toEqualBuffer(new Uint8Array([0]));
    expect(base64urlToBuffer("TEST")).toEqualBuffer(new Uint8Array([76, 68, 147]));
    expect(base64urlToBuffer("BAMCAQ")).toEqualBuffer(new Uint8Array([4, 3, 2, 1]));
    expect(base64urlToBuffer("A-B-C-")).toEqualBuffer(new Uint8Array([3, 224, 126, 11]));
  });

  test("should convert simple `ArrayBuffer` values to base64url", () => {
    expect(bufferToBase64url(new Uint8Array([]))).toBe("");
    expect(bufferToBase64url(new Uint8Array([0]))).toBe("AA");
    expect(bufferToBase64url(new Uint8Array([4, 3, 2, 1]))).toBe("BAMCAQ");
  });

  test("should round-trip through `ArrayBuffer`", () => {
    // Fun fact: multiple base64url encodings can represent the same value. We expect
    // the output value to be different than the input in this case.
    expect(bufferToBase64url(base64urlToBuffer("ABCDEF"))).toBe("ABCDEA");
  });
});
