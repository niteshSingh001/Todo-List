$(document).ready(function () {
  // Load todos from local storage on page load
  loadTodos();

  // Event listener for adding a new todo
  $("#addTodo").click(function () {
    addTodo();
  });

  // Event listener for pressing Enter in the input field
  $("#newTodo").keypress(function (e) {
    if (e.which === 13) {
      addTodo();
    }
  });

  // Event delegation for checking and deleting todos
  $("#todoList").on("click", "li", function (e) {
    var clickedElement = $(e.target);

    // Check if the check icon is clicked
    if (clickedElement.hasClass("check")) {
      toggleTodoState($(this));
    }

    // Check if the delete icon is clicked
    if (clickedElement.hasClass("delete")) {
      deleteTodo($(this));
    }
  });

  function addTodo() {
    // Get the new todo text
    var todoText = $("#newTodo").val();

    if (todoText.trim() === "") {
      alert("Please enter a valid todo.");
      return;
    }

    // Create a new todo item with Font Awesome icons
    var newTodo = $("<li>").html(
      todoText +
        '<i class="fas fa-check check"></i>' +
        '<i class="fas fa-trash-alt delete"></i>'
    );

    // Append the new todo item to the list
    $("#todoList").append(newTodo);

    // Save todos to local storage
    saveTodos();

    // Clear the input field
    $("#newTodo").val("");
  }

  function toggleTodoState(todo) {
    // Toggle the 'completed' class for strikethrough effect
    todo.toggleClass("completed");

    // Save todos to local storage
    saveTodos();
  }

  function deleteTodo(todo) {
    // Remove the todo item
    $(todo).fadeOut(800, function () {
      $(todo).remove();
      // Save todos to local storage
      saveTodos();
    });
  }

  function saveTodos() {
    // Get all todo items
    var todos = $("#todoList")
      .children()
      .map(function () {
        return {
          text: $(this).text(),
          completed: $(this).hasClass("completed"),
        };
      })
      .get();

    // Save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    // Retrieve todos from local storage
    var savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      // Parse the saved todos from JSON
      var todos = JSON.parse(savedTodos);

      // Add each todo to the list
      todos.forEach(function (todo) {
        var newTodo = $("<li>").html(
          todo.text +
            '<i class="fas fa-check check"></i>' +
            '<i class="fas fa-trash-alt delete"></i>'
        );

        // Add 'completed' class if the todo is completed
        if (todo.completed) {
          newTodo.addClass("completed");
        }

        $("#todoList").append(newTodo);
      });
    }
  }
});
