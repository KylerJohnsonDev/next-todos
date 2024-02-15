import { auth } from "@clerk/nextjs";
import {
  deleteTodoById,
  fetchTodosByUserId,
  updateTodoById,
} from "@/database/todos";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return { redirect: "/sign-in" };
  }
  const todos = await fetchTodosByUserId(userId);

  return Response.json(todos);
}

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return { redirect: "/sign-in" };
  }
  const { text } = await req.json();
  const todo = await createTodo(userId, text);

  return Response.json(todo);
}

export async function PUT(req) {
  const { userId } = auth();
  if (!userId) {
    return { redirect: "/sign-in" };
  }
  const { id, isComplete } = await req.json();
  const todo = await updateTodoById(id, isComplete);

  return Response.json(todo);
}

export async function DELETE(req) {
  const { userId } = auth();
  if (!userId) {
    return { redirect: "/sign-in" };
  }
  const { id } = await req.json();
  const todo = await deleteTodoById(id);

  return Response.json(todo);
}
