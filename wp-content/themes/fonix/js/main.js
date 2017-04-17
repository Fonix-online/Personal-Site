! function(a) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
  else if ("function" == typeof define && define.amd) define([], a);
  else {
    var b;
    b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.PIXI = a()
  }
}(function() {
  var a;
  return function a(b, c, d) {
    function e(g, h) {
      if (!c[g]) {
        if (!b[g]) {
          var i = "function" == typeof require && require;
          if (!h && i) return i(g, !0);
          if (f) return f(g, !0);
          var j = new Error("Cannot find module '" + g + "'");
          throw j.code = "MODULE_NOT_FOUND", j
        }
        var k = c[g] = {
          exports: {}
        };
        b[g][0].call(k.exports, function(a) {
          var c = b[g][1][a];
          return e(c ? c : a)
        }, k, k.exports, a, b, c, d)
      }
      return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
  }({
    1: [function(a, b, c) {
      "use strict";
      "use restrict";

      function d(a) {
        var b = 32;
        return a &= -a, a && b--, 65535 & a && (b -= 16), 16711935 & a && (b -= 8), 252645135 & a && (b -= 4), 858993459 & a && (b -= 2), 1431655765 & a && (b -= 1), b
      }
      var e = 32;
      c.INT_BITS = e, c.INT_MAX = 2147483647, c.INT_MIN = -1 << e - 1, c.sign = function(a) {
        return (a > 0) - (a < 0)
      }, c.abs = function(a) {
        var b = a >> e - 1;
        return (a ^ b) - b
      }, c.min = function(a, b) {
        return b ^ (a ^ b) & -(a < b)
      }, c.max = function(a, b) {
        return a ^ (a ^ b) & -(a < b)
      }, c.isPow2 = function(a) {
        return !(a & a - 1 || !a)
      }, c.log2 = function(a) {
        var b, c;
        return b = (a > 65535) << 4, a >>>= b, c = (a > 255) << 3, a >>>= c, b |= c, c = (a > 15) << 2, a >>>= c, b |= c, c = (a > 3) << 1, a >>>= c, b |= c, b | a >> 1
      }, c.log10 = function(a) {
        return a >= 1e9 ? 9 : a >= 1e8 ? 8 : a >= 1e7 ? 7 : a >= 1e6 ? 6 : a >= 1e5 ? 5 : a >= 1e4 ? 4 : a >= 1e3 ? 3 : a >= 100 ? 2 : a >= 10 ? 1 : 0
      }, c.popCount = function(a) {
        return a -= a >>> 1 & 1431655765, a = (858993459 & a) + (a >>> 2 & 858993459), 16843009 * (a + (a >>> 4) & 252645135) >>> 24
      }, c.countTrailingZeros = d, c.nextPow2 = function(a) {
        return a += 0 === a, --a, a |= a >>> 1, a |= a >>> 2, a |= a >>> 4, a |= a >>> 8, a |= a >>> 16, a + 1
      }, c.prevPow2 = function(a) {
        return a |= a >>> 1, a |= a >>> 2, a |= a >>> 4, a |= a >>> 8, a |= a >>> 16, a - (a >>> 1)
      }, c.parity = function(a) {
        return a ^= a >>> 16, a ^= a >>> 8, a ^= a >>> 4, a &= 15, 27030 >>> a & 1
      };
      var f = new Array(256);
      ! function(a) {
        for (var b = 0; b < 256; ++b) {
          var c = b,
            d = b,
            e = 7;
          for (c >>>= 1; c; c >>>= 1) d <<= 1, d |= 1 & c, --e;
          a[b] = d << e & 255
        }
      }(f), c.reverse = function(a) {
        return f[255 & a] << 24 | f[a >>> 8 & 255] << 16 | f[a >>> 16 & 255] << 8 | f[a >>> 24 & 255]
      }, c.interleave2 = function(a, b) {
        return a &= 65535, a = 16711935 & (a | a << 8), a = 252645135 & (a | a << 4), a = 858993459 & (a | a << 2), a = 1431655765 & (a | a << 1), b &= 65535, b = 16711935 & (b | b << 8), b = 252645135 & (b | b << 4), b = 858993459 & (b | b << 2), b = 1431655765 & (b | b << 1), a | b << 1
      }, c.deinterleave2 = function(a, b) {
        return a = a >>> b & 1431655765, a = 858993459 & (a | a >>> 1), a = 252645135 & (a | a >>> 2), a = 16711935 & (a | a >>> 4), a = 65535 & (a | a >>> 16), a << 16 >> 16
      }, c.interleave3 = function(a, b, c) {
        return a &= 1023, a = 4278190335 & (a | a << 16), a = 251719695 & (a | a << 8), a = 3272356035 & (a | a << 4), a = 1227133513 & (a | a << 2), b &= 1023, b = 4278190335 & (b | b << 16), b = 251719695 & (b | b << 8), b = 3272356035 & (b | b << 4), b = 1227133513 & (b | b << 2), a |= b << 1, c &= 1023, c = 4278190335 & (c | c << 16), c = 251719695 & (c | c << 8), c = 3272356035 & (c | c << 4), c = 1227133513 & (c | c << 2), a | c << 2
      }, c.deinterleave3 = function(a, b) {
        return a = a >>> b & 1227133513, a = 3272356035 & (a | a >>> 2), a = 251719695 & (a | a >>> 4), a = 4278190335 & (a | a >>> 8), a = 1023 & (a | a >>> 16), a << 22 >> 22
      }, c.nextCombination = function(a) {
        var b = a | a - 1;
        return b + 1 | (~b & -~b) - 1 >>> d(a) + 1
      }
    }, {}],
    2: [function(a, b, c) {
      "use strict";

      function d(a, b, c) {
        c = c || 2;
        var d = b && b.length,
          f = d ? b[0] * c : a.length,
          h = e(a, 0, f, c, !0),
          i = [];
        if (!h) return i;
        var j, k, m, n, o, p, q;
        if (d && (h = l(a, b, h, c)), a.length > 80 * c) {
          j = m = a[0], k = n = a[1];
          for (var r = c; r < f; r += c) o = a[r], p = a[r + 1], o < j && (j = o), p < k && (k = p), o > m && (m = o), p > n && (n = p);
          q = Math.max(m - j, n - k)
        }
        return g(h, i, c, j, k, q), i
      }

      function e(a, b, c, d, e) {
        var f, g;
        if (e === F(a, b, c, d) > 0)
          for (f = b; f < c; f += d) g = C(f, a[f], a[f + 1], g);
        else
          for (f = c - d; f >= b; f -= d) g = C(f, a[f], a[f + 1], g);
        return g && w(g, g.next) && (D(g), g = g.next), g
      }

      function f(a, b) {
        if (!a) return a;
        b || (b = a);
        var c, d = a;
        do
          if (c = !1, d.steiner || !w(d, d.next) && 0 !== v(d.prev, d, d.next)) d = d.next;
          else {
            if (D(d), d = b = d.prev, d === d.next) return null;
            c = !0
          }
        while (c || d !== b);
        return b
      }

      function g(a, b, c, d, e, l, m) {
        if (a) {
          !m && l && p(a, d, e, l);
          for (var n, o, q = a; a.prev !== a.next;)
            if (n = a.prev, o = a.next, l ? i(a, d, e, l) : h(a)) b.push(n.i / c), b.push(a.i / c), b.push(o.i / c), D(a), a = o.next, q = o.next;
            else if (a = o, a === q) {
            m ? 1 === m ? (a = j(a, b, c), g(a, b, c, d, e, l, 2)) : 2 === m && k(a, b, c, d, e, l) : g(f(a), b, c, d, e, l, 1);
            break
          }
        }
      }

      function h(a) {
        var b = a.prev,
          c = a,
          d = a.next;
        if (v(b, c, d) >= 0) return !1;
        for (var e = a.next.next; e !== a.prev;) {
          if (t(b.x, b.y, c.x, c.y, d.x, d.y, e.x, e.y) && v(e.prev, e, e.next) >= 0) return !1;
          e = e.next
        }
        return !0
      }

      function i(a, b, c, d) {
        var e = a.prev,
          f = a,
          g = a.next;
        if (v(e, f, g) >= 0) return !1;
        for (var h = e.x < f.x ? e.x < g.x ? e.x : g.x : f.x < g.x ? f.x : g.x, i = e.y < f.y ? e.y < g.y ? e.y : g.y : f.y < g.y ? f.y : g.y, j = e.x > f.x ? e.x > g.x ? e.x : g.x : f.x > g.x ? f.x : g.x, k = e.y > f.y ? e.y > g.y ? e.y : g.y : f.y > g.y ? f.y : g.y, l = r(h, i, b, c, d), m = r(j, k, b, c, d), n = a.nextZ; n && n.z <= m;) {
          if (n !== a.prev && n !== a.next && t(e.x, e.y, f.x, f.y, g.x, g.y, n.x, n.y) && v(n.prev, n, n.next) >= 0) return !1;
          n = n.nextZ
        }
        for (n = a.prevZ; n && n.z >= l;) {
          if (n !== a.prev && n !== a.next && t(e.x, e.y, f.x, f.y, g.x, g.y, n.x, n.y) && v(n.prev, n, n.next) >= 0) return !1;
          n = n.prevZ
        }
        return !0
      }

      function j(a, b, c) {
        var d = a;
        do {
          var e = d.prev,
            f = d.next.next;
          !w(e, f) && x(e, d, d.next, f) && z(e, f) && z(f, e) && (b.push(e.i / c), b.push(d.i / c), b.push(f.i / c), D(d), D(d.next), d = a = f), d = d.next
        } while (d !== a);
        return d
      }

      function k(a, b, c, d, e, h) {
        var i = a;
        do {
          for (var j = i.next.next; j !== i.prev;) {
            if (i.i !== j.i && u(i, j)) {
              var k = B(i, j);
              return i = f(i, i.next), k = f(k, k.next), g(i, b, c, d, e, h), void g(k, b, c, d, e, h)
            }
            j = j.next
          }
          i = i.next
        } while (i !== a)
      }

      function l(a, b, c, d) {
        var g, h, i, j, k, l = [];
        for (g = 0, h = b.length; g < h; g++) i = b[g] * d, j = g < h - 1 ? b[g + 1] * d : a.length, k = e(a, i, j, d, !1), k === k.next && (k.steiner = !0), l.push(s(k));
        for (l.sort(m), g = 0; g < l.length; g++) n(l[g], c), c = f(c, c.next);
        return c
      }

      function m(a, b) {
        return a.x - b.x
      }

      function n(a, b) {
        if (b = o(a, b)) {
          var c = B(b, a);
          f(c, c.next)
        }
      }

      function o(a, b) {
        var c, d = b,
          e = a.x,
          f = a.y,
          g = -(1 / 0);
        do {
          if (f <= d.y && f >= d.next.y) {
            var h = d.x + (f - d.y) * (d.next.x - d.x) / (d.next.y - d.y);
            if (h <= e && h > g) {
              if (g = h, h === e) {
                if (f === d.y) return d;
                if (f === d.next.y) return d.next
              }
              c = d.x < d.next.x ? d : d.next
            }
          }
          d = d.next
        } while (d !== b);
        if (!c) return null;
        if (e === g) return c.prev;
        var i, j = c,
          k = c.x,
          l = c.y,
          m = 1 / 0;
        for (d = c.next; d !== j;) e >= d.x && d.x >= k && t(f < l ? e : g, f, k, l, f < l ? g : e, f, d.x, d.y) && (i = Math.abs(f - d.y) / (e - d.x), (i < m || i === m && d.x > c.x) && z(d, a) && (c = d, m = i)), d = d.next;
        return c
      }

      function p(a, b, c, d) {
        var e = a;
        do null === e.z && (e.z = r(e.x, e.y, b, c, d)), e.prevZ = e.prev, e.nextZ = e.next, e = e.next; while (e !== a);
        e.prevZ.nextZ = null, e.prevZ = null, q(e)
      }

      function q(a) {
        var b, c, d, e, f, g, h, i, j = 1;
        do {
          for (c = a, a = null, f = null, g = 0; c;) {
            for (g++, d = c, h = 0, b = 0; b < j && (h++, d = d.nextZ); b++);
            for (i = j; h > 0 || i > 0 && d;) 0 === h ? (e = d, d = d.nextZ, i--) : 0 !== i && d ? c.z <= d.z ? (e = c, c = c.nextZ, h--) : (e = d, d = d.nextZ, i--) : (e = c, c = c.nextZ, h--), f ? f.nextZ = e : a = e, e.prevZ = f, f = e;
            c = d
          }
          f.nextZ = null, j *= 2
        } while (g > 1);
        return a
      }

      function r(a, b, c, d, e) {
        return a = 32767 * (a - c) / e, b = 32767 * (b - d) / e, a = 16711935 & (a | a << 8), a = 252645135 & (a | a << 4), a = 858993459 & (a | a << 2), a = 1431655765 & (a | a << 1), b = 16711935 & (b | b << 8), b = 252645135 & (b | b << 4), b = 858993459 & (b | b << 2), b = 1431655765 & (b | b << 1), a | b << 1
      }

      function s(a) {
        var b = a,
          c = a;
        do b.x < c.x && (c = b), b = b.next; while (b !== a);
        return c
      }

      function t(a, b, c, d, e, f, g, h) {
        return (e - g) * (b - h) - (a - g) * (f - h) >= 0 && (a - g) * (d - h) - (c - g) * (b - h) >= 0 && (c - g) * (f - h) - (e - g) * (d - h) >= 0
      }

      function u(a, b) {
        return a.next.i !== b.i && a.prev.i !== b.i && !y(a, b) && z(a, b) && z(b, a) && A(a, b)
      }

      function v(a, b, c) {
        return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
      }

      function w(a, b) {
        return a.x === b.x && a.y === b.y
      }

      function x(a, b, c, d) {
        return !!(w(a, b) && w(c, d) || w(a, d) && w(c, b)) || v(a, b, c) > 0 != v(a, b, d) > 0 && v(c, d, a) > 0 != v(c, d, b) > 0
      }

      function y(a, b) {
        var c = a;
        do {
          if (c.i !== a.i && c.next.i !== a.i && c.i !== b.i && c.next.i !== b.i && x(c, c.next, a, b)) return !0;
          c = c.next
        } while (c !== a);
        return !1
      }

      function z(a, b) {
        return v(a.prev, a, a.next) < 0 ? v(a, b, a.next) >= 0 && v(a, a.prev, b) >= 0 : v(a, b, a.prev) < 0 || v(a, a.next, b) < 0
      }

      function A(a, b) {
        var c = a,
          d = !1,
          e = (a.x + b.x) / 2,
          f = (a.y + b.y) / 2;
        do c.y > f != c.next.y > f && e < (c.next.x - c.x) * (f - c.y) / (c.next.y - c.y) + c.x && (d = !d), c = c.next; while (c !== a);
        return d
      }

      function B(a, b) {
        var c = new E(a.i, a.x, a.y),
          d = new E(b.i, b.x, b.y),
          e = a.next,
          f = b.prev;
        return a.next = b, b.prev = a, c.next = e, e.prev = c, d.next = c, c.prev = d, f.next = d, d.prev = f, d
      }

      function C(a, b, c, d) {
        var e = new E(a, b, c);
        return d ? (e.next = d.next, e.prev = d, d.next.prev = e, d.next = e) : (e.prev = e, e.next = e), e
      }

      function D(a) {
        a.next.prev = a.prev, a.prev.next = a.next, a.prevZ && (a.prevZ.nextZ = a.nextZ), a.nextZ && (a.nextZ.prevZ = a.prevZ)
      }

      function E(a, b, c) {
        this.i = a, this.x = b, this.y = c, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
      }

      function F(a, b, c, d) {
        for (var e = 0, f = b, g = c - d; f < c; f += d) e += (a[g] - a[f]) * (a[f + 1] + a[g + 1]), g = f;
        return e
      }
      b.exports = d, d.deviation = function(a, b, c, d) {
        var e = b && b.length,
          f = e ? b[0] * c : a.length,
          g = Math.abs(F(a, 0, f, c));
        if (e)
          for (var h = 0, i = b.length; h < i; h++) {
            var j = b[h] * c,
              k = h < i - 1 ? b[h + 1] * c : a.length;
            g -= Math.abs(F(a, j, k, c))
          }
        var l = 0;
        for (h = 0; h < d.length; h += 3) {
          var m = d[h] * c,
            n = d[h + 1] * c,
            o = d[h + 2] * c;
          l += Math.abs((a[m] - a[o]) * (a[n + 1] - a[m + 1]) - (a[m] - a[n]) * (a[o + 1] - a[m + 1]))
        }
        return 0 === g && 0 === l ? 0 : Math.abs((l - g) / g)
      }, d.flatten = function(a) {
        for (var b = a[0][0].length, c = {
            vertices: [],
            holes: [],
            dimensions: b
          }, d = 0, e = 0; e < a.length; e++) {
          for (var f = 0; f < a[e].length; f++)
            for (var g = 0; g < b; g++) c.vertices.push(a[e][f][g]);
          e > 0 && (d += a[e - 1].length, c.holes.push(d))
        }
        return c
      }
    }, {}],
    3: [function(a, b, c) {
      "use strict";

      function d() {}

      function e(a, b, c) {
        this.fn = a, this.context = b, this.once = c || !1
      }

      function f() {
        this._events = new d, this._eventsCount = 0
      }
      var g = Object.prototype.hasOwnProperty,
        h = "~";
      Object.create && (d.prototype = Object.create(null), (new d).__proto__ || (h = !1)), f.prototype.eventNames = function() {
        var a, b, c = [];
        if (0 === this._eventsCount) return c;
        for (b in a = this._events) g.call(a, b) && c.push(h ? b.slice(1) : b);
        return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(a)) : c
      }, f.prototype.listeners = function(a, b) {
        var c = h ? h + a : a,
          d = this._events[c];
        if (b) return !!d;
        if (!d) return [];
        if (d.fn) return [d.fn];
        for (var e = 0, f = d.length, g = new Array(f); e < f; e++) g[e] = d[e].fn;
        return g
      }, f.prototype.emit = function(a, b, c, d, e, f) {
        var g = h ? h + a : a;
        if (!this._events[g]) return !1;
        var i, j, k = this._events[g],
          l = arguments.length;
        if (k.fn) {
          switch (k.once && this.removeListener(a, k.fn, void 0, !0), l) {
            case 1:
              return k.fn.call(k.context), !0;
            case 2:
              return k.fn.call(k.context, b), !0;
            case 3:
              return k.fn.call(k.context, b, c), !0;
            case 4:
              return k.fn.call(k.context, b, c, d), !0;
            case 5:
              return k.fn.call(k.context, b, c, d, e), !0;
            case 6:
              return k.fn.call(k.context, b, c, d, e, f), !0
          }
          for (j = 1, i = new Array(l - 1); j < l; j++) i[j - 1] = arguments[j];
          k.fn.apply(k.context, i)
        } else {
          var m, n = k.length;
          for (j = 0; j < n; j++) switch (k[j].once && this.removeListener(a, k[j].fn, void 0, !0), l) {
            case 1:
              k[j].fn.call(k[j].context);
              break;
            case 2:
              k[j].fn.call(k[j].context, b);
              break;
            case 3:
              k[j].fn.call(k[j].context, b, c);
              break;
            case 4:
              k[j].fn.call(k[j].context, b, c, d);
              break;
            default:
              if (!i)
                for (m = 1, i = new Array(l - 1); m < l; m++) i[m - 1] = arguments[m];
              k[j].fn.apply(k[j].context, i)
          }
        }
        return !0
      }, f.prototype.on = function(a, b, c) {
        var d = new e(b, c || this),
          f = h ? h + a : a;
        return this._events[f] ? this._events[f].fn ? this._events[f] = [this._events[f], d] : this._events[f].push(d) : (this._events[f] = d, this._eventsCount++), this
      }, f.prototype.once = function(a, b, c) {
        var d = new e(b, c || this, !0),
          f = h ? h + a : a;
        return this._events[f] ? this._events[f].fn ? this._events[f] = [this._events[f], d] : this._events[f].push(d) : (this._events[f] = d, this._eventsCount++), this
      }, f.prototype.removeListener = function(a, b, c, e) {
        var f = h ? h + a : a;
        if (!this._events[f]) return this;
        if (!b) return 0 === --this._eventsCount ? this._events = new d : delete this._events[f], this;
        var g = this._events[f];
        if (g.fn) g.fn !== b || e && !g.once || c && g.context !== c || (0 === --this._eventsCount ? this._events = new d : delete this._events[f]);
        else {
          for (var i = 0, j = [], k = g.length; i < k; i++)(g[i].fn !== b || e && !g[i].once || c && g[i].context !== c) && j.push(g[i]);
          j.length ? this._events[f] = 1 === j.length ? j[0] : j : 0 === --this._eventsCount ? this._events = new d : delete this._events[f]
        }
        return this
      }, f.prototype.removeAllListeners = function(a) {
        var b;
        return a ? (b = h ? h + a : a, this._events[b] && (0 === --this._eventsCount ? this._events = new d : delete this._events[b])) : (this._events = new d, this._eventsCount = 0), this
      }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prototype.setMaxListeners = function() {
        return this
      }, f.prefixed = h, f.EventEmitter = f, "undefined" != typeof b && (b.exports = f)
    }, {}],
    4: [function(b, c, d) {
      ! function(b) {
        var d = /iPhone/i,
          e = /iPod/i,
          f = /iPad/i,
          g = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
          h = /Android/i,
          i = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
          j = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
          k = /IEMobile/i,
          l = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
          m = /BlackBerry/i,
          n = /BB10/i,
          o = /Opera Mini/i,
          p = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
          q = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
          r = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
          s = function(a, b) {
            return a.test(b)
          },
          t = function(a) {
            var b = a || navigator.userAgent,
              c = b.split("[FBAN");
            if ("undefined" != typeof c[1] && (b = c[0]), c = b.split("Twitter"), "undefined" != typeof c[1] && (b = c[0]), this.apple = {
                phone: s(d, b),
                ipod: s(e, b),
                tablet: !s(d, b) && s(f, b),
                device: s(d, b) || s(e, b) || s(f, b)
              }, this.amazon = {
                phone: s(i, b),
                tablet: !s(i, b) && s(j, b),
                device: s(i, b) || s(j, b)
              }, this.android = {
                phone: s(i, b) || s(g, b),
                tablet: !s(i, b) && !s(g, b) && (s(j, b) || s(h, b)),
                device: s(i, b) || s(j, b) || s(g, b) || s(h, b)
              }, this.windows = {
                phone: s(k, b),
                tablet: s(l, b),
                device: s(k, b) || s(l, b)
              }, this.other = {
                blackberry: s(m, b),
                blackberry10: s(n, b),
                opera: s(o, b),
                firefox: s(q, b),
                chrome: s(p, b),
                device: s(m, b) || s(n, b) || s(o, b) || s(q, b) || s(p, b)
              }, this.seven_inch = s(r, b), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this
          },
          u = function() {
            var a = new t;
            return a.Class = t, a
          };
        "undefined" != typeof c && c.exports && "undefined" == typeof window ? c.exports = t : "undefined" != typeof c && c.exports && "undefined" != typeof window ? c.exports = u() : "function" == typeof a && a.amd ? a("isMobile", [], b.isMobile = u()) : b.isMobile = u()
      }(this)
    }, {}],
    5: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (null === a || void 0 === a) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(a)
      }

      function e() {
        try {
          if (!Object.assign) return !1;
          var a = new String("abc");
          if (a[5] = "de", "5" === Object.getOwnPropertyNames(a)[0]) return !1;
          for (var b = {}, c = 0; c < 10; c++) b["_" + String.fromCharCode(c)] = c;
          var d = Object.getOwnPropertyNames(b).map(function(a) {
            return b[a]
          });
          if ("0123456789" !== d.join("")) return !1;
          var e = {};
          return "abcdefghijklmnopqrst".split("").forEach(function(a) {
            e[a] = a
          }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, e)).join("")
        } catch (a) {
          return !1
        }
      }
      var f = Object.prototype.hasOwnProperty,
        g = Object.prototype.propertyIsEnumerable;
      b.exports = e() ? Object.assign : function(a, b) {
        for (var c, e, h = d(a), i = 1; i < arguments.length; i++) {
          c = Object(arguments[i]);
          for (var j in c) f.call(c, j) && (h[j] = c[j]);
          if (Object.getOwnPropertySymbols) {
            e = Object.getOwnPropertySymbols(c);
            for (var k = 0; k < e.length; k++) g.call(c, e[k]) && (h[e[k]] = c[e[k]])
          }
        }
        return h
      }
    }, {}],
    6: [function(a, b, c) {
      var d = new ArrayBuffer(0),
        e = function(a, b, c, e) {
          this.gl = a, this.buffer = a.createBuffer(), this.type = b || a.ARRAY_BUFFER, this.drawType = e || a.STATIC_DRAW, this.data = d, c && this.upload(c)
        };
      e.prototype.upload = function(a, b, c) {
        c || this.bind();
        var d = this.gl;
        a = a || this.data, b = b || 0, this.data.byteLength >= a.byteLength ? d.bufferSubData(this.type, b, a) : d.bufferData(this.type, a, this.drawType), this.data = a
      }, e.prototype.bind = function() {
        var a = this.gl;
        a.bindBuffer(this.type, this.buffer)
      }, e.createVertexBuffer = function(a, b, c) {
        return new e(a, a.ARRAY_BUFFER, b, c)
      }, e.createIndexBuffer = function(a, b, c) {
        return new e(a, a.ELEMENT_ARRAY_BUFFER, b, c)
      }, e.create = function(a, b, c, d) {
        return new e(a, b, d)
      }, e.prototype.destroy = function() {
        this.gl.deleteBuffer(this.buffer)
      }, b.exports = e
    }, {}],
    7: [function(a, b, c) {
      var d = a("./GLTexture"),
        e = function(a, b, c) {
          this.gl = a, this.framebuffer = a.createFramebuffer(), this.stencil = null, this.texture = null, this.width = b || 100, this.height = c || 100
        };
      e.prototype.enableTexture = function(a) {
        var b = this.gl;
        this.texture = a || new d(b), this.texture.bind(), this.bind(), b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, this.texture.texture, 0)
      }, e.prototype.enableStencil = function() {
        if (!this.stencil) {
          var a = this.gl;
          this.stencil = a.createRenderbuffer(), a.bindRenderbuffer(a.RENDERBUFFER, this.stencil), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.RENDERBUFFER, this.stencil), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, this.width, this.height)
        }
      }, e.prototype.clear = function(a, b, c, d) {
        this.bind();
        var e = this.gl;
        e.clearColor(a, b, c, d), e.clear(e.COLOR_BUFFER_BIT)
      }, e.prototype.bind = function() {
        var a = this.gl;
        this.texture && this.texture.unbind(), a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer)
      }, e.prototype.unbind = function() {
        var a = this.gl;
        a.bindFramebuffer(a.FRAMEBUFFER, null)
      }, e.prototype.resize = function(a, b) {
        var c = this.gl;
        this.width = a, this.height = b, this.texture && this.texture.uploadData(null, a, b), this.stencil && (c.bindRenderbuffer(c.RENDERBUFFER, this.stencil), c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_STENCIL, a, b))
      }, e.prototype.destroy = function() {
        var a = this.gl;
        this.texture && this.texture.destroy(), a.deleteFramebuffer(this.framebuffer), this.gl = null, this.stencil = null, this.texture = null
      }, e.createRGBA = function(a, b, c) {
        var f = d.fromData(a, null, b, c);
        f.enableNearestScaling(), f.enableWrapClamp();
        var g = new e(a, b, c);
        return g.enableTexture(f), g.unbind(), g
      }, e.createFloat32 = function(a, b, c, f) {
        var g = new d.fromData(a, f, b, c);
        g.enableNearestScaling(), g.enableWrapClamp();
        var h = new e(a, b, c);
        return h.enableTexture(g), h.unbind(), h
      }, b.exports = e
    }, {
      "./GLTexture": 9
    }],
    8: [function(a, b, c) {
      var d = a("./shader/compileProgram"),
        e = a("./shader/extractAttributes"),
        f = a("./shader/extractUniforms"),
        g = a("./shader/generateUniformAccessObject"),
        h = function(a, b, c) {
          this.gl = a, this.program = d(a, b, c), this.attributes = e(a, this.program);
          var h = f(a, this.program);
          this.uniforms = g(a, h)
        };
      h.prototype.bind = function() {
        this.gl.useProgram(this.program)
      }, h.prototype.destroy = function() {}, b.exports = h
    }, {
      "./shader/compileProgram": 14,
      "./shader/extractAttributes": 16,
      "./shader/extractUniforms": 17,
      "./shader/generateUniformAccessObject": 18
    }],
    9: [function(a, b, c) {
      var d = function(a, b, c, d, e) {
        this.gl = a, this.texture = a.createTexture(), this.mipmap = !1, this.premultiplyAlpha = !1, this.width = b || 0, this.height = c || 0, this.format = d || a.RGBA, this.type = e || a.UNSIGNED_BYTE
      };
      d.prototype.upload = function(a) {
        this.bind();
        var b = this.gl;
        this.width = a.videoWidth || a.width, this.height = a.videoHeight || a.height, b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), b.texImage2D(b.TEXTURE_2D, 0, this.format, this.format, this.type, a)
      };
      var e = !1;
      d.prototype.uploadData = function(a, b, c) {
        this.bind();
        var d = this.gl;
        if (this.width = b || this.width, this.height = c || this.height, a instanceof Float32Array) {
          if (!e) {
            var f = d.getExtension("OES_texture_float");
            if (!f) throw new Error("floating point textures not available");
            e = !0
          }
          this.type = d.FLOAT
        } else this.type = d.UNSIGNED_BYTE;
        d.pixelStorei(d.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), d.texImage2D(d.TEXTURE_2D, 0, this.format, this.width, this.height, 0, this.format, this.type, a || null)
      }, d.prototype.bind = function(a) {
        var b = this.gl;
        void 0 !== a && b.activeTexture(b.TEXTURE0 + a), b.bindTexture(b.TEXTURE_2D, this.texture)
      }, d.prototype.unbind = function() {
        var a = this.gl;
        a.bindTexture(a.TEXTURE_2D, null)
      }, d.prototype.minFilter = function(a) {
        var b = this.gl;
        this.bind(), this.mipmap ? b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a ? b.LINEAR_MIPMAP_LINEAR : b.NEAREST_MIPMAP_NEAREST) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a ? b.LINEAR : b.NEAREST)
      }, d.prototype.magFilter = function(a) {
        var b = this.gl;
        this.bind(), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, a ? b.LINEAR : b.NEAREST)
      }, d.prototype.enableMipmap = function() {
        var a = this.gl;
        this.bind(), this.mipmap = !0, a.generateMipmap(a.TEXTURE_2D)
      }, d.prototype.enableLinearScaling = function() {
        this.minFilter(!0), this.magFilter(!0)
      }, d.prototype.enableNearestScaling = function() {
        this.minFilter(!1), this.magFilter(!1)
      }, d.prototype.enableWrapClamp = function() {
        var a = this.gl;
        this.bind(), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE)
      }, d.prototype.enableWrapRepeat = function() {
        var a = this.gl;
        this.bind(), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.REPEAT)
      }, d.prototype.enableWrapMirrorRepeat = function() {
        var a = this.gl;
        this.bind(), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.MIRRORED_REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.MIRRORED_REPEAT)
      }, d.prototype.destroy = function() {
        var a = this.gl;
        a.deleteTexture(this.texture)
      }, d.fromSource = function(a, b, c) {
        var e = new d(a);
        return e.premultiplyAlpha = c || !1, e.upload(b), e
      }, d.fromData = function(a, b, c, e) {
        var f = new d(a);
        return f.uploadData(b, c, e), f
      }, b.exports = d
    }, {}],
    10: [function(a, b, c) {
      function d(a, b) {
        if (this.nativeVaoExtension = null, d.FORCE_NATIVE || (this.nativeVaoExtension = a.getExtension("OES_vertex_array_object") || a.getExtension("MOZ_OES_vertex_array_object") || a.getExtension("WEBKIT_OES_vertex_array_object")), this.nativeState = b, this.nativeVaoExtension) {
          this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
          var c = a.getParameter(a.MAX_VERTEX_ATTRIBS);
          this.nativeState = {
            tempAttribState: new Array(c),
            attribState: new Array(c)
          }
        }
        this.gl = a, this.attributes = [], this.indexBuffer = null, this.dirty = !1
      }
      var e = a("./setVertexAttribArrays");
      d.prototype.constructor = d, b.exports = d, d.FORCE_NATIVE = !1, d.prototype.bind = function() {
        return this.nativeVao ? (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.dirty && (this.dirty = !1, this.activate())) : this.activate(), this
      }, d.prototype.unbind = function() {
        return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null), this
      }, d.prototype.activate = function() {
        for (var a = this.gl, b = null, c = 0; c < this.attributes.length; c++) {
          var d = this.attributes[c];
          b !== d.buffer && (d.buffer.bind(), b = d.buffer), a.vertexAttribPointer(d.attribute.location, d.attribute.size, d.type || a.FLOAT, d.normalized || !1, d.stride || 0, d.start || 0)
        }
        return e(a, this.attributes, this.nativeState), this.indexBuffer.bind(), this
      }, d.prototype.addAttribute = function(a, b, c, d, e, f) {
        return this.attributes.push({
          buffer: a,
          attribute: b,
          location: b.location,
          type: c || this.gl.FLOAT,
          normalized: d || !1,
          stride: e || 0,
          start: f || 0
        }), this.dirty = !0, this
      }, d.prototype.addIndex = function(a) {
        return this.indexBuffer = a, this.dirty = !0, this
      }, d.prototype.clear = function() {
        return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.attributes.length = 0, this.indexBuffer = null, this
      }, d.prototype.draw = function(a, b, c) {
        var d = this.gl;
        return d.drawElements(a, b, d.UNSIGNED_SHORT, c || 0), this
      }, d.prototype.destroy = function() {
        this.gl = null, this.indexBuffer = null, this.attributes = null, this.nativeState = null, this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao), this.nativeVaoExtension = null, this.nativeVao = null
      }
    }, {
      "./setVertexAttribArrays": 13
    }],
    11: [function(a, b, c) {
      var d = function(a, b) {
        var c = a.getContext("webgl", b) || a.getContext("experimental-webgl", b);
        if (!c) throw new Error("This browser does not support webGL. Try using the canvas renderer");
        return c
      };
      b.exports = d
    }, {}],
    12: [function(a, b, c) {
      var d = {
        createContext: a("./createContext"),
        setVertexAttribArrays: a("./setVertexAttribArrays"),
        GLBuffer: a("./GLBuffer"),
        GLFramebuffer: a("./GLFramebuffer"),
        GLShader: a("./GLShader"),
        GLTexture: a("./GLTexture"),
        VertexArrayObject: a("./VertexArrayObject"),
        shader: a("./shader")
      };
      "undefined" != typeof b && b.exports && (b.exports = d), "undefined" != typeof window && (window.pixi = {
        gl: d
      })
    }, {
      "./GLBuffer": 6,
      "./GLFramebuffer": 7,
      "./GLShader": 8,
      "./GLTexture": 9,
      "./VertexArrayObject": 10,
      "./createContext": 11,
      "./setVertexAttribArrays": 13,
      "./shader": 19
    }],
    13: [function(a, b, c) {
      var d = function(a, b, c) {
        var d;
        if (c) {
          var e = c.tempAttribState,
            f = c.attribState;
          for (d = 0; d < e.length; d++) e[d] = !1;
          for (d = 0; d < b.length; d++) e[b[d].attribute.location] = !0;
          for (d = 0; d < f.length; d++) f[d] !== e[d] && (f[d] = e[d], c.attribState[d] ? a.enableVertexAttribArray(d) : a.disableVertexAttribArray(d))
        } else
          for (d = 0; d < b.length; d++) {
            var g = b[d];
            a.enableVertexAttribArray(g.attribute.location)
          }
      };
      b.exports = d
    }, {}],
    14: [function(a, b, c) {
      var d = function(a, b, c) {
          var d = e(a, a.VERTEX_SHADER, b),
            f = e(a, a.FRAGMENT_SHADER, c),
            g = a.createProgram();
          return a.attachShader(g, d), a.attachShader(g, f), a.linkProgram(g), a.getProgramParameter(g, a.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", a.getProgramParameter(g, a.VALIDATE_STATUS)), console.error("gl.getError()", a.getError()), "" !== a.getProgramInfoLog(g) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", a.getProgramInfoLog(g)), a.deleteProgram(g), g = null), a.deleteShader(d), a.deleteShader(f), g
        },
        e = function(a, b, c) {
          var d = a.createShader(b);
          return a.shaderSource(d, c), a.compileShader(d), a.getShaderParameter(d, a.COMPILE_STATUS) ? d : (console.log(a.getShaderInfoLog(d)), null)
        };
      b.exports = d
    }, {}],
    15: [function(a, b, c) {
      var d = function(a, b) {
          switch (a) {
            case "float":
              return 0;
            case "vec2":
              return new Float32Array(2 * b);
            case "vec3":
              return new Float32Array(3 * b);
            case "vec4":
              return new Float32Array(4 * b);
            case "int":
            case "sampler2D":
              return 0;
            case "ivec2":
              return new Int32Array(2 * b);
            case "ivec3":
              return new Int32Array(3 * b);
            case "ivec4":
              return new Int32Array(4 * b);
            case "bool":
              return !1;
            case "bvec2":
              return e(2 * b);
            case "bvec3":
              return e(3 * b);
            case "bvec4":
              return e(4 * b);
            case "mat2":
              return new Float32Array([1, 0, 0, 1]);
            case "mat3":
              return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            case "mat4":
              return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
          }
        },
        e = function(a) {
          for (var b = new Array(a), c = 0; c < b.length; c++) b[c] = !1;
          return b
        };
      b.exports = d
    }, {}],
    16: [function(a, b, c) {
      var d = a("./mapType"),
        e = a("./mapSize"),
        f = function(a, b) {
          for (var c = {}, f = a.getProgramParameter(b, a.ACTIVE_ATTRIBUTES), h = 0; h < f; h++) {
            var i = a.getActiveAttrib(b, h),
              j = d(a, i.type);
            c[i.name] = {
              type: j,
              size: e(j),
              location: a.getAttribLocation(b, i.name),
              pointer: g
            }
          }
          return c
        },
        g = function(a, b, c, d) {
          gl.vertexAttribPointer(this.location, this.size, a || gl.FLOAT, b || !1, c || 0, d || 0)
        };
      b.exports = f
    }, {
      "./mapSize": 20,
      "./mapType": 21
    }],
    17: [function(a, b, c) {
      var d = a("./mapType"),
        e = a("./defaultValue"),
        f = function(a, b) {
          for (var c = {}, f = a.getProgramParameter(b, a.ACTIVE_UNIFORMS), g = 0; g < f; g++) {
            var h = a.getActiveUniform(b, g),
              i = h.name.replace(/\[.*?\]/, ""),
              j = d(a, h.type);
            c[i] = {
              type: j,
              size: h.size,
              location: a.getUniformLocation(b, i),
              value: e(j, h.size)
            }
          }
          return c
        };
      b.exports = f
    }, {
      "./defaultValue": 15,
      "./mapType": 21
    }],
    18: [function(a, b, c) {
      var d = function(a, b) {
          var c = {
            data: {}
          };
          c.gl = a;
          for (var d = Object.keys(b), h = 0; h < d.length; h++) {
            var i = d[h],
              j = i.split("."),
              k = j[j.length - 1],
              l = g(j, c),
              m = b[i];
            l.data[k] = m, l.gl = a, Object.defineProperty(l, k, {
              get: e(k),
              set: f(k, m)
            })
          }
          return c
        },
        e = function(a) {
          var b = h.replace("%%", a);
          return new Function(b)
        },
        f = function(a, b) {
          var c, d = i.replace(/%%/g, a);
          return c = 1 === b.size ? j[b.type] : k[b.type], c && (d += "\nthis.gl." + c + ";"), new Function("value", d)
        },
        g = function(a, b) {
          for (var c = b, d = 0; d < a.length - 1; d++) {
            var e = c[a[d]] || {
              data: {}
            };
            c[a[d]] = e, c = e
          }
          return c
        },
        h = ["return this.data.%%.value;"].join("\n"),
        i = ["this.data.%%.value = value;", "var location = this.data.%%.location;"].join("\n"),
        j = {
          float: "uniform1f(location, value)",
          vec2: "uniform2f(location, value[0], value[1])",
          vec3: "uniform3f(location, value[0], value[1], value[2])",
          vec4: "uniform4f(location, value[0], value[1], value[2], value[3])",
          int: "uniform1i(location, value)",
          ivec2: "uniform2i(location, value[0], value[1])",
          ivec3: "uniform3i(location, value[0], value[1], value[2])",
          ivec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
          bool: "uniform1i(location, value)",
          bvec2: "uniform2i(location, value[0], value[1])",
          bvec3: "uniform3i(location, value[0], value[1], value[2])",
          bvec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
          mat2: "uniformMatrix2fv(location, false, value)",
          mat3: "uniformMatrix3fv(location, false, value)",
          mat4: "uniformMatrix4fv(location, false, value)",
          sampler2D: "uniform1i(location, value)"
        },
        k = {
          float: "uniform1fv(location, value)",
          vec2: "uniform2fv(location, value)",
          vec3: "uniform3fv(location, value)",
          vec4: "uniform4fv(location, value)",
          int: "uniform1iv(location, value)",
          ivec2: "uniform2iv(location, value)",
          ivec3: "uniform3iv(location, value)",
          ivec4: "uniform4iv(location, value)",
          bool: "uniform1iv(location, value)",
          bvec2: "uniform2iv(location, value)",
          bvec3: "uniform3iv(location, value)",
          bvec4: "uniform4iv(location, value)",
          sampler2D: "uniform1iv(location, value)"
        };
      b.exports = d
    }, {}],
    19: [function(a, b, c) {
      b.exports = {
        compileProgram: a("./compileProgram"),
        defaultValue: a("./defaultValue"),
        extractAttributes: a("./extractAttributes"),
        extractUniforms: a("./extractUniforms"),
        generateUniformAccessObject: a("./generateUniformAccessObject"),
        mapSize: a("./mapSize"),
        mapType: a("./mapType")
      }
    }, {
      "./compileProgram": 14,
      "./defaultValue": 15,
      "./extractAttributes": 16,
      "./extractUniforms": 17,
      "./generateUniformAccessObject": 18,
      "./mapSize": 20,
      "./mapType": 21
    }],
    20: [function(a, b, c) {
      var d = function(a) {
          return e[a]
        },
        e = {
          float: 1,
          vec2: 2,
          vec3: 3,
          vec4: 4,
          int: 1,
          ivec2: 2,
          ivec3: 3,
          ivec4: 4,
          bool: 1,
          bvec2: 2,
          bvec3: 3,
          bvec4: 4,
          mat2: 4,
          mat3: 9,
          mat4: 16,
          sampler2D: 1
        };
      b.exports = d
    }, {}],
    21: [function(a, b, c) {
      var d = function(a, b) {
          if (!e) {
            var c = Object.keys(f);
            e = {};
            for (var d = 0; d < c.length; ++d) {
              var g = c[d];
              e[a[g]] = f[g]
            }
          }
          return e[b]
        },
        e = null,
        f = {
          FLOAT: "float",
          FLOAT_VEC2: "vec2",
          FLOAT_VEC3: "vec3",
          FLOAT_VEC4: "vec4",
          INT: "int",
          INT_VEC2: "ivec2",
          INT_VEC3: "ivec3",
          INT_VEC4: "ivec4",
          BOOL: "bool",
          BOOL_VEC2: "bvec2",
          BOOL_VEC3: "bvec3",
          BOOL_VEC4: "bvec4",
          FLOAT_MAT2: "mat2",
          FLOAT_MAT3: "mat3",
          FLOAT_MAT4: "mat4",
          SAMPLER_2D: "sampler2D"
        };
      b.exports = d
    }, {}],
    22: [function(a, b, c) {
      (function(a) {
        function b(a, b) {
          for (var c = 0, d = a.length - 1; d >= 0; d--) {
            var e = a[d];
            "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
          }
          if (b)
            for (; c--; c) a.unshift("..");
          return a
        }

        function d(a, b) {
          if (a.filter) return a.filter(b);
          for (var c = [], d = 0; d < a.length; d++) b(a[d], d, a) && c.push(a[d]);
          return c
        }
        var e = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
          f = function(a) {
            return e.exec(a).slice(1)
          };
        c.resolve = function() {
          for (var c = "", e = !1, f = arguments.length - 1; f >= -1 && !e; f--) {
            var g = f >= 0 ? arguments[f] : a.cwd();
            if ("string" != typeof g) throw new TypeError("Arguments to path.resolve must be strings");
            g && (c = g + "/" + c, e = "/" === g.charAt(0))
          }
          return c = b(d(c.split("/"), function(a) {
            return !!a
          }), !e).join("/"), (e ? "/" : "") + c || "."
        }, c.normalize = function(a) {
          var e = c.isAbsolute(a),
            f = "/" === g(a, -1);
          return a = b(d(a.split("/"), function(a) {
            return !!a
          }), !e).join("/"), a || e || (a = "."), a && f && (a += "/"), (e ? "/" : "") + a
        }, c.isAbsolute = function(a) {
          return "/" === a.charAt(0)
        }, c.join = function() {
          var a = Array.prototype.slice.call(arguments, 0);
          return c.normalize(d(a, function(a, b) {
            if ("string" != typeof a) throw new TypeError("Arguments to path.join must be strings");
            return a
          }).join("/"))
        }, c.relative = function(a, b) {
          function d(a) {
            for (var b = 0; b < a.length && "" === a[b]; b++);
            for (var c = a.length - 1; c >= 0 && "" === a[c]; c--);
            return b > c ? [] : a.slice(b, c - b + 1)
          }
          a = c.resolve(a).substr(1), b = c.resolve(b).substr(1);
          for (var e = d(a.split("/")), f = d(b.split("/")), g = Math.min(e.length, f.length), h = g, i = 0; i < g; i++)
            if (e[i] !== f[i]) {
              h = i;
              break
            }
          for (var j = [], i = h; i < e.length; i++) j.push("..");
          return j = j.concat(f.slice(h)), j.join("/")
        }, c.sep = "/", c.delimiter = ":", c.dirname = function(a) {
          var b = f(a),
            c = b[0],
            d = b[1];
          return c || d ? (d && (d = d.substr(0, d.length - 1)), c + d) : "."
        }, c.basename = function(a, b) {
          var c = f(a)[2];
          return b && c.substr(-1 * b.length) === b && (c = c.substr(0, c.length - b.length)), c
        }, c.extname = function(a) {
          return f(a)[3]
        };
        var g = "b" === "ab".substr(-1) ? function(a, b, c) {
          return a.substr(b, c)
        } : function(a, b, c) {
          return b < 0 && (b = a.length + b), a.substr(b, c)
        }
      }).call(this, a("_process"))
    }, {
      _process: 23
    }],
    23: [function(a, b, c) {
      function d() {
        throw new Error("setTimeout has not been defined")
      }

      function e() {
        throw new Error("clearTimeout has not been defined")
      }

      function f(a) {
        if (l === setTimeout) return setTimeout(a, 0);
        if ((l === d || !l) && setTimeout) return l = setTimeout, setTimeout(a, 0);
        try {
          return l(a, 0)
        } catch (b) {
          try {
            return l.call(null, a, 0)
          } catch (b) {
            return l.call(this, a, 0)
          }
        }
      }

      function g(a) {
        if (m === clearTimeout) return clearTimeout(a);
        if ((m === e || !m) && clearTimeout) return m = clearTimeout, clearTimeout(a);
        try {
          return m(a)
        } catch (b) {
          try {
            return m.call(null, a)
          } catch (b) {
            return m.call(this, a)
          }
        }
      }

      function h() {
        q && o && (q = !1, o.length ? p = o.concat(p) : r = -1, p.length && i())
      }

      function i() {
        if (!q) {
          var a = f(h);
          q = !0;
          for (var b = p.length; b;) {
            for (o = p, p = []; ++r < b;) o && o[r].run();
            r = -1, b = p.length
          }
          o = null, q = !1, g(a)
        }
      }

      function j(a, b) {
        this.fun = a, this.array = b
      }

      function k() {}
      var l, m, n = b.exports = {};
      ! function() {
        try {
          l = "function" == typeof setTimeout ? setTimeout : d
        } catch (a) {
          l = d
        }
        try {
          m = "function" == typeof clearTimeout ? clearTimeout : e
        } catch (a) {
          m = e
        }
      }();
      var o, p = [],
        q = !1,
        r = -1;
      n.nextTick = function(a) {
        var b = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
        p.push(new j(a, b)), 1 !== p.length || q || f(i)
      }, j.prototype.run = function() {
        this.fun.apply(null, this.array)
      }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = k, n.addListener = k, n.once = k, n.off = k, n.removeListener = k, n.removeAllListeners = k, n.emit = k, n.binding = function(a) {
        throw new Error("process.binding is not supported")
      }, n.cwd = function() {
        return "/"
      }, n.chdir = function(a) {
        throw new Error("process.chdir is not supported")
      }, n.umask = function() {
        return 0
      }
    }, {}],
    24: [function(b, c, d) {
      (function(b) {
        ! function(e) {
          function f(a) {
            throw new RangeError(I[a])
          }

          function g(a, b) {
            for (var c = a.length, d = []; c--;) d[c] = b(a[c]);
            return d
          }

          function h(a, b) {
            var c = a.split("@"),
              d = "";
            c.length > 1 && (d = c[0] + "@", a = c[1]), a = a.replace(H, ".");
            var e = a.split("."),
              f = g(e, b).join(".");
            return d + f
          }

          function i(a) {
            for (var b, c, d = [], e = 0, f = a.length; e < f;) b = a.charCodeAt(e++), b >= 55296 && b <= 56319 && e < f ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), e--)) : d.push(b);
            return d
          }

          function j(a) {
            return g(a, function(a) {
              var b = "";
              return a > 65535 && (a -= 65536, b += L(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += L(a)
            }).join("")
          }

          function k(a) {
            return a - 48 < 10 ? a - 22 : a - 65 < 26 ? a - 65 : a - 97 < 26 ? a - 97 : x
          }

          function l(a, b) {
            return a + 22 + 75 * (a < 26) - ((0 != b) << 5)
          }

          function m(a, b, c) {
            var d = 0;
            for (a = c ? K(a / B) : a >> 1, a += K(a / b); a > J * z >> 1; d += x) a = K(a / J);
            return K(d + (J + 1) * a / (a + A))
          }

          function n(a) {
            var b, c, d, e, g, h, i, l, n, o, p = [],
              q = a.length,
              r = 0,
              s = D,
              t = C;
            for (c = a.lastIndexOf(E), c < 0 && (c = 0), d = 0; d < c; ++d) a.charCodeAt(d) >= 128 && f("not-basic"), p.push(a.charCodeAt(d));
            for (e = c > 0 ? c + 1 : 0; e < q;) {
              for (g = r, h = 1, i = x; e >= q && f("invalid-input"), l = k(a.charCodeAt(e++)), (l >= x || l > K((w - r) / h)) && f("overflow"), r += l * h, n = i <= t ? y : i >= t + z ? z : i - t, !(l < n); i += x) o = x - n, h > K(w / o) && f("overflow"), h *= o;
              b = p.length + 1, t = m(r - g, b, 0 == g), K(r / b) > w - s && f("overflow"), s += K(r / b), r %= b, p.splice(r++, 0, s)
            }
            return j(p)
          }

          function o(a) {
            var b, c, d, e, g, h, j, k, n, o, p, q, r, s, t, u = [];
            for (a = i(a), q = a.length, b = D, c = 0, g = C, h = 0; h < q; ++h) p = a[h], p < 128 && u.push(L(p));
            for (d = e = u.length, e && u.push(E); d < q;) {
              for (j = w, h = 0; h < q; ++h) p = a[h], p >= b && p < j && (j = p);
              for (r = d + 1, j - b > K((w - c) / r) && f("overflow"), c += (j - b) * r, b = j, h = 0; h < q; ++h)
                if (p = a[h], p < b && ++c > w && f("overflow"), p == b) {
                  for (k = c, n = x; o = n <= g ? y : n >= g + z ? z : n - g, !(k < o); n += x) t = k - o, s = x - o, u.push(L(l(o + t % s, 0))), k = K(t / s);
                  u.push(L(l(k, 0))), g = m(c, r, d == e), c = 0, ++d
                }++c, ++b
            }
            return u.join("")
          }

          function p(a) {
            return h(a, function(a) {
              return F.test(a) ? n(a.slice(4).toLowerCase()) : a
            })
          }

          function q(a) {
            return h(a, function(a) {
              return G.test(a) ? "xn--" + o(a) : a
            })
          }
          var r = "object" == typeof d && d && !d.nodeType && d,
            s = "object" == typeof c && c && !c.nodeType && c,
            t = "object" == typeof b && b;
          t.global !== t && t.window !== t && t.self !== t || (e = t);
          var u, v, w = 2147483647,
            x = 36,
            y = 1,
            z = 26,
            A = 38,
            B = 700,
            C = 72,
            D = 128,
            E = "-",
            F = /^xn--/,
            G = /[^\x20-\x7E]/,
            H = /[\x2E\u3002\uFF0E\uFF61]/g,
            I = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input"
            },
            J = x - y,
            K = Math.floor,
            L = String.fromCharCode;
          if (u = {
              version: "1.4.1",
              ucs2: {
                decode: i,
                encode: j
              },
              decode: n,
              encode: o,
              toASCII: q,
              toUnicode: p
            }, "function" == typeof a && "object" == typeof a.amd && a.amd) a("punycode", function() {
            return u
          });
          else if (r && s)
            if (c.exports == r) s.exports = u;
            else
              for (v in u) u.hasOwnProperty(v) && (r[v] = u[v]);
          else e.punycode = u
        }(this)
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    25: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
      }
      b.exports = function(a, b, c, f) {
        b = b || "&", c = c || "=";
        var g = {};
        if ("string" != typeof a || 0 === a.length) return g;
        var h = /\+/g;
        a = a.split(b);
        var i = 1e3;
        f && "number" == typeof f.maxKeys && (i = f.maxKeys);
        var j = a.length;
        i > 0 && j > i && (j = i);
        for (var k = 0; k < j; ++k) {
          var l, m, n, o, p = a[k].replace(h, "%20"),
            q = p.indexOf(c);
          q >= 0 ? (l = p.substr(0, q), m = p.substr(q + 1)) : (l = p, m = ""), n = decodeURIComponent(l), o = decodeURIComponent(m), d(g, n) ? e(g[n]) ? g[n].push(o) : g[n] = [g[n], o] : g[n] = o
        }
        return g
      };
      var e = Array.isArray || function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
      }
    }, {}],
    26: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (a.map) return a.map(b);
        for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d], d));
        return c
      }
      var e = function(a) {
        switch (typeof a) {
          case "string":
            return a;
          case "boolean":
            return a ? "true" : "false";
          case "number":
            return isFinite(a) ? a : "";
          default:
            return ""
        }
      };
      b.exports = function(a, b, c, h) {
        return b = b || "&", c = c || "=", null === a && (a = void 0), "object" == typeof a ? d(g(a), function(g) {
          var h = encodeURIComponent(e(g)) + c;
          return f(a[g]) ? d(a[g], function(a) {
            return h + encodeURIComponent(e(a))
          }).join(b) : h + encodeURIComponent(e(a[g]))
        }).join(b) : h ? encodeURIComponent(e(h)) + c + encodeURIComponent(e(a)) : ""
      };
      var f = Array.isArray || function(a) {
          return "[object Array]" === Object.prototype.toString.call(a)
        },
        g = Object.keys || function(a) {
          var b = [];
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
          return b
        }
    }, {}],
    27: [function(a, b, c) {
      "use strict";
      c.decode = c.parse = a("./decode"), c.encode = c.stringify = a("./encode")
    }, {
      "./decode": 25,
      "./encode": 26
    }],
    28: [function(a, b, c) {
      "use strict";

      function d() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
      }

      function e(a, b, c) {
        if (a && j.isObject(a) && a instanceof d) return a;
        var e = new d;
        return e.parse(a, b, c), e
      }

      function f(a) {
        return j.isString(a) && (a = e(a)), a instanceof d ? a.format() : d.prototype.format.call(a)
      }

      function g(a, b) {
        return e(a, !1, !0).resolve(b)
      }

      function h(a, b) {
        return a ? e(a, !1, !0).resolveObject(b) : b
      }
      var i = a("punycode"),
        j = a("./util");
      c.parse = e, c.resolve = g, c.resolveObject = h, c.format = f, c.Url = d;
      var k = /^([a-z0-9.+-]+:)/i,
        l = /:[0-9]*$/,
        m = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        n = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
        o = ["{", "}", "|", "\\", "^", "`"].concat(n),
        p = ["'"].concat(o),
        q = ["%", "/", "?", ";", "#"].concat(p),
        r = ["/", "?", "#"],
        s = 255,
        t = /^[+a-z0-9A-Z_-]{0,63}$/,
        u = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        v = {
          javascript: !0,
          "javascript:": !0
        },
        w = {
          javascript: !0,
          "javascript:": !0
        },
        x = {
          http: !0,
          https: !0,
          ftp: !0,
          gopher: !0,
          file: !0,
          "http:": !0,
          "https:": !0,
          "ftp:": !0,
          "gopher:": !0,
          "file:": !0
        },
        y = a("querystring");
      d.prototype.parse = function(a, b, c) {
        if (!j.isString(a)) throw new TypeError("Parameter 'url' must be a string, not " + typeof a);
        var d = a.indexOf("?"),
          e = d !== -1 && d < a.indexOf("#") ? "?" : "#",
          f = a.split(e),
          g = /\\/g;
        f[0] = f[0].replace(g, "/"), a = f.join(e);
        var h = a;
        if (h = h.trim(), !c && 1 === a.split("#").length) {
          var l = m.exec(h);
          if (l) return this.path = h, this.href = h, this.pathname = l[1], l[2] ? (this.search = l[2], b ? this.query = y.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : b && (this.search = "", this.query = {}), this
        }
        var n = k.exec(h);
        if (n) {
          n = n[0];
          var o = n.toLowerCase();
          this.protocol = o, h = h.substr(n.length)
        }
        if (c || n || h.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var z = "//" === h.substr(0, 2);
          !z || n && w[n] || (h = h.substr(2), this.slashes = !0)
        }
        if (!w[n] && (z || n && !x[n])) {
          for (var A = -1, B = 0; B < r.length; B++) {
            var C = h.indexOf(r[B]);
            C !== -1 && (A === -1 || C < A) && (A = C)
          }
          var D, E;
          E = A === -1 ? h.lastIndexOf("@") : h.lastIndexOf("@", A), E !== -1 && (D = h.slice(0, E), h = h.slice(E + 1), this.auth = decodeURIComponent(D)), A = -1;
          for (var B = 0; B < q.length; B++) {
            var C = h.indexOf(q[B]);
            C !== -1 && (A === -1 || C < A) && (A = C)
          }
          A === -1 && (A = h.length), this.host = h.slice(0, A), h = h.slice(A), this.parseHost(), this.hostname = this.hostname || "";
          var F = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
          if (!F)
            for (var G = this.hostname.split(/\./), B = 0, H = G.length; B < H; B++) {
              var I = G[B];
              if (I && !I.match(t)) {
                for (var J = "", K = 0, L = I.length; K < L; K++) J += I.charCodeAt(K) > 127 ? "x" : I[K];
                if (!J.match(t)) {
                  var M = G.slice(0, B),
                    N = G.slice(B + 1),
                    O = I.match(u);
                  O && (M.push(O[1]), N.unshift(O[2])), N.length && (h = "/" + N.join(".") + h), this.hostname = M.join(".");
                  break
                }
              }
            }
          this.hostname.length > s ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), F || (this.hostname = i.toASCII(this.hostname));
          var P = this.port ? ":" + this.port : "",
            Q = this.hostname || "";
          this.host = Q + P, this.href += this.host, F && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== h[0] && (h = "/" + h))
        }
        if (!v[o])
          for (var B = 0, H = p.length; B < H; B++) {
            var R = p[B];
            if (h.indexOf(R) !== -1) {
              var S = encodeURIComponent(R);
              S === R && (S = escape(R)), h = h.split(R).join(S)
            }
          }
        var T = h.indexOf("#");
        T !== -1 && (this.hash = h.substr(T), h = h.slice(0, T));
        var U = h.indexOf("?");
        if (U !== -1 ? (this.search = h.substr(U), this.query = h.substr(U + 1), b && (this.query = y.parse(this.query)), h = h.slice(0, U)) : b && (this.search = "", this.query = {}), h && (this.pathname = h), x[o] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
          var P = this.pathname || "",
            V = this.search || "";
          this.path = P + V
        }
        return this.href = this.format(), this
      }, d.prototype.format = function() {
        var a = this.auth || "";
        a && (a = encodeURIComponent(a), a = a.replace(/%3A/i, ":"), a += "@");
        var b = this.protocol || "",
          c = this.pathname || "",
          d = this.hash || "",
          e = !1,
          f = "";
        this.host ? e = a + this.host : this.hostname && (e = a + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (e += ":" + this.port)), this.query && j.isObject(this.query) && Object.keys(this.query).length && (f = y.stringify(this.query));
        var g = this.search || f && "?" + f || "";
        return b && ":" !== b.substr(-1) && (b += ":"), this.slashes || (!b || x[b]) && e !== !1 ? (e = "//" + (e || ""), c && "/" !== c.charAt(0) && (c = "/" + c)) : e || (e = ""), d && "#" !== d.charAt(0) && (d = "#" + d), g && "?" !== g.charAt(0) && (g = "?" + g), c = c.replace(/[?#]/g, function(a) {
          return encodeURIComponent(a)
        }), g = g.replace("#", "%23"), b + e + c + g + d
      }, d.prototype.resolve = function(a) {
        return this.resolveObject(e(a, !1, !0)).format()
      }, d.prototype.resolveObject = function(a) {
        if (j.isString(a)) {
          var b = new d;
          b.parse(a, !1, !0), a = b
        }
        for (var c = new d, e = Object.keys(this), f = 0; f < e.length; f++) {
          var g = e[f];
          c[g] = this[g]
        }
        if (c.hash = a.hash, "" === a.href) return c.href = c.format(), c;
        if (a.slashes && !a.protocol) {
          for (var h = Object.keys(a), i = 0; i < h.length; i++) {
            var k = h[i];
            "protocol" !== k && (c[k] = a[k])
          }
          return x[c.protocol] && c.hostname && !c.pathname && (c.path = c.pathname = "/"), c.href = c.format(), c
        }
        if (a.protocol && a.protocol !== c.protocol) {
          if (!x[a.protocol]) {
            for (var l = Object.keys(a), m = 0; m < l.length; m++) {
              var n = l[m];
              c[n] = a[n]
            }
            return c.href = c.format(), c
          }
          if (c.protocol = a.protocol, a.host || w[a.protocol]) c.pathname = a.pathname;
          else {
            for (var o = (a.pathname || "").split("/"); o.length && !(a.host = o.shift()););
            a.host || (a.host = ""), a.hostname || (a.hostname = ""), "" !== o[0] && o.unshift(""), o.length < 2 && o.unshift(""), c.pathname = o.join("/")
          }
          if (c.search = a.search, c.query = a.query, c.host = a.host || "", c.auth = a.auth, c.hostname = a.hostname || a.host, c.port = a.port, c.pathname || c.search) {
            var p = c.pathname || "",
              q = c.search || "";
            c.path = p + q
          }
          return c.slashes = c.slashes || a.slashes, c.href = c.format(), c
        }
        var r = c.pathname && "/" === c.pathname.charAt(0),
          s = a.host || a.pathname && "/" === a.pathname.charAt(0),
          t = s || r || c.host && a.pathname,
          u = t,
          v = c.pathname && c.pathname.split("/") || [],
          o = a.pathname && a.pathname.split("/") || [],
          y = c.protocol && !x[c.protocol];
        if (y && (c.hostname = "", c.port = null, c.host && ("" === v[0] ? v[0] = c.host : v.unshift(c.host)), c.host = "", a.protocol && (a.hostname = null, a.port = null, a.host && ("" === o[0] ? o[0] = a.host : o.unshift(a.host)), a.host = null), t = t && ("" === o[0] || "" === v[0])), s) c.host = a.host || "" === a.host ? a.host : c.host, c.hostname = a.hostname || "" === a.hostname ? a.hostname : c.hostname, c.search = a.search, c.query = a.query, v = o;
        else if (o.length) v || (v = []), v.pop(), v = v.concat(o), c.search = a.search, c.query = a.query;
        else if (!j.isNullOrUndefined(a.search)) {
          if (y) {
            c.hostname = c.host = v.shift();
            var z = !!(c.host && c.host.indexOf("@") > 0) && c.host.split("@");
            z && (c.auth = z.shift(), c.host = c.hostname = z.shift())
          }
          return c.search = a.search, c.query = a.query, j.isNull(c.pathname) && j.isNull(c.search) || (c.path = (c.pathname ? c.pathname : "") + (c.search ? c.search : "")), c.href = c.format(), c
        }
        if (!v.length) return c.pathname = null, c.search ? c.path = "/" + c.search : c.path = null, c.href = c.format(), c;
        for (var A = v.slice(-1)[0], B = (c.host || a.host || v.length > 1) && ("." === A || ".." === A) || "" === A, C = 0, D = v.length; D >= 0; D--) A = v[D], "." === A ? v.splice(D, 1) : ".." === A ? (v.splice(D, 1), C++) : C && (v.splice(D, 1), C--);
        if (!t && !u)
          for (; C--; C) v.unshift("..");
        !t || "" === v[0] || v[0] && "/" === v[0].charAt(0) || v.unshift(""), B && "/" !== v.join("/").substr(-1) && v.push("");
        var E = "" === v[0] || v[0] && "/" === v[0].charAt(0);
        if (y) {
          c.hostname = c.host = E ? "" : v.length ? v.shift() : "";
          var z = !!(c.host && c.host.indexOf("@") > 0) && c.host.split("@");
          z && (c.auth = z.shift(), c.host = c.hostname = z.shift())
        }
        return t = t || c.host && v.length, t && !E && v.unshift(""), v.length ? c.pathname = v.join("/") : (c.pathname = null, c.path = null), j.isNull(c.pathname) && j.isNull(c.search) || (c.path = (c.pathname ? c.pathname : "") + (c.search ? c.search : "")), c.auth = a.auth || c.auth, c.slashes = c.slashes || a.slashes, c.href = c.format(), c
      }, d.prototype.parseHost = function() {
        var a = this.host,
          b = l.exec(a);
        b && (b = b[0], ":" !== b && (this.port = b.substr(1)), a = a.substr(0, a.length - b.length)), a && (this.hostname = a)
      }
    }, {
      "./util": 29,
      punycode: 24,
      querystring: 27
    }],
    29: [function(a, b, c) {
      "use strict";
      b.exports = {
        isString: function(a) {
          return "string" == typeof a
        },
        isObject: function(a) {
          return "object" == typeof a && null !== a
        },
        isNull: function(a) {
          return null === a
        },
        isNullOrUndefined: function(a) {
          return null == a
        }
      }
    }, {}],
    30: [function(a, b, c) {
      arguments[4][3][0].apply(c, arguments)
    }, {
      dup: 3
    }],
    31: [function(a, b, c) {
      "use strict";
      b.exports = function(a, b) {
        b = b || {};
        for (var c = {
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {
              name: "queryKey",
              parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
              strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
              loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
          }, d = c.parser[b.strictMode ? "strict" : "loose"].exec(a), e = {}, f = 14; f--;) e[c.key[f]] = d[f] || "";
        return e[c.q.name] = {}, e[c.key[12]].replace(c.q.parser, function(a, b, d) {
          b && (e[c.q.name][b] = d)
        }), e
      }
    }, {}],
    32: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        h.call(this), b = b || i, this.baseUrl = a || "", this.progress = 0, this.loading = !1, this._progressChunk = 0, this._beforeMiddleware = [], this._afterMiddleware = [], this._boundLoadResource = this._loadResource.bind(this), this._buffer = [], this._numToLoad = 0, this._queue = f.queue(this._boundLoadResource, b), this.resources = {}
      }
      var e = a("parse-uri"),
        f = a("./async"),
        g = a("./Resource"),
        h = a("eventemitter3"),
        i = 10,
        j = 100;
      d.prototype = Object.create(h.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.add = d.prototype.enqueue = function(a, b, c, d) {
        if (Array.isArray(a)) {
          for (var e = 0; e < a.length; ++e) this.add(a[e]);
          return this
        }
        if ("object" == typeof a && (d = b || a.callback || a.onComplete, c = a, b = a.url, a = a.name || a.key || a.url), "string" != typeof b && (d = c, c = b, b = a), "string" != typeof b) throw new Error("No url passed to add resource to loader.");
        if ("function" == typeof c && (d = c, c = null), this.resources[a]) throw new Error('Resource with name "' + a + '" already exists.');
        return b = this._prepareUrl(b), this.resources[a] = new g(a, b, c), "function" == typeof d && this.resources[a].once("afterMiddleware", d), this._numToLoad++, this._queue.started ? (this._queue.push(this.resources[a]), this._progressChunk = (j - this.progress) / (this._queue.length() + this._queue.running())) : (this._buffer.push(this.resources[a]), this._progressChunk = j / this._buffer.length), this
      }, d.prototype.before = d.prototype.pre = function(a) {
        return this._beforeMiddleware.push(a), this
      }, d.prototype.after = d.prototype.use = function(a) {
        return this._afterMiddleware.push(a), this
      }, d.prototype.reset = function() {
        this.progress = 0, this.loading = !1, this._progressChunk = 0, this._buffer.length = 0, this._numToLoad = 0, this._queue.kill(), this._queue.started = !1;
        for (var a in this.resources) {
          var b = this.resources[a];
          b.off("complete", this._onLoad, this), b.isLoading && b.abort()
        }
        return this.resources = {}, this
      }, d.prototype.load = function(a) {
        if ("function" == typeof a && this.once("complete", a), this._queue.started) return this;
        this.emit("start", this), this.loading = !0;
        for (var b = 0; b < this._buffer.length; ++b) this._queue.push(this._buffer[b]);
        return this._buffer.length = 0, this
      }, d.prototype._prepareUrl = function(a) {
        var b = e(a, {
          strictMode: !0
        });
        return b.protocol || !b.path || 0 === b.path.indexOf("//") ? a : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== a.charAt(0) ? this.baseUrl + "/" + a : this.baseUrl + a
      }, d.prototype._loadResource = function(a, b) {
        var c = this;
        a._dequeue = b, f.eachSeries(this._beforeMiddleware, function(b, d) {
          b.call(c, a, function() {
            d(a.isComplete ? {} : null)
          })
        }, function() {
          a.isComplete ? c._onLoad(a) : (a.once("complete", c._onLoad, c), a.load())
        })
      }, d.prototype._onComplete = function() {
        this.loading = !1, this.emit("complete", this, this.resources)
      }, d.prototype._onLoad = function(a) {
        var b = this;
        f.eachSeries(this._afterMiddleware, function(c, d) {
          c.call(b, a, d)
        }, function() {
          a.emit("afterMiddleware", a), b._numToLoad--, b.progress += b._progressChunk, b.emit("progress", b, a), a.error ? b.emit("error", a.error, b, a) : b.emit("load", b, a), 0 === b._numToLoad && (b.progress = 100, b._onComplete())
        }), a._dequeue()
      }, d.LOAD_TYPE = g.LOAD_TYPE, d.XHR_RESPONSE_TYPE = g.XHR_RESPONSE_TYPE
    }, {
      "./Resource": 33,
      "./async": 34,
      eventemitter3: 30,
      "parse-uri": 31
    }],
    33: [function(a, b, c) {
      "use strict";

      function d(a, b, c) {
        if (g.call(this), c = c || {}, "string" != typeof a || "string" != typeof b) throw new Error("Both name and url are required for constructing a resource.");
        this.name = a, this.url = b, this.isDataUrl = 0 === this.url.indexOf("data:"), this.data = null, this.crossOrigin = c.crossOrigin === !0 ? "anonymous" : c.crossOrigin, this.loadType = c.loadType || this._determineLoadType(), this.xhrType = c.xhrType, this.metadata = c.metadata || {}, this.error = null, this.xhr = null, this.isJson = !1, this.isXml = !1, this.isImage = !1, this.isAudio = !1, this.isVideo = !1, this.isComplete = !1, this.isLoading = !1, this._dequeue = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this)
      }

      function e(a) {
        return a.toString().replace("object ", "")
      }

      function f(a, b, c) {
        b && 0 === b.indexOf(".") && (b = b.substring(1)), b && (a[b] = c)
      }
      var g = a("eventemitter3"),
        h = a("parse-uri"),
        i = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest),
        j = null,
        k = 0,
        l = 200,
        m = 204;
      d.prototype = Object.create(g.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.complete = function() {
        if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.isComplete) throw new Error("Complete called again for an already completed resource.");
        this.isComplete = !0, this.isLoading = !1, this.emit("complete", this)
      }, d.prototype.abort = function(a) {
        if (!this.error) {
          if (this.error = new Error(a), this.xhr) this.xhr.abort();
          else if (this.xdr) this.xdr.abort();
          else if (this.data)
            if ("undefined" != typeof this.data.src) this.data.src = "";
            else
              for (; this.data.firstChild;) this.data.removeChild(this.data.firstChild);
          this.complete()
        }
      }, d.prototype.load = function(a) {
        if (!this.isLoading)
          if (this.isComplete) {
            if (a) {
              var b = this;
              setTimeout(function() {
                a(b)
              }, 1)
            }
          } else switch (a && this.once("complete", a), this.isLoading = !0, this.emit("start", this), this.crossOrigin !== !1 && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
            case d.LOAD_TYPE.IMAGE:
              this._loadElement("image");
              break;
            case d.LOAD_TYPE.AUDIO:
              this._loadSourceElement("audio");
              break;
            case d.LOAD_TYPE.VIDEO:
              this._loadSourceElement("video");
              break;
            case d.LOAD_TYPE.XHR:
            default:
              i && this.crossOrigin ? this._loadXdr() : this._loadXhr()
          }
      }, d.prototype._loadElement = function(a) {
        this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === a && "undefined" != typeof window.Image ? this.data = new Image : this.data = document.createElement(a), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url);
        var b = "is" + a[0].toUpperCase() + a.substring(1);
        this[b] === !1 && (this[b] = !0), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1)
      }, d.prototype._loadSourceElement = function(a) {
        if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === a && "undefined" != typeof window.Audio ? this.data = new Audio : this.data = document.createElement(a), null === this.data) return void this.abort("Unsupported element " + a);
        if (!this.metadata.skipSource)
          if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
          else if (Array.isArray(this.url))
          for (var b = 0; b < this.url.length; ++b) this.data.appendChild(this._createSource(a, this.url[b]));
        else this.data.appendChild(this._createSource(a, this.url));
        this["is" + a[0].toUpperCase() + a.substring(1)] = !0, this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load()
      }, d.prototype._loadXhr = function() {
        "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
        var a = this.xhr = new XMLHttpRequest;
        a.open("GET", this.url, !0), this.xhrType === d.XHR_RESPONSE_TYPE.JSON || this.xhrType === d.XHR_RESPONSE_TYPE.DOCUMENT ? a.responseType = d.XHR_RESPONSE_TYPE.TEXT : a.responseType = this.xhrType, a.addEventListener("error", this._boundXhrOnError, !1), a.addEventListener("abort", this._boundXhrOnAbort, !1), a.addEventListener("progress", this._boundOnProgress, !1), a.addEventListener("load", this._boundXhrOnLoad, !1), a.send()
      }, d.prototype._loadXdr = function() {
        "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
        var a = this.xhr = new XDomainRequest;
        a.timeout = 5e3, a.onerror = this._boundXhrOnError, a.ontimeout = this._boundXdrOnTimeout, a.onprogress = this._boundOnProgress, a.onload = this._boundXhrOnLoad, a.open("GET", this.url, !0), setTimeout(function() {
          a.send()
        }, 0)
      }, d.prototype._createSource = function(a, b, c) {
        c || (c = a + "/" + b.substr(b.lastIndexOf(".") + 1));
        var d = document.createElement("source");
        return d.src = b, d.type = c, d
      }, d.prototype._onError = function(a) {
        this.abort("Failed to load element using " + a.target.nodeName)
      }, d.prototype._onProgress = function(a) {
        a && a.lengthComputable && this.emit("progress", this, a.loaded / a.total)
      }, d.prototype._xhrOnError = function() {
        var a = this.xhr;
        this.abort(e(a) + " Request failed. Status: " + a.status + ', text: "' + a.statusText + '"')
      }, d.prototype._xhrOnAbort = function() {
        this.abort(e(this.xhr) + " Request was aborted by the user.")
      }, d.prototype._xdrOnTimeout = function() {
        this.abort(e(this.xhr) + " Request timed out.")
      }, d.prototype._xhrOnLoad = function() {
        var a = this.xhr,
          b = "undefined" == typeof a.status ? a.status : l;
        if (!(b === l || b === m || b === k && a.responseText.length > 0)) return void this.abort("[" + a.status + "]" + a.statusText + ":" + a.responseURL);
        if (this.xhrType === d.XHR_RESPONSE_TYPE.TEXT) this.data = a.responseText;
        else if (this.xhrType === d.XHR_RESPONSE_TYPE.JSON) try {
          this.data = JSON.parse(a.responseText), this.isJson = !0
        } catch (a) {
          return void this.abort("Error trying to parse loaded json:", a)
        } else if (this.xhrType === d.XHR_RESPONSE_TYPE.DOCUMENT) try {
          if (window.DOMParser) {
            var c = new DOMParser;
            this.data = c.parseFromString(a.responseText, "text/xml")
          } else {
            var e = document.createElement("div");
            e.innerHTML = a.responseText, this.data = e
          }
          this.isXml = !0
        } catch (a) {
          return void this.abort("Error trying to parse loaded xml:", a)
        } else this.data = a.response || a.responseText;
        this.complete()
      }, d.prototype._determineCrossOrigin = function(a, b) {
        if (0 === a.indexOf("data:")) return "";
        b = b || window.location, j || (j = document.createElement("a")), j.href = a, a = h(j.href, {
          strictMode: !0
        });
        var c = !a.port && "" === b.port || a.port === b.port,
          d = a.protocol ? a.protocol + ":" : "";
        return a.host === b.hostname && c && d === b.protocol ? "" : "anonymous"
      }, d.prototype._determineXhrType = function() {
        return d._xhrTypeMap[this._getExtension()] || d.XHR_RESPONSE_TYPE.TEXT
      }, d.prototype._determineLoadType = function() {
        return d._loadTypeMap[this._getExtension()] || d.LOAD_TYPE.XHR
      }, d.prototype._getExtension = function() {
        var a = this.url,
          b = "";
        if (this.isDataUrl) {
          var c = a.indexOf("/");
          b = a.substring(c + 1, a.indexOf(";", c))
        } else {
          var d = a.indexOf("?");
          d !== -1 && (a = a.substring(0, d)), b = a.substring(a.lastIndexOf(".") + 1)
        }
        return b.toLowerCase()
      }, d.prototype._getMimeFromXhrType = function(a) {
        switch (a) {
          case d.XHR_RESPONSE_TYPE.BUFFER:
            return "application/octet-binary";
          case d.XHR_RESPONSE_TYPE.BLOB:
            return "application/blob";
          case d.XHR_RESPONSE_TYPE.DOCUMENT:
            return "application/xml";
          case d.XHR_RESPONSE_TYPE.JSON:
            return "application/json";
          case d.XHR_RESPONSE_TYPE.DEFAULT:
          case d.XHR_RESPONSE_TYPE.TEXT:
          default:
            return "text/plain"
        }
      }, d.LOAD_TYPE = {
        XHR: 1,
        IMAGE: 2,
        AUDIO: 3,
        VIDEO: 4
      }, d.XHR_RESPONSE_TYPE = {
        DEFAULT: "text",
        BUFFER: "arraybuffer",
        BLOB: "blob",
        DOCUMENT: "document",
        JSON: "json",
        TEXT: "text"
      }, d._loadTypeMap = {
        gif: d.LOAD_TYPE.IMAGE,
        png: d.LOAD_TYPE.IMAGE,
        bmp: d.LOAD_TYPE.IMAGE,
        jpg: d.LOAD_TYPE.IMAGE,
        jpeg: d.LOAD_TYPE.IMAGE,
        tif: d.LOAD_TYPE.IMAGE,
        tiff: d.LOAD_TYPE.IMAGE,
        webp: d.LOAD_TYPE.IMAGE,
        tga: d.LOAD_TYPE.IMAGE,
        "svg+xml": d.LOAD_TYPE.IMAGE
      }, d._xhrTypeMap = {
        xhtml: d.XHR_RESPONSE_TYPE.DOCUMENT,
        html: d.XHR_RESPONSE_TYPE.DOCUMENT,
        htm: d.XHR_RESPONSE_TYPE.DOCUMENT,
        xml: d.XHR_RESPONSE_TYPE.DOCUMENT,
        tmx: d.XHR_RESPONSE_TYPE.DOCUMENT,
        tsx: d.XHR_RESPONSE_TYPE.DOCUMENT,
        svg: d.XHR_RESPONSE_TYPE.DOCUMENT,
        gif: d.XHR_RESPONSE_TYPE.BLOB,
        png: d.XHR_RESPONSE_TYPE.BLOB,
        bmp: d.XHR_RESPONSE_TYPE.BLOB,
        jpg: d.XHR_RESPONSE_TYPE.BLOB,
        jpeg: d.XHR_RESPONSE_TYPE.BLOB,
        tif: d.XHR_RESPONSE_TYPE.BLOB,
        tiff: d.XHR_RESPONSE_TYPE.BLOB,
        webp: d.XHR_RESPONSE_TYPE.BLOB,
        tga: d.XHR_RESPONSE_TYPE.BLOB,
        json: d.XHR_RESPONSE_TYPE.JSON,
        text: d.XHR_RESPONSE_TYPE.TEXT,
        txt: d.XHR_RESPONSE_TYPE.TEXT
      }, d.setExtensionLoadType = function(a, b) {
        f(d._loadTypeMap, a, b)
      }, d.setExtensionXhrType = function(a, b) {
        f(d._xhrTypeMap, a, b)
      }
    }, {
      eventemitter3: 30,
      "parse-uri": 31
    }],
    34: [function(a, b, c) {
      "use strict";

      function d() {}

      function e(a, b, c) {
        var d = 0,
          e = a.length;
        ! function f(g) {
          return g || d === e ? void(c && c(g)) : void b(a[d++], f)
        }()
      }

      function f(a) {
        return function() {
          if (null === a) throw new Error("Callback was already called.");
          var b = a;
          a = null, b.apply(this, arguments)
        }
      }

      function g(a, b) {
        function c(a, b, c) {
          if (null != c && "function" != typeof c) throw new Error("task callback must be a function");
          if (h.started = !0, null == a && h.idle()) return void setTimeout(function() {
            h.drain()
          }, 1);
          var e = {
            data: a,
            callback: "function" == typeof c ? c : d
          };
          b ? h._tasks.unshift(e) : h._tasks.push(e), setTimeout(function() {
            h.process()
          }, 1)
        }

        function e(a) {
          return function() {
            g -= 1, a.callback.apply(a, arguments), null != arguments[0] && h.error(arguments[0], a.data), g <= h.concurrency - h.buffer && h.unsaturated(), h.idle() && h.drain(), h.process()
          }
        }
        if (null == b) b = 1;
        else if (0 === b) throw new Error("Concurrency must not be zero");
        var g = 0,
          h = {
            _tasks: [],
            concurrency: b,
            saturated: d,
            unsaturated: d,
            buffer: b / 4,
            empty: d,
            drain: d,
            error: d,
            started: !1,
            paused: !1,
            push: function(a, b) {
              c(a, !1, b)
            },
            kill: function() {
              h.drain = d, h._tasks = []
            },
            unshift: function(a, b) {
              c(a, !0, b)
            },
            process: function() {
              for (; !h.paused && g < h.concurrency && h._tasks.length;) {
                var b = h._tasks.shift();
                0 === h._tasks.length && h.empty(), g += 1, g === h.concurrency && h.saturated(), a(b.data, f(e(b)))
              }
            },
            length: function() {
              return h._tasks.length
            },
            running: function() {
              return g
            },
            idle: function() {
              return h._tasks.length + g === 0
            },
            pause: function() {
              h.paused !== !0 && (h.paused = !0)
            },
            resume: function() {
              if (h.paused !== !1) {
                h.paused = !1;
                for (var a = 1; a <= h.concurrency; a++) h.process()
              }
            }
          };
        return h
      }
      b.exports = {
        eachSeries: e,
        queue: g
      }
    }, {}],
    35: [function(a, b, c) {
      "use strict";
      b.exports = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encodeBinary: function(a) {
          for (var b, c = "", d = new Array(4), e = 0, f = 0, g = 0; e < a.length;) {
            for (b = new Array(3), f = 0; f < b.length; f++) e < a.length ? b[f] = 255 & a.charCodeAt(e++) : b[f] = 0;
            switch (d[0] = b[0] >> 2, d[1] = (3 & b[0]) << 4 | b[1] >> 4, d[2] = (15 & b[1]) << 2 | b[2] >> 6, d[3] = 63 & b[2], g = e - (a.length - 1)) {
              case 2:
                d[3] = 64, d[2] = 64;
                break;
              case 1:
                d[3] = 64
            }
            for (f = 0; f < d.length; f++) c += this._keyStr.charAt(d[f])
          }
          return c
        }
      }
    }, {}],
    36: [function(a, b, c) {
      "use strict";
      b.exports = a("./Loader"), b.exports.Resource = a("./Resource"), b.exports.middleware = {
        caching: {
          memory: a("./middlewares/caching/memory")
        },
        parsing: {
          blob: a("./middlewares/parsing/blob")
        }
      }, b.exports.async = a("./async")
    }, {
      "./Loader": 32,
      "./Resource": 33,
      "./async": 34,
      "./middlewares/caching/memory": 37,
      "./middlewares/parsing/blob": 38
    }],
    37: [function(a, b, c) {
      "use strict";
      var d = {};
      b.exports = function() {
        return function(a, b) {
          d[a.url] ? (a.data = d[a.url], a.complete()) : a.once("complete", function() {
            d[this.url] = this.data
          }), b()
        }
      }
    }, {}],
    38: [function(a, b, c) {
      "use strict";
      var d = a("../../Resource"),
        e = a("../../b64"),
        f = window.URL || window.webkitURL;
      b.exports = function() {
        return function(a, b) {
          if (!a.data) return void b();
          if (a.xhr && a.xhrType === d.XHR_RESPONSE_TYPE.BLOB)
            if (window.Blob && "string" != typeof a.data) {
              if (0 === a.data.type.indexOf("image")) {
                var c = f.createObjectURL(a.data);
                return a.blob = a.data, a.data = new Image, a.data.src = c, a.isImage = !0, void(a.data.onload = function() {
                  f.revokeObjectURL(c), a.data.onload = null, b()
                })
              }
            } else {
              var g = a.xhr.getResponseHeader("content-type");
              if (g && 0 === g.indexOf("image")) return a.data = new Image, a.data.src = "data:" + g + ";base64," + e.encodeBinary(a.xhr.responseText), a.isImage = !0, void(a.data.onload = function() {
                a.data.onload = null, b()
              })
            }
          b()
        }
      }
    }, {
      "../../Resource": 33,
      "../../b64": 35
    }],
    39: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var g = a("../core"),
        h = e(g),
        i = a("ismobilejs"),
        j = d(i),
        k = a("./accessibleTarget"),
        l = d(k);
      Object.assign(h.DisplayObject.prototype, l.default);
      var m = 9,
        n = 100,
        o = 0,
        p = 0,
        q = 2,
        r = 1,
        s = -1e3,
        t = -1e3,
        u = 2,
        v = function() {
          function a(b) {
            f(this, a), !j.default.tablet && !j.default.phone || navigator.isCocoonJS || this.createTouchHook();
            var c = document.createElement("div");
            c.style.width = n + "px", c.style.height = n + "px", c.style.position = "absolute", c.style.top = o + "px", c.style.left = p + "px", c.style.zIndex = q, this.div = c, this.pool = [], this.renderId = 0, this.debug = !1, this.renderer = b, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, this.isMobileAccessabillity = !1, window.addEventListener("keydown", this._onKeyDown, !1)
          }
          return a.prototype.createTouchHook = function() {
            var a = this,
              b = document.createElement("button");
            b.style.width = r + "px", b.style.height = r + "px", b.style.position = "absolute", b.style.top = s + "px", b.style.left = t + "px", b.style.zIndex = u, b.style.backgroundColor = "#FF0000", b.title = "HOOK DIV", b.addEventListener("focus", function() {
              a.isMobileAccessabillity = !0, a.activate(), document.body.removeChild(b)
            }), document.body.appendChild(b)
          }, a.prototype.activate = function() {
            this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div))
          }, a.prototype.deactivate = function() {
            this.isActive && !this.isMobileAccessabillity && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode && this.div.parentNode.removeChild(this.div))
          }, a.prototype.updateAccessibleObjects = function(a) {
            if (a.visible) {
              a.accessible && a.interactive && (a._accessibleActive || this.addChild(a), a.renderId = this.renderId);
              for (var b = a.children, c = b.length - 1; c >= 0; c--) this.updateAccessibleObjects(b[c])
            }
          }, a.prototype.update = function() {
            if (this.renderer.renderingToScreen) {
              this.updateAccessibleObjects(this.renderer._lastObjectRendered);
              var a = this.renderer.view.getBoundingClientRect(),
                b = a.width / this.renderer.width,
                c = a.height / this.renderer.height,
                d = this.div;
              d.style.left = a.left + "px", d.style.top = a.top + "px", d.style.width = this.renderer.width + "px",
                d.style.height = this.renderer.height + "px";
              for (var e = 0; e < this.children.length; e++) {
                var f = this.children[e];
                if (f.renderId !== this.renderId) f._accessibleActive = !1, h.utils.removeItems(this.children, e, 1), this.div.removeChild(f._accessibleDiv), this.pool.push(f._accessibleDiv), f._accessibleDiv = null, e--, 0 === this.children.length && this.deactivate();
                else {
                  d = f._accessibleDiv;
                  var g = f.hitArea,
                    i = f.worldTransform;
                  f.hitArea ? (d.style.left = (i.tx + g.x * i.a) * b + "px", d.style.top = (i.ty + g.y * i.d) * c + "px", d.style.width = g.width * i.a * b + "px", d.style.height = g.height * i.d * c + "px") : (g = f.getBounds(), this.capHitArea(g), d.style.left = g.x * b + "px", d.style.top = g.y * c + "px", d.style.width = g.width * b + "px", d.style.height = g.height * c + "px")
                }
              }
              this.renderId++
            }
          }, a.prototype.capHitArea = function(a) {
            a.x < 0 && (a.width += a.x, a.x = 0), a.y < 0 && (a.height += a.y, a.y = 0), a.x + a.width > this.renderer.width && (a.width = this.renderer.width - a.x), a.y + a.height > this.renderer.height && (a.height = this.renderer.height - a.y)
          }, a.prototype.addChild = function(a) {
            var b = this.pool.pop();
            b || (b = document.createElement("button"), b.style.width = n + "px", b.style.height = n + "px", b.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", b.style.position = "absolute", b.style.zIndex = q, b.style.borderStyle = "none", b.addEventListener("click", this._onClick.bind(this)), b.addEventListener("focus", this._onFocus.bind(this)), b.addEventListener("focusout", this._onFocusOut.bind(this))), a.accessibleTitle ? b.title = a.accessibleTitle : a.accessibleTitle || a.accessibleHint || (b.title = "displayObject " + this.tabIndex), a.accessibleHint && b.setAttribute("aria-label", a.accessibleHint), a._accessibleActive = !0, a._accessibleDiv = b, b.displayObject = a, this.children.push(a), this.div.appendChild(a._accessibleDiv), a._accessibleDiv.tabIndex = a.tabIndex
          }, a.prototype._onClick = function(a) {
            var b = this.renderer.plugins.interaction;
            b.dispatchEvent(a.target.displayObject, "click", b.eventData)
          }, a.prototype._onFocus = function(a) {
            var b = this.renderer.plugins.interaction;
            b.dispatchEvent(a.target.displayObject, "mouseover", b.eventData)
          }, a.prototype._onFocusOut = function(a) {
            var b = this.renderer.plugins.interaction;
            b.dispatchEvent(a.target.displayObject, "mouseout", b.eventData)
          }, a.prototype._onKeyDown = function(a) {
            a.keyCode === m && this.activate()
          }, a.prototype._onMouseMove = function() {
            this.deactivate()
          }, a.prototype.destroy = function() {
            this.div = null;
            for (var a = 0; a < this.children.length; a++) this.children[a].div = null;
            window.document.removeEventListener("mousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null
          }, a
        }();
      c.default = v, h.WebGLRenderer.registerPlugin("accessibility", v), h.CanvasRenderer.registerPlugin("accessibility", v)
    }, {
      "../core": 62,
      "./accessibleTarget": 40,
      ismobilejs: 4
    }],
    40: [function(a, b, c) {
      "use strict";
      c.__esModule = !0, c.default = {
        accessible: !1,
        accessibleTitle: null,
        accessibleHint: null,
        tabIndex: 0,
        _accessibleActive: !1,
        _accessibleDiv: !1
      }
    }, {}],
    41: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./accessibleTarget");
      Object.defineProperty(c, "accessibleTarget", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./AccessibilityManager");
      Object.defineProperty(c, "AccessibilityManager", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      })
    }, {
      "./AccessibilityManager": 39,
      "./accessibleTarget": 40
    }],
    42: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function e(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function f(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }

      function g(a) {
        if (a instanceof Array) {
          if ("precision" !== a[0].substring(0, 9)) {
            var b = a.slice(0);
            return b.unshift("precision " + i.PRECISION.DEFAULT + " float;"), b
          }
        } else if ("precision" !== a.substring(0, 9)) return "precision " + i.PRECISION.DEFAULT + " float;\n" + a;
        return a
      }
      c.__esModule = !0;
      var h = a("pixi-gl-core"),
        i = a("./const"),
        j = function(a) {
          function b(c, f, h) {
            return d(this, b), e(this, a.call(this, c, g(f), g(h)))
          }
          return f(b, a), b
        }(h.GLShader);
      c.default = j
    }, {
      "./const": 43,
      "pixi-gl-core": 12
    }],
    43: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0, c.SPRITE_MAX_TEXTURES = c.SPRITE_BATCH_SIZE = c.TEXT_GRADIENT = c.TRANSFORM_MODE = c.PRECISION = c.SHAPES = c.SVG_SIZE = c.DATA_URI = c.URL_FILE_EXTENSION = c.DEFAULT_RENDER_OPTIONS = c.FILTER_RESOLUTION = c.RESOLUTION = c.RETINA_PREFIX = c.MIPMAP_TEXTURES = c.GC_MODES = c.WRAP_MODES = c.SCALE_MODES = c.DRAW_MODES = c.BLEND_MODES = c.RENDERER_TYPE = c.TARGET_FPMS = c.DEG_TO_RAD = c.RAD_TO_DEG = c.PI_2 = c.VERSION = void 0;
      var e = a("./utils/maxRecommendedTextures"),
        f = d(e);
      c.VERSION = "4.1.0", c.PI_2 = 2 * Math.PI, c.RAD_TO_DEG = 180 / Math.PI, c.DEG_TO_RAD = Math.PI / 180, c.TARGET_FPMS = .06, c.RENDERER_TYPE = {
        UNKNOWN: 0,
        WEBGL: 1,
        CANVAS: 2
      }, c.BLEND_MODES = {
        NORMAL: 0,
        ADD: 1,
        MULTIPLY: 2,
        SCREEN: 3,
        OVERLAY: 4,
        DARKEN: 5,
        LIGHTEN: 6,
        COLOR_DODGE: 7,
        COLOR_BURN: 8,
        HARD_LIGHT: 9,
        SOFT_LIGHT: 10,
        DIFFERENCE: 11,
        EXCLUSION: 12,
        HUE: 13,
        SATURATION: 14,
        COLOR: 15,
        LUMINOSITY: 16
      }, c.DRAW_MODES = {
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6
      }, c.SCALE_MODES = {
        DEFAULT: 0,
        LINEAR: 0,
        NEAREST: 1
      }, c.WRAP_MODES = {
        DEFAULT: 0,
        CLAMP: 0,
        REPEAT: 1,
        MIRRORED_REPEAT: 2
      }, c.GC_MODES = {
        DEFAULT: 0,
        AUTO: 0,
        MANUAL: 1
      }, c.MIPMAP_TEXTURES = !0, c.RETINA_PREFIX = /@(.+)x/, c.RESOLUTION = 1, c.FILTER_RESOLUTION = 1, c.DEFAULT_RENDER_OPTIONS = {
        view: null,
        antialias: !1,
        forceFXAA: !1,
        autoResize: !1,
        transparent: !1,
        backgroundColor: 0,
        clearBeforeRender: !0,
        preserveDrawingBuffer: !1,
        roundPixels: !1
      }, c.URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i, c.DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i, c.SVG_SIZE = /<svg[^>]*(?:\s(width|height)="(\d*(?:\.\d+)?)(?:px)?")[^>]*(?:\s(width|height)="(\d*(?:\.\d+)?)(?:px)?")[^>]*>/i, c.SHAPES = {
        POLY: 0,
        RECT: 1,
        CIRC: 2,
        ELIP: 3,
        RREC: 4
      }, c.PRECISION = {
        DEFAULT: "mediump",
        LOW: "lowp",
        MEDIUM: "mediump",
        HIGH: "highp"
      }, c.TRANSFORM_MODE = {
        DEFAULT: 0,
        STATIC: 0,
        DYNAMIC: 1
      }, c.TEXT_GRADIENT = {
        LINEAR_VERTICAL: 0,
        LINEAR_HORIZONTAL: 1
      }, c.SPRITE_BATCH_SIZE = 4096, c.SPRITE_MAX_TEXTURES = (0, f.default)(32)
    }, {
      "./utils/maxRecommendedTextures": 117
    }],
    44: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = a("../math"),
        f = function() {
          function a() {
            d(this, a), this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0), this.rect = null
          }
          return a.prototype.isEmpty = function() {
            return this.minX > this.maxX || this.minY > this.maxY
          }, a.prototype.clear = function() {
            this.updateID++, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0)
          }, a.prototype.getRectangle = function(a) {
            return this.minX > this.maxX || this.minY > this.maxY ? e.Rectangle.EMPTY : (a = a || new e.Rectangle(0, 0, 1, 1), a.x = this.minX, a.y = this.minY, a.width = this.maxX - this.minX, a.height = this.maxY - this.minY, a)
          }, a.prototype.addPoint = function(a) {
            this.minX = Math.min(this.minX, a.x), this.maxX = Math.max(this.maxX, a.x), this.minY = Math.min(this.minY, a.y), this.maxY = Math.max(this.maxY, a.y)
          }, a.prototype.addQuad = function(a) {
            var b = this.minX,
              c = this.minY,
              d = this.maxX,
              e = this.maxY,
              f = a[0],
              g = a[1];
            b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, f = a[2], g = a[3], b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, f = a[4], g = a[5], b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, f = a[6], g = a[7], b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, this.minX = b, this.minY = c, this.maxX = d, this.maxY = e
          }, a.prototype.addFrame = function(a, b, c, d, e) {
            var f = a.worldTransform,
              g = f.a,
              h = f.b,
              i = f.c,
              j = f.d,
              k = f.tx,
              l = f.ty,
              m = this.minX,
              n = this.minY,
              o = this.maxX,
              p = this.maxY,
              q = g * b + i * c + k,
              r = h * b + j * c + l;
            m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, q = g * d + i * c + k, r = h * d + j * c + l, m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, q = g * b + i * e + k, r = h * b + j * e + l, m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, q = g * d + i * e + k, r = h * d + j * e + l, m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, this.minX = m, this.minY = n, this.maxX = o, this.maxY = p
          }, a.prototype.addVertices = function(a, b, c, d) {
            for (var e = a.worldTransform, f = e.a, g = e.b, h = e.c, i = e.d, j = e.tx, k = e.ty, l = this.minX, m = this.minY, n = this.maxX, o = this.maxY, p = c; p < d; p += 2) {
              var q = b[p],
                r = b[p + 1],
                s = f * q + h * r + j,
                t = i * r + g * q + k;
              l = s < l ? s : l, m = t < m ? t : m, n = s > n ? s : n, o = t > o ? t : o
            }
            this.minX = l, this.minY = m, this.maxX = n, this.maxY = o
          }, a.prototype.addBounds = function(a) {
            var b = this.minX,
              c = this.minY,
              d = this.maxX,
              e = this.maxY;
            this.minX = a.minX < b ? a.minX : b, this.minY = a.minY < c ? a.minY : c, this.maxX = a.maxX > d ? a.maxX : d, this.maxY = a.maxY > e ? a.maxY : e
          }, a.prototype.addBoundsMask = function(a, b) {
            var c = a.minX > b.minX ? a.minX : b.minX,
              d = a.minY > b.minY ? a.minY : b.minY,
              e = a.maxX < b.maxX ? a.maxX : b.maxX,
              f = a.maxY < b.maxY ? a.maxY : b.maxY;
            if (c <= e && d <= f) {
              var g = this.minX,
                h = this.minY,
                i = this.maxX,
                j = this.maxY;
              this.minX = c < g ? c : g, this.minY = d < h ? d : h, this.maxX = e > i ? e : i, this.maxY = f > j ? f : j
            }
          }, a.prototype.addBoundsArea = function(a, b) {
            var c = a.minX > b.x ? a.minX : b.x,
              d = a.minY > b.y ? a.minY : b.y,
              e = a.maxX < b.x + b.width ? a.maxX : b.x + b.width,
              f = a.maxY < b.y + b.height ? a.maxY : b.y + b.height;
            if (c <= e && d <= f) {
              var g = this.minX,
                h = this.minY,
                i = this.maxX,
                j = this.maxY;
              this.minX = c < g ? c : g, this.minY = d < h ? d : h, this.maxX = e > i ? e : i, this.maxY = f > j ? f : j
            }
          }, a
        }();
      c.default = f
    }, {
      "../math": 67
    }],
    45: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../utils"),
        j = a("./DisplayObject"),
        k = d(j),
        l = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this));
            return c.children = [], c
          }
          return g(b, a), b.prototype.onChildrenChange = function() {}, b.prototype.addChild = function() {
            for (var a = arguments.length, b = Array(a), c = 0; c < a; c++) b[c] = arguments[c];
            for (var d = 0; d < b.length; ++d) {
              var e = b[d];
              e.parent && e.parent.removeChild(e), e.parent = this, this.transform._parentID = -1, this._boundsID++, this.children.push(e), this.onChildrenChange(this.children.length - 1), e.emit("added", this)
            }
            return b[0]
          }, b.prototype.addChildAt = function(a, b) {
            if (b < 0 || b > this.children.length) throw new Error(a + "addChildAt: The index " + b + " supplied is out of bounds " + this.children.length);
            return a.parent && a.parent.removeChild(a), a.parent = this, this.children.splice(b, 0, a), this.onChildrenChange(b), a.emit("added", this), a
          }, b.prototype.swapChildren = function(a, b) {
            if (a !== b) {
              var c = this.getChildIndex(a),
                d = this.getChildIndex(b);
              this.children[c] = b, this.children[d] = a, this.onChildrenChange(c < d ? c : d)
            }
          }, b.prototype.getChildIndex = function(a) {
            var b = this.children.indexOf(a);
            if (b === -1) throw new Error("The supplied DisplayObject must be a child of the caller");
            return b
          }, b.prototype.setChildIndex = function(a, b) {
            if (b < 0 || b >= this.children.length) throw new Error("The supplied index is out of bounds");
            var c = this.getChildIndex(a);
            (0, i.removeItems)(this.children, c, 1), this.children.splice(b, 0, a), this.onChildrenChange(b)
          }, b.prototype.getChildAt = function(a) {
            if (a < 0 || a >= this.children.length) throw new Error("getChildAt: Index (" + a + ") does not exist.");
            return this.children[a]
          }, b.prototype.removeChild = function() {
            for (var a = arguments.length, b = Array(a), c = 0; c < a; c++) b[c] = arguments[c];
            for (var d = 0; d < b.length; ++d) {
              var e = b[d],
                f = this.children.indexOf(e);
              f !== -1 && (e.parent = null, (0, i.removeItems)(this.children, f, 1), this.onChildrenChange(f), e.emit("removed", this))
            }
            return b[0]
          }, b.prototype.removeChildAt = function(a) {
            var b = this.getChildAt(a);
            return b.parent = null, (0, i.removeItems)(this.children, a, 1), this.onChildrenChange(a), b.emit("removed", this), b
          }, b.prototype.removeChildren = function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments[1],
              c = a,
              d = "number" == typeof b ? b : this.children.length,
              e = d - c,
              f = void 0;
            if (e > 0 && e <= d) {
              f = this.children.splice(c, e);
              for (var g = 0; g < f.length; ++g) f[g].parent = null;
              this.onChildrenChange(a);
              for (var h = 0; h < f.length; ++h) f[h].emit("removed", this);
              return f
            }
            if (0 === e && 0 === this.children.length) return [];
            throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
          }, b.prototype.updateTransform = function() {
            this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
            for (var a = 0, b = this.children.length; a < b; ++a) {
              var c = this.children[a];
              c.visible && c.updateTransform()
            }
          }, b.prototype.calculateBounds = function() {
            this._bounds.clear(), this._calculateBounds();
            for (var a = 0; a < this.children.length; a++) {
              var b = this.children[a];
              b.visible && b.renderable && (b.calculateBounds(), b._mask ? (b._mask.calculateBounds(), this._bounds.addBoundsMask(b._bounds, b._mask._bounds)) : b.filterArea ? this._bounds.addBoundsArea(b._bounds, b.filterArea) : this._bounds.addBounds(b._bounds))
            }
            this._lastBoundsID = this._boundsID
          }, b.prototype._calculateBounds = function() {}, b.prototype.renderWebGL = function(a) {
            if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
              if (this._mask || this._filters) this.renderAdvancedWebGL(a);
              else {
                this._renderWebGL(a);
                for (var b = 0, c = this.children.length; b < c; ++b) this.children[b].renderWebGL(a)
              }
          }, b.prototype.renderAdvancedWebGL = function(a) {
            a.currentRenderer.flush();
            var b = this._filters,
              c = this._mask;
            if (b) {
              this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
              for (var d = 0; d < b.length; d++) b[d].enabled && this._enabledFilters.push(b[d]);
              this._enabledFilters.length && a.filterManager.pushFilter(this, this._enabledFilters)
            }
            c && a.maskManager.pushMask(this, this._mask), a.currentRenderer.start(), this._renderWebGL(a);
            for (var e = 0, f = this.children.length; e < f; e++) this.children[e].renderWebGL(a);
            a.currentRenderer.flush(), c && a.maskManager.popMask(this, this._mask), b && this._enabledFilters && this._enabledFilters.length && a.filterManager.popFilter(), a.currentRenderer.start()
          }, b.prototype._renderWebGL = function(a) {}, b.prototype._renderCanvas = function(a) {}, b.prototype.renderCanvas = function(a) {
            if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
              this._mask && a.maskManager.pushMask(this._mask), this._renderCanvas(a);
              for (var b = 0, c = this.children.length; b < c; ++b) this.children[b].renderCanvas(a);
              this._mask && a.maskManager.popMask(a)
            }
          }, b.prototype.destroy = function(b) {
            a.prototype.destroy.call(this);
            var c = "boolean" == typeof b ? b : b && b.children,
              d = this.removeChildren(0, this.children.length);
            if (c)
              for (var e = 0; e < d.length; ++e) d[e].destroy(b)
          }, h(b, [{
            key: "width",
            get: function() {
              return this.scale.x * this.getLocalBounds().width
            },
            set: function(a) {
              var b = this.getLocalBounds().width;
              0 !== b ? this.scale.x = a / b : this.scale.x = 1, this._width = a
            }
          }, {
            key: "height",
            get: function() {
              return this.scale.y * this.getLocalBounds().height
            },
            set: function(a) {
              var b = this.getLocalBounds().height;
              0 !== b ? this.scale.y = a / b : this.scale.y = 1, this._height = a
            }
          }]), b
        }(k.default);
      c.default = l, l.prototype.containerUpdateTransform = l.prototype.updateTransform
    }, {
      "../utils": 116,
      "./DisplayObject": 46
    }],
    46: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("eventemitter3"),
        j = d(i),
        k = a("../const"),
        l = a("./TransformStatic"),
        m = d(l),
        n = a("./Transform"),
        o = d(n),
        p = a("./Bounds"),
        q = d(p),
        r = a("../math"),
        s = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this)),
              d = k.TRANSFORM_MODE.DEFAULT === k.TRANSFORM_MODE.STATIC ? m.default : o.default;
            return c.tempDisplayObjectParent = null, c.transform = new d, c.alpha = 1, c.visible = !0, c.renderable = !0, c.parent = null, c.worldAlpha = 1, c.filterArea = null, c._filters = null, c._enabledFilters = null, c._bounds = new q.default, c._boundsID = 0, c._lastBoundsID = -1, c._boundsRect = null, c._localBoundsRect = null, c._mask = null, c
          }
          return g(b, a), b.prototype.updateTransform = function() {
            this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha, this._bounds.updateID++
          }, b.prototype._recursivePostUpdateTransform = function() {
            this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
          }, b.prototype.getBounds = function(a, b) {
            return a || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._boundsID !== this._lastBoundsID && this.calculateBounds(), b || (this._boundsRect || (this._boundsRect = new r.Rectangle), b = this._boundsRect), this._bounds.getRectangle(b)
          }, b.prototype.getLocalBounds = function(a) {
            var b = this.transform,
              c = this.parent;
            this.parent = null, this.transform = this._tempDisplayObjectParent.transform, a || (this._localBoundsRect || (this._localBoundsRect = new r.Rectangle), a = this._localBoundsRect);
            var d = this.getBounds(!1, a);
            return this.parent = c, this.transform = b, d
          }, b.prototype.toGlobal = function(a, b) {
            var c = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return c || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(a, b)
          }, b.prototype.toLocal = function(a, b, c, d) {
            return b && (a = b.toGlobal(a, c, d)), d || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(a, c)
          }, b.prototype.renderWebGL = function(a) {}, b.prototype.renderCanvas = function(a) {}, b.prototype.setParent = function(a) {
            if (!a || !a.addChild) throw new Error("setParent: Argument must be a Container");
            return a.addChild(this), a
          }, b.prototype.setTransform = function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
              d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
              e = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
              f = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
              g = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
              h = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
              i = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0;
            return this.position.x = a, this.position.y = b, this.scale.x = c ? c : 1, this.scale.y = d ? d : 1, this.rotation = e, this.skew.x = f, this.skew.y = g, this.pivot.x = h, this.pivot.y = i, this
          }, b.prototype.destroy = function() {
            this.removeAllListeners(), this.parent && this.parent.removeChild(this), this.transform = null, this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, this.filterArea = null, this.interactive = !1, this.interactiveChildren = !1
          }, h(b, [{
            key: "_tempDisplayObjectParent",
            get: function() {
              return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new b), this.tempDisplayObjectParent
            }
          }, {
            key: "x",
            get: function() {
              return this.position.x
            },
            set: function(a) {
              this.transform.position.x = a
            }
          }, {
            key: "y",
            get: function() {
              return this.position.y
            },
            set: function(a) {
              this.transform.position.y = a
            }
          }, {
            key: "worldTransform",
            get: function() {
              return this.transform.worldTransform
            }
          }, {
            key: "localTransform",
            get: function() {
              return this.transform.localTransform
            }
          }, {
            key: "position",
            get: function() {
              return this.transform.position
            },
            set: function(a) {
              this.transform.position.copy(a)
            }
          }, {
            key: "scale",
            get: function() {
              return this.transform.scale
            },
            set: function(a) {
              this.transform.scale.copy(a)
            }
          }, {
            key: "pivot",
            get: function() {
              return this.transform.pivot
            },
            set: function(a) {
              this.transform.pivot.copy(a)
            }
          }, {
            key: "skew",
            get: function() {
              return this.transform.skew
            },
            set: function(a) {
              this.transform.skew.copy(a)
            }
          }, {
            key: "rotation",
            get: function() {
              return this.transform.rotation
            },
            set: function(a) {
              this.transform.rotation = a
            }
          }, {
            key: "worldVisible",
            get: function() {
              var a = this;
              do {
                if (!a.visible) return !1;
                a = a.parent
              } while (a);
              return !0
            }
          }, {
            key: "mask",
            get: function() {
              return this._mask
            },
            set: function(a) {
              this._mask && (this._mask.renderable = !0), this._mask = a, this._mask && (this._mask.renderable = !1)
            }
          }, {
            key: "filters",
            get: function() {
              return this._filters && this._filters.slice()
            },
            set: function(a) {
              this._filters = a && a.slice()
            }
          }]), b
        }(j.default);
      c.default = s, s.prototype.displayObjectUpdateTransform = s.prototype.updateTransform
    }, {
      "../const": 43,
      "../math": 67,
      "./Bounds": 44,
      "./Transform": 47,
      "./TransformStatic": 49,
      eventemitter3: 3
    }],
    47: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../math"),
        j = a("./TransformBase"),
        k = d(j),
        l = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this));
            return c.position = new i.Point(0, 0), c.scale = new i.Point(1, 1), c.skew = new i.ObservablePoint(c.updateSkew, c, 0, 0), c.pivot = new i.Point(0, 0), c._rotation = 0, c._sr = Math.sin(0), c._cr = Math.cos(0), c._cy = Math.cos(0), c._sy = Math.sin(0), c._nsx = Math.sin(0), c._cx = Math.cos(0), c
          }
          return g(b, a), b.prototype.updateSkew = function() {
            this._cy = Math.cos(this.skew.y), this._sy = Math.sin(this.skew.y), this._nsx = Math.sin(this.skew.x), this._cx = Math.cos(this.skew.x)
          }, b.prototype.updateLocalTransform = function() {
            var a = this.localTransform,
              b = this._cr * this.scale.x,
              c = this._sr * this.scale.x,
              d = -this._sr * this.scale.y,
              e = this._cr * this.scale.y;
            a.a = this._cy * b + this._sy * d, a.b = this._cy * c + this._sy * e, a.c = this._nsx * b + this._cx * d, a.d = this._nsx * c + this._cx * e
          }, b.prototype.updateTransform = function(a) {
            var b = a.worldTransform,
              c = this.worldTransform,
              d = this.localTransform,
              e = this._cr * this.scale.x,
              f = this._sr * this.scale.x,
              g = -this._sr * this.scale.y,
              h = this._cr * this.scale.y;
            d.a = this._cy * e + this._sy * g, d.b = this._cy * f + this._sy * h, d.c = this._nsx * e + this._cx * g, d.d = this._nsx * f + this._cx * h, d.tx = this.position.x - (this.pivot.x * d.a + this.pivot.y * d.c), d.ty = this.position.y - (this.pivot.x * d.b + this.pivot.y * d.d), c.a = d.a * b.a + d.b * b.c, c.b = d.a * b.b + d.b * b.d, c.c = d.c * b.a + d.d * b.c, c.d = d.c * b.b + d.d * b.d, c.tx = d.tx * b.a + d.ty * b.c + b.tx, c.ty = d.tx * b.b + d.ty * b.d + b.ty, this._worldID++
          }, b.prototype.setFromMatrix = function(a) {
            a.decompose(this)
          }, h(b, [{
            key: "rotation",
            get: function() {
              return this._rotation
            },
            set: function(a) {
              this._rotation = a, this._sr = Math.sin(a), this._cr = Math.cos(a)
            }
          }]), b
        }(k.default);
      c.default = l
    }, {
      "../math": 67,
      "./TransformBase": 48
    }],
    48: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = a("../math"),
        f = function() {
          function a() {
            d(this, a), this.worldTransform = new e.Matrix, this.localTransform = new e.Matrix, this._worldID = 0, this._parentID = 0
          }
          return a.prototype.updateLocalTransform = function() {}, a.prototype.updateTransform = function(a) {
            var b = a.worldTransform,
              c = this.worldTransform,
              d = this.localTransform;
            c.a = d.a * b.a + d.b * b.c, c.b = d.a * b.b + d.b * b.d, c.c = d.c * b.a + d.d * b.c, c.d = d.c * b.b + d.d * b.d, c.tx = d.tx * b.a + d.ty * b.c + b.tx, c.ty = d.tx * b.b + d.ty * b.d + b.ty, this._worldID++
          }, a
        }();
      c.default = f, f.prototype.updateWorldTransform = f.prototype.updateTransform, f.IDENTITY = new f
    }, {
      "../math": 67
    }],
    49: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../math"),
        j = a("./TransformBase"),
        k = d(j),
        l = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this));
            return c.position = new i.ObservablePoint(c.onChange, c, 0, 0), c.scale = new i.ObservablePoint(c.onChange, c, 1, 1), c.pivot = new i.ObservablePoint(c.onChange, c, 0, 0), c.skew = new i.ObservablePoint(c.updateSkew, c, 0, 0), c._rotation = 0, c._sr = Math.sin(0), c._cr = Math.cos(0), c._cy = Math.cos(0), c._sy = Math.sin(0), c._nsx = Math.sin(0), c._cx = Math.cos(0), c._localID = 0, c._currentLocalID = 0, c
          }
          return g(b, a), b.prototype.onChange = function() {
            this._localID++
          }, b.prototype.updateSkew = function() {
            this._cy = Math.cos(this.skew._y), this._sy = Math.sin(this.skew._y), this._nsx = Math.sin(this.skew._x), this._cx = Math.cos(this.skew._x), this._localID++
          }, b.prototype.updateLocalTransform = function() {
            var a = this.localTransform;
            if (this._localID !== this._currentLocalID) {
              var b = this._cr * this.scale._x,
                c = this._sr * this.scale._x,
                d = -this._sr * this.scale._y,
                e = this._cr * this.scale._y;
              a.a = this._cy * b + this._sy * d, a.b = this._cy * c + this._sy * e, a.c = this._nsx * b + this._cx * d, a.d = this._nsx * c + this._cx * e, a.tx = this.position._x - (this.pivot._x * a.a + this.pivot._y * a.c), a.ty = this.position._y - (this.pivot._x * a.b + this.pivot._y * a.d), this._currentLocalID = this._localID, this._parentID = -1
            }
          }, b.prototype.updateTransform = function(a) {
            var b = a.worldTransform,
              c = this.worldTransform,
              d = this.localTransform;
            if (this._localID !== this._currentLocalID) {
              var e = this._cr * this.scale._x,
                f = this._sr * this.scale._x,
                g = -this._sr * this.scale._y,
                h = this._cr * this.scale._y;
              d.a = this._cy * e + this._sy * g, d.b = this._cy * f + this._sy * h, d.c = this._nsx * e + this._cx * g, d.d = this._nsx * f + this._cx * h, d.tx = this.position._x - (this.pivot._x * d.a + this.pivot._y * d.c), d.ty = this.position._y - (this.pivot._x * d.b + this.pivot._y * d.d), this._currentLocalID = this._localID, this._parentID = -1
            }
            this._parentID !== a._worldID && (c.a = d.a * b.a + d.b * b.c, c.b = d.a * b.b + d.b * b.d, c.c = d.c * b.a + d.d * b.c, c.d = d.c * b.b + d.d * b.d, c.tx = d.tx * b.a + d.ty * b.c + b.tx, c.ty = d.tx * b.b + d.ty * b.d + b.ty, this._parentID = a._worldID, this._worldID++)
          }, b.prototype.setFromMatrix = function(a) {
            a.decompose(this), this._localID++
          }, h(b, [{
            key: "rotation",
            get: function() {
              return this._rotation
            },
            set: function(a) {
              this._rotation = a, this._sr = Math.sin(a), this._cr = Math.cos(a), this._localID++
            }
          }]), b
        }(k.default);
      c.default = l
    }, {
      "../math": 67,
      "./TransformBase": 48
    }],
    50: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../display/Container"),
        i = d(h),
        j = a("../textures/RenderTexture"),
        k = d(j),
        l = a("../textures/Texture"),
        m = d(l),
        n = a("./GraphicsData"),
        o = d(n),
        p = a("../sprites/Sprite"),
        q = d(p),
        r = a("../math"),
        s = a("../utils"),
        t = a("../const"),
        u = a("../display/Bounds"),
        v = d(u),
        w = a("./utils/bezierCurveTo"),
        x = d(w),
        y = a("../renderers/canvas/CanvasRenderer"),
        z = d(y),
        A = void 0,
        B = new r.Matrix,
        C = new r.Point,
        D = new Float32Array(4),
        E = new Float32Array(4),
        F = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this));
            return c.fillAlpha = 1, c.lineWidth = 0, c.lineColor = 0, c.graphicsData = [], c.tint = 16777215, c._prevTint = 16777215, c.blendMode = t.BLEND_MODES.NORMAL, c.currentPath = null, c._webGL = {}, c.isMask = !1, c.boundsPadding = 0, c._localBounds = new v.default, c.dirty = 0, c.fastRectDirty = -1, c.clearDirty = 0, c.boundsDirty = -1, c.cachedSpriteDirty = !1, c._spriteRect = null, c._fastRect = !1, c
          }
          return g(b, a), b.prototype.clone = function a() {
            var a = new b;
            a.renderable = this.renderable, a.fillAlpha = this.fillAlpha, a.lineWidth = this.lineWidth, a.lineColor = this.lineColor, a.tint = this.tint, a.blendMode = this.blendMode, a.isMask = this.isMask, a.boundsPadding = this.boundsPadding, a.dirty = 0, a.cachedSpriteDirty = this.cachedSpriteDirty;
            for (var c = 0; c < this.graphicsData.length; ++c) a.graphicsData.push(this.graphicsData[c].clone());
            return a.currentPath = a.graphicsData[a.graphicsData.length - 1], a.updateLocalBounds(), a
          }, b.prototype.lineStyle = function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            if (this.lineWidth = a, this.lineColor = b, this.lineAlpha = c, this.currentPath)
              if (this.currentPath.shape.points.length) {
                var d = new r.Polygon(this.currentPath.shape.points.slice(-2));
                d.closed = !1, this.drawShape(d)
              } else this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha;
            return this
          }, b.prototype.moveTo = function(a, b) {
            var c = new r.Polygon([a, b]);
            return c.closed = !1, this.drawShape(c), this
          }, b.prototype.lineTo = function(a, b) {
            return this.currentPath.shape.points.push(a, b), this.dirty++, this
          }, b.prototype.quadraticCurveTo = function(a, b, c, d) {
            this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
            var e = 20,
              f = this.currentPath.shape.points,
              g = 0,
              h = 0;
            0 === f.length && this.moveTo(0, 0);
            for (var i = f[f.length - 2], j = f[f.length - 1], k = 1; k <= e; ++k) {
              var l = k / e;
              g = i + (a - i) * l, h = j + (b - j) * l, f.push(g + (a + (c - a) * l - g) * l, h + (b + (d - b) * l - h) * l)
            }
            return this.dirty++, this
          }, b.prototype.bezierCurveTo = function(a, b, c, d, e, f) {
            this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
            var g = this.currentPath.shape.points,
              h = g[g.length - 2],
              i = g[g.length - 1];
            return g.length -= 2, (0, x.default)(h, i, a, b, c, d, e, f, g), this.dirty++, this
          }, b.prototype.arcTo = function(a, b, c, d, e) {
            this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(a, b) : this.moveTo(a, b);
            var f = this.currentPath.shape.points,
              g = f[f.length - 2],
              h = f[f.length - 1],
              i = h - b,
              j = g - a,
              k = d - b,
              l = c - a,
              m = Math.abs(i * l - j * k);
            if (m < 1e-8 || 0 === e) f[f.length - 2] === a && f[f.length - 1] === b || f.push(a, b);
            else {
              var n = i * i + j * j,
                o = k * k + l * l,
                p = i * k + j * l,
                q = e * Math.sqrt(n) / m,
                r = e * Math.sqrt(o) / m,
                s = q * p / n,
                t = r * p / o,
                u = q * l + r * j,
                v = q * k + r * i,
                w = j * (r + s),
                x = i * (r + s),
                y = l * (q + t),
                z = k * (q + t),
                A = Math.atan2(x - v, w - u),
                B = Math.atan2(z - v, y - u);
              this.arc(u + a, v + b, e, A, B, j * k > l * i)
            }
            return this.dirty++, this
          }, b.prototype.arc = function(a, b, c, d, e) {
            var f = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
            if (d === e) return this;
            !f && e <= d ? e += 2 * Math.PI : f && d <= e && (d += 2 * Math.PI);
            var g = f ? d - e : e - d,
              h = 40 * Math.ceil(Math.abs(g) / (2 * Math.PI));
            if (0 === g) return this;
            var i = a + Math.cos(d) * c,
              j = b + Math.sin(d) * c,
              k = this.currentPath.shape.points;
            this.currentPath ? k[k.length - 2] === i && k[k.length - 1] === j || k.push(i, j) : this.moveTo(i, j);
            for (var l = g / (2 * h), m = 2 * l, n = Math.cos(l), o = Math.sin(l), p = h - 1, q = p % 1 / p, r = 0; r <= p; ++r) {
              var s = r + q * r,
                t = l + d + m * s,
                u = Math.cos(t),
                v = -Math.sin(t);
              k.push((n * u + o * v) * c + a, (n * -v + o * u) * c + b)
            }
            return this.dirty++, this
          }, b.prototype.beginFill = function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            return this.filling = !0, this.fillColor = a, this.fillAlpha = b, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this
          }, b.prototype.endFill = function() {
            return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
          }, b.prototype.drawRect = function(a, b, c, d) {
            return this.drawShape(new r.Rectangle(a, b, c, d)), this
          }, b.prototype.drawRoundedRect = function(a, b, c, d, e) {
            return this.drawShape(new r.RoundedRectangle(a, b, c, d, e)), this
          }, b.prototype.drawCircle = function(a, b, c) {
            return this.drawShape(new r.Circle(a, b, c)), this
          }, b.prototype.drawEllipse = function(a, b, c, d) {
            return this.drawShape(new r.Ellipse(a, b, c, d)), this
          }, b.prototype.drawPolygon = function(a) {
            var b = a,
              c = !0;
            if (b instanceof r.Polygon && (c = b.closed, b = b.points), !Array.isArray(b)) {
              b = new Array(arguments.length);
              for (var d = 0; d < b.length; ++d) b[d] = arguments[d]
            }
            var e = new r.Polygon(b);
            return e.closed = c, this.drawShape(e), this
          }, b.prototype.clear = function() {
            return (this.lineWidth || this.filling || this.graphicsData.length > 0) && (this.lineWidth = 0, this.filling = !1, this.dirty++, this.clearDirty++, this.graphicsData.length = 0), this
          }, b.prototype.isFastRect = function() {
            return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === t.SHAPES.RECT && !this.graphicsData[0].lineWidth
          }, b.prototype._renderWebGL = function(a) {
            this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty, this._fastRect = this.isFastRect()), this._fastRect ? this._renderSpriteRect(a) : (a.setObjectRenderer(a.plugins.graphics), a.plugins.graphics.render(this))
          }, b.prototype._renderSpriteRect = function(a) {
            var c = this.graphicsData[0].shape;
            if (!this._spriteRect) {
              if (!b._SPRITE_TEXTURE) {
                b._SPRITE_TEXTURE = k.default.create(10, 10);
                var d = document.createElement("canvas");
                d.width = 10, d.height = 10;
                var e = d.getContext("2d");
                e.fillStyle = "white", e.fillRect(0, 0, 10, 10), b._SPRITE_TEXTURE = m.default.fromCanvas(d)
              }
              this._spriteRect = new q.default(b._SPRITE_TEXTURE)
            }
            if (16777215 === this.tint) this._spriteRect.tint = this.graphicsData[0].fillColor;
            else {
              var f = D,
                g = E;
              (0, s.hex2rgb)(this.graphicsData[0].fillColor, f), (0, s.hex2rgb)(this.tint, g), f[0] *= g[0], f[1] *= g[1], f[2] *= g[2], this._spriteRect.tint = (0, s.rgb2hex)(f)
            }
            this._spriteRect.alpha = this.graphicsData[0].fillAlpha, this._spriteRect.worldAlpha = this.worldAlpha * this._spriteRect.alpha, b._SPRITE_TEXTURE._frame.width = c.width, b._SPRITE_TEXTURE._frame.height = c.height, this._spriteRect.transform.worldTransform = this.transform.worldTransform, this._spriteRect.anchor.set(-c.x / c.width, -c.y / c.height), this._spriteRect._onAnchorUpdate(), this._spriteRect._renderWebGL(a)
          }, b.prototype._renderCanvas = function(a) {
            this.isMask !== !0 && a.plugins.graphics.render(this)
          }, b.prototype._calculateBounds = function() {
            this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.updateLocalBounds(), this.dirty++, this.cachedSpriteDirty = !0);
            var a = this._localBounds;
            this._bounds.addFrame(this.transform, a.minX, a.minY, a.maxX, a.maxY)
          }, b.prototype.containsPoint = function(a) {
            this.worldTransform.applyInverse(a, C);
            for (var b = this.graphicsData, c = 0; c < b.length; ++c) {
              var d = b[c];
              if (d.fill && d.shape && d.shape.contains(C.x, C.y)) return !0
            }
            return !1
          }, b.prototype.updateLocalBounds = function() {
            var a = 1 / 0,
              b = -(1 / 0),
              c = 1 / 0,
              d = -(1 / 0);
            if (this.graphicsData.length)
              for (var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0; j < this.graphicsData.length; j++) {
                var k = this.graphicsData[j],
                  l = k.type,
                  m = k.lineWidth;
                if (e = k.shape, l === t.SHAPES.RECT || l === t.SHAPES.RREC) f = e.x - m / 2, g = e.y - m / 2, h = e.width + m, i = e.height + m, a = f < a ? f : a, b = f + h > b ? f + h : b, c = g < c ? g : c, d = g + i > d ? g + i : d;
                else if (l === t.SHAPES.CIRC) f = e.x, g = e.y, h = e.radius + m / 2, i = e.radius + m / 2, a = f - h < a ? f - h : a, b = f + h > b ? f + h : b, c = g - i < c ? g - i : c, d = g + i > d ? g + i : d;
                else if (l === t.SHAPES.ELIP) f = e.x, g = e.y, h = e.width + m / 2, i = e.height + m / 2, a = f - h < a ? f - h : a, b = f + h > b ? f + h : b, c = g - i < c ? g - i : c, d = g + i > d ? g + i : d;
                else
                  for (var n = e.points, o = 0; o < n.length; o += 2) f = n[o], g = n[o + 1], a = f - m < a ? f - m : a, b = f + m > b ? f + m : b, c = g - m < c ? g - m : c, d = g + m > d ? g + m : d
              } else a = 0, b = 0, c = 0, d = 0;
            var p = this.boundsPadding;
            this._localBounds.minX = a - p, this._localBounds.maxX = b + 2 * p, this._localBounds.minY = c - p, this._localBounds.maxY = d + 2 * p
          }, b.prototype.drawShape = function(a) {
            this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null;
            var b = new o.default(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, a);
            return this.graphicsData.push(b), b.type === t.SHAPES.POLY && (b.shape.closed = b.shape.closed || this.filling, this.currentPath = b), this.dirty++, b
          }, b.prototype.generateCanvasTexture = function(a) {
            var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
              c = this.getLocalBounds(),
              d = k.default.create(c.width, c.height, a, b);
            A || (A = new z.default), B.tx = -c.x, B.ty = -c.y, A.render(this, d, !1, B);
            var e = m.default.fromCanvas(d.baseTexture._canvasRenderTarget.canvas, a);
            return e.baseTexture.resolution = b, e.baseTexture.update(), e
          }, b.prototype.closePath = function() {
            var a = this.currentPath;
            return a && a.shape && a.shape.close(), this
          }, b.prototype.addHole = function() {
            var a = this.graphicsData.pop();
            return this.currentPath = this.graphicsData[this.graphicsData.length - 1], this.currentPath.addHole(a.shape), this.currentPath = null, this
          }, b.prototype.destroy = function(b) {
            a.prototype.destroy.call(this, b);
            for (var c = 0; c < this.graphicsData.length; ++c) this.graphicsData[c].destroy();
            for (var d in this._webgl)
              for (var e = 0; e < this._webgl[d].data.length; ++e) this._webgl[d].data[e].destroy();
            this._spriteRect && this._spriteRect.destroy(), this.graphicsData = null, this.currentPath = null, this._webgl = null, this._localBounds = null
          }, b
        }(i.default);
      c.default = F, F._SPRITE_TEXTURE = null
    }, {
      "../const": 43,
      "../display/Bounds": 44,
      "../display/Container": 45,
      "../math": 67,
      "../renderers/canvas/CanvasRenderer": 74,
      "../sprites/Sprite": 98,
      "../textures/RenderTexture": 108,
      "../textures/Texture": 109,
      "../utils": 116,
      "./GraphicsData": 51,
      "./utils/bezierCurveTo": 53
    }],
    51: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
        function a(b, c, e, f, g, h, i) {
          d(this, a), this.lineWidth = b, this.lineColor = c, this.lineAlpha = e, this._lineTint = c, this.fillColor = f, this.fillAlpha = g, this._fillTint = f, this.fill = h, this.holes = [], this.shape = i, this.type = i.type
        }
        return a.prototype.clone = function() {
          return new a(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.shape)
        }, a.prototype.addHole = function(a) {
          this.holes.push(a)
        }, a.prototype.destroy = function() {
          this.shape = null, this.holes = null
        }, a
      }();
      c.default = e
    }, {}],
    52: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("../../renderers/canvas/CanvasRenderer"),
        g = d(f),
        h = a("../../const"),
        i = function() {
          function a(b) {
            e(this, a), this.renderer = b
          }
          return a.prototype.render = function(a) {
            var b = this.renderer,
              c = b.context,
              d = a.worldAlpha,
              e = a.transform.worldTransform,
              f = b.resolution;
            this._prevTint !== this.tint && (this.dirty = !0), c.setTransform(e.a * f, e.b * f, e.c * f, e.d * f, e.tx * f, e.ty * f), a.dirty && (this.updateGraphicsTint(a), a.dirty = !1), b.setBlendMode(a.blendMode);
            for (var g = 0; g < a.graphicsData.length; g++) {
              var i = a.graphicsData[g],
                j = i.shape,
                k = i._fillTint,
                l = i._lineTint;
              if (c.lineWidth = i.lineWidth, i.type === h.SHAPES.POLY) {
                c.beginPath(), this.renderPolygon(j.points, j.closed, c);
                for (var m = 0; m < i.holes.length; m++) this.renderPolygon(i.holes[m].points, !0, c);
                i.fill && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke())
              } else if (i.type === h.SHAPES.RECT)(i.fillColor || 0 === i.fillColor) && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fillRect(j.x, j.y, j.width, j.height)), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.strokeRect(j.x, j.y, j.width, j.height));
              else if (i.type === h.SHAPES.CIRC) c.beginPath(), c.arc(j.x, j.y, j.radius, 0, 2 * Math.PI), c.closePath(), i.fill && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke());
              else if (i.type === h.SHAPES.ELIP) {
                var n = 2 * j.width,
                  o = 2 * j.height,
                  p = j.x - n / 2,
                  q = j.y - o / 2;
                c.beginPath();
                var r = .5522848,
                  s = n / 2 * r,
                  t = o / 2 * r,
                  u = p + n,
                  v = q + o,
                  w = p + n / 2,
                  x = q + o / 2;
                c.moveTo(p, x), c.bezierCurveTo(p, x - t, w - s, q, w, q), c.bezierCurveTo(w + s, q, u, x - t, u, x), c.bezierCurveTo(u, x + t, w + s, v, w, v), c.bezierCurveTo(w - s, v, p, x + t, p, x), c.closePath(), i.fill && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke())
              } else if (i.type === h.SHAPES.RREC) {
                var y = j.x,
                  z = j.y,
                  A = j.width,
                  B = j.height,
                  C = j.radius,
                  D = Math.min(A, B) / 2 | 0;
                C = C > D ? D : C, c.beginPath(), c.moveTo(y, z + C), c.lineTo(y, z + B - C), c.quadraticCurveTo(y, z + B, y + C, z + B), c.lineTo(y + A - C, z + B), c.quadraticCurveTo(y + A, z + B, y + A, z + B - C), c.lineTo(y + A, z + C), c.quadraticCurveTo(y + A, z, y + A - C, z), c.lineTo(y + C, z), c.quadraticCurveTo(y, z, y, z + C), c.closePath(), (i.fillColor || 0 === i.fillColor) && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke())
              }
            }
          }, a.prototype.updateGraphicsTint = function(a) {
            a._prevTint = a.tint;
            for (var b = (a.tint >> 16 & 255) / 255, c = (a.tint >> 8 & 255) / 255, d = (255 & a.tint) / 255, e = 0; e < a.graphicsData.length; ++e) {
              var f = a.graphicsData[e],
                g = 0 | f.fillColor,
                h = 0 | f.lineColor;
              f._fillTint = ((g >> 16 & 255) / 255 * b * 255 << 16) + ((g >> 8 & 255) / 255 * c * 255 << 8) + (255 & g) / 255 * d * 255, f._lineTint = ((h >> 16 & 255) / 255 * b * 255 << 16) + ((h >> 8 & 255) / 255 * c * 255 << 8) + (255 & h) / 255 * d * 255
            }
          }, a.prototype.renderPolygon = function(a, b, c) {
            c.moveTo(a[0], a[1]);
            for (var d = 1; d < a.length / 2; ++d) c.lineTo(a[2 * d], a[2 * d + 1]);
            b && c.closePath()
          }, a.prototype.destroy = function() {
            this.renderer = null
          }, a
        }();
      c.default = i, g.default.registerPlugin("graphics", i)
    }, {
      "../../const": 43,
      "../../renderers/canvas/CanvasRenderer": 74
    }],
    53: [function(a, b, c) {
      "use strict";

      function d(a, b, c, d, e, f, g, h) {
        var i = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : [],
          j = 20,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0;
        i.push(a, b);
        for (var p = 1, q = 0; p <= j; ++p) q = p / j, k = 1 - q, l = k * k, m = l * k, n = q * q, o = n * q, i.push(m * a + 3 * l * q * c + 3 * k * n * e + o * g, m * b + 3 * l * q * d + 3 * k * n * f + o * h);
        return i
      }
      c.__esModule = !0, c.default = d
    }, {}],
    54: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../../utils"),
        i = a("../../const"),
        j = a("../../renderers/webgl/utils/ObjectRenderer"),
        k = d(j),
        l = a("../../renderers/webgl/WebGLRenderer"),
        m = d(l),
        n = a("./WebGLGraphicsData"),
        o = d(n),
        p = a("./shaders/PrimitiveShader"),
        q = d(p),
        r = a("./utils/buildPoly"),
        s = d(r),
        t = a("./utils/buildRectangle"),
        u = d(t),
        v = a("./utils/buildRoundedRectangle"),
        w = d(v),
        x = a("./utils/buildCircle"),
        y = d(x),
        z = function(a) {
          function b(c) {
            e(this, b);
            var d = f(this, a.call(this, c));
            return d.graphicsDataPool = [], d.primitiveShader = null, d.gl = c.gl, d.CONTEXT_UID = 0, d
          }
          return g(b, a), b.prototype.onContextChange = function() {
            this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.primitiveShader = new q.default(this.gl)
          }, b.prototype.destroy = function() {
            k.default.prototype.destroy.call(this);
            for (var a = 0; a < this.graphicsDataPool.length; ++a) this.graphicsDataPool[a].destroy();
            this.graphicsDataPool = null
          }, b.prototype.render = function(a) {
            var b = this.renderer,
              c = b.gl,
              d = void 0,
              e = a._webGL[this.CONTEXT_UID];
            e && a.dirty === e.dirty || (this.updateGraphics(a), e = a._webGL[this.CONTEXT_UID]);
            var f = this.primitiveShader;
            b.bindShader(f), b.state.setBlendMode(a.blendMode);
            for (var g = 0, i = e.data.length; g < i; g++) {
              d = e.data[g];
              var j = d.shader;
              b.bindShader(j), j.uniforms.translationMatrix = a.transform.worldTransform.toArray(!0), j.uniforms.tint = (0, h.hex2rgb)(a.tint), j.uniforms.alpha = a.worldAlpha, d.vao.bind().draw(c.TRIANGLE_STRIP, d.indices.length).unbind()
            }
          }, b.prototype.updateGraphics = function(a) {
            var b = this.renderer.gl,
              c = a._webGL[this.CONTEXT_UID];
            if (c || (c = a._webGL[this.CONTEXT_UID] = {
                lastIndex: 0,
                data: [],
                gl: b,
                clearDirty: -1,
                dirty: -1
              }), c.dirty = a.dirty, a.clearDirty !== c.clearDirty) {
              c.clearDirty = a.clearDirty;
              for (var d = 0; d < c.data.length; d++) this.graphicsDataPool.push(c.data[d]);
              c.data.length = 0, c.lastIndex = 0
            }
            for (var e = void 0, f = c.lastIndex; f < a.graphicsData.length; f++) {
              var g = a.graphicsData[f];
              e = this.getWebGLData(c, 0), g.type === i.SHAPES.POLY && (0, s.default)(g, e), g.type === i.SHAPES.RECT ? (0, u.default)(g, e) : g.type === i.SHAPES.CIRC || g.type === i.SHAPES.ELIP ? (0, y.default)(g, e) : g.type === i.SHAPES.RREC && (0, w.default)(g, e), c.lastIndex++
            }
            for (var h = 0; h < c.data.length; h++) e = c.data[h], e.dirty && e.upload()
          }, b.prototype.getWebGLData = function(a, b) {
            var c = a.data[a.data.length - 1];
            return (!c || c.points.length > 32e4) && (c = this.graphicsDataPool.pop() || new o.default(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState), c.reset(b), a.data.push(c)), c.dirty = !0, c
          }, b
        }(k.default);
      c.default = z, m.default.registerPlugin("graphics", z)
    }, {
      "../../const": 43,
      "../../renderers/webgl/WebGLRenderer": 81,
      "../../renderers/webgl/utils/ObjectRenderer": 91,
      "../../utils": 116,
      "./WebGLGraphicsData": 55,
      "./shaders/PrimitiveShader": 56,
      "./utils/buildCircle": 57,
      "./utils/buildPoly": 59,
      "./utils/buildRectangle": 60,
      "./utils/buildRoundedRectangle": 61
    }],
    55: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("pixi-gl-core"),
        g = d(f),
        h = function() {
          function a(b, c, d) {
            e(this, a), this.gl = b, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = g.default.GLBuffer.createVertexBuffer(b), this.indexBuffer = g.default.GLBuffer.createIndexBuffer(b), this.dirty = !0, this.glPoints = null, this.glIndices = null, this.shader = c, this.vao = new g.default.VertexArrayObject(b, d).addIndex(this.indexBuffer).addAttribute(this.buffer, c.attributes.aVertexPosition, b.FLOAT, !1, 24, 0).addAttribute(this.buffer, c.attributes.aColor, b.FLOAT, !1, 24, 8)
          }
          return a.prototype.reset = function() {
            this.points.length = 0, this.indices.length = 0
          }, a.prototype.upload = function() {
            this.glPoints = new Float32Array(this.points), this.buffer.upload(this.glPoints), this.glIndices = new Uint16Array(this.indices), this.indexBuffer.upload(this.glIndices), this.dirty = !1
          }, a.prototype.destroy = function() {
            this.color = null, this.points = null, this.indices = null, this.vao.destroy(), this.buffer.destroy(), this.indexBuffer.destroy(), this.gl = null, this.buffer = null, this.indexBuffer = null, this.glPoints = null, this.glIndices = null
          }, a
        }();
      c.default = h
    }, {
      "pixi-gl-core": 12
    }],
    56: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../../../Shader"),
        i = d(h),
        j = function(a) {
          function b(c) {
            return e(this, b), f(this, a.call(this, c, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n")))
          }
          return g(b, a), b
        }(i.default);
      c.default = j
    }, {
      "../../../Shader": 42
    }],
    57: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        var c = a.shape,
          d = c.x,
          e = c.y,
          f = void 0,
          j = void 0;
        a.type === h.SHAPES.CIRC ? (f = c.radius, j = c.radius) : (f = c.width, j = c.height);
        var k = Math.floor(30 * Math.sqrt(c.radius)) || Math.floor(15 * Math.sqrt(c.width + c.height)),
          l = 2 * Math.PI / k;
        if (a.fill) {
          var m = (0, i.hex2rgb)(a.fillColor),
            n = a.fillAlpha,
            o = m[0] * n,
            p = m[1] * n,
            q = m[2] * n,
            r = b.points,
            s = b.indices,
            t = r.length / 6;
          s.push(t);
          for (var u = 0; u < k + 1; u++) r.push(d, e, o, p, q, n), r.push(d + Math.sin(l * u) * f, e + Math.cos(l * u) * j, o, p, q, n), s.push(t++, t++);
          s.push(t - 1)
        }
        if (a.lineWidth) {
          var v = a.points;
          a.points = [];
          for (var w = 0; w < k + 1; w++) a.points.push(d + Math.sin(l * w) * f, e + Math.cos(l * w) * j);
          (0, g.default)(a, b), a.points = v
        }
      }
      c.__esModule = !0, c.default = e;
      var f = a("./buildLine"),
        g = d(f),
        h = a("../../../const"),
        i = a("../../../utils")
    }, {
      "../../../const": 43,
      "../../../utils": 116,
      "./buildLine": 58
    }],
    58: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        var c = a.points;
        if (0 !== c.length) {
          var d = new e.Point(c[0], c[1]),
            g = new e.Point(c[c.length - 2], c[c.length - 1]);
          if (d.x === g.x && d.y === g.y) {
            c = c.slice(), c.pop(), c.pop(), g = new e.Point(c[c.length - 2], c[c.length - 1]);
            var h = g.x + .5 * (d.x - g.x),
              i = g.y + .5 * (d.y - g.y);
            c.unshift(h, i), c.push(h, i)
          }
          var j = b.points,
            k = b.indices,
            l = c.length / 2,
            m = c.length,
            n = j.length / 6,
            o = a.lineWidth / 2,
            p = (0, f.hex2rgb)(a.lineColor),
            q = a.lineAlpha,
            r = p[0] * q,
            s = p[1] * q,
            t = p[2] * q,
            u = c[0],
            v = c[1],
            w = c[2],
            x = c[3],
            y = 0,
            z = 0,
            A = -(v - x),
            B = u - w,
            C = 0,
            D = 0,
            E = 0,
            F = 0,
            G = Math.sqrt(A * A + B * B);
          A /= G, B /= G, A *= o, B *= o, j.push(u - A, v - B, r, s, t, q), j.push(u + A, v + B, r, s, t, q);
          for (var H = 1; H < l - 1; ++H) {
            u = c[2 * (H - 1)], v = c[2 * (H - 1) + 1], w = c[2 * H], x = c[2 * H + 1], y = c[2 * (H + 1)], z = c[2 * (H + 1) + 1], A = -(v - x), B = u - w, G = Math.sqrt(A * A + B * B), A /= G, B /= G, A *= o, B *= o, C = -(x - z), D = w - y, G = Math.sqrt(C * C + D * D), C /= G, D /= G, C *= o, D *= o;
            var I = -B + v - (-B + x),
              J = -A + w - (-A + u),
              K = (-A + u) * (-B + x) - (-A + w) * (-B + v),
              L = -D + z - (-D + x),
              M = -C + w - (-C + y),
              N = (-C + y) * (-D + x) - (-C + w) * (-D + z),
              O = I * M - L * J;
            if (Math.abs(O) < .1) O += 10.1, j.push(w - A, x - B, r, s, t, q), j.push(w + A, x + B, r, s, t, q);
            else {
              var P = (J * N - M * K) / O,
                Q = (L * K - I * N) / O,
                R = (P - w) * (P - w) + (Q - x) * (Q - x);
              R > 196 * o * o ? (E = A - C, F = B - D, G = Math.sqrt(E * E + F * F), E /= G, F /= G, E *= o, F *= o, j.push(w - E, x - F), j.push(r, s, t, q), j.push(w + E, x + F), j.push(r, s, t, q), j.push(w - E, x - F), j.push(r, s, t, q), m++) : (j.push(P, Q), j.push(r, s, t, q), j.push(w - (P - w), x - (Q - x)), j.push(r, s, t, q))
            }
          }
          u = c[2 * (l - 2)], v = c[2 * (l - 2) + 1], w = c[2 * (l - 1)], x = c[2 * (l - 1) + 1], A = -(v - x), B = u - w, G = Math.sqrt(A * A + B * B), A /= G, B /= G, A *= o, B *= o, j.push(w - A, x - B), j.push(r, s, t, q), j.push(w + A, x + B), j.push(r, s, t, q), k.push(n);
          for (var S = 0; S < m; ++S) k.push(n++);
          k.push(n - 1)
        }
      }
      c.__esModule = !0, c.default = d;
      var e = a("../../../math"),
        f = a("../../../utils")
    }, {
      "../../../math": 67,
      "../../../utils": 116
    }],
    59: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        a.points = a.shape.points.slice();
        var c = a.points;
        if (a.fill && c.length >= 6) {
          for (var d = [], e = a.holes, f = 0; f < e.length; f++) {
            var i = e[f];
            d.push(c.length / 2), c = c.concat(i.points)
          }
          var k = b.points,
            l = b.indices,
            m = c.length / 2,
            n = (0, h.hex2rgb)(a.fillColor),
            o = a.fillAlpha,
            p = n[0] * o,
            q = n[1] * o,
            r = n[2] * o,
            s = (0, j.default)(c, d, 2);
          if (!s) return;
          for (var t = k.length / 6, u = 0; u < s.length; u += 3) l.push(s[u] + t), l.push(s[u] + t), l.push(s[u + 1] + t), l.push(s[u + 2] + t), l.push(s[u + 2] + t);
          for (var v = 0; v < m; v++) k.push(c[2 * v], c[2 * v + 1], p, q, r, o)
        }
        a.lineWidth > 0 && (0, g.default)(a, b)
      }
      c.__esModule = !0, c.default = e;
      var f = a("./buildLine"),
        g = d(f),
        h = a("../../../utils"),
        i = a("earcut"),
        j = d(i)
    }, {
      "../../../utils": 116,
      "./buildLine": 58,
      earcut: 2
    }],
    60: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        var c = a.shape,
          d = c.x,
          e = c.y,
          f = c.width,
          i = c.height;
        if (a.fill) {
          var j = (0, h.hex2rgb)(a.fillColor),
            k = a.fillAlpha,
            l = j[0] * k,
            m = j[1] * k,
            n = j[2] * k,
            o = b.points,
            p = b.indices,
            q = o.length / 6;
          o.push(d, e), o.push(l, m, n, k), o.push(d + f, e), o.push(l, m, n, k), o.push(d, e + i), o.push(l, m, n, k), o.push(d + f, e + i), o.push(l, m, n, k), p.push(q, q, q + 1, q + 2, q + 3, q + 3)
        }
        if (a.lineWidth) {
          var r = a.points;
          a.points = [d, e, d + f, e, d + f, e + i, d, e + i, d, e], (0, g.default)(a, b), a.points = r
        }
      }
      c.__esModule = !0, c.default = e;
      var f = a("./buildLine"),
        g = d(f),
        h = a("../../../utils")
    }, {
      "../../../utils": 116,
      "./buildLine": 58
    }],
    61: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        var c = a.shape,
          d = c.x,
          e = c.y,
          g = c.width,
          i = c.height,
          l = c.radius,
          m = [];
        if (m.push(d, e + l), f(d, e + i - l, d, e + i, d + l, e + i, m), f(d + g - l, e + i, d + g, e + i, d + g, e + i - l, m), f(d + g, e + l, d + g, e, d + g - l, e, m), f(d + l, e, d, e, d, e + l + 1e-10, m), a.fill) {
          for (var n = (0, k.hex2rgb)(a.fillColor), o = a.fillAlpha, p = n[0] * o, q = n[1] * o, r = n[2] * o, s = b.points, t = b.indices, u = s.length / 6, v = (0, h.default)(m, null, 2), w = 0, x = v.length; w < x; w += 3) t.push(v[w] + u), t.push(v[w] + u), t.push(v[w + 1] + u), t.push(v[w + 2] + u), t.push(v[w + 2] + u);
          for (var y = 0, z = m.length; y < z; y++) s.push(m[y], m[++y], p, q, r, o)
        }
        if (a.lineWidth) {
          var A = a.points;
          a.points = m, (0, j.default)(a, b), a.points = A
        }
      }

      function f(a, b, c, d, e, f) {
        function g(a, b, c) {
          var d = b - a;
          return a + d * c
        }
        for (var h = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [], i = 20, j = h, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0; q <= i; ++q) r = q / i, k = g(a, c, r), l = g(b, d, r), m = g(c, e, r), n = g(d, f, r), o = g(k, m, r), p = g(l, n, r), j.push(o, p);
        return j
      }
      c.__esModule = !0, c.default = e;
      var g = a("earcut"),
        h = d(g),
        i = a("./buildLine"),
        j = d(i),
        k = a("../../../utils")
    }, {
      "../../../utils": 116,
      "./buildLine": 58,
      earcut: 2
    }],
    62: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function f() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 800,
          b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 600,
          c = arguments[2],
          d = arguments[3];
        return !d && N.isWebGLSupported() ? new T.default(a, b, c) : new R.default(a, b, c)
      }
      c.__esModule = !0, c.Filter = c.SpriteMaskFilter = c.Quad = c.RenderTarget = c.ObjectRenderer = c.WebGLManager = c.Shader = c.CanvasRenderTarget = c.TextureUvs = c.VideoBaseTexture = c.BaseRenderTexture = c.RenderTexture = c.BaseTexture = c.Texture = c.CanvasGraphicsRenderer = c.GraphicsRenderer = c.GraphicsData = c.Graphics = c.TextStyle = c.Text = c.SpriteRenderer = c.CanvasTinter = c.CanvasSpriteRenderer = c.Sprite = c.TransformBase = c.TransformStatic = c.Transform = c.Container = c.DisplayObject = c.glCore = c.WebGLRenderer = c.CanvasRenderer = c.ticker = c.utils = void 0;
      var g = a("./const");
      Object.keys(g).forEach(function(a) {
        "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, {
          enumerable: !0,
          get: function() {
            return g[a]
          }
        })
      });
      var h = a("./math");
      Object.keys(h).forEach(function(a) {
        "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, {
          enumerable: !0,
          get: function() {
            return h[a]
          }
        })
      });
      var i = a("pixi-gl-core");
      Object.defineProperty(c, "glCore", {
        enumerable: !0,
        get: function() {
          return e(i).default
        }
      });
      var j = a("./display/DisplayObject");
      Object.defineProperty(c, "DisplayObject", {
        enumerable: !0,
        get: function() {
          return e(j).default
        }
      });
      var k = a("./display/Container");
      Object.defineProperty(c, "Container", {
        enumerable: !0,
        get: function() {
          return e(k).default
        }
      });
      var l = a("./display/Transform");
      Object.defineProperty(c, "Transform", {
        enumerable: !0,
        get: function() {
          return e(l).default
        }
      });
      var m = a("./display/TransformStatic");
      Object.defineProperty(c, "TransformStatic", {
        enumerable: !0,
        get: function() {
          return e(m).default
        }
      });
      var n = a("./display/TransformBase");
      Object.defineProperty(c, "TransformBase", {
        enumerable: !0,
        get: function() {
          return e(n).default
        }
      });
      var o = a("./sprites/Sprite");
      Object.defineProperty(c, "Sprite", {
        enumerable: !0,
        get: function() {
          return e(o).default
        }
      });
      var p = a("./sprites/canvas/CanvasSpriteRenderer");
      Object.defineProperty(c, "CanvasSpriteRenderer", {
        enumerable: !0,
        get: function() {
          return e(p).default
        }
      });
      var q = a("./sprites/canvas/CanvasTinter");
      Object.defineProperty(c, "CanvasTinter", {
        enumerable: !0,
        get: function() {
          return e(q).default
        }
      });
      var r = a("./sprites/webgl/SpriteRenderer");
      Object.defineProperty(c, "SpriteRenderer", {
        enumerable: !0,
        get: function() {
          return e(r).default
        }
      });
      var s = a("./text/Text");
      Object.defineProperty(c, "Text", {
        enumerable: !0,
        get: function() {
          return e(s).default
        }
      });
      var t = a("./text/TextStyle");
      Object.defineProperty(c, "TextStyle", {
        enumerable: !0,
        get: function() {
          return e(t).default
        }
      });
      var u = a("./graphics/Graphics");
      Object.defineProperty(c, "Graphics", {
        enumerable: !0,
        get: function() {
          return e(u).default
        }
      });
      var v = a("./graphics/GraphicsData");
      Object.defineProperty(c, "GraphicsData", {
        enumerable: !0,
        get: function() {
          return e(v).default
        }
      });
      var w = a("./graphics/webgl/GraphicsRenderer");
      Object.defineProperty(c, "GraphicsRenderer", {
        enumerable: !0,
        get: function() {
          return e(w).default
        }
      });
      var x = a("./graphics/canvas/CanvasGraphicsRenderer");
      Object.defineProperty(c, "CanvasGraphicsRenderer", {
        enumerable: !0,
        get: function() {
          return e(x).default
        }
      });
      var y = a("./textures/Texture");
      Object.defineProperty(c, "Texture", {
        enumerable: !0,
        get: function() {
          return e(y).default
        }
      });
      var z = a("./textures/BaseTexture");
      Object.defineProperty(c, "BaseTexture", {
        enumerable: !0,
        get: function() {
          return e(z).default
        }
      });
      var A = a("./textures/RenderTexture");
      Object.defineProperty(c, "RenderTexture", {
        enumerable: !0,
        get: function() {
          return e(A).default
        }
      });
      var B = a("./textures/BaseRenderTexture");
      Object.defineProperty(c, "BaseRenderTexture", {
        enumerable: !0,
        get: function() {
          return e(B).default
        }
      });
      var C = a("./textures/VideoBaseTexture");
      Object.defineProperty(c, "VideoBaseTexture", {
        enumerable: !0,
        get: function() {
          return e(C).default
        }
      });
      var D = a("./textures/TextureUvs");
      Object.defineProperty(c, "TextureUvs", {
        enumerable: !0,
        get: function() {
          return e(D).default
        }
      });
      var E = a("./renderers/canvas/utils/CanvasRenderTarget");
      Object.defineProperty(c, "CanvasRenderTarget", {
        enumerable: !0,
        get: function() {
          return e(E).default
        }
      });
      var F = a("./Shader");
      Object.defineProperty(c, "Shader", {
        enumerable: !0,
        get: function() {
          return e(F).default
        }
      });
      var G = a("./renderers/webgl/managers/WebGLManager");
      Object.defineProperty(c, "WebGLManager", {
        enumerable: !0,
        get: function() {
          return e(G).default
        }
      });
      var H = a("./renderers/webgl/utils/ObjectRenderer");
      Object.defineProperty(c, "ObjectRenderer", {
        enumerable: !0,
        get: function() {
          return e(H).default
        }
      });
      var I = a("./renderers/webgl/utils/RenderTarget");
      Object.defineProperty(c, "RenderTarget", {
        enumerable: !0,
        get: function() {
          return e(I).default
        }
      });
      var J = a("./renderers/webgl/utils/Quad");
      Object.defineProperty(c, "Quad", {
        enumerable: !0,
        get: function() {
          return e(J).default
        }
      });
      var K = a("./renderers/webgl/filters/spriteMask/SpriteMaskFilter");
      Object.defineProperty(c, "SpriteMaskFilter", {
        enumerable: !0,
        get: function() {
          return e(K).default
        }
      });
      var L = a("./renderers/webgl/filters/Filter");
      Object.defineProperty(c, "Filter", {
        enumerable: !0,
        get: function() {
          return e(L).default
        }
      }), c.autoDetectRenderer = f;
      var M = a("./utils"),
        N = d(M),
        O = a("./ticker"),
        P = d(O),
        Q = a("./renderers/canvas/CanvasRenderer"),
        R = e(Q),
        S = a("./renderers/webgl/WebGLRenderer"),
        T = e(S);
      c.utils = N, c.ticker = P, c.CanvasRenderer = R.default, c.WebGLRenderer = T.default
    }, {
      "./Shader": 42,
      "./const": 43,
      "./display/Container": 45,
      "./display/DisplayObject": 46,
      "./display/Transform": 47,
      "./display/TransformBase": 48,
      "./display/TransformStatic": 49,
      "./graphics/Graphics": 50,
      "./graphics/GraphicsData": 51,
      "./graphics/canvas/CanvasGraphicsRenderer": 52,
      "./graphics/webgl/GraphicsRenderer": 54,
      "./math": 67,
      "./renderers/canvas/CanvasRenderer": 74,
      "./renderers/canvas/utils/CanvasRenderTarget": 76,
      "./renderers/webgl/WebGLRenderer": 81,
      "./renderers/webgl/filters/Filter": 83,
      "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 86,
      "./renderers/webgl/managers/WebGLManager": 90,
      "./renderers/webgl/utils/ObjectRenderer": 91,
      "./renderers/webgl/utils/Quad": 92,
      "./renderers/webgl/utils/RenderTarget": 93,
      "./sprites/Sprite": 98,
      "./sprites/canvas/CanvasSpriteRenderer": 99,
      "./sprites/canvas/CanvasTinter": 100,
      "./sprites/webgl/SpriteRenderer": 102,
      "./text/Text": 104,
      "./text/TextStyle": 105,
      "./textures/BaseRenderTexture": 106,
      "./textures/BaseTexture": 107,
      "./textures/RenderTexture": 108,
      "./textures/Texture": 109,
      "./textures/TextureUvs": 110,
      "./textures/VideoBaseTexture": 111,
      "./ticker": 113,
      "./utils": 116,
      "pixi-gl-core": 12
    }],
    63: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        return a < 0 ? -1 : a > 0 ? 1 : 0
      }

      function f() {
        for (var a = 0; a < 16; a++) {
          var b = [];
          n.push(b);
          for (var c = 0; c < 16; c++)
            for (var d = e(i[a] * i[c] + k[a] * j[c]), f = e(j[a] * i[c] + l[a] * j[c]), g = e(i[a] * k[c] + k[a] * l[c]), o = e(j[a] * k[c] + l[a] * l[c]), p = 0; p < 16; p++)
              if (i[p] === d && j[p] === f && k[p] === g && l[p] === o) {
                b.push(p);
                break
              }
        }
        for (var q = 0; q < 16; q++) {
          var r = new h.default;
          r.set(i[q], j[q], k[q], l[q], 0, 0), m.push(r)
        }
      }
      c.__esModule = !0;
      var g = a("./Matrix"),
        h = d(g),
        i = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
        j = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
        k = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
        l = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
        m = [],
        n = [];
      f();
      var o = {
        E: 0,
        SE: 1,
        S: 2,
        SW: 3,
        W: 4,
        NW: 5,
        N: 6,
        NE: 7,
        MIRROR_VERTICAL: 8,
        MIRROR_HORIZONTAL: 12,
        uX: function(a) {
          return i[a]
        },
        uY: function(a) {
          return j[a]
        },
        vX: function(a) {
          return k[a]
        },
        vY: function(a) {
          return l[a]
        },
        inv: function(a) {
          return 8 & a ? 15 & a : 7 & -a
        },
        add: function(a, b) {
          return n[a][b]
        },
        sub: function(a, b) {
          return n[a][o.inv(b)]
        },
        rotate180: function(a) {
          return 4 ^ a
        },
        isSwapWidthHeight: function(a) {
          return 2 === (3 & a)
        },
        byDirection: function(a, b) {
          return 2 * Math.abs(a) <= Math.abs(b) ? b >= 0 ? o.S : o.N : 2 * Math.abs(b) <= Math.abs(a) ? a > 0 ? o.E : o.W : b > 0 ? a > 0 ? o.SE : o.SW : a > 0 ? o.NE : o.NW
        },
        matrixAppendRotationInv: function(a, b) {
          var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            e = m[o.inv(b)];
          e.tx = c, e.ty = d, a.append(e)
        }
      };
      c.default = o
    }, {
      "./Matrix": 64
    }],
    64: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        g = a("./Point"),
        h = d(g),
        i = function() {
          function a() {
            e(this, a), this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this.array = null
          }
          return a.prototype.fromArray = function(a) {
            this.a = a[0], this.b = a[1], this.c = a[3], this.d = a[4], this.tx = a[2], this.ty = a[5]
          }, a.prototype.set = function(a, b, c, d, e, f) {
            return this.a = a, this.b = b, this.c = c, this.d = d, this.tx = e, this.ty = f, this
          }, a.prototype.toArray = function(a, b) {
            this.array || (this.array = new Float32Array(9));
            var c = b || this.array;
            return a ? (c[0] = this.a, c[1] = this.b, c[2] = 0, c[3] = this.c, c[4] = this.d, c[5] = 0, c[6] = this.tx, c[7] = this.ty, c[8] = 1) : (c[0] = this.a, c[1] = this.c, c[2] = this.tx, c[3] = this.b, c[4] = this.d, c[5] = this.ty, c[6] = 0, c[7] = 0, c[8] = 1), c
          }, a.prototype.apply = function(a, b) {
            b = b || new h.default;
            var c = a.x,
              d = a.y;
            return b.x = this.a * c + this.c * d + this.tx, b.y = this.b * c + this.d * d + this.ty, b
          }, a.prototype.applyInverse = function(a, b) {
            b = b || new h.default;
            var c = 1 / (this.a * this.d + this.c * -this.b),
              d = a.x,
              e = a.y;
            return b.x = this.d * c * d + -this.c * c * e + (this.ty * this.c - this.tx * this.d) * c, b.y = this.a * c * e + -this.b * c * d + (-this.ty * this.a + this.tx * this.b) * c, b
          }, a.prototype.translate = function(a, b) {
            return this.tx += a, this.ty += b, this
          }, a.prototype.scale = function(a, b) {
            return this.a *= a, this.d *= b, this.c *= a, this.b *= b, this.tx *= a, this.ty *= b, this
          }, a.prototype.rotate = function(a) {
            var b = Math.cos(a),
              c = Math.sin(a),
              d = this.a,
              e = this.c,
              f = this.tx;
            return this.a = d * b - this.b * c, this.b = d * c + this.b * b, this.c = e * b - this.d * c, this.d = e * c + this.d * b, this.tx = f * b - this.ty * c, this.ty = f * c + this.ty * b, this
          }, a.prototype.append = function(a) {
            var b = this.a,
              c = this.b,
              d = this.c,
              e = this.d;
            return this.a = a.a * b + a.b * d,
              this.b = a.a * c + a.b * e, this.c = a.c * b + a.d * d, this.d = a.c * c + a.d * e, this.tx = a.tx * b + a.ty * d + this.tx, this.ty = a.tx * c + a.ty * e + this.ty, this
          }, a.prototype.setTransform = function(a, b, c, d, e, f, g, h, i) {
            var j = Math.sin(g),
              k = Math.cos(g),
              l = Math.cos(i),
              m = Math.sin(i),
              n = -Math.sin(h),
              o = Math.cos(h),
              p = k * e,
              q = j * e,
              r = -j * f,
              s = k * f;
            return this.a = l * p + m * r, this.b = l * q + m * s, this.c = n * p + o * r, this.d = n * q + o * s, this.tx = a + (c * p + d * r), this.ty = b + (c * q + d * s), this
          }, a.prototype.prepend = function(a) {
            var b = this.tx;
            if (1 !== a.a || 0 !== a.b || 0 !== a.c || 1 !== a.d) {
              var c = this.a,
                d = this.c;
              this.a = c * a.a + this.b * a.c, this.b = c * a.b + this.b * a.d, this.c = d * a.a + this.d * a.c, this.d = d * a.b + this.d * a.d
            }
            return this.tx = b * a.a + this.ty * a.c + a.tx, this.ty = b * a.b + this.ty * a.d + a.ty, this
          }, a.prototype.decompose = function(a) {
            var b = this.a,
              c = this.b,
              d = this.c,
              e = this.d,
              f = Math.atan2(-d, e),
              g = Math.atan2(c, b),
              h = Math.abs(1 - f / g);
            return h < 1e-5 ? (a.rotation = g, b < 0 && e >= 0 && (a.rotation += a.rotation <= 0 ? Math.PI : -Math.PI), a.skew.x = a.skew.y = 0) : (a.skew.x = f, a.skew.y = g), a.scale.x = Math.sqrt(b * b + c * c), a.scale.y = Math.sqrt(d * d + e * e), a.position.x = this.tx, a.position.y = this.ty, a
          }, a.prototype.invert = function() {
            var a = this.a,
              b = this.b,
              c = this.c,
              d = this.d,
              e = this.tx,
              f = a * d - b * c;
            return this.a = d / f, this.b = -b / f, this.c = -c / f, this.d = a / f, this.tx = (c * this.ty - d * e) / f, this.ty = -(a * this.ty - b * e) / f, this
          }, a.prototype.identity = function() {
            return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
          }, a.prototype.clone = function() {
            var b = new a;
            return b.a = this.a, b.b = this.b, b.c = this.c, b.d = this.d, b.tx = this.tx, b.ty = this.ty, b
          }, a.prototype.copy = function(a) {
            return a.a = this.a, a.b = this.b, a.c = this.c, a.d = this.d, a.tx = this.tx, a.ty = this.ty, a
          }, f(a, null, [{
            key: "IDENTITY",
            get: function() {
              return new a
            }
          }, {
            key: "TEMP_MATRIX",
            get: function() {
              return new a
            }
          }]), a
        }();
      c.default = i
    }, {
      "./Point": 66
    }],
    65: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        f = function() {
          function a(b, c) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            d(this, a), this._x = e, this._y = f, this.cb = b, this.scope = c
          }
          return a.prototype.set = function(a, b) {
            var c = a || 0,
              d = b || (0 !== b ? c : 0);
            this._x === c && this._y === d || (this._x = c, this._y = d, this.cb.call(this.scope))
          }, a.prototype.copy = function(a) {
            this._x === a.x && this._y === a.y || (this._x = a.x, this._y = a.y, this.cb.call(this.scope))
          }, e(a, [{
            key: "x",
            get: function() {
              return this._x
            },
            set: function(a) {
              this._x !== a && (this._x = a, this.cb.call(this.scope))
            }
          }, {
            key: "y",
            get: function() {
              return this._y
            },
            set: function(a) {
              this._y !== a && (this._y = a, this.cb.call(this.scope))
            }
          }]), a
        }();
      c.default = f
    }, {}],
    66: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
        function a() {
          var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          d(this, a), this.x = b, this.y = c
        }
        return a.prototype.clone = function() {
          return new a(this.x, this.y)
        }, a.prototype.copy = function(a) {
          this.set(a.x, a.y)
        }, a.prototype.equals = function(a) {
          return a.x === this.x && a.y === this.y
        }, a.prototype.set = function(a, b) {
          this.x = a || 0, this.y = b || (0 !== b ? this.x : 0)
        }, a
      }();
      c.default = e
    }, {}],
    67: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./Point");
      Object.defineProperty(c, "Point", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./ObservablePoint");
      Object.defineProperty(c, "ObservablePoint", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      });
      var g = a("./Matrix");
      Object.defineProperty(c, "Matrix", {
        enumerable: !0,
        get: function() {
          return d(g).default
        }
      });
      var h = a("./GroupD8");
      Object.defineProperty(c, "GroupD8", {
        enumerable: !0,
        get: function() {
          return d(h).default
        }
      });
      var i = a("./shapes/Circle");
      Object.defineProperty(c, "Circle", {
        enumerable: !0,
        get: function() {
          return d(i).default
        }
      });
      var j = a("./shapes/Ellipse");
      Object.defineProperty(c, "Ellipse", {
        enumerable: !0,
        get: function() {
          return d(j).default
        }
      });
      var k = a("./shapes/Polygon");
      Object.defineProperty(c, "Polygon", {
        enumerable: !0,
        get: function() {
          return d(k).default
        }
      });
      var l = a("./shapes/Rectangle");
      Object.defineProperty(c, "Rectangle", {
        enumerable: !0,
        get: function() {
          return d(l).default
        }
      });
      var m = a("./shapes/RoundedRectangle");
      Object.defineProperty(c, "RoundedRectangle", {
        enumerable: !0,
        get: function() {
          return d(m).default
        }
      })
    }, {
      "./GroupD8": 63,
      "./Matrix": 64,
      "./ObservablePoint": 65,
      "./Point": 66,
      "./shapes/Circle": 68,
      "./shapes/Ellipse": 69,
      "./shapes/Polygon": 70,
      "./shapes/Rectangle": 71,
      "./shapes/RoundedRectangle": 72
    }],
    68: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("./Rectangle"),
        g = d(f),
        h = a("../../const"),
        i = function() {
          function a() {
            var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            e(this, a), this.x = b, this.y = c, this.radius = d, this.type = h.SHAPES.CIRC
          }
          return a.prototype.clone = function() {
            return new a(this.x, this.y, this.radius)
          }, a.prototype.contains = function(a, b) {
            if (this.radius <= 0) return !1;
            var c = this.radius * this.radius,
              d = this.x - a,
              e = this.y - b;
            return d *= d, e *= e, d + e <= c
          }, a.prototype.getBounds = function() {
            return new g.default(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
          }, a
        }();
      c.default = i
    }, {
      "../../const": 43,
      "./Rectangle": 71
    }],
    69: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("./Rectangle"),
        g = d(f),
        h = a("../../const"),
        i = function() {
          function a() {
            var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            e(this, a), this.x = b, this.y = c, this.width = d, this.height = f, this.type = h.SHAPES.ELIP
          }
          return a.prototype.clone = function() {
            return new a(this.x, this.y, this.width, this.height)
          }, a.prototype.contains = function(a, b) {
            if (this.width <= 0 || this.height <= 0) return !1;
            var c = (a - this.x) / this.width,
              d = (b - this.y) / this.height;
            return c *= c, d *= d, c + d <= 1
          }, a.prototype.getBounds = function() {
            return new g.default(this.x - this.width, this.y - this.height, this.width, this.height)
          }, a
        }();
      c.default = i
    }, {
      "../../const": 43,
      "./Rectangle": 71
    }],
    70: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("../Point"),
        g = d(f),
        h = a("../../const"),
        i = function() {
          function a() {
            for (var b = arguments.length, c = Array(b), d = 0; d < b; d++) c[d] = arguments[d];
            if (e(this, a), Array.isArray(c[0]) && (c = c[0]), c[0] instanceof g.default) {
              for (var f = [], i = 0, j = c.length; i < j; i++) f.push(c[i].x, c[i].y);
              c = f
            }
            this.closed = !0, this.points = c, this.type = h.SHAPES.POLY
          }
          return a.prototype.clone = function() {
            return new a(this.points.slice())
          }, a.prototype.close = function() {
            var a = this.points;
            a[0] === a[a.length - 2] && a[1] === a[a.length - 1] || a.push(a[0], a[1])
          }, a.prototype.contains = function(a, b) {
            for (var c = !1, d = this.points.length / 2, e = 0, f = d - 1; e < d; f = ++e) {
              var g = this.points[2 * e],
                h = this.points[2 * e + 1],
                i = this.points[2 * f],
                j = this.points[2 * f + 1],
                k = h > b != j > b && a < (i - g) * ((b - h) / (j - h)) + g;
              k && (c = !c)
            }
            return c
          }, a
        }();
      c.default = i
    }, {
      "../../const": 43,
      "../Point": 66
    }],
    71: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        f = a("../../const"),
        g = function() {
          function a() {
            var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              g = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            d(this, a), this.x = b, this.y = c, this.width = e, this.height = g, this.type = f.SHAPES.RECT
          }
          return a.prototype.clone = function() {
            return new a(this.x, this.y, this.width, this.height)
          }, a.prototype.copy = function(a) {
            return this.x = a.x, this.y = a.y, this.width = a.width, this.height = a.height, this
          }, a.prototype.contains = function(a, b) {
            return !(this.width <= 0 || this.height <= 0) && a >= this.x && a < this.x + this.width && b >= this.y && b < this.y + this.height
          }, a.prototype.pad = function(a, b) {
            a = a || 0, b = b || (0 !== b ? a : 0), this.x -= a, this.y -= b, this.width += 2 * a, this.height += 2 * b
          }, a.prototype.fit = function(a) {
            this.x < a.x && (this.width += this.x, this.width < 0 && (this.width = 0), this.x = a.x), this.y < a.y && (this.height += this.y, this.height < 0 && (this.height = 0), this.y = a.y), this.x + this.width > a.x + a.width && (this.width = a.width - this.x, this.width < 0 && (this.width = 0)), this.y + this.height > a.y + a.height && (this.height = a.height - this.y, this.height < 0 && (this.height = 0))
          }, a.prototype.enlarge = function(b) {
            if (b !== a.EMPTY) {
              var c = Math.min(this.x, b.x),
                d = Math.max(this.x + this.width, b.x + b.width),
                e = Math.min(this.y, b.y),
                f = Math.max(this.y + this.height, b.y + b.height);
              this.x = c, this.width = d - c, this.y = e, this.height = f - e
            }
          }, e(a, [{
            key: "left",
            get: function() {
              return this.x
            }
          }, {
            key: "right",
            get: function() {
              return this.x + this.width
            }
          }, {
            key: "top",
            get: function() {
              return this.y
            }
          }, {
            key: "bottom",
            get: function() {
              return this.y + this.height
            }
          }], [{
            key: "EMPTY",
            get: function() {
              return new a(0, 0, 0, 0)
            }
          }]), a
        }();
      c.default = g
    }, {
      "../../const": 43
    }],
    72: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = a("../../const"),
        f = function() {
          function a() {
            var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              f = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              g = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
              h = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 20;
            d(this, a), this.x = b, this.y = c, this.width = f, this.height = g, this.radius = h, this.type = e.SHAPES.RREC
          }
          return a.prototype.clone = function() {
            return new a(this.x, this.y, this.width, this.height, this.radius)
          }, a.prototype.contains = function(a, b) {
            return !(this.width <= 0 || this.height <= 0) && a >= this.x && a <= this.x + this.width && b >= this.y && b <= this.y + this.height
          }, a
        }();
      c.default = f
    }, {
      "../../const": 43
    }],
    73: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../utils"),
        j = a("../math"),
        k = a("../const"),
        l = a("../display/Container"),
        m = d(l),
        n = a("../textures/RenderTexture"),
        o = d(n),
        p = a("eventemitter3"),
        q = d(p),
        r = new j.Matrix,
        s = function(a) {
          function b(c, d, g, h) {
            e(this, b);
            var j = f(this, a.call(this));
            if ((0, i.sayHello)(c), h)
              for (var l in k.DEFAULT_RENDER_OPTIONS) "undefined" == typeof h[l] && (h[l] = k.DEFAULT_RENDER_OPTIONS[l]);
            else h = k.DEFAULT_RENDER_OPTIONS;
            return j.type = k.RENDERER_TYPE.UNKNOWN, j.width = d || 800, j.height = g || 600, j.view = h.view || document.createElement("canvas"), j.resolution = h.resolution || k.RESOLUTION, j.transparent = h.transparent, j.autoResize = h.autoResize || !1, j.blendModes = null, j.preserveDrawingBuffer = h.preserveDrawingBuffer, j.clearBeforeRender = h.clearBeforeRender, j.roundPixels = h.roundPixels, j._backgroundColor = 0, j._backgroundColorRgba = [0, 0, 0, 0], j._backgroundColorString = "#000000", j.backgroundColor = h.backgroundColor || j._backgroundColor, j._tempDisplayObjectParent = new m.default, j._lastObjectRendered = j._tempDisplayObjectParent, j
          }
          return g(b, a), b.prototype.resize = function(a, b) {
            this.width = a * this.resolution, this.height = b * this.resolution, this.view.width = this.width, this.view.height = this.height, this.autoResize && (this.view.style.width = this.width / this.resolution + "px", this.view.style.height = this.height / this.resolution + "px")
          }, b.prototype.generateTexture = function(a, b, c) {
            var d = a.getLocalBounds(),
              e = o.default.create(0 | d.width, 0 | d.height, b, c);
            return r.tx = -d.x, r.ty = -d.y, this.render(a, e, !1, r, !0), e
          }, b.prototype.destroy = function(a) {
            a && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.type = k.RENDERER_TYPE.UNKNOWN, this.width = 0, this.height = 0, this.view = null, this.resolution = 0, this.transparent = !1, this.autoResize = !1, this.blendModes = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, this.roundPixels = !1, this._backgroundColor = 0, this._backgroundColorRgba = null, this._backgroundColorString = null, this.backgroundColor = 0, this._tempDisplayObjectParent = null, this._lastObjectRendered = null
          }, h(b, [{
            key: "backgroundColor",
            get: function() {
              return this._backgroundColor
            },
            set: function(a) {
              this._backgroundColor = a, this._backgroundColorString = (0, i.hex2string)(a), (0, i.hex2rgb)(a, this._backgroundColorRgba)
            }
          }]), b
        }(q.default);
      c.default = s
    }, {
      "../const": 43,
      "../display/Container": 45,
      "../math": 67,
      "../textures/RenderTexture": 108,
      "../utils": 116,
      eventemitter3: 3
    }],
    74: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../SystemRenderer"),
        i = d(h),
        j = a("./utils/CanvasMaskManager"),
        k = d(j),
        l = a("./utils/CanvasRenderTarget"),
        m = d(l),
        n = a("./utils/mapCanvasBlendModesToPixi"),
        o = d(n),
        p = a("../../utils"),
        q = a("../../const"),
        r = function(a) {
          function b(c, d) {
            var g = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e(this, b);
            var h = f(this, a.call(this, "Canvas", c, d, g));
            return h.type = q.RENDERER_TYPE.CANVAS, h.rootContext = h.view.getContext("2d", {
              alpha: h.transparent
            }), h.refresh = !0, h.maskManager = new k.default(h), h.smoothProperty = "imageSmoothingEnabled", h.rootContext.imageSmoothingEnabled || (h.rootContext.webkitImageSmoothingEnabled ? h.smoothProperty = "webkitImageSmoothingEnabled" : h.rootContext.mozImageSmoothingEnabled ? h.smoothProperty = "mozImageSmoothingEnabled" : h.rootContext.oImageSmoothingEnabled ? h.smoothProperty = "oImageSmoothingEnabled" : h.rootContext.msImageSmoothingEnabled && (h.smoothProperty = "msImageSmoothingEnabled")), h.initPlugins(), h.blendModes = (0, o.default)(), h._activeBlendMode = null, h.context = null, h.renderingToScreen = !1, h.resize(c, d), h
          }
          return g(b, a), b.prototype.render = function(a, b, c, d, e) {
            if (this.view) {
              this.renderingToScreen = !b, this.emit("prerender"), b ? (b = b.baseTexture || b, b._canvasRenderTarget || (b._canvasRenderTarget = new m.default(b.width, b.height, b.resolution), b.source = b._canvasRenderTarget.canvas, b.valid = !0), this.context = b._canvasRenderTarget.context, this.resolution = b._canvasRenderTarget.resolution) : this.context = this.rootContext;
              var f = this.context;
              if (b || (this._lastObjectRendered = a), !e) {
                var g = a.parent,
                  h = this._tempDisplayObjectParent.transform.worldTransform;
                d ? d.copy(h) : h.identity(), a.parent = this._tempDisplayObjectParent, a.updateTransform(), a.parent = g
              }
              f.setTransform(1, 0, 0, 1, 0, 0), f.globalAlpha = 1, f.globalCompositeOperation = this.blendModes[q.BLEND_MODES.NORMAL], navigator.isCocoonJS && this.view.screencanvas && (f.fillStyle = "black", f.clear()), (void 0 !== c ? c : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? f.clearRect(0, 0, this.width, this.height) : (f.fillStyle = this._backgroundColorString, f.fillRect(0, 0, this.width, this.height)));
              var i = this.context;
              this.context = f, a.renderCanvas(this), this.context = i, this.emit("postrender")
            }
          }, b.prototype.setBlendMode = function(a) {
            this._activeBlendMode !== a && (this.context.globalCompositeOperation = this.blendModes[a])
          }, b.prototype.destroy = function(b) {
            this.destroyPlugins(), a.prototype.destroy.call(this, b), this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, this.smoothProperty = null
          }, b.prototype.resize = function(b, c) {
            a.prototype.resize.call(this, b, c), this.smoothProperty && (this.rootContext[this.smoothProperty] = q.SCALE_MODES.DEFAULT === q.SCALE_MODES.LINEAR)
          }, b
        }(i.default);
      c.default = r, p.pluginTarget.mixin(r)
    }, {
      "../../const": 43,
      "../../utils": 116,
      "../SystemRenderer": 73,
      "./utils/CanvasMaskManager": 75,
      "./utils/CanvasRenderTarget": 76,
      "./utils/mapCanvasBlendModesToPixi": 78
    }],
    75: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = a("../../../const"),
        f = function() {
          function a(b) {
            d(this, a), this.renderer = b
          }
          return a.prototype.pushMask = function(a) {
            var b = this.renderer;
            b.context.save();
            var c = a.alpha,
              d = a.transform.worldTransform,
              e = b.resolution;
            b.context.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e, d.ty * e), a._texture || (this.renderGraphicsShape(a), b.context.clip()), a.worldAlpha = c
          }, a.prototype.renderGraphicsShape = function(a) {
            var b = this.renderer.context,
              c = a.graphicsData.length;
            if (0 !== c) {
              b.beginPath();
              for (var d = 0; d < c; d++) {
                var f = a.graphicsData[d],
                  g = f.shape;
                if (f.type === e.SHAPES.POLY) {
                  var h = g.points;
                  b.moveTo(h[0], h[1]);
                  for (var i = 1; i < h.length / 2; i++) b.lineTo(h[2 * i], h[2 * i + 1]);
                  h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && b.closePath()
                } else if (f.type === e.SHAPES.RECT) b.rect(g.x, g.y, g.width, g.height), b.closePath();
                else if (f.type === e.SHAPES.CIRC) b.arc(g.x, g.y, g.radius, 0, 2 * Math.PI), b.closePath();
                else if (f.type === e.SHAPES.ELIP) {
                  var j = 2 * g.width,
                    k = 2 * g.height,
                    l = g.x - j / 2,
                    m = g.y - k / 2,
                    n = .5522848,
                    o = j / 2 * n,
                    p = k / 2 * n,
                    q = l + j,
                    r = m + k,
                    s = l + j / 2,
                    t = m + k / 2;
                  b.moveTo(l, t), b.bezierCurveTo(l, t - p, s - o, m, s, m), b.bezierCurveTo(s + o, m, q, t - p, q, t), b.bezierCurveTo(q, t + p, s + o, r, s, r), b.bezierCurveTo(s - o, r, l, t + p, l, t), b.closePath()
                } else if (f.type === e.SHAPES.RREC) {
                  var u = g.x,
                    v = g.y,
                    w = g.width,
                    x = g.height,
                    y = g.radius,
                    z = Math.min(w, x) / 2 | 0;
                  y = y > z ? z : y, b.moveTo(u, v + y), b.lineTo(u, v + x - y), b.quadraticCurveTo(u, v + x, u + y, v + x), b.lineTo(u + w - y, v + x), b.quadraticCurveTo(u + w, v + x, u + w, v + x - y), b.lineTo(u + w, v + y), b.quadraticCurveTo(u + w, v, u + w - y, v), b.lineTo(u + y, v), b.quadraticCurveTo(u, v, u, v + y), b.closePath()
                }
              }
            }
          }, a.prototype.popMask = function(a) {
            a.context.restore()
          }, a.prototype.destroy = function() {}, a
        }();
      c.default = f
    }, {
      "../../../const": 43
    }],
    76: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        f = a("../../../const"),
        g = function() {
          function a(b, c, e) {
            d(this, a), this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = e || f.RESOLUTION, this.resize(b, c)
          }
          return a.prototype.clear = function() {
            this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
          }, a.prototype.resize = function(a, b) {
            this.canvas.width = a * this.resolution, this.canvas.height = b * this.resolution
          }, a.prototype.destroy = function() {
            this.context = null, this.canvas = null
          }, e(a, [{
            key: "width",
            get: function() {
              return this.canvas.width
            },
            set: function(a) {
              this.canvas.width = a
            }
          }, {
            key: "height",
            get: function() {
              return this.canvas.height
            },
            set: function(a) {
              this.canvas.height = a
            }
          }]), a
        }();
      c.default = g
    }, {
      "../../../const": 43
    }],
    77: [function(a, b, c) {
      "use strict";

      function d(a) {
        var b = document.createElement("canvas");
        b.width = 6, b.height = 1;
        var c = b.getContext("2d");
        return c.fillStyle = a, c.fillRect(0, 0, 6, 1), b
      }

      function e() {
        if ("undefined" == typeof document) return !1;
        var a = d("#ff00ff"),
          b = d("#ffff00"),
          c = document.createElement("canvas");
        c.width = 6, c.height = 1;
        var e = c.getContext("2d");
        e.globalCompositeOperation = "multiply", e.drawImage(a, 0, 0), e.drawImage(b, 2, 0);
        var f = e.getImageData(2, 0, 1, 1);
        if (!f) return !1;
        var g = f.data;
        return 255 === g[0] && 0 === g[1] && 0 === g[2]
      }
      c.__esModule = !0, c.default = e
    }, {}],
    78: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return (0, h.default)() ? (a[f.BLEND_MODES.NORMAL] = "source-over", a[f.BLEND_MODES.ADD] = "lighter", a[f.BLEND_MODES.MULTIPLY] = "multiply", a[f.BLEND_MODES.SCREEN] = "screen", a[f.BLEND_MODES.OVERLAY] = "overlay", a[f.BLEND_MODES.DARKEN] = "darken", a[f.BLEND_MODES.LIGHTEN] = "lighten", a[f.BLEND_MODES.COLOR_DODGE] = "color-dodge", a[f.BLEND_MODES.COLOR_BURN] = "color-burn", a[f.BLEND_MODES.HARD_LIGHT] = "hard-light", a[f.BLEND_MODES.SOFT_LIGHT] = "soft-light", a[f.BLEND_MODES.DIFFERENCE] = "difference", a[f.BLEND_MODES.EXCLUSION] = "exclusion", a[f.BLEND_MODES.HUE] = "hue", a[f.BLEND_MODES.SATURATION] = "saturate", a[f.BLEND_MODES.COLOR] = "color", a[f.BLEND_MODES.LUMINOSITY] = "luminosity") : (a[f.BLEND_MODES.NORMAL] = "source-over", a[f.BLEND_MODES.ADD] = "lighter", a[f.BLEND_MODES.MULTIPLY] = "source-over", a[f.BLEND_MODES.SCREEN] = "source-over", a[f.BLEND_MODES.OVERLAY] = "source-over", a[f.BLEND_MODES.DARKEN] = "source-over", a[f.BLEND_MODES.LIGHTEN] = "source-over", a[f.BLEND_MODES.COLOR_DODGE] = "source-over", a[f.BLEND_MODES.COLOR_BURN] = "source-over", a[f.BLEND_MODES.HARD_LIGHT] = "source-over", a[f.BLEND_MODES.SOFT_LIGHT] = "source-over", a[f.BLEND_MODES.DIFFERENCE] = "source-over", a[f.BLEND_MODES.EXCLUSION] = "source-over", a[f.BLEND_MODES.HUE] = "source-over", a[f.BLEND_MODES.SATURATION] = "source-over", a[f.BLEND_MODES.COLOR] = "source-over", a[f.BLEND_MODES.LUMINOSITY] = "source-over"), a
      }
      c.__esModule = !0, c.default = e;
      var f = a("../../../const"),
        g = a("./canUseNewCanvasBlendModes"),
        h = d(g)
    }, {
      "../../../const": 43,
      "./canUseNewCanvasBlendModes": 77
    }],
    79: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = a("../../const"),
        f = function() {
          function a(b) {
            d(this, a), this.renderer = b, this.count = 0, this.checkCount = 0, this.maxIdle = 3600, this.checkCountMax = 600, this.mode = e.GC_MODES.DEFAULT
          }
          return a.prototype.update = function() {
            this.count++, this.mode !== e.GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run()))
          }, a.prototype.run = function() {
            for (var a = this.renderer.textureManager, b = a._managedTextures, c = !1, d = 0; d < b.length; d++) {
              var e = b[d];
              !e._glRenderTargets && this.count - e.touched > this.maxIdle && (a.destroyTexture(e, !0), b[d] = null, c = !0)
            }
            if (c) {
              for (var f = 0, g = 0; g < b.length; g++) null !== b[g] && (b[f++] = b[g]);
              b.length = f
            }
          }, a.prototype.unload = function(a) {
            var b = this.renderer.textureManager;
            a._texture && b.destroyTexture(a._texture, !0);
            for (var c = a.children.length - 1; c >= 0; c--) this.unload(a.children[c])
          }, a
        }();
      c.default = f
    }, {
      "../../const": 43
    }],
    80: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("pixi-gl-core"),
        g = a("../../const"),
        h = a("./utils/RenderTarget"),
        i = d(h),
        j = a("../../utils"),
        k = function() {
          function a(b) {
            e(this, a), this.renderer = b, this.gl = b.gl, this._managedTextures = []
          }
          return a.prototype.bindTexture = function() {}, a.prototype.getTexture = function() {}, a.prototype.updateTexture = function(a) {
            a = a.baseTexture || a;
            var b = !!a._glRenderTargets;
            if (!a.hasLoaded) return null;
            var c = a._glTextures[this.renderer.CONTEXT_UID];
            if (c) b ? a._glRenderTargets[this.renderer.CONTEXT_UID].resize(a.width, a.height) : c.upload(a.source);
            else {
              if (b) {
                var d = new i.default(this.gl, a.width, a.height, a.scaleMode, a.resolution);
                d.resize(a.width, a.height), a._glRenderTargets[this.renderer.CONTEXT_UID] = d, c = d.texture
              } else c = new f.GLTexture(this.gl), c.premultiplyAlpha = !0, c.upload(a.source);
              a._glTextures[this.renderer.CONTEXT_UID] = c, a.on("update", this.updateTexture, this), a.on("dispose", this.destroyTexture, this), this._managedTextures.push(a), a.isPowerOfTwo ? (a.mipmap && c.enableMipmap(), a.wrapMode === g.WRAP_MODES.CLAMP ? c.enableWrapClamp() : a.wrapMode === g.WRAP_MODES.REPEAT ? c.enableWrapRepeat() : c.enableWrapMirrorRepeat()) : c.enableWrapClamp(), a.scaleMode === g.SCALE_MODES.NEAREST ? c.enableNearestScaling() : c.enableLinearScaling()
            }
            return c
          }, a.prototype.destroyTexture = function(a, b) {
            if (a = a.baseTexture || a, a.hasLoaded && a._glTextures[this.renderer.CONTEXT_UID] && (a._glTextures[this.renderer.CONTEXT_UID].destroy(), a.off("update", this.updateTexture, this), a.off("dispose", this.destroyTexture, this), delete a._glTextures[this.renderer.CONTEXT_UID], !b)) {
              var c = this._managedTextures.indexOf(a);
              c !== -1 && (0, j.removeItems)(this._managedTextures, c, 1)
            }
          }, a.prototype.removeAll = function() {
            for (var a = 0; a < this._managedTextures.length; ++a) {
              var b = this._managedTextures[a];
              b._glTextures[this.renderer.CONTEXT_UID] && delete b._glTextures[this.renderer.CONTEXT_UID]
            }
          }, a.prototype.destroy = function() {
            for (var a = 0; a < this._managedTextures.length; ++a) {
              var b = this._managedTextures[a];
              this.destroyTexture(b, !0), b.off("update", this.updateTexture, this), b.off("dispose", this.destroyTexture, this)
            }
            this._managedTextures = null
          }, a
        }();
      c.default = k
    }, {
      "../../const": 43,
      "../../utils": 116,
      "./utils/RenderTarget": 93,
      "pixi-gl-core": 12
    }],
    81: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../SystemRenderer"),
        i = d(h),
        j = a("./managers/MaskManager"),
        k = d(j),
        l = a("./managers/StencilManager"),
        m = d(l),
        n = a("./managers/FilterManager"),
        o = d(n),
        p = a("./utils/RenderTarget"),
        q = d(p),
        r = a("./utils/ObjectRenderer"),
        s = d(r),
        t = a("./TextureManager"),
        u = d(t),
        v = a("./TextureGarbageCollector"),
        w = d(v),
        x = a("./WebGLState"),
        y = d(x),
        z = a("./utils/mapWebGLDrawModesToPixi"),
        A = d(z),
        B = a("./utils/validateContext"),
        C = d(B),
        D = a("../../utils"),
        E = a("pixi-gl-core"),
        F = d(E),
        G = a("../../const"),
        H = 0,
        I = function(a) {
          function b(c, d) {
            var g = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e(this, b);
            var h = f(this, a.call(this, "WebGL", c, d, g));
            return h.type = G.RENDERER_TYPE.WEBGL, h.handleContextLost = h.handleContextLost.bind(h), h.handleContextRestored = h.handleContextRestored.bind(h), h.view.addEventListener("webglcontextlost", h.handleContextLost, !1), h.view.addEventListener("webglcontextrestored", h.handleContextRestored, !1), h._contextOptions = {
              alpha: h.transparent,
              antialias: g.antialias,
              premultipliedAlpha: h.transparent && "notMultiplied" !== h.transparent,
              stencil: !0,
              preserveDrawingBuffer: g.preserveDrawingBuffer
            }, h._backgroundColorRgba[3] = h.transparent ? 0 : 1, h.maskManager = new k.default(h), h.stencilManager = new m.default(h), h.emptyRenderer = new s.default(h), h.currentRenderer = h.emptyRenderer, h.initPlugins(), g.context && (0, C.default)(g.context), h.gl = g.context || F.default.createContext(h.view, h._contextOptions), h.CONTEXT_UID = H++, h.state = new y.default(h.gl), h.renderingToScreen = !0, h._initContext(), h.filterManager = new o.default(h), h.drawModes = (0, A.default)(h.gl), h._activeShader = null, h._activeRenderTarget = null, h._activeTextureLocation = 999, h._activeTexture = null, h.setBlendMode(0), h
          }
          return g(b, a), b.prototype._initContext = function() {
            var a = this.gl;
            a.isContextLost() && a.getExtension("WEBGL_lose_context") && a.getExtension("WEBGL_lose_context").restoreContext(), this.textureManager = new u.default(this), this.textureGC = new w.default(this), this.state.resetToDefault(), this.rootRenderTarget = new q.default(a, this.width, this.height, null, this.resolution, !0), this.rootRenderTarget.clearColor = this._backgroundColorRgba, this.bindRenderTarget(this.rootRenderTarget), this.emit("context", a), this.resize(this.width, this.height)
          }, b.prototype.render = function(a, b, c, d, e) {
            if (this.renderingToScreen = !b, this.emit("prerender"), this.gl && !this.gl.isContextLost()) {
              if (b || (this._lastObjectRendered = a), !e) {
                var f = a.parent;
                a.parent = this._tempDisplayObjectParent, a.updateTransform(), a.parent = f
              }
              this.bindRenderTexture(b, d), this.currentRenderer.start(), (void 0 !== c ? c : this.clearBeforeRender) && this._activeRenderTarget.clear(), a.renderWebGL(this), this.currentRenderer.flush(), this.textureGC.update(), this.emit("postrender")
            }
          }, b.prototype.setObjectRenderer = function(a) {
            this.currentRenderer !== a && (this.currentRenderer.stop(), this.currentRenderer = a, this.currentRenderer.start())
          }, b.prototype.flush = function() {
            this.setObjectRenderer(this.emptyRenderer)
          }, b.prototype.resize = function(a, b) {
            i.default.prototype.resize.call(this, a, b), this.rootRenderTarget.resize(a, b), this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0)))
          }, b.prototype.setBlendMode = function(a) {
            this.state.setBlendMode(a)
          }, b.prototype.clear = function(a) {
            this._activeRenderTarget.clear(a)
          }, b.prototype.setTransform = function(a) {
            this._activeRenderTarget.transform = a
          }, b.prototype.bindRenderTexture = function(a, b) {
            var c = void 0;
            if (a) {
              var d = a.baseTexture,
                e = this.gl;
              d._glRenderTargets[this.CONTEXT_UID] ? (this._activeTextureLocation = d._id, e.activeTexture(e.TEXTURE0 + d._id), e.bindTexture(e.TEXTURE_2D, null)) : (this.textureManager.updateTexture(d), e.bindTexture(e.TEXTURE_2D, null)), c = d._glRenderTargets[this.CONTEXT_UID], c.setFrame(a.frame)
            } else c = this.rootRenderTarget;
            return c.transform = b, this.bindRenderTarget(c), this
          }, b.prototype.bindRenderTarget = function(a) {
            return a !== this._activeRenderTarget && (this._activeRenderTarget = a, a.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = a.projectionMatrix.toArray(!0)), this.stencilManager.setMaskStack(a.stencilMaskStack)), this
          }, b.prototype.bindShader = function(a) {
            return this._activeShader !== a && (this._activeShader = a, a.bind(), a.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0)), this
          }, b.prototype.bindTexture = function(a) {
            var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            a = a.baseTexture || a;
            var c = this.gl;
            return this._activeTextureLocation !== b && (this._activeTextureLocation = b, c.activeTexture(c.TEXTURE0 + b)), this._activeTexture = a, a._glTextures[this.CONTEXT_UID] ? (a.touched = this.textureGC.count, a._glTextures[this.CONTEXT_UID].bind()) : this.textureManager.updateTexture(a), this
          }, b.prototype.createVao = function() {
            return new F.default.VertexArrayObject(this.gl, this.state.attribState)
          }, b.prototype.reset = function() {
            return this.setObjectRenderer(this.emptyRenderer), this._activeShader = null, this._activeRenderTarget = this.rootRenderTarget, this._activeTextureLocation = 999, this._activeTexture = null, this.rootRenderTarget.activate(), this.state.resetToDefault(), this
          }, b.prototype.handleContextLost = function(a) {
            a.preventDefault()
          }, b.prototype.handleContextRestored = function() {
            this._initContext(), this.textureManager.removeAll()
          }, b.prototype.destroy = function(b) {
            this.destroyPlugins(), this.view.removeEventListener("webglcontextlost", this.handleContextLost), this.view.removeEventListener("webglcontextrestored", this.handleContextRestored), this.textureManager.destroy(), a.prototype.destroy.call(this, b), this.uid = 0, this.maskManager.destroy(),
              this.stencilManager.destroy(), this.filterManager.destroy(), this.maskManager = null, this.filterManager = null, this.textureManager = null, this.currentRenderer = null, this.handleContextLost = null, this.handleContextRestored = null, this._contextOptions = null, this.gl.useProgram(null), this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(), this.gl = null
          }, b
        }(i.default);
      c.default = I, D.pluginTarget.mixin(I)
    }, {
      "../../const": 43,
      "../../utils": 116,
      "../SystemRenderer": 73,
      "./TextureGarbageCollector": 79,
      "./TextureManager": 80,
      "./WebGLState": 82,
      "./managers/FilterManager": 87,
      "./managers/MaskManager": 88,
      "./managers/StencilManager": 89,
      "./utils/ObjectRenderer": 91,
      "./utils/RenderTarget": 93,
      "./utils/mapWebGLDrawModesToPixi": 96,
      "./utils/validateContext": 97,
      "pixi-gl-core": 12
    }],
    82: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("./utils/mapWebGLBlendModesToPixi"),
        g = d(f),
        h = 0,
        i = 1,
        j = 2,
        k = 3,
        l = 4,
        m = function() {
          function a(b) {
            e(this, a), this.activeState = new Uint8Array(16), this.defaultState = new Uint8Array(16), this.defaultState[0] = 1, this.stackIndex = 0, this.stack = [], this.gl = b, this.maxAttribs = b.getParameter(b.MAX_VERTEX_ATTRIBS), this.attribState = {
              tempAttribState: new Array(this.maxAttribs),
              attribState: new Array(this.maxAttribs)
            }, this.blendModes = (0, g.default)(b), this.nativeVaoExtension = b.getExtension("OES_vertex_array_object") || b.getExtension("MOZ_OES_vertex_array_object") || b.getExtension("WEBKIT_OES_vertex_array_object")
          }
          return a.prototype.push = function() {
            var a = this.stack[++this.stackIndex];
            a || (a = this.stack[this.stackIndex] = new Uint8Array(16));
            for (var b = 0; b < this.activeState.length; b++) this.activeState[b] = a[b]
          }, a.prototype.pop = function() {
            var a = this.stack[--this.stackIndex];
            this.setState(a)
          }, a.prototype.setState = function(a) {
            this.setBlend(a[h]), this.setDepthTest(a[i]), this.setFrontFace(a[j]), this.setCullFace(a[k]), this.setBlendMode(a[l])
          }, a.prototype.setBlend = function(a) {
            a = a ? 1 : 0, this.activeState[h] !== a && (this.activeState[h] = a, this.gl[a ? "enable" : "disable"](this.gl.BLEND))
          }, a.prototype.setBlendMode = function(a) {
            a !== this.activeState[l] && (this.activeState[l] = a, this.gl.blendFunc(this.blendModes[a][0], this.blendModes[a][1]))
          }, a.prototype.setDepthTest = function(a) {
            a = a ? 1 : 0, this.activeState[i] !== a && (this.activeState[i] = a, this.gl[a ? "enable" : "disable"](this.gl.DEPTH_TEST))
          }, a.prototype.setCullFace = function(a) {
            a = a ? 1 : 0, this.activeState[k] !== a && (this.activeState[k] = a, this.gl[a ? "enable" : "disable"](this.gl.CULL_FACE))
          }, a.prototype.setFrontFace = function(a) {
            a = a ? 1 : 0, this.activeState[j] !== a && (this.activeState[j] = a, this.gl.frontFace(this.gl[a ? "CW" : "CCW"]))
          }, a.prototype.resetAttributes = function() {
            for (var a = 0; a < this.attribState.tempAttribState.length; a++) this.attribState.tempAttribState[a] = 0;
            for (var b = 0; b < this.attribState.attribState.length; b++) this.attribState.attribState[b] = 0;
            for (var c = 1; c < this.maxAttribs; c++) this.gl.disableVertexAttribArray(c)
          }, a.prototype.resetToDefault = function() {
            this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null), this.resetAttributes();
            for (var a = 0; a < this.activeState.length; ++a) this.activeState[a] = 32;
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.setState(this.defaultState)
          }, a
        }();
      c.default = m
    }, {
      "./utils/mapWebGLBlendModesToPixi": 95
    }],
    83: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        g = a("./extractUniformsFromSrc"),
        h = d(g),
        i = a("../../../utils"),
        j = a("../../../const"),
        k = {},
        l = function() {
          function a(b, c, d) {
            e(this, a), this.vertexSrc = b || a.defaultVertexSrc, this.fragmentSrc = c || a.defaultFragmentSrc, this.blendMode = j.BLEND_MODES.NORMAL, this.uniformData = d || (0, h.default)(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"), this.uniforms = {};
            for (var f in this.uniformData) this.uniforms[f] = this.uniformData[f].value;
            this.glShaders = {}, k[this.vertexSrc + this.fragmentSrc] || (k[this.vertexSrc + this.fragmentSrc] = (0, i.uid)()), this.glShaderKey = k[this.vertexSrc + this.fragmentSrc], this.padding = 4, this.resolution = 1, this.enabled = !0
          }
          return a.prototype.apply = function(a, b, c, d) {
            a.applyFilter(this, b, c, d)
          }, f(a, null, [{
            key: "defaultVertexSrc",
            get: function() {
              return ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n")
            }
          }, {
            key: "defaultFragmentSrc",
            get: function() {
              return ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n")
            }
          }]), a
        }();
      c.default = l
    }, {
      "../../../const": 43,
      "../../../utils": 116,
      "./extractUniformsFromSrc": 84
    }],
    84: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b, c) {
        var d = f(a, c),
          e = f(b, c);
        return Object.assign(d, e)
      }

      function f(a) {
        for (var b = new RegExp("^(projectionMatrix|uSampler|filterArea)$"), c = {}, d = void 0, e = a.replace(/\s+/g, " ").split(/\s*;\s*/), f = 0; f < e.length; f++) {
          var g = e[f].trim();
          if (g.indexOf("uniform") > -1) {
            var h = g.split(" "),
              j = h[1],
              k = h[2],
              l = 1;
            k.indexOf("[") > -1 && (d = k.split(/\[|\]/), k = d[0], l *= Number(d[1])), k.match(b) || (c[k] = {
              value: i(j, l),
              name: k,
              type: j
            })
          }
        }
        return c
      }
      c.__esModule = !0, c.default = e;
      var g = a("pixi-gl-core"),
        h = d(g),
        i = h.default.shader.defaultValue
    }, {
      "pixi-gl-core": 12
    }],
    85: [function(a, b, c) {
      "use strict";

      function d(a, b, c) {
        var d = a.identity();
        return d.translate(b.x / c.width, b.y / c.height), d.scale(c.width, c.height), d
      }

      function e(a, b, c) {
        var d = a.identity();
        d.translate(b.x / c.width, b.y / c.height);
        var e = c.width / b.width,
          f = c.height / b.height;
        return d.scale(e, f), d
      }

      function f(a, b, c, d) {
        var e = d.worldTransform.copy(g.Matrix.TEMP_MATRIX),
          f = d._texture.baseTexture,
          h = a.identity(),
          i = c.height / c.width;
        h.translate(b.x / c.width, b.y / c.height), h.scale(1, i);
        var j = c.width / f.width,
          k = c.height / f.height;
        return e.tx /= f.width * j, e.ty /= f.width * j, e.invert(), h.prepend(e), h.scale(1, 1 / i), h.scale(j, k), h.translate(d.anchor.x, d.anchor.y), h
      }
      c.__esModule = !0, c.calculateScreenSpaceMatrix = d, c.calculateNormalizedScreenSpaceMatrix = e, c.calculateSpriteMatrix = f;
      var g = a("../../../math")
    }, {
      "../../../math": 67
    }],
    86: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../Filter"),
        i = d(h),
        j = a("../../../../math"),
        k = function(a) {
          function b(c) {
            e(this, b);
            var d = new j.Matrix,
              g = f(this, a.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "#define GLSLIFY 1\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n\n    original *= (masky.r * masky.a * alpha * clip);\n\n    gl_FragColor = original;\n}\n"));
            return c.renderable = !1, g.maskSprite = c, g.maskMatrix = d, g
          }
          return g(b, a), b.prototype.apply = function(a, b, c) {
            var d = this.maskSprite;
            this.uniforms.mask = d._texture, this.uniforms.otherMatrix = a.calculateSpriteMatrix(this.maskMatrix, d), this.uniforms.alpha = d.worldAlpha, a.applyFilter(this, b, c)
          }, b
        }(i.default);
      c.default = k
    }, {
      "../../../../math": 67,
      "../Filter": 83
    }],
    87: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }

      function h(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var i = a("./WebGLManager"),
        j = e(i),
        k = a("../utils/RenderTarget"),
        l = e(k),
        m = a("../utils/Quad"),
        n = e(m),
        o = a("../../../math"),
        p = a("../../../Shader"),
        q = e(p),
        r = a("../filters/filterTransforms"),
        s = d(r),
        t = a("bit-twiddle"),
        u = e(t),
        v = function a() {
          h(this, a), this.renderTarget = null, this.sourceFrame = new o.Rectangle, this.destinationFrame = new o.Rectangle, this.filters = [], this.target = null, this.resolution = 1
        },
        w = function(a) {
          function b(c) {
            h(this, b);
            var d = f(this, a.call(this, c));
            return d.gl = d.renderer.gl, d.quad = new n.default(d.gl, c.state.attribState), d.shaderCache = {}, d.pool = {}, d.filterData = null, d
          }
          return g(b, a), b.prototype.pushFilter = function(a, b) {
            var c = this.renderer,
              d = this.filterData;
            if (!d) {
              d = this.renderer._activeRenderTarget.filterStack;
              var e = new v;
              e.sourceFrame = e.destinationFrame = this.renderer._activeRenderTarget.size, e.renderTarget = c._activeRenderTarget, this.renderer._activeRenderTarget.filterData = d = {
                index: 0,
                stack: [e]
              }, this.filterData = d
            }
            var f = d.stack[++d.index];
            f || (f = d.stack[d.index] = new v);
            var g = b[0].resolution,
              h = 0 | b[0].padding,
              i = a.filterArea || a.getBounds(!0),
              j = f.sourceFrame,
              k = f.destinationFrame;
            j.x = (i.x * g | 0) / g, j.y = (i.y * g | 0) / g, j.width = (i.width * g | 0) / g, j.height = (i.height * g | 0) / g, d.stack[0].renderTarget.transform || j.fit(d.stack[0].destinationFrame), j.pad(h), k.width = j.width, k.height = j.height;
            var l = this.getPotRenderTarget(c.gl, j.width, j.height, g);
            f.target = a, f.filters = b, f.resolution = g, f.renderTarget = l, l.setFrame(k, j), c.bindRenderTarget(l), c.clear()
          }, b.prototype.popFilter = function() {
            var a = this.filterData,
              b = a.stack[a.index - 1],
              c = a.stack[a.index];
            this.quad.map(c.renderTarget.size, c.sourceFrame).upload();
            var d = c.filters;
            if (1 === d.length) d[0].apply(this, c.renderTarget, b.renderTarget, !1), this.freePotRenderTarget(c.renderTarget);
            else {
              var e = c.renderTarget,
                f = this.getPotRenderTarget(this.renderer.gl, c.sourceFrame.width, c.sourceFrame.height, c.resolution);
              f.setFrame(c.destinationFrame, c.sourceFrame);
              var g = 0;
              for (g = 0; g < d.length - 1; ++g) {
                d[g].apply(this, e, f, !0);
                var h = e;
                e = f, f = h
              }
              d[g].apply(this, e, b.renderTarget, !1), this.freePotRenderTarget(e), this.freePotRenderTarget(f)
            }
            a.index--, 0 === a.index && (this.filterData = null)
          }, b.prototype.applyFilter = function(a, b, c, d) {
            var e = this.renderer,
              f = a.glShaders[e.CONTEXT_UID];
            if (f || (a.glShaderKey ? (f = this.shaderCache[a.glShaderKey], f || (f = new q.default(this.gl, a.vertexSrc, a.fragmentSrc), a.glShaders[e.CONTEXT_UID] = this.shaderCache[a.glShaderKey] = f)) : f = a.glShaders[e.CONTEXT_UID] = new q.default(this.gl, a.vertexSrc, a.fragmentSrc), this.quad.initVao(f)), e.bindRenderTarget(c), d) {
              var g = e.gl;
              g.disable(g.SCISSOR_TEST), e.clear(), g.enable(g.SCISSOR_TEST)
            }
            c === e.maskManager.scissorRenderTarget && e.maskManager.pushScissorMask(null, e.maskManager.scissorData), e.bindShader(f), this.syncUniforms(f, a), b.texture.bind(0), e._activeTextureLocation = 0, e.state.setBlendMode(a.blendMode), this.quad.draw()
          }, b.prototype.syncUniforms = function(a, b) {
            var c = b.uniformData,
              d = b.uniforms,
              e = 1,
              f = void 0;
            if (a.uniforms.data.filterArea) {
              f = this.filterData.stack[this.filterData.index];
              var g = a.uniforms.filterArea;
              g[0] = f.renderTarget.size.width, g[1] = f.renderTarget.size.height, g[2] = f.sourceFrame.x, g[3] = f.sourceFrame.y, a.uniforms.filterArea = g
            }
            if (a.uniforms.data.filterClamp) {
              f = this.filterData.stack[this.filterData.index];
              var h = a.uniforms.filterClamp;
              h[0] = 0, h[1] = 0, h[2] = (f.sourceFrame.width - 1) / f.renderTarget.size.width, h[3] = (f.sourceFrame.height - 1) / f.renderTarget.size.height, a.uniforms.filterClamp = h
            }
            for (var i in c)
              if ("sampler2D" === c[i].type) {
                if (a.uniforms[i] = e, d[i].baseTexture) this.renderer.bindTexture(d[i].baseTexture, e);
                else {
                  var j = this.renderer.gl;
                  this.renderer._activeTextureLocation = j.TEXTURE0 + e, j.activeTexture(j.TEXTURE0 + e), d[i].texture.bind()
                }
                e++
              } else if ("mat3" === c[i].type) void 0 !== d[i].a ? a.uniforms[i] = d[i].toArray(!0) : a.uniforms[i] = d[i];
            else if ("vec2" === c[i].type)
              if (void 0 !== d[i].x) {
                var k = a.uniforms[i] || new Float32Array(2);
                k[0] = d[i].x, k[1] = d[i].y, a.uniforms[i] = k
              } else a.uniforms[i] = d[i];
            else "float" === c[i].type ? a.uniforms.data[i].value !== c[i] && (a.uniforms[i] = d[i]) : a.uniforms[i] = d[i]
          }, b.prototype.getRenderTarget = function(a, b) {
            var c = this.filterData.stack[this.filterData.index],
              d = this.getPotRenderTarget(this.renderer.gl, c.sourceFrame.width, c.sourceFrame.height, b || c.resolution);
            return d.setFrame(c.destinationFrame, c.sourceFrame), d
          }, b.prototype.returnRenderTarget = function(a) {
            this.freePotRenderTarget(a)
          }, b.prototype.calculateScreenSpaceMatrix = function(a) {
            var b = this.filterData.stack[this.filterData.index];
            return s.calculateScreenSpaceMatrix(a, b.sourceFrame, b.renderTarget.size)
          }, b.prototype.calculateNormalizedScreenSpaceMatrix = function(a) {
            var b = this.filterData.stack[this.filterData.index];
            return s.calculateNormalizedScreenSpaceMatrix(a, b.sourceFrame, b.renderTarget.size, b.destinationFrame)
          }, b.prototype.calculateSpriteMatrix = function(a, b) {
            var c = this.filterData.stack[this.filterData.index];
            return s.calculateSpriteMatrix(a, c.sourceFrame, c.renderTarget.size, b)
          }, b.prototype.destroy = function() {
            this.shaderCache = [], this.emptyPool()
          }, b.prototype.getPotRenderTarget = function(a, b, c, d) {
            b = u.default.nextPow2(b * d), c = u.default.nextPow2(c * d);
            var e = (65535 & b) << 16 | 65535 & c;
            this.pool[e] || (this.pool[e] = []);
            var f = this.pool[e].pop() || new l.default(a, b, c, null, 1);
            return f.resolution = d, f.defaultFrame.width = f.size.width = b / d, f.defaultFrame.height = f.size.height = c / d, f
          }, b.prototype.emptyPool = function() {
            for (var a in this.pool) {
              var b = this.pool[a];
              if (b)
                for (var c = 0; c < b.length; c++) b[c].destroy(!0)
            }
            this.pool = {}
          }, b.prototype.freePotRenderTarget = function(a) {
            var b = a.size.width * a.resolution,
              c = a.size.height * a.resolution,
              d = (65535 & b) << 16 | 65535 & c;
            this.pool[d].push(a)
          }, b
        }(j.default);
      c.default = w
    }, {
      "../../../Shader": 42,
      "../../../math": 67,
      "../filters/filterTransforms": 85,
      "../utils/Quad": 92,
      "../utils/RenderTarget": 93,
      "./WebGLManager": 90,
      "bit-twiddle": 1
    }],
    88: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("./WebGLManager"),
        i = d(h),
        j = a("../filters/spriteMask/SpriteMaskFilter"),
        k = d(j),
        l = function(a) {
          function b(c) {
            e(this, b);
            var d = f(this, a.call(this, c));
            return d.scissor = !1, d.scissorData = null, d.scissorRenderTarget = null, d.enableScissor = !0, d.alphaMaskPool = [], d.alphaMaskIndex = 0, d
          }
          return g(b, a), b.prototype.pushMask = function(a, b) {
            if (b.texture) this.pushSpriteMask(a, b);
            else if (this.enableScissor && !this.scissor && !this.renderer.stencilManager.stencilMaskStack.length && b.isFastRect()) {
              var c = b.worldTransform,
                d = Math.atan2(c.b, c.a);
              d = Math.round(d * (180 / Math.PI)), d % 90 ? this.pushStencilMask(b) : this.pushScissorMask(a, b)
            } else this.pushStencilMask(b)
          }, b.prototype.popMask = function(a, b) {
            b.texture ? this.popSpriteMask(a, b) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(a, b) : this.popStencilMask(a, b)
          }, b.prototype.pushSpriteMask = function(a, b) {
            var c = this.alphaMaskPool[this.alphaMaskIndex];
            c || (c = this.alphaMaskPool[this.alphaMaskIndex] = [new k.default(b)]), c[0].resolution = this.renderer.resolution, c[0].maskSprite = b, a.filterArea = b.getBounds(!0), this.renderer.filterManager.pushFilter(a, c), this.alphaMaskIndex++
          }, b.prototype.popSpriteMask = function() {
            this.renderer.filterManager.popFilter(), this.alphaMaskIndex--
          }, b.prototype.pushStencilMask = function(a) {
            this.renderer.currentRenderer.stop(), this.renderer.stencilManager.pushStencil(a)
          }, b.prototype.popStencilMask = function() {
            this.renderer.currentRenderer.stop(), this.renderer.stencilManager.popStencil()
          }, b.prototype.pushScissorMask = function(a, b) {
            b.renderable = !0;
            var c = this.renderer._activeRenderTarget,
              d = b.getBounds();
            d.fit(c.size), b.renderable = !1, this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
            var e = this.renderer.resolution;
            this.renderer.gl.scissor(d.x * e, (c.root ? c.size.height - d.y - d.height : d.y) * e, d.width * e, d.height * e), this.scissorRenderTarget = c, this.scissorData = b, this.scissor = !0
          }, b.prototype.popScissorMask = function() {
            this.scissorRenderTarget = null, this.scissorData = null, this.scissor = !1;
            var a = this.renderer.gl;
            a.disable(a.SCISSOR_TEST)
          }, b
        }(i.default);
      c.default = l
    }, {
      "../filters/spriteMask/SpriteMaskFilter": 86,
      "./WebGLManager": 90
    }],
    89: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("./WebGLManager"),
        i = d(h),
        j = function(a) {
          function b(c) {
            e(this, b);
            var d = f(this, a.call(this, c));
            return d.stencilMaskStack = null, d
          }
          return g(b, a), b.prototype.setMaskStack = function(a) {
            this.stencilMaskStack = a;
            var b = this.renderer.gl;
            0 === a.length ? b.disable(b.STENCIL_TEST) : b.enable(b.STENCIL_TEST)
          }, b.prototype.pushStencil = function(a) {
            this.renderer.setObjectRenderer(this.renderer.plugins.graphics), this.renderer._activeRenderTarget.attachStencilBuffer();
            var b = this.renderer.gl,
              c = this.stencilMaskStack;
            0 === c.length && (b.enable(b.STENCIL_TEST), b.clear(b.STENCIL_BUFFER_BIT), b.stencilFunc(b.ALWAYS, 1, 1)), c.push(a), b.colorMask(!1, !1, !1, !1), b.stencilOp(b.KEEP, b.KEEP, b.INCR), this.renderer.plugins.graphics.render(a), b.colorMask(!0, !0, !0, !0), b.stencilFunc(b.NOTEQUAL, 0, c.length), b.stencilOp(b.KEEP, b.KEEP, b.KEEP)
          }, b.prototype.popStencil = function() {
            this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
            var a = this.renderer.gl,
              b = this.stencilMaskStack,
              c = b.pop();
            0 === b.length ? a.disable(a.STENCIL_TEST) : (a.colorMask(!1, !1, !1, !1), a.stencilOp(a.KEEP, a.KEEP, a.DECR), this.renderer.plugins.graphics.render(c), a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.NOTEQUAL, 0, b.length), a.stencilOp(a.KEEP, a.KEEP, a.KEEP))
          }, b.prototype.destroy = function() {
            i.default.prototype.destroy.call(this), this.stencilMaskStack.stencilStack = null
          }, b
        }(i.default);
      c.default = j
    }, {
      "./WebGLManager": 90
    }],
    90: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
        function a(b) {
          d(this, a), this.renderer = b, this.renderer.on("context", this.onContextChange, this)
        }
        return a.prototype.onContextChange = function() {}, a.prototype.destroy = function() {
          this.renderer.off("context", this.onContextChange, this), this.renderer = null
        }, a
      }();
      c.default = e
    }, {}],
    91: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../managers/WebGLManager"),
        i = d(h),
        j = function(a) {
          function b() {
            return e(this, b), f(this, a.apply(this, arguments))
          }
          return g(b, a), b.prototype.start = function() {}, b.prototype.stop = function() {
            this.flush()
          }, b.prototype.flush = function() {}, b.prototype.render = function(a) {}, b
        }(i.default);
      c.default = j
    }, {
      "../managers/WebGLManager": 90
    }],
    92: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("pixi-gl-core"),
        g = d(f),
        h = a("../../../utils/createIndicesForQuads"),
        i = d(h),
        j = function() {
          function a(b, c) {
            e(this, a), this.gl = b, this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.interleaved = new Float32Array(16);
            for (var d = 0; d < 4; d++) this.interleaved[4 * d] = this.vertices[2 * d], this.interleaved[4 * d + 1] = this.vertices[2 * d + 1], this.interleaved[4 * d + 2] = this.uvs[2 * d], this.interleaved[4 * d + 3] = this.uvs[2 * d + 1];
            this.indices = (0, i.default)(1), this.vertexBuffer = g.default.GLBuffer.createVertexBuffer(b, this.interleaved, b.STATIC_DRAW), this.indexBuffer = g.default.GLBuffer.createIndexBuffer(b, this.indices, b.STATIC_DRAW), this.vao = new g.default.VertexArrayObject(b, c)
          }
          return a.prototype.initVao = function(a) {
            this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, a.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, a.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8)
          }, a.prototype.map = function(a, b) {
            var c = 0,
              d = 0;
            return this.uvs[0] = c, this.uvs[1] = d, this.uvs[2] = c + b.width / a.width, this.uvs[3] = d, this.uvs[4] = c + b.width / a.width, this.uvs[5] = d + b.height / a.height, this.uvs[6] = c, this.uvs[7] = d + b.height / a.height, c = b.x, d = b.y, this.vertices[0] = c, this.vertices[1] = d, this.vertices[2] = c + b.width, this.vertices[3] = d, this.vertices[4] = c + b.width, this.vertices[5] = d + b.height, this.vertices[6] = c, this.vertices[7] = d + b.height, this
          }, a.prototype.draw = function() {
            return this.vao.bind().draw(this.gl.TRIANGLES, 6, 0).unbind(), this
          }, a.prototype.upload = function() {
            for (var a = 0; a < 4; a++) this.interleaved[4 * a] = this.vertices[2 * a], this.interleaved[4 * a + 1] = this.vertices[2 * a + 1], this.interleaved[4 * a + 2] = this.uvs[2 * a], this.interleaved[4 * a + 3] = this.uvs[2 * a + 1];
            return this.vertexBuffer.upload(this.interleaved), this
          }, a.prototype.destroy = function() {
            var a = this.gl;
            a.deleteBuffer(this.vertexBuffer), a.deleteBuffer(this.indexBuffer)
          }, a
        }();
      c.default = j
    }, {
      "../../../utils/createIndicesForQuads": 114,
      "pixi-gl-core": 12
    }],
    93: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = a("../../../math"),
        f = a("../../../const"),
        g = a("pixi-gl-core"),
        h = function() {
          function a(b, c, h, i, j, k) {
            d(this, a), this.gl = b, this.frameBuffer = null, this.texture = null, this.clearColor = [0, 0, 0, 0], this.size = new e.Rectangle(0, 0, 1, 1), this.resolution = j || f.RESOLUTION, this.projectionMatrix = new e.Matrix, this.transform = null, this.frame = null, this.defaultFrame = new e.Rectangle, this.destinationFrame = null, this.sourceFrame = null, this.stencilBuffer = null, this.stencilMaskStack = [], this.filterData = null, this.scaleMode = i || f.SCALE_MODES.DEFAULT, this.root = k, this.root ? (this.frameBuffer = new g.GLFramebuffer(b, 100, 100), this.frameBuffer.framebuffer = null) : (this.frameBuffer = g.GLFramebuffer.createRGBA(b, 100, 100), this.scaleMode === f.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(), this.texture = this.frameBuffer.texture), this.setFrame(), this.resize(c, h)
          }
          return a.prototype.clear = function(a) {
            var b = a || this.clearColor;
            this.frameBuffer.clear(b[0], b[1], b[2], b[3])
          }, a.prototype.attachStencilBuffer = function() {
            this.root || this.frameBuffer.enableStencil()
          }, a.prototype.setFrame = function(a, b) {
            this.destinationFrame = a || this.destinationFrame || this.defaultFrame, this.sourceFrame = b || this.sourceFrame || a
          }, a.prototype.activate = function() {
            var a = this.gl;
            this.frameBuffer.bind(), this.calculateProjection(this.destinationFrame, this.sourceFrame), this.transform && this.projectionMatrix.append(this.transform), this.destinationFrame !== this.sourceFrame ? (a.enable(a.SCISSOR_TEST), a.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : a.disable(a.SCISSOR_TEST), a.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)
          }, a.prototype.calculateProjection = function(a, b) {
            var c = this.projectionMatrix;
            b = b || a, c.identity(), this.root ? (c.a = 1 / a.width * 2, c.d = -1 / a.height * 2, c.tx = -1 - b.x * c.a, c.ty = 1 - b.y * c.d) : (c.a = 1 / a.width * 2, c.d = 1 / a.height * 2, c.tx = -1 - b.x * c.a, c.ty = -1 - b.y * c.d)
          }, a.prototype.resize = function(a, b) {
            if (a = 0 | a, b = 0 | b, this.size.width !== a || this.size.height !== b) {
              this.size.width = a, this.size.height = b, this.defaultFrame.width = a, this.defaultFrame.height = b, this.frameBuffer.resize(a * this.resolution, b * this.resolution);
              var c = this.frame || this.size;
              this.calculateProjection(c)
            }
          }, a.prototype.destroy = function() {
            this.frameBuffer.destroy(), this.frameBuffer = null, this.texture = null
          }, a
        }();
      c.default = h
    }, {
      "../../../const": 43,
      "../../../math": 67,
      "pixi-gl-core": 12
    }],
    94: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        var c = !b;
        if (c) {
          var d = document.createElement("canvas");
          d.width = 1, d.height = 1, b = h.default.createContext(d)
        }
        for (var e = b.createShader(b.FRAGMENT_SHADER);;) {
          var g = i.replace(/%forloop%/gi, f(a));
          if (b.shaderSource(e, g), b.compileShader(e), b.getShaderParameter(e, b.COMPILE_STATUS)) break;
          a = a / 2 | 0
        }
        return c && b.getExtension("WEBGL_lose_context") && b.getExtension("WEBGL_lose_context").loseContext(), a
      }

      function f(a) {
        for (var b = "", c = 0; c < a; ++c) c > 0 && (b += "\nelse "), c < a - 1 && (b += "if(test == " + c + ".0){}");
        return b
      }
      c.__esModule = !0, c.default = e;
      var g = a("pixi-gl-core"),
        h = d(g),
        i = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n")
    }, {
      "pixi-gl-core": 12
    }],
    95: [function(a, b, c) {
      "use strict";

      function d(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return b[e.BLEND_MODES.NORMAL] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.ADD] = [a.ONE, a.DST_ALPHA], b[e.BLEND_MODES.MULTIPLY] = [a.DST_COLOR, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.SCREEN] = [a.ONE, a.ONE_MINUS_SRC_COLOR], b[e.BLEND_MODES.OVERLAY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.DARKEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.LIGHTEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.COLOR_DODGE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.COLOR_BURN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.HARD_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.SOFT_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.DIFFERENCE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.EXCLUSION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.HUE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.SATURATION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.COLOR] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.LUMINOSITY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b
      }
      c.__esModule = !0, c.default = d;
      var e = a("../../../const")
    }, {
      "../../../const": 43
    }],
    96: [function(a, b, c) {
      "use strict";

      function d(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return b[e.DRAW_MODES.POINTS] = a.POINTS, b[e.DRAW_MODES.LINES] = a.LINES, b[e.DRAW_MODES.LINE_LOOP] = a.LINE_LOOP, b[e.DRAW_MODES.LINE_STRIP] = a.LINE_STRIP, b[e.DRAW_MODES.TRIANGLES] = a.TRIANGLES, b[e.DRAW_MODES.TRIANGLE_STRIP] = a.TRIANGLE_STRIP, b[e.DRAW_MODES.TRIANGLE_FAN] = a.TRIANGLE_FAN, b
      }
      c.__esModule = !0, c.default = d;
      var e = a("../../../const")
    }, {
      "../../../const": 43
    }],
    97: [function(a, b, c) {
      "use strict";

      function d(a) {
        var b = a.getContextAttributes();
        b.stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")
      }
      c.__esModule = !0, c.default = d
    }, {}],
    98: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../math"),
        j = a("../utils"),
        k = a("../const"),
        l = a("../textures/Texture"),
        m = d(l),
        n = a("../display/Container"),
        o = d(n),
        p = new i.Point,
        q = function(a) {
          function b(c) {
            e(this, b);
            var d = f(this, a.call(this));
            return d._anchor = new i.ObservablePoint(d._onAnchorUpdate, d), d._texture = null, d._width = 0, d._height = 0, d._tint = null, d._tintRGB = null, d.tint = 16777215, d.blendMode = k.BLEND_MODES.NORMAL, d.shader = null, d.cachedTint = 16777215, d.texture = c || m.default.EMPTY, d.vertexData = new Float32Array(8), d.vertexTrimmedData = null, d._transformID = -1, d._textureID = -1, d
          }
          return g(b, a), b.prototype._onTextureUpdate = function() {
            this._textureID = -1, this._width && (this.scale.x = (0, j.sign)(this.scale.x) * this._width / this.texture.orig.width), this._height && (this.scale.y = (0, j.sign)(this.scale.y) * this._height / this.texture.orig.height)
          }, b.prototype._onAnchorUpdate = function() {
            this._transformID = -1
          }, b.prototype.calculateVertices = function() {
            if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
              this._transformID = this.transform._worldID, this._textureID = this._texture._updateID;
              var a = this._texture,
                b = this.transform.worldTransform,
                c = b.a,
                d = b.b,
                e = b.c,
                f = b.d,
                g = b.tx,
                h = b.ty,
                i = this.vertexData,
                j = a.trim,
                k = a.orig,
                l = this._anchor,
                m = 0,
                n = 0,
                o = 0,
                p = 0;
              j ? (n = j.x - l._x * k.width, m = n + j.width, p = j.y - l._y * k.height, o = p + j.height) : (m = k.width * (1 - l._x), n = k.width * -l._x, o = k.height * (1 - l._y), p = k.height * -l._y), i[0] = c * n + e * p + g, i[1] = f * p + d * n + h, i[2] = c * m + e * p + g, i[3] = f * p + d * m + h, i[4] = c * m + e * o + g, i[5] = f * o + d * m + h, i[6] = c * n + e * o + g, i[7] = f * o + d * n + h
            }
          }, b.prototype.calculateTrimmedVertices = function() {
            this.vertexTrimmedData || (this.vertexTrimmedData = new Float32Array(8));
            var a = this._texture,
              b = this.vertexTrimmedData,
              c = a.orig,
              d = this._anchor,
              e = this.transform.worldTransform,
              f = e.a,
              g = e.b,
              h = e.c,
              i = e.d,
              j = e.tx,
              k = e.ty,
              l = c.width * (1 - d._x),
              m = c.width * -d._x,
              n = c.height * (1 - d._y),
              o = c.height * -d._y;
            b[0] = f * m + h * o + j, b[1] = i * o + g * m + k, b[2] = f * l + h * o + j, b[3] = i * o + g * l + k, b[4] = f * l + h * n + j, b[5] = i * n + g * l + k, b[6] = f * m + h * n + j, b[7] = i * n + g * m + k
          }, b.prototype._renderWebGL = function(a) {
            this.calculateVertices(), a.setObjectRenderer(a.plugins.sprite), a.plugins.sprite.render(this)
          }, b.prototype._renderCanvas = function(a) {
            a.plugins.sprite.render(this)
          }, b.prototype._calculateBounds = function() {
            var a = this._texture.trim,
              b = this._texture.orig;
            !a || a.width === b.width && a.height === b.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData))
          }, b.prototype.getLocalBounds = function(b) {
            return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x, this._bounds.minY = this._texture.orig.height * -this._anchor._y, this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._x), b || (this._localBoundsRect || (this._localBoundsRect = new i.Rectangle), b = this._localBoundsRect), this._bounds.getRectangle(b)) : a.prototype.getLocalBounds.call(this, b)
          }, b.prototype.containsPoint = function(a) {
            this.worldTransform.applyInverse(a, p);
            var b = this._texture.orig.width,
              c = this._texture.orig.height,
              d = -b * this.anchor.x,
              e = 0;
            return p.x > d && p.x < d + b && (e = -c * this.anchor.y, p.y > e && p.y < e + c)
          }, b.prototype.destroy = function(b) {
            a.prototype.destroy.call(this, b), this._anchor = null;
            var c = "boolean" == typeof b ? b : b && b.texture;
            if (c) {
              var d = "boolean" == typeof b ? b : b && b.baseTexture;
              this._texture.destroy(!!d)
            }
            this._texture = null, this.shader = null
          }, b.from = function(a) {
            return new b(m.default.from(a))
          }, b.fromFrame = function(a) {
            var c = j.TextureCache[a];
            if (!c) throw new Error('The frameId "' + a + '" does not exist in the texture cache');
            return new b(c)
          }, b.fromImage = function(a, c, d) {
            return new b(m.default.fromImage(a, c, d))
          }, h(b, [{
            key: "width",
            get: function() {
              return Math.abs(this.scale.x) * this.texture.orig.width
            },
            set: function(a) {
              var b = (0, j.sign)(this.scale.x) || 1;
              this.scale.x = b * a / this.texture.orig.width, this._width = a
            }
          }, {
            key: "height",
            get: function() {
              return Math.abs(this.scale.y) * this.texture.orig.height
            },
            set: function(a) {
              var b = (0, j.sign)(this.scale.y) || 1;
              this.scale.y = b * a / this.texture.orig.height, this._height = a
            }
          }, {
            key: "anchor",
            get: function() {
              return this._anchor
            },
            set: function(a) {
              this._anchor.copy(a)
            }
          }, {
            key: "tint",
            get: function() {
              return this._tint
            },
            set: function(a) {
              this._tint = a, this._tintRGB = (a >> 16) + (65280 & a) + ((255 & a) << 16)
            }
          }, {
            key: "texture",
            get: function() {
              return this._texture
            },
            set: function(a) {
              this._texture !== a && (this._texture = a, this.cachedTint = 16777215, this._textureID = -1, a && (a.baseTexture.hasLoaded ? this._onTextureUpdate() : a.once("update", this._onTextureUpdate, this)))
            }
          }]), b
        }(o.default);
      c.default = q
    }, {
      "../const": 43,
      "../display/Container": 45,
      "../math": 67,
      "../textures/Texture": 109,
      "../utils": 116
    }],
    99: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("../../renderers/canvas/CanvasRenderer"),
        g = d(f),
        h = a("../../const"),
        i = a("../../math"),
        j = a("./CanvasTinter"),
        k = d(j),
        l = new i.Matrix,
        m = function() {
          function a(b) {
            e(this, a), this.renderer = b
          }
          return a.prototype.render = function(a) {
            var b = a._texture,
              c = this.renderer,
              d = b._frame.width,
              e = b._frame.height,
              f = a.transform.worldTransform,
              g = 0,
              j = 0;
            if (!(b.orig.width <= 0 || b.orig.height <= 0) && b.baseTexture.source && (c.setBlendMode(a.blendMode), b.valid)) {
              c.context.globalAlpha = a.worldAlpha;
              var m = b.baseTexture.scaleMode === h.SCALE_MODES.LINEAR;
              c.smoothProperty && c.context[c.smoothProperty] !== m && (c.context[c.smoothProperty] = m), b.trim ? (g = b.trim.width / 2 + b.trim.x - a.anchor.x * b.orig.width, j = b.trim.height / 2 + b.trim.y - a.anchor.y * b.orig.height) : (g = (.5 - a.anchor.x) * b.orig.width, j = (.5 - a.anchor.y) * b.orig.height), b.rotate && (f.copy(l), f = l, i.GroupD8.matrixAppendRotationInv(f, b.rotate, g, j), g = 0, j = 0), g -= d / 2, j -= e / 2, c.roundPixels ? (c.context.setTransform(f.a, f.b, f.c, f.d, f.tx * c.resolution | 0, f.ty * c.resolution | 0), g = 0 | g, j = 0 | j) : c.context.setTransform(f.a, f.b, f.c, f.d, f.tx * c.resolution, f.ty * c.resolution);
              var n = b.baseTexture.resolution;
              16777215 !== a.tint ? (a.cachedTint !== a.tint && (a.cachedTint = a.tint, a.tintedTexture = k.default.getTintedTexture(a, a.tint)), c.context.drawImage(a.tintedTexture, 0, 0, d * n, e * n, g * c.resolution, j * c.resolution, d * c.resolution, e * c.resolution)) : c.context.drawImage(b.baseTexture.source, b._frame.x * n, b._frame.y * n, d * n, e * n, g * c.resolution, j * c.resolution, d * c.resolution, e * c.resolution)
            }
          }, a.prototype.destroy = function() {
            this.renderer = null
          }, a
        }();
      c.default = m, g.default.registerPlugin("sprite", m)
    }, {
      "../../const": 43,
      "../../math": 67,
      "../../renderers/canvas/CanvasRenderer": 74,
      "./CanvasTinter": 100
    }],
    100: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("../../utils"),
        f = a("../../renderers/canvas/utils/canUseNewCanvasBlendModes"),
        g = d(f),
        h = {
          getTintedTexture: function(a, b) {
            var c = a.texture;
            b = h.roundColor(b);
            var d = "#" + ("00000" + (0 | b).toString(16)).substr(-6);
            if (c.tintCache = c.tintCache || {}, c.tintCache[d]) return c.tintCache[d];
            var e = h.canvas || document.createElement("canvas");
            if (h.tintMethod(c, b, e), h.convertTintToImage) {
              var f = new Image;
              f.src = e.toDataURL(), c.tintCache[d] = f
            } else c.tintCache[d] = e, h.canvas = null;
            return e
          },
          tintWithMultiply: function(a, b, c) {
            var d = c.getContext("2d"),
              e = a._frame.clone(),
              f = a.baseTexture.resolution;
            e.x *= f, e.y *= f, e.width *= f, e.height *= f, c.width = e.width, c.height = e.height, d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, e.width, e.height), d.globalCompositeOperation = "multiply", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height)
          },
          tintWithOverlay: function(a, b, c) {
            var d = c.getContext("2d"),
              e = a._frame.clone(),
              f = a.baseTexture.resolution;
            e.x *= f, e.y *= f, e.width *= f, e.height *= f, c.width = e.width, c.height = e.height, d.globalCompositeOperation = "copy", d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, e.width, e.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height)
          },
          tintWithPerPixel: function(a, b, c) {
            var d = c.getContext("2d"),
              f = a._frame.clone(),
              g = a.baseTexture.resolution;
            f.x *= g, f.y *= g, f.width *= g, f.height *= g, c.width = f.width, c.height = f.height, d.globalCompositeOperation = "copy", d.drawImage(a.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height);
            for (var h = (0, e.hex2rgb)(b), i = h[0], j = h[1], k = h[2], l = d.getImageData(0, 0, f.width, f.height), m = l.data, n = 0; n < m.length; n += 4) m[n + 0] *= i, m[n + 1] *= j, m[n + 2] *= k;
            d.putImageData(l, 0, 0)
          },
          roundColor: function(a) {
            var b = h.cacheStepsPerColorChannel,
              c = (0, e.hex2rgb)(a);
            return c[0] = Math.min(255, c[0] / b * b), c[1] = Math.min(255, c[1] / b * b), c[2] = Math.min(255, c[2] / b * b), (0, e.rgb2hex)(c)
          },
          cacheStepsPerColorChannel: 8,
          convertTintToImage: !1,
          canUseMultiply: (0, g.default)(),
          tintMethod: 0
        };
      h.tintMethod = h.canUseMultiply ? h.tintWithMultiply : h.tintWithPerPixel, c.default = h
    }, {
      "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 77,
      "../../utils": 116
    }],
    101: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
        function a(b) {
          d(this, a), this.vertices = new ArrayBuffer(b), this.float32View = new Float32Array(this.vertices), this.uint32View = new Uint32Array(this.vertices)
        }
        return a.prototype.destroy = function() {
          this.vertices = null, this.positions = null, this.uvs = null, this.colors = null
        }, a
      }();
      c.default = e
    }, {}],
    102: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../../renderers/webgl/utils/ObjectRenderer"),
        i = d(h),
        j = a("../../renderers/webgl/WebGLRenderer"),
        k = d(j),
        l = a("../../utils/createIndicesForQuads"),
        m = d(l),
        n = a("./generateMultiTextureShader"),
        o = d(n),
        p = a("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"),
        q = d(p),
        r = a("./BatchBuffer"),
        s = d(r),
        t = a("../../const"),
        u = a("pixi-gl-core"),
        v = d(u),
        w = a("bit-twiddle"),
        x = d(w),
        y = 0,
        z = function(a) {
          function b(c) {
            e(this, b);
            var d = f(this, a.call(this, c));
            d.vertSize = 5, d.vertByteSize = 4 * d.vertSize, d.size = t.SPRITE_BATCH_SIZE, d.buffers = [];
            for (var g = 1; g <= x.default.nextPow2(d.size); g *= 2) d.buffers.push(new s.default(4 * g * d.vertByteSize));
            d.indices = (0, m.default)(d.size), d.shaders = null, d.currentIndex = 0, y = 0, d.groups = [];
            for (var h = 0; h < d.size; h++) d.groups[h] = {
              textures: [],
              textureCount: 0,
              ids: [],
              size: 0,
              start: 0,
              blend: 0
            };
            return d.sprites = [], d.vertexBuffers = [], d.vaos = [], d.vaoMax = 2, d.vertexCount = 0, d.renderer.on("prerender", d.onPrerender, d), d
          }
          return g(b, a), b.prototype.onContextChange = function() {
            var a = this.renderer.gl;
            this.MAX_TEXTURES = Math.min(a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS), t.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = (0, q.default)(this.MAX_TEXTURES, a), this.shaders = new Array(this.MAX_TEXTURES), this.shaders[0] = (0, o.default)(a, 1), this.shaders[1] = (0, o.default)(a, 2), this.indexBuffer = v.default.GLBuffer.createIndexBuffer(a, this.indices, a.STATIC_DRAW);
            for (var b = this.shaders[1], c = 0; c < this.vaoMax; c++) this.vertexBuffers[c] = v.default.GLBuffer.createVertexBuffer(a, null, a.STREAM_DRAW), this.vaos[c] = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[c], b.attributes.aVertexPosition, a.FLOAT, !1, this.vertByteSize, 0).addAttribute(this.vertexBuffers[c], b.attributes.aTextureCoord, a.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(this.vertexBuffers[c], b.attributes.aColor, a.UNSIGNED_BYTE, !0, this.vertByteSize, 12).addAttribute(this.vertexBuffers[c], b.attributes.aTextureId, a.FLOAT, !1, this.vertByteSize, 16);
            this.vao = this.vaos[0], this.currentBlendMode = 99999
          }, b.prototype.onPrerender = function() {
            this.vertexCount = 0
          }, b.prototype.render = function(a) {
            this.currentIndex >= this.size && this.flush(), a.texture._uvs && (this.sprites[this.currentIndex++] = a)
          }, b.prototype.flush = function() {
            if (0 !== this.currentIndex) {
              var a = this.renderer.gl,
                b = x.default.nextPow2(this.currentIndex),
                c = x.default.log2(b),
                d = this.buffers[c],
                e = this.sprites,
                f = this.groups,
                g = d.float32View,
                h = d.uint32View,
                i = 0,
                j = void 0,
                k = void 0,
                l = 1,
                m = 0,
                n = f[0],
                p = void 0,
                q = void 0,
                r = void 0,
                s = void 0,
                t = e[0].blendMode,
                u = void 0;
              n.textureCount = 0, n.start = 0, n.blend = t, y++;
              var w = void 0;
              for (w = 0; w < this.currentIndex; w++) {
                var z = e[w];
                if (j = z._texture.baseTexture, t !== z.blendMode && (t = z.blendMode, k = null, m = this.MAX_TEXTURES, y++), k !== j && (k = j, j._enabled !== y && (m === this.MAX_TEXTURES && (y++, m = 0, n.size = w - n.start, n = f[l++], n.textureCount = 0, n.blend = t, n.start = w), j._enabled = y, j._id = m, n.textures[n.textureCount++] = j, m++)), p = z.vertexData, q = z._tintRGB + (255 * z.worldAlpha << 24), r = z._texture._uvs.uvsUint32, s = j._id, this.renderer.roundPixels) {
                  var A = this.renderer.resolution;
                  g[i] = (p[0] * A | 0) / A, g[i + 1] = (p[1] * A | 0) / A, g[i + 5] = (p[2] * A | 0) / A, g[i + 6] = (p[3] * A | 0) / A, g[i + 10] = (p[4] * A | 0) / A, g[i + 11] = (p[5] * A | 0) / A, g[i + 15] = (p[6] * A | 0) / A, g[i + 16] = (p[7] * A | 0) / A
                } else g[i] = p[0], g[i + 1] = p[1], g[i + 5] = p[2], g[i + 6] = p[3], g[i + 10] = p[4], g[i + 11] = p[5], g[i + 15] = p[6], g[i + 16] = p[7];
                h[i + 2] = r[0], h[i + 7] = r[1], h[i + 12] = r[2], h[i + 17] = r[3], h[i + 3] = h[i + 8] = h[i + 13] = h[i + 18] = q, g[i + 4] = g[i + 9] = g[i + 14] = g[i + 19] = s, i += 20
              }
              for (n.size = w - n.start, this.vertexCount++, this.vaoMax <= this.vertexCount && (this.vaoMax++, u = this.shaders[1], this.vertexBuffers[this.vertexCount] = v.default.GLBuffer.createVertexBuffer(a, null, a.STREAM_DRAW), this.vaos[this.vertexCount] = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[this.vertexCount], u.attributes.aVertexPosition, a.FLOAT, !1, this.vertByteSize, 0).addAttribute(this.vertexBuffers[this.vertexCount], u.attributes.aTextureCoord, a.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(this.vertexBuffers[this.vertexCount], u.attributes.aColor, a.UNSIGNED_BYTE, !0, this.vertByteSize, 12).addAttribute(this.vertexBuffers[this.vertexCount], u.attributes.aTextureId, a.FLOAT, !1, this.vertByteSize, 16)), this.vertexBuffers[this.vertexCount].upload(d.vertices, 0), this.vao = this.vaos[this.vertexCount].bind(), w = 0; w < l; w++) {
                var B = f[w],
                  C = B.textureCount;
                u = this.shaders[C - 1], u || (u = this.shaders[C - 1] = (0, o.default)(a, C)), this.renderer.bindShader(u);
                for (var D = 0; D < C; D++) this.renderer.bindTexture(B.textures[D], D);
                this.renderer.state.setBlendMode(B.blend), a.drawElements(a.TRIANGLES, 6 * B.size, a.UNSIGNED_SHORT, 6 * B.start * 2)
              }
              this.currentIndex = 0
            }
          }, b.prototype.start = function() {}, b.prototype.stop = function() {
            this.flush(), this.vao.unbind()
          }, b.prototype.destroy = function() {
            for (var b = 0; b < this.vaoMax; b++) this.vertexBuffers[b].destroy(), this.vaos[b].destroy();
            this.indexBuffer.destroy(), this.renderer.off("prerender", this.onPrerender, this), a.prototype.destroy.call(this);
            for (var c = 0; c < this.shaders.length; c++) this.shaders[c] && this.shaders[c].destroy();
            this.vertexBuffers = null, this.vaos = null, this.indexBuffer = null, this.indices = null, this.sprites = null;
            for (var d = 0; d < this.buffers.length; d++) this.buffers[d].destroy()
          }, b
        }(i.default);
      c.default = z, k.default.registerPlugin("sprite", z)
    }, {
      "../../const": 43,
      "../../renderers/webgl/WebGLRenderer": 81,
      "../../renderers/webgl/utils/ObjectRenderer": 91,
      "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 94,
      "../../utils/createIndicesForQuads": 114,
      "./BatchBuffer": 101,
      "./generateMultiTextureShader": 103,
      "bit-twiddle": 1,
      "pixi-gl-core": 12
    }],
    103: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        var c = "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n",
          d = i;
        d = d.replace(/%count%/gi, b), d = d.replace(/%forloop%/gi, f(b));
        for (var e = new h.default(a, c, d), g = [], j = 0; j < b; j++) g[j] = j;
        return e.bind(), e.uniforms.uSamplers = g, e
      }

      function f(a) {
        var b = "";
        b += "\n", b += "\n";
        for (var c = 0; c < a; c++) c > 0 && (b += "\nelse "), c < a - 1 && (b += "if(textureId == " + c + ".0)"), b += "\n{", b += "\n\tcolor = texture2D(uSamplers[" + c + "], vTextureCoord);", b += "\n}";
        return b += "\n", b += "\n"
      }
      c.__esModule = !0, c.default = e;
      var g = a("../../Shader"),
        h = d(g),
        i = ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n")
    }, {
      "../../Shader": 42
    }],
    104: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../sprites/Sprite"),
        j = d(i),
        k = a("../textures/Texture"),
        l = d(k),
        m = a("../math"),
        n = a("../utils"),
        o = a("../const"),
        p = a("./TextStyle"),
        q = d(p),
        r = {
          texture: !0,
          children: !1,
          baseTexture: !0
        },
        s = function(a) {
          function b(c, d) {
            e(this, b);
            var g = document.createElement("canvas");
            g.width = 3, g.height = 3;
            var h = l.default.fromCanvas(g);
            h.orig = new m.Rectangle, h.trim = new m.Rectangle;
            var i = f(this, a.call(this, h));
            return i.canvas = g, i.context = i.canvas.getContext("2d"), i.resolution = o.RESOLUTION, i._text = null, i._style = null, i._styleListener = null, i._font = "", i.text = c, i.style = d, i.localStyleID = -1, i
          }
          return g(b, a), b.prototype.updateText = function(a) {
            var b = this._style;
            if (this.localStyleID !== b.styleID && (this.dirty = !0, this.localStyleID = b.styleID), this.dirty || !a) {
              var c = "number" == typeof b.fontSize ? b.fontSize + "px" : b.fontSize;
              this._font = b.fontStyle + " " + b.fontVariant + " " + b.fontWeight + " " + c + " " + b.fontFamily, this.context.font = this._font;
              for (var d = b.wordWrap ? this.wordWrap(this._text) : this._text, e = d.split(/(?:\r\n|\r|\n)/), f = new Array(e.length), g = 0, h = this.determineFontProperties(this._font), i = 0; i < e.length; i++) {
                var j = this.context.measureText(e[i]).width + (e[i].length - 1) * b.letterSpacing;
                f[i] = j, g = Math.max(g, j)
              }
              var k = g + b.strokeThickness;
              b.dropShadow && (k += b.dropShadowDistance), k += 2 * b.padding, this.canvas.width = Math.ceil((k + this.context.lineWidth) * this.resolution);
              var l = this.style.lineHeight || h.fontSize + b.strokeThickness,
                m = Math.max(l, h.fontSize + b.strokeThickness) + (e.length - 1) * l;
              b.dropShadow && (m += b.dropShadowDistance), this.canvas.height = Math.ceil((m + 2 * this._style.padding) * this.resolution), this.context.scale(this.resolution, this.resolution), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.font = this._font, this.context.strokeStyle = b.stroke, this.context.lineWidth = b.strokeThickness, this.context.textBaseline = b.textBaseline, this.context.lineJoin = b.lineJoin, this.context.miterLimit = b.miterLimit;
              var n = void 0,
                o = void 0;
              if (b.dropShadow) {
                b.dropShadowBlur > 0 ? (this.context.shadowColor = b.dropShadowColor, this.context.shadowBlur = b.dropShadowBlur) : this.context.fillStyle = b.dropShadowColor;
                for (var p = Math.cos(b.dropShadowAngle) * b.dropShadowDistance, q = Math.sin(b.dropShadowAngle) * b.dropShadowDistance, r = 0; r < e.length; r++) n = b.strokeThickness / 2, o = b.strokeThickness / 2 + r * l + h.ascent, "right" === b.align ? n += g - f[r] : "center" === b.align && (n += (g - f[r]) / 2), b.fill && (this.drawLetterSpacing(e[r], n + p + b.padding, o + q + b.padding), b.stroke && b.strokeThickness && (this.context.strokeStyle = b.dropShadowColor, this.drawLetterSpacing(e[r], n + p + b.padding, o + q + b.padding, !0), this.context.strokeStyle = b.stroke))
              }
              this.context.fillStyle = this._generateFillStyle(b, e);
              for (var s = 0; s < e.length; s++) n = b.strokeThickness / 2, o = b.strokeThickness / 2 + s * l + h.ascent, "right" === b.align ? n += g - f[s] : "center" === b.align && (n += (g - f[s]) / 2), b.stroke && b.strokeThickness && this.drawLetterSpacing(e[s], n + b.padding, o + b.padding, !0), b.fill && this.drawLetterSpacing(e[s], n + b.padding, o + b.padding);
              this.updateTexture()
            }
          }, b.prototype.drawLetterSpacing = function(a, b, c) {
            var d = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
              e = this._style,
              f = e.letterSpacing;
            if (0 === f) return void(d ? this.context.strokeText(a, b, c) : this.context.fillText(a, b, c));
            for (var g = String.prototype.split.call(a, ""), h = b, i = 0, j = ""; i < a.length;) j = g[i++], d ? this.context.strokeText(j, h, c) : this.context.fillText(j, h, c), h += this.context.measureText(j).width + f
          }, b.prototype.updateTexture = function() {
            var a = this._texture,
              b = this._style;
            a.baseTexture.hasLoaded = !0, a.baseTexture.resolution = this.resolution, a.baseTexture.realWidth = this.canvas.width, a.baseTexture.realHeight = this.canvas.height, a.baseTexture.width = this.canvas.width / this.resolution, a.baseTexture.height = this.canvas.height / this.resolution, a.trim.width = a._frame.width = this.canvas.width / this.resolution, a.trim.height = a._frame.height = this.canvas.height / this.resolution, a.trim.x = -b.padding, a.trim.y = -b.padding, a.orig.width = a._frame.width - 2 * b.padding, a.orig.height = a._frame.height - 2 * b.padding, this._onTextureUpdate(), a.baseTexture.emit("update", a.baseTexture), this.dirty = !1
          }, b.prototype.renderWebGL = function(b) {
            this.resolution !== b.resolution && (this.resolution = b.resolution, this.dirty = !0), this.updateText(!0), a.prototype.renderWebGL.call(this, b)
          }, b.prototype._renderCanvas = function(b) {
            this.resolution !== b.resolution && (this.resolution = b.resolution, this.dirty = !0), this.updateText(!0), a.prototype._renderCanvas.call(this, b)
          }, b.prototype.determineFontProperties = function(a) {
            var c = b.fontPropertiesCache[a];
            if (!c) {
              c = {};
              var d = b.fontPropertiesCanvas,
                e = b.fontPropertiesContext;
              e.font = a;
              var f = Math.ceil(e.measureText("|MÃ‰q").width),
                g = Math.ceil(e.measureText("M").width),
                h = 2 * g;
              g = 1.4 * g | 0, d.width = f, d.height = h, e.fillStyle = "#f00", e.fillRect(0, 0, f, h), e.font = a, e.textBaseline = "alphabetic", e.fillStyle = "#000", e.fillText("|MÃ‰q", 0, g);
              var i = e.getImageData(0, 0, f, h).data,
                j = i.length,
                k = 4 * f,
                l = 0,
                m = 0,
                n = !1;
              for (l = 0; l < g; ++l) {
                for (var o = 0; o < k; o += 4)
                  if (255 !== i[m + o]) {
                    n = !0;
                    break
                  }
                if (n) break;
                m += k
              }
              for (c.ascent = g - l, m = j - k, n = !1, l = h; l > g; --l) {
                for (var p = 0; p < k; p += 4)
                  if (255 !== i[m + p]) {
                    n = !0;
                    break
                  }
                if (n) break;
                m -= k
              }
              c.descent = l - g, c.fontSize = c.ascent + c.descent, b.fontPropertiesCache[a] = c
            }
            return c
          }, b.prototype.wordWrap = function(a) {
            for (var b = "", c = a.split("\n"), d = this._style.wordWrapWidth, e = 0; e < c.length; e++) {
              for (var f = d, g = c[e].split(" "), h = 0; h < g.length; h++) {
                var i = this.context.measureText(g[h]).width;
                if (this._style.breakWords && i > d)
                  for (var j = g[h].split(""), k = 0; k < j.length; k++) {
                    var l = this.context.measureText(j[k]).width;
                    l > f ? (b += "\n" + j[k], f = d - l) : (0 === k && (b += " "), b += j[k], f -= l)
                  } else {
                    var m = i + this.context.measureText(" ").width;
                    0 === h || m > f ? (h > 0 && (b += "\n"), b += g[h], f = d - i) : (f -= m, b += " " + g[h])
                  }
              }
              e < c.length - 1 && (b += "\n")
            }
            return b
          }, b.prototype._calculateBounds = function() {
            this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData)
          }, b.prototype._onStyleChange = function() {
            this.dirty = !0
          }, b.prototype._generateFillStyle = function(a, b) {
            if (!Array.isArray(a.fill)) return a.fill;
            if (navigator.isCocoonJS) return a.fill[0];
            var c = void 0,
              d = void 0,
              e = void 0,
              f = void 0,
              g = this.canvas.width / this.resolution,
              h = this.canvas.height / this.resolution;
            if (a.fillGradientType === o.TEXT_GRADIENT.LINEAR_VERTICAL) {
              c = this.context.createLinearGradient(g / 2, 0, g / 2, h), d = (a.fill.length + 1) * b.length, e = 0;
              for (var i = 0; i < b.length; i++) {
                e += 1;
                for (var j = 0; j < a.fill.length; j++) f = e / d, c.addColorStop(f, a.fill[j]), e++
              }
            } else {
              c = this.context.createLinearGradient(0, h / 2, g, h / 2), d = a.fill.length + 1, e = 1;
              for (var k = 0; k < a.fill.length; k++) f = e / d, c.addColorStop(f, a.fill[k]), e++
            }
            return c
          }, b.prototype.destroy = function(b) {
            "boolean" == typeof b && (b = {
              children: b
            }), b = Object.assign({}, r, b), a.prototype.destroy.call(this, b), this.context = null, this.canvas = null, this._style = null
          }, h(b, [{
            key: "width",
            get: function() {
              return this.updateText(!0), Math.abs(this.scale.x) * this.texture.orig.width
            },
            set: function(a) {
              this.updateText(!0);
              var b = (0, n.sign)(this.scale.x) || 1;
              this.scale.x = b * a / this.texture.orig.width, this._width = a
            }
          }, {
            key: "height",
            get: function() {
              return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height
            },
            set: function(a) {
              this.updateText(!0);
              var b = (0, n.sign)(this.scale.y) || 1;
              this.scale.y = b * a / this.texture.orig.height, this._height = a
            }
          }, {
            key: "style",
            get: function() {
              return this._style
            },
            set: function(a) {
              a = a || {}, a instanceof q.default ? this._style = a : this._style = new q.default(a), this.localStyleID = -1, this.dirty = !0
            }
          }, {
            key: "text",
            get: function() {
              return this._text
            },
            set: function(a) {
              a = a || " ", a = a.toString(), this._text !== a && (this._text = a, this.dirty = !0)
            }
          }]), b
        }(j.default);
      c.default = s, s.fontPropertiesCache = {}, s.fontPropertiesCanvas = document.createElement("canvas"), s.fontPropertiesContext = s.fontPropertiesCanvas.getContext("2d")
    }, {
      "../const": 43,
      "../math": 67,
      "../sprites/Sprite": 98,
      "../textures/Texture": 109,
      "../utils": 116,
      "./TextStyle": 105
    }],
    105: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function e(a) {
        if ("number" == typeof a) return (0, h.hex2string)(a);
        if (Array.isArray(a))
          for (var b = 0; b < a.length; ++b) "number" == typeof a[b] && (a[b] = (0, h.hex2string)(a[b]));
        return a
      }
      c.__esModule = !0;
      var f = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        g = a("../const"),
        h = a("../utils"),
        i = {
          align: "left",
          breakWords: !1,
          dropShadow: !1,
          dropShadowAngle: Math.PI / 6,
          dropShadowBlur: 0,
          dropShadowColor: "#000000",
          dropShadowDistance: 5,
          fill: "black",
          fillGradientType: g.TEXT_GRADIENT.LINEAR_VERTICAL,
          fontFamily: "Arial",
          fontSize: 26,
          fontStyle: "normal",
          fontVariant: "normal",
          fontWeight: "normal",
          letterSpacing: 0,
          lineHeight: 0,
          lineJoin: "miter",
          miterLimit: 10,
          padding: 0,
          stroke: "black",
          strokeThickness: 0,
          textBaseline: "alphabetic",
          wordWrap: !1,
          wordWrapWidth: 100
        },
        j = function() {
          function a(b) {
            d(this, a), this.styleID = 0, Object.assign(this, i, b)
          }
          return a.prototype.clone = function() {
            var b = {};
            for (var c in this._defaults) b[c] = this[c];
            return new a(b)
          }, a.prototype.reset = function() {
            Object.assign(this, this._defaults)
          }, f(a, [{
            key: "align",
            get: function() {
              return this._align
            },
            set: function(a) {
              this._align !== a && (this._align = a, this.styleID++)
            }
          }, {
            key: "breakWords",
            get: function() {
              return this._breakWords
            },
            set: function(a) {
              this._breakWords !== a && (this._breakWords = a, this.styleID++)
            }
          }, {
            key: "dropShadow",
            get: function() {
              return this._dropShadow
            },
            set: function(a) {
              this._dropShadow !== a && (this._dropShadow = a, this.styleID++)
            }
          }, {
            key: "dropShadowAngle",
            get: function() {
              return this._dropShadowAngle
            },
            set: function(a) {
              this._dropShadowAngle !== a && (this._dropShadowAngle = a, this.styleID++)
            }
          }, {
            key: "dropShadowBlur",
            get: function() {
              return this._dropShadowBlur
            },
            set: function(a) {
              this._dropShadowBlur !== a && (this._dropShadowBlur = a, this.styleID++)
            }
          }, {
            key: "dropShadowColor",
            get: function() {
              return this._dropShadowColor
            },
            set: function(a) {
              var b = e(a);
              this._dropShadowColor !== b && (this._dropShadowColor = b, this.styleID++)
            }
          }, {
            key: "dropShadowDistance",
            get: function() {
              return this._dropShadowDistance
            },
            set: function(a) {
              this._dropShadowDistance !== a && (this._dropShadowDistance = a, this.styleID++)
            }
          }, {
            key: "fill",
            get: function() {
              return this._fill
            },
            set: function(a) {
              var b = e(a);
              this._fill !== b && (this._fill = b, this.styleID++)
            }
          }, {
            key: "fillGradientType",
            get: function() {
              return this._fillGradientType
            },
            set: function(a) {
              this._fillGradientType !== a && (this._fillGradientType = a, this.styleID++)
            }
          }, {
            key: "fontFamily",
            get: function() {
              return this._fontFamily
            },
            set: function(a) {
              this.fontFamily !== a && (this._fontFamily = a, this.styleID++)
            }
          }, {
            key: "fontSize",
            get: function() {
              return this._fontSize
            },
            set: function(a) {
              this._fontSize !== a && (this._fontSize = a, this.styleID++)
            }
          }, {
            key: "fontStyle",
            get: function() {
              return this._fontStyle
            },
            set: function(a) {
              this._fontStyle !== a && (this._fontStyle = a, this.styleID++)
            }
          }, {
            key: "fontVariant",
            get: function() {
              return this._fontVariant
            },
            set: function(a) {
              this._fontVariant !== a && (this._fontVariant = a, this.styleID++)
            }
          }, {
            key: "fontWeight",
            get: function() {
              return this._fontWeight
            },
            set: function(a) {
              this._fontWeight !== a && (this._fontWeight = a, this.styleID++)
            }
          }, {
            key: "letterSpacing",
            get: function() {
              return this._letterSpacing
            },
            set: function(a) {
              this._letterSpacing !== a && (this._letterSpacing = a, this.styleID++)
            }
          }, {
            key: "lineHeight",
            get: function() {
              return this._lineHeight
            },
            set: function(a) {
              this._lineHeight !== a && (this._lineHeight = a, this.styleID++)
            }
          }, {
            key: "lineJoin",
            get: function() {
              return this._lineJoin
            },
            set: function(a) {
              this._lineJoin !== a && (this._lineJoin = a, this.styleID++)
            }
          }, {
            key: "miterLimit",
            get: function() {
              return this._miterLimit
            },
            set: function(a) {
              this._miterLimit !== a && (this._miterLimit = a, this.styleID++)
            }
          }, {
            key: "padding",
            get: function() {
              return this._padding
            },
            set: function(a) {
              this._padding !== a && (this._padding = a, this.styleID++)
            }
          }, {
            key: "stroke",
            get: function() {
              return this._stroke
            },
            set: function(a) {
              var b = e(a);
              this._stroke !== b && (this._stroke = b, this.styleID++)
            }
          }, {
            key: "strokeThickness",
            get: function() {
              return this._strokeThickness
            },
            set: function(a) {
              this._strokeThickness !== a && (this._strokeThickness = a, this.styleID++)
            }
          }, {
            key: "textBaseline",
            get: function() {
              return this._textBaseline
            },
            set: function(a) {
              this._textBaseline !== a && (this._textBaseline = a, this.styleID++)
            }
          }, {
            key: "wordWrap",
            get: function() {
              return this._wordWrap
            },
            set: function(a) {
              this._wordWrap !== a && (this._wordWrap = a, this.styleID++)
            }
          }, {
            key: "wordWrapWidth",
            get: function() {
              return this._wordWrapWidth
            },
            set: function(a) {
              this._wordWrapWidth !== a && (this._wordWrapWidth = a, this.styleID++)
            }
          }]), a
        }();
      c.default = j
    }, {
      "../const": 43,
      "../utils": 116
    }],
    106: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("./BaseTexture"),
        i = d(h),
        j = a("../const"),
        k = function(a) {
          function b() {
            var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100,
              d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
              g = arguments[2],
              h = arguments[3];
            e(this, b);
            var i = f(this, a.call(this, null, g));
            return i.resolution = h || j.RESOLUTION, i.width = c, i.height = d, i.realWidth = i.width * i.resolution, i.realHeight = i.height * i.resolution, i.scaleMode = g || j.SCALE_MODES.DEFAULT, i.hasLoaded = !0, i._glRenderTargets = {}, i._canvasRenderTarget = null, i.valid = !1, i
          }
          return g(b, a), b.prototype.resize = function(a, b) {
            a === this.width && b === this.height || (this.valid = a > 0 && b > 0, this.width = a, this.height = b, this.realWidth = this.width * this.resolution, this.realHeight = this.height * this.resolution, this.valid && this.emit("update", this))
          }, b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0), this.renderer = null
          }, b
        }(i.default);
      c.default = k
    }, {
      "../const": 43,
      "./BaseTexture": 107
    }],
    107: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
          return typeof a
        } : function(a) {
          return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        },
        i = a("../utils"),
        j = a("../const"),
        k = a("eventemitter3"),
        l = d(k),
        m = a("../utils/determineCrossOrigin"),
        n = d(m),
        o = a("bit-twiddle"),
        p = d(o),
        q = function(a) {
          function b(c, d, g) {
            e(this, b);
            var h = f(this, a.call(this));
            return h.uid = (0, i.uid)(), h.touched = 0, h.resolution = g || j.RESOLUTION, h.width = 100, h.height = 100, h.realWidth = 100, h.realHeight = 100, h.scaleMode = d || j.SCALE_MODES.DEFAULT, h.hasLoaded = !1, h.isLoading = !1, h.source = null, h.origSource = null, h.imageType = null, h.sourceScale = 1, h.premultipliedAlpha = !0, h.imageUrl = null, h.isPowerOfTwo = !1, h.mipmap = j.MIPMAP_TEXTURES, h.wrapMode = j.WRAP_MODES.DEFAULT, h._glTextures = {}, h._enabled = 0, h._id = 0, c && h.loadSource(c), h
          }
          return g(b, a), b.prototype.update = function() {
            "svg" !== this.imageType && (this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width, this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height, this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, this.isPowerOfTwo = p.default.isPow2(this.realWidth) && p.default.isPow2(this.realHeight)), this.emit("update", this)
          }, b.prototype.loadSource = function(a) {
            var b = this,
              c = this.isLoading;
            this.hasLoaded = !1, this.isLoading = !1, c && this.source && (this.source.onload = null, this.source.onerror = null);
            var d = !this.source;
            if (this.source = a, (a.src && a.complete || a.getContext) && a.width && a.height) this._updateImageType(), "svg" === this.imageType ? this._loadSvgSource() : this._sourceLoaded(),
              d && this.emit("loaded", this);
            else if (!a.getContext) {
              var e = function() {
                b.isLoading = !0;
                var d = b;
                if (a.onload = function() {
                    if (d._updateImageType(), a.onload = null, a.onerror = null, d.isLoading) return d.isLoading = !1, d._sourceLoaded(), "svg" === d.imageType ? void d._loadSvgSource() : void d.emit("loaded", d)
                  }, a.onerror = function() {
                    a.onload = null, a.onerror = null, d.isLoading && (d.isLoading = !1, d.emit("error", d))
                  }, a.complete && a.src) {
                  if (a.onload = null, a.onerror = null, "svg" === d.imageType) return d._loadSvgSource(), {
                    v: void 0
                  };
                  b.isLoading = !1, a.width && a.height ? (b._sourceLoaded(), c && b.emit("loaded", b)) : c && b.emit("error", b)
                }
              }();
              if ("object" === ("undefined" == typeof e ? "undefined" : h(e))) return e.v
            }
          }, b.prototype._updateImageType = function() {
            if (this.imageUrl) {
              var a = (0, i.decomposeDataUri)(this.imageUrl),
                b = void 0;
              if (a && "image" === a.mediaType) {
                var c = a.subType.split("+")[0];
                if (b = (0, i.getUrlFileExtension)("." + c), !b) throw new Error("Invalid image type in data URI.")
              } else if (b = (0, i.getUrlFileExtension)(this.imageUrl), !b) throw new Error("Invalid image type in URL.");
              this.imageType = b
            }
          }, b.prototype._loadSvgSource = function() {
            if ("svg" === this.imageType) {
              var a = (0, i.decomposeDataUri)(this.imageUrl);
              a ? this._loadSvgSourceUsingDataUri(a) : this._loadSvgSourceUsingXhr()
            }
          }, b.prototype._loadSvgSourceUsingDataUri = function(a) {
            var b = void 0;
            if ("base64" === a.encoding) {
              if (!atob) throw new Error("Your browser doesn't support base64 conversions.");
              b = atob(a.data)
            } else b = a.data;
            this._loadSvgSourceUsingString(b)
          }, b.prototype._loadSvgSourceUsingXhr = function() {
            var a = this,
              b = new XMLHttpRequest;
            b.onload = function() {
              if (b.readyState !== b.DONE || 200 !== b.status) throw new Error("Failed to load SVG using XHR.");
              a._loadSvgSourceUsingString(b.response)
            }, b.onerror = function() {
              return a.emit("error", a)
            }, b.open("GET", this.imageUrl, !0), b.send()
          }, b.prototype._loadSvgSourceUsingString = function(a) {
            var b = (0, i.getSvgSize)(a),
              c = b.width,
              d = b.height;
            if (!c || !d) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
            this.realWidth = Math.round(c * this.sourceScale), this.realHeight = Math.round(d * this.sourceScale), this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, this.isPowerOfTwo = p.default.isPow2(this.realWidth) && p.default.isPow2(this.realHeight);
            var e = document.createElement("canvas");
            e.width = this.realWidth, e.height = this.realHeight, e._pixiId = "canvas_" + (0, i.uid)(), e.getContext("2d").drawImage(this.source, 0, 0, c, d, 0, 0, this.realWidth, this.realHeight), this.origSource = this.source, this.source = e, i.BaseTextureCache[e._pixiId] = this, this.isLoading = !1, this._sourceLoaded(), this.emit("loaded", this)
          }, b.prototype._sourceLoaded = function() {
            this.hasLoaded = !0, this.update()
          }, b.prototype.destroy = function() {
            this.imageUrl && (delete i.BaseTextureCache[this.imageUrl], delete i.TextureCache[this.imageUrl], this.imageUrl = null, navigator.isCocoonJS || (this.source.src = "")), this.source && this.source._pixiId && delete i.BaseTextureCache[this.source._pixiId], this.source = null, this.dispose()
          }, b.prototype.dispose = function() {
            this.emit("dispose", this)
          }, b.prototype.updateSourceImage = function(a) {
            this.source.src = a, this.loadSource(this.source)
          }, b.fromImage = function(a, c, d, e) {
            var f = i.BaseTextureCache[a];
            if (!f) {
              var g = new Image;
              void 0 === c && 0 !== a.indexOf("data:") && (g.crossOrigin = (0, n.default)(a)), f = new b(g, d), f.imageUrl = a, e && (f.sourceScale = e), f.resolution = (0, i.getResolutionOfUrl)(a), g.src = a, i.BaseTextureCache[a] = f
            }
            return f
          }, b.fromCanvas = function(a, c) {
            a._pixiId || (a._pixiId = "canvas_" + (0, i.uid)());
            var d = i.BaseTextureCache[a._pixiId];
            return d || (d = new b(a, c), i.BaseTextureCache[a._pixiId] = d), d
          }, b
        }(l.default);
      c.default = q
    }, {
      "../const": 43,
      "../utils": 116,
      "../utils/determineCrossOrigin": 115,
      "bit-twiddle": 1,
      eventemitter3: 3
    }],
    108: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("./BaseRenderTexture"),
        i = d(h),
        j = a("./Texture"),
        k = d(j),
        l = function(a) {
          function b(c, d) {
            e(this, b);
            var g = null;
            if (!(c instanceof i.default)) {
              var h = arguments[1],
                j = arguments[2],
                k = arguments[3] || 0,
                l = arguments[4] || 1;
              console.warn("Please use RenderTexture.create(" + h + ", " + j + ") instead of the ctor directly."), g = arguments[0], d = null, c = new i.default(h, j, k, l)
            }
            var m = f(this, a.call(this, c, d));
            return m.legacyRenderer = g, m.valid = !0, m._updateUvs(), m
          }
          return g(b, a), b.prototype.resize = function(a, b, c) {
            this.valid = a > 0 && b > 0, this._frame.width = this.orig.width = a, this._frame.height = this.orig.height = b, c || this.baseTexture.resize(a, b), this._updateUvs()
          }, b.create = function(a, c, d, e) {
            return new b(new i.default(a, c, d, e))
          }, b
        }(k.default);
      c.default = l
    }, {
      "./BaseRenderTexture": 106,
      "./Texture": 109
    }],
    109: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("./BaseTexture"),
        j = d(i),
        k = a("./VideoBaseTexture"),
        l = d(k),
        m = a("./TextureUvs"),
        n = d(m),
        o = a("eventemitter3"),
        p = d(o),
        q = a("../math"),
        r = a("../utils"),
        s = function(a) {
          function b(c, d, g, h, i) {
            e(this, b);
            var j = f(this, a.call(this));
            if (j.noFrame = !1, d || (j.noFrame = !0, d = new q.Rectangle(0, 0, 1, 1)), c instanceof b && (c = c.baseTexture), j.baseTexture = c, j._frame = d, j.trim = h, j.valid = !1, j.requiresUpdate = !1, j._uvs = null, j.orig = g || d, j._rotate = Number(i || 0), i === !0) j._rotate = 2;
            else if (j._rotate % 2 !== 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
            return c.hasLoaded ? (j.noFrame && (d = new q.Rectangle(0, 0, c.width, c.height), c.on("update", j.onBaseTextureUpdated, j)), j.frame = d) : c.once("loaded", j.onBaseTextureLoaded, j), j._updateID = 0, j.transform = null, j
          }
          return g(b, a), b.prototype.update = function() {
            this.baseTexture.update()
          }, b.prototype.onBaseTextureLoaded = function(a) {
            this._updateID++, this.noFrame ? this.frame = new q.Rectangle(0, 0, a.width, a.height) : this.frame = this._frame, this.baseTexture.on("update", this.onBaseTextureUpdated, this), this.emit("update", this)
          }, b.prototype.onBaseTextureUpdated = function(a) {
            this._updateID++, this._frame.width = a.width, this._frame.height = a.height, this.emit("update", this)
          }, b.prototype.destroy = function(a) {
            this.baseTexture && (a && (r.TextureCache[this.baseTexture.imageUrl] && delete r.TextureCache[this.baseTexture.imageUrl], this.baseTexture.destroy()), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null), this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, this.off("dispose", this.dispose, this), this.off("update", this.update, this)
          }, b.prototype.clone = function() {
            return new b(this.baseTexture, this.frame, this.orig, this.trim, this.rotate)
          }, b.prototype._updateUvs = function() {
            this._uvs || (this._uvs = new n.default), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++
          }, b.fromImage = function(a, c, d, e) {
            var f = r.TextureCache[a];
            return f || (f = new b(j.default.fromImage(a, c, d, e)), r.TextureCache[a] = f), f
          }, b.fromFrame = function(a) {
            var b = r.TextureCache[a];
            if (!b) throw new Error('The frameId "' + a + '" does not exist in the texture cache');
            return b
          }, b.fromCanvas = function(a, c) {
            return new b(j.default.fromCanvas(a, c))
          }, b.fromVideo = function(a, c) {
            return "string" == typeof a ? b.fromVideoUrl(a, c) : new b(l.default.fromVideo(a, c))
          }, b.fromVideoUrl = function(a, c) {
            return new b(l.default.fromUrl(a, c))
          }, b.from = function(a) {
            if ("string" == typeof a) {
              var c = r.TextureCache[a];
              if (!c) {
                var d = null !== a.match(/\.(mp4|webm|ogg|h264|avi|mov)$/);
                return d ? b.fromVideoUrl(a) : b.fromImage(a)
              }
              return c
            }
            return a instanceof HTMLImageElement ? new b(new j.default(a)) : a instanceof HTMLCanvasElement ? b.fromCanvas(a) : a instanceof HTMLVideoElement ? b.fromVideo(a) : a instanceof j.default ? new b(a) : a
          }, b.addTextureToCache = function(a, b) {
            r.TextureCache[b] = a
          }, b.removeTextureFromCache = function(a) {
            var b = r.TextureCache[a];
            return delete r.TextureCache[a], delete r.BaseTextureCache[a], b
          }, h(b, [{
            key: "frame",
            get: function() {
              return this._frame
            },
            set: function(a) {
              if (this._frame = a, this.noFrame = !1, a.x + a.width > this.baseTexture.width || a.y + a.height > this.baseTexture.height) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
              this.valid = a && a.width && a.height && this.baseTexture.hasLoaded, this.trim || this.rotate || (this.orig = a), this.valid && this._updateUvs()
            }
          }, {
            key: "rotate",
            get: function() {
              return this._rotate
            },
            set: function(a) {
              this._rotate = a, this.valid && this._updateUvs()
            }
          }, {
            key: "width",
            get: function() {
              return this.orig ? this.orig.width : 0
            }
          }, {
            key: "height",
            get: function() {
              return this.orig ? this.orig.height : 0
            }
          }]), b
        }(p.default);
      c.default = s, s.EMPTY = new s(new j.default), s.EMPTY.destroy = function() {}, s.EMPTY.on = function() {}, s.EMPTY.once = function() {}, s.EMPTY.emit = function() {}
    }, {
      "../math": 67,
      "../utils": 116,
      "./BaseTexture": 107,
      "./TextureUvs": 110,
      "./VideoBaseTexture": 111,
      eventemitter3: 3
    }],
    110: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("../math/GroupD8"),
        g = d(f),
        h = function() {
          function a() {
            e(this, a), this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsUint32 = new Uint32Array(4)
          }
          return a.prototype.set = function(a, b, c) {
            var d = b.width,
              e = b.height;
            if (c) {
              var f = a.width / 2 / d,
                h = a.height / 2 / e,
                i = a.x / d + f,
                j = a.y / e + h;
              c = g.default.add(c, g.default.NW), this.x0 = i + f * g.default.uX(c), this.y0 = j + h * g.default.uY(c), c = g.default.add(c, 2), this.x1 = i + f * g.default.uX(c), this.y1 = j + h * g.default.uY(c), c = g.default.add(c, 2), this.x2 = i + f * g.default.uX(c), this.y2 = j + h * g.default.uY(c), c = g.default.add(c, 2), this.x3 = i + f * g.default.uX(c), this.y3 = j + h * g.default.uY(c)
            } else this.x0 = a.x / d, this.y0 = a.y / e, this.x1 = (a.x + a.width) / d, this.y1 = a.y / e, this.x2 = (a.x + a.width) / d, this.y2 = (a.y + a.height) / e, this.x3 = a.x / d, this.y3 = (a.y + a.height) / e;
            this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535, this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535, this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535, this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535
          }, a
        }();
      c.default = h
    }, {
      "../math/GroupD8": 63
    }],
    111: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }

      function i(a, b) {
        b || (b = "video/" + a.substr(a.lastIndexOf(".") + 1));
        var c = document.createElement("source");
        return c.src = a, c.type = b, c
      }
      c.__esModule = !0;
      var j = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        k = a("./BaseTexture"),
        l = e(k),
        m = a("../utils"),
        n = a("../ticker"),
        o = d(n),
        p = function(a) {
          function b(c, d) {
            if (f(this, b), !c) throw new Error("No video source element specified.");
            (c.readyState === c.HAVE_ENOUGH_DATA || c.readyState === c.HAVE_FUTURE_DATA) && c.width && c.height && (c.complete = !0);
            var e = g(this, a.call(this, c, d));
            return e.width = c.videoWidth, e.height = c.videoHeight, e._autoUpdate = !0, e._isAutoUpdating = !1, e.autoPlay = !0, e.update = e.update.bind(e), e._onCanPlay = e._onCanPlay.bind(e), c.addEventListener("play", e._onPlayStart.bind(e)), c.addEventListener("pause", e._onPlayStop.bind(e)), e.hasLoaded = !1, e.__loaded = !1, e._isSourceReady() ? e._onCanPlay() : (c.addEventListener("canplay", e._onCanPlay), c.addEventListener("canplaythrough", e._onCanPlay)), e
          }
          return h(b, a), b.prototype._isSourcePlaying = function() {
            var a = this.source;
            return a.currentTime > 0 && a.paused === !1 && a.ended === !1 && a.readyState > 2
          }, b.prototype._isSourceReady = function() {
            return 3 === this.source.readyState || 4 === this.source.readyState
          }, b.prototype._onPlayStart = function() {
            this.hasLoaded || this._onCanPlay(), !this._isAutoUpdating && this.autoUpdate && (o.shared.add(this.update, this), this._isAutoUpdating = !0)
          }, b.prototype._onPlayStop = function() {
            this._isAutoUpdating && (o.shared.remove(this.update, this), this._isAutoUpdating = !1)
          }, b.prototype._onCanPlay = function() {
            this.hasLoaded = !0, this.source && (this.source.removeEventListener("canplay", this._onCanPlay), this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, this.height = this.source.videoHeight, this.__loaded || (this.__loaded = !0, this.emit("loaded", this)), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.source.play())
          }, b.prototype.destroy = function() {
            this._isAutoUpdating && o.shared.remove(this.update, this), this.source && this.source._pixiId && (delete m.BaseTextureCache[this.source._pixiId], delete this.source._pixiId), a.prototype.destroy.call(this)
          }, b.fromVideo = function(a, c) {
            a._pixiId || (a._pixiId = "video_" + (0, m.uid)());
            var d = m.BaseTextureCache[a._pixiId];
            return d || (d = new b(a, c), m.BaseTextureCache[a._pixiId] = d), d
          }, b.fromUrl = function(a, c) {
            var d = document.createElement("video");
            if (d.setAttribute("webkit-playsinline", ""), d.setAttribute("playsinline", ""), Array.isArray(a))
              for (var e = 0; e < a.length; ++e) d.appendChild(i(a[e].src || a[e], a[e].mime));
            else d.appendChild(i(a.src || a, a.mime));
            return d.load(), b.fromVideo(d, c)
          }, j(b, [{
            key: "autoUpdate",
            get: function() {
              return this._autoUpdate
            },
            set: function(a) {
              a !== this._autoUpdate && (this._autoUpdate = a, !this._autoUpdate && this._isAutoUpdating ? (o.shared.remove(this.update, this), this._isAutoUpdating = !1) : this._autoUpdate && !this._isAutoUpdating && (o.shared.add(this.update, this), this._isAutoUpdating = !0))
            }
          }]), b
        }(l.default);
      c.default = p, p.fromUrls = p.fromUrl
    }, {
      "../ticker": 113,
      "../utils": 116,
      "./BaseTexture": 107
    }],
    112: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        g = a("../const"),
        h = a("eventemitter3"),
        i = d(h),
        j = "tick",
        k = function() {
          function a() {
            var b = this;
            e(this, a), this._emitter = new i.default, this._requestId = null, this._maxElapsedMS = 100, this.autoStart = !1, this.deltaTime = 1, this.elapsedMS = 1 / g.TARGET_FPMS, this.lastTime = 0, this.speed = 1, this.started = !1, this._tick = function(a) {
              b._requestId = null, b.started && (b.update(a), b.started && null === b._requestId && b._emitter.listeners(j, !0) && (b._requestId = requestAnimationFrame(b._tick)))
            }
          }
          return a.prototype._requestIfNeeded = function() {
            null === this._requestId && this._emitter.listeners(j, !0) && (this.lastTime = performance.now(), this._requestId = requestAnimationFrame(this._tick))
          }, a.prototype._cancelIfNeeded = function() {
            null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
          }, a.prototype._startIfPossible = function() {
            this.started ? this._requestIfNeeded() : this.autoStart && this.start()
          }, a.prototype.add = function(a, b) {
            return this._emitter.on(j, a, b), this._startIfPossible(), this
          }, a.prototype.addOnce = function(a, b) {
            return this._emitter.once(j, a, b), this._startIfPossible(), this
          }, a.prototype.remove = function(a, b) {
            return this._emitter.off(j, a, b), this._emitter.listeners(j, !0) || this._cancelIfNeeded(), this
          }, a.prototype.start = function() {
            this.started || (this.started = !0, this._requestIfNeeded())
          }, a.prototype.stop = function() {
            this.started && (this.started = !1, this._cancelIfNeeded())
          }, a.prototype.update = function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : performance.now(),
              b = void 0;
            a > this.lastTime ? (b = this.elapsedMS = a - this.lastTime, b > this._maxElapsedMS && (b = this._maxElapsedMS), this.deltaTime = b * g.TARGET_FPMS * this.speed, this._emitter.emit(j, this.deltaTime)) : this.deltaTime = this.elapsedMS = 0, this.lastTime = a
          }, f(a, [{
            key: "FPS",
            get: function() {
              return 1e3 / this.elapsedMS
            }
          }, {
            key: "minFPS",
            get: function() {
              return 1e3 / this._maxElapsedMS
            },
            set: function(a) {
              var b = Math.min(Math.max(0, a) / 1e3, g.TARGET_FPMS);
              this._maxElapsedMS = 1 / b
            }
          }]), a
        }();
      c.default = k
    }, {
      "../const": 43,
      eventemitter3: 3
    }],
    113: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0, c.Ticker = c.shared = void 0;
      var e = a("./Ticker"),
        f = d(e),
        g = new f.default;
      g.autoStart = !0, c.shared = g, c.Ticker = f.default
    }, {
      "./Ticker": 112
    }],
    114: [function(a, b, c) {
      "use strict";

      function d(a) {
        for (var b = 6 * a, c = new Uint16Array(b), d = 0, e = 0; d < b; d += 6, e += 4) c[d + 0] = e + 0, c[d + 1] = e + 1, c[d + 2] = e + 2, c[d + 3] = e + 0, c[d + 4] = e + 2, c[d + 5] = e + 3;
        return c
      }
      c.__esModule = !0, c.default = d
    }, {}],
    115: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location;
        if (0 === a.indexOf("data:")) return "";
        b = b || window.location, h || (h = document.createElement("a")), h.href = a, a = g.default.parse(h.href);
        var c = !a.port && "" === b.port || a.port === b.port;
        return a.hostname === b.hostname && c && a.protocol === b.protocol ? "" : "anonymous"
      }
      c.__esModule = !0, c.default = e;
      var f = a("url"),
        g = d(f),
        h = void 0
    }, {
      url: 28
    }],
    116: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e() {
        return ++w
      }

      function f(a, b) {
        return b = b || [], b[0] = (a >> 16 & 255) / 255, b[1] = (a >> 8 & 255) / 255, b[2] = (255 & a) / 255, b
      }

      function g(a) {
        return a = a.toString(16), a = "000000".substr(0, 6 - a.length) + a, "#" + a
      }

      function h(a) {
        return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
      }

      function i(a) {
        var b = r.RETINA_PREFIX.exec(a);
        return b ? parseFloat(b[1]) : 1
      }

      function j(a) {
        var b = r.DATA_URI.exec(a);
        if (b) return {
          mediaType: b[1] ? b[1].toLowerCase() : void 0,
          subType: b[2] ? b[2].toLowerCase() : void 0,
          encoding: b[3] ? b[3].toLowerCase() : void 0,
          data: b[4]
        }
      }

      function k(a) {
        var b = r.URL_FILE_EXTENSION.exec(a);
        if (b) return b[1].toLowerCase()
      }

      function l(a) {
        var b = r.SVG_SIZE.exec(a),
          c = {};
        return b && (c[b[1]] = Math.round(parseFloat(b[2])), c[b[3]] = Math.round(parseFloat(b[4]))), c
      }

      function m() {
        x = !0
      }

      function n(a) {
        if (!x) {
          if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var b = [""];
            window.console.log.apply(console, b)
          } else window.console && window.console.log("");
          x = !0
        }
      }

      function o() {
        var a = {
          stencil: !0,
          failIfMajorPerformanceCaveat: !0
        };
        try {
          if (!window.WebGLRenderingContext) return !1;
          var b = document.createElement("canvas"),
            c = b.getContext("webgl", a) || b.getContext("experimental-webgl", a),
            d = !(!c || !c.getContextAttributes().stencil);
          if (c) {
            var e = c.getExtension("WEBGL_lose_context");
            e && e.loseContext()
          }
          return c = null, d
        } catch (a) {
          return !1
        }
      }

      function p(a) {
        return 0 === a ? 0 : a < 0 ? -1 : 1
      }

      function q(a, b, c) {
        var d = a.length;
        if (!(b >= d || 0 === c)) {
          c = b + c > d ? d - b : c;
          for (var e = d - c, f = b; f < e; ++f) a[f] = a[f + c];
          a.length = e
        }
      }
      c.__esModule = !0, c.BaseTextureCache = c.TextureCache = c.pluginTarget = c.EventEmitter = void 0, c.uid = e, c.hex2rgb = f, c.hex2string = g, c.rgb2hex = h, c.getResolutionOfUrl = i, c.decomposeDataUri = j, c.getUrlFileExtension = k, c.getSvgSize = l, c.skipHello = m, c.sayHello = n, c.isWebGLSupported = o, c.sign = p, c.removeItems = q;
      var r = a("../const"),
        s = a("eventemitter3"),
        t = d(s),
        u = a("./pluginTarget"),
        v = d(u),
        w = 0,
        x = !1;
      c.EventEmitter = t.default, c.pluginTarget = v.default, c.TextureCache = {}, c.BaseTextureCache = {}
    }, {
      "../const": 43,
      "./pluginTarget": 118,
      eventemitter3: 3
    }],
    117: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        return g.default.tablet || g.default.phone ? 2 : a
      }
      c.__esModule = !0, c.default = e;
      var f = a("ismobilejs"),
        g = d(f)
    }, {
      ismobilejs: 4
    }],
    118: [function(a, b, c) {
      "use strict";

      function d(a) {
        a.__plugins = {}, a.registerPlugin = function(b, c) {
          a.__plugins[b] = c
        }, a.prototype.initPlugins = function() {
          this.plugins = this.plugins || {};
          for (var b in a.__plugins) this.plugins[b] = new a.__plugins[b](this)
        }, a.prototype.destroyPlugins = function() {
          for (var a in this.plugins) this.plugins[a].destroy(), this.plugins[a] = null;
          this.plugins = null
        }
      }
      c.__esModule = !0, c.default = {
        mixin: function(a) {
          d(a)
        }
      }
    }, {}],
    119: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a) {}
      var f = a("./core"),
        g = d(f),
        h = a("./mesh"),
        i = d(h),
        j = a("./particles"),
        k = d(j),
        l = a("./extras"),
        m = d(l),
        n = a("./filters"),
        o = d(n);
      g.SpriteBatch = function() {
        throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
      }, g.AssetLoader = function() {
        throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")
      }, Object.defineProperties(g, {
        Stage: {
          enumerable: !0,
          get: function() {
            return e("You do not need to use a PIXI Stage any more, you can simply render any container."), g.Container
          }
        },
        DisplayObjectContainer: {
          enumerable: !0,
          get: function() {
            return e("DisplayObjectContainer has been shortened to Container, please use Container from now on."), g.Container
          }
        },
        Strip: {
          enumerable: !0,
          get: function() {
            return e("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), i.Mesh
          }
        },
        Rope: {
          enumerable: !0,
          get: function() {
            return e("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), i.Rope
          }
        },
        ParticleContainer: {
          enumerable: !0,
          get: function() {
            return e("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."), k.ParticleContainer
          }
        },
        MovieClip: {
          enumerable: !0,
          get: function() {
            return e("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."), m.MovieClip
          }
        },
        TilingSprite: {
          enumerable: !0,
          get: function() {
            return e("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), m.TilingSprite
          }
        },
        BitmapText: {
          enumerable: !0,
          get: function() {
            return e("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), m.BitmapText
          }
        },
        blendModes: {
          enumerable: !0,
          get: function() {
            return e("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), g.BLEND_MODES
          }
        },
        scaleModes: {
          enumerable: !0,
          get: function() {
            return e("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), g.SCALE_MODES
          }
        },
        BaseTextureCache: {
          enumerable: !0,
          get: function() {
            return e("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), g.utils.BaseTextureCache
          }
        },
        TextureCache: {
          enumerable: !0,
          get: function() {
            return e("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), g.utils.TextureCache
          }
        },
        math: {
          enumerable: !0,
          get: function() {
            return e("The math namespace is deprecated, please access members already accessible on PIXI."), g
          }
        },
        AbstractFilter: {
          enumerable: !0,
          get: function() {
            return e("AstractFilter has been renamed to Filter, please use PIXI.Filter"), g.Filter
          }
        },
        TransformManual: {
          enumerable: !0,
          get: function() {
            return e("TransformManual has been renamed to TransformBase, please update your pixi-spine"), g.TransformBase
          }
        }
      }), g.DisplayObject.prototype.generateTexture = function(a, b, c) {
        return e("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"), a.generateTexture(this, b, c)
      }, g.Graphics.prototype.generateTexture = function(a, b) {
        return e("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"), this.generateCanvasTexture(a, b)
      }, g.RenderTexture.prototype.render = function(a, b, c, d) {
        this.legacyRenderer.render(a, this, c, b, !d), e("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)")
      }, g.RenderTexture.prototype.getImage = function(a) {
        return e("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"), this.legacyRenderer.extract.image(a)
      }, g.RenderTexture.prototype.getBase64 = function(a) {
        return e("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"), this.legacyRenderer.extract.base64(a)
      }, g.RenderTexture.prototype.getCanvas = function(a) {
        return e("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"), this.legacyRenderer.extract.canvas(a)
      }, g.RenderTexture.prototype.getPixels = function(a) {
        return e("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"), this.legacyRenderer.pixels(a)
      }, g.Sprite.prototype.setTexture = function(a) {
        this.texture = a, e("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
      }, m.BitmapText.prototype.setText = function(a) {
        this.text = a, e("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
      }, g.Text.prototype.setText = function(a) {
        this.text = a, e("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
      }, g.Text.prototype.setStyle = function(a) {
        this.style = a, e("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
      }, Object.defineProperties(g.TextStyle.prototype, {
        font: {
          get: function() {
            e("text style property 'font' is now deprecated, please use the 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant' and 'fontWeight' properties from now on");
            var a = "number" == typeof this._fontSize ? this._fontSize + "px" : this._fontSize;
            return this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + a + " " + this._fontFamily
          },
          set: function(a) {
            e("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"), a.indexOf("italic") > 1 ? this._fontStyle = "italic" : a.indexOf("oblique") > -1 ? this._fontStyle = "oblique" : this._fontStyle = "normal", a.indexOf("small-caps") > -1 ? this._fontVariant = "small-caps" : this._fontVariant = "normal";
            var b = a.split(" "),
              c = -1;
            this._fontSize = 26;
            for (var d = 0; d < b.length; ++d)
              if (b[d].match(/(px|pt|em|%)/)) {
                c = d, this._fontSize = b[d];
                break
              }
            this._fontWeight = "normal";
            for (var f = 0; f < c; ++f)
              if (b[f].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                this._fontWeight = b[f];
                break
              }
            if (c > -1 && c < b.length - 1) {
              this._fontFamily = "";
              for (var g = c + 1; g < b.length; ++g) this._fontFamily += b[g] + " ";
              this._fontFamily = this._fontFamily.slice(0, -1)
            } else this._fontFamily = "Arial";
            this.styleID++
          }
        }
      }), g.Texture.prototype.setFrame = function(a) {
        this.frame = a, e("setFrame is now deprecated, please use the frame property, e.g: myTexture.frame = frame;")
      }, Object.defineProperties(o, {
        AbstractFilter: {
          get: function() {
            return e("AstractFilter has been renamed to Filter, please use PIXI.Filter"), g.AbstractFilter
          }
        },
        SpriteMaskFilter: {
          get: function() {
            return e("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), g.SpriteMaskFilter
          }
        }
      }), g.utils.uuid = function() {
        return e("utils.uuid() is deprecated, please use utils.uid() from now on."), g.utils.uid()
      }, g.utils.canUseNewCanvasBlendModes = function() {
        return e("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"), g.CanvasTinter.canUseMultiply
      }
    }, {
      "./core": 62,
      "./extras": 130,
      "./filters": 141,
      "./mesh": 159,
      "./particles": 162
    }],
    120: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("../../core"),
        g = d(f),
        h = new g.Rectangle,
        i = function() {
          function a(b) {
            e(this, a), this.renderer = b, b.extract = this
          }
          return a.prototype.image = function a(b) {
            var a = new Image;
            return a.src = this.base64(b), a
          }, a.prototype.base64 = function(a) {
            return this.canvas(a).toDataURL()
          }, a.prototype.canvas = function(a) {
            var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = void 0;
            a && (f = a instanceof g.RenderTexture ? a : b.generateTexture(a)), f ? (c = f.baseTexture._canvasRenderTarget.context, d = f.baseTexture._canvasRenderTarget.resolution, e = f.frame) : (c = b.rootContext, e = h, e.width = this.renderer.width, e.height = this.renderer.height);
            var i = e.width * d,
              j = e.height * d,
              k = new g.CanvasRenderTarget(i, j),
              l = c.getImageData(e.x * d, e.y * d, i, j);
            return k.context.putImageData(l, 0, 0), k.canvas
          }, a.prototype.pixels = function(a) {
            var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = void 0;
            return a && (f = a instanceof g.RenderTexture ? a : b.generateTexture(a)), f ? (c = f.baseTexture._canvasRenderTarget.context, d = f.baseTexture._canvasRenderTarget.resolution, e = f.frame) : (c = b.rootContext, e = h, e.width = b.width, e.height = b.height), c.getImageData(0, 0, e.width * d, e.height * d).data
          }, a.prototype.destroy = function() {
            this.renderer.extract = null, this.renderer = null
          }, a
        }();
      c.default = i, g.CanvasRenderer.registerPlugin("extract", i)
    }, {
      "../../core": 62
    }],
    121: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./webgl/WebGLExtract");
      Object.defineProperty(c, "webgl", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./canvas/CanvasExtract");
      Object.defineProperty(c, "canvas", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      })
    }, {
      "./canvas/CanvasExtract": 120,
      "./webgl/WebGLExtract": 122
    }],
    122: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("../../core"),
        g = d(f),
        h = new g.Rectangle,
        i = 4,
        j = function() {
          function a(b) {
            e(this, a), this.renderer = b, b.extract = this
          }
          return a.prototype.image = function a(b) {
            var a = new Image;
            return a.src = this.base64(b), a
          }, a.prototype.base64 = function(a) {
            return this.canvas(a).toDataURL()
          }, a.prototype.canvas = function(a) {
            var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = !1,
              j = void 0;
            a && (j = a instanceof g.RenderTexture ? a : this.renderer.generateTexture(a)), j ? (c = j.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], d = c.resolution, e = j.frame, f = !1) : (c = this.renderer.rootRenderTarget, d = c.resolution, f = !0, e = h, e.width = c.size.width, e.height = c.size.height);
            var k = e.width * d,
              l = e.height * d,
              m = new g.CanvasRenderTarget(k, l);
            if (c) {
              b.bindRenderTarget(c);
              var n = new Uint8Array(i * k * l),
                o = b.gl;
              o.readPixels(e.x * d, e.y * d, k, l, o.RGBA, o.UNSIGNED_BYTE, n);
              var p = m.context.getImageData(0, 0, k, l);
              p.data.set(n),
                m.context.putImageData(p, 0, 0), f && (m.context.scale(1, -1), m.context.drawImage(m.canvas, 0, -l))
            }
            return m.canvas
          }, a.prototype.pixels = function(a) {
            var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = void 0;
            a && (f = a instanceof g.RenderTexture ? a : this.renderer.generateTexture(a)), f ? (c = f.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], d = c.resolution, e = f.frame) : (c = this.renderer.rootRenderTarget, d = c.resolution, e = h, e.width = c.size.width, e.height = c.size.height);
            var j = e.width * d,
              k = e.height * d,
              l = new Uint8Array(i * j * k);
            if (c) {
              b.bindRenderTarget(c);
              var m = b.gl;
              m.readPixels(e.x * d, e.y * d, j, k, m.RGBA, m.UNSIGNED_BYTE, l)
            }
            return l
          }, a.prototype.destroy = function() {
            this.renderer.extract = null, this.renderer = null
          }, a
        }();
      c.default = j, g.WebGLRenderer.registerPlugin("extract", j)
    }, {
      "../../core": 62
    }],
    123: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        j = a("../core"),
        k = e(j),
        l = a("../core/math/ObservablePoint"),
        m = d(l),
        n = function(a) {
          function b(c) {
            var d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            f(this, b);
            var e = g(this, a.call(this));
            return e.textWidth = 0, e.textHeight = 0, e._glyphs = [], e._font = {
              tint: void 0 !== d.tint ? d.tint : 16777215,
              align: d.align || "left",
              name: null,
              size: 0
            }, e.font = d.font, e._text = c, e.maxWidth = 0, e.maxLineHeight = 0, e._anchor = new m.default(function() {
              e.dirty = !0
            }, e, 0, 0), e.dirty = !1, e.updateText(), e
          }
          return h(b, a), b.prototype.updateText = function() {
            for (var a = b.fonts[this._font.name], c = this._font.size / a.size, d = new k.Point, e = [], f = [], g = null, h = 0, i = 0, j = 0, l = -1, m = 0, n = 0, o = 0; o < this.text.length; o++) {
              var p = this.text.charCodeAt(o);
              if (/(\s)/.test(this.text.charAt(o)) && (l = o, m = h), /(?:\r\n|\r|\n)/.test(this.text.charAt(o))) f.push(h), i = Math.max(i, h), j++, d.x = 0, d.y += a.lineHeight, g = null;
              else if (l !== -1 && this.maxWidth > 0 && d.x * c > this.maxWidth) k.utils.removeItems(e, l, o - l), o = l, l = -1, f.push(m), i = Math.max(i, m), j++, d.x = 0, d.y += a.lineHeight, g = null;
              else {
                var q = a.chars[p];
                q && (g && q.kerning[g] && (d.x += q.kerning[g]), e.push({
                  texture: q.texture,
                  line: j,
                  charCode: p,
                  position: new k.Point(d.x + q.xOffset, d.y + q.yOffset)
                }), h = d.x + (q.texture.width + q.xOffset), d.x += q.xAdvance, n = Math.max(n, q.yOffset + q.texture.height), g = p)
              }
            }
            f.push(h), i = Math.max(i, h);
            for (var r = [], s = 0; s <= j; s++) {
              var t = 0;
              "right" === this._font.align ? t = i - f[s] : "center" === this._font.align && (t = (i - f[s]) / 2), r.push(t)
            }
            for (var u = e.length, v = this.tint, w = 0; w < u; w++) {
              var x = this._glyphs[w];
              x ? x.texture = e[w].texture : (x = new k.Sprite(e[w].texture), this._glyphs.push(x)), x.position.x = (e[w].position.x + r[e[w].line]) * c, x.position.y = e[w].position.y * c, x.scale.x = x.scale.y = c, x.tint = v, x.parent || this.addChild(x)
            }
            for (var y = u; y < this._glyphs.length; ++y) this.removeChild(this._glyphs[y]);
            if (this.textWidth = i * c, this.textHeight = (d.y + a.lineHeight) * c, 0 !== this.anchor.x || 0 !== this.anchor.y)
              for (var z = 0; z < u; z++) this._glyphs[z].x -= this.textWidth * this.anchor.x, this._glyphs[z].y -= this.textHeight * this.anchor.y;
            this.maxLineHeight = n * c
          }, b.prototype.updateTransform = function() {
            this.validate(), this.containerUpdateTransform()
          }, b.prototype.getLocalBounds = function() {
            return this.validate(), a.prototype.getLocalBounds.call(this)
          }, b.prototype.validate = function() {
            this.dirty && (this.updateText(), this.dirty = !1)
          }, i(b, [{
            key: "tint",
            get: function() {
              return this._font.tint
            },
            set: function(a) {
              this._font.tint = "number" == typeof a && a >= 0 ? a : 16777215, this.dirty = !0
            }
          }, {
            key: "align",
            get: function() {
              return this._font.align
            },
            set: function(a) {
              this._font.align = a || "left", this.dirty = !0
            }
          }, {
            key: "anchor",
            get: function() {
              return this._anchor
            },
            set: function(a) {
              "number" == typeof a ? this._anchor.set(a) : this._anchor.copy(a)
            }
          }, {
            key: "font",
            get: function() {
              return this._font
            },
            set: function(a) {
              a && ("string" == typeof a ? (a = a.split(" "), this._font.name = 1 === a.length ? a[0] : a.slice(1).join(" "), this._font.size = a.length >= 2 ? parseInt(a[0], 10) : b.fonts[this._font.name].size) : (this._font.name = a.name, this._font.size = "number" == typeof a.size ? a.size : parseInt(a.size, 10)), this.dirty = !0)
            }
          }, {
            key: "text",
            get: function() {
              return this._text
            },
            set: function(a) {
              a = a.toString() || " ", this._text !== a && (this._text = a, this.dirty = !0)
            }
          }]), b
        }(k.Container);
      c.default = n, n.fonts = {}
    }, {
      "../core": 62,
      "../core/math/ObservablePoint": 65
    }],
    124: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../core"),
        j = d(i),
        k = function(a) {
          function b(c) {
            e(this, b);
            var d = f(this, a.call(this, c[0] instanceof j.Texture ? c[0] : c[0].texture));
            return d._textures = null, d._durations = null, d.textures = c, d.animationSpeed = 1, d.loop = !0, d.onComplete = null, d.onFrameChange = null, d._currentTime = 0, d.playing = !1, d
          }
          return g(b, a), b.prototype.stop = function() {
            this.playing && (this.playing = !1, j.ticker.shared.remove(this.update, this))
          }, b.prototype.play = function() {
            this.playing || (this.playing = !0, j.ticker.shared.add(this.update, this))
          }, b.prototype.gotoAndStop = function(a) {
            this.stop();
            var b = this.currentFrame;
            this._currentTime = a, b !== this.currentFrame && (this._texture = this._textures[this.currentFrame], this._textureID = -1, this.onFrameChange && this.onFrameChange(this.currentFrame))
          }, b.prototype.gotoAndPlay = function(a) {
            this._currentTime = a, this.play()
          }, b.prototype.update = function(a) {
            var b = this.animationSpeed * a,
              c = this.currentFrame;
            if (null !== this._durations) {
              var d = this._currentTime % 1 * this._durations[this.currentFrame];
              for (d += b / 60 * 1e3; d < 0;) this._currentTime--, d += this._durations[this.currentFrame];
              var e = Math.sign(this.animationSpeed * a);
              for (this._currentTime = Math.floor(this._currentTime); d >= this._durations[this.currentFrame];) d -= this._durations[this.currentFrame] * e, this._currentTime += e;
              this._currentTime += d / this._durations[this.currentFrame]
            } else this._currentTime += b;
            this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : c !== this.currentFrame && (this._texture = this._textures[this.currentFrame], this._textureID = -1, this.onFrameChange && this.onFrameChange(this.currentFrame))
          }, b.prototype.destroy = function() {
            this.stop(), a.prototype.destroy.call(this)
          }, b.fromFrames = function(a) {
            for (var c = [], d = 0; d < a.length; ++d) c.push(j.Texture.fromFrame(a[d]));
            return new b(c)
          }, b.fromImages = function(a) {
            for (var c = [], d = 0; d < a.length; ++d) c.push(j.Texture.fromImage(a[d]));
            return new b(c)
          }, h(b, [{
            key: "totalFrames",
            get: function() {
              return this._textures.length
            }
          }, {
            key: "textures",
            get: function() {
              return this._textures
            },
            set: function(a) {
              if (a[0] instanceof j.Texture) this._textures = a, this._durations = null;
              else {
                this._textures = [], this._durations = [];
                for (var b = 0; b < a.length; b++) this._textures.push(a[b].texture), this._durations.push(a[b].time)
              }
            }
          }, {
            key: "currentFrame",
            get: function() {
              var a = Math.floor(this._currentTime) % this._textures.length;
              return a < 0 && (a += this._textures.length), a
            }
          }]), b
        }(j.Sprite);
      c.default = k
    }, {
      "../core": 62
    }],
    125: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        g = a("../core/math/Matrix"),
        h = d(g),
        i = new h.default,
        j = function() {
          function a(b, c) {
            e(this, a), this._texture = b, this.mapCoord = new h.default, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._lastTextureID = -1, this.clampOffset = 0, this.clampMargin = "undefined" == typeof c ? .5 : c
          }
          return a.prototype.update = function(a) {
            var b = this.texture;
            if (b && b.valid && (a || this._lastTextureID !== this.texture._updateID)) {
              this._lastTextureID = this.texture._updateID;
              var c = this.texture._uvs;
              this.mapCoord.set(c.x1 - c.x0, c.y1 - c.y0, c.x3 - c.x0, c.y3 - c.y0, c.x0, c.y0);
              var d = b.orig,
                e = b.trim;
              e && (i.set(d.width / e.width, 0, 0, d.height / e.height, -e.x / e.width, -e.y / e.height), this.mapCoord.append(i));
              var f = b.baseTexture,
                g = this.uClampFrame,
                h = this.clampMargin / f.resolution,
                j = this.clampOffset;
              g[0] = (b._frame.x + h + j) / f.width, g[1] = (b._frame.y + h + j) / f.height, g[2] = (b._frame.x + b._frame.width - h + j) / f.width, g[3] = (b._frame.y + b._frame.height - h + j) / f.height, this.uClampOffset[0] = j / f.realWidth, this.uClampOffset[1] = j / f.realHeight
            }
          }, f(a, [{
            key: "texture",
            get: function() {
              return this._texture
            },
            set: function(a) {
              this._texture = a, this._lastTextureID = -1
            }
          }]), a
        }();
      c.default = j
    }, {
      "../core/math/Matrix": 64
    }],
    126: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        j = a("../core"),
        k = e(j),
        l = a("../core/sprites/canvas/CanvasTinter"),
        m = d(l),
        n = a("./TextureTransform"),
        o = d(n),
        p = new k.Point,
        q = function(a) {
          function b(c) {
            var d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
              e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
            f(this, b);
            var h = g(this, a.call(this, c));
            return h.tileTransform = new k.TransformStatic, h._width = d, h._height = e, h._canvasPattern = null, h.uvTransform = c.transform || new o.default(c), h
          }
          return h(b, a), b.prototype._onTextureUpdate = function() {
            this.uvTransform && (this.uvTransform.texture = this._texture)
          }, b.prototype._renderWebGL = function(a) {
            var b = this._texture;
            b && b.valid && (this.tileTransform.updateLocalTransform(), this.uvTransform.update(), a.setObjectRenderer(a.plugins.tilingSprite), a.plugins.tilingSprite.render(this))
          }, b.prototype._renderCanvas = function(a) {
            var b = this._texture;
            if (b.baseTexture.hasLoaded) {
              var c = a.context,
                d = this.worldTransform,
                e = a.resolution,
                f = b.baseTexture,
                g = b.baseTexture.resolution,
                h = this.tilePosition.x / this.tileScale.x % b._frame.width,
                i = this.tilePosition.y / this.tileScale.y % b._frame.height;
              if (!this._canvasPattern) {
                var j = new k.CanvasRenderTarget(b._frame.width, b._frame.height, g);
                16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = m.default.getTintedTexture(this, this.tint)), j.context.drawImage(this.tintedTexture, 0, 0)) : j.context.drawImage(f.source, -b._frame.x, -b._frame.y), this._canvasPattern = j.context.createPattern(j.canvas, "repeat")
              }
              c.globalAlpha = this.worldAlpha, c.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e, d.ty * e), c.scale(this.tileScale.x / g, this.tileScale.y / g), c.translate(h + this.anchor.x * -this._width, i + this.anchor.y * -this._height);
              var l = a.blendModes[this.blendMode];
              l !== a.context.globalCompositeOperation && (c.globalCompositeOperation = l), c.fillStyle = this._canvasPattern, c.fillRect(-h, -i, this._width / this.tileScale.x * g, this._height / this.tileScale.y * g)
            }
          }, b.prototype._calculateBounds = function() {
            var a = this._width * -this._anchor._x,
              b = this._height * -this._anchor._y,
              c = this._width * (1 - this._anchor._x),
              d = this._height * (1 - this._anchor._y);
            this._bounds.addFrame(this.transform, a, b, c, d)
          }, b.prototype.getLocalBounds = function(b) {
            return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._x), b || (this._localBoundsRect || (this._localBoundsRect = new k.Rectangle), b = this._localBoundsRect), this._bounds.getRectangle(b)) : a.prototype.getLocalBounds.call(this, b)
          }, b.prototype.containsPoint = function(a) {
            this.worldTransform.applyInverse(a, p);
            var b = this._width,
              c = this._height,
              d = -b * this.anchor._x;
            if (p.x > d && p.x < d + b) {
              var e = -c * this.anchor._y;
              if (p.y > e && p.y < e + c) return !0
            }
            return !1
          }, b.prototype.destroy = function() {
            a.prototype.destroy.call(this), this.tileTransform = null, this.uvTransform = null
          }, b.from = function(a, c, d) {
            return new b(k.Texture.from(a), c, d)
          }, b.fromFrame = function(a, c, d) {
            var e = k.utils.TextureCache[a];
            if (!e) throw new Error('The frameId "' + a + '" does not exist in the texture cache ' + this);
            return new b(e, c, d)
          }, b.fromImage = function(a, c, d, e, f) {
            return new b(k.Texture.fromImage(a, e, f), c, d)
          }, i(b, [{
            key: "clampMargin",
            get: function() {
              return this.uvTransform.clampMargin
            },
            set: function(a) {
              this.uvTransform.clampMargin = a, this.uvTransform.update(!0)
            }
          }, {
            key: "tileScale",
            get: function() {
              return this.tileTransform.scale
            },
            set: function(a) {
              this.tileTransform.scale.copy(a)
            }
          }, {
            key: "tilePosition",
            get: function() {
              return this.tileTransform.position
            },
            set: function(a) {
              this.tileTransform.position.copy(a)
            }
          }, {
            key: "width",
            get: function() {
              return this._width
            },
            set: function(a) {
              this._width = a
            }
          }, {
            key: "height",
            get: function() {
              return this._height
            },
            set: function(a) {
              this._height = a
            }
          }]), b
        }(k.Sprite);
      c.default = q
    }, {
      "../core": 62,
      "../core/sprites/canvas/CanvasTinter": 100,
      "./TextureTransform": 125
    }],
    127: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      var f = a("../core"),
        g = d(f),
        h = g.DisplayObject,
        i = new g.Matrix;
      h.prototype._cacheAsBitmap = !1, h.prototype._cacheData = !1;
      var j = function a() {
        e(this, a), this.originalRenderWebGL = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalHitTest = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.sprite = null
      };
      Object.defineProperties(h.prototype, {
        cacheAsBitmap: {
          get: function() {
            return this._cacheAsBitmap
          },
          set: function(a) {
            if (this._cacheAsBitmap !== a) {
              this._cacheAsBitmap = a;
              var b = void 0;
              a ? (this._cacheData || (this._cacheData = new j), b = this._cacheData, b.originalRenderWebGL = this.renderWebGL, b.originalRenderCanvas = this.renderCanvas, b.originalUpdateTransform = this.updateTransform, b.originalCalculateBounds = this._calculateBounds, b.originalGetLocalBounds = this.getLocalBounds, b.originalDestroy = this.destroy, b.originalContainsPoint = this.containsPoint, b.originalMask = this._mask, b.originalFilterArea = this.filterArea, this.renderWebGL = this._renderCachedWebGL, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (b = this._cacheData, b.sprite && this._destroyCachedDisplayObject(), this.renderWebGL = b.originalRenderWebGL, this.renderCanvas = b.originalRenderCanvas, this._calculateBounds = b.originalCalculateBounds, this.getLocalBounds = b.originalGetLocalBounds, this.destroy = b.originalDestroy, this.updateTransform = b.originalUpdateTransform, this.containsPoint = b.originalContainsPoint, this._mask = b.originalMask, this.filterArea = b.originalFilterArea)
            }
          }
        }
      }), h.prototype._renderCachedWebGL = function(a) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(a), this._cacheData.sprite._transformID = -1, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderWebGL(a))
      }, h.prototype._initCachedDisplayObject = function(a) {
        if (!this._cacheData || !this._cacheData.sprite) {
          var b = this.alpha;
          this.alpha = 1, a.currentRenderer.flush();
          var c = this.getLocalBounds().clone();
          if (this._filters) {
            var d = this._filters[0].padding;
            c.pad(d)
          }
          var e = a._activeRenderTarget,
            f = a.filterManager.filterStack,
            h = g.RenderTexture.create(0 | c.width, 0 | c.height),
            j = i;
          j.tx = -c.x, j.ty = -c.y, this.transform.worldTransform.identity(), this.renderWebGL = this._cacheData.originalRenderWebGL, a.render(this, h, !0, j, !0), a.bindRenderTarget(e), a.filterManager.filterStack = f, this.renderWebGL = this._renderCachedWebGL, this.updateTransform = this.displayObjectUpdateTransform, this._mask = null, this.filterArea = null;
          var k = new g.Sprite(h);
          k.transform.worldTransform = this.transform.worldTransform, k.anchor.x = -(c.x / c.width), k.anchor.y = -(c.y / c.height), k.alpha = b, k._bounds = this._bounds, this._calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._cacheData.sprite = k, this.transform._parentID = -1, this.updateTransform(), this.containsPoint = k.containsPoint.bind(k)
        }
      }, h.prototype._renderCachedCanvas = function(a) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(a), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite.renderCanvas(a))
      }, h.prototype._initCachedDisplayObjectCanvas = function(a) {
        if (!this._cacheData || !this._cacheData.sprite) {
          var b = this.getLocalBounds(),
            c = this.alpha;
          this.alpha = 1;
          var d = a.context,
            e = g.RenderTexture.create(0 | b.width, 0 | b.height),
            f = i;
          this.transform.worldTransform.copy(f), f.invert(), f.tx -= b.x, f.ty -= b.y, this.renderCanvas = this._cacheData.originalRenderCanvas, a.render(this, e, !0, f, !1), a.context = d, this.renderCanvas = this._renderCachedCanvas, this._calculateBounds = this._calculateCachedBounds, this._mask = null, this.filterArea = null;
          var h = new g.Sprite(e);
          h.transform.worldTransform = this.transform.worldTransform, h.anchor.x = -(b.x / b.width), h.anchor.y = -(b.y / b.height), h._bounds = this._bounds, h.alpha = c, this.updateTransform(), this.updateTransform = this.displayObjectUpdateTransform, this._cacheData.sprite = h, this.containsPoint = h.containsPoint.bind(h)
        }
      }, h.prototype._calculateCachedBounds = function() {
        this._cacheData.sprite._calculateBounds()
      }, h.prototype._getCachedLocalBounds = function() {
        return this._cacheData.sprite.getLocalBounds()
      }, h.prototype._destroyCachedDisplayObject = function() {
        this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null
      }, h.prototype._cacheAsBitmapDestroy = function() {
        this.cacheAsBitmap = !1, this.destroy()
      }
    }, {
      "../core": 62
    }],
    128: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }
      var e = a("../core"),
        f = d(e);
      f.DisplayObject.prototype.name = null, f.Container.prototype.getChildByName = function(a) {
        for (var b = 0; b < this.children.length; b++)
          if (this.children[b].name === a) return this.children[b];
        return null
      }
    }, {
      "../core": 62
    }],
    129: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }
      var e = a("../core"),
        f = d(e);
      f.DisplayObject.prototype.getGlobalPosition = function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new f.Point,
          b = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return this.parent ? this.parent.toGlobal(this.position, a, b) : (a.x = this.position.x, a.y = this.position.y), a
      }
    }, {
      "../core": 62
    }],
    130: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./TextureTransform");
      Object.defineProperty(c, "TextureTransform", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./MovieClip");
      Object.defineProperty(c, "MovieClip", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      });
      var g = a("./TilingSprite");
      Object.defineProperty(c, "TilingSprite", {
        enumerable: !0,
        get: function() {
          return d(g).default
        }
      });
      var h = a("./webgl/TilingSpriteRenderer");
      Object.defineProperty(c, "TilingSpriteRenderer", {
        enumerable: !0,
        get: function() {
          return d(h).default
        }
      });
      var i = a("./BitmapText");
      Object.defineProperty(c, "BitmapText", {
        enumerable: !0,
        get: function() {
          return d(i).default
        }
      });
      var j = a("./cacheAsBitmap");
      Object.defineProperty(c, "cacheAsBitmap", {
        enumerable: !0,
        get: function() {
          return d(j).default
        }
      });
      var k = a("./getChildByName");
      Object.defineProperty(c, "getChildByName", {
        enumerable: !0,
        get: function() {
          return d(k).default
        }
      });
      var l = a("./getGlobalPosition");
      Object.defineProperty(c, "getGlobalPosition", {
        enumerable: !0,
        get: function() {
          return d(l).default
        }
      })
    }, {
      "./BitmapText": 123,
      "./MovieClip": 124,
      "./TextureTransform": 125,
      "./TilingSprite": 126,
      "./cacheAsBitmap": 127,
      "./getChildByName": 128,
      "./getGlobalPosition": 129,
      "./webgl/TilingSpriteRenderer": 131
    }],
    131: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0, c.TilingSpriteRenderer = void 0;
      var h = a("../../core"),
        i = d(h),
        j = a("../../core/const"),
        k = new i.Matrix,
        l = new Float32Array(4),
        m = c.TilingSpriteRenderer = function(a) {
          function b(c) {
            e(this, b);
            var d = f(this, a.call(this, c));
            return d.shader = null, d.simpleShader = null, d.quad = null, d
          }
          return g(b, a), b.prototype.onContextChange = function() {
            var a = this.renderer.gl;
            this.shader = new i.Shader(a, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    vec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n\n    gl_FragColor = sample * color ;\n}\n"), this.simpleShader = new i.Shader(a, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    vec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n    gl_FragColor = sample * color;\n}\n"), this.quad = new i.Quad(a), this.quad.initVao(this.shader)
          }, b.prototype.render = function(a) {
            var b = this.quad,
              c = b.vertices;
            c[0] = c[6] = a._width * -a.anchor.x, c[1] = c[3] = a._height * -a.anchor.y, c[2] = c[4] = a._width * (1 - a.anchor.x), c[5] = c[7] = a._height * (1 - a.anchor.y), c = b.uvs, c[0] = c[6] = -a.anchor.x, c[1] = c[3] = -a.anchor.y, c[2] = c[4] = 1 - a.anchor.x, c[5] = c[7] = 1 - a.anchor.y, b.upload();
            var d = this.renderer,
              e = a._texture,
              f = e.baseTexture,
              g = a.tileTransform.localTransform,
              h = a.uvTransform,
              m = f.isPowerOfTwo && e.frame.width === f.width && e.frame.height === f.height;
            m && (f._glTextures[d.CONTEXT_UID] ? m = f.wrapMode !== j.WRAP_MODES.CLAMP : f.wrapMode === j.WRAP_MODES.CLAMP && (f.wrapMode = j.WRAP_MODES.REPEAT));
            var n = m ? this.simpleShader : this.shader;
            d.bindShader(n);
            var o = e.width,
              p = e.height,
              q = a._width,
              r = a._height;
            k.set(g.a * o / q, g.b * o / r, g.c * p / q, g.d * p / r, g.tx / q, g.ty / r), k.invert(), m ? k.append(h.mapCoord) : (n.uniforms.uMapCoord = h.mapCoord.toArray(!0), n.uniforms.uClampFrame = h.uClampFrame, n.uniforms.uClampOffset = h.uClampOffset), n.uniforms.uTransform = k.toArray(!0);
            var s = l;
            i.utils.hex2rgb(a.tint, s), s[3] = a.worldAlpha, n.uniforms.uColor = s, n.uniforms.translationMatrix = a.transform.worldTransform.toArray(!0), d.bindTexture(e), d.setBlendMode(a.blendMode), b.draw()
          }, b
        }(i.ObjectRenderer);
      i.WebGLRenderer.registerPlugin("tilingSprite", m)
    }, {
      "../../core": 62,
      "../../core/const": 43
    }],
    132: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        j = a("../../core"),
        k = e(j),
        l = a("./BlurXFilter"),
        m = d(l),
        n = a("./BlurYFilter"),
        o = d(n),
        p = function(a) {
          function b(c, d, e) {
            f(this, b);
            var h = g(this, a.call(this));
            return h.blurXFilter = new m.default, h.blurYFilter = new o.default, h.resolution = 1, h.padding = 0, h.resolution = e || 1, h.quality = d || 4, h.blur = c || 8, h
          }
          return h(b, a), b.prototype.apply = function(a, b, c) {
            var d = a.getRenderTarget(!0);
            this.blurXFilter.apply(a, b, d, !0), this.blurYFilter.apply(a, d, c, !1), a.returnRenderTarget(d)
          }, i(b, [{
            key: "blur",
            get: function() {
              return this.blurXFilter.blur
            },
            set: function(a) {
              this.blurXFilter.blur = this.blurYFilter.blur = a, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }
          }, {
            key: "quality",
            get: function() {
              return this.blurXFilter.quality
            },
            set: function(a) {
              this.blurXFilter.quality = this.blurYFilter.quality = a
            }
          }, {
            key: "blurX",
            get: function() {
              return this.blurXFilter.blur
            },
            set: function(a) {
              this.blurXFilter.blur = a, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }
          }, {
            key: "blurY",
            get: function() {
              return this.blurYFilter.blur
            },
            set: function(a) {
              this.blurYFilter.blur = a, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }
          }]), b
        }(k.Filter);
      c.default = p
    }, {
      "../../core": 62,
      "./BlurXFilter": 133,
      "./BlurYFilter": 134
    }],
    133: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        j = a("../../core"),
        k = e(j),
        l = a("./generateBlurVertSource"),
        m = d(l),
        n = a("./generateBlurFragSource"),
        o = d(n),
        p = a("./getMaxBlurKernelSize"),
        q = d(p),
        r = function(a) {
          function b(c, d, e) {
            f(this, b);
            var h = (0, m.default)(5, !0),
              i = (0, o.default)(5),
              j = g(this, a.call(this, h, i));
            return j.resolution = e || 1, j._quality = 0, j.quality = d || 4, j.strength = c || 8, j.firstRun = !0, j
          }
          return h(b, a), b.prototype.apply = function(a, b, c, d) {
            if (this.firstRun) {
              var e = a.renderer.gl,
                f = (0, q.default)(e);
              this.vertexSrc = (0, m.default)(f, !0), this.fragmentSrc = (0, o.default)(f), this.firstRun = !1
            }
            if (this.uniforms.strength = 1 / c.size.width * (c.size.width / b.size.width), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) a.applyFilter(this, b, c, d);
            else {
              for (var g = a.getRenderTarget(!0), h = b, i = g, j = 0; j < this.passes - 1; j++) {
                a.applyFilter(this, h, i, !0);
                var k = i;
                i = h, h = k
              }
              a.applyFilter(this, h, c, d), a.returnRenderTarget(g)
            }
          }, i(b, [{
            key: "blur",
            get: function() {
              return this.strength
            },
            set: function(a) {
              this.padding = 2 * Math.abs(a), this.strength = a
            }
          }, {
            key: "quality",
            get: function() {
              return this._quality
            },
            set: function(a) {
              this._quality = a, this.passes = a
            }
          }]), b
        }(k.Filter);
      c.default = r
    }, {
      "../../core": 62,
      "./generateBlurFragSource": 135,
      "./generateBlurVertSource": 136,
      "./getMaxBlurKernelSize": 137
    }],
    134: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        j = a("../../core"),
        k = e(j),
        l = a("./generateBlurVertSource"),
        m = d(l),
        n = a("./generateBlurFragSource"),
        o = d(n),
        p = a("./getMaxBlurKernelSize"),
        q = d(p),
        r = function(a) {
          function b(c, d, e) {
            f(this, b);
            var h = (0, m.default)(5, !1),
              i = (0, o.default)(5),
              j = g(this, a.call(this, h, i));
            return j.resolution = e || 1, j._quality = 0, j.quality = d || 4, j.strength = c || 8, j.firstRun = !0, j
          }
          return h(b, a), b.prototype.apply = function(a, b, c, d) {
            if (this.firstRun) {
              var e = a.renderer.gl,
                f = (0, q.default)(e);
              this.vertexSrc = (0, m.default)(f, !1), this.fragmentSrc = (0, o.default)(f), this.firstRun = !1
            }
            if (this.uniforms.strength = 1 / c.size.height * (c.size.height / b.size.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) a.applyFilter(this, b, c, d);
            else {
              for (var g = a.getRenderTarget(!0), h = b, i = g, j = 0; j < this.passes - 1; j++) {
                a.applyFilter(this, h, i, !0);
                var k = i;
                i = h, h = k
              }
              a.applyFilter(this, h, c, d), a.returnRenderTarget(g)
            }
          }, i(b, [{
            key: "blur",
            get: function() {
              return this.strength
            },
            set: function(a) {
              this.padding = 2 * Math.abs(a), this.strength = a
            }
          }, {
            key: "quality",
            get: function() {
              return this._quality
            },
            set: function(a) {
              this._quality = a, this.passes = a
            }
          }]), b
        }(k.Filter);
      c.default = r
    }, {
      "../../core": 62,
      "./generateBlurFragSource": 135,
      "./generateBlurVertSource": 136,
      "./getMaxBlurKernelSize": 137
    }],
    135: [function(a, b, c) {
      "use strict";

      function d(a) {
        for (var b = e[a], c = b.length, d = f, g = "", h = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", i = void 0, j = 0; j < a; j++) {
          var k = h.replace("%index%", j);
          i = j, j >= c && (i = a - j - 1), k = k.replace("%value%", b[i]), g += k, g += "\n"
        }
        return d = d.replace("%blur%", g), d = d.replace("%size%", a)
      }
      c.__esModule = !0, c.default = d;
      var e = {
          5: [.153388, .221461, .250301],
          7: [.071303, .131514, .189879, .214607],
          9: [.028532, .067234, .124009, .179044, .20236],
          11: [.0093, .028002, .065984, .121703, .175713, .198596],
          13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641],
          15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
        },
        f = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}"].join("\n")
    }, {}],
    136: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        var c = Math.ceil(a / 2),
          d = e,
          f = "",
          g = void 0;
        g = b ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";
        for (var h = 0; h < a; h++) {
          var i = g.replace("%index%", h);
          i = i.replace("%sampleIndex%", h - (c - 1) + ".0"), f += i, f += "\n"
        }
        return d = d.replace("%blur%", f), d = d.replace("%size%", a)
      }
      c.__esModule = !0, c.default = d;
      var e = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}"].join("\n")
    }, {}],
    137: [function(a, b, c) {
      "use strict";

      function d(a) {
        for (var b = a.getParameter(a.MAX_VARYING_VECTORS), c = 15; c > b;) c -= 2;
        return c
      }
      c.__esModule = !0, c.default = d
    }, {}],
    138: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../../core"),
        j = d(i),
        k = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4] * c.a;\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9] * c.a;\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14] * c.a;\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19] * c.a;\n\n//    gl_FragColor = vec4(m[0]);\n}\n"));
            return c.uniforms.m = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], c
          }
          return g(b, a), b.prototype._loadMatrix = function(a) {
            var b = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              c = a;
            b && (this._multiply(c, this.uniforms.m, a), c = this._colorMatrix(c)), this.uniforms.m = c
          }, b.prototype._multiply = function(a, b, c) {
            return a[0] = b[0] * c[0] + b[1] * c[5] + b[2] * c[10] + b[3] * c[15], a[1] = b[0] * c[1] + b[1] * c[6] + b[2] * c[11] + b[3] * c[16], a[2] = b[0] * c[2] + b[1] * c[7] + b[2] * c[12] + b[3] * c[17], a[3] = b[0] * c[3] + b[1] * c[8] + b[2] * c[13] + b[3] * c[18], a[4] = b[0] * c[4] + b[1] * c[9] + b[2] * c[14] + b[3] * c[19], a[5] = b[5] * c[0] + b[6] * c[5] + b[7] * c[10] + b[8] * c[15], a[6] = b[5] * c[1] + b[6] * c[6] + b[7] * c[11] + b[8] * c[16], a[7] = b[5] * c[2] + b[6] * c[7] + b[7] * c[12] + b[8] * c[17], a[8] = b[5] * c[3] + b[6] * c[8] + b[7] * c[13] + b[8] * c[18], a[9] = b[5] * c[4] + b[6] * c[9] + b[7] * c[14] + b[8] * c[19], a[10] = b[10] * c[0] + b[11] * c[5] + b[12] * c[10] + b[13] * c[15], a[11] = b[10] * c[1] + b[11] * c[6] + b[12] * c[11] + b[13] * c[16], a[12] = b[10] * c[2] + b[11] * c[7] + b[12] * c[12] + b[13] * c[17], a[13] = b[10] * c[3] + b[11] * c[8] + b[12] * c[13] + b[13] * c[18], a[14] = b[10] * c[4] + b[11] * c[9] + b[12] * c[14] + b[13] * c[19], a[15] = b[15] * c[0] + b[16] * c[5] + b[17] * c[10] + b[18] * c[15], a[16] = b[15] * c[1] + b[16] * c[6] + b[17] * c[11] + b[18] * c[16], a[17] = b[15] * c[2] + b[16] * c[7] + b[17] * c[12] + b[18] * c[17], a[18] = b[15] * c[3] + b[16] * c[8] + b[17] * c[13] + b[18] * c[18], a[19] = b[15] * c[4] + b[16] * c[9] + b[17] * c[14] + b[18] * c[19], a
          }, b.prototype._colorMatrix = function(a) {
            var b = new Float32Array(a);
            return b[4] /= 255, b[9] /= 255, b[14] /= 255, b[19] /= 255, b
          }, b.prototype.brightness = function(a, b) {
            var c = [a, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(c, b)
          }, b.prototype.greyscale = function(a, b) {
            var c = [a, a, a, 0, 0, a, a, a, 0, 0, a, a, a, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(c, b)
          }, b.prototype.blackAndWhite = function(a) {
            var b = [.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.hue = function(a, b) {
            a = (a || 0) / 180 * Math.PI;
            var c = Math.cos(a),
              d = Math.sin(a),
              e = Math.sqrt,
              f = 1 / 3,
              g = e(f),
              h = c + (1 - c) * f,
              i = f * (1 - c) - g * d,
              j = f * (1 - c) + g * d,
              k = f * (1 - c) + g * d,
              l = c + f * (1 - c),
              m = f * (1 - c) - g * d,
              n = f * (1 - c) - g * d,
              o = f * (1 - c) + g * d,
              p = c + f * (1 - c),
              q = [h, i, j, 0, 0, k, l, m, 0, 0, n, o, p, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(q, b)
          }, b.prototype.contrast = function(a, b) {
            var c = (a || 0) + 1,
              d = -128 * (c - 1),
              e = [c, 0, 0, 0, d, 0, c, 0, 0, d, 0, 0, c, 0, d, 0, 0, 0, 1, 0];
            this._loadMatrix(e, b)
          }, b.prototype.saturate = function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments[1],
              c = 2 * a / 3 + 1,
              d = (c - 1) * -.5,
              e = [c, d, d, 0, 0, d, c, d, 0, 0, d, d, c, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(e, b)
          }, b.prototype.desaturate = function() {
            this.saturate(-1)
          }, b.prototype.negative = function(a) {
            var b = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.sepia = function(a) {
            var b = [.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.technicolor = function(a) {
            var b = [1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.polaroid = function(a) {
            var b = [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.toBGR = function(a) {
            var b = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.kodachrome = function(a) {
            var b = [1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.browni = function(a) {
            var b = [.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.vintage = function(a) {
            var b = [.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.colorTone = function(a, b, c, d, e) {
            a = a || .2, b = b || .15, c = c || 16770432, d = d || 3375104;
            var f = (c >> 16 & 255) / 255,
              g = (c >> 8 & 255) / 255,
              h = (255 & c) / 255,
              i = (d >> 16 & 255) / 255,
              j = (d >> 8 & 255) / 255,
              k = (255 & d) / 255,
              l = [.3, .59, .11, 0, 0, f, g, h, a, 0, i, j, k, b, 0, f - i, g - j, h - k, 0, 0];
            this._loadMatrix(l, e)
          }, b.prototype.night = function(a, b) {
            a = a || .1;
            var c = [a * -2, -a, 0, 0, 0, -a, 0, a, 0, 0, 0, a, 2 * a, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(c, b)
          }, b.prototype.predator = function(a, b) {
            var c = [11.224130630493164 * a, -4.794486999511719 * a, -2.8746118545532227 * a, 0 * a, .40342438220977783 * a, -3.6330697536468506 * a, 9.193157196044922 * a, -2.951810836791992 * a, 0 * a, -1.316135048866272 * a, -3.2184197902679443 * a, -4.2375030517578125 * a, 7.476448059082031 * a, 0 * a, .8044459223747253 * a, 0, 0, 0, 1, 0];
            this._loadMatrix(c, b)
          }, b.prototype.lsd = function(a) {
            var b = [2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(b, a)
          }, b.prototype.reset = function() {
            var a = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(a, !1)
          }, h(b, [{
            key: "matrix",
            get: function() {
              return this.uniforms.m
            },
            set: function(a) {
              this.uniforms.m = a
            }
          }]), b
        }(j.Filter);
      c.default = k, k.prototype.grayscale = k.prototype.greyscale
    }, {
      "../../core": 62
    }],
    139: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../../core"),
        j = d(i),
        k = function(a) {
          function b(c, d) {
            e(this, b);
            var g = new j.Matrix;
            c.renderable = !1;
            var h = f(this, a.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"));
            return h.maskSprite = c, h.maskMatrix = g, h.uniforms.mapSampler = c.texture, h.uniforms.filterMatrix = g.toArray(!0), h.uniforms.scale = {
              x: 1,
              y: 1
            }, null !== d && void 0 !== d || (d = 20), h.scale = new j.Point(d, d), h
          }
          return g(b, a), b.prototype.apply = function(a, b, c) {
            var d = 1 / c.destinationFrame.width * (c.size.width / b.size.width);
            this.uniforms.filterMatrix = a.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x * d, this.uniforms.scale.y = this.scale.y * d, a.applyFilter(this, b, c)
          }, h(b, [{
            key: "map",
            get: function() {
              return this.uniforms.mapSampler
            },
            set: function(a) {
              this.uniforms.mapSampler = a
            }
          }]), b
        }(j.Filter);
      c.default = k
    }, {
      "../../core": 62
    }],
    140: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../../core"),
        i = d(h),
        j = function(a) {
          function b() {
            return e(this, b), f(this, a.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", '#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n      vec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'))
          }
          return g(b, a), b
        }(i.Filter);
      c.default = j
    }, {
      "../../core": 62
    }],
    141: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./fxaa/FXAAFilter");
      Object.defineProperty(c, "FXAAFilter", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./noise/NoiseFilter");
      Object.defineProperty(c, "NoiseFilter", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      });
      var g = a("./displacement/DisplacementFilter");
      Object.defineProperty(c, "DisplacementFilter", {
        enumerable: !0,
        get: function() {
          return d(g).default
        }
      });
      var h = a("./blur/BlurFilter");
      Object.defineProperty(c, "BlurFilter", {
        enumerable: !0,
        get: function() {
          return d(h).default
        }
      });
      var i = a("./blur/BlurXFilter");
      Object.defineProperty(c, "BlurXFilter", {
        enumerable: !0,
        get: function() {
          return d(i).default
        }
      });
      var j = a("./blur/BlurYFilter");
      Object.defineProperty(c, "BlurYFilter", {
        enumerable: !0,
        get: function() {
          return d(j).default
        }
      });
      var k = a("./colormatrix/ColorMatrixFilter");
      Object.defineProperty(c, "ColorMatrixFilter", {
        enumerable: !0,
        get: function() {
          return d(k).default
        }
      });
      var l = a("./void/VoidFilter");
      Object.defineProperty(c, "VoidFilter", {
        enumerable: !0,
        get: function() {
          return d(l).default
        }
      })
    }, {
      "./blur/BlurFilter": 132,
      "./blur/BlurXFilter": 133,
      "./blur/BlurYFilter": 134,
      "./colormatrix/ColorMatrixFilter": 138,
      "./displacement/DisplacementFilter": 139,
      "./fxaa/FXAAFilter": 140,
      "./noise/NoiseFilter": 142,
      "./void/VoidFilter": 143
    }],
    142: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../../core"),
        j = d(i),
        k = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(gl_FragCoord.xy) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n"));
            return c.noise = .5, c
          }
          return g(b, a), h(b, [{
            key: "noise",
            get: function() {
              return this.uniforms.noise
            },
            set: function(a) {
              this.uniforms.noise = a
            }
          }]), b
        }(j.Filter);
      c.default = k
    }, {
      "../../core": 62
    }],
    143: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../../core"),
        i = d(h),
        j = function(a) {
          function b() {
            e(this, b);
            var c = f(this, a.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"));
            return c.glShaderKey = "void", c
          }
          return g(b, a), b
        }(i.Filter);
      c.default = j
    }, {
      "../../core": 62
    }],
    144: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("../core"),
        g = d(f),
        h = function() {
          function a() {
            e(this, a), this.global = new g.Point, this.target = null, this.originalEvent = null
          }
          return a.prototype.getLocalPosition = function(a, b, c) {
            return a.worldTransform.applyInverse(c || this.global, b)
          }, a
        }();
      c.default = h
    }, {
      "../core": 62
    }],
    145: [function(a, b, c) {
      "use strict";

      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var e = function() {
        function a() {
          d(this, a), this.stopped = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null
        }
        return a.prototype.stopPropagation = function() {
          this.stopped = !0
        }, a.prototype._reset = function() {
          this.stopped = !1, this.currentTarget = null, this.target = null
        }, a
      }();
      c.default = e
    }, {}],
    146: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = a("../core"),
        j = e(i),
        k = a("./InteractionData"),
        l = d(k),
        m = a("./InteractionEvent"),
        n = d(m),
        o = a("eventemitter3"),
        p = d(o),
        q = a("./interactiveTarget"),
        r = d(q),
        s = a("ismobilejs"),
        t = d(s);
      Object.assign(j.DisplayObject.prototype, r.default);
      var u = function(a) {
        function b(c, d) {
          f(this, b);
          var e = g(this, a.call(this));
          return d = d || {}, e.renderer = c, e.autoPreventDefault = void 0 === d.autoPreventDefault || d.autoPreventDefault, e.interactionFrequency = d.interactionFrequency || 10, e.mouse = new l.default, e.mouse.global.set(-999999), e.pointer = new l.default, e.pointer.global.set(-999999), e.eventData = new n.default, e.interactiveDataPool = [], e.interactionDOMElement = null, e.moveWhenInside = !1, e.eventsAdded = !1, e.mouseOverRenderer = !1, e.supportsTouchEvents = "ontouchstart" in window, e.supportsPointerEvents = !!window.PointerEvent, e.normalizeTouchEvents = !e.supportsPointerEvents && e.supportsTouchEvents, e.normalizeMouseEvents = !e.supportsPointerEvents && !t.default.any, e.onMouseUp = e.onMouseUp.bind(e), e.processMouseUp = e.processMouseUp.bind(e), e.onMouseDown = e.onMouseDown.bind(e), e.processMouseDown = e.processMouseDown.bind(e), e.onMouseMove = e.onMouseMove.bind(e), e.processMouseMove = e.processMouseMove.bind(e), e.onMouseOut = e.onMouseOut.bind(e), e.processMouseOverOut = e.processMouseOverOut.bind(e), e.onMouseOver = e.onMouseOver.bind(e), e.onPointerUp = e.onPointerUp.bind(e), e.processPointerUp = e.processPointerUp.bind(e), e.onPointerDown = e.onPointerDown.bind(e), e.processPointerDown = e.processPointerDown.bind(e), e.onPointerMove = e.onPointerMove.bind(e), e.processPointerMove = e.processPointerMove.bind(e), e.onPointerOut = e.onPointerOut.bind(e), e.processPointerOverOut = e.processPointerOverOut.bind(e), e.onPointerOver = e.onPointerOver.bind(e), e.onTouchStart = e.onTouchStart.bind(e), e.processTouchStart = e.processTouchStart.bind(e), e.onTouchEnd = e.onTouchEnd.bind(e), e.processTouchEnd = e.processTouchEnd.bind(e), e.onTouchMove = e.onTouchMove.bind(e), e.processTouchMove = e.processTouchMove.bind(e), e.defaultCursorStyle = "inherit", e.currentCursorStyle = "inherit", e._tempPoint = new j.Point, e.resolution = 1, e.setTargetElement(e.renderer.view, e.renderer.resolution), e
        }
        return h(b, a), b.prototype.setTargetElement = function(a) {
          var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
          this.removeEvents(), this.interactionDOMElement = a, this.resolution = b, this.addEvents()
        }, b.prototype.addEvents = function() {
          this.interactionDOMElement && (j.ticker.shared.add(this.update, this), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"), window.document.addEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onMouseOver, !0), window.addEventListener("mouseup", this.onMouseUp, !0), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.addEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.addEventListener("touchmove", this.onTouchMove, !0)), this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("pointerout", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0), window.addEventListener("pointerup", this.onPointerUp, !0)) : (this.normalizeTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)), this.normalizeMouseEvents && (window.document.addEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0), window.addEventListener("mouseup", this.onPointerUp, !0))), this.eventsAdded = !0)
        }, b.prototype.removeEvents = function() {
          this.interactionDOMElement && (j.ticker.shared.remove(this.update, this), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""), window.document.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onMouseOver, !0), window.removeEventListener("mouseup", this.onMouseUp, !0), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0)), this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("pointerout", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0), window.removeEventListener("pointerup", this.onPointerUp, !0)) : (this.normalizeTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)), this.normalizeMouseEvents && (window.document.removeEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0), window.removeEventListener("mouseup", this.onPointerUp, !0))), this.interactionDOMElement = null, this.eventsAdded = !1)
        }, b.prototype.update = function(a) {
          if (this._deltaTime += a, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement)) {
            if (this.didMove) return void(this.didMove = !1);
            this.cursor = this.defaultCursorStyle, this.eventData._reset(), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !0), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor)
          }
        }, b.prototype.dispatchEvent = function(a, b, c) {
          c.stopped || (c.currentTarget = a, c.type = b, a.emit(b, c), a[b] && a[b](c))
        }, b.prototype.mapPositionToPoint = function(a, b, c) {
          var d = void 0;
          d = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }, a.x = (b - d.left) * (this.interactionDOMElement.width / d.width) / this.resolution, a.y = (c - d.top) * (this.interactionDOMElement.height / d.height) / this.resolution
        }, b.prototype.processInteractive = function(a, b, c, d, e) {
          if (!b || !b.visible) return !1;
          e = b.interactive || e;
          var f = !1,
            g = e;
          if (b.hitArea && (g = !1), d && b._mask && (b._mask.containsPoint(a) || (d = !1)), d && b.filterArea && (b.filterArea.contains(a.x, a.y) || (d = !1)), b.interactiveChildren && b.children)
            for (var h = b.children, i = h.length - 1; i >= 0; i--) {
              var j = h[i];
              if (this.processInteractive(a, j, c, d, g)) {
                if (!j.parent) continue;
                f = !0, g = !1, d = !1
              }
            }
          return e && (d && !f && (b.hitArea ? (b.worldTransform.applyInverse(a, this._tempPoint), f = b.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) : b.containsPoint && (f = b.containsPoint(a))), b.interactive && (f && !this.eventData.target && (this.eventData.target = b, this.mouse.target = b, this.pointer.target = b), c(b, f))), f
        }, b.prototype.onMouseDown = function(a) {
          this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData._reset(), this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.autoPreventDefault && this.mouse.originalEvent.preventDefault(), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseDown, !0);
          var b = 2 === a.button || 3 === a.which;
          this.emit(b ? "rightdown" : "mousedown", this.eventData)
        }, b.prototype.processMouseDown = function(a, b) {
          var c = this.mouse.originalEvent,
            d = 2 === c.button || 3 === c.which;
          b && (a[d ? "_isRightDown" : "_isLeftDown"] = !0, this.dispatchEvent(a, d ? "rightdown" : "mousedown", this.eventData))
        }, b.prototype.onMouseUp = function(a) {
          this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData._reset(), this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseUp, !0);
          var b = 2 === a.button || 3 === a.which;
          this.emit(b ? "rightup" : "mouseup", this.eventData)
        }, b.prototype.processMouseUp = function(a, b) {
          var c = this.mouse.originalEvent,
            d = 2 === c.button || 3 === c.which,
            e = d ? "_isRightDown" : "_isLeftDown";
          b ? (this.dispatchEvent(a, d ? "rightup" : "mouseup", this.eventData), a[e] && (a[e] = !1, this.dispatchEvent(a, d ? "rightclick" : "click", this.eventData))) : a[e] && (a[e] = !1, this.dispatchEvent(a, d ? "rightupoutside" : "mouseupoutside", this.eventData))
        }, b.prototype.onMouseMove = function(a) {
          this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData._reset(), this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.didMove = !0, this.cursor = this.defaultCursorStyle, this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseMove, !0), this.emit("mousemove", this.eventData), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor)
        }, b.prototype.processMouseMove = function(a, b) {
          this.processMouseOverOut(a, b), this.moveWhenInside && !b || this.dispatchEvent(a, "mousemove", this.eventData)
        }, b.prototype.onMouseOut = function(a) {
          this.mouseOverRenderer = !1, this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData._reset(), this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.interactionDOMElement.style.cursor = this.defaultCursorStyle, this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !1), this.emit("mouseout", this.eventData)
        }, b.prototype.processMouseOverOut = function(a, b) {
          b && this.mouseOverRenderer ? (a._mouseOver || (a._mouseOver = !0, this.dispatchEvent(a, "mouseover", this.eventData)), a.buttonMode && (this.cursor = a.defaultCursor)) : a._mouseOver && (a._mouseOver = !1, this.dispatchEvent(a, "mouseout", this.eventData))
        }, b.prototype.onMouseOver = function(a) {
          this.mouseOverRenderer = !0, this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData._reset(), this.emit("mouseover", this.eventData)
        }, b.prototype.onPointerDown = function(a) {
          this.normalizeToPointerData(a), this.pointer.originalEvent = a, this.eventData.data = this.pointer, this.eventData._reset(), this.mapPositionToPoint(this.pointer.global, a.clientX, a.clientY), this.autoPreventDefault && this.pointer.originalEvent.preventDefault(), this.processInteractive(this.pointer.global, this.renderer._lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", this.eventData)
        }, b.prototype.processPointerDown = function(a, b) {
          b && (a._pointerDown = !0, this.dispatchEvent(a, "pointerdown", this.eventData))
        }, b.prototype.onPointerUp = function(a) {
          this.normalizeToPointerData(a), this.pointer.originalEvent = a, this.eventData.data = this.pointer, this.eventData._reset(), this.mapPositionToPoint(this.pointer.global, a.clientX, a.clientY), this.processInteractive(this.pointer.global, this.renderer._lastObjectRendered, this.processPointerUp, !0), this.emit("pointerup", this.eventData)
        }, b.prototype.processPointerUp = function(a, b) {
          b ? (this.dispatchEvent(a, "pointerup", this.eventData), a._pointerDown && (a._pointerDown = !1, this.dispatchEvent(a, "pointertap", this.eventData))) : a._pointerDown && (a._pointerDown = !1, this.dispatchEvent(a, "pointerupoutside", this.eventData))
        }, b.prototype.onPointerMove = function(a) {
          this.normalizeToPointerData(a), this.pointer.originalEvent = a, this.eventData.data = this.pointer, this.eventData._reset(), this.mapPositionToPoint(this.pointer.global, a.clientX, a.clientY), this.processInteractive(this.pointer.global, this.renderer._lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", this.eventData)
        }, b.prototype.processPointerMove = function(a, b) {
          this.pointer.originalEvent.changedTouches || this.processPointerOverOut(a, b), this.moveWhenInside && !b || this.dispatchEvent(a, "pointermove", this.eventData)
        }, b.prototype.onPointerOut = function(a) {
          this.normalizeToPointerData(a), this.pointer.originalEvent = a, this.eventData.data = this.pointer, this.eventData._reset(), this.mapPositionToPoint(this.pointer.global, a.clientX, a.clientY), this.processInteractive(this.pointer.global, this.renderer._lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", this.eventData)
        }, b.prototype.processPointerOverOut = function(a, b) {
          b && this.mouseOverRenderer ? a._pointerOver || (a._pointerOver = !0, this.dispatchEvent(a, "pointerover", this.eventData)) : a._pointerOver && (a._pointerOver = !1, this.dispatchEvent(a, "pointerout", this.eventData))
        }, b.prototype.onPointerOver = function(a) {
          this.pointer.originalEvent = a, this.eventData.data = this.pointer, this.eventData._reset(), this.emit("pointerover", this.eventData)
        }, b.prototype.onTouchStart = function(a) {
          this.autoPreventDefault && a.preventDefault();
          for (var b = a.changedTouches, c = b.length, d = 0; d < c; d++) {
            var e = b[d],
              f = this.getTouchData(e);
            f.originalEvent = a, this.eventData.data = f, this.eventData._reset(), this.processInteractive(f.global, this.renderer._lastObjectRendered, this.processTouchStart, !0), this.emit("touchstart", this.eventData), this.returnTouchData(f)
          }
        }, b.prototype.processTouchStart = function(a, b) {
          b && (a._touchDown = !0, this.dispatchEvent(a, "touchstart", this.eventData))
        }, b.prototype.onTouchEnd = function(a) {
          this.autoPreventDefault && a.preventDefault();
          for (var b = a.changedTouches, c = b.length, d = 0; d < c; d++) {
            var e = b[d],
              f = this.getTouchData(e);
            f.originalEvent = a, this.eventData.data = f, this.eventData._reset(), this.processInteractive(f.global, this.renderer._lastObjectRendered, this.processTouchEnd, !0), this.emit("touchend", this.eventData), this.returnTouchData(f)
          }
        }, b.prototype.processTouchEnd = function(a, b) {
          b ? (this.dispatchEvent(a, "touchend", this.eventData), a._touchDown && (a._touchDown = !1, this.dispatchEvent(a, "tap", this.eventData))) : a._touchDown && (a._touchDown = !1, this.dispatchEvent(a, "touchendoutside", this.eventData))
        }, b.prototype.onTouchMove = function(a) {
          this.autoPreventDefault && a.preventDefault();
          for (var b = a.changedTouches, c = b.length, d = 0; d < c; d++) {
            var e = b[d],
              f = this.getTouchData(e);
            f.originalEvent = a, this.eventData.data = f, this.eventData._reset(), this.processInteractive(f.global, this.renderer._lastObjectRendered, this.processTouchMove, this.moveWhenInside), this.emit("touchmove", this.eventData), this.returnTouchData(f)
          }
        }, b.prototype.processTouchMove = function(a, b) {
          this.moveWhenInside && !b || this.dispatchEvent(a, "touchmove", this.eventData)
        }, b.prototype.getTouchData = function(a) {
          var b = this.interactiveDataPool.pop() || new l.default;
          return b.identifier = a.identifier, this.mapPositionToPoint(b.global, a.clientX, a.clientY), navigator.isCocoonJS && (b.global.x = b.global.x / this.resolution, b.global.y = b.global.y / this.resolution), a.globalX = b.global.x, a.globalY = b.global.y, b
        }, b.prototype.returnTouchData = function(a) {
          this.interactiveDataPool.push(a)
        }, b.prototype.normalizeToPointerData = function(a) {
          this.normalizeTouchEvents && a.changedTouches ? ("undefined" == typeof a.button && (a.button = a.touches.length ? 1 : 0), "undefined" == typeof a.buttons && (a.buttons = a.touches.length ? 1 : 0), "undefined" == typeof a.isPrimary && (a.isPrimary = 1 === a.touches.length), "undefined" == typeof a.width && (a.width = a.changedTouches[0].radiusX || 1), "undefined" == typeof a.height && (a.height = a.changedTouches[0].radiusY || 1), "undefined" == typeof a.tiltX && (a.tiltX = 0), "undefined" == typeof a.tiltY && (a.tiltY = 0), "undefined" == typeof a.pointerType && (a.pointerType = "touch"), "undefined" == typeof a.pointerId && (a.pointerId = a.changedTouches[0].identifier || 0), "undefined" == typeof a.pressure && (a.pressure = a.changedTouches[0].force || .5), "undefined" == typeof a.rotation && (a.rotation = a.changedTouches[0].rotationAngle || 0), "undefined" == typeof a.clientX && (a.clientX = a.changedTouches[0].clientX), "undefined" == typeof a.clientY && (a.clientY = a.changedTouches[0].clientY), "undefined" == typeof a.pageX && (a.pageX = a.changedTouches[0].pageX), "undefined" == typeof a.pageY && (a.pageY = a.changedTouches[0].pageY), "undefined" == typeof a.screenX && (a.screenX = a.changedTouches[0].screenX), "undefined" == typeof a.screenY && (a.screenY = a.changedTouches[0].screenY), "undefined" == typeof a.layerX && (a.layerX = a.offsetX = a.clientX), "undefined" == typeof a.layerY && (a.layerY = a.offsetY = a.clientY)) : this.normalizeMouseEvents && ("undefined" == typeof a.isPrimary && (a.isPrimary = !0), "undefined" == typeof a.width && (a.width = 1), "undefined" == typeof a.height && (a.height = 1), "undefined" == typeof a.tiltX && (a.tiltX = 0), "undefined" == typeof a.tiltY && (a.tiltY = 0), "undefined" == typeof a.pointerType && (a.pointerType = "mouse"), "undefined" == typeof a.pointerId && (a.pointerId = 1), "undefined" == typeof a.pressure && (a.pressure = .5), "undefined" == typeof a.rotation && (a.rotation = 0))
        }, b.prototype.destroy = function() {
          this.removeEvents(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactiveDataPool = null, this.interactionDOMElement = null, this.onMouseDown = null, this.processMouseDown = null, this.onMouseUp = null, this.processMouseUp = null, this.onMouseMove = null, this.processMouseMove = null, this.onMouseOut = null, this.processMouseOverOut = null, this.onMouseOver = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.onTouchStart = null, this.processTouchStart = null, this.onTouchEnd = null, this.processTouchEnd = null, this.onTouchMove = null, this.processTouchMove = null, this._tempPoint = null
        }, b
      }(p.default);
      c.default = u, j.WebGLRenderer.registerPlugin("interaction", u), j.CanvasRenderer.registerPlugin("interaction", u)
    }, {
      "../core": 62,
      "./InteractionData": 144,
      "./InteractionEvent": 145,
      "./interactiveTarget": 148,
      eventemitter3: 3,
      ismobilejs: 4
    }],
    147: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./InteractionData");
      Object.defineProperty(c, "InteractionData", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./InteractionManager");
      Object.defineProperty(c, "InteractionManager", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      });
      var g = a("./interactiveTarget");
      Object.defineProperty(c, "interactiveTarget", {
        enumerable: !0,
        get: function() {
          return d(g).default
        }
      })
    }, {
      "./InteractionData": 144,
      "./InteractionManager": 146,
      "./interactiveTarget": 148
    }],
    148: [function(a, b, c) {
      "use strict";
      c.__esModule = !0, c.default = {
        interactive: !1,
        interactiveChildren: !0,
        hitArea: null,
        buttonMode: !1,
        defaultCursor: "pointer",
        _over: !1,
        _isLeftDown: !1,
        _isRightDown: !1,
        _pointerOver: !1,
        _pointerDown: !1,
        _touchDown: !1
      }
    }, {}],
    149: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        var c = {},
          d = a.data.getElementsByTagName("info")[0],
          e = a.data.getElementsByTagName("common")[0];
        c.font = d.getAttribute("face"), c.size = parseInt(d.getAttribute("size"), 10), c.lineHeight = parseInt(e.getAttribute("lineHeight"), 10), c.chars = {};
        for (var f = a.data.getElementsByTagName("char"), g = 0; g < f.length; g++) {
          var i = parseInt(f[g].getAttribute("id"), 10),
            k = new h.Rectangle(parseInt(f[g].getAttribute("x"), 10) + b.frame.x, parseInt(f[g].getAttribute("y"), 10) + b.frame.y, parseInt(f[g].getAttribute("width"), 10), parseInt(f[g].getAttribute("height"), 10));
          c.chars[i] = {
            xOffset: parseInt(f[g].getAttribute("xoffset"), 10),
            yOffset: parseInt(f[g].getAttribute("yoffset"), 10),
            xAdvance: parseInt(f[g].getAttribute("xadvance"), 10),
            kerning: {},
            texture: new h.Texture(b.baseTexture, k)
          }
        }
        for (var l = a.data.getElementsByTagName("kerning"), m = 0; m < l.length; m++) {
          var n = parseInt(l[m].getAttribute("first"), 10),
            o = parseInt(l[m].getAttribute("second"), 10),
            p = parseInt(l[m].getAttribute("amount"), 10);
          c.chars[o] && (c.chars[o].kerning[n] = p)
        }
        a.bitmapFont = c, j.BitmapText.fonts[c.font] = c
      }
      c.__esModule = !0, c.parse = e, c.default = function() {
        return function(a, b) {
          if (!a.data || !a.isXml) return void b();
          if (0 === a.data.getElementsByTagName("page").length || 0 === a.data.getElementsByTagName("info").length || null === a.data.getElementsByTagName("info")[0].getAttribute("face")) return void b();
          var c = a.isDataUrl ? "" : g.dirname(a.url);
          a.isDataUrl && ("." === c && (c = ""), this.baseUrl && c && ("/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (c += "/"), c = c.replace(this.baseUrl, ""))), c && "/" !== c.charAt(c.length - 1) && (c += "/");
          var d = c + a.data.getElementsByTagName("page")[0].getAttribute("file");
          if (h.utils.TextureCache[d]) e(a, h.utils.TextureCache[d]), b();
          else {
            var f = {
              crossOrigin: a.crossOrigin,
              loadType: i.Resource.LOAD_TYPE.IMAGE,
              metadata: a.metadata.imageMetadata
            };
            this.add(a.name + "_image", d, f, function(c) {
              e(a, c.texture), b()
            })
          }
        }
      };
      var f = a("path"),
        g = d(f),
        h = a("../core"),
        i = a("resource-loader"),
        j = a("../extras")
    }, {
      "../core": 62,
      "../extras": 130,
      path: 22,
      "resource-loader": 36
    }],
    150: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./loader");
      Object.defineProperty(c, "Loader", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./bitmapFontParser");
      Object.defineProperty(c, "bitmapFontParser", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      }), Object.defineProperty(c, "parseBitmapFontData", {
        enumerable: !0,
        get: function() {
          return f.parse
        }
      });
      var g = a("./spritesheetParser");
      Object.defineProperty(c, "spritesheetParser", {
        enumerable: !0,
        get: function() {
          return d(g).default
        }
      });
      var h = a("./textureParser");
      Object.defineProperty(c, "textureParser", {
        enumerable: !0,
        get: function() {
          return d(h).default
        }
      });
      var i = a("resource-loader");
      Object.defineProperty(c, "Resource", {
        enumerable: !0,
        get: function() {
          return i.Resource
        }
      })
    }, {
      "./bitmapFontParser": 149,
      "./loader": 151,
      "./spritesheetParser": 152,
      "./textureParser": 153,
      "resource-loader": 36
    }],
    151: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("resource-loader"),
        i = d(h),
        j = a("./textureParser"),
        k = d(j),
        l = a("./spritesheetParser"),
        m = d(l),
        n = a("./bitmapFontParser"),
        o = d(n),
        p = function(a) {
          function b(c, d) {
            e(this, b);
            for (var g = f(this, a.call(this, c, d)), h = 0; h < b._pixiMiddleware.length; ++h) g.use(b._pixiMiddleware[h]());
            return g
          }
          return g(b, a), b.addPixiMiddleware = function(a) {
            b._pixiMiddleware.push(a)
          }, b
        }(i.default);
      c.default = p, p._pixiMiddleware = [i.default.middleware.parsing.blob, k.default, m.default, o.default];
      var q = i.default.Resource;
      q.setExtensionXhrType("fnt", q.XHR_RESPONSE_TYPE.DOCUMENT)
    }, {
      "./bitmapFontParser": 149,
      "./spritesheetParser": 152,
      "./textureParser": 153,
      "resource-loader": 36
    }],
    152: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0, c.default = function() {
        return function(a, b) {
          var c = void 0,
            d = a.name + "_image";
          if (!a.data || !a.isJson || !a.data.frames || this.resources[d]) return void b();
          var e = {
            crossOrigin: a.crossOrigin,
            loadType: f.Resource.LOAD_TYPE.IMAGE,
            metadata: a.metadata.imageMetadata
          };
          c = a.isDataUrl ? a.data.meta.image : h.default.dirname(a.url.replace(this.baseUrl, "")) + "/" + a.data.meta.image, this.add(d, c, e, function(c) {
            function d(b, d) {
              for (var e = b; e - b < d && e < i.length;) {
                var f = i[e],
                  g = h[f].frame;
                if (g) {
                  var k = null,
                    m = null,
                    n = new j.Rectangle(0, 0, h[f].sourceSize.w / l, h[f].sourceSize.h / l);
                  k = h[f].rotated ? new j.Rectangle(g.x / l, g.y / l, g.h / l, g.w / l) : new j.Rectangle(g.x / l, g.y / l, g.w / l, g.h / l), h[f].trimmed && (m = new j.Rectangle(h[f].spriteSourceSize.x / l, h[f].spriteSourceSize.y / l, h[f].spriteSourceSize.w / l, h[f].spriteSourceSize.h / l)), a.textures[f] = new j.Texture(c.texture.baseTexture, k, n, m, h[f].rotated ? 2 : 0), j.utils.TextureCache[f] = a.textures[f]
                }
                e++
              }
            }

            function e() {
              return m * k < i.length
            }

            function f(a) {
              d(m * k, k), m++, setTimeout(a, 0)
            }

            function g() {
              f(function() {
                e() ? g() : b()
              })
            }
            a.textures = {};
            var h = a.data.frames,
              i = Object.keys(h),
              l = j.utils.getResolutionOfUrl(a.url),
              m = 0;
            i.length <= k ? (d(0, k), b()) : g()
          })
        }
      };
      var f = a("resource-loader"),
        g = a("path"),
        h = e(g),
        i = a("../core"),
        j = d(i),
        k = 1e3
    }, {
      "../core": 62,
      path: 22,
      "resource-loader": 36
    }],
    153: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }
      c.__esModule = !0, c.default = function() {
        return function(a, b) {
          if (a.data && a.isImage) {
            var c = new f.BaseTexture(a.data, null, f.utils.getResolutionOfUrl(a.url));
            c.imageUrl = a.url, a.texture = new f.Texture(c), f.utils.BaseTextureCache[a.name] = c, f.utils.TextureCache[a.name] = a.texture, a.name !== a.url && (f.utils.BaseTextureCache[a.url] = c, f.utils.TextureCache[a.url] = a.texture)
          }
          b()
        }
      };
      var e = a("../core"),
        f = d(e)
    }, {
      "../core": 62
    }],
    154: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("../core"),
        j = d(i),
        k = new j.Point,
        l = new j.Polygon,
        m = function(a) {
          function b(c, d, g, h, i) {
            e(this, b);
            var k = f(this, a.call(this));
            return k._texture = null, k.uvs = g || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), k.vertices = d || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), k.indices = h || new Uint16Array([0, 1, 3, 2]), k.dirty = 0, k.indexDirty = 0, k.blendMode = j.BLEND_MODES.NORMAL, k.canvasPadding = 0, k.drawMode = i || b.DRAW_MODES.TRIANGLE_MESH, k.texture = c, k.shader = null, k.tintRgb = new Float32Array([1, 1, 1]), k._glDatas = {}, k
          }
          return g(b, a), b.prototype._renderWebGL = function(a) {
            a.setObjectRenderer(a.plugins.mesh), a.plugins.mesh.render(this)
          }, b.prototype._renderCanvas = function(a) {
            a.plugins.mesh.render(this)
          }, b.prototype._onTextureUpdate = function() {}, b.prototype._calculateBounds = function() {
            this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length)
          }, b.prototype.containsPoint = function(a) {
            if (!this.getBounds().contains(a.x, a.y)) return !1;
            this.worldTransform.applyInverse(a, k);
            for (var c = this.vertices, d = l.points, e = this.indices, f = this.indices.length, g = this.drawMode === b.DRAW_MODES.TRIANGLES ? 3 : 1, h = 0; h + 2 < f; h += g) {
              var i = 2 * e[h],
                j = 2 * e[h + 1],
                m = 2 * e[h + 2];
              if (d[0] = c[i], d[1] = c[i + 1], d[2] = c[j], d[3] = c[j + 1], d[4] = c[m], d[5] = c[m + 1], l.contains(k.x, k.y)) return !0
            }
            return !1
          }, h(b, [{
            key: "texture",
            get: function() {
              return this._texture
            },
            set: function(a) {
              this._texture !== a && (this._texture = a, a && (a.baseTexture.hasLoaded ? this._onTextureUpdate() : a.once("update", this._onTextureUpdate, this)))
            }
          }, {
            key: "tint",
            get: function() {
              return j.utils.rgb2hex(this.tintRgb)
            },
            set: function(a) {
              this.tintRgb = j.utils.hex2rgb(a, this.tintRgb)
            }
          }]), b
        }(j.Container);
      c.default = m, m.DRAW_MODES = {
        TRIANGLE_MESH: 0,
        TRIANGLES: 1
      }
    }, {
      "../core": 62
    }],
    155: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = function() {
          function a(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }
          return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b
          }
        }(),
        i = a("./Plane"),
        j = d(i),
        k = 10,
        l = function(a) {
          function b(c, d, g, h, i) {
            e(this, b);
            var j = f(this, a.call(this, c, 4, 4)),
              l = j.uvs;
            return l[6] = l[14] = l[22] = l[30] = 1, l[25] = l[27] = l[29] = l[31] = 1, j._origWidth = c.width, j._origHeight = c.height, j._uvw = 1 / j._origWidth, j._uvh = 1 / j._origHeight, j.width = c.width, j.height = c.height, l[2] = l[10] = l[18] = l[26] = j._uvw * d, l[4] = l[12] = l[20] = l[28] = 1 - j._uvw * h, l[9] = l[11] = l[13] = l[15] = j._uvh * g, l[17] = l[19] = l[21] = l[23] = 1 - j._uvh * i, j.leftWidth = "undefined" != typeof d ? d : k, j.rightWidth = "undefined" != typeof h ? h : k, j.topHeight = "undefined" != typeof g ? g : k, j.bottomHeight = "undefined" != typeof i ? i : k, j
          }
          return g(b, a), b.prototype.updateHorizontalVertices = function() {
            var a = this.vertices;
            a[9] = a[11] = a[13] = a[15] = this._topHeight, a[17] = a[19] = a[21] = a[23] = this._height - this._bottomHeight, a[25] = a[27] = a[29] = a[31] = this._height
          }, b.prototype.updateVerticalVertices = function() {
            var a = this.vertices;
            a[2] = a[10] = a[18] = a[26] = this._leftWidth, a[4] = a[12] = a[20] = a[28] = this._width - this._rightWidth, a[6] = a[14] = a[22] = a[30] = this._width
          }, b.prototype._renderCanvas = function(a) {
            var b = a.context;
            b.globalAlpha = this.worldAlpha;
            var c = this.worldTransform,
              d = a.resolution;
            a.roundPixels ? b.setTransform(c.a * d, c.b * d, c.c * d, c.d * d, c.tx * d | 0, c.ty * d | 0) : b.setTransform(c.a * d, c.b * d, c.c * d, c.d * d, c.tx * d, c.ty * d);
            var e = this._texture.baseTexture,
              f = e.source,
              g = e.width,
              h = e.height;
            this.drawSegment(b, f, g, h, 0, 1, 10, 11), this.drawSegment(b, f, g, h, 2, 3, 12, 13), this.drawSegment(b, f, g, h, 4, 5, 14, 15), this.drawSegment(b, f, g, h, 8, 9, 18, 19), this.drawSegment(b, f, g, h, 10, 11, 20, 21), this.drawSegment(b, f, g, h, 12, 13, 22, 23), this.drawSegment(b, f, g, h, 16, 17, 26, 27), this.drawSegment(b, f, g, h, 18, 19, 28, 29), this.drawSegment(b, f, g, h, 20, 21, 30, 31)
          }, b.prototype.drawSegment = function(a, b, c, d, e, f, g, h) {
            var i = this.uvs,
              j = this.vertices,
              k = (i[g] - i[e]) * c,
              l = (i[h] - i[f]) * d,
              m = j[g] - j[e],
              n = j[h] - j[f];
            k < 1 && (k = 1), l < 1 && (l = 1), m < 1 && (m = 1), n < 1 && (n = 1), a.drawImage(b, i[e] * c, i[f] * d, k, l, j[e], j[f], m, n)
          }, h(b, [{
            key: "width",
            get: function() {
              return this._width
            },
            set: function(a) {
              this._width = a, this.updateVerticalVertices()
            }
          }, {
            key: "height",
            get: function() {
              return this._height
            },
            set: function(a) {
              this._height = a, this.updateHorizontalVertices()
            }
          }, {
            key: "leftWidth",
            get: function() {
              return this._leftWidth
            },
            set: function(a) {
              this._leftWidth = a;
              var b = this.uvs,
                c = this.vertices;
              b[2] = b[10] = b[18] = b[26] = this._uvw * a, c[2] = c[10] = c[18] = c[26] = a, this.dirty = !0
            }
          }, {
            key: "rightWidth",
            get: function() {
              return this._rightWidth
            },
            set: function(a) {
              this._rightWidth = a;
              var b = this.uvs,
                c = this.vertices;
              b[4] = b[12] = b[20] = b[28] = 1 - this._uvw * a, c[4] = c[12] = c[20] = c[28] = this._width - a, this.dirty = !0
            }
          }, {
            key: "topHeight",
            get: function() {
              return this._topHeight
            },
            set: function(a) {
              this._topHeight = a;
              var b = this.uvs,
                c = this.vertices;
              b[9] = b[11] = b[13] = b[15] = this._uvh * a, c[9] = c[11] = c[13] = c[15] = a, this.dirty = !0
            }
          }, {
            key: "bottomHeight",
            get: function() {
              return this._bottomHeight
            },
            set: function(a) {
              this._bottomHeight = a;
              var b = this.uvs,
                c = this.vertices;
              b[17] = b[19] = b[21] = b[23] = 1 - this._uvh * a, c[17] = c[19] = c[21] = c[23] = this._height - a, this.dirty = !0
            }
          }]), b
        }(j.default);
      c.default = l
    }, {
      "./Plane": 156
    }],
    156: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("./Mesh"),
        i = d(h),
        j = function(a) {
          function b(c, d, g) {
            e(this, b);
            var h = f(this, a.call(this, c));
            return h._ready = !0, h.verticesX = d || 10, h.verticesY = g || 10, h.drawMode = i.default.DRAW_MODES.TRIANGLES, h.refresh(), h
          }
          return g(b, a), b.prototype.refresh = function() {
            for (var a = this.verticesX * this.verticesY, b = [], c = [], d = [], e = [], f = this.texture, g = this.verticesX - 1, h = this.verticesY - 1, i = f.width / g, j = f.height / h, k = 0; k < a; k++) {
              var l = k % this.verticesX,
                m = k / this.verticesX | 0;
              b.push(l * i, m * j), d.push(f._uvs.x0 + (f._uvs.x1 - f._uvs.x0) * (l / (this.verticesX - 1)), f._uvs.y0 + (f._uvs.y3 - f._uvs.y0) * (m / (this.verticesY - 1)))
            }
            for (var n = g * h, o = 0; o < n; o++) {
              var p = o % g,
                q = o / g | 0,
                r = q * this.verticesX + p,
                s = q * this.verticesX + p + 1,
                t = (q + 1) * this.verticesX + p,
                u = (q + 1) * this.verticesX + p + 1;
              e.push(r, s, t), e.push(s, u, t)
            }
            this.vertices = new Float32Array(b), this.uvs = new Float32Array(d), this.colors = new Float32Array(c), this.indices = new Uint16Array(e), this.indexDirty = !0
          }, b.prototype._onTextureUpdate = function() {
            i.default.prototype._onTextureUpdate.call(this), this._ready && this.refresh()
          }, b
        }(i.default);
      c.default = j
    }, {
      "./Mesh": 154
    }],
    157: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = a("./Mesh"),
        j = e(i),
        k = a("../core"),
        l = d(k),
        m = function(a) {
          function b(c, d) {
            f(this, b);
            var e = g(this, a.call(this, c));
            return e.points = d, e.vertices = new Float32Array(4 * d.length), e.uvs = new Float32Array(4 * d.length), e.colors = new Float32Array(2 * d.length), e.indices = new Uint16Array(2 * d.length), e._ready = !0, e.refresh(), e
          }
          return h(b, a), b.prototype.refresh = function() {
            var a = this.points;
            if (!(a.length < 1) && this._texture._uvs) {
              var b = this.uvs,
                c = this.indices,
                d = this.colors,
                e = this._texture._uvs,
                f = new l.Point(e.x0, e.y0),
                g = new l.Point(e.x2 - e.x0, e.y2 - e.y0);
              b[0] = 0 + f.x, b[1] = 0 + f.y, b[2] = 0 + f.x, b[3] = Number(g.y) + f.y, d[0] = 1, d[1] = 1, c[0] = 0, c[1] = 1;
              for (var h = a.length, i = 1; i < h; i++) {
                var j = 4 * i,
                  k = i / (h - 1);
                b[j] = k * g.x + f.x, b[j + 1] = 0 + f.y, b[j + 2] = k * g.x + f.x, b[j + 3] = Number(g.y) + f.y, j = 2 * i, d[j] = 1, d[j + 1] = 1, j = 2 * i, c[j] = j, c[j + 1] = j + 1
              }
              this.dirty = !0, this.indexDirty = !0
            }
          }, b.prototype._onTextureUpdate = function() {
            a.prototype._onTextureUpdate.call(this), this._ready && this.refresh()
          }, b.prototype.updateTransform = function() {
            var a = this.points;
            if (!(a.length < 1)) {
              for (var b = a[0], c = void 0, d = 0, e = 0, f = this.vertices, g = a.length, h = 0; h < g; h++) {
                var i = a[h],
                  j = 4 * h;
                c = h < a.length - 1 ? a[h + 1] : i, e = -(c.x - b.x), d = c.y - b.y;
                var k = 10 * (1 - h / (g - 1));
                k > 1 && (k = 1);
                var l = Math.sqrt(d * d + e * e),
                  m = this._texture.height / 2;
                d /= l, e /= l, d *= m, e *= m, f[j] = i.x + d, f[j + 1] = i.y + e, f[j + 2] = i.x - d, f[j + 3] = i.y - e, b = i
              }
              this.containerUpdateTransform()
            }
          }, b
        }(j.default);
      c.default = m
    }, {
      "../core": 62,
      "./Mesh": 154
    }],
    158: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var g = a("../../core"),
        h = e(g),
        i = a("../Mesh"),
        j = d(i),
        k = function() {
          function a(b) {
            f(this, a), this.renderer = b
          }
          return a.prototype.render = function(a) {
            var b = this.renderer,
              c = b.context,
              d = a.worldTransform,
              e = b.resolution;
            b.roundPixels ? c.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e | 0, d.ty * e | 0) : c.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e, d.ty * e), a.drawMode === j.default.DRAW_MODES.TRIANGLE_MESH ? this._renderTriangleMesh(a) : this._renderTriangles(a)
          }, a.prototype._renderTriangleMesh = function(a) {
            for (var b = a.vertices.length / 2, c = 0; c < b - 2; c++) {
              var d = 2 * c;
              this._renderDrawTriangle(a, d, d + 2, d + 4)
            }
          }, a.prototype._renderTriangles = function(a) {
            for (var b = a.indices, c = b.length, d = 0; d < c; d += 3) {
              var e = 2 * b[d],
                f = 2 * b[d + 1],
                g = 2 * b[d + 2];
              this._renderDrawTriangle(a, e, f, g)
            }
          }, a.prototype._renderDrawTriangle = function(a, b, c, d) {
            var e = this.renderer.context,
              f = a.uvs,
              g = a.vertices,
              h = a._texture;
            if (h.valid) {
              var i = h.baseTexture,
                j = i.source,
                k = i.width,
                l = i.height,
                m = f[b] * i.width,
                n = f[c] * i.width,
                o = f[d] * i.width,
                p = f[b + 1] * i.height,
                q = f[c + 1] * i.height,
                r = f[d + 1] * i.height,
                s = g[b],
                t = g[c],
                u = g[d],
                v = g[b + 1],
                w = g[c + 1],
                x = g[d + 1];
              if (a.canvasPadding > 0) {
                var y = a.canvasPadding / a.worldTransform.a,
                  z = a.canvasPadding / a.worldTransform.d,
                  A = (s + t + u) / 3,
                  B = (v + w + x) / 3,
                  C = s - A,
                  D = v - B,
                  E = Math.sqrt(C * C + D * D);
                s = A + C / E * (E + y), v = B + D / E * (E + z), C = t - A, D = w - B, E = Math.sqrt(C * C + D * D), t = A + C / E * (E + y), w = B + D / E * (E + z), C = u - A, D = x - B, E = Math.sqrt(C * C + D * D), u = A + C / E * (E + y), x = B + D / E * (E + z)
              }
              e.save(), e.beginPath(), e.moveTo(s, v), e.lineTo(t, w), e.lineTo(u, x), e.closePath(), e.clip();
              var F = m * q + p * o + n * r - q * o - p * n - m * r,
                G = s * q + p * u + t * r - q * u - p * t - s * r,
                H = m * t + s * o + n * u - t * o - s * n - m * u,
                I = m * q * u + p * t * o + s * n * r - s * q * o - p * n * u - m * t * r,
                J = v * q + p * x + w * r - q * x - p * w - v * r,
                K = m * w + v * o + n * x - w * o - v * n - m * x,
                L = m * q * x + p * w * o + v * n * r - v * q * o - p * n * x - m * w * r;
              e.transform(G / F, J / F, H / F, K / F, I / F, L / F), e.drawImage(j, 0, 0, k * i.resolution, l * i.resolution, 0, 0, k, l), e.restore()
            }
          }, a.prototype.renderMeshFlat = function(a) {
            var b = this.renderer.context,
              c = a.vertices,
              d = c.length / 2;
            b.beginPath();
            for (var e = 1; e < d - 2; ++e) {
              var f = 2 * e,
                g = c[f],
                h = c[f + 1],
                i = c[f + 2],
                j = c[f + 3],
                k = c[f + 4],
                l = c[f + 5];
              b.moveTo(g, h), b.lineTo(i, j), b.lineTo(k, l)
            }
            b.fillStyle = "#FF0000", b.fill(), b.closePath()
          }, a.prototype.destroy = function() {
            this.renderer = null
          }, a
        }();
      c.default = k, h.CanvasRenderer.registerPlugin("mesh", k)
    }, {
      "../../core": 62,
      "../Mesh": 154
    }],
    159: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./Mesh");
      Object.defineProperty(c, "Mesh", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./webgl/MeshRenderer");
      Object.defineProperty(c, "MeshRenderer", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      });
      var g = a("./canvas/CanvasMeshRenderer");
      Object.defineProperty(c, "CanvasMeshRenderer", {
        enumerable: !0,
        get: function() {
          return d(g).default
        }
      });
      var h = a("./Plane");
      Object.defineProperty(c, "Plane", {
        enumerable: !0,
        get: function() {
          return d(h).default
        }
      });
      var i = a("./NineSlicePlane");
      Object.defineProperty(c, "NineSlicePlane", {
        enumerable: !0,
        get: function() {
          return d(i).default
        }
      });
      var j = a("./Rope");
      Object.defineProperty(c, "Rope", {
        enumerable: !0,
        get: function() {
          return d(j).default
        }
      })
    }, {
      "./Mesh": 154,
      "./NineSlicePlane": 155,
      "./Plane": 156,
      "./Rope": 157,
      "./canvas/CanvasMeshRenderer": 158,
      "./webgl/MeshRenderer": 160
    }],
    160: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0, c.MeshRenderer = void 0;
      var i = a("../../core"),
        j = e(i),
        k = a("pixi-gl-core"),
        l = d(k),
        m = a("../Mesh"),
        n = d(m),
        o = c.MeshRenderer = function(a) {
          function b(c) {
            f(this, b);
            var d = g(this, a.call(this, c));
            return d.shader = null, d
          }
          return h(b, a), b.prototype.onContextChange = function() {
            var a = this.renderer.gl;
            this.shader = new j.Shader(a, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 translationMatrix;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n}\n", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform float alpha;\nuniform vec3 tint;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(tint * alpha, alpha);\n}\n")
          }, b.prototype.render = function(a) {
            var b = this.renderer,
              c = b.gl,
              d = a._texture;
            if (d.valid) {
              var e = a._glDatas[b.CONTEXT_UID];
              e || (e = {
                shader: this.shader,
                vertexBuffer: l.default.GLBuffer.createVertexBuffer(c, a.vertices, c.STREAM_DRAW),
                uvBuffer: l.default.GLBuffer.createVertexBuffer(c, a.uvs, c.STREAM_DRAW),
                indexBuffer: l.default.GLBuffer.createIndexBuffer(c, a.indices, c.STATIC_DRAW),
                vao: new l.default.VertexArrayObject(c),
                dirty: a.dirty,
                indexDirty: a.indexDirty
              }, e.vao = new l.default.VertexArrayObject(c).addIndex(e.indexBuffer).addAttribute(e.vertexBuffer, e.shader.attributes.aVertexPosition, c.FLOAT, !1, 8, 0).addAttribute(e.uvBuffer, e.shader.attributes.aTextureCoord, c.FLOAT, !1, 8, 0), a._glDatas[b.CONTEXT_UID] = e), a.dirty !== e.dirty && (e.dirty = a.dirty, e.uvBuffer.upload()), a.indexDirty !== e.indexDirty && (e.indexDirty = a.indexDirty, e.indexBuffer.upload()), e.vertexBuffer.upload(), b.bindShader(e.shader), b.bindTexture(d, 0), b.state.setBlendMode(a.blendMode), e.shader.uniforms.translationMatrix = a.worldTransform.toArray(!0), e.shader.uniforms.alpha = a.worldAlpha, e.shader.uniforms.tint = a.tintRgb;
              var f = a.drawMode === n.default.DRAW_MODES.TRIANGLE_MESH ? c.TRIANGLE_STRIP : c.TRIANGLES;
              e.vao.bind().draw(f, a.indices.length).unbind()
            }
          }, b
        }(j.ObjectRenderer);
      j.WebGLRenderer.registerPlugin("mesh", o)
    }, {
      "../../core": 62,
      "../Mesh": 154,
      "pixi-gl-core": 12
    }],
    161: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../core"),
        i = d(h),
        j = function(a) {
          function b() {
            var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1500,
              d = arguments[1],
              g = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 16384;
            e(this, b);
            var h = f(this, a.call(this)),
              j = 16384;
            return g > j && (g = j), g > c && (g = c), h._properties = [!1, !0, !1, !1, !1], h._maxSize = c, h._batchSize = g, h._glBuffers = {}, h._bufferToUpdate = 0, h.interactiveChildren = !1, h.blendMode = i.BLEND_MODES.NORMAL, h.roundPixels = !0, h.baseTexture = null, h.setProperties(d), h
          }
          return g(b, a), b.prototype.setProperties = function(a) {
            a && (this._properties[0] = "scale" in a ? !!a.scale : this._properties[0], this._properties[1] = "position" in a ? !!a.position : this._properties[1], this._properties[2] = "rotation" in a ? !!a.rotation : this._properties[2], this._properties[3] = "uvs" in a ? !!a.uvs : this._properties[3], this._properties[4] = "alpha" in a ? !!a.alpha : this._properties[4])
          }, b.prototype.updateTransform = function() {
            this.displayObjectUpdateTransform()
          }, b.prototype.renderWebGL = function(a) {
            var b = this;
            this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.hasLoaded || this.baseTexture.once("update", function() {
              return b.onChildrenChange(0)
            })), a.setObjectRenderer(a.plugins.particle), a.plugins.particle.render(this))
          }, b.prototype.onChildrenChange = function(a) {
            var b = Math.floor(a / this._batchSize);
            b < this._bufferToUpdate && (this._bufferToUpdate = b)
          }, b.prototype.renderCanvas = function(a) {
            if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
              var b = a.context,
                c = this.worldTransform,
                d = !0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = a.blendModes[this.blendMode];
              i !== b.globalCompositeOperation && (b.globalCompositeOperation = i), b.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
              for (var j = 0; j < this.children.length; ++j) {
                var k = this.children[j];
                if (k.visible) {
                  var l = k.texture.frame;
                  if (b.globalAlpha = this.worldAlpha * k.alpha, k.rotation % (2 * Math.PI) === 0) d && (b.setTransform(c.a, c.b, c.c, c.d, c.tx * a.resolution, c.ty * a.resolution), d = !1), e = k.anchor.x * (-l.width * k.scale.x) + k.position.x + .5, f = k.anchor.y * (-l.height * k.scale.y) + k.position.y + .5, g = l.width * k.scale.x, h = l.height * k.scale.y;
                  else {
                    d || (d = !0), k.displayObjectUpdateTransform();
                    var m = k.worldTransform;
                    a.roundPixels ? b.setTransform(m.a, m.b, m.c, m.d, m.tx * a.resolution | 0, m.ty * a.resolution | 0) : b.setTransform(m.a, m.b, m.c, m.d, m.tx * a.resolution, m.ty * a.resolution), e = k.anchor.x * -l.width + .5, f = k.anchor.y * -l.height + .5, g = l.width, h = l.height
                  }
                  var n = k.texture.baseTexture.resolution;
                  b.drawImage(k.texture.baseTexture.source, l.x * n, l.y * n, l.width * n, l.height * n, e * n, f * n, g * n, h * n)
                }
              }
            }
          }, b.prototype.destroy = function(b) {
            if (a.prototype.destroy.call(this, b), this._buffers)
              for (var c = 0; c < this._buffers.length; ++c) this._buffers[c].destroy();
            this._properties = null, this._buffers = null
          }, b
        }(i.Container);
      c.default = j
    }, {
      "../core": 62
    }],
    162: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./ParticleContainer");
      Object.defineProperty(c, "ParticleContainer", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./webgl/ParticleRenderer");
      Object.defineProperty(c, "ParticleRenderer", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      })
    }, {
      "./ParticleContainer": 161,
      "./webgl/ParticleRenderer": 164
    }],
    163: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }
      c.__esModule = !0;
      var f = a("pixi-gl-core"),
        g = d(f),
        h = a("../../core/utils/createIndicesForQuads"),
        i = d(h),
        j = function() {
          function a(b, c, d, f) {
            e(this, a), this.gl = b, this.vertSize = 2, this.vertByteSize = 4 * this.vertSize, this.size = f, this.dynamicProperties = [], this.staticProperties = [];
            for (var g = 0; g < c.length; ++g) {
              var h = c[g];
              h = {
                attribute: h.attribute,
                size: h.size,
                uploadFunction: h.uploadFunction,
                offset: h.offset
              }, d[g] ? this.dynamicProperties.push(h) : this.staticProperties.push(h)
            }
            this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.initBuffers()
          }
          return a.prototype.initBuffers = function() {
            var a = this.gl,
              b = 0;
            this.indices = (0, i.default)(this.size), this.indexBuffer = g.default.GLBuffer.createIndexBuffer(a, this.indices, a.STATIC_DRAW), this.dynamicStride = 0;
            for (var c = 0; c < this.dynamicProperties.length; ++c) {
              var d = this.dynamicProperties[c];
              d.offset = b, b += d.size, this.dynamicStride += d.size
            }
            this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4), this.dynamicBuffer = g.default.GLBuffer.createVertexBuffer(a, this.dynamicData, a.STREAM_DRAW);
            var e = 0;
            this.staticStride = 0;
            for (var f = 0; f < this.staticProperties.length; ++f) {
              var h = this.staticProperties[f];
              h.offset = e, e += h.size, this.staticStride += h.size
            }
            this.staticData = new Float32Array(this.size * this.staticStride * 4), this.staticBuffer = g.default.GLBuffer.createVertexBuffer(a, this.staticData, a.STATIC_DRAW), this.vao = new g.default.VertexArrayObject(a).addIndex(this.indexBuffer);
            for (var j = 0; j < this.dynamicProperties.length; ++j) {
              var k = this.dynamicProperties[j];
              this.vao.addAttribute(this.dynamicBuffer, k.attribute, a.FLOAT, !1, 4 * this.dynamicStride, 4 * k.offset)
            }
            for (var l = 0; l < this.staticProperties.length; ++l) {
              var m = this.staticProperties[l];
              this.vao.addAttribute(this.staticBuffer, m.attribute, a.FLOAT, !1, 4 * this.staticStride, 4 * m.offset)
            }
          }, a.prototype.uploadDynamic = function(a, b, c) {
            for (var d = 0; d < this.dynamicProperties.length; d++) {
              var e = this.dynamicProperties[d];
              e.uploadFunction(a, b, c, this.dynamicData, this.dynamicStride, e.offset)
            }
            this.dynamicBuffer.upload()
          }, a.prototype.uploadStatic = function(a, b, c) {
            for (var d = 0; d < this.staticProperties.length; d++) {
              var e = this.staticProperties[d];
              e.uploadFunction(a, b, c, this.staticData, this.staticStride, e.offset)
            }
            this.staticBuffer.upload()
          }, a.prototype.bind = function() {
            this.vao.bind()
          }, a.prototype.destroy = function() {
            this.dynamicProperties = null, this.dynamicData = null, this.dynamicBuffer.destroy(), this.staticProperties = null, this.staticData = null, this.staticBuffer.destroy()
          }, a
        }();
      c.default = j
    }, {
      "../../core/utils/createIndicesForQuads": 114,
      "pixi-gl-core": 12
    }],
    164: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var i = a("../../core"),
        j = e(i),
        k = a("./ParticleShader"),
        l = d(k),
        m = a("./ParticleBuffer"),
        n = d(m),
        o = function(a) {
          function b(c) {
            f(this, b);
            var d = g(this, a.call(this, c));
            return d.shader = null, d.indexBuffer = null, d.properties = null, d.tempMatrix = new j.Matrix, d.CONTEXT_UID = 0, d
          }
          return h(b, a), b.prototype.onContextChange = function() {
            var a = this.renderer.gl;
            this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.shader = new l.default(a), this.properties = [{
              attribute: this.shader.attributes.aVertexPosition,
              size: 2,
              uploadFunction: this.uploadVertices,
              offset: 0
            }, {
              attribute: this.shader.attributes.aPositionCoord,
              size: 2,
              uploadFunction: this.uploadPosition,
              offset: 0
            }, {
              attribute: this.shader.attributes.aRotation,
              size: 1,
              uploadFunction: this.uploadRotation,
              offset: 0
            }, {
              attribute: this.shader.attributes.aTextureCoord,
              size: 2,
              uploadFunction: this.uploadUvs,
              offset: 0
            }, {
              attribute: this.shader.attributes.aColor,
              size: 1,
              uploadFunction: this.uploadAlpha,
              offset: 0
            }]
          }, b.prototype.start = function() {
            this.renderer.bindShader(this.shader)
          }, b.prototype.render = function(a) {
            var b = a.children,
              c = a._maxSize,
              d = a._batchSize,
              e = b.length;
            if (0 !== e) {
              e > c && (e = c);
              var f = a._glBuffers[this.renderer.CONTEXT_UID];
              f || (f = a._glBuffers[this.renderer.CONTEXT_UID] = this.generateBuffers(a)), this.renderer.setBlendMode(a.blendMode);
              var g = this.renderer.gl,
                h = a.worldTransform.copy(this.tempMatrix);
              h.prepend(this.renderer._activeRenderTarget.projectionMatrix), this.shader.uniforms.projectionMatrix = h.toArray(!0), this.shader.uniforms.uAlpha = a.worldAlpha;
              var i = b[0]._texture.baseTexture;
              this.renderer.bindTexture(i);
              for (var j = 0, k = 0; j < e; j += d, k += 1) {
                var l = e - j;
                l > d && (l = d);
                var m = f[k];
                m.uploadDynamic(b, j, l), a._bufferToUpdate === k && (m.uploadStatic(b, j, l), a._bufferToUpdate = k + 1), m.vao.bind().draw(g.TRIANGLES, 6 * l).unbind()
              }
            }
          }, b.prototype.generateBuffers = function(a) {
            for (var b = this.renderer.gl, c = [], d = a._maxSize, e = a._batchSize, f = a._properties, g = 0; g < d; g += e) c.push(new n.default(b, this.properties, f, e));
            return c
          }, b.prototype.uploadVertices = function(a, b, c, d, e, f) {
            for (var g = 0, h = 0, i = 0, j = 0, k = 0; k < c; ++k) {
              var l = a[b + k],
                m = l._texture,
                n = l.scale.x,
                o = l.scale.y,
                p = m.trim,
                q = m.orig;
              p ? (h = p.x - l.anchor.x * q.width, g = h + p.width, j = p.y - l.anchor.y * q.height, i = j + p.height) : (g = q.width * (1 - l.anchor.x), h = q.width * -l.anchor.x, i = q.height * (1 - l.anchor.y), j = q.height * -l.anchor.y), d[f] = h * n, d[f + 1] = j * o, d[f + e] = g * n, d[f + e + 1] = j * o, d[f + 2 * e] = g * n, d[f + 2 * e + 1] = i * o, d[f + 3 * e] = h * n, d[f + 3 * e + 1] = i * o, f += 4 * e
            }
          }, b.prototype.uploadPosition = function(a, b, c, d, e, f) {
            for (var g = 0; g < c; g++) {
              var h = a[b + g].position;
              d[f] = h.x, d[f + 1] = h.y, d[f + e] = h.x, d[f + e + 1] = h.y, d[f + 2 * e] = h.x, d[f + 2 * e + 1] = h.y, d[f + 3 * e] = h.x, d[f + 3 * e + 1] = h.y, f += 4 * e
            }
          }, b.prototype.uploadRotation = function(a, b, c, d, e, f) {
            for (var g = 0; g < c; g++) {
              var h = a[b + g].rotation;
              d[f] = h, d[f + e] = h, d[f + 2 * e] = h, d[f + 3 * e] = h, f += 4 * e
            }
          }, b.prototype.uploadUvs = function(a, b, c, d, e, f) {
            for (var g = 0; g < c; ++g) {
              var h = a[b + g]._texture._uvs;
              h ? (d[f] = h.x0, d[f + 1] = h.y0, d[f + e] = h.x1, d[f + e + 1] = h.y1, d[f + 2 * e] = h.x2, d[f + 2 * e + 1] = h.y2, d[f + 3 * e] = h.x3, d[f + 3 * e + 1] = h.y3, f += 4 * e) : (d[f] = 0, d[f + 1] = 0, d[f + e] = 0, d[f + e + 1] = 0, d[f + 2 * e] = 0, d[f + 2 * e + 1] = 0, d[f + 3 * e] = 0, d[f + 3 * e + 1] = 0, f += 4 * e)
            }
          }, b.prototype.uploadAlpha = function(a, b, c, d, e, f) {
            for (var g = 0; g < c; g++) {
              var h = a[b + g].alpha;
              d[f] = h, d[f + e] = h, d[f + 2 * e] = h, d[f + 3 * e] = h, f += 4 * e
            }
          }, b.prototype.destroy = function() {
            this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer), a.prototype.destroy.call(this), this.shader.destroy(), this.indices = null, this.tempMatrix = null
          }, b
        }(j.ObjectRenderer);
      c.default = o, j.WebGLRenderer.registerPlugin("particle", o)
    }, {
      "../../core": 62,
      "./ParticleBuffer": 163,
      "./ParticleShader": 165
    }],
    165: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
      }

      function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
      }
      c.__esModule = !0;
      var h = a("../../core/Shader"),
        i = d(h),
        j = function(a) {
          function b(c) {
            return e(this, b), f(this, a.call(this, c, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform float uAlpha;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}"].join("\n")))
          }
          return g(b, a), b
        }(i.default);
      c.default = j
    }, {
      "../../core/Shader": 42
    }],
    166: [function(a, b, c) {
      "use strict";
      Math.sign || (Math.sign = function(a) {
        return a = Number(a), 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1
      })
    }, {}],
    167: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      var e = a("object-assign"),
        f = d(e);
      Object.assign || (Object.assign = f.default)
    }, {
      "object-assign": 5
    }],
    168: [function(a, b, c) {
      "use strict";
      a("./Object.assign"), a("./requestAnimationFrame"), a("./Math.sign"), window.ArrayBuffer || (window.ArrayBuffer = Array), window.Float32Array || (window.Float32Array = Array), window.Uint32Array || (window.Uint32Array = Array), window.Uint16Array || (window.Uint16Array = Array)
    }, {
      "./Math.sign": 166,
      "./Object.assign": 167,
      "./requestAnimationFrame": 169
    }],
    169: [function(a, b, c) {
      (function(a) {
        "use strict";
        var b = 16;
        Date.now && Date.prototype.getTime || (Date.now = function() {
          return (new Date).getTime()
        }), a.performance && a.performance.now || ! function() {
          var b = Date.now();
          a.performance || (a.performance = {}), a.performance.now = function() {
            return Date.now() - b
          }
        }();
        for (var c = Date.now(), d = ["ms", "moz", "webkit", "o"], e = 0; e < d.length && !a.requestAnimationFrame; ++e) {
          var f = d[e];
          a.requestAnimationFrame = a[f + "RequestAnimationFrame"], a.cancelAnimationFrame = a[f + "CancelAnimationFrame"] || a[f + "CancelRequestAnimationFrame"]
        }
        a.requestAnimationFrame || (a.requestAnimationFrame = function(a) {
          if ("function" != typeof a) throw new TypeError(a + "is not a function");
          var d = Date.now(),
            e = b + c - d;
          return e < 0 && (e = 0), c = d, setTimeout(function() {
            c = Date.now(), a(performance.now())
          }, e)
        }), a.cancelAnimationFrame || (a.cancelAnimationFrame = function(a) {
          return clearTimeout(a)
        })
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    170: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        if (b instanceof i.BaseTexture) {
          var c = b.source,
            d = 0 === c.width ? a.canvas.width : Math.min(a.canvas.width, c.width),
            e = 0 === c.height ? a.canvas.height : Math.min(a.canvas.height, c.height);
          return a.ctx.drawImage(c, 0, 0, d, e, 0, 0, a.canvas.width, a.canvas.height), !0
        }
        return !1
      }

      function g(a, b) {
        if (a instanceof i.BaseTexture) return b.indexOf(a) === -1 && b.push(a), !0;
        if (a._texture && a._texture instanceof i.Texture) {
          var c = a._texture.baseTexture;
          return b.indexOf(c) === -1 && b.push(c), !0
        }
        return !1
      }
      c.__esModule = !0;
      var h = a("../../core"),
        i = d(h),
        j = i.ticker.shared,
        k = 16,
        l = 4,
        m = function() {
          function a(b) {
            e(this, a), this.renderer = b, this.canvas = document.createElement("canvas"), this.canvas.width = k, this.canvas.height = k, this.ctx = this.canvas.getContext("2d"), this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.register(g, f)
          }
          return a.prototype.upload = function(b, c) {
            "function" == typeof b && (c = b, b = null), b && this.add(b), this.queue.length ? (this.numLeft = a.UPLOADS_PER_FRAME, c && this.completes.push(c), this.ticking || (this.ticking = !0, j.add(this.tick, this))) : c && c()
          }, a.prototype.tick = function() {
            for (; this.queue.length && this.numLeft > 0;) {
              for (var b = this.queue[0], c = !1, d = 0, e = this.uploadHooks.length; d < e; d++)
                if (this.uploadHooks[d](this, b)) {
                  this.numLeft--, this.queue.shift(), c = !0;
                  break
                }
              c || this.queue.shift()
            }
            if (this.queue.length) this.numLeft = a.UPLOADS_PER_FRAME;
            else {
              this.ticking = !1, j.remove(this.tick, this);
              var f = this.completes.slice(0);
              this.completes.length = 0;
              for (var g = 0, h = f.length; g < h; g++) f[g]()
            }
          }, a.prototype.register = function(a, b) {
            return a && this.addHooks.push(a), b && this.uploadHooks.push(b), this
          }, a.prototype.add = function(a) {
            for (var b = 0, c = this.addHooks.length; b < c && !this.addHooks[b](a, this.queue); b++);
            if (a instanceof i.Container)
              for (var d = a.children.length - 1; d >= 0; d--) this.add(a.children[d]);
            return this
          }, a.prototype.destroy = function() {
            this.ticking && j.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.ctx = null, this.canvas = null
          }, a
        }();
      c.default = m, m.UPLOADS_PER_FRAME = l, i.CanvasRenderer.registerPlugin("prepare", m)
    }, {
      "../../core": 62
    }],
    171: [function(a, b, c) {
      "use strict";

      function d(a) {
        return a && a.__esModule ? a : {
          default: a
        }
      }
      c.__esModule = !0;
      var e = a("./webgl/WebGLPrepare");
      Object.defineProperty(c, "webgl", {
        enumerable: !0,
        get: function() {
          return d(e).default
        }
      });
      var f = a("./canvas/CanvasPrepare");
      Object.defineProperty(c, "canvas", {
        enumerable: !0,
        get: function() {
          return d(f).default
        }
      })
    }, {
      "./canvas/CanvasPrepare": 170,
      "./webgl/WebGLPrepare": 172
    }],
    172: [function(a, b, c) {
      "use strict";

      function d(a) {
        if (a && a.__esModule) return a;
        var b = {};
        if (null != a)
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b.default = a, b
      }

      function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
      }

      function f(a, b) {
        return b instanceof k.BaseTexture && (a.textureManager.updateTexture(b), !0)
      }

      function g(a, b) {
        return b instanceof k.Graphics && (a.plugins.graphics.updateGraphics(b), !0)
      }

      function h(a, b) {
        if (a instanceof k.BaseTexture) return b.indexOf(a) === -1 && b.push(a), !0;
        if (a._texture && a._texture instanceof k.Texture) {
          var c = a._texture.baseTexture;
          return b.indexOf(c) === -1 && b.push(c), !0
        }
        return !1
      }

      function i(a, b) {
        return a instanceof k.Graphics && (b.push(a), !0)
      }
      c.__esModule = !0;
      var j = a("../../core"),
        k = d(j),
        l = k.ticker.shared,
        m = 4,
        n = function() {
          function a(b) {
            e(this, a), this.renderer = b, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.register(h, f).register(i, g)
          }
          return a.prototype.upload = function(b, c) {
            "function" == typeof b && (c = b, b = null), b && this.add(b), this.queue.length ? (this.numLeft = a.UPLOADS_PER_FRAME, c && this.completes.push(c), this.ticking || (this.ticking = !0, l.add(this.tick, this))) : c && c()
          }, a.prototype.tick = function() {
            for (; this.queue.length && this.numLeft > 0;) {
              for (var b = this.queue[0], c = !1, d = 0, e = this.uploadHooks.length; d < e; d++)
                if (this.uploadHooks[d](this.renderer, b)) {
                  this.numLeft--, this.queue.shift(), c = !0;
                  break
                }
              c || this.queue.shift()
            }
            if (this.queue.length) this.numLeft = a.UPLOADS_PER_FRAME;
            else {
              this.ticking = !1, l.remove(this.tick, this);
              var f = this.completes.slice(0);
              this.completes.length = 0;
              for (var g = 0, h = f.length; g < h; g++) f[g]()
            }
          }, a.prototype.register = function(a, b) {
            return a && this.addHooks.push(a), b && this.uploadHooks.push(b), this
          }, a.prototype.add = function(a) {
            for (var b = 0, c = this.addHooks.length; b < c && !this.addHooks[b](a, this.queue); b++);
            if (a instanceof k.Container)
              for (var d = a.children.length - 1; d >= 0; d--) this.add(a.children[d]);
            return this
          }, a.prototype.destroy = function() {
            this.ticking && l.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null
          }, a
        }();
      c.default = n, n.UPLOADS_PER_FRAME = m, k.WebGLRenderer.registerPlugin("prepare", n)
    }, {
      "../../core": 62
    }],
    173: [function(a, b, c) {
      (function(b) {
        "use strict";

        function d(a) {
          if (a && a.__esModule) return a;
          var b = {};
          if (null != a)
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
          return b.default = a, b
        }
        c.__esModule = !0, c.loader = c.prepare = c.particles = c.mesh = c.loaders = c.interaction = c.filters = c.extras = c.extract = c.accessibility = void 0;
        var e = a("./deprecation");
        Object.keys(e).forEach(function(a) {
          "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, {
            enumerable: !0,
            get: function() {
              return e[a]
            }
          })
        });
        var f = a("./core");
        Object.keys(f).forEach(function(a) {
          "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, {
            enumerable: !0,
            get: function() {
              return f[a]
            }
          })
        }), a("./polyfill");
        var g = a("./accessibility"),
          h = d(g),
          i = a("./extract"),
          j = d(i),
          k = a("./extras"),
          l = d(k),
          m = a("./filters"),
          n = d(m),
          o = a("./interaction"),
          p = d(o),
          q = a("./loaders"),
          r = d(q),
          s = a("./mesh"),
          t = d(s),
          u = a("./particles"),
          v = d(u),
          w = a("./prepare"),
          x = d(w);
        c.accessibility = h, c.extract = j, c.extras = l, c.filters = n, c.interaction = p, c.loaders = r, c.mesh = t, c.particles = v, c.prepare = x;
        var y = new r.Loader;
        c.loader = y, b.PIXI = c
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
      "./accessibility": 41,
      "./core": 62,
      "./deprecation": 119,
      "./extract": 121,
      "./extras": 130,
      "./filters": 141,
      "./interaction": 147,
      "./loaders": 150,
      "./mesh": 159,
      "./particles": 162,
      "./polyfill": 168,
      "./prepare": 171
    }]
  }, {}, [173])(173)
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
        var d = function(a) {
            var b, c = [],
              d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c
          },
          e = function(a, b, c) {
            var d, e, f = a.cycle;
            for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
            delete a.cycle
          },
          f = function(a, b, d) {
            c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = f.prototype.render
          },
          g = 1e-10,
          h = c._internals,
          i = h.isSelector,
          j = h.isArray,
          k = f.prototype = c.to({}, .1, {}),
          l = [];
        f.version = "1.19.0", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function() {
          return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), c.prototype.invalidate.call(this)
        }, k.updateTo = function(a, b) {
          var d, e = this.ratio,
            f = this.vars.immediateRender || a.immediateRender;
          b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
          for (d in a) this.vars[d] = a[d];
          if (this._initted || f)
            if (b) this._initted = !1, f && this.render(0, !0, !0);
            else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
            var g = this._totalTime;
            this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
          } else if (this._initted = !1, this._init(), this._time > 0 || f)
            for (var h, i = 1 / (1 - e), j = this._firstPT; j;) h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next;
          return this
        }, k.render = function(a, b, c) {
          this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
          var d, e, f, i, j, k, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
            o = this._time,
            p = this._totalTime,
            q = this._cycle,
            r = this._duration,
            s = this._rawPrevTime;
          if (a >= n - 1e-7 ? (this._totalTime = n, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = r, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === r && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > s || 0 >= a && a >= -1e-7 || s === g && "isPause" !== this.data) && s !== a && (c = !0, s > g && (e = "onReverseComplete")), this._rawPrevTime = m = !b || a || s === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== p || 0 === r && s > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === r && (this._initted || !this.vars.lazy || c) && (s >= 0 && (c = !0), this._rawPrevTime = m = !b || a || s === a ? a : g)), this._initted || (c = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (i = r + this._repeatDelay, this._cycle = this._totalTime / i >> 0, 0 !== this._cycle && this._cycle === this._totalTime / i && a >= p && this._cycle--, this._time = this._totalTime - this._cycle * i, this._yoyo && 0 !== (1 & this._cycle) && (this._time = r - this._time), this._time > r ? this._time = r : this._time < 0 && (this._time = 0)), this._easeType ? (j = this._time / r, k = this._easeType, l = this._easePower, (1 === k || 3 === k && j >= .5) && (j = 1 - j), 3 === k && (j *= 2), 1 === l ? j *= j : 2 === l ? j *= j * j : 3 === l ? j *= j * j * j : 4 === l && (j *= j * j * j * j), 1 === k ? this.ratio = 1 - j : 2 === k ? this.ratio = j : this._time / r < .5 ? this.ratio = j / 2 : this.ratio = 1 - j / 2) : this.ratio = this._ease.getRatio(this._time / r)), o === this._time && !c && q === this._cycle) return void(p !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
          if (!this._initted) {
            if (this._init(), !this._initted || this._gc) return;
            if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = o, this._totalTime = p, this._rawPrevTime = s, this._cycle = q, h.lazyTweens.push(this), void(this._lazy = [a, b]);
            this._time && !d ? this.ratio = this._ease.getRatio(this._time / r) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
          }
          for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && a >= 0 && (this._active = !0), 0 === p && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === r) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
          this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c), b || (this._totalTime !== p || e) && this._callback("onUpdate")), this._cycle !== q && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === r && this._rawPrevTime === g && m !== g && (this._rawPrevTime = 0))
        }, f.to = function(a, b, c) {
          return new f(a, b, c)
        }, f.from = function(a, b, c) {
          return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
        }, f.fromTo = function(a, b, c, d) {
          return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d)
        }, f.staggerTo = f.allTo = function(a, b, g, h, k, m, n) {
          h = h || 0;
          var o, p, q, r, s = 0,
            t = [],
            u = function() {
              g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l)
            },
            v = g.cycle,
            w = g.startAt && g.startAt.cycle;
          for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++) {
            p = {};
            for (r in g) p[r] = g[r];
            if (v && (e(p, a, q), null != p.duration && (b = p.duration, delete p.duration)), w) {
              w = p.startAt = {};
              for (r in g.startAt) w[r] = g.startAt[r];
              e(p.startAt, a, q)
            }
            p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h
          }
          return t
        }, f.staggerFrom = f.allFrom = function(a, b, c, d, e, g, h) {
          return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h)
        }, f.staggerFromTo = f.allFromTo = function(a, b, c, d, e, g, h, i) {
          return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
        }, f.delayedCall = function(a, b, c, d, e) {
          return new f(b, 0, {
            delay: a,
            onComplete: b,
            onCompleteParams: c,
            callbackScope: d,
            onReverseComplete: b,
            onReverseCompleteParams: c,
            immediateRender: !1,
            useFrames: e,
            overwrite: 0
          })
        }, f.set = function(a, b) {
          return new f(a, 0, b)
        }, f.isTweening = function(a) {
          return c.getTweensOf(a, !0).length > 0
        };
        var m = function(a, b) {
            for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
            return d
          },
          n = f.getAllTweens = function(b) {
            return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
          };
        f.killAll = function(a, c, d, e) {
          null == c && (c = !0), null == d && (d = !0);
          var f, g, h, i = n(0 != e),
            j = i.length,
            k = c && d && e;
          for (h = 0; j > h; h++) g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
        }, f.killChildTweensOf = function(a, b) {
          if (null != a) {
            var e, g, k, l, m, n = h.tweenLookup;
            if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a))
              for (l = a.length; --l > -1;) f.killChildTweensOf(a[l], b);
            else {
              e = [];
              for (k in n)
                for (g = n[k].target.parentNode; g;) g === a && (e = e.concat(n[k].tweens)), g = g.parentNode;
              for (m = e.length, l = 0; m > l; l++) b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1)
            }
          }
        };
        var o = function(a, c, d, e) {
          c = c !== !1, d = d !== !1, e = e !== !1;
          for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;) g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
        };
        return f.pauseAll = function(a, b, c) {
          o(!0, a, b, c)
        }, f.resumeAll = function(a, b, c) {
          o(!1, a, b, c)
        }, f.globalTimeScale = function(b) {
          var d = a._rootTimeline,
            e = c.ticker.time;
          return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
        }, k.progress = function(a, b) {
          return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
        }, k.totalProgress = function(a, b) {
          return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
        }, k.time = function(a, b) {
          return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, k.duration = function(b) {
          return arguments.length ? a.prototype.duration.call(this, b) : this._duration
        }, k.totalDuration = function(a) {
          return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, k.repeat = function(a) {
          return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function(a) {
          return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function(a) {
          return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, f
      }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
        var d = function(a) {
            b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var c, d, e = this.vars;
            for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
            i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
          },
          e = 1e-10,
          f = c._internals,
          g = d._internals = {},
          h = f.isSelector,
          i = f.isArray,
          j = f.lazyTweens,
          k = f.lazyRender,
          l = _gsScope._gsDefine.globals,
          m = function(a) {
            var b, c = {};
            for (b in a) c[b] = a[b];
            return c
          },
          n = function(a, b, c) {
            var d, e, f = a.cycle;
            for (d in f) e = f[d], a[d] = "function" == typeof e ? e.call(b[c], c) : e[c % e.length];
            delete a.cycle
          },
          o = g.pauseCallback = function() {},
          p = function(a) {
            var b, c = [],
              d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c
          },
          q = d.prototype = new b;
        return d.version = "1.19.0", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function(a, b, d, e) {
          var f = d.repeat && l.TweenMax || c;
          return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
        }, q.from = function(a, b, d, e) {
          return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
        }, q.fromTo = function(a, b, d, e, f) {
          var g = e.repeat && l.TweenMax || c;
          return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
        }, q.staggerTo = function(a, b, e, f, g, i, j, k) {
          var l, o, q = new d({
              onComplete: i,
              onCompleteParams: j,
              callbackScope: k,
              smoothChildTiming: this.smoothChildTiming
            }),
            r = e.cycle;
          for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q.to(a[o], b, l, o * f);
          return this.add(q, g)
        }, q.staggerFrom = function(a, b, c, d, e, f, g, h) {
          return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
        }, q.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
          return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
        }, q.call = function(a, b, d, e) {
          return this.add(c.delayedCall(0, a, b, d), e)
        }, q.set = function(a, b, d) {
          return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
        }, d.exportRoot = function(a, b) {
          a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
          var e, f, g = new d(a),
            h = g._timeline;
          for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;) f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f;
          return h.add(g, 0), g
        }, q.add = function(e, f, g, h) {
          var j, k, l, m, n, o;
          if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
            if (e instanceof Array || e && e.push && i(e)) {
              for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(m = e[l]) && (m = new d({
                tweens: m
              })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
              return this._uncache(!0)
            }
            if ("string" == typeof e) return this.addLabel(e, f);
            if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
            e = c.delayedCall(0, e)
          }
          if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
            for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
          return this
        }, q.remove = function(b) {
          if (b instanceof a) {
            this._remove(b, !1);
            var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
            return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
          }
          if (b instanceof Array || b && b.push && i(b)) {
            for (var d = b.length; --d > -1;) this.remove(b[d]);
            return this
          }
          return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
        }, q._remove = function(a, c) {
          b.prototype._remove.call(this, a, c);
          var d = this._last;
          return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, q.append = function(a, b) {
          return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
        }, q.insert = q.insertMultiple = function(a, b, c, d) {
          return this.add(a, b || 0, c, d)
        }, q.appendMultiple = function(a, b, c, d) {
          return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
        }, q.addLabel = function(a, b) {
          return this._labels[a] = this._parseTimeOrLabel(b), this
        }, q.addPause = function(a, b, d, e) {
          var f = c.delayedCall(0, o, d, e || this);
          return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
        }, q.removeLabel = function(a) {
          return delete this._labels[a], this
        }, q.getLabelTime = function(a) {
          return null != this._labels[a] ? this._labels[a] : -1
        }, q._parseTimeOrLabel = function(b, c, d, e) {
          var f;
          if (e instanceof a && e.timeline === this) this.remove(e);
          else if (e && (e instanceof Array || e.push && i(e)))
            for (f = e.length; --f > -1;) e[f] instanceof a && e[f].timeline === this && this.remove(e[f]);
          if ("string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
          if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = this.duration());
          else {
            if (f = b.indexOf("="), -1 === f) return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
            c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
          }
          return Number(b) + c
        }, q.seek = function(a, b) {
          return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
        }, q.stop = function() {
          return this.paused(!0)
        }, q.gotoAndPlay = function(a, b) {
          return this.play(a, b)
        }, q.gotoAndStop = function(a, b) {
          return this.pause(a, b)
        }, q.render = function(a, b, c) {
          this._gc && this._enabled(!0, !1);
          var d, f, g, h, i, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
            o = this._time,
            p = this._startTime,
            q = this._timeScale,
            r = this._paused;
          if (a >= n - 1e-7) this._totalTime = this._time = n, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = n + 1e-4;
          else if (1e-7 > a)
            if (this._totalTime = this._time = 0, (0 !== o || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a;
            else {
              if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
                for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
              a = 0, this._initted || (i = !0)
            }
          else {
            if (this._hasPause && !this._forcingPlayhead && !b) {
              if (a >= o)
                for (d = this._first; d && d._startTime <= a && !l;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next;
              else
                for (d = this._last; d && d._startTime >= a && !l;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
              l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            this._totalTime = this._time = this._rawPrevTime = a
          }
          if (this._time !== o && this._first || c || i || l) {
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== o && a > 0 && (this._active = !0), 0 === o && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), m = this._time, m >= o)
              for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));)(d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
            else
              for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));) {
                if (d._active || d._startTime <= o && !d._paused && !d._gc) {
                  if (l === d) {
                    for (l = d._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
                    l = null, this.pause()
                  }
                  d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                }
                d = g
              }
            this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || n >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)))
          }
        }, q._hasPausedChild = function() {
          for (var a = this._first; a;) {
            if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
            a = a._next
          }
          return !1
        }, q.getChildren = function(a, b, d, e) {
          e = e || -9999999999;
          for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
          return f
        }, q.getTweensOf = function(a, b) {
          var d, e, f = this._gc,
            g = [],
            h = 0;
          for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
          return f && this._enabled(!1, !0), g
        }, q.recent = function() {
          return this._recent
        }, q._contains = function(a) {
          for (var b = a.timeline; b;) {
            if (b === this) return !0;
            b = b.timeline
          }
          return !1
        }, q.shiftChildren = function(a, b, c) {
          c = c || 0;
          for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
          if (b)
            for (d in f) f[d] >= c && (f[d] += a);
          return this._uncache(!0)
        }, q._kill = function(a, b) {
          if (!a && !b) return this._enabled(!1, !1);
          for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
          return e
        }, q.clear = function(a) {
          var b = this.getChildren(!1, !0, !0),
            c = b.length;
          for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
          return a !== !1 && (this._labels = {}), this._uncache(!0)
        }, q.invalidate = function() {
          for (var b = this._first; b;) b.invalidate(), b = b._next;
          return a.prototype.invalidate.call(this)
        }, q._enabled = function(a, c) {
          if (a === this._gc)
            for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
          return b.prototype._enabled.call(this, a, c)
        }, q.totalTime = function(b, c, d) {
          this._forcingPlayhead = !0;
          var e = a.prototype.totalTime.apply(this, arguments);
          return this._forcingPlayhead = !1, e
        }, q.duration = function(a) {
          return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
        }, q.totalDuration = function(a) {
          if (!arguments.length) {
            if (this._dirty) {
              for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
              this._duration = this._totalDuration = d, this._dirty = !1
            }
            return this._totalDuration
          }
          return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
        }, q.paused = function(b) {
          if (!b)
            for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
          return a.prototype.paused.apply(this, arguments)
        }, q.usesFrames = function() {
          for (var b = this._timeline; b._timeline;) b = b._timeline;
          return b === a._rootFramesTimeline
        }, q.rawTime = function() {
          return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, d
      }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(a, b, c) {
        var d = function(b) {
            a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
          },
          e = 1e-10,
          f = b._internals,
          g = f.lazyTweens,
          h = f.lazyRender,
          i = _gsScope._gsDefine.globals,
          j = new c(null, null, 1, 0),
          k = d.prototype = new a;
        return k.constructor = d, k.kill()._gc = !1, d.version = "1.19.0", k.invalidate = function() {
          return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
        }, k.addCallback = function(a, c, d, e) {
          return this.add(b.delayedCall(0, a, d, e), c)
        }, k.removeCallback = function(a, b) {
          if (a)
            if (null == b) this._kill(null, a);
            else
              for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
          return this
        }, k.removePause = function(b) {
          return this.removeCallback(a._internals.pauseCallback, b)
        }, k.tweenTo = function(a, c) {
          c = c || {};
          var d, e, f, g = {
              ease: j,
              useFrames: this.usesFrames(),
              immediateRender: !1
            },
            h = c.repeat && i.TweenMax || b;
          for (e in c) g[e] = c[e];
          return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new h(this, d, g), g.onStart = function() {
            f.target.paused(!0), f.vars.time !== f.target.time() && d === f.duration() && f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale), c.onStart && f._callback("onStart")
          }, f
        }, k.tweenFromTo = function(a, b, c) {
          c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
            onComplete: this.seek,
            onCompleteParams: [a],
            callbackScope: this
          }, c.immediateRender = c.immediateRender !== !1;
          var d = this.tweenTo(b, c);
          return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
        }, k.render = function(a, b, c) {
          this._gc && this._enabled(!0, !1);
          var d, f, i, j, k, l, m, n, o = this._dirty ? this.totalDuration() : this._totalDuration,
            p = this._duration,
            q = this._time,
            r = this._totalTime,
            s = this._startTime,
            t = this._timeScale,
            u = this._rawPrevTime,
            v = this._paused,
            w = this._cycle;
          if (a >= o - 1e-7) this._locked || (this._totalTime = o, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = p, a = p + 1e-4);
          else if (1e-7 > a)
            if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== q || 0 === p && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a;
            else {
              if (this._rawPrevTime = p || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
                for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
              a = 0, this._initted || (k = !0)
            }
          else if (0 === p && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = p + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, a = p + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b) {
            if (a = this._time, a >= q)
              for (d = this._first; d && d._startTime <= a && !m;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next;
            else
              for (d = this._last; d && d._startTime >= a && !m;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
            m && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
          }
          if (this._cycle !== w && !this._locked) {
            var x = this._yoyo && 0 !== (1 & w),
              y = x === (this._yoyo && 0 !== (1 & this._cycle)),
              z = this._totalTime,
              A = this._cycle,
              B = this._rawPrevTime,
              C = this._time;
            if (this._totalTime = w * p, this._cycle < w ? x = !x : this._totalTime += p, this._time = q, this._rawPrevTime = 0 === p ? u - 1e-4 : u, this._cycle = w, this._locked = !0, q = x ? 0 : p, this.render(q, b, 0 === p), b || this._gc || this.vars.onRepeat && this._callback("onRepeat"), q !== this._time) return;
            if (y && (q = x ? p + 1e-4 : -1e-4, this.render(q, !0, !1)), this._locked = !1, this._paused && !v) return;
            this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
          }
          if (!(this._time !== q && this._first || c || k || m)) return void(r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
          if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && (0 === this._totalTime && this._totalDuration || b || this._callback("onStart")), n = this._time, n >= q)
            for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i;
          else
            for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));) {
              if (d._active || d._startTime <= q && !d._paused && !d._gc) {
                if (m === d) {
                  for (m = d._prev; m && m.endTime() > this._time;) m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev;
                  m = null, this.pause()
                }
                d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
              }
              d = i
            }
          this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j)))
        }, k.getActive = function(a, b, c) {
          null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
          var d, e, f = [],
            g = this.getChildren(a, b, c),
            h = 0,
            i = g.length;
          for (d = 0; i > d; d++) e = g[d], e.isActive() && (f[h++] = e);
          return f
        }, k.getLabelAfter = function(a) {
          a || 0 !== a && (a = this._time);
          var b, c = this.getLabelsArray(),
            d = c.length;
          for (b = 0; d > b; b++)
            if (c[b].time > a) return c[b].name;
          return null
        }, k.getLabelBefore = function(a) {
          null == a && (a = this._time);
          for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
            if (b[c].time < a) return b[c].name;
          return null
        }, k.getLabelsArray = function() {
          var a, b = [],
            c = 0;
          for (a in this._labels) b[c++] = {
            time: this._labels[a],
            name: a
          };
          return b.sort(function(a, b) {
            return a.time - b.time
          }), b
        }, k.progress = function(a, b) {
          return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
        }, k.totalProgress = function(a, b) {
          return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
        }, k.totalDuration = function(b) {
          return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, k.time = function(a, b) {
          return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, k.repeat = function(a) {
          return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function(a) {
          return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function(a) {
          return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, k.currentLabel = function(a) {
          return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
        }, d
      }, !0),
      function() {
        var a = 180 / Math.PI,
          b = [],
          c = [],
          d = [],
          e = {},
          f = _gsScope._gsDefine.globals,
          g = function(a, b, c, d) {
            c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
          },
          h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
          i = function(a, b, c, d) {
            var e = {
                a: a
              },
              f = {},
              g = {},
              h = {
                c: d
              },
              i = (a + b) / 2,
              j = (b + c) / 2,
              k = (c + d) / 2,
              l = (i + j) / 2,
              m = (j + k) / 2,
              n = (m - l) / 8;
            return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
          },
          j = function(a, e, f, g, h) {
            var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1,
              x = 0,
              y = a[0].a;
            for (j = 0; w > j; j++) n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
            n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
          },
          k = function(a, d, e, f) {
            var h, i, j, k, l, m, n = [];
            if (f)
              for (a = [f].concat(a), i = a.length; --i > -1;) "string" == typeof(m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
            if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[-1 > h ? 0 : 1][d]), n;
            for (i = 0; h > i; i++) j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
            return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
          },
          l = function(a, f, g, i, l, m) {
            var n, o, p, q, r, s, t, u, v = {},
              w = [],
              x = m || a[0];
            l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
            for (o in a[0]) w.push(o);
            if (a.length > 1) {
              for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)
                if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
                  t = !1;
                  break
                }
              t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
            }
            for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
            for (n = b.length; --n > -1;) b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
            if (!i) {
              for (n = w.length; --n > -1;)
                if (e[o])
                  for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) r = p[q + 1].da / c[q] + p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r;
              for (n = d.length; --n > -1;) d[n] = Math.sqrt(d[n])
            }
            for (n = w.length, q = g ? 4 : 1; --n > -1;) o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
            return v
          },
          m = function(a, b, c) {
            b = b || "soft";
            var d, e, f, h, i, j, k, l, m, n, o, p = {},
              q = "cubic" === b ? 3 : 2,
              r = "soft" === b,
              s = [];
            if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1) throw "invalid Bezier data";
            for (m in a[0]) s.push(m);
            for (j = s.length; --j > -1;) {
              for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) d = null == c ? a[k][m] : "string" == typeof(o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
              for (l = n - q + 1, n = 0, k = 0; l > k; k += q) d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
              i.length = n
            }
            return p
          },
          n = function(a, b, c) {
            for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
              for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++) j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
          },
          o = function(a, b) {
            b = b >> 0 || 6;
            var c, d, e, f, g = [],
              h = [],
              i = 0,
              j = 0,
              k = b - 1,
              l = [],
              m = [];
            for (c in a) n(a[c], g, b);
            for (e = g.length, d = 0; e > d; d++) i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
            return {
              length: j,
              lengths: h,
              segments: l
            }
          },
          p = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.7",
            API: 2,
            global: !0,
            init: function(a, b, c) {
              this._target = a, b instanceof Array && (b = {
                values: b
              }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
              var d, e, f, g, h, i = b.values || [],
                j = {},
                k = i[0],
                n = b.autoRotate || c.vars.orientToBezier;
              this._autoRotate = n ? n instanceof Array ? n : [
                ["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]
              ] : null;
              for (d in k) this._props.push(d);
              for (f = this._props.length; --f > -1;) d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
              if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
                var p = o(this._beziers, this._timeRes);
                this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
              }
              if (n = this._autoRotate)
                for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
                  for (g = 0; 3 > g; g++) d = n[f][g], this._func[d] = "function" == typeof a[d] && a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)];
                  d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0, this._overwriteProps.push(d)
                }
              return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
            },
            set: function(b) {
              var c, d, e, f, g, h, i, j, k, l, m = this._segCount,
                n = this._func,
                o = this._target,
                p = b !== this._startRatio;
              if (this._timeRes) {
                if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
                  for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;);
                  this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0]
                } else if (b < this._l1 && e > 0) {
                  for (; e > 0 && (this._l1 = k[--e]) >= b;);
                  0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
                }
                if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
                  for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;);
                  this._s1 = l[e - 1], this._si = e
                } else if (b < this._s1 && e > 0) {
                  for (; e > 0 && (this._s1 = l[--e]) >= b;);
                  0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e
                }
                h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
              } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
              for (d = 1 - h, e = this._props.length; --e > -1;) f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i;
              if (this._autoRotate) {
                var q, r, s, t, u, v, w, x = this._autoRotate;
                for (e = x.length; --e > -1;) f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i)
              }
            }
          }),
          q = p.prototype;
        p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function(a, b, c) {
          return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
        }, p._cssRegister = function() {
          var a = f.CSSPlugin;
          if (a) {
            var b = a._internals,
              c = b._parseToProxy,
              d = b._setPluginRatio,
              e = b.CSSPropTween;
            b._registerComplexSpecialProp("bezier", {
              parser: function(a, b, f, g, h, i) {
                b instanceof Array && (b = {
                  values: b
                }), i = new p;
                var j, k, l, m = b.values,
                  n = m.length - 1,
                  o = [],
                  q = {};
                if (0 > n) return h;
                for (j = 0; n >= j; j++) l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
                for (k in b) q[k] = b[k];
                return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [
                  ["left", "top", "rotation", j, !1]
                ] : null != l.end.x && [
                  ["x", "y", "rotation", j, !1]
                ]), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(l.proxy, q, g._tween), h
              }
            })
          }
        }, q._mod = function(a) {
          for (var b, c = this._overwriteProps, d = c.length; --d > -1;) b = a[c[d]], b && "function" == typeof b && (this._mod[c[d]] = b)
        }, q._kill = function(a) {
          var b, c, d = this._props;
          for (b in this._beziers)
            if (b in a)
              for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) d[c] === b && d.splice(c, 1);
          if (d = this._autoRotate)
            for (c = d.length; --c > -1;) a[d[c][2]] && d.splice(c, 1);
          return this._super._kill.call(this, a)
        }
      }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
        var c, d, e, f, g = function() {
            a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
          },
          h = _gsScope._gsDefine.globals,
          i = {},
          j = g.prototype = new a("css");
        j.constructor = g, g.version = "1.19.0", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
          top: j,
          right: j,
          bottom: j,
          left: j,
          width: j,
          height: j,
          fontSize: j,
          padding: j,
          margin: j,
          perspective: j,
          lineHeight: ""
        };
        var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
          t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
          w = /(?:\d|\-|\+|=|#|\.)*/g,
          x = /opacity *= *([^)]*)/i,
          y = /opacity:([^;]*)/i,
          z = /alpha\(opacity *=.+?\)/i,
          A = /^(rgb|hsl)/,
          B = /([A-Z])/g,
          C = /-([a-z])/gi,
          D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          E = function(a, b) {
            return b.toUpperCase()
          },
          F = /(?:Left|Right|Width)/i,
          G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          I = /,(?=[^\)]*(?:\(|$))/gi,
          J = /[\s,\(]/i,
          K = Math.PI / 180,
          L = 180 / Math.PI,
          M = {},
          N = document,
          O = function(a) {
            return N.createElementNS ? N.createElementNS("http://www.w3.org/1999/xhtml", a) : N.createElement(a)
          },
          P = O("div"),
          Q = O("img"),
          R = g._internals = {
            _specialProps: i
          },
          S = navigator.userAgent,
          T = function() {
            var a = S.indexOf("Android"),
              b = O("a");
            return m = -1 !== S.indexOf("Safari") && -1 === S.indexOf("Chrome") && (-1 === a || Number(S.substr(a + 8, 1)) > 3), o = m && Number(S.substr(S.indexOf("Version/") + 8, 1)) < 6, n = -1 !== S.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(S) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(S)) && (p = parseFloat(RegExp.$1)), !!b && (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity))
          }(),
          U = function(a) {
            return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
          },
          V = function(a) {
            window.console && console.log(a)
          },
          W = "",
          X = "",
          Y = function(a, b) {
            b = b || P;
            var c, d, e = b.style;
            if (void 0 !== e[a]) return a;
            for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
            return d >= 0 ? (X = 3 === d ? "ms" : c[d], W = "-" + X.toLowerCase() + "-", X + a) : null
          },
          Z = N.defaultView ? N.defaultView.getComputedStyle : function() {},
          $ = g.getStyle = function(a, b, c, d, e) {
            var f;
            return T || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || Z(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : U(a)
          },
          _ = R.convertToPixels = function(a, c, d, e, f) {
            if ("px" === e || !e) return d;
            if ("auto" === e || !d) return 0;
            var h, i, j, k = F.test(c),
              l = a,
              m = P.style,
              n = 0 > d,
              o = 1 === d;
            if (n && (d = -d), o && (d *= 100), "%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);
            else {
              if (m.cssText = "border:0 solid red;position:" + $(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
              else {
                if (l = a.parentNode || N.body, i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
                m[k ? "width" : "height"] = d + e
              }
              l.appendChild(P), h = parseFloat(P[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(P), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = _(a, c, d, e, !0))
            }
            return o && (h /= 100), n ? -h : h
          },
          aa = R.calculateOffset = function(a, b, c) {
            if ("absolute" !== $(a, "position", c)) return 0;
            var d = "left" === b ? "Left" : "Top",
              e = $(a, "margin" + d, c);
            return a["offset" + d] - (_(a, b, parseFloat(e), e.replace(w, "")) || 0)
          },
          ba = function(a, b) {
            var c, d, e, f = {};
            if (b = b || Z(a, null))
              if (c = b.length)
                for (; --c > -1;) e = b[c], (-1 === e.indexOf("-transform") || Ca === e) && (f[e.replace(C, E)] = b.getPropertyValue(e));
              else
                for (c in b)(-1 === c.indexOf("Transform") || Ba === c) && (f[c] = b[c]);
            else if (b = a.currentStyle || a.style)
              for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
            return T || (f.opacity = U(a)), d = Pa(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Ea && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
          },
          ca = function(a, b, c, d, e) {
            var f, g, h, i = {},
              j = a.style;
            for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : aa(a, g), void 0 !== j[g] && (h = new ra(j, g, j[g], h)));
            if (d)
              for (g in d) "className" !== g && (i[g] = d[g]);
            return {
              difs: i,
              firstMPT: h
            }
          },
          da = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
          },
          ea = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          fa = function(a, b, c) {
            if ("svg" === (a.nodeName + "").toLowerCase()) return (c || Z(a))[b] || 0;
            if (a.getBBox && Ma(a)) return a.getBBox()[b] || 0;
            var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
              e = da[b],
              f = e.length;
            for (c = c || Z(a, null); --f > -1;) d -= parseFloat($(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat($(a, "border" + e[f] + "Width", c, !0)) || 0;
            return d
          },
          ga = function(a, b) {
            if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
            (null == a || "" === a) && (a = "0 0");
            var c, d = a.split(" "),
              e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
              f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
            if (d.length > 3 && !b) {
              for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) a.push(ga(d[c]));
              return a.join(",")
            }
            return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a
          },
          ha = function(a, b) {
            return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
          },
          ia = function(a, b) {
            return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
          },
          ja = function(a, b, c, d) {
            var e, f, g, h, i, j = 1e-6;
            return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
          },
          ka = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
          },
          la = function(a, b, c) {
            return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
          },
          ma = g.parseColor = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m;
            if (a)
              if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];
              else {
                if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), ka[a]) c = ka[a];
                else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];
                else if ("hsl" === a.substr(0, 3))
                  if (c = m = a.match(s), b) {
                    if (-1 !== a.indexOf("=")) return a.match(t)
                  } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = la(g + 1 / 3, d, e), c[1] = la(g, d, e), c[2] = la(g - 1 / 3, d, e);
                else c = a.match(s) || ka.transparent;
                c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
              }
            else c = ka.black;
            return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
          },
          na = function(a, b) {
            var c, d, e, f = a.match(oa) || [],
              g = 0,
              h = f.length ? "" : a;
            for (c = 0; c < f.length; c++) d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = ma(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
            return h + a.substr(g)
          },
          oa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (j in ka) oa += "|" + j + "\\b";
        oa = new RegExp(oa + ")", "gi"), g.colorStringFilter = function(a) {
          var b, c = a[0] + a[1];
          oa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = na(a[0], b), a[1] = na(a[1], b)), oa.lastIndex = 0
        }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
        var pa = function(a, b, c, d) {
            if (null == a) return function(a) {
              return a
            };
            var e, f = b ? (a.match(oa) || [""])[0] : "",
              g = a.split(f).join("").match(u) || [],
              h = a.substr(0, a.indexOf(g[0])),
              i = ")" === a.charAt(a.length - 1) ? ")" : "",
              j = -1 !== a.indexOf(" ") ? " " : ",",
              k = g.length,
              l = k > 0 ? g[0].replace(s, "") : "";
            return k ? e = b ? function(a) {
              var b, m, n, o;
              if ("number" == typeof a) a += l;
              else if (d && I.test(a)) {
                for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++) o[n] = e(o[n]);
                return o.join(",")
              }
              if (b = (a.match(oa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--)
                for (; ++n < k;) m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
              return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
            } : function(a) {
              var b, f, m;
              if ("number" == typeof a) a += l;
              else if (d && I.test(a)) {
                for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++) f[m] = e(f[m]);
                return f.join(",")
              }
              if (b = a.match(u) || [], m = b.length, k > m--)
                for (; ++m < k;) b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
              return h + b.join(j) + i
            } : function(a) {
              return a
            }
          },
          qa = function(a) {
            return a = a.split(","),
              function(b, c, d, e, f, g, h) {
                var i, j = (c + "").split(" ");
                for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                return e.parse(b, h, f, g)
              }
          },
          ra = (R._setPluginRatio = function(a) {
            this.plugin.setRatio(a);
            for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
            if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod(h.rotation, this.t) : h.rotation), 1 === a || 0 === a)
              for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
                if (c = i.t, c.type) {
                  if (1 === c.type) {
                    for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) e += c["xn" + d] + c["xs" + (d + 1)];
                    c[f] = e
                  }
                } else c[f] = c.s + c.xs0;
                i = i._next
              }
          }, function(a, b, c, d, e) {
            this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
          }),
          sa = (R._parseToProxy = function(a, b, c, d, e, f) {
            var g, h, i, j, k, l = d,
              m = {},
              n = {},
              o = c._transform,
              p = M;
            for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
              if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new ra(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
                for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new ra(d, i, h, j, d.rxp[i]));
              d = d._next
            }
            return {
              proxy: m,
              end: n,
              firstMPT: j,
              pt: k
            }
          }, R.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
            this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof sa || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
          }),
          ta = function(a, b, c, d, e, f) {
            var g = new sa(a, b, c, d - c, e, -1, f);
            return g.b = c, g.e = g.xs0 = d, g
          },
          ua = g.parseComplex = function(a, b, c, d, e, f, h, i, j, l) {
            c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new sa(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && oa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
            var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "),
              E = d.split(", ").join(",").split(" "),
              F = D.length,
              G = k !== !1;
            for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" "), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, oa.lastIndex = 0, m = 0; F > m; m++)
              if (p = D[m], u = E[m], x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ha(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px"), !0);
              else if (e && oa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && T, p = ma(p, C), u = ma(u, C), y = p.length + u.length > 6, y && !T && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (T || (y = !1), C ? h.appendXtra(y ? "hsla(" : "hsl(", p[0], ha(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ha(u[1], p[1]), "%,", !1).appendXtra("", p[2], ha(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(y ? "rgba(" : "rgb(", p[0], u[0] - p[0], ",", !0, !0).appendXtra("", p[1], u[1] - p[1], ",", !0).appendXtra("", p[2], u[2] - p[2], y ? "," : B, !0), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), oa.lastIndex = 0;
            else if (v = p.match(s)) {
              if (w = u.match(t), !w || w.length !== v.length) return h;
              for (o = 0, n = 0; n < v.length; n++) A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ha(w[n], A), "", G && "px" === p.substr(z + A.length, 2), 0 === n), o = z + A.length;
              h["xs" + h.l] += p.substr(o)
            } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
            if (-1 !== d.indexOf("=") && h.data) {
              for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) B += h["xs" + m] + h.data["xn" + m];
              h.e = B + h["xs" + m]
            }
            return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
          },
          va = 9;
        for (j = sa.prototype, j.l = j.pr = 0; --va > 0;) j["xn" + va] = 0, j["xs" + va] = "";
        j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function(a, b, c, d, e, f) {
          var g = this,
            h = g.l;
          return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new sa(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
            s: b + c
          }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
        };
        var wa = function(a, b) {
            b = b || {}, this.p = b.prefix ? Y(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || pa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
          },
          xa = R._registerComplexSpecialProp = function(a, b, c) {
            "object" != typeof b && (b = {
              parser: c
            });
            var d, e, f = a.split(","),
              g = b.defaultValue;
            for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new wa(f[d], b)
          },
          ya = R._registerPluginProp = function(a) {
            if (!i[a]) {
              var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
              xa(a, {
                parser: function(a, c, d, e, f, g, j) {
                  var k = h.com.greensock.plugins[b];
                  return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (V("Error: " + b + " js file not loaded."), f)
                }
              })
            }
          };
        j = wa.prototype, j.parseComplex = function(a, b, c, d, e, f) {
          var g, h, i, j, k, l, m = this.keyword;
          if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
            for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
            b = h.join(", "), c = i.join(", ")
          }
          return ua(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
        }, j.parse = function(a, b, c, d, f, g, h) {
          return this.parseComplex(a.style, this.format($(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
        }, g.registerSpecialProp = function(a, b, c) {
          xa(a, {
            parser: function(a, d, e, f, g, h, i) {
              var j = new sa(a, e, 0, 0, g, 2, e, !1, c);
              return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
            },
            priority: c
          })
        }, g.useSVGTransformAttr = m || n;
        var za, Aa = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
          Ba = Y("transform"),
          Ca = W + "transform",
          Da = Y("transformOrigin"),
          Ea = null !== Y("perspective"),
          Fa = R.Transform = function() {
            this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = !(g.defaultForce3D === !1 || !Ea) && (g.defaultForce3D || "auto")
          },
          Ga = window.SVGElement,
          Ha = function(a, b, c) {
            var d, e = N.createElementNS("http://www.w3.org/2000/svg", a),
              f = /([a-z])([A-Z])/g;
            for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
            return b.appendChild(e), e
          },
          Ia = N.documentElement,
          Ja = function() {
            var a, b, c, d = p || /Android/i.test(S) && !window.chrome;
            return N.createElementNS && !d && (a = Ha("svg", Ia), b = Ha("rect", a, {
              width: 100,
              height: 50,
              x: 100
            }), c = b.getBoundingClientRect().width, b.style[Da] = "50% 50%", b.style[Ba] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Ea), Ia.removeChild(a)), d
          }(),
          Ka = function(a, b, c, d, e, f) {
            var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform,
              w = Oa(a, !0);
            v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), b = ga(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Na && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "))
          },
          La = function(a) {
            try {
              return a.getBBox()
            } catch (a) {}
          },
          Ma = function(a) {
            return !!(Ga && a.getBBox && a.getCTM && La(a) && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM))
          },
          Na = [1, 0, 0, 1, 0, 0],
          Oa = function(a, b) {
            var c, d, e, f, g, h, i = a._gsTransform || new Fa,
              j = 1e5,
              k = a.style;
            if (Ba ? d = $(a, Ca, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, c && Ba && ((h = "none" === Z(a).display) || !a.parentNode) && (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ia.appendChild(a)), d = $(a, Ca, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Ta(k, "display"), g && Ia.removeChild(a)), (i.svg || a.getBBox && Ma(a)) && (c && -1 !== (k[Ba] + "").indexOf("matrix") && (d = k[Ba], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return Na;
            for (e = (d || "").match(s) || [], va = e.length; --va > -1;) f = Number(e[va]), e[va] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
            return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
          },
          Pa = R.getTransform = function(a, c, d, e) {
            if (a._gsTransform && d && !e) return a._gsTransform;
            var f, h, i, j, k, l, m = d ? a._gsTransform || new Fa : new Fa,
              n = m.scaleX < 0,
              o = 2e-5,
              p = 1e5,
              q = Ea ? parseFloat($(a, Da, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
              r = parseFloat(g.defaultTransformPerspective) || 0;
            if (m.svg = !(!a.getBBox || !Ma(a)), m.svg && (Ka(a, $(a, Da, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), za = g.useSVGTransformAttr || Ja), f = Oa(a), f !== Na) {
              if (16 === f.length) {
                var s, t, u, v, w, x = f[0],
                  y = f[1],
                  z = f[2],
                  A = f[3],
                  B = f[4],
                  C = f[5],
                  D = f[6],
                  E = f[7],
                  F = f[8],
                  G = f[9],
                  H = f[10],
                  I = f[12],
                  J = f[13],
                  K = f[14],
                  M = f[11],
                  N = Math.atan2(D, H);
                m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), x = x * v + B * w, t = y * v + C * w, C = y * -w + C * v, D = z * -w + D * v, y = t), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), m.scaleX = (Math.sqrt(x * x + y * y) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + G * G) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(D * D + H * H) * p + .5 | 0) / p, m.rotationX || m.rotationY ? m.skewX = 0 : (m.skewX = B || C ? Math.atan2(B, C) * L + m.rotation : m.skewX || 0, Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180))), m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C))
              } else if (!Ea || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
                var O = f.length >= 6,
                  P = O ? f[0] : 1,
                  Q = f[1] || 0,
                  R = f[2] || 0,
                  S = O ? f[3] : 1;
                m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, Math.abs(l) > 90 && Math.abs(l) < 270 && (n ? (i *= -1, l += 0 >= k ? 180 : -180, k += 0 >= k ? 180 : -180) : (j *= -1, l += 0 >= l ? 180 : -180)), m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Ea && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S))
              }
              m.zOrigin = q;
              for (h in m) m[h] < o && m[h] > -o && (m[h] = 0)
            }
            return d && (a._gsTransform = m, m.svg && (za && a.style[Ba] ? b.delayedCall(.001, function() {
              Ta(a.style, Ba)
            }) : !za && a.getAttribute("transform") && b.delayedCall(.001, function() {
              a.removeAttribute("transform")
            }))), m
          },
          Qa = function(a) {
            var b, c, d = this.data,
              e = -d.rotation * K,
              f = e + d.skewX * K,
              g = 1e5,
              h = (Math.cos(e) * d.scaleX * g | 0) / g,
              i = (Math.sin(e) * d.scaleX * g | 0) / g,
              j = (Math.sin(f) * -d.scaleY * g | 0) / g,
              k = (Math.cos(f) * d.scaleY * g | 0) / g,
              l = this.t.style,
              m = this.t.currentStyle;
            if (m) {
              c = i, i = -j, j = -c, b = m.filter, l.filter = "";
              var n, o, q = this.t.offsetWidth,
                r = this.t.offsetHeight,
                s = "absolute" !== m.position,
                t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                u = d.x + q * d.xPercent / 100,
                v = d.y + r * d.yPercent / 100;
              if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                var y, z, A, B = 8 > p ? 1 : -1;
                for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), va = 0; 4 > va; va++) z = ea[va], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : _(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > va ? -d.ieOffsetX : -d.ieOffsetY : 2 > va ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === va || 2 === va ? 1 : B))) + "px"
              }
            }
          },
          Ra = R.set3DTransformRatio = R.setTransformRatio = function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data,
              A = this.t.style,
              B = z.rotation,
              C = z.rotationX,
              D = z.rotationY,
              E = z.scaleX,
              F = z.scaleY,
              G = z.scaleZ,
              H = z.x,
              I = z.y,
              J = z.z,
              L = z.svg,
              M = z.perspective,
              N = z.force3D;
            if (((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || za && L || !Ea) return void(B || z.skewX || L ? (B *= K, x = z.skewX * K, y = 1e5, b = Math.cos(B) * E, e = Math.sin(B) * E, c = Math.sin(B - x) * -F, f = Math.cos(B - x) * F, x && "simple" === z.skewType && (s = Math.tan(x - z.skewY * K), s = Math.sqrt(1 + s * s), c *= s, f *= s, z.skewY && (s = Math.tan(z.skewY * K), s = Math.sqrt(1 + s * s), b *= s, e *= s)), L && (H += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, I += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset, za && (z.xPercent || z.yPercent) && (p = this.t.getBBox(), H += .01 * z.xPercent * p.width, I += .01 * z.yPercent * p.height), p = 1e-6, p > H && H > -p && (H = 0), p > I && I > -p && (I = 0)), u = (b * y | 0) / y + "," + (e * y | 0) / y + "," + (c * y | 0) / y + "," + (f * y | 0) / y + "," + H + "," + I + ")", L && za ? this.t.setAttribute("transform", "matrix(" + u) : A[Ba] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ba] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
            if (n && (p = 1e-4, p > E && E > -p && (E = G = 2e-5), p > F && F > -p && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || z.skewX) B *= K, q = b = Math.cos(B), r = e = Math.sin(B), z.skewX && (B -= z.skewX * K, q = Math.cos(B), r = Math.sin(B), "simple" === z.skewType && (s = Math.tan((z.skewX - z.skewY) * K), s = Math.sqrt(1 + s * s), q *= s, r *= s, z.skewY && (s = Math.tan(z.skewY * K), s = Math.sqrt(1 + s * s), b *= s, e *= s))), c = -r, f = q;
            else {
              if (!(D || C || 1 !== G || M || L)) return void(A[Ba] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
              b = f = 1, c = e = 0
            }
            j = 1, d = g = h = i = k = l = 0, m = M ? -1 / M : 0, o = z.zOrigin, p = 1e-6, v = ",", w = "0", B = D * K, B && (q = Math.cos(B), r = Math.sin(B), h = -r, k = m * -r, d = b * r, g = e * r, j = q, m *= q, b *= q, e *= q), B = C * K, B && (q = Math.cos(B), r = Math.sin(B), s = c * q + d * r, t = f * q + g * r, i = j * r, l = m * r, d = c * -r + d * q, g = f * -r + g * q, j *= q, m *= q, c = s, f = t), 1 !== G && (d *= G, g *= G, j *= G, m *= G), 1 !== F && (c *= F, f *= F, i *= F, l *= F), 1 !== E && (b *= E, e *= E, h *= E, k *= E), (o || L) && (o && (H += d * -o, I += g * -o, J += j * -o + o), L && (H += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, I += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset), p > H && H > -p && (H = w), p > I && I > -p && (I = w), p > J && J > -p && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (p > b && b > -p ? w : b) + v + (p > e && e > -p ? w : e) + v + (p > h && h > -p ? w : h), u += v + (p > k && k > -p ? w : k) + v + (p > c && c > -p ? w : c) + v + (p > f && f > -p ? w : f), C || D || 1 !== G ? (u += v + (p > i && i > -p ? w : i) + v + (p > l && l > -p ? w : l) + v + (p > d && d > -p ? w : d), u += v + (p > g && g > -p ? w : g) + v + (p > j && j > -p ? w : j) + v + (p > m && m > -p ? w : m) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ba] = u
          };
        j = Fa.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, xa("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
          parser: function(a, b, c, d, f, h, i) {
            if (d._lastParsedTransform === i) return f;
            d._lastParsedTransform = i;
            var j;
            "function" == typeof i[c] && (j = i[c], i[c] = b);
            var k, l, m, n, o, p, s, t, u, v = a._gsTransform,
              w = a.style,
              x = 1e-6,
              y = Aa.length,
              z = i,
              A = {},
              B = "transformOrigin",
              C = Pa(a, e, !0, z.parseTransform),
              D = z.transform && ("function" == typeof z.transform ? z.transform(r, q) : z.transform);
            if (d._transform = C, D && "string" == typeof D && Ba) l = P.style, l[Ba] = D, l.display = "block", l.position = "absolute", N.body.appendChild(P), k = Pa(P, null, !1), C.svg && (p = C.xOrigin, s = C.yOrigin, k.x -= C.xOffset, k.y -= C.yOffset, (z.transformOrigin || z.svgOrigin) && (D = {}, Ka(a, ga(z.transformOrigin), D, z.svgOrigin, z.smoothOrigin, !0), p = D.xOrigin, s = D.yOrigin, k.x -= D.xOffset - C.xOffset, k.y -= D.yOffset - C.yOffset), (p || s) && (t = Oa(P, !0), k.x -= p - (p * t[0] + s * t[2]), k.y -= s - (p * t[1] + s * t[3]))), N.body.removeChild(P), k.perspective || (k.perspective = C.perspective), null != z.xPercent && (k.xPercent = ia(z.xPercent, C.xPercent)), null != z.yPercent && (k.yPercent = ia(z.yPercent, C.yPercent));
            else if ("object" == typeof z) {
              if (k = {
                  scaleX: ia(null != z.scaleX ? z.scaleX : z.scale, C.scaleX),
                  scaleY: ia(null != z.scaleY ? z.scaleY : z.scale, C.scaleY),
                  scaleZ: ia(z.scaleZ, C.scaleZ),
                  x: ia(z.x, C.x),
                  y: ia(z.y, C.y),
                  z: ia(z.z, C.z),
                  xPercent: ia(z.xPercent, C.xPercent),
                  yPercent: ia(z.yPercent, C.yPercent),
                  perspective: ia(z.transformPerspective, C.perspective)
                }, o = z.directionalRotation, null != o)
                if ("object" == typeof o)
                  for (l in o) z[l] = o[l];
                else z.rotation = o;
                "string" == typeof z.x && -1 !== z.x.indexOf("%") && (k.x = 0, k.xPercent = ia(z.x, C.xPercent)), "string" == typeof z.y && -1 !== z.y.indexOf("%") && (k.y = 0, k.yPercent = ia(z.y, C.yPercent)), k.rotation = ja("rotation" in z ? z.rotation : "shortRotation" in z ? z.shortRotation + "_short" : "rotationZ" in z ? z.rotationZ : C.rotation - C.skewY, C.rotation - C.skewY, "rotation", A), Ea && (k.rotationX = ja("rotationX" in z ? z.rotationX : "shortRotationX" in z ? z.shortRotationX + "_short" : C.rotationX || 0, C.rotationX, "rotationX", A), k.rotationY = ja("rotationY" in z ? z.rotationY : "shortRotationY" in z ? z.shortRotationY + "_short" : C.rotationY || 0, C.rotationY, "rotationY", A)), k.skewX = ja(z.skewX, C.skewX - C.skewY), (k.skewY = ja(z.skewY, C.skewY)) && (k.skewX += k.skewY, k.rotation += k.skewY)
            }
            for (Ea && null != z.force3D && (C.force3D = z.force3D, n = !0), C.skewType = z.skewType || C.skewType || g.defaultSkewType, m = C.force3D || C.z || C.rotationX || C.rotationY || k.z || k.rotationX || k.rotationY || k.perspective, m || null == z.scale || (k.scaleZ = 1); --y > -1;) u = Aa[y], D = k[u] - C[u], (D > x || -x > D || null != z[u] || null != M[u]) && (n = !0, f = new sa(C, u, C[u], D, f), u in A && (f.e = A[u]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
            return D = z.transformOrigin, C.svg && (D || z.svgOrigin) && (p = C.xOffset, s = C.yOffset, Ka(a, ga(D), k, z.svgOrigin, z.smoothOrigin), f = ta(C, "xOrigin", (v ? C : k).xOrigin, k.xOrigin, f, B), f = ta(C, "yOrigin", (v ? C : k).yOrigin, k.yOrigin, f, B), (p !== C.xOffset || s !== C.yOffset) && (f = ta(C, "xOffset", v ? p : C.xOffset, C.xOffset, f, B), f = ta(C, "yOffset", v ? s : C.yOffset, C.yOffset, f, B)), D = za ? null : "0px 0px"), (D || Ea && m && C.zOrigin) && (Ba ? (n = !0, u = Da, D = (D || $(a, u, e, !1, "50% 50%")) + "", f = new sa(w, u, 0, 0, f, -1, B), f.b = w[u], f.plugin = h, Ea ? (l = C.zOrigin, D = D.split(" "), C.zOrigin = (D.length > 2 && (0 === l || "0px" !== D[2]) ? parseFloat(D[2]) : l) || 0, f.xs0 = f.e = D[0] + " " + (D[1] || "50%") + " 0px", f = new sa(C, "zOrigin", 0, 0, f, -1, f.n), f.b = l, f.xs0 = f.e = C.zOrigin) : f.xs0 = f.e = D) : ga(D + "", C)), n && (d._transformType = C.svg && za || !m && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), f
          },
          prefix: !0
        }), xa("boxShadow", {
          defaultValue: "0px 0px 0px 0px #999",
          prefix: !0,
          color: !0,
          multi: !0,
          keyword: "inset"
        }), xa("borderRadius", {
          defaultValue: "0px",
          parser: function(a, b, c, f, g, h) {
            b = this.format(b);
            var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
              z = a.style;
            for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++) this.p.indexOf("border") && (y[j] = Y(y[j])), m = l = $(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = _(a, "borderLeft", o, t), w = _(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = _(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = ua(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
            return g
          },
          prefix: !0,
          formatter: pa("0px 0px 0px 0px", !1, !0)
        }), xa("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
          defaultValue: "0px",
          parser: function(a, b, c, d, f, g) {
            return ua(a.style, c, this.format($(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f)
          },
          prefix: !0,
          formatter: pa("0px 0px", !1, !0)
        }), xa("backgroundPosition", {
          defaultValue: "0 0",
          parser: function(a, b, c, d, f, g) {
            var h, i, j, k, l, m, n = "background-position",
              o = e || Z(a, null),
              q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
              r = this.format(b);
            if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = $(a, "backgroundImage").replace(D, ""), m && "none" !== m)) {
              for (h = q.split(" "), i = r.split(" "), Q.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - Q.width : a.offsetHeight - Q.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
              q = h.join(" ")
            }
            return this.parseComplex(a.style, q, r, f, g)
          },
          formatter: ga
        }), xa("backgroundSize", {
          defaultValue: "0 0",
          formatter: function(a) {
            return a += "", ga(-1 === a.indexOf(" ") ? a + " " + a : a)
          }
        }), xa("perspective", {
          defaultValue: "0px",
          prefix: !0
        }), xa("perspectiveOrigin", {
          defaultValue: "50% 50%",
          prefix: !0
        }), xa("transformStyle", {
          prefix: !0
        }), xa("backfaceVisibility", {
          prefix: !0
        }), xa("userSelect", {
          prefix: !0
        }), xa("margin", {
          parser: qa("marginTop,marginRight,marginBottom,marginLeft")
        }), xa("padding", {
          parser: qa("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }), xa("clip", {
          defaultValue: "rect(0px,0px,0px,0px)",
          parser: function(a, b, c, d, f, g) {
            var h, i, j;
            return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format($(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
          }
        }), xa("textShadow", {
          defaultValue: "0px 0px 0px #999",
          color: !0,
          multi: !0
        }), xa("autoRound,strictUnits", {
          parser: function(a, b, c, d, e) {
            return e
          }
        }), xa("border", {
          defaultValue: "0px solid #000",
          parser: function(a, b, c, d, f, g) {
            var h = $(a, "borderTopWidth", e, !1, "0px"),
              i = this.format(b).split(" "),
              j = i[0].replace(w, "");
            return "px" !== j && (h = parseFloat(h) / _(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + $(a, "borderTopStyle", e, !1, "solid") + " " + $(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g)
          },
          color: !0,
          formatter: function(a) {
            var b = a.split(" ");
            return b[0] + " " + (b[1] || "solid") + " " + (a.match(oa) || ["#000"])[0]
          }
        }), xa("borderWidth", {
          parser: qa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }), xa("float,cssFloat,styleFloat", {
          parser: function(a, b, c, d, e, f) {
            var g = a.style,
              h = "cssFloat" in g ? "cssFloat" : "styleFloat";
            return new sa(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
          }
        });
        var Sa = function(a) {
          var b, c = this.t,
            d = c.filter || $(this.data, "filter") || "",
            e = this.s + this.c * a | 0;
          100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !$(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e))
        };
        xa("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function(a, b, c, d, f, g) {
            var h = parseFloat($(a, "opacity", e, !1, "1")),
              i = a.style,
              j = "autoAlpha" === c;
            return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === $(a, "visibility", e) && 0 !== b && (h = 0), T ? f = new sa(i, "opacity", h, b - h, f) : (f = new sa(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Sa), j && (f = new sa(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)),
              f
          }
        });
        var Ta = function(a, b) {
            b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b))
          },
          Ua = function(a) {
            if (this.t._gsClassPT = this, 1 === a || 0 === a) {
              this.t.setAttribute("class", 0 === a ? this.b : this.e);
              for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Ta(c, b.p), b = b._next;
              1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
          };
        xa("className", {
          parser: function(a, b, d, f, g, h, i) {
            var j, k, l, m, n, o = a.getAttribute("class") || "",
              p = a.style.cssText;
            if (g = f._classNamePT = new sa(a, d, 0, 0, g, 2), g.setRatio = Ua, g.pr = -11, c = !0, g.b = o, k = ba(a, e), l = a._gsClassPT) {
              for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
              l.setRatio(1)
            }
            return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = ca(a, k, ba(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
          }
        });
        var Va = function(a) {
          if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
            var b, c, d, e, f, g = this.t.style,
              h = i.transform.parse;
            if ("all" === this.e) g.cssText = "", e = !0;
            else
              for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Da : i[c].p), Ta(g, c);
            e && (Ta(g, Ba), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
          }
        };
        for (xa("clearProps", {
            parser: function(a, b, d, e, f) {
              return f = new sa(a, d, 0, 0, f, 2), f.setRatio = Va, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
            }
          }), j = "bezier,throwProps,physicsProps,physics2D".split(","), va = j.length; va--;) ya(j[va]);
        j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function(a, b, h, j) {
          if (!a.nodeType) return !1;
          this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = Z(a, ""), f = this._overwriteProps;
          var n, p, s, t, u, v, w, x, z, A = a.style;
          if (l && "" === A.zIndex && (n = $(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ba(a, e), A.cssText = t + ";" + b, n = ca(a, n, ba(a)).difs, !T && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
            for (z = 3 === this._transformType, Ba ? m && (l = !0, "" === A.zIndex && (w = $(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;) s = s._next;
            x = new sa(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ba ? Ra : Qa, x.data = this._transform || Pa(a, e, !0), x.tween = h, x.pr = -1, f.pop()
          }
          if (c) {
            for (; p;) {
              for (v = p._next, s = t; s && s.pr > p.pr;) s = s._next;
              (p._prev = s ? s._prev : u) ? p._prev._next = p: t = p, (p._next = s) ? s._prev = p : u = p, p = v
            }
            this._firstPT = t
          }
          return !0
        }, j.parse = function(a, b, c, f) {
          var g, h, j, l, m, n, o, p, s, t, u = a.style;
          for (g in b) n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = $(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = ma(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = ua(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = ua(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = fa(a, g, e), o = "px") : "left" === g || "top" === g ? (j = aa(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = _(a, g, j, o), "%" === p ? (j /= _(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= _(a, g, 1, p) : "px" !== p && (l = _(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new sa(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : V("invalid " + g + " tween value: " + b[g]) : (c = new sa(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))), f && c && !c.plugin && (c.plugin = f);
          return c
        }, j.setRatio = function(a) {
          var b, c, d, e = this._firstPT,
            f = 1e-6;
          if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
            if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
              for (; e;) {
                if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type)
                  if (1 === e.type)
                    if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                    else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                else {
                  for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                  e.t[e.p] = c
                } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                else e.t[e.p] = b + e.xs0;
                e = e._next
              } else
                for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
            else
              for (; e;) {
                if (2 !== e.type)
                  if (e.r && -1 !== e.type)
                    if (b = Math.round(e.s + e.c), e.type) {
                      if (1 === e.type) {
                        for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                        e.t[e.p] = c
                      }
                    } else e.t[e.p] = b + e.xs0;
                else e.t[e.p] = e.e;
                else e.setRatio(a);
                e = e._next
              }
        }, j._enableTransforms = function(a) {
          this._transform = this._transform || Pa(this._target, e, !0), this._transformType = this._transform.svg && za || !a && 3 !== this._transformType ? 2 : 3
        };
        var Wa = function(a) {
          this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        j._addLazySet = function(a, b, c) {
          var d = this._firstPT = new sa(a, b, 0, 0, this._firstPT, 2);
          d.e = c, d.setRatio = Wa, d.data = this
        }, j._linkCSSP = function(a, b, c, d) {
          return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
        }, j._mod = function(a) {
          for (var b = this._firstPT; b;) "function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1), b = b._next
        }, j._kill = function(b) {
          var c, d, e, f = b;
          if (b.autoAlpha || b.alpha) {
            f = {};
            for (d in b) f[d] = b[d];
            f.opacity = 1, f.autoAlpha && (f.visibility = 1)
          }
          for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;) c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next;
          return a.prototype._kill.call(this, f)
        };
        var Xa = function(a, b, c) {
          var d, e, f, g;
          if (a.slice)
            for (e = a.length; --e > -1;) Xa(a[e], b, c);
          else
            for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(ba(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Xa(f, b, c)
        };
        return g.cascadeTo = function(a, c, d) {
          var e, f, g, h, i = b.to(a, c, d),
            j = [i],
            k = [],
            l = [],
            m = [],
            n = b._internals.reservedProps;
          for (a = i._targets || i.target, Xa(a, k, m), i.render(c, !0, !0), Xa(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)
            if (f = ca(m[e], k[e], l[e]), f.firstMPT) {
              f = f.difs;
              for (g in d) n[g] && (f[g] = d[g]);
              h = {};
              for (g in f) h[g] = k[e][g];
              j.push(b.fromTo(m[e], c, h, f))
            }
          return j
        }, a.activate([g]), g
      }, !0),
      function() {
        var a = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.6.0",
            priority: -1,
            API: 2,
            init: function(a, b, c) {
              return this._tween = c, !0
            }
          }),
          b = function(a) {
            for (; a;) a.f || a.blob || (a.m = Math.round), a = a._next
          },
          c = a.prototype;
        c._onInitAllProps = function() {
          for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -1;) h[f[g]] = Math.round;
          for (g = f.length; --g > -1;)
            for (a = f[g], c = e._firstPT; c;) d = c._next, c.pg ? c.t._mod(h) : c.n === a && (2 === c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT = d), c._next = c._prev = null, e._propLookup[a] = i)), c = d;
          return !1
        }, c._add = function(a, b, c, d) {
          this._addTween(a, b, c, c + d, b, Math.round), this._overwriteProps.push(b)
        }
      }(),
      function() {
        _gsScope._gsDefine.plugin({
          propName: "attr",
          API: 2,
          version: "0.6.0",
          init: function(a, b, c, d) {
            var e, f;
            if ("function" != typeof a.setAttribute) return !1;
            for (e in b) f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this._overwriteProps.push(e);
            return !0
          }
        })
      }(), _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.0",
        API: 2,
        init: function(a, b, c, d) {
          "object" != typeof b && (b = {
            rotation: b
          }), this.finals = {};
          var e, f, g, h, i, j, k = b.useRadians === !0 ? 2 * Math.PI : 360,
            l = 1e-6;
          for (e in b) "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)), j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf("short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)), -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g + i, e), this._overwriteProps.push(e)));
          return !0
        },
        set: function(a) {
          var b;
          if (1 !== a) this._super.setRatio.call(this, a);
          else
            for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
        }
      })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(a) {
        var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope,
          f = e.com.greensock,
          g = 2 * Math.PI,
          h = Math.PI / 2,
          i = f._class,
          j = function(b, c) {
            var d = i("easing." + b, function() {}, !0),
              e = d.prototype = new a;
            return e.constructor = d, e.getRatio = c, d
          },
          k = a.register || function() {},
          l = function(a, b, c, d, e) {
            var f = i("easing." + a, {
              easeOut: new b,
              easeIn: new c,
              easeInOut: new d
            }, !0);
            return k(f, a), f
          },
          m = function(a, b, c) {
            this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
          },
          n = function(b, c) {
            var d = i("easing." + b, function(a) {
                this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
              }, !0),
              e = d.prototype = new a;
            return e.constructor = d, e.getRatio = c, e.config = function(a) {
              return new d(a)
            }, d
          },
          o = l("Back", n("BackOut", function(a) {
            return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
          }), n("BackIn", function(a) {
            return a * a * ((this._p1 + 1) * a - this._p1)
          }), n("BackInOut", function(a) {
            return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
          })),
          p = i("easing.SlowMo", function(a, b, c) {
            b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
          }, !0),
          q = p.prototype = new a;
        return q.constructor = p, q.getRatio = function(a) {
          var b = a + (.5 - a) * this._p;
          return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }, p.ease = new p(.7, .7), q.config = p.config = function(a, b, c) {
          return new p(a, b, c)
        }, b = i("easing.SteppedEase", function(a) {
          a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
        }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function(a) {
          return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
        }, q.config = b.config = function(a) {
          return new b(a)
        }, c = i("easing.RoughEase", function(b) {
          b = b || {};
          for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
            x: c,
            y: d
          };
          for (j.sort(function(a, b) {
              return a.x - b.x
            }), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
          this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
        }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function(a) {
          var b = this._prev;
          if (a > b.t) {
            for (; b.next && a >= b.t;) b = b.next;
            b = b.prev
          } else
            for (; b.prev && a <= b.t;) b = b.prev;
          return this._prev = b, b.v + (a - b.t) / b.gap * b.c
        }, q.config = function(a) {
          return new c(a)
        }, c.ease = new c, l("Bounce", j("BounceOut", function(a) {
          return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), j("BounceIn", function(a) {
          return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), j("BounceInOut", function(a) {
          var b = .5 > a;
          return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
        })), l("Circ", j("CircOut", function(a) {
          return Math.sqrt(1 - (a -= 1) * a)
        }), j("CircIn", function(a) {
          return -(Math.sqrt(1 - a * a) - 1)
        }), j("CircInOut", function(a) {
          return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })), d = function(b, c, d) {
          var e = i("easing." + b, function(a, b) {
              this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2
            }, !0),
            f = e.prototype = new a;
          return f.constructor = e, f.getRatio = c, f.config = function(a, b) {
            return new e(a, b)
          }, e
        }, l("Elastic", d("ElasticOut", function(a) {
          return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
        }, .3), d("ElasticIn", function(a) {
          return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
        }, .3), d("ElasticInOut", function(a) {
          return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
        }, .45)), l("Expo", j("ExpoOut", function(a) {
          return 1 - Math.pow(2, -10 * a)
        }), j("ExpoIn", function(a) {
          return Math.pow(2, 10 * (a - 1)) - .001
        }), j("ExpoInOut", function(a) {
          return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })), l("Sine", j("SineOut", function(a) {
          return Math.sin(a * h)
        }), j("SineIn", function(a) {
          return -Math.cos(a * h) + 1
        }), j("SineInOut", function(a) {
          return -.5 * (Math.cos(Math.PI * a) - 1)
        })), i("easing.EaseLookup", {
          find: function(b) {
            return a.map[b]
          }
        }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
      }, !0)
  }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  function(a, b) {
    "use strict";
    var c = {},
      d = a.GreenSockGlobals = a.GreenSockGlobals || a;
    if (!d.TweenLite) {
      var e, f, g, h, i, j = function(a) {
          var b, c = a.split("."),
            e = d;
          for (b = 0; b < c.length; b++) e[c[b]] = e = e[c[b]] || {};
          return e
        },
        k = j("com.greensock"),
        l = 1e-10,
        m = function(a) {
          var b, c = [],
            d = a.length;
          for (b = 0; b !== d; c.push(a[b++]));
          return c
        },
        n = function() {},
        o = function() {
          var a = Object.prototype.toString,
            b = a.call([]);
          return function(c) {
            return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
          }
        }(),
        p = {},
        q = function(e, f, g, h) {
          this.sc = p[e] ? p[e].sc : [], p[e] = this, this.gsClass = null, this.func = g;
          var i = [];
          this.check = function(k) {
            for (var l, m, n, o, r, s = f.length, t = s; --s > -1;)(l = p[f[s]] || new q(f[s], [])).gsClass ? (i[s] = l.gsClass, t--) : k && l.sc.push(this);
            if (0 === t && g) {
              if (m = ("com.greensock." + e).split("."), n = m.pop(), o = j(m.join("."))[n] = this.gsClass = g.apply(g, i), h)
                if (d[n] = c[n] = o, r = "undefined" != typeof module && module.exports, !r && "function" == typeof define && define.amd) define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + e.split(".").pop(), [], function() {
                  return o
                });
                else if (r)
                if (e === b) {
                  module.exports = c[b] = o;
                  for (s in c) o[s] = c[s]
                } else c[b] && (c[b][n] = o);
              for (s = 0; s < this.sc.length; s++) this.sc[s].check()
            }
          }, this.check(!0)
        },
        r = a._gsDefine = function(a, b, c, d) {
          return new q(a, b, c, d)
        },
        s = k._class = function(a, b, c) {
          return b = b || function() {}, r(a, [], function() {
            return b
          }, c), b
        };
      r.globals = d;
      var t = [0, 0, 1, 1],
        u = s("easing.Ease", function(a, b, c, d) {
          this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? t.concat(b) : t
        }, !0),
        v = u.map = {},
        w = u.register = function(a, b, c, d) {
          for (var e, f, g, h, i = b.split(","), j = i.length, l = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;)
            for (f = i[j], e = d ? s("easing." + f, null, !0) : k.easing[f] || {}, g = l.length; --g > -1;) h = l[g], v[f + "." + h] = v[h + f] = e[h] = a.getRatio ? a : a[h] || new a
        };
      for (g = u.prototype, g._calcEnd = !1, g.getRatio = function(a) {
          if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
          var b = this._type,
            c = this._power,
            d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
          return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
        }, e = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], f = e.length; --f > -1;) g = e[f] + ",Power" + f, w(new u(null, null, 1, f), g, "easeOut", !0), w(new u(null, null, 2, f), g, "easeIn" + (0 === f ? ",easeNone" : "")), w(new u(null, null, 3, f), g, "easeInOut");
      v.linear = k.easing.Linear.easeIn, v.swing = k.easing.Quad.easeInOut;
      var x = s("events.EventDispatcher", function(a) {
        this._listeners = {}, this._eventTarget = a || this
      });
      g = x.prototype, g.addEventListener = function(a, b, c, d, e) {
        e = e || 0;
        var f, g, j = this._listeners[a],
          k = 0;
        for (this !== h || i || h.wake(), null == j && (this._listeners[a] = j = []), g = j.length; --g > -1;) f = j[g], f.c === b && f.s === c ? j.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1);
        j.splice(k, 0, {
          c: b,
          s: c,
          up: d,
          pr: e
        })
      }, g.removeEventListener = function(a, b) {
        var c, d = this._listeners[a];
        if (d)
          for (c = d.length; --c > -1;)
            if (d[c].c === b) return void d.splice(c, 1)
      }, g.dispatchEvent = function(a) {
        var b, c, d, e = this._listeners[a];
        if (e)
          for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, {
            type: a,
            target: c
          }) : d.c.call(d.s || c))
      };
      var y = a.requestAnimationFrame,
        z = a.cancelAnimationFrame,
        A = Date.now || function() {
          return (new Date).getTime()
        },
        B = A();
      for (e = ["ms", "moz", "webkit", "o"], f = e.length; --f > -1 && !y;) y = a[e[f] + "RequestAnimationFrame"], z = a[e[f] + "CancelAnimationFrame"] || a[e[f] + "CancelRequestAnimationFrame"];
      s("Ticker", function(a, b) {
        var c, d, e, f, g, j = this,
          k = A(),
          m = !(b === !1 || !y) && "auto",
          o = 500,
          p = 33,
          q = "tick",
          r = function(a) {
            var b, h, i = A() - B;
            i > o && (k += i - p), B += i, j.time = (B - k) / 1e3, b = j.time - g, (!c || b > 0 || a === !0) && (j.frame++, g += b + (b >= f ? .004 : f - b), h = !0), a !== !0 && (e = d(r)), h && j.dispatchEvent(q)
          };
        x.call(j), j.time = j.frame = 0, j.tick = function() {
          r(!0)
        }, j.lagSmoothing = function(a, b) {
          o = a || 1 / l, p = Math.min(b, o, 0)
        }, j.sleep = function() {
          null != e && (m && z ? z(e) : clearTimeout(e), d = n, e = null, j === h && (i = !1))
        }, j.wake = function(a) {
          null !== e ? j.sleep() : a ? k += -B + (B = A()) : j.frame > 10 && (B = A() - o + 5), d = 0 === c ? n : m && y ? y : function(a) {
            return setTimeout(a, 1e3 * (g - j.time) + 1 | 0)
          }, j === h && (i = !0), r(2)
        }, j.fps = function(a) {
          return arguments.length ? (c = a, f = 1 / (c || 60), g = this.time + f, void j.wake()) : c
        }, j.useRAF = function(a) {
          return arguments.length ? (j.sleep(), m = a, void j.fps(c)) : m
        }, j.fps(a), setTimeout(function() {
          "auto" === m && j.frame < 5 && "hidden" !== document.visibilityState && j.useRAF(!1)
        }, 1500)
      }), g = k.Ticker.prototype = new k.events.EventDispatcher, g.constructor = k.Ticker;
      var C = s("core.Animation", function(a, b) {
        if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, V) {
          i || h.wake();
          var c = this.vars.useFrames ? U : V;
          c.add(this, c._time), this.vars.paused && this.paused(!0)
        }
      });
      h = C.ticker = new k.Ticker, g = C.prototype, g._dirty = g._gc = g._initted = g._paused = !1, g._totalTime = g._time = 0, g._rawPrevTime = -1, g._next = g._last = g._onUpdate = g._timeline = g.timeline = null, g._paused = !1;
      var D = function() {
        i && A() - B > 2e3 && h.wake(), setTimeout(D, 2e3)
      };
      D(), g.play = function(a, b) {
        return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
      }, g.pause = function(a, b) {
        return null != a && this.seek(a, b), this.paused(!0)
      }, g.resume = function(a, b) {
        return null != a && this.seek(a, b), this.paused(!1)
      }, g.seek = function(a, b) {
        return this.totalTime(Number(a), b !== !1)
      }, g.restart = function(a, b) {
        return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
      }, g.reverse = function(a, b) {
        return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
      }, g.render = function(a, b, c) {}, g.invalidate = function() {
        return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
      }, g.isActive = function() {
        var a, b = this._timeline,
          c = this._startTime;
        return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= c && a < c + this.totalDuration() / this._timeScale
      }, g._enabled = function(a, b) {
        return i || h.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
      }, g._kill = function(a, b) {
        return this._enabled(!1, !1)
      }, g.kill = function(a, b) {
        return this._kill(a, b), this
      }, g._uncache = function(a) {
        for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
        return this
      }, g._swapSelfInParams = function(a) {
        for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
        return c
      }, g._callback = function(a) {
        var b = this.vars,
          c = b[a],
          d = b[a + "Params"],
          e = b[a + "Scope"] || b.callbackScope || this,
          f = d ? d.length : 0;
        switch (f) {
          case 0:
            c.call(e);
            break;
          case 1:
            c.call(e, d[0]);
            break;
          case 2:
            c.call(e, d[0], d[1]);
            break;
          default:
            c.apply(e, d)
        }
      }, g.eventCallback = function(a, b, c, d) {
        if ("on" === (a || "").substr(0, 2)) {
          var e = this.vars;
          if (1 === arguments.length) return e[a];
          null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = o(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
        }
        return this
      }, g.delay = function(a) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
      }, g.duration = function(a) {
        return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
      }, g.totalDuration = function(a) {
        return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
      }, g.time = function(a, b) {
        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
      }, g.totalTime = function(a, b, c) {
        if (i || h.wake(), !arguments.length) return this._totalTime;
        if (this._timeline) {
          if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
            this._dirty && this.totalDuration();
            var d = this._totalDuration,
              e = this._timeline;
            if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
              for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
          }
          this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (I.length && X(), this.render(a, b, !1), I.length && X())
        }
        return this
      }, g.progress = g.totalProgress = function(a, b) {
        var c = this.duration();
        return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
      }, g.startTime = function(a) {
        return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
      }, g.endTime = function(a) {
        return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
      }, g.timeScale = function(a) {
        if (!arguments.length) return this._timeScale;
        if (a = a || l, this._timeline && this._timeline.smoothChildTiming) {
          var b = this._pauseTime,
            c = b || 0 === b ? b : this._timeline.totalTime();
          this._startTime = c - (c - this._startTime) * this._timeScale / a
        }
        return this._timeScale = a, this._uncache(!1)
      }, g.reversed = function(a) {
        return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
      }, g.paused = function(a) {
        if (!arguments.length) return this._paused;
        var b, c, d = this._timeline;
        return a != this._paused && d && (i || a || h.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
      };
      var E = s("core.SimpleTimeline", function(a) {
        C.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
      });
      g = E.prototype = new C, g.constructor = E, g.kill()._gc = !1, g._first = g._last = g._recent = null, g._sortChildren = !1, g.add = g.insert = function(a, b, c, d) {
        var e, f;
        if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
          for (f = a._startTime; e && e._startTime > f;) e = e._prev;
        return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
      }, g._remove = function(a, b) {
        return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
      }, g.render = function(a, b, c) {
        var d, e = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
      }, g.rawTime = function() {
        return i || h.wake(), this._totalTime
      };
      var F = s("TweenLite", function(b, c, d) {
          if (C.call(this, c, d), this.render = F.prototype.render, null == b) throw "Cannot tween a null target.";
          this.target = b = "string" != typeof b ? b : F.selector(b) || b;
          var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
            i = this.vars.overwrite;
          if (this._overwrite = i = null == i ? T[F.defaultOverwrite] : "number" == typeof i ? i >> 0 : T[i], (h || b instanceof Array || b.push && o(b)) && "number" != typeof b[0])
            for (this._targets = g = m(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(m(f))) : (this._siblings[e] = Y(f, this, !1), 1 === i && this._siblings[e].length > 1 && $(f, this, null, 1, this._siblings[e])) : (f = g[e--] = F.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
          else this._propLookup = {}, this._siblings = Y(b, this, !1), 1 === i && this._siblings.length > 1 && $(b, this, null, 1, this._siblings);
          (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -l, this.render(Math.min(0, -this._delay)))
        }, !0),
        G = function(b) {
          return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
        },
        H = function(a, b) {
          var c, d = {};
          for (c in a) S[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!P[c] || P[c] && P[c]._autoCSS) || (d[c] = a[c], delete a[c]);
          a.css = d
        };
      g = F.prototype = new C, g.constructor = F, g.kill()._gc = !1, g.ratio = 0, g._firstPT = g._targets = g._overwrittenProps = g._startAt = null, g._notifyPluginsOfEnabled = g._lazy = !1, F.version = "1.19.0", F.defaultEase = g._ease = new u(null, null, 1, 1), F.defaultOverwrite = "auto", F.ticker = h, F.autoSleep = 120, F.lagSmoothing = function(a, b) {
        h.lagSmoothing(a, b)
      }, F.selector = a.$ || a.jQuery || function(b) {
        var c = a.$ || a.jQuery;
        return c ? (F.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
      };
      var I = [],
        J = {},
        K = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        L = function(a) {
          for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m(b, this._target || c.t) : d > b && b > -d && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
        },
        M = function(a, b, c, d) {
          var e, f, g, h, i, j, k, l = [a, b],
            m = 0,
            n = "",
            o = 0;
          for (l.start = a, c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(K) || [], f = b.match(K) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++) k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
            _next: l._firstPT,
            t: l,
            p: l.length - 1,
            s: g,
            c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
            f: 0,
            m: o && 4 > o ? Math.round : 0
          }), m += k.length;
          return n += b.substr(m), n && l.push(n), l.setRatio = L, l
        },
        N = function(a, b, c, d, e, f, g, h, i) {
          "function" == typeof d && (d = d(i || 0, a));
          var j, k, l = "get" === c ? a[b] : c,
            m = typeof a[b],
            n = "string" == typeof d && "=" === d.charAt(1),
            o = {
              t: a,
              p: b,
              s: l,
              f: "function" === m,
              pg: 0,
              n: e || b,
              m: f ? "function" == typeof f ? f : Math.round : 0,
              pr: 0,
              c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - l || 0
            };
          return "number" !== m && ("function" === m && "get" === c && (k = b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), o.s = l = g ? a[k](g) : a[k]()), "string" == typeof l && (g || isNaN(l)) ? (o.fp = g, j = M(l, d, h || F.defaultStringFilter, o), o = {
            t: j,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 2,
            pg: 0,
            n: e || b,
            pr: 0,
            m: 0
          }) : n || (o.s = parseFloat(l), o.c = parseFloat(d) - o.s || 0)), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0
        },
        O = F._internals = {
          isArray: o,
          isSelector: G,
          lazyTweens: I,
          blobDif: M
        },
        P = F._plugins = {},
        Q = O.tweenLookup = {},
        R = 0,
        S = O.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
          callbackScope: 1,
          stringFilter: 1,
          id: 1
        },
        T = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0
        },
        U = C._rootFramesTimeline = new E,
        V = C._rootTimeline = new E,
        W = 30,
        X = O.lazyRender = function() {
          var a, b = I.length;
          for (J = {}; --b > -1;) a = I[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
          I.length = 0
        };
      V._startTime = h.time, U._startTime = h.frame, V._active = U._active = !0, setTimeout(X, 1), C._updateRoot = F.render = function() {
        var a, b, c;
        if (I.length && X(), V.render((h.time - V._startTime) * V._timeScale, !1, !1), U.render((h.frame - U._startTime) * U._timeScale, !1, !1), I.length && X(), h.frame >= W) {
          W = h.frame + (parseInt(F.autoSleep, 10) || 120);
          for (c in Q) {
            for (b = Q[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
            0 === b.length && delete Q[c]
          }
          if (c = V._first, (!c || c._paused) && F.autoSleep && !U._first && 1 === h._listeners.tick.length) {
            for (; c && c._paused;) c = c._next;
            c || h.sleep()
          }
        }
      }, h.addEventListener("tick", C._updateRoot);
      var Y = function(a, b, c) {
          var d, e, f = a._gsTweenID;
          if (Q[f || (a._gsTweenID = f = "t" + R++)] || (Q[f] = {
              target: a,
              tweens: []
            }), b && (d = Q[f].tweens, d[e = d.length] = b, c))
            for (; --e > -1;) d[e] === b && d.splice(e, 1);
          return Q[f].tweens
        },
        Z = function(a, b, c, d) {
          var e, f, g = a.vars.onOverwrite;
          return g && (e = g(a, b, c, d)), g = F.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
        },
        $ = function(a, b, c, d, e) {
          var f, g, h, i;
          if (1 === d || d >= 4) {
            for (i = e.length, f = 0; i > f; f++)
              if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);
              else if (5 === d) break;
            return g
          }
          var j, k = b._startTime + l,
            m = [],
            n = 0,
            o = 0 === b._duration;
          for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || _(b, 0, o), 0 === _(h, j, o) && (m[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (m[n++] = h)));
          for (f = n; --f > -1;)
            if (h = m[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
              if (2 !== d && !Z(h, b)) continue;
              h._enabled(!1, !1) && (g = !0)
            }
          return g
        },
        _ = function(a, b, c) {
          for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
            if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
            d = d._timeline
          }
          return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * l > f - b ? l : (f += a.totalDuration() / a._timeScale / e) > b + l ? 0 : f - b - l
        };
      g._init = function() {
        var a, b, c, d, e, f, g = this.vars,
          h = this._overwrittenProps,
          i = this._duration,
          j = !!g.immediateRender,
          k = g.ease;
        if (g.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
          for (d in g.startAt) e[d] = g.startAt[d];
          if (e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, this._startAt = F.to(this.target, 0, e), j)
            if (this._time > 0) this._startAt = null;
            else if (0 !== i) return
        } else if (g.runBackwards && 0 !== i)
          if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
          else {
            0 !== this._time && (j = !1), c = {};
            for (d in g) S[d] && "autoCSS" !== d || (c[d] = g[d]);
            if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = F.to(this.target, 0, c), j) {
              if (0 === this._time) return
            } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
          }
        if (this._ease = k = k ? k instanceof u ? k : "function" == typeof k ? new u(k, g.easeParams) : v[k] || F.defaultEase : F.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
          for (f = this._targets.length, a = 0; f > a; a++) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
        else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
        if (b && F._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards)
          for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
        this._onUpdate = g.onUpdate, this._initted = !0
      }, g._initProps = function(b, c, d, e, f) {
        var g, h, i, j, k, l;
        if (null == b) return !1;
        J[b._gsTweenID] && X(), this.vars.css || b.style && b !== a && b.nodeType && P.css && this.vars.autoCSS !== !1 && H(this.vars, b);
        for (g in this.vars)
          if (l = this.vars[g], S[g]) l && (l instanceof Array || l.push && o(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));
          else if (P[g] && (j = new P[g])._onInitTween(b, this.vars[g], this, f)) {
          for (this._firstPT = k = {
              _next: this._firstPT,
              t: j,
              p: "setRatio",
              s: 0,
              c: 1,
              f: 1,
              n: g,
              pg: 1,
              pr: j._priority,
              m: 0
            }, h = j._overwriteProps.length; --h > -1;) c[j._overwriteProps[h]] = this._firstPT;
          (j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k)
        } else c[g] = N.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
        return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && $(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (J[b._gsTweenID] = !0), i)
      }, g.render = function(a, b, c) {
        var d, e, f, g, h = this._time,
          i = this._duration,
          j = this._rawPrevTime;
        if (a >= i - 1e-7) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === l && "isPause" !== this.data) && j !== a && (c = !0, j > l && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : l);
        else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== l || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : l)), this._initted || (c = !0);
        else if (this._totalTime = this._time = a, this._easeType) {
          var k = a / i,
            m = this._easeType,
            n = this._easePower;
          (1 === m || 3 === m && k >= .5) && (k = 1 - k), 3 === m && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === m ? this.ratio = 1 - k : 2 === m ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2
        } else this.ratio = this._ease.getRatio(a / i);
        if (this._time !== h || c) {
          if (!this._initted) {
            if (this._init(), !this._initted || this._gc) return;
            if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, I.push(this), void(this._lazy = [a, b]);
            this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
          }
          for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
          this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === l && g !== l && (this._rawPrevTime = 0))
        }
      }, g._kill = function(a, b, c) {
        if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
        b = "string" != typeof b ? b || this._targets || this.target : F.selector(b) || b;
        var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
        if ((o(b) || G(b)) && "number" != typeof b[0])
          for (d = b.length; --d > -1;) this._kill(a, b[d], c) && (i = !0);
        else {
          if (this._targets) {
            for (d = this._targets.length; --d > -1;)
              if (b === this._targets[d]) {
                h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                break
              }
          } else {
            if (b !== this.target) return !1;
            h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
          }
          if (h) {
            if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (F.onOverwrite || this.vars.onOverwrite)) {
              for (f in j) h[f] && (l || (l = []), l.push(f));
              if ((l || !a) && !Z(this, c, b, l)) return !1
            }
            for (f in j)(g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
            !this._firstPT && this._initted && this._enabled(!1, !1)
          }
        }
        return i
      }, g.invalidate = function() {
        return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -l, this.render(Math.min(0, -this._delay))), this
      }, g._enabled = function(a, b) {
        if (i || h.wake(), a && this._gc) {
          var c, d = this._targets;
          if (d)
            for (c = d.length; --c > -1;) this._siblings[c] = Y(d[c], this, !0);
          else this._siblings = Y(this.target, this, !0)
        }
        return C.prototype._enabled.call(this, a, b), !(!this._notifyPluginsOfEnabled || !this._firstPT) && F._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
      }, F.to = function(a, b, c) {
        return new F(a, b, c)
      }, F.from = function(a, b, c) {
        return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new F(a, b, c)
      }, F.fromTo = function(a, b, c, d) {
        return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new F(a, b, d)
      }, F.delayedCall = function(a, b, c, d, e) {
        return new F(b, 0, {
          delay: a,
          onComplete: b,
          onCompleteParams: c,
          callbackScope: d,
          onReverseComplete: b,
          onReverseCompleteParams: c,
          immediateRender: !1,
          lazy: !1,
          useFrames: e,
          overwrite: 0
        })
      }, F.set = function(a, b) {
        return new F(a, 0, b)
      }, F.getTweensOf = function(a, b) {
        if (null == a) return [];
        a = "string" != typeof a ? a : F.selector(a) || a;
        var c, d, e, f;
        if ((o(a) || G(a)) && "number" != typeof a[0]) {
          for (c = a.length, d = []; --c > -1;) d = d.concat(F.getTweensOf(a[c], b));
          for (c = d.length; --c > -1;)
            for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
        } else
          for (d = Y(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
        return d
      }, F.killTweensOf = F.killDelayedCallsTo = function(a, b, c) {
        "object" == typeof b && (c = b, b = !1);
        for (var d = F.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
      };
      var aa = s("plugins.TweenPlugin", function(a, b) {
        this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = aa.prototype
      }, !0);
      if (g = aa.prototype, aa.version = "1.19.0", aa.API = 2, g._firstPT = null, g._addTween = N, g.setRatio = L, g._kill = function(a) {
          var b, c = this._overwriteProps,
            d = this._firstPT;
          if (null != a[this._propName]) this._overwriteProps = [];
          else
            for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
          for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
          return !1
        }, g._mod = g._roundProps = function(a) {
          for (var b, c = this._firstPT; c;) b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next
        }, F._onPluginEvent = function(a, b) {
          var c, d, e, f, g, h = b._firstPT;
          if ("_onInitAllProps" === a) {
            for (; h;) {
              for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
              (h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next = d) ? d._prev = h : f = h, h = g
            }
            h = b._firstPT = e
          }
          for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
          return c
        }, aa.activate = function(a) {
          for (var b = a.length; --b > -1;) a[b].API === aa.API && (P[(new a[b])._propName] = a[b]);
          return !0
        }, r.plugin = function(a) {
          if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
          var b, c = a.propName,
            d = a.priority || 0,
            e = a.overwriteProps,
            f = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_mod",
              mod: "_mod",
              initAll: "_onInitAllProps"
            },
            g = s("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
              aa.call(this, c, d), this._overwriteProps = e || []
            }, a.global === !0),
            h = g.prototype = new aa(c);
          h.constructor = g, g.API = a.API;
          for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
          return g.version = a.version, aa.activate([g]), g
        }, e = a._gsQueue) {
        for (f = 0; f < e.length; f++) e[f]();
        for (g in p) p[g].func || a.console.log("GSAP encountered missing dependency: " + g)
      }
      i = !1
    }
  }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"), (window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    var a = document.documentElement,
      b = window,
      c = function(c, d) {
        var e = "x" === d ? "Width" : "Height",
          f = "scroll" + e,
          g = "client" + e,
          h = document.body;
        return c === b || c === a || c === h ? Math.max(a[f], h[f]) - (b["inner" + e] || Math.max(a[g], h[g])) : c[f] - c["offset" + e]
      },
      d = window._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        version: "1.7.3",
        init: function(a, d, e) {
          return this._wdw = a === b, this._target = a, this._tween = e, "object" != typeof d && (d = {
            y: d
          }), this._autoKill = d.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != d.x ? (this._addTween(this, "x", this.x, "max" === d.x ? c(a, "x") : d.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != d.y ? (this._addTween(this, "y", this.y, "max" === d.y ? c(a, "y") : d.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
        },
        set: function(a) {
          this._super.setRatio.call(this, a);
          var d = this._wdw || !this.skipX ? this.getX() : this.xPrev,
            e = this._wdw || !this.skipY ? this.getY() : this.yPrev,
            f = e - this.yPrev,
            g = d - this.xPrev;
          this._autoKill && (!this.skipX && (g > 7 || -7 > g) && c(this._target, "x") > d && (this.skipX = !0), !this.skipY && (f > 7 || -7 > f) && c(this._target, "y") > e && (this.skipY = !0), this.skipX && this.skipY && this._tween.kill()), this._wdw ? b.scrollTo(this.skipX ? d : this.x, this.skipY ? e : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
        }
      }),
      e = d.prototype;
    d.max = c, e.getX = function() {
      return this._wdw ? null != b.pageXOffset ? b.pageXOffset : null != a.scrollLeft ? a.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
    }, e.getY = function() {
      return this._wdw ? null != b.pageYOffset ? b.pageYOffset : null != a.scrollTop ? a.scrollTop : document.body.scrollTop : this._target.scrollTop
    }, e._kill = function(a) {
      return a.scrollTo_x && (this.skipX = !0), a.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, a)
    }
  }), window._gsDefine && window._gsQueue.pop()(), ! function(a) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], a) : a("undefined" != typeof module && module.exports ? require("jquery") : jQuery)
  }(function(a) {
    "use strict";

    function b(b) {
      return !b || void 0 !== b.allowPageScroll || void 0 === b.swipe && void 0 === b.swipeStatus || (b.allowPageScroll = k), void 0 !== b.click && void 0 === b.tap && (b.tap = b.click), b || (b = {}), b = a.extend({}, a.fn.swipe.defaults, b), this.each(function() {
        var d = a(this),
          e = d.data(C);
        e || (e = new c(this, b), d.data(C, e))
      })
    }

    function c(b, c) {
      function d(b) {
        if (!(ja() || a(b.target).closest(c.excludedElements, Ta).length > 0)) {
          var d = b.originalEvent ? b.originalEvent : b;
          if (!d.pointerType || "mouse" != d.pointerType || 0 != c.fallbackToMouseEvents) {
            var e, f = d.touches,
              g = f ? f[0] : d;
            return Ua = v, f ? Va = f.length : c.preventDefaultEvents !== !1 && b.preventDefault(), Ja = 0, Ka = null, La = null, Ra = null, Ma = 0, Na = 0, Oa = 0, Pa = 1, Qa = 0, Sa = qa(), ha(), la(0, g), !f || Va === c.fingers || c.fingers === t || R() ? (Xa = za(), 2 == Va && (la(1, f[1]), Na = Oa = ta(Wa[0].start, Wa[1].start)), (c.swipeStatus || c.pinchStatus) && (e = J(d, Ua))) : e = !1, e === !1 ? (Ua = y, J(d, Ua), e) : (c.hold && (bb = setTimeout(a.proxy(function() {
              Ta.trigger("hold", [d.target]), c.hold && (e = c.hold.call(Ta, d, d.target))
            }, this), c.longTapThreshold)), ka(!0), null)
          }
        }
      }

      function D(a) {
        var b = a.originalEvent ? a.originalEvent : a;
        if (Ua !== x && Ua !== y && !ia()) {
          var d, e = b.touches,
            f = e ? e[0] : b,
            g = ma(f);
          if (Ya = za(), e && (Va = e.length), c.hold && clearTimeout(bb), Ua = w, 2 == Va && (0 == Na ? (la(1, e[1]), Na = Oa = ta(Wa[0].start, Wa[1].start)) : (ma(e[1]), Oa = ta(Wa[0].end, Wa[1].end), Ra = va(Wa[0].end, Wa[1].end)), Pa = ua(Na, Oa), Qa = Math.abs(Na - Oa)), Va === c.fingers || c.fingers === t || !e || R()) {
            if (Ka = ya(g.start, g.end), La = ya(g.last, g.end), P(a, La), Ja = wa(g.start, g.end), Ma = sa(), oa(Ka, Ja), d = J(b, Ua), !c.triggerOnTouchEnd || c.triggerOnTouchLeave) {
              var h = !0;
              if (c.triggerOnTouchLeave) {
                var i = Aa(this);
                h = Ba(g.end, i)
              }!c.triggerOnTouchEnd && h ? Ua = I(w) : c.triggerOnTouchLeave && !h && (Ua = I(x)), Ua != y && Ua != x || J(b, Ua)
            }
          } else Ua = y, J(b, Ua);
          d === !1 && (Ua = y, J(b, Ua))
        }
      }

      function E(a) {
        var b = a.originalEvent ? a.originalEvent : a,
          d = b.touches;
        if (d) {
          if (d.length && !ia()) return ga(b), !0;
          if (d.length && ia()) return !0
        }
        return ia() && (Va = $a), Ya = za(), Ma = sa(), M() || !L() ? (Ua = y, J(b, Ua)) : c.triggerOnTouchEnd || c.triggerOnTouchEnd === !1 && Ua === w ? (c.preventDefaultEvents !== !1 && a.preventDefault(), Ua = x, J(b, Ua)) : !c.triggerOnTouchEnd && Y() ? (Ua = x, K(b, Ua, o)) : Ua === w && (Ua = y, J(b, Ua)), ka(!1), null
      }

      function F() {
        Va = 0, Ya = 0, Xa = 0, Na = 0, Oa = 0, Pa = 1, ha(), ka(!1)
      }

      function G(a) {
        var b = a.originalEvent ? a.originalEvent : a;
        c.triggerOnTouchLeave && (Ua = I(x), J(b, Ua))
      }

      function H() {
        Ta.unbind(Ea, d), Ta.unbind(Ia, F), Ta.unbind(Fa, D), Ta.unbind(Ga, E), Ha && Ta.unbind(Ha, G), ka(!1)
      }

      function I(a) {
        var b = a,
          d = O(),
          e = L(),
          f = M();
        return !d || f ? b = y : !e || a != w || c.triggerOnTouchEnd && !c.triggerOnTouchLeave ? !e && a == x && c.triggerOnTouchLeave && (b = y) : b = x, b
      }

      function J(a, b) {
        var c, d = a.touches;
        return (V() || U()) && (c = K(a, b, m)), (S() || R()) && c !== !1 && (c = K(a, b, n)), ea() && c !== !1 ? c = K(a, b, p) : fa() && c !== !1 ? c = K(a, b, q) : da() && c !== !1 && (c = K(a, b, o)), b === y && F(a), b === x && (d ? d.length || F(a) : F(a)), c
      }

      function K(b, d, k) {
        var l;
        if (k == m) {
          if (Ta.trigger("swipeStatus", [d, Ka || null, Ja || 0, Ma || 0, Va, Wa, La]), c.swipeStatus && (l = c.swipeStatus.call(Ta, b, d, Ka || null, Ja || 0, Ma || 0, Va, Wa, La), l === !1)) return !1;
          if (d == x && T()) {
            if (clearTimeout(ab), clearTimeout(bb), Ta.trigger("swipe", [Ka, Ja, Ma, Va, Wa, La]), c.swipe && (l = c.swipe.call(Ta, b, Ka, Ja, Ma, Va, Wa, La), l === !1)) return !1;
            switch (Ka) {
              case e:
                Ta.trigger("swipeLeft", [Ka, Ja, Ma, Va, Wa, La]), c.swipeLeft && (l = c.swipeLeft.call(Ta, b, Ka, Ja, Ma, Va, Wa, La));
                break;
              case f:
                Ta.trigger("swipeRight", [Ka, Ja, Ma, Va, Wa, La]), c.swipeRight && (l = c.swipeRight.call(Ta, b, Ka, Ja, Ma, Va, Wa, La));
                break;
              case g:
                Ta.trigger("swipeUp", [Ka, Ja, Ma, Va, Wa, La]), c.swipeUp && (l = c.swipeUp.call(Ta, b, Ka, Ja, Ma, Va, Wa, La));
                break;
              case h:
                Ta.trigger("swipeDown", [Ka, Ja, Ma, Va, Wa, La]), c.swipeDown && (l = c.swipeDown.call(Ta, b, Ka, Ja, Ma, Va, Wa, La))
            }
          }
        }
        if (k == n) {
          if (Ta.trigger("pinchStatus", [d, Ra || null, Qa || 0, Ma || 0, Va, Pa, Wa]), c.pinchStatus && (l = c.pinchStatus.call(Ta, b, d, Ra || null, Qa || 0, Ma || 0, Va, Pa, Wa), l === !1)) return !1;
          if (d == x && Q()) switch (Ra) {
            case i:
              Ta.trigger("pinchIn", [Ra || null, Qa || 0, Ma || 0, Va, Pa, Wa]), c.pinchIn && (l = c.pinchIn.call(Ta, b, Ra || null, Qa || 0, Ma || 0, Va, Pa, Wa));
              break;
            case j:
              Ta.trigger("pinchOut", [Ra || null, Qa || 0, Ma || 0, Va, Pa, Wa]), c.pinchOut && (l = c.pinchOut.call(Ta, b, Ra || null, Qa || 0, Ma || 0, Va, Pa, Wa))
          }
        }
        return k == o ? d !== y && d !== x || (clearTimeout(ab), clearTimeout(bb), Z() && !aa() ? (_a = za(), ab = setTimeout(a.proxy(function() {
          _a = null, Ta.trigger("tap", [b.target]), c.tap && (l = c.tap.call(Ta, b, b.target))
        }, this), c.doubleTapThreshold)) : (_a = null, Ta.trigger("tap", [b.target]), c.tap && (l = c.tap.call(Ta, b, b.target)))) : k == p ? d !== y && d !== x || (clearTimeout(ab), clearTimeout(bb), _a = null, Ta.trigger("doubletap", [b.target]), c.doubleTap && (l = c.doubleTap.call(Ta, b, b.target))) : k == q && (d !== y && d !== x || (clearTimeout(ab), _a = null, Ta.trigger("longtap", [b.target]), c.longTap && (l = c.longTap.call(Ta, b, b.target)))), l
      }

      function L() {
        var a = !0;
        return null !== c.threshold && (a = Ja >= c.threshold), a
      }

      function M() {
        var a = !1;
        return null !== c.cancelThreshold && null !== Ka && (a = pa(Ka) - Ja >= c.cancelThreshold), a
      }

      function N() {
        return null === c.pinchThreshold || Qa >= c.pinchThreshold
      }

      function O() {
        var a;
        return a = !c.maxTimeThreshold || !(Ma >= c.maxTimeThreshold)
      }

      function P(a, b) {
        if (c.preventDefaultEvents !== !1)
          if (c.allowPageScroll === k) a.preventDefault();
          else {
            var d = c.allowPageScroll === l;
            switch (b) {
              case e:
                (c.swipeLeft && d || !d && c.allowPageScroll != r) && a.preventDefault();
                break;
              case f:
                (c.swipeRight && d || !d && c.allowPageScroll != r) && a.preventDefault();
                break;
              case g:
                (c.swipeUp && d || !d && c.allowPageScroll != s) && a.preventDefault();
                break;
              case h:
                (c.swipeDown && d || !d && c.allowPageScroll != s) && a.preventDefault();
                break;
              case k:
            }
          }
      }

      function Q() {
        var a = W(),
          b = X(),
          c = N();
        return a && b && c
      }

      function R() {
        return !!(c.pinchStatus || c.pinchIn || c.pinchOut)
      }

      function S() {
        return !(!Q() || !R())
      }

      function T() {
        var a = O(),
          b = L(),
          c = W(),
          d = X(),
          e = M(),
          f = !e && d && c && b && a;
        return f
      }

      function U() {
        return !!(c.swipe || c.swipeStatus || c.swipeLeft || c.swipeRight || c.swipeUp || c.swipeDown)
      }

      function V() {
        return !(!T() || !U())
      }

      function W() {
        return Va === c.fingers || c.fingers === t || !z
      }

      function X() {
        return 0 !== Wa[0].end.x
      }

      function Y() {
        return !!c.tap
      }

      function Z() {
        return !!c.doubleTap
      }

      function $() {
        return !!c.longTap
      }

      function _() {
        if (null == _a) return !1;
        var a = za();
        return Z() && a - _a <= c.doubleTapThreshold
      }

      function aa() {
        return _()
      }

      function ba() {
        return (1 === Va || !z) && (isNaN(Ja) || Ja < c.threshold)
      }

      function ca() {
        return Ma > c.longTapThreshold && u > Ja
      }

      function da() {
        return !(!ba() || !Y())
      }

      function ea() {
        return !(!_() || !Z())
      }

      function fa() {
        return !(!ca() || !$())
      }

      function ga(a) {
        Za = za(), $a = a.touches.length + 1
      }

      function ha() {
        Za = 0, $a = 0
      }

      function ia() {
        var a = !1;
        if (Za) {
          var b = za() - Za;
          b <= c.fingerReleaseThreshold && (a = !0)
        }
        return a
      }

      function ja() {
        return !(Ta.data(C + "_intouch") !== !0)
      }

      function ka(a) {
        Ta && (a === !0 ? (Ta.bind(Fa, D), Ta.bind(Ga, E), Ha && Ta.bind(Ha, G)) : (Ta.unbind(Fa, D, !1), Ta.unbind(Ga, E, !1), Ha && Ta.unbind(Ha, G, !1)), Ta.data(C + "_intouch", a === !0))
      }

      function la(a, b) {
        var c = {
          start: {
            x: 0,
            y: 0
          },
          last: {
            x: 0,
            y: 0
          },
          end: {
            x: 0,
            y: 0
          }
        };
        return c.start.x = c.last.x = c.end.x = b.pageX || b.clientX, c.start.y = c.last.y = c.end.y = b.pageY || b.clientY, Wa[a] = c, c
      }

      function ma(a) {
        var b = void 0 !== a.identifier ? a.identifier : 0,
          c = na(b);
        return null === c && (c = la(b, a)), c.last.x = c.end.x, c.last.y = c.end.y, c.end.x = a.pageX || a.clientX, c.end.y = a.pageY || a.clientY, c
      }

      function na(a) {
        return Wa[a] || null
      }

      function oa(a, b) {
        a != k && (b = Math.max(b, pa(a)), Sa[a].distance = b)
      }

      function pa(a) {
        return Sa[a] ? Sa[a].distance : void 0
      }

      function qa() {
        var a = {};
        return a[e] = ra(e), a[f] = ra(f), a[g] = ra(g), a[h] = ra(h), a
      }

      function ra(a) {
        return {
          direction: a,
          distance: 0
        }
      }

      function sa() {
        return Ya - Xa
      }

      function ta(a, b) {
        var c = Math.abs(a.x - b.x),
          d = Math.abs(a.y - b.y);
        return Math.round(Math.sqrt(c * c + d * d))
      }

      function ua(a, b) {
        var c = b / a * 1;
        return c.toFixed(2)
      }

      function va() {
        return 1 > Pa ? j : i
      }

      function wa(a, b) {
        return Math.round(Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)))
      }

      function xa(a, b) {
        var c = a.x - b.x,
          d = b.y - a.y,
          e = Math.atan2(d, c),
          f = Math.round(180 * e / Math.PI);
        return 0 > f && (f = 360 - Math.abs(f)), f
      }

      function ya(a, b) {
        if (Ca(a, b)) return k;
        var c = xa(a, b);
        return 45 >= c && c >= 0 ? e : 360 >= c && c >= 315 ? e : c >= 135 && 225 >= c ? f : c > 45 && 135 > c ? h : g
      }

      function za() {
        var a = new Date;
        return a.getTime()
      }

      function Aa(b) {
        b = a(b);
        var c = b.offset(),
          d = {
            left: c.left,
            right: c.left + b.outerWidth(),
            top: c.top,
            bottom: c.top + b.outerHeight()
          };
        return d
      }

      function Ba(a, b) {
        return a.x > b.left && a.x < b.right && a.y > b.top && a.y < b.bottom
      }

      function Ca(a, b) {
        return a.x == b.x && a.y == b.y
      }
      var c = a.extend({}, c),
        Da = z || B || !c.fallbackToMouseEvents,
        Ea = Da ? B ? A ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
        Fa = Da ? B ? A ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
        Ga = Da ? B ? A ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
        Ha = Da ? B ? "mouseleave" : null : "mouseleave",
        Ia = B ? A ? "MSPointerCancel" : "pointercancel" : "touchcancel",
        Ja = 0,
        Ka = null,
        La = null,
        Ma = 0,
        Na = 0,
        Oa = 0,
        Pa = 1,
        Qa = 0,
        Ra = 0,
        Sa = null,
        Ta = a(b),
        Ua = "start",
        Va = 0,
        Wa = {},
        Xa = 0,
        Ya = 0,
        Za = 0,
        $a = 0,
        _a = 0,
        ab = null,
        bb = null;
      try {
        Ta.bind(Ea, d), Ta.bind(Ia, F)
      } catch (b) {
        a.error("events not supported " + Ea + "," + Ia + " on jQuery.swipe")
      }
      this.enable = function() {
        return this.disable(), Ta.bind(Ea, d), Ta.bind(Ia, F), Ta
      }, this.disable = function() {
        return H(), Ta
      }, this.destroy = function() {
        H(), Ta.data(C, null), Ta = null
      }, this.option = function(b, d) {
        if ("object" == typeof b) c = a.extend(c, b);
        else if (void 0 !== c[b]) {
          if (void 0 === d) return c[b];
          c[b] = d
        } else {
          if (!b) return c;
          a.error("Option " + b + " does not exist on jQuery.swipe.options")
        }
        return null
      }
    }
    var d = "1.6.18",
      e = "left",
      f = "right",
      g = "up",
      h = "down",
      i = "in",
      j = "out",
      k = "none",
      l = "auto",
      m = "swipe",
      n = "pinch",
      o = "tap",
      p = "doubletap",
      q = "longtap",
      r = "horizontal",
      s = "vertical",
      t = "all",
      u = 10,
      v = "start",
      w = "move",
      x = "end",
      y = "cancel",
      z = "ontouchstart" in window,
      A = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !z,
      B = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !z,
      C = "TouchSwipe",
      D = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: ".noSwipe",
        preventDefaultEvents: !0
      };
    a.fn.swipe = function(c) {
      var d = a(this),
        e = d.data(C);
      if (e && "string" == typeof c) {
        if (e[c]) return e[c].apply(e, Array.prototype.slice.call(arguments, 1));
        a.error("Method " + c + " does not exist on jQuery.swipe")
      } else if (e && "object" == typeof c) e.option.apply(e, arguments);
      else if (!(e || "object" != typeof c && c)) return b.apply(this, arguments);
      return d
    }, a.fn.swipe.version = d, a.fn.swipe.defaults = D, a.fn.swipe.phases = {
      PHASE_START: v,
      PHASE_MOVE: w,
      PHASE_END: x,
      PHASE_CANCEL: y
    }, a.fn.swipe.directions = {
      LEFT: e,
      RIGHT: f,
      UP: g,
      DOWN: h,
      IN: i,
      OUT: j
    }, a.fn.swipe.pageScroll = {
      NONE: k,
      HORIZONTAL: r,
      VERTICAL: s,
      AUTO: l
    }, a.fn.swipe.fingers = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      ALL: t
    }
  }), ! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.ScrollMagic = b()
  }(this, function() {
    "use strict";
    var a = function() {};
    a.version = "2.0.5", window.addEventListener("mousewheel", function() {});
    var b = "data-scrollmagic-pin-spacer";
    a.Controller = function(d) {
      var f, g, h = "ScrollMagic.Controller",
        i = "FORWARD",
        j = "REVERSE",
        k = "PAUSED",
        l = c.defaults,
        m = this,
        n = e.extend({}, l, d),
        o = [],
        p = !1,
        q = 0,
        r = k,
        s = !0,
        t = 0,
        u = !0,
        v = function() {
          for (var a in n) l.hasOwnProperty(a) || delete n[a];
          if (n.container = e.get.elements(n.container)[0], !n.container) throw h + " init failed.";
          s = n.container === window || n.container === document.body || !document.body.contains(n.container), s && (n.container = window), t = y(), n.container.addEventListener("resize", C), n.container.addEventListener("scroll", C), n.refreshInterval = parseInt(n.refreshInterval) || l.refreshInterval, w()
        },
        w = function() {
          n.refreshInterval > 0 && (g = window.setTimeout(D, n.refreshInterval))
        },
        x = function() {
          return n.vertical ? e.get.scrollTop(n.container) : e.get.scrollLeft(n.container)
        },
        y = function() {
          return n.vertical ? e.get.height(n.container) : e.get.width(n.container)
        },
        z = this._setScrollPos = function(a) {
          n.vertical ? s ? window.scrollTo(e.get.scrollLeft(), a) : n.container.scrollTop = a : s ? window.scrollTo(a, e.get.scrollTop()) : n.container.scrollLeft = a
        },
        A = function() {
          if (u && p) {
            var a = e.type.Array(p) ? p : o.slice(0);
            p = !1;
            var b = q;
            q = m.scrollPos();
            var c = q - b;
            0 !== c && (r = c > 0 ? i : j), r === j && a.reverse(), a.forEach(function(a) {
              a.update(!0)
            })
          }
        },
        B = function() {
          f = e.rAF(A)
        },
        C = function(a) {
          "resize" == a.type && (t = y(), r = k), p !== !0 && (p = !0, B())
        },
        D = function() {
          if (!s && t != y()) {
            var a;
            try {
              a = new Event("resize", {
                bubbles: !1,
                cancelable: !1
              })
            } catch (b) {
              a = document.createEvent("Event"), a.initEvent("resize", !1, !1)
            }
            n.container.dispatchEvent(a)
          }
          o.forEach(function(a) {
            a.refresh()
          }), w()
        };
      this._options = n;
      var E = function(a) {
        if (a.length <= 1) return a;
        var b = a.slice(0);
        return b.sort(function(a, b) {
          return a.scrollOffset() > b.scrollOffset() ? 1 : -1
        }), b
      };
      return this.addScene = function(b) {
        if (e.type.Array(b)) b.forEach(function(a) {
          m.addScene(a)
        });
        else if (b instanceof a.Scene)
          if (b.controller() !== m) b.addTo(m);
          else if (o.indexOf(b) < 0) {
          o.push(b), o = E(o), b.on("shift.controller_sort", function() {
            o = E(o)
          });
          for (var c in n.globalSceneOptions) b[c] && b[c].call(b, n.globalSceneOptions[c])
        }
        return m
      }, this.removeScene = function(a) {
        if (e.type.Array(a)) a.forEach(function(a) {
          m.removeScene(a)
        });
        else {
          var b = o.indexOf(a);
          b > -1 && (a.off("shift.controller_sort"), o.splice(b, 1), a.remove())
        }
        return m
      }, this.updateScene = function(b, c) {
        return e.type.Array(b) ? b.forEach(function(a) {
          m.updateScene(a, c)
        }) : c ? b.update(!0) : p !== !0 && b instanceof a.Scene && (p = p || [], -1 == p.indexOf(b) && p.push(b), p = E(p), B()), m
      }, this.update = function(a) {
        return C({
          type: "resize"
        }), a && A(), m
      }, this.scrollTo = function(c, d) {
        if (e.type.Number(c)) z.call(n.container, c, d);
        else if (c instanceof a.Scene) c.controller() === m && m.scrollTo(c.scrollOffset(), d);
        else if (e.type.Function(c)) z = c;
        else {
          var f = e.get.elements(c)[0];
          if (f) {
            for (; f.parentNode.hasAttribute(b);) f = f.parentNode;
            var g = n.vertical ? "top" : "left",
              h = e.get.offset(n.container),
              i = e.get.offset(f);
            s || (h[g] -= m.scrollPos()), m.scrollTo(i[g] - h[g], d)
          }
        }
        return m
      }, this.scrollPos = function(a) {
        return arguments.length ? (e.type.Function(a) && (x = a), m) : x.call(m)
      }, this.info = function(a) {
        var b = {
          size: t,
          vertical: n.vertical,
          scrollPos: q,
          scrollDirection: r,
          container: n.container,
          isDocument: s
        };
        return arguments.length ? void 0 !== b[a] ? b[a] : void 0 : b
      }, this.loglevel = function() {
        return m
      }, this.enabled = function(a) {
        return arguments.length ? (u != a && (u = !!a, m.updateScene(o, !0)), m) : u
      }, this.destroy = function(a) {
        window.clearTimeout(g);
        for (var b = o.length; b--;) o[b].destroy(a);
        return n.container.removeEventListener("resize", C), n.container.removeEventListener("scroll", C), e.cAF(f), null
      }, v(), m
    };
    var c = {
      defaults: {
        container: window,
        vertical: !0,
        globalSceneOptions: {},
        loglevel: 2,
        refreshInterval: 100
      }
    };
    a.Controller.addOption = function(a, b) {
      c.defaults[a] = b
    }, a.Controller.extend = function(b) {
      var c = this;
      a.Controller = function() {
        return c.apply(this, arguments), this.$super = e.extend({}, this), b.apply(this, arguments) || this
      }, e.extend(a.Controller, c), a.Controller.prototype = c.prototype, a.Controller.prototype.constructor = a.Controller
    }, a.Scene = function(c) {
      var f, g, h = "BEFORE",
        i = "DURING",
        j = "AFTER",
        k = d.defaults,
        l = this,
        m = e.extend({}, k, c),
        n = h,
        o = 0,
        p = {
          start: 0,
          end: 0
        },
        q = 0,
        r = !0,
        s = function() {
          for (var a in m) k.hasOwnProperty(a) || delete m[a];
          for (var b in k) B(b);
          z()
        },
        t = {};
      this.on = function(a, b) {
        return e.type.Function(b) && (a = a.trim().split(" "), a.forEach(function(a) {
          var c = a.split("."),
            d = c[0],
            e = c[1];
          "*" != d && (t[d] || (t[d] = []), t[d].push({
            namespace: e || "",
            callback: b
          }))
        })), l
      }, this.off = function(a, b) {
        return a ? (a = a.trim().split(" "), a.forEach(function(a) {
          var c = a.split("."),
            d = c[0],
            e = c[1] || "",
            f = "*" === d ? Object.keys(t) : [d];
          f.forEach(function(a) {
            for (var c = t[a] || [], d = c.length; d--;) {
              var f = c[d];
              !f || e !== f.namespace && "*" !== e || b && b != f.callback || c.splice(d, 1)
            }
            c.length || delete t[a]
          })
        }), l) : l
      }, this.trigger = function(b, c) {
        if (b) {
          var d = b.trim().split("."),
            e = d[0],
            f = d[1],
            g = t[e];
          g && g.forEach(function(b) {
            f && f !== b.namespace || b.callback.call(l, new a.Event(e, b.namespace, l, c))
          })
        }
        return l
      }, l.on("change.internal", function(a) {
        "loglevel" !== a.what && "tweenChanges" !== a.what && ("triggerElement" === a.what ? w() : "reverse" === a.what && l.update())
      }).on("shift.internal", function() {
        u(), l.update()
      }), this.addTo = function(b) {
        return b instanceof a.Controller && g != b && (g && g.removeScene(l), g = b, z(), v(!0), w(!0), u(), g.info("container").addEventListener("resize", x), b.addScene(l), l.trigger("add", {
          controller: g
        }), l.update()), l
      }, this.enabled = function(a) {
        return arguments.length ? (r != a && (r = !!a, l.update(!0)), l) : r
      }, this.remove = function() {
        if (g) {
          g.info("container").removeEventListener("resize", x);
          var a = g;
          g = void 0, a.removeScene(l), l.trigger("remove")
        }
        return l
      }, this.destroy = function(a) {
        return l.trigger("destroy", {
          reset: a
        }), l.remove(), l.off("*.*"), null
      }, this.update = function(a) {
        if (g)
          if (a)
            if (g.enabled() && r) {
              var b, c = g.info("scrollPos");
              b = m.duration > 0 ? (c - p.start) / (p.end - p.start) : c >= p.start ? 1 : 0, l.trigger("update", {
                startPos: p.start,
                endPos: p.end,
                scrollPos: c
              }), l.progress(b)
            } else C && n === i && E(!0);
        else g.updateScene(l, !1);
        return l
      }, this.refresh = function() {
        return v(), w(), l
      }, this.progress = function(a) {
        if (arguments.length) {
          var b = !1,
            c = n,
            d = g ? g.info("scrollDirection") : "PAUSED",
            e = m.reverse || a >= o;
          if (0 === m.duration ? (b = o != a, o = 1 > a && e ? 0 : 1, n = 0 === o ? h : i) : 0 > a && n !== h && e ? (o = 0, n = h, b = !0) : a >= 0 && 1 > a && e ? (o = a, n = i, b = !0) : a >= 1 && n !== j ? (o = 1, n = j, b = !0) : n !== i || e || E(), b) {
            var f = {
                progress: o,
                state: n,
                scrollDirection: d
              },
              k = n != c,
              p = function(a) {
                l.trigger(a, f)
              };
            k && c !== i && (p("enter"), p(c === h ? "start" : "end")), p("progress"), k && n !== i && (p(n === h ? "start" : "end"), p("leave"))
          }
          return l
        }
        return o
      };
      var u = function() {
          p = {
            start: q + m.offset
          }, g && m.triggerElement && (p.start -= g.info("size") * m.triggerHook), p.end = p.start + m.duration
        },
        v = function(a) {
          if (f) {
            var b = "duration";
            A(b, f.call(l)) && !a && (l.trigger("change", {
              what: b,
              newval: m[b]
            }), l.trigger("shift", {
              reason: b
            }))
          }
        },
        w = function(a) {
          var c = 0,
            d = m.triggerElement;
          if (g && d) {
            for (var f = g.info(), h = e.get.offset(f.container), i = f.vertical ? "top" : "left"; d.parentNode.hasAttribute(b);) d = d.parentNode;
            var j = e.get.offset(d);
            f.isDocument || (h[i] -= g.scrollPos()), c = j[i] - h[i]
          }
          var k = c != q;
          q = c, k && !a && l.trigger("shift", {
            reason: "triggerElementPosition"
          })
        },
        x = function() {
          m.triggerHook > 0 && l.trigger("shift", {
            reason: "containerResize"
          })
        },
        y = e.extend(d.validate, {
          duration: function(a) {
            if (e.type.String(a) && a.match(/^(\.|\d)*\d+%$/)) {
              var b = parseFloat(a) / 100;
              a = function() {
                return g ? g.info("size") * b : 0
              }
            }
            if (e.type.Function(a)) {
              f = a;
              try {
                a = parseFloat(f())
              } catch (b) {
                a = -1
              }
            }
            if (a = parseFloat(a), !e.type.Number(a) || 0 > a) throw f ? (f = void 0, 0) : 0;
            return a
          }
        }),
        z = function(a) {
          a = arguments.length ? [a] : Object.keys(y), a.forEach(function(a) {
            var b;
            if (y[a]) try {
              b = y[a](m[a])
            } catch (c) {
              b = k[a]
            } finally {
              m[a] = b
            }
          })
        },
        A = function(a, b) {
          var c = !1,
            d = m[a];
          return m[a] != b && (m[a] = b, z(a), c = d != m[a]), c
        },
        B = function(a) {
          l[a] || (l[a] = function(b) {
            return arguments.length ? ("duration" === a && (f = void 0), A(a, b) && (l.trigger("change", {
              what: a,
              newval: m[a]
            }), d.shifts.indexOf(a) > -1 && l.trigger("shift", {
              reason: a
            })), l) : m[a]
          })
        };
      this.controller = function() {
        return g
      }, this.state = function() {
        return n
      }, this.scrollOffset = function() {
        return p.start
      }, this.triggerPosition = function() {
        var a = m.offset;
        return g && (a += m.triggerElement ? q : g.info("size") * l.triggerHook()), a
      };
      var C, D;
      l.on("shift.internal", function(a) {
        var b = "duration" === a.reason;
        (n === j && b || n === i && 0 === m.duration) && E(), b && F()
      }).on("progress.internal", function() {
        E()
      }).on("add.internal", function() {
        F()
      }).on("destroy.internal", function(a) {
        l.removePin(a.reset)
      });
      var E = function(a) {
          if (C && g) {
            var b = g.info(),
              c = D.spacer.firstChild;
            if (a || n !== i) {
              var d = {
                  position: D.inFlow ? "relative" : "absolute",
                  top: 0,
                  left: 0
                },
                f = e.css(c, "position") != d.position;
              D.pushFollowers ? m.duration > 0 && (n === j && 0 === parseFloat(e.css(D.spacer, "padding-top")) ? f = !0 : n === h && 0 === parseFloat(e.css(D.spacer, "padding-bottom")) && (f = !0)) : d[b.vertical ? "top" : "left"] = m.duration * o, e.css(c, d), f && F()
            } else {
              "fixed" != e.css(c, "position") && (e.css(c, {
                position: "fixed"
              }), F());
              var k = e.get.offset(D.spacer, !0),
                l = m.reverse || 0 === m.duration ? b.scrollPos - p.start : Math.round(o * m.duration * 10) / 10;
              k[b.vertical ? "top" : "left"] += l, e.css(D.spacer.firstChild, {
                top: k.top,
                left: k.left
              })
            }
          }
        },
        F = function() {
          if (C && g && D.inFlow) {
            var a = n === i,
              b = g.info("vertical"),
              c = D.spacer.firstChild,
              d = e.isMarginCollapseType(e.css(D.spacer, "display")),
              f = {};
            D.relSize.width || D.relSize.autoFullWidth ? a ? e.css(C, {
              width: e.get.width(D.spacer)
            }) : e.css(C, {
              width: "100%"
            }) : (f["min-width"] = e.get.width(b ? C : c, !0, !0), f.width = a ? f["min-width"] : "auto"), D.relSize.height ? a ? e.css(C, {
              height: e.get.height(D.spacer) - (D.pushFollowers ? m.duration : 0)
            }) : e.css(C, {
              height: "100%"
            }) : (f["min-height"] = e.get.height(b ? c : C, !0, !d), f.height = a ? f["min-height"] : "auto"), D.pushFollowers && (f["padding" + (b ? "Top" : "Left")] = m.duration * o, f["padding" + (b ? "Bottom" : "Right")] = m.duration * (1 - o)), e.css(D.spacer, f)
          }
        },
        G = function() {
          g && C && n === i && !g.info("isDocument") && E()
        },
        H = function() {
          g && C && n === i && ((D.relSize.width || D.relSize.autoFullWidth) && e.get.width(window) != e.get.width(D.spacer.parentNode) || D.relSize.height && e.get.height(window) != e.get.height(D.spacer.parentNode)) && F()
        },
        I = function(a) {
          g && C && n === i && !g.info("isDocument") && (a.preventDefault(), g._setScrollPos(g.info("scrollPos") - ((a.wheelDelta || a[g.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -a.detail)))
        };
      this.setPin = function(a, c) {
        var d = {
          pushFollowers: !0,
          spacerClass: "scrollmagic-pin-spacer"
        };
        if (c = e.extend({}, d, c), a = e.get.elements(a)[0], !a) return l;
        if ("fixed" === e.css(a, "position")) return l;
        if (C) {
          if (C === a) return l;
          l.removePin()
        }
        C = a;
        var f = C.parentNode.style.display,
          g = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
        C.parentNode.style.display = "none";
        var h = "absolute" != e.css(C, "position"),
          i = e.css(C, g.concat(["display"])),
          j = e.css(C, ["width", "height"]);
        C.parentNode.style.display = f, !h && c.pushFollowers && (c.pushFollowers = !1);
        var k = C.parentNode.insertBefore(document.createElement("div"), C),
          m = e.extend(i, {
            position: h ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box"
          });
        if (h || e.extend(m, e.css(C, ["width", "height"])), e.css(k, m), k.setAttribute(b, ""), e.addClass(k, c.spacerClass), D = {
            spacer: k,
            relSize: {
              width: "%" === j.width.slice(-1),
              height: "%" === j.height.slice(-1),
              autoFullWidth: "auto" === j.width && h && e.isMarginCollapseType(i.display)
            },
            pushFollowers: c.pushFollowers,
            inFlow: h
          }, !C.___origStyle) {
          C.___origStyle = {};
          var n = C.style,
            o = g.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
          o.forEach(function(a) {
            C.___origStyle[a] = n[a] || ""
          })
        }
        return D.relSize.width && e.css(k, {
          width: j.width
        }), D.relSize.height && e.css(k, {
          height: j.height
        }), k.appendChild(C), e.css(C, {
          position: h ? "relative" : "absolute",
          margin: "auto",
          top: "auto",
          left: "auto",
          bottom: "auto",
          right: "auto"
        }), (D.relSize.width || D.relSize.autoFullWidth) && e.css(C, {
          boxSizing: "border-box",
          mozBoxSizing: "border-box",
          webkitBoxSizing: "border-box"
        }), window.addEventListener("scroll", G), window.addEventListener("resize", G), window.addEventListener("resize", H), C.addEventListener("mousewheel", I), C.addEventListener("DOMMouseScroll", I), E(), l
      }, this.removePin = function(a) {
        if (C) {
          if (n === i && E(!0), a || !g) {
            var c = D.spacer.firstChild;
            if (c.hasAttribute(b)) {
              var d = D.spacer.style,
                f = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
              margins = {}, f.forEach(function(a) {
                margins[a] = d[a] || ""
              }), e.css(c, margins)
            }
            D.spacer.parentNode.insertBefore(c, D.spacer), D.spacer.parentNode.removeChild(D.spacer), C.parentNode.hasAttribute(b) || (e.css(C, C.___origStyle), delete C.___origStyle)
          }
          window.removeEventListener("scroll", G), window.removeEventListener("resize", G), window.removeEventListener("resize", H), C.removeEventListener("mousewheel", I), C.removeEventListener("DOMMouseScroll", I), C = void 0
        }
        return l
      };
      var J, K = [];
      return l.on("destroy.internal", function(a) {
        l.removeClassToggle(a.reset)
      }), this.setClassToggle = function(a, b) {
        var c = e.get.elements(a);
        return 0 !== c.length && e.type.String(b) ? (K.length > 0 && l.removeClassToggle(), J = b, K = c, l.on("enter.internal_class leave.internal_class", function(a) {
          var b = "enter" === a.type ? e.addClass : e.removeClass;
          K.forEach(function(a) {
            b(a, J)
          })
        }), l) : l
      }, this.removeClassToggle = function(a) {
        return a && K.forEach(function(a) {
          e.removeClass(a, J)
        }), l.off("start.internal_class end.internal_class"), J = void 0, K = [], l
      }, s(), l
    };
    var d = {
      defaults: {
        duration: 0,
        offset: 0,
        triggerElement: void 0,
        triggerHook: .5,
        reverse: !0,
        loglevel: 2
      },
      validate: {
        offset: function(a) {
          if (a = parseFloat(a), !e.type.Number(a)) throw 0;
          return a
        },
        triggerElement: function(a) {
          if (a = a || void 0) {
            var b = e.get.elements(a)[0];
            if (!b) throw 0;
            a = b
          }
          return a
        },
        triggerHook: function(a) {
          var b = {
            onCenter: .5,
            onEnter: 1,
            onLeave: 0
          };
          if (e.type.Number(a)) a = Math.max(0, Math.min(parseFloat(a), 1));
          else {
            if (!(a in b)) throw 0;
            a = b[a]
          }
          return a
        },
        reverse: function(a) {
          return !!a
        }
      },
      shifts: ["duration", "offset", "triggerHook"]
    };
    a.Scene.addOption = function(a, b, c, e) {
      a in d.defaults || (d.defaults[a] = b, d.validate[a] = c, e && d.shifts.push(a))
    }, a.Scene.extend = function(b) {
      var c = this;
      a.Scene = function() {
        return c.apply(this, arguments), this.$super = e.extend({}, this), b.apply(this, arguments) || this
      }, e.extend(a.Scene, c), a.Scene.prototype = c.prototype, a.Scene.prototype.constructor = a.Scene
    }, a.Event = function(a, b, c, d) {
      d = d || {};
      for (var e in d) this[e] = d[e];
      return this.type = a, this.target = this.currentTarget = c, this.namespace = b || "", this.timeStamp = this.timestamp = Date.now(), this
    };
    var e = a._util = function(a) {
      var b, c = {},
        d = function(a) {
          return parseFloat(a) || 0
        },
        e = function(b) {
          return b.currentStyle ? b.currentStyle : a.getComputedStyle(b)
        },
        f = function(b, c, f, g) {
          if (c = c === document ? a : c, c === a) g = !1;
          else if (!l.DomElement(c)) return 0;
          b = b.charAt(0).toUpperCase() + b.substr(1).toLowerCase();
          var h = (f ? c["offset" + b] || c["outer" + b] : c["client" + b] || c["inner" + b]) || 0;
          if (f && g) {
            var i = e(c);
            h += "Height" === b ? d(i.marginTop) + d(i.marginBottom) : d(i.marginLeft) + d(i.marginRight)
          }
          return h
        },
        g = function(a) {
          return a.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(a) {
            return a[1].toUpperCase()
          })
        };
      c.extend = function(a) {
        for (a = a || {}, b = 1; b < arguments.length; b++)
          if (arguments[b])
            for (var c in arguments[b]) arguments[b].hasOwnProperty(c) && (a[c] = arguments[b][c]);
        return a
      }, c.isMarginCollapseType = function(a) {
        return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(a) > -1
      };
      var h = 0,
        i = ["ms", "moz", "webkit", "o"],
        j = a.requestAnimationFrame,
        k = a.cancelAnimationFrame;
      for (b = 0; !j && b < i.length; ++b) j = a[i[b] + "RequestAnimationFrame"], k = a[i[b] + "CancelAnimationFrame"] || a[i[b] + "CancelRequestAnimationFrame"];
      j || (j = function(b) {
        var c = (new Date).getTime(),
          d = Math.max(0, 16 - (c - h)),
          e = a.setTimeout(function() {
            b(c + d)
          }, d);
        return h = c + d, e
      }), k || (k = function(b) {
        a.clearTimeout(b)
      }), c.rAF = j.bind(a), c.cAF = k.bind(a);
      var l = c.type = function(a) {
        return Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
      };
      l.String = function(a) {
        return "string" === l(a)
      }, l.Function = function(a) {
        return "function" === l(a)
      }, l.Array = function(a) {
        return Array.isArray(a)
      }, l.Number = function(a) {
        return !l.Array(a) && a - parseFloat(a) + 1 >= 0
      }, l.DomElement = function(a) {
        return "object" == typeof HTMLElement ? a instanceof HTMLElement : a && "object" == typeof a && null !== a && 1 === a.nodeType && "string" == typeof a.nodeName
      };
      var m = c.get = {};
      return m.elements = function(b) {
        var c = [];
        if (l.String(b)) try {
          b = document.querySelectorAll(b)
        } catch (a) {
          return c
        }
        if ("nodelist" === l(b) || l.Array(b))
          for (var d = 0, e = c.length = b.length; e > d; d++) {
            var f = b[d];
            c[d] = l.DomElement(f) ? f : m.elements(f)
          } else(l.DomElement(b) || b === document || b === a) && (c = [b]);
        return c
      }, m.scrollTop = function(b) {
        return b && "number" == typeof b.scrollTop ? b.scrollTop : a.pageYOffset || 0
      }, m.scrollLeft = function(b) {
        return b && "number" == typeof b.scrollLeft ? b.scrollLeft : a.pageXOffset || 0
      }, m.width = function(a, b, c) {
        return f("width", a, b, c)
      }, m.height = function(a, b, c) {
        return f("height", a, b, c)
      }, m.offset = function(a, b) {
        var c = {
          top: 0,
          left: 0
        };
        if (a && a.getBoundingClientRect) {
          var d = a.getBoundingClientRect();
          c.top = d.top, c.left = d.left, b || (c.top += m.scrollTop(), c.left += m.scrollLeft())
        }
        return c
      }, c.addClass = function(a, b) {
        b && (a.classList ? a.classList.add(b) : a.className += " " + b)
      }, c.removeClass = function(a, b) {
        b && (a.classList ? a.classList.remove(b) : a.className = a.className.replace(RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"), " "))
      }, c.css = function(a, b) {
        if (l.String(b)) return e(a)[g(b)];
        if (l.Array(b)) {
          var c = {},
            d = e(a);
          return b.forEach(function(a) {
            c[a] = d[g(a)]
          }), c
        }
        for (var f in b) {
          var h = b[f];
          h == parseFloat(h) && (h += "px"), a.style[g(f)] = h
        }
      }, c
    }(window || {});
    return a
  }), ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
  }(function(a) {
    "use strict";
    var b = "animsition",
      c = {
        init: function(d) {
          d = a.extend({
            inClass: "fade-in",
            outClass: "fade-out",
            inDuration: 1500,
            outDuration: 800,
            linkElement: ".animsition-link",
            loading: !0,
            loadingParentElement: "body",
            loadingClass: "animsition-loading",
            loadingInner: "",
            timeout: !1,
            timeoutCountdown: 5e3,
            onLoadEvent: !0,
            browser: ["animation-duration", "-webkit-animation-duration"],
            overlay: !1,
            overlayClass: "animsition-overlay-slide",
            overlayParentElement: "body",
            transition: function(a) {
              window.location.href = a
            }
          }, d), c.settings = {
            timer: !1,
            data: {
              inClass: "animsition-in-class",
              inDuration: "animsition-in-duration",
              outClass: "animsition-out-class",
              outDuration: "animsition-out-duration",
              overlay: "animsition-overlay"
            },
            events: {
              inStart: "animsition.inStart",
              inEnd: "animsition.inEnd",
              outStart: "animsition.outStart",
              outEnd: "animsition.outEnd"
            }
          };
          var e = c.supportCheck.call(this, d);
          if (!e && d.browser.length > 0 && (!e || !this.length)) return "console" in window || (window.console = {}, window.console.log = function(a) {
            return a
          }), this.length || console.log("Animsition: Element does not exist on page."), e || console.log("Animsition: Does not support this browser."), c.destroy.call(this);
          var f = c.optionCheck.call(this, d);
          return f && a("." + d.overlayClass).length <= 0 && c.addOverlay.call(this, d), d.loading && a("." + d.loadingClass).length <= 0 && c.addLoading.call(this, d), this.each(function() {
            var e = this,
              f = a(this),
              g = a(window),
              h = a(document),
              i = f.data(b);
            i || (d = a.extend({}, d), f.data(b, {
              options: d
            }), d.timeout && c.addTimer.call(e), d.onLoadEvent && g.on("load." + b, function() {
              c.settings.timer && clearTimeout(c.settings.timer), c.in.call(e)
            }), g.on("pageshow." + b, function(a) {
              a.originalEvent.persisted && c.in.call(e)
            }), g.on("unload." + b, function() {}), h.on("click." + b, d.linkElement, function(b) {
              b.preventDefault();
              var d = a(this),
                f = d.attr("href");
              2 === b.which || b.metaKey || b.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && b.ctrlKey ? window.open(f, "_blank") : c.out.call(e, d, f)
            }))
          })
        },
        addOverlay: function(b) {
          a(b.overlayParentElement).prepend('<div class="' + b.overlayClass + '"></div>')
        },
        addLoading: function(b) {
          a(b.loadingParentElement).append('<div class="' + b.loadingClass + '">' + b.loadingInner + "</div>")
        },
        removeLoading: function() {
          var c = a(this),
            d = c.data(b).options,
            e = a(d.loadingParentElement).children("." + d.loadingClass);
          e.fadeOut().remove()
        },
        addTimer: function() {
          var d = this,
            e = a(this),
            f = e.data(b).options;
          c.settings.timer = setTimeout(function() {
            c.in.call(d), a(window).off("load." + b)
          }, f.timeoutCountdown)
        },
        supportCheck: function(b) {
          var c = a(this),
            d = b.browser,
            e = d.length,
            f = !1;
          0 === e && (f = !0);
          for (var g = 0; e > g; g++)
            if ("string" == typeof c.css(d[g])) {
              f = !0;
              break
            }
          return f
        },
        optionCheck: function(b) {
          var d, e = a(this);
          return d = !(!b.overlay && !e.data(c.settings.data.overlay))
        },
        animationCheck: function(c, d, e) {
          var f = a(this),
            g = f.data(b).options,
            h = typeof c,
            i = !d && "number" === h,
            j = d && "string" === h && c.length > 0;
          return i || j ? c = c : d && e ? c = g.inClass : !d && e ? c = g.inDuration : d && !e ? c = g.outClass : d || e || (c = g.outDuration), c
        },
        in : function() {
          var d = this,
            e = a(this),
            f = e.data(b).options,
            g = e.data(c.settings.data.inDuration),
            h = e.data(c.settings.data.inClass),
            i = c.animationCheck.call(d, g, !1, !0),
            j = c.animationCheck.call(d, h, !0, !0),
            k = c.optionCheck.call(d, f),
            l = e.data(b).outClass;
          f.loading && c.removeLoading.call(d), l && e.removeClass(l), k ? c.inOverlay.call(d, j, i) : c.inDefault.call(d, j, i)
        },
        inDefault: function(b, d) {
          var e = a(this);
          e.css({
            "animation-duration": d + "ms"
          }).addClass(b).trigger(c.settings.events.inStart).animateCallback(function() {
            e.removeClass(b).css({
              opacity: 1
            }).trigger(c.settings.events.inEnd)
          })
        },
        inOverlay: function(d, e) {
          var f = a(this),
            g = f.data(b).options;
          f.css({
            opacity: 1
          }).trigger(c.settings.events.inStart), a(g.overlayParentElement).children("." + g.overlayClass).css({
            "animation-duration": e + "ms"
          }).addClass(d).animateCallback(function() {
            f.trigger(c.settings.events.inEnd)
          })
        },
        out: function(d, e) {
          var f = this,
            g = a(this),
            h = g.data(b).options,
            i = d.data(c.settings.data.outClass),
            j = g.data(c.settings.data.outClass),
            k = d.data(c.settings.data.outDuration),
            l = g.data(c.settings.data.outDuration),
            m = i ? i : j,
            n = k ? k : l,
            o = c.animationCheck.call(f, m, !0, !1),
            p = c.animationCheck.call(f, n, !1, !1),
            q = c.optionCheck.call(f, h);
          g.data(b).outClass = o, q ? c.outOverlay.call(f, o, p, e) : c.outDefault.call(f, o, p, e)
        },
        outDefault: function(d, e, f) {
          var g = a(this),
            h = g.data(b).options;
          g.css({
            "animation-duration": e + 1 + "ms"
          }).addClass(d).trigger(c.settings.events.outStart).animateCallback(function() {
            g.trigger(c.settings.events.outEnd), h.transition(f)
          })
        },
        outOverlay: function(d, e, f) {
          var g = this,
            h = a(this),
            i = h.data(b).options,
            j = h.data(c.settings.data.inClass),
            k = c.animationCheck.call(g, j, !0, !0);
          a(i.overlayParentElement).children("." + i.overlayClass).css({
            "animation-duration": e + 1 + "ms"
          }).removeClass(k).addClass(d).trigger(c.settings.events.outStart).animateCallback(function() {
            h.trigger(c.settings.events.outEnd), i.transition(f)
          })
        },
        destroy: function() {
          return this.each(function() {
            var c = a(this);
            a(window).off("." + b), c.css({
              opacity: 1
            }).removeData(b)
          })
        }
      };
    a.fn.animateCallback = function(b) {
      var c = "animationend webkitAnimationEnd";
      return this.each(function() {
        var d = a(this);
        d.on(c, function() {
          return d.off(c), b.call(this)
        })
      })
    }, a.fn.animsition = function(d) {
      return c[d] ? c[d].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof d && d ? void a.error("Method " + d + " does not exist on jQuery." + b) : c.init.apply(this, arguments)
    }
  }), jQuery(document).ready(function(a) {
    function p() {
      i.view.style.width = a(window).width() + "px", i.view.style.height = a(window).height() + "px"
    }

    function q() {
      i.render(j), requestAnimationFrame(q)
    }

    function H() {
      TweenMax.set([".blurred"], {
        webkitFilter: "blur(" + E.a + "px)",
        filter: "blur(" + E.a + "px)"
      })
    }

    function I() {
      TweenMax.set([".slider--blurred"], {
        webkitFilter: "blur(" + E.a + "px)",
        filter: "blur(" + E.a + "px)"
      })
    }

    function Z(a, b, c) {
      if (c) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3);
        var e = "; expires=" + d.toGMTString()
      } else var e = "";
      document.cookie = a + "=" + b + e + "; path=/"
    }

    function $(a) {
      for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        for (var e = c[d];
          " " == e.charAt(0);) e = e.substring(1, e.length);
        if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
      }
      return null
    }

    function ja(b) {
      var c = a(this),
        d = a(c.attr("href"));
      d.length && (oa(d), b.preventDefault())
    }

    function ka(a) {
      var b = a.keyCode;
      b == keyCodes.UP ? (ma(), a.preventDefault()) : b == keyCodes.DOWN && (na(), a.preventDefault())
    }

    function la(a) {
      var b = a.originalEvent.wheelDelta / 30 || -a.originalEvent.detail;
      b < -1 ? na() : b > 1 && ma(), a.preventDefault()
    }

    function ma() {
      ga.prev().length && oa(ga.prev())
    }

    function na() {
      ga.next().length && oa(ga.next())
    }

    function oa(b) {
      if (!ha && b.length) {
        ha = !0, ga = b;
        var c = ga.find(".slide-background"),
          d = fa.find(".slide-background"),
          e = ga.find(".slide-background__layer--two"),
          f = ga.find(".slide-content__kicker").find("span"),
          g = fa.find(".slide-content__kicker").find("span"),
          h = ga.find(".slide-content__title").find("span"),
          i = fa.find(".slide-content__title").find("span"),
          j = ga.find(".slide-meta__item"),
          k = fa.find(".slide-meta__item"),
          m = (ga.find(".slide-launch"), fa.find(".slide-launch")),
          n = ga.find(".slide-index").find("div"),
          o = fa.find(".slide-index").find("div"),
          p = a(".video"),
          q = a(".glitch__sprites"),
          s = (new TimelineLite, new TimelineLite);
        TweenLite.set(q, {
          autoAlpha: 0
        }), s.to(p, .25, {
          autoAlpha: .3
        }).to(g, .3, {
          y: "-110%",
          ease: Circ.easeIn
        }, "-=.25").to(i, .3, {
          y: "-110%",
          ease: Circ.easeIn
        }, "-=.3").to(k, .3, {
          y: "-110%",
          ease: Circ.easeIn
        }, "-=.3").to(m, .3, {
          autoAlpha: 0
        }, "-=.3").to(o, .3, {
          y: "-110%",
          ease: Circ.easeIn
        }, "-=.3").to(d, .5, {
          autoAlpha: 0,
          scale: 1.2,
          ease: Power2.easeIn
        }).set(ea, {
          scrollTo: {
            y: ia * ga.index()
          }
        }).set(u, {
          x: 0,
          autoAlpha: 1
        }).fromTo(c, .5, {
          autoAlpha: 0,
          scale: 1.2
        }, {
          autoAlpha: .3,
          scale: 1,
          ease: Power2.easeOut
        }).fromTo(e, .25, {
          x: 0,
          autoAlpha: 1
        }, {
          x: -10,
          autoAlpha: .3,
          ease: RoughEase.ease.config({
            template: Power0.easeNone,
            strength: 1,
            points: 20,
            taper: "none",
            randomize: !0,
            clamp: !1
          })
        }).fromTo(e, .25, {
          x: -10,
          autoAlpha: .3
        }, {
          x: 0,
          autoAlpha: 1,
          ease: RoughEase.ease.config({
            template: Power0.easeNone,
            strength: 1,
            points: 20,
            taper: "none",
            randomize: !0,
            clamp: !1
          })
        }).fromTo(q, .25, {
          left: "2300%",
          autoAlpha: .5
        }, {
          left: "-2300%",
          ease: SteppedEase.config(23)
        }, "-=.5").to(q, .25, {
          left: "2300%",
          ease: SteppedEase.config(23)
        }, "-=.25").to(f, .3, {
          y: "0%",
          autoAlpha: 1,
          ease: Circ.easeOut
        }, "-=.5").to(h, .3, {
          y: "0%",
          autoAlpha: 1,
          ease: Circ.easeOut
        }, "-=.5").to(n, .3, {
          y: "0%",
          autoAlpha: 1,
          ease: Circ.easeOut
        }, "-=.5").to(j, .3, {
          y: "0%",
          autoAlpha: 1,
          ease: Circ.easeOut
        }).to(m, .3, {
          autoAlpha: 1,
          onComplete: pa
        }).to(p, 1, {
          autoAlpha: 0
        }), TweenLite.to(ba.filter(".ACTIVE"), .5, {
          className: "-=ACTIVE"
        }), TweenLite.to(ba.filter('[href="#' + ga.attr("id") + '"]'), .5, {
          className: "+=ACTIVE"
        }), TweenLite.to(ba.filter(".slider-pagination__link--is-active"), .5, {
          className: "-=slider-pagination__link--is-active"
        }), TweenLite.to(ba.filter('[href="#' + ga.attr("id") + '"]'), .5, {
          className: "+=slider-pagination__link--is-active"
        })
      }
    }

    function pa() {
      ha = !1
    }

    function qa(a) {
      var b = _.innerHeight();
      ia !== b && (ia = b, TweenLite.set([ea, fa], {
        height: ia + "px"
      }), TweenLite.set(ea, {
        scrollTo: {
          y: ia * ga.index()
        }
      }))
    }
    "undefined" != typeof console && console.log("%c\nSo here we are again... At the magical dev panel! What are you looking for now?  -Love, Fonix \n\n", "color: #0d0d0d; font-size: 12px; font-weight: bold;"), a(".loader").animsition({
      inClass: "loading-in",
      outClass: "loading-out",
      inDuration: 1500,
      outDuration: 1500,
      linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"])',
      loading: !0,
      loadingParentElement: "html",
      loadingClass: "is-loading",
      loadingInner: "",
      timeout: !1,
      timeoutCountdown: 5e3,
      onLoadEvent: !0,
      browser: ["animation-duration", "-webkit-animation-duration"],
      overlay: !1,
      overlayClass: "animsition-overlay-slide",
      overlayParentElement: "html",
      transition: function(a) {
        window.location.href = a
      }
    }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (a(".video").remove(), a("html").addClass("is-mobile")) : a("html").addClass("is-desktop");
    var b = "ontouchstart" in document.documentElement || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (b) try {
      for (var c in document.styleSheets) {
        var d = document.styleSheets[c];
        if (d.rules)
          for (var e = d.rules.length - 1; e >= 0; e--) d.rules[e].selectorText && d.rules[e].selectorText.match(":hover") && d.deleteRule(e)
      }
    } catch (a) {}
    var f = a(".pixi"),
      g = a(window).innerWidth(),
      h = a(window).innerHeight(),
      i = PIXI.autoDetectRenderer(g, h);
    f.append(i.view);
    for (var j = new PIXI.Container, k = ["https://fonix.online/wp-content/themes/fonix/img/bgNoise_01.jpg", "https://fonix.online/wp-content/themes/fonix/img/bgNoise_02.jpg", "https://fonix.online/wp-content/themes/fonix/img/bgNoise_03.jpg"], l = [], m = 0; m < 3; m++) {
      var n = PIXI.Texture.fromImage(k[m]);
      l.push(n)
    }
    var o = new PIXI.extras.TilingSprite(l[0], g, h);
    setInterval(function() {
      m += .07, m > 3 && (m = 0), o.texture = l[Math.floor(m)]
    }, 1), j.addChild(o), p(), window.addEventListener("resize", p), q();
    var r = a(".blinds");
    TweenMax.to(r, 1.5, {
      repeat: -1,
      y: -24,
      ease: Power0.easeNone,
      onComplete: function() {
        TweenLite.fromTo(r, 1.5, {
          y: 24
        }, {
          y: 0,
          ease: Power0.easeNone
        })
      }
    });
    var s = a(".screen__error--big");
    $screenErrorSmall = a(".screen__error--small"), tl_screenErrorBig = new TimelineMax({
      repeat: -1,
      repeatDelay: 2
    }), tl_screenErrorSmall = new TimelineMax({
      repeat: -1,
      repeatDelay: 4
    }), tl_screenErrorBig.fromTo(s, 2, {
      top: "80%",
      autoAlpha: 0,
      ease: Power0.easeNone
    }, {
      top: "40%",
      autoAlpha: .1,
      ease: Power0.easeNone
    }).fromTo(s, 2, {
      top: "40%",
      autoAlpha: .1,
      ease: Power0.easeNone
    }, {
      top: "0%",
      autoAlpha: 0,
      ease: Power0.easeNone
    }), tl_screenErrorSmall.fromTo($screenErrorSmall, 1.5, {
      top: "100%",
      autoAlpha: 0,
      ease: Power0.easeNone
    }, {
      top: "50%",
      autoAlpha: .1,
      ease: Power0.easeNone
    }).fromTo($screenErrorSmall, 1.5, {
      top: "50%",
      autoAlpha: .1,
      ease: Power0.easeNone
    }, {
      top: "0%",
      autoAlpha: 0,
      ease: Power0.easeNone
    });
    var t = a(".slide-background__layer--one"),
      u = a(".slide-background__layer--two"),
      v = a(".video"),
      w = new TimelineMax({
        repeat: -1,
        repeatDelay: 6
      });
    w.to(v, .25, {
      autoAlpha: .1
    }).fromTo(t, .5, {
      x: 0,
      autoAlpha: 1
    }, {
      x: -10,
      autoAlpha: .3,
      ease: RoughEase.ease.config({
        template: Power0.easeNone,
        strength: 1,
        points: 20,
        taper: "none",
        randomize: !0,
        clamp: !1
      })
    }, "-=.25").fromTo(u, .5, {
      x: 0,
      autoAlpha: 1
    }, {
      x: 10,
      autoAlpha: .5,
      ease: RoughEase.ease.config({
        template: Power0.easeNone,
        strength: 1,
        points: 20,
        taper: "none",
        randomize: !0,
        clamp: !1
      })
    }, "-=.5").fromTo(t, .25, {
      x: -10,
      autoAlpha: .3
    }, {
      x: 0,
      autoAlpha: 1,
      ease: RoughEase.ease.config({
        template: Power0.easeNone,
        strength: 1,
        points: 20,
        taper: "none",
        randomize: !0,
        clamp: !1
      })
    }).fromTo(u, .25, {
      x: 10,
      autoAlpha: .5
    }, {
      x: 0,
      autoAlpha: 1,
      ease: RoughEase.ease.config({
        template: Power0.easeNone,
        strength: 1,
        points: 20,
        taper: "none",
        randomize: !0,
        clamp: !1
      })
    }, "-=.25").to(v, .25, {
      autoAlpha: 0
    });
    var x = a(".site-logo__sprites");
    TweenLite.to(x, .75, {
      left: "-1700%",
      ease: SteppedEase.config(17)
    });
    var y = a(".site-wrapper"),
      z = a(".slider-controls"),
      A = a(".slider-pagination"),
      B = a(".slider-help"),
      C = a(".site-nav"),
      D = a(".site-nav").find("li"),
      E = {
        a: 0
      },
      F = new TimelineMax({
        paused: !0
      }),
      G = !0;
    F.set(a(".hamburger"), {
      className: "-=is-active"
    }).set(a(".hamburger"), {
      className: "+=is-active"
    }).to(y, .5, {
      autoAlpha: .4
    }).to(E, .5, {
      a: 10,
      onUpdate: H
    }, "-=.5").set(C, {
      display: "none"
    }).set(C, {
      autoAlpha: 1,
      display: "block"
    }).staggerFromTo(D, .2, {
      y: -20,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      ease: Circ.easeOut
    }, .1), a(".hamburger").click(function() {
      G ? F.play() : F.reverse(), G = !G
    });
    var J = a(".project-hamburger"),
      K = a(".project-nav__item"),
      L = new TimelineMax({
        paused: !0
      }),
      M = !0;
    L.set(J, {
      className: "-=is-active"
    }).set(J, {
      className: "+=is-active"
    }).staggerFromTo(K, .2, {
      x: 20,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Circ.easeOut
    }, .1), J.click(function() {
      M ? L.play() : L.reverse(), M = !M
    });
    var N = a(".effect-toggle"),
      O = a(".screen"),
      P = new TimelineMax({
        paused: !0
      }),
      Q = !0;
    P.set(N, {
      className: "-=is-active"
    }).set(N, {
      className: "+=is-active"
    }).fromTo(f, 0, {
      autoAlpha: 1
    }, {
      autoAlpha: 0
    }).fromTo(s, 0, {
      display: "block"
    }, {
      display: "none"
    }).fromTo($screenErrorSmall, 0, {
      display: "block"
    }, {
      display: "none"
    }).fromTo(v, 0, {
      display: "block"
    }, {
      display: "none"
    }), N.click(function() {
      Q ? (P.play(), w.pause()) : (P.reverse(), w.resume()), Q = !Q
    });
    var z = a(".slider-controls"),
      A = a(".slider-pagination"),
      B = a(".slider-help"),
      R = a(".hamburger"),
      S = a(".site-info");
    TweenLite.fromTo(z, .5, {
      x: -80,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Circ.easeOut,
      delay: 2
    }), TweenLite.fromTo(A, .5, {
      x: 80,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Circ.easeOut,
      delay: 2
    }), TweenLite.from(B, .5, {
      top: 0,
      autoAlpha: 0,
      ease: Circ.easeOut,
      delay: 2
    }), TweenLite.fromTo(J, .5, {
      x: 80,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Circ.easeOut,
      delay: 2
    }), TweenLite.fromTo(N, .5, {
      x: -80,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Circ.easeOut,
      delay: 1
    }), TweenLite.fromTo(R, .5, {
      x: 80,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Circ.easeOut,
      delay: 1
    }), TweenLite.fromTo(S, .5, {
      x: -80,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Circ.easeOut,
      delay: 1
    });
    var T = a(".splash"),
      U = a(".splash__overlay"),
      V = a(".splash__text"),
      W = a(".splash__help"),
      X = a(".splash__cookie-notice");
    if (a("html").hasClass("is-desktop") && !$("splashSeen")) {
      var Y = new TimelineMax({
        paused: !0,
        delay: 3
      });
      Y.to(E, .5, {
        a: 10,
        onUpdate: I
      }).fromTo(T, .5, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        ease: Circ.easeOut
      }, "-=.5").fromTo(U, .5, {
        autoAlpha: 0
      }, {
        autoAlpha: .7,
        ease: Circ.easeOut
      }, "-=.5").fromTo(V, .5, {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        ease: Circ.easeOut
      }).fromTo(W, 1, {
        autoAlpha: 0
      }, {
        autoAlpha: .6,
        ease: Power0.easeNone
      }).fromTo(X, 1, {
        autoAlpha: 0
      }, {
        autoAlpha: .7,
        ease: Circ.easeOut
      }, "-=.5"), Y.play(), a(".hamburger, .project-hamburger, .slider-pagination, .effect-toggle").css("pointer-events", "none"), a(".splash__launch").click(function() {
        Y.timeScale(2), Y.reverse(), a(".hamburger, .project-hamburger, .slider-pagination, .effect-toggle").css("pointer-events", "auto")
      }), Z("splashSeen", "1", 7)
    }
    a('<div class="browser-head"><div class="browser-head__bar"></div><div class="browser-head__dots"><span></span></div></div>').insertBefore(".browser-img");
    var _ = a(window),
      aa = a(document),
      ba = a(".slider-pagination a").filter('[href^="#"]'),
      ca = a(".slider-controls__button--prev"),
      da = a(".slider-controls__button--next"),
      ea = a(".slider"),
      fa = a(".slider__slide"),
      ga = fa.first(),
      ha = !1,
      ia = _.innerHeight();
    keyCodes = {
      UP: 38,
      DOWN: 40
    }, oa(ga), _.on("resize", qa).resize(), ea.on("mousewheel DOMMouseScroll", la), aa.on("keydown", ka), ba.on("click", ja), ca.on("click", ma), da.on("click", na), a(function() {
      a(".slider").swipe({
        swipe: function(a, b, c, d, e, f) {
          "up" == b ? na() : "down" == b && ma()
        }
      })
    });
    var ra = new ScrollMagic.Controller;
    a(".module--fade").each(function() {
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: .9,
        reverse: !1
      }).setClassToggle(this, "is-visible").addTo(ra)
    });
    var sa = ['<a href="#top" class="back-to-top u-inconsolata"><i class="fa fa-long-arrow-left"></i>Back to top</a>'].join(""),
      ta = a(".single");
    ta.append(sa), a(".back-to-top").hide(), a(function() {
      a(window).scroll(function() {
        a(this).scrollTop() > 100 ? a(".back-to-top").fadeIn() : a(".back-to-top").fadeOut()
      }), a(".back-to-top, .to-top").click(function() {
        return a("body,html").animate({
          scrollTop: 0
        }, 800), !1
      })
    });
    var ua = a(".slide-background"),
      va = a(".slide-content__kicker").find("span"),
      wa = a(".slide-content__title").find("span"),
      xa = a(".slide-meta__item"),
      ya = a(".slide-launch"),
      za = a(".slide-index").find("div"),
      Aa = a(".glitch__sprites");
    a(".from-front").click(function(b) {
      if (2 == b.which) return b.preventDefault(), !1;
      var c = new TimelineLite;
      c.to(v, .25, {
        autoAlpha: .3
      }).to(va, .3, {
        y: "-110%",
        ease: Circ.easeIn
      }, "-=.25").to(wa, .3, {
        y: "-110%",
        ease: Circ.easeIn
      }, "-=.3").to(xa, .3, {
        y: "-110%",
        ease: Circ.easeIn
      }, "-=.3").to(ya, .3, {
        autoAlpha: 0
      }, "-=.3").to(za, .3, {
        y: "-110%",
        ease: Circ.easeIn
      }, "-=.3").to(z, .3, {
        x: -80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(A, .3, {
        x: 80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(B, .3, {
        x: -80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(J, .3, {
        x: 80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(a(".project-nav"), .3, {
        x: 80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(N, .3, {
        x: -80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(x, .75, {
        left: "1700%",
        ease: SteppedEase.config(17)
      }, "-=.3").to(R, .3, {
        x: 80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(S, .3, {
        x: -80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.3").to(ua, .25, {
        autoAlpha: 0,
        scale: 4,
        ease: Circ.easeIn
      }).to(v, .25, {
        autoAlpha: 0
      }).add(TweenMax.fromTo(Aa, .25, {
        left: "2300%",
        autoAlpha: 1
      }, {
        left: "-2300%",
        ease: SteppedEase.config(23),
        repeat: 2
      }), "-=.5").set(Aa, {
        autoAlpha: 0
      }).set(O, {
        autoAlpha: 0
      }).set(r, {
        autoAlpha: 0
      }).set(f, {
        autoAlpha: 0
      })
    }), a(".from-page").click(function(a) {
      if (2 == a.which) return a.preventDefault(), !1;
      var b = new TimelineLite;
      b.to(C, .5, {
        autoAlpha: 0
      }).to(x, .75, {
        left: "1700%",
        ease: SteppedEase.config(17)
      }, "-=.5").to(R, .3, {
        x: 80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.75").to(S, .3, {
        x: -80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.75").to(N, .3, {
        x: -80,
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.75").to(E, .5, {
        a: 10,
        onUpdate: H
      }, "-=.3").to(ea, .3, {
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.5").to(ta, .3, {
        autoAlpha: 0,
        ease: Circ.easeIn
      }, "-=.5").fromTo(Aa, .25, {
        left: "2300%",
        autoAlpha: 1
      }, {
        left: "-2300%",
        ease: SteppedEase.config(23)
      }).set(Aa, {
        autoAlpha: 0
      }).set(O, {
        autoAlpha: 0
      }).set(r, {
        autoAlpha: 0
      }).set(f, {
        autoAlpha: 0
      })
    })
  });