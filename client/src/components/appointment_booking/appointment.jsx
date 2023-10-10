/* eslint-disable no-unused-vars */
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
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import componentBackground from '../../assets/conditions.png';
import styles from './appointment.module.css';
import { isValidDate, isValidUserName } from '../../utils/validation';

// const appointments = [
//   {
//     userid: '',
//     appointmentDate: new Date(),
//     plan: 'basic'
//   }
// ];

export default function Appointment({ db, user }) {
  const [condition, setCondition] = useState(0);
  const [doctor, setDoctor] = useState(0);
  const [illness, setIllnesses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState(dayjs(new Date()));
  const [error, setError] = useState({ error: false, message: '' });

  const navigate = useNavigate();

  const handleClose = () => {
    setError({ error: false, message: '' });
  };

  const handleChangeCondition = (ev) => {
    console.log(ev.target.value);
    setCondition(ev.target.value);
  };

  const handleChangeDoctor = (ev) => {
    setDoctor(ev.target.value);
  };

  useEffect(() => {
    async function fetchAll() {
      const querySnapshot = await getDocs(collection(db, 'doctors'));
      const querySnapshot2 = await getDocs(query(collection(db, 'conditions')));
      const doctorsTemp = [];
      querySnapshot.forEach((doc) => {
        doctorsTemp.push(doc.data());
      });
      const illnessTemp = [];
      querySnapshot2.forEach((doc) => {
        illnessTemp.push(doc.data());
      });
      setDoctors(doctorsTemp);
      setIllnesses(illnessTemp);
    }
    if (user) fetchAll();
  }, [user]);

  const handleBookAppointment = () => {
    const nameValidation = isValidUserName(name);
    if (!nameValidation) {
      setError({ error: true, message: 'Name too Short' });
      return;
    }
    if (!isValidDate(date)) {
      setError({
        error: true,
        message: 'Appointment must be booked one day in Advance and between 9 to 5'
      });
      return;
    }
    addDoc(collection(db, 'appointments'), {
      name,
      userEmail: user.email,
      when: date.toDate(),
      doctor: doctors[doctor].name,
      condition: illness[condition].name
    }).then((res) => {
      setError({ error: true, message: 'Appointment Booked successfully' });
    });
  };

  // for xs Sizes
  const preXs = 1;
  const labelXs = 3;
  const inputXs = 7;
  const postXs = 1;
  // for sm sizes
  const preSm = 2;
  const labelSm = 3;
  const inputSm = 5;
  const postSm = 2;

  return (
    <>
      <Dialog open={error.error} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="alert-dialog-title" sx={{ color: 'red' }}>
          Alert!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h4>{error.message}</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles.container}>
        <div className={styles.landingcontent}>
          <div className={styles.navbar}>
            <span>Solace</span>
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
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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
                    <Grid
                      item
                      xs={inputXs}
                      sm={inputSm}
                      sx={{ display: 'flex', flexDirection: 'column' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Select a date and time"
                          fullWidth
                          value={date}
                          onChange={(event) => setDate(event)}
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
                        value={doctor}
                        onChange={handleChangeDoctor}
                        fullWidth>
                        {doctors.map((element, index) => (
                          <MenuItem value={index} key={element.name}>
                            {element.name}
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
                        value={condition}
                        onChange={handleChangeCondition}
                        fullWidth>
                        {illness.map((element, index) => (
                          <MenuItem value={index} key={element.name + element.description}>
                            {element.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <Grid item xs={postXs} sm={postSm} />
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate('/appointments', { replace: true });
                        }}>
                        View All Appointments
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ ml: 5 }}
                        onClick={handleBookAppointment}>
                        Book Appointment
                      </Button>
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
  db: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired
};
