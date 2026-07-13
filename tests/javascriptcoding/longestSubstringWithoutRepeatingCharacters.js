function longestUniqueSubStringlength(str){
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

function longestUniqueSubstring(str) {
  let left = 0;
  let seen = new Set();
  let longest = '';

  for (let right = 0; right < str.length; right++) {
    while (seen.has(str[right])) {
      seen.delete(str[left]);
      left++;
    }
    seen.add(str[right]);

    if (right - left + 1 > longest.length) {
      longest = str.slice(left, right + 1);
    }
  }

  return longest;
}

console.log(longestUniqueSubstring("abcabcbb")); // "abc"
console.log(longestUniqueSubstring("bbbbb")); // "b"
console.log(longestUniqueSubstring("pwwkew")); // "wke"


/*We use a sliding window with two pointers (left and right). As right moves forward, we add characters to a Set. 
If a duplicate appears, we move left forward and remove characters until the duplicate is gone.
At each step, we check if the current window is the longest substring without repeating characters.*/