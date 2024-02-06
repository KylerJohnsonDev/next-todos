import { Todo } from "@prisma/client";

export function fetchTodosByUserId(userId: string): Promise<Todo[]> {
  return prisma.todo.findMany({
    where: {
      userId,
    },
  });
}

export function createTodo(userId: string, text: string): Promise<Todo> {
  return prisma.todo.create({
    data: {
      text,
      userId,
    },
  });
}

export function updateTodoById(id: number, isComplete: boolean): Promise<Todo> {
  return prisma.todo.update({
    where: {
      id,
    },
    data: {
      isComplete,
    },
  });
}

export function deleteTodoById(id: number): Promise<Todo> {
  return prisma.todo.delete({
    where: {
      id,
    },
  });
}
