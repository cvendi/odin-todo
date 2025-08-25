
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

        const taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        this.project.getTasks().forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskTitle = document.createElement('h3');
            taskTitle.textContent = task.title;
            taskItem.appendChild(taskTitle);

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;
            taskItem.appendChild(taskDescription);

            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = `Due: ${task.dueDate}`;
            taskItem.appendChild(taskDueDate);

            const taskPriority = document.createElement('p');
            taskPriority.textContent = `Priority: ${task.priority}`;
            taskItem.appendChild(taskPriority);

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
            completeButton.addEventListener('click', () => {
                task.toggleComplete();
                completeButton.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
                taskItem.classList.toggle('completed', task.completed);
            });
            taskItem.appendChild(completeButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Task';
            deleteButton.addEventListener('click', () => {
                this.project.removeTask(task.id);
                taskList.removeChild(taskItem);
            });
            taskItem.appendChild(deleteButton);

            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskList.appendChild(taskItem);
        });

        projectContainer.appendChild(taskList);
        return projectContainer;
    }
}