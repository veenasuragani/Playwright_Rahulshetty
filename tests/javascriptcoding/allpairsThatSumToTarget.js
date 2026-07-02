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
console.log(findPairs([1,5,3,7,2,4], 6)); // [[5,1],[4,2]]

function findPairswithReduce(arr, target) {
  return arr.reduce(
    ({ seen, pairs }, num) => {
      const complement = target - num;
      if (seen.has(complement)) {
        pairs.push([complement, num]);
      } else {
        seen.add(num);
      }
      return { seen, pairs };
    },
    { seen: new Set(), pairs: [] }
  ).pairs;
}

console.log(findPairswithReduce([1,5,3,7,2,4], 6)); // [[5,1],[4,2]]

/*Iteration 1: num = 1
complement = 5

5 is NOT in seen

add 1 to seen → {1}

pairs = []

Iteration 2: num = 5
complement = 1

1 is in seen → add pair [1,5]

pairs = [[1,5]]

seen stays {1} (we do NOT add 5 because complement matched)

Iteration 3: num = 3
complement = 3

3 is NOT in seen

add 3 → seen = {1,3}

pairs = [[1,5]]

Iteration 4: num = 7
complement = -1

-1 NOT in seen

add 7 → seen = {1,3,7}

pairs = [[1,5]]

Iteration 5: num = 2
complement = 4

4 NOT in seen

add 2 → seen = {1,3,7,2}

pairs = [[1,5]]

Iteration 6: num = 4
complement = 2

2 is in seen → add pair [2,4]

pairs = [[1,5], [2,4]]
*/