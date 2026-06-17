// Built-in (ES2019+)
[1, [2, [3, [4]]]].flat(Infinity); // [1,2,3,4]

function flatten(arr){
    return arr.reduce((acc, val)=>
         Array.isArray(val) 
        ? acc.concat(flatten(val)) 
        : acc.concat(val)
    , []);
}

console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1,2,3,4,5]
console.log(flatten([[1,2],[3,[4,5]]]));         // [1,2,3,4,5]