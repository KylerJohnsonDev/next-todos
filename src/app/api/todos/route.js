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
      userId
    }
  })

  return Response.json(todo);
}