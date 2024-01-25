'use client'
import ListItem from "@/components/ListItem";
import React, { useRef, useState } from "react";
import useSWR from "swr";

const todosFetcher = url => fetch(url).then(res => res.json());

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

  const [todos, setTodos] = useState([]);
  // const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const { data, error, isLoading } = useSWR('/api/todos', todosFetcher);

  const onEnterTodo = async(event) => {
    if (event.key === "Enter") {
      const todo = await createTodo(event.target.value);
      const newTodos = [...todos, todo];
      setTodos(newTodos);
      inputRef.current.value = "";
    }
  };

  const onClickTodoItem = async(todo, index) => {
    const todoToUpdate = { ...todo, isComplete: !todo.isComplete };
    const updatedTodo = await updateTodo(todoToUpdate);
    const newTodos = [...todos];
    newTodos.splice(index, 1, updatedTodo);
    setTodos(newTodos);
  };

  const onClickDeleteTodo = async(event, id) => {
    event.stopPropagation();
    const deletedTodo = await deleteTodo(id);
    const newTodos = todos.filter((todo) => todo.id !== deletedTodo.id);
    setTodos(newTodos);
  };

  if(error) {
    return (<>{error.message}</>)
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
      {data && 
      <ul className="todo-container">
        {data.map((todo, index) => (
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
