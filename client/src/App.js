import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/auth/Login';
import NavBar from './components/nav/NavBar';
import SignUp from './components/auth/SignUp';
import { useEffect } from 'react';
import { myPage } from './features/Auth/authSlice';
import MealInput from './components/meals/MealInput';
import ExerciseInput from './components/exercises/ExerciseInput';
import UserTable from './components/usertable/UserTable';
import Meals from './components/meals/Meals';


function App() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [navigate, user])
  
  //auto login
  useEffect(() => {
    dispatch(myPage());
  }, [ dispatch ])
  
  return (
    <div className="App">
      { user && <NavBar user= { user } /> }
      <Routes>
        { user ? (
          <>
            <Route path='/' element= { <UserTable user={ user } /> } />
            <Route path={`/users/${ user.id }/meals`} element={ <Meals user={ user } /> }/> 
            <Route path='/meals/new' element= { <MealInput /> } />
            <Route path='/exercises/new' element= { <ExerciseInput /> } />
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
