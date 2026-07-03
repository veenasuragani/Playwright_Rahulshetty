function findpalindromicSubstrings(str) {
    const result = [];
    function expand( left, right){
        while(left >=0 && right< str.length && str[left] === str[right]){
            result.push(str.slice(left, right+1));
            left--;
            right++;
        }
    }

    for(let i=0; i<str.length; i++){
        expand(i, i); 
        expand(i, i+1);
    }
    return result;
}

function highestPalindromicSubstring(str) {
    const palindromicSubstrings = findpalindromicSubstrings(str);
    let longest = '';  
    for(const substring of palindromicSubstrings){
        if(substring.length > longest.length){
            longest = substring;
        }
    }
    return longest;
}

console.log(findpalindromicSubstrings("ababa")); // ['a', 'aba', 'ababa', 'b', 'bab', 'a']
console.log(highestPalindromicSubstring("ababa")); // 'ababa'

/*
i = 0
Odd center: expand(0, 0)
left=0, right=0 → 'a' === 'a' → push "a"
left=-1, right=1 → left out of bounds → stop
Palindromes: ["a"]
Even center: expand(0, 1)
left=0, right=1 → 'a' !== 'b' → stop

i = 1
Odd center: expand(1, 1)
left=1, right=1 → 'b' === 'b' → push "b"
left=0, right=2 → 'a' !== 'b' → stop
Palindromes: ["a", "b"]
Even center: expand(1, 2)
left=1, right=2 → 'b' === 'b' → push "bb"
left=0, right=3 → 'a' === 'a' → push "abba"
left=-1, right=4 → left out of bounds → stop
Palindromes: ["a", "b", "bb", "abba"]

i = 2
Odd center: expand(2, 2)
left=2, right=2 → 'b' === 'b' → push "b"
left=1, right=3 → 'b' !== 'a' → stop
Palindromes: ["a", "b", "bb", "abba", "b"]
Even center: expand(2, 3)
left=2, right=3 → 'b' !== 'a' → stop

*/
