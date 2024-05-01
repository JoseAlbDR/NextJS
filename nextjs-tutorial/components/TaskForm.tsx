import { createTaskAction } from '@/utils/actions';
import React from 'react';

const TaskForm = async () => {
  return (
    <form className="flex gap-4 justify-between" action={createTaskAction}>
      <label className="input input-bordered flex items-center gap-2 grow">
        <input
          type="text"
          placeholder="Content"
          className="grow"
          name="content"
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default TaskForm;
