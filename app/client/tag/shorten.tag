<shorten>
  <section id="shorten-container" class="container">
    <form id="shorten-form" onsubmit={ send }>
      <fieldset>
        <input oninput={ edit } id="shorten-field" type="search" taborder="1" placeholder="Paste a link to shorten it" autofocus>
        <button name="searchButton" id="shorten-button" class="button-primary" taborder="2" onclick={ send }>
          <span class=>Shorten</span>
          <span id="spinner" class="hide"></span>
        </button>
      </fieldset>
    </form>
  </section>

  <section id="shorten-link" class="container">
    <label>URL Shorten</label>
    <input class="shorten-text" type="text" value="http://imgur.com/fbdvHtT" onClick="this.select();" readonly>
    <button class="copy-button" data-clipboard-target="#foo">
      <img class="copy-clipboard" src="assets/images/clipboard.png" alt="Copy to clipboard">
    </button>
  </section>

  <section id="shorten-link" class="container">
    <label>URL Shorten Emojify</label>
    <input class="shorten-text" type="text" value="http://imgur.com/fbdvHtT" onClick="this.select();" readonly>
    <button class="copy-button" data-clipboard-target="#foo">
      <img class="copy-clipboard" src="assets/images/clipboard.png" alt="Copy to clipboard">
    </button>
  </section>

  <script>

    edit(e) {
      this.uri = e.target.value
      this.send()
    }

    send(e) {
      if (Fink.isValidURI(this.uri)) {
        this['shorten-button'].classList.add('in-action')
        this.spinner.classList.remove('hide')
        this.spinner.classList.add('show')

        Fink.register(this.uri).then(function(json) {
          console.log(json);
        })
      }
    }

  </script>
</shorten>
