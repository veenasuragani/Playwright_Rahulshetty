function countWords(text) {
  const words = text.toLowerCase().split(/\s+/);   // split by spaces
  const map = {};

  for (const word of words) {
    map[word] = (map[word] || 0) + 1;
  }

  return map;
}

console.log(countWords("apple banana apple orange banana apple"));


function countWords(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .reduce((map, word) => {
      map[word] = (map[word] || 0) + 1;
      return map;
    }, {});
}

console.log(countWords("red blue red green blue red"));
