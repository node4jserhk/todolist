var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
  id: String,
  item: String,
  completed: Boolean,
  updated_at: Date
});

mongoose.model('Todo', Todo);
mongoose.connect('mongodb://localhost/express-todo');
