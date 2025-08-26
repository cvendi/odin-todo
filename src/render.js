export default class RenderProject {
    constructor(project) {
        this.project = project;
    }

    static clearProjectContainer() {
        let projectContainer = document.querySelector('.project-container');
        if (!projectContainer) return;
        document.body.removeChild(projectContainer);
    }

    render() {
        console.log('Rendering the project...');
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = this.project.name;
        projectContainer.appendChild(projectTitle);

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        const userInputItem = document.createElement('li');
        userInputItem.classList.add('input-item');

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.placeholder = 'What is your task?'
        taskInput.classList.add('task-input');
        userInputItem.appendChild(taskInput);

        const taskDescriptionInput = document.createElement('input');
        taskDescriptionInput.type = 'text';
        taskDescriptionInput.placeholder = 'Describe your task...'
        taskDescriptionInput.classList.add('task-description-input');
        userInputItem.appendChild(taskDescriptionInput);

        const datePriorityDiv = document.createElement('div');
        datePriorityDiv.classList.add('date-priority-div');

        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.valueAsDate = new Date();
        datePriorityDiv.appendChild(dueDateInput);

        const priorityValues = ['High', 'Medium', 'Low'];

        const prioritySelector = document.createElement('select');
        priorityValues.forEach(priority => {
            const priorityOption = document.createElement('option');
            priorityOption.textContent = priority;
            priorityOption.value = priority;
            prioritySelector.appendChild(priorityOption);
        });

        prioritySelector.classList.add('priority-select');
        datePriorityDiv.appendChild(prioritySelector);
        userInputItem.appendChild(datePriorityDiv);

        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-task-button');
        submitButton.style.backgroundColor = 'var(--nord14)';
        submitButton.textContent = '+';
        userInputItem.appendChild(submitButton);

        taskList.appendChild(userInputItem);

        let chosenPriority = 'High';
        prioritySelector.onchange = (e) => {
            chosenPriority = e.target.value;
        };

        submitButton.addEventListener("click", () => {
            this.project.createTask(
                taskInput.value,
                taskDescriptionInput.value,
                dueDateInput.value,
                chosenPriority
            )
            console.log(this.project);
            RenderProject.clearProjectContainer();
            document.body.appendChild(this.render());
        });
        
        this.project.getTasks().forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskTitle = document.createElement('h3');
            taskTitle.textContent = task.title;
            taskItem.appendChild(taskTitle);

            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = `Due: ${task.dueDate}`;
            taskDueDate.classList.add('due-date');
            taskItem.appendChild(taskDueDate);

            const taskPriority = document.createElement('p');
            taskPriority.textContent = `Priority: ${task.priority}`;
            taskPriority.classList.add('priority');
            taskItem.appendChild(taskPriority);

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const expandButton = document.createElement('button');
            expandButton.textContent = '>';
            expandButton.style.backgroundColor = 'var(--nord9)';

            let expanded = false;
            let taskDescription;
            expandButton.addEventListener('click', () => {
                if (!expanded) {
                    taskDescription = document.createElement('p');
                    taskDescription.textContent = task.description;
                    taskDescription.classList.add('task-description');
                    taskItem.appendChild(taskDescription);
                    expandButton.textContent = 'v';
                    expanded = true;
                } else {
                    if (taskDescription) {
                        taskItem.removeChild(taskDescription);
                    }
                    expandButton.textContent = '>';
                    expanded = false;
                }
            });

            const completeButton = document.createElement('button');
                completeButton.textContent = task.completed ? 'x' : '';
                completeButton.classList.add('complete-button');
                completeButton.addEventListener('click', () => {
                    task.toggleComplete();
                    completeButton.textContent = task.completed ? 'x' : '';
                    taskItem.classList.toggle('completed', task.completed);
                    if (task.completed) {
                        taskItem.style.border = '1px solid var(--nord14)';
                        taskPriority.textContent = '  Complete';
                        taskDueDate.textContent = '';
                        taskPriority.style.color = 'var(--nord14)';
                        taskTitle.style.color = 'var(--nord14)';
                        taskDueDate.style.color = 'var(--nord14)';
                        completeButton.style.backgroundColor = 'var(--nord11)';
                    } else {
                        taskItem.style.border = '';
                        taskPriority.textContent = `Priority: ${task.priority}`;
                        taskDueDate.textContent = `Due: ${task.dueDate}`;
                        taskPriority.style.color = '';
                        taskTitle.style.color = '';
                        taskDueDate.style.color = '';
                        completeButton.style.backgroundColor = '';
                    }
                });
                buttonContainer.appendChild(completeButton);

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button')
                deleteButton.style.backgroundColor = 'var(--nord11)';
                deleteButton.textContent = '-';
                deleteButton.addEventListener('click', () => {
                    this.project.removeTask(task.id);
                    taskList.removeChild(taskItem);
                });
                buttonContainer.appendChild(deleteButton);

            buttonContainer.appendChild(expandButton);
            taskItem.appendChild(buttonContainer);

            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskList.appendChild(taskItem);
        });

        taskContainer.appendChild(taskList)
        projectContainer.appendChild(taskContainer);
        return projectContainer;
    }
}