const { loadData, saveData, validateData } = require("../utils/dataManager");

const filename = "tasks";

let tasks = loadData(filename);

function findAll() { return tasks; }

function find(id) {
  const task = tasks.find(t => t.id === id);
  return task || null;
}

function create(newTask) {
  if (!validateData(newTask)) return null;

  newTask.id = Date.now();
  tasks.push(newTask);
  saveData(filename, tasks);
  return newTask;
}

function update(id, updatedTask) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1 || !validateData(updatedTask)) return null;

  tasks[index] = { ...tasks[index], ...updatedTask };
  saveData(filename, tasks);
  return tasks[index];
}

function remove(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;

  const deletedTask = tasks.splice(index, 1);
  saveData(filename, tasks);
  return deletedTask[0];
}

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
