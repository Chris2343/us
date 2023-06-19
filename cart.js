var Tl = Object.defineProperty;
var Rl = (U,$,w)=>$ in U ? Tl(U, $, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: w
}) : U[$] = w;
var Pi = (U,$,w)=>(Rl(U, typeof $ != "symbol" ? $ + "" : $, w),
w);
(function(U) {
    typeof define == "function" && define.amd ? define(U) : U()
}
)(function() {
    "use strict";
    function U(e) {
        return e && e.Math == Math ? e : void 0
    }
    var $ = typeof globalThis == "object" && U(globalThis) || typeof window == "object" && U(window) || typeof self == "object" && U(self) || typeof global == "object" && U(global) || function() {
        return this
    }() || {};
    function w() {
        return $
    }
    function be(e, t, r) {
        var n = r || $
          , i = n.__SENTRY__ = n.__SENTRY__ || {}
          , o = i[e] || (i[e] = t());
        return o
    }
    var Er = Object.prototype.toString;
    function Sr(e) {
        switch (Er.call(e)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return q(e, Error)
        }
    }
    function pt(e, t) {
        return Er.call(e) === `[object ${t}]`
    }
    function Cr(e) {
        return pt(e, "ErrorEvent")
    }
    function Nr(e) {
        return pt(e, "DOMError")
    }
    function Oi(e) {
        return pt(e, "DOMException")
    }
    function ht(e) {
        return pt(e, "String")
    }
    function Tr(e) {
        return e === null || typeof e != "object" && typeof e != "function"
    }
    function mt(e) {
        return pt(e, "Object")
    }
    function xe(e) {
        return typeof Event < "u" && q(e, Event)
    }
    function Ui(e) {
        return typeof Element < "u" && q(e, Element)
    }
    function ji(e) {
        return pt(e, "RegExp")
    }
    function ke(e) {
        return Boolean(e && e.then && typeof e.then == "function")
    }
    function Li(e) {
        return mt(e) && "nativeEvent"in e && "preventDefault"in e && "stopPropagation"in e
    }
    function Bi(e) {
        return typeof e == "number" && e !== e
    }
    function q(e, t) {
        try {
            return e instanceof t
        } catch {
            return !1
        }
    }
    function Ee(e, t) {
        try {
            let s = e;
            var r = 5
              , n = 80
              , i = [];
            let l = 0
              , d = 0;
            var o = " > "
              , a = o.length;
            let u;
            for (; s && l++ < r && (u = Fi(s, t),
            !(u === "html" || l > 1 && d + i.length * a + u.length >= n)); )
                i.push(u),
                d += u.length,
                s = s.parentNode;
            return i.reverse().join(o)
        } catch {
            return "<unknown>"
        }
    }
    function Fi(e, t) {
        var r = e
          , n = [];
        let i, o, a, s, l;
        if (!r || !r.tagName)
            return "";
        n.push(r.tagName.toLowerCase());
        var d = t && t.length ? t.filter(f=>r.getAttribute(f)).map(f=>[f, r.getAttribute(f)]) : null;
        if (d && d.length)
            d.forEach(f=>{
                n.push(`[${f[0]}="${f[1]}"]`)
            }
            );
        else if (r.id && n.push(`#${r.id}`),
        i = r.className,
        i && ht(i))
            for (o = i.split(/\s+/),
            l = 0; l < o.length; l++)
                n.push(`.${o[l]}`);
        var u = ["type", "name", "title", "alt"];
        for (l = 0; l < u.length; l++)
            a = u[l],
            s = r.getAttribute(a),
            s && n.push(`[${a}="${s}"]`);
        return n.join("")
    }
    function Mi() {
        var e = w();
        try {
            return e.document.location.href
        } catch {
            return ""
        }
    }
    class R extends Error {
        constructor(t, r="warn") {
            super(t),
            this.message = t,
            this.name = new.target.prototype.constructor.name,
            Object.setPrototypeOf(this, new.target.prototype),
            this.logLevel = r
        }
    }
    var Hi = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
    function Gi(e) {
        return e === "http" || e === "https"
    }
    function Se(e, t=!1) {
        const {host: r, path: n, pass: i, port: o, projectId: a, protocol: s, publicKey: l} = e;
        return `${s}://${l}${t && i ? `:${i}` : ""}@${r}${o ? `:${o}` : ""}/${n && `${n}/`}${a}`
    }
    function $i(e) {
        var t = Hi.exec(e);
        if (!t)
            throw new R(`Invalid Sentry Dsn: ${e}`);
        const [r,n,i="",o,a="",s] = t.slice(1);
        let l = ""
          , d = s;
        var u = d.split("/");
        if (u.length > 1 && (l = u.slice(0, -1).join("/"),
        d = u.pop()),
        d) {
            var f = d.match(/^\d+/);
            f && (d = f[0])
        }
        return Rr({
            host: o,
            pass: i,
            path: l,
            projectId: d,
            port: a,
            protocol: r,
            publicKey: n
        })
    }
    function Rr(e) {
        return {
            protocol: e.protocol,
            publicKey: e.publicKey || "",
            pass: e.pass || "",
            host: e.host,
            port: e.port || "",
            path: e.path || "",
            projectId: e.projectId
        }
    }
    function Yi(e) {
        if (!(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__))
            return;
        const {port: t, projectId: r, protocol: n} = e;
        var i = ["protocol", "publicKey", "host", "projectId"];
        if (i.forEach(o=>{
            if (!e[o])
                throw new R(`Invalid Sentry Dsn: ${o} missing`)
        }
        ),
        !r.match(/^\d+$/))
            throw new R(`Invalid Sentry Dsn: Invalid projectId ${r}`);
        if (!Gi(n))
            throw new R(`Invalid Sentry Dsn: Invalid protocol ${n}`);
        if (t && isNaN(parseInt(t, 10)))
            throw new R(`Invalid Sentry Dsn: Invalid port ${t}`);
        return !0
    }
    function zi(e) {
        var t = typeof e == "string" ? $i(e) : Rr(e);
        return Yi(t),
        t
    }
    var qi = w()
      , Vi = "Sentry Logger "
      , Jt = ["debug", "info", "warn", "error", "log", "assert", "trace"];
    function Ar(e) {
        var t = w();
        if (!("console"in t))
            return e();
        var r = t.console
          , n = {};
        Jt.forEach(i=>{
            var o = r[i] && r[i].__sentry_original__;
            i in t.console && o && (n[i] = r[i],
            r[i] = o)
        }
        );
        try {
            return e()
        } finally {
            Object.keys(n).forEach(i=>{
                r[i] = n[i]
            }
            )
        }
    }
    function Ir() {
        let e = !1;
        var t = {
            enable: ()=>{
                e = !0
            }
            ,
            disable: ()=>{
                e = !1
            }
        };
        return typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? Jt.forEach(r=>{
            t[r] = (...n)=>{
                e && Ar(()=>{
                    qi.console[r](`${Vi}[${r}]:`, ...n)
                }
                )
            }
        }
        ) : Jt.forEach(r=>{
            t[r] = ()=>{}
        }
        ),
        t
    }
    let g;
    typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? g = be("logger", Ir) : g = Ir();
    function Rt(e, t=0) {
        return typeof e != "string" || t === 0 || e.length <= t ? e : `${e.substr(0, t)}...`
    }
    function Dr(e, t) {
        if (!Array.isArray(e))
            return "";
        var r = [];
        for (let i = 0; i < e.length; i++) {
            var n = e[i];
            try {
                r.push(String(n))
            } catch {
                r.push("[value cannot be serialized]")
            }
        }
        return r.join(t)
    }
    function Ce(e, t) {
        return ht(e) ? ji(t) ? t.test(e) : typeof t == "string" ? e.indexOf(t) !== -1 : !1 : !1
    }
    function A(e, t, r) {
        if (t in e) {
            var n = e[t]
              , i = r(n);
            if (typeof i == "function")
                try {
                    Pr(i, n)
                } catch {}
            e[t] = i
        }
    }
    function Ne(e, t, r) {
        Object.defineProperty(e, t, {
            value: r,
            writable: !0,
            configurable: !0
        })
    }
    function Pr(e, t) {
        var r = t.prototype || {};
        e.prototype = t.prototype = r,
        Ne(e, "__sentry_original__", t)
    }
    function Te(e) {
        return e.__sentry_original__
    }
    function Wi(e) {
        return Object.keys(e).map(t=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join("&")
    }
    function Or(e) {
        if (Sr(e))
            return {
                message: e.message,
                name: e.name,
                stack: e.stack,
                ...jr(e)
            };
        if (xe(e)) {
            var t = {
                type: e.type,
                target: Ur(e.target),
                currentTarget: Ur(e.currentTarget),
                ...jr(e)
            };
            return typeof CustomEvent < "u" && q(e, CustomEvent) && (t.detail = e.detail),
            t
        } else
            return e
    }
    function Ur(e) {
        try {
            return Ui(e) ? Ee(e) : Object.prototype.toString.call(e)
        } catch {
            return "<unknown>"
        }
    }
    function jr(e) {
        if (typeof e == "object" && e !== null) {
            var t = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        } else
            return {}
    }
    function Ji(e, t=40) {
        var r = Object.keys(Or(e));
        if (r.sort(),
        !r.length)
            return "[object has no keys]";
        if (r[0].length >= t)
            return Rt(r[0], t);
        for (let i = r.length; i > 0; i--) {
            var n = r.slice(0, i).join(", ");
            if (!(n.length > t))
                return i === r.length ? n : Rt(n, t)
        }
        return ""
    }
    function Re(e) {
        var t = new Map;
        return Ae(e, t)
    }
    function Ae(e, t) {
        if (mt(e)) {
            var r = t.get(e);
            if (r !== void 0)
                return r;
            var n = {};
            t.set(e, n);
            for (var i of Object.keys(e))
                typeof e[i] < "u" && (n[i] = Ae(e[i], t));
            return n
        }
        if (Array.isArray(e)) {
            var r = t.get(e);
            if (r !== void 0)
                return r;
            var n = [];
            return t.set(e, n),
            e.forEach(s=>{
                n.push(Ae(s, t))
            }
            ),
            n
        }
        return e
    }
    var Zi = 50;
    function Lr(...e) {
        var t = e.sort((r,n)=>r[0] - n[0]).map(r=>r[1]);
        return (r,n=0)=>{
            var i = [];
            for (var o of r.split(`
`).slice(n)) {
                var a = o.replace(/\(error: (.*)\)/, "$1");
                for (var s of t) {
                    var l = s(a);
                    if (l) {
                        i.push(l);
                        break
                    }
                }
            }
            return Ki(i)
        }
    }
    function Xi(e) {
        return Array.isArray(e) ? Lr(...e) : e
    }
    function Ki(e) {
        if (!e.length)
            return [];
        let t = e;
        var r = t[0].function || ""
          , n = t[t.length - 1].function || "";
        return (r.indexOf("captureMessage") !== -1 || r.indexOf("captureException") !== -1) && (t = t.slice(1)),
        n.indexOf("sentryWrapped") !== -1 && (t = t.slice(0, -1)),
        t.slice(0, Zi).map(i=>({
            ...i,
            filename: i.filename || t[0].filename,
            function: i.function || "?"
        })).reverse()
    }
    var Ie = "<anonymous>";
    function V(e) {
        try {
            return !e || typeof e != "function" ? Ie : e.name || Ie
        } catch {
            return Ie
        }
    }
    function Br() {
        if (!("fetch"in w()))
            return !1;
        try {
            return new Headers,
            new Request("http://www.example.com"),
            new Response,
            !0
        } catch {
            return !1
        }
    }
    function De(e) {
        return e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
    }
    function Qi() {
        if (!Br())
            return !1;
        var e = w();
        if (De(e.fetch))
            return !0;
        let t = !1;
        var r = e.document;
        if (r && typeof r.createElement == "function")
            try {
                var n = r.createElement("iframe");
                n.hidden = !0,
                r.head.appendChild(n),
                n.contentWindow && n.contentWindow.fetch && (t = De(n.contentWindow.fetch)),
                r.head.removeChild(n)
            } catch (i) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", i)
            }
        return t
    }
    function to() {
        var e = w()
          , t = e.chrome
          , r = t && t.app && t.app.runtime
          , n = "history"in e && !!e.history.pushState && !!e.history.replaceState;
        return !r && n
    }
    var b = w()
      , At = {}
      , Fr = {};
    function eo(e) {
        if (!Fr[e])
            switch (Fr[e] = !0,
            e) {
            case "console":
                ro();
                break;
            case "dom":
                fo();
                break;
            case "xhr":
                ao();
                break;
            case "fetch":
                no();
                break;
            case "history":
                so();
                break;
            case "error":
                po();
                break;
            case "unhandledrejection":
                ho();
                break;
            default:
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("unknown instrumentation type:", e);
                return
            }
    }
    function W(e, t) {
        At[e] = At[e] || [],
        At[e].push(t),
        eo(e)
    }
    function F(e, t) {
        if (!(!e || !At[e]))
            for (var r of At[e] || [])
                try {
                    r(t)
                } catch (n) {
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error(`Error while triggering instrumentation handler.
Type: ${e}
Name: ${V(r)}
Error:`, n)
                }
    }
    function ro() {
        "console"in b && Jt.forEach(function(e) {
            e in b.console && A(b.console, e, function(t) {
                return function(...r) {
                    F("console", {
                        args: r,
                        level: e
                    }),
                    t && t.apply(b.console, r)
                }
            })
        })
    }
    function no() {
        !Qi() || A(b, "fetch", function(e) {
            return function(...t) {
                var r = {
                    args: t,
                    fetchData: {
                        method: io(t),
                        url: oo(t)
                    },
                    startTimestamp: Date.now()
                };
                return F("fetch", {
                    ...r
                }),
                e.apply(b, t).then(n=>(F("fetch", {
                    ...r,
                    endTimestamp: Date.now(),
                    response: n
                }),
                n), n=>{
                    throw F("fetch", {
                        ...r,
                        endTimestamp: Date.now(),
                        error: n
                    }),
                    n
                }
                )
            }
        })
    }
    function io(e=[]) {
        return "Request"in b && q(e[0], Request) && e[0].method ? String(e[0].method).toUpperCase() : e[1] && e[1].method ? String(e[1].method).toUpperCase() : "GET"
    }
    function oo(e=[]) {
        return typeof e[0] == "string" ? e[0] : "Request"in b && q(e[0], Request) ? e[0].url : String(e[0])
    }
    function ao() {
        if ("XMLHttpRequest"in b) {
            var e = XMLHttpRequest.prototype;
            A(e, "open", function(t) {
                return function(...r) {
                    var n = this
                      , i = r[1]
                      , o = n.__sentry_xhr__ = {
                        method: ht(r[0]) ? r[0].toUpperCase() : r[0],
                        url: r[1]
                    };
                    ht(i) && o.method === "POST" && i.match(/sentry_key/) && (n.__sentry_own_request__ = !0);
                    var a = function() {
                        if (n.readyState === 4) {
                            try {
                                o.status_code = n.status
                            } catch {}
                            F("xhr", {
                                args: r,
                                endTimestamp: Date.now(),
                                startTimestamp: Date.now(),
                                xhr: n
                            })
                        }
                    };
                    return "onreadystatechange"in n && typeof n.onreadystatechange == "function" ? A(n, "onreadystatechange", function(s) {
                        return function(...l) {
                            return a(),
                            s.apply(n, l)
                        }
                    }) : n.addEventListener("readystatechange", a),
                    t.apply(n, r)
                }
            }),
            A(e, "send", function(t) {
                return function(...r) {
                    return this.__sentry_xhr__ && r[0] !== void 0 && (this.__sentry_xhr__.body = r[0]),
                    F("xhr", {
                        args: r,
                        startTimestamp: Date.now(),
                        xhr: this
                    }),
                    t.apply(this, r)
                }
            })
        }
    }
    let Zt;
    function so() {
        if (!to())
            return;
        var e = b.onpopstate;
        b.onpopstate = function(...r) {
            var n = b.location.href
              , i = Zt;
            if (Zt = n,
            F("history", {
                from: i,
                to: n
            }),
            e)
                try {
                    return e.apply(this, r)
                } catch {}
        }
        ;
        function t(r) {
            return function(...n) {
                var i = n.length > 2 ? n[2] : void 0;
                if (i) {
                    var o = Zt
                      , a = String(i);
                    Zt = a,
                    F("history", {
                        from: o,
                        to: a
                    })
                }
                return r.apply(this, n)
            }
        }
        A(b.history, "pushState", t),
        A(b.history, "replaceState", t)
    }
    var co = 1e3;
    let Xt, Kt;
    function lo(e, t) {
        if (!e || e.type !== t.type)
            return !0;
        try {
            if (e.target !== t.target)
                return !0
        } catch {}
        return !1
    }
    function uo(e) {
        if (e.type !== "keypress")
            return !1;
        try {
            var t = e.target;
            if (!t || !t.tagName)
                return !0;
            if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
                return !1
        } catch {}
        return !0
    }
    function Mr(e, t=!1) {
        return r=>{
            if (!(!r || Kt === r) && !uo(r)) {
                var n = r.type === "keypress" ? "input" : r.type;
                Xt === void 0 ? (e({
                    event: r,
                    name: n,
                    global: t
                }),
                Kt = r) : lo(Kt, r) && (e({
                    event: r,
                    name: n,
                    global: t
                }),
                Kt = r),
                clearTimeout(Xt),
                Xt = b.setTimeout(()=>{
                    Xt = void 0
                }
                , co)
            }
        }
    }
    function fo() {
        if ("document"in b) {
            var e = F.bind(null, "dom")
              , t = Mr(e, !0);
            b.document.addEventListener("click", t, !1),
            b.document.addEventListener("keypress", t, !1),
            ["EventTarget", "Node"].forEach(r=>{
                var n = b[r] && b[r].prototype;
                !n || !n.hasOwnProperty || !n.hasOwnProperty("addEventListener") || (A(n, "addEventListener", function(i) {
                    return function(o, a, s) {
                        if (o === "click" || o == "keypress")
                            try {
                                var l = this
                                  , d = l.__sentry_instrumentation_handlers__ = l.__sentry_instrumentation_handlers__ || {}
                                  , u = d[o] = d[o] || {
                                    refCount: 0
                                };
                                if (!u.handler) {
                                    var f = Mr(e);
                                    u.handler = f,
                                    i.call(this, o, f, s)
                                }
                                u.refCount += 1
                            } catch {}
                        return i.call(this, o, a, s)
                    }
                }),
                A(n, "removeEventListener", function(i) {
                    return function(o, a, s) {
                        if (o === "click" || o == "keypress")
                            try {
                                var l = this
                                  , d = l.__sentry_instrumentation_handlers__ || {}
                                  , u = d[o];
                                u && (u.refCount -= 1,
                                u.refCount <= 0 && (i.call(this, o, u.handler, s),
                                u.handler = void 0,
                                delete d[o]),
                                Object.keys(d).length === 0 && delete l.__sentry_instrumentation_handlers__)
                            } catch {}
                        return i.call(this, o, a, s)
                    }
                }))
            }
            )
        }
    }
    let Pe = null;
    function po() {
        Pe = b.onerror,
        b.onerror = function(e, t, r, n, i) {
            return F("error", {
                column: n,
                error: i,
                line: r,
                msg: e,
                url: t
            }),
            Pe ? Pe.apply(this, arguments) : !1
        }
    }
    let Oe = null;
    function ho() {
        Oe = b.onunhandledrejection,
        b.onunhandledrejection = function(e) {
            return F("unhandledrejection", e),
            Oe ? Oe.apply(this, arguments) : !0
        }
    }
    function mo() {
        var e = typeof WeakSet == "function"
          , t = e ? new WeakSet : [];
        function r(i) {
            if (e)
                return t.has(i) ? !0 : (t.add(i),
                !1);
            for (let a = 0; a < t.length; a++) {
                var o = t[a];
                if (o === i)
                    return !0
            }
            return t.push(i),
            !1
        }
        function n(i) {
            if (e)
                t.delete(i);
            else
                for (let o = 0; o < t.length; o++)
                    if (t[o] === i) {
                        t.splice(o, 1);
                        break
                    }
        }
        return [r, n]
    }
    function _t() {
        var e = w()
          , t = e.crypto || e.msCrypto;
        if (t && t.randomUUID)
            return t.randomUUID().replace(/-/g, "");
        var r = t && t.getRandomValues ? ()=>t.getRandomValues(new Uint8Array(1))[0] : ()=>Math.random() * 16;
        return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, n=>(n ^ (r() & 15) >> n / 4).toString(16))
    }
    function Hr(e) {
        return e.exception && e.exception.values ? e.exception.values[0] : void 0
    }
    function rt(e) {
        const {message: t, event_id: r} = e;
        if (t)
            return t;
        var n = Hr(e);
        return n ? n.type && n.value ? `${n.type}: ${n.value}` : n.type || n.value || r || "<unknown>" : r || "<unknown>"
    }
    function Ue(e, t, r) {
        var n = e.exception = e.exception || {}
          , i = n.values = n.values || []
          , o = i[0] = i[0] || {};
        o.value || (o.value = t || ""),
        o.type || (o.type = r || "Error")
    }
    function It(e, t) {
        var r = Hr(e);
        if (!!r) {
            var n = {
                type: "generic",
                handled: !0
            }
              , i = r.mechanism;
            if (r.mechanism = {
                ...n,
                ...i,
                ...t
            },
            t && "data"in t) {
                var o = {
                    ...i && i.data,
                    ...t.data
                };
                r.mechanism.data = o
            }
        }
    }
    function Gr(e) {
        if (e && e.__sentry_captured__)
            return !0;
        try {
            Ne(e, "__sentry_captured__", !0)
        } catch {}
        return !1
    }
    function $r(e) {
        return Array.isArray(e) ? e : [e]
    }
    function _o() {
        return typeof __SENTRY_BROWSER_BUNDLE__ < "u" && !!__SENTRY_BROWSER_BUNDLE__
    }
    function Yr() {
        return !_o() && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]"
    }
    function go(e, t) {
        return e.require(t)
    }
    function J(e, t=1 / 0, r=1 / 0) {
        try {
            return je("", e, t, r)
        } catch (n) {
            return {
                ERROR: `**non-serializable** (${n})`
            }
        }
    }
    function zr(e, t=3, r=100 * 1024) {
        var n = J(e, t);
        return yo(n) > r ? zr(e, t - 1, r) : n
    }
    function je(e, t, r=1 / 0, n=1 / 0, i=mo()) {
        const [o,a] = i;
        if (t === null || ["number", "boolean", "string"].includes(typeof t) && !Bi(t))
            return t;
        var s = vo(e, t);
        if (!s.startsWith("[object "))
            return s;
        if (t.__sentry_skip_normalization__)
            return t;
        if (r === 0)
            return s.replace("object ", "");
        if (o(t))
            return "[Circular ~]";
        var l = t;
        if (l && typeof l.toJSON == "function")
            try {
                var d = l.toJSON();
                return je("", d, r - 1, n, i)
            } catch {}
        var u = Array.isArray(t) ? [] : {};
        let f = 0;
        var h = Or(t);
        for (var p in h)
            if (!!Object.prototype.hasOwnProperty.call(h, p)) {
                if (f >= n) {
                    u[p] = "[MaxProperties ~]";
                    break
                }
                var m = h[p];
                u[p] = je(p, m, r - 1, n, i),
                f += 1
            }
        return a(t),
        u
    }
    function vo(e, t) {
        try {
            return e === "domain" && t && typeof t == "object" && t._events ? "[Domain]" : e === "domainEmitter" ? "[DomainEmitter]" : typeof global < "u" && t === global ? "[Global]" : typeof window < "u" && t === window ? "[Window]" : typeof document < "u" && t === document ? "[Document]" : Li(t) ? "[SyntheticEvent]" : typeof t == "number" && t !== t ? "[NaN]" : t === void 0 ? "[undefined]" : typeof t == "function" ? `[Function: ${V(t)}]` : typeof t == "symbol" ? `[${String(t)}]` : typeof t == "bigint" ? `[BigInt: ${String(t)}]` : `[object ${Object.getPrototypeOf(t).constructor.name}]`
        } catch (r) {
            return `**non-serializable** (${r})`
        }
    }
    function wo(e) {
        return ~-encodeURI(e).split(/%..|./).length
    }
    function yo(e) {
        return wo(JSON.stringify(e))
    }
    function bo(e, t) {
        let r = 0;
        for (let i = e.length - 1; i >= 0; i--) {
            var n = e[i];
            n === "." ? e.splice(i, 1) : n === ".." ? (e.splice(i, 1),
            r++) : r && (e.splice(i, 1),
            r--)
        }
        if (t)
            for (; r--; r)
                e.unshift("..");
        return e
    }
    var xo = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;
    function ko(e) {
        var t = xo.exec(e);
        return t ? t.slice(1) : []
    }
    function qr(...e) {
        let t = ""
          , r = !1;
        for (let i = e.length - 1; i >= -1 && !r; i--) {
            var n = i >= 0 ? e[i] : "/";
            !n || (t = `${n}/${t}`,
            r = n.charAt(0) === "/")
        }
        return t = bo(t.split("/").filter(i=>!!i), !r).join("/"),
        (r ? "/" : "") + t || "."
    }
    function Vr(e) {
        let t = 0;
        for (; t < e.length && e[t] === ""; t++)
            ;
        let r = e.length - 1;
        for (; r >= 0 && e[r] === ""; r--)
            ;
        return t > r ? [] : e.slice(t, r - t + 1)
    }
    function Eo(e, t) {
        e = qr(e).substr(1),
        t = qr(t).substr(1);
        var r = Vr(e.split("/"))
          , n = Vr(t.split("/"))
          , i = Math.min(r.length, n.length);
        let o = i;
        for (let s = 0; s < i; s++)
            if (r[s] !== n[s]) {
                o = s;
                break
            }
        let a = [];
        for (let s = o; s < r.length; s++)
            a.push("..");
        return a = a.concat(n.slice(o)),
        a.join("/")
    }
    function So(e, t) {
        let r = ko(e)[2];
        return t && r.substr(t.length * -1) === t && (r = r.substr(0, r.length - t.length)),
        r
    }
    var z;
    (function(e) {
        var t = 0;
        e[e.PENDING = t] = "PENDING";
        var r = 1;
        e[e.RESOLVED = r] = "RESOLVED";
        var n = 2;
        e[e.REJECTED = n] = "REJECTED"
    }
    )(z || (z = {}));
    function nt(e) {
        return new D(t=>{
            t(e)
        }
        )
    }
    function Le(e) {
        return new D((t,r)=>{
            r(e)
        }
        )
    }
    class D {
        __init() {
            this._state = z.PENDING
        }
        __init2() {
            this._handlers = []
        }
        constructor(t) {
            D.prototype.__init.call(this),
            D.prototype.__init2.call(this),
            D.prototype.__init3.call(this),
            D.prototype.__init4.call(this),
            D.prototype.__init5.call(this),
            D.prototype.__init6.call(this);
            try {
                t(this._resolve, this._reject)
            } catch (r) {
                this._reject(r)
            }
        }
        then(t, r) {
            return new D((n,i)=>{
                this._handlers.push([!1, o=>{
                    if (!t)
                        n(o);
                    else
                        try {
                            n(t(o))
                        } catch (a) {
                            i(a)
                        }
                }
                , o=>{
                    if (!r)
                        i(o);
                    else
                        try {
                            n(r(o))
                        } catch (a) {
                            i(a)
                        }
                }
                ]),
                this._executeHandlers()
            }
            )
        }
        catch(t) {
            return this.then(r=>r, t)
        }
        finally(t) {
            return new D((r,n)=>{
                let i, o;
                return this.then(a=>{
                    o = !1,
                    i = a,
                    t && t()
                }
                , a=>{
                    o = !0,
                    i = a,
                    t && t()
                }
                ).then(()=>{
                    if (o) {
                        n(i);
                        return
                    }
                    r(i)
                }
                )
            }
            )
        }
        __init3() {
            this._resolve = t=>{
                this._setResult(z.RESOLVED, t)
            }
        }
        __init4() {
            this._reject = t=>{
                this._setResult(z.REJECTED, t)
            }
        }
        __init5() {
            this._setResult = (t,r)=>{
                if (this._state === z.PENDING) {
                    if (ke(r)) {
                        r.then(this._resolve, this._reject);
                        return
                    }
                    this._state = t,
                    this._value = r,
                    this._executeHandlers()
                }
            }
        }
        __init6() {
            this._executeHandlers = ()=>{
                if (this._state !== z.PENDING) {
                    var t = this._handlers.slice();
                    this._handlers = [],
                    t.forEach(r=>{
                        r[0] || (this._state === z.RESOLVED && r[1](this._value),
                        this._state === z.REJECTED && r[2](this._value),
                        r[0] = !0)
                    }
                    )
                }
            }
        }
    }
    function Co(e) {
        var t = [];
        function r() {
            return e === void 0 || t.length < e
        }
        function n(a) {
            return t.splice(t.indexOf(a), 1)[0]
        }
        function i(a) {
            if (!r())
                return Le(new R("Not adding Promise because buffer limit was reached."));
            var s = a();
            return t.indexOf(s) === -1 && t.push(s),
            s.then(()=>n(s)).then(null, ()=>n(s).then(null, ()=>{}
            )),
            s
        }
        function o(a) {
            return new D((s,l)=>{
                let d = t.length;
                if (!d)
                    return s(!0);
                var u = setTimeout(()=>{
                    a && a > 0 && s(!1)
                }
                , a);
                t.forEach(f=>{
                    nt(f).then(()=>{
                        --d || (clearTimeout(u),
                        s(!0))
                    }
                    , l)
                }
                )
            }
            )
        }
        return {
            $: t,
            add: i,
            drain: o
        }
    }
    function Be(e) {
        if (!e)
            return {};
        var t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!t)
            return {};
        var r = t[6] || ""
          , n = t[8] || "";
        return {
            host: t[4],
            path: t[5],
            protocol: t[2],
            relative: t[5] + r + n
        }
    }
    var No = ["fatal", "error", "warning", "log", "info", "debug"];
    function To(e) {
        return e === "warn" ? "warning" : No.includes(e) ? e : "log"
    }
    var Fe = {
        nowSeconds: ()=>Date.now() / 1e3
    };
    function Ro() {
        const {performance: e} = w();
        if (!(!e || !e.now)) {
            var t = Date.now() - e.now();
            return {
                now: ()=>e.now(),
                timeOrigin: t
            }
        }
    }
    function Ao() {
        try {
            var e = go(module, "perf_hooks");
            return e.performance
        } catch {
            return
        }
    }
    var Me = Yr() ? Ao() : Ro()
      , Wr = Me === void 0 ? Fe : {
        nowSeconds: ()=>(Me.timeOrigin + Me.now()) / 1e3
    }
      , Qt = Fe.nowSeconds.bind(Fe)
      , Jr = Wr.nowSeconds.bind(Wr);
    (()=>{
        const {performance: e} = w();
        if (!(!e || !e.now)) {
            var t = 3600 * 1e3
              , r = e.now()
              , n = Date.now()
              , i = e.timeOrigin ? Math.abs(e.timeOrigin + r - n) : t
              , o = i < t
              , a = e.timing && e.timing.navigationStart
              , s = typeof a == "number"
              , l = s ? Math.abs(a + r - n) : t
              , d = l < t;
            return o || d ? i <= l ? e.timeOrigin : a : n
        }
    }
    )();
    function te(e, t=[]) {
        return [e, t]
    }
    function Io(e, t) {
        const [r,n] = e;
        return [r, [...n, t]]
    }
    function Zr(e, t) {
        var r = e[1];
        r.forEach(n=>{
            var i = n[0].type;
            t(n, i)
        }
        )
    }
    function He(e, t) {
        var r = t || new TextEncoder;
        return r.encode(e)
    }
    function Xr(e, t) {
        const [r,n] = e;
        let i = JSON.stringify(r);
        function o(s) {
            typeof i == "string" ? i = typeof s == "string" ? i + s : [He(i, t), s] : i.push(typeof s == "string" ? He(s, t) : s)
        }
        for (var a of n) {
            const [s,l] = a;
            if (o(`
${JSON.stringify(s)}
`),
            typeof l == "string" || l instanceof Uint8Array)
                o(l);
            else {
                let d;
                try {
                    d = JSON.stringify(l)
                } catch {
                    d = JSON.stringify(J(l))
                }
                o(d)
            }
        }
        return typeof i == "string" ? i : Do(i)
    }
    function Do(e) {
        var t = e.reduce((o,a)=>o + a.length, 0)
          , r = new Uint8Array(t);
        let n = 0;
        for (var i of e)
            r.set(i, n),
            n += i.length;
        return r
    }
    function Po(e, t) {
        var r = typeof e.data == "string" ? He(e.data, t) : e.data;
        return [Re({
            type: "attachment",
            length: r.length,
            filename: e.filename,
            content_type: e.contentType,
            attachment_type: e.attachmentType
        }), r]
    }
    var Oo = {
        session: "session",
        sessions: "session",
        attachment: "attachment",
        transaction: "transaction",
        event: "error",
        client_report: "internal",
        user_report: "default"
    };
    function Kr(e) {
        return Oo[e]
    }
    function Uo(e, t, r) {
        var n = [{
            type: "client_report"
        }, {
            timestamp: r || Qt(),
            discarded_events: e
        }];
        return te(t ? {
            dsn: t
        } : {}, [n])
    }
    var jo = 60 * 1e3;
    function Lo(e, t=Date.now()) {
        var r = parseInt(`${e}`, 10);
        if (!isNaN(r))
            return r * 1e3;
        var n = Date.parse(`${e}`);
        return isNaN(n) ? jo : n - t
    }
    function Bo(e, t) {
        return e[t] || e.all || 0
    }
    function Fo(e, t, r=Date.now()) {
        return Bo(e, t) > r
    }
    function Mo(e, {statusCode: t, headers: r}, n=Date.now()) {
        var i = {
            ...e
        }
          , o = r && r["x-sentry-rate-limits"]
          , a = r && r["retry-after"];
        if (o)
            for (var s of o.trim().split(",")) {
                const [f,h] = s.split(":", 2);
                var l = parseInt(f, 10)
                  , d = (isNaN(l) ? 60 : l) * 1e3;
                if (!h)
                    i.all = n + d;
                else
                    for (var u of h.split(";"))
                        i[u] = n + d
            }
        else
            a ? i.all = n + Lo(a, n) : t === 429 && (i.all = n + 60 * 1e3);
        return i
    }
    function Ho(e) {
        var t = Jr()
          , r = {
            sid: _t(),
            init: !0,
            timestamp: t,
            started: t,
            duration: 0,
            status: "ok",
            errors: 0,
            ignoreDuration: !1,
            toJSON: ()=>$o(r)
        };
        return e && gt(r, e),
        r
    }
    function gt(e, t={}) {
        if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
        !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)),
        e.timestamp = t.timestamp || Jr(),
        t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
        t.sid && (e.sid = t.sid.length === 32 ? t.sid : _t()),
        t.init !== void 0 && (e.init = t.init),
        !e.did && t.did && (e.did = `${t.did}`),
        typeof t.started == "number" && (e.started = t.started),
        e.ignoreDuration)
            e.duration = void 0;
        else if (typeof t.duration == "number")
            e.duration = t.duration;
        else {
            var r = e.timestamp - e.started;
            e.duration = r >= 0 ? r : 0
        }
        t.release && (e.release = t.release),
        t.environment && (e.environment = t.environment),
        !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
        !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
        typeof t.errors == "number" && (e.errors = t.errors),
        t.status && (e.status = t.status)
    }
    function Go(e, t) {
        let r = {};
        t ? r = {
            status: t
        } : e.status === "ok" && (r = {
            status: "exited"
        }),
        gt(e, r)
    }
    function $o(e) {
        return Re({
            sid: `${e.sid}`,
            init: e.init,
            started: new Date(e.started * 1e3).toISOString(),
            timestamp: new Date(e.timestamp * 1e3).toISOString(),
            status: e.status,
            errors: e.errors,
            did: typeof e.did == "number" || typeof e.did == "string" ? `${e.did}` : void 0,
            duration: e.duration,
            attrs: {
                release: e.release,
                environment: e.environment,
                ip_address: e.ipAddress,
                user_agent: e.userAgent
            }
        })
    }
    var Yo = 100;
    class Z {
        constructor() {
            this._notifyingListeners = !1,
            this._scopeListeners = [],
            this._eventProcessors = [],
            this._breadcrumbs = [],
            this._attachments = [],
            this._user = {},
            this._tags = {},
            this._extra = {},
            this._contexts = {},
            this._sdkProcessingMetadata = {}
        }
        static clone(t) {
            var r = new Z;
            return t && (r._breadcrumbs = [...t._breadcrumbs],
            r._tags = {
                ...t._tags
            },
            r._extra = {
                ...t._extra
            },
            r._contexts = {
                ...t._contexts
            },
            r._user = t._user,
            r._level = t._level,
            r._span = t._span,
            r._session = t._session,
            r._transactionName = t._transactionName,
            r._fingerprint = t._fingerprint,
            r._eventProcessors = [...t._eventProcessors],
            r._requestSession = t._requestSession,
            r._attachments = [...t._attachments]),
            r
        }
        addScopeListener(t) {
            this._scopeListeners.push(t)
        }
        addEventProcessor(t) {
            return this._eventProcessors.push(t),
            this
        }
        setUser(t) {
            return this._user = t || {},
            this._session && gt(this._session, {
                user: t
            }),
            this._notifyScopeListeners(),
            this
        }
        getUser() {
            return this._user
        }
        getRequestSession() {
            return this._requestSession
        }
        setRequestSession(t) {
            return this._requestSession = t,
            this
        }
        setTags(t) {
            return this._tags = {
                ...this._tags,
                ...t
            },
            this._notifyScopeListeners(),
            this
        }
        setTag(t, r) {
            return this._tags = {
                ...this._tags,
                [t]: r
            },
            this._notifyScopeListeners(),
            this
        }
        setExtras(t) {
            return this._extra = {
                ...this._extra,
                ...t
            },
            this._notifyScopeListeners(),
            this
        }
        setExtra(t, r) {
            return this._extra = {
                ...this._extra,
                [t]: r
            },
            this._notifyScopeListeners(),
            this
        }
        setFingerprint(t) {
            return this._fingerprint = t,
            this._notifyScopeListeners(),
            this
        }
        setLevel(t) {
            return this._level = t,
            this._notifyScopeListeners(),
            this
        }
        setTransactionName(t) {
            return this._transactionName = t,
            this._notifyScopeListeners(),
            this
        }
        setContext(t, r) {
            return r === null ? delete this._contexts[t] : this._contexts = {
                ...this._contexts,
                [t]: r
            },
            this._notifyScopeListeners(),
            this
        }
        setSpan(t) {
            return this._span = t,
            this._notifyScopeListeners(),
            this
        }
        getSpan() {
            return this._span
        }
        getTransaction() {
            var t = this.getSpan();
            return t && t.transaction
        }
        setSession(t) {
            return t ? this._session = t : delete this._session,
            this._notifyScopeListeners(),
            this
        }
        getSession() {
            return this._session
        }
        update(t) {
            if (!t)
                return this;
            if (typeof t == "function") {
                var r = t(this);
                return r instanceof Z ? r : this
            }
            return t instanceof Z ? (this._tags = {
                ...this._tags,
                ...t._tags
            },
            this._extra = {
                ...this._extra,
                ...t._extra
            },
            this._contexts = {
                ...this._contexts,
                ...t._contexts
            },
            t._user && Object.keys(t._user).length && (this._user = t._user),
            t._level && (this._level = t._level),
            t._fingerprint && (this._fingerprint = t._fingerprint),
            t._requestSession && (this._requestSession = t._requestSession)) : mt(t) && (t = t,
            this._tags = {
                ...this._tags,
                ...t.tags
            },
            this._extra = {
                ...this._extra,
                ...t.extra
            },
            this._contexts = {
                ...this._contexts,
                ...t.contexts
            },
            t.user && (this._user = t.user),
            t.level && (this._level = t.level),
            t.fingerprint && (this._fingerprint = t.fingerprint),
            t.requestSession && (this._requestSession = t.requestSession)),
            this
        }
        clear() {
            return this._breadcrumbs = [],
            this._tags = {},
            this._extra = {},
            this._user = {},
            this._contexts = {},
            this._level = void 0,
            this._transactionName = void 0,
            this._fingerprint = void 0,
            this._requestSession = void 0,
            this._span = void 0,
            this._session = void 0,
            this._notifyScopeListeners(),
            this._attachments = [],
            this
        }
        addBreadcrumb(t, r) {
            var n = typeof r == "number" ? r : Yo;
            if (n <= 0)
                return this;
            var i = {
                timestamp: Qt(),
                ...t
            };
            return this._breadcrumbs = [...this._breadcrumbs, i].slice(-n),
            this._notifyScopeListeners(),
            this
        }
        clearBreadcrumbs() {
            return this._breadcrumbs = [],
            this._notifyScopeListeners(),
            this
        }
        addAttachment(t) {
            return this._attachments.push(t),
            this
        }
        getAttachments() {
            return this._attachments
        }
        clearAttachments() {
            return this._attachments = [],
            this
        }
        applyToEvent(t, r={}) {
            if (this._extra && Object.keys(this._extra).length && (t.extra = {
                ...this._extra,
                ...t.extra
            }),
            this._tags && Object.keys(this._tags).length && (t.tags = {
                ...this._tags,
                ...t.tags
            }),
            this._user && Object.keys(this._user).length && (t.user = {
                ...this._user,
                ...t.user
            }),
            this._contexts && Object.keys(this._contexts).length && (t.contexts = {
                ...this._contexts,
                ...t.contexts
            }),
            this._level && (t.level = this._level),
            this._transactionName && (t.transaction = this._transactionName),
            this._span) {
                t.contexts = {
                    trace: this._span.getTraceContext(),
                    ...t.contexts
                };
                var n = this._span.transaction && this._span.transaction.name;
                n && (t.tags = {
                    transaction: n,
                    ...t.tags
                })
            }
            return this._applyFingerprint(t),
            t.breadcrumbs = [...t.breadcrumbs || [], ...this._breadcrumbs],
            t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0,
            t.sdkProcessingMetadata = {
                ...t.sdkProcessingMetadata,
                ...this._sdkProcessingMetadata
            },
            this._notifyEventProcessors([...Qr(), ...this._eventProcessors], t, r)
        }
        setSDKProcessingMetadata(t) {
            return this._sdkProcessingMetadata = {
                ...this._sdkProcessingMetadata,
                ...t
            },
            this
        }
        _notifyEventProcessors(t, r, n, i=0) {
            return new D((o,a)=>{
                var s = t[i];
                if (r === null || typeof s != "function")
                    o(r);
                else {
                    var l = s({
                        ...r
                    }, n);
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && s.id && l === null && g.log(`Event processor "${s.id}" dropped event`),
                    ke(l) ? l.then(d=>this._notifyEventProcessors(t, d, n, i + 1).then(o)).then(null, a) : this._notifyEventProcessors(t, l, n, i + 1).then(o).then(null, a)
                }
            }
            )
        }
        _notifyScopeListeners() {
            this._notifyingListeners || (this._notifyingListeners = !0,
            this._scopeListeners.forEach(t=>{
                t(this)
            }
            ),
            this._notifyingListeners = !1)
        }
        _applyFingerprint(t) {
            t.fingerprint = t.fingerprint ? $r(t.fingerprint) : [],
            this._fingerprint && (t.fingerprint = t.fingerprint.concat(this._fingerprint)),
            t.fingerprint && !t.fingerprint.length && delete t.fingerprint
        }
    }
    function Qr() {
        return be("globalEventProcessors", ()=>[])
    }
    function Ge(e) {
        Qr().push(e)
    }
    var $e = 4
      , zo = 100;
    class Dt {
        __init() {
            this._stack = [{}]
        }
        constructor(t, r=new Z, n=$e) {
            this._version = n,
            Dt.prototype.__init.call(this),
            this.getStackTop().scope = r,
            t && this.bindClient(t)
        }
        isOlderThan(t) {
            return this._version < t
        }
        bindClient(t) {
            var r = this.getStackTop();
            r.client = t,
            t && t.setupIntegrations && t.setupIntegrations()
        }
        pushScope() {
            var t = Z.clone(this.getScope());
            return this.getStack().push({
                client: this.getClient(),
                scope: t
            }),
            t
        }
        popScope() {
            return this.getStack().length <= 1 ? !1 : !!this.getStack().pop()
        }
        withScope(t) {
            var r = this.pushScope();
            try {
                t(r)
            } finally {
                this.popScope()
            }
        }
        getClient() {
            return this.getStackTop().client
        }
        getScope() {
            return this.getStackTop().scope
        }
        getStack() {
            return this._stack
        }
        getStackTop() {
            return this._stack[this._stack.length - 1]
        }
        captureException(t, r) {
            var n = this._lastEventId = r && r.event_id ? r.event_id : _t()
              , i = new Error("Sentry syntheticException");
            return this._withClient((o,a)=>{
                o.captureException(t, {
                    originalException: t,
                    syntheticException: i,
                    ...r,
                    event_id: n
                }, a)
            }
            ),
            n
        }
        captureMessage(t, r, n) {
            var i = this._lastEventId = n && n.event_id ? n.event_id : _t()
              , o = new Error(t);
            return this._withClient((a,s)=>{
                a.captureMessage(t, r, {
                    originalException: t,
                    syntheticException: o,
                    ...n,
                    event_id: i
                }, s)
            }
            ),
            i
        }
        captureEvent(t, r) {
            var n = r && r.event_id ? r.event_id : _t();
            return t.type !== "transaction" && (this._lastEventId = n),
            this._withClient((i,o)=>{
                i.captureEvent(t, {
                    ...r,
                    event_id: n
                }, o)
            }
            ),
            n
        }
        lastEventId() {
            return this._lastEventId
        }
        addBreadcrumb(t, r) {
            const {scope: n, client: i} = this.getStackTop();
            if (!n || !i)
                return;
            const {beforeBreadcrumb: o=null, maxBreadcrumbs: a=zo} = i.getOptions && i.getOptions() || {};
            if (!(a <= 0)) {
                var s = Qt()
                  , l = {
                    timestamp: s,
                    ...t
                }
                  , d = o ? Ar(()=>o(l, r)) : l;
                d !== null && n.addBreadcrumb(d, a)
            }
        }
        setUser(t) {
            var r = this.getScope();
            r && r.setUser(t)
        }
        setTags(t) {
            var r = this.getScope();
            r && r.setTags(t)
        }
        setExtras(t) {
            var r = this.getScope();
            r && r.setExtras(t)
        }
        setTag(t, r) {
            var n = this.getScope();
            n && n.setTag(t, r)
        }
        setExtra(t, r) {
            var n = this.getScope();
            n && n.setExtra(t, r)
        }
        setContext(t, r) {
            var n = this.getScope();
            n && n.setContext(t, r)
        }
        configureScope(t) {
            const {scope: r, client: n} = this.getStackTop();
            r && n && t(r)
        }
        run(t) {
            var r = tn(this);
            try {
                t(this)
            } finally {
                tn(r)
            }
        }
        getIntegration(t) {
            var r = this.getClient();
            if (!r)
                return null;
            try {
                return r.getIntegration(t)
            } catch {
                return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Cannot retrieve integration ${t.id} from the current Hub`),
                null
            }
        }
        startTransaction(t, r) {
            return this._callExtensionMethod("startTransaction", t, r)
        }
        traceHeaders() {
            return this._callExtensionMethod("traceHeaders")
        }
        captureSession(t=!1) {
            if (t)
                return this.endSession();
            this._sendSessionUpdate()
        }
        endSession() {
            var t = this.getStackTop()
              , r = t && t.scope
              , n = r && r.getSession();
            n && Go(n),
            this._sendSessionUpdate(),
            r && r.setSession()
        }
        startSession(t) {
            const {scope: r, client: n} = this.getStackTop()
              , {release: i, environment: o} = n && n.getOptions() || {};
            var a = w();
            const {userAgent: s} = a.navigator || {};
            var l = Ho({
                release: i,
                environment: o,
                ...r && {
                    user: r.getUser()
                },
                ...s && {
                    userAgent: s
                },
                ...t
            });
            if (r) {
                var d = r.getSession && r.getSession();
                d && d.status === "ok" && gt(d, {
                    status: "exited"
                }),
                this.endSession(),
                r.setSession(l)
            }
            return l
        }
        shouldSendDefaultPii() {
            var t = this.getClient()
              , r = t && t.getOptions();
            return Boolean(r && r.sendDefaultPii)
        }
        _sendSessionUpdate() {
            const {scope: t, client: r} = this.getStackTop();
            if (!!t) {
                var n = t.getSession();
                n && r && r.captureSession && r.captureSession(n)
            }
        }
        _withClient(t) {
            const {scope: r, client: n} = this.getStackTop();
            n && t(n, r)
        }
        _callExtensionMethod(t, ...r) {
            var n = ee()
              , i = n.__SENTRY__;
            if (i && i.extensions && typeof i.extensions[t] == "function")
                return i.extensions[t].apply(this, r);
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Extension method ${t} couldn't be found, doing nothing.`)
        }
    }
    function ee() {
        var e = w();
        return e.__SENTRY__ = e.__SENTRY__ || {
            extensions: {},
            hub: void 0
        },
        e
    }
    function tn(e) {
        var t = ee()
          , r = X(t);
        return Ye(t, e),
        r
    }
    function E() {
        var e = ee();
        return (!en(e) || X(e).isOlderThan($e)) && Ye(e, new Dt),
        Yr() ? qo(e) : X(e)
    }
    function qo(e) {
        try {
            var t = ee().__SENTRY__
              , r = t && t.extensions && t.extensions.domain && t.extensions.domain.active;
            if (!r)
                return X(e);
            if (!en(r) || X(r).isOlderThan($e)) {
                var n = X(e).getStackTop();
                Ye(r, new Dt(n.client,Z.clone(n.scope)))
            }
            return X(r)
        } catch {
            return X(e)
        }
    }
    function en(e) {
        return !!(e && e.__SENTRY__ && e.__SENTRY__.hub)
    }
    function X(e) {
        return be("hub", ()=>new Dt, e)
    }
    function Ye(e, t) {
        if (!e)
            return !1;
        var r = e.__SENTRY__ = e.__SENTRY__ || {};
        return r.hub = t,
        !0
    }
    function rn(e, t) {
        return E().captureException(e, {
            captureContext: t
        })
    }
    function Vo(e, t) {
        E().setContext(e, t)
    }
    function nn(e, t) {
        E().setTag(e, t)
    }
    function Wo(e) {
        E().withScope(e)
    }
    var Jo = "7";
    function Zo(e) {
        var t = e.protocol ? `${e.protocol}:` : ""
          , r = e.port ? `:${e.port}` : "";
        return `${t}//${e.host}${r}${e.path ? `/${e.path}` : ""}/api/`
    }
    function Xo(e) {
        return `${Zo(e)}${e.projectId}/envelope/`
    }
    function Ko(e, t) {
        return Wi({
            sentry_key: e.publicKey,
            sentry_version: Jo,
            ...t && {
                sentry_client: `${t.name}/${t.version}`
            }
        })
    }
    function on(e, t={}) {
        var r = typeof t == "string" ? t : t.tunnel
          , n = typeof t == "string" || !t._metadata ? void 0 : t._metadata.sdk;
        return r || `${Xo(e)}?${Ko(e, n)}`
    }
    function an(e) {
        if (!e || !e.sdk)
            return;
        const {name: t, version: r} = e.sdk;
        return {
            name: t,
            version: r
        }
    }
    function Qo(e, t) {
        return t && (e.sdk = e.sdk || {},
        e.sdk.name = e.sdk.name || t.name,
        e.sdk.version = e.sdk.version || t.version,
        e.sdk.integrations = [...e.sdk.integrations || [], ...t.integrations || []],
        e.sdk.packages = [...e.sdk.packages || [], ...t.packages || []]),
        e
    }
    function ta(e, t, r, n) {
        var i = an(r)
          , o = {
            sent_at: new Date().toISOString(),
            ...i && {
                sdk: i
            },
            ...!!n && {
                dsn: Se(t)
            }
        }
          , a = "aggregates"in e ? [{
            type: "sessions"
        }, e] : [{
            type: "session"
        }, e];
        return te(o, [a])
    }
    function ea(e, t, r, n) {
        var i = an(r)
          , o = e.type || "event";
        Qo(e, r && r.sdk);
        var a = ra(e, i, n, t);
        delete e.sdkProcessingMetadata;
        var s = [{
            type: o
        }, e];
        return te(a, [s])
    }
    function ra(e, t, r, n) {
        var i = e.sdkProcessingMetadata && e.sdkProcessingMetadata.dynamicSamplingContext;
        return {
            event_id: e.event_id,
            sent_at: new Date().toISOString(),
            ...t && {
                sdk: t
            },
            ...!!r && {
                dsn: Se(n)
            },
            ...e.type === "transaction" && i && {
                trace: Re({
                    ...i
                })
            }
        }
    }
    var sn = [];
    function na(e) {
        var t = {};
        return e.forEach(r=>{
            const {name: n} = r;
            var i = t[n];
            i && !i.isDefaultInstance && r.isDefaultInstance || (t[n] = r)
        }
        ),
        Object.values(t)
    }
    function ia(e) {
        var t = e.defaultIntegrations || []
          , r = e.integrations;
        t.forEach(a=>{
            a.isDefaultInstance = !0
        }
        );
        let n;
        Array.isArray(r) ? n = [...t, ...r] : typeof r == "function" ? n = $r(r(t)) : n = t;
        var i = na(n)
          , o = i.findIndex(a=>a.name === "Debug");
        if (o !== -1) {
            const [a] = i.splice(o, 1);
            i.push(a)
        }
        return i
    }
    function oa(e) {
        var t = {};
        return e.forEach(r=>{
            t[r.name] = r,
            sn.indexOf(r.name) === -1 && (r.setupOnce(Ge, E),
            sn.push(r.name),
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log(`Integration installed: ${r.name}`))
        }
        ),
        t
    }
    var cn = "Not capturing exception because it's already been captured.";
    class vt {
        __init() {
            this._integrations = {}
        }
        __init2() {
            this._integrationsInitialized = !1
        }
        __init3() {
            this._numProcessing = 0
        }
        __init4() {
            this._outcomes = {}
        }
        constructor(t) {
            if (vt.prototype.__init.call(this),
            vt.prototype.__init2.call(this),
            vt.prototype.__init3.call(this),
            vt.prototype.__init4.call(this),
            this._options = t,
            t.dsn) {
                this._dsn = zi(t.dsn);
                var r = on(this._dsn, t);
                this._transport = t.transport({
                    recordDroppedEvent: this.recordDroppedEvent.bind(this),
                    ...t.transportOptions,
                    url: r
                })
            } else
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("No DSN provided, client will not do anything.")
        }
        captureException(t, r, n) {
            if (Gr(t)) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log(cn);
                return
            }
            let i = r && r.event_id;
            return this._process(this.eventFromException(t, r).then(o=>this._captureEvent(o, r, n)).then(o=>{
                i = o
            }
            )),
            i
        }
        captureMessage(t, r, n, i) {
            let o = n && n.event_id;
            var a = Tr(t) ? this.eventFromMessage(String(t), r, n) : this.eventFromException(t, n);
            return this._process(a.then(s=>this._captureEvent(s, n, i)).then(s=>{
                o = s
            }
            )),
            o
        }
        captureEvent(t, r, n) {
            if (r && r.originalException && Gr(r.originalException)) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log(cn);
                return
            }
            let i = r && r.event_id;
            return this._process(this._captureEvent(t, r, n).then(o=>{
                i = o
            }
            )),
            i
        }
        captureSession(t) {
            if (!this._isEnabled()) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("SDK not enabled, will not capture session.");
                return
            }
            typeof t.release != "string" ? (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("Discarded session because of missing or non-string release") : (this.sendSession(t),
            gt(t, {
                init: !1
            }))
        }
        getDsn() {
            return this._dsn
        }
        getOptions() {
            return this._options
        }
        getTransport() {
            return this._transport
        }
        flush(t) {
            var r = this._transport;
            return r ? this._isClientDoneProcessing(t).then(n=>r.flush(t).then(i=>n && i)) : nt(!0)
        }
        close(t) {
            return this.flush(t).then(r=>(this.getOptions().enabled = !1,
            r))
        }
        setupIntegrations() {
            this._isEnabled() && !this._integrationsInitialized && (this._integrations = oa(this._options.integrations),
            this._integrationsInitialized = !0)
        }
        getIntegrationById(t) {
            return this._integrations[t]
        }
        getIntegration(t) {
            try {
                return this._integrations[t.id] || null
            } catch {
                return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Cannot retrieve integration ${t.id} from the current Client`),
                null
            }
        }
        sendEvent(t, r={}) {
            if (this._dsn) {
                let i = ea(t, this._dsn, this._options._metadata, this._options.tunnel);
                for (var n of r.attachments || [])
                    i = Io(i, Po(n, this._options.transportOptions && this._options.transportOptions.textEncoder));
                this._sendEnvelope(i)
            }
        }
        sendSession(t) {
            if (this._dsn) {
                var r = ta(t, this._dsn, this._options._metadata, this._options.tunnel);
                this._sendEnvelope(r)
            }
        }
        recordDroppedEvent(t, r) {
            if (this._options.sendClientReports) {
                var n = `${t}:${r}`;
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log(`Adding outcome: "${n}"`),
                this._outcomes[n] = this._outcomes[n] + 1 || 1
            }
        }
        _updateSessionFromEvent(t, r) {
            let n = !1
              , i = !1;
            var o = r.exception && r.exception.values;
            if (o) {
                i = !0;
                for (var a of o) {
                    var s = a.mechanism;
                    if (s && s.handled === !1) {
                        n = !0;
                        break
                    }
                }
            }
            var l = t.status === "ok"
              , d = l && t.errors === 0 || l && n;
            d && (gt(t, {
                ...n && {
                    status: "crashed"
                },
                errors: t.errors || Number(i || n)
            }),
            this.captureSession(t))
        }
        _isClientDoneProcessing(t) {
            return new D(r=>{
                let n = 0;
                var i = 1
                  , o = setInterval(()=>{
                    this._numProcessing == 0 ? (clearInterval(o),
                    r(!0)) : (n += i,
                    t && n >= t && (clearInterval(o),
                    r(!1)))
                }
                , i)
            }
            )
        }
        _isEnabled() {
            return this.getOptions().enabled !== !1 && this._dsn !== void 0
        }
        _prepareEvent(t, r, n) {
            const {normalizeDepth: i=3, normalizeMaxBreadth: o=1e3} = this.getOptions();
            var a = {
                ...t,
                event_id: t.event_id || r.event_id || _t(),
                timestamp: t.timestamp || Qt()
            };
            this._applyClientOptions(a),
            this._applyIntegrationsMetadata(a);
            let s = n;
            r.captureContext && (s = Z.clone(s).update(r.captureContext));
            let l = nt(a);
            if (s) {
                var d = [...r.attachments || [], ...s.getAttachments()];
                d.length && (r.attachments = d),
                l = s.applyToEvent(a, r)
            }
            return l.then(u=>typeof i == "number" && i > 0 ? this._normalizeEvent(u, i, o) : u)
        }
        _normalizeEvent(t, r, n) {
            if (!t)
                return null;
            var i = {
                ...t,
                ...t.breadcrumbs && {
                    breadcrumbs: t.breadcrumbs.map(o=>({
                        ...o,
                        ...o.data && {
                            data: J(o.data, r, n)
                        }
                    }))
                },
                ...t.user && {
                    user: J(t.user, r, n)
                },
                ...t.contexts && {
                    contexts: J(t.contexts, r, n)
                },
                ...t.extra && {
                    extra: J(t.extra, r, n)
                }
            };
            return t.contexts && t.contexts.trace && i.contexts && (i.contexts.trace = t.contexts.trace,
            t.contexts.trace.data && (i.contexts.trace.data = J(t.contexts.trace.data, r, n))),
            t.spans && (i.spans = t.spans.map(o=>(o.data && (o.data = J(o.data, r, n)),
            o))),
            i
        }
        _applyClientOptions(t) {
            var r = this.getOptions();
            const {environment: n, release: i, dist: o, maxValueLength: a=250} = r;
            "environment"in t || (t.environment = "environment"in r ? n : "production"),
            t.release === void 0 && i !== void 0 && (t.release = i),
            t.dist === void 0 && o !== void 0 && (t.dist = o),
            t.message && (t.message = Rt(t.message, a));
            var s = t.exception && t.exception.values && t.exception.values[0];
            s && s.value && (s.value = Rt(s.value, a));
            var l = t.request;
            l && l.url && (l.url = Rt(l.url, a))
        }
        _applyIntegrationsMetadata(t) {
            var r = Object.keys(this._integrations);
            r.length > 0 && (t.sdk = t.sdk || {},
            t.sdk.integrations = [...t.sdk.integrations || [], ...r])
        }
        _captureEvent(t, r={}, n) {
            return this._processEvent(t, r, n).then(i=>i.event_id, i=>{
                if (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) {
                    var o = i;
                    o.logLevel === "log" ? g.log(o.message) : g.warn(o)
                }
            }
            )
        }
        _processEvent(t, r, n) {
            const {beforeSend: i, sampleRate: o} = this.getOptions();
            if (!this._isEnabled())
                return Le(new R("SDK not enabled, will not capture event.","log"));
            var a = t.type === "transaction";
            return !a && typeof o == "number" && Math.random() > o ? (this.recordDroppedEvent("sample_rate", "error"),
            Le(new R(`Discarding event because it's not included in the random sample (sampling rate = ${o})`,"log"))) : this._prepareEvent(t, r, n).then(s=>{
                if (s === null)
                    throw this.recordDroppedEvent("event_processor", t.type || "error"),
                    new R("An event processor returned null, will not send event.","log");
                var l = r.data && r.data.__sentry__ === !0;
                if (l || a || !i)
                    return s;
                var d = i(s, r);
                return aa(d)
            }
            ).then(s=>{
                if (s === null)
                    throw this.recordDroppedEvent("before_send", t.type || "error"),
                    new R("`beforeSend` returned `null`, will not send event.","log");
                var l = n && n.getSession();
                !a && l && this._updateSessionFromEvent(l, s);
                var d = s.transaction_info;
                if (a && d && s.transaction !== t.transaction) {
                    var u = "custom";
                    s.transaction_info = {
                        ...d,
                        source: u,
                        changes: [...d.changes, {
                            source: u,
                            timestamp: s.timestamp,
                            propagations: d.propagations
                        }]
                    }
                }
                return this.sendEvent(s, r),
                s
            }
            ).then(null, s=>{
                throw s instanceof R ? s : (this.captureException(s, {
                    data: {
                        __sentry__: !0
                    },
                    originalException: s
                }),
                new R(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${s}`))
            }
            )
        }
        _process(t) {
            this._numProcessing += 1,
            t.then(r=>(this._numProcessing -= 1,
            r), r=>(this._numProcessing -= 1,
            r))
        }
        _sendEnvelope(t) {
            this._transport && this._dsn ? this._transport.send(t).then(null, r=>{
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error("Error while sending event:", r)
            }
            ) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error("Transport disabled")
        }
        _clearOutcomes() {
            var t = this._outcomes;
            return this._outcomes = {},
            Object.keys(t).map(r=>{
                const [n,i] = r.split(":");
                return {
                    reason: n,
                    category: i,
                    quantity: t[r]
                }
            }
            )
        }
    }
    function aa(e) {
        var t = "`beforeSend` method has to return `null` or a valid event.";
        if (ke(e))
            return e.then(r=>{
                if (!(mt(r) || r === null))
                    throw new R(t);
                return r
            }
            , r=>{
                throw new R(`beforeSend rejected with ${r}`)
            }
            );
        if (!(mt(e) || e === null))
            throw new R(t);
        return e
    }
    function sa(e, t) {
        t.debug === !0 && (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? g.enable() : console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."));
        var r = E()
          , n = r.getScope();
        n && n.update(t.initialScope);
        var i = new e(t);
        r.bindClient(i)
    }
    var ca = 30;
    function ln(e, t, r=Co(e.bufferSize || ca)) {
        let n = {};
        var i = a=>r.drain(a);
        function o(a) {
            var s = [];
            if (Zr(a, (f,h)=>{
                var p = Kr(h);
                Fo(n, p) ? e.recordDroppedEvent("ratelimit_backoff", p) : s.push(f)
            }
            ),
            s.length === 0)
                return nt();
            var l = te(a[0], s)
              , d = f=>{
                Zr(l, (h,p)=>{
                    e.recordDroppedEvent(f, Kr(p))
                }
                )
            }
              , u = ()=>t({
                body: Xr(l, e.textEncoder)
            }).then(f=>{
                f.statusCode !== void 0 && (f.statusCode < 200 || f.statusCode >= 300) && (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Sentry responded with status code ${f.statusCode} to sent event.`),
                n = Mo(n, f)
            }
            , f=>{
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error("Failed while sending event:", f),
                d("network_error")
            }
            );
            return r.add(u).then(f=>f, f=>{
                if (f instanceof R)
                    return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error("Skipped sending event because buffer is full."),
                    d("queue_overflow"),
                    nt();
                throw f
            }
            )
        }
        return {
            send: o,
            flush: i
        }
    }
    var un = "7.15.0";
    let dn;
    class Pt {
        constructor() {
            Pt.prototype.__init.call(this)
        }
        static __initStatic() {
            this.id = "FunctionToString"
        }
        __init() {
            this.name = Pt.id
        }
        setupOnce() {
            dn = Function.prototype.toString,
            Function.prototype.toString = function(...t) {
                var r = Te(this) || this;
                return dn.apply(r, t)
            }
        }
    }
    Pt.__initStatic();
    var la = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
    class wt {
        static __initStatic() {
            this.id = "InboundFilters"
        }
        __init() {
            this.name = wt.id
        }
        constructor(t={}) {
            this._options = t,
            wt.prototype.__init.call(this)
        }
        setupOnce(t, r) {
            var n = i=>{
                var o = r();
                if (o) {
                    var a = o.getIntegration(wt);
                    if (a) {
                        var s = o.getClient()
                          , l = s ? s.getOptions() : {}
                          , d = ua(a._options, l);
                        return da(i, d) ? null : i
                    }
                }
                return i
            }
            ;
            n.id = this.name,
            t(n)
        }
    }
    wt.__initStatic();
    function ua(e={}, t={}) {
        return {
            allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
            denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
            ignoreErrors: [...e.ignoreErrors || [], ...t.ignoreErrors || [], ...la],
            ignoreInternal: e.ignoreInternal !== void 0 ? e.ignoreInternal : !0
        }
    }
    function da(e, t) {
        return t.ignoreInternal && _a(e) ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Event dropped due to being internal Sentry Error.
Event: ${rt(e)}`),
        !0) : fa(e, t.ignoreErrors) ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${rt(e)}`),
        !0) : pa(e, t.denyUrls) ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${rt(e)}.
Url: ${re(e)}`),
        !0) : ha(e, t.allowUrls) ? !1 : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${rt(e)}.
Url: ${re(e)}`),
        !0)
    }
    function fa(e, t) {
        return !t || !t.length ? !1 : ma(e).some(r=>t.some(n=>Ce(r, n)))
    }
    function pa(e, t) {
        if (!t || !t.length)
            return !1;
        var r = re(e);
        return r ? t.some(n=>Ce(r, n)) : !1
    }
    function ha(e, t) {
        if (!t || !t.length)
            return !0;
        var r = re(e);
        return r ? t.some(n=>Ce(r, n)) : !0
    }
    function ma(e) {
        if (e.message)
            return [e.message];
        if (e.exception)
            try {
                const {type: t="", value: r=""} = e.exception.values && e.exception.values[0] || {};
                return [`${r}`, `${t}: ${r}`]
            } catch {
                return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error(`Cannot extract message for event ${rt(e)}`),
                []
            }
        return []
    }
    function _a(e) {
        try {
            return e.exception.values[0].type === "SentryError"
        } catch {}
        return !1
    }
    function ga(e=[]) {
        for (let r = e.length - 1; r >= 0; r--) {
            var t = e[r];
            if (t && t.filename !== "<anonymous>" && t.filename !== "[native code]")
                return t.filename || null
        }
        return null
    }
    function re(e) {
        try {
            let t;
            try {
                t = e.exception.values[0].stacktrace.frames
            } catch {}
            return t ? ga(t) : null
        } catch {
            return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error(`Cannot extract url for event ${rt(e)}`),
            null
        }
    }
    function fn(e, t) {
        var r = qe(e, t)
          , n = {
            type: t && t.name,
            value: ba(t)
        };
        return r.length && (n.stacktrace = {
            frames: r
        }),
        n.type === void 0 && n.value === "" && (n.value = "Unrecoverable error caught"),
        n
    }
    function va(e, t, r, n) {
        var i = E()
          , o = i.getClient()
          , a = o && o.getOptions().normalizeDepth
          , s = {
            exception: {
                values: [{
                    type: xe(t) ? t.constructor.name : n ? "UnhandledRejection" : "Error",
                    value: `Non-Error ${n ? "promise rejection" : "exception"} captured with keys: ${Ji(t)}`
                }]
            },
            extra: {
                __serialized__: zr(t, a)
            }
        };
        if (r) {
            var l = qe(e, r);
            l.length && (s.exception.values[0].stacktrace = {
                frames: l
            })
        }
        return s
    }
    function ze(e, t) {
        return {
            exception: {
                values: [fn(e, t)]
            }
        }
    }
    function qe(e, t) {
        var r = t.stacktrace || t.stack || ""
          , n = ya(t);
        try {
            return e(r, n)
        } catch {}
        return []
    }
    var wa = /Minified React error #\d+;/i;
    function ya(e) {
        if (e) {
            if (typeof e.framesToPop == "number")
                return e.framesToPop;
            if (wa.test(e.message))
                return 1
        }
        return 0
    }
    function ba(e) {
        var t = e && e.message;
        return t ? t.error && typeof t.error.message == "string" ? t.error.message : t : "No error message"
    }
    function xa(e, t, r, n) {
        var i = r && r.syntheticException || void 0
          , o = Ve(e, t, i, n);
        return It(o),
        o.level = "error",
        r && r.event_id && (o.event_id = r.event_id),
        nt(o)
    }
    function ka(e, t, r="info", n, i) {
        var o = n && n.syntheticException || void 0
          , a = We(e, t, o, i);
        return a.level = r,
        n && n.event_id && (a.event_id = n.event_id),
        nt(a)
    }
    function Ve(e, t, r, n, i) {
        let o;
        if (Cr(t) && t.error) {
            var a = t;
            return ze(e, a.error)
        }
        if (Nr(t) || Oi(t)) {
            var s = t;
            if ("stack"in t)
                o = ze(e, t);
            else {
                var l = s.name || (Nr(s) ? "DOMError" : "DOMException")
                  , d = s.message ? `${l}: ${s.message}` : l;
                o = We(e, d, r, n),
                Ue(o, d)
            }
            return "code"in s && (o.tags = {
                ...o.tags,
                "DOMException.code": `${s.code}`
            }),
            o
        }
        if (Sr(t))
            return ze(e, t);
        if (mt(t) || xe(t)) {
            var u = t;
            return o = va(e, u, r, i),
            It(o, {
                synthetic: !0
            }),
            o
        }
        return o = We(e, t, r, n),
        Ue(o, `${t}`, void 0),
        It(o, {
            synthetic: !0
        }),
        o
    }
    function We(e, t, r, n) {
        var i = {
            message: t
        };
        if (n && r) {
            var o = qe(e, r);
            o.length && (i.exception = {
                values: [{
                    value: t,
                    stacktrace: {
                        frames: o
                    }
                }]
            })
        }
        return i
    }
    var pn = "Breadcrumbs";
    class Ot {
        static __initStatic() {
            this.id = pn
        }
        __init() {
            this.name = Ot.id
        }
        constructor(t) {
            Ot.prototype.__init.call(this),
            this.options = {
                console: !0,
                dom: !0,
                fetch: !0,
                history: !0,
                sentry: !0,
                xhr: !0,
                ...t
            }
        }
        setupOnce() {
            this.options.console && W("console", Sa),
            this.options.dom && W("dom", Ea(this.options.dom)),
            this.options.xhr && W("xhr", Ca),
            this.options.fetch && W("fetch", Na),
            this.options.history && W("history", Ta)
        }
    }
    Ot.__initStatic();
    function Ea(e) {
        function t(r) {
            let n, i = typeof e == "object" ? e.serializeAttribute : void 0;
            typeof i == "string" && (i = [i]);
            try {
                n = r.event.target ? Ee(r.event.target, i) : Ee(r.event, i)
            } catch {
                n = "<unknown>"
            }
            n.length !== 0 && E().addBreadcrumb({
                category: `ui.${r.name}`,
                message: n
            }, {
                event: r.event,
                name: r.name,
                global: r.global
            })
        }
        return t
    }
    function Sa(e) {
        var t = {
            category: "console",
            data: {
                arguments: e.args,
                logger: "console"
            },
            level: To(e.level),
            message: Dr(e.args, " ")
        };
        if (e.level === "assert")
            if (e.args[0] === !1)
                t.message = `Assertion failed: ${Dr(e.args.slice(1), " ") || "console.assert"}`,
                t.data.arguments = e.args.slice(1);
            else
                return;
        E().addBreadcrumb(t, {
            input: e.args,
            level: e.level
        })
    }
    function Ca(e) {
        if (e.endTimestamp) {
            if (e.xhr.__sentry_own_request__)
                return;
            const {method: t, url: r, status_code: n, body: i} = e.xhr.__sentry_xhr__ || {};
            E().addBreadcrumb({
                category: "xhr",
                data: {
                    method: t,
                    url: r,
                    status_code: n
                },
                type: "http"
            }, {
                xhr: e.xhr,
                input: i
            });
            return
        }
    }
    function Na(e) {
        !e.endTimestamp || e.fetchData.url.match(/sentry_key/) && e.fetchData.method === "POST" || (e.error ? E().addBreadcrumb({
            category: "fetch",
            data: e.fetchData,
            level: "error",
            type: "http"
        }, {
            data: e.error,
            input: e.args
        }) : E().addBreadcrumb({
            category: "fetch",
            data: {
                ...e.fetchData,
                status_code: e.response.status
            },
            type: "http"
        }, {
            input: e.args,
            response: e.response
        }))
    }
    function Ta(e) {
        var t = w();
        let r = e.from
          , n = e.to;
        var i = Be(t.location.href);
        let o = Be(r);
        var a = Be(n);
        o.path || (o = i),
        i.protocol === a.protocol && i.host === a.host && (n = a.relative),
        i.protocol === o.protocol && i.host === o.host && (r = o.relative),
        E().addBreadcrumb({
            category: "navigation",
            data: {
                from: r,
                to: n
            }
        })
    }
    var Je = w();
    class Ra extends vt {
        constructor(t) {
            t._metadata = t._metadata || {},
            t._metadata.sdk = t._metadata.sdk || {
                name: "sentry.javascript.browser",
                packages: [{
                    name: "npm:@sentry/browser",
                    version: un
                }],
                version: un
            },
            super(t),
            t.sendClientReports && Je.document && Je.document.addEventListener("visibilitychange", ()=>{
                Je.document.visibilityState === "hidden" && this._flushOutcomes()
            }
            )
        }
        eventFromException(t, r) {
            return xa(this._options.stackParser, t, r, this._options.attachStacktrace)
        }
        eventFromMessage(t, r="info", n) {
            return ka(this._options.stackParser, t, r, n, this._options.attachStacktrace)
        }
        sendEvent(t, r) {
            var n = this.getIntegrationById(pn);
            n && n.options && n.options.sentry && E().addBreadcrumb({
                category: `sentry.${t.type === "transaction" ? "transaction" : "event"}`,
                event_id: t.event_id,
                level: t.level,
                message: rt(t)
            }, {
                event: t
            }),
            super.sendEvent(t, r)
        }
        _prepareEvent(t, r, n) {
            return t.platform = t.platform || "javascript",
            super._prepareEvent(t, r, n)
        }
        _flushOutcomes() {
            var t = this._clearOutcomes();
            if (t.length === 0) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log("No outcomes to send");
                return
            }
            if (!this._dsn) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log("No dsn provided, will not send outcomes");
                return
            }
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log("Sending outcomes:", t);
            var r = on(this._dsn, this._options)
              , n = Uo(t, this._options.tunnel && Se(this._dsn));
            try {
                var i = w()
                  , o = Object.prototype.toString.call(i && i.navigator) === "[object Navigator]"
                  , a = o && typeof i.navigator.sendBeacon == "function";
                if (a && !this._options.transportOptions) {
                    var s = i.navigator.sendBeacon.bind(i.navigator);
                    s(r, Xr(n))
                } else
                    this._sendEnvelope(n)
            } catch (l) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.error(l)
            }
        }
    }
    var yt = w();
    let ne;
    function Aa() {
        if (ne)
            return ne;
        if (De(yt.fetch))
            return ne = yt.fetch.bind(yt);
        var e = yt.document;
        let t = yt.fetch;
        if (e && typeof e.createElement == "function")
            try {
                var r = e.createElement("iframe");
                r.hidden = !0,
                e.head.appendChild(r);
                var n = r.contentWindow;
                n && n.fetch && (t = n.fetch),
                e.head.removeChild(r)
            } catch (i) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", i)
            }
        return ne = t.bind(yt)
    }
    function Ia(e, t=Aa()) {
        function r(n) {
            var i = {
                body: n.body,
                method: "POST",
                referrerPolicy: "origin",
                headers: e.headers,
                keepalive: n.body.length <= 65536,
                ...e.fetchOptions
            };
            return t(e.url, i).then(o=>({
                statusCode: o.status,
                headers: {
                    "x-sentry-rate-limits": o.headers.get("X-Sentry-Rate-Limits"),
                    "retry-after": o.headers.get("Retry-After")
                }
            }))
        }
        return ln(e, r)
    }
    var Da = 4;
    function Pa(e) {
        function t(r) {
            return new D((n,i)=>{
                var o = new XMLHttpRequest;
                o.onerror = i,
                o.onreadystatechange = ()=>{
                    o.readyState === Da && n({
                        statusCode: o.status,
                        headers: {
                            "x-sentry-rate-limits": o.getResponseHeader("X-Sentry-Rate-Limits"),
                            "retry-after": o.getResponseHeader("Retry-After")
                        }
                    })
                }
                ,
                o.open("POST", e.url);
                for (var a in e.headers)
                    Object.prototype.hasOwnProperty.call(e.headers, a) && o.setRequestHeader(a, e.headers[a]);
                o.send(r.body)
            }
            )
        }
        return ln(e, t)
    }
    var ie = "?"
      , Oa = 30
      , Ua = 40
      , ja = 50;
    function Ze(e, t, r, n) {
        var i = {
            filename: e,
            function: t,
            in_app: !0
        };
        return r !== void 0 && (i.lineno = r),
        n !== void 0 && (i.colno = n),
        i
    }
    var La = /^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i
      , Ba = /\((\S*)(?::(\d+))(?::(\d+))\)/
      , Fa = e=>{
        var t = La.exec(e);
        if (t) {
            var r = t[2] && t[2].indexOf("eval") === 0;
            if (r) {
                var n = Ba.exec(t[2]);
                n && (t[2] = n[1],
                t[3] = n[2],
                t[4] = n[3])
            }
            const [i,o] = hn(t[1] || ie, t[2]);
            return Ze(o, i, t[3] ? +t[3] : void 0, t[4] ? +t[4] : void 0)
        }
    }
      , Ma = [Oa, Fa]
      , Ha = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i
      , Ga = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
      , $a = e=>{
        var t = Ha.exec(e);
        if (t) {
            var r = t[3] && t[3].indexOf(" > eval") > -1;
            if (r) {
                var n = Ga.exec(t[3]);
                n && (t[1] = t[1] || "eval",
                t[3] = n[1],
                t[4] = n[2],
                t[5] = "")
            }
            let i = t[3]
              , o = t[1] || ie;
            return [o,i] = hn(o, i),
            Ze(i, o, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
        }
    }
      , Ya = [ja, $a]
      , za = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i
      , qa = e=>{
        var t = za.exec(e);
        return t ? Ze(t[2], t[1] || ie, +t[3], t[4] ? +t[4] : void 0) : void 0
    }
      , Va = [Ua, qa]
      , Wa = [Ma, Ya, Va]
      , Ja = Lr(...Wa)
      , hn = (e,t)=>{
        var r = e.indexOf("safari-extension") !== -1
          , n = e.indexOf("safari-web-extension") !== -1;
        return r || n ? [e.indexOf("@") !== -1 ? e.split("@")[0] : ie, r ? `safari-extension:${t}` : `safari-web-extension:${t}`] : [e, t]
    }
    ;
    let Xe = 0;
    function mn() {
        return Xe > 0
    }
    function Za() {
        Xe += 1,
        setTimeout(()=>{
            Xe -= 1
        }
        )
    }
    function bt(e, t={}, r) {
        if (typeof e != "function")
            return e;
        try {
            var n = e.__sentry_wrapped__;
            if (n)
                return n;
            if (Te(e))
                return e
        } catch {
            return e
        }
        var i = function() {
            var s = Array.prototype.slice.call(arguments);
            try {
                r && typeof r == "function" && r.apply(this, arguments);
                var l = s.map(d=>bt(d, t));
                return e.apply(this, l)
            } catch (d) {
                throw Za(),
                Wo(u=>{
                    u.addEventProcessor(f=>(t.mechanism && (Ue(f, void 0, void 0),
                    It(f, t.mechanism)),
                    f.extra = {
                        ...f.extra,
                        arguments: s
                    },
                    f)),
                    rn(d)
                }
                ),
                d
            }
        };
        try {
            for (var o in e)
                Object.prototype.hasOwnProperty.call(e, o) && (i[o] = e[o])
        } catch {}
        Pr(i, e),
        Ne(e, "__sentry_wrapped__", i);
        try {
            var a = Object.getOwnPropertyDescriptor(i, "name");
            a.configurable && Object.defineProperty(i, "name", {
                get() {
                    return e.name
                }
            })
        } catch {}
        return i
    }
    class K {
        static __initStatic() {
            this.id = "GlobalHandlers"
        }
        __init() {
            this.name = K.id
        }
        __init2() {
            this._installFunc = {
                onerror: Xa,
                onunhandledrejection: Ka
            }
        }
        constructor(t) {
            K.prototype.__init.call(this),
            K.prototype.__init2.call(this),
            this._options = {
                onerror: !0,
                onunhandledrejection: !0,
                ...t
            }
        }
        setupOnce() {
            Error.stackTraceLimit = 50;
            var t = this._options;
            for (var r in t) {
                var n = this._installFunc[r];
                n && t[r] && (es(r),
                n(),
                this._installFunc[r] = void 0)
            }
        }
    }
    K.__initStatic();
    function Xa() {
        W("error", e=>{
            const [t,r,n] = vn();
            if (!t.getIntegration(K))
                return;
            const {msg: i, url: o, line: a, column: s, error: l} = e;
            if (!(mn() || l && l.__sentry_own_request__)) {
                var d = l === void 0 && ht(i) ? ts(i, o, a, s) : _n(Ve(r, l || i, void 0, n, !1), o, a, s);
                d.level = "error",
                gn(t, l, d, "onerror")
            }
        }
        )
    }
    function Ka() {
        W("unhandledrejection", e=>{
            const [t,r,n] = vn();
            if (!t.getIntegration(K))
                return;
            let i = e;
            try {
                "reason"in e ? i = e.reason : "detail"in e && "reason"in e.detail && (i = e.detail.reason)
            } catch {}
            if (mn() || i && i.__sentry_own_request__)
                return !0;
            var o = Tr(i) ? Qa(i) : Ve(r, i, void 0, n, !0);
            o.level = "error",
            gn(t, i, o, "onunhandledrejection")
        }
        )
    }
    function Qa(e) {
        return {
            exception: {
                values: [{
                    type: "UnhandledRejection",
                    value: `Non-Error promise rejection captured with value: ${String(e)}`
                }]
            }
        }
    }
    function ts(e, t, r, n) {
        var i = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
        let o = Cr(e) ? e.message : e
          , a = "Error";
        var s = o.match(i);
        s && (a = s[1],
        o = s[2]);
        var l = {
            exception: {
                values: [{
                    type: a,
                    value: o
                }]
            }
        };
        return _n(l, t, r, n)
    }
    function _n(e, t, r, n) {
        var i = e.exception = e.exception || {}
          , o = i.values = i.values || []
          , a = o[0] = o[0] || {}
          , s = a.stacktrace = a.stacktrace || {}
          , l = s.frames = s.frames || []
          , d = isNaN(parseInt(n, 10)) ? void 0 : n
          , u = isNaN(parseInt(r, 10)) ? void 0 : r
          , f = ht(t) && t.length > 0 ? t : Mi();
        return l.length === 0 && l.push({
            colno: d,
            filename: f,
            function: "?",
            in_app: !0,
            lineno: u
        }),
        e
    }
    function es(e) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.log(`Global Handler attached: ${e}`)
    }
    function gn(e, t, r, n) {
        It(r, {
            handled: !1,
            type: n
        }),
        e.captureEvent(r, {
            originalException: t
        })
    }
    function vn() {
        var e = E()
          , t = e.getClient()
          , r = t && t.getOptions() || {
            stackParser: ()=>[],
            attachStacktrace: !1
        };
        return [e, r.stackParser, r.attachStacktrace]
    }
    var rs = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"];
    class Ut {
        static __initStatic() {
            this.id = "TryCatch"
        }
        __init() {
            this.name = Ut.id
        }
        constructor(t) {
            Ut.prototype.__init.call(this),
            this._options = {
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0,
                ...t
            }
        }
        setupOnce() {
            var t = w();
            this._options.setTimeout && A(t, "setTimeout", wn),
            this._options.setInterval && A(t, "setInterval", wn),
            this._options.requestAnimationFrame && A(t, "requestAnimationFrame", ns),
            this._options.XMLHttpRequest && "XMLHttpRequest"in t && A(XMLHttpRequest.prototype, "send", is);
            var r = this._options.eventTarget;
            if (r) {
                var n = Array.isArray(r) ? r : rs;
                n.forEach(os)
            }
        }
    }
    Ut.__initStatic();
    function wn(e) {
        return function(...t) {
            var r = t[0];
            return t[0] = bt(r, {
                mechanism: {
                    data: {
                        function: V(e)
                    },
                    handled: !0,
                    type: "instrument"
                }
            }),
            e.apply(this, t)
        }
    }
    function ns(e) {
        return function(t) {
            return e.apply(this, [bt(t, {
                mechanism: {
                    data: {
                        function: "requestAnimationFrame",
                        handler: V(e)
                    },
                    handled: !0,
                    type: "instrument"
                }
            })])
        }
    }
    function is(e) {
        return function(...t) {
            var r = this
              , n = ["onload", "onerror", "onprogress", "onreadystatechange"];
            return n.forEach(i=>{
                i in r && typeof r[i] == "function" && A(r, i, function(o) {
                    var a = {
                        mechanism: {
                            data: {
                                function: i,
                                handler: V(o)
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }
                      , s = Te(o);
                    return s && (a.mechanism.data.handler = V(s)),
                    bt(o, a)
                })
            }
            ),
            e.apply(this, t)
        }
    }
    function os(e) {
        var t = w()
          , r = t[e] && t[e].prototype;
        !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (A(r, "addEventListener", function(n) {
            return function(i, o, a) {
                try {
                    typeof o.handleEvent == "function" && (o.handleEvent = bt(o.handleEvent, {
                        mechanism: {
                            data: {
                                function: "handleEvent",
                                handler: V(o),
                                target: e
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }))
                } catch {}
                return n.apply(this, [i, bt(o, {
                    mechanism: {
                        data: {
                            function: "addEventListener",
                            handler: V(o),
                            target: e
                        },
                        handled: !0,
                        type: "instrument"
                    }
                }), a])
            }
        }),
        A(r, "removeEventListener", function(n) {
            return function(i, o, a) {
                var s = o;
                try {
                    var l = s && s.__sentry_wrapped__;
                    l && n.call(this, i, l, a)
                } catch {}
                return n.call(this, i, s, a)
            }
        }))
    }
    var as = "cause"
      , ss = 5;
    class xt {
        static __initStatic() {
            this.id = "LinkedErrors"
        }
        __init() {
            this.name = xt.id
        }
        constructor(t={}) {
            xt.prototype.__init.call(this),
            this._key = t.key || as,
            this._limit = t.limit || ss
        }
        setupOnce() {
            var t = E().getClient();
            !t || Ge((r,n)=>{
                var i = E().getIntegration(xt);
                return i ? cs(t.getOptions().stackParser, i._key, i._limit, r, n) : r
            }
            )
        }
    }
    xt.__initStatic();
    function cs(e, t, r, n, i) {
        if (!n.exception || !n.exception.values || !i || !q(i.originalException, Error))
            return n;
        var o = yn(e, r, i.originalException, t);
        return n.exception.values = [...o, ...n.exception.values],
        n
    }
    function yn(e, t, r, n, i=[]) {
        if (!q(r[n], Error) || i.length + 1 >= t)
            return i;
        var o = fn(e, r[n]);
        return yn(e, t, r[n], n, [o, ...i])
    }
    var it = w();
    class kt {
        constructor() {
            kt.prototype.__init.call(this)
        }
        static __initStatic() {
            this.id = "HttpContext"
        }
        __init() {
            this.name = kt.id
        }
        setupOnce() {
            Ge(t=>{
                if (E().getIntegration(kt)) {
                    if (!it.navigator && !it.location && !it.document)
                        return t;
                    var r = t.request && t.request.url || it.location && it.location.href;
                    const {referrer: o} = it.document || {}
                      , {userAgent: a} = it.navigator || {};
                    var n = {
                        ...t.request && t.request.headers,
                        ...o && {
                            Referer: o
                        },
                        ...a && {
                            "User-Agent": a
                        }
                    }
                      , i = {
                        ...r && {
                            url: r
                        },
                        headers: n
                    };
                    return {
                        ...t,
                        request: i
                    }
                }
                return t
            }
            )
        }
    }
    kt.__initStatic();
    class Et {
        constructor() {
            Et.prototype.__init.call(this)
        }
        static __initStatic() {
            this.id = "Dedupe"
        }
        __init() {
            this.name = Et.id
        }
        setupOnce(t, r) {
            var n = i=>{
                var o = r().getIntegration(Et);
                if (o) {
                    try {
                        if (ls(i, o._previousEvent))
                            return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("Event dropped due to being a duplicate of previously captured event."),
                            null
                    } catch {
                        return o._previousEvent = i
                    }
                    return o._previousEvent = i
                }
                return i
            }
            ;
            n.id = this.name,
            t(n)
        }
    }
    Et.__initStatic();
    function ls(e, t) {
        return t ? !!(us(e, t) || ds(e, t)) : !1
    }
    function us(e, t) {
        var r = e.message
          , n = t.message;
        return !(!r && !n || r && !n || !r && n || r !== n || !xn(e, t) || !bn(e, t))
    }
    function ds(e, t) {
        var r = kn(t)
          , n = kn(e);
        return !(!r || !n || r.type !== n.type || r.value !== n.value || !xn(e, t) || !bn(e, t))
    }
    function bn(e, t) {
        let r = En(e)
          , n = En(t);
        if (!r && !n)
            return !0;
        if (r && !n || !r && n || (r = r,
        n = n,
        n.length !== r.length))
            return !1;
        for (let a = 0; a < n.length; a++) {
            var i = n[a]
              , o = r[a];
            if (i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i.function !== o.function)
                return !1
        }
        return !0
    }
    function xn(e, t) {
        let r = e.fingerprint
          , n = t.fingerprint;
        if (!r && !n)
            return !0;
        if (r && !n || !r && n)
            return !1;
        r = r,
        n = n;
        try {
            return r.join("") === n.join("")
        } catch {
            return !1
        }
    }
    function kn(e) {
        return e.exception && e.exception.values && e.exception.values[0]
    }
    function En(e) {
        var t = e.exception;
        if (t)
            try {
                return t.values[0].stacktrace.frames
            } catch {
                return
            }
    }
    var fs = [new wt, new Pt, new Ut, new Ot, new K, new xt, new Et, new kt];
    function ps(e={}) {
        if (e.defaultIntegrations === void 0 && (e.defaultIntegrations = fs),
        e.release === void 0) {
            var t = w();
            t.SENTRY_RELEASE && t.SENTRY_RELEASE.id && (e.release = t.SENTRY_RELEASE.id)
        }
        e.autoSessionTracking === void 0 && (e.autoSessionTracking = !0),
        e.sendClientReports === void 0 && (e.sendClientReports = !0);
        var r = {
            ...e,
            stackParser: Xi(e.stackParser || Ja),
            integrations: ia(e),
            transport: e.transport || (Br() ? Ia : Pa)
        };
        sa(Ra, r),
        e.autoSessionTracking && hs()
    }
    function Sn(e) {
        e.startSession({
            ignoreDuration: !0
        }),
        e.captureSession()
    }
    function hs() {
        var e = w()
          , t = e.document;
        if (typeof t > "u") {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && g.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
            return
        }
        var r = E();
        !r.captureSession || (Sn(r),
        W("history", ({from: n, to: i})=>{
            n === void 0 || n === i || Sn(E())
        }
        ))
    }
    class Q {
        static __initStatic() {
            this.id = "RewriteFrames"
        }
        __init() {
            this.name = Q.id
        }
        __init2() {
            this._prefix = "app:///"
        }
        constructor(t={}) {
            Q.prototype.__init.call(this),
            Q.prototype.__init2.call(this),
            Q.prototype.__init3.call(this),
            t.root && (this._root = t.root),
            t.prefix && (this._prefix = t.prefix),
            t.iteratee && (this._iteratee = t.iteratee)
        }
        setupOnce(t, r) {
            t(n=>{
                var i = r().getIntegration(Q);
                return i ? i.process(n) : n
            }
            )
        }
        process(t) {
            let r = t;
            return t.exception && Array.isArray(t.exception.values) && (r = this._processExceptionsEvent(r)),
            r
        }
        __init3() {
            this._iteratee = t=>{
                if (!t.filename)
                    return t;
                var r = /^[A-Z]:\\/.test(t.filename)
                  , n = /^\//.test(t.filename);
                if (r || n) {
                    var i = r ? t.filename.replace(/^[A-Z]:/, "").replace(/\\/g, "/") : t.filename
                      , o = this._root ? Eo(this._root, i) : So(i);
                    t.filename = `${this._prefix}${o}`
                }
                return t
            }
        }
        _processExceptionsEvent(t) {
            try {
                return {
                    ...t,
                    exception: {
                        ...t.exception,
                        values: t.exception.values.map(r=>({
                            ...r,
                            ...r.stacktrace && {
                                stacktrace: this._processStacktrace(r.stacktrace)
                            }
                        }))
                    }
                }
            } catch {
                return t
            }
        }
        _processStacktrace(t) {
            return {
                ...t,
                frames: t && t.frames && t.frames.map(r=>this._iteratee(r))
            }
        }
    }
    Q.__initStatic();
    const oe = "vanga-smartcart-index";
    function ms() {
        ps({
            dsn: "https://bd2aa6b688c34afb9142ce07a79fd2b8@o405705.ingest.sentry.io/6762837",
            allowUrls: [new RegExp(oe)],
            release: "353a43d353f860cb2aa40080fcc921dbaa2dcb6b",
            integrations: [new Q({
                iteratee: t=>{
                    var r;
                    return (r = t.filename) != null && r.includes(oe) && (t.filename = `app:///${oe}.js`),
                    t
                }
            })],
            beforeSend: t=>{
                var n;
                const r = ((n = t.exception) == null ? void 0 : n.values) || [];
                for (const i of r)
                    if (_s(i))
                        return t;
                return null
            }
            ,
            ignoreErrors: ["CodeMirror"]
        }),
        nn("shop.shopify_domain", window.Shopify.shop),
        nn("extension.version", gs())
    }
    function _s(e) {
        var i;
        const t = (i = e.stacktrace) == null ? void 0 : i.frames;
        if (!t)
            return !1;
        let r = !1
          , n = !1;
        for (const o of t) {
            const a = o.filename;
            a && a.includes(".js") && (a.includes(oe) ? r = !0 : n = !0)
        }
        return r && !n
    }
    function gs() {
        const t = Array.from(document.head.getElementsByTagName("script")).find(({src: n})=>n.includes("vanga-smartcart-index"));
        if (!t)
            return "Unknown";
        const r = t.src.split("/").find(n=>n.match(/^\d+\.\d+\.\d+$/));
        return r || "Unknown"
    }
    document.getElementById("vanga-smartcart").dataset.isSmartCartAvailable === "true" && ms(),
    window._VangaSmartCart = {
        onClickHandler: ()=>{}
    },
    document.addEventListener("click", e=>{
        window._VangaSmartCart.onClickHandler(e)
    }
    , {
        capture: !0
    });
    var ae, _, Cn, jt, Nn, Tn, se = {}, Rn = [], vs = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function tt(e, t) {
        for (var r in t)
            e[r] = t[r];
        return e
    }
    function An(e) {
        var t = e.parentNode;
        t && t.removeChild(e)
    }
    function ws(e, t, r) {
        var n, i, o, a = {};
        for (o in t)
            o == "key" ? n = t[o] : o == "ref" ? i = t[o] : a[o] = t[o];
        if (arguments.length > 2 && (a.children = arguments.length > 3 ? ae.call(arguments, 2) : r),
        typeof e == "function" && e.defaultProps != null)
            for (o in e.defaultProps)
                a[o] === void 0 && (a[o] = e.defaultProps[o]);
        return ce(e, a, n, i, null)
    }
    function ce(e, t, r, n, i) {
        var o = {
            type: e,
            props: t,
            key: r,
            ref: n,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: i == null ? ++Cn : i
        };
        return i == null && _.vnode != null && _.vnode(o),
        o
    }
    function M(e) {
        return e.children
    }
    function Lt(e, t) {
        this.props = e,
        this.context = t
    }
    function Bt(e, t) {
        if (t == null)
            return e.__ ? Bt(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var r; t < e.__k.length; t++)
            if ((r = e.__k[t]) != null && r.__e != null)
                return r.__e;
        return typeof e.type == "function" ? Bt(e) : null
    }
    function In(e) {
        var t, r;
        if ((e = e.__) != null && e.__c != null) {
            for (e.__e = e.__c.base = null,
            t = 0; t < e.__k.length; t++)
                if ((r = e.__k[t]) != null && r.__e != null) {
                    e.__e = e.__c.base = r.__e;
                    break
                }
            return In(e)
        }
    }
    function Ke(e) {
        (!e.__d && (e.__d = !0) && jt.push(e) && !le.__r++ || Nn !== _.debounceRendering) && ((Nn = _.debounceRendering) || setTimeout)(le)
    }
    function le() {
        for (var e; le.__r = jt.length; )
            e = jt.sort(function(t, r) {
                return t.__v.__b - r.__v.__b
            }),
            jt = [],
            e.some(function(t) {
                var r, n, i, o, a, s;
                t.__d && (a = (o = (r = t).__v).__e,
                (s = r.__P) && (n = [],
                (i = tt({}, o)).__v = o.__v + 1,
                Qe(s, o, i, r.__n, s.ownerSVGElement !== void 0, o.__h != null ? [a] : null, n, a == null ? Bt(o) : a, o.__h),
                Bn(n, o),
                o.__e != a && In(o)))
            })
    }
    function Dn(e, t, r, n, i, o, a, s, l, d) {
        var u, f, h, p, m, T, v, y = n && n.__k || Rn, k = y.length;
        for (r.__k = [],
        u = 0; u < t.length; u++)
            if ((p = r.__k[u] = (p = t[u]) == null || typeof p == "boolean" ? null : typeof p == "string" || typeof p == "number" || typeof p == "bigint" ? ce(null, p, null, null, p) : Array.isArray(p) ? ce(M, {
                children: p
            }, null, null, null) : p.__b > 0 ? ce(p.type, p.props, p.key, p.ref ? p.ref : null, p.__v) : p) != null) {
                if (p.__ = r,
                p.__b = r.__b + 1,
                (h = y[u]) === null || h && p.key == h.key && p.type === h.type)
                    y[u] = void 0;
                else
                    for (f = 0; f < k; f++) {
                        if ((h = y[f]) && p.key == h.key && p.type === h.type) {
                            y[f] = void 0;
                            break
                        }
                        h = null
                    }
                Qe(e, p, h = h || se, i, o, a, s, l, d),
                m = p.__e,
                (f = p.ref) && h.ref != f && (v || (v = []),
                h.ref && v.push(h.ref, null, p),
                v.push(f, p.__c || m, p)),
                m != null ? (T == null && (T = m),
                typeof p.type == "function" && p.__k === h.__k ? p.__d = l = Pn(p, l, e) : l = On(e, p, h, y, m, l),
                typeof r.type == "function" && (r.__d = l)) : l && h.__e == l && l.parentNode != e && (l = Bt(h))
            }
        for (r.__e = T,
        u = k; u--; )
            y[u] != null && Mn(y[u], y[u]);
        if (v)
            for (u = 0; u < v.length; u++)
                Fn(v[u], v[++u], v[++u])
    }
    function Pn(e, t, r) {
        for (var n, i = e.__k, o = 0; i && o < i.length; o++)
            (n = i[o]) && (n.__ = e,
            t = typeof n.type == "function" ? Pn(n, t, r) : On(r, n, n, i, n.__e, t));
        return t
    }
    function On(e, t, r, n, i, o) {
        var a, s, l;
        if (t.__d !== void 0)
            a = t.__d,
            t.__d = void 0;
        else if (r == null || i != o || i.parentNode == null)
            t: if (o == null || o.parentNode !== e)
                e.appendChild(i),
                a = null;
            else {
                for (s = o,
                l = 0; (s = s.nextSibling) && l < n.length; l += 2)
                    if (s == i)
                        break t;
                e.insertBefore(i, o),
                a = o
            }
        return a !== void 0 ? a : i.nextSibling
    }
    function ys(e, t, r, n, i) {
        var o;
        for (o in r)
            o === "children" || o === "key" || o in t || ue(e, o, null, r[o], n);
        for (o in t)
            i && typeof t[o] != "function" || o === "children" || o === "key" || o === "value" || o === "checked" || r[o] === t[o] || ue(e, o, t[o], r[o], n)
    }
    function Un(e, t, r) {
        t[0] === "-" ? e.setProperty(t, r) : e[t] = r == null ? "" : typeof r != "number" || vs.test(t) ? r : r + "px"
    }
    function ue(e, t, r, n, i) {
        var o;
        t: if (t === "style")
            if (typeof r == "string")
                e.style.cssText = r;
            else {
                if (typeof n == "string" && (e.style.cssText = n = ""),
                n)
                    for (t in n)
                        r && t in r || Un(e.style, t, "");
                if (r)
                    for (t in r)
                        n && r[t] === n[t] || Un(e.style, t, r[t])
            }
        else if (t[0] === "o" && t[1] === "n")
            o = t !== (t = t.replace(/Capture$/, "")),
            t = t.toLowerCase()in e ? t.toLowerCase().slice(2) : t.slice(2),
            e.l || (e.l = {}),
            e.l[t + o] = r,
            r ? n || e.addEventListener(t, o ? Ln : jn, o) : e.removeEventListener(t, o ? Ln : jn, o);
        else if (t !== "dangerouslySetInnerHTML") {
            if (i)
                t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
            else if (t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t in e)
                try {
                    e[t] = r == null ? "" : r;
                    break t
                } catch {}
            typeof r == "function" || (r == null || r === !1 && t.indexOf("-") == -1 ? e.removeAttribute(t) : e.setAttribute(t, r))
        }
    }
    function jn(e) {
        this.l[e.type + !1](_.event ? _.event(e) : e)
    }
    function Ln(e) {
        this.l[e.type + !0](_.event ? _.event(e) : e)
    }
    function Qe(e, t, r, n, i, o, a, s, l) {
        var d, u, f, h, p, m, T, v, y, k, j, L, N, S = t.type;
        if (t.constructor !== void 0)
            return null;
        r.__h != null && (l = r.__h,
        s = t.__e = r.__e,
        t.__h = null,
        o = [s]),
        (d = _.__b) && d(t);
        try {
            t: if (typeof S == "function") {
                for (v = t.props,
                y = (d = S.contextType) && n[d.__c],
                k = d ? y ? y.props.value : d.__ : n,
                r.__c ? T = (u = t.__c = r.__c).__ = u.__E : ("prototype"in S && S.prototype.render ? t.__c = u = new S(v,k) : (t.__c = u = new Lt(v,k),
                u.constructor = S,
                u.render = xs),
                y && y.sub(u),
                u.props = v,
                u.state || (u.state = {}),
                u.context = k,
                u.__n = n,
                f = u.__d = !0,
                u.__h = [],
                u._sb = []),
                u.__s == null && (u.__s = u.state),
                S.getDerivedStateFromProps != null && (u.__s == u.state && (u.__s = tt({}, u.__s)),
                tt(u.__s, S.getDerivedStateFromProps(v, u.__s))),
                h = u.props,
                p = u.state,
                d = 0; d < u._sb.length; d++)
                    u.__h.push(u._sb[d]),
                    u._sb = [];
                if (f)
                    S.getDerivedStateFromProps == null && u.componentWillMount != null && u.componentWillMount(),
                    u.componentDidMount != null && u.__h.push(u.componentDidMount);
                else {
                    if (S.getDerivedStateFromProps == null && v !== h && u.componentWillReceiveProps != null && u.componentWillReceiveProps(v, k),
                    !u.__e && u.shouldComponentUpdate != null && u.shouldComponentUpdate(v, u.__s, k) === !1 || t.__v === r.__v) {
                        u.props = v,
                        u.state = u.__s,
                        t.__v !== r.__v && (u.__d = !1),
                        u.__v = t,
                        t.__e = r.__e,
                        t.__k = r.__k,
                        t.__k.forEach(function(ft) {
                            ft && (ft.__ = t)
                        }),
                        u.__h.length && a.push(u);
                        break t
                    }
                    u.componentWillUpdate != null && u.componentWillUpdate(v, u.__s, k),
                    u.componentDidUpdate != null && u.__h.push(function() {
                        u.componentDidUpdate(h, p, m)
                    })
                }
                if (u.context = k,
                u.props = v,
                u.__v = t,
                u.__P = e,
                j = _.__r,
                L = 0,
                "prototype"in S && S.prototype.render)
                    u.state = u.__s,
                    u.__d = !1,
                    j && j(t),
                    d = u.render(u.props, u.state, u.context);
                else
                    do
                        u.__d = !1,
                        j && j(t),
                        d = u.render(u.props, u.state, u.context),
                        u.state = u.__s;
                    while (u.__d && ++L < 25);
                u.state = u.__s,
                u.getChildContext != null && (n = tt(tt({}, n), u.getChildContext())),
                f || u.getSnapshotBeforeUpdate == null || (m = u.getSnapshotBeforeUpdate(h, p)),
                N = d != null && d.type === M && d.key == null ? d.props.children : d,
                Dn(e, Array.isArray(N) ? N : [N], t, r, n, i, o, a, s, l),
                u.base = t.__e,
                t.__h = null,
                u.__h.length && a.push(u),
                T && (u.__E = u.__ = null),
                u.__e = !1
            } else
                o == null && t.__v === r.__v ? (t.__k = r.__k,
                t.__e = r.__e) : t.__e = bs(r.__e, t, r, n, i, o, a, l);
            (d = _.diffed) && d(t)
        } catch (ft) {
            t.__v = null,
            (l || o != null) && (t.__e = s,
            t.__h = !!l,
            o[o.indexOf(s)] = null),
            _.__e(ft, t, r)
        }
    }
    function Bn(e, t) {
        _.__c && _.__c(t, e),
        e.some(function(r) {
            try {
                e = r.__h,
                r.__h = [],
                e.some(function(n) {
                    n.call(r)
                })
            } catch (n) {
                _.__e(n, r.__v)
            }
        })
    }
    function bs(e, t, r, n, i, o, a, s) {
        var l, d, u, f = r.props, h = t.props, p = t.type, m = 0;
        if (p === "svg" && (i = !0),
        o != null) {
            for (; m < o.length; m++)
                if ((l = o[m]) && "setAttribute"in l == !!p && (p ? l.localName === p : l.nodeType === 3)) {
                    e = l,
                    o[m] = null;
                    break
                }
        }
        if (e == null) {
            if (p === null)
                return document.createTextNode(h);
            e = i ? document.createElementNS("http://www.w3.org/2000/svg", p) : document.createElement(p, h.is && h),
            o = null,
            s = !1
        }
        if (p === null)
            f === h || s && e.data === h || (e.data = h);
        else {
            if (o = o && ae.call(e.childNodes),
            d = (f = r.props || se).dangerouslySetInnerHTML,
            u = h.dangerouslySetInnerHTML,
            !s) {
                if (o != null)
                    for (f = {},
                    m = 0; m < e.attributes.length; m++)
                        f[e.attributes[m].name] = e.attributes[m].value;
                (u || d) && (u && (d && u.__html == d.__html || u.__html === e.innerHTML) || (e.innerHTML = u && u.__html || ""))
            }
            if (ys(e, h, f, i, s),
            u)
                t.__k = [];
            else if (m = t.props.children,
            Dn(e, Array.isArray(m) ? m : [m], t, r, n, i && p !== "foreignObject", o, a, o ? o[0] : r.__k && Bt(r, 0), s),
            o != null)
                for (m = o.length; m--; )
                    o[m] != null && An(o[m]);
            s || ("value"in h && (m = h.value) !== void 0 && (m !== e.value || p === "progress" && !m || p === "option" && m !== f.value) && ue(e, "value", m, f.value, !1),
            "checked"in h && (m = h.checked) !== void 0 && m !== e.checked && ue(e, "checked", m, f.checked, !1))
        }
        return e
    }
    function Fn(e, t, r) {
        try {
            typeof e == "function" ? e(t) : e.current = t
        } catch (n) {
            _.__e(n, r)
        }
    }
    function Mn(e, t, r) {
        var n, i;
        if (_.unmount && _.unmount(e),
        (n = e.ref) && (n.current && n.current !== e.__e || Fn(n, null, t)),
        (n = e.__c) != null) {
            if (n.componentWillUnmount)
                try {
                    n.componentWillUnmount()
                } catch (o) {
                    _.__e(o, t)
                }
            n.base = n.__P = null,
            e.__c = void 0
        }
        if (n = e.__k)
            for (i = 0; i < n.length; i++)
                n[i] && Mn(n[i], t, r || typeof e.type != "function");
        r || e.__e == null || An(e.__e),
        e.__ = e.__e = e.__d = void 0
    }
    function xs(e, t, r) {
        return this.constructor(e, r)
    }
    function ks(e, t, r) {
        var n, i, o;
        _.__ && _.__(e, t),
        i = (n = typeof r == "function") ? null : r && r.__k || t.__k,
        o = [],
        Qe(t, e = (!n && r || t).__k = ws(M, null, [e]), i || se, se, t.ownerSVGElement !== void 0, !n && r ? [r] : i ? null : t.firstChild ? ae.call(t.childNodes) : null, o, !n && r ? r : i ? i.__e : t.firstChild, n),
        Bn(o, e)
    }
    function Ft(e, t) {
        var r = {
            __c: t = "__cC" + Tn++,
            __: e,
            Consumer: function(n, i) {
                return n.children(i)
            },
            Provider: function(n) {
                var i, o;
                return this.getChildContext || (i = [],
                (o = {})[t] = this,
                this.getChildContext = function() {
                    return o
                }
                ,
                this.shouldComponentUpdate = function(a) {
                    this.props.value !== a.value && i.some(Ke)
                }
                ,
                this.sub = function(a) {
                    i.push(a);
                    var s = a.componentWillUnmount;
                    a.componentWillUnmount = function() {
                        i.splice(i.indexOf(a), 1),
                        s && s.call(a)
                    }
                }
                ),
                n.children
            }
        };
        return r.Provider.__ = r.Consumer.contextType = r
    }
    ae = Rn.slice,
    _ = {
        __e: function(e, t, r, n) {
            for (var i, o, a; t = t.__; )
                if ((i = t.__c) && !i.__)
                    try {
                        if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(e)),
                        a = i.__d),
                        i.componentDidCatch != null && (i.componentDidCatch(e, n || {}),
                        a = i.__d),
                        a)
                            return i.__E = i
                    } catch (s) {
                        e = s
                    }
            throw e
        }
    },
    Cn = 0,
    Lt.prototype.setState = function(e, t) {
        var r;
        r = this.__s != null && this.__s !== this.state ? this.__s : this.__s = tt({}, this.state),
        typeof e == "function" && (e = e(tt({}, r), this.props)),
        e && tt(r, e),
        e != null && this.__v && (t && this._sb.push(t),
        Ke(this))
    }
    ,
    Lt.prototype.forceUpdate = function(e) {
        this.__v && (this.__e = !0,
        e && this.__h.push(e),
        Ke(this))
    }
    ,
    Lt.prototype.render = M,
    jt = [],
    le.__r = 0,
    Tn = 0;
    function Es(e) {
        e.style.setProperty("--tw-x-rem-multiplier", Ss().toString())
    }
    function Ss() {
        const e = document.documentElement
          , t = parseInt(window.getComputedStyle(e).getPropertyValue("font-size"), 10)
          , r = 16;
        return r > t ? r / t : 1
    }
    function Cs() {
        const e = document.createElement("link");
        e.rel = "stylesheet",
        e.href = "https://rsms.me/inter/inter.css",
        document.head.appendChild(e)
    }
    class Mt extends Error {
        constructor(r) {
            super(r.message, r.options);
            Pi(this, "metadata");
            this.name = "ErrorWithMetadata",
            this.metadata = r.metadata
        }
    }
    class tr extends Mt {
        constructor(t) {
            super(t),
            this.name = "CartApiError"
        }
    }
    class ot extends Mt {
        constructor(t) {
            super({
                message: "Network connection failed.",
                ...t
            }),
            this.name = "ConnectionError"
        }
    }
    const Ns = [tr, ot];
    function Ts(e) {
        for (const t of Ns)
            if (e instanceof t)
                return !0;
        return !1
    }
    function B(e) {
        if (Ts(e)) {
            console.error(e);
            return
        }
        e instanceof Mt && e.metadata && Vo("error payload", e.metadata),
        rn(e),
        console.error(e)
    }
    const Ht = {
        mode: "light",
        showVangaLogo: !0,
        useGradient: !1,
        colors: {
            accent: "#000000",
            button: "#000000",
            buttonText: "#ffffff"
        }
    };
    function Rs(e) {
        if (!e)
            return B(new Error("Theme not found.")),
            Ht;
        const {mode: t, showVangaLogo: r, useGradient: n, colors: i} = JSON.parse(e);
        return {
            mode: Is(t),
            showVangaLogo: Hn(r, Ht.showVangaLogo),
            useGradient: Hn(n, Ht.useGradient),
            colors: {
                accent: Gt({
                    value: i == null ? void 0 : i.accent,
                    role: "accent"
                }),
                button: Gt({
                    value: i == null ? void 0 : i.button,
                    role: "button"
                }),
                buttonGradient1: Gt({
                    value: i == null ? void 0 : i.buttonGradient1,
                    role: "buttonGradient1"
                }),
                buttonGradient2: Gt({
                    value: i == null ? void 0 : i.buttonGradient2,
                    role: "buttonGradient2"
                }),
                buttonText: Gt({
                    value: i == null ? void 0 : i.buttonText,
                    role: "buttonText"
                })
            }
        }
    }
    function As(e, t) {
        e.style.setProperty("--color-accent", t.colors.accent || null),
        e.style.setProperty("--color-button", t.colors.button || null),
        e.style.setProperty("--color-button-text", t.colors.buttonText || null)
    }
    function Is(e) {
        return e !== "light" && e !== "dark" ? (B(new Error(`Theme "mode" is not valid: ${e}`)),
        Ht.mode) : e
    }
    function Hn(e, t) {
        switch (e) {
        case "true":
            return !0;
        case "false":
            return !1;
        default:
            return t
        }
    }
    function Gt({value: e, role: t}) {
        return typeof e != "string" ? (B(new Error(`Theme color "${t}" is not valid: ${e}`)),
        Ht.colors[t]) : e
    }
    function Ds(e, t) {
        return !e || !t ? (B(new Error("Money format not found.")),
        {
            withoutCurrencyCode: "${{ amount }}",
            withCurrencyCode: "${{ amount }} USD"
        }) : {
            withoutCurrencyCode: e,
            withCurrencyCode: t
        }
    }
    function Ps(e) {
        if (!e)
            return B(new Error("Translations not found.")),
            {};
        const t = e.replace(/"=>"/g, '":"');
        return JSON.parse(t)
    }
    function Os(e) {
        return e ? new Date(e) : null
    }
    function Us(e) {
        const t = Ds(e.moneyFormat, e.moneyWithCurrencyFormat)
          , r = window.Shopify.locale
          , n = Ps(e.translations)
          , i = Rs(e.theme)
          , o = Os(e.translationsUpdatedAt)
          , a = e.requireConsent
          , s = e.termsAndConditionsUrl
          , l = e.showFreeShippingProgress
          , d = JSON.parse(e.appSettings || "{}");
        return {
            moneyFormat: t,
            locale: r,
            translations: n,
            theme: i,
            translationsUpdatedAt: o,
            requireConsent: a === "true",
            termsAndConditionsUrl: s,
            showFreeShippingProgress: l === "true",
            appSettings: d
        }
    }
    function js(e) {
        return [/Googlebot/, /Storebot-Google/].some(r=>r.test(e))
    }
    const Ls = `:host{all:initial}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[type=text],[type=email],[type=url],[type=password],[type=number],[type=date],[type=datetime-local],[type=month],[type=search],[type=tel],[type=time],[type=week],[multiple],textarea,select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0;padding:.5rem .75rem;font-size:1rem;line-height:1.5rem;--tw-shadow: 0 0 #0000}[type=text]:focus,[type=email]:focus,[type=url]:focus,[type=password]:focus,[type=number]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=week]:focus,[multiple]:focus,textarea:focus,select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-color:#2563eb}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-top:0;padding-bottom:0}select{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple]{background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#2563eb;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow: 0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 2px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked{border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")}[type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")}[type=checkbox]:checked:hover,[type=checkbox]:checked:focus,[type=radio]:checked:hover,[type=radio]:checked:focus{border-color:transparent;background-color:currentColor}[type=checkbox]:indeterminate{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:indeterminate:hover,[type=checkbox]:indeterminate:focus{border-color:transparent;background-color:currentColor}[type=file]{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type=file]:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.input-with-floating-label{position:relative}.input-with-floating-label label{pointer-events:none;position:absolute;top:0px;right:0px;bottom:0px;left:0px;font-size:calc(var(--tw-x-rem-multiplier) * .75rem);line-height:calc(var(--tw-x-rem-multiplier) * 1rem);--tw-text-opacity: 1;color:rgb(115 115 115 / var(--tw-text-opacity))}.dark .input-with-floating-label label{--tw-text-opacity: 1;color:rgb(163 163 163 / var(--tw-text-opacity))}.input-with-floating-label label{top:6px;left:12px}.input-with-floating-label input,.input-with-floating-label select{width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:calc(var(--tw-x-rem-multiplier) * .375rem);border-width:1px;--tw-border-opacity: 1;border-color:rgb(212 212 212 / var(--tw-border-opacity));font-size:calc(var(--tw-x-rem-multiplier) * .875rem);line-height:calc(var(--tw-x-rem-multiplier) * 1.25rem)}input[type=number].input-with-floating-label input::-webkit-inner-spin-button,input[type=number].input-with-floating-label input::-webkit-outer-spin-button,input[type=number] .input-with-floating-label select::-webkit-inner-spin-button,input[type=number] .input-with-floating-label select::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number].input-with-floating-label input,input[type=number] .input-with-floating-label select{-moz-appearance:textfield}.dark .input-with-floating-label input,.dark .input-with-floating-label select{border-color:#0000001a;background-color:#ffffff1a}.input-with-floating-label input:focus,.input-with-floating-label select:focus{--tw-border-opacity: 1;border-color:rgb(115 115 115 / var(--tw-border-opacity));outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);--tw-ring-opacity: 1;--tw-ring-color: rgb(115 115 115 / var(--tw-ring-opacity))}.dark .input-with-floating-label input:focus,.dark .input-with-floating-label select:focus{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity));--tw-ring-opacity: 1;--tw-ring-color: rgb(0 0 0 / var(--tw-ring-opacity))}.input-with-floating-label input{padding:21px 11px 6px}.input-with-floating-label select{padding:21px 52px 6px 11px}.input-with-floating-label .caret{pointer-events:none;position:absolute;top:calc(var(--tw-x-rem-multiplier) * 1.5rem);right:0px;fill:currentColor;padding-left:calc(var(--tw-x-rem-multiplier) * .75rem);padding-right:calc(var(--tw-x-rem-multiplier) * .75rem);transform:translateY(-50%)}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{top:0px;right:0px;bottom:0px;left:0px}.z-9999{z-index:9999}.col-span-2{grid-column:span 2 / span 2}.m-auto{margin:auto}.mx-auto{margin-left:auto;margin-right:auto}.-mt-4{margin-top:calc(calc(var(--tw-x-rem-multiplier) * 1rem) * -1)}.mb-4{margin-bottom:calc(var(--tw-x-rem-multiplier) * 1rem)}.mt-1{margin-top:calc(var(--tw-x-rem-multiplier) * .25rem)}.mt-2{margin-top:calc(var(--tw-x-rem-multiplier) * .5rem)}.mt-96{margin-top:calc(var(--tw-x-rem-multiplier) * 24rem)}.mt-12{margin-top:calc(var(--tw-x-rem-multiplier) * 3rem)}.mt-4{margin-top:calc(var(--tw-x-rem-multiplier) * 1rem)}.mt-8{margin-top:calc(var(--tw-x-rem-multiplier) * 2rem)}.mt-3{margin-top:calc(var(--tw-x-rem-multiplier) * .75rem)}.ml-2{margin-left:calc(var(--tw-x-rem-multiplier) * .5rem)}.ml-7{margin-left:calc(var(--tw-x-rem-multiplier) * 1.75rem)}.-ml-1{margin-left:calc(calc(var(--tw-x-rem-multiplier) * .25rem) * -1)}.mr-2{margin-right:calc(var(--tw-x-rem-multiplier) * .5rem)}.mt-0\\.5{margin-top:calc(var(--tw-x-rem-multiplier) * .125rem)}.mt-0{margin-top:0}.inline{display:inline}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-min{height:-moz-min-content;height:min-content}.h-6{height:calc(var(--tw-x-rem-multiplier) * 1.5rem)}.h-8{height:calc(var(--tw-x-rem-multiplier) * 2rem)}.h-full{height:100%}.h-5{height:calc(var(--tw-x-rem-multiplier) * 1.25rem)}.h-1\\.5{height:calc(var(--tw-x-rem-multiplier) * .375rem)}.h-1{height:calc(var(--tw-x-rem-multiplier) * .25rem)}.h-3\\.5{height:calc(var(--tw-x-rem-multiplier) * .875rem)}.h-3{height:calc(var(--tw-x-rem-multiplier) * .75rem)}.h-4\\.5{height:calc(var(--tw-x-rem-multiplier) * 1.125rem)}.h-4{height:calc(var(--tw-x-rem-multiplier) * 1rem)}.h-16{height:calc(var(--tw-x-rem-multiplier) * 4rem)}.h-2{height:calc(var(--tw-x-rem-multiplier) * .5rem)}.h-18{height:calc(var(--tw-x-rem-multiplier) * 4.5rem)}.min-h-full{min-height:100%}.w-full{width:100%}.w-min{width:-moz-min-content;width:min-content}.w-6{width:calc(var(--tw-x-rem-multiplier) * 1.5rem)}.w-8{width:calc(var(--tw-x-rem-multiplier) * 2rem)}.w-5{width:calc(var(--tw-x-rem-multiplier) * 1.25rem)}.w-3\\.5{width:calc(var(--tw-x-rem-multiplier) * .875rem)}.w-3{width:calc(var(--tw-x-rem-multiplier) * .75rem)}.w-4\\.5{width:calc(var(--tw-x-rem-multiplier) * 1.125rem)}.w-4{width:calc(var(--tw-x-rem-multiplier) * 1rem)}.w-1\\/3{width:33.333333%}.w-2\\/3{width:66.666667%}.w-16{width:calc(var(--tw-x-rem-multiplier) * 4rem)}.w-48{width:calc(var(--tw-x-rem-multiplier) * 12rem)}.w-36{width:calc(var(--tw-x-rem-multiplier) * 9rem)}.w-auto{width:auto}.w-18{width:calc(var(--tw-x-rem-multiplier) * 4.5rem)}.w-12{width:calc(var(--tw-x-rem-multiplier) * 3rem)}.max-w-screen-xl{max-width:1280px}.flex-none{flex:none}.shrink-0{flex-shrink:0}.grow{flex-grow:1}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * var(--tw-space-x-reverse));margin-left:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * calc(1 - var(--tw-space-x-reverse)))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * var(--tw-space-y-reverse))}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(calc(var(--tw-x-rem-multiplier) * .25rem) * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(calc(var(--tw-x-rem-multiplier) * .25rem) * var(--tw-space-y-reverse))}.space-x-0\\.5>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(calc(var(--tw-x-rem-multiplier) * .125rem) * var(--tw-space-x-reverse));margin-left:calc(calc(var(--tw-x-rem-multiplier) * .125rem) * calc(1 - var(--tw-space-x-reverse)))}.space-x-0>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(0px * var(--tw-space-x-reverse));margin-left:calc(0px * calc(1 - var(--tw-space-x-reverse)))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(calc(var(--tw-x-rem-multiplier) * .75rem) * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(calc(var(--tw-x-rem-multiplier) * .75rem) * var(--tw-space-y-reverse))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-black\\/10>:not([hidden])~:not([hidden]){border-color:#0000001a}.place-self-end{place-self:end}.self-center{align-self:center}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overscroll-y-contain{overscroll-behavior-y:contain}.rounded-md{border-radius:calc(var(--tw-x-rem-multiplier) * .375rem)}.rounded-lg{border-radius:calc(var(--tw-x-rem-multiplier) * .5rem)}.rounded-full{border-radius:9999px}.rounded{border-radius:calc(var(--tw-x-rem-multiplier) * .25rem)}.rounded-t-xl{border-top-left-radius:calc(var(--tw-x-rem-multiplier) * .75rem);border-top-right-radius:calc(var(--tw-x-rem-multiplier) * .75rem)}.border{border-width:1px}.border-t{border-top-width:1px}.border-b{border-bottom-width:1px}.border-none{border-style:none}.border-transparent{border-color:transparent}.border-black\\/10{border-color:#0000001a}.border-red-200{--tw-border-opacity: 1;border-color:rgb(254 202 202 / var(--tw-border-opacity))}.border-neutral-300{--tw-border-opacity: 1;border-color:rgb(212 212 212 / var(--tw-border-opacity))}.bg-black\\/10{background-color:#0000001a}.bg-black\\/60{background-color:#0009}.bg-red-100{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-neutral-100{--tw-bg-opacity: 1;background-color:rgb(245 245 245 / var(--tw-bg-opacity))}.bg-neutral-300{--tw-bg-opacity: 1;background-color:rgb(212 212 212 / var(--tw-bg-opacity))}.bg-brand-accent{background-color:var(--color-accent)}.bg-transparent{background-color:transparent}.bg-black\\/5{background-color:#0000000d}.fill-current{fill:currentColor}.object-contain{-o-object-fit:contain;object-fit:contain}.p-4{padding:calc(var(--tw-x-rem-multiplier) * 1rem)}.p-2{padding:calc(var(--tw-x-rem-multiplier) * .5rem)}.px-5{padding-left:calc(var(--tw-x-rem-multiplier) * 1.25rem);padding-right:calc(var(--tw-x-rem-multiplier) * 1.25rem)}.py-2{padding-top:calc(var(--tw-x-rem-multiplier) * .5rem);padding-bottom:calc(var(--tw-x-rem-multiplier) * .5rem)}.px-4{padding-left:calc(var(--tw-x-rem-multiplier) * 1rem);padding-right:calc(var(--tw-x-rem-multiplier) * 1rem)}.py-3{padding-top:calc(var(--tw-x-rem-multiplier) * .75rem);padding-bottom:calc(var(--tw-x-rem-multiplier) * .75rem)}.py-8{padding-top:calc(var(--tw-x-rem-multiplier) * 2rem);padding-bottom:calc(var(--tw-x-rem-multiplier) * 2rem)}.px-16{padding-left:calc(var(--tw-x-rem-multiplier) * 4rem);padding-right:calc(var(--tw-x-rem-multiplier) * 4rem)}.py-4{padding-top:calc(var(--tw-x-rem-multiplier) * 1rem);padding-bottom:calc(var(--tw-x-rem-multiplier) * 1rem)}.px-1{padding-left:calc(var(--tw-x-rem-multiplier) * .25rem);padding-right:calc(var(--tw-x-rem-multiplier) * .25rem)}.pt-4{padding-top:calc(var(--tw-x-rem-multiplier) * 1rem)}.pb-6{padding-bottom:calc(var(--tw-x-rem-multiplier) * 1.5rem)}.pb-4{padding-bottom:calc(var(--tw-x-rem-multiplier) * 1rem)}.text-center{text-align:center}.text-right{text-align:right}.font-sans{font-family:Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}.text-xs{font-size:calc(var(--tw-x-rem-multiplier) * .75rem);line-height:calc(var(--tw-x-rem-multiplier) * 1rem)}.text-sm{font-size:calc(var(--tw-x-rem-multiplier) * .875rem);line-height:calc(var(--tw-x-rem-multiplier) * 1.25rem)}.text-3xl{font-size:calc(var(--tw-x-rem-multiplier) * 1.875rem);line-height:calc(var(--tw-x-rem-multiplier) * 2.25rem)}.text-4xl{font-size:calc(var(--tw-x-rem-multiplier) * 2.25rem);line-height:calc(var(--tw-x-rem-multiplier) * 2.5rem)}.text-base{font-size:calc(var(--tw-x-rem-multiplier) * 1rem);line-height:calc(var(--tw-x-rem-multiplier) * 1.5rem)}.text-2xs{font-size:calc(var(--tw-x-rem-multiplier) * .625rem);line-height:calc(var(--tw-x-rem-multiplier) * 1rem)}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-normal{font-weight:400}.leading-8{line-height:calc(var(--tw-x-rem-multiplier) * 2rem)}.text-brand-button-text{color:var(--color-button-text)}.text-red-700{--tw-text-opacity: 1;color:rgb(185 28 28 / var(--tw-text-opacity))}.text-neutral-500{--tw-text-opacity: 1;color:rgb(115 115 115 / var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-neutral-400{--tw-text-opacity: 1;color:rgb(163 163 163 / var(--tw-text-opacity))}.text-red-800{--tw-text-opacity: 1;color:rgb(153 27 27 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-white\\/80{color:#fffc}.text-brand-accent{color:var(--color-accent)}.text-neutral-700{--tw-text-opacity: 1;color:rgb(64 64 64 / var(--tw-text-opacity))}.underline{text-decoration-line:underline}.line-through{text-decoration-line:line-through}.shadow-\\[0_-2px_10px_rgba\\(0\\,0\\,0\\,0\\.2\\)\\]{--tw-shadow: 0 -2px 10px rgba(0,0,0,.2);--tw-shadow-colored: 0 -2px 10px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-md{--tw-backdrop-blur: blur(12px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}input[type=number].appearance-none::-webkit-inner-spin-button,input[type=number].appearance-none::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number].appearance-none{-moz-appearance:textfield}.first\\:pt-0:first-child{padding-top:0}.last\\:pb-0:last-child{padding-bottom:0}.hover\\:scale-125:hover{--tw-scale-x: 1.25;--tw-scale-y: 1.25;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:scale-110:hover{--tw-scale-x: 1.1;--tw-scale-y: 1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:text-red-800:hover{--tw-text-opacity: 1;color:rgb(153 27 27 / var(--tw-text-opacity))}.hover\\:text-neutral-500:hover{--tw-text-opacity: 1;color:rgb(115 115 115 / var(--tw-text-opacity))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:no-underline:hover{text-decoration-line:none}.hover\\:opacity-90:hover{opacity:.9}.focus\\:border-neutral-500:focus{--tw-border-opacity: 1;border-color:rgb(115 115 115 / var(--tw-border-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-1:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-brand-button:focus{--tw-ring-color: var(--color-button)}.focus\\:ring-neutral-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(115 115 115 / var(--tw-ring-opacity))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width: 2px}.focus\\:ring-offset-white:focus{--tw-ring-offset-color: #fff}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:bg-transparent:disabled{background-color:transparent}.disabled\\:opacity-75:disabled{opacity:.75}.dark .dark\\:divide-white\\/10>:not([hidden])~:not([hidden]){border-color:#ffffff1a}.dark .dark\\:border-white\\/10{border-color:#ffffff1a}.dark .dark\\:border-red-400{--tw-border-opacity: 1;border-color:rgb(248 113 113 / var(--tw-border-opacity))}.dark .dark\\:border-black\\/40{border-color:#0006}.dark .dark\\:bg-red-300{--tw-bg-opacity: 1;background-color:rgb(252 165 165 / var(--tw-bg-opacity))}.dark .dark\\:bg-neutral-800{--tw-bg-opacity: 1;background-color:rgb(38 38 38 / var(--tw-bg-opacity))}.dark .dark\\:bg-neutral-900{--tw-bg-opacity: 1;background-color:rgb(23 23 23 / var(--tw-bg-opacity))}.dark .dark\\:bg-white\\/10{background-color:#ffffff1a}.dark .dark\\:bg-white\\/5{background-color:#ffffff0d}.dark .dark\\:text-neutral-400{--tw-text-opacity: 1;color:rgb(163 163 163 / var(--tw-text-opacity))}.dark .dark\\:text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.dark .dark\\:text-neutral-300{--tw-text-opacity: 1;color:rgb(212 212 212 / var(--tw-text-opacity))}.dark .dark\\:focus\\:border-black\\/50:focus{border-color:#00000080}.dark .dark\\:focus\\:ring-black\\/30:focus{--tw-ring-color: rgb(0 0 0 / .3)}.dark .dark\\:focus\\:ring-offset-neutral-800:focus{--tw-ring-offset-color: #262626}@media (min-width: 768px){.md\\:static{position:static}.md\\:col-span-1{grid-column:span 1 / span 1}.md\\:col-span-2{grid-column:span 2 / span 2}.md\\:col-start-2{grid-column-start:2}.md\\:row-start-1{grid-row-start:1}.md\\:row-start-2{grid-row-start:2}.md\\:row-end-6{grid-row-end:6}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:h-6{height:calc(var(--tw-x-rem-multiplier) * 1.5rem)}.md\\:w-6{width:calc(var(--tw-x-rem-multiplier) * 1.5rem)}.md\\:w-auto{width:auto}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:items-start{align-items:flex-start}.md\\:justify-end{justify-content:flex-end}.md\\:rounded-md{border-radius:calc(var(--tw-x-rem-multiplier) * .375rem)}.md\\:border-0{border-width:0px}.md\\:bg-black\\/60{background-color:#0009}.md\\:p-8{padding:calc(var(--tw-x-rem-multiplier) * 2rem)}.md\\:p-0{padding:0}.md\\:px-8{padding-left:calc(var(--tw-x-rem-multiplier) * 2rem);padding-right:calc(var(--tw-x-rem-multiplier) * 2rem)}.md\\:px-0{padding-left:0;padding-right:0}.md\\:py-16{padding-top:calc(var(--tw-x-rem-multiplier) * 4rem);padding-bottom:calc(var(--tw-x-rem-multiplier) * 4rem)}.md\\:pt-0{padding-top:0}.md\\:pt-1{padding-top:calc(var(--tw-x-rem-multiplier) * .25rem)}.md\\:pr-1{padding-right:calc(var(--tw-x-rem-multiplier) * .25rem)}.md\\:pr-8{padding-right:calc(var(--tw-x-rem-multiplier) * 2rem)}.md\\:pb-8{padding-bottom:calc(var(--tw-x-rem-multiplier) * 2rem)}.md\\:pb-16{padding-bottom:calc(var(--tw-x-rem-multiplier) * 4rem)}.md\\:shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.md\\:backdrop-blur-md{--tw-backdrop-blur: blur(12px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}}@media (min-width: 1024px){.lg\\:col-span-3{grid-column:span 3 / span 3}.lg\\:col-span-5{grid-column:span 5 / span 5}.lg\\:col-span-2{grid-column:span 2 / span 2}.lg\\:col-start-4{grid-column-start:4}.lg\\:flex{display:flex}.lg\\:hidden{display:none}.lg\\:w-60{width:calc(var(--tw-x-rem-multiplier) * 15rem)}.lg\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.lg\\:flex-col{flex-direction:column}.lg\\:justify-end{justify-content:flex-end}.lg\\:justify-center{justify-content:center}.lg\\:justify-between{justify-content:space-between}.lg\\:space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * var(--tw-space-x-reverse));margin-left:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * calc(1 - var(--tw-space-x-reverse)))}.lg\\:space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(calc(var(--tw-x-rem-multiplier) * .5rem) * var(--tw-space-y-reverse))}.lg\\:text-sm{font-size:calc(var(--tw-x-rem-multiplier) * .875rem);line-height:calc(var(--tw-x-rem-multiplier) * 1.25rem)}}
`;
    var at, x, er, Gn, $t = 0, $n = [], de = [], Yn = _.__b, zn = _.__r, qn = _.diffed, Vn = _.__c, Wn = _.unmount;
    function St(e, t) {
        _.__h && _.__h(x, e, $t || t),
        $t = 0;
        var r = x.__H || (x.__H = {
            __: [],
            __h: []
        });
        return e >= r.__.length && r.__.push({
            __V: de
        }),
        r.__[e]
    }
    function I(e) {
        return $t = 1,
        Bs(Zn, e)
    }
    function Bs(e, t, r) {
        var n = St(at++, 2);
        if (n.t = e,
        !n.__c && (n.__ = [r ? r(t) : Zn(void 0, t), function(o) {
            var a = n.__N ? n.__N[0] : n.__[0]
              , s = n.t(a, o);
            a !== s && (n.__N = [s, n.__[1]],
            n.__c.setState({}))
        }
        ],
        n.__c = x,
        !x.u)) {
            x.u = !0;
            var i = x.shouldComponentUpdate;
            x.shouldComponentUpdate = function(o, a, s) {
                if (!n.__c.__H)
                    return !0;
                var l = n.__c.__H.__.filter(function(u) {
                    return u.__c
                });
                if (l.every(function(u) {
                    return !u.__N
                }))
                    return !i || i.call(this, o, a, s);
                var d = !1;
                return l.forEach(function(u) {
                    if (u.__N) {
                        var f = u.__[0];
                        u.__ = u.__N,
                        u.__N = void 0,
                        f !== u.__[0] && (d = !0)
                    }
                }),
                !(!d && n.__c.props === o) && (!i || i.call(this, o, a, s))
            }
        }
        return n.__N || n.__
    }
    function st(e, t) {
        var r = St(at++, 3);
        !_.__s && nr(r.__H, t) && (r.__ = e,
        r.i = t,
        x.__H.__h.push(r))
    }
    function Fs(e, t) {
        var r = St(at++, 4);
        !_.__s && nr(r.__H, t) && (r.__ = e,
        r.i = t,
        x.__h.push(r))
    }
    function et(e) {
        return $t = 5,
        Ct(function() {
            return {
                current: e
            }
        }, [])
    }
    function Ct(e, t) {
        var r = St(at++, 7);
        return nr(r.__H, t) ? (r.__V = e(),
        r.i = t,
        r.__h = e,
        r.__V) : r.__
    }
    function H(e, t) {
        return $t = 8,
        Ct(function() {
            return e
        }, t)
    }
    function Yt(e) {
        var t = x.context[e.__c]
          , r = St(at++, 9);
        return r.c = e,
        t ? (r.__ == null && (r.__ = !0,
        t.sub(x)),
        t.props.value) : e.__
    }
    function Ms(e) {
        var t = St(at++, 10)
          , r = I();
        return t.__ = e,
        x.componentDidCatch || (x.componentDidCatch = function(n, i) {
            t.__ && t.__(n, i),
            r[1](n)
        }
        ),
        [r[0], function() {
            r[1](void 0)
        }
        ]
    }
    function Hs() {
        for (var e; e = $n.shift(); )
            if (e.__P && e.__H)
                try {
                    e.__H.__h.forEach(fe),
                    e.__H.__h.forEach(rr),
                    e.__H.__h = []
                } catch (t) {
                    e.__H.__h = [],
                    _.__e(t, e.__v)
                }
    }
    _.__b = function(e) {
        typeof e.type != "function" || e.__m || e.type === M ? e.__m || (e.__m = e.__ && e.__.__m ? e.__.__m : "") : e.__m = (e.__ && e.__.__m ? e.__.__m : "") + (e.__ && e.__.__k ? e.__.__k.indexOf(e) : 0),
        x = null,
        Yn && Yn(e)
    }
    ,
    _.__r = function(e) {
        zn && zn(e),
        at = 0;
        var t = (x = e.__c).__H;
        t && (er === x ? (t.__h = [],
        x.__h = [],
        t.__.forEach(function(r) {
            r.__N && (r.__ = r.__N),
            r.__V = de,
            r.__N = r.i = void 0
        })) : (t.__h.forEach(fe),
        t.__h.forEach(rr),
        t.__h = [])),
        er = x
    }
    ,
    _.diffed = function(e) {
        qn && qn(e);
        var t = e.__c;
        t && t.__H && (t.__H.__h.length && ($n.push(t) !== 1 && Gn === _.requestAnimationFrame || ((Gn = _.requestAnimationFrame) || Gs)(Hs)),
        t.__H.__.forEach(function(r) {
            r.i && (r.__H = r.i),
            r.__V !== de && (r.__ = r.__V),
            r.i = void 0,
            r.__V = de
        })),
        er = x = null
    }
    ,
    _.__c = function(e, t) {
        t.some(function(r) {
            try {
                r.__h.forEach(fe),
                r.__h = r.__h.filter(function(n) {
                    return !n.__ || rr(n)
                })
            } catch (n) {
                t.some(function(i) {
                    i.__h && (i.__h = [])
                }),
                t = [],
                _.__e(n, r.__v)
            }
        }),
        Vn && Vn(e, t)
    }
    ,
    _.unmount = function(e) {
        Wn && Wn(e);
        var t, r = e.__c;
        r && r.__H && (r.__H.__.forEach(function(n) {
            try {
                fe(n)
            } catch (i) {
                t = i
            }
        }),
        r.__H = void 0,
        t && _.__e(t, r.__v))
    }
    ;
    var Jn = typeof requestAnimationFrame == "function";
    function Gs(e) {
        var t, r = function() {
            clearTimeout(n),
            Jn && cancelAnimationFrame(t),
            setTimeout(e)
        }, n = setTimeout(r, 100);
        Jn && (t = requestAnimationFrame(r))
    }
    function fe(e) {
        var t = x
          , r = e.__c;
        typeof r == "function" && (e.__c = void 0,
        r()),
        x = t
    }
    function rr(e) {
        var t = x;
        e.__c = e.__(),
        x = t
    }
    function nr(e, t) {
        return !e || e.length !== t.length || t.some(function(r, n) {
            return r !== e[n]
        })
    }
    function Zn(e, t) {
        return typeof t == "function" ? t(e) : t
    }
    var $s = 0;
    function c(e, t, r, n, i) {
        var o, a, s = {};
        for (a in t)
            a == "ref" ? o = t[a] : s[a] = t[a];
        var l = {
            type: e,
            props: s,
            key: r,
            ref: o,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: --$s,
            __source: i,
            __self: n
        };
        if (typeof e == "function" && (o = e.defaultProps))
            for (a in o)
                s[a] === void 0 && (s[a] = o[a]);
        return _.vnode && _.vnode(l),
        l
    }
    function Ys({lightColors: e=!1}) {
        return c("div", {
            className: "flex items-center justify-center",
            children: [c(zs, {
                className: "w-6 h-6"
            }), c(qs, {
                className: `mt-0.5 w-12 h-6 ${e ? "text-white" : "text-black"}`
            })]
        })
    }
    function zs({className: e}) {
        return c("img", {
            className: e,
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABZgSURBVHgB7Z0JfBTl3cd/M3sl2VzkvhMgyo0QwiWHCSBeYFGsiFRbaxURqb60lkskAkWgnu/rBSq2tVWr1KNIRbmCnAlJuBNCJCQh90Xu7G52Z97/82w2JBBIApklHz/z/XwmszuZmc3Of/7P/3wmgIqKioqKioqKioqKioqKioqKioqKioqKioqKExHwMyZw6F8CXERztFWrjRYh+0KWjbIAiyBLNYIgnIXgejbv8MJs9CB+VgIJHpEQoRUMMyUB8YIs30Zfz7OjY2SghFbfy4JtQ+HhFw7gBuN0gcTFJWhzcqBFN9EQogk1mLUPy5AfgSDc1Pp33p4u8Pd1R0igB3x6uUGrEfn2mnozCotrkJN3AbX0uhWZAoRF51MWf4MbhFME4h+X4G6od5lB9+Ms+sDBdFu6oJsgQbjT13Bnr41GPWKHhCJ+XF+MGhaGqPBe8DAarnhsg6kJJ9KLsXVXJjZvPYHaOiYcWRZk8cXzqYtX4waguEDCY9ZMkDX4EHLbu7c7iQj1xqzpQ/GLOwYgMqwXroW8giq8smEvvvruFH9Pgl5WkLJ0DZyMogIJHbH6KUEQ36GPEQKlRjxkzsaEphL4SWaIbPTuIhY66gVjDA7pAuznD/LEqudvx+0Tu0/Wn35zDMvXb4fZYoUoCbPy0hZ/DieimEDCYl+Oo0u+gz5AM8OSi+X1x65JCA7Oa4x41jgG5zTuEEUBj82KxaL5t8HV0G3mqIUFy7fg622nmJoURHuYoxITE6xwEiKUQpY3MmGMbSrFivqj1yWMQtENz7iP5cLQ6US8tfpeJCycrIgwGMufnQS9XsNu19DMWrehcCKKCCR4+NqJzOPxlU1Y2XAE10OGxgu/9piIPNHIjfSezXMx/fYBUJIAPyOmTe7PX4uiLR5ORJFbTKu13SnLIsZZSslemHCtMM1Y6D4a5aKBC+Ozd2Zzu+EM+kb58jUFkTfDiSiiISSMgWw9xlqGa0Wi8WK92xAUi64IDvDA39980GnCYIhCs3kVROWG9XZQZhAGvNgPF9mGa2UdCWOPLgheFNz9693Z6B1+uTsryzKKS+v4a3b9gkhw3UXqiYLmz0A6nIhSArku9ukC8bmhN11kAW+smIbeET58OxMAixMOpp3Hj4fOoai0lm9zwLyvQH933BTlh+GDgyk4DEe/vv58W1c4l1uJxIP2FJcI7XY4kR4nkErBgNVut/DXM+8ZjCkTo1FTa8a2xEysfGMXqmsu2iStVoC7qx56rYhGiw2NJiuKSmr58mPSOb4PE9LQ/kEYGxuJsTHhiAz3IW3z5sJujyo6/1NLv4bVKrG3jfUaQx6cSI8TyJcuUSghuxEW7IUlz8ThVGYJ/rDqv3zNCA0wYvr4SEweGYqIIHe4u+lg0GnQaLbyJa+4Dlnnq3E4vQxHz1TQ+1ocTS/iy7t/P8QFFBHijaEDAjF0YDDlubzg5qojYTYh5Vg+tuw4jdLyOsef42q0NayoBP4AJ6FIYEhB4W5axb1Wl4z4pqJOH8e04wHPeFwgr+r1FXdjyIBgPPT0ZyivrIe/twuevG8g5twZzYXQGWRJRm5JHZJOluLHI0V8XVrViI5CojASuiflxdLPXeDvKeH4DCUc34YT6FEa8jlpBxNG/yhvTBvmhc+2n+LCYFrxwdKJGNTXp0vnE0gbooI9+DLr9r6wShKycu3acySrAqfPVaG63oK6BguMLjoE+rjh9jGhuD+uN9IyyzFv7d7mM8nLI0et+m9u8vJzUJgeI5BqQY+PDdH89conY2Egu/BAfCQCvPQYPywIHp3UiquhJQ92QO9efHm0g33v8g0nAbmipLKRKVSgTdJ9SJsnQWGc6mNfjc2GKDQIWtKCXhgzJJBvM7pocdet4d0ijK7C4pBJZKcuIsUFj1g7HgrTYwTybxII44H43ugpTI4NafWO8taC/DIUpkcI5KS2F4rIs/LxNGDmpD7oKYwfFszXWsobuEtNzAMaHzJy7XQoSI8QyHf6ML6+LSYY3h4G9BTcaMhkfw9VRjDCVsG3aSDNh4LccKPOvmwipUgYD9955ULT2fwafH/oPPYeLUZ+aT0kcmnDA90xdXQo4kaEoE9o5/NcdQ1WbN6VjV0pBThXWAsbeV8B5GGNHuiPO8aEY3g/PzjixhA/N1RRYDrYeoGncqjAe0fo6ISwgqSEfCjADRdIhtaLZ3X9e7lg1AD/dvd578sMvPKPo7A0SW22n6cY48DxYrj/8zjmzxyIubQ4GhmuxNZ9eVj4xkEeRLYmv6QeaRll9FnpeGxaPyx7LIbXXqJCPHg8wpKdQ0goJ2h4hdXwJB3yIhTghgvkgNbuUcXHhvK44VI2fpWBNR+l8dejBwfigUm9MXpQAN3VMo7/VIlPv8/CIQr41n18jN/lv5xyZRt0KvsCfv/qfjRRWiTU34jfzxqCmP5+VOjS4CfSwE9/yMLO5AJs2pIJC+2z5ulRdKO48mPLRRdMsRRygZAHdg9+rgJJ1vnx9aQRIe3+3suoQ7CvG564fwB+d2//Nr/rG+aJu8kt3vj1afxz2xkSKK6KK1UBg3xdMXF4CFY/FQtNK21iaZhJ5FUlphZi5Yep8HTT8+0+HvZ1raDDZMo6vI5BrAFimN+4dR7l+xfVopu5IQJJ0/pimz4UZeRZsYogY8QVhqtZU6NxP3leOm37V9tAF3nBg4Mw974B0OuuLpE+JMA9G+696rDG7BELRB37sBQKwyxoECrVw1uyoErUi7pGXrhKRTfjdIFsdOmHTS430xe8eFHYxfZuvhPb40rCaE1HwnDQkY3paJ9hNkrNi0xgMqu1d7tAnOr2Ms3Y4NqPC+PeCZGYe/9A7imxMX3JW0mdPk9tQxOq6iyd2re8yoSdhwu4V9YezOMqvWCC3MkejD62Gr6mxGU/KIBTNWSd21DurTxF9mApeTGMmRSZP7D4B3yZmIOX54/mQ9CVYB7S+o+PcleV0Zdc3YVzhmI6CfdKrPwgFV/vycHGJRNw560RLdtPnr2AhPdTeKKRFblYAnLOXTdxD6u1ttXU2wWva65+BkuN9l8IYigUwGkCOavxwBmNJ89PPTf7YmcNy+y+u3gCGqi4dDVhbPpPJr+Abc5ZUIPnXjuAusYmzJ4a3e5xzJtiHCRPzCGQ1NNleHDJDq6ZDnKKavHnTWnkbVXj5XmjqPhlFwrTRoaHbF97yS2a2X314lY4bcg6rrWnzsfeEsQj4NZMoBQFC8iuRGllA9cMxsN04ZM+ug8HPpyBJ2cM4Bd1zUdHUFje0O6xtw61u9X7KKBksPjjuVcP8uOYZu14ZzrSPp6Jxb8eBhe6IT7ffpa70w6KK+0a4dMsCO3Fsc0LCqCMhsioY4kfa6syaalg76+OCupafZvh5W5AGNka5hovfWx4y/YXHo+BmS7soRPF3KVtj8HRPrygxaqINXS3u9BwFOLvBg9yp1fPG4lezamapx8YREKSsXnnWTLYF/9us8U+VNkureUJ19HBcRWUEYiAKrZiNQ4H+uY7yyZ1vYORDWXb3ryrXe9n5RMjYKNzX8kzYhe8X6QXUjPKsZeqhveMi8CnqydDaueYZx8ajPm/bBvtTyCN3p6UjyStHxbA3l/c/CVroAAKDVlyIfvJauMOoiS7IWbR8rVwpQvOovuOXNn+kfYWomSyIwzxKsdcun0MDXlMY7I19lxZhWjXKEGWK6EAighEhMh7aFj7p4OBtgvcMB5OL0X6NQrlWhnc1y6QgydL0FWYW+7r5YJGCgzZDVakcePbScEU6UZRRCBNMvgkiyztRbsXKJl4wwMbuRa8sh/ZlDti5dHfrkrE7/68B0rCcl+MM1RPr67vXPziwNicgmeUUj4rW2x2rkSchQIoYkNEjZQBSUCO6I5qUQ8vyX4RFjRm4JDWnwwspSjmbWnZPyKw64beAfOWDp0qxQ4a5ytrzBhPYz5raGhN3zAv+NBdXlltwhOr95DG+CJ+ZDDZh+BOfYbD8DdSiTmzOdVDZYOjUABFNKQgeWkFFRRKmfnerQ1q2c4arz+u/ZGypgVwb/brWa7oH6uurXfg2JkKPLh0B+a8sBMfUYb2GwoAP/jm9GX7MWdv7BC7lrDM8AffZNAxu/DQsp08/ugsWaIntyH0vawuZSZFNETB+SH4gq2SdW2ThgEklL/Up+DduoP8PfP9Q/yM6Crf7svFIwm7yXsq400QzHtiscRffj/msn1NFHvkFtmb3+6Li6KiVhgfilgt5a5nv0PSqdKrfpYjWj/aHEsJENJychKuva3/KigXqQvytySU+dv1IVjWcAxGuW1ByEcys3Io6inKZl/Yz7vz80B3U4r8T/93iOehpk+MxKJHhvH0uYMUisT3ptkDQebeHj1TTqmSShhdtfjjr4aRoTZS+qUGS94+zIXyMGnYf169E4P6XN7QbbPJPB/GSNPZpyhQ+l2xfl/FBJJ/2PxD+EhDjlUWow5qAzClqbDN75nH5Sk14YJJpJJsXacFUlPfhEXNwphxWxTeWHgrd2Nb89LGFBzLauuVsuzAW38cx4XB6B3iiX+8FI+n1u7FD2R/nnttPzavnUpBaNuscznZncrmfmLWWckQJPwVCqGBYiTK3qFT3Gi8nVxJ3sk9lvNtxkcDaQfTHlYTYUb2lpt8O3VWVhlkbaEDe/fCRy/Gt+ScWuPn7cr7fdkdzxY2nK1dMOayz2CCnDIqFFsoaclq9q4ktDGDA9vsk3SyDF8lXmxYFCDty09d+ioUQtHkol40v22SDEto7PX4URd0WZ/vCKotnKKS6A4qmz5yd8czaUsqGvHJtiweqK2ZP+qKNRBmI9jSGdxcdHjtf8Zi5p9+wN++zcSv7roZfl4XO192pxZccoT8ChRE0eTiT0kJNYIkr2d5oLdd+8MktFXIiRb7OJ+cXtqp87GhhWWFY/r50+KH7mIkVSvZUFZRbcaPaW2H1sSU1u/llL7u1q1QEMWzvR6NlvWk6JVnKfXwL0PbBoTBpCFhUgM37LtSCjs8154j9n2G928rDJanmrpgKz7+Luuqx7O6x5ufncQdtG9GTttswfjmmOTAieKWbSyjkFfSMjWBbitxtdJTpBUXSHp6gkWEtIq9/pshuk1+yyBLuNdsz0C8s/lkh+c6V2CPGWIvEUhOcS0yc6uw7J1kPL1uL05mX55mSs0sxyMrdpNAjpMwqlBY1jZdHzvQfs6s8xdzhu9TvHIROfn8NNMWKIxTClSSzmUDrKZpF0T95GXGGGysPdAyb/0X5lx8YuiN5FNl2EWl1rYNzpecpzljHODj2mY7iy0qyDV9/dPjFJ/k8SU63JPnoTRkuJnLW1xhr2toyP689txYPuGnNQHN7T6OuSOnc6rJmOc4fm2DRn4CCQkSFEZBL+siNfnfW91D4pIEQfNgkehmtJAtcczQNVISokHU8Xr7CSqrPnxHNL9o7cF6qG69JRBxMW1bhtj0NNa1wjwkduezBrpKsgc5VOrNJq2qa7Ryj2pSbCh5ZnFUtAq67Nxs6kG/CG9yLm6mVIme8m37+GwshiwLKwoOL/0CTsCpj2eKGLF2vCTIfBbMXFMmnmq0pzlYjuhOz6moIcE8OKUPXnl2LK4Hk9lGaf5KHkOwtEmgrxuPOzw7Oa3hjc9O4LV/HuevKSrfcD5l0TwW6cIJOEVDHFQX7cjzDJlEl0iIO0Ia4UnB4RBKy+soJgmX6yguCcWZvGrE0t0eEXTtCUcWm4RQLT2akoossRjk48bjks7AGiiWvZ2MBtZqKstZ0Jtn1+THN8JJOFUgjJrCXYkeIZPJpRFiWZ7LlYZnZtxZr1Yh1RpsNErvP1aC2ymOcHYnPMsYzKY0isPekHpU0L1yuKZwdw6cxA17xF/oiJdX0nCyXCAryhoHmgSRP2gglNxg1qHCJl6ufWY0Jg7vXIr8esmkWsmjK3ahqKIBEVI9KqFHHQ2h9OdJNO59bxXwfPHhxaegME7XEAc0dDFrPIcVYSWSzKOmn/BK/WHcZ8nFQdKc7EYNb3AbEu2DyCBFOm5aYF7YzEU/8HoKy0Zvqt2Hx81ZcKUbJF3jLdDNcpMoY7ZXyOTMmqKdp6EgN0QgpB3swWafkHrqIulufLMuCTMseXBhwxfdkHFNxTit9Ua21cBrHGz27KiBAZclEa8XFij+besZzF+/H43kCPS21eHDun1gD1tjdi3GWoEJ1hJkaLxRqnF1pfFklmfIFKGmcAeVOF+CEjh9yAqNXfseDVNz2VD1uCkLT5C3pZcvd+9ZuuV9137Y4GLv2GQxxfLHY3gysDP9uVeDCWL/8RK89H4qDyjZ3zLHlI15ptNwky8PxGXa40OycSz9Y0fYmZ+yeAoUwKkCCRqWEKXV6rM15Ng/Y87Abxp/6vAYNrvqz2638PkZDDaE/fbe/vxpDp1tsHbA8mCJaUX465bTVJSyt5D2orrMfHK/Z1pyOjz+W30EXjQO57GjTZInFqUt3YtuxqkCCR21ZpogCVtGN5XhvbrOPyK3juKUd1wH4Ct9ZEuCkgVv8bFhmDAsCLfc7MMn/btT+rz1pB8mgLKqRpz4qZKn7A+QVjiCPR1pJSsJsHgoSOq8V/siZRq26MOZmj1Lafj/RTfj1GZrjVUokkTWVtoLLA4Zbq3o1HHuNIz8qeEEDW9nsF0Xwue0Z9V64svd2XxpjafRHvyx6Ly9jnfWLD3TnMMfyGmUu5YnzCbvb7/WXpuXRFGRpzo414bEJWjDa12SZEGOYRXDl+qPdOlZKK2Z4TUFuaKx5QmnpWL7FUdmE9zIW2JPpWOvE6v/S9rR9aA7nZyMue63krYygQt5+b1T++CLL7q9ndT5Rn3UGl/yc7+hSzJOT57Mr8nd/Q0Zd7cu3q3vkoFlk38G2aqwoXY/mOtcTiVWS7PjyDw21uXCtGC++1gc0AVgGg1Rq+rT0FX+RclP9nQ7iZt/ZNi0uLv40JIcKIDT3d7agp2NNYU7NzH30SbjtjSdn8DmqbNgjLnAHcEuyk4q/f7dJZrP+ysjzdivo4QjFbvYOfxkM1+8ZT71DC+5DccevT2ZSIlNPp0gWqqlLy53+DmpWj88TcLcagjnnhb9eNNcJz5cemxx5ypq18ANfRh/yMj1swTZuo4SeHzGzSBrFeaYz2KstZTP5WsNG5KSKGD8tz4Kx7QtTwXKFdiUDcCbCWCqpRCx5DCwhOIJTS9sI0HzoUzABUFCtSwgih10k60GvyQ7wobLSx/SWU9CTiZBfEF2KoXWTfapd8UQpTX5yUvfUjrJeMP/O4L/yPVBBsn6B1kQnhOanQwj2RdWSQwgA8wuRykVtfLo7q4XHNlauYru2I+aTNI6jV7roxGlL2lj//bOT65tLgWh87Tupt22Wt3zsig+T3c6D/2ZpxUp1ZGhb2j+HBcUkF2qafkckLSkT3Q2eeW5Iy/kwgn0mH9X0WfEWi+LBo9SFeohejsalw6n/OGKAjkE0ueCrvy9/IOvt/JVE8TwGP04WRTYc0iG0EKZDjmdXOzv89OWbLv0c6waaYZkE9gTmsbRFbgsg0kX5STpwScmrbSpNGlZ1zu0r4Me+f9DmNZoJSlaC4nXVamWXU7F2xMXUhdXoxvpN26dR73JNpAuAs9gkpZWocFwPD99oSJTDVRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUehz/Dzj/WbMWny8CAAAAAElFTkSuQmCC"
        })
    }
    function qs({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 47 11",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                d: "M7.21 0.98L4.72 8H2.58L0.09 0.98H1.91L3.65 6.28L5.4 0.98H7.21ZM7.58469 5.2C7.58469 4.62667 7.69135 4.12333 7.90469 3.69C8.12469 3.25667 8.42135 2.92333 8.79469 2.69C9.16802 2.45667 9.58469 2.34 10.0447 2.34C10.438 2.34 10.7814 2.42 11.0747 2.58C11.3747 2.74 11.6047 2.95 11.7647 3.21V2.42H13.4747V8H11.7647V7.21C11.598 7.47 11.3647 7.68 11.0647 7.84C10.7714 8 10.428 8.08 10.0347 8.08C9.58135 8.08 9.16802 7.96333 8.79469 7.73C8.42135 7.49 8.12469 7.15333 7.90469 6.72C7.69135 6.28 7.58469 5.77333 7.58469 5.2ZM11.7647 5.21C11.7647 4.78333 11.6447 4.44667 11.4047 4.2C11.1714 3.95333 10.8847 3.83 10.5447 3.83C10.2047 3.83 9.91469 3.95333 9.67469 4.2C9.44135 4.44 9.32469 4.77333 9.32469 5.2C9.32469 5.62667 9.44135 5.96667 9.67469 6.22C9.91469 6.46667 10.2047 6.59 10.5447 6.59C10.8847 6.59 11.1714 6.46667 11.4047 6.22C11.6447 5.97333 11.7647 5.63667 11.7647 5.21ZM18.1118 2.36C18.7651 2.36 19.2851 2.57333 19.6718 3C20.0651 3.42 20.2618 4 20.2618 4.74V8H18.5618V4.97C18.5618 4.59667 18.4651 4.30667 18.2718 4.1C18.0785 3.89333 17.8185 3.79 17.4918 3.79C17.1651 3.79 16.9051 3.89333 16.7118 4.1C16.5185 4.30667 16.4218 4.59667 16.4218 4.97V8H14.7118V2.42H16.4218V3.16C16.5951 2.91333 16.8285 2.72 17.1218 2.58C17.4151 2.43333 17.7451 2.36 18.1118 2.36ZM23.5701 2.34C23.9634 2.34 24.3067 2.42 24.6001 2.58C24.9001 2.74 25.1301 2.95 25.2901 3.21V2.42H27.0001V7.99C27.0001 8.50333 26.8967 8.96667 26.6901 9.38C26.4901 9.8 26.1801 10.1333 25.7601 10.38C25.3467 10.6267 24.8301 10.75 24.2101 10.75C23.3834 10.75 22.7134 10.5533 22.2001 10.16C21.6867 9.77333 21.3934 9.24667 21.3201 8.58H23.0101C23.0634 8.79333 23.1901 8.96 23.3901 9.08C23.5901 9.20667 23.8367 9.27 24.1301 9.27C24.4834 9.27 24.7634 9.16667 24.9701 8.96C25.1834 8.76 25.2901 8.43667 25.2901 7.99V7.2C25.1234 7.46 24.8934 7.67333 24.6001 7.84C24.3067 8 23.9634 8.08 23.5701 8.08C23.1101 8.08 22.6934 7.96333 22.3201 7.73C21.9467 7.49 21.6501 7.15333 21.4301 6.72C21.2167 6.28 21.1101 5.77333 21.1101 5.2C21.1101 4.62667 21.2167 4.12333 21.4301 3.69C21.6501 3.25667 21.9467 2.92333 22.3201 2.69C22.6934 2.45667 23.1101 2.34 23.5701 2.34ZM25.2901 5.21C25.2901 4.78333 25.1701 4.44667 24.9301 4.2C24.6967 3.95333 24.4101 3.83 24.0701 3.83C23.7301 3.83 23.4401 3.95333 23.2001 4.2C22.9667 4.44 22.8501 4.77333 22.8501 5.2C22.8501 5.62667 22.9667 5.96667 23.2001 6.22C23.4401 6.46667 23.7301 6.59 24.0701 6.59C24.4101 6.59 24.6967 6.46667 24.9301 6.22C25.1701 5.97333 25.2901 5.63667 25.2901 5.21ZM27.8972 5.2C27.8972 4.62667 28.0039 4.12333 28.2172 3.69C28.4372 3.25667 28.7339 2.92333 29.1072 2.69C29.4805 2.45667 29.8972 2.34 30.3572 2.34C30.7505 2.34 31.0939 2.42 31.3872 2.58C31.6872 2.74 31.9172 2.95 32.0772 3.21V2.42H33.7872V8H32.0772V7.21C31.9105 7.47 31.6772 7.68 31.3772 7.84C31.0839 8 30.7405 8.08 30.3472 8.08C29.8939 8.08 29.4805 7.96333 29.1072 7.73C28.7339 7.49 28.4372 7.15333 28.2172 6.72C28.0039 6.28 27.8972 5.77333 27.8972 5.2ZM32.0772 5.21C32.0772 4.78333 31.9572 4.44667 31.7172 4.2C31.4839 3.95333 31.1972 3.83 30.8572 3.83C30.5172 3.83 30.2272 3.95333 29.9872 4.2C29.7539 4.44 29.6372 4.77333 29.6372 5.2C29.6372 5.62667 29.7539 5.96667 29.9872 6.22C30.2272 6.46667 30.5172 6.59 30.8572 6.59C31.1972 6.59 31.4839 6.46667 31.7172 6.22C31.9572 5.97333 32.0772 5.63667 32.0772 5.21ZM41.5134 6.76H38.8934L38.4734 8H36.6834L39.2234 0.98H41.2034L43.7434 8H41.9334L41.5134 6.76ZM41.0734 5.44L40.2034 2.87L39.3434 5.44H41.0734ZM46.2265 0.98V8H44.5165V0.98H46.2265Z"
            })
        })
    }
    function pe() {
        throw new Error("Cycle detected")
    }
    function ir() {
        if (Nt > 1)
            Nt--;
        else {
            for (var e, t = !1; zt !== void 0; ) {
                var r = zt;
                for (zt = void 0,
                or++; r !== void 0; ) {
                    var n = r.o;
                    if (r.o = void 0,
                    r.f &= -3,
                    !(8 & r.f) && Kn(r))
                        try {
                            r.c()
                        } catch (i) {
                            t || (e = i,
                            t = !0)
                        }
                    r = n
                }
            }
            if (or = 0,
            Nt--,
            t)
                throw e
        }
    }
    var C = void 0
      , zt = void 0
      , Nt = 0
      , or = 0
      , he = 0;
    function Xn(e) {
        if (C !== void 0) {
            var t = e.n;
            if (t === void 0 || t.t !== C)
                return C.s = t = {
                    i: 0,
                    S: e,
                    p: void 0,
                    n: C.s,
                    t: C,
                    e: void 0,
                    x: void 0,
                    r: t
                },
                e.n = t,
                32 & C.f && e.S(t),
                t;
            if (t.i === -1)
                return t.i = 0,
                t.p !== void 0 && (t.p.n = t.n,
                t.n !== void 0 && (t.n.p = t.p),
                t.p = void 0,
                t.n = C.s,
                C.s.p = t,
                C.s = t),
                t
        }
    }
    function P(e) {
        this.v = e,
        this.i = 0,
        this.n = void 0,
        this.t = void 0
    }
    P.prototype.h = function() {
        return !0
    }
    ,
    P.prototype.S = function(e) {
        this.t !== e && e.e === void 0 && (e.x = this.t,
        this.t !== void 0 && (this.t.e = e),
        this.t = e)
    }
    ,
    P.prototype.U = function(e) {
        var t = e.e
          , r = e.x;
        t !== void 0 && (t.x = r,
        e.e = void 0),
        r !== void 0 && (r.e = t,
        e.x = void 0),
        e === this.t && (this.t = r)
    }
    ,
    P.prototype.subscribe = function(e) {
        var t = this;
        return cr(function() {
            var r = t.value
              , n = 32 & this.f;
            this.f &= -33;
            try {
                e(r)
            } finally {
                this.f |= n
            }
        })
    }
    ,
    P.prototype.valueOf = function() {
        return this.value
    }
    ,
    P.prototype.toString = function() {
        return this.value + ""
    }
    ,
    P.prototype.peek = function() {
        return this.v
    }
    ,
    Object.defineProperty(P.prototype, "value", {
        get: function() {
            var e = Xn(this);
            return e !== void 0 && (e.i = this.i),
            this.v
        },
        set: function(e) {
            if (e !== this.v) {
                or > 100 && pe(),
                this.v = e,
                this.i++,
                he++,
                Nt++;
                try {
                    for (var t = this.t; t !== void 0; t = t.x)
                        t.t.N()
                } finally {
                    ir()
                }
            }
        }
    });
    function ar(e) {
        return new P(e)
    }
    function Kn(e) {
        for (var t = e.s; t !== void 0; t = t.n)
            if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i)
                return !0;
        return !1
    }
    function Qn(e) {
        for (var t = e.s; t !== void 0; t = t.n) {
            var r = t.S.n;
            r !== void 0 && (t.r = r),
            t.S.n = t,
            t.i = -1
        }
    }
    function ti(e) {
        for (var t = e.s, r = void 0; t !== void 0; ) {
            var n = t.n;
            t.i === -1 ? (t.S.U(t),
            t.n = void 0) : (r !== void 0 && (r.p = t),
            t.p = void 0,
            t.n = r,
            r = t),
            t.S.n = t.r,
            t.r !== void 0 && (t.r = void 0),
            t = n
        }
        e.s = r
    }
    function ct(e) {
        P.call(this, void 0),
        this.x = e,
        this.s = void 0,
        this.g = he - 1,
        this.f = 4
    }
    (ct.prototype = new P).h = function() {
        if (this.f &= -3,
        1 & this.f)
            return !1;
        if ((36 & this.f) == 32 || (this.f &= -5,
        this.g === he))
            return !0;
        if (this.g = he,
        this.f |= 1,
        this.i > 0 && !Kn(this))
            return this.f &= -2,
            !0;
        var e = C;
        try {
            Qn(this),
            C = this;
            var t = this.x();
            (16 & this.f || this.v !== t || this.i === 0) && (this.v = t,
            this.f &= -17,
            this.i++)
        } catch (r) {
            this.v = r,
            this.f |= 16,
            this.i++
        }
        return C = e,
        ti(this),
        this.f &= -2,
        !0
    }
    ,
    ct.prototype.S = function(e) {
        if (this.t === void 0) {
            this.f |= 36;
            for (var t = this.s; t !== void 0; t = t.n)
                t.S.S(t)
        }
        P.prototype.S.call(this, e)
    }
    ,
    ct.prototype.U = function(e) {
        if (P.prototype.U.call(this, e),
        this.t === void 0) {
            this.f &= -33;
            for (var t = this.s; t !== void 0; t = t.n)
                t.S.U(t)
        }
    }
    ,
    ct.prototype.N = function() {
        if (!(2 & this.f)) {
            this.f |= 6;
            for (var e = this.t; e !== void 0; e = e.x)
                e.t.N()
        }
    }
    ,
    ct.prototype.peek = function() {
        if (this.h() || pe(),
        16 & this.f)
            throw this.v;
        return this.v
    }
    ,
    Object.defineProperty(ct.prototype, "value", {
        get: function() {
            1 & this.f && pe();
            var e = Xn(this);
            if (this.h(),
            e !== void 0 && (e.i = this.i),
            16 & this.f)
                throw this.v;
            return this.v
        }
    });
    function Vs(e) {
        return new ct(e)
    }
    function ei(e) {
        var t = e.u;
        if (e.u = void 0,
        typeof t == "function") {
            Nt++;
            var r = C;
            C = void 0;
            try {
                t()
            } catch (n) {
                throw e.f &= -2,
                e.f |= 8,
                sr(e),
                n
            } finally {
                C = r,
                ir()
            }
        }
    }
    function sr(e) {
        for (var t = e.s; t !== void 0; t = t.n)
            t.S.U(t);
        e.x = void 0,
        e.s = void 0,
        ei(e)
    }
    function Ws(e) {
        if (C !== this)
            throw new Error("Out-of-order effect");
        ti(this),
        C = e,
        this.f &= -2,
        8 & this.f && sr(this),
        ir()
    }
    function qt(e) {
        this.x = e,
        this.u = void 0,
        this.s = void 0,
        this.o = void 0,
        this.f = 32
    }
    qt.prototype.c = function() {
        var e = this.S();
        try {
            !(8 & this.f) && this.x !== void 0 && (this.u = this.x())
        } finally {
            e()
        }
    }
    ,
    qt.prototype.S = function() {
        1 & this.f && pe(),
        this.f |= 1,
        this.f &= -9,
        ei(this),
        Qn(this),
        Nt++;
        var e = C;
        return C = this,
        Ws.bind(this, e)
    }
    ,
    qt.prototype.N = function() {
        2 & this.f || (this.f |= 2,
        this.o = zt,
        zt = this)
    }
    ,
    qt.prototype.d = function() {
        this.f |= 8,
        1 & this.f || sr(this)
    }
    ;
    function cr(e) {
        var t = new qt(e);
        return t.c(),
        t.d.bind(t)
    }
    var lr;
    function Tt(e, t) {
        _[e] = t.bind(null, _[e] || function() {}
        )
    }
    function me(e) {
        lr && lr(),
        lr = e && e.S()
    }
    function ri(e) {
        var t = this
          , r = e.data
          , n = Zs(r);
        n.value = r;
        var i = Ct(function() {
            for (var o = t.__v; o = o.__; )
                if (o.__c) {
                    o.__c.__$f |= 4;
                    break
                }
            return t.__$u.c = function() {
                t.base.data = i.peek()
            }
            ,
            Vs(function() {
                var a = n.value.value;
                return a === 0 ? 0 : a === !0 ? "" : a || ""
            })
        }, []);
        return i.value
    }
    ri.displayName = "_st",
    Object.defineProperties(P.prototype, {
        constructor: {
            configurable: !0
        },
        type: {
            configurable: !0,
            value: ri
        },
        props: {
            configurable: !0,
            get: function() {
                return {
                    data: this
                }
            }
        },
        __b: {
            configurable: !0,
            value: 1
        }
    }),
    Tt("__b", function(e, t) {
        if (typeof t.type == "string") {
            var r, n = t.props;
            for (var i in n)
                if (i !== "children") {
                    var o = n[i];
                    o instanceof P && (r || (t.__np = r = {}),
                    r[i] = o,
                    n[i] = o.peek())
                }
        }
        e(t)
    }),
    Tt("__r", function(e, t) {
        me();
        var r, n = t.__c;
        n && (n.__$f &= -2,
        (r = n.__$u) === void 0 && (n.__$u = r = function(i) {
            var o;
            return cr(function() {
                o = this
            }),
            o.c = function() {
                n.__$f |= 1,
                n.setState({})
            }
            ,
            o
        }())),
        me(r),
        e(t)
    }),
    Tt("__e", function(e, t, r, n) {
        me(),
        e(t, r, n)
    }),
    Tt("diffed", function(e, t) {
        me();
        var r;
        if (typeof t.type == "string" && (r = t.__e)) {
            var n = t.__np
              , i = t.props;
            if (n) {
                var o = r.U;
                if (o)
                    for (var a in o) {
                        var s = o[a];
                        s !== void 0 && !(a in n) && (s.d(),
                        o[a] = void 0)
                    }
                else
                    r.U = o = {};
                for (var l in n) {
                    var d = o[l]
                      , u = n[l];
                    d === void 0 ? (d = Js(r, l, u, i),
                    o[l] = d) : d.o(u, i)
                }
            }
        }
        e(t)
    });
    function Js(e, t, r, n) {
        var i = t in e && e.ownerSVGElement === void 0
          , o = ar(r);
        return {
            o: function(a, s) {
                o.value = a,
                n = s
            },
            d: cr(function() {
                var a = o.value.value;
                n[t] !== a && (n[t] = a,
                i ? e[t] = a : a ? e.setAttribute(t, a) : e.removeAttribute(t))
            })
        }
    }
    Tt("unmount", function(e, t) {
        if (typeof t.type == "string") {
            var r = t.__e;
            if (r) {
                var n = r.U;
                if (n) {
                    r.U = void 0;
                    for (var i in n) {
                        var o = n[i];
                        o && o.d()
                    }
                }
            }
        } else {
            var a = t.__c;
            if (a) {
                var s = a.__$u;
                s && (a.__$u = void 0,
                s.d())
            }
        }
        e(t)
    }),
    Tt("__h", function(e, t, r, n) {
        n < 3 && (t.__$f |= 2),
        e(t, r, n)
    }),
    Lt.prototype.shouldComponentUpdate = function(e, t) {
        var r = this.__$u;
        if (!(r && r.s !== void 0 || 4 & this.__$f) || 3 & this.__$f)
            return !0;
        for (var n in t)
            return !0;
        for (var i in e)
            if (i !== "__source" && e[i] !== this.props[i])
                return !0;
        for (var o in this.props)
            if (!(o in e))
                return !0;
        return !1
    }
    ;
    function Zs(e) {
        return Ct(function() {
            return ar(e)
        }, [])
    }
    const lt = ar({});
    function Y(e, t, {lazy: r=!1, args: n, onSuccess: i, onError: o}={}) {
        const a = et(t)
          , s = et(n)
          , l = et(i)
          , d = et(o)
          , [u,f] = I(Xs(e))
          , [h,p] = I(null)
          , [m,T] = I(Ks(r, e))
          , [v,y] = I(!1);
        st(()=>{
            a.current = t,
            l.current = i,
            d.current = o
        }
        , [t, i, o]);
        const k = H(async(...j)=>(r && T(!0),
        a.current(...j).then(L=>{
            var N;
            f(L),
            p(null),
            T(!1),
            y(!0),
            e && (lt.value = {
                ...lt.value,
                [e]: L
            }),
            (N = l.current) == null || N.call(l, L)
        }
        ).catch(L=>{
            var N;
            p(L),
            T(!1),
            console.error(L),
            (N = d.current) == null || N.call(d, L)
        }
        )), [e, r]);
        return st(()=>{
            r || (s.current === void 0 ? k.apply(null) : k(...s.current))
        }
        , [k, r, e]),
        {
            data: e ? Vt(e) : u,
            error: h,
            loading: m,
            isFresh: v,
            executeFetch: k
        }
    }
    function Xs(e) {
        return e ? Vt(e) : null
    }
    function Ks(e, t) {
        return e ? !1 : !t || !Vt(t)
    }
    function Vt(e) {
        return lt.value[e] === void 0 || lt.value[e] === null ? null : lt.value[e]
    }
    function ni(e, t) {
        const r = t(Vt(e));
        lt.value = {
            ...lt.value,
            [e]: r
        }
    }
    class ii extends Mt {
        constructor(t) {
            super({
                message: "Client error",
                ...t
            }),
            this.name = "ClientError"
        }
    }
    class ur extends Mt {
        constructor(t) {
            super({
                message: "Internal server error",
                ...t
            }),
            this.name = "ServerError"
        }
    }
    const Qs = 5e3;
    async function dr(e, t={}) {
        const {timeout: r=Qs, ...n} = t
          , i = new AbortController
          , o = setTimeout(()=>i.abort(), r)
          , a = await fetch(e, {
            ...n,
            signal: i.signal
        });
        return clearTimeout(o),
        a
    }
    const tc = "https://app.getvanga.com/api/";
    async function ec({shopifyDomain: e, locale: t}) {
        return rc(()=>{
            const r = new URL(`${tc}cart_translations`);
            return r.search = new URLSearchParams({
                shopify_domain: e,
                locale: t
            }).toString(),
            dr(r, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        )
    }
    async function rc(e) {
        let t;
        try {
            t = await e()
        } catch (n) {
            throw n instanceof Error ? new ot({
                options: {
                    cause: n
                }
            }) : new ot({
                message: JSON.stringify(n)
            })
        }
        if (t.status >= 500)
            throw new ur({
                metadata: {
                    status: t.status,
                    statusText: t.statusText
                }
            });
        if (t.status >= 400 && t.status <= 499)
            throw new ii({
                metadata: {
                    status: t.status,
                    statusText: t.statusText
                }
            });
        return await t.json()
    }
    const nc = {
        translations: ec
    };
    function ic(e, t) {
        try {
            return localStorage.setItem(e, t)
        } catch {
            return
        }
    }
    function oc(e) {
        try {
            return localStorage.getItem(e)
        } catch {
            return null
        }
    }
    function ac(e) {
        try {
            return localStorage.removeItem(e)
        } catch {
            return
        }
    }
    const oi = {
        setItem: ic,
        getItem: oc,
        removeItem: ac
    }
      , ai = "VangaCartTranslations";
    function sc() {
        const e = oi.getItem(ai);
        if (!e)
            return null;
        const t = JSON.parse(e);
        return {
            translations: t.translations,
            locale: t.locale,
            shopifyDomain: t.shopifyDomain,
            createdAt: new Date(t.createdAt)
        }
    }
    function cc(e) {
        const t = {
            translations: e,
            locale: window.Shopify.locale,
            shopifyDomain: window.Shopify.shop,
            createdAt: new Date
        };
        oi.setItem(ai, JSON.stringify(t))
    }
    function lc(e, t) {
        const r = e.locale !== window.Shopify.locale
          , n = t ? e.createdAt < t : !1;
        return r || n
    }
    const fr = {
        get: sc,
        set: cc,
        isExpired: lc
    };
    async function uc(e, t, r) {
        const n = fr.get();
        if (n && !fr.isExpired(n, r))
            return n.translations;
        const {translations: i} = await nc.translations({
            shopifyDomain: e,
            locale: t
        });
        return fr.set(i),
        i
    }
    const si = Ft(null);
    function dc(e, t) {
        let r = null
          , n = t;
        const i = `No translation found for key: "${e}"`;
        for (const o of e.split(".")) {
            const a = n[o];
            switch (typeof a) {
            case "undefined":
                throw new Error(i);
            case "object":
                n = a;
                break;
            case "string":
                if (r)
                    throw new Error(i);
                r = a;
                break;
            default:
                throw new Error(i)
            }
        }
        if (r === null)
            throw new Error(i);
        return r
    }
    function fc(e, t) {
        let r = e;
        return Object.entries(t).forEach(([n,i])=>{
            r = r.replace(`%{${n}}`, i.toString())
        }
        ),
        r
    }
    function pc({fallbackTranslations: e, translationsUpdatedAt: t, children: r}) {
        const n = et(e);
        Y(null, uc, {
            args: [window.Shopify.shop, window.Shopify.locale, t],
            onSuccess: o=>n.current = o
        });
        const i = {
            t: (o,a={})=>{
                const s = {
                    ...e,
                    ...n.current
                };
                return fc(dc(o, s), a)
            }
        };
        return c(si.Provider, {
            value: i,
            children: r
        })
    }
    function G() {
        const e = Yt(si);
        if (e === null)
            throw new Error("useI18n must be used within a I18nProvider.");
        return e
    }
    function ci({lightColors: e=!1}) {
        const {t} = G();
        return c("div", {
            className: "flex items-center justify-center",
            children: [c("p", {
                className: `text-2xs ${e ? "text-white/80" : "text-neutral-500"}`,
                children: t("powered_by")
            }), c("a", {
                href: hc(),
                target: "_blank",
                rel: "noreferrer",
                className: "hover:scale-110 transition-transform",
                children: c(Ys, {
                    lightColors: e
                })
            })]
        })
    }
    function hc() {
        return `https://www.getvanga.com/?utm_source=vanga_logo&utm_medium=smart_cart&utm_campaign=${window.Shopify.shop}`
    }
    const li = Ft(null);
    function mc({theme: e, children: t}) {
        return c(li.Provider, {
            value: e,
            children: t
        })
    }
    function pr() {
        const e = Yt(li);
        if (e === null)
            throw new Error("useTheme must be used within a ThemeProvider.");
        return e
    }
    function ui({onClose: e, isOpened: t, children: r}) {
        const {showVangaLogo: n} = pr();
        return t ? c("div", {
            className: "relative z-9999",
            role: "dialog",
            "aria-modal": "true",
            children: [c(_c, {}), c("div", {
                className: "fixed z-9999 inset-0 overflow-y-auto",
                children: c("div", {
                    className: "flex items-stretch justify-center min-h-full md:items-start md:px-8 md:py-16",
                    children: c("div", {
                        className: "w-full max-w-screen-xl",
                        children: [c(gc, {
                            onClose: e,
                            children: r
                        }), n && c("div", {
                            className: "p-2 hidden md:flex md:justify-end",
                            children: c(ci, {
                                lightColors: !0
                            })
                        })]
                    })
                })
            })]
        }) : null
    }
    function _c() {
        return c("div", {
            className: "fixed inset-0 md:bg-black/60 md:backdrop-blur-md"
        })
    }
    function gc({children: e, onClose: t}) {
        yc(),
        vc({
            callback: t
        });
        const r = et(null);
        return wc({
            elementRef: r,
            callback: t
        }),
        c("div", {
            className: "min-h-full bg-white dark:bg-neutral-800 text-black dark:text-white md:rounded-md md:shadow-xl",
            ref: r,
            children: e
        })
    }
    function vc({callback: e}) {
        const t = et(e);
        t.current = e;
        const r = H(n=>{
            n.key === "Escape" && t.current()
        }
        , []);
        st(()=>(document.addEventListener("keyup", r),
        ()=>{
            document.removeEventListener("keyup", r)
        }
        ), [r])
    }
    function wc({elementRef: e, callback: t}) {
        const r = et(t);
        r.current = t;
        const n = H(i=>{
            const o = i.composedPath()[0];
            e.current && !e.current.contains(o) && r.current(i)
        }
        , [e]);
        st(()=>(document.addEventListener("click", n, !0),
        ()=>{
            document.removeEventListener("click", n, !0)
        }
        ), [e, n])
    }
    function yc() {
        Fs(()=>{
            const e = window.getComputedStyle(document.body).overflow;
            return document.body.style.overflow = "hidden",
            ()=>{
                document.body.style.overflow = e
            }
        }
        , [])
    }
    function bc({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 24 24",
            fill: "currentColor",
            "stroke-width": "2",
            stroke: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M6 18L18 6M6 6l12 12"
            })
        })
    }
    function _e({onClose: e, colorClass: t="text-neutral-400 hover:text-neutral-500"}) {
        return c("button", {
            type: "button",
            className: `${t} transition-colors`,
            onClick: e,
            children: c(bc, {
                className: "h-8 w-8 hover:scale-125 transition-transform md:w-6 md:h-6"
            })
        })
    }
    function di({children: e}) {
        return c("div", {
            className: "text-red-800 bg-red-100 dark:bg-red-300 rounded-md border border-red-200 dark:border-red-400",
            children: e
        })
    }
    function fi(e, t) {
        if (!e)
            return null;
        let r = null;
        return e instanceof tr ? r = e.message : r = t,
        r
    }
    function xc({error: e, resetErrorBoundary: t}) {
        const {t: r} = G()
          , n = fi(e, r("something_went_wrong"));
        return c(ui, {
            isOpened: !0,
            onClose: t,
            children: c("div", {
                className: "h-full flex flex-col items-center pb-6 md:pb-16",
                children: [c("div", {
                    className: "place-self-end p-4 md:p-0 md:pt-1 md:pr-1",
                    children: c(_e, {
                        onClose: t
                    })
                }), c("h2", {
                    className: "mt-12 text-4xl font-bold",
                    children: r("cart")
                }), c("div", {
                    className: "mt-4",
                    children: c(di, {
                        children: c("div", {
                            className: "py-8 px-16 text-center",
                            children: [c("p", {
                                children: n
                            }), c("button", {
                                className: "mt-2 underline hover:no-underline",
                                onClick: t,
                                children: r("close")
                            })]
                        })
                    })
                })]
            })
        })
    }
    function kc({FallbackComponent: e, onReset: t, children: r}) {
        const [n,i] = Ms(a=>B(a))
          , o = H(()=>{
            t == null || t(),
            i()
        }
        , [t, i]);
        return n ? c(e, {
            error: n,
            resetErrorBoundary: o
        }) : r
    }
    function pi(e, t) {
        const r = /\{\{(.*?)\}\}/
          , n = Ec(e, r);
        return ({amount: i, currencyCode: o})=>{
            const a = i >= 0 ? "" : "-"
              , s = n(i, o, t)
              , l = e.replace(r, s);
            return `${a}${l}`
        }
    }
    function Ec(e, t) {
        const r = Sc(e, t);
        return Cc[r]
    }
    function Sc(e, t) {
        const r = t.exec(e)
          , n = r && r[1].trim();
        return n === "amount" || n === "amount_no_decimals" || n === "amount_with_comma_separator" || n === "amount_no_decimals_with_comma_separator" ? n : "amount"
    }
    const Cc = {
        amount: (e,t,r)=>{
            const n = ge(e, t, r);
            let i = "";
            for (const o of n)
                o.type === "integer" || o.type === "fraction" ? i += o.value : o.type === "group" ? i += "," : o.type === "decimal" && (i += ".");
            return i
        }
        ,
        amount_no_decimals: (e,t,r)=>{
            const n = ge(e, t, r, {
                precision: 0
            });
            let i = "";
            for (const o of n)
                o.type === "integer" ? i += o.value : o.type === "group" && (i += ",");
            return i
        }
        ,
        amount_with_comma_separator: (e,t,r)=>{
            const n = ge(e, t, r);
            let i = "";
            for (const o of n)
                o.type === "integer" || o.type === "fraction" ? i += o.value : o.type === "group" ? i += "." : o.type === "decimal" && (i += ",");
            return i
        }
        ,
        amount_no_decimals_with_comma_separator: (e,t,r)=>{
            const n = ge(e, t, r, {
                precision: 0
            });
            let i = "";
            for (const o of n)
                o.type === "integer" ? i += o.value : o.type === "group" && (i += ".");
            return i
        }
    };
    function ge(e, t, r, n={
        precision: 2
    }) {
        return new Intl.NumberFormat(r,{
            style: "currency",
            currency: t,
            minimumFractionDigits: n.precision,
            maximumFractionDigits: n.precision
        }).formatToParts(e)
    }
    const hi = Ft(null);
    function Nc({moneyFormat: e, locale: t, children: r}) {
        const n = {
            withoutCurrencyCode: pi(e.withoutCurrencyCode, t),
            withCurrencyCode: pi(e.withCurrencyCode, t)
        }
          , i = ({amount: o, currencyCode: a, showCurrencyCode: s=!1})=>(s ? n.withCurrencyCode : n.withoutCurrencyCode)({
            amount: o,
            currencyCode: a
        });
        return c(hi.Provider, {
            value: {
                formatMoney: i
            },
            children: r
        })
    }
    function ve() {
        const e = Yt(hi);
        if (e === null)
            throw new Error("useMoneyFormatter must be used within a MoneyFormatterProvider.");
        return e
    }
    const mi = Ft(null);
    function Tc({settings: e, children: t}) {
        return c(mi.Provider, {
            value: e,
            children: t
        })
    }
    function hr() {
        const e = Yt(mi);
        if (e === null)
            throw new Error("useApp must be used within a AppProvider.");
        return e
    }
    async function Rc() {
        return mr(()=>fetch(`${window.Shopify.routes.root}cart.js`, {
            method: "GET"
        }))
    }
    async function Ac(e) {
        return mr(()=>fetch(`${window.Shopify.routes.root}cart/add.js`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(e)
        }))
    }
    async function Ic(e) {
        return mr(()=>fetch(`${window.Shopify.routes.root}cart/change.js`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(e)
        }))
    }
    async function mr(e) {
        let t;
        try {
            t = await e()
        } catch (n) {
            throw n instanceof Error ? new ot({
                options: {
                    cause: n
                }
            }) : new ot({
                message: JSON.stringify(n)
            })
        }
        if (t.status >= 500)
            throw new ur({
                metadata: {
                    status: t.status,
                    statusText: t.statusText
                }
            });
        const r = await t.json();
        if (t.status >= 400)
            throw new tr({
                message: `${r.message}: ${r.description}`,
                metadata: r
            });
        return r
    }
    const Dc = {
        cart: Rc,
        cartAdd: Ac,
        cartChange: Ic
    };
    let ut;
    ut = Dc;
    function _i(e) {
        return e.filter(Pc)
    }
    function Pc(e) {
        var t;
        return ((t = e.properties) == null ? void 0 : t._vanga_cart_offer) === !0
    }
    const dt = "cart-icon-bubble";
    async function we() {
        const e = await ut.cart();
        return await vr(e)
    }
    async function _r(e) {
        const {items: t, sections: r} = await ut.cartAdd({
            items: [e],
            sections: [dt]
        });
        gr(r);
        const n = jc("cart");
        return n || B(new Error("Missing cart token from cookie")),
        {
            cartToken: n,
            item: t[0]
        }
    }
    async function Oc(e, t) {
        const r = JSON.parse(JSON.stringify(Vt("cart")));
        ni("cart", i=>{
            if (i) {
                const o = i.items.find(a=>a.key === e);
                o && (o.quantity = t)
            }
            return i
        }
        );
        let n;
        try {
            n = await ut.cartChange({
                id: e,
                quantity: t,
                sections: [dt]
            })
        } catch (i) {
            throw ni("cart", ()=>r),
            i
        }
        return gr(n.sections),
        vr(n)
    }
    async function Uc(e) {
        const t = await ut.cartChange({
            id: e,
            quantity: 0,
            sections: [dt]
        });
        return gr(t.sections),
        vr(t)
    }
    function gr(e) {
        const t = e && e[dt];
        if (!t)
            return;
        const r = document.createElement("div");
        r.innerHTML = t;
        const n = r.querySelector(`#shopify-section-${dt}`);
        if (!n) {
            B(new Error("Unexpected section identifier"));
            return
        }
        const i = document.getElementById(dt);
        if (!i) {
            B(new Error(`Storefront missing element "${dt}"`));
            return
        }
        i.innerHTML = n.innerHTML
    }
    async function vr(e) {
        const t = _i(e.items);
        if (t.length !== e.items.length)
            return e;
        let r = e;
        for (const n of t) {
            const i = {
                ...n.properties || {},
                _vanga_cart_offer: !1
            };
            try {
                r = await ut.cartChange({
                    id: n.key,
                    quantity: n.quantity,
                    properties: i
                })
            } catch (o) {
                B(o)
            }
        }
        return r
    }
    function jc(e) {
        const t = document.cookie.split("; ").find(r=>r.startsWith(`${e}=`));
        if (!!t)
            return t.split("=")[1]
    }
    const gi = ['button[name="add"]', 'input[name="add"]', 'button[data-action="add-to-cart"]', "input#addToCart"].join(",");
    function Lc(e) {
        return async t=>{
            const r = t.target
              , n = r.closest("form")
              , i = r.closest(gi);
            if (n && i && n.matches('[action$="/cart/add"]') && !n.querySelector('input[name="return_to"][value$="/checkout"]')) {
                t.stopImmediatePropagation(),
                t.preventDefault(),
                e.addToCartForm(n, i);
                return
            }
            if (r.closest('a[href$="/cart"]')) {
                t.stopImmediatePropagation(),
                t.preventDefault(),
                e.linkToCart();
                return
            }
        }
    }
    function Bc(e) {
        return Fc(e.linkToCart),
        async t=>{
            const r = t.target
              , n = r.closest("form")
              , i = r.closest(gi);
            if (n && i && n.matches('[action^="/cart/add"]') && !n.querySelector('input[name="return_to"][value^="/checkout"]')) {
                t.stopImmediatePropagation(),
                t.preventDefault(),
                e.addToCartForm(n, i);
                return
            }
            if (r.closest(`a[href^="https://${window.Shopify.shop}/cart"]`) || r.closest('a[href$="/cart"]')) {
                t.stopImmediatePropagation(),
                t.preventDefault(),
                e.linkToCart();
                return
            }
        }
    }
    async function Fc(e) {
        const r = new URLSearchParams(window.location.search).get("vangaCartPreview");
        if (!r)
            return;
        (await ut.cart()).items.length === 0 && await _r({
            id: Number(r),
            quantity: 1
        }),
        e()
    }
    const Mc = window.Shopify.designMode ? Bc : Lc
      , vi = Ft(null);
    function Hc({cart: e, closeCart: t, children: r}) {
        const [n,i] = I(!1)
          , [o,a] = I(null)
          , s = {
            cart: e,
            closeCart: t,
            isLoading: n,
            setIsLoading: i,
            error: o,
            setError: a
        };
        return c(vi.Provider, {
            value: s,
            children: r
        })
    }
    function Wt() {
        const e = Yt(vi);
        if (e === null)
            throw new Error("useCart must be used within a CartProvider.");
        return e
    }
    function O(e, t) {
        if (t.length !== 3)
            throw new Error("Currency code must be 3 characters long.");
        const r = e / 100;
        return {
            units: e,
            currencyCode: t,
            amount: r
        }
    }
    function wi({units: e, discountRatio: t, quantity: r=1}) {
        return Math.floor(e * t) * r
    }
    function wr({src: e, alt: t, shape: r, size: n}) {
        return c("img", {
            src: e,
            alt: t,
            className: `${xi[n]} ${bi[r]} bg-white border border-black/10 dark:border-white/10 object-contain`
        })
    }
    function yi({shape: e, size: t}) {
        return c("div", {
            className: `${xi[t]} ${bi[e]} bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10`
        })
    }
    const bi = {
        square: "rounded-md",
        circle: "rounded-full"
    }
      , xi = {
        small: "w-16 h-16",
        normal: "w-18 h-18"
    };
    function ki({onClick: e, isLoading: t}) {
        const {t: r} = G();
        return c("button", {
            type: "button",
            onClick: e,
            disabled: t,
            className: "text-brand-accent hover:underline disabled:cursor-not-allowed",
            children: r("remove")
        })
    }
    function Ei({id: e, quantity: t, onChange: r, isLoading: n}) {
        const i = H(()=>{
            r(t - 1)
        }
        , [t, r])
          , o = H(()=>{
            r(t + 1)
        }
        , [t, r])
          , a = H(s=>{
            r(Number(s.currentTarget.value))
        }
        , [r]);
        return c("div", {
            className: "flex leading-8 text-center rounded-md border border-neutral-300 dark:border-black/40 dark:bg-white/10 shadow-sm",
            children: [c("button", {
                onClick: i,
                disabled: n,
                className: "w-8 flex-none text-base text-gray-500 disabled:cursor-not-allowed",
                children: "-"
            }), c("input", {
                id: `quantity-${e}`,
                name: `quantity-${e}`,
                type: "number",
                min: "0",
                disabled: n,
                value: t,
                onChange: a,
                className: "w-8 px-1 py-2 flex-none border-none text-xs text-center bg-transparent appearance-none disabled:cursor-not-allowed disabled:bg-transparent focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:focus:ring-black/30 focus:border-neutral-500 dark:focus:border-black/50"
            }), c("button", {
                onClick: o,
                disabled: n,
                className: "w-8 flex-none text-base text-gray-500 disabled:cursor-not-allowed",
                children: "+"
            })]
        })
    }
    function Gc({item: e}) {
        const {isLoading: t, setIsLoading: r, setError: n} = Wt()
          , {loading: i, executeFetch: o} = Y("cart", Uc, {
            lazy: !0,
            onError: n
        })
          , {loading: a, executeFetch: s} = Y("cart", Oc, {
            lazy: !0,
            onError: n
        });
        return st(()=>{
            const l = i || a;
            return r(l),
            l && n(null),
            ()=>r(!1)
        }
        , [i, a, r, n]),
        c("li", {
            className: "p-4 first:pt-0 flex space-x-2 text-xs md:px-0",
            children: [c("div", {
                className: "flex-none",
                children: c("a", {
                    href: e.href,
                    children: c(wr, {
                        src: e.imageSrc,
                        alt: e.imageAlt,
                        shape: "circle",
                        size: "normal"
                    })
                })
            }), c("div", {
                className: "grow",
                children: [c("h3", {
                    className: "font-medium lg:text-sm",
                    children: c("a", {
                        href: e.href,
                        children: e.productTitle
                    })
                }), c("p", {
                    className: "mt-1 text-neutral-500 dark:text-neutral-400",
                    children: e.variantTitle
                }), e.publicProperties.map(({name: l, value: d})=>c("p", {
                    className: "mt-1 text-neutral-500 dark:text-neutral-400",
                    children: [l, ": ", d]
                }, l)), c("div", {
                    className: "mt-2 w-min lg:hidden",
                    children: c(Ei, {
                        id: e.key.toString(),
                        quantity: e.quantity,
                        isLoading: t,
                        onChange: l=>s(e.key, l)
                    })
                })]
            }), c("div", {
                className: "shrink-0 space-y-2 flex flex-col items-end",
                children: [c("div", {
                    className: "lg:flex lg:justify-between lg:w-60 lg:space-x-2",
                    children: [c("div", {
                        className: "hidden lg:flex lg:flex-col lg:justify-center lg:space-y-2",
                        children: [c(Ei, {
                            id: e.key.toString(),
                            quantity: e.quantity,
                            isLoading: t,
                            onChange: l=>s(e.key, l)
                        }), c(ki, {
                            onClick: ()=>o(e.key),
                            isLoading: t
                        })]
                    }), c("div", {
                        className: "text-sm text-right align-items-end bg-red",
                        children: [e.compareAtPrice && c(M, {
                            children: [c("span", {
                                className: "line-through text-gray-500 text-xs",
                                children: e.compareAtPrice
                            }), c("br", {})]
                        }), e.price]
                    })]
                }), c("div", {
                    className: "mt-2 lg:hidden",
                    children: c(ki, {
                        onClick: ()=>o(e.key),
                        isLoading: t
                    })
                })]
            })]
        })
    }
    function $c({items: e}) {
        return c("ul", {
            role: "list",
            className: "w-full divide-y divide-black/10 dark:divide-white/10",
            children: e.map(t=>c(Gc, {
                item: t
            }, t.key))
        })
    }
    function ye({children: e, onClick: t, size: r="large", disabled: n=!1}) {
        let i;
        const o = pr();
        switch (r) {
        case "medium":
            i = "px-5 py-2 text-xs";
            break;
        case "large":
            i = "p-4 text-sm md:px-8";
            break
        }
        const a = {
            background: o.colors.button
        };
        return o.useGradient && o.colors.buttonGradient1 && o.colors.buttonGradient2 && (a.background = `linear-gradient(${o.colors.buttonGradient1}, ${o.colors.buttonGradient2})`),
        c("button", {
            type: "button",
            disabled: n,
            onClick: t,
            className: `${i} w-full border border-transparent rounded-md font-bold text-brand-button-text hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 focus:ring-brand-button disabled:opacity-75 disabled:cursor-not-allowed`,
            style: a,
            children: e
        })
    }
    function Yc({onClose: e}) {
        const {t} = G();
        return c("div", {
            className: "h-full flex flex-col items-center pb-6 md:pb-16",
            children: [c("div", {
                className: "place-self-end p-4 md:p-0 md:pt-1 md:pr-1",
                children: c(_e, {
                    onClose: e
                })
            }), c("h2", {
                className: "mt-12 text-4xl font-bold",
                children: t("cart")
            }), c("p", {
                className: "grow mt-4 text-base",
                children: t("empty_cart")
            }), c("div", {
                className: "mt-8 px-4 w-full md:w-auto",
                children: c(ye, {
                    onClick: e,
                    children: t("continue_shopping")
                })
            })]
        })
    }
    function zc({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 20 20",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                "fill-rule": "evenodd",
                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                "clip-rule": "evenodd"
            })
        })
    }
    function qc({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 14 14",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                d: "M13.6572 0.579766C13.2015 0.140312 12.4632 0.140312 12.0075 0.579766L0.34082 11.8298C-0.114909 12.2692 -0.114909 12.9811 0.34082 13.4206C0.569779 13.6407 0.868008 13.7496 1.1666 13.7496C1.4652 13.7496 1.76379 13.6398 1.99129 13.4201L13.658 2.17006C14.113 1.72973 14.113 1.01922 13.6572 0.579766ZM2.33327 4.74965C3.62025 4.74965 4.6666 3.73996 4.6666 2.49965C4.6666 1.25934 3.62025 0.25 2.33327 0.25C1.04629 0.25 -6.5118e-05 1.25969 -6.5118e-05 2.49965C-6.5118e-05 3.73961 1.04629 4.74965 2.33327 4.74965ZM11.6666 9.24965C10.3796 9.24965 9.33327 10.2593 9.33327 11.4996C9.33327 12.74 10.3796 13.7496 11.6666 13.7496C12.9536 13.7496 13.9999 12.74 13.9999 11.4996C13.9999 10.2593 12.9536 9.24965 11.6666 9.24965Z"
            })
        })
    }
    function Vc({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 23 18",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                d: "M12.9375 0C13.8691 0 14.625 0.755508 14.625 1.6875V3.375H16.4074C17.0051 3.375 17.5465 3.61055 18 4.03242L20.7176 6.75C21.1395 7.17188 21.375 7.74492 21.375 8.34258V12.375C21.9973 12.375 22.5 12.8777 22.5 13.5C22.5 14.1223 21.9973 14.625 21.375 14.625H20.25C20.25 16.4883 18.7383 18 16.875 18C14.9801 18 13.5 16.4883 13.5 14.625H9C9 16.4883 7.48828 18 5.625 18C3.73008 18 2.25 16.4883 2.25 14.625H1.6875C0.755508 14.625 0 13.8691 0 12.9375V1.6875C0 0.755508 0.755508 0 1.6875 0H12.9375ZM14.625 5.625V9H19.125V8.34258L16.4074 5.625H14.625ZM5.625 12.9375C4.69336 12.9375 3.9375 13.6934 3.9375 14.625C3.9375 15.5566 4.69336 16.3125 5.625 16.3125C6.55664 16.3125 7.3125 15.5566 7.3125 14.625C7.3125 13.6934 6.55664 12.9375 5.625 12.9375ZM16.875 16.3125C17.8066 16.3125 18.5625 15.5566 18.5625 14.625C18.5625 13.6934 17.8066 12.9375 16.875 12.9375C15.9434 12.9375 15.1875 13.6934 15.1875 14.625C15.1875 15.5566 15.9434 16.3125 16.875 16.3125Z"
            })
        })
    }
    function Wc({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 18 16",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                d: "M3 0C3.35938 0 3.66875 0.255938 3.7375 0.609688L3.78437 1H16.9312C17.5656 1 18.0719 1.63281 17.8937 2.27063L16.2062 8.27188C16.0844 8.70312 15.6906 9 15.2437 9H5.33437L5.62187 10.5H15.25C15.6656 10.5 16 10.8344 16 11.25C16 11.6656 15.6656 12 15.25 12H4.97188C4.64062 12 4.33125 11.7437 4.2625 11.3906L2.37937 1.5H0.75C0.335938 1.5 0 1.16406 0 0.75C0 0.335938 0.335938 0 0.75 0H3ZM8.5 5.625H9.875V7C9.875 7.34375 10.1281 7.625 10.5 7.625C10.8438 7.625 11.125 7.34375 11.125 7V5.625H12.5C12.8438 5.625 13.125 5.34375 13.125 5C13.125 4.62813 12.8438 4.375 12.5 4.375H11.125V3C11.125 2.65469 10.8438 2.375 10.5 2.375C10.1281 2.375 9.875 2.65469 9.875 3V4.375H8.5C8.12813 4.375 7.875 4.62813 7.875 5C7.875 5.34375 8.12813 5.625 8.5 5.625ZM4 14.5C4 13.6719 4.67188 13 5.5 13C6.32812 13 7 13.6719 7 14.5C7 15.3281 6.32812 16 5.5 16C4.67188 16 4 15.3281 4 14.5ZM16 14.5C16 15.3281 15.3281 16 14.5 16C13.6719 16 13 15.3281 13 14.5C13 13.6719 13.6719 13 14.5 13C15.3281 13 16 13.6719 16 14.5Z"
            })
        })
    }
    function Jc({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 20 20",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                d: "M7.4962 4.4C7.3347 4.23567 7.13381 4.11543 6.91268 4.05074C6.69154 3.98605 6.45752 3.97907 6.23292 4.03047C6.00628 4.08056 5.796 4.18721 5.62169 4.34048C5.44738 4.49376 5.31471 4.68866 5.23604 4.90703L0.604011 17.6344C0.531777 17.8415 0.509834 18.0629 0.539992 18.2802C0.570151 18.4975 0.651546 18.7045 0.777463 18.8841C0.903379 19.0637 1.07021 19.2109 1.26418 19.3133C1.45816 19.4158 1.67371 19.4707 1.89307 19.4734C2.0538 19.4737 2.21347 19.4475 2.36573 19.3961L15.0931 14.7641C15.3114 14.6854 15.5063 14.5527 15.6596 14.3784C15.8129 14.2041 15.9195 13.9938 15.9696 13.7672C16.021 13.5426 16.0141 13.3086 15.9494 13.0874C15.8847 12.8663 15.7644 12.6654 15.6001 12.5039L7.4962 4.4ZM3.48292 13.7328L5.13292 9.19531L10.8048 14.8672L6.26729 16.5172L3.48292 13.7328ZM11.7501 6.1875C11.7628 5.72254 11.8741 5.26557 12.0767 4.84688C12.5321 3.93594 13.3915 3.4375 14.5001 3.4375C15.0759 3.4375 15.4454 3.23984 15.6774 2.81875C15.7957 2.5803 15.8631 2.31981 15.8751 2.05391C15.8751 1.96402 15.8929 1.87503 15.9276 1.7921C15.9622 1.70917 16.013 1.63394 16.077 1.57078C16.1409 1.50763 16.2168 1.4578 16.3002 1.42419C16.3835 1.39058 16.4727 1.37386 16.5626 1.375C16.7449 1.375 16.9198 1.44743 17.0487 1.57636C17.1777 1.7053 17.2501 1.88016 17.2501 2.0625C17.2501 3.17109 16.5196 4.8125 14.5001 4.8125C13.9243 4.8125 13.5548 5.01016 13.3228 5.43125C13.2045 5.6697 13.1372 5.93019 13.1251 6.19609C13.1251 6.28598 13.1073 6.37497 13.0726 6.4579C13.038 6.54083 12.9872 6.61606 12.9232 6.67922C12.8593 6.74237 12.7834 6.7922 12.7001 6.82581C12.6167 6.85942 12.5275 6.87614 12.4376 6.875C12.2553 6.875 12.0804 6.80257 11.9515 6.67364C11.8225 6.5447 11.7501 6.36984 11.7501 6.1875ZM9.6876 3.4375V1.375C9.6876 1.19266 9.76004 1.0178 9.88897 0.888864C10.0179 0.759933 10.1928 0.6875 10.3751 0.6875C10.5574 0.6875 10.7323 0.759933 10.8612 0.888864C10.9902 1.0178 11.0626 1.19266 11.0626 1.375V3.4375C11.0626 3.61984 10.9902 3.7947 10.8612 3.92364C10.7323 4.05257 10.5574 4.125 10.3751 4.125C10.1928 4.125 10.0179 4.05257 9.88897 3.92364C9.76004 3.7947 9.6876 3.61984 9.6876 3.4375ZM18.4274 10.5102C18.5565 10.6405 18.629 10.8165 18.629 11C18.629 11.1835 18.5565 11.3595 18.4274 11.4898C18.296 11.6169 18.1204 11.6879 17.9376 11.6879C17.7548 11.6879 17.5792 11.6169 17.4478 11.4898L16.0728 10.1148C15.9631 9.98127 15.9071 9.81169 15.9156 9.63909C15.9241 9.46649 15.9964 9.30321 16.1186 9.18102C16.2408 9.05883 16.4041 8.98645 16.5767 8.97798C16.7493 8.9695 16.9189 9.02553 17.0524 9.13516L18.4274 10.5102ZM18.8399 6.84063L16.7774 7.52813C16.7084 7.55201 16.6357 7.56364 16.5626 7.5625C16.3991 7.56254 16.2409 7.5043 16.1165 7.39824C15.992 7.29218 15.9095 7.14524 15.8836 6.98379C15.8577 6.82234 15.8902 6.65695 15.9753 6.51732C16.0604 6.37768 16.1924 6.27293 16.3478 6.22188L18.4103 5.53438C18.496 5.50616 18.5865 5.49512 18.6766 5.50187C18.7666 5.50863 18.8544 5.53306 18.935 5.57375C19.0156 5.61445 19.0874 5.67063 19.1463 5.73907C19.2052 5.80751 19.25 5.88689 19.2782 5.97266C19.3064 6.05843 19.3175 6.14891 19.3107 6.23895C19.304 6.32899 19.2796 6.41681 19.2389 6.49741C19.1982 6.57801 19.142 6.6498 19.0735 6.70869C19.0051 6.76758 18.9257 6.81241 18.8399 6.84063Z"
            })
        })
    }
    function Zc({className: e}) {
        return c("svg", {
            className: e,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M15.75 19.5L8.25 12l7.5-7.5"
            })
        })
    }
    function yr() {
        return c("svg", {
            className: "animate-spin w-full h-full fill-current",
            viewBox: "0 0 30 30",
            xmlns: "http://www.w3.org/2000/svg",
            children: c("path", {
                d: "M10.5664 0.876799C8.1267 1.64386 5.9274 3.03003 4.18294 4.90015C2.43848 6.77027 1.20839 9.06052 0.612603 11.5476C0.0168205 14.0347 0.0756786 16.6337 0.783439 19.0912C1.4912 21.5488 2.82371 23.781 4.65104 25.5703C6.47837 27.3595 8.73816 28.6447 11.2101 29.3005C13.682 29.9563 16.2817 29.9604 18.7557 29.3124C21.2296 28.6643 23.4935 27.3863 25.3264 25.6028C27.1594 23.8193 28.4989 21.5913 29.2144 19.136C29.2941 18.882 29.3223 18.6147 29.2974 18.3496C29.2725 18.0846 29.1949 17.8272 29.0692 17.5926C28.9435 17.3579 28.7722 17.1507 28.5654 16.9831C28.3585 16.8155 28.1203 16.6909 27.8647 16.6166C27.6091 16.5422 27.3412 16.5196 27.0768 16.5502C26.8123 16.5807 26.5567 16.6637 26.3247 16.7944C26.0928 16.925 25.8892 17.1006 25.7261 17.311C25.5629 17.5213 25.4433 17.7621 25.3744 18.0192C24.8518 19.8105 23.8741 21.4359 22.5364 22.7369C21.1987 24.0379 19.5468 24.9702 17.7416 25.4427C15.9364 25.9153 14.0396 25.9121 12.2361 25.4334C10.4325 24.9547 8.78373 24.0169 7.45047 22.7114C6.1172 21.4059 5.14494 19.7772 4.62845 17.9841C4.11197 16.191 4.06888 14.2947 4.50339 12.48C4.9379 10.6653 5.83518 8.99408 7.10777 7.62935C8.38036 6.26462 9.98483 5.2529 11.7648 4.6928C12.0154 4.61401 12.2479 4.48663 12.4493 4.31795C12.6506 4.14927 12.8168 3.94258 12.9382 3.7097C13.0597 3.47681 13.1341 3.22227 13.1572 2.96063C13.1803 2.69899 13.1516 2.43536 13.0728 2.1848C12.994 1.93424 12.8666 1.70165 12.6979 1.50031C12.5293 1.29898 12.3226 1.13283 12.0897 1.01138C11.8568 0.889916 11.6023 0.815518 11.3406 0.792427C11.079 0.769337 10.8154 0.798006 10.5648 0.876799H10.5664Z"
            })
        })
    }
    function Si(e, t, r) {
        const n = e.items.findIndex(({key: a})=>a === t.key);
        let i = null;
        n === -1 ? i = [t, ...e.items] : i = Object.assign([], e.items, {
            [n]: t
        });
        const o = i.reduce((a,s)=>a + s.final_line_price, 0);
        return {
            ...e,
            items: i,
            total_price: o,
            token: r || e.token
        }
    }
    function Xc({promotion: e, cartItems: t, freeShipping: r}) {
        const {offers: n} = e
          , [i,o] = I(null)
          , {showVangaLogo: a} = pr()
          , s = Ct(()=>{
            var d;
            const l = {};
            for (const u of t) {
                const f = ((d = u.properties) == null ? void 0 : d._vanga_cart_offer) === !0;
                l[u.product_id] = l[u.product_id] || f
            }
            return l
        }
        , [t]);
        return c(M, {
            children: [c("div", {
                className: "p-4 border-t border-black/10 bg-neutral-100 dark:bg-neutral-900 md:rounded-md md:border-0",
                children: i ? c(el, {
                    offer: i,
                    currencyCode: e.currencyCode,
                    onBack: ()=>o(null)
                }) : c(M, {
                    children: [c(Kc, {
                        promotion: e,
                        freeShipping: r
                    }), c("ul", {
                        role: "list",
                        className: "w-full divide-y divide-black/10 dark:divide-white/10",
                        children: n.map(l=>c(Qc, {
                            offer: l,
                            isAddedToCart: s[l.product.id],
                            currencyCode: e.currencyCode,
                            onAdd: ()=>o(l)
                        }, l.product.id))
                    })]
                })
            }), a && c("div", {
                className: "p-4 md:hidden",
                children: c(ci, {})
            })]
        })
    }
    function Kc({promotion: e, freeShipping: t}) {
        const {formatMoney: r} = ve()
          , {t: n} = G()
          , i = `${(e.discount * 100).toFixed(0)}%`;
        let o, a, s, l, d;
        if (t && t.minAmount.units > 0) {
            t.isUnlocked ? (o = c(Jc, {
                className: "w-5 h-5 text-brand-accent"
            }),
            a = n("free_shipping_unlocked")) : (o = c(Vc, {
                className: "w-5 h-5 text-brand-accent"
            }),
            a = n("free_shipping_condition", {
                amount: r(O(t.amountRemaining.units, t.amountRemaining.currencyCode))
            })),
            e.discount > 0 ? s = n("add_additional_product_with_discount", {
                discountInPercents: i
            }) : s = n("add_additional_product");
            const u = 100 - t.amountRemaining.units / t.minAmount.units * 100;
            l = c("div", {
                className: "mt-3 w-full h-1.5 bg-neutral-300 dark:bg-white/10 rounded-md overflow-hidden",
                children: c("div", {
                    className: "h-1.5 bg-brand-accent",
                    style: {
                        width: `${u}%`
                    }
                })
            }),
            d = !1
        } else
            e.discount > 0 ? (o = c(qc, {
                className: "w-3.5 h-3.5 text-brand-accent"
            }),
            a = n("add_additional_product_with_discount", {
                discountInPercents: i
            }),
            d = !0) : (o = c(Wc, {
                className: "w-4.5 h-4.5 text-brand-accent"
            }),
            a = n("you_might_also_like"),
            d = !0);
        return c("div", {
            className: "text-xs",
            children: c(M, {
                children: [c("div", {
                    className: "flex items-center",
                    children: [o, c("p", {
                        className: "ml-2 font-bold",
                        children: a
                    })]
                }), c("p", {
                    className: "ml-7",
                    children: s
                }), l, d && c("div", {
                    className: "pb-4 border-b border-black/10"
                })]
            })
        })
    }
    function Qc({offer: e, isAddedToCart: t, currencyCode: r, onAdd: n}) {
        const {isLoading: i} = Wt()
          , {formatMoney: o} = ve()
          , {t: a} = G()
          , {product: s} = e
          , l = s.variants[0]
          , d = Ci(s.handle)
          , u = o(O(l.price, r))
          , f = l.compareAtPrice ? o(O(l.compareAtPrice, r)) : null;
        return c("li", {
            className: "flex py-4 last:pb-0 space-x-2 text-xs",
            children: [c("div", {
                className: "flex-none",
                children: c("a", {
                    href: d,
                    children: l.imageUrl ? c(wr, {
                        src: l.imageUrl,
                        shape: "square",
                        size: "small"
                    }) : c(yi, {
                        shape: "square",
                        size: "small"
                    })
                })
            }), c("div", {
                className: "grow space-y-2",
                children: [c("a", {
                    href: d,
                    children: s.title
                }), c("div", {
                    className: "flex items-center space-x-2",
                    children: [f && c("p", {
                        className: "text-neutral-700 dark:text-neutral-300 line-through",
                        children: f
                    }), c("p", {
                        className: "font-bold",
                        children: u
                    })]
                })]
            }), c("div", {
                className: "flex-none self-center flex flex-col items-center space-y-1",
                children: [t && c("div", {
                    className: "flex items-center justify-center space-x-0.5",
                    children: [c(zc, {
                        className: "w-3.5 h-3.5 text-brand-accent"
                    }), c("span", {
                        className: "text-xs",
                        children: a("added")
                    })]
                }), c(ye, {
                    size: "medium",
                    onClick: n,
                    disabled: i,
                    children: a("add")
                })]
            })]
        }, s.id)
    }
    async function tl(e, t) {
        const {item: r, cartToken: n} = await _r(t);
        return Si(e, r, n)
    }
    function el({offer: e, currencyCode: t, onBack: r}) {
        const {cart: n, isLoading: i, setIsLoading: o, setError: a} = Wt()
          , {executeFetch: s} = Y("cart", we, {
            lazy: !0
        })
          , {executeFetch: l} = Y("cart", tl, {
            lazy: !0,
            onSuccess: ()=>{
                s(),
                r(),
                o(!1)
            }
            ,
            onError: N=>{
                s(),
                a(N),
                o(!1)
            }
        })
          , {formatMoney: d} = ve()
          , {t: u} = G()
          , {product: f} = e
          , [h,p] = I(f.variants[0])
          , [m,T] = I(1)
          , v = d(O(m * h.price, t));
        async function y() {
            a(null),
            o(!0),
            l(n, {
                id: h.id,
                quantity: m,
                properties: {
                    _vanga_cart_offer: !0
                }
            })
        }
        const k = H(N=>{
            const S = Number(N.currentTarget.value);
            S > 0 && T(S)
        }
        , [])
          , j = H(N=>{
            const S = Number(N.currentTarget.value)
              , ft = f.variants.find(({id: Nl})=>Nl === S);
            if (!ft)
                throw new Error(`Selected variant not found: ${S}`);
            p(ft)
        }
        , [f])
          , L = e.product.variants.length > 1 || e.product.variants.length === 1 && !rl(e.product.variants[0]);
        return c("div", {
            className: "space-y-2",
            children: [c("div", {
                className: "flex items-start justify-between space-x-2",
                children: [c("div", {
                    className: "space-y-1",
                    children: [c("button", {
                        type: "button",
                        onClick: r,
                        className: "-ml-1 flex items-center space-x-0.5 text-brand-accent",
                        children: [c(Zc, {
                            className: "w-5 h-5"
                        }), c("span", {
                            className: "text-xs",
                            children: u("back")
                        })]
                    }), c("p", {
                        className: "text-sm",
                        children: [c("span", {
                            className: "font-bold",
                            children: u("add")
                        }), " ", f.title]
                    })]
                }), c("div", {
                    className: "flex-none",
                    children: c("a", {
                        href: Ci(f.handle),
                        children: h.imageUrl ? c(wr, {
                            src: h.imageUrl,
                            shape: "square",
                            size: "small"
                        }) : c(yi, {
                            shape: "square",
                            size: "small"
                        })
                    })
                })]
            }), c("div", {
                className: "flex items-center space-x-2",
                children: [c("div", {
                    className: `${L ? "w-1/3" : "w-full"} input-with-floating-label`,
                    children: [c("label", {
                        htmlFor: "quantity",
                        children: u("quantity")
                    }), c("input", {
                        id: "quantity",
                        className: "w-full",
                        value: m,
                        type: "number",
                        min: "1",
                        onChange: k,
                        disabled: i
                    })]
                }), L && c("div", {
                    className: "w-2/3 input-with-floating-label",
                    children: [c("label", {
                        htmlFor: "variant",
                        children: f.options
                    }), c("select", {
                        id: "variant",
                        className: "w-full",
                        value: h.id,
                        onChange: j,
                        disabled: i,
                        children: f.variants.map(({id: N, title: S})=>c("option", {
                            value: N,
                            children: S
                        }, N))
                    })]
                })]
            }), c(ye, {
                size: "large",
                onClick: y,
                disabled: i,
                children: i ? c("div", {
                    className: "m-auto w-5 h-5",
                    children: c(yr, {})
                }) : u("add_to_cart", {
                    price: v
                })
            })]
        })
    }
    function rl(e) {
        return e.option1 === "Default Title" && !e.option2 && !e.option3
    }
    function Ci(e) {
        return `${window.Shopify.routes.root}products/${e}`
    }
    const Ni = "https://app.getvanga.com/api/";
    async function nl(e) {
        return Ti(()=>{
            const t = {
                ...e,
                shopify_domain: window.Shopify.shop,
                country_code: window.Shopify.country
            };
            return window.Shopify.designMode && (t.preview = window.Shopify.designMode),
            dr(`${Ni}cart_promotions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(t)
            })
        }
        )
    }
    async function il(e) {
        return Ti(()=>dr(`${Ni}cart_discounts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(e)
        }))
    }
    async function Ti(e) {
        let t;
        try {
            t = await e()
        } catch (n) {
            throw n instanceof Error ? new ot({
                options: {
                    cause: n
                }
            }) : new ot({
                message: JSON.stringify(n)
            })
        }
        if (t.status >= 500)
            throw new ur({
                metadata: {
                    status: t.status,
                    statusText: t.statusText
                }
            });
        if (t.status >= 400 && t.status <= 499)
            throw new ii({
                metadata: {
                    status: t.status,
                    statusText: t.statusText
                }
            });
        return await t.json()
    }
    const Ri = {
        createPromotion: nl,
        createDiscount: il
    };
    async function ol(e) {
        let t = null;
        if (_i(e.items).length === 0)
            return t;
        try {
            t = (await Ri.createDiscount({
                cart: {
                    token: e.token,
                    items: e.items.map(i=>({
                        variant_id: i.variant_id,
                        quantity: i.quantity,
                        properties: i.properties
                    }))
                }
            })).discount_code
        } catch (n) {
            B(n)
        }
        return t
    }
    const al = ()=>{
        const {requireConsent: e, termsAndConditionsUrl: t} = hr()
          , [r,n] = I(!1)
          , [i,o] = I(!1)
          , a = ()=>{
            n(l=>!l),
            o(!1)
        }
          , s = H(()=>{
            const l = !e || r;
            return o(!l),
            l
        }
        , [e, r]);
        return {
            control: {
                requireConsent: e,
                checked: r,
                toggleCheckbox: a,
                termsAndConditionsUrl: t,
                hasError: i
            },
            validate: s
        }
    }
    ;
    function sl({control: e}) {
        const {t} = G();
        return e.requireConsent ? c("div", {
            className: "text-sm",
            children: [c("div", {
                className: "mt-4 lg:flex lg:justify-end items-center",
                children: c("label", {
                    children: [c("input", {
                        className: "mr-2 w-4 h-4 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:focus:ring-black/30 focus:border-neutral-500 dark:focus:border-black/50",
                        type: "checkbox",
                        name: "terms_and_conditions",
                        checked: e.checked,
                        onChange: e.toggleCheckbox
                    }), c("span", {
                        className: "cursor-pointer",
                        children: c(cl, {
                            url: e.termsAndConditionsUrl
                        })
                    })]
                })
            }), e.hasError && c("div", {
                className: "text-xs mt-2 lg:flex lg:justify-end items-center text-red-700",
                children: t("terms_and_conditions_error")
            })]
        }) : null
    }
    function cl({url: e}) {
        const {t} = G()
          , r = t("terms_and_conditions_checkbox_message");
        if (!/%{link}/.test(r))
            return c("span", {
                children: r
            });
        const i = r.split("%{link}");
        return c("span", {
            children: i.map((o,a)=>a == i.length - 1 ? o ? c("span", {
                children: o
            }, a) : null : c("span", {
                children: [o && c("span", {
                    children: o
                }), c("a", {
                    href: e,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "underline",
                    children: t("terms_and_conditions_link_label")
                })]
            }, a))
        })
    }
    function Ai({discount: e, subtotal: t, freeShipping: r}) {
        const {cart: n, isLoading: i, setIsLoading: o} = Wt()
          , a = al()
          , [s,l] = I(!1)
          , {t: d} = G()
          , u = d(r ? "free" : "calculated_at_checkout")
          , f = i && !s
          , h = H(async()=>{
            if (!a.validate())
                return;
            o(!0),
            l(!0);
            const m = await ol(n)
              , T = `${window.Shopify.routes.root}checkout`
              , v = new URLSearchParams;
            m && v.set("discount", m);
            let y = v.toString();
            y.length > 0 && (y = `?${y}`),
            window.location.href = `${T}${y}`
        }
        , [n, o, a]);
        return c(M, {
            children: [c("dl", {
                className: "text-sm space-y-3",
                children: [e && c("div", {
                    className: "flex items-center justify-between",
                    children: [c(br, {
                        children: d("discount")
                    }), c(xr, {
                        isCalculating: f,
                        children: e
                    })]
                }), c("div", {
                    className: "flex items-center justify-between",
                    children: [c(br, {
                        children: d("subtotal")
                    }), c(xr, {
                        isCalculating: f,
                        children: t
                    })]
                }), c("div", {
                    className: "flex items-center justify-between",
                    children: [c(br, {
                        children: d("shipping")
                    }), c(xr, {
                        isCalculating: f,
                        children: u
                    })]
                })]
            }), c(sl, {
                control: a.control
            }), c("div", {
                className: "mt-4 lg:flex lg:justify-end",
                children: c("div", {
                    className: "w-auto",
                    children: c(ye, {
                        disabled: i || s,
                        onClick: h,
                        children: c("div", {
                            className: "relative flex items-center justify-center",
                            children: [i && c("div", {
                                className: "absolute w-5 h-5",
                                children: c(yr, {})
                            }), c("span", {
                                className: i ? "invisible" : "",
                                children: d("proceed_to_checkout")
                            })]
                        })
                    })
                })
            })]
        })
    }
    function br({children: e}) {
        return c("dt", {
            className: "font-medium",
            children: e
        })
    }
    function xr({isCalculating: e, children: t}) {
        return c("dd", {
            className: `font-bold ${e ? "font-normal animate-pulse" : ""}`,
            children: e ? "Calculating..." : t
        })
    }
    function ll() {
        return c("div", {
            className: "px-4 border-t border-black/10 bg-neutral-100 divide-y divide-black/10 md:rounded-md md:border-0",
            children: [c("div", {
                className: "py-4 flex items-center space-x-2",
                children: [c("div", {
                    className: "flex-none w-5 h-5 bg-black/10 rounded-full animate-pulse"
                }), c("div", {
                    className: "w-full h-3 bg-black/10 rounded-full animate-pulse"
                })]
            }), c(Ii, {}), c(Ii, {})]
        })
    }
    function Ii() {
        return c("div", {
            className: "py-4 flex space-x-2",
            children: [c("div", {
                className: "w-16 h-16 bg-black/10 rounded-md animate-pulse"
            }), c("div", {
                className: "space-y-2",
                children: [c("div", {
                    className: "w-48 h-3 bg-black/10 rounded-full animate-pulse"
                }), c("div", {
                    className: "w-36 h-2 bg-black/10 rounded-full animate-pulse"
                })]
            })]
        })
    }
    async function ul(e) {
        if (e.items.length === 0)
            return null;
        const {promotion: t} = await Ri.createPromotion({
            cart: {
                token: e.token,
                total_price: {
                    amount: e.total_price,
                    currency_code: e.currency
                },
                items: e.items.map(i=>({
                    product_id: i.product_id,
                    variant_id: i.variant_id,
                    quantity: i.quantity,
                    properties: i.properties
                }))
            }
        });
        if (!t)
            return null;
        let r;
        t.free_shipping && (r = {
            minAmount: O(t.free_shipping.min_amount.amount, t.free_shipping.min_amount.currency_code)
        });
        const n = await fl(t, e);
        return {
            discount: t.discount,
            freeShipping: r,
            currencyCode: t.currency_code,
            offers: t.offers.map(i=>({
                product: {
                    id: i.product.id,
                    handle: i.product.handle,
                    title: i.product.title,
                    variants: i.product.variants.map(o=>({
                        id: o.id,
                        discount: o.discount,
                        title: o.title,
                        imageUrl: o.image_url,
                        option1: o.option1,
                        option2: o.option2,
                        option3: o.option3,
                        ...dl(o, t.discount, n)
                    })),
                    options: i.product.options
                }
            }))
        }
    }
    function dl(e, t, r) {
        if (!r)
            return {
                price: e.price,
                compareAtPrice: e.compare_at_price
            };
        const n = r[e.id]
          , i = wi({
            units: n,
            discountRatio: t
        });
        return i > 0 ? {
            price: n - i,
            compareAtPrice: n
        } : {
            price: n,
            compareAtPrice: null
        }
    }
    async function fl(e, t) {
        if (e.currency_code === t.currency)
            return null;
        const r = e.offers.map(o=>o.product.handle)
          , n = await pl(r)
          , i = {};
        for (const o of n)
            for (const a of o.variants)
                i[a.id] = a.price;
        return i
    }
    async function pl(e) {
        return await Promise.all(e.map(hl))
    }
    async function hl(e) {
        return await (await fetch(`${window.Shopify.routes.root}products/${e}.js`, {
            method: "GET"
        })).json()
    }
    function ml() {
        const {cart: e, closeCart: t, error: r, setError: n} = Wt()
          , {data: i, loading: o, isFresh: a} = Y("promotion", ul, {
            args: [e]
        })
          , {showFreeShippingProgress: s} = hr()
          , {formatMoney: l} = ve()
          , {t: d} = G()
          , u = fi(r, d("something_went_wrong"))
          , f = _l(e, i, l);
        if (f.length === 0)
            return c(Yc, {
                onClose: t
            });
        const h = gl(e, i)
          , p = O(e.total_price - h.units, e.currency)
          , m = s ? vl(p, i) : null
          , T = m ? m.isUnlocked : !1
          , v = h.units > 0 ? l({
            amount: -h.amount,
            currencyCode: h.currencyCode,
            showCurrencyCode: !0
        }) : null
          , y = l({
            amount: p.amount,
            currencyCode: p.currencyCode,
            showCurrencyCode: !0
        })
          , k = i && i.offers.length > 0
          , j = o || k;
        return c("div", {
            className: "flex flex-col justify-between absolute inset-0 md:block md:static",
            children: [c("div", {
                className: "grid overflow-y-auto overscroll-y-contain md:grid-cols-2 lg:grid-cols-5",
                children: [c("div", {
                    className: "p-4 md:p-8 md:pt-0 md:col-span-1 lg:col-span-3",
                    children: c("h2", {
                        className: "text-3xl font-bold",
                        children: d("cart")
                    })
                }), c("div", {
                    className: "flex items-center justify-end p-4 md:col-span-2 md:row-start-1 md:p-0 md:pt-1 md:pr-1 lg:col-span-5",
                    children: c(_e, {
                        onClose: t
                    })
                }), c("div", {
                    className: `col-span-2 md:px-8 ${j ? "md:col-span-1 lg:col-span-3" : "md:col-span-2 lg:col-span-5"}`,
                    children: [u && c("div", {
                        className: "-mt-4 mb-4",
                        children: c(di, {
                            children: c("div", {
                                className: "px-4 py-3 flex justify-between items-center",
                                children: [c("p", {
                                    className: "text-sm",
                                    children: u
                                }), c(_e, {
                                    onClose: ()=>n(null),
                                    colorClass: "text-red-700 hover:text-red-800"
                                })]
                            })
                        })
                    }), c($c, {
                        items: f
                    })]
                }), j && c("div", {
                    className: "col-span-2 md:col-span-1 md:col-start-2 md:row-start-2 md:row-end-6 md:pr-8 md:pb-8 lg:col-span-2 lg:col-start-4",
                    children: o || !a ? c(ll, {}) : k && c(Xc, {
                        promotion: i,
                        cartItems: e.items,
                        freeShipping: m
                    })
                }), c("div", {
                    className: `hidden col-span-2 md:block md:px-8 md:pb-8 ${j ? "md:col-span-1 lg:col-span-3" : "md:col-span-2 lg:col-span-5"}`,
                    children: c("div", {
                        className: "pt-4 border-t border-black/10 dark:border-white/10",
                        children: c(Ai, {
                            discount: v,
                            subtotal: y,
                            freeShipping: T
                        })
                    })
                })]
            }), c("div", {
                className: "relative flex-none md:hidden",
                children: c("div", {
                    className: "p-4 pb-6 rounded-t-xl shadow-[0_-2px_10px_rgba(0,0,0,0.2)]",
                    children: c(Ai, {
                        discount: v,
                        subtotal: y,
                        freeShipping: T
                    })
                })
            })]
        })
    }
    function _l(e, t, r) {
        return e.items.length === 0 ? [] : e.items.map(n=>{
            let i = n.final_line_price
              , o = null;
            try {
                t && t.offers && t.offers.length > 0 && t.offers.forEach(a=>{
                    if (a.product.variants.map(s=>s.id).includes(n.variant_id)) {
                        const s = a.product.variants.find(d=>d.id == n.variant_id);
                        let l = s ? ((s == null ? void 0 : s.discount) || 0) / 100 : t.discount;
                        (s == null ? void 0 : s.price) && (s == null ? void 0 : s.compareAtPrice) && (s == null ? void 0 : s.compareAtPrice) > (s == null ? void 0 : s.price) && !(s != null && s.discount) && (l = s.price * 100 / s.compareAtPrice),
                        o = i,
                        i = i * (1 - l)
                    }
                }
                )
            } catch {}
            return {
                key: n.key,
                variantId: n.key,
                href: n.url,
                productTitle: n.product_title,
                variantTitle: n.variant_title,
                imageSrc: n.image,
                imageAlt: "product image",
                price: r(O(i, e.currency)),
                compareAtPrice: o && o > i ? r(O(o, e.currency)) : null,
                quantity: n.quantity,
                publicProperties: wl(n)
            }
        }
        )
    }
    function gl(e, t) {
        if (t === null)
            return O(0, e.currency);
        const r = e.items.reduce((n,i)=>{
            let o = !1
              , a = t.discount;
            try {
                t && t.offers && t.offers.length > 0 && t.offers.forEach(l=>{
                    if (l.product.variants.map(d=>d.id).includes(i.variant_id)) {
                        o = !0;
                        const d = l.product.variants.find(u=>u.id == i.variant_id);
                        a = d ? ((d == null ? void 0 : d.discount) || 0) / 100 : t.discount,
                        (d == null ? void 0 : d.price) && (d == null ? void 0 : d.compareAtPrice) && (d == null ? void 0 : d.compareAtPrice) > (d == null ? void 0 : d.price) && !(d != null && d.discount) && (a = d.price * 100 / d.compareAtPrice)
                    }
                }
                )
            } catch {}
            if (!o)
                return n;
            const s = wi({
                units: i.final_price,
                discountRatio: a,
                quantity: i.quantity
            });
            return n + s
        }
        , 0);
        return O(r, e.currency)
    }
    function vl(e, t) {
        if (!t || !t.freeShipping)
            return null;
        if (t.freeShipping.minAmount.units === 0)
            return {
                isUnlocked: !0,
                minAmount: O(0, e.currencyCode),
                amountRemaining: O(0, e.currencyCode)
            };
        if (t.freeShipping.minAmount.currencyCode !== e.currencyCode)
            return B(new Error("Shipping and cart currency missmatch")),
            null;
        const r = t.freeShipping.minAmount.units - e.units;
        return r > 0 ? {
            isUnlocked: !1,
            minAmount: t.freeShipping.minAmount,
            amountRemaining: O(r, e.currencyCode)
        } : {
            isUnlocked: !0,
            minAmount: t.freeShipping.minAmount,
            amountRemaining: O(0, e.currencyCode)
        }
    }
    function wl(e) {
        return e.properties === null ? [] : Object.entries(e.properties).filter(([t,r])=>{
            const n = t[0] !== "_"
              , i = r != null && r !== "";
            return n && i
        }
        ).map(([t,r])=>({
            name: t,
            value: r
        }))
    }
    function Di({cart: e, isOpened: t, onClose: r}) {
        return c(ui, {
            isOpened: t,
            onClose: r,
            children: c(Hc, {
                cart: e,
                closeCart: r,
                children: c(ml, {})
            })
        })
    }
    function kr() {
        return c("div", {
            className: "fixed inset-0 z-9999 bg-black/10 backdrop-blur-md",
            children: c("div", {
                className: "mt-96 mx-auto w-min h-min p-4 bg-black/60 rounded-lg shadow-xl",
                children: c("div", {
                    className: "w-6 h-6 text-white",
                    children: c(yr, {})
                })
            })
        })
    }
    function yl({onClose: e}) {
        const {loading: t, data: r, error: n} = Y("cart", we);
        if (t)
            return c(kr, {});
        if (n)
            throw n;
        if (r)
            return c(Di, {
                isOpened: !0,
                onClose: e,
                cart: r
            });
        throw new Error("Unreachable code")
    }
    function bl(e) {
        const t = new FormData(e);
        return {
            id: Number(t.get("id")),
            quantity: Number(t.get("quantity") || 1),
            properties: xl(t)
        }
    }
    function xl(e) {
        const t = /^properties\[(.+)\]/
          , r = {};
        for (const [n,i] of e) {
            const o = t.exec(n);
            if (!o)
                continue;
            const a = o[1]
              , s = i || "";
            r[a] = s.toString()
        }
        return r
    }
    function kl({cartToken: e, cartItem: t, onClose: r}) {
        const {loading: n, data: i, error: o, isFresh: a} = Y("cart", we);
        if (n)
            return c(kr, {});
        if (o)
            throw o;
        if (i) {
            const s = a ? i : Si(i, t, e);
            return c(Di, {
                isOpened: !0,
                onClose: r,
                cart: s
            })
        }
        throw new Error("Unreachable code")
    }
    function El({onClose: e, button: t, form: r}) {
        const n = Ct(()=>bl(r), [r])
          , {loading: i, data: o, error: a} = Y(null, _r, {
            args: [n]
        })
          , {appSettings: s} = hr();
        if (st(()=>(t.disabled = i,
        ()=>t.disabled = !1), [i, t]),
        i)
            return c(kr, {});
        if (a)
            throw a;
        if (o)
            return s.addToCartBehavior === "do_nothing" ? null : c(kl, {
                cartToken: o.cartToken,
                cartItem: o.item,
                onClose: e
            });
        throw new Error("Unreachable code")
    }
    function Sl() {
        Y("cart", we);
        const [e,t] = I(null)
          , [r,n] = I(null)
          , [i,o] = I(null);
        return st(()=>{
            window._VangaSmartCart.onClickHandler = Mc({
                addToCartForm: (a,s)=>{
                    t("addToCart"),
                    o(a),
                    n(s)
                }
                ,
                linkToCart: ()=>t("showCart")
            })
        }
        , []),
        e === "showCart" ? c(yl, {
            onClose: ()=>t(null)
        }) : e === "addToCart" && i && r ? c(El, {
            form: i,
            button: r,
            onClose: ()=>t(null)
        }) : null
    }
    function Cl() {
        if (js(navigator.userAgent))
            return;
        const e = document.getElementById("vanga-smartcart");
        if (!(window.Shopify.designMode || e.dataset.isSmartCartAvailable === "true"))
            return;
        const r = Us(e.dataset);
        Cs(),
        Es(e),
        As(e, r.theme);
        const n = e.attachShadow({
            mode: "open"
        });
        ks(c(M, {
            children: [c("style", {
                children: Ls
            }), c("div", {
                className: `font-sans ${r.theme.mode}`,
                children: c(Tc, {
                    settings: r,
                    children: c(pc, {
                        fallbackTranslations: r.translations,
                        translationsUpdatedAt: r.translationsUpdatedAt,
                        children: c(mc, {
                            theme: r.theme,
                            children: c(Nc, {
                                moneyFormat: r.moneyFormat,
                                locale: r.locale,
                                children: c(kc, {
                                    FallbackComponent: xc,
                                    children: c(Sl, {})
                                })
                            })
                        })
                    })
                })
            })]
        }), n)
    }
    Cl()
});
