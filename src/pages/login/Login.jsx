import React, { useContext } from 'react';
import './login.css'
import { Link } from 'react-router-dom'

import { useFormik } from 'formik';
import api from '../../utils/api';
import { storeAuthToken } from '../../utils/authToken';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/AuthProvider";
import jwt_decode from "jwt-decode";


const Login = () => {

  const { userData, setUserData } = useContext(AuthContext)

  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AuthContext);

  const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
      errors.username = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length <= 8) {
      errors.password = 'Must be 8 characters or more';
    }


    return errors;
  };


  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validate,
    onSubmit: values => {
      console.log('submitted!');
    },
    handleChange: values => {
    },
    handleSubmit: async () => {
      if (formik.errors) {
        return false;
      }
      try {
        const { accessToken, refreshToken } = await api.post('/users/login', {
          email: formik.values.username,
          password: formik.values.password,
        });
        storeAuthToken(refreshToken);
        setIsLogin(true);
        navigate('/');
        return false;
      } catch (error) {
        console.log(error);
      }
    }
  })

  const loginSubmit = async () => {

    try {
      const { accessToken, refreshToken } = await api.post('/users/login', {
        email: formik.values.username,
        password: formik.values.password,
      });
      storeAuthToken(refreshToken);
      setIsLogin(true);
      const {userId, email, fullname, nickname } = jwt_decode(refreshToken);
      setUserData({userId, email, fullname, nickname });
      //console.log(userData);
      navigate('/');
      return false;
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
        <form className='login-writeForm' onSubmit={formik.handleSubmit}>
          <div className="login-formGroup">
            <label>Username</label>
            <input type="text" placeholder='Username' name="username" onChange={formik.handleChange} value={formik.values.username} />
          </div>
          {formik.errors.username ? <div className="error-div">ERROR! {formik.errors.username}</div> : null}
          <div className="login-formGroup">
            <label>Password</label>
            <input type="password" placeholder='Password' name="password" onChange={formik.handleChange} value={formik.values.password} />
          </div>
          {formik.errors.password ? <div className="error-div">ERROR! {formik.errors.password}</div> : null}

          <div className="login-button">
            <button className='login-writeButton' type='submit' onClick={async () => { await loginSubmit(); }}>Login</button>
            <Link to="/register">
              <button className='login-reg-writeButton' type='button'>Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
