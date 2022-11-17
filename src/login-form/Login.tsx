import React from 'react';
import { useForm } from 'react-hook-form';

import logo from './../logo.svg';
import './Login.css';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
      remember: true,
    },
  });
  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <form
          name="login-form"
          onSubmit={handleSubmit((data) => {
            console.log('form data', data);
          })}
        >
          <label>
            Username
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 4,
                  message: 'Username should have at-least 4 characters',
                },
              })}
              type="text"
              placeholder="Enter Username"
            />
          </label>
          {errors?.username && (
            <p className="error" role="alert">
              {errors.username.message}
            </p>
          )}
          <label>
            Password
            <input
              {...register('password', {
                required: 'Password is required',
              })}
              type="password"
              placeholder="Enter Password"
            />
          </label>
          {errors?.password && (
            <p className="error" role="alert">
              {errors.password.message}
            </p>
          )}
          <button type="submit">Login</button>
          <label>
            <input {...register('remember')} type="checkbox" />
            <span className="remember">Remember me</span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
