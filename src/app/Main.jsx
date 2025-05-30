// components/UserLogin.js
import { useState,useEffect } from 'react';
import UserLookupForm from './UserLookupForm';
import NanobotForm from './NanobotForm';
import SimulationForm from './SimulationForm';
import DeleteSimulation from './DeleteSimulation';
import Nanobots from './Nanobots';
import SearchSimulation from './SearchSimulation';
import Simulations from './Simulations';
import UpdateSimulationForm from './UpdateSimulationForm';

const Main = ({setNanobots,setSims,nanobots,setSimulationResults,userId,simulationResults,onSubmit}) => {
  const [userPage, setUserPage] = useState(false);
  const [nanobotPage, setNanobotPage] = useState(false);
  const [simPage, setSimPage] = useState(false);
  const [addNano, setAddNano] = useState(false);
  const [addSim, setAddSim] = useState(false);
  const [editSim,setEditSim] = useState(false);
  const [deleteSim,setDeleteSim] = useState(false);

  const handleUserClick = (e)=>{
    console.log('clicked');
    setUserPage(true);
    setNanobotPage(false);
    setSimPage(false);
    setEditSim(false);
    setDeleteSim(false);
  }
  const handleNanobotClick = (e)=>{
    console.log('clicked');
    setNanobotPage(true);
    setUserPage(false);
    setSimPage(false);
    setEditSim(false);
    setDeleteSim(false);
  }

  const handleSimClick = (e)=>{
    console.log('clicked');
    setNanobotPage(false);
    setUserPage(false);
    setSimPage(true);
    setEditSim(false);
    setDeleteSim(false);
  }

  return (
    <>
    <div className="asideContainer">
        <aside className="aside">
          <ul className="nav">
            <li className="userBtn">
              <button onClick={(e)=>handleUserClick(e)} className="nav-item">
                Users
              </button>
            </li>
            <li className="userBtn">
              <button onClick={(e)=>handleNanobotClick(e)} className="nav-item">
                Nanobots
              </button>
            </li>
            <li className="userBtn">
              <button onClick={(e)=>handleSimClick(e)} className="nav-item">
                Simulations
              </button>
            </li>
          </ul>
        </aside>
      </div>

      <div className="mainContainer">

      <div className="mainContent">
        {
          userPage?(
            <UserLookupForm/>
          ):(
            <></>
          )
        }
        {
          nanobotPage?(

              addNano?(

                <NanobotForm setNanobots={setNanobots}/>
              ):(
                <Nanobots setAddNano={setAddNano}/>
              )


          ):(
            <></>
          )
        }
        {
          simPage?(

            addSim?(

              <SimulationForm nanobots={nanobots} setNanobots={setNanobots} setSimulationResults={setSimulationResults}userId={userId} simulationResults={simulationResults} onSubmit={onSubmit} setSims={setSims}/>
            ):editSim?(
              <UpdateSimulationForm/>
            ):deleteSim?(
              <DeleteSimulation/>
            ):(
              <Simulations setDeleteSim={setDeleteSim} setEditSim={setEditSim} setAddSim={setAddSim}/>
            )




        ):(
          <></>
        )
        }




      </div>

    </div>
    </>


  );
};

export default Main;
