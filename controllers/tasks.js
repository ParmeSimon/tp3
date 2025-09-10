const taskService = require('../services/tasks');

function list(req, res) {
  const tasks = taskService.findAll();
  res.status(200).json(tasks);
}

function read(req, res) {
  const taskId = req.params.id;
  const task = taskService.find(taskId);
  if (task)
    res.status(200).json(task);
  else
    res.status(404).json({ message: "Tâche non trouvée" });
}

function create(req, res) {
  const datas = req.body;
  const createdTask = taskService.create(datas);
  if (createdTask)
    res.status(201).json({ message: "Tâche créée" });
  else
    res.status(400).json({ message: "Erreur lors de l'insertion" });
}

function update(req, res) {
  const taskId = req.params.id;
  const datas = req.body;
  const updatedTask = taskService.update(taskId, datas);
  if (updatedTask) {
    res.status(200).json({ message: "Tâche éditée" });
  } else {
    res.status(400).json({ message: "Erreur lors de l'édition" });
  }
}

function remove(req, res) {
  const taskId = req.params.id;
  const removedTask = taskService.remove(taskId);
  if (removedTask) {
    res.status(200).json({ message: "Tâche supprimée" });
  } else {
    res.status(400).json({ message: "Erreur lors de la suppression" });
  }
}

function patch(req, res) {
  update(req, res);
}

function toggleCompleted(req, res) {
  const taskId = req.params.id;
  const result = taskService.toggleCompleted(taskId);
  if (result) {
    res.status(200).json({
      message: `Tâche ${result.state === 1 ? 'marquée comme complétée' : 'marquée comme non complétée'}`,
      task: result
    });
  } else {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
}

module.exports = {
  list,
  read,
  create,
  update,
  remove,
  patch,
  toggleCompleted
};
