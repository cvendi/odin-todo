import "./styles.css";
import "./nord.css";

import Task from "./task.js";
import Project from "./project.js";
import RenderProject from "./render.js";

import { format } from "date-fns";

class App {
    constructor() {
        this.projects = [];
    }

    createProject(name) {
        const project = new Project(crypto.randomUUID(), name);
        this.projects.push(project);
        return project;
    }

    addProject(project) {
        this.projects.push(project);
    }

    getProjects() {
        return this.projects;
    }

    renderProject (project) {
        const renderProject = new RenderProject(project);
        document.body.appendChild(renderProject.render());
    }

    createTask(title, description, dueDate, priority, projectId) {
        const task = new Task(
            crypto.randomUUID(),
            title, 
            description, 
            dueDate, 
            priority
        );
        for (let project of this.projects) {
            if (project.id === projectId) {
                project.addTask(task);
                return task;
            }
        }
    }
}

let app = new App();

// Will want to create projects and tasks through UI,
// and load projects and their tasks from local storage
const defaultProject = app.createProject("Default Project");
const customProject = app.createProject("Custom Project");

app.createTask(
    "Remember to do something!",
    "This is a future task with a dueDate yet to pass.",
    format(new Date(2025, 11, 31), "MM-dd-yyyy"),
    "High",
    defaultProject.id // This will eventually be dynamic based on the currently selected project in the UI
);

app.createTask(
    "This is a longer task that should wrap down within the first grid column.",
    "This is a task with a dueDate that has passed, and should be identified as such in the UI.",
    format(new Date(2025, 6, 28), "MM-dd-yyyy"),
    "High",
    defaultProject.id // This will eventually be dynamic based on the currently selected project in the UI
);

app.createTask(
    "Submit quarterly report",
    "Finish and submit the Q3 performance report by end of day.",
    format(new Date(2025, 8, 30), "MM-dd-yyyy"),
    "High",
    defaultProject.id
);

app.createTask(
    "Schedule dentist appointment",
    "Call Dr. Martinez's office to book a cleaning for next month.",
    format(new Date(2025, 9, 15), "MM-dd-yyyy"),
    "Medium",
    defaultProject.id
);

app.createTask(
    "Renew driver's license",
    "Visit DMV before expiration to renew license and update photo.",
    format(new Date(2025, 7, 10), "MM-dd-yyyy"),
    "High",
    defaultProject.id
);

app.createTask(
    "Research new accounting software",
    "Compare features and pricing for QuickBooks vs FreshBooks vs Xero.",
    format(new Date(2025, 10, 5), "MM-dd-yyyy"),
    "Low",
    defaultProject.id
);

app.createTask(
    "Plan weekend hiking trip",
    "Reserve campsite and check weather forecast for mountain trails.",
    format(new Date(2025, 8, 27), "MM-dd-yyyy"),
    "Medium",
    defaultProject.id
);

app.createTask(
    "Update portfolio website",
    "Add recent React projects and optimize images for faster loading.",
    format(new Date(2025, 6, 20), "MM-dd-yyyy"),
    "Medium",
    defaultProject.id
);

app.createTask(
    "Backup laptop files",
    "Run full system backup to external drive before traveling next week.",
    format(new Date(2025, 8, 29), "MM-dd-yyyy"),
    "High",
    defaultProject.id
);

// Test tasks for second project
app.createTask(
    "Custom Task",
    "This is a custom task in the custom project.",
    format(new Date(2025, 10, 30), "MM-dd-yyyy"),
    "Medium",
    customProject.id
);

app.renderProject(defaultProject);