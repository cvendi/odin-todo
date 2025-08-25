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

    renderProjects () {
        this.projects.forEach(project => {
            const renderProject = new RenderProject(project);
            document.body.appendChild(renderProject.render());
        }); // This will be changed, and will only render a single selected project, with the ability to switch between projects,
            // preferably through a tabbed interface
    }

    createTask(title, description, dueDate, priority, projectId) {
        const task = new Task(
            crypto.randomUUID(),
            title, 
            description, 
            dueDate, 
            priority
        );
        console.log(this.projects);
        for (let project of this.projects) {
            if (project.id === projectId) {
                console.log(project.id);
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
    "Did you forget something?",
    "This is a task with a dueDate that has passed, and should be identified as such in the UI.",
    format(new Date(2025, 6, 28), "MM-dd-yyyy"),
    "High",
    defaultProject.id // This will eventually be dynamic based on the currently selected project in the UI
);

app.createTask(
    "Welcome to Odin To-Do!",
    "This is a welcome task to get you started. It is the first and oldest task in the project. Feel free to delete it.",
    format(new Date(2025, 2, 12), "MM-dd-yyyy"),
    "High",
    defaultProject.id // This will eventually be dynamic based on the currently selected project in the UI
);

app.createTask(
    "Custom Task",
    "This is a custom task in the custom project.",
    format(new Date(2025, 10, 30), "MM-dd-yyyy"),
    "Medium",
    customProject.id
);

app.renderProjects();