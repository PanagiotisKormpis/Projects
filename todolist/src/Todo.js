import React, { useState } from 'react';
import Button from './Button';
import './index.css';

const Todo = ({ id, text, completed, onDelete, onUpdate, onToggleComplete }) => {
  const [task, setTask] = useState(text);
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = () => {
    onUpdate(id, task);
    setEditing(false);
  };

  return (
    <div className='list'>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleComplete(id)}
      />
      {isEditing ? (
        <div>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
          <Button onClick={handleUpdate} label="Update" type="button" />
        </div>
      ) : (
        <div>
          <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {text}
          </span>
          <Button onClick={() => setEditing(true)} label="Edit" type="button" />
          <Button onClick={() => onDelete(id)} label="Delete" type="button" />
        </div>
      )}
    </div>
  );
};

export default Todo;