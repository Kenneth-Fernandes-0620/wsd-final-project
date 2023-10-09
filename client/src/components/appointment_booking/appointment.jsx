/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import componentBackground from '../../assets/conditions.png';
import styles from './appointment.module.css';

// const appointments = [
//   {
//     userid: '',
//     appointmentDate: new Date(),
//     plan: 'basic'
//   }
// ];

export default function Appointment({ user }) {
  const [open, setOpen] = useState({ isOpen: false, message: '' });
  const [condition, setCondition] = useState(0);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen({ isOpen: false, message: '' });
  };

  //   const handleOpen = (message) => {
  //     setOpen({ isOpen: true, message });
  //   };

  const handleChange = (ev) => {
    console.log(ev.target.value);
    setCondition(ev.target.value);
  };

  return (
    <>
      <Dialog
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Condition Information on {open.message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h4>Symptoms</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles.container}>
        <div className={styles.landingcontent}>
          <div className={styles.navbar}>
            <span>Topic</span>
            <div>
              <Button
                variant="text"
                color="inherit"
                onClick={() => navigate('/', { replace: true })}>
                Home
              </Button>
              <Button variant="text" color="inherit">
                Book Appointment
              </Button>
              <Button variant="text" color="inherit">
                Books
              </Button>
              <Button variant="text" color="inherit">
                About
              </Button>
            </div>
            <div
              style={{ cursor: 'pointer', padding: '5px' }}
              className={styles.account_icon_container}>
              <FontAwesomeIcon
                onClick={() => navigate(user ? '/account' : '/login', {})}
                icon={faUser}
                style={{ padding: '10px', border: '1px solid transparent', borderRadius: '30px' }}
              />
            </div>
          </div>
          <div
            className={styles.content}
            style={{
              backgroundImage: `url("${componentBackground}")`,
              backgroundPosition: 'right',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              padding: '2em'
            }}>
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,.62)',
                width: '100%',
                height: '100%',
                border: '1px solid black',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
              }}>
              <h1>Book Appointment</h1>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} />
                    <Grid
                      item
                      xs={1}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ padding: '10px', textAlign: 'left' }}>Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        color="info"
                        id="outlined-basic"
                        label="Patient Name"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4} />

                    <Grid item xs={4} />
                    <Grid
                      item
                      xs={1}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ padding: '10px' }}>When</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Basic date time picker" fullWidth />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4} />
                    {/* Conditions: Drop Down, TIme: time, Doctor: DropDown */}
                    <Grid item xs={4} />
                    <Grid
                      item
                      xs={1}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <InputLabel id="demo-simple-select-label">Doctors</InputLabel>
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        id="demo-simple-select"
                        value={condition}
                        onChange={handleChange}
                        fullWidth>
                        <MenuItem value={0}>Ten</MenuItem>
                        <MenuItem value={1}>Twenty</MenuItem>
                        <MenuItem value={2}>Thirty</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4} />
                    <Grid
                      item
                      xs={1}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <InputLabel id="demo-simple-select-label">Conditions</InputLabel>
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        id="demo-simple-select"
                        value={condition}
                        onChange={handleChange}
                        fullWidth>
                        <MenuItem value={0}>Ten</MenuItem>
                        <MenuItem value={1}>Twenty</MenuItem>
                        <MenuItem value={2}>Thirty</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained">Book Appointment</Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Appointment.propTypes = {
  user: PropTypes.any.isRequired
};
