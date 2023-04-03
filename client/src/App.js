import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NavBar from './components/NavBar';
import SignUp from './components/auth/SignUp';
import { useEffect } from 'react';
import { myPage, resetError } from './features/Auth/authSlice';
import MealInput from './components/meals/MealInput';


function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
  }, [ dispatch ])
  
  //auto login
  useEffect(() => {
    dispatch(myPage());
  }, [ dispatch ])
  
  return (
    <div className="App">
      { user && <NavBar /> }
      <Routes>
        { user ? (
          <>
            <Route path='/home' />
            <Route path='/meals/new' element= { <MealInput /> } />
          </>
        ) : (
          <>
            <Route path='/' element= { <Login /> } />
            <Route path='/signup' element= { <SignUp /> } />
          </>
        )}
      </Routes>      
    </div>
  );
}

export default App;
