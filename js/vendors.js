window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
    var t, i = (this.document || this.ownerDocument).querySelectorAll(e),
        a = this;
    do {
        for (t = i.length; 0 <= --t && i.item(t) !== a;);
    } while (t < 0 && (a = a.parentElement));
    return a
}),
    function () {
        function e(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
        }
        "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype, window.CustomEvent = e)
    }(),
    function () {
        for (var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (t, i) {
            var a = (new Date).getTime(),
                n = Math.max(0, 16 - (a - e)),
                r = window.setTimeout((function () {
                    t(a + n)
                }), n);
            return e = a + n, r
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
            clearTimeout(e)
        })
    }(),
    function (e, t) {
        "function" == typeof define && define.amd ? define([], (function () {
            return t(e)
        })) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e)
    }("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, (function (e) {
        "use strict";
        var t = {
            ignore: "[data-scroll-ignore]",
            header: null,
            topOnEmptyHash: !0,
            speed: 500,
            speedAsDuration: !1,
            durationMax: null,
            durationMin: null,
            clip: !0,
            offset: 0,
            easing: "easeInOutCubic",
            customEasing: null,
            updateURL: !0,
            popstate: !0,
            emitEvents: !0
        },
            i = function () {
                var e = {};
                return Array.prototype.forEach.call(arguments, (function (t) {
                    for (var i in t) {
                        if (!t.hasOwnProperty(i)) return;
                        e[i] = t[i]
                    }
                })), e
            },
            a = function (e) {
                "#" === e.charAt(0) && (e = e.substr(1));
                for (var t, i = String(e), a = i.length, n = -1, r = "", s = i.charCodeAt(0); ++n < a;) {
                    if (0 === (t = i.charCodeAt(n))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                    r += 1 <= t && t <= 31 || 127 == t || 0 === n && 48 <= t && t <= 57 || 1 === n && 48 <= t && t <= 57 && 45 === s ? "\\" + t.toString(16) + " " : 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? i.charAt(n) : "\\" + i.charAt(n)
                }
                return "#" + r
            },
            n = function () {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
            },
            r = function (t, i, a, n) {
                if (i.emitEvents && "function" == typeof e.CustomEvent) {
                    var r = new CustomEvent(t, {
                        bubbles: !0,
                        detail: {
                            anchor: a,
                            toggle: n
                        }
                    });
                    document.dispatchEvent(r)
                }
            };
        return function (s, o) {
            var l, d, u, c, p = {
                cancelScroll: function (e) {
                    cancelAnimationFrame(c), c = null, e || r("scrollCancel", l)
                }
            };
            p.animateScroll = function (a, s, o) {
                p.cancelScroll();
                var d = i(l || t, o || {}),
                    h = "[object Number]" === Object.prototype.toString.call(a),
                    f = h || !a.tagName ? null : a;
                if (h || f) {
                    var m = e.pageYOffset;
                    d.header && !u && (u = document.querySelector(d.header));
                    var v, g, y, w, b, E, x, S, T = function (t) {
                        return t ? (i = t, parseInt(e.getComputedStyle(i).height, 10) + t.offsetTop) : 0;
                        var i
                    }(u),
                        C = h ? a : function (t, i, a, r) {
                            var s = 0;
                            if (t.offsetParent)
                                for (; s += t.offsetTop, t = t.offsetParent;);
                            return s = Math.max(s - i - a, 0), r && (s = Math.min(s, n() - e.innerHeight)), s
                        }(f, T, parseInt("function" == typeof d.offset ? d.offset(a, s) : d.offset, 10), d.clip),
                        M = C - m,
                        z = n(),
                        _ = 0,
                        I = (v = M, y = (g = d).speedAsDuration ? g.speed : Math.abs(v / 1e3 * g.speed), g.durationMax && y > g.durationMax ? g.durationMax : g.durationMin && y < g.durationMin ? g.durationMin : parseInt(y, 10)),
                        P = function (t) {
                            var i, n, o;
                            w || (w = t), _ += t - w, E = m + M * (n = b = 1 < (b = 0 === I ? 0 : _ / I) ? 1 : b, "easeInQuad" === (i = d).easing && (o = n * n), "easeOutQuad" === i.easing && (o = n * (2 - n)), "easeInOutQuad" === i.easing && (o = n < .5 ? 2 * n * n : (4 - 2 * n) * n - 1), "easeInCubic" === i.easing && (o = n * n * n), "easeOutCubic" === i.easing && (o = --n * n * n + 1), "easeInOutCubic" === i.easing && (o = n < .5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1), "easeInQuart" === i.easing && (o = n * n * n * n), "easeOutQuart" === i.easing && (o = 1 - --n * n * n * n), "easeInOutQuart" === i.easing && (o = n < .5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n), "easeInQuint" === i.easing && (o = n * n * n * n * n), "easeOutQuint" === i.easing && (o = 1 + --n * n * n * n * n), "easeInOutQuint" === i.easing && (o = n < .5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n), i.customEasing && (o = i.customEasing(n)), o || n), e.scrollTo(0, Math.floor(E)),
                                function (t, i) {
                                    var n, o, l, u = e.pageYOffset;
                                    if (t == i || u == i || (m < i && e.innerHeight + u) >= z) return p.cancelScroll(!0), o = i, l = h, 0 === (n = a) && document.body.focus(), l || (n.focus(), document.activeElement !== n && (n.setAttribute("tabindex", "-1"), n.focus(), n.style.outline = "none"), e.scrollTo(0, o)), r("scrollStop", d, a, s), !(c = w = null)
                                }(E, C) || (c = e.requestAnimationFrame(P), w = t)
                        };
                    0 === e.pageYOffset && e.scrollTo(0, 0), x = a, S = d, h || history.pushState && S.updateURL && history.pushState({
                        smoothScroll: JSON.stringify(S),
                        anchor: x.id
                    }, document.title, x === document.documentElement ? "#top" : "#" + x.id), "matchMedia" in e && e.matchMedia("(prefers-reduced-motion)").matches ? e.scrollTo(0, Math.floor(C)) : (r("scrollStart", d, a, s), p.cancelScroll(!0), e.requestAnimationFrame(P))
                }
            };
            var h = function (t) {
                if (!t.defaultPrevented && !(0 !== t.button || t.metaKey || t.ctrlKey || t.shiftKey) && "closest" in t.target && (d = t.target.closest(s)) && "a" === d.tagName.toLowerCase() && !t.target.closest(l.ignore) && d.hostname === e.location.hostname && d.pathname === e.location.pathname && /#/.test(d.href)) {
                    var i, n;
                    try {
                        i = a(decodeURIComponent(d.hash))
                    } catch (t) {
                        i = a(d.hash)
                    }
                    if ("#" === i) {
                        if (!l.topOnEmptyHash) return;
                        n = document.documentElement
                    } else n = document.querySelector(i);
                    (n = n || "#top" !== i ? n : document.documentElement) && (t.preventDefault(), function (t) {
                        if (history.replaceState && t.updateURL && !history.state) {
                            var i = e.location.hash;
                            i = i || "", history.replaceState({
                                smoothScroll: JSON.stringify(t),
                                anchor: i || e.pageYOffset
                            }, document.title, i || e.location.href)
                        }
                    }(l), p.animateScroll(n, d))
                }
            },
                f = function (e) {
                    if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(l)) {
                        var t = history.state.anchor;
                        "string" == typeof t && t && !(t = document.querySelector(a(history.state.anchor))) || p.animateScroll(t, null, {
                            updateURL: !1
                        })
                    }
                };
            return p.destroy = function () {
                l && (document.removeEventListener("click", h, !1), e.removeEventListener("popstate", f, !1), p.cancelScroll(), c = u = d = l = null)
            },
                function () {
                    if (!("querySelector" in document && "addEventListener" in e && "requestAnimationFrame" in e && "closest" in e.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    p.destroy(), l = i(t, o || {}), u = l.header ? document.querySelector(l.header) : null, document.addEventListener("click", h, !1), l.updateURL && l.popstate && e.addEventListener("popstate", f, !1)
                }(), p
        }
    })),
    function (e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).ProgressBar = e()
        }
    }((function () {
        return function e(t, i, a) {
            function n(s, o) {
                if (!i[s]) {
                    if (!t[s]) {
                        var l = "function" == typeof require && require;
                        if (!o && l) return l(s, !0);
                        if (r) return r(s, !0);
                        var d = new Error("Cannot find module '" + s + "'");
                        throw d.code = "MODULE_NOT_FOUND", d
                    }
                    var u = i[s] = {
                        exports: {}
                    };
                    t[s][0].call(u.exports, (function (e) {
                        var i = t[s][1][e];
                        return n(i || e)
                    }), u, u.exports, e, t, i, a)
                }
                return i[s].exports
            }
            for (var r = "function" == typeof require && require, s = 0; s < a.length; s++) n(a[s]);
            return n
        }({
            1: [function (e, t, i) {
                (function () {
                    var e = this || Function("return this")(),
                        a = function () {
                            "use strict";

                            function a() { }

                            function n(e, t) {
                                var i;
                                for (i in e) Object.hasOwnProperty.call(e, i) && t(i)
                            }

                            function r(e, t) {
                                return n(t, (function (i) {
                                    e[i] = t[i]
                                })), e
                            }

                            function s(e, t) {
                                n(t, (function (i) {
                                    void 0 === e[i] && (e[i] = t[i])
                                }))
                            }

                            function o(e, t, i, a, n, r, s) {
                                var o, d, u, c = r > e ? 0 : (e - r) / n;
                                for (o in t) t.hasOwnProperty(o) && (u = "function" == typeof (d = s[o]) ? d : h[d], t[o] = l(i[o], a[o], u, c));
                                return t
                            }

                            function l(e, t, i, a) {
                                return e + (t - e) * i(a)
                            }

                            function d(e, t) {
                                var i = p.prototype.filter,
                                    a = e._filterArgs;
                                n(i, (function (n) {
                                    void 0 !== i[n][t] && i[n][t].apply(e, a)
                                }))
                            }

                            function u(e, t, i, a, n, r, s, l, u, c, p) {
                                m = t + i + a, v = Math.min(p || x(), m), g = v >= m, y = a - (m - v), e.isPlaying() && (g ? (u(s, e._attachment, y), e.stop(!0)) : (e._scheduleId = c(e._timeoutHandler, b), d(e, "beforeTween"), t + i > v ? o(1, n, r, s, 1, 1, l) : o(v, n, r, s, a, t + i, l), d(e, "afterTween"), u(n, e._attachment, y)))
                            }

                            function c(e, t) {
                                var i = {},
                                    a = typeof t;
                                return n(e, "string" === a || "function" === a ? function (e) {
                                    i[e] = t
                                } : function (e) {
                                    i[e] || (i[e] = t[e] || w)
                                }), i
                            }

                            function p(e, t) {
                                this._currentState = e || {}, this._configured = !1, this._scheduleFunction = f, void 0 !== t && this.setConfig(t)
                            }
                            var h, f, m, v, g, y, w = "linear",
                                b = 1e3 / 60,
                                E = Date.now ? Date.now : function () {
                                    return +new Date
                                },
                                x = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : E;
                            return f = "undefined" != typeof window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) || setTimeout, p.prototype.tween = function (e) {
                                return this._isTweening ? this : (void 0 === e && this._configured || this.setConfig(e), this._timestamp = x(), this._start(this.get(), this._attachment), this.resume())
                            }, p.prototype.setConfig = function (e) {
                                e = e || {}, this._configured = !0, this._attachment = e.attachment, this._pausedAtTime = null, this._scheduleId = null, this._delay = e.delay || 0, this._start = e.start || a, this._step = e.step || a, this._finish = e.finish || a, this._duration = e.duration || 500, this._currentState = r({}, e.from) || this.get(), this._originalState = this.get(), this._targetState = r({}, e.to) || this.get();
                                var t = this;
                                this._timeoutHandler = function () {
                                    u(t, t._timestamp, t._delay, t._duration, t._currentState, t._originalState, t._targetState, t._easing, t._step, t._scheduleFunction)
                                };
                                var i = this._currentState,
                                    n = this._targetState;
                                return s(n, i), this._easing = c(i, e.easing || w), this._filterArgs = [i, this._originalState, n, this._easing], d(this, "tweenCreated"), this
                            }, p.prototype.get = function () {
                                return r({}, this._currentState)
                            }, p.prototype.set = function (e) {
                                this._currentState = e
                            }, p.prototype.pause = function () {
                                return this._pausedAtTime = x(), this._isPaused = !0, this
                            }, p.prototype.resume = function () {
                                return this._isPaused && (this._timestamp += x() - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0, this._timeoutHandler(), this
                            }, p.prototype.seek = function (e) {
                                e = Math.max(e, 0);
                                var t = x();
                                return this._timestamp + e === 0 || (this._timestamp = t - e, this.isPlaying() || (this._isTweening = !0, this._isPaused = !1, u(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, t), this.pause())), this
                            }, p.prototype.stop = function (t) {
                                return this._isTweening = !1, this._isPaused = !1, this._timeoutHandler = a, (e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.oCancelAnimationFrame || e.msCancelAnimationFrame || e.mozCancelRequestAnimationFrame || e.clearTimeout)(this._scheduleId), t && (d(this, "beforeTween"), o(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), d(this, "afterTween"), d(this, "afterTweenEnd"), this._finish.call(this, this._currentState, this._attachment)), this
                            }, p.prototype.isPlaying = function () {
                                return this._isTweening && !this._isPaused
                            }, p.prototype.setScheduleFunction = function (e) {
                                this._scheduleFunction = e
                            }, p.prototype.dispose = function () {
                                var e;
                                for (e in this) this.hasOwnProperty(e) && delete this[e]
                            }, p.prototype.filter = {}, p.prototype.formula = {
                                linear: function (e) {
                                    return e
                                }
                            }, h = p.prototype.formula, r(p, {
                                now: x,
                                each: n,
                                tweenProps: o,
                                tweenProp: l,
                                applyFilter: d,
                                shallowCopy: r,
                                defaults: s,
                                composeEasingObject: c
                            }), "function" == typeof SHIFTY_DEBUG_NOW && (e.timeoutHandler = u), "object" == typeof i ? t.exports = p : void 0 === e.Tweenable && (e.Tweenable = p), p
                        }();
                    a.shallowCopy(a.prototype.formula, {
                        easeInQuad: function (e) {
                            return Math.pow(e, 2)
                        },
                        easeOutQuad: function (e) {
                            return -(Math.pow(e - 1, 2) - 1)
                        },
                        easeInOutQuad: function (e) {
                            return (e /= .5) < 1 ? .5 * Math.pow(e, 2) : -.5 * ((e -= 2) * e - 2)
                        },
                        easeInCubic: function (e) {
                            return Math.pow(e, 3)
                        },
                        easeOutCubic: function (e) {
                            return Math.pow(e - 1, 3) + 1
                        },
                        easeInOutCubic: function (e) {
                            return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
                        },
                        easeInQuart: function (e) {
                            return Math.pow(e, 4)
                        },
                        easeOutQuart: function (e) {
                            return -(Math.pow(e - 1, 4) - 1)
                        },
                        easeInOutQuart: function (e) {
                            return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
                        },
                        easeInQuint: function (e) {
                            return Math.pow(e, 5)
                        },
                        easeOutQuint: function (e) {
                            return Math.pow(e - 1, 5) + 1
                        },
                        easeInOutQuint: function (e) {
                            return (e /= .5) < 1 ? .5 * Math.pow(e, 5) : .5 * (Math.pow(e - 2, 5) + 2)
                        },
                        easeInSine: function (e) {
                            return 1 - Math.cos(e * (Math.PI / 2))
                        },
                        easeOutSine: function (e) {
                            return Math.sin(e * (Math.PI / 2))
                        },
                        easeInOutSine: function (e) {
                            return -.5 * (Math.cos(Math.PI * e) - 1)
                        },
                        easeInExpo: function (e) {
                            return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
                        },
                        easeOutExpo: function (e) {
                            return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
                        },
                        easeInOutExpo: function (e) {
                            return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * --e))
                        },
                        easeInCirc: function (e) {
                            return -(Math.sqrt(1 - e * e) - 1)
                        },
                        easeOutCirc: function (e) {
                            return Math.sqrt(1 - Math.pow(e - 1, 2))
                        },
                        easeInOutCirc: function (e) {
                            return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                        },
                        easeOutBounce: function (e) {
                            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                        },
                        easeInBack: function (e) {
                            var t = 1.70158;
                            return e * e * ((t + 1) * e - t)
                        },
                        easeOutBack: function (e) {
                            var t = 1.70158;
                            return (e -= 1) * e * ((t + 1) * e + t) + 1
                        },
                        easeInOutBack: function (e) {
                            var t = 1.70158;
                            return (e /= .5) < 1 ? e * e * ((1 + (t *= 1.525)) * e - t) * .5 : .5 * ((e -= 2) * e * ((1 + (t *= 1.525)) * e + t) + 2)
                        },
                        elastic: function (e) {
                            return -1 * Math.pow(4, -8 * e) * Math.sin((6 * e - 1) * (2 * Math.PI) / 2) + 1
                        },
                        swingFromTo: function (e) {
                            var t = 1.70158;
                            return (e /= .5) < 1 ? e * e * ((1 + (t *= 1.525)) * e - t) * .5 : .5 * ((e -= 2) * e * ((1 + (t *= 1.525)) * e + t) + 2)
                        },
                        swingFrom: function (e) {
                            var t = 1.70158;
                            return e * e * ((t + 1) * e - t)
                        },
                        swingTo: function (e) {
                            var t = 1.70158;
                            return (e -= 1) * e * ((t + 1) * e + t) + 1
                        },
                        bounce: function (e) {
                            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                        },
                        bouncePast: function (e) {
                            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
                        },
                        easeFromTo: function (e) {
                            return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
                        },
                        easeFrom: function (e) {
                            return Math.pow(e, 4)
                        },
                        easeTo: function (e) {
                            return Math.pow(e, .25)
                        }
                    }),
                        function () {
                            function e(e, t, i, a, n, r) {
                                function s(e) {
                                    return ((d * e + u) * e + c) * e
                                }

                                function o(e) {
                                    return (3 * d * e + 2 * u) * e + c
                                }

                                function l(e) {
                                    return e >= 0 ? e : 0 - e
                                }
                                var d = 0,
                                    u = 0,
                                    c = 0,
                                    p = 0,
                                    h = 0,
                                    f = 0;
                                return d = 1 - (c = 3 * t) - (u = 3 * (a - t) - c), p = 1 - (f = 3 * i) - (h = 3 * (n - i) - f),
                                    function (e, t) {
                                        return function (e) {
                                            return ((p * e + h) * e + f) * e
                                        }(function (e, t) {
                                            var i, a, n, r, d, u;
                                            for (n = e, u = 0; 8 > u; u++) {
                                                if (l(r = s(n) - e) < t) return n;
                                                if (l(d = o(n)) < 1e-6) break;
                                                n -= r / d
                                            }
                                            if (a = 1, (i = 0) > (n = e)) return i;
                                            if (n > a) return a;
                                            for (; a > i;) {
                                                if (l((r = s(n)) - e) < t) return n;
                                                e > r ? i = n : a = n, n = .5 * (a - i) + i
                                            }
                                            return n
                                        }(e, t))
                                    }(e, function (e) {
                                        return 1 / (200 * e)
                                    }(r))
                            }

                            function t(t, i, a, n) {
                                return function (r) {
                                    return e(r, t, i, a, n, 1)
                                }
                            }
                            a.setBezierFunction = function (e, i, n, r, s) {
                                var o = t(i, n, r, s);
                                return o.displayName = e, o.x1 = i, o.y1 = n, o.x2 = r, o.y2 = s, a.prototype.formula[e] = o
                            }, a.unsetBezierFunction = function (e) {
                                delete a.prototype.formula[e]
                            }
                        }(),
                        function () {
                            var e = new a;
                            e._filterArgs = [], a.interpolate = function (t, i, n, r, s) {
                                var o = a.shallowCopy({}, t),
                                    l = s || 0,
                                    d = a.composeEasingObject(t, r || "linear");
                                e.set({});
                                var u = e._filterArgs;
                                u.length = 0, u[0] = o, u[1] = t, u[2] = i, u[3] = d, a.applyFilter(e, "tweenCreated"), a.applyFilter(e, "beforeTween");
                                var c = function (e, t, i, n, r, s) {
                                    return a.tweenProps(n, t, e, i, 1, s, r)
                                }(t, o, i, n, d, l);
                                return a.applyFilter(e, "afterTween"), c
                            }
                        }(),
                        function (e) {
                            function t(e, t) {
                                var i, a = [],
                                    n = e.length;
                                for (i = 0; n > i; i++) a.push("_" + t + "_" + i);
                                return a
                            }

                            function i(e) {
                                var t = e.match(m);
                                return t ? (1 === t.length || e[0].match(f)) && t.unshift("") : t = ["", ""], t.join(b)
                            }

                            function a(t) {
                                e.each(t, (function (e) {
                                    var i = t[e];
                                    "string" == typeof i && i.match(w) && (t[e] = function (e) {
                                        return s(w, e, n)
                                    }(i))
                                }))
                            }

                            function n(e) {
                                var t = function (e) {
                                    return 3 === (e = e.replace(/#/, "")).length && (e = (e = e.split(""))[0] + e[0] + e[1] + e[1] + e[2] + e[2]), E[0] = r(e.substr(0, 2)), E[1] = r(e.substr(2, 2)), E[2] = r(e.substr(4, 2)), E
                                }(e);
                                return "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
                            }

                            function r(e) {
                                return parseInt(e, 16)
                            }

                            function s(e, t, i) {
                                var a = t.match(e),
                                    n = t.replace(e, b);
                                if (a)
                                    for (var r, s = a.length, o = 0; s > o; o++) r = a.shift(), n = n.replace(b, i(r));
                                return n
                            }

                            function o(e) {
                                for (var t = e.match(v), i = t.length, a = e.match(y)[0], n = 0; i > n; n++) a += parseInt(t[n], 10) + ",";
                                return a.slice(0, -1) + ")"
                            }

                            function l(a) {
                                var n = {};
                                return e.each(a, (function (e) {
                                    var r = a[e];
                                    if ("string" == typeof r) {
                                        var s = c(r);
                                        n[e] = {
                                            formatString: i(r),
                                            chunkNames: t(s, e)
                                        }
                                    }
                                })), n
                            }

                            function d(t, i) {
                                e.each(i, (function (e) {
                                    for (var a = c(t[e]), n = a.length, r = 0; n > r; r++) t[i[e].chunkNames[r]] = +a[r];
                                    delete t[e]
                                }))
                            }

                            function u(t, i) {
                                e.each(i, (function (e) {
                                    var a = t[e],
                                        n = function (e, t) {
                                            x.length = 0;
                                            for (var i = t.length, a = 0; i > a; a++) x.push(e[t[a]]);
                                            return x
                                        }(function (e, t) {
                                            for (var i, a = {}, n = t.length, r = 0; n > r; r++) i = t[r], a[i] = e[i], delete e[i];
                                            return a
                                        }(t, i[e].chunkNames), i[e].chunkNames);
                                    a = function (e, t) {
                                        for (var i = e, a = t.length, n = 0; a > n; n++) i = i.replace(b, +t[n].toFixed(4));
                                        return i
                                    }(i[e].formatString, n), t[e] = function (e) {
                                        return s(g, e, o)
                                    }(a)
                                }))
                            }

                            function c(e) {
                                return e.match(v)
                            }

                            function p(t, i) {
                                e.each(i, (function (e) {
                                    var a, n = i[e].chunkNames,
                                        r = n.length,
                                        s = t[e];
                                    if ("string" == typeof s) {
                                        var o = s.split(" "),
                                            l = o[o.length - 1];
                                        for (a = 0; r > a; a++) t[n[a]] = o[a] || l
                                    } else
                                        for (a = 0; r > a; a++) t[n[a]] = s;
                                    delete t[e]
                                }))
                            }

                            function h(t, i) {
                                e.each(i, (function (e) {
                                    var a = i[e].chunkNames,
                                        n = a.length,
                                        r = t[a[0]];
                                    if ("string" === typeof r) {
                                        for (var s = "", o = 0; n > o; o++) s += " " + t[a[o]], delete t[a[o]];
                                        t[e] = s.substr(1)
                                    } else t[e] = r
                                }))
                            }
                            var f = /(\d|\-|\.)/,
                                m = /([^\-0-9\.]+)/g,
                                v = /[0-9.\-]+/g,
                                g = new RegExp("rgb\\(" + v.source + /,\s*/.source + v.source + /,\s*/.source + v.source + "\\)", "g"),
                                y = /^.*\(/,
                                w = /#([0-9]|[a-f]){3,6}/gi,
                                b = "VAL",
                                E = [],
                                x = [];
                            e.prototype.filter.token = {
                                tweenCreated: function (e, t, i, n) {
                                    a(e), a(t), a(i), this._tokenData = l(e)
                                },
                                beforeTween: function (e, t, i, a) {
                                    p(a, this._tokenData), d(e, this._tokenData), d(t, this._tokenData), d(i, this._tokenData)
                                },
                                afterTween: function (e, t, i, a) {
                                    u(e, this._tokenData), u(t, this._tokenData), u(i, this._tokenData), h(a, this._tokenData)
                                }
                            }
                        }(a)
                }).call(null)
            }, {}],
            2: [function (e, t, i) {
                var a = e("./shape"),
                    n = e("./utils"),
                    r = function (e, t) {
                        this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", this.containerAspectRatio = 1, a.apply(this, arguments)
                    };
                (r.prototype = new a).constructor = r, r.prototype._pathString = function (e) {
                    var t = e.strokeWidth;
                    e.trailWidth && e.trailWidth > e.strokeWidth && (t = e.trailWidth);
                    var i = 50 - t / 2;
                    return n.render(this._pathTemplate, {
                        radius: i,
                        "2radius": 2 * i
                    })
                }, r.prototype._trailString = function (e) {
                    return this._pathString(e)
                }, t.exports = r
            }, {
                "./shape": 7,
                "./utils": 8
            }],
            3: [function (e, t, i) {
                var a = e("./shape"),
                    n = e("./utils"),
                    r = function (e, t) {
                        this._pathTemplate = "M 0,{center} L 100,{center}", a.apply(this, arguments)
                    };
                (r.prototype = new a).constructor = r, r.prototype._initializeSvg = function (e, t) {
                    e.setAttribute("viewBox", "0 0 100 " + t.strokeWidth), e.setAttribute("preserveAspectRatio", "none")
                }, r.prototype._pathString = function (e) {
                    return n.render(this._pathTemplate, {
                        center: e.strokeWidth / 2
                    })
                }, r.prototype._trailString = function (e) {
                    return this._pathString(e)
                }, t.exports = r
            }, {
                "./shape": 7,
                "./utils": 8
            }],
            4: [function (e, t, i) {
                t.exports = {
                    Line: e("./line"),
                    Circle: e("./circle"),
                    SemiCircle: e("./semicircle"),
                    Path: e("./path"),
                    Shape: e("./shape"),
                    utils: e("./utils")
                }
            }, {
                "./circle": 2,
                "./line": 3,
                "./path": 5,
                "./semicircle": 6,
                "./shape": 7,
                "./utils": 8
            }],
            5: [function (e, t, i) {
                var a = e("shifty"),
                    n = e("./utils"),
                    r = {
                        easeIn: "easeInCubic",
                        easeOut: "easeOutCubic",
                        easeInOut: "easeInOutCubic"
                    },
                    s = function e(t, i) {
                        if (!(this instanceof e)) throw new Error("Constructor was called without new keyword");
                        var a;
                        i = n.extend({
                            duration: 800,
                            easing: "linear",
                            from: {},
                            to: {},
                            step: function () { }
                        }, i), a = n.isString(t) ? document.querySelector(t) : t, this.path = a, this._opts = i, this._tweenable = null;
                        var r = this.path.getTotalLength();
                        this.path.style.strokeDasharray = r + " " + r, this.set(0)
                    };
                s.prototype.value = function () {
                    var e = this._getComputedDashOffset(),
                        t = this.path.getTotalLength();
                    return parseFloat((1 - e / t).toFixed(6), 10)
                }, s.prototype.set = function (e) {
                    this.stop(), this.path.style.strokeDashoffset = this._progressToOffset(e);
                    var t = this._opts.step;
                    if (n.isFunction(t)) {
                        var i = this._easing(this._opts.easing);
                        t(this._calculateTo(e, i), this._opts.shape || this, this._opts.attachment)
                    }
                }, s.prototype.stop = function () {
                    this._stopTween(), this.path.style.strokeDashoffset = this._getComputedDashOffset()
                }, s.prototype.animate = function (e, t, i) {
                    t = t || {}, n.isFunction(t) && (i = t, t = {});
                    var r = n.extend({}, t),
                        s = n.extend({}, this._opts);
                    t = n.extend(s, t);
                    var o = this._easing(t.easing),
                        l = this._resolveFromAndTo(e, o, r);
                    this.stop(), this.path.getBoundingClientRect();
                    var d = this._getComputedDashOffset(),
                        u = this._progressToOffset(e),
                        c = this;
                    this._tweenable = new a, this._tweenable.tween({
                        from: n.extend({
                            offset: d
                        }, l.from),
                        to: n.extend({
                            offset: u
                        }, l.to),
                        duration: t.duration,
                        easing: o,
                        step: function (e) {
                            c.path.style.strokeDashoffset = e.offset;
                            var i = t.shape || c;
                            t.step(e, i, t.attachment)
                        },
                        finish: function (e) {
                            n.isFunction(i) && i()
                        }
                    })
                }, s.prototype._getComputedDashOffset = function () {
                    var e = window.getComputedStyle(this.path, null);
                    return parseFloat(e.getPropertyValue("stroke-dashoffset"), 10)
                }, s.prototype._progressToOffset = function (e) {
                    var t = this.path.getTotalLength();
                    return t - e * t
                }, s.prototype._resolveFromAndTo = function (e, t, i) {
                    return i.from && i.to ? {
                        from: i.from,
                        to: i.to
                    } : {
                        from: this._calculateFrom(t),
                        to: this._calculateTo(e, t)
                    }
                }, s.prototype._calculateFrom = function (e) {
                    return a.interpolate(this._opts.from, this._opts.to, this.value(), e)
                }, s.prototype._calculateTo = function (e, t) {
                    return a.interpolate(this._opts.from, this._opts.to, e, t)
                }, s.prototype._stopTween = function () {
                    null !== this._tweenable && (this._tweenable.stop(), this._tweenable = null)
                }, s.prototype._easing = function (e) {
                    return r.hasOwnProperty(e) ? r[e] : e
                }, t.exports = s
            }, {
                "./utils": 8,
                shifty: 1
            }],
            6: [function (e, t, i) {
                var a = e("./shape"),
                    n = e("./circle"),
                    r = e("./utils"),
                    s = function (e, t) {
                        this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0", this.containerAspectRatio = 2, a.apply(this, arguments)
                    };
                (s.prototype = new a).constructor = s, s.prototype._initializeSvg = function (e, t) {
                    e.setAttribute("viewBox", "0 0 100 50")
                }, s.prototype._initializeTextContainer = function (e, t, i) {
                    e.text.style && (i.style.top = "auto", i.style.bottom = "0", e.text.alignToBottom ? r.setStyle(i, "transform", "translate(-50%, 0)") : r.setStyle(i, "transform", "translate(-50%, 50%)"))
                }, s.prototype._pathString = n.prototype._pathString, s.prototype._trailString = n.prototype._trailString, t.exports = s
            }, {
                "./circle": 2,
                "./shape": 7,
                "./utils": 8
            }],
            7: [function (e, t, i) {
                var a = e("./path"),
                    n = e("./utils"),
                    r = "Object is destroyed",
                    s = function e(t, i) {
                        if (!(this instanceof e)) throw new Error("Constructor was called without new keyword");
                        if (0 !== arguments.length) {
                            this._opts = n.extend({
                                color: "#555",
                                strokeWidth: 1,
                                trailColor: null,
                                trailWidth: null,
                                fill: null,
                                text: {
                                    style: {
                                        color: null,
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        padding: 0,
                                        margin: 0,
                                        transform: {
                                            prefix: !0,
                                            value: "translate(-50%, -50%)"
                                        }
                                    },
                                    autoStyleContainer: !0,
                                    alignToBottom: !0,
                                    value: null,
                                    className: "progressbar-text"
                                },
                                svgStyle: {
                                    display: "block",
                                    width: "100%"
                                },
                                warnings: !1
                            }, i, !0), n.isObject(i) && void 0 !== i.svgStyle && (this._opts.svgStyle = i.svgStyle), n.isObject(i) && n.isObject(i.text) && void 0 !== i.text.style && (this._opts.text.style = i.text.style);
                            var r, s = this._createSvgView(this._opts);
                            if (!(r = n.isString(t) ? document.querySelector(t) : t)) throw new Error("Container does not exist: " + t);
                            this._container = r, this._container.appendChild(s.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && n.setStyles(s.svg, this._opts.svgStyle), this.svg = s.svg, this.path = s.path, this.trail = s.trail, this.text = null;
                            var o = n.extend({
                                attachment: void 0,
                                shape: this
                            }, this._opts);
                            this._progressPath = new a(s.path, o), n.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value)
                        }
                    };
                s.prototype.animate = function (e, t, i) {
                    if (null === this._progressPath) throw new Error(r);
                    this._progressPath.animate(e, t, i)
                }, s.prototype.stop = function () {
                    if (null === this._progressPath) throw new Error(r);
                    void 0 !== this._progressPath && this._progressPath.stop()
                }, s.prototype.destroy = function () {
                    if (null === this._progressPath) throw new Error(r);
                    this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, this._progressPath = null, null !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null)
                }, s.prototype.set = function (e) {
                    if (null === this._progressPath) throw new Error(r);
                    this._progressPath.set(e)
                }, s.prototype.value = function () {
                    if (null === this._progressPath) throw new Error(r);
                    return void 0 === this._progressPath ? 0 : this._progressPath.value()
                }, s.prototype.setText = function (e) {
                    if (null === this._progressPath) throw new Error(r);
                    null === this.text && (this.text = this._createTextContainer(this._opts, this._container), this._container.appendChild(this.text)), n.isObject(e) ? (n.removeChildren(this.text), this.text.appendChild(e)) : this.text.innerHTML = e
                }, s.prototype._createSvgView = function (e) {
                    var t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    this._initializeSvg(t, e);
                    var i = null;
                    (e.trailColor || e.trailWidth) && (i = this._createTrail(e), t.appendChild(i));
                    var a = this._createPath(e);
                    return t.appendChild(a), {
                        svg: t,
                        path: a,
                        trail: i
                    }
                }, s.prototype._initializeSvg = function (e, t) {
                    e.setAttribute("viewBox", "0 0 100 100")
                }, s.prototype._createPath = function (e) {
                    var t = this._pathString(e);
                    return this._createPathElement(t, e)
                }, s.prototype._createTrail = function (e) {
                    var t = this._trailString(e),
                        i = n.extend({}, e);
                    return i.trailColor || (i.trailColor = "#eee"), i.trailWidth || (i.trailWidth = i.strokeWidth), i.color = i.trailColor, i.strokeWidth = i.trailWidth, i.fill = null, this._createPathElement(t, i)
                }, s.prototype._createPathElement = function (e, t) {
                    var i = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    return i.setAttribute("d", e), i.setAttribute("stroke", t.color), i.setAttribute("stroke-width", t.strokeWidth), t.fill ? i.setAttribute("fill", t.fill) : i.setAttribute("fill-opacity", "0"), i
                }, s.prototype._createTextContainer = function (e, t) {
                    var i = document.createElement("div");
                    i.className = e.text.className;
                    var a = e.text.style;
                    return a && (e.text.autoStyleContainer && (t.style.position = "relative"), n.setStyles(i, a), a.color || (i.style.color = e.color)), this._initializeTextContainer(e, t, i), i
                }, s.prototype._initializeTextContainer = function (e, t, i) { }, s.prototype._pathString = function (e) {
                    throw new Error("Override this function for each progress bar")
                }, s.prototype._trailString = function (e) {
                    throw new Error("Override this function for each progress bar")
                }, s.prototype._warnContainerAspectRatio = function (e) {
                    if (this.containerAspectRatio) {
                        var t = window.getComputedStyle(e, null),
                            i = parseFloat(t.getPropertyValue("width"), 10),
                            a = parseFloat(t.getPropertyValue("height"), 10);
                        n.floatEquals(this.containerAspectRatio, i / a) || (console.warn("Incorrect aspect ratio of container", "#" + e.id, "detected:", t.getPropertyValue("width") + "(width)", "/", t.getPropertyValue("height") + "(height)", "=", i / a), console.warn("Aspect ratio of should be", this.containerAspectRatio))
                    }
                }, t.exports = s
            }, {
                "./path": 5,
                "./utils": 8
            }],
            8: [function (e, t, i) {
                function a(e, t, i) {
                    for (var a = e.style, r = 0; r < o.length; ++r) {
                        a[o[r] + n(t)] = i
                    }
                    a[t] = i
                }

                function n(e) {
                    return e.charAt(0).toUpperCase() + e.slice(1)
                }

                function r(e) {
                    return ! function (e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    }(e) && ("object" === typeof e && !!e)
                }

                function s(e, t) {
                    for (var i in e)
                        if (e.hasOwnProperty(i)) {
                            t(e[i], i)
                        }
                }
                var o = "Webkit Moz O ms".split(" "),
                    l = .001;
                t.exports = {
                    extend: function e(t, i, a) {
                        for (var n in t = t || {}, a = a || !1, i = i || {})
                            if (i.hasOwnProperty(n)) {
                                var s = t[n],
                                    o = i[n];
                                a && r(s) && r(o) ? t[n] = e(s, o, a) : t[n] = o
                            }
                        return t
                    },
                    render: function (e, t) {
                        var i = e;
                        for (var a in t)
                            if (t.hasOwnProperty(a)) {
                                var n = t[a],
                                    r = new RegExp("\\{" + a + "\\}", "g");
                                i = i.replace(r, n)
                            }
                        return i
                    },
                    setStyle: a,
                    setStyles: function (e, t) {
                        s(t, (function (t, i) {
                            null != t && (r(t) && !0 === t.prefix ? a(e, i, t.value) : e.style[i] = t)
                        }))
                    },
                    capitalize: n,
                    isString: function (e) {
                        return "string" == typeof e || e instanceof String
                    },
                    isFunction: function (e) {
                        return "function" == typeof e
                    },
                    isObject: r,
                    forEachObject: s,
                    floatEquals: function (e, t) {
                        return Math.abs(e - t) < l
                    },
                    removeChildren: function (e) {
                        for (; e.firstChild;) e.removeChild(e.firstChild)
                    }
                }
            }, {}]
        }, {}, [4])(4)
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function (i) {
            return t(e, i)
        })) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
    }(window, (function (e, t) {
        "use strict";

        function i(i, r, o) {
            function l(e, t, a) {
                var n, r = "$()." + i + '("' + t + '")';
                return e.each((function (e, l) {
                    var d = o.data(l, i);
                    if (d) {
                        var u = d[t];
                        if (u && "_" != t.charAt(0)) {
                            var c = u.apply(d, a);
                            n = void 0 === n ? c : n
                        } else s(r + " is not a valid method")
                    } else s(i + " not initialized. Cannot call methods, i.e. " + r)
                })), void 0 !== n ? n : e
            }

            function d(e, t) {
                e.each((function (e, a) {
                    var n = o.data(a, i);
                    n ? (n.option(t), n._init()) : (n = new r(a, t), o.data(a, i, n))
                }))
            } (o = o || t || e.jQuery) && (r.prototype.option || (r.prototype.option = function (e) {
                o.isPlainObject(e) && (this.options = o.extend(!0, this.options, e))
            }), o.fn[i] = function (e) {
                if ("string" == typeof e) {
                    var t = n.call(arguments, 1);
                    return l(this, e, t)
                }
                return d(this, e), this
            }, a(o))
        }

        function a(e) {
            !e || e && e.bridget || (e.bridget = i)
        }
        var n = Array.prototype.slice,
            r = e.console,
            s = void 0 === r ? function () { } : function (e) {
                r.error(e)
            };
        return a(t || e.jQuery), i
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
    }("undefined" != typeof window ? window : this, (function () {
        function e() { }
        var t = e.prototype;
        return t.on = function (e, t) {
            if (e && t) {
                var i = this._events = this._events || {},
                    a = i[e] = i[e] || [];
                return -1 == a.indexOf(t) && a.push(t), this
            }
        }, t.once = function (e, t) {
            if (e && t) {
                this.on(e, t);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[e] = i[e] || {})[t] = !0, this
            }
        }, t.off = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var a = i.indexOf(t);
                return -1 != a && i.splice(a, 1), this
            }
        }, t.emitEvent = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                i = i.slice(0), t = t || [];
                for (var a = this._onceEvents && this._onceEvents[e], n = 0; n < i.length; n++) {
                    var r = i[n];
                    a && a[r] && (this.off(e, r), delete a[r]), r.apply(this, t)
                }
                return this
            }
        }, t.allOff = function () {
            delete this._events, delete this._onceEvents
        }, e
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
    }(window, (function () {
        "use strict";

        function e(e) {
            var t = parseFloat(e);
            return -1 == e.indexOf("%") && !isNaN(t) && t
        }

        function t(e) {
            var t = getComputedStyle(e);
            return t || r("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
        }

        function i() {
            if (!l) {
                l = !0;
                var i = document.createElement("div");
                i.style.width = "200px", i.style.padding = "1px 2px 3px 4px", i.style.borderStyle = "solid", i.style.borderWidth = "1px 2px 3px 4px", i.style.boxSizing = "border-box";
                var r = document.body || document.documentElement;
                r.appendChild(i);
                var s = t(i);
                n = 200 == Math.round(e(s.width)), a.isBoxSizeOuter = n, r.removeChild(i)
            }
        }

        function a(a) {
            if (i(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                var r = t(a);
                if ("none" == r.display) return function () {
                    for (var e = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, t = 0; t < o; t++) {
                        e[s[t]] = 0
                    }
                    return e
                }();
                var l = {};
                l.width = a.offsetWidth, l.height = a.offsetHeight;
                for (var d = l.isBorderBox = "border-box" == r.boxSizing, u = 0; u < o; u++) {
                    var c = s[u],
                        p = r[c],
                        h = parseFloat(p);
                    l[c] = isNaN(h) ? 0 : h
                }
                var f = l.paddingLeft + l.paddingRight,
                    m = l.paddingTop + l.paddingBottom,
                    v = l.marginLeft + l.marginRight,
                    g = l.marginTop + l.marginBottom,
                    y = l.borderLeftWidth + l.borderRightWidth,
                    w = l.borderTopWidth + l.borderBottomWidth,
                    b = d && n,
                    E = e(r.width);
                !1 !== E && (l.width = E + (b ? 0 : f + y));
                var x = e(r.height);
                return !1 !== x && (l.height = x + (b ? 0 : m + w)), l.innerWidth = l.width - (f + y), l.innerHeight = l.height - (m + w), l.outerWidth = l.width + v, l.outerHeight = l.height + g, l
            }
        }
        var n, r = "undefined" == typeof console ? function () { } : function (e) {
            console.error(e)
        },
            s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            o = s.length,
            l = !1;
        return a
    })),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
    }(window, (function () {
        "use strict";
        var e = function () {
            var e = window.Element.prototype;
            if (e.matches) return "matches";
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
                var a = t[i] + "MatchesSelector";
                if (e[a]) return a
            }
        }();
        return function (t, i) {
            return t[e](i)
        }
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function (i) {
            return t(e, i)
        })) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
    }(window, (function (e, t) {
        var i = {
            extend: function (e, t) {
                for (var i in t) e[i] = t[i];
                return e
            },
            modulo: function (e, t) {
                return (e % t + t) % t
            }
        },
            a = Array.prototype.slice;
        i.makeArray = function (e) {
            return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? a.call(e) : [e]
        }, i.removeFrom = function (e, t) {
            var i = e.indexOf(t); - 1 != i && e.splice(i, 1)
        }, i.getParent = function (e, i) {
            for (; e.parentNode && e != document.body;)
                if (e = e.parentNode, t(e, i)) return e
        }, i.getQueryElement = function (e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }, i.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, i.filterFindElements = function (e, a) {
            e = i.makeArray(e);
            var n = [];
            return e.forEach((function (e) {
                if (e instanceof HTMLElement) {
                    if (!a) return void n.push(e);
                    t(e, a) && n.push(e);
                    for (var i = e.querySelectorAll(a), r = 0; r < i.length; r++) n.push(i[r])
                }
            })), n
        }, i.debounceMethod = function (e, t, i) {
            i = i || 100;
            var a = e.prototype[t],
                n = t + "Timeout";
            e.prototype[t] = function () {
                var e = this[n];
                clearTimeout(e);
                var t = arguments,
                    r = this;
                this[n] = setTimeout((function () {
                    a.apply(r, t), delete r[n]
                }), i)
            }
        }, i.docReady = function (e) {
            var t = document.readyState;
            "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
        }, i.toDashed = function (e) {
            return e.replace(/(.)([A-Z])/g, (function (e, t, i) {
                return t + "-" + i
            })).toLowerCase()
        };
        var n = e.console;
        return i.htmlInit = function (t, a) {
            i.docReady((function () {
                var r = i.toDashed(a),
                    s = "data-" + r,
                    o = document.querySelectorAll("[" + s + "]"),
                    l = document.querySelectorAll(".js-" + r),
                    d = i.makeArray(o).concat(i.makeArray(l)),
                    u = s + "-options",
                    c = e.jQuery;
                d.forEach((function (e) {
                    var i, r = e.getAttribute(s) || e.getAttribute(u);
                    try {
                        i = r && JSON.parse(r)
                    } catch (t) {
                        return void (n && n.error("Error parsing " + s + " on " + e.className + ": " + t))
                    }
                    var o = new t(e, i);
                    c && c.data(e, a, o)
                }))
            }))
        }, i
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
    }(window, (function (e, t) {
        "use strict";

        function i(e, t) {
            e && (this.element = e, this.layout = t, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }
        var a = document.documentElement.style,
            n = "string" == typeof a.transition ? "transition" : "WebkitTransition",
            r = "string" == typeof a.transform ? "transform" : "WebkitTransform",
            s = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend"
            }[n],
            o = {
                transform: r,
                transition: n,
                transitionDuration: n + "Duration",
                transitionProperty: n + "Property",
                transitionDelay: n + "Delay"
            },
            l = i.prototype = Object.create(e.prototype);
        l.constructor = i, l._create = function () {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, l.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, l.getSize = function () {
            this.size = t(this.element)
        }, l.css = function (e) {
            var t = this.element.style;
            for (var i in e) {
                t[o[i] || i] = e[i]
            }
        }, l.getPosition = function () {
            var e = getComputedStyle(this.element),
                t = this.layout._getOption("originLeft"),
                i = this.layout._getOption("originTop"),
                a = e[t ? "left" : "right"],
                n = e[i ? "top" : "bottom"],
                r = parseFloat(a),
                s = parseFloat(n),
                o = this.layout.size; - 1 != a.indexOf("%") && (r = r / 100 * o.width), -1 != n.indexOf("%") && (s = s / 100 * o.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= t ? o.paddingLeft : o.paddingRight, s -= i ? o.paddingTop : o.paddingBottom, this.position.x = r, this.position.y = s
        }, l.layoutPosition = function () {
            var e = this.layout.size,
                t = {},
                i = this.layout._getOption("originLeft"),
                a = this.layout._getOption("originTop"),
                n = i ? "paddingLeft" : "paddingRight",
                r = i ? "left" : "right",
                s = i ? "right" : "left",
                o = this.position.x + e[n];
            t[r] = this.getXValue(o), t[s] = "";
            var l = a ? "paddingTop" : "paddingBottom",
                d = a ? "top" : "bottom",
                u = a ? "bottom" : "top",
                c = this.position.y + e[l];
            t[d] = this.getYValue(c), t[u] = "", this.css(t), this.emitEvent("layout", [this])
        }, l.getXValue = function (e) {
            var t = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
        }, l.getYValue = function (e) {
            var t = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
        }, l._transitionTo = function (e, t) {
            this.getPosition();
            var i = this.position.x,
                a = this.position.y,
                n = e == this.position.x && t == this.position.y;
            if (this.setPosition(e, t), !n || this.isTransitioning) {
                var r = e - i,
                    s = t - a,
                    o = {};
                o.transform = this.getTranslate(r, s), this.transition({
                    to: o,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            } else this.layoutPosition()
        }, l.getTranslate = function (e, t) {
            return "translate3d(" + (e = this.layout._getOption("originLeft") ? e : -e) + "px, " + (t = this.layout._getOption("originTop") ? t : -t) + "px, 0)"
        }, l.goTo = function (e, t) {
            this.setPosition(e, t), this.layoutPosition()
        }, l.moveTo = l._transitionTo, l.setPosition = function (e, t) {
            this.position.x = parseFloat(e), this.position.y = parseFloat(t)
        }, l._nonTransition = function (e) {
            for (var t in this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd) e.onTransitionEnd[t].call(this)
        }, l.transition = function (e) {
            if (parseFloat(this.layout.options.transitionDuration)) {
                var t = this._transn;
                for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
                for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
                if (e.from) {
                    this.css(e.from);
                    this.element.offsetHeight;
                    null
                }
                this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
            } else this._nonTransition(e)
        };
        var d = "opacity," + function (e) {
            return e.replace(/([A-Z])/g, (function (e) {
                return "-" + e.toLowerCase()
            }))
        }(r);
        l.enableTransition = function () {
            if (!this.isTransitioning) {
                var e = this.layout.options.transitionDuration;
                e = "number" == typeof e ? e + "ms" : e, this.css({
                    transitionProperty: d,
                    transitionDuration: e,
                    transitionDelay: this.staggerDelay || 0
                }), this.element.addEventListener(s, this, !1)
            }
        }, l.onwebkitTransitionEnd = function (e) {
            this.ontransitionend(e)
        }, l.onotransitionend = function (e) {
            this.ontransitionend(e)
        };
        var u = {
            "-webkit-transform": "transform"
        };
        l.ontransitionend = function (e) {
            if (e.target === this.element) {
                var t = this._transn,
                    i = u[e.propertyName] || e.propertyName;
                if (delete t.ingProperties[i], function (e) {
                    for (var t in e) return !1;
                    return null, !0
                }(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) t.onEnd[i].call(this), delete t.onEnd[i];
                this.emitEvent("transitionEnd", [this])
            }
        }, l.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(s, this, !1), this.isTransitioning = !1
        }, l._removeStyles = function (e) {
            var t = {};
            for (var i in e) t[i] = "";
            this.css(t)
        };
        var c = {
            transitionProperty: "",
            transitionDuration: "",
            transitionDelay: ""
        };
        return l.removeTransitionStyles = function () {
            this.css(c)
        }, l.stagger = function (e) {
            e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
        }, l.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, l.remove = function () {
            return n && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", (function () {
                this.removeElem()
            })), void this.hide()) : void this.removeElem()
        }, l.reveal = function () {
            delete this.isHidden, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {};
            t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
                from: e.hiddenStyle,
                to: e.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, l.onRevealTransitionEnd = function () {
            this.isHidden || this.emitEvent("reveal")
        }, l.getHideRevealTransitionEndProperty = function (e) {
            var t = this.layout.options[e];
            if (t.opacity) return "opacity";
            for (var i in t) return i
        }, l.hide = function () {
            this.isHidden = !0, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {};
            t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
                from: e.visibleStyle,
                to: e.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, l.onHideTransitionEnd = function () {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, l.destroy = function () {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, i
    })),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], (function (i, a, n, r) {
            return t(e, i, a, n, r)
        })) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
    }(window, (function (e, t, i, a, n) {
        "use strict";

        function r(e, t) {
            var i = a.getQueryElement(e);
            if (i) {
                this.element = i, l && (this.$element = l(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(t);
                var n = ++u;
                this.element.outlayerGUID = n, c[n] = this, this._create(), this._getOption("initLayout") && this.layout()
            } else o && o.error("Bad element for " + this.constructor.namespace + ": " + (i || e))
        }

        function s(e) {
            function t() {
                e.apply(this, arguments)
            }
            return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
        }
        var o = e.console,
            l = e.jQuery,
            d = function () { },
            u = 0,
            c = {};
        r.namespace = "outlayer", r.Item = n, r.defaults = {
            containerStyle: {
                position: "relative"
            },
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        };
        var p = r.prototype;
        a.extend(p, t.prototype), p.option = function (e) {
            a.extend(this.options, e)
        }, p._getOption = function (e) {
            var t = this.constructor.compatOptions[e];
            return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
        }, r.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer"
        }, p._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), a.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
        }, p.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, p._itemize = function (e) {
            for (var t = this._filterFindItemElements(e), i = this.constructor.Item, a = [], n = 0; n < t.length; n++) {
                var r = new i(t[n], this);
                a.push(r)
            }
            return a
        }, p._filterFindItemElements = function (e) {
            return a.filterFindElements(e, this.options.itemSelector)
        }, p.getItemElements = function () {
            return this.items.map((function (e) {
                return e.element
            }))
        }, p.layout = function () {
            this._resetLayout(), this._manageStamps();
            var e = this._getOption("layoutInstant"),
                t = void 0 !== e ? e : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, p._init = p.layout, p._resetLayout = function () {
            this.getSize()
        }, p.getSize = function () {
            this.size = i(this.element)
        }, p._getMeasurement = function (e, t) {
            var a, n = this.options[e];
            n ? ("string" == typeof n ? a = this.element.querySelector(n) : n instanceof HTMLElement && (a = n), this[e] = a ? i(a)[t] : n) : this[e] = 0
        }, p.layoutItems = function (e, t) {
            e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
        }, p._getItemsForLayout = function (e) {
            return e.filter((function (e) {
                return !e.isIgnored
            }))
        }, p._layoutItems = function (e, t) {
            if (this._emitCompleteOnItems("layout", e), e && e.length) {
                var i = [];
                e.forEach((function (e) {
                    var a = this._getItemLayoutPosition(e);
                    a.item = e, a.isInstant = t || e.isLayoutInstant, i.push(a)
                }), this), this._processLayoutQueue(i)
            }
        }, p._getItemLayoutPosition = function () {
            return {
                x: 0,
                y: 0
            }
        }, p._processLayoutQueue = function (e) {
            this.updateStagger(), e.forEach((function (e, t) {
                this._positionItem(e.item, e.x, e.y, e.isInstant, t)
            }), this)
        }, p.updateStagger = function () {
            var e = this.options.stagger;
            return null == e ? void (this.stagger = 0) : (this.stagger = function (e) {
                if ("number" == typeof e) return e;
                var t = e.match(/(^\d*\.?\d*)(\w*)/),
                    i = t && t[1],
                    a = t && t[2];
                return i.length ? (i = parseFloat(i)) * (h[a] || 1) : 0
            }(e), this.stagger)
        }, p._positionItem = function (e, t, i, a, n) {
            a ? e.goTo(t, i) : (e.stagger(n * this.stagger), e.moveTo(t, i))
        }, p._postLayout = function () {
            this.resizeContainer()
        }, p.resizeContainer = function () {
            if (this._getOption("resizeContainer")) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }
        }, p._getContainerSize = d, p._setContainerMeasure = function (e, t) {
            if (void 0 !== e) {
                var i = this.size;
                i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
            }
        }, p._emitCompleteOnItems = function (e, t) {
            function i() {
                n.dispatchEvent(e + "Complete", null, [t])
            }

            function a() {
                ++s == r && i()
            }
            var n = this,
                r = t.length;
            if (t && r) {
                var s = 0;
                t.forEach((function (t) {
                    t.once(e, a)
                }))
            } else i()
        }, p.dispatchEvent = function (e, t, i) {
            var a = t ? [t].concat(i) : i;
            if (this.emitEvent(e, a), l)
                if (this.$element = this.$element || l(this.element), t) {
                    var n = l.Event(t);
                    n.type = e, this.$element.trigger(n, i)
                } else this.$element.trigger(e, i)
        }, p.ignore = function (e) {
            var t = this.getItem(e);
            t && (t.isIgnored = !0)
        }, p.unignore = function (e) {
            var t = this.getItem(e);
            t && delete t.isIgnored
        }, p.stamp = function (e) {
            (e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
        }, p.unstamp = function (e) {
            (e = this._find(e)) && e.forEach((function (e) {
                a.removeFrom(this.stamps, e), this.unignore(e)
            }), this)
        }, p._find = function (e) {
            if (e) return "string" == typeof e && (e = this.element.querySelectorAll(e)), a.makeArray(e)
        }, p._manageStamps = function () {
            this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
        }, p._getBoundingRect = function () {
            var e = this.element.getBoundingClientRect(),
                t = this.size;
            this._boundingRect = {
                left: e.left + t.paddingLeft + t.borderLeftWidth,
                top: e.top + t.paddingTop + t.borderTopWidth,
                right: e.right - (t.paddingRight + t.borderRightWidth),
                bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
            }
        }, p._manageStamp = d, p._getElementOffset = function (e) {
            var t = e.getBoundingClientRect(),
                a = this._boundingRect,
                n = i(e);
            return {
                left: t.left - a.left - n.marginLeft,
                top: t.top - a.top - n.marginTop,
                right: a.right - t.right - n.marginRight,
                bottom: a.bottom - t.bottom - n.marginBottom
            }
        }, p.handleEvent = a.handleEvent, p.bindResize = function () {
            e.addEventListener("resize", this), this.isResizeBound = !0
        }, p.unbindResize = function () {
            e.removeEventListener("resize", this), this.isResizeBound = !1
        }, p.onresize = function () {
            this.resize()
        }, a.debounceMethod(r, "onresize", 100), p.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, p.needsResizeLayout = function () {
            var e = i(this.element);
            return this.size && e && e.innerWidth !== this.size.innerWidth
        }, p.addItems = function (e) {
            var t = this._itemize(e);
            return t.length && (this.items = this.items.concat(t)), t
        }, p.appended = function (e) {
            var t = this.addItems(e);
            t.length && (this.layoutItems(t, !0), this.reveal(t))
        }, p.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
                var i = this.items.slice(0);
                this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
            }
        }, p.reveal = function (e) {
            if (this._emitCompleteOnItems("reveal", e), e && e.length) {
                var t = this.updateStagger();
                e.forEach((function (e, i) {
                    e.stagger(i * t), e.reveal()
                }))
            }
        }, p.hide = function (e) {
            if (this._emitCompleteOnItems("hide", e), e && e.length) {
                var t = this.updateStagger();
                e.forEach((function (e, i) {
                    e.stagger(i * t), e.hide()
                }))
            }
        }, p.revealItemElements = function (e) {
            var t = this.getItems(e);
            this.reveal(t)
        }, p.hideItemElements = function (e) {
            var t = this.getItems(e);
            this.hide(t)
        }, p.getItem = function (e) {
            for (var t = 0; t < this.items.length; t++) {
                var i = this.items[t];
                if (i.element == e) return i
            }
        }, p.getItems = function (e) {
            e = a.makeArray(e);
            var t = [];
            return e.forEach((function (e) {
                var i = this.getItem(e);
                i && t.push(i)
            }), this), t
        }, p.remove = function (e) {
            var t = this.getItems(e);
            this._emitCompleteOnItems("remove", t), t && t.length && t.forEach((function (e) {
                e.remove(), a.removeFrom(this.items, e)
            }), this)
        }, p.destroy = function () {
            var e = this.element.style;
            e.height = "", e.position = "", e.width = "", this.items.forEach((function (e) {
                e.destroy()
            })), this.unbindResize();
            var t = this.element.outlayerGUID;
            delete c[t], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
        }, r.data = function (e) {
            var t = (e = a.getQueryElement(e)) && e.outlayerGUID;
            return t && c[t]
        }, r.create = function (e, t) {
            var i = s(r);
            return i.defaults = a.extend({}, r.defaults), a.extend(i.defaults, t), i.compatOptions = a.extend({}, r.compatOptions), i.namespace = e, i.data = r.data, i.Item = s(n), a.htmlInit(i, e), l && l.bridget && l.bridget(e, i), i
        };
        var h = {
            ms: 1,
            s: 1e3
        };
        return r.Item = n, r
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(e.Outlayer))
    }(window, (function (e) {
        "use strict";

        function t() {
            e.Item.apply(this, arguments)
        }
        var i = t.prototype = Object.create(e.Item.prototype),
            a = i._create;
        i._create = function () {
            this.id = this.layout.itemGUID++, a.call(this), this.sortData = {}
        }, i.updateSortData = function () {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var e = this.layout.options.getSortData,
                    t = this.layout._sorters;
                for (var i in e) {
                    var a = t[i];
                    this.sortData[i] = a(this.element, this)
                }
            }
        };
        var n = i.destroy;
        return i.destroy = function () {
            n.apply(this, arguments), this.css({
                display: ""
            })
        }, t
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
    }(window, (function (e, t) {
        "use strict";

        function i(e) {
            this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size)
        }
        var a = i.prototype;
        return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach((function (e) {
            a[e] = function () {
                return t.prototype[e].apply(this.isotope, arguments)
            }
        })), a.needsVerticalResizeLayout = function () {
            var t = e(this.isotope.element);
            return this.isotope.size && t && t.innerHeight != this.isotope.size.innerHeight
        }, a._getMeasurement = function () {
            this.isotope._getMeasurement.apply(this, arguments)
        }, a.getColumnWidth = function () {
            this.getSegmentSize("column", "Width")
        }, a.getRowHeight = function () {
            this.getSegmentSize("row", "Height")
        }, a.getSegmentSize = function (e, t) {
            var i = e + t,
                a = "outer" + t;
            if (this._getMeasurement(i, a), !this[i]) {
                var n = this.getFirstItemSize();
                this[i] = n && n[a] || this.isotope.size["inner" + t]
            }
        }, a.getFirstItemSize = function () {
            var t = this.isotope.filteredItems[0];
            return t && t.element && e(t.element)
        }, a.layout = function () {
            this.isotope.layout.apply(this.isotope, arguments)
        }, a.getSize = function () {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function (e, t) {
            function n() {
                i.apply(this, arguments)
            }
            return n.prototype = Object.create(a), n.prototype.constructor = n, t && (n.options = t), n.prototype.namespace = e, i.modes[e] = n, n
        }, i
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
    }(window, (function (e, t) {
        var i = e.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var a = i.prototype;
        return a._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
            for (var e = 0; e < this.cols; e++) this.colYs.push(0);
            this.maxY = 0, this.horizontalColIndex = 0
        }, a.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var e = this.items[0],
                    i = e && e.element;
                this.columnWidth = i && t(i).outerWidth || this.containerWidth
            }
            var a = this.columnWidth += this.gutter,
                n = this.containerWidth + this.gutter,
                r = n / a,
                s = a - n % a;
            r = Math[s && s < 1 ? "round" : "floor"](r), this.cols = Math.max(r, 1)
        }, a.getContainerWidth = function () {
            var e = this._getOption("fitWidth") ? this.element.parentNode : this.element,
                i = t(e);
            this.containerWidth = i && i.innerWidth
        }, a._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth % this.columnWidth,
                i = Math[t && t < 1 ? "round" : "ceil"](e.size.outerWidth / this.columnWidth);
            i = Math.min(i, this.cols);
            for (var a = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, e), n = {
                x: this.columnWidth * a.col,
                y: a.y
            }, r = a.y + e.size.outerHeight, s = i + a.col, o = a.col; o < s; o++) this.colYs[o] = r;
            return n
        }, a._getTopColPosition = function (e) {
            var t = this._getTopColGroup(e),
                i = Math.min.apply(Math, t);
            return {
                col: t.indexOf(i),
                y: i
            }
        }, a._getTopColGroup = function (e) {
            if (e < 2) return this.colYs;
            for (var t = [], i = this.cols + 1 - e, a = 0; a < i; a++) t[a] = this._getColGroupY(a, e);
            return t
        }, a._getColGroupY = function (e, t) {
            if (t < 2) return this.colYs[e];
            var i = this.colYs.slice(e, e + t);
            return Math.max.apply(Math, i)
        }, a._getHorizontalColPosition = function (e, t) {
            var i = this.horizontalColIndex % this.cols;
            i = e > 1 && i + e > this.cols ? 0 : i;
            var a = t.size.outerWidth && t.size.outerHeight;
            return this.horizontalColIndex = a ? i + e : this.horizontalColIndex, {
                col: i,
                y: this._getColGroupY(i, e)
            }
        }, a._manageStamp = function (e) {
            var i = t(e),
                a = this._getElementOffset(e),
                n = this._getOption("originLeft") ? a.left : a.right,
                r = n + i.outerWidth,
                s = Math.floor(n / this.columnWidth);
            s = Math.max(0, s);
            var o = Math.floor(r / this.columnWidth);
            o -= r % this.columnWidth ? 0 : 1, o = Math.min(this.cols - 1, o);
            for (var l = (this._getOption("originTop") ? a.top : a.bottom) + i.outerHeight, d = s; d <= o; d++) this.colYs[d] = Math.max(l, this.colYs[d])
        }, a._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = {
                height: this.maxY
            };
            return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
        }, a._getContainerFitWidth = function () {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
            return (this.cols - e) * this.columnWidth - this.gutter
        }, a.needsResizeLayout = function () {
            var e = this.containerWidth;
            return this.getContainerWidth(), e != this.containerWidth
        }, i
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode, e.Masonry)
    }(window, (function (e, t) {
        "use strict";
        var i = e.create("masonry"),
            a = i.prototype,
            n = {
                _getElementOffset: !0,
                layout: !0,
                _getMeasurement: !0
            };
        for (var r in t.prototype) n[r] || (a[r] = t.prototype[r]);
        var s = a.measureColumns;
        a.measureColumns = function () {
            this.items = this.isotope.filteredItems, s.call(this)
        };
        var o = a._getOption;
        return a._getOption = function (e) {
            return "fitWidth" == e ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : o.apply(this.isotope, arguments)
        }, i
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, (function (e) {
        "use strict";
        var t = e.create("fitRows"),
            i = t.prototype;
        return i._resetLayout = function () {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, i._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && t + this.x > i && (this.x = 0, this.y = this.maxY);
            var a = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += t, a
        }, i._getContainerSize = function () {
            return {
                height: this.maxY
            }
        }, t
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, (function (e) {
        "use strict";
        var t = e.create("vertical", {
            horizontalAlignment: 0
        }),
            i = t.prototype;
        return i._resetLayout = function () {
            this.y = 0
        }, i._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += e.size.outerHeight, {
                x: t,
                y: i
            }
        }, i._getContainerSize = function () {
            return {
                height: this.y
            }
        }, t
    })),
    function (e, t) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], (function (i, a, n, r, s, o) {
            return t(e, i, a, n, r, s, o)
        })) : "object" == typeof module && module.exports ? module.exports = t(e, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer, e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e.Isotope.LayoutMode)
    }(window, (function (e, t, i, a, n, r, s) {
        var o = e.jQuery,
            l = String.prototype.trim ? function (e) {
                return e.trim()
            } : function (e) {
                return e.replace(/^\s+|\s+$/g, "")
            },
            d = t.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        d.Item = r, d.LayoutMode = s;
        var u = d.prototype;
        u._create = function () {
            for (var e in this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], s.modes) this._initLayoutMode(e)
        }, u.reloadItems = function () {
            this.itemGUID = 0, t.prototype.reloadItems.call(this)
        }, u._itemize = function () {
            for (var e = t.prototype._itemize.apply(this, arguments), i = 0; i < e.length; i++) {
                var a = e[i];
                a.id = this.itemGUID++
            }
            return this._updateItemsSortData(e), e
        }, u._initLayoutMode = function (e) {
            var t = s.modes[e],
                i = this.options[e] || {};
            this.options[e] = t.options ? n.extend(t.options, i) : i, this.modes[e] = new t(this)
        }, u.layout = function () {
            return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
        }, u._layout = function () {
            var e = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), this._isLayoutInited = !0
        }, u.arrange = function (e) {
            this.option(e), this._getIsInstant();
            var t = this._filter(this.items);
            this.filteredItems = t.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [t]) : this._hideReveal(t), this._sort(), this._layout()
        }, u._init = u.arrange, u._hideReveal = function (e) {
            this.reveal(e.needReveal), this.hide(e.needHide)
        }, u._getIsInstant = function () {
            var e = this._getOption("layoutInstant"),
                t = void 0 !== e ? e : !this._isLayoutInited;
            return this._isInstant = t, t
        }, u._bindArrangeComplete = function () {
            function e() {
                t && i && a && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
            }
            var t, i, a, n = this;
            this.once("layoutComplete", (function () {
                t = !0, e()
            })), this.once("hideComplete", (function () {
                i = !0, e()
            })), this.once("revealComplete", (function () {
                a = !0, e()
            }))
        }, u._filter = function (e) {
            var t = this.options.filter;
            t = t || "*";
            for (var i = [], a = [], n = [], r = this._getFilterTest(t), s = 0; s < e.length; s++) {
                var o = e[s];
                if (!o.isIgnored) {
                    var l = r(o);
                    l && i.push(o), l && o.isHidden ? a.push(o) : l || o.isHidden || n.push(o)
                }
            }
            return {
                matches: i,
                needReveal: a,
                needHide: n
            }
        }, u._getFilterTest = function (e) {
            return o && this.options.isJQueryFiltering ? function (t) {
                return o(t.element).is(e)
            } : "function" == typeof e ? function (t) {
                return e(t.element)
            } : function (t) {
                return a(t.element, e)
            }
        }, u.updateSortData = function (e) {
            var t;
            e ? (e = n.makeArray(e), t = this.getItems(e)) : t = this.items, this._getSorters(), this._updateItemsSortData(t)
        }, u._getSorters = function () {
            var e = this.options.getSortData;
            for (var t in e) {
                var i = e[t];
                this._sorters[t] = c(i)
            }
        }, u._updateItemsSortData = function (e) {
            for (var t = e && e.length, i = 0; t && i < t; i++) {
                e[i].updateSortData()
            }
        };
        var c = function (e) {
            if ("string" != typeof e) return e;
            var t = l(e).split(" "),
                i = t[0],
                a = i.match(/^\[(.+)\]$/),
                n = function (e, t) {
                    return e ? function (t) {
                        return t.getAttribute(e)
                    } : function (e) {
                        var i = e.querySelector(t);
                        return i && i.textContent
                    }
                }(a && a[1], i),
                r = d.sortDataParsers[t[1]];
            return r ? function (e) {
                return e && r(n(e))
            } : function (e) {
                return e && n(e)
            }
        };
        d.sortDataParsers = {
            parseInt: function (e) {
                return parseInt(e, 10)
            },
            parseFloat: function (e) {
                return parseFloat(e)
            }
        }, u._sort = function () {
            if (this.options.sortBy) {
                var e = n.makeArray(this.options.sortBy);
                this._getIsSameSortBy(e) || (this.sortHistory = e.concat(this.sortHistory));
                var t = function (e, t) {
                    return function (i, a) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n],
                                s = i.sortData[r],
                                o = a.sortData[r];
                            if (s > o || s < o) return (s > o ? 1 : -1) * ((void 0 !== t[r] ? t[r] : t) ? 1 : -1)
                        }
                        return 0
                    }
                }(this.sortHistory, this.options.sortAscending);
                this.filteredItems.sort(t)
            }
        }, u._getIsSameSortBy = function (e) {
            for (var t = 0; t < e.length; t++)
                if (e[t] != this.sortHistory[t]) return !1;
            return !0
        }, u._mode = function () {
            var e = this.options.layoutMode,
                t = this.modes[e];
            if (!t) throw new Error("No layout mode: " + e);
            return t.options = this.options[e], t
        }, u._resetLayout = function () {
            t.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, u._getItemLayoutPosition = function (e) {
            return this._mode()._getItemLayoutPosition(e)
        }, u._manageStamp = function (e) {
            this._mode()._manageStamp(e)
        }, u._getContainerSize = function () {
            return this._mode()._getContainerSize()
        }, u.needsResizeLayout = function () {
            return this._mode().needsResizeLayout()
        }, u.appended = function (e) {
            var t = this.addItems(e);
            if (t.length) {
                var i = this._filterRevealAdded(t);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, u.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(t);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = t.concat(this.items)
            }
        }, u._filterRevealAdded = function (e) {
            var t = this._filter(e);
            return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
        }, u.insert = function (e) {
            var t = this.addItems(e);
            if (t.length) {
                var i, a, n = t.length;
                for (i = 0; i < n; i++) a = t[i], this.element.appendChild(a.element);
                var r = this._filter(t).matches;
                for (i = 0; i < n; i++) t[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; i < n; i++) delete t[i].isLayoutInstant;
                this.reveal(r)
            }
        };
        var p = u.remove;
        return u.remove = function (e) {
            e = n.makeArray(e);
            var t = this.getItems(e);
            p.call(this, e);
            for (var i = t && t.length, a = 0; i && a < i; a++) {
                var r = t[a];
                n.removeFrom(this.filteredItems, r)
            }
        }, u.shuffle = function () {
            for (var e = 0; e < this.items.length; e++) {
                this.items[e].sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, u._noTransition = function (e, t) {
            var i = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var a = e.apply(this, t);
            return this.options.transitionDuration = i, a
        }, u.getFilteredItemElements = function () {
            return this.filteredItems.map((function (e) {
                return e.element
            }))
        }, d
    })),
    function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
    }(this, (function () {
        "use strict";

        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var a = t[i];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
            }
        }

        function t() {
            return (t = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
                }
                return e
            }).apply(this, arguments)
        }

        function i(e) {
            return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
        }

        function a(e, t) {
            void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((function (n) {
                void 0 === e[n] ? e[n] = t[n] : i(t[n]) && i(e[n]) && Object.keys(t[n]).length > 0 && a(e[n], t[n])
            }))
        }
        var n = {
            body: {},
            addEventListener: function () { },
            removeEventListener: function () { },
            activeElement: {
                blur: function () { },
                nodeName: ""
            },
            querySelector: function () {
                return null
            },
            querySelectorAll: function () {
                return []
            },
            getElementById: function () {
                return null
            },
            createEvent: function () {
                return {
                    initEvent: function () { }
                }
            },
            createElement: function () {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function () { },
                    getElementsByTagName: function () {
                        return []
                    }
                }
            },
            createElementNS: function () {
                return {}
            },
            importNode: function () {
                return null
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };

        function r() {
            var e = "undefined" != typeof document ? document : {};
            return a(e, n), e
        }
        var s = {
            document: n,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState: function () { },
                pushState: function () { },
                go: function () { },
                back: function () { }
            },
            CustomEvent: function () {
                return this
            },
            addEventListener: function () { },
            removeEventListener: function () { },
            getComputedStyle: function () {
                return {
                    getPropertyValue: function () {
                        return ""
                    }
                }
            },
            Image: function () { },
            Date: function () { },
            screen: {},
            setTimeout: function () { },
            clearTimeout: function () { },
            matchMedia: function () {
                return {}
            },
            requestAnimationFrame: function (e) {
                return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)
            },
            cancelAnimationFrame: function (e) {
                "undefined" != typeof setTimeout && clearTimeout(e)
            }
        };

        function o() {
            var e = "undefined" != typeof window ? window : {};
            return a(e, s), e
        }

        function l(e) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function d(e, t) {
            return (d = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function u() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
            } catch (e) {
                return !1
            }
        }

        function c(e, t, i) {
            return (c = u() ? Reflect.construct : function (e, t, i) {
                var a = [null];
                a.push.apply(a, t);
                var n = new (Function.bind.apply(e, a));
                return i && d(n, i.prototype), n
            }).apply(null, arguments)
        }

        function p(e) {
            var t = "function" == typeof Map ? new Map : void 0;
            return (p = function (e) {
                if (null === e || (i = e, -1 === Function.toString.call(i).indexOf("[native code]"))) return e;
                var i;
                if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== t) {
                    if (t.has(e)) return t.get(e);
                    t.set(e, a)
                }

                function a() {
                    return c(e, arguments, l(this).constructor)
                }
                return a.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), d(a, e)
            })(e)
        }
        var h = function (e) {
            var t, i;

            function a(t) {
                var i, a, n;
                return a = function (e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(i = e.call.apply(e, [this].concat(t)) || this), n = a.__proto__, Object.defineProperty(a, "__proto__", {
                    get: function () {
                        return n
                    },
                    set: function (e) {
                        n.__proto__ = e
                    }
                }), i
            }
            return i = e, (t = a).prototype = Object.create(i.prototype), t.prototype.constructor = t, t.__proto__ = i, a
        }(p(Array));

        function f(e) {
            void 0 === e && (e = []);
            var t = [];
            return e.forEach((function (e) {
                Array.isArray(e) ? t.push.apply(t, f(e)) : t.push(e)
            })), t
        }

        function m(e, t) {
            return Array.prototype.filter.call(e, t)
        }

        function v(e, t) {
            var i = o(),
                a = r(),
                n = [];
            if (!t && e instanceof h) return e;
            if (!e) return new h(n);
            if ("string" == typeof e) {
                var s = e.trim();
                if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                    var l = "div";
                    0 === s.indexOf("<li") && (l = "ul"), 0 === s.indexOf("<tr") && (l = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (l = "tr"), 0 === s.indexOf("<tbody") && (l = "table"), 0 === s.indexOf("<option") && (l = "select");
                    var d = a.createElement(l);
                    d.innerHTML = s;
                    for (var u = 0; u < d.childNodes.length; u += 1) n.push(d.childNodes[u])
                } else n = function (e, t) {
                    if ("string" != typeof e) return [e];
                    for (var i = [], a = t.querySelectorAll(e), n = 0; n < a.length; n += 1) i.push(a[n]);
                    return i
                }(e.trim(), t || a)
            } else if (e.nodeType || e === i || e === a) n.push(e);
            else if (Array.isArray(e)) {
                if (e instanceof h) return e;
                n = e
            }
            return new h(function (e) {
                for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
                return t
            }(n))
        }
        v.fn = h.prototype;
        var g, y, w, b = {
            addClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                var a = f(t.map((function (e) {
                    return e.split(" ")
                })));
                return this.forEach((function (e) {
                    var t;
                    (t = e.classList).add.apply(t, a)
                })), this
            },
            removeClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                var a = f(t.map((function (e) {
                    return e.split(" ")
                })));
                return this.forEach((function (e) {
                    var t;
                    (t = e.classList).remove.apply(t, a)
                })), this
            },
            hasClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                var a = f(t.map((function (e) {
                    return e.split(" ")
                })));
                return m(this, (function (e) {
                    return a.filter((function (t) {
                        return e.classList.contains(t)
                    })).length > 0
                })).length > 0
            },
            toggleClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                var a = f(t.map((function (e) {
                    return e.split(" ")
                })));
                this.forEach((function (e) {
                    a.forEach((function (t) {
                        e.classList.toggle(t)
                    }))
                }))
            },
            attr: function (e, t) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                for (var i = 0; i < this.length; i += 1)
                    if (2 === arguments.length) this[i].setAttribute(e, t);
                    else
                        for (var a in e) this[i][a] = e[a], this[i].setAttribute(a, e[a]);
                return this
            },
            removeAttr: function (e) {
                for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
                return this
            },
            transform: function (e) {
                for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
                return this
            },
            transition: function (e) {
                for (var t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
                return this
            },
            on: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                var a = t[0],
                    n = t[1],
                    r = t[2],
                    s = t[3];

                function o(e) {
                    var t = e.target;
                    if (t) {
                        var i = e.target.dom7EventData || [];
                        if (i.indexOf(e) < 0 && i.unshift(e), v(t).is(n)) r.apply(t, i);
                        else
                            for (var a = v(t).parents(), s = 0; s < a.length; s += 1) v(a[s]).is(n) && r.apply(a[s], i)
                    }
                }

                function l(e) {
                    var t = e && e.target && e.target.dom7EventData || [];
                    t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
                }
                "function" == typeof t[1] && (a = t[0], r = t[1], s = t[2], n = void 0), s || (s = !1);
                for (var d, u = a.split(" "), c = 0; c < this.length; c += 1) {
                    var p = this[c];
                    if (n)
                        for (d = 0; d < u.length; d += 1) {
                            var h = u[d];
                            p.dom7LiveListeners || (p.dom7LiveListeners = {}), p.dom7LiveListeners[h] || (p.dom7LiveListeners[h] = []), p.dom7LiveListeners[h].push({
                                listener: r,
                                proxyListener: o
                            }), p.addEventListener(h, o, s)
                        } else
                        for (d = 0; d < u.length; d += 1) {
                            var f = u[d];
                            p.dom7Listeners || (p.dom7Listeners = {}), p.dom7Listeners[f] || (p.dom7Listeners[f] = []), p.dom7Listeners[f].push({
                                listener: r,
                                proxyListener: l
                            }), p.addEventListener(f, l, s)
                        }
                }
                return this
            },
            off: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                var a = t[0],
                    n = t[1],
                    r = t[2],
                    s = t[3];
                "function" == typeof t[1] && (a = t[0], r = t[1], s = t[2], n = void 0), s || (s = !1);
                for (var o = a.split(" "), l = 0; l < o.length; l += 1)
                    for (var d = o[l], u = 0; u < this.length; u += 1) {
                        var c = this[u],
                            p = void 0;
                        if (!n && c.dom7Listeners ? p = c.dom7Listeners[d] : n && c.dom7LiveListeners && (p = c.dom7LiveListeners[d]), p && p.length)
                            for (var h = p.length - 1; h >= 0; h -= 1) {
                                var f = p[h];
                                r && f.listener === r || r && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === r ? (c.removeEventListener(d, f.proxyListener, s), p.splice(h, 1)) : r || (c.removeEventListener(d, f.proxyListener, s), p.splice(h, 1))
                            }
                    }
                return this
            },
            trigger: function () {
                for (var e = o(), t = arguments.length, i = new Array(t), a = 0; a < t; a++) i[a] = arguments[a];
                for (var n = i[0].split(" "), r = i[1], s = 0; s < n.length; s += 1)
                    for (var l = n[s], d = 0; d < this.length; d += 1) {
                        var u = this[d];
                        if (e.CustomEvent) {
                            var c = new e.CustomEvent(l, {
                                detail: r,
                                bubbles: !0,
                                cancelable: !0
                            });
                            u.dom7EventData = i.filter((function (e, t) {
                                return t > 0
                            })), u.dispatchEvent(c), u.dom7EventData = [], delete u.dom7EventData
                        }
                    }
                return this
            },
            transitionEnd: function (e) {
                var t = this;
                return e && t.on("transitionend", (function i(a) {
                    a.target === this && (e.call(this, a), t.off("transitionend", i))
                })), this
            },
            outerWidth: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var t = this.styles();
                        return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                    }
                    return this[0].offsetWidth
                }
                return null
            },
            outerHeight: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var t = this.styles();
                        return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                    }
                    return this[0].offsetHeight
                }
                return null
            },
            styles: function () {
                var e = o();
                return this[0] ? e.getComputedStyle(this[0], null) : {}
            },
            offset: function () {
                if (this.length > 0) {
                    var e = o(),
                        t = r(),
                        i = this[0],
                        a = i.getBoundingClientRect(),
                        n = t.body,
                        s = i.clientTop || n.clientTop || 0,
                        l = i.clientLeft || n.clientLeft || 0,
                        d = i === e ? e.scrollY : i.scrollTop,
                        u = i === e ? e.scrollX : i.scrollLeft;
                    return {
                        top: a.top + d - s,
                        left: a.left + u - l
                    }
                }
                return null
            },
            css: function (e, t) {
                var i, a = o();
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (i = 0; i < this.length; i += 1)
                            for (var n in e) this[i].style[n] = e[n];
                        return this
                    }
                    if (this[0]) return a.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                    return this
                }
                return this
            },
            each: function (e) {
                return e ? (this.forEach((function (t, i) {
                    e.apply(t, [t, i])
                })), this) : this
            },
            html: function (e) {
                if (void 0 === e) return this[0] ? this[0].innerHTML : null;
                for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
                return this
            },
            text: function (e) {
                if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
                return this
            },
            is: function (e) {
                var t, i, a = o(),
                    n = r(),
                    s = this[0];
                if (!s || void 0 === e) return !1;
                if ("string" == typeof e) {
                    if (s.matches) return s.matches(e);
                    if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
                    if (s.msMatchesSelector) return s.msMatchesSelector(e);
                    for (t = v(e), i = 0; i < t.length; i += 1)
                        if (t[i] === s) return !0;
                    return !1
                }
                if (e === n) return s === n;
                if (e === a) return s === a;
                if (e.nodeType || e instanceof h) {
                    for (t = e.nodeType ? [e] : e, i = 0; i < t.length; i += 1)
                        if (t[i] === s) return !0;
                    return !1
                }
                return !1
            },
            index: function () {
                var e, t = this[0];
                if (t) {
                    for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                    return e
                }
            },
            eq: function (e) {
                if (void 0 === e) return this;
                var t = this.length;
                if (e > t - 1) return v([]);
                if (e < 0) {
                    var i = t + e;
                    return v(i < 0 ? [] : [this[i]])
                }
                return v([this[e]])
            },
            append: function () {
                for (var e, t = r(), i = 0; i < arguments.length; i += 1) {
                    e = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                    for (var a = 0; a < this.length; a += 1)
                        if ("string" == typeof e) {
                            var n = t.createElement("div");
                            for (n.innerHTML = e; n.firstChild;) this[a].appendChild(n.firstChild)
                        } else if (e instanceof h)
                            for (var s = 0; s < e.length; s += 1) this[a].appendChild(e[s]);
                        else this[a].appendChild(e)
                }
                return this
            },
            prepend: function (e) {
                var t, i, a = r();
                for (t = 0; t < this.length; t += 1)
                    if ("string" == typeof e) {
                        var n = a.createElement("div");
                        for (n.innerHTML = e, i = n.childNodes.length - 1; i >= 0; i -= 1) this[t].insertBefore(n.childNodes[i], this[t].childNodes[0])
                    } else if (e instanceof h)
                        for (i = 0; i < e.length; i += 1) this[t].insertBefore(e[i], this[t].childNodes[0]);
                    else this[t].insertBefore(e, this[t].childNodes[0]);
                return this
            },
            next: function (e) {
                return this.length > 0 ? e ? this[0].nextElementSibling && v(this[0].nextElementSibling).is(e) ? v([this[0].nextElementSibling]) : v([]) : this[0].nextElementSibling ? v([this[0].nextElementSibling]) : v([]) : v([])
            },
            nextAll: function (e) {
                var t = [],
                    i = this[0];
                if (!i) return v([]);
                for (; i.nextElementSibling;) {
                    var a = i.nextElementSibling;
                    e ? v(a).is(e) && t.push(a) : t.push(a), i = a
                }
                return v(t)
            },
            prev: function (e) {
                if (this.length > 0) {
                    var t = this[0];
                    return e ? t.previousElementSibling && v(t.previousElementSibling).is(e) ? v([t.previousElementSibling]) : v([]) : t.previousElementSibling ? v([t.previousElementSibling]) : v([])
                }
                return v([])
            },
            prevAll: function (e) {
                var t = [],
                    i = this[0];
                if (!i) return v([]);
                for (; i.previousElementSibling;) {
                    var a = i.previousElementSibling;
                    e ? v(a).is(e) && t.push(a) : t.push(a), i = a
                }
                return v(t)
            },
            parent: function (e) {
                for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? v(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
                return v(t)
            },
            parents: function (e) {
                for (var t = [], i = 0; i < this.length; i += 1)
                    for (var a = this[i].parentNode; a;) e ? v(a).is(e) && t.push(a) : t.push(a), a = a.parentNode;
                return v(t)
            },
            closest: function (e) {
                var t = this;
                return void 0 === e ? v([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
            },
            find: function (e) {
                for (var t = [], i = 0; i < this.length; i += 1)
                    for (var a = this[i].querySelectorAll(e), n = 0; n < a.length; n += 1) t.push(a[n]);
                return v(t)
            },
            children: function (e) {
                for (var t = [], i = 0; i < this.length; i += 1)
                    for (var a = this[i].children, n = 0; n < a.length; n += 1) e && !v(a[n]).is(e) || t.push(a[n]);
                return v(t)
            },
            filter: function (e) {
                return v(m(this, e))
            },
            remove: function () {
                for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            }
        };

        function E(e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t)
        }

        function x() {
            return Date.now()
        }

        function S(e, t) {
            void 0 === t && (t = "x");
            var i, a, n, r = o(),
                s = r.getComputedStyle(e, null);
            return r.WebKitCSSMatrix ? ((a = s.transform || s.webkitTransform).split(",").length > 6 && (a = a.split(", ").map((function (e) {
                return e.replace(",", ".")
            })).join(", ")), n = new r.WebKitCSSMatrix("none" === a ? "" : a)) : i = (n = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (a = r.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (a = r.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), a || 0
        }

        function T(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        }

        function C() {
            for (var e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = 1; t < arguments.length; t += 1) {
                var i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
                if (null != i)
                    for (var a = Object.keys(Object(i)), n = 0, r = a.length; n < r; n += 1) {
                        var s = a[n],
                            o = Object.getOwnPropertyDescriptor(i, s);
                        void 0 !== o && o.enumerable && (T(e[s]) && T(i[s]) ? C(e[s], i[s]) : !T(e[s]) && T(i[s]) ? (e[s] = {}, C(e[s], i[s])) : e[s] = i[s])
                    }
            }
            return e
        }

        function M(e, t) {
            Object.keys(t).forEach((function (i) {
                T(t[i]) && Object.keys(t[i]).forEach((function (a) {
                    "function" == typeof t[i][a] && (t[i][a] = t[i][a].bind(e))
                })), e[i] = t[i]
            }))
        }

        function z() {
            return g || (g = function () {
                var e = o(),
                    t = r();
                return {
                    touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                    pointerEvents: !!e.PointerEvent && "maxTouchPoints" in e.navigator && e.navigator.maxTouchPoints >= 0,
                    observer: "MutationObserver" in e || "WebkitMutationObserver" in e,
                    passiveListener: function () {
                        var t = !1;
                        try {
                            var i = Object.defineProperty({}, "passive", {
                                get: function () {
                                    t = !0
                                }
                            });
                            e.addEventListener("testPassiveListener", null, i)
                        } catch (e) { }
                        return t
                    }(),
                    gestures: "ongesturestart" in e
                }
            }()), g
        }

        function _(e) {
            return void 0 === e && (e = {}), y || (y = function (e) {
                var t = (void 0 === e ? {} : e).userAgent,
                    i = z(),
                    a = o(),
                    n = a.navigator.platform,
                    r = t || a.navigator.userAgent,
                    s = {
                        ios: !1,
                        android: !1
                    },
                    l = a.screen.width,
                    d = a.screen.height,
                    u = r.match(/(Android);?[\s\/]+([\d.]+)?/),
                    c = r.match(/(iPad).*OS\s([\d_]+)/),
                    p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                    h = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                    f = "Win32" === n,
                    m = "MacIntel" === n;
                return !c && m && i.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(l + "x" + d) >= 0 && ((c = r.match(/(Version)\/([\d.]+)/)) || (c = [0, 1, "13_0_0"]), m = !1), u && !f && (s.os = "android", s.android = !0), (c || h || p) && (s.os = "ios", s.ios = !0), s
            }(e)), y
        }

        function I() {
            return w || (w = function () {
                var e, t = o();
                return {
                    isEdge: !!t.navigator.userAgent.match(/Edge/g),
                    isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
                    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
                }
            }()), w
        }
        Object.keys(b).forEach((function (e) {
            v.fn[e] = b[e]
        }));
        var P = {
            name: "resize",
            create: function () {
                var e = this;
                C(e, {
                    resize: {
                        observer: null,
                        createObserver: function () {
                            e && !e.destroyed && e.initialized && (e.resize.observer = new ResizeObserver((function (t) {
                                var i = e.width,
                                    a = e.height,
                                    n = i,
                                    r = a;
                                t.forEach((function (t) {
                                    var i = t.contentBoxSize,
                                        a = t.contentRect,
                                        s = t.target;
                                    s && s !== e.el || (n = a ? a.width : (i[0] || i).inlineSize, r = a ? a.height : (i[0] || i).blockSize)
                                })), n === i && r === a || e.resize.resizeHandler()
                            })), e.resize.observer.observe(e.el))
                        },
                        removeObserver: function () {
                            e.resize.observer && e.resize.observer.unobserve && e.el && (e.resize.observer.unobserve(e.el), e.resize.observer = null)
                        },
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function (e) {
                    var t = o();
                    e.params.resizeObserver && void 0 !== o().ResizeObserver ? e.resize.createObserver() : (t.addEventListener("resize", e.resize.resizeHandler), t.addEventListener("orientationchange", e.resize.orientationChangeHandler))
                },
                destroy: function (e) {
                    var t = o();
                    e.resize.removeObserver(), t.removeEventListener("resize", e.resize.resizeHandler), t.removeEventListener("orientationchange", e.resize.orientationChangeHandler)
                }
            }
        },
            L = {
                attach: function (e, t) {
                    void 0 === t && (t = {});
                    var i = o(),
                        a = this,
                        n = new (i.MutationObserver || i.WebkitMutationObserver)((function (e) {
                            if (1 !== e.length) {
                                var t = function () {
                                    a.emit("observerUpdate", e[0])
                                };
                                i.requestAnimationFrame ? i.requestAnimationFrame(t) : i.setTimeout(t, 0)
                            } else a.emit("observerUpdate", e[0])
                        }));
                    n.observe(e, {
                        attributes: void 0 === t.attributes || t.attributes,
                        childList: void 0 === t.childList || t.childList,
                        characterData: void 0 === t.characterData || t.characterData
                    }), a.observer.observers.push(n)
                },
                init: function () {
                    var e = this;
                    if (e.support.observer && e.params.observer) {
                        if (e.params.observeParents)
                            for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                        e.observer.attach(e.$el[0], {
                            childList: e.params.observeSlideChildren
                        }), e.observer.attach(e.$wrapperEl[0], {
                            attributes: !1
                        })
                    }
                },
                destroy: function () {
                    this.observer.observers.forEach((function (e) {
                        e.disconnect()
                    })), this.observer.observers = []
                }
            },
            k = {
                name: "observer",
                params: {
                    observer: !1,
                    observeParents: !1,
                    observeSlideChildren: !1
                },
                create: function () {
                    M(this, {
                        observer: t({}, L, {
                            observers: []
                        })
                    })
                },
                on: {
                    init: function (e) {
                        e.observer.init()
                    },
                    destroy: function (e) {
                        e.observer.destroy()
                    }
                }
            };

        function O(e) {
            var t = this,
                i = r(),
                a = o(),
                n = t.touchEventsData,
                s = t.params,
                l = t.touches;
            if (!t.animating || !s.preventInteractionOnTransition) {
                var d = e;
                d.originalEvent && (d = d.originalEvent);
                var u = v(d.target);
                if (("wrapper" !== s.touchEventsTarget || u.closest(t.wrapperEl).length) && (n.isTouchEvent = "touchstart" === d.type, (n.isTouchEvent || !("which" in d) || 3 !== d.which) && !(!n.isTouchEvent && "button" in d && d.button > 0 || n.isTouched && n.isMoved)))
                    if (!!s.noSwipingClass && "" !== s.noSwipingClass && d.target && d.target.shadowRoot && e.path && e.path[0] && (u = v(e.path[0])), s.noSwiping && u.closest(s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass)[0]) t.allowClick = !0;
                    else if (!s.swipeHandler || u.closest(s.swipeHandler)[0]) {
                        l.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX, l.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
                        var c = l.currentX,
                            p = l.currentY,
                            h = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
                            f = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
                        if (h && (c <= f || c >= a.innerWidth - f)) {
                            if ("prevent" !== h) return;
                            e.preventDefault()
                        }
                        if (C(n, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }), l.startX = c, l.startY = p, n.touchStartTime = x(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, s.threshold > 0 && (n.allowThresholdMove = !1), "touchstart" !== d.type) {
                            var m = !0;
                            u.is(n.formElements) && (m = !1), i.activeElement && v(i.activeElement).is(n.formElements) && i.activeElement !== u[0] && i.activeElement.blur();
                            var g = m && t.allowTouchMove && s.touchStartPreventDefault;
                            !s.touchStartForcePreventDefault && !g || u[0].isContentEditable || d.preventDefault()
                        }
                        t.emit("touchStart", d)
                    }
            }
        }

        function A(e) {
            var t = r(),
                i = this,
                a = i.touchEventsData,
                n = i.params,
                s = i.touches,
                o = i.rtlTranslate,
                l = e;
            if (l.originalEvent && (l = l.originalEvent), a.isTouched) {
                if (!a.isTouchEvent || "touchmove" === l.type) {
                    var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
                        u = "touchmove" === l.type ? d.pageX : l.pageX,
                        c = "touchmove" === l.type ? d.pageY : l.pageY;
                    if (l.preventedByNestedSwiper) return s.startX = u, void (s.startY = c);
                    if (!i.allowTouchMove) return i.allowClick = !1, void (a.isTouched && (C(s, {
                        startX: u,
                        startY: c,
                        currentX: u,
                        currentY: c
                    }), a.touchStartTime = x()));
                    if (a.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
                        if (i.isVertical()) {
                            if (c < s.startY && i.translate <= i.maxTranslate() || c > s.startY && i.translate >= i.minTranslate()) return a.isTouched = !1, void (a.isMoved = !1)
                        } else if (u < s.startX && i.translate <= i.maxTranslate() || u > s.startX && i.translate >= i.minTranslate()) return;
                    if (a.isTouchEvent && t.activeElement && l.target === t.activeElement && v(l.target).is(a.formElements)) return a.isMoved = !0, void (i.allowClick = !1);
                    if (a.allowTouchCallbacks && i.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1)) {
                        s.currentX = u, s.currentY = c;
                        var p, h = s.currentX - s.startX,
                            f = s.currentY - s.startY;
                        if (!(i.params.threshold && Math.sqrt(Math.pow(h, 2) + Math.pow(f, 2)) < i.params.threshold))
                            if (void 0 === a.isScrolling && (i.isHorizontal() && s.currentY === s.startY || i.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : h * h + f * f >= 25 && (p = 180 * Math.atan2(Math.abs(f), Math.abs(h)) / Math.PI, a.isScrolling = i.isHorizontal() ? p > n.touchAngle : 90 - p > n.touchAngle)), a.isScrolling && i.emit("touchMoveOpposite", l), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1;
                            else if (a.startMoving) {
                                i.allowClick = !1, !n.cssMode && l.cancelable && l.preventDefault(), n.touchMoveStopPropagation && !n.nested && l.stopPropagation(), a.isMoved || (n.loop && i.loopFix(), a.startTranslate = i.getTranslate(), i.setTransition(0), i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !n.grabCursor || !0 !== i.allowSlideNext && !0 !== i.allowSlidePrev || i.setGrabCursor(!0), i.emit("sliderFirstMove", l)), i.emit("sliderMove", l), a.isMoved = !0;
                                var m = i.isHorizontal() ? h : f;
                                s.diff = m, m *= n.touchRatio, o && (m = -m), i.swipeDirection = m > 0 ? "prev" : "next", a.currentTranslate = m + a.startTranslate;
                                var g = !0,
                                    y = n.resistanceRatio;
                                if (n.touchReleaseOnEdges && (y = 0), m > 0 && a.currentTranslate > i.minTranslate() ? (g = !1, n.resistance && (a.currentTranslate = i.minTranslate() - 1 + Math.pow(-i.minTranslate() + a.startTranslate + m, y))) : m < 0 && a.currentTranslate < i.maxTranslate() && (g = !1, n.resistance && (a.currentTranslate = i.maxTranslate() + 1 - Math.pow(i.maxTranslate() - a.startTranslate - m, y))), g && (l.preventedByNestedSwiper = !0), !i.allowSlideNext && "next" === i.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !i.allowSlidePrev && "prev" === i.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), i.allowSlidePrev || i.allowSlideNext || (a.currentTranslate = a.startTranslate), n.threshold > 0) {
                                    if (!(Math.abs(m) > n.threshold || a.allowThresholdMove)) return void (a.currentTranslate = a.startTranslate);
                                    if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void (s.diff = i.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                }
                                n.followFinger && !n.cssMode && ((n.freeMode || n.watchSlidesProgress || n.watchSlidesVisibility) && (i.updateActiveIndex(), i.updateSlidesClasses()), n.freeMode && (0 === a.velocities.length && a.velocities.push({
                                    position: s[i.isHorizontal() ? "startX" : "startY"],
                                    time: a.touchStartTime
                                }), a.velocities.push({
                                    position: s[i.isHorizontal() ? "currentX" : "currentY"],
                                    time: x()
                                })), i.updateProgress(a.currentTranslate), i.setTranslate(a.currentTranslate))
                            }
                    }
                }
            } else a.startMoving && a.isScrolling && i.emit("touchMoveOpposite", l)
        }

        function $(e) {
            var t = this,
                i = t.touchEventsData,
                a = t.params,
                n = t.touches,
                r = t.rtlTranslate,
                s = t.$wrapperEl,
                o = t.slidesGrid,
                l = t.snapGrid,
                d = e;
            if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && a.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
            a.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
            var u, c = x(),
                p = c - i.touchStartTime;
            if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap click", d), p < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", d)), i.lastClickTime = x(), E((function () {
                t.destroyed || (t.allowClick = !0)
            })), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === n.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
            if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, u = a.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, !a.cssMode)
                if (a.freeMode) {
                    if (u < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                    if (u > -t.maxTranslate()) return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                    if (a.freeModeMomentum) {
                        if (i.velocities.length > 1) {
                            var h = i.velocities.pop(),
                                f = i.velocities.pop(),
                                m = h.position - f.position,
                                v = h.time - f.time;
                            t.velocity = m / v, t.velocity /= 2, Math.abs(t.velocity) < a.freeModeMinimumVelocity && (t.velocity = 0), (v > 150 || x() - h.time > 300) && (t.velocity = 0)
                        } else t.velocity = 0;
                        t.velocity *= a.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                        var g = 1e3 * a.freeModeMomentumRatio,
                            y = t.velocity * g,
                            w = t.translate + y;
                        r && (w = -w);
                        var b, S, T = !1,
                            C = 20 * Math.abs(t.velocity) * a.freeModeMomentumBounceRatio;
                        if (w < t.maxTranslate()) a.freeModeMomentumBounce ? (w + t.maxTranslate() < -C && (w = t.maxTranslate() - C), b = t.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate(), a.loop && a.centeredSlides && (S = !0);
                        else if (w > t.minTranslate()) a.freeModeMomentumBounce ? (w - t.minTranslate() > C && (w = t.minTranslate() + C), b = t.minTranslate(), T = !0, i.allowMomentumBounce = !0) : w = t.minTranslate(), a.loop && a.centeredSlides && (S = !0);
                        else if (a.freeModeSticky) {
                            for (var M, z = 0; z < l.length; z += 1)
                                if (l[z] > -w) {
                                    M = z;
                                    break
                                }
                            w = -(w = Math.abs(l[M] - w) < Math.abs(l[M - 1] - w) || "next" === t.swipeDirection ? l[M] : l[M - 1])
                        }
                        if (S && t.once("transitionEnd", (function () {
                            t.loopFix()
                        })), 0 !== t.velocity) {
                            if (g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity), a.freeModeSticky) {
                                var _ = Math.abs((r ? -w : w) - t.translate),
                                    I = t.slidesSizesGrid[t.activeIndex];
                                g = _ < I ? a.speed : _ < 2 * I ? 1.5 * a.speed : 2.5 * a.speed
                            }
                        } else if (a.freeModeSticky) return void t.slideToClosest();
                        a.freeModeMomentumBounce && T ? (t.updateProgress(b), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, s.transitionEnd((function () {
                            t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(a.speed), setTimeout((function () {
                                t.setTranslate(b), s.transitionEnd((function () {
                                    t && !t.destroyed && t.transitionEnd()
                                }))
                            }), 0))
                        }))) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, s.transitionEnd((function () {
                            t && !t.destroyed && t.transitionEnd()
                        })))) : (t.emit("_freeModeNoMomentumRelease"), t.updateProgress(w)), t.updateActiveIndex(), t.updateSlidesClasses()
                    } else {
                        if (a.freeModeSticky) return void t.slideToClosest();
                        a.freeMode && t.emit("_freeModeNoMomentumRelease")
                    } (!a.freeModeMomentum || p >= a.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                } else {
                    for (var P = 0, L = t.slidesSizesGrid[0], k = 0; k < o.length; k += k < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
                        var O = k < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
                        void 0 !== o[k + O] ? u >= o[k] && u < o[k + O] && (P = k, L = o[k + O] - o[k]) : u >= o[k] && (P = k, L = o[o.length - 1] - o[o.length - 2])
                    }
                    var A = (u - o[P]) / L,
                        $ = P < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
                    if (p > a.longSwipesMs) {
                        if (!a.longSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && (A >= a.longSwipesRatio ? t.slideTo(P + $) : t.slideTo(P)), "prev" === t.swipeDirection && (A > 1 - a.longSwipesRatio ? t.slideTo(P + $) : t.slideTo(P))
                    } else {
                        if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
                        !t.navigation || d.target !== t.navigation.nextEl && d.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(P + $), "prev" === t.swipeDirection && t.slideTo(P)) : d.target === t.navigation.nextEl ? t.slideTo(P + $) : t.slideTo(P)
                    }
                }
        }

        function D() {
            var e = this,
                t = e.params,
                i = e.el;
            if (!i || 0 !== i.offsetWidth) {
                t.breakpoints && e.setBreakpoint();
                var a = e.allowSlideNext,
                    n = e.allowSlidePrev,
                    r = e.snapGrid;
                e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = n, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
            }
        }

        function N(e) {
            var t = this;
            t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
        }

        function B() {
            var e = this,
                t = e.wrapperEl,
                i = e.rtlTranslate;
            e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = i ? t.scrollWidth - t.offsetWidth - t.scrollLeft : -t.scrollLeft : e.translate = -t.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
            var a = e.maxTranslate() - e.minTranslate();
            (0 === a ? 0 : (e.translate - e.minTranslate()) / a) !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
        }
        var H = !1;

        function W() { }
        var F = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !1,
            nested: !1,
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1
        },
            R = {
                modular: {
                    useParams: function (e) {
                        var t = this;
                        t.modules && Object.keys(t.modules).forEach((function (i) {
                            var a = t.modules[i];
                            a.params && C(e, a.params)
                        }))
                    },
                    useModules: function (e) {
                        void 0 === e && (e = {});
                        var t = this;
                        t.modules && Object.keys(t.modules).forEach((function (i) {
                            var a = t.modules[i],
                                n = e[i] || {};
                            a.on && t.on && Object.keys(a.on).forEach((function (e) {
                                t.on(e, a.on[e])
                            })), a.create && a.create.bind(t)(n)
                        }))
                    }
                },
                eventsEmitter: {
                    on: function (e, t, i) {
                        var a = this;
                        if ("function" != typeof t) return a;
                        var n = i ? "unshift" : "push";
                        return e.split(" ").forEach((function (e) {
                            a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][n](t)
                        })), a
                    },
                    once: function (e, t, i) {
                        var a = this;
                        if ("function" != typeof t) return a;

                        function n() {
                            a.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
                            for (var i = arguments.length, r = new Array(i), s = 0; s < i; s++) r[s] = arguments[s];
                            t.apply(a, r)
                        }
                        return n.__emitterProxy = t, a.on(e, n, i)
                    },
                    onAny: function (e, t) {
                        var i = this;
                        if ("function" != typeof e) return i;
                        var a = t ? "unshift" : "push";
                        return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[a](e), i
                    },
                    offAny: function (e) {
                        var t = this;
                        if (!t.eventsAnyListeners) return t;
                        var i = t.eventsAnyListeners.indexOf(e);
                        return i >= 0 && t.eventsAnyListeners.splice(i, 1), t
                    },
                    off: function (e, t) {
                        var i = this;
                        return i.eventsListeners ? (e.split(" ").forEach((function (e) {
                            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].forEach((function (a, n) {
                                (a === t || a.__emitterProxy && a.__emitterProxy === t) && i.eventsListeners[e].splice(n, 1)
                            }))
                        })), i) : i
                    },
                    emit: function () {
                        var e, t, i, a = this;
                        if (!a.eventsListeners) return a;
                        for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++) r[s] = arguments[s];
                        "string" == typeof r[0] || Array.isArray(r[0]) ? (e = r[0], t = r.slice(1, r.length), i = a) : (e = r[0].events, t = r[0].data, i = r[0].context || a), t.unshift(i);
                        var o = Array.isArray(e) ? e : e.split(" ");
                        return o.forEach((function (e) {
                            a.eventsAnyListeners && a.eventsAnyListeners.length && a.eventsAnyListeners.forEach((function (a) {
                                a.apply(i, [e].concat(t))
                            })), a.eventsListeners && a.eventsListeners[e] && a.eventsListeners[e].forEach((function (e) {
                                e.apply(i, t)
                            }))
                        })), a
                    }
                },
                update: {
                    updateSize: function () {
                        var e, t, i = this,
                            a = i.$el;
                        e = void 0 !== i.params.width && null !== i.params.width ? i.params.width : a[0].clientWidth, t = void 0 !== i.params.height && null !== i.params.height ? i.params.height : a[0].clientHeight, 0 === e && i.isHorizontal() || 0 === t && i.isVertical() || (e = e - parseInt(a.css("padding-left") || 0, 10) - parseInt(a.css("padding-right") || 0, 10), t = t - parseInt(a.css("padding-top") || 0, 10) - parseInt(a.css("padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), C(i, {
                            width: e,
                            height: t,
                            size: i.isHorizontal() ? e : t
                        }))
                    },
                    updateSlides: function () {
                        var e = this,
                            t = function (t) {
                                return e.isHorizontal() ? t : {
                                    width: "height",
                                    "margin-top": "margin-left",
                                    "margin-bottom ": "margin-right",
                                    "margin-left": "margin-top",
                                    "margin-right": "margin-bottom",
                                    "padding-left": "padding-top",
                                    "padding-right": "padding-bottom",
                                    marginRight: "marginBottom"
                                }[t]
                            },
                            i = function (e, i) {
                                return parseFloat(e.getPropertyValue(t(i)) || 0)
                            },
                            a = o(),
                            n = e.params,
                            r = e.$wrapperEl,
                            s = e.size,
                            l = e.rtlTranslate,
                            d = e.wrongRTL,
                            u = e.virtual && n.virtual.enabled,
                            c = u ? e.virtual.slides.length : e.slides.length,
                            p = r.children("." + e.params.slideClass),
                            h = u ? e.virtual.slides.length : p.length,
                            f = [],
                            m = [],
                            v = [],
                            g = n.slidesOffsetBefore;
                        "function" == typeof g && (g = n.slidesOffsetBefore.call(e));
                        var y = n.slidesOffsetAfter;
                        "function" == typeof y && (y = n.slidesOffsetAfter.call(e));
                        var w = e.snapGrid.length,
                            b = e.slidesGrid.length,
                            E = n.spaceBetween,
                            x = -g,
                            S = 0,
                            T = 0;
                        if (void 0 !== s) {
                            var M, z;
                            "string" == typeof E && E.indexOf("%") >= 0 && (E = parseFloat(E.replace("%", "")) / 100 * s), e.virtualSize = -E, l ? p.css({
                                marginLeft: "",
                                marginTop: ""
                            }) : p.css({
                                marginRight: "",
                                marginBottom: ""
                            }), n.slidesPerColumn > 1 && (M = Math.floor(h / n.slidesPerColumn) === h / e.params.slidesPerColumn ? h : Math.ceil(h / n.slidesPerColumn) * n.slidesPerColumn, "auto" !== n.slidesPerView && "row" === n.slidesPerColumnFill && (M = Math.max(M, n.slidesPerView * n.slidesPerColumn)));
                            for (var _, I, P, L = n.slidesPerColumn, k = M / L, O = Math.floor(h / n.slidesPerColumn), A = 0; A < h; A += 1) {
                                z = 0;
                                var $ = p.eq(A);
                                if (n.slidesPerColumn > 1) {
                                    var D = void 0,
                                        N = void 0,
                                        B = void 0;
                                    if ("row" === n.slidesPerColumnFill && n.slidesPerGroup > 1) {
                                        var H = Math.floor(A / (n.slidesPerGroup * n.slidesPerColumn)),
                                            W = A - n.slidesPerColumn * n.slidesPerGroup * H,
                                            F = 0 === H ? n.slidesPerGroup : Math.min(Math.ceil((h - H * L * n.slidesPerGroup) / L), n.slidesPerGroup);
                                        D = (N = W - (B = Math.floor(W / F)) * F + H * n.slidesPerGroup) + B * M / L, $.css({
                                            "-webkit-box-ordinal-group": D,
                                            "-moz-box-ordinal-group": D,
                                            "-ms-flex-order": D,
                                            "-webkit-order": D,
                                            order: D
                                        })
                                    } else "column" === n.slidesPerColumnFill ? (B = A - (N = Math.floor(A / L)) * L, (N > O || N === O && B === L - 1) && (B += 1) >= L && (B = 0, N += 1)) : N = A - (B = Math.floor(A / k)) * k;
                                    $.css(t("margin-top"), 0 !== B && n.spaceBetween && n.spaceBetween + "px")
                                }
                                if ("none" !== $.css("display")) {
                                    if ("auto" === n.slidesPerView) {
                                        var R = a.getComputedStyle($[0], null),
                                            G = $[0].style.transform,
                                            q = $[0].style.webkitTransform;
                                        if (G && ($[0].style.transform = "none"), q && ($[0].style.webkitTransform = "none"), n.roundLengths) z = e.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0);
                                        else {
                                            var Y = i(R, "width"),
                                                j = i(R, "padding-left"),
                                                X = i(R, "padding-right"),
                                                V = i(R, "margin-left"),
                                                U = i(R, "margin-right"),
                                                Q = R.getPropertyValue(R, "box-sizing");
                                            if (Q && "border-box" === Q) z = Y + V + U;
                                            else {
                                                var K = $[0],
                                                    J = K.clientWidth;
                                                z = Y + j + X + V + U + (K.offsetWidth - J)
                                            }
                                        }
                                        G && ($[0].style.transform = G), q && ($[0].style.webkitTransform = q), n.roundLengths && (z = Math.floor(z))
                                    } else z = (s - (n.slidesPerView - 1) * E) / n.slidesPerView, n.roundLengths && (z = Math.floor(z)), p[A] && (p[A].style[t("width")] = z + "px");
                                    p[A] && (p[A].swiperSlideSize = z), v.push(z), n.centeredSlides ? (x = x + z / 2 + S / 2 + E, 0 === S && 0 !== A && (x = x - s / 2 - E), 0 === A && (x = x - s / 2 - E), Math.abs(x) < .001 && (x = 0), n.roundLengths && (x = Math.floor(x)), T % n.slidesPerGroup == 0 && f.push(x), m.push(x)) : (n.roundLengths && (x = Math.floor(x)), (T - Math.min(e.params.slidesPerGroupSkip, T)) % e.params.slidesPerGroup == 0 && f.push(x), m.push(x), x = x + z + E), e.virtualSize += z + E, S = z, T += 1
                                }
                            }
                            if (e.virtualSize = Math.max(e.virtualSize, s) + y, l && d && ("slide" === n.effect || "coverflow" === n.effect) && r.css({
                                width: e.virtualSize + n.spaceBetween + "px"
                            }), n.setWrapperSize && r.css(((I = {})[t("width")] = e.virtualSize + n.spaceBetween + "px", I)), n.slidesPerColumn > 1 && (e.virtualSize = (z + n.spaceBetween) * M, e.virtualSize = Math.ceil(e.virtualSize / n.slidesPerColumn) - n.spaceBetween, r.css(((P = {})[t("width")] = e.virtualSize + n.spaceBetween + "px", P)), n.centeredSlides)) {
                                _ = [];
                                for (var Z = 0; Z < f.length; Z += 1) {
                                    var ee = f[Z];
                                    n.roundLengths && (ee = Math.floor(ee)), f[Z] < e.virtualSize + f[0] && _.push(ee)
                                }
                                f = _
                            }
                            if (!n.centeredSlides) {
                                _ = [];
                                for (var te = 0; te < f.length; te += 1) {
                                    var ie = f[te];
                                    n.roundLengths && (ie = Math.floor(ie)), f[te] <= e.virtualSize - s && _.push(ie)
                                }
                                f = _, Math.floor(e.virtualSize - s) - Math.floor(f[f.length - 1]) > 1 && f.push(e.virtualSize - s)
                            }
                            if (0 === f.length && (f = [0]), 0 !== n.spaceBetween) {
                                var ae, ne = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
                                p.filter((function (e, t) {
                                    return !n.cssMode || t !== p.length - 1
                                })).css(((ae = {})[ne] = E + "px", ae))
                            }
                            if (n.centeredSlides && n.centeredSlidesBounds) {
                                var re = 0;
                                v.forEach((function (e) {
                                    re += e + (n.spaceBetween ? n.spaceBetween : 0)
                                }));
                                var se = (re -= n.spaceBetween) - s;
                                f = f.map((function (e) {
                                    return e < 0 ? -g : e > se ? se + y : e
                                }))
                            }
                            if (n.centerInsufficientSlides) {
                                var oe = 0;
                                if (v.forEach((function (e) {
                                    oe += e + (n.spaceBetween ? n.spaceBetween : 0)
                                })), (oe -= n.spaceBetween) < s) {
                                    var le = (s - oe) / 2;
                                    f.forEach((function (e, t) {
                                        f[t] = e - le
                                    })), m.forEach((function (e, t) {
                                        m[t] = e + le
                                    }))
                                }
                            }
                            C(e, {
                                slides: p,
                                snapGrid: f,
                                slidesGrid: m,
                                slidesSizesGrid: v
                            }), h !== c && e.emit("slidesLengthChange"), f.length !== w && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), m.length !== b && e.emit("slidesGridLengthChange"), (n.watchSlidesProgress || n.watchSlidesVisibility) && e.updateSlidesOffset()
                        }
                    },
                    updateAutoHeight: function (e) {
                        var t, i = this,
                            a = [],
                            n = 0;
                        if ("number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed), "auto" !== i.params.slidesPerView && i.params.slidesPerView > 1)
                            if (i.params.centeredSlides) i.visibleSlides.each((function (e) {
                                a.push(e)
                            }));
                            else
                                for (t = 0; t < Math.ceil(i.params.slidesPerView); t += 1) {
                                    var r = i.activeIndex + t;
                                    if (r > i.slides.length) break;
                                    a.push(i.slides.eq(r)[0])
                                } else a.push(i.slides.eq(i.activeIndex)[0]);
                        for (t = 0; t < a.length; t += 1)
                            if (void 0 !== a[t]) {
                                var s = a[t].offsetHeight;
                                n = s > n ? s : n
                            }
                        n && i.$wrapperEl.css("height", n + "px")
                    },
                    updateSlidesOffset: function () {
                        for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
                    },
                    updateSlidesProgress: function (e) {
                        void 0 === e && (e = this && this.translate || 0);
                        var t = this,
                            i = t.params,
                            a = t.slides,
                            n = t.rtlTranslate;
                        if (0 !== a.length) {
                            void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
                            var r = -e;
                            n && (r = e), a.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                            for (var s = 0; s < a.length; s += 1) {
                                var o = a[s],
                                    l = (r + (i.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + i.spaceBetween);
                                if (i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) {
                                    var d = -(r - o.swiperSlideOffset),
                                        u = d + t.slidesSizesGrid[s];
                                    (d >= 0 && d < t.size - 1 || u > 1 && u <= t.size || d <= 0 && u >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(s), a.eq(s).addClass(i.slideVisibleClass))
                                }
                                o.progress = n ? -l : l
                            }
                            t.visibleSlides = v(t.visibleSlides)
                        }
                    },
                    updateProgress: function (e) {
                        var t = this;
                        if (void 0 === e) {
                            var i = t.rtlTranslate ? -1 : 1;
                            e = t && t.translate && t.translate * i || 0
                        }
                        var a = t.params,
                            n = t.maxTranslate() - t.minTranslate(),
                            r = t.progress,
                            s = t.isBeginning,
                            o = t.isEnd,
                            l = s,
                            d = o;
                        0 === n ? (r = 0, s = !0, o = !0) : (s = (r = (e - t.minTranslate()) / n) <= 0, o = r >= 1), C(t, {
                            progress: r,
                            isBeginning: s,
                            isEnd: o
                        }), (a.watchSlidesProgress || a.watchSlidesVisibility || a.centeredSlides && a.autoHeight) && t.updateSlidesProgress(e), s && !l && t.emit("reachBeginning toEdge"), o && !d && t.emit("reachEnd toEdge"), (l && !s || d && !o) && t.emit("fromEdge"), t.emit("progress", r)
                    },
                    updateSlidesClasses: function () {
                        var e, t = this,
                            i = t.slides,
                            a = t.params,
                            n = t.$wrapperEl,
                            r = t.activeIndex,
                            s = t.realIndex,
                            o = t.virtual && a.virtual.enabled;
                        i.removeClass(a.slideActiveClass + " " + a.slideNextClass + " " + a.slidePrevClass + " " + a.slideDuplicateActiveClass + " " + a.slideDuplicateNextClass + " " + a.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + a.slideClass + '[data-swiper-slide-index="' + r + '"]') : i.eq(r)).addClass(a.slideActiveClass), a.loop && (e.hasClass(a.slideDuplicateClass) ? n.children("." + a.slideClass + ":not(." + a.slideDuplicateClass + ')[data-swiper-slide-index="' + s + '"]').addClass(a.slideDuplicateActiveClass) : n.children("." + a.slideClass + "." + a.slideDuplicateClass + '[data-swiper-slide-index="' + s + '"]').addClass(a.slideDuplicateActiveClass));
                        var l = e.nextAll("." + a.slideClass).eq(0).addClass(a.slideNextClass);
                        a.loop && 0 === l.length && (l = i.eq(0)).addClass(a.slideNextClass);
                        var d = e.prevAll("." + a.slideClass).eq(0).addClass(a.slidePrevClass);
                        a.loop && 0 === d.length && (d = i.eq(-1)).addClass(a.slidePrevClass), a.loop && (l.hasClass(a.slideDuplicateClass) ? n.children("." + a.slideClass + ":not(." + a.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicateNextClass) : n.children("." + a.slideClass + "." + a.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicateNextClass), d.hasClass(a.slideDuplicateClass) ? n.children("." + a.slideClass + ":not(." + a.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicatePrevClass) : n.children("." + a.slideClass + "." + a.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicatePrevClass)), t.emitSlidesClasses()
                    },
                    updateActiveIndex: function (e) {
                        var t, i = this,
                            a = i.rtlTranslate ? i.translate : -i.translate,
                            n = i.slidesGrid,
                            r = i.snapGrid,
                            s = i.params,
                            o = i.activeIndex,
                            l = i.realIndex,
                            d = i.snapIndex,
                            u = e;
                        if (void 0 === u) {
                            for (var c = 0; c < n.length; c += 1) void 0 !== n[c + 1] ? a >= n[c] && a < n[c + 1] - (n[c + 1] - n[c]) / 2 ? u = c : a >= n[c] && a < n[c + 1] && (u = c + 1) : a >= n[c] && (u = c);
                            s.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0)
                        }
                        if (r.indexOf(a) >= 0) t = r.indexOf(a);
                        else {
                            var p = Math.min(s.slidesPerGroupSkip, u);
                            t = p + Math.floor((u - p) / s.slidesPerGroup)
                        }
                        if (t >= r.length && (t = r.length - 1), u !== o) {
                            var h = parseInt(i.slides.eq(u).attr("data-swiper-slide-index") || u, 10);
                            C(i, {
                                snapIndex: t,
                                realIndex: h,
                                previousIndex: o,
                                activeIndex: u
                            }), i.emit("activeIndexChange"), i.emit("snapIndexChange"), l !== h && i.emit("realIndexChange"), (i.initialized || i.params.runCallbacksOnInit) && i.emit("slideChange")
                        } else t !== d && (i.snapIndex = t, i.emit("snapIndexChange"))
                    },
                    updateClickedSlide: function (e) {
                        var t, i = this,
                            a = i.params,
                            n = v(e.target).closest("." + a.slideClass)[0],
                            r = !1;
                        if (n)
                            for (var s = 0; s < i.slides.length; s += 1)
                                if (i.slides[s] === n) {
                                    r = !0, t = s;
                                    break
                                }
                        if (!n || !r) return i.clickedSlide = void 0, void (i.clickedIndex = void 0);
                        i.clickedSlide = n, i.virtual && i.params.virtual.enabled ? i.clickedIndex = parseInt(v(n).attr("data-swiper-slide-index"), 10) : i.clickedIndex = t, a.slideToClickedSlide && void 0 !== i.clickedIndex && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide()
                    }
                },
                translate: {
                    getTranslate: function (e) {
                        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                        var t = this,
                            i = t.params,
                            a = t.rtlTranslate,
                            n = t.translate,
                            r = t.$wrapperEl;
                        if (i.virtualTranslate) return a ? -n : n;
                        if (i.cssMode) return n;
                        var s = S(r[0], e);
                        return a && (s = -s), s || 0
                    },
                    setTranslate: function (e, t) {
                        var i = this,
                            a = i.rtlTranslate,
                            n = i.params,
                            r = i.$wrapperEl,
                            s = i.wrapperEl,
                            o = i.progress,
                            l = 0,
                            d = 0;
                        i.isHorizontal() ? l = a ? -e : e : d = e, n.roundLengths && (l = Math.floor(l), d = Math.floor(d)), n.cssMode ? s[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -d : n.virtualTranslate || r.transform("translate3d(" + l + "px, " + d + "px, 0px)"), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : d;
                        var u = i.maxTranslate() - i.minTranslate();
                        (0 === u ? 0 : (e - i.minTranslate()) / u) !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
                    },
                    minTranslate: function () {
                        return -this.snapGrid[0]
                    },
                    maxTranslate: function () {
                        return -this.snapGrid[this.snapGrid.length - 1]
                    },
                    translateTo: function (e, t, i, a, n) {
                        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === a && (a = !0);
                        var r = this,
                            s = r.params,
                            o = r.wrapperEl;
                        if (r.animating && s.preventInteractionOnTransition) return !1;
                        var l, d = r.minTranslate(),
                            u = r.maxTranslate();
                        if (l = a && e > d ? d : a && e < u ? u : e, r.updateProgress(l), s.cssMode) {
                            var c, p = r.isHorizontal();
                            return 0 === t ? o[p ? "scrollLeft" : "scrollTop"] = -l : o.scrollTo ? o.scrollTo(((c = {})[p ? "left" : "top"] = -l, c.behavior = "smooth", c)) : o[p ? "scrollLeft" : "scrollTop"] = -l, !0
                        }
                        return 0 === t ? (r.setTransition(0), r.setTranslate(l), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(l), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) {
                            r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, i && r.emit("transitionEnd"))
                        }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                    }
                },
                transition: {
                    setTransition: function (e, t) {
                        var i = this;
                        i.params.cssMode || i.$wrapperEl.transition(e), i.emit("setTransition", e, t)
                    },
                    transitionStart: function (e, t) {
                        void 0 === e && (e = !0);
                        var i = this,
                            a = i.activeIndex,
                            n = i.params,
                            r = i.previousIndex;
                        if (!n.cssMode) {
                            n.autoHeight && i.updateAutoHeight();
                            var s = t;
                            if (s || (s = a > r ? "next" : a < r ? "prev" : "reset"), i.emit("transitionStart"), e && a !== r) {
                                if ("reset" === s) return void i.emit("slideResetTransitionStart");
                                i.emit("slideChangeTransitionStart"), "next" === s ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart")
                            }
                        }
                    },
                    transitionEnd: function (e, t) {
                        void 0 === e && (e = !0);
                        var i = this,
                            a = i.activeIndex,
                            n = i.previousIndex,
                            r = i.params;
                        if (i.animating = !1, !r.cssMode) {
                            i.setTransition(0);
                            var s = t;
                            if (s || (s = a > n ? "next" : a < n ? "prev" : "reset"), i.emit("transitionEnd"), e && a !== n) {
                                if ("reset" === s) return void i.emit("slideResetTransitionEnd");
                                i.emit("slideChangeTransitionEnd"), "next" === s ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd")
                            }
                        }
                    }
                },
                slide: {
                    slideTo: function (e, t, i, a) {
                        if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "number" != typeof e && "string" != typeof e) throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [" + typeof e + "] given.");
                        if ("string" == typeof e) {
                            var n = parseInt(e, 10);
                            if (!isFinite(n)) throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [" + e + "] given.");
                            e = n
                        }
                        var r = this,
                            s = e;
                        s < 0 && (s = 0);
                        var o = r.params,
                            l = r.snapGrid,
                            d = r.slidesGrid,
                            u = r.previousIndex,
                            c = r.activeIndex,
                            p = r.rtlTranslate,
                            h = r.wrapperEl;
                        if (r.animating && o.preventInteractionOnTransition) return !1;
                        var f = Math.min(r.params.slidesPerGroupSkip, s),
                            m = f + Math.floor((s - f) / r.params.slidesPerGroup);
                        m >= l.length && (m = l.length - 1), (c || o.initialSlide || 0) === (u || 0) && i && r.emit("beforeSlideChangeStart");
                        var v, g = -l[m];
                        if (r.updateProgress(g), o.normalizeSlideIndex)
                            for (var y = 0; y < d.length; y += 1) {
                                var w = -Math.floor(100 * g),
                                    b = Math.floor(100 * d[y]),
                                    E = Math.floor(100 * d[y + 1]);
                                void 0 !== d[y + 1] ? w >= b && w < E - (E - b) / 2 ? s = y : w >= b && w < E && (s = y + 1) : w >= b && (s = y)
                            }
                        if (r.initialized && s !== c) {
                            if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
                            if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (c || 0) !== s) return !1
                        }
                        if (v = s > c ? "next" : s < c ? "prev" : "reset", p && -g === r.translate || !p && g === r.translate) return r.updateActiveIndex(s), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(g), "reset" !== v && (r.transitionStart(i, v), r.transitionEnd(i, v)), !1;
                        if (o.cssMode) {
                            var x, S = r.isHorizontal(),
                                T = -g;
                            return p && (T = h.scrollWidth - h.offsetWidth - T), 0 === t ? h[S ? "scrollLeft" : "scrollTop"] = T : h.scrollTo ? h.scrollTo(((x = {})[S ? "left" : "top"] = T, x.behavior = "smooth", x)) : h[S ? "scrollLeft" : "scrollTop"] = T, !0
                        }
                        return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(s), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(i, v), r.transitionEnd(i, v)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(s), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(i, v), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
                            r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, v))
                        }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
                    },
                    slideToLoop: function (e, t, i, a) {
                        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
                        var n = this,
                            r = e;
                        return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, i, a)
                    },
                    slideNext: function (e, t, i) {
                        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                        var a = this,
                            n = a.params,
                            r = a.animating,
                            s = a.activeIndex < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup;
                        if (n.loop) {
                            if (r && n.loopPreventsSlide) return !1;
                            a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft
                        }
                        return a.slideTo(a.activeIndex + s, e, t, i)
                    },
                    slidePrev: function (e, t, i) {
                        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                        var a = this,
                            n = a.params,
                            r = a.animating,
                            s = a.snapGrid,
                            o = a.slidesGrid,
                            l = a.rtlTranslate;
                        if (n.loop) {
                            if (r && n.loopPreventsSlide) return !1;
                            a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft
                        }

                        function d(e) {
                            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                        }
                        var u = d(l ? a.translate : -a.translate),
                            c = s.map((function (e) {
                                return d(e)
                            }));
                        s[c.indexOf(u)];
                        var p, h = s[c.indexOf(u) - 1];
                        return void 0 === h && n.cssMode && s.forEach((function (e) {
                            !h && u >= e && (h = e)
                        })), void 0 !== h && (p = o.indexOf(h)) < 0 && (p = a.activeIndex - 1), a.slideTo(p, e, t, i)
                    },
                    slideReset: function (e, t, i) {
                        return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
                    },
                    slideToClosest: function (e, t, i, a) {
                        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === a && (a = .5);
                        var n = this,
                            r = n.activeIndex,
                            s = Math.min(n.params.slidesPerGroupSkip, r),
                            o = s + Math.floor((r - s) / n.params.slidesPerGroup),
                            l = n.rtlTranslate ? n.translate : -n.translate;
                        if (l >= n.snapGrid[o]) {
                            var d = n.snapGrid[o];
                            l - d > (n.snapGrid[o + 1] - d) * a && (r += n.params.slidesPerGroup)
                        } else {
                            var u = n.snapGrid[o - 1];
                            l - u <= (n.snapGrid[o] - u) * a && (r -= n.params.slidesPerGroup)
                        }
                        return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, e, t, i)
                    },
                    slideToClickedSlide: function () {
                        var e, t = this,
                            i = t.params,
                            a = t.$wrapperEl,
                            n = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                            r = t.clickedIndex;
                        if (i.loop) {
                            if (t.animating) return;
                            e = parseInt(v(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? r < t.loopedSlides - n / 2 || r > t.slides.length - t.loopedSlides + n / 2 ? (t.loopFix(), r = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), E((function () {
                                t.slideTo(r)
                            }))) : t.slideTo(r) : r > t.slides.length - n ? (t.loopFix(), r = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), E((function () {
                                t.slideTo(r)
                            }))) : t.slideTo(r)
                        } else t.slideTo(r)
                    }
                },
                loop: {
                    loopCreate: function () {
                        var e = this,
                            t = r(),
                            i = e.params,
                            a = e.$wrapperEl;
                        a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
                        var n = a.children("." + i.slideClass);
                        if (i.loopFillGroupWithBlank) {
                            var s = i.slidesPerGroup - n.length % i.slidesPerGroup;
                            if (s !== i.slidesPerGroup) {
                                for (var o = 0; o < s; o += 1) {
                                    var l = v(t.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                                    a.append(l)
                                }
                                n = a.children("." + i.slideClass)
                            }
                        }
                        "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = n.length), e.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), e.loopedSlides += i.loopAdditionalSlides, e.loopedSlides > n.length && (e.loopedSlides = n.length);
                        var d = [],
                            u = [];
                        n.each((function (t, i) {
                            var a = v(t);
                            i < e.loopedSlides && u.push(t), i < n.length && i >= n.length - e.loopedSlides && d.push(t), a.attr("data-swiper-slide-index", i)
                        }));
                        for (var c = 0; c < u.length; c += 1) a.append(v(u[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
                        for (var p = d.length - 1; p >= 0; p -= 1) a.prepend(v(d[p].cloneNode(!0)).addClass(i.slideDuplicateClass))
                    },
                    loopFix: function () {
                        var e = this;
                        e.emit("beforeLoopFix");
                        var t, i = e.activeIndex,
                            a = e.slides,
                            n = e.loopedSlides,
                            r = e.allowSlidePrev,
                            s = e.allowSlideNext,
                            o = e.snapGrid,
                            l = e.rtlTranslate;
                        e.allowSlidePrev = !0, e.allowSlideNext = !0;
                        var d = -o[i] - e.getTranslate();
                        i < n ? (t = a.length - 3 * n + i, t += n, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)) : i >= a.length - n && (t = -a.length + i + n, t += n, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)), e.allowSlidePrev = r, e.allowSlideNext = s, e.emit("loopFix")
                    },
                    loopDestroy: function () {
                        var e = this,
                            t = e.$wrapperEl,
                            i = e.params,
                            a = e.slides;
                        t.children("." + i.slideClass + "." + i.slideDuplicateClass + ",." + i.slideClass + "." + i.slideBlankClass).remove(), a.removeAttr("data-swiper-slide-index")
                    }
                },
                grabCursor: {
                    setGrabCursor: function (e) {
                        var t = this;
                        if (!(t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)) {
                            var i = t.el;
                            i.style.cursor = "move", i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", i.style.cursor = e ? "-moz-grabbin" : "-moz-grab", i.style.cursor = e ? "grabbing" : "grab"
                        }
                    },
                    unsetGrabCursor: function () {
                        var e = this;
                        e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.el.style.cursor = "")
                    }
                },
                manipulation: {
                    appendSlide: function (e) {
                        var t = this,
                            i = t.$wrapperEl,
                            a = t.params;
                        if (a.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                            for (var n = 0; n < e.length; n += 1) e[n] && i.append(e[n]);
                        else i.append(e);
                        a.loop && t.loopCreate(), a.observer && t.support.observer || t.update()
                    },
                    prependSlide: function (e) {
                        var t = this,
                            i = t.params,
                            a = t.$wrapperEl,
                            n = t.activeIndex;
                        i.loop && t.loopDestroy();
                        var r = n + 1;
                        if ("object" == typeof e && "length" in e) {
                            for (var s = 0; s < e.length; s += 1) e[s] && a.prepend(e[s]);
                            r = n + e.length
                        } else a.prepend(e);
                        i.loop && t.loopCreate(), i.observer && t.support.observer || t.update(), t.slideTo(r, 0, !1)
                    },
                    addSlide: function (e, t) {
                        var i = this,
                            a = i.$wrapperEl,
                            n = i.params,
                            r = i.activeIndex;
                        n.loop && (r -= i.loopedSlides, i.loopDestroy(), i.slides = a.children("." + n.slideClass));
                        var s = i.slides.length;
                        if (e <= 0) i.prependSlide(t);
                        else if (e >= s) i.appendSlide(t);
                        else {
                            for (var o = r > e ? r + 1 : r, l = [], d = s - 1; d >= e; d -= 1) {
                                var u = i.slides.eq(d);
                                u.remove(), l.unshift(u)
                            }
                            if ("object" == typeof t && "length" in t) {
                                for (var c = 0; c < t.length; c += 1) t[c] && a.append(t[c]);
                                o = r > e ? r + t.length : r
                            } else a.append(t);
                            for (var p = 0; p < l.length; p += 1) a.append(l[p]);
                            n.loop && i.loopCreate(), n.observer && i.support.observer || i.update(), n.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1)
                        }
                    },
                    removeSlide: function (e) {
                        var t = this,
                            i = t.params,
                            a = t.$wrapperEl,
                            n = t.activeIndex;
                        i.loop && (n -= t.loopedSlides, t.loopDestroy(), t.slides = a.children("." + i.slideClass));
                        var r, s = n;
                        if ("object" == typeof e && "length" in e) {
                            for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < s && (s -= 1);
                            s = Math.max(s, 0)
                        } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < s && (s -= 1), s = Math.max(s, 0);
                        i.loop && t.loopCreate(), i.observer && t.support.observer || t.update(), i.loop ? t.slideTo(s + t.loopedSlides, 0, !1) : t.slideTo(s, 0, !1)
                    },
                    removeAllSlides: function () {
                        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                        this.removeSlide(e)
                    }
                },
                events: {
                    attachEvents: function () {
                        var e = this,
                            t = r(),
                            i = e.params,
                            a = e.touchEvents,
                            n = e.el,
                            s = e.wrapperEl,
                            o = e.device,
                            l = e.support;
                        e.onTouchStart = O.bind(e), e.onTouchMove = A.bind(e), e.onTouchEnd = $.bind(e), i.cssMode && (e.onScroll = B.bind(e)), e.onClick = N.bind(e);
                        var d = !!i.nested;
                        if (!l.touch && l.pointerEvents) n.addEventListener(a.start, e.onTouchStart, !1), t.addEventListener(a.move, e.onTouchMove, d), t.addEventListener(a.end, e.onTouchEnd, !1);
                        else {
                            if (l.touch) {
                                var u = !("touchstart" !== a.start || !l.passiveListener || !i.passiveListeners) && {
                                    passive: !0,
                                    capture: !1
                                };
                                n.addEventListener(a.start, e.onTouchStart, u), n.addEventListener(a.move, e.onTouchMove, l.passiveListener ? {
                                    passive: !1,
                                    capture: d
                                } : d), n.addEventListener(a.end, e.onTouchEnd, u), a.cancel && n.addEventListener(a.cancel, e.onTouchEnd, u), H || (t.addEventListener("touchstart", W), H = !0)
                            } (i.simulateTouch && !o.ios && !o.android || i.simulateTouch && !l.touch && o.ios) && (n.addEventListener("mousedown", e.onTouchStart, !1), t.addEventListener("mousemove", e.onTouchMove, d), t.addEventListener("mouseup", e.onTouchEnd, !1))
                        } (i.preventClicks || i.preventClicksPropagation) && n.addEventListener("click", e.onClick, !0), i.cssMode && s.addEventListener("scroll", e.onScroll), i.updateOnWindowResize ? e.on(o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", D, !0) : e.on("observerUpdate", D, !0)
                    },
                    detachEvents: function () {
                        var e = this,
                            t = r(),
                            i = e.params,
                            a = e.touchEvents,
                            n = e.el,
                            s = e.wrapperEl,
                            o = e.device,
                            l = e.support,
                            d = !!i.nested;
                        if (!l.touch && l.pointerEvents) n.removeEventListener(a.start, e.onTouchStart, !1), t.removeEventListener(a.move, e.onTouchMove, d), t.removeEventListener(a.end, e.onTouchEnd, !1);
                        else {
                            if (l.touch) {
                                var u = !("onTouchStart" !== a.start || !l.passiveListener || !i.passiveListeners) && {
                                    passive: !0,
                                    capture: !1
                                };
                                n.removeEventListener(a.start, e.onTouchStart, u), n.removeEventListener(a.move, e.onTouchMove, d), n.removeEventListener(a.end, e.onTouchEnd, u), a.cancel && n.removeEventListener(a.cancel, e.onTouchEnd, u)
                            } (i.simulateTouch && !o.ios && !o.android || i.simulateTouch && !l.touch && o.ios) && (n.removeEventListener("mousedown", e.onTouchStart, !1), t.removeEventListener("mousemove", e.onTouchMove, d), t.removeEventListener("mouseup", e.onTouchEnd, !1))
                        } (i.preventClicks || i.preventClicksPropagation) && n.removeEventListener("click", e.onClick, !0), i.cssMode && s.removeEventListener("scroll", e.onScroll), e.off(o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", D)
                    }
                },
                breakpoints: {
                    setBreakpoint: function () {
                        var e = this,
                            t = e.activeIndex,
                            i = e.initialized,
                            a = e.loopedSlides,
                            n = void 0 === a ? 0 : a,
                            r = e.params,
                            s = e.$el,
                            o = r.breakpoints;
                        if (o && (!o || 0 !== Object.keys(o).length)) {
                            var l = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
                            if (l && e.currentBreakpoint !== l) {
                                var d = l in o ? o[l] : void 0;
                                d && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function (e) {
                                    var t = d[e];
                                    void 0 !== t && (d[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                                }));
                                var u = d || e.originalParams,
                                    c = r.slidesPerColumn > 1,
                                    p = u.slidesPerColumn > 1;
                                c && !p ? (s.removeClass(r.containerModifierClass + "multirow " + r.containerModifierClass + "multirow-column"), e.emitContainerClasses()) : !c && p && (s.addClass(r.containerModifierClass + "multirow"), "column" === u.slidesPerColumnFill && s.addClass(r.containerModifierClass + "multirow-column"), e.emitContainerClasses());
                                var h = u.direction && u.direction !== r.direction,
                                    f = r.loop && (u.slidesPerView !== r.slidesPerView || h);
                                h && i && e.changeDirection(), C(e.params, u), C(e, {
                                    allowTouchMove: e.params.allowTouchMove,
                                    allowSlideNext: e.params.allowSlideNext,
                                    allowSlidePrev: e.params.allowSlidePrev
                                }), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", u), f && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - n + e.loopedSlides, 0, !1)), e.emit("breakpoint", u)
                            }
                        }
                    },
                    getBreakpoint: function (e, t, i) {
                        if (void 0 === t && (t = "window"), e && ("container" !== t || i)) {
                            var a = !1,
                                n = o(),
                                r = "window" === t ? n.innerWidth : i.clientWidth,
                                s = "window" === t ? n.innerHeight : i.clientHeight,
                                l = Object.keys(e).map((function (e) {
                                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                                        var t = parseFloat(e.substr(1));
                                        return {
                                            value: s * t,
                                            point: e
                                        }
                                    }
                                    return {
                                        value: e,
                                        point: e
                                    }
                                }));
                            l.sort((function (e, t) {
                                return parseInt(e.value, 10) - parseInt(t.value, 10)
                            }));
                            for (var d = 0; d < l.length; d += 1) {
                                var u = l[d],
                                    c = u.point;
                                u.value <= r && (a = c)
                            }
                            return a || "max"
                        }
                    }
                },
                checkOverflow: {
                    checkOverflow: function () {
                        var e = this,
                            t = e.params,
                            i = e.isLocked,
                            a = e.slides.length > 0 && t.slidesOffsetBefore + t.spaceBetween * (e.slides.length - 1) + e.slides[0].offsetWidth * e.slides.length;
                        t.slidesOffsetBefore && t.slidesOffsetAfter && a ? e.isLocked = a <= e.size : e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, i !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), i && i !== e.isLocked && (e.isEnd = !1, e.navigation && e.navigation.update())
                    }
                },
                classes: {
                    addClasses: function () {
                        var e, t, i, a = this,
                            n = a.classNames,
                            r = a.params,
                            s = a.rtl,
                            o = a.$el,
                            l = a.device,
                            d = a.support,
                            u = (e = ["initialized", r.direction, {
                                "pointer-events": d.pointerEvents && !d.touch
                            }, {
                                    "free-mode": r.freeMode
                                }, {
                                    autoheight: r.autoHeight
                                }, {
                                    rtl: s
                                }, {
                                    multirow: r.slidesPerColumn > 1
                                }, {
                                    "multirow-column": r.slidesPerColumn > 1 && "column" === r.slidesPerColumnFill
                                }, {
                                    android: l.android
                                }, {
                                    ios: l.ios
                                }, {
                                    "css-mode": r.cssMode
                                }], t = r.containerModifierClass, i = [], e.forEach((function (e) {
                                    "object" == typeof e ? Object.entries(e).forEach((function (e) {
                                        var a = e[0];
                                        e[1] && i.push(t + a)
                                    })) : "string" == typeof e && i.push(t + e)
                                })), i);
                        n.push.apply(n, u), o.addClass([].concat(n).join(" ")), a.emitContainerClasses()
                    },
                    removeClasses: function () {
                        var e = this,
                            t = e.$el,
                            i = e.classNames;
                        t.removeClass(i.join(" ")), e.emitContainerClasses()
                    }
                },
                images: {
                    loadImage: function (e, t, i, a, n, r) {
                        var s, l = o();

                        function d() {
                            r && r()
                        }
                        v(e).parent("picture")[0] || e.complete && n ? d() : t ? ((s = new l.Image).onload = d, s.onerror = d, a && (s.sizes = a), i && (s.srcset = i), t && (s.src = t)) : d()
                    },
                    preloadImages: function () {
                        var e = this;

                        function t() {
                            null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                        }
                        e.imagesToLoad = e.$el.find("img");
                        for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                            var a = e.imagesToLoad[i];
                            e.loadImage(a, a.currentSrc || a.getAttribute("src"), a.srcset || a.getAttribute("srcset"), a.sizes || a.getAttribute("sizes"), !0, t)
                        }
                    }
                }
            },
            G = {},
            q = function () {
                function t() {
                    for (var e, i, a = arguments.length, n = new Array(a), r = 0; r < a; r++) n[r] = arguments[r];
                    if (1 === n.length && n[0].constructor && n[0].constructor === Object ? i = n[0] : (e = n[0], i = n[1]), i || (i = {}), i = C({}, i), e && !i.el && (i.el = e), i.el && v(i.el).length > 1) {
                        var s = [];
                        return v(i.el).each((function (e) {
                            var a = C({}, i, {
                                el: e
                            });
                            s.push(new t(a))
                        })), s
                    }
                    var o = this;
                    o.support = z(), o.device = _({
                        userAgent: i.userAgent
                    }), o.browser = I(), o.eventsListeners = {}, o.eventsAnyListeners = [], void 0 === o.modules && (o.modules = {}), Object.keys(o.modules).forEach((function (e) {
                        var t = o.modules[e];
                        if (t.params) {
                            var a = Object.keys(t.params)[0],
                                n = t.params[a];
                            if ("object" != typeof n || null === n) return;
                            if (!(a in i) || !("enabled" in n)) return;
                            !0 === i[a] && (i[a] = {
                                enabled: !0
                            }), "object" != typeof i[a] || "enabled" in i[a] || (i[a].enabled = !0), i[a] || (i[a] = {
                                enabled: !1
                            })
                        }
                    }));
                    var l, d, u = C({}, F);
                    return o.useParams(u), o.params = C({}, u, G, i), o.originalParams = C({}, o.params), o.passedParams = C({}, i), o.params && o.params.on && Object.keys(o.params.on).forEach((function (e) {
                        o.on(e, o.params.on[e])
                    })), o.params && o.params.onAny && o.onAny(o.params.onAny), o.$ = v, C(o, {
                        el: e,
                        classNames: [],
                        slides: v(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === o.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === o.params.direction
                        },
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: o.params.allowSlideNext,
                        allowSlidePrev: o.params.allowSlidePrev,
                        touchEvents: (l = ["touchstart", "touchmove", "touchend", "touchcancel"], d = ["mousedown", "mousemove", "mouseup"], o.support.pointerEvents && (d = ["pointerdown", "pointermove", "pointerup"]), o.touchEventsTouch = {
                            start: l[0],
                            move: l[1],
                            end: l[2],
                            cancel: l[3]
                        }, o.touchEventsDesktop = {
                            start: d[0],
                            move: d[1],
                            end: d[2]
                        }, o.support.touch || !o.params.simulateTouch ? o.touchEventsTouch : o.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video, label",
                            lastClickTime: x(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: o.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), o.useModules(), o.emit("_swiper"), o.params.init && o.init(), o
                }
                var i, a, n = t.prototype;
                return n.emitContainerClasses = function () {
                    var e = this;
                    if (e.params._emitClasses && e.el) {
                        var t = e.el.className.split(" ").filter((function (t) {
                            return 0 === t.indexOf("swiper-container") || 0 === t.indexOf(e.params.containerModifierClass)
                        }));
                        e.emit("_containerClasses", t.join(" "))
                    }
                }, n.getSlideClasses = function (e) {
                    var t = this;
                    return e.className.split(" ").filter((function (e) {
                        return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)
                    })).join(" ")
                }, n.emitSlidesClasses = function () {
                    var e = this;
                    if (e.params._emitClasses && e.el) {
                        var t = [];
                        e.slides.each((function (i) {
                            var a = e.getSlideClasses(i);
                            t.push({
                                slideEl: i,
                                classNames: a
                            }), e.emit("_slideClass", i, a)
                        })), e.emit("_slideClasses", t)
                    }
                }, n.slidesPerViewDynamic = function () {
                    var e = this,
                        t = e.params,
                        i = e.slides,
                        a = e.slidesGrid,
                        n = e.size,
                        r = e.activeIndex,
                        s = 1;
                    if (t.centeredSlides) {
                        for (var o, l = i[r].swiperSlideSize, d = r + 1; d < i.length; d += 1) i[d] && !o && (s += 1, (l += i[d].swiperSlideSize) > n && (o = !0));
                        for (var u = r - 1; u >= 0; u -= 1) i[u] && !o && (s += 1, (l += i[u].swiperSlideSize) > n && (o = !0))
                    } else
                        for (var c = r + 1; c < i.length; c += 1) a[c] - a[r] < n && (s += 1);
                    return s
                }, n.update = function () {
                    var e = this;
                    if (e && !e.destroyed) {
                        var t = e.snapGrid,
                            i = e.params;
                        i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (a(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || a(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                    }

                    function a() {
                        var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                    }
                }, n.changeDirection = function (e, t) {
                    void 0 === t && (t = !0);
                    var i = this,
                        a = i.params.direction;
                    return e || (e = "horizontal" === a ? "vertical" : "horizontal"), e === a || "horizontal" !== e && "vertical" !== e || (i.$el.removeClass("" + i.params.containerModifierClass + a).addClass("" + i.params.containerModifierClass + e), i.emitContainerClasses(), i.params.direction = e, i.slides.each((function (t) {
                        "vertical" === e ? t.style.width = "" : t.style.height = ""
                    })), i.emit("changeDirection"), t && i.update()), i
                }, n.mount = function (e) {
                    var t = this;
                    if (t.mounted) return !0;
                    var i, a = v(e || t.params.el);
                    return !!(e = a[0]) && (e.swiper = t, e && e.shadowRoot && e.shadowRoot.querySelector ? (i = v(e.shadowRoot.querySelector("." + t.params.wrapperClass))).children = function (e) {
                        return a.children(e)
                    } : i = a.children("." + t.params.wrapperClass), C(t, {
                        $el: a,
                        el: e,
                        $wrapperEl: i,
                        wrapperEl: i[0],
                        mounted: !0,
                        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === a.css("direction"),
                        rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === a.css("direction")),
                        wrongRTL: "-webkit-box" === i.css("display")
                    }), !0)
                }, n.init = function (e) {
                    var t = this;
                    return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
                }, n.destroy = function (e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0);
                    var i, a = this,
                        n = a.params,
                        r = a.$el,
                        s = a.$wrapperEl,
                        o = a.slides;
                    return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), n.loop && a.loopDestroy(), t && (a.removeClasses(), r.removeAttr("style"), s.removeAttr("style"), o && o.length && o.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach((function (e) {
                        a.off(e)
                    })), !1 !== e && (a.$el[0].swiper = null, i = a, Object.keys(i).forEach((function (e) {
                        try {
                            i[e] = null
                        } catch (e) { }
                        try {
                            delete i[e]
                        } catch (e) { }
                    }))), a.destroyed = !0), null
                }, t.extendDefaults = function (e) {
                    C(G, e)
                }, t.installModule = function (e) {
                    t.prototype.modules || (t.prototype.modules = {});
                    var i = e.name || Object.keys(t.prototype.modules).length + "_" + x();
                    t.prototype.modules[i] = e
                }, t.use = function (e) {
                    return Array.isArray(e) ? (e.forEach((function (e) {
                        return t.installModule(e)
                    })), t) : (t.installModule(e), t)
                }, i = t, a = [{
                    key: "extendedDefaults",
                    get: function () {
                        return G
                    }
                }, {
                    key: "defaults",
                    get: function () {
                        return F
                    }
                }], null && e(i.prototype, null), a && e(i, a), t
            }();
        Object.keys(R).forEach((function (e) {
            Object.keys(R[e]).forEach((function (t) {
                q.prototype[t] = R[e][t]
            }))
        })), q.use([P, k]);
        var Y = {
            update: function (e) {
                var t = this,
                    i = t.params,
                    a = i.slidesPerView,
                    n = i.slidesPerGroup,
                    r = i.centeredSlides,
                    s = t.params.virtual,
                    o = s.addSlidesBefore,
                    l = s.addSlidesAfter,
                    d = t.virtual,
                    u = d.from,
                    c = d.to,
                    p = d.slides,
                    h = d.slidesGrid,
                    f = d.renderSlide,
                    m = d.offset;
                t.updateActiveIndex();
                var v, g, y, w = t.activeIndex || 0;
                v = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (g = Math.floor(a / 2) + n + l, y = Math.floor(a / 2) + n + o) : (g = a + (n - 1) + l, y = n + o);
                var b = Math.max((w || 0) - y, 0),
                    E = Math.min((w || 0) + g, p.length - 1),
                    x = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);

                function S() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (C(t.virtual, {
                    from: b,
                    to: E,
                    offset: x,
                    slidesGrid: t.slidesGrid
                }), u === b && c === E && !e) return t.slidesGrid !== h && x !== m && t.slides.css(v, x + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: x,
                    from: b,
                    to: E,
                    slides: function () {
                        for (var e = [], t = b; t <= E; t += 1) e.push(p[t]);
                        return e
                    }()
                }), void (t.params.virtual.renderExternalUpdate && S());
                var T = [],
                    M = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var z = u; z <= c; z += 1)(z < b || z > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + z + '"]').remove();
                for (var _ = 0; _ < p.length; _ += 1) _ >= b && _ <= E && (void 0 === c || e ? M.push(_) : (_ > c && M.push(_), _ < u && T.push(_)));
                M.forEach((function (e) {
                    t.$wrapperEl.append(f(p[e], e))
                })), T.sort((function (e, t) {
                    return t - e
                })).forEach((function (e) {
                    t.$wrapperEl.prepend(f(p[e], e))
                })), t.$wrapperEl.children(".swiper-slide").css(v, x + "px"), S()
            },
            renderSlide: function (e, t) {
                var i = this,
                    a = i.params.virtual;
                if (a.cache && i.virtual.cache[t]) return i.virtual.cache[t];
                var n = a.renderSlide ? v(a.renderSlide.call(i, e, t)) : v('<div class="' + i.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return n.attr("data-swiper-slide-index") || n.attr("data-swiper-slide-index", t), a.cache && (i.virtual.cache[t] = n), n
            },
            appendSlide: function (e) {
                var t = this;
                if ("object" == typeof e && "length" in e)
                    for (var i = 0; i < e.length; i += 1) e[i] && t.virtual.slides.push(e[i]);
                else t.virtual.slides.push(e);
                t.virtual.update(!0)
            },
            prependSlide: function (e) {
                var t = this,
                    i = t.activeIndex,
                    a = i + 1,
                    n = 1;
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r += 1) e[r] && t.virtual.slides.unshift(e[r]);
                    a = i + e.length, n = e.length
                } else t.virtual.slides.unshift(e);
                if (t.params.virtual.cache) {
                    var s = t.virtual.cache,
                        o = {};
                    Object.keys(s).forEach((function (e) {
                        var t = s[e],
                            i = t.attr("data-swiper-slide-index");
                        i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), o[parseInt(e, 10) + n] = t
                    })), t.virtual.cache = o
                }
                t.virtual.update(!0), t.slideTo(a, 0)
            },
            removeSlide: function (e) {
                var t = this;
                if (null != e) {
                    var i = t.activeIndex;
                    if (Array.isArray(e))
                        for (var a = e.length - 1; a >= 0; a -= 1) t.virtual.slides.splice(e[a], 1), t.params.virtual.cache && delete t.virtual.cache[e[a]], e[a] < i && (i -= 1), i = Math.max(i, 0);
                    else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < i && (i -= 1), i = Math.max(i, 0);
                    t.virtual.update(!0), t.slideTo(i, 0)
                }
            },
            removeAllSlides: function () {
                var e = this;
                e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0)
            }
        },
            j = {
                name: "virtual",
                params: {
                    virtual: {
                        enabled: !1,
                        slides: [],
                        cache: !0,
                        renderSlide: null,
                        renderExternal: null,
                        renderExternalUpdate: !0,
                        addSlidesBefore: 0,
                        addSlidesAfter: 0
                    }
                },
                create: function () {
                    M(this, {
                        virtual: t({}, Y, {
                            slides: this.params.virtual.slides,
                            cache: {}
                        })
                    })
                },
                on: {
                    beforeInit: function (e) {
                        if (e.params.virtual.enabled) {
                            e.classNames.push(e.params.containerModifierClass + "virtual");
                            var t = {
                                watchSlidesProgress: !0
                            };
                            C(e.params, t), C(e.originalParams, t), e.params.initialSlide || e.virtual.update()
                        }
                    },
                    setTranslate: function (e) {
                        e.params.virtual.enabled && e.virtual.update()
                    }
                }
            },
            X = {
                handle: function (e) {
                    var t = this,
                        i = o(),
                        a = r(),
                        n = t.rtlTranslate,
                        s = e;
                    s.originalEvent && (s = s.originalEvent);
                    var l = s.keyCode || s.charCode,
                        d = t.params.keyboard.pageUpDown,
                        u = d && 33 === l,
                        c = d && 34 === l,
                        p = 37 === l,
                        h = 39 === l,
                        f = 38 === l,
                        m = 40 === l;
                    if (!t.allowSlideNext && (t.isHorizontal() && h || t.isVertical() && m || c)) return !1;
                    if (!t.allowSlidePrev && (t.isHorizontal() && p || t.isVertical() && f || u)) return !1;
                    if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || a.activeElement && a.activeElement.nodeName && ("input" === a.activeElement.nodeName.toLowerCase() || "textarea" === a.activeElement.nodeName.toLowerCase()))) {
                        if (t.params.keyboard.onlyInViewport && (u || c || p || h || f || m)) {
                            var v = !1;
                            if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                            var g = i.innerWidth,
                                y = i.innerHeight,
                                w = t.$el.offset();
                            n && (w.left -= t.$el[0].scrollLeft);
                            for (var b = [
                                [w.left, w.top],
                                [w.left + t.width, w.top],
                                [w.left, w.top + t.height],
                                [w.left + t.width, w.top + t.height]
                            ], E = 0; E < b.length; E += 1) {
                                var x = b[E];
                                if (x[0] >= 0 && x[0] <= g && x[1] >= 0 && x[1] <= y) {
                                    if (0 === x[0] && 0 === x[1]) continue;
                                    v = !0
                                }
                            }
                            if (!v) return
                        }
                        t.isHorizontal() ? ((u || c || p || h) && (s.preventDefault ? s.preventDefault() : s.returnValue = !1), ((c || h) && !n || (u || p) && n) && t.slideNext(), ((u || p) && !n || (c || h) && n) && t.slidePrev()) : ((u || c || f || m) && (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (c || m) && t.slideNext(), (u || f) && t.slidePrev()), t.emit("keyPress", l)
                    }
                },
                enable: function () {
                    var e = this,
                        t = r();
                    e.keyboard.enabled || (v(t).on("keydown", e.keyboard.handle), e.keyboard.enabled = !0)
                },
                disable: function () {
                    var e = this,
                        t = r();
                    e.keyboard.enabled && (v(t).off("keydown", e.keyboard.handle), e.keyboard.enabled = !1)
                }
            },
            V = {
                name: "keyboard",
                params: {
                    keyboard: {
                        enabled: !1,
                        onlyInViewport: !0,
                        pageUpDown: !0
                    }
                },
                create: function () {
                    M(this, {
                        keyboard: t({
                            enabled: !1
                        }, X)
                    })
                },
                on: {
                    init: function (e) {
                        e.params.keyboard.enabled && e.keyboard.enable()
                    },
                    destroy: function (e) {
                        e.keyboard.enabled && e.keyboard.disable()
                    }
                }
            },
            U = {
                lastScrollTime: x(),
                lastEventBeforeSnap: void 0,
                recentWheelEvents: [],
                event: function () {
                    return o().navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
                        var e = r(),
                            t = "onwheel",
                            i = t in e;
                        if (!i) {
                            var a = e.createElement("div");
                            a.setAttribute(t, "return;"), i = "function" == typeof a.onwheel
                        }
                        return !i && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (i = e.implementation.hasFeature("Events.wheel", "3.0")), i
                    }() ? "wheel" : "mousewheel"
                },
                normalize: function (e) {
                    var t = 0,
                        i = 0,
                        a = 0,
                        n = 0;
                    return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), a = 10 * t, n = 10 * i, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (a = e.deltaX), e.shiftKey && !a && (a = n, n = 0), (a || n) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, n *= 40) : (a *= 800, n *= 800)), a && !t && (t = a < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), {
                        spinX: t,
                        spinY: i,
                        pixelX: a,
                        pixelY: n
                    }
                },
                handleMouseEnter: function () {
                    this.mouseEntered = !0
                },
                handleMouseLeave: function () {
                    this.mouseEntered = !1
                },
                handle: function (e) {
                    var t = e,
                        i = this,
                        a = i.params.mousewheel;
                    i.params.cssMode && t.preventDefault();
                    var n = i.$el;
                    if ("container" !== i.params.mousewheel.eventsTarget && (n = v(i.params.mousewheel.eventsTarget)), !i.mouseEntered && !n[0].contains(t.target) && !a.releaseOnEdges) return !0;
                    t.originalEvent && (t = t.originalEvent);
                    var r = 0,
                        s = i.rtlTranslate ? -1 : 1,
                        o = U.normalize(t);
                    if (a.forceToAxis)
                        if (i.isHorizontal()) {
                            if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                            r = -o.pixelX * s
                        } else {
                            if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                            r = -o.pixelY
                        }
                    else r = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * s : -o.pixelY;
                    if (0 === r) return !0;
                    a.invert && (r = -r);
                    var l = i.getTranslate() + r * a.sensitivity;
                    if (l >= i.minTranslate() && (l = i.minTranslate()), l <= i.maxTranslate() && (l = i.maxTranslate()), (!!i.params.loop || !(l === i.minTranslate() || l === i.maxTranslate())) && i.params.nested && t.stopPropagation(), i.params.freeMode) {
                        var d = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r)
                        },
                            u = i.mousewheel.lastEventBeforeSnap,
                            c = u && d.time < u.time + 500 && d.delta <= u.delta && d.direction === u.direction;
                        if (!c) {
                            i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix();
                            var p = i.getTranslate() + r * a.sensitivity,
                                h = i.isBeginning,
                                f = i.isEnd;
                            if (p >= i.minTranslate() && (p = i.minTranslate()), p <= i.maxTranslate() && (p = i.maxTranslate()), i.setTransition(0), i.setTranslate(p), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!h && i.isBeginning || !f && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky) {
                                clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0;
                                var m = i.mousewheel.recentWheelEvents;
                                m.length >= 15 && m.shift();
                                var g = m.length ? m[m.length - 1] : void 0,
                                    y = m[0];
                                if (m.push(d), g && (d.delta > g.delta || d.direction !== g.direction)) m.splice(0);
                                else if (m.length >= 15 && d.time - y.time < 500 && y.delta - d.delta >= 1 && d.delta <= 6) {
                                    var w = r > 0 ? .8 : .2;
                                    i.mousewheel.lastEventBeforeSnap = d, m.splice(0), i.mousewheel.timeout = E((function () {
                                        i.slideToClosest(i.params.speed, !0, void 0, w)
                                    }), 0)
                                }
                                i.mousewheel.timeout || (i.mousewheel.timeout = E((function () {
                                    i.mousewheel.lastEventBeforeSnap = d, m.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5)
                                }), 500))
                            }
                            if (c || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), p === i.minTranslate() || p === i.maxTranslate()) return !0
                        }
                    } else {
                        var b = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r),
                            raw: e
                        },
                            S = i.mousewheel.recentWheelEvents;
                        S.length >= 2 && S.shift();
                        var T = S.length ? S[S.length - 1] : void 0;
                        if (S.push(b), T ? (b.direction !== T.direction || b.delta > T.delta || b.time > T.time + 150) && i.mousewheel.animateSlider(b) : i.mousewheel.animateSlider(b), i.mousewheel.releaseScroll(b)) return !0
                    }
                    return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
                },
                animateSlider: function (e) {
                    var t = this,
                        i = o();
                    return !(this.params.mousewheel.thresholdDelta && e.delta < this.params.mousewheel.thresholdDelta || this.params.mousewheel.thresholdTime && x() - t.mousewheel.lastScrollTime < this.params.mousewheel.thresholdTime || !(e.delta >= 6 && x() - t.mousewheel.lastScrollTime < 60) && (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), t.emit("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), t.emit("scroll", e.raw)), t.mousewheel.lastScrollTime = (new i.Date).getTime(), 1))
                },
                releaseScroll: function (e) {
                    var t = this,
                        i = t.params.mousewheel;
                    if (e.direction < 0) {
                        if (t.isEnd && !t.params.loop && i.releaseOnEdges) return !0
                    } else if (t.isBeginning && !t.params.loop && i.releaseOnEdges) return !0;
                    return !1
                },
                enable: function () {
                    var e = this,
                        t = U.event();
                    if (e.params.cssMode) return e.wrapperEl.removeEventListener(t, e.mousewheel.handle), !0;
                    if (!t) return !1;
                    if (e.mousewheel.enabled) return !1;
                    var i = e.$el;
                    return "container" !== e.params.mousewheel.eventsTarget && (i = v(e.params.mousewheel.eventsTarget)), i.on("mouseenter", e.mousewheel.handleMouseEnter), i.on("mouseleave", e.mousewheel.handleMouseLeave), i.on(t, e.mousewheel.handle), e.mousewheel.enabled = !0, !0
                },
                disable: function () {
                    var e = this,
                        t = U.event();
                    if (e.params.cssMode) return e.wrapperEl.addEventListener(t, e.mousewheel.handle), !0;
                    if (!t) return !1;
                    if (!e.mousewheel.enabled) return !1;
                    var i = e.$el;
                    return "container" !== e.params.mousewheel.eventsTarget && (i = v(e.params.mousewheel.eventsTarget)), i.off(t, e.mousewheel.handle), e.mousewheel.enabled = !1, !0
                }
            },
            Q = {
                update: function () {
                    var e = this,
                        t = e.params.navigation;
                    if (!e.params.loop) {
                        var i = e.navigation,
                            a = i.$nextEl,
                            n = i.$prevEl;
                        n && n.length > 0 && (e.isBeginning ? n.addClass(t.disabledClass) : n.removeClass(t.disabledClass), n[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), a && a.length > 0 && (e.isEnd ? a.addClass(t.disabledClass) : a.removeClass(t.disabledClass), a[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                    }
                },
                onPrevClick: function (e) {
                    var t = this;
                    e.preventDefault(), t.isBeginning && !t.params.loop || t.slidePrev()
                },
                onNextClick: function (e) {
                    var t = this;
                    e.preventDefault(), t.isEnd && !t.params.loop || t.slideNext()
                },
                init: function () {
                    var e, t, i = this,
                        a = i.params.navigation;
                    (a.nextEl || a.prevEl) && (a.nextEl && (e = v(a.nextEl), i.params.uniqueNavElements && "string" == typeof a.nextEl && e.length > 1 && 1 === i.$el.find(a.nextEl).length && (e = i.$el.find(a.nextEl))), a.prevEl && (t = v(a.prevEl), i.params.uniqueNavElements && "string" == typeof a.prevEl && t.length > 1 && 1 === i.$el.find(a.prevEl).length && (t = i.$el.find(a.prevEl))), e && e.length > 0 && e.on("click", i.navigation.onNextClick), t && t.length > 0 && t.on("click", i.navigation.onPrevClick), C(i.navigation, {
                        $nextEl: e,
                        nextEl: e && e[0],
                        $prevEl: t,
                        prevEl: t && t[0]
                    }))
                },
                destroy: function () {
                    var e = this,
                        t = e.navigation,
                        i = t.$nextEl,
                        a = t.$prevEl;
                    i && i.length && (i.off("click", e.navigation.onNextClick), i.removeClass(e.params.navigation.disabledClass)), a && a.length && (a.off("click", e.navigation.onPrevClick), a.removeClass(e.params.navigation.disabledClass))
                }
            },
            K = {
                update: function () {
                    var e = this,
                        t = e.rtl,
                        i = e.params.pagination;
                    if (i.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                        var a, n = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                            r = e.pagination.$el,
                            s = e.params.loop ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                        if (e.params.loop ? ((a = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > n - 1 - 2 * e.loopedSlides && (a -= n - 2 * e.loopedSlides), a > s - 1 && (a -= s), a < 0 && "bullets" !== e.params.paginationType && (a = s + a)) : a = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === i.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                            var o, l, d, u = e.pagination.bullets;
                            if (i.dynamicBullets && (e.pagination.bulletSize = u.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (i.dynamicMainBullets + 4) + "px"), i.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += a - e.previousIndex, e.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = i.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = a - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(u.length, i.dynamicMainBullets) - 1)) + o) / 2), u.removeClass(i.bulletActiveClass + " " + i.bulletActiveClass + "-next " + i.bulletActiveClass + "-next-next " + i.bulletActiveClass + "-prev " + i.bulletActiveClass + "-prev-prev " + i.bulletActiveClass + "-main"), r.length > 1) u.each((function (e) {
                                var t = v(e),
                                    n = t.index();
                                n === a && t.addClass(i.bulletActiveClass), i.dynamicBullets && (n >= o && n <= l && t.addClass(i.bulletActiveClass + "-main"), n === o && t.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), n === l && t.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next"))
                            }));
                            else {
                                var c = u.eq(a),
                                    p = c.index();
                                if (c.addClass(i.bulletActiveClass), i.dynamicBullets) {
                                    for (var h = u.eq(o), f = u.eq(l), m = o; m <= l; m += 1) u.eq(m).addClass(i.bulletActiveClass + "-main");
                                    if (e.params.loop)
                                        if (p >= u.length - i.dynamicMainBullets) {
                                            for (var g = i.dynamicMainBullets; g >= 0; g -= 1) u.eq(u.length - g).addClass(i.bulletActiveClass + "-main");
                                            u.eq(u.length - i.dynamicMainBullets - 1).addClass(i.bulletActiveClass + "-prev")
                                        } else h.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), f.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next");
                                    else h.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), f.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next")
                                }
                            }
                            if (i.dynamicBullets) {
                                var y = Math.min(u.length, i.dynamicMainBullets + 4),
                                    w = (e.pagination.bulletSize * y - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                    b = t ? "right" : "left";
                                u.css(e.isHorizontal() ? b : "top", w + "px")
                            }
                        }
                        if ("fraction" === i.type && (r.find("." + i.currentClass).text(i.formatFractionCurrent(a + 1)), r.find("." + i.totalClass).text(i.formatFractionTotal(s))), "progressbar" === i.type) {
                            var E;
                            E = i.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                            var x = (a + 1) / s,
                                S = 1,
                                T = 1;
                            "horizontal" === E ? S = x : T = x, r.find("." + i.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + S + ") scaleY(" + T + ")").transition(e.params.speed)
                        }
                        "custom" === i.type && i.renderCustom ? (r.html(i.renderCustom(e, a + 1, s)), e.emit("paginationRender", r[0])) : e.emit("paginationUpdate", r[0]), r[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](i.lockClass)
                    }
                },
                render: function () {
                    var e = this,
                        t = e.params.pagination;
                    if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                        var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                            a = e.pagination.$el,
                            n = "";
                        if ("bullets" === t.type) {
                            var r = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                            e.params.freeMode && !e.params.loop && r > i && (r = i);
                            for (var s = 0; s < r; s += 1) t.renderBullet ? n += t.renderBullet.call(e, s, t.bulletClass) : n += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                            a.html(n), e.pagination.bullets = a.find("." + t.bulletClass.replace(/ /g, "."))
                        }
                        "fraction" === t.type && (n = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', a.html(n)), "progressbar" === t.type && (n = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', a.html(n)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                    }
                },
                init: function () {
                    var e = this,
                        t = e.params.pagination;
                    if (t.el) {
                        var i = v(t.el);
                        0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass.replace(/ /g, "."), (function (t) {
                            t.preventDefault();
                            var i = v(this).index() * e.params.slidesPerGroup;
                            e.params.loop && (i += e.loopedSlides), e.slideTo(i)
                        })), C(e.pagination, {
                            $el: i,
                            el: i[0]
                        }))
                    }
                },
                destroy: function () {
                    var e = this,
                        t = e.params.pagination;
                    if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                        var i = e.pagination.$el;
                        i.removeClass(t.hiddenClass), i.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && i.off("click", "." + t.bulletClass.replace(/ /g, "."))
                    }
                }
            },
            Z = {
                setTransform: function (e, t) {
                    var i = this.rtl,
                        a = v(e),
                        n = i ? -1 : 1,
                        r = a.attr("data-swiper-parallax") || "0",
                        s = a.attr("data-swiper-parallax-x"),
                        o = a.attr("data-swiper-parallax-y"),
                        l = a.attr("data-swiper-parallax-scale"),
                        d = a.attr("data-swiper-parallax-opacity");
                    if (s || o ? (s = s || "0", o = o || "0") : this.isHorizontal() ? (s = r, o = "0") : (o = r, s = "0"), s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t * n + "%" : s * t * n + "px", o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
                        var u = d - (d - 1) * (1 - Math.abs(t));
                        a[0].style.opacity = u
                    }
                    if (null == l) a.transform("translate3d(" + s + ", " + o + ", 0px)");
                    else {
                        var c = l - (l - 1) * (1 - Math.abs(t));
                        a.transform("translate3d(" + s + ", " + o + ", 0px) scale(" + c + ")")
                    }
                },
                setTranslate: function () {
                    var e = this,
                        t = e.$el,
                        i = e.slides,
                        a = e.progress,
                        n = e.snapGrid;
                    t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t) {
                        e.parallax.setTransform(t, a)
                    })), i.each((function (t, i) {
                        var r = t.progress;
                        e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(i / 2) - a * (n.length - 1)), r = Math.min(Math.max(r, -1), 1), v(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t) {
                            e.parallax.setTransform(t, r)
                        }))
                    }))
                },
                setTransition: function (e) {
                    void 0 === e && (e = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t) {
                        var i = v(t),
                            a = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (a = 0), i.transition(a)
                    }))
                }
            },
            ee = {
                getDistanceBetweenTouches: function (e) {
                    if (e.targetTouches.length < 2) return 1;
                    var t = e.targetTouches[0].pageX,
                        i = e.targetTouches[0].pageY,
                        a = e.targetTouches[1].pageX,
                        n = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(a - t, 2) + Math.pow(n - i, 2))
                },
                onGestureStart: function (e) {
                    var t = this,
                        i = t.support,
                        a = t.params.zoom,
                        n = t.zoom,
                        r = n.gesture;
                    if (n.fakeGestureTouched = !1, n.fakeGestureMoved = !1, !i.gestures) {
                        if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                        n.fakeGestureTouched = !0, r.scaleStart = ee.getDistanceBetweenTouches(e)
                    }
                    r.$slideEl && r.$slideEl.length || (r.$slideEl = v(e.target).closest("." + t.params.slideClass), 0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)), r.$imageEl = r.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), r.$imageWrapEl = r.$imageEl.parent("." + a.containerClass), r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== r.$imageWrapEl.length) ? (r.$imageEl && r.$imageEl.transition(0), t.zoom.isScaling = !0) : r.$imageEl = void 0
                },
                onGestureChange: function (e) {
                    var t = this,
                        i = t.support,
                        a = t.params.zoom,
                        n = t.zoom,
                        r = n.gesture;
                    if (!i.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                        n.fakeGestureMoved = !0, r.scaleMove = ee.getDistanceBetweenTouches(e)
                    }
                    r.$imageEl && 0 !== r.$imageEl.length ? (i.gestures ? n.scale = e.scale * n.currentScale : n.scale = r.scaleMove / r.scaleStart * n.currentScale, n.scale > r.maxRatio && (n.scale = r.maxRatio - 1 + Math.pow(n.scale - r.maxRatio + 1, .5)), n.scale < a.minRatio && (n.scale = a.minRatio + 1 - Math.pow(a.minRatio - n.scale + 1, .5)), r.$imageEl.transform("translate3d(0,0,0) scale(" + n.scale + ")")) : "gesturechange" === e.type && n.onGestureStart(e)
                },
                onGestureEnd: function (e) {
                    var t = this,
                        i = t.device,
                        a = t.support,
                        n = t.params.zoom,
                        r = t.zoom,
                        s = r.gesture;
                    if (!a.gestures) {
                        if (!r.fakeGestureTouched || !r.fakeGestureMoved) return;
                        if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !i.android) return;
                        r.fakeGestureTouched = !1, r.fakeGestureMoved = !1
                    }
                    s.$imageEl && 0 !== s.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, s.maxRatio), n.minRatio), s.$imageEl.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + r.scale + ")"), r.currentScale = r.scale, r.isScaling = !1, 1 === r.scale && (s.$slideEl = void 0))
                },
                onTouchStart: function (e) {
                    var t = this.device,
                        i = this.zoom,
                        a = i.gesture,
                        n = i.image;
                    a.$imageEl && 0 !== a.$imageEl.length && (n.isTouched || (t.android && e.cancelable && e.preventDefault(), n.isTouched = !0, n.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
                },
                onTouchMove: function (e) {
                    var t = this,
                        i = t.zoom,
                        a = i.gesture,
                        n = i.image,
                        r = i.velocity;
                    if (a.$imageEl && 0 !== a.$imageEl.length && (t.allowClick = !1, n.isTouched && a.$slideEl)) {
                        n.isMoved || (n.width = a.$imageEl[0].offsetWidth, n.height = a.$imageEl[0].offsetHeight, n.startX = S(a.$imageWrapEl[0], "x") || 0, n.startY = S(a.$imageWrapEl[0], "y") || 0, a.slideWidth = a.$slideEl[0].offsetWidth, a.slideHeight = a.$slideEl[0].offsetHeight, a.$imageWrapEl.transition(0), t.rtl && (n.startX = -n.startX, n.startY = -n.startY));
                        var s = n.width * i.scale,
                            o = n.height * i.scale;
                        if (!(s < a.slideWidth && o < a.slideHeight)) {
                            if (n.minX = Math.min(a.slideWidth / 2 - s / 2, 0), n.maxX = -n.minX, n.minY = Math.min(a.slideHeight / 2 - o / 2, 0), n.maxY = -n.minY, n.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !n.isMoved && !i.isScaling) {
                                if (t.isHorizontal() && (Math.floor(n.minX) === Math.floor(n.startX) && n.touchesCurrent.x < n.touchesStart.x || Math.floor(n.maxX) === Math.floor(n.startX) && n.touchesCurrent.x > n.touchesStart.x)) return void (n.isTouched = !1);
                                if (!t.isHorizontal() && (Math.floor(n.minY) === Math.floor(n.startY) && n.touchesCurrent.y < n.touchesStart.y || Math.floor(n.maxY) === Math.floor(n.startY) && n.touchesCurrent.y > n.touchesStart.y)) return void (n.isTouched = !1)
                            }
                            e.cancelable && e.preventDefault(), e.stopPropagation(), n.isMoved = !0, n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX, n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY, n.currentX < n.minX && (n.currentX = n.minX + 1 - Math.pow(n.minX - n.currentX + 1, .8)), n.currentX > n.maxX && (n.currentX = n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, .8)), n.currentY < n.minY && (n.currentY = n.minY + 1 - Math.pow(n.minY - n.currentY + 1, .8)), n.currentY > n.maxY && (n.currentY = n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = n.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = n.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (n.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (n.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(n.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(n.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = n.touchesCurrent.x, r.prevPositionY = n.touchesCurrent.y, r.prevTime = Date.now(), a.$imageWrapEl.transform("translate3d(" + n.currentX + "px, " + n.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function () {
                    var e = this.zoom,
                        t = e.gesture,
                        i = e.image,
                        a = e.velocity;
                    if (t.$imageEl && 0 !== t.$imageEl.length) {
                        if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
                        i.isTouched = !1, i.isMoved = !1;
                        var n = 300,
                            r = 300,
                            s = a.x * n,
                            o = i.currentX + s,
                            l = a.y * r,
                            d = i.currentY + l;
                        0 !== a.x && (n = Math.abs((o - i.currentX) / a.x)), 0 !== a.y && (r = Math.abs((d - i.currentY) / a.y));
                        var u = Math.max(n, r);
                        i.currentX = o, i.currentY = d;
                        var c = i.width * e.scale,
                            p = i.height * e.scale;
                        i.minX = Math.min(t.slideWidth / 2 - c / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - p / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(u).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function () {
                    var e = this,
                        t = e.zoom,
                        i = t.gesture;
                    i.$slideEl && e.previousIndex !== e.activeIndex && (i.$imageEl && i.$imageEl.transform("translate3d(0,0,0) scale(1)"), i.$imageWrapEl && i.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, t.currentScale = 1, i.$slideEl = void 0, i.$imageEl = void 0, i.$imageWrapEl = void 0)
                },
                toggle: function (e) {
                    var t = this.zoom;
                    t.scale && 1 !== t.scale ? t.out() : t.in(e)
                },
                in: function (e) {
                    var t, i, a, n, r, s, l, d, u, c, p, h, f, m, v, g, y = this,
                        w = o(),
                        b = y.zoom,
                        E = y.params.zoom,
                        x = b.gesture,
                        S = b.image;
                    x.$slideEl || (y.params.virtual && y.params.virtual.enabled && y.virtual ? x.$slideEl = y.$wrapperEl.children("." + y.params.slideActiveClass) : x.$slideEl = y.slides.eq(y.activeIndex), x.$imageEl = x.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), x.$imageWrapEl = x.$imageEl.parent("." + E.containerClass)), x.$imageEl && 0 !== x.$imageEl.length && (x.$slideEl.addClass("" + E.zoomedSlideClass), void 0 === S.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = S.touchesStart.x, i = S.touchesStart.y), b.scale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio, b.currentScale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio, e ? (v = x.$slideEl[0].offsetWidth, g = x.$slideEl[0].offsetHeight, a = x.$slideEl.offset().left + w.scrollX + v / 2 - t, n = x.$slideEl.offset().top + w.scrollY + g / 2 - i, l = x.$imageEl[0].offsetWidth, d = x.$imageEl[0].offsetHeight, u = l * b.scale, c = d * b.scale, f = -(p = Math.min(v / 2 - u / 2, 0)), m = -(h = Math.min(g / 2 - c / 2, 0)), (r = a * b.scale) < p && (r = p), r > f && (r = f), (s = n * b.scale) < h && (s = h), s > m && (s = m)) : (r = 0, s = 0), x.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + s + "px,0)"), x.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
                },
                out: function () {
                    var e = this,
                        t = e.zoom,
                        i = e.params.zoom,
                        a = t.gesture;
                    a.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? a.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : a.$slideEl = e.slides.eq(e.activeIndex), a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), a.$imageWrapEl = a.$imageEl.parent("." + i.containerClass)), a.$imageEl && 0 !== a.$imageEl.length && (t.scale = 1, t.currentScale = 1, a.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), a.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), a.$slideEl.removeClass("" + i.zoomedSlideClass), a.$slideEl = void 0)
                },
                toggleGestures: function (e) {
                    var t = this,
                        i = t.zoom,
                        a = i.slideSelector,
                        n = i.passiveListener;
                    t.$wrapperEl[e]("gesturestart", a, i.onGestureStart, n), t.$wrapperEl[e]("gesturechange", a, i.onGestureChange, n), t.$wrapperEl[e]("gestureend", a, i.onGestureEnd, n)
                },
                enableGestures: function () {
                    this.zoom.gesturesEnabled || (this.zoom.gesturesEnabled = !0, this.zoom.toggleGestures("on"))
                },
                disableGestures: function () {
                    this.zoom.gesturesEnabled && (this.zoom.gesturesEnabled = !1, this.zoom.toggleGestures("off"))
                },
                enable: function () {
                    var e = this,
                        t = e.support,
                        i = e.zoom;
                    if (!i.enabled) {
                        i.enabled = !0;
                        var a = !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                            n = !t.passiveListener || {
                                passive: !1,
                                capture: !0
                            },
                            r = "." + e.params.slideClass;
                        e.zoom.passiveListener = a, e.zoom.slideSelector = r, t.gestures ? (e.$wrapperEl.on(e.touchEvents.start, e.zoom.enableGestures, a), e.$wrapperEl.on(e.touchEvents.end, e.zoom.disableGestures, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, i.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, r, i.onGestureChange, n), e.$wrapperEl.on(e.touchEvents.end, r, i.onGestureEnd, a), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, i.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, i.onTouchMove, n)
                    }
                },
                disable: function () {
                    var e = this,
                        t = e.zoom;
                    if (t.enabled) {
                        var i = e.support;
                        e.zoom.enabled = !1;
                        var a = !("touchstart" !== e.touchEvents.start || !i.passiveListener || !e.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                            n = !i.passiveListener || {
                                passive: !1,
                                capture: !0
                            },
                            r = "." + e.params.slideClass;
                        i.gestures ? (e.$wrapperEl.off(e.touchEvents.start, e.zoom.enableGestures, a), e.$wrapperEl.off(e.touchEvents.end, e.zoom.disableGestures, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, r, t.onGestureChange, n), e.$wrapperEl.off(e.touchEvents.end, r, t.onGestureEnd, a), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove, n)
                    }
                }
            },
            te = {
                loadInSlide: function (e, t) {
                    void 0 === t && (t = !0);
                    var i = this,
                        a = i.params.lazy;
                    if (void 0 !== e && 0 !== i.slides.length) {
                        var n = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                            r = n.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                        !n.hasClass(a.elementClass) || n.hasClass(a.loadedClass) || n.hasClass(a.loadingClass) || r.push(n[0]), 0 !== r.length && r.each((function (e) {
                            var r = v(e);
                            r.addClass(a.loadingClass);
                            var s = r.attr("data-background"),
                                o = r.attr("data-src"),
                                l = r.attr("data-srcset"),
                                d = r.attr("data-sizes"),
                                u = r.parent("picture");
                            i.loadImage(r[0], o || s, l, d, !1, (function () {
                                if (null != i && i && (!i || i.params) && !i.destroyed) {
                                    if (s ? (r.css("background-image", 'url("' + s + '")'), r.removeAttr("data-background")) : (l && (r.attr("srcset", l), r.removeAttr("data-srcset")), d && (r.attr("sizes", d), r.removeAttr("data-sizes")), u.length && u.children("source").each((function (e) {
                                        var t = v(e);
                                        t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                                    })), o && (r.attr("src", o), r.removeAttr("data-src"))), r.addClass(a.loadedClass).removeClass(a.loadingClass), n.find("." + a.preloaderClass).remove(), i.params.loop && t) {
                                        var e = n.attr("data-swiper-slide-index");
                                        if (n.hasClass(i.params.slideDuplicateClass)) {
                                            var c = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                            i.lazy.loadInSlide(c.index(), !1)
                                        } else {
                                            var p = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            i.lazy.loadInSlide(p.index(), !1)
                                        }
                                    }
                                    i.emit("lazyImageReady", n[0], r[0]), i.params.autoHeight && i.updateAutoHeight()
                                }
                            })), i.emit("lazyImageLoad", n[0], r[0])
                        }))
                    }
                },
                load: function () {
                    var e = this,
                        t = e.$wrapperEl,
                        i = e.params,
                        a = e.slides,
                        n = e.activeIndex,
                        r = e.virtual && i.virtual.enabled,
                        s = i.lazy,
                        o = i.slidesPerView;

                    function l(e) {
                        if (r) {
                            if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                        } else if (a[e]) return !0;
                        return !1
                    }

                    function d(e) {
                        return r ? v(e).attr("data-swiper-slide-index") : v(e).index()
                    }
                    if ("auto" === o && (o = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each((function (t) {
                        var i = r ? v(t).attr("data-swiper-slide-index") : v(t).index();
                        e.lazy.loadInSlide(i)
                    }));
                    else if (o > 1)
                        for (var u = n; u < n + o; u += 1) l(u) && e.lazy.loadInSlide(u);
                    else e.lazy.loadInSlide(n);
                    if (s.loadPrevNext)
                        if (o > 1 || s.loadPrevNextAmount && s.loadPrevNextAmount > 1) {
                            for (var c = s.loadPrevNextAmount, p = o, h = Math.min(n + p + Math.max(c, p), a.length), f = Math.max(n - Math.max(p, c), 0), m = n + o; m < h; m += 1) l(m) && e.lazy.loadInSlide(m);
                            for (var g = f; g < n; g += 1) l(g) && e.lazy.loadInSlide(g)
                        } else {
                            var y = t.children("." + i.slideNextClass);
                            y.length > 0 && e.lazy.loadInSlide(d(y));
                            var w = t.children("." + i.slidePrevClass);
                            w.length > 0 && e.lazy.loadInSlide(d(w))
                        }
                },
                checkInViewOnLoad: function () {
                    var e = o(),
                        t = this;
                    if (t && !t.destroyed) {
                        var i = t.params.lazy.scrollingElement ? v(t.params.lazy.scrollingElement) : v(e),
                            a = i[0] === e,
                            n = a ? e.innerWidth : i[0].offsetWidth,
                            r = a ? e.innerHeight : i[0].offsetHeight,
                            s = t.$el.offset(),
                            l = !1;
                        t.rtlTranslate && (s.left -= t.$el[0].scrollLeft);
                        for (var d = [
                            [s.left, s.top],
                            [s.left + t.width, s.top],
                            [s.left, s.top + t.height],
                            [s.left + t.width, s.top + t.height]
                        ], u = 0; u < d.length; u += 1) {
                            var c = d[u];
                            if (c[0] >= 0 && c[0] <= n && c[1] >= 0 && c[1] <= r) {
                                if (0 === c[0] && 0 === c[1]) continue;
                                l = !0
                            }
                        }
                        l ? (t.lazy.load(), i.off("scroll", t.lazy.checkInViewOnLoad)) : t.lazy.scrollHandlerAttached || (t.lazy.scrollHandlerAttached = !0, i.on("scroll", t.lazy.checkInViewOnLoad))
                    }
                }
            },
            ie = {
                LinearSpline: function (e, t) {
                    var i, a, n, r, s;
                    return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                        return e ? (s = function (e, t) {
                            for (a = -1, i = e.length; i - a > 1;) e[n = i + a >> 1] <= t ? a = n : i = n;
                            return i
                        }(this.x, e), r = s - 1, (e - this.x[r]) * (this.y[s] - this.y[r]) / (this.x[s] - this.x[r]) + this.y[r]) : 0
                    }, this
                },
                getInterpolateFunction: function (e) {
                    var t = this;
                    t.controller.spline || (t.controller.spline = t.params.loop ? new ie.LinearSpline(t.slidesGrid, e.slidesGrid) : new ie.LinearSpline(t.snapGrid, e.snapGrid))
                },
                setTranslate: function (e, t) {
                    var i, a, n = this,
                        r = n.controller.control,
                        s = n.constructor;

                    function o(e) {
                        var t = n.rtlTranslate ? -n.translate : n.translate;
                        "slide" === n.params.controller.by && (n.controller.getInterpolateFunction(e), a = -n.controller.spline.interpolate(-t)), a && "container" !== n.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (n.maxTranslate() - n.minTranslate()), a = (t - n.minTranslate()) * i + e.minTranslate()), n.params.controller.inverse && (a = e.maxTranslate() - a), e.updateProgress(a), e.setTranslate(a, n), e.updateActiveIndex(), e.updateSlidesClasses()
                    }
                    if (Array.isArray(r))
                        for (var l = 0; l < r.length; l += 1) r[l] !== t && r[l] instanceof s && o(r[l]);
                    else r instanceof s && t !== r && o(r)
                },
                setTransition: function (e, t) {
                    var i, a = this,
                        n = a.constructor,
                        r = a.controller.control;

                    function s(t) {
                        t.setTransition(e, a), 0 !== e && (t.transitionStart(), t.params.autoHeight && E((function () {
                            t.updateAutoHeight()
                        })), t.$wrapperEl.transitionEnd((function () {
                            r && (t.params.loop && "slide" === a.params.controller.by && t.loopFix(), t.transitionEnd())
                        })))
                    }
                    if (Array.isArray(r))
                        for (i = 0; i < r.length; i += 1) r[i] !== t && r[i] instanceof n && s(r[i]);
                    else r instanceof n && t !== r && s(r)
                }
            },
            ae = {
                getRandomNumber: function (e) {
                    return void 0 === e && (e = 16), "x".repeat(e).replace(/x/g, (function () {
                        return Math.round(16 * Math.random()).toString(16)
                    }))
                },
                makeElFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e
                },
                makeElNotFocusable: function (e) {
                    return e.attr("tabIndex", "-1"), e
                },
                addElRole: function (e, t) {
                    return e.attr("role", t), e
                },
                addElRoleDescription: function (e, t) {
                    return e.attr("aria-role-description", t), e
                },
                addElControls: function (e, t) {
                    return e.attr("aria-controls", t), e
                },
                addElLabel: function (e, t) {
                    return e.attr("aria-label", t), e
                },
                addElId: function (e, t) {
                    return e.attr("id", t), e
                },
                addElLive: function (e, t) {
                    return e.attr("aria-live", t), e
                },
                disableEl: function (e) {
                    return e.attr("aria-disabled", !0), e
                },
                enableEl: function (e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterOrSpaceKey: function (e) {
                    if (13 === e.keyCode || 32 === e.keyCode) {
                        var t = this,
                            i = t.params.a11y,
                            a = v(e.target);
                        t.navigation && t.navigation.$nextEl && a.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)), t.navigation && t.navigation.$prevEl && a.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)), t.pagination && a.is("." + t.params.pagination.bulletClass.replace(/ /g, ".")) && a[0].click()
                    }
                },
                notify: function (e) {
                    var t = this.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e))
                },
                updateNavigation: function () {
                    var e = this;
                    if (!e.params.loop && e.navigation) {
                        var t = e.navigation,
                            i = t.$nextEl,
                            a = t.$prevEl;
                        a && a.length > 0 && (e.isBeginning ? (e.a11y.disableEl(a), e.a11y.makeElNotFocusable(a)) : (e.a11y.enableEl(a), e.a11y.makeElFocusable(a))), i && i.length > 0 && (e.isEnd ? (e.a11y.disableEl(i), e.a11y.makeElNotFocusable(i)) : (e.a11y.enableEl(i), e.a11y.makeElFocusable(i)))
                    }
                },
                updatePagination: function () {
                    var e = this,
                        t = e.params.a11y;
                    e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function (i) {
                        var a = v(i);
                        e.a11y.makeElFocusable(a), e.params.pagination.renderBullet || (e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, t.paginationBulletMessage.replace(/\{\{index\}\}/, a.index() + 1)))
                    }))
                },
                init: function () {
                    var e = this,
                        t = e.params.a11y;
                    e.$el.append(e.a11y.liveRegion);
                    var i = e.$el;
                    t.containerRoleDescriptionMessage && e.a11y.addElRoleDescription(i, t.containerRoleDescriptionMessage), t.containerMessage && e.a11y.addElLabel(i, t.containerMessage);
                    var a, n, r, s = e.$wrapperEl,
                        o = s.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16);
                    e.a11y.addElId(s, o), a = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite", e.a11y.addElLive(s, a), t.itemRoleDescriptionMessage && e.a11y.addElRoleDescription(v(e.slides), t.itemRoleDescriptionMessage), e.a11y.addElRole(v(e.slides), "group"), e.slides.each((function (t) {
                        var i = v(t);
                        e.a11y.addElLabel(i, i.index() + 1 + " / " + e.slides.length)
                    })), e.navigation && e.navigation.$nextEl && (n = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (r = e.navigation.$prevEl), n && n.length && (e.a11y.makeElFocusable(n), "BUTTON" !== n[0].tagName && (e.a11y.addElRole(n, "button"), n.on("keydown", e.a11y.onEnterOrSpaceKey)), e.a11y.addElLabel(n, t.nextSlideMessage), e.a11y.addElControls(n, o)), r && r.length && (e.a11y.makeElFocusable(r), "BUTTON" !== r[0].tagName && (e.a11y.addElRole(r, "button"), r.on("keydown", e.a11y.onEnterOrSpaceKey)), e.a11y.addElLabel(r, t.prevSlideMessage), e.a11y.addElControls(r, o)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass.replace(/ /g, "."), e.a11y.onEnterOrSpaceKey)
                },
                destroy: function () {
                    var e, t, i = this;
                    i.a11y.liveRegion && i.a11y.liveRegion.length > 0 && i.a11y.liveRegion.remove(), i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), e && e.off("keydown", i.a11y.onEnterOrSpaceKey), t && t.off("keydown", i.a11y.onEnterOrSpaceKey), i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass.replace(/ /g, "."), i.a11y.onEnterOrSpaceKey)
                }
            },
            ne = {
                init: function () {
                    var e = this,
                        t = o();
                    if (e.params.history) {
                        if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void (e.params.hashNavigation.enabled = !0);
                        var i = e.history;
                        i.initialized = !0, i.paths = ne.getPathValues(e.params.url), (i.paths.key || i.paths.value) && (i.scrollToSlide(0, i.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", e.history.setHistoryPopState))
                    }
                },
                destroy: function () {
                    var e = o();
                    this.params.history.replaceState || e.removeEventListener("popstate", this.history.setHistoryPopState)
                },
                setHistoryPopState: function () {
                    var e = this;
                    e.history.paths = ne.getPathValues(e.params.url), e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1)
                },
                getPathValues: function (e) {
                    var t = o(),
                        i = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter((function (e) {
                            return "" !== e
                        })),
                        a = i.length;
                    return {
                        key: i[a - 2],
                        value: i[a - 1]
                    }
                },
                setHistory: function (e, t) {
                    var i = this,
                        a = o();
                    if (i.history.initialized && i.params.history.enabled) {
                        var n;
                        n = i.params.url ? new URL(i.params.url) : a.location;
                        var r = i.slides.eq(t),
                            s = ne.slugify(r.attr("data-history"));
                        n.pathname.includes(e) || (s = e + "/" + s);
                        var l = a.history.state;
                        l && l.value === s || (i.params.history.replaceState ? a.history.replaceState({
                            value: s
                        }, null, s) : a.history.pushState({
                            value: s
                        }, null, s))
                    }
                },
                slugify: function (e) {
                    return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                },
                scrollToSlide: function (e, t, i) {
                    var a = this;
                    if (t)
                        for (var n = 0, r = a.slides.length; n < r; n += 1) {
                            var s = a.slides.eq(n);
                            if (ne.slugify(s.attr("data-history")) === t && !s.hasClass(a.params.slideDuplicateClass)) {
                                var o = s.index();
                                a.slideTo(o, e, i)
                            }
                        } else a.slideTo(0, e, i)
                }
            },
            re = {
                onHashCange: function () {
                    var e = this,
                        t = r();
                    e.emit("hashChange");
                    var i = t.location.hash.replace("#", "");
                    if (i !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                        var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + i + '"]').index();
                        if (void 0 === a) return;
                        e.slideTo(a)
                    }
                },
                setHash: function () {
                    var e = this,
                        t = o(),
                        i = r();
                    if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                        if (e.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""), e.emit("hashSet");
                        else {
                            var a = e.slides.eq(e.activeIndex),
                                n = a.attr("data-hash") || a.attr("data-history");
                            i.location.hash = n || "", e.emit("hashSet")
                        }
                },
                init: function () {
                    var e = this,
                        t = r(),
                        i = o();
                    if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                        e.hashNavigation.initialized = !0;
                        var a = t.location.hash.replace("#", "");
                        if (a)
                            for (var n = 0, s = e.slides.length; n < s; n += 1) {
                                var l = e.slides.eq(n);
                                if ((l.attr("data-hash") || l.attr("data-history")) === a && !l.hasClass(e.params.slideDuplicateClass)) {
                                    var d = l.index();
                                    e.slideTo(d, 0, e.params.runCallbacksOnInit, !0)
                                }
                            }
                        e.params.hashNavigation.watchState && v(i).on("hashchange", e.hashNavigation.onHashCange)
                    }
                },
                destroy: function () {
                    var e = o();
                    this.params.hashNavigation.watchState && v(e).off("hashchange", this.hashNavigation.onHashCange)
                }
            },
            se = {
                run: function () {
                    var e = this,
                        t = e.slides.eq(e.activeIndex),
                        i = e.params.autoplay.delay;
                    t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = E((function () {
                        var t;
                        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && e.autoplay.run()
                    }), i)
                },
                start: function () {
                    var e = this;
                    return void 0 === e.autoplay.timeout && !e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0)
                },
                stop: function () {
                    var e = this;
                    return !!e.autoplay.running && void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0)
                },
                pause: function (e) {
                    var t = this;
                    t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
                },
                onVisibilityChange: function () {
                    var e = this,
                        t = r();
                    "hidden" === t.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === t.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
                },
                onTransitionEnd: function (e) {
                    var t = this;
                    t && !t.destroyed && t.$wrapperEl && e.target === t.$wrapperEl[0] && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                }
            },
            oe = {
                setTranslate: function () {
                    for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) {
                        var a = e.slides.eq(i),
                            n = -a[0].swiperSlideOffset;
                        e.params.virtualTranslate || (n -= e.translate);
                        var r = 0;
                        e.isHorizontal() || (r = n, n = 0);
                        var s = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                        a.css({
                            opacity: s
                        }).transform("translate3d(" + n + "px, " + r + "px, 0px)")
                    }
                },
                setTransition: function (e) {
                    var t = this,
                        i = t.slides,
                        a = t.$wrapperEl;
                    if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                        var n = !1;
                        i.transitionEnd((function () {
                            if (!n && t && !t.destroyed) {
                                n = !0, t.animating = !1;
                                for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i])
                            }
                        }))
                    }
                }
            },
            le = {
                setTranslate: function () {
                    var e, t = this,
                        i = t.$el,
                        a = t.$wrapperEl,
                        n = t.slides,
                        r = t.width,
                        s = t.height,
                        o = t.rtlTranslate,
                        l = t.size,
                        d = t.browser,
                        u = t.params.cubeEffect,
                        c = t.isHorizontal(),
                        p = t.virtual && t.params.virtual.enabled,
                        h = 0;
                    u.shadow && (c ? (0 === (e = a.find(".swiper-cube-shadow")).length && (e = v('<div class="swiper-cube-shadow"></div>'), a.append(e)), e.css({
                        height: r + "px"
                    })) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = v('<div class="swiper-cube-shadow"></div>'), i.append(e)));
                    for (var f = 0; f < n.length; f += 1) {
                        var m = n.eq(f),
                            g = f;
                        p && (g = parseInt(m.attr("data-swiper-slide-index"), 10));
                        var y = 90 * g,
                            w = Math.floor(y / 360);
                        o && (y = -y, w = Math.floor(-y / 360));
                        var b = Math.max(Math.min(m[0].progress, 1), -1),
                            E = 0,
                            x = 0,
                            S = 0;
                        g % 4 == 0 ? (E = 4 * -w * l, S = 0) : (g - 1) % 4 == 0 ? (E = 0, S = 4 * -w * l) : (g - 2) % 4 == 0 ? (E = l + 4 * w * l, S = l) : (g - 3) % 4 == 0 && (E = -l, S = 3 * l + 4 * l * w), o && (E = -E), c || (x = E, E = 0);
                        var T = "rotateX(" + (c ? 0 : -y) + "deg) rotateY(" + (c ? y : 0) + "deg) translate3d(" + E + "px, " + x + "px, " + S + "px)";
                        if (b <= 1 && b > -1 && (h = 90 * g + 90 * b, o && (h = 90 * -g - 90 * b)), m.transform(T), u.slideShadows) {
                            var C = c ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
                                M = c ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
                            0 === C.length && (C = v('<div class="swiper-slide-shadow-' + (c ? "left" : "top") + '"></div>'), m.append(C)), 0 === M.length && (M = v('<div class="swiper-slide-shadow-' + (c ? "right" : "bottom") + '"></div>'), m.append(M)), C.length && (C[0].style.opacity = Math.max(-b, 0)), M.length && (M[0].style.opacity = Math.max(b, 0))
                        }
                    }
                    if (a.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), u.shadow)
                        if (c) e.transform("translate3d(0px, " + (r / 2 + u.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + u.shadowScale + ")");
                        else {
                            var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                                _ = 1.5 - (Math.sin(2 * z * Math.PI / 360) / 2 + Math.cos(2 * z * Math.PI / 360) / 2),
                                I = u.shadowScale,
                                P = u.shadowScale / _,
                                L = u.shadowOffset;
                            e.transform("scale3d(" + I + ", 1, " + P + ") translate3d(0px, " + (s / 2 + L) + "px, " + -s / 2 / P + "px) rotateX(-90deg)")
                        }
                    var k = d.isSafari || d.isWebView ? -l / 2 : 0;
                    a.transform("translate3d(0px,0," + k + "px) rotateX(" + (t.isHorizontal() ? 0 : h) + "deg) rotateY(" + (t.isHorizontal() ? -h : 0) + "deg)")
                },
                setTransition: function (e) {
                    var t = this,
                        i = t.$el;
                    t.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.cubeEffect.shadow && !t.isHorizontal() && i.find(".swiper-cube-shadow").transition(e)
                }
            },
            de = {
                setTranslate: function () {
                    for (var e = this, t = e.slides, i = e.rtlTranslate, a = 0; a < t.length; a += 1) {
                        var n = t.eq(a),
                            r = n[0].progress;
                        e.params.flipEffect.limitRotation && (r = Math.max(Math.min(n[0].progress, 1), -1));
                        var s = -180 * r,
                            o = 0,
                            l = -n[0].swiperSlideOffset,
                            d = 0;
                        if (e.isHorizontal() ? i && (s = -s) : (d = l, l = 0, o = -s, s = 0), n[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
                            var u = e.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
                                c = e.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                            0 === u.length && (u = v('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), n.append(u)), 0 === c.length && (c = v('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(c)), u.length && (u[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
                        }
                        n.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + s + "deg)")
                    }
                },
                setTransition: function (e) {
                    var t = this,
                        i = t.slides,
                        a = t.activeIndex,
                        n = t.$wrapperEl;
                    if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                        var r = !1;
                        i.eq(a).transitionEnd((function () {
                            if (!r && t && !t.destroyed) {
                                r = !0, t.animating = !1;
                                for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) n.trigger(e[i])
                            }
                        }))
                    }
                }
            },
            ue = {
                setTranslate: function () {
                    for (var e = this, t = e.width, i = e.height, a = e.slides, n = e.slidesSizesGrid, r = e.params.coverflowEffect, s = e.isHorizontal(), o = e.translate, l = s ? t / 2 - o : i / 2 - o, d = s ? r.rotate : -r.rotate, u = r.depth, c = 0, p = a.length; c < p; c += 1) {
                        var h = a.eq(c),
                            f = n[c],
                            m = (l - h[0].swiperSlideOffset - f / 2) / f * r.modifier,
                            g = s ? d * m : 0,
                            y = s ? 0 : d * m,
                            w = -u * Math.abs(m),
                            b = r.stretch;
                        "string" == typeof b && -1 !== b.indexOf("%") && (b = parseFloat(r.stretch) / 100 * f);
                        var E = s ? 0 : b * m,
                            x = s ? b * m : 0,
                            S = 1 - (1 - r.scale) * Math.abs(m);
                        Math.abs(x) < .001 && (x = 0), Math.abs(E) < .001 && (E = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(y) < .001 && (y = 0), Math.abs(S) < .001 && (S = 0);
                        var T = "translate3d(" + x + "px," + E + "px," + w + "px)  rotateX(" + y + "deg) rotateY(" + g + "deg) scale(" + S + ")";
                        if (h.transform(T), h[0].style.zIndex = 1 - Math.abs(Math.round(m)), r.slideShadows) {
                            var C = s ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"),
                                M = s ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom");
                            0 === C.length && (C = v('<div class="swiper-slide-shadow-' + (s ? "left" : "top") + '"></div>'), h.append(C)), 0 === M.length && (M = v('<div class="swiper-slide-shadow-' + (s ? "right" : "bottom") + '"></div>'), h.append(M)), C.length && (C[0].style.opacity = m > 0 ? m : 0), M.length && (M[0].style.opacity = -m > 0 ? -m : 0)
                        }
                    }
                },
                setTransition: function (e) {
                    this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                }
            },
            ce = {
                init: function () {
                    var e = this,
                        t = e.params.thumbs;
                    if (e.thumbs.initialized) return !1;
                    e.thumbs.initialized = !0;
                    var i = e.constructor;
                    return t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, C(e.thumbs.swiper.originalParams, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    }), C(e.thumbs.swiper.params, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    })) : T(t.swiper) && (e.thumbs.swiper = new i(C({}, t.swiper, {
                        watchSlidesVisibility: !0,
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick), !0
                },
                onThumbClick: function () {
                    var e = this,
                        t = e.thumbs.swiper;
                    if (t) {
                        var i = t.clickedIndex,
                            a = t.clickedSlide;
                        if (!(a && v(a).hasClass(e.params.thumbs.slideThumbActiveClass) || null == i)) {
                            var n;
                            if (n = t.params.loop ? parseInt(v(t.clickedSlide).attr("data-swiper-slide-index"), 10) : i, e.params.loop) {
                                var r = e.activeIndex;
                                e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, r = e.activeIndex);
                                var s = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + n + '"]').eq(0).index(),
                                    o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + n + '"]').eq(0).index();
                                n = void 0 === s ? o : void 0 === o ? s : o - r < r - s ? o : s
                            }
                            e.slideTo(n)
                        }
                    }
                },
                update: function (e) {
                    var t = this,
                        i = t.thumbs.swiper;
                    if (i) {
                        var a = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView,
                            n = t.params.thumbs.autoScrollOffset,
                            r = n && !i.params.loop;
                        if (t.realIndex !== i.realIndex || r) {
                            var s, o, l = i.activeIndex;
                            if (i.params.loop) {
                                i.slides.eq(l).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, l = i.activeIndex);
                                var d = i.slides.eq(l).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                                    u = i.slides.eq(l).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                                s = void 0 === d ? u : void 0 === u ? d : u - l == l - d ? l : u - l < l - d ? u : d, o = t.activeIndex > t.previousIndex ? "next" : "prev"
                            } else o = (s = t.realIndex) > t.previousIndex ? "next" : "prev";
                            r && (s += "next" === o ? n : -1 * n), i.visibleSlidesIndexes && i.visibleSlidesIndexes.indexOf(s) < 0 && (i.params.centeredSlides ? s = s > l ? s - Math.floor(a / 2) + 1 : s + Math.floor(a / 2) - 1 : s > l && (s = s - a + 1), i.slideTo(s, e ? 0 : void 0))
                        }
                        var c = 1,
                            p = t.params.thumbs.slideThumbActiveClass;
                        if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (c = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (c = 1), c = Math.floor(c), i.slides.removeClass(p), i.params.loop || i.params.virtual && i.params.virtual.enabled)
                            for (var h = 0; h < c; h += 1) i.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + h) + '"]').addClass(p);
                        else
                            for (var f = 0; f < c; f += 1) i.slides.eq(t.realIndex + f).addClass(p)
                    }
                }
            },
            pe = [j, V, {
                name: "mousewheel",
                params: {
                    mousewheel: {
                        enabled: !1,
                        releaseOnEdges: !1,
                        invert: !1,
                        forceToAxis: !1,
                        sensitivity: 1,
                        eventsTarget: "container",
                        thresholdDelta: null,
                        thresholdTime: null
                    }
                },
                create: function () {
                    M(this, {
                        mousewheel: {
                            enabled: !1,
                            lastScrollTime: x(),
                            lastEventBeforeSnap: void 0,
                            recentWheelEvents: [],
                            enable: U.enable,
                            disable: U.disable,
                            handle: U.handle,
                            handleMouseEnter: U.handleMouseEnter,
                            handleMouseLeave: U.handleMouseLeave,
                            animateSlider: U.animateSlider,
                            releaseScroll: U.releaseScroll
                        }
                    })
                },
                on: {
                    init: function (e) {
                        !e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(), e.params.mousewheel.enabled && e.mousewheel.enable()
                    },
                    destroy: function (e) {
                        e.params.cssMode && e.mousewheel.enable(), e.mousewheel.enabled && e.mousewheel.disable()
                    }
                }
            }, {
                    name: "navigation",
                    params: {
                        navigation: {
                            nextEl: null,
                            prevEl: null,
                            hideOnClick: !1,
                            disabledClass: "swiper-button-disabled",
                            hiddenClass: "swiper-button-hidden",
                            lockClass: "swiper-button-lock"
                        }
                    },
                    create: function () {
                        M(this, {
                            navigation: t({}, Q)
                        })
                    },
                    on: {
                        init: function (e) {
                            e.navigation.init(), e.navigation.update()
                        },
                        toEdge: function (e) {
                            e.navigation.update()
                        },
                        fromEdge: function (e) {
                            e.navigation.update()
                        },
                        destroy: function (e) {
                            e.navigation.destroy()
                        },
                        click: function (e, t) {
                            var i = e.navigation,
                                a = i.$nextEl,
                                n = i.$prevEl,
                                r = t.target;
                            if (e.params.navigation.hideOnClick && !v(r).is(n) && !v(r).is(a)) {
                                if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === r || e.pagination.el.contains(r))) return;
                                var s;
                                a ? s = a.hasClass(e.params.navigation.hiddenClass) : n && (s = n.hasClass(e.params.navigation.hiddenClass)), !0 === s ? e.emit("navigationShow") : e.emit("navigationHide"), a && a.toggleClass(e.params.navigation.hiddenClass), n && n.toggleClass(e.params.navigation.hiddenClass)
                            }
                        }
                    }
                }, {
                    name: "pagination",
                    params: {
                        pagination: {
                            el: null,
                            bulletElement: "span",
                            clickable: !1,
                            hideOnClick: !1,
                            renderBullet: null,
                            renderProgressbar: null,
                            renderFraction: null,
                            renderCustom: null,
                            progressbarOpposite: !1,
                            type: "bullets",
                            dynamicBullets: !1,
                            dynamicMainBullets: 1,
                            formatFractionCurrent: function (e) {
                                return e
                            },
                            formatFractionTotal: function (e) {
                                return e
                            },
                            bulletClass: "swiper-pagination-bullet",
                            bulletActiveClass: "swiper-pagination-bullet-active",
                            modifierClass: "swiper-pagination-",
                            currentClass: "swiper-pagination-current",
                            totalClass: "swiper-pagination-total",
                            hiddenClass: "swiper-pagination-hidden",
                            progressbarFillClass: "swiper-pagination-progressbar-fill",
                            progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                            clickableClass: "swiper-pagination-clickable",
                            lockClass: "swiper-pagination-lock"
                        }
                    },
                    create: function () {
                        M(this, {
                            pagination: t({
                                dynamicBulletIndex: 0
                            }, K)
                        })
                    },
                    on: {
                        init: function (e) {
                            e.pagination.init(), e.pagination.render(), e.pagination.update()
                        },
                        activeIndexChange: function (e) {
                            (e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
                        },
                        snapIndexChange: function (e) {
                            e.params.loop || e.pagination.update()
                        },
                        slidesLengthChange: function (e) {
                            e.params.loop && (e.pagination.render(), e.pagination.update())
                        },
                        snapGridLengthChange: function (e) {
                            e.params.loop || (e.pagination.render(), e.pagination.update())
                        },
                        destroy: function (e) {
                            e.pagination.destroy()
                        },
                        click: function (e, t) {
                            var i = t.target;
                            if (e.params.pagination.el && e.params.pagination.hideOnClick && e.pagination.$el.length > 0 && !v(i).hasClass(e.params.pagination.bulletClass)) {
                                if (e.navigation && (e.navigation.nextEl && i === e.navigation.nextEl || e.navigation.prevEl && i === e.navigation.prevEl)) return;
                                !0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass) ? e.emit("paginationShow") : e.emit("paginationHide"), e.pagination.$el.toggleClass(e.params.pagination.hiddenClass)
                            }
                        }
                    }
                }, {
                    name: "parallax",
                    params: {
                        parallax: {
                            enabled: !1
                        }
                    },
                    create: function () {
                        M(this, {
                            parallax: t({}, Z)
                        })
                    },
                    on: {
                        beforeInit: function (e) {
                            e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                        },
                        init: function (e) {
                            e.params.parallax.enabled && e.parallax.setTranslate()
                        },
                        setTranslate: function (e) {
                            e.params.parallax.enabled && e.parallax.setTranslate()
                        },
                        setTransition: function (e, t) {
                            e.params.parallax.enabled && e.parallax.setTransition(t)
                        }
                    }
                }, {
                    name: "zoom",
                    params: {
                        zoom: {
                            enabled: !1,
                            maxRatio: 3,
                            minRatio: 1,
                            toggle: !0,
                            containerClass: "swiper-zoom-container",
                            zoomedSlideClass: "swiper-slide-zoomed"
                        }
                    },
                    create: function () {
                        var e = this;
                        M(e, {
                            zoom: t({
                                enabled: !1,
                                scale: 1,
                                currentScale: 1,
                                isScaling: !1,
                                gesture: {
                                    $slideEl: void 0,
                                    slideWidth: void 0,
                                    slideHeight: void 0,
                                    $imageEl: void 0,
                                    $imageWrapEl: void 0,
                                    maxRatio: 3
                                },
                                image: {
                                    isTouched: void 0,
                                    isMoved: void 0,
                                    currentX: void 0,
                                    currentY: void 0,
                                    minX: void 0,
                                    minY: void 0,
                                    maxX: void 0,
                                    maxY: void 0,
                                    width: void 0,
                                    height: void 0,
                                    startX: void 0,
                                    startY: void 0,
                                    touchesStart: {},
                                    touchesCurrent: {}
                                },
                                velocity: {
                                    x: void 0,
                                    y: void 0,
                                    prevPositionX: void 0,
                                    prevPositionY: void 0,
                                    prevTime: void 0
                                }
                            }, ee)
                        });
                        var i = 1;
                        Object.defineProperty(e.zoom, "scale", {
                            get: function () {
                                return i
                            },
                            set: function (t) {
                                if (i !== t) {
                                    var a = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                        n = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                                    e.emit("zoomChange", t, a, n)
                                }
                                i = t
                            }
                        })
                    },
                    on: {
                        init: function (e) {
                            e.params.zoom.enabled && e.zoom.enable()
                        },
                        destroy: function (e) {
                            e.zoom.disable()
                        },
                        touchStart: function (e, t) {
                            e.zoom.enabled && e.zoom.onTouchStart(t)
                        },
                        touchEnd: function (e, t) {
                            e.zoom.enabled && e.zoom.onTouchEnd(t)
                        },
                        doubleTap: function (e, t) {
                            !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && e.zoom.toggle(t)
                        },
                        transitionEnd: function (e) {
                            e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
                        },
                        slideChange: function (e) {
                            e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && e.zoom.onTransitionEnd()
                        }
                    }
                }, {
                    name: "lazy",
                    params: {
                        lazy: {
                            checkInView: !1,
                            enabled: !1,
                            loadPrevNext: !1,
                            loadPrevNextAmount: 1,
                            loadOnTransitionStart: !1,
                            scrollingElement: "",
                            elementClass: "swiper-lazy",
                            loadingClass: "swiper-lazy-loading",
                            loadedClass: "swiper-lazy-loaded",
                            preloaderClass: "swiper-lazy-preloader"
                        }
                    },
                    create: function () {
                        M(this, {
                            lazy: t({
                                initialImageLoaded: !1
                            }, te)
                        })
                    },
                    on: {
                        beforeInit: function (e) {
                            e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
                        },
                        init: function (e) {
                            e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && (e.params.lazy.checkInView ? e.lazy.checkInViewOnLoad() : e.lazy.load())
                        },
                        scroll: function (e) {
                            e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
                        },
                        transitionStart: function (e) {
                            e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
                        },
                        transitionEnd: function (e) {
                            e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
                        },
                        slideChange: function (e) {
                            e.params.lazy.enabled && e.params.cssMode && e.lazy.load()
                        }
                    }
                }, {
                    name: "controller",
                    params: {
                        controller: {
                            control: void 0,
                            inverse: !1,
                            by: "slide"
                        }
                    },
                    create: function () {
                        M(this, {
                            controller: t({
                                control: this.params.controller.control
                            }, ie)
                        })
                    },
                    on: {
                        update: function (e) {
                            e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                        },
                        resize: function (e) {
                            e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                        },
                        observerUpdate: function (e) {
                            e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                        },
                        setTranslate: function (e, t, i) {
                            e.controller.control && e.controller.setTranslate(t, i)
                        },
                        setTransition: function (e, t, i) {
                            e.controller.control && e.controller.setTransition(t, i)
                        }
                    }
                }, {
                    name: "a11y",
                    params: {
                        a11y: {
                            enabled: !0,
                            notificationClass: "swiper-notification",
                            prevSlideMessage: "Previous slide",
                            nextSlideMessage: "Next slide",
                            firstSlideMessage: "This is the first slide",
                            lastSlideMessage: "This is the last slide",
                            paginationBulletMessage: "Go to slide {{index}}",
                            containerMessage: null,
                            containerRoleDescriptionMessage: null,
                            itemRoleDescriptionMessage: null
                        }
                    },
                    create: function () {
                        M(this, {
                            a11y: t({}, ae, {
                                liveRegion: v('<span class="' + this.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                            })
                        })
                    },
                    on: {
                        afterInit: function (e) {
                            e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation())
                        },
                        toEdge: function (e) {
                            e.params.a11y.enabled && e.a11y.updateNavigation()
                        },
                        fromEdge: function (e) {
                            e.params.a11y.enabled && e.a11y.updateNavigation()
                        },
                        paginationUpdate: function (e) {
                            e.params.a11y.enabled && e.a11y.updatePagination()
                        },
                        destroy: function (e) {
                            e.params.a11y.enabled && e.a11y.destroy()
                        }
                    }
                }, {
                    name: "history",
                    params: {
                        history: {
                            enabled: !1,
                            replaceState: !1,
                            key: "slides"
                        }
                    },
                    create: function () {
                        M(this, {
                            history: t({}, ne)
                        })
                    },
                    on: {
                        init: function (e) {
                            e.params.history.enabled && e.history.init()
                        },
                        destroy: function (e) {
                            e.params.history.enabled && e.history.destroy()
                        },
                        transitionEnd: function (e) {
                            e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
                        },
                        slideChange: function (e) {
                            e.history.initialized && e.params.cssMode && e.history.setHistory(e.params.history.key, e.activeIndex)
                        }
                    }
                }, {
                    name: "hash-navigation",
                    params: {
                        hashNavigation: {
                            enabled: !1,
                            replaceState: !1,
                            watchState: !1
                        }
                    },
                    create: function () {
                        M(this, {
                            hashNavigation: t({
                                initialized: !1
                            }, re)
                        })
                    },
                    on: {
                        init: function (e) {
                            e.params.hashNavigation.enabled && e.hashNavigation.init()
                        },
                        destroy: function (e) {
                            e.params.hashNavigation.enabled && e.hashNavigation.destroy()
                        },
                        transitionEnd: function (e) {
                            e.hashNavigation.initialized && e.hashNavigation.setHash()
                        },
                        slideChange: function (e) {
                            e.hashNavigation.initialized && e.params.cssMode && e.hashNavigation.setHash()
                        }
                    }
                }, {
                    name: "autoplay",
                    params: {
                        autoplay: {
                            enabled: !1,
                            delay: 3e3,
                            waitForTransition: !0,
                            disableOnInteraction: !0,
                            stopOnLastSlide: !1,
                            reverseDirection: !1
                        }
                    },
                    create: function () {
                        M(this, {
                            autoplay: t({}, se, {
                                running: !1,
                                paused: !1
                            })
                        })
                    },
                    on: {
                        init: function (e) {
                            e.params.autoplay.enabled && (e.autoplay.start(), r().addEventListener("visibilitychange", e.autoplay.onVisibilityChange))
                        },
                        beforeTransitionStart: function (e, t, i) {
                            e.autoplay.running && (i || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(t) : e.autoplay.stop())
                        },
                        sliderFirstMove: function (e) {
                            e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
                        },
                        touchEnd: function (e) {
                            e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && e.autoplay.run()
                        },
                        destroy: function (e) {
                            e.autoplay.running && e.autoplay.stop(), r().removeEventListener("visibilitychange", e.autoplay.onVisibilityChange)
                        }
                    }
                }, {
                    name: "effect-fade",
                    params: {
                        fadeEffect: {
                            crossFade: !1
                        }
                    },
                    create: function () {
                        M(this, {
                            fadeEffect: t({}, oe)
                        })
                    },
                    on: {
                        beforeInit: function (e) {
                            if ("fade" === e.params.effect) {
                                e.classNames.push(e.params.containerModifierClass + "fade");
                                var t = {
                                    slidesPerView: 1,
                                    slidesPerColumn: 1,
                                    slidesPerGroup: 1,
                                    watchSlidesProgress: !0,
                                    spaceBetween: 0,
                                    virtualTranslate: !0
                                };
                                C(e.params, t), C(e.originalParams, t)
                            }
                        },
                        setTranslate: function (e) {
                            "fade" === e.params.effect && e.fadeEffect.setTranslate()
                        },
                        setTransition: function (e, t) {
                            "fade" === e.params.effect && e.fadeEffect.setTransition(t)
                        }
                    }
                }, {
                    name: "effect-cube",
                    params: {
                        cubeEffect: {
                            slideShadows: !0,
                            shadow: !0,
                            shadowOffset: 20,
                            shadowScale: .94
                        }
                    },
                    create: function () {
                        M(this, {
                            cubeEffect: t({}, le)
                        })
                    },
                    on: {
                        beforeInit: function (e) {
                            if ("cube" === e.params.effect) {
                                e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                                var t = {
                                    slidesPerView: 1,
                                    slidesPerColumn: 1,
                                    slidesPerGroup: 1,
                                    watchSlidesProgress: !0,
                                    resistanceRatio: 0,
                                    spaceBetween: 0,
                                    centeredSlides: !1,
                                    virtualTranslate: !0
                                };
                                C(e.params, t), C(e.originalParams, t)
                            }
                        },
                        setTranslate: function (e) {
                            "cube" === e.params.effect && e.cubeEffect.setTranslate()
                        },
                        setTransition: function (e, t) {
                            "cube" === e.params.effect && e.cubeEffect.setTransition(t)
                        }
                    }
                }, {
                    name: "effect-flip",
                    params: {
                        flipEffect: {
                            slideShadows: !0,
                            limitRotation: !0
                        }
                    },
                    create: function () {
                        M(this, {
                            flipEffect: t({}, de)
                        })
                    },
                    on: {
                        beforeInit: function (e) {
                            if ("flip" === e.params.effect) {
                                e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                                var t = {
                                    slidesPerView: 1,
                                    slidesPerColumn: 1,
                                    slidesPerGroup: 1,
                                    watchSlidesProgress: !0,
                                    spaceBetween: 0,
                                    virtualTranslate: !0
                                };
                                C(e.params, t), C(e.originalParams, t)
                            }
                        },
                        setTranslate: function (e) {
                            "flip" === e.params.effect && e.flipEffect.setTranslate()
                        },
                        setTransition: function (e, t) {
                            "flip" === e.params.effect && e.flipEffect.setTransition(t)
                        }
                    }
                }, {
                    name: "effect-coverflow",
                    params: {
                        coverflowEffect: {
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            scale: 1,
                            modifier: 1,
                            slideShadows: !0
                        }
                    },
                    create: function () {
                        M(this, {
                            coverflowEffect: t({}, ue)
                        })
                    },
                    on: {
                        beforeInit: function (e) {
                            "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                        },
                        setTranslate: function (e) {
                            "coverflow" === e.params.effect && e.coverflowEffect.setTranslate()
                        },
                        setTransition: function (e, t) {
                            "coverflow" === e.params.effect && e.coverflowEffect.setTransition(t)
                        }
                    }
                }, {
                    name: "thumbs",
                    params: {
                        thumbs: {
                            swiper: null,
                            multipleActiveThumbs: !0,
                            autoScrollOffset: 0,
                            slideThumbActiveClass: "swiper-slide-thumb-active",
                            thumbsContainerClass: "swiper-container-thumbs"
                        }
                    },
                    create: function () {
                        M(this, {
                            thumbs: t({
                                swiper: null,
                                initialized: !1
                            }, ce)
                        })
                    },
                    on: {
                        beforeInit: function (e) {
                            var t = e.params.thumbs;
                            t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0))
                        },
                        slideChange: function (e) {
                            e.thumbs.swiper && e.thumbs.update()
                        },
                        update: function (e) {
                            e.thumbs.swiper && e.thumbs.update()
                        },
                        resize: function (e) {
                            e.thumbs.swiper && e.thumbs.update()
                        },
                        observerUpdate: function (e) {
                            e.thumbs.swiper && e.thumbs.update()
                        },
                        setTransition: function (e, t) {
                            var i = e.thumbs.swiper;
                            i && i.setTransition(t)
                        },
                        beforeDestroy: function (e) {
                            var t = e.thumbs.swiper;
                            t && e.thumbs.swiperCreated && t && t.destroy()
                        }
                    }
                }];
        return q.use(pe), q
    }));