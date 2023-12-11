/**
The Liskov Substitution Principle (LSP) is the third SOLID design principle, named after Barbara Liskov.
It asserts that if a method can accept an object of a base class, it should also accept objects of derived classes without altering the correctness of the program.
The principle emphasizes maintaining a consistent behavior across both base and derived classes.

To illustrate LSP, an example using a Rectangle class is presented. Initially, a Rectangle class is defined with width, height, and methods for calculating area and displaying information.
Later, a Square class is introduced, derived from Rectangle, but it violates LSP as it allows independent modification of width and height.

An attempt to fix the issue involves introducing getters and setters to enforce consistency in the Rectangle and Square classes.
However, this approach still leads to unexpected behavior, violating the Liskov Substitution Principle.
The example demonstrates that introducing derived classes should not break the expected behavior of functions designed for the base class.

The lesson concludes with the suggestion that, in certain cases, a better approach might be to avoid creating separate classes for derived types that violate base class assumptions.
Instead, consider alternative solutions, such as using factory methods or additional checks in the base class, to ensure the Liskov Substitution Principle is adhered to.
The importance of maintaining consistency and not introducing derived classes that break existing functionality is emphasized.
*/

class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  toString() {
    return `${this._width}×${this._height}`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = this._height = value;
  }

  set height(value) {
    this._width = this._height = value;
  }
}

let useIt = function (rc) {
  let width = rc._width;
  rc.height = 10;
  console.log(`Expected area of ${10 * width}, ` + `got ${rc.area}`);
};

let rc = new Rectangle(2, 3);
useIt(rc);

let sq = new Square(5);
useIt(sq);
