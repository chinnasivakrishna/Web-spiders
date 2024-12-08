const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = new Task({ title, description, status, priority, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, sort, limit = 10, skip = 0 } = req.query;

    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    let tasks = Task.find(query);

    if (sort) {
      const sortOption = sort === 'dueDate' ? 'dueDate' : 'createdAt';
      tasks = tasks.sort({ [sortOption]: 1 });
    }

    tasks = await tasks.limit(parseInt(limit)).skip(parseInt(skip));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = Date.now();

    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
