const todoRouter = require('express').Router();
const Todo = require('./todo.model');
const TodoFunctions = require('./todo.service');

let id = 0;
/** increment id and attach it to request object */
const assignUniqueId = (req, res, next) => {
  id++;
  req.body.todo._id = id;
  next();
}

// Commenting this out for ease of understanding for now.
// We could also use this middleware for ease of access as we get more experience.

// /** get id param
//  * find matching todo and attach it to request object
//  */
// todoRouter.param('id', (req, res, next, todoId) => {
//   let todo = todos.find((todoItem) => {
//     return todoItem.id === todoId;
//   });
//   let todoIndex = todos.findIndex((todoItem) => {
//     return todoItem.id === todoId;
//   });
//   if (todo) {
//     req.todo = todo;
//     req.todoIndex = todoIndex;
//     next();
//   } else {
//     res.status(400).json({
//       error: `Could not find todo based on id = ${todoId}`
//     });
//   }
// })

todoRouter.get('/', (req, res) => { // endpoint '/todo/', method : 'GET'
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});


todoRouter.get('/:id', (req, res) => { // endpoint '/todo/:id', method : 'GET'
  let todoId = req.params.id;

  Todo.findById({_id: todoId}, (err, todo) => {
    if (todo) {
      res.json({
        todo: todo,
        message: "Todo found successfully"
      });
    } else {
      res.json({
        error: `Todo not found using id: ${req.params.id}`
      })
    }
  });
});

todoRouter.post('/', assignUniqueId, (req, res) => { // endpoint '/todo/', method : 'POST'
  const newTodo = req.body.todo;
  let todoItem = new Todo(newTodo);
  todoItem.save((err, savedTodo) => {
    if (!err) {
      res.json({
        todo: savedTodo,
        message: "Todo added successfully"
      });
    } else {
      res.json({
        error: err
      })
    }
  });
});

todoRouter.put('/:id', (req, res) => { // endpoint '/todo/:id', method : 'PUT'
  let todoId = req.params.id;
  console.log(todoId);
  Todo.findOneAndUpdate({ _id: todoId }, { name: req.body.todo.name },
    { new: true },
    (err, todo) => {
      if (err) {
        res.json({
          error: err
        })
      } else {
        res.json({
          todo: todo,
          message: "Todo updated successfully"
        });
      }
    });
});

todoRouter.delete('/:id', (req, res) => { // endpoint '/todo/:id', method : 'DELETE'
  let todoId = req.params.id;
  Todo.findOneAndRemove({ _id: todoId }, (err, todo) => {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        todo: todo, // sending back the deleted todo
        message: "Todo deleted successfully"
      });
    }
  });
});

module.exports = todoRouter;

