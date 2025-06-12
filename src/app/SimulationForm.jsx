import { useState, useEffect } from 'react';

export default function SimulationForm({ setRepairDamaged,setNanobotId,setTargetCancer,success,setSuccess,setIsValid,count,setCount,isValid,repairDamaged,targetCancer,nanobotId,handleSubmit,setSimPage,setResultsPage,setAddSim,onSubmit, simulationResults, userId,setSimulationResults,setNanobots,nanobots }) {

    const [nanobotType, setNanobotType] = useState('repair');
    // const [targetCancer, setTargetCancer] = useState(false);
    // const [repairDamaged, setRepairDamaged] = useState(false);
    // const [isValid, setIsValid] = useState(true);
    // const [count, setCount] = useState(0);
    // const [nanobotId, setNanobotId] = useState('');
    // const [success, setSuccess] = useState('');
    // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com';
    const backendUrl = 'https://nanobot-backend.onrender.com/';



    useEffect(() => {
        const savedCount = localStorage.getItem('simulationCount');
        if (savedCount) setCount(Number(savedCount));
    }, []);

    // Save count to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('simulationCount', count);
    }, [count]);

    useEffect(() => {
        async function fetchNanobotTypes() {
            // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com';
            const backendUrl = 'https://nanobot-backend.onrender.com/';
            try {
                const response = await fetch(`${backendUrl}nanobots`);
                const data = await response.json();
                console.log('Fetched nanobots:', data);
                setNanobots(data);
            } catch (error) {
                console.error('Error fetching nanobot types:', error);
            }
        }

        fetchNanobotTypes();
    }, []);



    const startSim = () => {
        console.log('start sim');
        // setResultsPage(true);
        // setAddSim(false);
        // setSimPage(false);
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!nanobotId || (!targetCancer && !repairDamaged)) {
    //         setIsValid(false);
    //         return;
    //     }
    //     setIsValid(true);
    //     // setCount((prevCount) => prevCount + 1);

    //     try {
    //         let simPayload = {
    //             nanobotId,
    //             cells: simulationResults, // Existing cell states
    //         };

    //         // Send simulation request to backend

    //         const simNanoResponse = await fetch(`${backendUrl}simulate-nanobot`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(simPayload),
    //         });
    //         if (!simNanoResponse.ok) {
    //             throw new Error('Failed to simulate nanobot behavior');
    //         }
    //         const simNanoData = await simNanoResponse.json();
    //         console.log('Simulation results:', simNanoData);
    //         setSimulationResults(simNanoData.results);
    //         // setSuccess(data.message);
    //         // Fetch selected nanobot details
    //         const response = await fetch(`${backendUrl}nanobots/${nanobotId}`);
    //         if (!response.ok) {
    //             throw new Error('Nanobot not found');
    //         }

    //         const data = await response.json();
    //         console.log('Fetched nanobot data:', data);

    //         simPayload = {
    //             simulationName: `Simulation ${count}: Nanobot type: ${data.name}`,
    //             status: 'in-progress',
    //             startTime: Date.now(),
    //             userId,
    //             nanobotId: data.id,
    //             results: simNanoData.results,
    //         };
    //         console.log('simPayload',simPayload);

    //         // Start the simulation
    //         const simResponse = await fetch(`${backendUrl}simulations`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(simPayload),
    //         });

    //         if (!simResponse.ok) {
    //             throw new Error('Failed to create simulation');
    //         }

    //         const simData = await simResponse.json();
    //         console.log('Simulation created:', simData);
    //         setCount((prevCount) => prevCount + 1);

    //         setSuccess('Simulation started successfully!');
    //         onSubmit(simPayload);
    //     } catch (error) {
    //         console.error('Error starting simulation:', error);
    //     }
    // };

    return (
        <>
            <form  onSubmit={handleSubmit} className="simForm space-y-4 p-4 bg-white shadow-md rounded-lg">
            <button className="nanoFormBackBtn" onClick={()=>setAddSim(false)}>Back</button>
                <h3 className="text-lg font-semibold">Simulation Parameters</h3>

                <div className="selectNanoType">
                    <label htmlFor="nanobotType" className="block text-sm font-medium">
                        Select Nanobot Type:
                    </label>
                    <select
                        id="nanobotType"
                        value={nanobotId}
                        onChange={(e) => setNanobotId(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300"
                    >
                        <option value="" disabled>
                            Select a type
                        </option>
                        {nanobots && nanobots.map((bot) => (
                            <option key={bot.id} value={bot.id}>
                                {bot.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="targetingCriteria">
                    <label className="block text-sm font-medium">Targeting Criteria:</label>
                    <div className="space-y-2">
                        <div>
                            <input
                                type="checkbox"
                                id="targetCancer"
                                checked={targetCancer}
                                onChange={() => setTargetCancer(!targetCancer)}
                                className="mr-2"
                            />
                            <label htmlFor="targetCancer">Target Cancer Cells</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="repairDamaged"
                                checked={repairDamaged}
                                onChange={() => setRepairDamaged(!repairDamaged)}
                                className="mr-2"
                            />
                            <label htmlFor="repairDamaged">Repair Damaged Tissue</label>
                        </div>
                    </div>
                </div>

                {!isValid && (
                    <p className="text-red-500 text-sm">Please select a nanobot type and at least one targeting criterion.</p>
                )}

                <button
                    // onClick={startSim}
                    type="submit"
                    className="startSimBtn mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Start Simulation
                </button>
                {success && <p className="successSimForm text-green-500 mt-2">{success}</p>}
            </form>
            {/* {success && <p className="text-green-500 mt-2">{success}</p>} */}
        </>
    );
}
