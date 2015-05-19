var $ = require('jquery');

var todo = {

  init: function () {
    this.cacheElements();
    this.bindEvents();
    this.render();
  },

  cacheElements: function () {
    this.todoapp = $("#todoapp");
    this.header = $("#header");
    this.newTodo = $("#new-todo");
    this.toggleAll = $("#toggle-all");
    this.todoList = $("#todo-list");
    this.todoCount = $("todo-count");
    this.clearbutton = $("#clear-completed");

  },

  bindEvents: function () {
    this.newTodo.on('keypress', this.createItem.bind(this));
  },

  createItem: function (event) {
    var that = this;
    if (event.which == 13){
      $.post("/todos", {
        item: this.newTodo.value
      }).done(function (data){
        that.newTodo.val("");
        that.render();
      });
    }
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
