import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase'; // Correct path to firebase.js
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Account.css'; // Importing the CSS file
import Iconaccount from './accountBG';

const Accounts = () => {
  const [subAccounts, setSubAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [scores, setScores] = useState({ level1: 0, level2: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    const fetchSubAccounts = async () => {
      const userId = auth.currentUser.uid;
      const subAccountsSnapshot = await getDocs(collection(db, 'users', userId, 'subAccounts'));
      const subAccountsList = subAccountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubAccounts(subAccountsList);
    };

    fetchSubAccounts();
  }, [navigate]);

  useEffect(() => {
    const activeSubAccount = sessionStorage.getItem('activeSubAccount');
    if (activeSubAccount) {
      setSelectedAccount(JSON.parse(activeSubAccount));
    }
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      setName(selectedAccount.name);
      setDateOfBirth(selectedAccount.dateOfBirth);
      setScores(selectedAccount.scores);
      sessionStorage.setItem('activeSubAccount', JSON.stringify(selectedAccount));
    }
  }, [selectedAccount]);

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const accountRef = doc(db, 'users', userId, 'subAccounts', selectedAccount.id);
    let profilePictureURL = selectedAccount.profilePicture || '';

    if (profilePicture) {
      const storageRef = ref(storage, `profilePictures/${userId}/${profilePicture.name}`);
      await uploadBytes(storageRef, profilePicture);
      profilePictureURL = await getDownloadURL(storageRef);
    }

    await updateDoc(accountRef, {
      name,
      dateOfBirth,
      profilePicture: profilePictureURL
    });

    alert('Account details updated successfully!');
  };

  const navigateToCreateSubAccount = () => {
    navigate('/createsubaccount'); // Adjust the route as necessary
  };

  const handleNavigateToReport = () => {
    navigate('/report'); // Adjust the route as necessary
  };

  return (
    <div className='accountPage'>
      <div className='selectSubAccounts'>
        <ul className="subaccountlist">
          {subAccounts.map((account) => (
            <li
              key={account.id}
              className={`subaccountitem ${selectedAccount && account.id === selectedAccount.id ? 'selected' : ''}`}
              onClick={() => handleSelectAccount(account)}
            >
              {account.profilePicture ? (
                <img src={account.profilePicture} alt="Profile" className={`profilepicture ${selectedAccount && account.id === selectedAccount.id ? 'selected' : ''}`} />
              ) : (
                <div className={`profileplaceholder ${selectedAccount && account.id === selectedAccount.id ? 'selected' : ''}`}>No Image</div>
              )}
              
            </li>
          ))}
        </ul>
        <button className="addsubaccountbutton" onClick={navigateToCreateSubAccount}>+</button>
      </div>
      {selectedAccount && (
        <div className='accountDetails'>
          <h2>Account Details</h2>
          <img src={selectedAccount.profilePicture} alt="Profile" className="profilepicturelarge" />
          <form onSubmit={handleUpdateAccount}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Profile Picture:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
      <div className='reauthenticateSection'>
        <button className='reoprtBtn' onClick={handleNavigateToReport}>Access Report</button>
      </div>
      <Iconaccount/>
    </div>
  );
};

export default Accounts;
