/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { collection, getDocs, query } from 'firebase/firestore';
import styles from './appointments.module.css';
import componentBackground from '../../assets/conditions.png';
import BasicTable from './render_table';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function Appointments({ user, db }) {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, 'appointments'));
      const querySnapshot = await getDocs(q);
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setAppointments(temp);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
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
              onClick={() => navigate('/appointment', { replace: true })}>
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
            <h1>Your Appointments</h1>
            <BasicTable rows={appointments} db={db} setAppointments={setAppointments} />
          </div>
        </div>
      </div>
    </div>
  );
}

Appointments.propTypes = {
  user: PropTypes.any.isRequired,
  db: PropTypes.any.isRequired
};
