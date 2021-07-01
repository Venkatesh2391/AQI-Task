import React from 'react';
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import tableStyle from '../styles/TableStyles';
import { getAQIColor, getFormattedDate } from '../helpers/Helper';

const useStyles = makeStyles(tableStyle);

export default function AQIsTable({ aqis = [] }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHeaderRow}>
            <TableCell className={classes.tableHeaderCell}>Date</TableCell>
            <TableCell className={classes.tableHeaderCell} align="center">AQI</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            aqis.map((aqiData) => (
              <TableRow key={aqiData.date} className={classes.tableValueRow}>
                <TableCell
                  className={classes.tableValueCell}
                >
                  {getFormattedDate(aqiData.date)}
                </TableCell>

                <TableCell
                  className={classes.tableValueCell}
                  align="center"
                  style={{ color: getAQIColor(aqiData.aqi) }}
                >
                  {aqiData.aqi.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
