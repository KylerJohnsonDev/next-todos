import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

export default function handler(req, res) {
  if (req.method === "GET") {
    return getTodos(req, res);
  } else if (req.method === "POST") {
    return createTodo();
  } else if (req.method === "PUT") {
    return updateTodo();
  } else if (req.method === "DELETE") {
    return deleteTodo();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export async function getTodos(req, res) {
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const todos = await prismaClient.todo.findMany({
    where: {
      userId,
    },
  });
  res.status(200).json(todos);
}

async function createTodo(req, res) {
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { text } = req.body;
  const todo = await prismaClient.todo.create({
    data: {
      text,
      userId,
    },
  });
  return res.status(200).json(todo);
}

async function updateTodo(req, res) {
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { id, isComplete } = req.body;
  const todo = await prismaClient.todo.update({
    where: {
      id,
    },
    data: {
      isComplete,
    },
  });
  return res.status(200).json(todo);
}

async function deleteTodo(req, res) {
  const prismaClient = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { id } = req.body;
  const todo = await prismaClient.todo.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(todo);
}
