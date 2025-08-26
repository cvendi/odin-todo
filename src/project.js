import { compareDesc } from "date-fns";

import Task from "./task.js";

export default class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = [];
    };

    createTask(title, description, dueDate, priority) {
        const task = new Task(
            crypto.randomUUID(),
            title, 
            description, 
            dueDate, 
            priority
        );
        this.tasks.push(task);
    }

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