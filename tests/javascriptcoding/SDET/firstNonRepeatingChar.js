function charfrequency(str){
    return [...str].reduce((obj, char) =>{
        obj[char] = (obj[char] || 0) +1
        return obj
    }, {});

}
function findnonRepeatingChar(str) {
    const freq = charfrequency(str);
    for (let char of str) {
        if (freq[char] === 1) {
            return char;
        }
    }
    return null;
}

function firstNonRepeatingChar(str) {
  const freq = [...str].reduce((obj, ch) => {
    obj[ch] = (obj[ch] || 0) + 1;
    return obj;
  }, {});

  return [...str].find(ch => freq[ch] === 1) || null;
}

console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("teeter")); // "r"