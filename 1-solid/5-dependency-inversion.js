/**
The Dependency Inversion Principle (DIP) is discussed in the context of JavaScript, emphasizing its distinction from Dependency Injection.
DIP focuses on defining the relationship between low-level and high-level modules.
Low-level modules, like data storage mechanisms, are considered close to the implementation, while high-level modules are concerned with application logic.

An example of genealogy research is used to illustrate the concept. A low-level module, relationships, is created to store relationship data between people.
A high-level module, research, is designed to perform research on the relationships.
Initially, the research module directly accesses the low-level data storage, violating the Dependency Inversion Principle.

To address this, an abstraction called RelationshipBrowser is introduced, simulating an abstract class.
The high-level module now depends on this abstraction instead of the concrete implementation.
The low-level module, relationships, extends the RelationshipBrowser and provides the implementation for finding all children.
This separation allows changes to the low-level module's storage mechanism without affecting the high-level module.

The takeaway is that DIP encourages depending on abstractions, and even though JavaScript lacks formal abstract classes or interfaces, a similar effect can be achieved by creating classes that act as abstractions.
This approach improves code maintainability, flexibility, and testability.
*/

let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// LOW-LEVEL (STORAGE)

class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === 'RelationshipBrowser')
      throw new Error('RelationshipBrowser is abstract!');
  }

  findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
    this.data.push({
      from: child,
      type: Relationship.child,
      to: parent,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter((r) => r.from.name === name && r.type === Relationship.parent)
      .map((r) => r.to);
  }
}

// HIGH-LEVEL (RESEARCH)

class Research {
  // constructor(relationships)
  // {
  //   // problem: direct dependence ↓↓↓↓ on storage mechanic
  //   let relations = relationships.data;
  //   for (let rel of relations.filter(r =>
  //     r.from.name === 'John' &&
  //     r.type === Relationship.parent
  //   ))
  //   {
  //     console.log(`John has a child named ${rel.to.name}`);
  //   }
  // }

  constructor(browser) {
    for (let p of browser.findAllChildrenOf('John')) {
      console.log(`John has a child named ${p.name}`);
    }
  }
}

let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

// low-level module
let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
