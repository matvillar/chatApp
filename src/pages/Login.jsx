import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/ChattyChatLogo.png';
import { loginUser } from '../firebase/firebaseManage';

const Login = () => {
  //  set error state
  const [err, setErr] = useState(false);

  const navigate = useNavigate();
  // login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    // what are we getting from login form
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await loginUser(email, password);
      navigate('/');
    } catch (err) {
      setErr(true);
      console.log(err + 'User Login Failed');
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src={Logo} alt="Chatty Chat Logo" />
        </span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {err && <span className="err">Something went wrong!</span>}
          <button className="btn">Log In</button>
        </form>
        <p>
          Have not sign up yet?
          <Link to="/register">
            <span className="span_login"> Register Now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
