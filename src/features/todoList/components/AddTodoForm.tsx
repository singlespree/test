import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleAddTodo} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="new-todo"
        label="What needs to be done?"
        name="title"
        autoComplete="off"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Todo
      </Button>
    </Box>
  );
};

export default AddTodoForm;
