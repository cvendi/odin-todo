import "./styles.css";
import "./nord.css";

import Project from "./project.js";
import RenderProject from "./render.js";

import { format } from "date-fns";

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

        const createProjectDialog = document.getElementById("create-proj-dialog");
        const projectNameInput = document.getElementById("project-name");
        const confirmProjectCreateBtn = document.getElementById("confirmBtn");
        const form = createProjectDialog.querySelector("form");

        const createProjectButton = document.createElement('button');
        createProjectButton.textContent = 'Create Project';
        createProjectButton.type = 'button';
        createProjectButton.addEventListener("click", () => {
            // const newProject = this.createProject("Testing Button Creation");
            // this.updateProjectSelector();

            projectNameInput.value = "";
            createProjectDialog.close();
            createProjectDialog.showModal();
        })

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = projectNameInput.value.trim();
            if (name) {
                const newProject = this.createProject(name);
                this.updateProjectSelector();

                // Switch to newly created project
                this.projectSelector.value = newProject.id;
                this.renderProject(newProject);
                createProjectDialog.close();
            }
        });

        buttonDiv.appendChild(createProjectButton);
        mainContainer.appendChild(logo);
        mainContainer.appendChild(selectorDiv);
        mainContainer.appendChild(buttonDiv);
    }
}

let app = new App();

// Will want to create projects and tasks through UI,
// and load projects and their tasks from local storage
const defaultProject = app.createProject("Default Project");

defaultProject.createTask(
            "Welcome to Odin To-Do!",
            `This is a welcome task to get you started.
            Feel free to delete it with the red - on the right, or mark it as complete with the green + button.
            To create new tasks, fill out the form above.
            You can also create new projects for a separate list of tasks using the Create Project button.`,
            format(new Date(), "yyyy-MM-dd"),
            "Low",
        );

defaultProject.seedProject();
app.init()