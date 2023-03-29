import { useState } from "react";

function Login() {
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
                    <p>Don't have an account?</p> <a href="/signup" onClick={ handleClick }>Sign Up</a>
                </form>
            {errors.length > 0 ? errors.map((err) => <p key={err}>{err}</p>) : []}
        </div>
    );
};

export default Login;