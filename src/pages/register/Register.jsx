import React, { useContext, useState } from 'react';
import './register.css'
import { Link } from 'react-router-dom'
import Image from '../../assets/Image.png'
import { useFormik } from 'formik';
import api from '../../utils/api';
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, useLocation } from 'react-router-dom';
import { storeAuthToken } from '../../utils/authToken';

const Register = () => {

  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AuthContext);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.fullname) {
      errors.fullname = 'Required';
    } else if (values.fullname.length >= 30) {
      errors.fullname = 'Must be 30 characters or less';
    }

    if (!values.nickname) {
      errors.nickname = 'Required';
    } else if (values.nickname.length >= 30) {
      errors.nickname = 'Must be 30 characters or less';
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
      fullname: "",
      nickname: "",
      email: "",
      password: ""
    },
    validate,
    onSubmit: values => {
      console.log('submitted!');
    },
    handleChange: values => {
    }
  })

  const changeImg = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const registerUser = async () => {
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("fileName", fileName);
    
    try {
      const { accessToken } = await api.post('/users/register', {
        fullname: formik.values.fullname,
        nickname: formik.values.nickname,
        email: formik.values.email,
        password: formik.values.password,
      });
            
      navigate('/login');
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>register</h1>
        <p className='upload-file'>Upload Profile pic</p>
        <div className="upload-img-show">
          <img src={Image} alt="banner" />
          <p>browse media on your device</p>
        </div>
        <form className='register-writeForm' autoComplete='off' onSubmit={formik.handleSubmit}>
          <div className="register-formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input' name="photo" 
              onChange={(e)=>{changeImg(e)}} />
          </div>
          <div className="register-formGroup">
            <label>Full Name</label>
            <input type="text" placeholder='Name' name="fullname" value={formik.values.fullname} onChange={formik.handleChange} />
          </div>
          {formik.errors.fullname ? <div className="error-div">ERROR! {formik.errors.fullname}</div> : null}
          <div className="register-formGroup">
            <label>Username</label>
            <input type="text" placeholder='Username' name="nickname" value={formik.values.nickname} onChange={formik.handleChange} />
          </div>
          {formik.errors.nickname ? <div className="error-div">ERROR! {formik.errors.nickname}</div> : null}
          <div className="register-formGroup">
            <label>Email</label>
            <input type="email" placeholder='Email' name="email" value={formik.values.email} onChange={formik.handleChange} />
          </div>
          {formik.errors.email ? <div className="error-div">ERROR! {formik.errors.email}</div> : null}
          <div className="register-formGroup">
            <label>Password</label>
            <input type="text" placeholder='Password' name="password" value={formik.values.password} onChange={formik.handleChange} />
          </div>
          {formik.errors.password ? <div className="error-div">ERROR! {formik.errors.password}</div> : null}
          <div className="register-button">
            <button className='register-writeButton' type="button" onClick={()=>{registerUser()}}>register</button>
            <Link to="/login">
              <button className='reg-login-writeButton' >Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Register;
