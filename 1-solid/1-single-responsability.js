const fs = require('fs');

/**
 * 
The Single Responsibility Principle (SRP) is one of the SOLID design principles, emphasizing that a class should have only one primary responsibility.
This principle suggests that a class should change for only one reason, which is related to its main responsibility. Adding more than one responsibility to a class is discouraged.

As an example, consider a Journal class initially responsible for managing entries (adding and removing).
This aligns with its primary purpose. However, the problem arises when a new requirement arises to save the journal to a file.
The temptation might be to add file-related functionality directly to the Journal class, violating the SRP.

Instead, a better approach is to create a separate class, such as a PersistenceManager, dedicated to handling persistence operations like saving and loading.
This adheres to the SRP and allows for better organization, maintainability, and scalability.

The anti-pattern of a "God object," a class with numerous responsibilities and complex code, contrasts with the SRP.
Following the Single Responsibility Principle promotes code clarity, maintainability, and separation of concerns, making it easier to understand and modify the system.
 */

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
  // load(filename)
  // {
  //   //
  // }
  //
  // loadFromUrl(url)
  // {
  //   //
  // }
}
Journal.count = 0;

class PersistenceManager {
  preprocess(j) {
    //
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

let j = new Journal();
j.addEntry('I cried today.');
j.addEntry('I ate a bug.');
console.log(j.toString());

let p = new PersistenceManager();
let filename = 'c:/temp/journal.txt';
p.saveToFile(j, filename);

// separation of concerns
