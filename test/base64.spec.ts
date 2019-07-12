import {base64ToBuffer, bufferToBase64} from "../src/base64";
import "./arraybuffer";

describe("base64", () => {
  test("should convert simple base64 values to `ArrayBuffer`", () => {
    expect(base64ToBuffer("")).toEqualBuffer(new Uint8Array([]));
    expect(base64ToBuffer("AA==")).toEqualBuffer(new Uint8Array([0]));
    expect(base64ToBuffer("TEST")).toEqualBuffer(new Uint8Array([76, 68, 147]));
    expect(base64ToBuffer("BAMCAQ==")).toEqualBuffer(new Uint8Array([4, 3, 2, 1]));
  });

  test("should convert simple `ArrayBuffer` values to base64", () => {
    expect(bufferToBase64(new Uint8Array([]))).toBe("");
    expect(bufferToBase64(new Uint8Array([0]))).toBe("AA==");
    expect(bufferToBase64(new Uint8Array([4, 3, 2, 1]))).toBe("BAMCAQ==");
  });

  test("should round-trip through `ArrayBuffer`", () => {
    // Fun fact: multiple base64 encodings can represent the same value. We expect
    // the output value to be different than the input in this case.
    expect(bufferToBase64(base64ToBuffer("ABCDEF=="))).toBe("ABCDEA==");
  });
});
