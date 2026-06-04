import Person from './Person.js';

class Student extends Person{
    constructor(name, age, grade){
        super(name, age);
        this.grade = grade;
    }

    getDetails(){
        return `${super.getDetails()}, Grade: ${this.grade}`;
    }
}

export default Student;