import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TaskTimeCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [mopeds, setMopeds] = useState<string>('S, F, SF, FF');  // Storing mopeds as string for input
  const [distances, setDistances] = useState<string>('2, 4, 3');  // Storing distances as string for input
  const [totalTime, setTotalTime] = useState<number | null>(null);

  // Function to calculate total time
  const calculateTotalTime = (mopedsArray: string[], distancesArray: number[]): number => {
    const taskTimes: Record<string, number> = { S: 1, F: 5, M: 8 };  // Define task times
    let totalTime = 0;

    mopedsArray.forEach((moped, i) => {
      // Calculate task time for the current moped
      for (const task of moped) {
        if (taskTimes[task]) {
          totalTime += taskTimes[task];
        }
      }

      // Add travel time (if not the last moped) and ensure it's a valid number
      if (i < distancesArray.length && !isNaN(distancesArray[i])) {
        totalTime += distancesArray[i];
      }
    });

    return totalTime;
  };

  // Handle mopeds input as a string and process them as array during calculation
  const handleMopedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMopeds(e.target.value);  // Store mopeds as raw string input
  };

  // Handle distances input as a string and process them as numbers during calculation
  const handleDistancesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistances(e.target.value);  // Store distances as raw string input
  };

  // Handle calculation
  const handleCalculate = () => {
    // Parse the mopeds string into an array of valid tasks, filtering out invalid values
    const mopedsArray = mopeds
      .split(',')
      .map((m) => m.trim())  // Trim whitespace
      .filter((m) => /^[SFM]+$/.test(m));  // Filter valid moped tasks (S, F, M)

    // Parse the distances string into an array of numbers, filtering out invalid values
    const distancesArray = distances
      .split(',')
      .map((d) => parseInt(d.trim(), 10))  // Parse to number
      .filter((d) => !isNaN(d));  // Filter out invalid numbers

    setTotalTime(calculateTotalTime(mopedsArray, distancesArray));
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <CardContent>
        <Typography variant="h1" gutterBottom>
          {t('taskTimeCalculator.welcome')} {/* Translated "Welcome" */}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t('taskTimeCalculator.explanation')} {/* Translated "Explanation" */}
        </Typography>

        {/* Mopeds Input Field */}
        <TextField
          fullWidth
          label={t('taskTimeCalculator.mopedsLabel')} // Translated "Mopeds label"
          variant="outlined"
          value={mopeds} // Use the mopeds string for input
          onChange={handleMopedsChange}
          sx={{ mb: 2 }}
        />

        {/* Distances Input Field */}
        <TextField
          fullWidth
          label={t('taskTimeCalculator.distancesLabel')} // Translated "Distances label"
          variant="outlined"
          value={distances} // Use the distances string for input
          onChange={handleDistancesChange}
          sx={{ mb: 2 }}
        />

        {/* Calculate Button */}
        <Button variant="contained" color="primary" onClick={handleCalculate} fullWidth>
          {t('taskTimeCalculator.calculate')}  {/* Translated "Calculate" */}
        </Button>

        {/* Display Total Time if Calculated */}
        {totalTime !== null && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('taskTimeCalculator.totalTime', { time: totalTime })}  {/* Translated "Total Time" */}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskTimeCalculator;
