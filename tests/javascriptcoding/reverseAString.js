function reverseString(str){
    let reversedString = '';
    for(let i=str.length-1; i>=0; i--){
        reversedString+=str[i];
    }
    return reversedString;
}

const rev=str => [...str].reduceRight((acc, c) => acc+c, '');

const revString = str => str.split('').reverse().join('');
console.log(reverseString('Hello World'));
console.log(rev('Hello World'));
console.log(rev('veenasri'));
console.log(revString('Hello World'));

/*
[...str]  
Converts the string into an array of characters.
"hello" → ['h', 'e', 'l', 'l', 'o']
reduceRight()  
Iterates from right to left over that array.
Callback (acc, c) => acc + c  
Builds the reversed string by adding each character to the accumulator.
Initial value ''  
Starts with an empty string.
*/

/*
str.split('')  
Splits the string into an array of characters.
"hello" → ['h', 'e', 'l', 'l', 'o']
.reverse()  
Reverses the array in place.
['o', 'l', 'l', 'e', 'h']
.join('')  
Joins the reversed array back into a string.
"olleh"
*/