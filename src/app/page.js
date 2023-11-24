"use client";
import ListItem from "@/components/ListItem";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const localStorageKey = "todos";
  const [todos, setTodos] = useState(() => {
    // initialize todos from localstorage
    const todos = window.localStorage.getItem(localStorageKey);
    return todos ? JSON.parse(todos) : [];
  });
  const inputRef = useRef(null);

  useEffect(() => {
    // update todos in localstorage anytime todos changes
    const stringifiedTodos = JSON.stringify(todos);
    window?.localStorage.setItem(localStorageKey, stringifiedTodos);
  }, [todos]);

  const onEnterTodo = (event) => {
    if (event.key === "Enter") {
      setTodos([...todos, { text: event.target.value, isComplete: false }]);
      inputRef.current.value = "";
    }
  };

  const onClickTodoItem = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  };

  const deleteTodo = (event, index) => {
    event.stopPropagation();
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Type a todo and press 'Enter'"
        className="todo-input"
        onKeyDown={(event) => onEnterTodo(event)}
      />

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
}
