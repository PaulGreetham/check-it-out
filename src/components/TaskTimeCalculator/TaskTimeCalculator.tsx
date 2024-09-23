// src/components/TaskTimeCalculator.tsx

import React, { useState, useEffect } from 'react';
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
  Divider,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';
import { TaskTimeCalculatorProps, WorkerBreakdown } from '../../types/components';
import { calculateTotalTime } from '../../utils/calculateTotalTime';

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
    setTotalTime(null);
    setDetailedBreakdown(null);

    const mopedsArray = mopeds.split(',').map((m) => m.trim());
    const distancesArray = distances.split(',').map((d) => d.trim());

    // Validation for mopeds input
    const invalidMoped = mopedsArray.find((moped) => !/^[SFM]+$/i.test(moped));
    if (invalidMoped) {
      setError(`Invalid moped entry: "${invalidMoped}". Only letters S, F, M are allowed.`);
      return;
    }

    // Validation for distances input
    const invalidDistance = distancesArray.find((distance) => !/^\d+$/.test(distance));
    if (invalidDistance) {
      setError(`Invalid distance entry: "${invalidDistance}". Only numbers are allowed.`);
      return;
    }

    // Convert distancesArray to numbers
    const distancesNumberArray = distancesArray.map((d) => parseInt(d, 10));

    if (distancesNumberArray.length !== mopedsArray.length - 1) {
      setError('The number of distances should be one less than the number of mopeds.');
      return;
    }

    const { totalTime: total, workerBreakdowns } = calculateTotalTime(
      mopedsArray,
      distancesNumberArray
    );
    setTotalTime(total);
    setDetailedBreakdown(workerBreakdowns);
  };

  useEffect(() => {
    if (totalTime !== null) {
      Swal.fire({
        title: `Total Time: ${totalTime} minutes`,
        text: 'Click OK to see the detailed breakdown.',
        icon: 'success',
      });
    }
  }, [totalTime]);

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
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        {totalTime === null ? (
          <Grid item xs={12} md={6}>
            {/* Calculator */}
            <Box sx={{ padding: '1rem', backgroundColor: 'white', boxShadow: 1 }}>
              <Typography variant="h4" gutterBottom align="center">
                Task Time Calculator
              </Typography>
              <Typography variant="body1" gutterBottom align="center">
                Calculate the total time for the group to complete the route.
              </Typography>

              <Box
                sx={{
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: 'white',
                  boxShadow: 1,
                }}
              >
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
              </Box>

              <TextField
                fullWidth
                label="Mopeds (e.g., S, F, SF, FF)"
                variant="outlined"
                value={mopeds}
                onChange={handleMopedsChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Distances in minutes (e.g., 2, 4, 3)"
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
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              {/* Calculator */}
              <Box sx={{ padding: '1rem', backgroundColor: 'white', boxShadow: 1 }}>
                <Typography variant="h4" gutterBottom align="center">
                  Task Time Calculator
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Calculate the total time for the group to complete the route.
                </Typography>

                <Box
                  sx={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: 'white',
                    boxShadow: 1,
                  }}
                >
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
                </Box>

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
                  Recalculate
                </Button>

                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Results and Breakdown */}
              <Box sx={{ padding: '1rem', backgroundColor: 'white', boxShadow: 1 }}>
                <Typography variant="h5" sx={{ mb: 2 }} align="center">
                  Total Time: {totalTime} minutes
                </Typography>
                <Divider />
                <div style={{ marginTop: '1rem' }}>
                  {detailedBreakdown?.map((worker) => (
                    <Accordion key={worker.workerName}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        sx={{
                          backgroundColor: getColorForWorker(worker.workerName),
                          color: 'white',
                        }}
                      >
                        <Typography variant="h6">
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
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default TaskTimeCalculator;
