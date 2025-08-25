import "./styles.css";
import "./nord.css";

import Task from "./task.js";
import Project from "./project.js";
import RenderProject from "./render.js";

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
    "Welcome to Odin To-Do",
    "This is a welcome task to get you started. Feel free to delete it.",
    "2025-12-31",
    "High",
    defaultProject.id // This will eventually be dynamic based on the currently selected project in the UI
);

app.createTask(
    "Custom Task",
    "This is a custom task in the custom project.",
    "2025-11-30",
    "Medium",
    customProject.id
);

app.renderProjects();