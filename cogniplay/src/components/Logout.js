// src/components/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './NavBar.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    try {
      await signOut(auth);
      sessionStorage.removeItem('activeSubAccount'); // Clear the active sub-account from session storage
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <a href="/logout" onClick={handleLogout} className='nav-links'>Logout</a>
  );
};

export default Logout;
