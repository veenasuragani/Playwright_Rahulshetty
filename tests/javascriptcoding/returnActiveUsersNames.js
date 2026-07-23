function namesOfActiveUserswithSortingByAge(users){
    return users
    .filter(item=> item.active===true)
    .sort((a,b)=>a.age-b.age)
    .map(item=>item.name);
}

const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 32, active: false },
  { id: 3, name: "Charlie", age: 29, active: true },
  { id: 4, name: "David", age: 41, active: false }
];

console.log(namesOfActiveUserswithSortingByAge(users)); // Output: ["Alice", "Charlie"]
