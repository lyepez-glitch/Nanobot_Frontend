// components/UserLogin.js
import { useState,useEffect } from 'react';
import UserLookupForm from './UserLookupForm';

const Main = ({}) => {
  const [userPage, setUserPage] = useState(false);
  const handleUserClick = (e)=>{
    console.log('clicked');
    setUserPage(true);
  }

  return (
    <div className="mainContainer">
        <div className="asideContainer">
        <aside className="aside">
          <ul className="nav">
            <li>
              <button onClick={(e)=>handleUserClick(e)} className="nav-item">
                Users
              </button>
            </li>
          </ul>
        </aside>


      </div>
      <div>
        {
          userPage?(
            <UserLookupForm/>
          ):(
            <></>
          )
        }
      </div>

    </div>

  );
};

export default Main;
