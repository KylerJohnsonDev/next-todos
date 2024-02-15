import { auth } from "@clerk/nextjs";
import { fetchTodosByUserId } from "@/database/todos";
import TodoList from "./TodoList";
import { createTodo } from "@/database/todos";
import { revalidatePath } from "next/cache";

export default async function TodosPage() {
  const { userId } = auth();
  const todos = await fetchTodosByUserId(userId);

  async function addTodo(formData) {
    "use server";
    const { userId } = auth();
    const todoText = formData.get("todo");
    await createTodo(userId, todoText);
    revalidatePath("/todos");
  }

  return (
    <>
      <form action={addTodo}>
        <input
          name="todo"
          className="todo-input"
          type="text"
          placeholder="Enter todo text"
        />
      </form>

      <TodoList todos={todos} />
    </>
  );
}
