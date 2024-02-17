"use client";
import React from "react";

const ListItem = ({ todo, toggleTodoStatus, deleteTodoById }) => {
  const handleDeleteTodo = (event, id) => {
    event.stopPropagation();
    deleteTodoById(id);
  };

  return (
    <li
      onClick={() => toggleTodoStatus(todo)}
      className={`todo-item ${todo.isComplete ? "complete" : ""}`}
    >
      <span>{todo.text}</span>
      <button
        type="button"
        className="delete-btn"
        onClick={(event) => handleDeleteTodo(event, todo.id)}
      >
        X
      </button>
    </li>
  );
};

export default ListItem;
