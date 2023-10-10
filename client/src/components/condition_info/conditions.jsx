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
import { collection, getDocs } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import componentBackground from '../../assets/conditions.png';
import styles from './conditions.module.css';

export default function Conditions({ user, db }) {
  const [ConditionList, setConditionList] = useState([]);
  const [open, setOpen] = useState({ isOpen: false, message: '' });

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen({ isOpen: false, message: '' });
  };

  const handleOpen = (message) => {
    setOpen({ isOpen: true, ...message });
  };

  useEffect(() => {
    async function loadConditions() {
      const querySnapshot = await getDocs(collection(db, 'conditions'));
      const tempData = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempData.push(doc.data());
      });
      setConditionList(tempData);
    }
    loadConditions();
  }, []);

  console.log(open?.symptoms);

  return (
    <>
      <Dialog
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Condition Information on {open.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>{open.description}</span>
            <h4>Symptoms</h4>
            <ul>
              {open?.symptoms?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
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
              <Button
                variant="text"
                color="inherit"
                onClick={() => navigate('/', { replace: true })}>
                Book Appointment
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => navigate('/books', { replace: true })}>
                Books
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
                  {ConditionList.map(
                    (element, index) =>
                      index <= 5 && (
                        <Button
                          key={element.name}
                          variant="contained"
                          style={{ backgroundColor: '#B7E096', color: 'black' }}
                          onClick={() => handleOpen(element)}>
                          {element.name}
                        </Button>
                      )
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10
                  }}>
                  {ConditionList.map(
                    (element, index) =>
                      index >= 5 && (
                        <Button
                          key={element.name}
                          variant="contained"
                          style={{ backgroundColor: '#B7E096', color: 'black' }}
                          onClick={() => handleOpen(element)}>
                          {element.name}
                        </Button>
                      )
                  )}
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
  user: PropTypes.any.isRequired,
  db: PropTypes.any.isRequired
};
