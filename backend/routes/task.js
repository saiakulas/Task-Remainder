const router = require('express').Router();
let Task = require('../models/Task');


router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a task
router.route('/add').post((req, res) => {
  const { taskName, time, duration, description } = req.body;

  const newTask = new Task({ taskName, time, duration, description });

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific task
router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a task
router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.taskName = req.body.taskName;
      task.time = req.body.time;
      task.duration = req.body.duration;
      task.description = req.body.description;

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a task
router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
