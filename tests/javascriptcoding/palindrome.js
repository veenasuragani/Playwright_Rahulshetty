function palindrome(str){
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}

console.log(palindrome('A man, a plan, a canal, Panama')); // true
console.log(palindrome('No lemon, no melon')); // true
console.log(palindrome('Hello World')); //false 


/*
"hello".split('')      // ['h', 'e', 'l', 'l', 'o']
.reverse()             // ['o', 'l', 'l', 'e', 'h']
.join('')              // "olleh"
*/