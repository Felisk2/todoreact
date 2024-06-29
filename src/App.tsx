import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, Todo } from './api';
import { TodoList } from './TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        setError('Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const newTask = { id: todos.length + 1, title: newTodo };
    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>TodoList</h1>
      <input
        type="text"
        id="input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button id="add" onClick={handleAddTodo} disabled={newTodo.trim() === ''}>
        Add
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <TodoList todos={todos} onDelete={handleDeleteTodo} />}
    </div>
  );
};

export default App;
