import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, Paper, RadioGroup, 
  FormControlLabel, Radio, Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Timer from '../components/Timer';
import apiService from '../services/api.service';

const steps = ['Body', 'Senses', 'Mind', 'Intelligence', 'Soul', 'Paramatma'];

const Meditation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [type, setType] = useState('instant');
  const [duration, setDuration] = useState(5);
  const [moodBefore, setMoodBefore] = useState('neutral');
  const [moodAfter, setMoodAfter] = useState('neutral');
  const [isActive, setIsActive] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const handleStartSession = async () => {
    try {
      const response = await apiService.startMeditation({
        type,
        duration,
        moodBefore
      });
      setSessionId(response._id);
      setIsActive(true);
    } catch (error) {
      console.error('Error starting meditation:', error);
    }
  };

  const handleCompleteSession = async () => {
    try {
      await apiService.completeMeditation(sessionId, {
        moodAfter,
        flowPath: steps.slice(0, activeStep + 1)
      });
      setIsActive(false);
      setActiveStep(0);
    } catch (error) {
      console.error('Error completing meditation:', error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Meditation Practice
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Meditation Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isActive}
          >
            <MenuItem value="instant">Instant Meditation (3-15 mins)</MenuItem>
            <MenuItem value="night">Night Mantra Meditation (30 mins)</MenuItem>
          </Select>
        </FormControl>
        
        <Typography gutterBottom>Duration: {duration} minutes</Typography>
        <Slider
          value={duration}
          onChange={(e, newValue) => setDuration(newValue)}
          min={3}
          max={type === 'night' ? 30 : 15}
          disabled={isActive}
          sx={{ mb: 2 }}
        />
        
        <Typography gutterBottom>Current Mood</Typography>
        <RadioGroup
          row
          value={moodBefore}
          onChange={(e) => setMoodBefore(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value="excited" control={<Radio />} label="Excited" />
          <FormControlLabel value="happy" control={<Radio />} label="Happy" />
          <FormControlLabel value="neutral" control={<Radio />} label="Neutral" />
          <FormControlLabel value="sad" control={<Radio />} label="Sad" />
          <FormControlLabel value="angry" control={<Radio />} label="Angry" />
          <FormControlLabel value="anxious" control={<Radio />} label="Anxious" />
        </RadioGroup>
        
        {!isActive ? (
          <Button 
            variant="contained" 
            onClick={handleStartSession}
            fullWidth
          >
            Start Meditation
          </Button>
        ) : (
          <Box>
            <Timer duration={duration * 60} onComplete={handleCompleteSession} />
            
            <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </Button>
            </Box>
            
            <Typography variant="h6" sx={{ mt: 2 }}>
              Current Focus: {steps[activeStep]}
            </Typography>
            
            {activeStep === 0 && (
              <Typography sx={{ mt: 2 }}>
                Body (Buddha): Watch your full body. Check water intake, diabetic nutritious food, medicine, 
                practice self-defense & exercise, monitor sugar & pressure levels.
              </Typography>
            )}
            
            {/* Other step content would go here */}
            
            <Typography gutterBottom sx={{ mt: 3 }}>Resulting Mood</Typography>
            <RadioGroup
              row
              value={moodAfter}
              onChange={(e) => setMoodAfter(e.target.value)}
              sx={{ mb: 2 }}
            >
              <FormControlLabel value="excited" control={<Radio />} label="Excited" />
              <FormControlLabel value="happy" control={<Radio />} label="Happy" />
              <FormControlLabel value="neutral" control={<Radio />} label="Neutral" />
              <FormControlLabel value="sad" control={<Radio />} label="Sad" />
              <FormControlLabel value="angry" control={<Radio />} label="Angry" />
              <FormControlLabel value="anxious" control={<Radio />} label="Anxious" />
            </RadioGroup>
            
            <Button 
              variant="contained" 
              color="success" 
              onClick={handleCompleteSession}
              fullWidth
            >
              Complete Session
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Meditation;
