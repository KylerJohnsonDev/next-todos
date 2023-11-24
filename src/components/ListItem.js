import React from "react";

const ListItem = ({ todo, onClickTodoItem, deleteTodo, index }) => {
  return (
    <li
      className={`todo-item ${todo.isComplete ? "complete" : ""}`}
      onClick={() => onClickTodoItem(index)}
    >
      <span>{todo.text}</span>
      <button
        type="button"
        className="delete-btn"
        onClick={(event) => deleteTodo(event, index)}
      >
        X
      </button>
    </li>
  );
};

export default ListItem;
