function charFrequency(str) {
    return [...str].reduce((obj, char) =>{
        obj[char] = (obj[char] || 0) +1
        return obj
    }, {})
}

function mostFrequentChar(str) {
    const charfreqobject = charFrequency(str);
    return Object.entries(charfreqobject)
    .sort((a,b) => b[1] - a[1])[0];
}

console.log(charFrequency("veena")) // { v: 1, e: 2, n: 1, a: 1 }
console.log(mostFrequentChar("veena")) // ['e', 2]
console.log(mostFrequentChar("hello world")) // ['l', 3]