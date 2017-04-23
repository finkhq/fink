<shorten>
  <section class="pa4-l pa3-m">
    <form class="mw7 center br2-ns ba b--black-10" onsubmit={send}>
      <fieldset class="cf bn ma0 pa0">
        <div class="cf">
          <input ref='searchbox' taborder="1" class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Paste a link to shorten it" type="text" value="" oninput={edit} autofocus autosave name="s" required>
          <button taborder="2" class="f6 f5-l button-reset fl pv3 tc bn bg-dark-pink dim white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" onclick={send}>
            <span class="pr2">Shorten</span>
            <span ref='spinner' class="dots"></span>
          </button>
        </div>
      </fieldset>
    </form>
  </section>

  <script>

    edit(e) {
      this.uri = e.target.value
    }

    this.resolveURI = function(json) {
      location.pathname = json.data.hash + '+'
    }

    send(e) {
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
    }

  </script>
</shorten>
