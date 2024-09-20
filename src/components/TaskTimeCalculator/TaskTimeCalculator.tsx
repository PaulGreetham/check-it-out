import React, { useState } from 'react';
import './TaskTimeCalculator.scss';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const TaskTimeCalculator: React.FC = () => {
  const [mopeds, setMopeds] = useState<string[]>(["S", "F", "SF", "FF"]);
  const [distances, setDistances] = useState<number[]>([2, 4, 3]);
  const [totalTime, setTotalTime] = useState<number | null>(null);

  // Function to calculate total time
  const calculateTotalTime = (mopeds: string[], distances: number[]): number => {
    const taskTimes: Record<string, number> = { S: 1, F: 5, M: 8 };
    let totalTime = 0;

    mopeds.forEach((moped, i) => {
      // Calculate task times for each moped
      for (const task of moped) {
        totalTime += taskTimes[task];
      }
      // Add travel time between mopeds
      if (i < distances.length) {
        totalTime += distances[i];
      }
    });

    return totalTime;
  };

  // Handle calculation when the button is clicked
  const handleCalculate = () => {
    const time = calculateTotalTime(mopeds, distances);
    setTotalTime(time);
  };

  return (
    <Card className="calculator-card">
      <CardContent>
        <Typography variant="h4" className="calculator-title">
          Task Time Calculator
        </Typography>
        <TextField
          label="Mopeds (comma separated)"
          variant="outlined"
          value={mopeds.join(', ')}
          onChange={(e) => setMopeds(e.target.value.split(',').map(m => m.trim()))}
          fullWidth
          className="calculator-input"
        />
        <TextField
          label="Distances (comma separated)"
          variant="outlined"
          value={distances.join(', ')}
          onChange={(e) => setDistances(e.target.value.split(',').map(d => parseInt(d.trim(), 10)))}
          fullWidth
          className="calculator-input"
        />
        <Button variant="contained" color="primary" onClick={handleCalculate} fullWidth>
          Calculate Total Time
        </Button>
        {totalTime !== null && (
          <Typography variant="body1" className="calculator-result">
            Total Time: {totalTime} minutes
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskTimeCalculator;
