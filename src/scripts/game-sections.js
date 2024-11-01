const games = [
  {
    title: "Test",
    shortDescription: "A short description",
    description: "A long description to game"
  }
]

class GameSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  setProperties(title, shortDescription, description) {
    this.title = title;
    this.shortDescription = shortDescription;
    this.description = description;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      section{
        display:flex;
        flex-direction: column;

        height:100vh;
        scroll-snap-align: center;
        
        font-family: "Jaro";
      }

      .game-section__info-container{
        display:flex;
        flex-direction: column;

        background:red;
        flex-grow: 1;
      }

      .info-container__download-button{
        margin-top: auto;
        padding: 20px;
      }
    </style>

    <section>
      <img src="/public/assets/images/covers/chat.png"/>
      <div class="game-section__info-container">
        <h2>${this.title}</h2>
        <h3>${this.shortDescription}</h3>
        <p>${this.description}</p>
        <button class="info-container__download-button">DOWNLOAD</button>
      </div>
    </section>
    `
  }
}

customElements.define("game-section", GameSection);

const fragment = document.createDocumentFragment();

for (let i = 0; i < 10; i++) {
  const gameSection = document.createElement("game-section");
  gameSection.setProperties(`Title ${i}`, `Description ${i}`, `#url${i}`);

  fragment.appendChild(gameSection);
}

// Agora, adiciona o fragmento completo ao container na DOM
document.querySelector("main").appendChild(fragment);