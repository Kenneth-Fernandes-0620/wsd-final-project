/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { isValidEmail, isValidPassword } from '../../utils/validation';

export default function Login({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    const validEmail = isValidEmail(email);
    if (!validEmail) {
      console.log('invalid Email');
      return;
    }
    const validPassword = isValidPassword(password);
    if (!validPassword) {
      console.log('Invalid Password');
      return;
    }
    console.log(email);
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User Logged In');
        console.log(userCredential);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_left}>
          <div className={styles.overlay_div}>
            <Typography className={styles.overlay_div_text} variant="h5" margin={3}>
              Suivez & gérer vos contrats en un seul lieu !
            </Typography>
          </div>
        </div>
        <div className={styles.content_right}>
          <div className={styles.content_right_content}>
            <Typography variant="h3" sx={{ color: '#00A551', marginTop: 5 }}>
              Login
            </Typography>
            <form action="#">
              <Box sx={{ margin: 5 }}>
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  value={email}
                  sx={{ marginTop: 3 }}
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                  required
                  autoComplete="true"
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={password}
                  sx={{ marginTop: 3 }}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                  required
                  autoComplete="true"
                />
              </Box>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'normal' }}>
                <div>
                  <Button type="button" variant="contained" onClick={() => handleSubmit()}>
                    Login
                  </Button>
                </div>
                <div style={{ marginTop: 10 }}>
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => navigate('/signup', { replace: true })}>
                    Already have an account? Sign In
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// props validation for Login
Login.propTypes = {
  auth: PropTypes.any.isRequired
};
