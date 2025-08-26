import Project from "./project.js";
import Task from "./task.js";

export function saveToLocalStorage(projects) {
  try {
    localStorage.setItem("projects", JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save projects to localStorage:", e);
  }
}

export function loadProjectsFromLocalStorage() {
  try {
    const raw = localStorage.getItem("projects");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((p) => {
      const proj = new Project(p.id, p.name);
      const tasks = Array.isArray(p.tasks) ? p.tasks : [];
      proj.tasks = tasks.map((t) => {
        const task = new Task(
          t.id,
          t.title,
          t.description,
          t.dueDate,
          t.priority
        );
        task.completed = !!t.completed;
        return task;
      });
      return proj;
    });
  } catch (e) {
    console.error("Failed to load projects from localStorage:", e);
    return [];
  }
}
