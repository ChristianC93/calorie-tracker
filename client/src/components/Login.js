import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/Auth/authSlice";

function Login() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

    return (
        <div className='form'>
            <h2>Calorie Tracker</h2>
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
                </form>
            {errors.length > 0 ? errors.map((err) => <p key={err}>{err}</p>) : []}
        </div>
    );
};

export default Login;