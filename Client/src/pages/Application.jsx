import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Application = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState({
    cnic: '',
    email: '',
    name: '',
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpenPopup(false);
    navigate('/slip', { state: formData });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Loan Application Process</h1>

      <button
        className="btn btn-primary"
        onClick={() => setOpenPopup(true)}
      >
        Proceed
      </button>

      {openPopup && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
            <div className="form-control mb-4">
              <label className="label">CNIC</label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.cnic}
                onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setOpenPopup(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
