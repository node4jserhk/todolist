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
                      .append($("<div class='view'>")
                        .append($("<input type='checkbox' class='toggle'>"))
                        .append($("<label>").text(todo.item))
                        .append($("<button class='destroy'>")))
                      .append($("<input class='edit'>").val(todo.item)
                    );
        if (todo.completed) {
          item.addClass("completed");
          item.find(".toggle").prop("checked", true);
        }
        item.find('.toggle').on('change', that.updateItem.bind(that));
        item.find('label').on('dblclick', that.edit.bind(that));
        item.find('.edit').on('focusout', that.updateItem.bind(that));
        item.find('.edit').on('keyup', function (event) {
          if(event.which == 13){
            item.find('.edit').trigger('focusout');
          }
        });
        item.find('.destroy').on('click', that.deleteItem.bind(that));
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
        item: item.find('.edit').val(),
        completed: item.find('input').prop('checked')
      }
    }).success(function () {
      that.render();
    });
  },

  deleteItem: function (event) {
    var id = $(event.target).closest("li").attr('id');
    var item = $('#' + id);
    var that = this;
    $.ajax({
      url: '/todos/' + id,
      method: 'DELETE'
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

  edit: function (e) {
	  var input = $(e.target).closest('li').addClass('editing').find('.edit');
		input.val(input.val()).focus();
	},

  render: function () {
    this.listItem();
  },

};

$(document).ready(function(){
  todo.init();
});
