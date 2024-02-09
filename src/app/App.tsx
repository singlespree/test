import React from 'react';
import TodoList from '../features/todoList/TodoList.tsx';
import { CssBaseline, Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>ToDo List</h1>
        <TodoList />
      </Container>
    </>
  );
};

export default App;
