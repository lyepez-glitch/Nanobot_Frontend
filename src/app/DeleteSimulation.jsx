// components/DeleteSimulationForm.js
import { useState } from 'react';

export default function DeleteSimulationForm() {
    const [simulationId, setSimulationId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!simulationId) {
            setErrorMessage('Simulation ID is required.');
            return;
        }

        try {
            // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com';
            const backendUrl = "https://nanobot-backend.onrender.com/";
            const response = await fetch(`${backendUrl}/simulations/${simulationId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete simulation with ID: ${simulationId}`);
            }

            setSuccessMessage(`Simulation with ID: ${simulationId} was successfully deleted.`);
            setErrorMessage('');
            setSimulationId(''); // Clear input field
        } catch (error) {
            console.error('Error deleting simulation:', error);
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Delete Simulation</h3>

            <div>
                <label htmlFor="simulationId" className="block text-sm font-medium">
                    Simulation ID:
                </label>
                <input
                    type="text"
                    id="simulationId"
                    value={simulationId}
                    onChange={(e) => setSimulationId(e.target.value)}
                    placeholder="Enter Simulation ID"
                    className="mt-1 block w-full rounded-md border-gray-300"
                />
            </div>

            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            <button
                type="submit"
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Delete Simulation
            </button>
        </form>
    );
}
