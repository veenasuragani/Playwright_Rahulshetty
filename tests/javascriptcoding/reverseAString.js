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