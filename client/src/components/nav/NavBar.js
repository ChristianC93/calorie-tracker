import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/authSlice';

function NavBar({ user }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to={`/users/${ user.id }/meals`}>Previous Meals</Link>
            <Link to={`/users/${ user.id }/meals/new`}>Add Today's Meals</Link>
            <Link to={`/users/${ user.id }/exercises/new`}>Add Today's Exercises</Link>
            <Link to="/" onClick={ handleLogout }>Logout</Link>
        </nav>
    );
};

export default NavBar;