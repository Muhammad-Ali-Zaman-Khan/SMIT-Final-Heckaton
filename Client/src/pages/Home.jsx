import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [deposit, setDeposit] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const navigate = useNavigate(); 


  const handleCalculate = () => {
    if (!deposit || !loanPeriod) {
      alert('Please enter both initial deposit and loan period.');
      return;
    }

    const interestRate = 0.05; 
    const totalAmount = parseFloat(deposit) + (parseFloat(loanPeriod) * interestRate * parseFloat(deposit));

    alert(`Total Loan Amount: $${totalAmount.toFixed(2)}`);
    navigate('/application');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Loan Application</h1>
      <div className="mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Loan Category</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Wedding Loans">Wedding Loans</option>
            <option value="Home Construction Loans">Home Construction Loans</option>
            <option value="Business Startup Loans">Business Startup Loans</option>
            <option value="Education Loans">Education Loans</option>
          </select>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Subcategory</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value="Standard">Input initial deposit.</option>
            <option value="Premium">Select loan period</option>
          </select>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Initial Deposit</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter amount"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Loan Period (Months)</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter period"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button className="btn btn-primary w-full" onClick={handleCalculate}>
            Calculate Loan Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
