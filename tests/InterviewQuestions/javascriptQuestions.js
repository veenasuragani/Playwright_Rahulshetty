// 1. Can a JavaScript object hold a function as a property? Explain with an example.
const person = {
    name: 'veena',
    age: '24',
    greet: function(){
        console.log('Hello, i am ' +this.name);
    }
}

person.name;
person.greet();

// 2. What are anonymous functions in JavaScript? Define their syntax and implementation
//normal function
function add(a, b){
    return a+b;
}

//anonymous function
const add2 = function(a, b){
    return a+b;
}
console.log(add(2,3));
console.log(add2(2,3));

// 3. What is the difference between var, const, and let? Explain with an example.

//var is global scope and can be re-declared and updated
//let is block scope and can be updated but not re-declared with in the same scope
//const is block scope and cannot be updated or re-declared

function variableTest1(){
    var x=1;
    if(true){
        var x=2; //same variable, re-declared and updated
        console.log('inside if block', x); //2
    }
    console.log('outside if block', x); //2
}
variableTest1();

function variableTest2(){
    let y=1;
    if(true){
        let y=2; //different variable, block scope, can be updated but not re-declared with in the same scope
        console.log('inside if block', y); //2
    }
    y=3; //updating the outer y variable
    console.log('outside if block', y); //3
}
variableTest2();

function variableTest3(){
    const z=1;  
    if(true){
        const z=2; //different variable, block scope, cannot be updated or re-declared
        console.log('inside if block', z); //2
    }   
    // z=3; //error: cannot update a const variable
    console.log('outside if block', z); //1
}
variableTest3();

//4. Where are the push, pop, slice, shift, and unshift methods used when accessing array elements?

const fruits = ['apple', 'banana', 'cherry', 'date'];

//push - adds an element to the end of the array
fruits.push('elderberry');
console.log('after push', fruits); // ['apple', 'banana', 'cherry', 'date', 'elderberry']

//pop - removes the last element from the array
const lastFruit = fruits.pop();
console.log('after pop', fruits); // ['apple', 'banana', 'cherry', 'date']
console.log('popped element', lastFruit); // 'elderberry'

//unshift - adds an element to the beginning of the array
fruits.unshift('avocado');
console.log('after unshift', fruits); // ['avocado', 'apple', 'banana', 'cherry', 'date']

//shift - removes the first element from the array
const firstFruit = fruits.shift();
console.log('after shift', fruits); // ['apple', 'banana', 'cherry', 'date']
console.log('shifted element', fristFruit); // 'avocado'

//slice - returns a shallow copy of a portion of an array into a new array object
const citrusFruits = fruits.slice(1, 3); // creates a new array with elements from index 1 to 2 (not including index 3)
console.log('citrus fruits', citrusFruits); // ['banana', 'cherry'] - original array remains unchanged
console.log('original fruits array', fruits); // ['apple', 'banana', 'cherry', 'date'] - original array remains unchanged

//indexOf - returns the first index at which a given element can be found in the array, or -1 if it is not present
const indexOfCherry = fruits.indexOf('cherry');
console.log('index of cherry', indexOfCherry); // 2

//Iteration methods - forEach, map, filter, reduce
//forEach - executes a provided function once for each array element
fruits.forEach((fruit, index) => {
    console.log(`fruit at index ${index} is ${fruit}`);
});
//output:
// fruit at index 0 is apple
// fruit at index 1 is banana
// fruit at index 2 is cherry
// fruit at index 3 is date

//5. Is JavaScript Asynchronous? Prove with an example
console.log('start');

setTimeout(() => {
    console.log('This is an asynchronous message');
}, 2000);   
console.log('end'); 
//output:
// start
// end
// This is an asynchronous message (after 2 seconds)

//6. What are callback functions in JavaScript?
/* A callback function is a function that is passed as an argument to another function 
and is executed after some operation has been completed. It allows you to handle 
asynchronous operations and ensures that certain code runs only after a specific task is finished.
*/
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'veena' };
        callback(data); // calling the callback function with the fetched data
    }, 2000);   
}
function displayData(data) {
    console.log('Fetched data:', data);
}   
function modifyData(data) {
    data.name = data.name.toUpperCase();
    console.log('Modified data:', data);
}

fetchData(displayData); // passing displayData as a callback function to fetchData
fetchData(modifyData); // passing modifyData as a callback function to fetchData

//output:
// Fetched data: { id: 1, name: 'veena' } (after 2 seconds)
// Modified data: { id: 1, name: 'VEENA' } (after 2 seconds)

//7. What are promises in JavaScript? 
// Explain the difference between callback functions and promises with an example.
function fetchDataWithPromise() {
    // returning a new promise that simulates an asynchronous operation,
    //promise have three states: pending, resolve, rejected
    return new Promise((resolve)=>{
        setTimeout(() => {
            const data = { id: 1, name: 'veena' };
            resolve(data); // resolving the promise with the fetched data
        }, 2000);
    })
}
const data = fetchDataWithPromise();
console.log('data is', data); 
//output: data is { id: 1, name: 'veena' } (after 2 seconds)

//8. Create an inheritance relationship between a parent and child class. 
//9. Explain Super and this keywords in JavaScript with an example.
// Invoke the parent constructor from the child class. 
// Create main.js to call parent class methods from a child class object.
//Created Person, Student and Main classes for example

//10. What is the difference between == and ===?
/* == is the equality operator that compares two values for equality after performing type coercion 
if necessary. It checks for value equality but not type equality.
 === is the strict equality operator that compares two values for both value and type equality. 
 It does not perform type coercion and returns true only if both the value and type are the same.*/
 console.log(5 == '5'); // true (type coercion happens)
 console.log(5 === '5'); // false (no type coercion, different types)
 console.log(null == undefined); // true (type coercion happens)
 console.log(null === undefined); // false (no type coercion, different types)

//11. What is the difference between null and undefined in JavaScript?
let a=null; // null is an assigned value that represents the intentional absence of any object value
let b; // undefined is a variable that has been declared but has not been assigned a value
console.log('a is', a); // a is null
console.log('b is', b); // b is undefined
console.log('type of a', typeof a); //object
console.log('type of b', typeof b); //undefined

//12. A classic programming interview question that involves using array methods (filter, map, reduce), and JavaScript objects.



