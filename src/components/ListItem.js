"use client";
import React from "react";

const ListItem = ({ todo, onClickTodoItem, onClickDeleteTodo, index }) => {
  return (
    <li
      className={`todo-item ${todo.isComplete ? "complete" : ""}`}
      onClick={() => onClickTodoItem(todo, index)}
    >
      <span>{todo.text}</span>
      <button
        type="button"
        className="delete-btn"
        onClick={(event) => onClickDeleteTodo(event, todo.id)}
      >
        X
      </button>
    </li>
  );
};

export default ListItem;
