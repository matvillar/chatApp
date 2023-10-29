import React, { useState } from 'react';
import Logo from '../assets/ChattyChatLogo.png';
import { RiImageAddFill } from 'react-icons/ri';
import { registerUser } from '../firebase/firebaseManage';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  // define useState hooks

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // what are we getting from register form
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      await registerUser(name, email, password, file);
      navigate('/');
    } catch (err) {
      console.log(err + 'User Registration Failed');
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src={Logo} alt="Chatty Chat Logo" />
        </span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: 'none' }} type="file" name="" id="file" />
          <label htmlFor="file">
            <RiImageAddFill className="icon" />
            <span>Upload Avatar</span>
          </label>
          <button className="btn">Sign up</button>
          {err && <span className="err">Something went wrong!</span>}
        </form>
        <p>
          Already have an account?
          <Link to="/login">
            <span className="span_login"> Login Now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
