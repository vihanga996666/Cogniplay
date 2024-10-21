// src/pages/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Register.css';
import LoginRegisterBG from './LoginRegisterBG';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subAccountName, setSubAccountName] = useState('');
  const [subAccountDOB, setSubAccountDOB] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ageError, setAgeError] = useState('');
  const navigate = useNavigate();

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate age
    const age = calculateAge(subAccountDOB);
    if (age < 5 || age > 8) {
      setAgeError('This game is specially designed for kids aged 5-8 years old.');
      return;
    } else {
      setAgeError('');
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      let profilePictureURL = '';

      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${userId}/${profilePicture.name}`);
        await uploadBytes(storageRef, profilePicture);
        profilePictureURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'users', userId, 'subAccounts'), {
        name: subAccountName,
        dateOfBirth: subAccountDOB,
        profilePicture: profilePictureURL,
        scores: {
          level1: 0,
          level2: 0,
          level3: 0,
          level4: 0,
          level5: 0,
          level6: 0,
          level7: 0,
          level8: 0,
          level9: 0,
          level10: 0,
        }
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1 className="register-title">Create new account.</h1>
        <p className="register-login-prompt">
          Already a Member? <Link to="/login" className="register-login-link">Log in</Link>
        </p>
        {success ? (
          <p>Registration successful! Redirecting to login page...</p>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="register-form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <h2>Sub-Account Details</h2>
              <label>Kid’s Name:</label>
              <input
                type="text"
                value={subAccountName}
                onChange={(e) => setSubAccountName(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <label>Kid’s Birthdate:</label>
              <input
                type="date"
                value={subAccountDOB}
                onChange={(e) => setSubAccountDOB(e.target.value)}
                required
              />
            </div>
            {ageError && <p className="register-age-error">{ageError}</p>}
            <div className="register-form-group">
              <label>Profile Picture:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="register-form-group">
              <input type="checkbox" required />
              <label>I agree to the Terms and Conditions</label>
            </div>
            <button type="submit" className="register-submit-button">Create Account</button>
            {error && <p className="register-error">{error}</p>}
          </form>
        )}
      </div>
     
      <LoginRegisterBG/>
    </div>
  );
};

export default Register;
