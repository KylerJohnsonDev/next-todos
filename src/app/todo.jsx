import { genericFetch } from "@/genericFetch";
import { useState, useEffect, useRef } from "react";
import TodoList from "@/components/TodoList";

const createTodoFetcher = (text) => {
  return () =>
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
};

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

export default function Todo () {
  const [todos, setTodos] = useState([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

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
    const newTodo = {...todo, isComplete: !todo.isComplete }
    const { data, error } = await genericFetch(updateTodoFetcher(newTodo));
    if (error) {
      setError(`Error updating todo: ${error}`);
    }
    if (data) {
      const newTodos = [...todos];
      const index = newTodos.findIndex((t) => t.id === todo.id);
      newTodos.splice(index, 1, newTodo);
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

  return (
    <>
      {error && <div className="error-banner">{error}</div>}
      <input
        ref={inputRef}
        placeholder="Type a todo and press 'Enter'"
        className="todo-input"
        onKeyDown={(event) => onEnterTodo(event)}
      />
      <TodoList todos={todos} isLoadingTodos={isLoadingTodos} onClickTodoItem={onClickTodoItem} deleteTodo={deleteTodo} />
    </>
  );
}