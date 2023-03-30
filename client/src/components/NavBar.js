import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/Auth/authSlice';

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav>
            <Link to="/home">Home</Link>
            <Link to="/meals/new">Add Today's Meals</Link>
            <Link onClick={ handleLogout }>Logout</Link>
        </nav>
    );
};

export default NavBar;