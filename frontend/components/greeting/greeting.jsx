import React from 'react';
import { Link } from 'react-router';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <div>
        <h1>Welcome, { currentUser.username }!</h1>
        <button className="btn logout" onClick={logout}>Log Out</button>
      </div>
    );
  }

  return (
    <div>
      <Link className="btn" to="/signup">Sign Up</Link>
      <Link className="btn" to="/login">Log In</Link>
    </div>
  );
};

export default Greeting;
