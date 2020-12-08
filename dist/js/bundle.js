(() => {
    var e = {
            868: (e, t, a) => {
                e.exports = a(867);
            },
            155: (e, t, a) => {
                "use strict";
                var r = a(30),
                    o = a(79),
                    s = a(687),
                    n = a(512),
                    i = a(791),
                    c = a(924),
                    l = a(903),
                    d = a(971);
                e.exports = function (e) {
                    return new Promise(function (t, a) {
                        var u = e.data,
                            h = e.headers;
                        r.isFormData(u) && delete h["Content-Type"],
                            (r.isBlob(u) || r.isFile(u)) && u.type && delete h["Content-Type"];
                        var p = new XMLHttpRequest();
                        if (e.auth) {
                            var m = e.auth.username || "",
                                f = unescape(encodeURIComponent(e.auth.password)) || "";
                            h.Authorization = "Basic " + btoa(m + ":" + f);
                        }
                        var g = i(e.baseURL, e.url);
                        if (
                            (p.open(e.method.toUpperCase(), n(g, e.params, e.paramsSerializer), !0),
                            (p.timeout = e.timeout),
                            (p.onreadystatechange = function () {
                                if (
                                    p &&
                                    4 === p.readyState &&
                                    (0 !== p.status ||
                                        (p.responseURL && 0 === p.responseURL.indexOf("file:")))
                                ) {
                                    var r =
                                            "getAllResponseHeaders" in p
                                                ? c(p.getAllResponseHeaders())
                                                : null,
                                        s = {
                                            data:
                                                e.responseType && "text" !== e.responseType
                                                    ? p.response
                                                    : p.responseText,
                                            status: p.status,
                                            statusText: p.statusText,
                                            headers: r,
                                            config: e,
                                            request: p,
                                        };
                                    o(t, a, s), (p = null);
                                }
                            }),
                            (p.onabort = function () {
                                p && (a(d("Request aborted", e, "ECONNABORTED", p)), (p = null));
                            }),
                            (p.onerror = function () {
                                a(d("Network Error", e, null, p)), (p = null);
                            }),
                            (p.ontimeout = function () {
                                var t = "timeout of " + e.timeout + "ms exceeded";
                                e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                                    a(d(t, e, "ECONNABORTED", p)),
                                    (p = null);
                            }),
                            r.isStandardBrowserEnv())
                        ) {
                            var y =
                                (e.withCredentials || l(g)) && e.xsrfCookieName
                                    ? s.read(e.xsrfCookieName)
                                    : void 0;
                            y && (h[e.xsrfHeaderName] = y);
                        }
                        if (
                            ("setRequestHeader" in p &&
                                r.forEach(h, function (e, t) {
                                    void 0 === u && "content-type" === t.toLowerCase()
                                        ? delete h[t]
                                        : p.setRequestHeader(t, e);
                                }),
                            r.isUndefined(e.withCredentials) ||
                                (p.withCredentials = !!e.withCredentials),
                            e.responseType)
                        )
                            try {
                                p.responseType = e.responseType;
                            } catch (t) {
                                if ("json" !== e.responseType) throw t;
                            }
                        "function" == typeof e.onDownloadProgress &&
                            p.addEventListener("progress", e.onDownloadProgress),
                            "function" == typeof e.onUploadProgress &&
                                p.upload &&
                                p.upload.addEventListener("progress", e.onUploadProgress),
                            e.cancelToken &&
                                e.cancelToken.promise.then(function (e) {
                                    p && (p.abort(), a(e), (p = null));
                                }),
                            u || (u = null),
                            p.send(u);
                    });
                };
            },
            867: (e, t, a) => {
                "use strict";
                var r = a(30),
                    o = a(843),
                    s = a(891),
                    n = a(316);
                function i(e) {
                    var t = new s(e),
                        a = o(s.prototype.request, t);
                    return r.extend(a, s.prototype, t), r.extend(a, t), a;
                }
                var c = i(a(457));
                (c.Axios = s),
                    (c.create = function (e) {
                        return i(n(c.defaults, e));
                    }),
                    (c.Cancel = a(266)),
                    (c.CancelToken = a(747)),
                    (c.isCancel = a(416)),
                    (c.all = function (e) {
                        return Promise.all(e);
                    }),
                    (c.spread = a(545)),
                    (e.exports = c),
                    (e.exports.default = c);
            },
            266: (e) => {
                "use strict";
                function t(e) {
                    this.message = e;
                }
                (t.prototype.toString = function () {
                    return "Cancel" + (this.message ? ": " + this.message : "");
                }),
                    (t.prototype.__CANCEL__ = !0),
                    (e.exports = t);
            },
            747: (e, t, a) => {
                "use strict";
                var r = a(266);
                function o(e) {
                    if ("function" != typeof e) throw new TypeError("executor must be a function.");
                    var t;
                    this.promise = new Promise(function (e) {
                        t = e;
                    });
                    var a = this;
                    e(function (e) {
                        a.reason || ((a.reason = new r(e)), t(a.reason));
                    });
                }
                (o.prototype.throwIfRequested = function () {
                    if (this.reason) throw this.reason;
                }),
                    (o.source = function () {
                        var e;
                        return {
                            token: new o(function (t) {
                                e = t;
                            }),
                            cancel: e,
                        };
                    }),
                    (e.exports = o);
            },
            416: (e) => {
                "use strict";
                e.exports = function (e) {
                    return !(!e || !e.__CANCEL__);
                };
            },
            891: (e, t, a) => {
                "use strict";
                var r = a(30),
                    o = a(512),
                    s = a(36),
                    n = a(884),
                    i = a(316);
                function c(e) {
                    (this.defaults = e),
                        (this.interceptors = { request: new s(), response: new s() });
                }
                (c.prototype.request = function (e) {
                    "string" == typeof e
                        ? ((e = arguments[1] || {}).url = arguments[0])
                        : (e = e || {}),
                        (e = i(this.defaults, e)).method
                            ? (e.method = e.method.toLowerCase())
                            : this.defaults.method
                            ? (e.method = this.defaults.method.toLowerCase())
                            : (e.method = "get");
                    var t = [n, void 0],
                        a = Promise.resolve(e);
                    for (
                        this.interceptors.request.forEach(function (e) {
                            t.unshift(e.fulfilled, e.rejected);
                        }),
                            this.interceptors.response.forEach(function (e) {
                                t.push(e.fulfilled, e.rejected);
                            });
                        t.length;

                    )
                        a = a.then(t.shift(), t.shift());
                    return a;
                }),
                    (c.prototype.getUri = function (e) {
                        return (
                            (e = i(this.defaults, e)),
                            o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
                        );
                    }),
                    r.forEach(["delete", "get", "head", "options"], function (e) {
                        c.prototype[e] = function (t, a) {
                            return this.request(i(a || {}, { method: e, url: t }));
                        };
                    }),
                    r.forEach(["post", "put", "patch"], function (e) {
                        c.prototype[e] = function (t, a, r) {
                            return this.request(i(r || {}, { method: e, url: t, data: a }));
                        };
                    }),
                    (e.exports = c);
            },
            36: (e, t, a) => {
                "use strict";
                var r = a(30);
                function o() {
                    this.handlers = [];
                }
                (o.prototype.use = function (e, t) {
                    return (
                        this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1
                    );
                }),
                    (o.prototype.eject = function (e) {
                        this.handlers[e] && (this.handlers[e] = null);
                    }),
                    (o.prototype.forEach = function (e) {
                        r.forEach(this.handlers, function (t) {
                            null !== t && e(t);
                        });
                    }),
                    (e.exports = o);
            },
            791: (e, t, a) => {
                "use strict";
                var r = a(957),
                    o = a(50);
                e.exports = function (e, t) {
                    return e && !r(t) ? o(e, t) : t;
                };
            },
            971: (e, t, a) => {
                "use strict";
                var r = a(136);
                e.exports = function (e, t, a, o, s) {
                    var n = new Error(e);
                    return r(n, t, a, o, s);
                };
            },
            884: (e, t, a) => {
                "use strict";
                var r = a(30),
                    o = a(630),
                    s = a(416),
                    n = a(457);
                function i(e) {
                    e.cancelToken && e.cancelToken.throwIfRequested();
                }
                e.exports = function (e) {
                    return (
                        i(e),
                        (e.headers = e.headers || {}),
                        (e.data = o(e.data, e.headers, e.transformRequest)),
                        (e.headers = r.merge(
                            e.headers.common || {},
                            e.headers[e.method] || {},
                            e.headers
                        )),
                        r.forEach(
                            ["delete", "get", "head", "post", "put", "patch", "common"],
                            function (t) {
                                delete e.headers[t];
                            }
                        ),
                        (e.adapter || n.adapter)(e).then(
                            function (t) {
                                return (
                                    i(e), (t.data = o(t.data, t.headers, e.transformResponse)), t
                                );
                            },
                            function (t) {
                                return (
                                    s(t) ||
                                        (i(e),
                                        t &&
                                            t.response &&
                                            (t.response.data = o(
                                                t.response.data,
                                                t.response.headers,
                                                e.transformResponse
                                            ))),
                                    Promise.reject(t)
                                );
                            }
                        )
                    );
                };
            },
            136: (e) => {
                "use strict";
                e.exports = function (e, t, a, r, o) {
                    return (
                        (e.config = t),
                        a && (e.code = a),
                        (e.request = r),
                        (e.response = o),
                        (e.isAxiosError = !0),
                        (e.toJSON = function () {
                            return {
                                message: this.message,
                                name: this.name,
                                description: this.description,
                                number: this.number,
                                fileName: this.fileName,
                                lineNumber: this.lineNumber,
                                columnNumber: this.columnNumber,
                                stack: this.stack,
                                config: this.config,
                                code: this.code,
                            };
                        }),
                        e
                    );
                };
            },
            316: (e, t, a) => {
                "use strict";
                var r = a(30);
                e.exports = function (e, t) {
                    t = t || {};
                    var a = {},
                        o = ["url", "method", "data"],
                        s = ["headers", "auth", "proxy", "params"],
                        n = [
                            "baseURL",
                            "transformRequest",
                            "transformResponse",
                            "paramsSerializer",
                            "timeout",
                            "timeoutMessage",
                            "withCredentials",
                            "adapter",
                            "responseType",
                            "xsrfCookieName",
                            "xsrfHeaderName",
                            "onUploadProgress",
                            "onDownloadProgress",
                            "decompress",
                            "maxContentLength",
                            "maxBodyLength",
                            "maxRedirects",
                            "transport",
                            "httpAgent",
                            "httpsAgent",
                            "cancelToken",
                            "socketPath",
                            "responseEncoding",
                        ],
                        i = ["validateStatus"];
                    function c(e, t) {
                        return r.isPlainObject(e) && r.isPlainObject(t)
                            ? r.merge(e, t)
                            : r.isPlainObject(t)
                            ? r.merge({}, t)
                            : r.isArray(t)
                            ? t.slice()
                            : t;
                    }
                    function l(o) {
                        r.isUndefined(t[o])
                            ? r.isUndefined(e[o]) || (a[o] = c(void 0, e[o]))
                            : (a[o] = c(e[o], t[o]));
                    }
                    r.forEach(o, function (e) {
                        r.isUndefined(t[e]) || (a[e] = c(void 0, t[e]));
                    }),
                        r.forEach(s, l),
                        r.forEach(n, function (o) {
                            r.isUndefined(t[o])
                                ? r.isUndefined(e[o]) || (a[o] = c(void 0, e[o]))
                                : (a[o] = c(void 0, t[o]));
                        }),
                        r.forEach(i, function (r) {
                            r in t ? (a[r] = c(e[r], t[r])) : r in e && (a[r] = c(void 0, e[r]));
                        });
                    var d = o.concat(s).concat(n).concat(i),
                        u = Object.keys(e)
                            .concat(Object.keys(t))
                            .filter(function (e) {
                                return -1 === d.indexOf(e);
                            });
                    return r.forEach(u, l), a;
                };
            },
            79: (e, t, a) => {
                "use strict";
                var r = a(971);
                e.exports = function (e, t, a) {
                    var o = a.config.validateStatus;
                    a.status && o && !o(a.status)
                        ? t(
                              r(
                                  "Request failed with status code " + a.status,
                                  a.config,
                                  null,
                                  a.request,
                                  a
                              )
                          )
                        : e(a);
                };
            },
            630: (e, t, a) => {
                "use strict";
                var r = a(30);
                e.exports = function (e, t, a) {
                    return (
                        r.forEach(a, function (a) {
                            e = a(e, t);
                        }),
                        e
                    );
                };
            },
            457: (e, t, a) => {
                "use strict";
                var r = a(30),
                    o = a(122),
                    s = { "Content-Type": "application/x-www-form-urlencoded" };
                function n(e, t) {
                    !r.isUndefined(e) &&
                        r.isUndefined(e["Content-Type"]) &&
                        (e["Content-Type"] = t);
                }
                var i,
                    c = {
                        adapter:
                            (("undefined" != typeof XMLHttpRequest ||
                                ("undefined" != typeof process &&
                                    "[object process]" ===
                                        Object.prototype.toString.call(process))) &&
                                (i = a(155)),
                            i),
                        transformRequest: [
                            function (e, t) {
                                return (
                                    o(t, "Accept"),
                                    o(t, "Content-Type"),
                                    r.isFormData(e) ||
                                    r.isArrayBuffer(e) ||
                                    r.isBuffer(e) ||
                                    r.isStream(e) ||
                                    r.isFile(e) ||
                                    r.isBlob(e)
                                        ? e
                                        : r.isArrayBufferView(e)
                                        ? e.buffer
                                        : r.isURLSearchParams(e)
                                        ? (n(t, "application/x-www-form-urlencoded;charset=utf-8"),
                                          e.toString())
                                        : r.isObject(e)
                                        ? (n(t, "application/json;charset=utf-8"),
                                          JSON.stringify(e))
                                        : e
                                );
                            },
                        ],
                        transformResponse: [
                            function (e) {
                                if ("string" == typeof e)
                                    try {
                                        e = JSON.parse(e);
                                    } catch (e) {}
                                return e;
                            },
                        ],
                        timeout: 0,
                        xsrfCookieName: "XSRF-TOKEN",
                        xsrfHeaderName: "X-XSRF-TOKEN",
                        maxContentLength: -1,
                        maxBodyLength: -1,
                        validateStatus: function (e) {
                            return e >= 200 && e < 300;
                        },
                        headers: { common: { Accept: "application/json, text/plain, */*" } },
                    };
                r.forEach(["delete", "get", "head"], function (e) {
                    c.headers[e] = {};
                }),
                    r.forEach(["post", "put", "patch"], function (e) {
                        c.headers[e] = r.merge(s);
                    }),
                    (e.exports = c);
            },
            843: (e) => {
                "use strict";
                e.exports = function (e, t) {
                    return function () {
                        for (var a = new Array(arguments.length), r = 0; r < a.length; r++)
                            a[r] = arguments[r];
                        return e.apply(t, a);
                    };
                };
            },
            512: (e, t, a) => {
                "use strict";
                var r = a(30);
                function o(e) {
                    return encodeURIComponent(e)
                        .replace(/%3A/gi, ":")
                        .replace(/%24/g, "$")
                        .replace(/%2C/gi, ",")
                        .replace(/%20/g, "+")
                        .replace(/%5B/gi, "[")
                        .replace(/%5D/gi, "]");
                }
                e.exports = function (e, t, a) {
                    if (!t) return e;
                    var s;
                    if (a) s = a(t);
                    else if (r.isURLSearchParams(t)) s = t.toString();
                    else {
                        var n = [];
                        r.forEach(t, function (e, t) {
                            null != e &&
                                (r.isArray(e) ? (t += "[]") : (e = [e]),
                                r.forEach(e, function (e) {
                                    r.isDate(e)
                                        ? (e = e.toISOString())
                                        : r.isObject(e) && (e = JSON.stringify(e)),
                                        n.push(o(t) + "=" + o(e));
                                }));
                        }),
                            (s = n.join("&"));
                    }
                    if (s) {
                        var i = e.indexOf("#");
                        -1 !== i && (e = e.slice(0, i)),
                            (e += (-1 === e.indexOf("?") ? "?" : "&") + s);
                    }
                    return e;
                };
            },
            50: (e) => {
                "use strict";
                e.exports = function (e, t) {
                    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
                };
            },
            687: (e, t, a) => {
                "use strict";
                var r = a(30);
                e.exports = r.isStandardBrowserEnv()
                    ? {
                          write: function (e, t, a, o, s, n) {
                              var i = [];
                              i.push(e + "=" + encodeURIComponent(t)),
                                  r.isNumber(a) && i.push("expires=" + new Date(a).toGMTString()),
                                  r.isString(o) && i.push("path=" + o),
                                  r.isString(s) && i.push("domain=" + s),
                                  !0 === n && i.push("secure"),
                                  (document.cookie = i.join("; "));
                          },
                          read: function (e) {
                              var t = document.cookie.match(
                                  new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                              );
                              return t ? decodeURIComponent(t[3]) : null;
                          },
                          remove: function (e) {
                              this.write(e, "", Date.now() - 864e5);
                          },
                      }
                    : {
                          write: function () {},
                          read: function () {
                              return null;
                          },
                          remove: function () {},
                      };
            },
            957: (e) => {
                "use strict";
                e.exports = function (e) {
                    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
                };
            },
            903: (e, t, a) => {
                "use strict";
                var r = a(30);
                e.exports = r.isStandardBrowserEnv()
                    ? (function () {
                          var e,
                              t = /(msie|trident)/i.test(navigator.userAgent),
                              a = document.createElement("a");
                          function o(e) {
                              var r = e;
                              return (
                                  t && (a.setAttribute("href", r), (r = a.href)),
                                  a.setAttribute("href", r),
                                  {
                                      href: a.href,
                                      protocol: a.protocol ? a.protocol.replace(/:$/, "") : "",
                                      host: a.host,
                                      search: a.search ? a.search.replace(/^\?/, "") : "",
                                      hash: a.hash ? a.hash.replace(/^#/, "") : "",
                                      hostname: a.hostname,
                                      port: a.port,
                                      pathname:
                                          "/" === a.pathname.charAt(0)
                                              ? a.pathname
                                              : "/" + a.pathname,
                                  }
                              );
                          }
                          return (
                              (e = o(window.location.href)),
                              function (t) {
                                  var a = r.isString(t) ? o(t) : t;
                                  return a.protocol === e.protocol && a.host === e.host;
                              }
                          );
                      })()
                    : function () {
                          return !0;
                      };
            },
            122: (e, t, a) => {
                "use strict";
                var r = a(30);
                e.exports = function (e, t) {
                    r.forEach(e, function (a, r) {
                        r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = a), delete e[r]);
                    });
                };
            },
            924: (e, t, a) => {
                "use strict";
                var r = a(30),
                    o = [
                        "age",
                        "authorization",
                        "content-length",
                        "content-type",
                        "etag",
                        "expires",
                        "from",
                        "host",
                        "if-modified-since",
                        "if-unmodified-since",
                        "last-modified",
                        "location",
                        "max-forwards",
                        "proxy-authorization",
                        "referer",
                        "retry-after",
                        "user-agent",
                    ];
                e.exports = function (e) {
                    var t,
                        a,
                        s,
                        n = {};
                    return e
                        ? (r.forEach(e.split("\n"), function (e) {
                              if (
                                  ((s = e.indexOf(":")),
                                  (t = r.trim(e.substr(0, s)).toLowerCase()),
                                  (a = r.trim(e.substr(s + 1))),
                                  t)
                              ) {
                                  if (n[t] && o.indexOf(t) >= 0) return;
                                  n[t] =
                                      "set-cookie" === t
                                          ? (n[t] ? n[t] : []).concat([a])
                                          : n[t]
                                          ? n[t] + ", " + a
                                          : a;
                              }
                          }),
                          n)
                        : n;
                };
            },
            545: (e) => {
                "use strict";
                e.exports = function (e) {
                    return function (t) {
                        return e.apply(null, t);
                    };
                };
            },
            30: (e, t, a) => {
                "use strict";
                var r = a(843),
                    o = Object.prototype.toString;
                function s(e) {
                    return "[object Array]" === o.call(e);
                }
                function n(e) {
                    return void 0 === e;
                }
                function i(e) {
                    return null !== e && "object" == typeof e;
                }
                function c(e) {
                    if ("[object Object]" !== o.call(e)) return !1;
                    var t = Object.getPrototypeOf(e);
                    return null === t || t === Object.prototype;
                }
                function l(e) {
                    return "[object Function]" === o.call(e);
                }
                function d(e, t) {
                    if (null != e)
                        if (("object" != typeof e && (e = [e]), s(e)))
                            for (var a = 0, r = e.length; a < r; a++) t.call(null, e[a], a, e);
                        else
                            for (var o in e)
                                Object.prototype.hasOwnProperty.call(e, o) &&
                                    t.call(null, e[o], o, e);
                }
                e.exports = {
                    isArray: s,
                    isArrayBuffer: function (e) {
                        return "[object ArrayBuffer]" === o.call(e);
                    },
                    isBuffer: function (e) {
                        return (
                            null !== e &&
                            !n(e) &&
                            null !== e.constructor &&
                            !n(e.constructor) &&
                            "function" == typeof e.constructor.isBuffer &&
                            e.constructor.isBuffer(e)
                        );
                    },
                    isFormData: function (e) {
                        return "undefined" != typeof FormData && e instanceof FormData;
                    },
                    isArrayBufferView: function (e) {
                        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
                            ? ArrayBuffer.isView(e)
                            : e && e.buffer && e.buffer instanceof ArrayBuffer;
                    },
                    isString: function (e) {
                        return "string" == typeof e;
                    },
                    isNumber: function (e) {
                        return "number" == typeof e;
                    },
                    isObject: i,
                    isPlainObject: c,
                    isUndefined: n,
                    isDate: function (e) {
                        return "[object Date]" === o.call(e);
                    },
                    isFile: function (e) {
                        return "[object File]" === o.call(e);
                    },
                    isBlob: function (e) {
                        return "[object Blob]" === o.call(e);
                    },
                    isFunction: l,
                    isStream: function (e) {
                        return i(e) && l(e.pipe);
                    },
                    isURLSearchParams: function (e) {
                        return (
                            "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
                        );
                    },
                    isStandardBrowserEnv: function () {
                        return (
                            ("undefined" == typeof navigator ||
                                ("ReactNative" !== navigator.product &&
                                    "NativeScript" !== navigator.product &&
                                    "NS" !== navigator.product)) &&
                            "undefined" != typeof window &&
                            "undefined" != typeof document
                        );
                    },
                    forEach: d,
                    merge: function e() {
                        var t = {};
                        function a(a, r) {
                            c(t[r]) && c(a)
                                ? (t[r] = e(t[r], a))
                                : c(a)
                                ? (t[r] = e({}, a))
                                : s(a)
                                ? (t[r] = a.slice())
                                : (t[r] = a);
                        }
                        for (var r = 0, o = arguments.length; r < o; r++) d(arguments[r], a);
                        return t;
                    },
                    extend: function (e, t, a) {
                        return (
                            d(t, function (t, o) {
                                e[o] = a && "function" == typeof t ? r(t, a) : t;
                            }),
                            e
                        );
                    },
                    trim: function (e) {
                        return e.replace(/^\s*/, "").replace(/\s*$/, "");
                    },
                    stripBOM: function (e) {
                        return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
                    },
                };
            },
            609: (e) => {
                "use strict";
                e.exports = jQuery;
            },
        },
        t = {};
    function a(r) {
        if (t[r]) return t[r].exports;
        var o = (t[r] = { exports: {} });
        return e[r](o, o.exports, a), o.exports;
    }
    (a.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return a.d(t, { a: t }), t;
    }),
        (a.d = (e, t) => {
            for (var r in t)
                a.o(t, r) &&
                    !a.o(e, r) &&
                    Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        }),
        (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (() => {
            "use strict";
            var e = a(609),
                t = a.n(e),
                r = a(868),
                o = a.n(r);
            class s {
                constructor() {}
                async todayResults() {
                    try {
                        const e = await o()("https://corona.lmao.ninja/v2/all", {
                            method: "GET",
                            redirect: "follow",
                        });
                        (this.data = await e.data),
                            (this.totalCases = await this.data.cases),
                            (this.totalDead = await this.data.deaths),
                            (this.totalRecovered = await this.data.recovered),
                            (this.todayCases = await this.data.todayCases),
                            (this.todayDeaths = await this.data.todayDeaths),
                            (this.todayRecovered = await this.data.todayRecovered),
                            (this.todayData = await this.data.updated),
                            (this.upDateDTime = await e.data.updated);
                    } catch (e) {
                        console.log(e);
                    }
                }
                async yesterdayResults() {
                    try {
                        const e = await o()(
                            "https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=false",
                            { method: "GET", redirect: "follow" }
                        );
                        (this.data = e.data),
                            (this.yesterdayCases = await e.data.cases),
                            (this.yesterdayDead = await e.data.deaths),
                            (this.yesterdayRecovered = await e.data.recovered),
                            (this.yesterdayTodCases = await e.data.todayCases),
                            (this.yesterdayTodDead = await e.data.todayDeaths),
                            (this.yesterdayTodRecovered = await e.data.todayRecovered);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            class n {
                constructor() {}
                async getResults() {
                    try {
                        const e = await o()(
                            "https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases",
                            { method: "GET", redirect: "follow" }
                        );
                        (this.data = await e.data),
                            (this.cases = await e.data.cases),
                            (this.dead = await e.data.deaths),
                            (this.todayCases = await e.data.todayCases),
                            (this.todayDeads = await e.data.todayDeaths),
                            (this.recovered = await e.data.recovered),
                            (this.todayRecovered = await e.data.todayRecovered),
                            (this.name = await e.data.country),
                            (this.countryInfo = await e.data.countryInfo);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            class i {
                constructor() {}
                async getResults() {
                    try {
                        const e = await o()(
                            "https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false",
                            { method: "GET", redirect: "follow" }
                        );
                        this.result = await e.data;
                    } catch (e) {
                        console.log(e);
                    }
                }
                async getByDayCases() {
                    try {
                        const e = await o()(
                            "https://disease.sh/v3/covid-19/historical/all?lastdays=all",
                            { method: "GET", redirect: "follow" }
                        );
                        (this.result = await e.data),
                            (this.onlyCases = await Object.values(this.result.cases)),
                            (this.onlyDates = await Object.keys(this.result.cases)),
                            (this.onlyDeaths = await Object.values(this.result.deaths)),
                            (this.onlyRecovered = await Object.values(this.result.recovered));
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            const c = {
                    searchForm: document.querySelector(".search"),
                    searchInput: document.querySelector(".select2-search__field"),
                    selectedFilter: document.querySelector(".js-data-filter"),
                    totalCases: document.querySelector("#totalCases"),
                    totalDead: document.querySelector("#totalDeath"),
                    totalRecovered: document.querySelector("#totalRecovered"),
                    fatality: document.querySelector("#valueDedR"),
                    todayCases: document.querySelector("#todayCases"),
                    todayDeaths: document.querySelector("#todayDeaths"),
                    todayRecovered: document.querySelector("#todayRecovered"),
                    countryInfo: document.querySelector(".table__body"),
                    updatedTime: document.querySelector("#updatedTime"),
                    ham: document.querySelector(".icon"),
                    totalCaseInc: document.querySelector("#caseIncrease"),
                    yesterdayCase: document.querySelector("#totalYesterday"),
                    totalDeadInc: document.querySelector("#deadIncrease"),
                    yesterdayDead: document.querySelector("#deadYesterday"),
                    totalRecoveredInc: document.querySelector("#recIncrease"),
                    yesterdayRec: document.querySelector("#recYesterday"),
                    todayCaseInc: document.querySelector("#todayIncrease"),
                    totalYesCases: document.querySelector("#todayYesterday"),
                    todayDeadInc: document.querySelector("#deathIncrease"),
                    totalYesDead: document.querySelector("#deathYesterday"),
                    todayRecoveredInc: document.querySelector("#recoverIncrease"),
                    totalYesRec: document.querySelector("#recoverYesterday"),
                    todCase: document.querySelector(".todCase"),
                    increase: document.querySelector(".info-increase span"),
                    incDec: document.querySelector(".incDec"),
                    tableBody: document.querySelector("#tableBody"),
                    tableMain: document.querySelector(".table__main"),
                    tableMainAr: document.querySelector(".table__main-ar"),
                    caseChart: document.getElementById("cases").getContext("2d"),
                    dailyCases: document.querySelector("#daily-cases"),
                    button1: document.querySelector("#button1"),
                    button2: document.querySelector("#button2"),
                    aboutBtn: document.querySelector(".btn-info"),
                    aboutData: document.querySelector(".about-data"),
                },
                l = document.location.pathname,
                d = () => ({
                    yesterdayPercent: (e, t) => parseFloat((((e - t) / e) * 100).toFixed(2)),
                    FormattingNumber: (e) =>
                        "/arabic.html" == l || "/dist/arabic.html" == l
                            ? isNaN(e)
                                ? e
                                : e < 9999 || e < 1e6
                                ? (e / 1e3).toFixed(2) + "ألف"
                                : e < 1e7 || e < 1e9
                                ? (e / 1e6).toFixed(2) + "مليون"
                                : e < 1e12
                                ? (e / 1e9).toFixed(1) + "مليار"
                                : "1تريليون+"
                            : "/kurdish.html" == l || "/dist/kurdish.html" == l
                            ? isNaN(e)
                                ? e
                                : e < 9999 || e < 1e6
                                ? (e / 1e3).toFixed(2) + "ھـەزار"
                                : e < 1e7 || e < 1e9
                                ? (e / 1e6).toFixed(2) + "مـلـیـۆن"
                                : e < 1e12
                                ? (e / 1e9).toFixed(1) + "مليار"
                                : "1تريليون+"
                            : isNaN(e)
                            ? e
                            : e < 9999
                            ? (e / 1e3).toFixed(2) + "k"
                            : e < 1e6
                            ? (e / 1e3).toFixed(2) + "K"
                            : e < 1e7 || e < 1e9
                            ? (e / 1e6).toFixed(2) + "M"
                            : e < 1e12
                            ? (e / 1e9).toFixed(2) + "B"
                            : "1T+",
                    SignRemove: (e) => ({
                        posAr: Math.abs(parseFloat(e)).toString().toArabicDigits(),
                        pos: Math.abs(parseFloat(e)).toString(),
                    }),
                });
            String.prototype.toArabicDigits = function () {
                var e = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
                return this.replace(/[0-9]/g, function (t) {
                    return e[+t];
                });
            };
            var u = a(609);
            const h = (e) => e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            String.prototype.toArabicDigits = function () {
                var e = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
                return this.replace(/[0-9]/g, function (t) {
                    return e[+t];
                });
            };
            const p = document.location.pathname;
            (u.countryData = (e) => {
                u(".dataTables_length").addClass(".bs-select"),
                    "/arabic.html" === p
                        ? (u("#dtBasicExample").on("draw.dt", function () {
                              u(".paginate_button")
                                  .not(".previous, .next")
                                  .each(function (e, t) {
                                      var a = u(t).text();
                                      (a = new Intl.NumberFormat("ar-EG").format(a)), u(t).text(a);
                                  });
                          }),
                          u("#dtBasicExample").DataTable({
                              pagingType: "simple_numbers",
                              data: e.forEach(u.renderCountriesApi),
                              sort: "data.cases",
                              dom: "lBfrtip",
                              language: {
                                  sProcessing: "جاري التحميل...",
                                  sLengthMenu: "أظهر مُدخلات _MENU_",
                                  sZeroRecords: "لم يُعثر على أية سجلات",
                                  sInfo: "إظـهـار _START_ إلى _END_ مـن أصـل _TOTAL_ مُـدخـل",
                                  sInfoEmpty: "يعرض 0 إلى 0 من أصل 0 سجلّ",
                                  sInfoFiltered: "(منتقاة من مجموع _MAX_ مُدخل)",
                                  sInfoPostFix: "",
                                  sSearch: "ابــــحـــث:",
                                  searchPlaceholder: "ابــحــث عــن الــدولــة",
                                  sUrl: "",
                                  oPaginate: {
                                      sFirst: "الأول",
                                      sPrevious: "السابق",
                                      sNext: "التالي",
                                      sLast: "الأخير",
                                  },
                              },
                              columnDefs: [{ searchable: !1, orderable: !1, targets: 0 }],
                              order: [],
                              bLengthChange: !1,
                              fnRowCallback: function (e, t, a, r) {
                                  var o = r + 1;
                                  return u("td:first", e).html(o), e;
                              },
                          }),
                          u("#dtBasicExample").on("draw.dt", function () {
                              u(".paginate_button")
                                  .not(".previous, .next")
                                  .each(function (e, t) {
                                      var a = u(t).text();
                                      (a = new Intl.NumberFormat("ar-EG").format(a)), u(t).text(a);
                                  });
                          }),
                          u(".dataTables_length").addClass(".bs-select"))
                        : "/kurdish.html" === p
                        ? (u("#dtBasicExample").on("draw.dt", function () {
                              u(".paginate_button")
                                  .not(".previous, .next")
                                  .each(function (e, t) {
                                      var a = u(t).text();
                                      (a = new Intl.NumberFormat("ar-EG").format(a)), u(t).text(a);
                                  });
                          }),
                          u("#dtBasicExample").DataTable({
                              pagingType: "simple_numbers",
                              data: e.forEach(u.renderCountriesApi),
                              sort: "data.cases",
                              dom: "lBfrtip",
                              language: {
                                  sProcessing: "تـكـایـە چـاوەڕوان بـە...",
                                  sLengthMenu: "پـیـشـانـدانـی گـشـتـی وڵـاتـان _MENU_",
                                  sZeroRecords: "ھـیـچ زانـیـاریـیـەكـی تـۆمـاركـراو نـەدۆزرایـەوە",
                                  sInfo:
                                      "پـیـشـانـدانـی _START_ بـۆ _END_ لـە كـۆی گـشـتـی _TOTAL_ تـۆمـاركـراو",
                                  sInfoEmpty:
                                      "پـیـشـانـدانـی 0 بـۆ 0 لـە كـۆی گـشـتـی 0 تـۆمـاركـراو",
                                  sInfoFiltered:
                                      "(دەسـتـنـیـشـانـكـراوە لـە كـۆی گـشـتـی _MAX_ تـۆمـاركـراو)",
                                  sInfoPostFix: "",
                                  sSearch: "گـەڕان:  ",
                                  searchPlaceholder: "گـەڕان بـەدوای وڵـاتـێـكـی دیـاركـراو",
                                  sUrl: "",
                                  oPaginate: {
                                      sFirst: "یـەكـەم",
                                      sPrevious: "پـێـشـووتـر",
                                      sNext: "دواتـر",
                                      sLast: "كـۆتـا",
                                  },
                              },
                              columnDefs: [{ searchable: !1, orderable: !1, targets: 0 }],
                              order: [],
                              bLengthChange: !1,
                              fnRowCallback: function (e, t, a, r) {
                                  var o = r + 1;
                                  return u("td:first", e).html(o), e;
                              },
                          }))
                        : (u("#dtBasicExample").DataTable({
                              pagingType: "simple_numbers",
                              data: e.forEach(u.renderCountriesApi),
                              sort: "data.cases",
                              dom: "lBfrtip",
                              columnDefs: [{ searchable: !1, orderable: !1, targets: 0 }],
                              order: [],
                              bLengthChange: !1,
                              fnRowCallback: function (e, t, a, r) {
                                  var o = r + 1;
                                  return u("td:first", e).html(o), e;
                              },
                          }),
                          u(".dataTables_length").addClass(".bs-select"));
            }),
                (u.renderCountriesApi = (e) => {
                    let t = h(e.cases),
                        a = h(e.deaths),
                        r = h(e.critical),
                        o = h(e.recovered),
                        s = "+" + h(e.todayCases),
                        n = "+" + h(e.todayDeaths),
                        i = "+" + h(e.todayRecovered),
                        l = h(e.active);
                    0 === e.todayCases
                        ? (s = h(e.todayCases))
                        : 0 === e.todayDeaths
                        ? (n = h(e.todayDeaths))
                        : 0 === e.todayRecovered && (i = h(e.todayRecovered)),
                        0 === e.todayCases &&
                            0 === e.todayDeaths &&
                            0 === e.todayRecovered &&
                            ((s = h(e.todayCases)),
                            (n = h(e.todayDeaths)),
                            (i = h(e.todayRecovered))),
                        ("/arabic.html" !== p && "/kurdish.html" !== p) ||
                            ((t = h(e.cases).toArabicDigits()),
                            (a = h(e.deaths).toArabicDigits()),
                            (r = h(e.critical).toArabicDigits()),
                            (o = h(e.recovered).toArabicDigits()),
                            (s = h(e.todayCases).toArabicDigits() + "+"),
                            (n = h(e.todayDeaths).toArabicDigits() + "+"),
                            (i = h(e.todayRecovered).toArabicDigits() + "+"),
                            (l = h(e.active).toArabicDigits()),
                            0 === e.todayCases
                                ? (s = h(e.todayCases).toArabicDigits())
                                : 0 === e.todayDeaths
                                ? (n = h(e.todayDeaths).toArabicDigits())
                                : 0 === e.todayRecovered &&
                                  (i = h(e.todayRecovered).toArabicDigits()),
                            0 === e.todayCases &&
                                0 === e.todayDeaths &&
                                0 === e.todayRecovered &&
                                ((s = h(e.todayCases).toArabicDigits()),
                                (n = h(e.todayDeaths).toArabicDigits()),
                                (i = h(e.todayRecovered).toArabicDigits())));
                    const d = `\n                    <tr class="table__body--row">\n                        <td  class="${
                        "/arabic.html" === p || "/kurdish.html" === p ? "freeze-lang" : "freeze"
                    }">1</td>\n                        <td class=" ${
                        "/arabic.html" === p || "/kurdish.html" === p ? "freeze-lang" : "freeze"
                    }" style="${
                        "/arabic.html" === p
                            ? "right: 5.7rem !important;"
                            : "/kurdish.html" === p
                            ? "right: 4.5rem !important;"
                            : "left: 5rem !important;"
                    }">\n                            <img\n                                src=${
                        e.countryInfo.flag
                    }\n                                class="table__icon"\n                                alt="Country"\n                            />\n                            ${
                        e.country
                    }\n                        </td>\n                        <td >${t}</td>\n                        <td >${a}</td>\n                        <td >${r}</td>\n                        <td >${o}</td>\n                        <td class="${
                        e.todayCases > 0 ? "badge-warning" : void 0
                    }   " id="warn">${s}</td>\n                        <td class=" ${
                        e.todayDeaths > 0 ? "badge-danger" : ""
                    } " id="dang">${n}</td>\n                        <td class="${
                        e.todayRecovered > 0 ? "badge-good" : void 0
                    }  " id="good">${i}</td>\n                        <td >${l}</td>\n                    </tr>\n                    \n    `;
                    u(c.tableBody).append(d),
                        ("/arabic.html" != p && "/kurdish.html" != p) ||
                            (document.querySelector(".freeze-ar").style.textAlign =
                                "right !important");
                });
            var m = a(609);
            String.prototype.toArabicDigits = function () {
                var e = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
                return this.replace(/[0-9]/g, function (t) {
                    return e[+t];
                });
            };
            const f = document.location.pathname,
                g = async (e, t, a, r) => {
                    Chart.defaults.global.defaultFontColor = "#737373";
                    const o = {
                            labels: e,
                            datasets: [
                                {
                                    data: t,
                                    label: "Cases",
                                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                    borderWidth: 1,
                                    order: 1,
                                },
                                {
                                    data: a,
                                    label: "Deaths",
                                    backgroundColor: "rgba(214, 102, 121, 0.3)",
                                    borderColor: "rgba(214, 102, 121, 1)",
                                    borderWidth: 1,
                                    order: 3,
                                },
                                {
                                    data: r,
                                    label: "Recovered",
                                    backgroundColor: "rgba(113, 255, 47, 0.2)",
                                    borderColor: "rgba(113, 255, 47, 1)",
                                    borderWidth: 1,
                                    order: 2,
                                },
                            ],
                        },
                        s = {
                            labels: e,
                            datasets: [
                                {
                                    data: t,
                                    label: "تــوشـبـووان",
                                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                    borderWidth: 1,
                                    order: 1,
                                },
                                {
                                    data: a,
                                    label: "قـوربـانـیـان",
                                    backgroundColor: "rgba(214, 102, 121, 0.3)",
                                    borderColor: "rgba(214, 102, 121, 1)",
                                    borderWidth: 1,
                                    order: 3,
                                },
                                {
                                    data: r,
                                    label: "چـاكـبـوونـەوە",
                                    backgroundColor: "rgba(113, 255, 47, 0.2)",
                                    borderColor: "rgba(113, 255, 47, 1)",
                                    borderWidth: 1,
                                    order: 2,
                                },
                            ],
                        },
                        n = {
                            labels: e,
                            datasets: [
                                {
                                    data: t,
                                    label: "حالات",
                                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                    borderWidth: 1,
                                    order: 1,
                                },
                                {
                                    data: a,
                                    label: "حالات الوفاة",
                                    backgroundColor: "rgba(214, 102, 121, 0.3)",
                                    borderColor: "rgba(214, 102, 121, 1)",
                                    borderWidth: 1,
                                    order: 3,
                                },
                                {
                                    data: r,
                                    label: "تعافى",
                                    backgroundColor: "rgba(113, 255, 47, 0.2)",
                                    borderColor: "rgba(113, 255, 47, 1)",
                                    borderWidth: 1,
                                    order: 2,
                                },
                            ],
                        };
                    let i = new Chart(c.caseChart, {
                        type: "line",
                        responsive: !0,
                        maintainAspectRatio: !1,
                        data: o,
                        options: {
                            animation: {
                                duration: 2e3,
                                onProgress: function (e) {
                                    i.value = e.currentStep / e.numSteps;
                                },
                                onComplete: function () {
                                    window.setTimeout(function () {
                                        i.value = 0;
                                    }, 2e3);
                                },
                            },
                            legend: {
                                display: !0,
                                position: "top",
                                labels: { fontSize: 14, padding: 4 },
                                maxSize: { height: 10 },
                                onClick: function (e, t) {
                                    var a = t.datasetIndex,
                                        r = this.chart,
                                        o =
                                            null !== r.getDatasetMeta(a).hidden &&
                                            r.getDatasetMeta(a).hidden;
                                    r.data.datasets.forEach(function (e, t) {
                                        var s = r.getDatasetMeta(t);
                                        t !== a
                                            ? o
                                                ? null === s.hidden && (s.hidden = !0)
                                                : (s.hidden = null === s.hidden ? !s.hidden : null)
                                            : t === a && (s.hidden = null);
                                    }),
                                        r.update();
                                },
                            },
                            scales: {
                                xAxes: [{ gridLines: { color: "rgba(0, 0, 0, 0)" } }],
                                yAxes: [
                                    {
                                        ticks: {
                                            fontSize: 16,
                                            beginAtZero: !0,
                                            callback: function (e) {
                                                return e >= 0 && e < 1e3
                                                    ? e
                                                    : e >= 1e3 && e < 1e6
                                                    ? e / 1e3 + "k"
                                                    : e >= 1e6 && e < 1e9
                                                    ? e / 1e6 + "m"
                                                    : e;
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    });
                    "/arabic.html" == f
                        ? ((i.data = n),
                          (i.options.scales.yAxes = []),
                          (i.options.scales.xAxes = []),
                          (i.options.legend.labels = { fontSize: 16, padding: 4 }),
                          i.options.scales.xAxes.push({
                              gridLines: { color: "rgba(0, 0, 0, 0)" },
                              ticks: {
                                  fontSize: 14,
                                  callback: function (e) {
                                      return e.toString().toArabicDigits();
                                  },
                              },
                          }),
                          i.options.scales.yAxes.push({
                              ticks: {
                                  fontSize: 16,
                                  beginAtZero: !0,
                                  callback: function (e) {
                                      return e >= 0 && e < 1e3
                                          ? e.toString().toArabicDigits()
                                          : e >= 1e3 && e < 1e6
                                          ? (e / 1e3).toString().toArabicDigits() + "الف"
                                          : e >= 1e6 && e < 1e9
                                          ? (e / 1e6).toString().toArabicDigits() + "م"
                                          : e.toString().toArabicDigits();
                                  },
                              },
                          }),
                          i.update())
                        : "/kurdish.html" == f &&
                          ((i.data = s),
                          (i.options.scales.yAxes = []),
                          (i.options.scales.xAxes = []),
                          (i.options.legend.labels = { fontSize: 16, padding: 4 }),
                          i.options.scales.xAxes.push({
                              gridLines: { color: "rgba(0, 0, 0, 0)" },
                              ticks: {
                                  fontSize: 14,
                                  callback: function (e) {
                                      return e.toString().toArabicDigits();
                                  },
                              },
                          }),
                          i.options.scales.yAxes.push({
                              ticks: {
                                  fontSize: 16,
                                  beginAtZero: !0,
                                  callback: function (e) {
                                      return e >= 0 && e < 1e3
                                          ? e.toString().toArabicDigits()
                                          : e >= 1e3 && e < 1e6
                                          ? (e / 1e3).toString().toArabicDigits() + "ھـەزار"
                                          : e >= 1e6 && e < 1e9
                                          ? (e / 1e6).toString().toArabicDigits() + "م"
                                          : e.toString().toArabicDigits();
                                  },
                              },
                          }),
                          i.update());
                },
                y = (e) => {
                    var t = new Date(e);
                    const a = Math.abs(new Date() - t);
                    return Math.round(a / 6e4);
                },
                v = (e) => e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            String.prototype.toArabicDigits = function () {
                var e = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
                return this.replace(/[0-9]/g, function (t) {
                    return e[+t];
                });
            };
            const b = document.location.pathname,
                C = {},
                x = async () => {
                    (C.chartsData = new i()),
                        (C.casesByDay = new i()),
                        await C.chartsData.getResults(),
                        await C.casesByDay.getByDayCases();
                    try {
                        ((e) => {
                            let t = m.map(
                                e,
                                (e) => (
                                    (e.id = e.id || e.countryInfo._id),
                                    (e.text = e.text || e.country),
                                    (e.flag = e.flag || e.countryInfo.flag),
                                    e
                                )
                            );
                            e = [
                                {
                                    id: 1,
                                    value: "eng",
                                    text: "English",
                                    img: "img/English(default).svg",
                                    url: "index.html",
                                },
                                {
                                    id: 2,
                                    value: "kur",
                                    text: "Kurdish",
                                    img: "img/kurd.png",
                                    url: "kurdish.html",
                                },
                                {
                                    id: 3,
                                    value: "ar",
                                    text: "Arabic",
                                    img: "img/arabic.png",
                                    url: "arabic.html",
                                },
                            ];
                            let a = (e) =>
                                void 0 === e.img
                                    ? m(
                                          '<span class="language-items" ><a class="lang-items" href="' +
                                              e.url +
                                              '">' +
                                              e.text +
                                              "</a></span>"
                                      )
                                    : m(
                                          '<span class="language-items" value="' +
                                              e.value +
                                              '"><img src="' +
                                              e.img +
                                              ' " class="img-flag" /><a class="lang-items" href="' +
                                              e.url +
                                              '">' +
                                              e.text +
                                              "</a></span>"
                                      );
                            const r = (e) => {
                                try {
                                    return e
                                        ? void 0 === e.flag
                                            ? null
                                            : m(
                                                  '<span><img src="' +
                                                      e.flag +
                                                      ' " class="img-flag" /> ' +
                                                      e.text +
                                                      "</span>"
                                              )
                                        : e.flag;
                                } catch (e) {
                                    console.log(e);
                                }
                            };
                            "/arabic.html" == f
                                ? (m(".js-data-filter").select2({
                                      data: t,
                                      templateResult: r,
                                      placeholder: "ابحث عن الدولة",
                                      allowClear: !0,
                                      tags: !0,
                                  }),
                                  m(".pieChart-filler").select2({
                                      data: t,
                                      templateResult: r,
                                      placeholder: "ابحث عن الدولة",
                                      allowClear: !0,
                                      tags: !0,
                                  }),
                                  m(".language-data").select2({
                                      data: [
                                          {
                                              id: 1,
                                              value: "ar",
                                              text: "الــعــربــيــة",
                                              img: "img/arabic.png",
                                              url: "arabic.html",
                                          },
                                          {
                                              id: 2,
                                              value: "kur",
                                              text: "كـــردي",
                                              img: "img/kurd.png",
                                              url: "kurdish.html",
                                          },
                                          {
                                              id: 3,
                                              value: "eng",
                                              text: "الـإنـجـلـيـزيـة",
                                              img: "img/English(default).svg",
                                              url: "index.html",
                                          },
                                      ],
                                      templateResult: a,
                                      minimumResultsForSearch: 1 / 0,
                                      placeholder:
                                          '<span class="language__info" style="display: flex; align-items: center;" ><img src="img/arabic.png" class="img-flag" /> الــعــربــيــة</span>',
                                      allowClear: !0,
                                      escapeMarkup: function (e) {
                                          return e;
                                      },
                                      dropdownCssClass: "increase-zIndex",
                                  }))
                                : "/kurdish.html" == f
                                ? (m(".js-data-filter").select2({
                                      data: t,
                                      templateResult: r,
                                      placeholder: "بـەدواداگـەڕانـی وڵـاتـان",
                                      allowClear: !0,
                                      tags: !0,
                                  }),
                                  m(".pieChart-filler").select2({
                                      data: t,
                                      templateResult: r,
                                      placeholder: "بـەدواداگـەڕانـی وڵـاتـان",
                                      allowClear: !0,
                                      tags: !0,
                                  }),
                                  m(".language-data").select2({
                                      data: [
                                          {
                                              id: 1,
                                              value: "kur",
                                              text: "كـوردی",
                                              img: "img/kurd.png",
                                              url: "kurdish.html",
                                          },
                                          {
                                              id: 2,
                                              value: "ar",
                                              text: "عـەرەبـی",
                                              img: "img/arabic.png",
                                              url: "arabic.html",
                                          },
                                          {
                                              id: 3,
                                              value: "eng",
                                              text: "ئــیــنـگـلـیـزی",
                                              img: "img/English(default).svg",
                                              url: "index.html",
                                          },
                                      ],
                                      templateResult: a,
                                      minimumResultsForSearch: 1 / 0,
                                      placeholder:
                                          '<span class="language__info" style="display: flex; align-items: center;"><img src="img/kurd.png" class="img-flag" /> كـوردی</span>',
                                      allowClear: !0,
                                      escapeMarkup: function (e) {
                                          return e;
                                      },
                                      dropdownCssClass: "increase-zIndex",
                                  }))
                                : (m(".js-data-filter").select2({
                                      data: t,
                                      templateResult: r,
                                      placeholder: "Country Search",
                                      allowClear: !0,
                                      tags: !0,
                                  }),
                                  m(".pieChart-filler").select2({
                                      data: t,
                                      templateResult: r,
                                      placeholder: "Country Search",
                                      allowClear: !0,
                                      tags: !0,
                                  }),
                                  m(".language-data").select2({
                                      data: e,
                                      templateResult: a,
                                      minimumResultsForSearch: 1 / 0,
                                      placeholder:
                                          '<span class="language__info" style="display: flex; align-items: center;" ><img src="img/English(default).svg" class="img-flag" />English</span>',
                                      allowClear: !0,
                                      escapeMarkup: function (e) {
                                          return e;
                                      },
                                      dropdownCssClass: "increase-zIndex",
                                  })),
                                m(".language-data").on("select2:select", function (e) {
                                    console.log(e.params.data.url),
                                        window.open(e.params.data.url, "_self");
                                });
                        })(C.chartsData.result),
                            (async (e) => {
                                console.log(e),
                                    (mapboxgl.accessToken =
                                        "pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg");
                                var t = new mapboxgl.Map({
                                    container: "map",
                                    style: "mapbox://styles/shamzx/ckgtlhahs0m4y19pg0rwudv3p",
                                    center: [-16.343, 32.757],
                                    zoom: 2.25,
                                });
                                t.addControl(
                                    new MapboxGeocoder({
                                        accessToken: mapboxgl.accessToken,
                                        mapboxgl,
                                    })
                                ),
                                    t.addControl(new mapboxgl.NavigationControl()),
                                    t.addControl(new mapboxgl.FullscreenControl());
                                let a = await e;
                                const r = (e) => {
                                    var t = [];
                                    return (
                                        e.forEach((e) => {
                                            const a = parseInt(
                                                ((r = e.cases),
                                                isNaN(r) || r < 999
                                                    ? r
                                                    : r < 9999
                                                    ? (r / 1e3).toFixed(1) + "k"
                                                    : r < 1e6
                                                    ? Math.round(r / 1e3) + "K"
                                                    : r < 1e7 || r < 1e9
                                                    ? (r / 1e6).toFixed(1) + "M"
                                                    : r < 1e12
                                                    ? (r / 1e9).toFixed(1) + "B"
                                                    : "1T+")
                                            );
                                            var r;
                                            t.push({
                                                latitude: e.countryInfo.lat,
                                                longitude: e.countryInfo.long,
                                                text: e.text,
                                                flag: e.flag,
                                                cases: e.cases,
                                                deaths: e.deaths,
                                                recovered: e.recovered,
                                                active: e.active,
                                                formatCases: a,
                                                updated: e.updated,
                                            });
                                        }),
                                        GeoJSON.parse(t, {
                                            Point: ["latitude", "longitude"],
                                            include: [
                                                "text",
                                                "flag",
                                                "cases",
                                                "deaths",
                                                "recovered",
                                                "active",
                                                "formatCases",
                                                "updated",
                                            ],
                                        })
                                    );
                                };
                                console.log(r(a));
                                const o = r(a);
                                var s = [
                                    "#fed976",
                                    "#51bbd6",
                                    "#52e374",
                                    "#feb24c",
                                    "#fd8d3c",
                                    "#fc4e2a",
                                    "#e31a1c",
                                    "#fc3f41",
                                ];
                                t.on("load", async () => {
                                    const e = ["get", "cases"],
                                        a = ["<=", e, 1e5],
                                        r = ["<=", e, 5e5],
                                        n = ["<=", e, 1e6],
                                        i = ["<=", e, 5e6];
                                    t.addSource("mapCases", {
                                        type: "geojson",
                                        data: o,
                                        cluster: !0,
                                        clusterRadius: 15,
                                        clusterProperties: {
                                            cases: [
                                                "+",
                                                ["case", [">=", ["get", "cases"], 1], 1, 0],
                                            ],
                                            cases2: ["+", ["case", a, 1, 0]],
                                            cases3: ["+", ["case", r, 1, 0]],
                                            cases4: ["+", ["case", n, 1, 0]],
                                            cases5: ["+", ["case", i, 1, 0]],
                                        },
                                    }),
                                        t.addLayer({
                                            id: "cluster",
                                            type: "circle",
                                            source: "mapCases",
                                            filter: ["!=", "cluster", !0],
                                            paint: {
                                                "circle-color": [
                                                    "case",
                                                    a,
                                                    "#52e374",
                                                    r,
                                                    "#51bbd6",
                                                    n,
                                                    s[0],
                                                    i,
                                                    "#fc9c19",
                                                    s[7],
                                                ],
                                                "circle-opacity": 0.6,
                                                "circle-radius": 23,
                                            },
                                        }),
                                        t.addLayer({
                                            id: "cluster-count",
                                            type: "symbol",
                                            source: "mapCases",
                                            filter: ["!=", "cluster", !0],
                                            layout: {
                                                "text-field": [
                                                    "number-format",
                                                    ["get", "cases"],
                                                    {
                                                        "min-fraction-digits": 0,
                                                        "max-fraction-digits": 1,
                                                    },
                                                ],
                                                "text-font": [
                                                    "Open Sans Semibold",
                                                    "Arial Unicode MS Bold",
                                                ],
                                                "text-size": 10,
                                            },
                                            paint: {
                                                "text-color": [
                                                    "case",
                                                    [">", ["get", "cases"], 1],
                                                    "black",
                                                    "white",
                                                ],
                                            },
                                        });
                                }),
                                    t.on("click", "cluster", function (e) {
                                        var a = e.features[0].geometry.coordinates.slice(),
                                            r = e.features[0].properties.text;
                                        let o = e.features[0].properties.flag,
                                            s = v(e.features[0].properties.cases),
                                            n = v(e.features[0].properties.deaths),
                                            i = v(e.features[0].properties.recovered),
                                            c = v(e.features[0].properties.active),
                                            l = y(e.features[0].properties.updated);
                                        ("/arabic.html" !== b && "/kurdish.html" !== b) ||
                                            ((s = v(
                                                e.features[0].properties.cases
                                            ).toArabicDigits()),
                                            (n = v(
                                                e.features[0].properties.deaths
                                            ).toArabicDigits()),
                                            (i = v(
                                                e.features[0].properties.recovered
                                            ).toArabicDigits()),
                                            (c = v(
                                                e.features[0].properties.active
                                            ).toArabicDigits()),
                                            (l = y(e.features[0].properties.updated)
                                                .toString()
                                                .toArabicDigits())),
                                            new mapboxgl.Popup()
                                                .setLngLat(a)
                                                .setHTML(
                                                    `\n\n                    <div class="${
                                                        "/arabic.html" === b ||
                                                        "/kurdish.html" === b
                                                            ? "map-popup--lang"
                                                            : "map-popup"
                                                    }">\n                        <div class="popup-header">\n                        <img style="margin-left: .4rem;"\n                                    src="img/virus-1.svg"\n                                    width="25"\n                                    height="25"\n                                    class="d-inline-block align-top"\n                                    alt="logo"\n                                />\n                            <h5  style="font-size: 1.7rem; margin-left: 1rem;">${
                                                        "/arabic.html" === b
                                                            ? "تـعـقـب كـوفـیـد-١٩"
                                                            : "/kurdish.html" === b
                                                            ? "بـەدواداچـوونـی كـۆڤـیـد-١٩"
                                                            : " Covid-19 Tracker"
                                                    }</h5></div>\n                        <div class="popup-title">\n                            <span id="infoCountryLegend" style="margin-left: .4rem;"\n                                >${r} &nbsp;&nbsp;\n                                <img\n                                    src="${o}"\n                                    style="max-width: 30px; height: auto"\n                                    onerror="this.style.display='none'"\n                                    onwidth="20"\n                            /></span>\n                            <span\n                                id="${
                                                        "/arabic.html" === b ||
                                                        "/kurdish.html" === b
                                                            ? "infoUpdatedLegend-lang"
                                                            : "infoUpdatedLegend"
                                                    }"\n                                >\n                                ${
                                                        "/arabic.html" == b
                                                            ? "محدث"
                                                            : "/kurdish.html" === b
                                                            ? "تازەکراوەتەوە"
                                                            : "Updated"
                                                    } <span style="color: var(--warning);">${l}</span>  ${
                                                        "/arabic.html" == b
                                                            ? "دقائق مضت"
                                                            : "/kurdish.html" === b
                                                            ? "خولەک پێش ئێستا"
                                                            : "minutes ago"
                                                    }</span>\n                            <hr\n                                style="\n                                    border: 0.1rem solid rgb(212, 212, 212);\n                                    width: 8vh;\n                                    margin-top: 1vh;\n                                    margin-bottom: 1vh;\n                                "\n                                align="left"\n                            />\n                        </div>\n                        <article class="popup__data">\n                            <div class="popup__data-cases">\n                                <h5>${
                                                        "/arabic.html" == b
                                                            ? "حـالـات"
                                                            : "/kurdish.html" == b
                                                            ? "توشبووان"
                                                            : "Cases"
                                                    }</h5>\n                                <span>\n                                    <img src="img/health.svg" alt="icon" width="22.5" height="22.5"\n                                /></span>\n                                <span id="popCase padTop">${s}</span>\n                            </div>\n                            <div class="popup__data-deaths">\n                                <h5> ${
                                                        "/arabic.html" == b
                                                            ? "الـوفـاة"
                                                            : "/kurdish.html" == b
                                                            ? "قوربانیان"
                                                            : "Deaths"
                                                    }</h5>\n                                <span>\n                                    <img src="img/headstone.svg" alt="icon" width="22.5" height="22.5"\n                                /></span>\n                                <span id="popDead padTop" style="color: var(--danger)">${n}</span>\n                            </div>\n                            <div class="popup__data-recovered">\n                                <h5> ${
                                                        "/arabic.html" == b
                                                            ? "تـعـافـى"
                                                            : "/kurdish.html" == b
                                                            ? "چاکبووەوان"
                                                            : "Recovered"
                                                    }</h5>\n                                <span>\n                                    <img src="img/heartbeat.svg" alt="icon" width="22.5" height="22.5"\n                                /></span>\n                                <span id="popRec padTop" style="color: var(--success)">${i}</span>\n                            </div>\n                            <div class="popup__data-active" >\n                                <h5> ${
                                                        "/arabic.html" == b
                                                            ? "الـمـصـابـة حـالـيـا"
                                                            : "/kurdish.html" == b
                                                            ? "حاڵەتە چەڵاکەکان"
                                                            : "Active"
                                                    }</h5>\n                                <span>\n                                <span id="popAct padTop">${c}</span>\n                                    <img\n                                        src="img/safety-suit.svg"\n                                        alt="icon"\n                                        width="22.5"\n                                        height="22.5"\n                                /></span>\n                            </div>\n                        </article>\n                    </div>\n        `
                                                )
                                                .addTo(t);
                                    }),
                                    t.on("mouseenter", "cluster", function () {
                                        t.getCanvas().style.cursor = "pointer";
                                    }),
                                    t.on("mouseleave", "cluster", function () {
                                        t.getCanvas().style.cursor = "";
                                    });
                                var n = {},
                                    i = {};
                                const c = () => {
                                    for (
                                        var e = {}, a = t.querySourceFeatures("mapCases"), r = 0;
                                        r < a.length;
                                        r++
                                    ) {
                                        var o = a[r].geometry.coordinates,
                                            s = a[r].properties.cases;
                                        if (s.cluster) {
                                            var c = s,
                                                d = n[c];
                                            if (!d) {
                                                var u = l(s);
                                                d = n[c] = new mapboxgl.Marker({
                                                    element: u,
                                                }).setLngLat(o);
                                            }
                                            (e[c] = d), i[c] || d.addTo(t);
                                        }
                                    }
                                    for (c in i) e[c] || i[c].remove();
                                    i = e;
                                };
                                function l(e) {
                                    for (
                                        var t = [],
                                            a = [e.cases2, e.cases3, e.cases4],
                                            r = 0,
                                            o = 0;
                                        o < a.length;
                                        o++
                                    )
                                        t.push(r), (r += a[o]);
                                    var n = r >= 1e3 ? 14 : r >= 100 ? 12 : r >= 10 ? 24 : 18,
                                        i = Math.round(0.6 * n),
                                        c = 2 * n,
                                        l =
                                            '<div><svg width="' +
                                            c +
                                            '" height="' +
                                            c +
                                            '" viewbox="0 0 ' +
                                            c +
                                            " " +
                                            c +
                                            '" text-anchor="middle" style=" display: block; width: 6rem; height: 5rem" >';
                                    for (o = 0; o < a.length; o++)
                                        l += d(t[o] / r, (t[o] + a[o]) / r, n, i, s[o]);
                                    l +=
                                        '<circle cx="' +
                                        n +
                                        '" cy="' +
                                        n +
                                        '" r="' +
                                        i +
                                        '" fill="white" /><text dominant-baseline="central" transform="translate(' +
                                        n +
                                        ", " +
                                        n +
                                        ')">' +
                                        r.toLocaleString() +
                                        "</text></svg></div>";
                                    var u = document.createElement("div");
                                    return (u.innerHTML = l), u.firstChild;
                                }
                                function d(e, t, a, r, o) {
                                    t - e == 1 && (t -= 1e-5);
                                    var s = 2 * Math.PI * (e - 0.25),
                                        n = 2 * Math.PI * (t - 0.25),
                                        i = Math.cos(s),
                                        c = Math.sin(s),
                                        l = Math.cos(n),
                                        d = Math.sin(n),
                                        u = t - e > 0.5 ? 1 : 0;
                                    return [
                                        '<path d="M',
                                        a + r * i,
                                        a + r * c,
                                        "L",
                                        a + a * i,
                                        a + a * c,
                                        "A",
                                        a,
                                        a,
                                        0,
                                        u,
                                        1,
                                        a + a * l,
                                        a + a * d,
                                        "L",
                                        a + r * l,
                                        a + r * d,
                                        "A",
                                        r,
                                        r,
                                        0,
                                        u,
                                        0,
                                        a + r * i,
                                        a + r * c,
                                        '" fill="' + o + '" />',
                                    ].join(" ");
                                }
                                t.on("data", (e) => {
                                    "mapCases" === e.sourceId &&
                                        e.isSourceLoaded &&
                                        (t.on("move", c), t.on("moveend", c), c());
                                });
                            })(C.chartsData.result),
                            g(
                                C.casesByDay.onlyDates,
                                C.casesByDay.onlyCases,
                                C.casesByDay.onlyDeaths,
                                C.casesByDay.onlyRecovered
                            );
                    } catch (e) {
                        console.log(e);
                    }
                };
            (window.onload = () => {
                (async () => {
                    if (((C.today = new s()), (C.yesterday = new s()), C.today && C.yesterday))
                        try {
                            await C.today.todayResults(),
                                await C.yesterday.yesterdayResults(),
                                (async (e) => {
                                    const t = await e.cases,
                                        a = await e.active,
                                        r = await e.recovered,
                                        o = await e.deaths,
                                        s = await e.todayCases,
                                        n = await e.todayDeaths,
                                        i = await e.todayRecovered;
                                    await e.casesPerOneMillion,
                                        await e.deathPerOneMillion,
                                        await e.recoveredPerOneMillion,
                                        await e.tests,
                                        am4core.ready(function () {
                                            am4core.useTheme(am4themes_dark),
                                                am4core.useTheme(am4themes_animated);
                                            var e = am4core.create("chartdiv", am4charts.PieChart),
                                                c = am4core.create("chartdiv2", am4charts.PieChart);
                                            const l = [
                                                    {
                                                        title: "Cases",
                                                        value: t,
                                                        color: am4core.color("#388DB2"),
                                                    },
                                                    {
                                                        title: "Active",
                                                        value: a,
                                                        color: am4core.color("#C767DC"),
                                                    },
                                                    {
                                                        title: "Recovered",
                                                        value: r,
                                                        color: am4core.color("#4CB27F"),
                                                    },
                                                    {
                                                        title: "Deaths",
                                                        value: o,
                                                        color: am4core.color("#902C2D"),
                                                    },
                                                ],
                                                d = [
                                                    {
                                                        title: "Today Cases",
                                                        value: s,
                                                        color: am4core.color("#67B7DC"),
                                                    },
                                                    {
                                                        title: "Today Recovered",
                                                        value: i,
                                                        color: am4core.color("#69D7A0"),
                                                    },
                                                    {
                                                        title: "Today Deaths",
                                                        value: n,
                                                        color: am4core.color("#FF5043"),
                                                    },
                                                ],
                                                u = [
                                                    {
                                                        title: "تــوشـبـووان",
                                                        value: t,
                                                        color: am4core.color("#388DB2"),
                                                    },
                                                    {
                                                        title: "حـاڵـەتـە چـاڵـاكـەكـان",
                                                        value: a,
                                                        color: am4core.color("#C767DC"),
                                                    },
                                                    {
                                                        title: "چـاكـبـوونـەوە",
                                                        value: r,
                                                        color: am4core.color("#4CB27F"),
                                                    },
                                                    {
                                                        title: "قـوربـانـیـان",
                                                        value: o,
                                                        color: am4core.color("#902C2D"),
                                                    },
                                                ],
                                                h = [
                                                    {
                                                        title: "تــوشبـووانـی ئـەمـڕۆ",
                                                        value: s,
                                                        color: am4core.color("#67B7DC"),
                                                    },
                                                    {
                                                        title: "چاكبـوونەوەی ئـەمـڕۆ",
                                                        value: i,
                                                        color: am4core.color("#69D7A0"),
                                                    },
                                                    {
                                                        title: "قـوربـانـیـانـی ئـەمـڕۆ",
                                                        value: n,
                                                        color: am4core.color("#FF5043"),
                                                    },
                                                ],
                                                p = [
                                                    {
                                                        title: "حالات",
                                                        value: t,
                                                        color: am4core.color("#388DB2"),
                                                    },
                                                    {
                                                        title: "حالات نشطة",
                                                        value: a,
                                                        color: am4core.color("#C767DC"),
                                                    },
                                                    {
                                                        title: "تعافى",
                                                        value: r,
                                                        color: am4core.color("#4CB27F"),
                                                    },
                                                    {
                                                        title: "الوفاة",
                                                        value: o,
                                                        color: am4core.color("#902C2D"),
                                                    },
                                                ],
                                                g = [
                                                    {
                                                        title: " حالات اليوم",
                                                        value: s,
                                                        color: am4core.color("#67B7DC"),
                                                    },
                                                    {
                                                        title: " تعافى اليوم",
                                                        value: i,
                                                        color: am4core.color("#69D7A0"),
                                                    },
                                                    {
                                                        title: " وفيات اليوم",
                                                        value: n,
                                                        color: am4core.color("#FF5043"),
                                                    },
                                                ];
                                            (e.data = l), (c.data = d);
                                            var y = e.series.push(new am4charts.PieSeries());
                                            (y.dataFields.value = "value"),
                                                (y.dataFields.category = "title"),
                                                (y.labels.template.text = "{category}: {value}"),
                                                (y.slices.template.tooltipText =
                                                    "{category}: {value}"),
                                                (y.labels.template.maxWidth = 110),
                                                (y.labels.template.wrap = !0),
                                                (e.responsive.enabled = !0),
                                                (e.radius = am4core.percent(75)),
                                                e.responsive.rules.push({
                                                    relevant: function (e) {
                                                        return e.pixelWidth <= 500;
                                                    },
                                                    state: function (e, t) {
                                                        if (
                                                            e instanceof am4charts.Chart ||
                                                            e instanceof am4charts.PieSeries ||
                                                            e instanceof am4charts.Legend
                                                        ) {
                                                            let a = e.states.create(t);
                                                            return (
                                                                (a.properties.radius = am4core.percent(
                                                                    80
                                                                )),
                                                                (a.properties.alignLabels = !1),
                                                                a
                                                            );
                                                        }
                                                        return null;
                                                    },
                                                }),
                                                e.responsive.rules.push({
                                                    relevant: function (e) {
                                                        return e.pixelWidth <= 375;
                                                    },
                                                    state: function (e, t) {
                                                        if (
                                                            e instanceof am4charts.Chart ||
                                                            e instanceof am4charts.PieSeries
                                                        ) {
                                                            let a = e.states.create(t);
                                                            return (
                                                                (a.properties.radius = am4core.percent(
                                                                    70
                                                                )),
                                                                a
                                                            );
                                                        }
                                                        if (e instanceof am4charts.Legend) {
                                                            let a = e.states.create(t);
                                                            return (a.properties.maxWidth = 200), a;
                                                        }
                                                        return null;
                                                    },
                                                }),
                                                (y.alignLabels = !0),
                                                (y.slices.template.stroke = am4core.color("#fff")),
                                                (y.slices.template.strokeOpacity = 1),
                                                (y.slices.template.propertyFields.fill = "color"),
                                                y.slices.template.events.on("hit", function (e) {
                                                    console.log(e.target.dataItem.value);
                                                }),
                                                (e.legend = new am4charts.Legend()),
                                                (y.hiddenState.properties.opacity = 1),
                                                (y.hiddenState.properties.endAngle = -90),
                                                (y.hiddenState.properties.startAngle = -90),
                                                (e.hiddenState.properties.radius = am4core.percent(
                                                    0
                                                )),
                                                (e.hiddenState.transitionDuration = 500),
                                                (e.preloader.disabled = !1);
                                            var v = c.series.push(new am4charts.PieSeries());
                                            (v.dataFields.value = "value"),
                                                (v.dataFields.category = "title"),
                                                (v.labels.template.text = "{category}: {value}"),
                                                (v.slices.template.tooltipText =
                                                    "{category}: {value}"),
                                                (v.labels.template.maxWidth = 110),
                                                (v.labels.template.wrap = !0),
                                                (c.responsive.enabled = !0),
                                                (c.radius = am4core.percent(75)),
                                                c.responsive.rules.push({
                                                    relevant: function (e) {
                                                        return e.pixelWidth <= 500;
                                                    },
                                                    state: function (e, t) {
                                                        if (
                                                            e instanceof am4charts.Chart ||
                                                            e instanceof am4charts.PieSeries ||
                                                            e instanceof am4charts.Legend
                                                        ) {
                                                            let a = e.states.create(t);
                                                            return (
                                                                (a.properties.radius = am4core.percent(
                                                                    80
                                                                )),
                                                                (a.properties.alignLabels = !1),
                                                                a
                                                            );
                                                        }
                                                        return null;
                                                    },
                                                }),
                                                c.responsive.rules.push({
                                                    relevant: function (e) {
                                                        return e.pixelWidth <= 375;
                                                    },
                                                    state: function (e, t) {
                                                        if (
                                                            e instanceof am4charts.Chart ||
                                                            e instanceof am4charts.PieSeries
                                                        ) {
                                                            let a = e.states.create(t);
                                                            return (
                                                                (a.properties.radius = am4core.percent(
                                                                    70
                                                                )),
                                                                (a.properties.paddingTop = 0),
                                                                (a.properties.paddingRight = 25),
                                                                (a.properties.paddingBottom = 0),
                                                                (a.properties.paddingLeft = 7),
                                                                a
                                                            );
                                                        }
                                                        if (e instanceof am4charts.Legend) {
                                                            let r = e.states.create(t);
                                                            var a = e.labels.template.states.create(
                                                                t
                                                            );
                                                            return (
                                                                (a.properties.maxWidth = 0),
                                                                (a.properties.truncate = !0),
                                                                r
                                                            );
                                                        }
                                                        return null;
                                                    },
                                                }),
                                                (v.alignLabels = !0),
                                                (v.slices.template.stroke = am4core.color("#fff")),
                                                (v.slices.template.strokeOpacity = 1),
                                                (v.slices.template.propertyFields.fill = "color"),
                                                (c.legend = new am4charts.Legend()),
                                                (v.hiddenState.properties.opacity = 1),
                                                (v.hiddenState.properties.endAngle = -90),
                                                (v.hiddenState.properties.startAngle = -90),
                                                (c.hiddenState.properties.radius = am4core.percent(
                                                    0
                                                )),
                                                (c.hiddenState.transitionDuration = 500),
                                                (c.preloader.disabled = !1),
                                                m(".theme-switch").on("click", () => {
                                                    m("body").hasClass("light-theme")
                                                        ? ((y.labels.template.fill = am4core.color(
                                                              "#696969"
                                                          )),
                                                          (v.labels.template.fill = am4core.color(
                                                              "#696969"
                                                          )),
                                                          (e.legend.valueLabels.template.fill = am4core.color(
                                                              "#696969"
                                                          )),
                                                          (c.legend.valueLabels.template.fill = am4core.color(
                                                              "#696969"
                                                          )),
                                                          (e.legend.labels.template.fill = am4core.color(
                                                              "#696969"
                                                          )),
                                                          (c.legend.labels.template.fill = am4core.color(
                                                              "#696969"
                                                          )))
                                                        : ((y.labels.template.fill = am4core.color(
                                                              "white"
                                                          )),
                                                          (v.labels.template.fill = am4core.color(
                                                              "white"
                                                          )),
                                                          (e.legend.valueLabels.template.fill = am4core.color(
                                                              "white"
                                                          )),
                                                          (c.legend.valueLabels.template.fill = am4core.color(
                                                              "white"
                                                          )),
                                                          (e.legend.labels.template.fill = am4core.color(
                                                              "white"
                                                          )),
                                                          (c.legend.labels.template.fill = am4core.color(
                                                              "white"
                                                          )));
                                                }),
                                                "/kurdish.html" == f
                                                    ? ((e.rtl = !0),
                                                      (c.rtl = !0),
                                                      (e.legend.itemContainers.template.reverseOrder = !0),
                                                      (c.legend.itemContainers.template.reverseOrder = !0),
                                                      (e.data = u),
                                                      (c.data = h))
                                                    : "/arabic.html" == f &&
                                                      ((e.rtl = !0),
                                                      (c.rtl = !0),
                                                      (e.legend.itemContainers.template.reverseOrder = !0),
                                                      (c.legend.itemContainers.template.reverseOrder = !0),
                                                      (e.data = p),
                                                      (c.data = g)),
                                                m(".pieChart-filler").on(
                                                    "select2:select",
                                                    function (t) {
                                                        m("#flag2").remove(),
                                                            m("#flag3").remove(),
                                                            m("#worldTot2").remove(),
                                                            m("#worldTot3").remove(),
                                                            m("#country-cases-daily").remove();
                                                        var a = t.params.data.flag;
                                                        m(".select2-selection__rendered")
                                                            .eq(2)
                                                            .prepend(
                                                                "<img class='img-flag' src=" +
                                                                    a +
                                                                    ">"
                                                            ),
                                                            m(".text-big")
                                                                .eq(1)
                                                                .prepend(
                                                                    "<img  id='flag2' class='img-flag__main' src=" +
                                                                        a +
                                                                        ">"
                                                                ),
                                                            m(".text-big")
                                                                .eq(2)
                                                                .prepend(
                                                                    "<img  id='flag3' class='img-flag__main' src=" +
                                                                        a +
                                                                        ">"
                                                                );
                                                        const r = t.params.data.country;
                                                        m.ajax({
                                                            url:
                                                                "https://disease.sh/v3/covid-19/countries/" +
                                                                r +
                                                                "?yesterday=true&twoDaysAgo=false",
                                                            type: "GET",
                                                            dataType: "json",
                                                            "X-Requested-With": "XMLHttpRequest",
                                                            success: async (t) => {
                                                                const a = await t.cases,
                                                                    r = await t.active,
                                                                    o =
                                                                        (await t.critical,
                                                                        await t.recovered),
                                                                    s = await t.deaths,
                                                                    n = await t.todayCases,
                                                                    i = await t.todayDeaths,
                                                                    l = await t.todayRecovered;
                                                                await t.casesPerOneMillion,
                                                                    await t.deathPerOneMillion,
                                                                    await t.recoveredPerOneMillion,
                                                                    await t.tests,
                                                                    console.log(t),
                                                                    (e.data = [
                                                                        {
                                                                            title: "Cases",
                                                                            value: a,
                                                                            color: am4core.color(
                                                                                "#67B7DC"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "Active",
                                                                            value: r,
                                                                            color: am4core.color(
                                                                                "#C767DC"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "Recovered",
                                                                            value: o,
                                                                            color: am4core.color(
                                                                                "#4CB27F"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "Deaths",
                                                                            value: s,
                                                                            color: am4core.color(
                                                                                "#902C2D"
                                                                            ),
                                                                        },
                                                                    ]),
                                                                    (c.data = [
                                                                        {
                                                                            title: "Today Cases",
                                                                            value: a,
                                                                            color: am4core.color(
                                                                                "#67B7DC"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title:
                                                                                "Today Recovered",
                                                                            value: o,
                                                                            color: am4core.color(
                                                                                "#4CB27F"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "Today Deaths",
                                                                            value: s,
                                                                            color: am4core.color(
                                                                                "#902C2D"
                                                                            ),
                                                                        },
                                                                    ]),
                                                                    e.invalidateRawData(),
                                                                    c.invalidateRawData();
                                                                const d = [
                                                                        {
                                                                            title: "دۆسیـە",
                                                                            value: a,
                                                                            color: am4core.color(
                                                                                "#388DB2"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "چـاڵـاك",
                                                                            value: r,
                                                                            color: am4core.color(
                                                                                "#C767DC"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "چـاكـبـوونـەوە",
                                                                            value: o,
                                                                            color: am4core.color(
                                                                                "#4CB27F"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "مردووان",
                                                                            value: s,
                                                                            color: am4core.color(
                                                                                "#902C2D"
                                                                            ),
                                                                        },
                                                                    ],
                                                                    u = [
                                                                        {
                                                                            title:
                                                                                "كـەیسەكانی ئـەمـرۆ",
                                                                            value: n,
                                                                            color: am4core.color(
                                                                                "#67B7DC"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title:
                                                                                "چاكبـوونەوەی ئەمڕۆ",
                                                                            value: l,
                                                                            color: am4core.color(
                                                                                "#69D7A0"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title:
                                                                                "مـردووانی ئەمڕۆ",
                                                                            value: i,
                                                                            color: am4core.color(
                                                                                "#FF5043"
                                                                            ),
                                                                        },
                                                                    ],
                                                                    h = [
                                                                        {
                                                                            title: "حالات",
                                                                            value: a,
                                                                            color: am4core.color(
                                                                                "#388DB2"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "حالات نشطة",
                                                                            value: r,
                                                                            color: am4core.color(
                                                                                "#C767DC"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "تعافى",
                                                                            value: o,
                                                                            color: am4core.color(
                                                                                "#4CB27F"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: "الوفاة",
                                                                            value: s,
                                                                            color: am4core.color(
                                                                                "#902C2D"
                                                                            ),
                                                                        },
                                                                    ],
                                                                    p = [
                                                                        {
                                                                            title: " حالات اليوم",
                                                                            value: n,
                                                                            color: am4core.color(
                                                                                "#67B7DC"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: " تعافى اليوم",
                                                                            value: l,
                                                                            color: am4core.color(
                                                                                "#69D7A0"
                                                                            ),
                                                                        },
                                                                        {
                                                                            title: " وفيات اليوم",
                                                                            value: i,
                                                                            color: am4core.color(
                                                                                "#FF5043"
                                                                            ),
                                                                        },
                                                                    ];
                                                                "/kurdish.html" == f &&
                                                                    ((e.rtl = !0),
                                                                    (c.rtl = !0),
                                                                    (e.legend.itemContainers.template.reverseOrder = !0),
                                                                    (c.legend.itemContainers.template.reverseOrder = !0),
                                                                    (e.data = d),
                                                                    (c.data = u)),
                                                                    "/arabic.html" == f &&
                                                                        ((e.rtl = !0),
                                                                        (c.rtl = !0),
                                                                        (e.legend.itemContainers.template.reverseOrder = !0),
                                                                        (c.legend.itemContainers.template.reverseOrder = !0),
                                                                        (e.data = h),
                                                                        (c.data = p));
                                                            },
                                                            error: (e) => {
                                                                console.log(e);
                                                            },
                                                        });
                                                    }
                                                );
                                        });
                                })(C.today.data),
                                ((e, t) => {
                                    const a = e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    c.totalCases.textContent = a;
                                    const r = d();
                                    c.yesterdayCase.textContent = "(" + r.FormattingNumber(t) + ")";
                                    const o = r.yesterdayPercent(e, t).toString();
                                    ("/arabic.html" != l &&
                                        "/kurdish.html" != l &&
                                        "/dist/kurdish.html" != l) ||
                                        ((c.totalCases.textContent = a.toArabicDigits()),
                                        (c.yesterdayCase.textContent =
                                            "(" + r.FormattingNumber(t).toArabicDigits() + ")"));
                                    const s = r.SignRemove(o);
                                    o < 0
                                        ? (document
                                              .querySelector(
                                                  ".data__confirmed .card__box--info .info-increase"
                                              )
                                              .classList.add("success"),
                                          (c.totalCaseInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " انخفضت"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " كـەمـی كـردووە"
                                                  : s.pos + "% decreased"))
                                        : o > 0 &&
                                          (document
                                              .querySelector(
                                                  ".data__confirmed .card__box--info .info-increase"
                                              )
                                              .classList.add("danger"),
                                          (c.totalCaseInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " زاد"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " زیـادی كـردووە"
                                                  : s.pos + "% increased"));
                                })(C.today.totalCases, C.yesterday.yesterdayCases),
                                ((e, t) => {
                                    const a = e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    c.totalDead.textContent = a;
                                    const r = d();
                                    c.yesterdayDead.textContent = "(" + r.FormattingNumber(t) + ")";
                                    const o = r.yesterdayPercent(e, t).toString();
                                    ("/arabic.html" != l &&
                                        "/kurdish.html" != l &&
                                        "/dist/kurdish.html" != l) ||
                                        ((c.totalDead.textContent = a.toArabicDigits()),
                                        (c.yesterdayDead.textContent =
                                            "(" + r.FormattingNumber(t).toArabicDigits() + ")"));
                                    const s = r.SignRemove(o);
                                    o < 0
                                        ? (document
                                              .querySelector(
                                                  ".data__Dead .card__box--info .info-increase"
                                              )
                                              .classList.add("success"),
                                          (c.totalDeadInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " انخفضت"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " كـەمـی كـردووە"
                                                  : s.pos + "% decreased"))
                                        : o > 0 &&
                                          (document
                                              .querySelector(
                                                  ".data__Dead .card__box--info .info-increase"
                                              )
                                              .classList.add("danger"),
                                          (c.totalDeadInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " زاد"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " زیـادی كـردووە"
                                                  : s.pos + "% increased"));
                                })(C.today.totalDead, C.yesterday.yesterdayDead),
                                ((e, t) => {
                                    const a = e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    c.totalRecovered.textContent = a;
                                    const r = d();
                                    c.yesterdayRec.textContent = "(" + r.FormattingNumber(t) + ")";
                                    const o = r.yesterdayPercent(e, t).toString();
                                    ("/arabic.html" != l &&
                                        "/kurdish.html" != l &&
                                        "/dist/kurdish.html" != l) ||
                                        ((c.totalRecovered.textContent = a.toArabicDigits()),
                                        (c.yesterdayRec.textContent =
                                            "(" + r.FormattingNumber(t).toArabicDigits() + ")"));
                                    const s = r.SignRemove(o);
                                    o < 0
                                        ? (document
                                              .querySelector(
                                                  ".data__recovered .card__box--info .info-increase"
                                              )
                                              .classList.add("danger"),
                                          (c.totalRecoveredInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " انخفضت"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " كـەمـی كـردووە"
                                                  : s.pos + "% decreased"))
                                        : o > 0 &&
                                          (document
                                              .querySelector(
                                                  ".data__recovered .card__box--info .info-increase"
                                              )
                                              .classList.add("success"),
                                          (c.totalRecoveredInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " زاد"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " زیـادی كـردووە"
                                                  : s.pos + "% increased"));
                                })(C.today.totalRecovered, C.yesterday.yesterdayRecovered),
                                ((e, t) => {
                                    const a = e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    c.todayCases.textContent = "+ " + a;
                                    const r = d();
                                    c.totalYesCases.textContent = "(" + r.FormattingNumber(t) + ")";
                                    const o = r.yesterdayPercent(e, t).toString();
                                    ("/arabic.html" != l &&
                                        "/kurdish.html" != l &&
                                        "/dist/kurdish.html" != l) ||
                                        ((c.todayCases.textContent = a.toArabicDigits()),
                                        (c.totalYesCases.textContent =
                                            "(" + r.FormattingNumber(t).toArabicDigits() + ")"));
                                    const s = r.SignRemove(o);
                                    o < 0
                                        ? (document
                                              .querySelector(
                                                  ".data__cases .card__box--info .info-increase"
                                              )
                                              .classList.add("success"),
                                          (c.todayCaseInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " انخفضت"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " كـەمـی كـردووە"
                                                  : s.pos + "% decreased"))
                                        : o > 0 &&
                                          (document
                                              .querySelector(
                                                  ".data__cases .card__box--info .info-increase"
                                              )
                                              .classList.add("danger"),
                                          (c.todayCaseInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " زاد"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " زیـادی كـردووە"
                                                  : s.pos + "% increased"));
                                })(C.today.todayCases, C.yesterday.yesterdayTodCases),
                                ((e, t) => {
                                    const a = e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    c.todayDeaths.textContent = "+ " + a;
                                    const r = d();
                                    c.totalYesDead.textContent = "(" + r.FormattingNumber(t) + ")";
                                    const o = r.yesterdayPercent(e, t).toString();
                                    ("/arabic.html" != l &&
                                        "/kurdish.html" != l &&
                                        "/dist/kurdish.html" != l) ||
                                        ((c.todayDeaths.textContent = a.toArabicDigits()),
                                        (c.totalYesDead.textContent =
                                            "(" + r.FormattingNumber(t).toArabicDigits() + ")"));
                                    const s = r.SignRemove(o);
                                    o < 0
                                        ? (document
                                              .querySelector(
                                                  ".data__death .card__box--info .info-increase"
                                              )
                                              .classList.add("success"),
                                          (c.todayDeadInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " انخفضت"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " كـەمـی كـردووە"
                                                  : s.pos + "% decreased"))
                                        : o > 0 &&
                                          (document
                                              .querySelector(
                                                  ".data__death .card__box--info .info-increase"
                                              )
                                              .classList.add("danger"),
                                          (c.todayDeadInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " زاد"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " زیـادی كـردووە"
                                                  : s.pos + "% increased"));
                                })(C.today.todayDeaths, C.yesterday.yesterdayTodDead),
                                (async (e, t) => {
                                    const a = await e
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    c.todayRecovered.textContent = "+ " + a;
                                    const r = d();
                                    c.totalYesRec.textContent = "(" + r.FormattingNumber(t) + ")";
                                    const o = r.yesterdayPercent(e, t).toString();
                                    ("/arabic.html" != l &&
                                        "/kurdish.html" != l &&
                                        "/dist/kurdish.html" != l) ||
                                        ((c.todayRecovered.textContent = a.toArabicDigits()),
                                        (c.totalYesRec.textContent =
                                            "(" + r.FormattingNumber(t).toArabicDigits() + ")"));
                                    const s = r.SignRemove(o);
                                    o < 0
                                        ? (document
                                              .querySelector(
                                                  ".data__TodRecovered .card__box--info .info-increase"
                                              )
                                              .classList.add("danger"),
                                          (c.todayRecoveredInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " انخفضت"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " زیـادی كـردووە"
                                                  : s.pos + "% decreased"))
                                        : o > 0 &&
                                          (document
                                              .querySelector(
                                                  ".data__TodRecovered .card__box--info .info-increase"
                                              )
                                              .classList.add("success"),
                                          (c.todayRecoveredInc.textContent =
                                              "/arabic.html" == l || "/dist/arabic.html" == l
                                                  ? "% " + s.posAr + " زاد"
                                                  : "/kurdish.html" == l ||
                                                    "/dist/kurdish.html" == l
                                                  ? "% " + s.posAr + " زیـادی كـردووە"
                                                  : s.pos + "% increased"));
                                })(C.today.todayRecovered, C.yesterday.yesterdayTodRecovered),
                                ((e) => {
                                    var t = new Date(e),
                                        a = t.getMinutes() % 60,
                                        r = t.getHours();
                                    const o = Math.abs(new Date() - t),
                                        s = Math.round(o / 6e4);
                                    a < 10 && (a = "0" + a),
                                        r > 12 && (r -= 12),
                                        (c.updatedTime.innerHTML = "" + s);
                                })(C.today.upDateDTime);
                        } catch (e) {
                            console.log(e);
                        }
                })(),
                    (async () => {
                        (C.allCountries = new n()), await C.allCountries.getResults();
                        try {
                            c.tableMain.insertAdjacentHTML(
                                "afterbegin",
                                '\n    \n    <div class="position">\n    <div class="loader">\n            \n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n            \n        </div>\n        </div>\n    '
                            ),
                                await C.today.todayResults(),
                                (() => {
                                    const e = document.querySelector(".loader");
                                    e && e.parentElement.removeChild(e);
                                })(),
                                ((e) => {
                                    let t = h(e.cases),
                                        a = h(e.deaths),
                                        r = h(e.critical),
                                        o = h(e.recovered),
                                        s = "+" + h(e.todayCases),
                                        n = "+" + h(e.todayDeaths),
                                        i = "+" + h(e.todayRecovered),
                                        l = h(e.active);
                                    ("/arabic.html" != p && "/kurdish.html" != p) ||
                                        ((t = h(e.cases).toArabicDigits()),
                                        (a = h(e.deaths).toArabicDigits()),
                                        (r = h(e.critical).toArabicDigits()),
                                        (o = h(e.recovered).toArabicDigits()),
                                        (s = h(e.todayCases).toArabicDigits() + "+"),
                                        (n = h(e.todayDeaths).toArabicDigits() + "+"),
                                        (i = h(e.todayRecovered).toArabicDigits() + "+"),
                                        (l = h(e.active).toArabicDigits()),
                                        (0 !== e.todayCases &&
                                            0 !== e.todayDeaths &&
                                            0 !== e.todayRecovered) ||
                                            ((s = h(e.todayCases).toArabicDigits()),
                                            (n = h(e.todayDeaths).toArabicDigits()),
                                            (i = h(e.todayRecovered).toArabicDigits())));
                                    const d = `\n                    <tr class="table__body--row">\n                        <td scope="row" class=" ${
                                        "/arabic.html" === p || "/kurdish.html" === p
                                            ? "freeze-lang"
                                            : "freeze"
                                    }">1</td>\n                        <td class="${
                                        "/arabic.html" === p || "/kurdish.html" === p
                                            ? "freeze-lang"
                                            : "freeze"
                                    }" style="${
                                        "/arabic.html" === p
                                            ? "right: 5.7rem !important;"
                                            : "/kurdish.html" === p
                                            ? "right: 4.5rem !important;"
                                            : "left: 5rem !important;"
                                    }">\n                            <img\n                                src="img/worldwide-2.svg"\n                                class="table__icon"\n                                alt="Country"\n                            />\n                            Global\n                        </td>\n                        <td >${h(
                                        t
                                    )}</td>\n                        <td >${h(
                                        a
                                    )}</td>\n                        <td >${h(
                                        r
                                    )}</td>\n                        <td >${h(
                                        o
                                    )}</td>\n                        <td class=" badge-warning">${h(
                                        s
                                    )}</td>\n                        <td class=" badge-danger">${h(
                                        n
                                    )}</td>\n                        <td class=" badge-good">${h(
                                        i
                                    )}</td>\n                        <td >${h(
                                        l
                                    )}</td>\n                    </tr>\n                    \n    `;
                                    u(c.tableBody).append(d);
                                })(C.today.data),
                                t().countryData(C.allCountries.data);
                        } catch (e) {
                            console.log(e);
                        }
                    })(),
                    x();
            }),
                t()(c.aboutBtn).on("click", function () {
                    t()(".about-data").slideToggle("slow");
                }),
                t()(".theme-switch").on("click", () => {
                    t()("body").toggleClass("light-theme");
                });
            var w,
                D = t()(".navigation__list"),
                S = D.outerHeight() + 1,
                A = D.find("a"),
                k = A.map(function () {
                    var e = t()(t()(this).attr("href"));
                    if (e.length) return e;
                });
            A.on("click", function (e) {
                var a = t()(this).attr("href"),
                    r = "#" === a ? 0 : t()(a).offset().top - S + 1;
                t()("html, body").stop().animate({ scrollTop: r }, 200), e.preventDefault();
            }),
                t()(window).on("scroll", function () {
                    var e = t()(this).scrollTop() + S,
                        a = k.map(function () {
                            if (t()(this).offset().top < e) return this;
                        }),
                        r = (a = a[a.length - 1]) && a.length ? a[0].id : "";
                    w !== r &&
                        ((w = r),
                        A.parent()
                            .removeClass("active")
                            .end()
                            .filter("[href=\\#" + r + "]")
                            .parent()
                            .addClass("active"));
                });
        })();
})();
