function longestUniqueSubString(str){
    let map = new Map();
    let left = 0;
    let maxLength =0;

    for(let right =0; right < str.length; right++){
        const char = str[right];
        if(map.has(char) && map.get(char) >=left){
            left =map.get(char) +1;
        }
        map.set(char, right);
        maxLength = Math.max(maxLength, right - left +1);
    }
    return maxLength;
}

console.log(longestUniqueSubString("abcabcbb"));
console.log(longestUniqueSubString("bbbbb"));
console.log(longestUniqueSubString("pwwkew"));