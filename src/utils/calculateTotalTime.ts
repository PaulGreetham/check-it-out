import { WorkerBreakdown, WorkerBreakdownItem, TotalTimeResult } from '../types/components';

export function calculateTotalTime(
  mopedsArray: string[],
  distancesArray: number[]
): TotalTimeResult {
  const taskTimes: Record<string, number> = { S: 1, F: 5, M: 8 };

  const workers = [
    { code: 'S', name: 'Swapper', color: '#4caf50' },
    { code: 'F', name: 'Fixer', color: '#ff9800' },
    { code: 'M', name: 'Mechanic', color: '#f44336' },
  ];

  const workerBreakdowns: WorkerBreakdown[] = [];
  let totalTime = 0;

  workers.forEach(worker => {
    let time = 0;
    let lastTaskIndex = -1;

    // Find last index where the worker has a task
    for (let i = 0; i < mopedsArray.length; i++) {
      const moped = mopedsArray[i].toUpperCase();
      if (moped.includes(worker.code)) lastTaskIndex = i;
    }

    const breakdownItems: WorkerBreakdownItem[] = [];

    if (lastTaskIndex >= 0) {
      for (let i = 0; i <= lastTaskIndex; i++) {
        const moped = mopedsArray[i].toUpperCase();
        const numTasks = (moped.match(new RegExp(worker.code, 'g')) || []).length;

        if (numTasks > 0) {
          const taskTime = numTasks * taskTimes[worker.code];
          time += taskTime;
          breakdownItems.push({
            type: 'task',
            description: `Moped ${i + 1}: Performs ${numTasks} task(s) (${taskTime} minutes)`,
          });
        }

        // Add travel time if not at the last task
        if (i < lastTaskIndex) {
          const travelTime = distancesArray[i];
          time += travelTime;
          breakdownItems.push({
            type: 'travel',
            description: `Travel from moped ${i + 1} to moped ${i + 2} (${travelTime} minutes)`,
          });
        }
      }
    } else {
      breakdownItems.push({
        type: 'no-tasks',
        description: 'No tasks assigned.',
      });
    }

    totalTime += time;

    workerBreakdowns.push({
      workerName: worker.name,
      time,
      breakdownItems,
    });
  });

  return { totalTime, workerBreakdowns };
}
