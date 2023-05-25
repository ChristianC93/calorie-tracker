import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NavBar from './components/nav/NavBar';
import SignUp from './components/auth/SignUp';
import { useEffect } from 'react';
import { myPage } from './features/Auth/authSlice';
import MealInput from './components/meals/MealInput';
import ExerciseInput from './components/exercises/ExerciseInput';
import UserTable from './components/usertable/UserTable';
import Meals from './components/meals/Meals';
import foodImage from './assets/food-image.jpg'


function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      <Login />
    }
  }, [user])

  
  //auto login
  useEffect(() => {
    dispatch(myPage());
  }, [ dispatch ])
  
  return (
    <div className="App">
      <div className='container'>
        { user && <NavBar user= { user } /> }
        { !user && (
          <div className='hero'>
            <img src={ foodImage } alt='foodImage' />
          </div>
        )}  
        <Routes>
          { user ? (
            <>
              <Route path='/' element= { <UserTable user={ user } /> } />
              <Route path={`/users/${ user.id }/meals`} element={ <Meals user={ user } /> }/> 
              <Route path={`/users/${ user.id }/meals/new`} element= { <MealInput /> } />
              <Route path={`/users/${ user.id }/exercises/new`} element= { <ExerciseInput /> } />
            </>
          ) : (
            <>
              <Route path='/' element= { <Login /> } />
              <Route path='/signup' element= { <SignUp /> } />
            </>
          )}
        </Routes>    
      </div>
    </div>
  );
}

export default App;
