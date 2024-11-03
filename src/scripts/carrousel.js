async function getCoverImages() {
  const response = await fetch("https://kennis-itch-io-api.onrender.com/game-covers");
  const images = await response.json();

  createCarrousel(images);
}

function createCarrousel(images) {
  const carrouselGroup = document.createElement("div");

  carrouselGroup.className = "carrousel__group";

  for (const { cover, title } of images) {
    const image = document.createElement("img");

    image.src = cover;
    image.className = "carrousel__item";
    image.alt = `Capa do jogo "${title}"`

    carrouselGroup.appendChild(image);
  }

  carrouselContainer.appendChild(carrouselGroup);
  carrouselContainer.appendChild(carrouselGroup.cloneNode({ deep: true }));
}

const carrouselContainer = document.getElementById("carrousel");

getCoverImages();