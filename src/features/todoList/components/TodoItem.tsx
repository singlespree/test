import React, { useState } from 'react';
import { Card, CardContent, CardActions, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface TodoItemProps {
  id: number;
  title: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, status: 'new' | 'in_progress' | 'completed') => void;
  status: 'new' | 'in_progress' | 'completed';
}


const TodoItem: React.FC<TodoItemProps> = ({ id, title, onDelete, onUpdate, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
  };
  const handleSave = () => {
    onUpdate(id, newTitle, status);
    setIsEditing(false);
  };

  const getNextStatus = (currentStatus: TodoItemProps['status']): TodoItemProps['status'] => {
    const statusOrder: TodoItemProps['status'][] = ['new', 'in_progress', 'completed'];
    const nextIndex = (statusOrder.indexOf(currentStatus) + 1) % statusOrder.length;
    return statusOrder[nextIndex] as TodoItemProps['status'];
  };

  const getPreviousStatus = (currentStatus: TodoItemProps['status']): TodoItemProps['status'] => {
    const statusOrder: TodoItemProps['status'][] = ['new', 'in_progress', 'completed'];
    const previousIndex = statusOrder.indexOf(currentStatus) - 1;
    if (previousIndex < 0) {
      return statusOrder[0] as TodoItemProps['status'];
    }
    return statusOrder[previousIndex] as TodoItemProps['status'];
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
            <IconButton onClick={() => onUpdate(id, newTitle, getPreviousStatus(status))}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={() => onUpdate(id, newTitle, getNextStatus(status))}>
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default TodoItem;
