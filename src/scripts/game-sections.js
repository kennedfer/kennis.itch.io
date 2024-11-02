class GameSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  setProperties({ title, description, published_at, cover_url, downloads_count, views_count, url, is_android }) {
    this.title = title;
    this.description = description;
    this.published_at = published_at;
    this.cover_url = cover_url;
    this.downloads_count = downloads_count;
    this.views_count = views_count;
    this.url = url;
    this.is_android = is_android;

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      *{
        margin: 0;
        padding: 0;
      }

      section{
        display:flex;
        flex-direction: column;
        gap:0;

        height:100vh;
        scroll-snap-align: center;
        
        font-family: var(--font-family);
      }

      .game-section__cover-image{
        // border: 20px solid var(--primary-color);
      }

      .game-section__info-container{
        display:flex;
        flex-direction: column;
        color:  var(--secondary-color);

        background: var(--primary-color);
        flex-grow: 1;
      }

      
      .game-section__visitors-info{
        display: flex;
        gap: 5px;
      }

      .game-section__visitors-info > img{
        width: 18px;
        aspect-ratio: 1;
        margin-right: -6px;

        padding: 5px;
      }

      .info-container__texts{
        padding: 20px;
      }

      .info-container__buttons-container{
        display: flex;
        flex-direction: column;

        margin-top: auto;
        background:red;
      }

      .info-container__buttons-container > button{
        margin-top: auto;
        padding: 20px;

        font-size: var(--mobile-buttons-font-size);
        font-family: var(--font-family);
      }

      .info-container__download-button{
        background-color: var(--secondary-color);
        color:  var(--primary-color);
        border:none;
        border-top: 2px solid var(--primary-color);
      }

      .info-container__goto-page-button{
        color: var(--secondary-color);
        background-color:  var(--primary-color);
        border: 2px solid var(--secondary-color);
      }
    </style>

    <section>
      <img class="game-section__cover-image" src="${this.cover_url}"/>
      <div class="game-section__info-container">
        <div class="info-container__texts">
          <h2>${this.title}</h2>
          <h3>${this.description}</h3>
          <div class="game-section__visitors-info">
            <img src="/public/assets/images/icons/view.svg"/>
            <span>${this.views_count}</span>
            <img src="/public/assets/images/icons/download.svg"/>
            <span>${this.downloads_count}</span>
        </div>
        </div>
        <div class="info-container__buttons-container">
          <button class="info-container__goto-page-button">IR PARA A PÁGINA</button>
          <button class="info-container__download-button">BAIXAR</button>
        </div>
      </div>
    </section>
    `
  }
}

customElements.define("game-section", GameSection);

function createGameSections(games) {
  const fragment = document.createDocumentFragment();

  for (let game of games) {
    const gameSection = document.createElement("game-section");
    gameSection.setProperties(game);

    fragment.appendChild(gameSection);
  }

  document.querySelector("main").appendChild(fragment);
}

async function getApiData() {
  const res = await fetch("https://kennis-itch-io-api.onrender.com/my-games");
  const games = await res.json();

  createGameSections(games);
}

getApiData();