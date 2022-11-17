import React from 'react';
import logo from './../logo.svg';
import './Login.css';

const Login: React.FC<{}> = () => {
  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <form name="login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            required
          />
          <button type="submit">Login</button>
          <label htmlFor="remember">
            <input type="checkbox" id="remember" />
            <span>Remember me</span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
