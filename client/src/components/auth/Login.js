import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, resetError } from "../../features/Auth/authSlice";

function Login() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    //reset error messages when component unmounts
    useEffect(() => {
        dispatch(resetError());        
    }, [dispatch])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
        setFormData({
            username: "",
            password: ""
        })
    };

    return (
        <div className='form'>
            <h1>Calorie Tracker</h1>
                <form className='form' onSubmit={ handleSubmit }>
                    <label>
                        Username:
                        <input
                            type="username" name="username" onChange={ handleChange } value={ formData.username }
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password" name="password" onChange={ handleChange } value={ formData.password }
                            required
                        />
                    </label>
                    <br />
                    <input className='submit' type="submit" value="Log In" />
                    <Link to='/signup' key="signup-link"> Sign Up </Link>
                </form>
                <div className="error-message">
                    { error }
                </div>
        </div>
    );
};

export default Login;