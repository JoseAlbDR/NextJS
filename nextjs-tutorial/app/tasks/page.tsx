import React from 'react';
import TaskForm from '../../components/TaskForm';
import prisma from '@/utils/db';
import TaskList from '@/components/TaskList';

const TasksPage = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TasksPage;
