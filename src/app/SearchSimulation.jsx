import { useState } from "react";

export default function SearchSimulation() {
  const [simulationId, setSimulationId] = useState("");
  const [simulationData, setSimulationData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!simulationId) {
      setError("Please enter a simulation ID.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      const backendUrl = process.env.NEXT_PUBLIC_RENDER_URL;
      const response = await fetch(`${backendUrl}/simulations/${simulationId}`);
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
    <div className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold">Search Simulation by ID</h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="simulationId" className="block text-sm font-medium">
            Simulation ID:
          </label>
          <input
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
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {simulationData && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">Simulation Details</h4>
          <p><strong>ID:</strong> {simulationData.id}</p>
          <p><strong>Name:</strong> {simulationData.simulationName}</p>
          <p><strong>Status:</strong> {simulationData.status}</p>
          <p><strong>Start Time:</strong> {new Date(simulationData.startTime).toLocaleString()}</p>
          <p><strong>User ID:</strong> {simulationData.userId}</p>
        </div>
      )}
    </div>
  );
}
