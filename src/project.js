import { compareDesc } from "date-fns";

import Task from "./task.js";
import { format } from "date-fns";

export default class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = [];
    };

    seedProject() {

        this.createTask(
            "Renew driver's license",
            "Visit DMV before expiration to renew license and update photo.",
            format(new Date(2025, 7, 10), "yyyy-MM-dd"),
            "High",
        );

        this.createTask(
            "Research new accounting software",
            "Compare features and pricing for QuickBooks vs FreshBooks vs Xero.",
            format(new Date(2025, 5, 5), "yyyy-MM-dd"),
            "Low",
        );

        this.createTask(
            "Backup laptop files",
            "Run full system backup to external drive before traveling next week.",
            format(new Date(2025, 4, 29), "yyyy-MM-dd"),
            "High",
            
        );
    }

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