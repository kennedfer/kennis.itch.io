async function getCoverImages() {
  const response = await fetch("https://kennis-itch-io-api.onrender.com/game-covers");
  const images = await response.json();

  createCarrousel(images);
}

function createCarrousel(images) {
  const carrouselGroup = document.createElement("div");

  carrouselGroup.className = "carrousel__group";

  for (const imageUrl of images) {
    const image = document.createElement("img");

    image.src = imageUrl;
    image.className = "carrousel__item";

    carrouselGroup.appendChild(image);
  }

  carrouselContainer.appendChild(carrouselGroup);
  carrouselContainer.appendChild(carrouselGroup.cloneNode({ deep: true }));
}

const carrouselContainer = document.getElementById("carrousel");

getCoverImages();