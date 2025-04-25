import React from 'react';
import { Box, Typography, LinearProgress, List, ListItem, 
  ListItemText, Checkbox, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const habits = [
  { id: 1, name: 'Morning Meditation', completed: true },
  { id: 2, name: 'Drink 2L Water', completed: false },
  { id: 3, name: 'Healthy Breakfast', completed: true },
  { id: 4, name: 'Exercise', completed: false },
  { id: 5, name: 'Night Meditation', completed: false },
];

const HabitTracker = ({ completed, total }) => {
  const [newHabit, setNewHabit] = React.useState('');
  
  const progress = Math.round((completed / total) * 100);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Daily Habits
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ height: 10, borderRadius: 5, mb: 2 }}
      />
      <Typography variant="body2" color="text.secondary">
        {completed} of {total} completed
      </Typography>
      
      <List>
        {habits.map((habit) => (
          <ListItem
            key={habit.id}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={habit.completed}
                onChange={() => {}}
              />
            }
          >
            <ListItemText primary={habit.name} />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <TextField
          size="small"
          placeholder="Add new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          fullWidth
        />
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HabitTracker;
