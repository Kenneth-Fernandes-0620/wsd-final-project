/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './landing.module.css';
import componentBackground from '../../assets/green-leaves.jpg';

function Landing({ user }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.landingcontent}>
        <div className={styles.navbar}>
          <span>Topic</span>
          <div>
            <Button variant="text" color="inherit" onClick={() => navigate('/', { replace: true })}>
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
              backgroundColor: 'rgba(62,7,7,0.62)',
              width: '40%',
              height: '50%',
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
              <Button variant="contained" color="success">
                Conditions
              </Button>
              <Button variant="contained" color="success">
                Doctors
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  user: PropTypes.any.isRequired
};

export default Landing;
