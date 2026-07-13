function anagaram(str1, str2){
    const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
    return normalize(str1) === normalize(str2);
}

console.log(anagaram('listen', 'silent')); // true
console.log(anagaram('triangle', 'integral')); // true
console.log(anagaram('apple', 'pale')); // false

function anagaram2(str1, str2){
    if(str1.length !== str2.length) return false;
    const map = {};
    for(let char of str1){
        map[char] = (map[char] || 0) + 1;
    }
    for(let char of str2){
        if(!map[char]) return false;
        map[char]--;
    }
    return true;
}
console.log(anagaram2('listen', 'silent')); // true