import { useSelector } from 'react-redux';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NavBar from './components/NavBar';
import SignUp from './components/auth/SignUp';


function App() {
  const user = useSelector((state) => state.auth.user);
  
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
