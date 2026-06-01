import React from 'react';
import { Reorder } from 'framer-motion';
import Task from './task/Task';
import './TaskList.scss';

type TaskType = {
  id: number;
  title: string;
  completed: boolean;
  position: number;
};

interface TaskListProps {
  tasks: TaskType[];
  onReorder: (tasks: TaskType[]) => void;
  onToggleCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  updateTaskTitle: (id:number, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onReorder, onToggleCompleted, onDelete, updateTaskTitle}) => {
  return (
    <Reorder.Group
      className="TaskList"
      axis="y"
      onReorder={onReorder}
      values={tasks}
    >
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onDelete={onDelete}
          onUpdateTitle={updateTaskTitle}
        />
      ))}
    </Reorder.Group>
  );
};

export default TaskList;