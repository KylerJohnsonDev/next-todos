"use client";
import { useState, useEffect } from "react";
import ListItem from "@/components/ListItem";
import { genericFetch } from "@/genericFetch";

const loadTodosFetcher = () => fetch("/api/todos");
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

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      {error && <div className="error-banner">{error}</div>}
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
