import { auth } from "@clerk/nextjs";
import {
  fetchTodosByUserId,
  createTodo,
  updateTodoById,
  deleteTodoById,
} from "@/database/todos";
import TodoList from "./TodoList";
import { revalidatePath } from "next/cache";

export default async function TodosPage() {
  const { userId } = auth();
  const todos = await fetchTodosByUserId(userId);

  async function addTodo(formData) {
    "use server";
    const { userId } = auth();
    const todoText = formData.get("todoText");
    await createTodo(userId, todoText);
    revalidatePath("/todos");
  }

  async function toggleTodoStatus(todo) {
    "use server";
    await updateTodoById(todo.id, !todo.isComplete);
    revalidatePath("/todos");
  }

  async function deleteTodoById(id) {
    "use server";
    await deleteTodoById(id);
    revalidatePath("/todos");
  }

  return (
    <>
      <form action={addTodo}>
        <input
          name="todoText"
          className="todo-input"
          type="text"
          placeholder="Add a new todo"
        />
      </form>

      <TodoList
        todos={todos}
        toggleTodoStatus={toggleTodoStatus}
        deleteTodoById={deleteTodoById}
      />
    </>
  );
}
