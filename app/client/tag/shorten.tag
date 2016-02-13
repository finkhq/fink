<shorten>
  <section id="shorten-search" class="container" hide="{isFetched}">
    <form id="shorten-form" onsubmit={ send }>
      <fieldset>
        <input oninput={ edit } id="shorten-field" type="search" taborder="1" placeholder="Paste a link to shorten it" autofocus>
        <button id="shorten-button" class="button-primary" taborder="2" onclick={ send }>
          <span class=>Shorten</span>
          <span id="spinner" class="hide"></span>
        </button>
      </fieldset>
    </form>
  </section>

  <section id="shorten-results" class="container" show="{isFetched}">
    <div class="shorten-box container">
      <label>URL Shorten</label>
      <input value={hash} id="uri-hash" class="shorten-text" type="text" onClick="this.select();" readonly>
      <button class="copy-button" data-clipboard-target="#uri-hash">
        <img class="copy-clipboard" src="assets/images/clipboard.png" alt="Copy to clipboard">
      </button>
    </div>

    <div class="shorten-box container">
      <label>URL Shorten Emojify</label>
      <input value={hashEmoji} id="uri-hash-emoji" class="shorten-text" type="text" onClick="this.select();"readonly>
      <button class="copy-button" data-clipboard-target="#uri-hash-emoji">
        <img class="copy-clipboard" src="assets/images/clipboard.png" alt="Copy to clipboard">
      </button>
    </div>
  </section>

  <script>

    this.isFetched = false

    edit(e) {
      this.uri = e.target.value
    }

    this.resolveURI = function(hash, hashEmoji) {
      new Clipboard('.copy-button')
      this.hash = Fink.path(hash)
      this.hashEmoji = Fink.path(hashEmoji)
      this.isFetched = true
      this.update()
    }

    send(e) {
      if (!Fink.isURI(this.uri)) return Fink.buzz()
      var _this = this

      this['shorten-button'].classList.add('in-action')
      this.spinner.classList.remove('hide')
      this.spinner.classList.add('show')

      Fink.register(this.uri)
      .then(function(json) {
        _this.resolveURI(json.data.hash, json.data.hashEmoji)
      })
    }

  </script>
</shorten>
