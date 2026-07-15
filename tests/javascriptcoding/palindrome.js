function palindrome(str){
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}

console.log(palindrome('A man, a plan, a canal, Panama')); // true
console.log(palindrome('No lemon, no melon')); // true
console.log(palindrome('Hello World')); //false 

//without using built-in methods
function palindrome2(str){
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let reversed = [...clean].reduceRight((acc, c) => acc+c, '');
    return clean === reversed;
}


/*
"hello".split('')      // ['h', 'e', 'l', 'l', 'o']
.reverse()             // ['o', 'l', 'l', 'e', 'h']
.join('')              // "olleh"
*/
console.log(palindrome2('A man, a plan, a canal, Panama')); // true