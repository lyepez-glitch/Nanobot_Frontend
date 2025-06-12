// NanobotForm.js (React Component)

import React, { useState } from 'react';
import NanobotSearchForm from './NanobotSearchForm';

const Nanobots = ({setAddNano}) => {
  // const [name, setName] = useState('');



  const handleAddNanoClick = (e)=>{
    setAddNano(true);
  }

  return (
    <div className="nanobotsWrapper">
      <button onClick={(e)=>{handleAddNanoClick(e)}} className= "createNanoBtn" type="submit">Create Nanobot</button>
      <NanobotSearchForm/>

    </div>
  );
};

export default Nanobots;
