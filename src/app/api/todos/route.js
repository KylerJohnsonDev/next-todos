import { auth } from "@clerk/nextjs";
import prisma from "@/db";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
  });

  return Response.json(todos);
}

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const { text } = await req.json();
  const todo = await prisma.todo.create({
    data: {
      text,
      userId,
    },
  });
  return Response.json(todo);
}

export async function PUT(req) {
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const { id, isComplete } = await req.json();
  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      isComplete,
    },
  });
  return Response.json(updatedTodo);
}

export async function DELETE(req) {
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const { id } = await req.json();
  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return Response.json(todo);
}
