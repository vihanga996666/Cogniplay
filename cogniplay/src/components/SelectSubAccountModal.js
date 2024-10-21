import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './SelectSubAccountModal.css';

const SelectSubAccountModal = ({ onClose, onSelect }) => {
  const [subAccounts, setSubAccounts] = useState([]);

  useEffect(() => {
    const fetchSubAccounts = async () => {
      const userId = auth.currentUser.uid;
      const subAccountsSnapshot = await getDocs(collection(db, 'users', userId, 'subAccounts'));
      const subAccountsList = subAccountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubAccounts(subAccountsList);
    };
    fetchSubAccounts();
  }, []);

  return (
    <div className="modaloverlay1">
      <div className="modal1">
        <div className="modalcontent1">
          <h2>Select Kid-Account</h2>
          {subAccounts.length === 0 ? (
            <p>No sub-accounts available.</p>
          ) : (
            <ul className="sub-account-list1">
              {subAccounts.map(subAccount => (
                <li key={subAccount.id} className="sub-account-item1" onClick={() => onSelect(subAccount)}>
                  <img src={subAccount.profilePicture} alt={`${subAccount.name}'s profile`} className="profile-picture" />
                  <span>{subAccount.name}</span>
                </li>
              ))}
            </ul>
          )}
          <button className="closebutton1" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SelectSubAccountModal;
