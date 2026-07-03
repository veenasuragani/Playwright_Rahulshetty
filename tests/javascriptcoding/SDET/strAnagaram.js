function anagaram(str1, str2){
    const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
    return normalize(str1) === normalize(str2);
}

console.log(anagaram('listen', 'silent')); // true
console.log(anagaram('triangle', 'integral')); // true
console.log(anagaram('apple', 'pale')); // false