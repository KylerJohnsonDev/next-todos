import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

export async function GET() {
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const todos = await prismaClient.todo.findMany({
    where: {
      userId,
    },
  });

  return Response.json(todos);
}

export async function POST(req) {
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const { text } = await req.json();
  const todo = await prismaClient.todo.create({
    data: {
      text,
      userId,
    },
  });
  return Response.json(todo);
}

export async function PUT(req) {
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const { id, isComplete } = await req.json();
  const updatedTodo = await prismaClient.todo.update({
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
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    return Response.error(401, "Unauthorized");
  }
  const { id } = await req.json();
  const todo = await prismaClient.todo.delete({
    where: {
      id,
    },
  });
  return Response.json(todo);
}
