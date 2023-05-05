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
    ref:'List',
  },
});

TaskSchema.index({ _listId: 1 }, { unique: true, dropDups: true });

const Task = mongoose.model("Task", TaskSchema);

// Assuming you want to remove the unique index on the `_listId` field
Task.collection.dropIndex({ _listId: 1 })
  .then(() => {
    console.log("Index removed successfully");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = { Task };
