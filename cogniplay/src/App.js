import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import PrivateRoute from './components/PrivateRoute';
import RoundDiv from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Instructions from './pages/Instructions';
import Account from './pages/Account';
import CreateSubAccount from './pages/CreateSubAccount';
import Level1 from './pages/Levels/Level1';
import Level2 from './pages/Levels/Level2';
import Level3 from './pages/Levels/Level3';
import Level4 from './pages/Levels/Level4';
import Level5 from './pages/Levels/Level5';
import Level6 from './pages/Levels/Level6';
import Level7 from './pages/Levels/Level7';
import Level8 from './pages/Levels/Level8';
import Level9 from './pages/Levels/Level9';
import Level10 from './pages/Levels/Level10';
import Finished from './pages/Levels/Finished';
import Report from './pages/Report';
import ReportPassword from './pages/ReportPassword';  // Import the password component

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <RoundDiv />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
        <Route path="/home" element={<PrivateRoute user={user} element={<Home />} />} />
        <Route path="/instructions" element={<PrivateRoute user={user} element={<Instructions />} />} />
        <Route path="/account" element={<PrivateRoute user={user} element={<Account />} />} />
        <Route path="/createsubaccount" element={<PrivateRoute user={user} element={<CreateSubAccount />} />} />
        <Route path="/level1" element={<PrivateRoute user={user} element={<Level1 />} />} />
        <Route path="/level2" element={<PrivateRoute user={user} element={<Level2 />} />} />
        <Route path="/level3" element={<PrivateRoute user={user} element={<Level3 />} />} />
        <Route path="/level4" element={<PrivateRoute user={user} element={<Level4 />} />} />
        <Route path="/level5" element={<PrivateRoute user={user} element={<Level5 />} />} />
        <Route path="/level6" element={<PrivateRoute user={user} element={<Level6 />} />} />
        <Route path="/level7" element={<PrivateRoute user={user} element={<Level7 />} />} />
        <Route path="/level8" element={<PrivateRoute user={user} element={<Level8 />} />} />
        <Route path="/level9" element={<PrivateRoute user={user} element={<Level9 />} />} />
        <Route path="/level10" element={<PrivateRoute user={user} element={<Level10 />} />} />
       
        <Route path="/finished" element={<PrivateRoute user={user} element={<Finished />} />} />
        <Route path="/report" element={<PrivateRoute user={user} element={<ReportPassword />} />} /> {/* Route for password */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
