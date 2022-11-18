import React from 'react';
import { useForm } from 'react-hook-form';

import logo from './../logo.svg';
import './Login.css';

interface LoginFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const submitForm = async (data: LoginFormData) => {
  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'exists') {
        reject({
          username: {
            type: 'server-side-validation',
            message: 'Username already existed',
          },
        });
      } else {
        resolve({
          status: 'OK',
          statusCode: 200,
        });
      }
    }, 2000);
  });
  return p;
};

const Login: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const submitHandler = async (data: LoginFormData) => {
    console.log('form data', data);

    //handle server-error
    try {
      let result = await submitForm(data);
      console.log(result);
      reset();
    } catch (e) {
      // console.log(e);
      setError('username', {
        type: 'server-side-validation',
        message: 'Username already existed',
      });
      setError('password', {
        type: 'server-side-validation',
        message: 'Previous 3 passwords can not be used',
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <form name="login-form" onSubmit={handleSubmit(submitHandler)}>
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
                minLength: {
                  value: 8,
                  message: 'Password should have at-least 8 characters',
                },
                maxLength: {
                  value: 12,
                  message: 'Password should not be more than 12 characters',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                  message:
                    'Password should contains at least one uppercase letter, one lowercase letter, one number and one special character',
                },
                validate: (value) => {
                  if (value === confirmPassword) {
                    clearErrors('confirmPassword');
                    return true;
                  }
                  return 'The passwords do not match';
                },
              })}
              type="text"
              placeholder="Enter Password"
            />
          </label>
          {errors?.password && (
            <p className="error" role="alert">
              {errors.password.message}
            </p>
          )}
          <label>
            Confirm Password
            <input
              {...register('confirmPassword', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should have at-least 8 characters',
                },
                maxLength: {
                  value: 12,
                  message: 'Password should not be more than 12 characters',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                  message:
                    'Password should contains at least one uppercase letter, one lowercase letter, one number and one special character',
                },
                validate: (value) => {
                  if (value === password) {
                    clearErrors('password');
                    return true;
                  }
                  return 'The passwords do not match';
                },
              })}
              type="text"
              placeholder="Enter Password "
            />
          </label>
          {errors?.confirmPassword && (
            <p className="error" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
