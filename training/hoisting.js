// https://medium.com/@stasonmars/%D1%80%D0%B0%D0%B7%D0%B1%D0%B8%D1%80%D0%B0%D0%B5%D0%BC%D1%81%D1%8F-%D1%81-%D0%BF%D0%BE%D0%B4%D0%BD%D1%8F%D1%82%D0%B8%D0%B5%D0%BC-hoisting-%D0%B2-javascript-7d2d27bc51f1

/*
var hoist;
console.log(hoist); // Вывод: undefined
hoist = 'The variable has been hoisted.';
*/

/*
function hoist() {
    console.log(message);
    var message='Hoisting is all the rage!'
}

hoist();
*/

/*

console.log(hoist); // Вывод: ReferenceError: hoist is not defined ...
let hoist = 'The variable has been hoisted.';

let hoist;
console.log(hoist); // Вывод: undefined
hoist = 'Hoisted'

const PI = 3.142;
PI = 22/7; // Давайте изменим значение PI
console.log(PI); // Вывод: TypeError: Assignment to constant variable.

console.log(hoist); // Output: ReferenceError: hoist is not defined
const hoist = 'The variable has been hoisted.';

*/


/*

hoisted(); // Вывод: "This function has been hoisted."
function hoisted() {
  console.log('This function has been hoisted.');
};

expression(); //Вывод: "TypeError: expression is not a function
var expression = function() {
  console.log('Will this work?');
};

*/

/*
var Frodo = new Hobbit();
Frodo.height = 100;
Frodo.weight = 300;
console.log(Frodo); // Вывод: ReferenceError: Hobbit is not defined

class Hobbit {
  constructor(height, weight) {
    this.height = height;
    this.weight = weight;
  }
}

var Square = new Polygon();
Square.height = 10;
Square.width = 10;
console.log(Square); // Вывод: TypeError: Polygon is not a constructor

var Polygon = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

*/