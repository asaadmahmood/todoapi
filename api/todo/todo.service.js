// TODO: Move API call methods here later.
const Todo = require('./todo.model');

/** find todo item by id */
findById = (id) => {
    Todo.findById(id, (err, todo) => {
        if (err) {
            console.log(err);
        } else {
            console.log(todo);
        }
    });
};

/** find all todo items that matches search criteria */
findAll = (params) => {
    Todo.find(params, (err, todos) => {
        if (err) {
            console.log(err);
        } else {
            console.log(todos);
        }
    });
};

/** Insert new todo item in to collection */
create = (modelInfo) => {
    let todoItem = new Todo(modelInfo);
    todoItem.save();
    console.log(`Item created - ${todoItem.name}`);
};

/** Update existing item info */
update = (modelInfo, data) => {
    Todo.findOneAndUpdate({ _id: modelInfo.id }, data,
        { new: true },
        (err, todo) => {
            if (err) {
                console.log(err);
            } else {
                console.log(todo);
            }
        });
};

/** delete todo item by id */
deleteTodo = (id) => {
    Todo.findOneAndRemove({ _id: id }, (err, todo) => {
        if (err) {
            console.log(err);
        } else {
            console.log(todo);
        }
    });
};


module.exports = findAll();