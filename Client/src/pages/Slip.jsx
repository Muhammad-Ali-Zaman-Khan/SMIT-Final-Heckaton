import React from 'react';
import { useLocation } from 'react-router-dom';

const Slip = () => {
  const location = useLocation(); 
  const { cnic, email, name } = location.state || {}; 

  const generateTokenNumber = () => {
    return '' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  };

  const tokenNumber = generateTokenNumber();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Your Loan Slip</h1>

      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-2xl font-bold mb-2">Token Number: {tokenNumber}</h2>
        <div className="mt-4">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>CNIC:</strong> {cnic}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      </div>
    </div>
  );
};

export default Slip;
