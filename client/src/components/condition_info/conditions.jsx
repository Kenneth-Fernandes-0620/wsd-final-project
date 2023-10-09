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
  DialogTitle
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useState } from 'react';
import componentBackground from '../../assets/conditions.png';
import styles from './conditions.module.css';

export default function Conditions({ user }) {
  const [open, setOpen] = useState({ isOpen: false, message: '' });

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen({ isOpen: false, message: '' });
  };

  const handleOpen = (message) => {
    setOpen({ isOpen: true, message });
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
                backgroundColor: 'rgba(209,252,202,0.61)',
                //   width: '40%',
                height: '100%',
                border: '1px solid black',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
              <h1>Know Your Condition</h1>
              <div
                className={styles.landing_buttons_container}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flex: 1
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10
                  }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}
                    onClick={() => handleOpen('Anxiety')}>
                    Anxiety
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    gap: 10
                  }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B7E096', color: 'black' }}>
                    Conditions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Conditions.propTypes = {
  user: PropTypes.any.isRequired
};
