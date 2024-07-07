import React from 'react'
import { useLocation } from 'react-router-dom';

const CheckOut = () => {
    const location = useLocation();
    const {total} = location.state;
  return (
    <div>
      checkout
      {total}
    </div>
  )
}

export default CheckOut
