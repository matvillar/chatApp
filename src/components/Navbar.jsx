import React, { useContext } from 'react';
import LogoNoLetters from '../assets/LogoNoLetters.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';
// import { getUserInfo } from '../firebase/firebaseManage';
// import { onAuthStateChanged } from 'firebase/auth';
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">
        <img src={LogoNoLetters} alt="Logo" />
      </span>
      <div className="user">
        {currentUser ? (
          <span className="user-name">{currentUser?.displayName}</span>
        ) : (
          <span>Loading...</span>
        )}
        <img src={currentUser?.photoURL} alt="Profile Pic" />

        <button onClick={() => signOut(auth)}>Log out</button>
      </div>
    </div>
  );
};

export default Navbar;
