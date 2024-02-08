import { auth } from "@clerk/nextjs";
import { fetchTodosByUserId } from "@/database/todos";
import TodoItem from "./TodoItem";

export default async function TodosPage() {
  const { userId } = auth();
  const todos = await fetchTodosByUserId(userId);

  if (todos.length === 0) {
    return (
      <div className="empty-todos">
        <h1>Nothing to do!</h1>
        <p>Start by adding a new todo.</p>
      </div>
    );
  }

  return (
    <ul className="todo-container">
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </ul>
  );
}
