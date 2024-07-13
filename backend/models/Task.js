const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
