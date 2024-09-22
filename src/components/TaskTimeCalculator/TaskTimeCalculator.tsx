// src/components/TaskTimeCalculator.tsx

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TaskTimeCalculatorProps, WorkerBreakdown } from '../../types/components';
import { calculateTotalTime } from '../../utils/calculateTotalTime';

// Import the image from the assets folder
import TravelingImage from '../../assets/undraw_traveling_yhxq.svg';

const TaskTimeCalculator: React.FC<TaskTimeCalculatorProps> = ({
  initialMopeds = '',
  initialDistances = '',
}) => {
  const [mopeds, setMopeds] = useState<string>(initialMopeds);
  const [distances, setDistances] = useState<string>(initialDistances);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detailedBreakdown, setDetailedBreakdown] = useState<WorkerBreakdown[] | null>(null);

  const handleMopedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMopeds(e.target.value);
  };

  const handleDistancesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistances(e.target.value);
  };

  const handleCalculate = () => {
    setError(null);
    const mopedsArray = mopeds.split(',').map((m) => m.trim());
    const distancesArray = distances.split(',').map((d) => parseInt(d.trim(), 10));

    // Validation
    if (distancesArray.length !== mopedsArray.length - 1) {
      setError('The number of distances should be one less than the number of mopeds.');
      setTotalTime(null);
      setDetailedBreakdown(null);
      return;
    }

    const { totalTime: total, workerBreakdowns } = calculateTotalTime(mopedsArray, distancesArray);
    setTotalTime(total);
    setDetailedBreakdown(workerBreakdowns);
  };

  const getColorForWorker = (workerName: string): string => {
    switch (workerName) {
      case 'Swapper':
        return '#4caf50';
      case 'Fixer':
        return '#ff9800';
      case 'Mechanic':
        return '#f44336';
      default:
        return '#000';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '1rem' }}>
      {/* Grid Container */}
      <Grid container spacing={2}>
        {/* Column 1: Image */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <img
              src={TravelingImage}
              alt="Traveling"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>

        {/* Column 2: Calculator */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h4" gutterBottom align="center">
              Task Time Calculator
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Calculate the total time for the group to complete the route.
            </Typography>

            <Paper elevation={1} sx={{ padding: '1rem', marginBottom: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                Task Types:
              </Typography>
              <List dense>
                <ListItem>
                  <Typography variant="body1">
                    <strong>S:</strong> Swap (1 minute)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>F:</strong> Fix (5 minutes)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>M:</strong> Mechanic repair (8 minutes)
                  </Typography>
                </ListItem>
              </List>
            </Paper>

            <TextField
              fullWidth
              label="Mopeds (e.g., S,F,SF,FF)"
              variant="outlined"
              value={mopeds}
              onChange={handleMopedsChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Distances in minutes (e.g., 2,4,3)"
              variant="outlined"
              value={distances}
              onChange={handleDistancesChange}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleCalculate}
              fullWidth
              size="large"
            >
              Calculate
            </Button>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Column 3: Results and Breakdown */}
        <Grid item xs={12} md={4}>
          {totalTime !== null && detailedBreakdown && (
            <Paper elevation={3} sx={{ padding: '1rem' }}>
              <Typography variant="h5" sx={{ mb: 2 }} align="center">
                Total Time: {totalTime} minutes
              </Typography>
              <Divider />
              <div style={{ marginTop: '1rem' }}>
                {detailedBreakdown.map((worker) => (
                  <Accordion key={worker.workerName} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        variant="h6"
                        style={{ color: getColorForWorker(worker.workerName) }}
                      >
                        {worker.workerName}: {worker.time} minutes
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {worker.breakdownItems.map((item, index) => (
                          <ListItem key={index}>
                            <Typography variant="body1">{item.description}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskTimeCalculator;
