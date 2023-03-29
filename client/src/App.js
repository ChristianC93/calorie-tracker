import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';
import NavBar from './components/NavBar';

function App() {
  const user = useSelector((state) => state.user.entity);
  
  if (!user) {
    return <Login />
  }
  return (
    <div className="App">
      <NavBar user= { user } />      
    </div>
  );
}

export default App;
