
import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';
import NavBar from './components/NavBar';


function App() {
  const user = useSelector((state) => state.auth.user);
  
  if (!user) {
    return <Login />
  }

  return (
    <div className="App">
      <NavBar />      
    </div>
  );
}

export default App;
