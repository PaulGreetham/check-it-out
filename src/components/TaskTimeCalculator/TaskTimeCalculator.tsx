import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, List, ListItem, Accordion, AccordionSummary, AccordionDetails, Grid, Divider, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { TaskTimeCalculatorProps, WorkerBreakdown } from '../../types/components';
import { calculateTotalTime } from '../../utils/calculateTotalTime';

// Create a custom styled tooltip with a darker background
const DarkTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#333',
    color: 'theme.palette.text.primary',
    fontSize: theme.typography.pxToRem(12),
    maxWidth: 300,
  },
}));

const TaskTimeCalculator: React.FC<TaskTimeCalculatorProps> = ({
  initialMopeds = '',
  initialDistances = '',
}) => {
  const { t } = useTranslation();
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
      setError(t('taskTimeCalculator.invalidMoped', { moped: invalidMoped }));
      return;
    }

    // Validation for distances input
    const invalidDistance = distancesArray.find((distance) => !/^\d+$/.test(distance));
    if (invalidDistance) {
      setError(t('taskTimeCalculator.invalidDistance', { distance: invalidDistance }));
      return;
    }

    // Convert distancesArray to numbers
    const distancesNumberArray = distancesArray.map((d) => parseInt(d, 10));

    if (distancesNumberArray.length !== mopedsArray.length - 1) {
      setError(t('taskTimeCalculator.distanceError'));
      return;
    }

    const { totalTime: total, workerBreakdowns } = calculateTotalTime(mopedsArray, distancesNumberArray, t);
    setTotalTime(total);
    setDetailedBreakdown(workerBreakdowns);
  };

  useEffect(() => {
    if (totalTime !== null) {
      Swal.fire({
        title: t('taskTimeCalculator.totalTime', { time: totalTime }),
        text: t('taskTimeCalculator.successMessage'),
        icon: 'success',
      });
    }
  }, [totalTime, t]);

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
        {t('taskTimeCalculator.tooltipDescription1')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('taskTimeCalculator.tooltipDescription2')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('taskTimeCalculator.tooltipDescription3')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('taskTimeCalculator.tooltipDescription4')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('taskTimeCalculator.tooltipDescription5')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('taskTimeCalculator.tooltipDescription6')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('taskTimeCalculator.tooltipDescription7')}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, padding: '1rem' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        {totalTime === null ? (
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '1rem', backgroundColor: 'theme.palette.text.background', boxShadow: 1 }}>
              <Box display="flex" alignItems="baseline" justifyContent="center">
                <Typography variant="h4" gutterBottom>{t('taskTimeCalculator.title')}</Typography>
                <DarkTooltip title={tooltipContent} placement="right-start">
                  <InfoOutlinedIcon sx={(theme) => ({ ml: 1, cursor: 'pointer', fontSize: theme.typography.h4.fontSize })} />
                </DarkTooltip>
              </Box>
              <Typography variant="body1" gutterBottom align="center">{t('taskTimeCalculator.explanation')}</Typography>

              <Box sx={{ padding: '1rem', marginBottom: '1rem', backgroundColor: 'theme.palette.text.background', shadow: 1 }}>
                <Typography variant="h6" gutterBottom>{t('taskTimeCalculator.taskTypes')}</Typography>
                <List dense>
                  <ListItem><Typography variant="body1"><strong>S:</strong> {t('taskTimeCalculator.swap')}</Typography></ListItem>
                  <ListItem><Typography variant="body1"><strong>F:</strong> {t('taskTimeCalculator.fix')}</Typography></ListItem>
                  <ListItem><Typography variant="body1"><strong>M:</strong> {t('taskTimeCalculator.mechanic')}</Typography></ListItem>
                </List>
              </Box>

              <TextField fullWidth label={t('taskTimeCalculator.mopedsLabel')} variant="outlined" value={mopeds} onChange={handleMopedsChange} sx={{ mb: 2 }} />
              <TextField fullWidth label={t('taskTimeCalculator.distancesLabel')} variant="outlined" value={distances} onChange={handleDistancesChange} sx={{ mb: 2 }} />

              <Button variant="contained" color="primary" onClick={handleCalculate} fullWidth size="large">{t('taskTimeCalculator.calculate')}</Button>

              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <Box sx={{ padding: '1rem', backgroundColor: 'theme.palette.text.background', boxShadow: 1 }}>
                <Box display="flex" alignItems="baseline" justifyContent="center">
                  <Typography variant="h4" gutterBottom>{t('taskTimeCalculator.title')}</Typography>
                  <DarkTooltip title={tooltipContent} placement="right-start">
                    <InfoOutlinedIcon sx={(theme) => ({ ml: 1, cursor: 'pointer', fontSize: theme.typography.h4.fontSize })} />
                  </DarkTooltip>
                </Box>
                <Typography variant="body1" gutterBottom align="center">{t('taskTimeCalculator.explanation')}</Typography>

                <Box sx={{ padding: '1rem', marginBottom: '1rem', backgroundColor: 'theme.palette.text.background' }}>
                  <Typography variant="h6" gutterBottom>{t('taskTimeCalculator.taskTypes')}</Typography>
                  <List dense>
                    <ListItem><Typography variant="body1"><strong>S:</strong> {t('taskTimeCalculator.swap')}</Typography></ListItem>
                    <ListItem><Typography variant="body1"><strong>F:</strong> {t('taskTimeCalculator.fix')}</Typography></ListItem>
                    <ListItem><Typography variant="body1"><strong>M:</strong> {t('taskTimeCalculator.mechanic')}</Typography></ListItem>
                  </List>
                </Box>

                <TextField fullWidth label={t('taskTimeCalculator.mopedsLabel')} variant="outlined" value={mopeds} onChange={handleMopedsChange} sx={{ mb: 2 }} />
                <TextField fullWidth label={t('taskTimeCalculator.distancesLabel')} variant="outlined" value={distances} onChange={handleDistancesChange} sx={{ mb: 2 }} />

                <Button variant="contained" color="primary" onClick={handleCalculate} fullWidth size="large">{t('taskTimeCalculator.recalculate')}</Button>

                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ padding: '1rem', backgroundColor: 'theme.palette.text.background', boxShadow: 1 }}>
                <Typography variant="h5" sx={{ mb: 2 }} align="center">{t('taskTimeCalculator.totalTime', { time: totalTime })}</Typography>
                <Divider />
                <div style={{ marginTop: '1rem' }}>
                  {detailedBreakdown?.map((worker) => (
                    <Accordion key={worker.workerName}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'theme.palette.text.background' }} />} sx={{ backgroundColor: getColorForWorker(worker.workerName), color: 'white' }}>
                        <Typography variant="h6">{worker.workerName}: {worker.time} {t('taskTimeCalculator.minutes')}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {worker.breakdownItems.map((item, index) => (
                            <ListItem key={index}><Typography variant="body1">{item.description}</Typography></ListItem>
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
