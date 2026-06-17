
//primitives
function removeDuplicates(Arr){
    return [...new Set(Arr)]
}

function removeDuplicateObjects(Arr, key){
    return [...new Map(Arr.map(item => [item[key], item])).values()]
}

console.log(removeDuplicates([1, 2, 2, 3, 3, 4]));         // [1,2,3,4]
console.log(removeDuplicates(['a', 'b', 'a', 'c']));        // ['a','b','c']

const users = [{id:1,name:'Alice'},{id:2,name:'Bob'},{id:1,name:'Alice'}];
console.log(removeDuplicateObjects(users, 'id'));            // [{id:1,...},{id:2,...}]

