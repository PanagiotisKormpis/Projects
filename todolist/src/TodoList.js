import React, { useState } from 'react';
import Todo from './Todo';
import Button from './Button';
import './index.css';

const TodoList = () => {
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id, updatedText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedText } : todo
      )
    );
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddOrUpdateTask = (id, task) => {
    if (id) {
      handleUpdate(id, task);
    } else {
      if (task.trim() !== '') {
        setTodos((prevTodos) => [
          ...prevTodos,
          { id: prevTodos.length + 1, text: task, completed: false },
        ]);
        setNewTask('');
      }
    }
  };

  return (
    <div>
      <div className='main-placeholder'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <Button
          onClick={() => handleAddOrUpdateTask(null, newTask)}
          label="Add Task"
          type="button"
        />
      </div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
