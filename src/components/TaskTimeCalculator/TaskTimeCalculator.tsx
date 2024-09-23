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
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Swal from 'sweetalert2';
import { TaskTimeCalculatorProps, WorkerBreakdown } from '../../types/components';
import { calculateTotalTime } from '../../utils/calculateTotalTime';

// Create a custom styled tooltip with a darker background
const DarkTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#333', // Darker background
    color: 'white', // White text
    fontSize: theme.typography.pxToRem(12),
    maxWidth: 300,
  },
}));

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
        text: 'Click OK to see the detailed breakdown of the calculation on the right.',
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

  const tooltipContent = (
    <Box>
      <Typography variant="body2" gutterBottom>
        At Check, we have a workforce on the street that consists of <strong>Swappers</strong>,{' '}
        <strong>Fixers</strong>, and <strong>Mechanics</strong>. These employees have scheduled
        shifts in which they perform specific tasks for our vehicles. <strong>Swappers</strong>{' '}
        replace the batteries of mopeds, <strong>Fixers</strong> do small fixes on mopeds, and{' '}
        <strong>Mechanics</strong> do the bigger repairs.
      </Typography>
      <Typography variant="body2" gutterBottom>
        We would like to know how many minutes it would take a group containing a{' '}
        <strong>Swapper</strong>, a <strong>Fixer</strong>, and a <strong>Mechanic</strong> to
        finish a predetermined route.
      </Typography>
      <Typography variant="body2" gutterBottom>
        You will be given two arrays of data:
      </Typography>
      <Typography variant="body2" gutterBottom>
        1) The first array is a list of mopeds. Each moped consists of a string of characters:{' '}
        <code>S</code>, <code>F</code>, or <code>M</code>. Each character represents a task that
        needs to be performed for that vehicle: <code>S</code> for swapping a battery, <code>F</code>{' '}
        for a small fix, and <code>M</code> for a big repair.
      </Typography>
      <Typography variant="body2" gutterBottom>
        2) The second array is a list of distances in minutes between the mopeds. So,{' '}
        <code>distance[0]</code> is the distance between <code>mopeds[0]</code> and{' '}
        <code>mopeds[1]</code>, <code>distance[1]</code> is the distance between{' '}
        <code>mopeds[1]</code> and <code>mopeds[2]</code>, and so on.
      </Typography>
      <Typography variant="body2" gutterBottom>
        It's a given that a <strong>swap</strong> takes <em>1 minute</em>, a{' '}
        <strong>small fix</strong> takes <em>5 minutes</em>, and a <strong>big repair</strong> takes{' '}
        <em>8 minutes</em>.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Each employee needs to follow the route in the given order. However, they don't always need
        to perform a task at every moped. An employee shouldn't continue their route if there are no
        tasks left for them to do.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, padding: '1rem' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        {totalTime === null ? (
          <Grid item xs={12} md={6}>
            {/* Calculator */}
            <Box sx={{ padding: '1rem', backgroundColor: 'white', boxShadow: 1, }}>
              <Box display="flex" alignItems="baseline" justifyContent="center">
                <Typography variant="h4" gutterBottom>
                  Task Time Calculator
                </Typography>
                <DarkTooltip title={tooltipContent} placement="right-start">
                  <InfoOutlinedIcon
                    sx={(theme) => ({
                      ml: 1,
                      cursor: 'pointer',
                      fontSize: theme.typography.h4.fontSize, // Match icon size to header
                    })}
                  />
                </DarkTooltip>
              </Box>
              <Typography variant="body1" gutterBottom align="center">
                Calculate the total time for the group to complete the route.
              </Typography>

              <Box
                sx={{
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: 'white',
                  shadow: 1,
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
              <Box sx={{ padding: '1rem', backgroundColor: 'white', boxShadow: 1, }}>
                <Box display="flex" alignItems="baseline" justifyContent="center">
                  <Typography variant="h4" gutterBottom>
                    Task Time Calculator
                  </Typography>
                  <DarkTooltip title={tooltipContent} placement="right-start">
                    <InfoOutlinedIcon
                      sx={(theme) => ({
                        ml: 1,
                        cursor: 'pointer',
                        fontSize: theme.typography.h4.fontSize, // Match icon size to header
                      })}
                    />
                  </DarkTooltip>
                </Box>
                <Typography variant="body1" gutterBottom align="center">
                  Calculate the total time for the group to complete the route.
                </Typography>

                <Box
                  sx={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: 'white',
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
              <Box sx={{ padding: '1rem', backgroundColor: 'white', boxShadow: 1, }}>
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
