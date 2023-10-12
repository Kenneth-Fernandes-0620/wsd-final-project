/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './render_table.module.css';

const doctors = ['Dr. Johnson', 'Dr. Miller', 'Dr. Davis', 'Dr. Brown', 'Dr. Smith'];
const illness = [
  'Depression',
  'Anxiety Disorders',
  'Bipolar Disorder',
  'Schizophrenia',
  'Post-Traumatic Stress Disorder (PTSD)',
  'Obsessive-Compulsive Disorder (OCD)',
  'Eating Disorders',
  'Attention-Deficit/Hyperactivity Disorder (ADHD)',
  'Borderline Personality Disorder (BPD)',
  'Substance Use Disorder'
];

export default function BasicTable({ rows, db, setAppointments }) {
  const [open, setOpen] = useState(false);
  const [updatedRows, setUpdateRows] = useState(null);

  const handleDelete = (record) => {
    console.log(record);
    deleteDoc(doc(db, 'appointments', record.id)).then((res) => {
      const newRows = rows.filter((element) => element.id !== record.id);
      setAppointments(newRows);
    });
  };

  const handleClose = () => {
    setUpdateRows(null);
  };

  const handleUpdateAppointment = () => {
    console.log(updatedRows);
    //  Code logic here
    updateDoc(doc(db, 'appointments', updatedRows.id), {
      condition: updatedRows.condition,
      doctor: updatedRows.doctor,
      name: updatedRows.name,
      userEmail: updatedRows.userEmail,
      when: updatedRows.when.toDate()
    }).then((res) => setUpdateRows(null));
  };

  const preXs = 1;
  const labelXs = 3;
  const inputXs = 7;
  const postXs = 1;
  // for sm sizes
  const preSm = 2;
  const labelSm = 3;
  const inputSm = 5;
  const postSm = 2;

  const navigate = useNavigate();

  return (
    <>
      <Dialog onClose={handleClose} open={updatedRows !== null}>
        <DialogTitle>Edit Appointment Details</DialogTitle>
        <List sx={{ pt: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={preXs} sm={preSm} />
            <Grid
              item
              xs={labelXs}
              sm={labelSm}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ padding: '10px', textAlign: 'left' }}>Name</Typography>
            </Grid>
            <Grid item xs={inputXs} sm={inputSm}>
              <TextField
                color="info"
                id="outlined-basic"
                label="Patient Name"
                variant="outlined"
                fullWidth
                value={updatedRows?.name}
                onChange={(event) =>
                  setUpdateRows((prev) => {
                    return { ...prev, name: event.target.value };
                  })
                }
              />
            </Grid>
            <Grid item xs={postXs} sm={postSm} />

            <Grid item xs={preXs} sm={preSm} />
            <Grid
              item
              xs={labelXs}
              sm={labelSm}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ padding: '10px' }}>When</Typography>
            </Grid>
            <Grid item xs={inputXs} sm={inputSm} sx={{ display: 'flex', flexDirection: 'column' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select a date and time"
                  fullWidth
                  value={dayjs(updatedRows?.when.toDate())}
                  onChange={(event) =>
                    setUpdateRows((prev) => {
                      return { ...prev, date: event };
                    })
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={postXs} sm={postSm} />

            <Grid item xs={preXs} sm={preSm} />
            <Grid
              item
              xs={labelXs}
              sm={labelSm}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <InputLabel id="demo-simple-select-label">Doctors</InputLabel>
            </Grid>
            <Grid item xs={inputXs} sm={inputSm}>
              <Select
                id="demo-simple-select"
                value={doctors.findIndex((val) => val === updatedRows?.doctor)}
                onChange={(event) =>
                  setUpdateRows((prev) => {
                    return { ...prev, doctor: doctors[event.target.value] };
                  })
                }
                fullWidth>
                {doctors.map((element, index) => (
                  <MenuItem value={index} key={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={postXs} sm={postSm} />
            <Grid item xs={preXs} sm={preSm} />
            <Grid
              item
              xs={labelXs}
              sm={labelSm}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <InputLabel id="demo-simple-select-label">Conditions</InputLabel>
            </Grid>
            <Grid item xs={inputXs} sm={inputSm}>
              <Select
                id="demo-simple-select"
                value={illness.findIndex((val) => val === updatedRows?.condition)}
                onChange={(event) =>
                  setUpdateRows((prev) => {
                    return { ...prev, condition: illness[event.target.value] };
                  })
                }
                fullWidth>
                {illness.map((element, index) => (
                  <MenuItem value={index} key={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={postXs} sm={postSm} />
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="success"
                sx={{ ml: 5 }}
                onClick={handleUpdateAppointment}>
                Update Appointment
              </Button>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </List>
      </Dialog>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell align="right">Condition</TableCell>
              <TableCell align="right">Doctor</TableCell>
              <TableCell align="right">When</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row?.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={styles.tableRow}>
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="right">{row.condition}</TableCell>
                <TableCell align="right">{row.doctor}</TableCell>
                <TableCell align="right">{row.when.toDate().toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete" onClick={() => setUpdateRows(row)}>
                    <EditIcon color="info" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

BasicTable.propTypes = {
  rows: PropTypes.any.isRequired,
  db: PropTypes.any.isRequired,
  setAppointments: PropTypes.any.isRequired
};
