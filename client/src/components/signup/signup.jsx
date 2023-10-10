/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import { isValidEmail, isValidPassword } from '../../utils/validation';

export default function SignUp({ auth }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState({ error: false, message: '' });

  const navigate = useNavigate();

  const handleSubmit = () => {
    const validEmail = isValidEmail(email);
    console.log(validEmail);
    if (!validEmail) {
      setError({ error: true, message: 'invalid Email' });
      return;
    }
    console.log(password);
    const validPassword = isValidPassword(password);
    if (!validPassword.result) {
      console.log('reached here');
      setError({ error: true, message: `password ${validPassword.message}` });
      return;
    }
    console.log('reached here');
    if (password !== repeatPassword) {
      setError({ error: true, message: 'Repeat Password must match the password' });
      return;
    }

    const validRepeatPassword = isValidPassword(repeatPassword);
    if (!validRepeatPassword.result) {
      setError({ error: true, message: validRepeatPassword.message });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User Logged In');
        console.log(userCredential);
        navigate('/', { replace: true });
      })
      .catch((e) => {
        const errorMessage = e.message;
        setError({ error: true, message: errorMessage });
      });
  };

  const handleClose = () => {
    setError({ error: false, message: '' });
  };

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
        <div className={styles.content}>
          <div className={styles.content_left}>
            <div className={styles.overlay_div}>
              <Typography className={styles.overlay_div_text} variant="h5" margin={3}>
                I am strong and resilient, and I can handle any challenge that comes my way
              </Typography>
            </div>
          </div>
          <div className={styles.content_right}>
            <div className={styles.content_right_content}>
              <Typography variant="h3" sx={{ color: '#00A551', marginTop: 5 }}>
                Sign up
              </Typography>
              <form action="#">
                <Box sx={{ margin: 5 }}>
                  <TextField
                    variant="outlined"
                    label="Name"
                    value={username}
                    sx={{ marginTop: 3 }}
                    onChange={(event) => setUsername(event.target.value)}
                    fullWidth
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    sx={{ marginTop: 3 }}
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    required
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
                  <TextField
                    variant="outlined"
                    label="Confirm Password"
                    type="password"
                    value={repeatPassword}
                    sx={{ marginTop: 3 }}
                    onChange={(event) => setRepeatPassword(event.target.value)}
                    fullWidth
                    required
                    autoComplete="true"
                  />
                </Box>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <Button type="button" variant="contained" onClick={() => handleSubmit()}>
                      Create Account
                    </Button>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      type="button"
                      variant="text"
                      onClick={() => navigate('/login', { replace: true })}>
                      Already have an account? Log In
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// props validation for Login
SignUp.propTypes = {
  auth: PropTypes.any.isRequired
};
