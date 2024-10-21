// RoundDiv.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import './NavBar.css';
import Logout from './Logout';
 


const RoundDiv = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);

  

  const handleDivClick = () => {
    setExpanded(!isExpanded);
  };

  const handleNavLinkClick = () => {
    setLinkClicked(true);
    // Set isExpanded to false after a delay (e.g., 300 milliseconds)
    setTimeout(() => {
      setExpanded(false);
      setLinkClicked(false);
    }, 700);
  };

  // Reset linkClicked state when isExpanded changes
  useEffect(() => {
    if (!isExpanded) {
      setLinkClicked(false);
    }
  }, [isExpanded]);

  return (
    <div className={`round-div-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="round-div"></div>
      <div className="clickable-div" onClick={handleDivClick}>
        <div className={`menu-icon ${isExpanded ? 'open' : ''}`} onClick={handleDivClick}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
     
      <AnimatePresence>
        {isExpanded && (
         <motion.nav
         initial={{ opacity: 0, x: '50%' }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: '30%', transition: { duration: 0.4 } }} // Set the exit transition duration to 0.5 seconds
         transition={{ duration: 1 }} // Set the transition duration to 1 second for other animations
         className="expanded-nav"
       >
      
       
    
            <ul className="nav-list">
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <NavLink className="nav-links" exact to="/home" activeClassName="active" onClick={handleNavLinkClick}>
                  Home
                </NavLink>
              </motion.li>
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <NavLink className="nav-links" to="/Account" activeClassName="active" onClick={handleNavLinkClick}>
                 Account
                </NavLink>
              </motion.li>
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <NavLink className="nav-links" to="/Instructions" activeClassName="active" onClick={handleNavLinkClick}>
                  Instructions
                </NavLink>
              </motion.li>
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <NavLink className="nav-links" to="Login" activeClassName="active" onClick={handleNavLinkClick}>
               <Logout/>
                </NavLink>
              </motion.li>
            </ul>
         
          </motion.nav>
        )}
         
      </AnimatePresence>
    </div>
  );
};

export default RoundDiv;
