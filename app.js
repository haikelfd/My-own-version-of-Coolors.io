//Global selections and variables
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

//ADD our event listeners
sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});
// Functions

// Color generator
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

//

function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();
    // ADD the color to the bg
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    // Check for contrast
    checkTextContrast(randomColor, hexText);
    // Initial Colorize Sliders

    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, brightness, saturation);
  });
}
function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}
function colorizeSliders(color, hue, brightness, saturation) {
  //Scale Saturation
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);
  //Scale Brightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  //IUpdate Input Colors
  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(
    0
  )},${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(
    0
  )},${scaleBright(0.5)},${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,7,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204))`;
}
function hslControls(e) {
  const index =
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-saturation ") ||
    e.target.getAttribute("data-bhue");
}
randomColors();
