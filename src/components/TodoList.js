"use client";
import { useState, useEffect } from "react";
import ListItem from "@/components/ListItem";


const TodoList = ({ todos, isLoadingTodos, onClickTodoItem, deleteTodo }) => {

  if (isLoadingTodos) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className="todo-container">
        {todos.map((todo, index) => (
          <ListItem
            key={index}
            todo={todo}
            index={index}
            onClickTodoItem={onClickTodoItem}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
