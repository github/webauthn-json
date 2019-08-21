// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"DDVf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = d;
exports.get = p;

function e(e) {
  const t = "==".slice(0, (4 - e.length % 4) % 4),
        n = e.replace(/-/g, "+").replace(/_/g, "/") + t,
        r = atob(n),
        a = new ArrayBuffer(r.length),
        i = new Uint8Array(a);

  for (let e = 0; e < r.length; e++) i[e] = r.charCodeAt(e);

  return a;
}

function t(e) {
  const t = new Uint8Array(e);
  let n = "";

  for (const e of t) n += String.fromCharCode(e);

  return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

const n = "copy",
      r = "convert";

function a(e, t, i) {
  if (t === n) return i;
  if (t === r) return e(i);
  if (t instanceof Array) return i.map(n => a(e, t[0], n));

  if (t instanceof Object) {
    const n = {};

    for (const [r, o] of Object.entries(t)) if (r in i) null != i[r] ? n[r] = a(e, o.schema, i[r]) : n[r] = null;else if (o.required) throw new Error(`Missing key: ${r}`);

    return n;
  }
}

function i(e) {
  return {
    required: !0,
    schema: e
  };
}

function o(e) {
  return {
    required: !1,
    schema: e
  };
}

const c = {
  type: i(n),
  id: i(r),
  transports: o(n)
},
      s = {
  publicKey: i({
    rp: i(n),
    user: i({
      id: i(r),
      name: i(n),
      displayName: i(n),
      icon: o(n)
    }),
    challenge: i(r),
    pubKeyCredParams: i(n),
    timeout: o(n),
    excludeCredentials: o([c]),
    authenticatorSelection: o(n),
    attestation: o(n),
    extensions: o(n)
  }),
  signal: o(n)
},
      l = {
  type: i(n),
  id: i(n),
  rawId: i(r),
  response: i({
    clientDataJSON: i(r),
    attestationObject: i(r)
  })
},
      u = {
  unmediated: o(n),
  mediation: o(n),
  publicKey: i({
    challenge: i(r),
    timeout: o(n),
    rpId: o(n),
    allowCredentials: o([c]),
    userVerification: o(n),
    extensions: o(n)
  }),
  signal: o(n)
},
      f = {
  type: i(n),
  id: i(n),
  rawId: i(r),
  response: i({
    clientDataJSON: i(r),
    authenticatorData: i(r),
    signature: i(r),
    userHandle: i(r)
  })
};

async function d(n) {
  const r = a(e, s, n),
        i = await navigator.credentials.create(r);
  return a(t, l, i);
}

async function p(n) {
  const r = a(e, u, n),
        i = await navigator.credentials.get(r);
  return a(t, f, i);
}
},{}],"mIWh":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

function getRegistrations() {
  var registrations = JSON.parse(localStorage.webauthnExampleRegistrations || "[]");
  return registrations;
}

exports.getRegistrations = getRegistrations;

function setRegistrations(registrations, display) {
  if (display === void 0) {
    display = true;
  }

  localStorage.webauthnExampleRegistrations = JSON.stringify(registrations, null, "  ");
  displayRegistrations();
}

exports.setRegistrations = setRegistrations;

function saveRegistration(registration) {
  var registrations = getRegistrations();
  registrations.push(registration);
  setRegistrations(registrations);
}

exports.saveRegistration = saveRegistration;

function registrationElem() {
  return document.querySelector("#registrations");
}

function displayRegistrations() {
  registrationElem().value = JSON.stringify(getRegistrations(), null, "  ");
}

exports.displayRegistrations = displayRegistrations;

function withStatus(selector, fn) {
  return function () {
    return __awaiter(this, void 0, void 0, function () {
      var e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            document.querySelector("#error").textContent = "";
            document.querySelector(selector).textContent = "…";
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , fn()];

          case 2:
            _a.sent();

            document.querySelector(selector).textContent = " ✅";
            return [3
            /*break*/
            , 4];

          case 3:
            e_1 = _a.sent();
            document.querySelector(selector).textContent = " ❌";
            console.error(e_1);
            document.querySelector("#error").textContent = e_1;
            return [3
            /*break*/
            , 4];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
}

exports.withStatus = withStatus;

function saveInput() {
  return __awaiter(this, void 0, Promise, function () {
    return __generator(this, function (_a) {
      document.querySelector("#error").textContent = "";
      registrationElem().style.backgroundColor = "rgba(255, 127, 0, 0.5)";

      try {
        setRegistrations(JSON.parse(registrationElem().value), false);
        registrationElem().style.backgroundColor = "rgba(0, 255, 0, 0.5)";
      } catch (e) {
        registrationElem().style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        console.error(e);
        document.querySelector("#error").textContent = e;
      }

      return [2
      /*return*/
      ];
    });
  });
}

window.addEventListener("load", function () {
  try {
    displayRegistrations();
    registrationElem().addEventListener("keyup", saveInput);
    registrationElem().addEventListener("change", saveInput);
    registrationElem().addEventListener("paste", saveInput);
  } catch (e) {
    console.error(e);
  }
});
},{}],"7QCb":[function(require,module,exports) {
"use strict"; // A minimal example to test `webauthn-json`.
// Note: do not hardcode values in production.

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var webauthn_json_1 = require("@github/webauthn-json");

var state_1 = require("./state");

function register() {
  return __awaiter(this, void 0, Promise, function () {
    var _a;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _a = state_1.saveRegistration;
          return [4
          /*yield*/
          , webauthn_json_1.create({
            publicKey: {
              challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
              rp: {
                name: "Localhost, Inc."
              },
              user: {
                id: "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
                name: "test_user",
                displayName: "Test User"
              },
              pubKeyCredParams: [{
                type: "public-key",
                alg: -7
              }],
              excludeCredentials: state_1.getRegistrations().map(function (reg) {
                return {
                  id: reg.rawId,
                  type: reg.type
                };
              })
            }
          })];

        case 1:
          _a.apply(void 0, [_b.sent()]);

          return [2
          /*return*/
          ];
      }
    });
  });
}

function authenticate() {
  return __awaiter(this, void 0, Promise, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , webauthn_json_1.get({
            publicKey: {
              challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
              allowCredentials: state_1.getRegistrations().map(function (reg) {
                return {
                  id: reg.rawId,
                  type: reg.type
                };
              })
            }
          })];

        case 1:
          _a.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
}

function clear() {
  return __awaiter(this, void 0, Promise, function () {
    return __generator(this, function (_a) {
      state_1.setRegistrations([]);
      return [2
      /*return*/
      ];
    });
  });
}

window.addEventListener("load", function () {
  try {
    document.querySelector("#register").addEventListener("click", state_1.withStatus("#register .status", register));
    document.querySelector("#authenticate").addEventListener("click", state_1.withStatus("#authenticate .status", authenticate));
    document.querySelector("#clear").addEventListener("click", state_1.withStatus("#clear .status", clear));
  } catch (e) {
    console.error(e);
  }
});
},{"@github/webauthn-json":"DDVf","./state":"mIWh"}]},{},["7QCb"], null)
//# sourceMappingURL=src.74015bb0.js.map