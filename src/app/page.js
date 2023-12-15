"use client";
import ListItem from "@/components/ListItem";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";

const genericFetch = async (fetcherFn) => {
  let error = null;
  let data = null;
  try {
    const response = await fetcherFn();
    data = await response.json();
    if (response.status >= 400) {
      error = `Error fetching todos: ${data.message}`;
    }
  } catch (err) {
    error = err.message;
  }
  return { error, data };
};

const loadTodosFetcher = () => fetch("/api/todos");
const createTodoFetcher = (text) => {
  return () =>
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
};
const updateTodoFetcher = (todo) => {
  return () =>
    fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify(todo),
    });
};
const deleteTodoFetcher = (id) => {
  return () =>
    fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
};

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const [afterSignOutUrl, setAfterSignOutUrl] = useState("/");

  useEffect(() => {
    setAfterSignOutUrl(`${window.location.origin}/sign-in`);

    async function loadTodos() {
      const { data, error } = await genericFetch(loadTodosFetcher);
      if (error) {
        setError(error);
      }
      if (data) {
        setTodos(data);
      }
      setIsLoadingTodos(false);
    }

    loadTodos();
  }, []);

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

  const onClickTodoItem = async (todo) => {
    const { data, error } = await genericFetch(updateTodoFetcher(todo));
    if (error) {
      setError(`Error updating todo: ${error}`);
    }
    if (data) {
      const newTodos = [...todos];
      const index = newTodos.findIndex((t) => t.id === todo.id);
      newTodos[index].isComplete = !newTodos[index].isComplete;
      setTodos(newTodos);
    }
  };

  const deleteTodo = async (event, id) => {
    event.stopPropagation();
    const { data, error } = await genericFetch(deleteTodoFetcher(id));
    if (error) {
      setError(`Error deleting todo: ${error}`);
    }
    if (data) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  if (isLoadingTodos) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserButton afterSignOutUrl={afterSignOutUrl} />
      {error && <div className="error-banner">{error}</div>}
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
