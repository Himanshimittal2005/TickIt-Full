import React from "react";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  // Format date nicely
  const date = new Date(todo.createdAt).toLocaleDateString();
  const day = new Date(todo.createdAt).toLocaleString("en-US", { weekday: "long" });

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <div className="flex flex-col">
        <span
          onClick={() => toggleTodo(todo._id, todo.completed)}
          className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {todo.text}
        </span>
        <span className="text-sm text-gray-500">{day}, {date}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleTodo(todo._id, todo.completed)}
          className={`px-2 py-1 rounded ${todo.completed ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}
        >
          {todo.completed ? "Completed" : "Pending"}
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
