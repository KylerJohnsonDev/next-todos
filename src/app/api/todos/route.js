import { auth } from '@clerk/nextjs'
import prisma from '@/db';

export async function GET() {
  const { userId } = auth();
  if(!userId) {
    return { redirect: '/sign-in' }
  }
  const todos = await prisma.todo.findMany({
    where: {
      userId
    }
  })

  return Response.json(todos);
}

export async function POST(req) {
  const { userId } = auth();
  if(!userId) {
    return { redirect: '/sign-in' }
  }
  const { text } = await req.json();
  const todo = await prisma.todo.create({
    data: {
      text,
      userId,
    }
  })

  return Response.json(todo);
}

export async function PUT(req) {
  const { userId } = auth();
  if(!userId) {
    return { redirect: '/sign-in' }
  }
  const { id, isComplete } = await req.json();
  const todo = await prisma.todo.update({
    where: {
      id
    },
    data: {
      isComplete,
    }
  })

  return Response.json(todo);
}

export async function DELETE(req) { 
  const { userId } = auth();
  if(!userId) {
    return { redirect: '/sign-in' }
  }
  const { id } = await req.json();
  const todo = await prisma.todo.delete({
    where: {
      id
    }
  })

  return Response.json(todo);
}