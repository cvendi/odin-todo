
export default class RenderProject {
    constructor(project) {
        this.project = project;
    }

    render() {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = this.project.name;
        projectContainer.appendChild(projectTitle);

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskList = document.createElement('ul');
        taskList.classList.add('task-list');

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
                });
                buttonContainer.appendChild(completeButton);

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button')
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