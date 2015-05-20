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
      if (this.newTodo.val().trim() !== '') {
        $.post("/todos", {
          item: this.newTodo.val().trim()
        }).done(function (data){
          that.newTodo.val("");
          that.render();
        });
      } else {
        that.newTodo.val("");
      }
    }
  },

  listItem: function () {
    var that = this;
    this.todoList.empty();
    $.getJSON("/todos", function (data){
      $.each(data, function (index, todo){
        var item = $("<li>")
                      .append($("<div>")
                        .append($("<input type='checkbox' class='toggle'>"))
                        .append($("<label>").text(todo.item))
                        .append($("<button class='destroy'>")));
        if (todo.completed) {
          item.addClass("completed");
          item.find("input").prop("checked", true);
        }
        that.todoList.append(item);
      });
    });
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

    this.listItem();
  },

};

$(document).ready(function(){
  todo.init();
});
