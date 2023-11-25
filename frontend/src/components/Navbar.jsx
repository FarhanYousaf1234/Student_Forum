import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    
    window.location.reload();
  };
  return (
    <header className="navbar">
      <div className="container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
     
        <Link to="/" className="logo">
          <h1>Student Forum</h1>
        </Link>
        <Link to={'/profile'}>
        
        <p className='profile'>Profile</p>
        </Link>
      </div>
    </header>
  );
};
export default Navbar;
