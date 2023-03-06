import './App.scss';
import Header from './components/Header/Header';
import {
  Outlet
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"


function App() {
  const [hState, sethState] = useState("top");
  const userRedux = useSelector(state => state.account.user)

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


  return (
    <div className="App" >
      <div className={"header w-full text-lg font-semibold " + hState}>
        <Header />
      </div>
      <div className='content' >
        <Outlet />
      </div>
    </div >
  );
}

export default App;
