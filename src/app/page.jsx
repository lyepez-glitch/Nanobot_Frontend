'use client';
import '../../globals.css';
import { useState, useEffect } from 'react';
import Cell from './Cell';
import SimulationForm from './SimulationForm';
import UserForm from './UserForm';
import UserLookupForm from './UserLookupForm';
import NanobotForm from './NanobotForm';
import NanobotSearchForm from './NanobotSearchForm';
import SearchSimulation from './SearchSimulation';
import UpdateSimulationForm from './UpdateSimulationForm';
import DeleteSimulationForm from './DeleteSimulation';
import Slider from './Slider';


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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        let timerId;
        if (isRunning && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
                runSimulationStep();
            }, 1000);
        } else if (timeLeft <= 0) {
            stopSimulation();
        }

        return () => clearInterval(timerId);
    }, [isRunning, timeLeft]);

    const handleSimulationParams = (params) => {
        setSimulationParams(params);
        setStatus('Simulation starting...');
        setTimeLeft(30);
        setIsRunning(true);
    };

    const runSimulationStep = () => {
        if (!simulationParams) return;

        setSimulationResults((prev) =>
            prev.map((cell) => {
                if (simulationParams.targetCancer && cell.state === 'cancerous') {
                    return { ...cell, state: 'damaged' };
                }
                if (simulationParams.repairDamaged && cell.state === 'damaged') {
                    return { ...cell, state: 'healthy' };
                }
                return cell;
            })
        );
    };

    const stopSimulation = () => {
        setIsRunning(false);
        setStatus('Simulation stopped.');
    };
    const handleSecChange = (value) => {
        setTimeLeft(Number(value));
    };

    return (
        <main>
            {isAuthenticated?(
                <div className="max-w-screen-lg mx-auto text-center">

                <UserForm setUserId={setUserId}/>
                <UserLookupForm/>
                <NanobotForm setNanobots={setNanobots}/>
                <NanobotSearchForm/>
                <SimulationForm nanobots={nanobots} setNanobots={setNanobots} setSimulationResults={setSimulationResults}userId={userId} simulationResults={simulationResults} onSubmit={handleSimulationParams} />
                <SearchSimulation/>
                <UpdateSimulationForm/>
                <DeleteSimulationForm/>

                <h2 className="text-2xl font-semibold mb-4">Nanobot Simulation</h2>
                <Slider
                    min={0}
                    max={30}
                    step={1}
                    label="Seconds"
                    onChange={handleSecChange}
                />


                <div className="mt-4">
                    <p className="text-gray-600">{status}</p>
                    <p className="text-lg font-medium">Time left: {timeLeft}s</p>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Cell States:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {simulationResults.map((cell) => (
                            <Cell
                                key={cell.id}
                                id={cell.id}
                                state={cell.state}
                                onClick={() => console.log(`Cell ${cell.id} clicked`)}
                            />
                        ))}
                    </div>
                </div>

                {isRunning && (
                    <div className="text-center mt-6">
                        <button
                            onClick={stopSimulation}
                            className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600"
                        >
                            Stop Simulation
                        </button>
                    </div>
                )}
            </div>
            ):(
                <Signup/>
                <Login setUserId={setUserId}/>
            )}
        </main>

    );
}
