import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  
import Report from './Report';  
import './ReportPassword.css'; // Import the CSS file
import Iconaccount from './accountBG';

const ReportPassword = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const userEmail = auth.currentUser.email;

    try {
      await signInWithEmailAndPassword(auth, userEmail, password);
      setAuthenticated(true);
    } catch (error) {
      alert('Incorrect password. Please try again.');
    }
  };

  if (authenticated) {
    return <Report />;
  }

  return (
    <div className="reportpasswordcontainer">
      <div className="reportpasswordcard">
        <h2>Enter Password to Access Report</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Iconaccount/>
    </div>
  );
};

export default ReportPassword;
