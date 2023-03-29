import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';

function App() {
  const user = useSelector((state) => state.user.entity);
  console.log(user)
  if (!user) {
    return <Login />
  }
  return (
    <div className="App">
      <h1>This is a h1</h1>
      
    </div>
  );
}

export default App;
