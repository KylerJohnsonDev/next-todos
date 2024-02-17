'use client'
import ListItem from "./ListItem";
import React, { useRef, useState } from "react";
import useSWR from "swr";

const fetchTodos = async (url) => {
  const res = await fetch(url);
  return await res.json();
}

const createTodo = async(text) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify({ text })
  });
  return await res.json();
}

const updateTodo = async(todo) => {
  const res = await fetch("/api/todos", {
    method: "PUT",
    body: JSON.stringify(todo)
  });
  return await res.json();
}

const deleteTodo = async(id) => {
  const res = await fetch("/api/todos", {
    method: "DELETE",
    body: JSON.stringify({ id })
  });
  return await res.json();
}

export default function Todos() {
  const inputRef = useRef(null);

  const { data: todos, error, isLoading, mutate } = useSWR('/api/todos', fetchTodos);

  const onEnterTodo = async(event) => {
    if (event.key === "Enter") {
      const todo = await createTodo(event.target.value);
      const newTodos = [...todos, todo];
      mutate(newTodos)
      inputRef.current.value = "";
    }
  };

  const onClickTodoItem = async(todo, index) => {
    const todoToUpdate = { ...todo, isComplete: !todo.isComplete };
    const updatedTodo = await updateTodo(todoToUpdate);
    const newTodos = [...todos];
    newTodos.splice(index, 1, updatedTodo);
    mutate(newTodos)
  };

  const onClickDeleteTodo = async(event, id) => {
    event.stopPropagation();
    const deletedTodo = await deleteTodo(id);
    const newTodos = todos.filter((todo) => todo.id !== deletedTodo.id);
    mutate(newTodos)
  };

  if(error) {
    return (<>{error.message}</>)
  }

  if(isLoading) {
    return (<>{'Loading...'}</>)
  }

  return (
    <>
      {error && <div className="error-banner">{error}</div>}
      <input
        ref={inputRef}
        placeholder="Type a todo and press 'Enter'"
        className="todo-input"
        onKeyDown={(event) => onEnterTodo(event)}
      />
      {todos && 
      <ul className="todo-container">
        {todos.map((todo, index) => (
          <ListItem
          key={index}
          todo={todo}
          index={index}
          onClickTodoItem={onClickTodoItem}
          onClickDeleteTodo={onClickDeleteTodo}
          />
          ))}
      </ul>
        }
    </>
  );
}
