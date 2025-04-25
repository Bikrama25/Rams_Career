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
