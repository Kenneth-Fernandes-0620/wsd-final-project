/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import componentBackground from '../../assets/conditions.png';
import styles from './books.module.css';

export default function Books({ user }) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch('https://kenneth-fernandes-0620.github.io/wsd-final-project/books.json').then((res) => {
      res.json().then((response) => setBooks(response));
    });
  }, []);

  const navigate = useNavigate();
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
              onClick={() => navigate(user ? '/appointment' : '/login', { replace: true })}>
              Book Appointment
            </Button>
            <Button variant="text" color="inherit">
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
            <h1>Self Help Books</h1>
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
                  justifyContent: 'left',
                  gap: 10,
                  flexWrap: 'wrap',
                  padding: '20px'
                }}>
                {books.map((element) => (
                  <div
                    style={{
                      border: '1px solid black',
                      flex: 1,
                      minWidth: '200px',
                      maxWidth: '200px',
                      minHeight: '200px',
                      maxHeight: '200px',
                      boxShadow: '0px 0px 5px',
                      background: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px'
                    }}
                    key={element.title}>
                    <img
                      src="https://classroomclipart.com/image/static7/preview2/one-open-book-with-plant-design-elements-55799.jpg"
                      alt=""
                      width="50%"
                    />
                    {element.title} by {element.author}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Books.propTypes = {
  user: PropTypes.any.isRequired
};
