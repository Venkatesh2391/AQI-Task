import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog, DialogTitle, DialogContent, Typography, Button, Select, MenuItem,
} from '@material-ui/core';
import { Chart } from 'react-google-charts';
import AQIsTable from './AQIsTable';
import { getAQIColor, getFormattedDate } from '../helpers/Helper';

const useStyles = makeStyles({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function getChartData(aqis) {
  const chartDatas = [['Date', 'AQI', { role: 'style' }, {
    sourceColumn: 0, role: 'annotation', type: 'string', calc: 'stringify',
  }]];
  aqis.forEach((aqiData) => {
    chartDatas.push([getFormattedDate(aqiData.date), aqiData.aqi, getAQIColor(aqiData.aqi), null]);
  });
  return chartDatas;
}

export default function CitiesTable({
  open = false, cityData = null, viewType = 'graph', onChangeViewType, onClose,
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={open && cityData !== null}
      fullWidth
      maxWidth="md"
      onBackdropClick={() => {
        if (onClose !== undefined) {
          onClose();
        }
      }}
      onEscapeKeyDown={() => {
        if (onClose !== undefined) {
          onClose();
        }
      }}
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h5">
          {cityData.city}
          {' '}
          AQI History
        </Typography>

        <Select
          value={viewType}
          onChange={(event) => {
            if (onChangeViewType !== undefined) {
              onChangeViewType(event.target.value);
            }
          }}
        >
          <MenuItem value="graph">Graph</MenuItem>
          <MenuItem value="list">List</MenuItem>
        </Select>

        <Button
          onClick={() => {
            if (onClose !== undefined) {
              onClose();
            }
          }}
        >
          X
        </Button>
      </DialogTitle>

      <DialogContent>
        {viewType === 'graph' && (
          <Chart
            height="50vh"
            chartType="ColumnChart"
            loader={<Typography variant="h6">Loading...</Typography>}
            options={{
              backgroundColor: {
                fill: '#fff',
              },
              legend: 'none',
              hAxis: {
                title: 'Date',
                gridlines: {
                  count: 0,
                },
                textPosition: 'none',
              },
              vAxis: {
                title: 'AQI',
                gridlines: {
                  count: 0,
                },
                textPosition: 'none',
              },
            }}
            data={getChartData(cityData.aqis.slice(-200))}
          />
        )}

        {viewType === 'list' && (
          <AQIsTable
            aqis={cityData.aqis.slice(-1000).reverse()}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
