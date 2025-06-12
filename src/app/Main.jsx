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
import Slider from './Slider';
import Cell from './Cell';


const Main = ({simulationParams,setSimulationParams,setStatus,setIsRunning,isRunning,setTimeLeft,timeLeft,setNanobots,setSims,nanobots,setSimulationResults,userId,simulationResults}) => {
  const [userPage, setUserPage] = useState(false);
  const [nanobotPage, setNanobotPage] = useState(false);
  const [simPage, setSimPage] = useState(false);
  const [resultsPage, setResultsPage] = useState(false);
  const [addNano, setAddNano] = useState(false);
  const [addSim, setAddSim] = useState(false);
  const [editSim,setEditSim] = useState(false);
  const [deleteSim,setDeleteSim] = useState(false);
  const [nanobotId, setNanobotId] = useState('');
  const [targetCancer, setTargetCancer] = useState(false);
  const [repairDamaged, setRepairDamaged] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState('');

  const backendUrl = 'https://nanobot-backend.onrender.com/';










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

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nanobotId || (!targetCancer && !repairDamaged)) {
      setIsValid(false);
      return;
  }
  setIsValid(true);
  // setCount((prevCount) => prevCount + 1);

  try {
      let simPayload = {
          nanobotId,
          cells: simulationResults, // Existing cell states
      };

      // Send simulation request to backend

      const simNanoResponse = await fetch(`${backendUrl}simulate-nanobot`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(simPayload),
      });
      if (!simNanoResponse.ok) {
          throw new Error('Failed to simulate nanobot behavior');
      }
      const simNanoData = await simNanoResponse.json();
      console.log('Simulation results:', simNanoData);
      setSimulationResults(simNanoData.results);
      // setSuccess(data.message);
      // Fetch selected nanobot details
      const response = await fetch(`${backendUrl}nanobots/${nanobotId}`);
      if (!response.ok) {
          throw new Error('Nanobot not found');
      }

      const data = await response.json();
      console.log('Fetched nanobot data:', data);

      simPayload = {
          simulationName: `Simulation ${count}: Nanobot type: ${data.name}`,
          status: 'in-progress',
          startTime: Date.now(),
          userId,
          nanobotId: data.id,
          results: simNanoData.results,
      };
      console.log('simPayload',simPayload);

      // Start the simulation
      const simResponse = await fetch(`${backendUrl}simulations`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(simPayload),
      });

      if (!simResponse.ok) {
          throw new Error('Failed to create simulation');
      }

      const simData = await simResponse.json();
      console.log('Simulation created:', simData);
      setCount((prevCount) => prevCount + 1);

      setSuccess('Simulation started successfully!');
      handleSimulationParams(simPayload);
      // onSubmit(simPayload);
  } catch (error) {
      console.error('Error starting simulation:', error);
  }
};

const handleSimulationParams = (params) => {
    setSimulationParams(params);
    setStatus('Simulation starting...');
    setTimeLeft(30);
    setIsRunning(true);
    setResultsPage(true);
    setAddSim(false);
    setSimPage(false);
};

// const runSimulationStep = () => {
//     if (!simulationParams) return;

//     setSimulationResults((prev) =>
//         prev.map((cell) => {
//             if (simulationParams.targetCancer && cell.state === 'cancerous') {
//                 return { ...cell, state: 'damaged' };
//             }
//             if (simulationParams.repairDamaged && cell.state === 'damaged') {
//                 return { ...cell, state: 'healthy' };
//             }
//             return cell;
//         })
//     );
// };

const stopSimulation = () => {
    setIsRunning(false);
    setStatus('Simulation stopped.');
};

//   useEffect(() => {
//     let timerId;
//     console.log('isRunning',isRunning,'timeLeft',timeLeft)
//     if (isRunning && timeLeft > 0) {
//         timerId = setInterval(() => {
//             setTimeLeft((prev) => prev - 1);
//             runSimulationStep();
//         }, 1000);
//     } else if (timeLeft <= 0) {
//         stopSimulation();
//     }

//     return () => clearInterval(timerId);
// }, [isRunning, timeLeft]);

// const handleSimulationParams = (params) => {
//     setSimulationParams(params);
//     setStatus('Simulation starting...');
//     setTimeLeft(30);
//     setIsRunning(true);
// };

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

// const stopSimulation = () => {
//     setIsRunning(false);
//     setStatus('Simulation stopped.');
// };

const handleSecChange = (value) => {
        setTimeLeft(Number(value));
};

const handleUserClick = (e)=>{
    console.log('clicked');
    setUserPage(true);
    setNanobotPage(false);
    setSimPage(false);
    setEditSim(false);
    setDeleteSim(false);
    setResultsPage(false);
  }
  const handleNanobotClick = (e)=>{
    console.log('clicked');
    setNanobotPage(true);
    setUserPage(false);
    setSimPage(false);
    setEditSim(false);
    setDeleteSim(false);
    setResultsPage(false);
  }

  const handleSimClick = (e)=>{
    console.log('clicked');
    setNanobotPage(false);
    setUserPage(false);
    setSimPage(true);
    setEditSim(false);
    setDeleteSim(false);
    setResultsPage(false);
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

                <NanobotForm setAddNano={setAddNano} setNanobots={setNanobots}/>
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

              <SimulationForm setTargetCancer={setTargetCancer} setNanobotId={setNanobotId} success={success} setSuccess={setSuccess} setIsValid={setIsValid} count={count} setCount={setCount} isValid={isValid} repairDamaged={repairDamaged} setRepairDamaged={setRepairDamaged} targetCancer={targetCancer} nanobotId={nanobotId} handleSubmit={handleSubmit} setSimPage={setSimPage} setResultsPage={setResultsPage} setAddSim={setAddSim} nanobots={nanobots} setNanobots={setNanobots} setSimulationResults={setSimulationResults}userId={userId} simulationResults={simulationResults} onSubmit={handleSimulationParams} setSims={setSims}/>
            ):editSim?(
              <UpdateSimulationForm success={success} setSuccess={setSuccess} setIsValid={setIsValid} count={count} setCount={setCount} isValid={isValid} repairDamaged={repairDamaged} targetCancer={targetCancer} nanobotId={nanobotId} handleSubmit={handleSubmit} setEditSim={setEditSim}/>
            ):deleteSim?(
              <DeleteSimulation setDeleteSim={setDeleteSim}/>
            ):(
              <Simulations setDeleteSim={setDeleteSim} setEditSim={setEditSim} setAddSim={setAddSim}/>
            )




        ):(
          <></>
        )
        }

        {
          resultsPage?(
            <div className="simResultsContainer">
            {/* <h2 className="text-2xl font-semibold mb-4">Nanobot Simulation</h2> */}
            {/* <Slider
                    min={0}
                    max={30}
                    step={1}
                    label="Seconds"
                    onChange={handleSecChange}

            /> */}
            <div className="backgroundEle"></div>
            <div className="timeLeftContainer mt-4">
                <p className="text-gray-600">{status}</p>
                 <p className="timeLeft text-lg font-medium">Time left</p>
                 <p className="timeLeft">{timeLeft}s</p>
                 {
              !isRunning &&
              <button
              onClick={handleSimulationParams}
              className="startSimBtn mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
              Start Simulation
          </button>

            }
            {isRunning && (
                <div style={{marginTop:'2px'}} className="text-center">
                    <button
                        onClick={stopSimulation}
                        className="stopSimBtn bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600"
                    >
                        Stop Simulation
                    </button>
                </div>
            )}
            <Slider
              min={0}
              max={30}
              step={1}
              label="Seconds"
              onChange={handleSecChange}
              />
             </div>

             <div className="cellStateContainer mt-8">
                 {/* <h3 className="text-lg font-semibold mb-4">Cell States:</h3> */}
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

            {/* {isRunning && (
                <div className="text-center mt-6">
                    <button
                        onClick={stopSimulation}
                        className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600"
                    >
                        Stop Simulation
                    </button>
                </div>
            )} */}
            {/* {
              !isRunning &&
              <button
              onClick={handleSimulationParams}
              className="startSimBtn mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
              Start Simulation
          </button>
            } */}
            </div>
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
