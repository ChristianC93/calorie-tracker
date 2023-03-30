import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../features/Auth/authSlice';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  const error = useSelector((state) => state.auth.error);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }); 
  }

  //POST request signup frontend create user
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
    navigate('/login')
  };


  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label>
          Username:
          <input type="username" name="username" onChange={ handleChange } value={ formData.username } />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={ handleChange } value={ formData.password } />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="password_confirmation" onChange={ handleChange } value={ formData.passwordConfirmation } />
        </label>
        <br />
        <input type="submit" value="Sign Up" />
      </form>
      { errors }
    </div>
  );
}

export default SignUpForm;