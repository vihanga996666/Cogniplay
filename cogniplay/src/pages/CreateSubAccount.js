import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './CreateSubAccount.css';
import Iconaccount from './accountBG';

const CreateSubAccount = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleCreateSubAccount = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;

    try {
      let profilePictureURL = '';

      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${userId}/${profilePicture.name}`);
        await uploadBytes(storageRef, profilePicture);
        profilePictureURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'users', userId, 'subAccounts'), {
        name,
        dateOfBirth,
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

      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="create-subaccount-container">
      
      <div className="create-subaccount-form-wrapper">
        <form className="create-subaccount-form" onSubmit={handleCreateSubAccount}>
          <div className="create-subaccount-form-group">
            <label className="create-subaccount-label">Name:</label>
            <input
              type="text"
              className="create-subaccount-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="create-subaccount-form-group">
            <label className="create-subaccount-label">Date of Birth:</label>
            <input
              type="date"
              className="create-subaccount-input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="create-subaccount-form-group">
            <label className="create-subaccount-label">Profile Picture:</label>
            <input
              type="file"
              className="create-subaccount-input"
              onChange={handleFileChange}
            />
          </div>
          <button className="create-subaccount-button" type="submit">Create Sub-Account</button>
          {error && <p className="create-subaccount-error-message">{error}</p>}
        </form>
      </div>
      <Iconaccount/>
    </div>
  );
};

export default CreateSubAccount;
