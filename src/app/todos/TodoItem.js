"use client";
import React from "react";

const ListItem = ({ todo }) => {
  return (
    <li className={`todo-item ${todo.isComplete ? "complete" : ""}`}>
      <span>{todo.text}</span>
      <button type="button" className="delete-btn">
        X
      </button>
    </li>
  );
};

export default ListItem;
