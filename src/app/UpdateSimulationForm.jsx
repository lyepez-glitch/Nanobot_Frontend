import { useState, useEffect } from 'react';

export default function UpdateSimulationForm() {
  const [simulationId, setSimulationId] = useState('');
  const [nanobotId, setNanobotId] = useState('');
  const [targetCancer, setTargetCancer] = useState(false);
  const [repairDamaged, setRepairDamaged] = useState(false);
  const [nanobots, setNanobots] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com';
  const backendUrl = 'https://nanobot-backend.onrender.com/';

  useEffect(() => {
    // Fetch nanobot types from the server
    async function fetchNanobotTypes() {
      try {
        const response = await fetch(`${backendUrl}nanobots`);
        const data = await response.json();
        setNanobots(data);
      } catch (error) {
        console.error('Error fetching nanobot types:', error);
      }
    }

    fetchNanobotTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!simulationId || !nanobotId) {
      setErrorMessage('Please enter a simulation ID and select a nanobot type.');
      return;
    }

    try {
      setErrorMessage('');
      const updatePayload = {
        nanobotId: Number(nanobotId),
        targetCancer,
        repairDamaged,
      };
      console.log('updatePayload',updatePayload);

      const response = await fetch(`${backendUrl}simulations/${simulationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update simulation.');
      }

      const data = await response.json();
      setSuccessMessage('Simulation updated successfully!');
      // onUpdate(data);
      console.log('updated data ',data);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="updateSimForm space-y-4 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold">Update Simulation</h3>

      <div style={{flexBasis: '100%'}}>
        <label style={{ fontSize: '15px'}}htmlFor="simulationId" className="block text-sm font-medium">
          Simulation ID:
        </label>
        <input
          type="text"
          id="simulationId"
          value={simulationId}
          onChange={(e) => setSimulationId(e.target.value)}
          className="editSimIdInput mt-1 block w-full rounded-md border-gray-300"
          placeholder="Enter simulation ID"
        />
      </div>

      <div style={{flexBasis: '100%'}}>
        <label style={{fontSize:'15px'}} htmlFor="nanobotType" className="block text-sm font-medium">
          Select Nanobot Type:
        </label>
        <select
          id="nanobotType"
          value={nanobotId}
          onChange={(e) => setNanobotId(e.target.value)}
          className="selectNanoTypeEditSim mt-1 block w-full rounded-md border-gray-300"
        >
          <option value="" disabled>
            Select a type
          </option>
          {nanobots.map((bot) => (
            <option key={bot.id} value={bot.id}>
              {bot.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{flexBasis:'100%'}}>
        <label className="targetCriteriaLabelEditSim block text-sm font-medium">Targeting Criteria:</label>
        <div style={{ border: '1px solid #ccc', paddingLeft: '10px'}} className="space-y-2">
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

      {errorMessage && <p style={{flexBasis: '100%',textAlign: 'center'}} className="text-red-500 text-sm">{errorMessage}</p>}
      {successMessage && <p style={{ flexBasis: '100%',textAlign: 'center'}} className="text-green-500 text-sm">{successMessage}</p>}

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Simulation
      </button>
    </form>
  );
}
