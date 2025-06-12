'use client';
import '../../globals.css';
import { useState, useEffect } from 'react';
import Cell from './Cell';
import SimulationForm from './SimulationForm';
import UserForm from './UserForm';
import Login from './Login';
import UserLookupForm from './UserLookupForm';
import NanobotForm from './NanobotForm';
import NanobotSearchForm from './NanobotSearchForm';
import SearchSimulation from './SearchSimulation';
import UpdateSimulationForm from './UpdateSimulationForm';
import DeleteSimulationForm from './DeleteSimulation';
import Slider from './Slider';
import Main from './Main';
export default function Home() {
    const [simulationResults, setSimulationResults] = useState([
        { id: 1, state: 'healthy' },
        { id: 2, state: 'damaged' },
        { id: 3, state: 'cancerous' },
        { id: 4, state: 'damaged' },
    ]);
    const [status, setStatus] = useState('');
    const [simulationParams, setSimulationParams] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [userId,setUserId] = useState(null)
    const [nanobots, setNanobots] = useState([]);
    const [sims, setSims] = useState([]);
    const [isSignedUp, setSignUp] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);




    return (
        <>


        {
                isSignedUp?(
                <>
                  {
                    isLoggedIn?(
                        <>
                        <Main simulationParams={simulationParams} setSimulationParams={setSimulationParams} setStatus={setStatus} setTimeLeft={setTimeLeft} setIsRunning={setIsRunning} isRunning={isRunning} timeLeft={timeLeft} nanobots={nanobots} setNanobots={setNanobots} setSimulationResults={setSimulationResults}userId={userId} simulationResults={simulationResults}  setSims={setSims}/>

                        </>
                    ):(
                        <Login setSignUp={setSignUp} setLoggedIn={setLoggedIn}/>
                    )
                  }

                </>
                ):(
                <>
                  <UserForm setSignUp={setSignUp} setUserId={setUserId}/>
                </>
            )

        }

        </>

    );
}
