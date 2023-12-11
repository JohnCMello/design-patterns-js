/**
The Interface Segregation Principle (ISP) is discussed in the context of JavaScript, which lacks explicit interfaces due to its use of duck typing.
ISP suggests that interfaces should be split into smaller parts to prevent clients from implementing more than they need.
A hypothetical scenario involves a document class with clients implementing devices like printers, scanners, and multifunction printers.

An attempt is made to formalize an interface using a machine class, but issues arise when clients, such as an old-fashioned printer, don't require all the methods.
Leaving methods blank or throwing errors violates the Principle of Least Surprise, causing user confusion.

The solution involves breaking down interfaces into smaller parts. For example, creating a printer interface with a print method and a separate scanner interface with a scan method.
Clients can then implement only the interfaces they need, avoiding unnecessary method implementations.

The discussion notes the limitation of single inheritance in JavaScript and mentions the challenge of multiple inheritance.
An attempt at emulation using mixin classes is discussed but considered impractical for interfaces.

The Interface Segregation Principle is acknowledged, but its direct applicability in JavaScript, given its dynamic and flexible nature, is questioned.
The takeaway is that while ISP is relevant in other languages, its application in JavaScript may be less straightforward due to the absence of formal interfaces.
*/

var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          );
      });
  };
  mixins.forEach((mixin) => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

class Document {}

class Machine {
  constructor() {
    if (this.constructor.name === 'Machine')
      throw new Error('Machine is abstract!');
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    //
  }

  fax(doc) {
    //
  }

  scan(doc) {
    //
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    let msg = `${name} is not implemented!`;
    super(msg);
    // maintain proper stack trace
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, NotImplementedError);
    // your custom stuff here :)
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // ok
  }

  // omitting this is the same as no-op impl

  // fax(doc) {
  //   // do nothing
  // }

  scan(doc) {
    // throw new Error('not implemented!');
    throw new NotImplementedError('OldFashionedPrinter.scan');
  }
}

// solution
class Printer {
  constructor() {
    if (this.constructor.name === 'Printer')
      throw new Error('Printer is abstract!');
  }

  print() {}
}

class Scanner {
  constructor() {
    if (this.constructor.name === 'Scanner')
      throw new Error('Scanner is abstract!');
  }

  scan() {}
}

class Photocopier extends aggregation(Printer, Scanner) {
  print() {
    // IDE won't help you here
  }

  scan() {
    //
  }
}

// we don't allow this!
// let m = new Machine();

let printer = new OldFashionedPrinter();
printer.fax(); // nothing happens
//printer.scan();
