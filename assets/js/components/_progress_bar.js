const targetWidths = [33, 51, 95]; // Tableau centralisé pour les largeurs cibles
const delay = 500;
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    targetWidths.forEach((width, index) => {
      HandleProgresseBar(document.querySelector(`#bar_${index + 1}`), width);
    });
  }, delay);

  changeValue();
});

/**
 *
 */
const changeValue = function () {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    const bar = document.getElementById(`bar_${index + 1}`);
    const parentBarElement = bar.parentElement;
    input.value = targetWidths[index];

    input.addEventListener("change", () => {
      let value = parseInt(input.value);
      let parentWidth = parentBarElement.offsetWidth;
      let childWidth = bar.offsetWidth;
      let barWidth = ((childWidth / parentWidth) * 100).toFixed(0);
      refreshProgressBar(bar, parseInt(barWidth), value);
    });
  });
};

/**
 * Anime la largeur des barres de progression au chargement de la page.
 * @param {HTMLElement} bar
 * @param {int} targetWidth
 */
const HandleProgresseBar = function (bar, targetWidth) {
  animateBar(bar, 0, targetWidth, 500);
};

/**
 * Anime la largeur des barres de progression au changement de valeur des inputs.
 * @param {HTMLElement} bar - barre de progression
 * @param {int} Width - Largeur actuelle de l'élément
 * @param {int} targetWidth - largeur cible provenant de la valeur de l'input
 */
const refreshProgressBar = function (bar, currentWidth, targetWidth) {
  animateBar(bar, currentWidth, targetWidth, 100);
};

/**
 * Fonction d'animation des barres de progression.
 * @param {HTMLElement} bar - Barre de progression
 * @param {int} startWidth - Largeur de départ
 * @param {int} targetWidth - Largeur cible
 * @param {int} duration - Durée de l'animation en millisecondes
 */
const animateBar = function (bar, startWidth, targetWidth, duration) {
  const barSpan = bar.querySelector("span");
  const startTime = performance.now();

  const interpolateColor = (startColor, endColor, factor) => {
    const result = startColor.map((start, index) =>
      Math.round(start + (endColor[index] - start) * factor)
    );
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  };

  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentWidth = startWidth + (targetWidth - startWidth) * progress;
    bar.style.width = currentWidth + "%";

    // Interpolation des couleurs
    let color;
    if (currentWidth <= 35) {
      color = interpolateColor([57, 57, 57], [255, 0, 0], currentWidth / 35); // Blanc à Rouge
    } else if (currentWidth <= 50) {
      color = interpolateColor(
        [255, 0, 0],
        [0, 255, 0],
        (currentWidth - 35) / (50 - 35)
      ); // Rouge à Vert
    } else {
      color = interpolateColor(
        [0, 255, 0],
        [0, 128, 255],
        (currentWidth - 50) / (100 - 50)
      ); // Vert à Bleu
    }

    bar.style.backgroundColor = color; // Applique la couleur interpolée
    barSpan.textContent = Math.round(currentWidth) + "%";

    if (progress < 1) {
      requestAnimationFrame(animate); // Continue l'animation
    }
  };

  requestAnimationFrame(animate); // Démarre l'animation
};
