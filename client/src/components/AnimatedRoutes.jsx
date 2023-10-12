/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import Landing from './landing/landing';
import SignUp from './signup/signup';
import Login from './login/login';
import Appointment from './appointment_booking/appointment';
import Appointments from './appointments/appointments';
import Conditions from './condition_info/conditions';
import Books from './books/books';

export default function AnimatedRoutes({ user, auth, db }) {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing user={user} auth={auth} />} />
        <Route path="/signup" element={<SignUp auth={auth} />} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/anxiety" element={<h1>Login</h1>} />
        <Route
          path="/dashboard"
          element={user ? <h1>Dashboard</h1> : <Navigate to="/login" replace />}
        />
        <Route path="/appointment" element={<Appointment db={db} user={user} auth={auth} />} />
        <Route path="/appointments" element={<Appointments db={db} user={user} auth={auth} />} />
        <Route path="/conditions" element={<Conditions user={user} db={db} />} auth={auth} />
        <Route path="/books" element={<Books user={user} db={db} />} auth={auth} />
      </Routes>
    </AnimatePresence>
  );
}

AnimatedRoutes.propTypes = {
  auth: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
  db: PropTypes.any.isRequired
};
