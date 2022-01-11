expect.extend({
  toEqualBuffer(
    expected: ArrayBuffer,
    observed: ArrayBuffer,
  ): jest.CustomMatcherResult {
    const expectedUint8 = new Uint8Array(expected);
    const observedUint8 = new Uint8Array(observed);
    const expectedUint8Str = () => JSON.stringify(Array.from(expectedUint8));
    if (expected.byteLength !== observed.byteLength) {
      return {
        pass: false,
        message: () =>
          `\`ArrayBuffer\` byte lengths do not match (${
            expected.byteLength
          } vs. ${observed.byteLength}). Expected ${expectedUint8Str()}.`,
      };
    }
    for (let i = 0; i < expected.byteLength; i++) {
      if (expectedUint8[i] !== observedUint8[i]) {
        return {
          pass: false,
          message: () =>
            `\`ArrayBuffer\` mismatch on byte #${i}. Expected ${expectedUint8Str()}.`,
        };
      }
    }
    return { pass: true, message: () => "OK" };
  },
});

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toEqualBuffer(observed: ArrayBuffer): CustomMatcherResult;
    }
  }
}

// This is needed to modify the global namespace.
export {};
