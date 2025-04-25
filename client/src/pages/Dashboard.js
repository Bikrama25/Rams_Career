import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import MeditationProgress from '../components/MeditationProgress';
import HabitTracker from '../components/HabitTracker';
import TaskList from '../components/TaskList';
import MoodTracker from '../components/MoodTracker';
import DailyQuote from '../components/DailyQuote';
import MemorySection from '../components/MemorySection';
import authService from '../services/auth.service';
import apiService from '../services/api.service';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  height: '100%',
}));

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    meditation: { completed: 0, total: 5 },
    habits: { completed: 0, total: 10 },
    tasks: { completed: 0, total: 5 }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        
        const statsData = await apiService.getDashboardStats();
        setStats(statsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.username}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Daily Quote */}
        <Grid item xs={12} md={6}>
          <Item>
            <DailyQuote />
          </Item>
        </Grid>
        
        {/* Meditation Progress */}
        <Grid item xs={12} md={6}>
          <Item>
            <MeditationProgress 
              completed={stats.meditation.completed} 
              total={stats.meditation.total} 
            />
          </Item>
        </Grid>
        
        {/* Habit Tracker */}
        <Grid item xs={12} md={6}>
          <Item>
            <HabitTracker 
              completed={stats.habits.completed} 
              total={stats.habits.total} 
            />
          </Item>
        </Grid>
        
        {/* Mood Tracker */}
        <Grid item xs={12} md={6}>
          <Item>
            <MoodTracker />
          </Item>
        </Grid>
        
        {/* Task List */}
        <Grid item xs={12} md={6}>
          <Item>
            <TaskList 
              completed={stats.tasks.completed} 
              total={stats.tasks.total} 
            />
          </Item>
        </Grid>
        
        {/* Memory Section */}
        <Grid item xs={12} md={6}>
          <Item>
            <MemorySection />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
