function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function requireParam(r, i) {
    if (!r[i]) throw Error("Missing value ".concat(i));
}
function t() {
    return (+new Date * Math.random()).toString(36).substring(0, 8);
}
var n = function() {
    "use strict";
    function n() {
        _classCallCheck(this, n), this.config = {
            redirect_uri: window.location.href
        };
    }
    var r = n.prototype;
    return r.initialize = function(t) {
        requireParam(t, "client_id"), requireParam(t, "scope"), requireParam(t, "response_type"), this.config = _objectSpread({}, this.config, t);
    }, r.signin = function(e) {
        var n, r, o = e.onSuccess, i = void 0 === o ? function() {} : o, c = e.onError, s = void 0 === c ? function() {} : c, a = this.config, d = a.client_id, h = a.redirect_uri, l = a.scope, u = a.response_type, m = a.nonce, w = void 0 === m ? t() : m, f = a.state, p = void 0 === f ? t() : f, g = new URL("http:localhost:4444/oauth2/auth");
        g.searchParams.set("client_id", d), g.searchParams.set("redirect_uri", h), g.searchParams.set("scope", l), g.searchParams.set("response_type", u), g.searchParams.set("nonce", w), g.searchParams.set("state", p);
        var _ = (n = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width, r = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height, {
            left: n / 2 - 350 + window.screenLeft,
            top: r / 2 - 350 + window.screenTop
        }), v = _.left, b = _.top, P = "width=".concat("700", ",height=").concat("700", ",left=").concat(v.toString(), ",top=").concat(b.toString(), ",resizable=no,location=no,menubar=no"), k = window.open(g, "LuminAuthentication", P);
        if (!k) throw Error("We were unable to open the new tab, its likely that the request was blocked.");
        var E = setInterval(function() {
            try {
                k.closed && (clearInterval(E), s({
                    error: "tab_closed",
                    error_description: "The user closed the tab before authentication could be completed"
                }));
                var e = k.location;
                if (e.href && 0 !== e.href.indexOf(h)) return;
                clearInterval(E);
                var t = new URLSearchParams(e.hash.substring(1));
                k.close(), i({
                    code: t.get("code"),
                    access_token: t.get("access_token"),
                    id_token: t.get("id_token"),
                    error: t.get("error"),
                    error_description: t.get("error_description")
                });
            } catch (e) {
                if (_instanceof(e, DOMException) || "Permission denied" === e.message) return;
                s({
                    error: "auth_error",
                    error_description: e.message
                }), k.closed || k.close(), clearInterval(E);
            }
        }, 300);
    }, n;
}();
window.lumin = {
    auth: new n()
};
