// NanobotForm.js (React Component)

import React, { useState } from 'react';
import SearchSimulation from './SearchSimulation';

const Simulations = ({setAddSim}) => {
  // const [name, setName] = useState('');



  const handleAddSimClick = (e)=>{
    setAddSim(true);
  }

  return (
    <div className = "simulationsContainer">
      <button onClick={(e)=>{handleAddSimClick(e)}} className= "createSimBtn" type="submit">Create Simulation</button>
      <SearchSimulation/>

    </div>
  );
};

export default Simulations;
