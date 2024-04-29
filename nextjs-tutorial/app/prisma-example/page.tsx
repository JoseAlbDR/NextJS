import prisma from '@/utils/db';
import React from 'react';

const prismaHandlers = async () => {
  await prisma.task.create({
    data: {
      content: 'Test content',
    },
  });
  const allTasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
  console.log({ allTasks });
  return allTasks;
};

const PrismaExamplePage = async () => {
  const tasks = await prismaHandlers();

  return (
    <div>
      <h1 className="text-7xl">PrismaExamplePage</h1>
      {tasks.map((task) => {
        return (
          <h2 key={task.id} className="text-xl py-2">
            {task.content}
          </h2>
        );
      })}
    </div>
  );
};

export default PrismaExamplePage;
