import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TaskTimeCalculator: React.FC = () => {
  const { t } = useTranslation(); // For translations
  const [mopeds, setMopeds] = useState<string[]>(['S', 'F', 'SF', 'FF']); // Initial example data
  const [distances, setDistances] = useState<number[]>([2, 4, 3]); // Initial example distances
  const [totalTime, setTotalTime] = useState<number | null>(null);

  // Function to calculate total time
  const calculateTotalTime = (mopeds: string[], distances: number[]): number => {
    const taskTimes: Record<string, number> = { S: 1, F: 5, M: 8 };
    let totalTime = 0;

    mopeds.forEach((moped, i) => {
      // Calculate task time for the current moped
      for (const task of moped) {
        totalTime += taskTimes[task];
      }

      // Add travel time (if not the last moped)
      if (i < distances.length) {
        totalTime += distances[i];
      }
    });

    return totalTime;
  };

  // Handle calculation
  const handleCalculate = () => {
    const calculatedTime = calculateTotalTime(mopeds, distances);
    setTotalTime(calculatedTime);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <CardContent>
        <Typography variant="h1" gutterBottom>
          {t('taskTimeCalculator.welcome')} {/* Translated Title */}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t('taskTimeCalculator.explanation')} {/* Translated Explanation */}
        </Typography>

        <TextField
          fullWidth
          label={t('taskTimeCalculator.mopedsLabel')} // Mopeds input label
          variant="outlined"
          value={mopeds.join(', ')}
          onChange={(e) => setMopeds(e.target.value.split(',').map(m => m.trim()))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label={t('taskTimeCalculator.distancesLabel')} // Distances input label
          variant="outlined"
          value={distances.join(', ')}
          onChange={(e) => setDistances(e.target.value.split(',').map(d => parseInt(d.trim(), 10)))}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleCalculate} fullWidth>
          {t('taskTimeCalculator.calculate')}  {/* Translated Button Text */}
        </Button>
        {totalTime !== null && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('taskTimeCalculator.totalTime', { time: totalTime })}  {/* Translated Total Time */}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskTimeCalculator;
