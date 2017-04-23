riot.tag2('shorten', '<section class="pa4-l pa3-m"><form class="mw7 center br2-ns ba b--black-10" onsubmit="{send}"><fieldset class="cf bn ma0 pa0"><div class="cf"><input ref="searchbox" taborder="1" class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Paste a link to shorten it" type="text" value="" oninput="{edit}" autofocus autosave name="s" required><button taborder="2" class="f6 f5-l button-reset fl pv3 tc bn bg-dark-pink dim white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" onclick="{send}"><span class="pr2">Shorten</span><span ref="spinner" class="dots"></span></button></div></fieldset></form></section>', '', '', function(opts) {

    this.edit = function(e) {
      this.uri = e.target.value
    }.bind(this)

    this.resolveURI = function(json) {
      location.pathname = json.data.hash + '+'
    }

    this.send = function(e) {
      e.preventDefault()

      if (!Fink.isURI(this.uri)) {
        this.refs.searchbox.value = ''
        Fink.buzz()
        return
      }

      this.refs.spinner.classList.toggle('loading')
      Fink
        .register(this.uri)
        .then(function(response) { return response.json()})
        .then(this.resolveURI.bind(this))
    }.bind(this)

});

/**
 * fink-is-uri - Check if a URI is valid to be shortened.
 * @version v1.0.2
 * @link    https://github.com/finkhq/fink-is-uri
 * @license MIT
 */require=function r(e,t,o){function n(u,s){if(!t[u]){if(!e[u]){var a="function"==typeof require&&require;if(!s&&a)return a(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var c=t[u]={exports:{}};e[u][0].call(c.exports,function(r){var t=e[u][1][r];return n(t?t:r)},c,c.exports,r,e,t,o)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)n(o[u]);return n}({1:[function(r,e,t){"use strict";var o=r("parse-uri"),n=r("punycode2/encode"),i=/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i,u=/%[^0-9a-f]/i,s=/%[0-9a-f](:?[^0-9a-f]|$)/i,a=/^[a-z][a-z0-9\+\-\.]*$/,f=/^\/\//;e.exports=function(r,e){if(!r)return!1;if("object"!=typeof r){if(r=n(r),i.test(r))return!1;if(u.test(r)||s.test(r))return!1;r=o(r,e)}return r.protocol&&a.test(r.protocol.toLowerCase())?!r.authority&&f.test(r.path)?!1:!0:!1}},{"parse-uri":5,"punycode2/encode":2}],2:[function(r,e,t){"use strict";var o=r("./ucs2/decode"),n=r("./lib/adapt"),i=String.fromCharCode,u=Math.floor,s=2147483647,a=36,f="-",c=72,p=128,h=1,d=26,l=function(r,e){return r+22+75*(26>r)-((0!==e)<<5)};e.exports=function(r){var e,t,v,y,w,q,x,g,m,C,M,O,k,E,$,b=[];for(r=o(r),O=r.length,e=p,t=0,w=c,q=0;O>q;++q)M=r[q],128>M&&b.push(i(M));for(v=y=b.length,y&&b.push(f);O>v;){for(x=s,q=0;O>q;++q)M=r[q],M>=e&&x>M&&(x=M);if(k=v+1,x-e>u((s-t)/k))throw new RangeError("Overflow: input needs wider integers to process");for(t+=(x-e)*k,e=x,q=0;O>q;++q){if(M=r[q],e>M&&++t>s)throw new RangeError("Overflow: input needs wider integers to process");if(M===e){for(g=t,m=a;!0&&(C=w>=m?h:m>=w+d?d:m-w,!(C>g));m+=a)$=g-C,E=a-C,b.push(i(l(C+$%E,0))),g=u($/E);b.push(i(l(g,0))),w=n(t,k,v===y),t=0,++v}}++t,++e}return b.join("")}},{"./lib/adapt":3,"./ucs2/decode":4}],3:[function(r,e,t){"use strict";var o=Math.floor,n=36,i=1,u=26,s=700,a=38,f=n-i;e.exports=function(r,e,t){var i=0;for(r=t?o(r/s):r>>1,r+=o(r/e),i=0;r>f*u>>1;i+=n)r=o(r/f);return o(i+(f+1)*r/(r+a))}},{}],4:[function(r,e,t){"use strict";e.exports=function(r){for(var e,t,o=[],n=0,i=r.length;i>n;)e=r.charCodeAt(n++),e>=55296&&56319>=e&&i>n?(t=r.charCodeAt(n++),56320===(64512&t)?o.push(((1023&e)<<10)+(1023&t)+65536):(o.push(e),n--)):o.push(e);return o}},{}],5:[function(r,e,t){"use strict";e.exports=function(r,e){e=e||{};for(var t={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},o=t.parser[e.strictMode?"strict":"loose"].exec(r),n={},i=14;i--;)n[t.key[i]]=o[i]||"";return n[t.q.name]={},n[t.key[12]].replace(t.q.parser,function(r,e,o){e&&(n[t.q.name][e]=o)}),n}},{}],"fink-is-uri":[function(r,e,t){"use strict";var o=r("is-uri"),n=r("parse-uri");e.exports=function(r,e){return r=n(r),"localhost"!==r.hostname&&r.hostname!==e&&o(r,{strictMode:!0})}},{"is-uri":1,"parse-uri":5}]},{},[]);
'use strict'

;(function (Fink, fetch) {
  Fink.isURI = function (uri) {
    return require('fink-is-uri')(uri, Fink.host)
  }

  Fink.route = function (relative) {
    return Fink.endpoint + '/' + relative
  }

  Fink.register = function (uri, cb) {
    return fetch(Fink.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uri: uri })
    })
  }

  Fink.logo = document.querySelectorAll('.fink-logo')[0]

  Fink.buzz = function () {
    Fink.logo.classList.add('toggleBuzz')
    setTimeout(function () {
      Fink.logo.classList.remove('toggleBuzz')
    }, 750)
  }
})(window.Fink, window.fetch)
