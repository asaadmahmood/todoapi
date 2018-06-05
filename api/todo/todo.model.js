const mongoose = require('mongoose');

/** Todo model schema */
const todoSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    description: String
});

// Creating the Todo model using schema here
const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
