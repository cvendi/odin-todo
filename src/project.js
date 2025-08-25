
export default class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = [];
    };

    addTask(task) {
        this.tasks.push(task);
    };

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    };

    getTasks() {
        return this.tasks;
    };
};