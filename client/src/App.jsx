/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import Landing from './components/landing/landing';
import SignUp from './components/signup/signup';
import Login from './components/login/login';

import { auth, db } from './utils/Auth/Auth';

import './App.css';
import Conditions from './components/condition_info/conditions';
import Appointment from './components/appointment_booking/appointment';
import Appointments from './components/appointments/appointments';

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userToken) => {
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

  return (
    <Routes>
      <Route path="/" element={<Landing user={user} />} />
      <Route path="/signup" element={<SignUp auth={auth} />} />
      <Route path="/login" element={<Login auth={auth} />} />
      <Route path="/anxiety" element={<h1>Login</h1>} />
      <Route
        path="/dashboard"
        element={user ? <h1>Dashboard</h1> : <Navigate to="/login" replace />}
      />
      <Route path="/appointment" element={<Appointment db={db} user={user} />} />
      <Route path="/appointments" element={<Appointments db={db} user={user} />} />
      <Route path="/conditions" element={<Conditions user={user} />} />
    </Routes>
  );
}

export default App;
