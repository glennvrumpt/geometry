const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomRGB = () => {
  const minColor = 0;
  const maxColor = 256;

  const red = getRandomInt(minColor, maxColor);
  const green = getRandomInt(minColor, maxColor);
  const blue = getRandomInt(minColor, maxColor);

  return `rgb(${red}, ${green}, ${blue})`;
};

export { getRandomRGB, getRandomInt };
