//Remove duplicates first, sort descending, then pick index 1. Edge case: what if all elements are the same?

function secondHighest(arr){
    const unique=[...new Set(arr)];
    unique.sort((a,b) => b-a);
    return unique[1];
}

//Tests
console.log(secondHighest([1,2,3,4,5])); //4
console.log(secondHighest([5,5,5,5])); //undefined
console.log(secondHighest([1,2,3,4,5,5])); //4  
console.log(secondHighest([1,9,7,3,8])); //8
