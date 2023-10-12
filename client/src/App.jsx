/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import { auth, db } from './utils/Auth/Auth';

import './App.css';
import log from './utils/logger';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userToken) => {
      if (userToken) log('event', `AuthEvent: ${userToken.email} Logged In`);
      setUser(userToken);
    });
  }, []);

  useEffect(() => {
    const currentLocation = window.location.href.split('/');
    if (
      (currentLocation[currentLocation.length - 1] === 'login' ||
        currentLocation[currentLocation.length - 1] === 'signup') &&
      user
    ) {
      navigate('/', { replace: true });
    }
  }, [user]);

  return <AnimatedRoutes db={db} user={user} auth={auth} />;
}

export default App;
