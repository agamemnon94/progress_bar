window.addEventListener("DOMContentLoaded", () => {
  HandleProgresseBar(bar_1, 33);
  HandleProgresseBar(bar_2, 51);
  HandleProgresseBar(bar_3, 95);
});

const HandleProgresseBar = function (bar, targetWidth) {
  const barSpan = bar.querySelector("span");
  let startWidth = 0; // Width de laquelle on part
  const duration = 1000; // Durée de l'animation (en millisecondes)
  const startTime = performance.now(); // Pour le calcul de temps : https://developer.mozilla.org/fr/docs/Web/API/Performance/now

  const interpolateColor = (startColor, endColor, factor) => {
    const result = startColor.map((start, index) => {
      return Math.round(start + (endColor[index] - start) * factor);
    });
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  };

  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Limite à 1 (100%)
    const currentWidth = startWidth - (startWidth - targetWidth) * progress;
    bar.style.width = currentWidth + "%";

    // Interpolation des couleurs
    let color;
    if (currentWidth <= 36) {
      color = interpolateColor([255, 255, 255], [255, 0, 0], currentWidth / 35); // Blanc à Rouge
    } else if (currentWidth <= 50) {
      color = interpolateColor(
        [255, 0, 0],
        [0, 255, 0],
        (currentWidth - 35) / (50 - 35)
      ); // Rouge à vert
    } else {
      color = interpolateColor(
        [0, 255, 0],
        [0, 128, 255],
        (currentWidth - 50) / (100 - 50)
      ); // Vert à bleu
    }

    bar.style.backgroundColor = color; // Applique la couleur interpolée
    barSpan.textContent = Math.round(currentWidth) + "%";

    if (progress < 1) {
      requestAnimationFrame(animate); // Continue l'animation
    }
  };

  requestAnimationFrame(animate); // Démarre l'animation
};
