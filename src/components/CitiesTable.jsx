import React from 'react';
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getAQIColor, getFormattedDateWithFromNow } from '../helpers/Helper';
import tableStyle from '../styles/TableStyles';

const useStyles = makeStyles(tableStyle);

export default function CitiesTable({ data = [], onClick }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHeaderRow}>
            <TableCell className={classes.tableHeaderCell}>City</TableCell>
            <TableCell className={classes.tableHeaderCell} align="center">AQI</TableCell>
            <TableCell className={classes.tableHeaderCell} align="center">Last Updated</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.map((cityData) => {
              const latestAQIData = cityData.aqis.slice(-1)[0];

              return (
                <TableRow
                  key={cityData.city}
                  className={classes.tableValueRow}
                  onClick={() => {
                    if (onClick !== undefined) {
                      onClick(cityData);
                    }
                  }}
                >
                  <TableCell className={classes.tableValueCell}>
                    {cityData.city}
                  </TableCell>

                  <TableCell
                    className={classes.tableValueCell}
                    align="center"
                    style={{ color: getAQIColor(latestAQIData.aqi) }}
                  >
                    {latestAQIData.aqi.toFixed(2)}
                  </TableCell>

                  <TableCell
                    className={classes.tableValueCell}
                    align="center"
                  >
                    {getFormattedDateWithFromNow(latestAQIData.time)}
                  </TableCell>
                </TableRow>
              );
            })
              }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
