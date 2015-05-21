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
    this.toggle = $(".toggle");
    this.todoList = $("#todo-list");
    this.todoCount = $("#todo-count");
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
        });
      }
      that.newTodo.val("");
      that.render();
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
          item.find(".toggle").prop("checked", true);
        }
        item.find('.toggle').on('change', that.updateItem.bind(that));
        that.todoList.append(item);
      });
      that.footer();
    });
  },

  updateItem: function (event) {
    var id = $(event.target).closest("li").attr('id');
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

  countLeft: function () {
    var left = this.todoList.find('li').length
               - this.todoList.find('.completed').length;
    return left;
  },

  footer: function () {
    if (this.countLeft() > 0) {
      this.clearbutton.show();
      this.todoCount.show();
      var left = '<strong>' + this.countLeft()
                 + '</strong> items left';
      this.todoCount.html(left);
    } else {
      this.clearbutton.hide();
      this.todoCount.hide();
    }
  },

  render: function () {
    this.listItem();
  },

};

$(document).ready(function(){
  todo.init();
});
