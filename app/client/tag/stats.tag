<stats>

  <section id="stats-container" class="container">
    <h3 id="stats-clicks">clicks</h3>
    <h1 id="stats-counter">{ hits }</h1>
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
    this.hits = opts.hits
    this.hash = opts.hash
    this.hashEmoji = opts.hashEmoji
    this.isFetched = true
  </script>
</stats>
