const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  _listId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };
