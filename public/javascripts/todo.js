var $ = require('jquery');

var todo = {
  init: function () {
    this.cacheElements();
    this.render();
  },
  cacheElements: function () {
    this.todoapp = $("#todoapp");
    this.header = $("#header");
    this.newtodo = $("#new-todo");
    this.toggleAll = $("#toggle-all");
    this.todoList = $("#todo-list");
    this.todoCount = $("todo-count");
    this.clearbutton = $("#clear-completed");

  },
  count: function () {
    return this.todoList.find("li").length;
  },
  render: function () {
    if (this.count() > 0) {
      this.clearbutton.show();
    } else {
      this.clearbutton.hide();
    }
  },

};

$(document).ready(function(){
  todo.init();
});
