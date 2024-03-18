import React from 'react'
import { useLocation } from 'react-router-dom'

const Sucess = () => {
    const loacation=useLocation();
    console.log("locccccc sucessssss",loacation.state.data);
  return (
    <div>Sucess</div>
  )
}

export default Sucess