"use client";
import ListItem from "@/components/ListItem";
import React, { useEffect, useRef, useState } from "react";

const fetchTodos = async () => {
  const res = await fetch("/api/todos");
  return await res.json();
}

const createTodo = async(text) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify({ text })
  });
  return await res.json();
}

export default function Home() {

  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function loadTodos() {
      const todos = await fetchTodos();
      setTodos(todos);
    }
    loadTodos();
  }, []);

  const onEnterTodo = async(event) => {
    if (event.key === "Enter") {
      const todo = await createTodo(event.target.value);
      const newTodos = [...todos, todo];
      setTodos(newTodos);
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
