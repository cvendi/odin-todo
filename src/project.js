import { compareDesc } from "date-fns";

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
        // Tasks are sorted by dueDate in descending order (latest dueDate first)
        return this.tasks
            .slice()
            .sort((a, b) => compareDesc(new Date(a.dueDate), new Date(b.dueDate)))
    };
};