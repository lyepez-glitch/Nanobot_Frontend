import { useState } from "react";

export default function SearchSimulation({setDeleteSim,setEditSim}) {
  const [simulationId, setSimulationId] = useState("");
  const [simulationData, setSimulationData] = useState(null);
  const [error, setError] = useState("");

  const handleDeleteSimClick=(e)=>{
    setDeleteSim(true);
  }
  const handleEditSimClick=(e)=>{
    setEditSim(true);
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!simulationId) {
      setError("Please enter a simulation ID.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com';
      const backendUrl = 'https://nanobot-backend.onrender.com/';
      const response = await fetch(`${backendUrl}simulations/${simulationId}`);
      if (!response.ok) {
        throw new Error("Simulation not found.");
      }
      const data = await response.json();
      setSimulationData(data);
    } catch (err) {
      setSimulationData(null);
      setError(err.message);
    }
  };

  return (
    <div className="searchSimContainer space-y-4  rounded-lg">
      <h3 style={{marginLeft: '7px'}} className="text-lg">Search Simulation by ID</h3>
      <form onSubmit={handleSearch} className="searchSimForm space-y-4">
        <div className = "searchSimInputDiv">

          <input
            className="searchSimInput"
            type="text"
            id="simulationId"
            value={simulationId}
            onChange={(e) => setSimulationId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300"
            placeholder="Enter simulation ID"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {error && <p className="searchSimErr text-red-500 text-sm">{error}</p>}

      <div className="simDetails">{simulationData && (
        <div className="simDetailsContainer mt-4">
          <h4 className="text-md font-semibold">Simulation Details</h4>
          <p><strong>ID:</strong> {simulationData.id}</p>
          <p><strong>Name:</strong> {simulationData.simulationName}</p>
          <p><strong>Status:</strong> {simulationData.status}</p>
          <p><strong>Start Time:</strong> {new Date(simulationData.startTime).toLocaleString()}</p>
          <p><strong>User ID:</strong> {simulationData.userId}</p>
          <div className="btnCont">
            <button onClick = {(e)=>handleEditSimClick(e)} className="editSimBtn">Edit</button>
            <button onClick = {(e)=>handleDeleteSimClick(e)} className="deleteSimButton deleteSimBtn">Delete</button>
          </div>

        </div>

      )}
      </div>
    </div>
  );
}
