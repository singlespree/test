import React, { useState } from 'react';
import { Card, CardContent, CardActions, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface TodoItemProps {
  id: number;
  title: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
  };
  const handleSave = () => {
    onUpdate(id, newTitle);
    setIsEditing(false);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        {isEditing ? (
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
          />
        ) : (
          <div>{title}</div>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <>
            <IconButton onClick={handleSave}><SaveIcon /></IconButton>
            <IconButton onClick={handleCancel}><CancelIcon /></IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEdit}><EditIcon /></IconButton>
            <IconButton onClick={() => onDelete(id)}><DeleteIcon /></IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default TodoItem;
