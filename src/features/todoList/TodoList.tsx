import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Grid, Paper, Typography } from '@mui/material';
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

  if (!todos) {
    return <div>No todos found.</div>;
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

  const todosByStatus = (status: 'new' | 'in_progress' | 'completed') => {
    return todos.filter(todo => todo.status === status);
  };

  return (
    <Container maxWidth="lg">
      <AddTodoForm onAdd={handleAdd} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography className="TodoList-title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            New
          </Typography>
          <Paper className="TodoList-paper" elevation={3}>
            {todosByStatus('new').map((todo) => (
              <TodoItem key={todo.id} {...todo} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Typography className="TodoList-title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            In Progress
          </Typography>
          <Paper className="TodoList-paper" elevation={3}>
            {todosByStatus('in_progress').map((todo) => (
              <TodoItem key={todo.id} {...todo} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Typography className="TodoList-title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Completed
          </Typography>
          <Paper className="TodoList-paper" elevation={3}>
            {todosByStatus('completed').map((todo) => (
              <TodoItem key={todo.id} {...todo} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};


export default TodoList;
