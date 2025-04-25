require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const meditationRoutes = require('./routes/meditation');
const habitRoutes = require('./routes/habits');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meditation', meditationRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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

import React, { useState, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';

const quotes = [
  "Truth must either attract power to its side, or else side with power, for otherwise it will perish again and again.",
  "Never reduce yourself into worm world is much bigger, see the creation of human to cross the barrier and reach the sky.",
  "Whatever you see as beautiful, glorious, or powerful, my Social consciousness, personal and family goals for the next five years.",
  "Actions are louder than voice: don't debate & waste time.",
  "Run & let the world run after you, make them dependent."
];

const DailyQuote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const today = new Date().getDate();
    setQuote(quotes[today % quotes.length]);
  }, []);

  const handleNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Today's Inspiration
      </Typography>
      <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
        "{quote}"
      </Typography>
      <Button 
        variant="outlined" 
        size="small" 
        onClick={handleNewQuote}
      >
        New Quote
      </Button>
    </Box>
  );
};

export default DailyQuote;
