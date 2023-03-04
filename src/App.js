import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
