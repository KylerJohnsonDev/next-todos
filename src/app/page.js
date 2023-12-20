"use client";
import TodoList from "@/components/TodoList";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { genericFetch } from "@/genericFetch";

const createTodoFetcher = (text) => {
  return () =>
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
};

export default function Home() {
  const inputRef = useRef(null);

  const onEnterTodo = async (event) => {
    if (event.key === "Enter") {
      const { data, error } = await genericFetch(
        createTodoFetcher(event.target.value)
      );
      if (error) {
        setError(error);
      }
      if (data) {
        const updatedTodos = [...todos, data];
        setTodos(updatedTodos);
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Type a todo and press 'Enter'"
        className="todo-input"
        onKeyDown={(event) => onEnterTodo(event)}
      />
      <TodoList />
    </>
  );
}
