import './App.scss';
import Header from './components/Header/Header';
import {
  Outlet
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import 'react-perfect-scrollbar/dist/css/styles.css';
import Footer from './components/Footer/Footer';


function App() {
  const [hState, sethState] = useState("top");
  const userRedux = useSelector(state => state.account.user)
  const [closeNav, setCloseNav] = useState(false)
  useEffect(() => {
    var lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;
      if (+y > (lastVal + 3)) {
        sethState("down");
      }
      if (y < lastVal) {
        sethState("up");
      }
      if (y === 0) {
        sethState("top");
      }
      lastVal = y;
    };
  }, []);


  const handleClickContent = () => {
    setCloseNav(!closeNav)
  }

  useEffect(() => {
    setCloseNav(!closeNav)
  }, [window.scrollY])





  return (
    <div className="App" >
      <div className={"header w-full text-lg font-semibold " + hState}>
        <Header
          clickContent={closeNav}
        />
      </div>

      <div className='content' onClick={handleClickContent} >
        <Outlet />
      </div>
      <div className='footer '>
        <Footer />
      </div>
    </div >
  );
}

export default App;
