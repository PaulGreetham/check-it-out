import { WorkerBreakdown, WorkerBreakdownItem, TotalTimeResult } from '../types/components';
import { TFunction } from 'i18next';

export function calculateTotalTime(
  mopedsArray: string[],
  distancesArray: number[],
  t: TFunction // Pass `t` for translation
): TotalTimeResult {
  const taskTimes: Record<string, number> = { S: 1, F: 5, M: 8 };

  const workers = [
    { code: 'S', name: t('taskTimeCalculator.swapper'), color: '#4caf50' },
    { code: 'F', name: t('taskTimeCalculator.fixer'), color: '#ff9800' },
    { code: 'M', name: t('taskTimeCalculator.mechanic'), color: '#f44336' },
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
            description: t('taskTimeCalculator.utils.taskDescription', { index: i + 1, numTasks, taskTime }),
          });
        }

        // Add travel time if not at the last task
        if (i < lastTaskIndex) {
          const travelTime = distancesArray[i];
          time += travelTime;
          breakdownItems.push({
            type: 'travel',
            description: t('taskTimeCalculator.utils.travelDescription', { from: i + 1, to: i + 2, travelTime }),
          });
        }
      }
    } else {
      breakdownItems.push({
        type: 'no-tasks',
        description: t('taskTimeCalculator.utils.noTasks'),
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
