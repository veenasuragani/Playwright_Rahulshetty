function charFrequency(str) {
    return [...str.toLowerCase()].reduce((obj, char) =>{
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

/*
charFrequency returns as below
[
  ['a', 3],
  ['b', 1],
  ['c', 5]
]

converts that into array with object entries  and sorts that 
[
  ['c', 5],   
  ['a', 3],
  ['b', 1]
]

[0] returns the first element of the array which is ['c', 5]


*/