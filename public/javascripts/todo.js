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
    this.todoList.on('click', this.updateItem.bind(this));
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
    $.getJSON("/todos", function (data){
      that.todoList.empty();
      $.each(data, function (index, todo){
        var item = $("<li>").attr('id', todo.id)
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

  updateItem: function (e) {
    var id = $(e.target).closest("li").attr('id');
    var item = $('#' + id);
    var that = this;
    $.ajax({
      url: '/todos/' + id,
      method: 'PUT',
      data: {
        item: item.find('label').text(),
        completed: item.find('input').prop('checked')
      }
    }).success(function () {
      that.render();
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
