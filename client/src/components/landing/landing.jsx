/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import styles from './landing.module.css';
import componentBackground from '../../assets/green-leaves.jpg';
import log from '../../utils/logger';

function Landing({ user, auth }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    log('event', `AuthEvent: user ${user?.email} Logged out`);
    signOut(auth)
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(() => {
        // An error happened.
      });
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className={styles.landingcontent}>
        <div className={styles.navbar}>
          <span>Solace</span>
          <div>
            <Button variant="text" color="inherit" onClick={() => navigate('/', { replace: true })}>
              Home
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() =>
                user
                  ? navigate('/appointment', { replace: true })
                  : navigate('/login', { replace: true })
              }>
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
              title={user?.email ?? 'login'}
              onClick={(ev) => {
                if (!user) navigate('/login', { replace: true });
                else handleClick(ev);
              }}
              icon={faUser}
              style={{ padding: '10px', border: '1px solid transparent', borderRadius: '30px' }}
            />
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}>
              <MenuItem onClick={handleCloseMenu}>
                <Button onClick={handleLogout} variant="contained" color="error">
                  Logout
                </Button>
              </MenuItem>
            </Menu>
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
              backgroundColor: 'rgba(62,7,7,0.62)',
              width: '40%',
              height: '50%',
              minHeight: '300px',
              minWidth: '400px',
              border: '1px solid black',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px',
              padding: '20px'
            }}>
            <h1 style={{ color: 'white' }}>
              I am allowed to feel good and to experience pleasure in life{' '}
            </h1>
            <p id="Quotes" style={{ color: 'white' }}>
              “Growth is sometimes bumpy and isn&apos;t always linear, but I will stay the course.”
              - Unknown
            </p>
            <div className={styles.landing_buttons_container}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  navigate('/conditions', { replace: true });
                }}>
                View Conditions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

Landing.propTypes = {
  user: PropTypes.any.isRequired,
  auth: PropTypes.any.isRequired
};

export default Landing;
