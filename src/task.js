
export default class Task {
    constructor(id, title, description, dueDate, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    };

    changePriority(newPriority) {
        if (["Low", "Medium", "High"].includes(newPriority)) {
            this.priority = newPriority;
        } else {
            throw new Error("Invalid priority level. Use 'Low', 'Medium', or 'High'.");
        };
    };

    toggleComplete() {
        this.completed = !this.completed;
        console.log(`Task "${this.title}" marked as ${this.completed ? 'completed' : 'incomplete'}.`);
    };
};