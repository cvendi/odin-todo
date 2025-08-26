import "./styles.css";
import "./nord.css";

import Project from "./project.js";
import RenderProject from "./render.js";

class App {
    constructor() {
        this.projects = [];
        this.projectSelector = null;
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
        RenderProject.clearProjectContainer();
        const renderProject = new RenderProject(project);
        document.body.appendChild(renderProject.render());
    }

    updateProjectSelector () {
        if (!this.projectSelector) {
            this.projectSelector = document.createElement('select');
            this.projectSelector.classList.add('project-select');
        }

        this.projectSelector.innerHTML = '';

        this.projects.forEach(project => {
            const projectOption = document.createElement('option');
            projectOption.textContent = project.name;
            projectOption.value = project.id;
            this.projectSelector.appendChild(projectOption);
        });

        this.projectSelector.onchange = (e) => {
            const selectedProjectId = e.target.value;
            const selectedProject = this.projects.find(p => p.id === selectedProjectId);
            if (selectedProject) {
                this.renderProject(selectedProject);
            }
        };

        return this.projectSelector;
    }

    init () {
        this.renderProject(defaultProject)

        const mainContainer = document.querySelector('.main-container');

        const logo = document.createElement('h1');
        logo.innerHTML = 'Odin To-Do<hr style="color: var(--nord14);">';

        let selectorDiv = document.createElement('div');
        selectorDiv.classList.add('project-select-container');

        selectorDiv.appendChild(this.updateProjectSelector());

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('project-buttons');
        const createProjectButton = document.createElement('button');
        createProjectButton.textContent = 'Create Project';
        createProjectButton.addEventListener("click", () => {
            const newProject = this.createProject("Testing Button Creation");
            this.updateProjectSelector();

            // Switch to newly created project
            this.projectSelector.value = newProject.id;
            this.renderProject(newProject);
        })

        buttonDiv.appendChild(createProjectButton);
        mainContainer.innerHTML = '';
        mainContainer.appendChild(logo);
        mainContainer.appendChild(selectorDiv);
        mainContainer.appendChild(buttonDiv);
    }
}

let app = new App();

// Will want to create projects and tasks through UI,
// and load projects and their tasks from local storage
const defaultProject = app.createProject("Default Project");

defaultProject.seedProject();
app.init()