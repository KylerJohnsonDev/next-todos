import React from "react";

const ListItem = ({ todo, onClickTodoItem, deleteTodo }) => {
  return (
    <li
      className={`todo-item ${todo.isComplete ? "complete" : ""}`}
      onClick={() => onClickTodoItem(todo)}
    >
      <span>{todo.text}</span>
      <button
        type="button"
        className="delete-btn"
        onClick={(event) => deleteTodo(event, todo.id)}
      >
        X
      </button>
    </li>
  );
};

export default ListItem;
