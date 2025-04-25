import React, { useState, useEffect } from 'react';
import { Typography, Button, CircularProgress, Box } from '@mui/material';

const Timer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 100 - (timeLeft / duration) * 100;

  return (
    <Box sx={{ textAlign: 'center', my: 3 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress 
          variant="determinate" 
          value={progress} 
          size={120}
          thickness={4}
          sx={{ color: 'primary.main' }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div">
            {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => setIsRunning(!isRunning)}
          sx={{ mr: 2 }}
        >
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(duration);
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;
