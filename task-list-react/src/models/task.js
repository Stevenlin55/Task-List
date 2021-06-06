export default class Task {
    constructor(name, isComplete) {
      this.id = Date.now();
      this.name = name;
      this.isComplete = isComplete;
    }
  }
  