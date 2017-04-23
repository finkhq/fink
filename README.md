# fink

<p align="center">
  <br>
  <img src="https://avatars2.githubusercontent.com/u/16745034" alt="fink">
  <br>
  <br>
</p>

![Last version](https://img.shields.io/github/tag/finkhq/fink.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/finkhq/fink/master.svg?style=flat-square)](https://travis-ci.org/finkhq/fink)
[![Dependency status](http://img.shields.io/david/finkhq/fink.svg?style=flat-square)](https://david-dm.org/finkhq/fink)
[![Dev Dependencies Status](http://img.shields.io/david/dev/finkhq/fink.svg?style=flat-square)](https://david-dm.org/finkhq/fink#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/fink.svg?style=flat-square)](https://www.npmjs.org/package/fink)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/kikobeats)

> URI Shortener for Massses.

Fink is a [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) shortener. The idea is similar to a [URL](https://en.wikipedia.org/wiki/URL) shortener but supporting redirect between protocols. (For example, redirecting from HTTP → BiTtorrent).

The features of this project are:

* Extremely Faster (Based on [LevelDB](https://github.com/finkhq/fink-level#fink-level)).
* Small minification as possible (Based on [Base58](https://github.com/finkhq/fink-shortener#fink-shortener)) encode.
* Unique identifier per URI. Not possible store duplicates!
* Total clicks associated with URI.
* Redirection between protocols. (For example: HTTP → BiTtorrent).
* Emojify version of the URI 😁🤓😎.

## License

MIT © [fink](http://xn--rn8h.ws/)
