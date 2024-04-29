import React from 'react';

const TaskForm = ({
  onSubmit,
}: {
  onSubmit: (content: string) => Promise<void>;
}) => {
  return (
    <form
      className="flex gap-4 justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const content = formData.get('content') as string;
        onSubmit(content);
      }}
    >
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
