const Students = [ 
    {name: 'John', score: 25}, 
    {name: 'Jane', score: 92}, 
    {name: 'Bob', score: 35}, 
    {name: 'Alice', score: 90} 
];

const passedStudents = students.filter(student=>student.score>36)
console.log(passedStudents); //output: [ { name: 'Jane', score: 92 }, { name: 'Alice', score: 90 } ]

const uppercasedNames = passedStudents.map(student=>student.name.toUpperCase()) 
console.log(uppercasedNames); //output: [ 'JANE', 'ALICE' ]

const totalScore = passedStudents.reduce((acc, student)=>{
    acc = acc + student.score;
    return acc;
}, 0)

//const totalScore = passedStudents.reduce((acc, student) => acc + student.score, 0)

console.log(totalScore); //output: 182
