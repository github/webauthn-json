import { expect } from "@open-wc/testing";

import { base64urlToBuffer, bufferToBase64url } from "./base64url";

suite("base64url", () => {
  test("should convert simple base64url values to `ArrayBuffer`", () => {
    // TODO: avoid round-trip while testing
    // https://www.chaijs.com/plugins/chai-bytes/ doesn't seem to work, due to compatibility issues with the default importt.
    expect(bufferToBase64url(base64urlToBuffer(""))).to.equal(
      bufferToBase64url(new Uint8Array([])),
    );
    expect(bufferToBase64url(base64urlToBuffer("AA"))).to.equal(
      bufferToBase64url(new Uint8Array([0])),
    );
    expect(bufferToBase64url(base64urlToBuffer("TEST"))).to.equal(
      bufferToBase64url(new Uint8Array([76, 68, 147])),
    );
    expect(bufferToBase64url(base64urlToBuffer("BAMCAQ"))).to.equal(
      bufferToBase64url(new Uint8Array([4, 3, 2, 1])),
    );
    expect(bufferToBase64url(base64urlToBuffer("A-B-C-"))).to.equal(
      bufferToBase64url(new Uint8Array([3, 224, 126, 11])),
    );
  });

  test("should convert simple `ArrayBuffer` values to base64url", () => {
    expect(bufferToBase64url(new Uint8Array([]))).to.equal("");
    expect(bufferToBase64url(new Uint8Array([0]))).to.equal("AA");
    expect(bufferToBase64url(new Uint8Array([4, 3, 2, 1]))).to.equal("BAMCAQ");
  });

  test("should round-trip through `ArrayBuffer`", () => {
    // Fun fact: multiple base64url encodings can represent the same value. We expect
    // the output value to be different than the input in this case.
    expect(bufferToBase64url(base64urlToBuffer("ABCDEF"))).to.equal("ABCDEA");
  });
});
