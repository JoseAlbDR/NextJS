import React from 'react';
import TaskForm from '../../components/TaskForm';
import prisma from '@/utils/db';

const TasksPage = async () => {
  const onSubmit = async (content: string) => {
    await prisma.task.create({
      data: { content },
    });
  };

  return (
    <div>
      <TaskForm onSubmit={onSubmit} />
    </div>
  );
};

export default TasksPage;
