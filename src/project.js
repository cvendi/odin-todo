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
            "Remember to do something!",
            "This is a future task with a dueDate yet to pass.",
            format(new Date(2025, 11, 31), "MM-dd-yyyy"),
            "High",
        );

        this.createTask(
            "This is a longer task that should wrap down within the first grid column.",
            "This is a task with a dueDate that has passed, and should be identified as such in the UI.",
            format(new Date(2025, 6, 28), "MM-dd-yyyy"),
            "High",
        );

        this.createTask(
            "Submit quarterly report",
            "Finish and submit the Q3 performance report by end of day.",
            format(new Date(2025, 8, 30), "MM-dd-yyyy"),
            "High",
        );

        this.createTask(
            "Schedule dentist appointment",
            "Call Dr. Martinez's office to book a cleaning for next month.",
            format(new Date(2025, 9, 15), "MM-dd-yyyy"),
            "Medium",
        );

        this.createTask(
            "Renew driver's license",
            "Visit DMV before expiration to renew license and update photo.",
            format(new Date(2025, 7, 10), "MM-dd-yyyy"),
            "High",
        );

        this.createTask(
            "Research new accounting software",
            "Compare features and pricing for QuickBooks vs FreshBooks vs Xero.",
            format(new Date(2025, 10, 5), "MM-dd-yyyy"),
            "Low",
        );

        this.createTask(
            "Plan weekend hiking trip",
            "Reserve campsite and check weather forecast for mountain trails.",
            format(new Date(2025, 8, 27), "MM-dd-yyyy"),
            "Medium",
        );

        this.createTask(
            "Update portfolio website",
            "Add recent React projects and optimize images for faster loading.",
            format(new Date(2025, 6, 20), "MM-dd-yyyy"),
            "Medium",
        );

        this.createTask(
            "Backup laptop files",
            "Run full system backup to external drive before traveling next week.",
            format(new Date(2025, 8, 29), "MM-dd-yyyy"),
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