export default class Task {
   
    constructor() {
      this.id = null;
      this.userId = null
      this.name = null
      this.isComplete = null;
    }

    static fromFirebaseDoc(doc) {
      const task = new Task();
      const data = doc.data();

      task.id =  doc.id;
      task.userId = data.userId;
      task.name = data.name;
      task.isComplete = data.isComplete;
      return task;
    }

    static fromData(name, userId, isComplete) {
      const task = new Task();
      task.userId = userId;
      task.name = name;
      task.isComplete = isComplete;
      return task;
    }
  }
  