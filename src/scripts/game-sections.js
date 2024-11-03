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

        height: 100dvh;

        font-family: var(--font-family);
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
        gap: 25px;
      }

      .game-section__visitors-info > div{
        display: flex;
        gap: 10px;
      }

      .info-container__texts{
        padding: 20px;
      }

      .info-container__buttons-container{
        display: flex;
        flex-direction: column;

        margin-top: auto;
      }

      .info-container__buttons-container > a{
        margin-top: auto;
        padding: 20px;

        text-align: center;
        text-decoration: none;

        font-size: var(--game-section-buttons-font-size);
        font-family: var(--font-family);
      }

      a, img{
        cursor:pointer;
        transition: scale 0.1s;
      }

      a:hover,  img:hover{
        scale: 1.025;
      }

      a:active, img:active{
        scale: 1;
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

      .icon{
        min-width: var(--game-section-icons-size);
        min-height: var(--game-section-icons-size)

        aspect-ratio:1;
      }

      .icon-view{
        background-image: url("public/assets/images/icons/view.svg"); 
        background-size: contain;
        background-repeat: no-repeat;
      }

      .icon-download{
        background-image: url("public/assets/images/icons/download.svg"); 
        background-size: contain;
        background-repeat: no-repeat;
      }

      h2{
        font-size: var(--game-section-font-title);
      }

      h3, span{
        font-size: var(--game-section-font-subtitle);
      }

      span{
        font-size: var(--game-section-icons-size: 2.5rem);
      }

      @media (min-aspect-ratio:1) {
        section {
          flex-direction: row;
          gap: 20px;
          padding: var(--game-section-padding);
          height: calc(100dvh - var(--game-section-padding) * 2);
        }

        .game-section__cover-image{
          border: 2px solid white;
          flex-grow: 1;
          flex-shrink:0;
        }
      }
    </style>

    <section>
      <img alt="Capa do jogo ${this.title}" class="game-section__cover-image" src="${this.cover_url}"/>
      <div class="game-section__info-container">
        <div class="info-container__texts">
          <h2>${this.title}</h2>
          <h3>${this.description}</h3>
          <div class="game-section__visitors-info">
            <div>
              <div class="icon-view icon"></div>
              <span>${this.views_count}</span>
            </div>
            <div>
              <div class="icon-download icon"></div>
              <span>${this.downloads_count}</span>
            </div>
        </div>
        </div>
        <div class="info-container__buttons-container">
          <a href="${this.url}" class="info-container__goto-page-button">IR PARA A PÁGINA</a>
          <a href="${this.url}/purchase" class="info-container__download-button">BAIXAR</a>
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
  const loadWall = document.body.firstElementChild;
  loadWall.style.opacity = 0;
  setTimeout(() => {
    loadWall.remove();
  }, 2000);
}

async function getApiData() {
  const res = await fetch("https://kennis-itch-io-api.onrender.com/my-games");
  const games = await res.json();

  createGameSections(games);
}

getApiData();