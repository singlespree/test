import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container } from '@mui/material';
import AddTodoForm from './components/AddTodoForm';
import TodoItem from './components/TodoItem';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../../shared/api/mockApi';

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  const handleAdd = (title: string) => {
    addMutation.mutate(title);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = (id: number, title: string, status: 'new' | 'in_progress' | 'completed') => {
    updateMutation.mutate({ id, title, status });
  };

  return (
    <Container maxWidth="sm">
      <AddTodoForm onAdd={handleAdd} />
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          status={todo.status}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </Container>
  );
};

export default TodoList;
