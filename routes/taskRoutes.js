const express = require('express');
const Task = require('../models/Task'); // Task model
const authMiddleware = require('../middlewares/authMiddleware'); // JWT middleware
const { taskValidationSchema } = require('../validations/taskValidation'); // Joi validation

const router = express.Router();

// **Create Task**
router.post('/tasks', authMiddleware, async (req, res) => {
  try {
    // Validate input
    const { error, value } = taskValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = new Task(value);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// **Get All Tasks**
router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;

    const sort = req.query.sort === 'dueDate' ? { dueDate: 1 } : { createdAt: 1 };
    const tasks = await Task.find(filters).sort(sort);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// **Get Task by ID**
router.get('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// **Update Task**
router.put('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    // Validate input
    const { error, value } = taskValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// **Delete Task**
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
