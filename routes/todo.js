require('../db');
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

module.exports = function(app) {
  app.post('/todos', function (req, res){
    new Todo({
      id: Math.random().toString(36).substr(2, 9),
      item: req.body.item,
      completed: false,
      updated_at: Date.now(),
      created_at: Date.now()
    }).save(function (err, todo, count){
      if (err) {
        return err;
      }
      res.status(200).json(todo);
    });
  });

  app.get('/todos', function (req, res){
    Todo.find({}).sort('completed -created_at').exec(function (err, todos){
      if (err) {
        return err;
      }
      res.status(200).json(todos);
    });
  });

  app.put('/todos/:id', function (req, res){
    Todo.findOneAndUpdate({id: req.params.id}, {item: req.body.item, completed: req.body.completed, updated_at: Date.now()}, function (err, todo){
      if (err) {
        return err;
      }
      res.status(200).json(todo);
    });
  });
}
