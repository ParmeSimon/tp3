const { loadData, saveData, validateData } = require("../utils/dataManager");

const filename = "tasks";

let tasks = loadData(filename);

function findAll() { return tasks; }

function find(id) {
  const taskId = typeof id === 'number' ? id : Number(id);
  const task = tasks.find(t => t.id === taskId);
  return task || null;
}

function create(newTask) {
  if (!validateData(newTask)) return null;
  const safeTask = {
    id: Date.now(),
    name: String(newTask.name || '').trim(),
    message: String(newTask.message || '').trim(),
    state: Number(newTask.state) === 1 ? 1 : 0,
    createdAt: newTask.createdAt || new Date().toISOString()
  };
  tasks.push(safeTask);
  saveData(filename, tasks);
  return safeTask;
}

function update(id, updatedTask) {
  const taskId = typeof id === 'number' ? id : Number(id);
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) return null;
  const current = tasks[index];
  const next = {
    ...current,
    name: updatedTask.name !== undefined ? String(updatedTask.name).trim() : current.name,
    message: updatedTask.message !== undefined ? String(updatedTask.message).trim() : current.message,
    state: updatedTask.state !== undefined ? (Number(updatedTask.state) === 1 ? 1 : 0) : current.state,
    createdAt: current.createdAt
  };
  if (!validateData(next)) return null;
  tasks[index] = next;
  saveData(filename, tasks);
  return tasks[index];
}

function remove(id) {
  const taskId = typeof id === 'number' ? id : Number(id);
  const index = tasks.findIndex(t => t.id === taskId);
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
