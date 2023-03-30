import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NavBar from './components/NavBar';
import SignUp from './components/auth/SignUp';
import { useEffect } from 'react';
import { myPage } from './features/Auth/authSlice';


function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(myPage());
  }, [dispatch])
  
  return (
    <div className="App">
      { user && <NavBar /> }
      <Routes>
        { user ? (
          <>
            <Route path='/home' />
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
