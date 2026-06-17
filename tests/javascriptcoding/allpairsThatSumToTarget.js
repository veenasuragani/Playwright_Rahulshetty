function findPairs(arr, target){
    const seen = new Set();
    const pairs = [];
    for(const num of arr){
        const compliment = target - num;
        if(seen.has(compliment)){
            pairs.push([compliment, num]);
        }
        seen.add(num);
    }
    return pairs;
}

console.log(findPairs([1,2,3,4,5], 5)); // [[2,3],[1,4]]
console.log(findPairs([1,2,3,4,5], 10)); // []
console.log(findPairs([1,2,3,4,5,0], 5)); // [[2,3],[1,4],[0,5]]