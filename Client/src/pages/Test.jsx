import React, { useState } from 'react';

// Category Card Component
const LoanCategoryCard = ({ category, onClick }) => {
  return (
    <div className="card bg-gray-100 p-5 rounded-lg shadow-lg hover:bg-blue-100 transition ease-in-out duration-300" onClick={onClick}>
      <h2 className="text-xl font-semibold">{category.name}</h2>
      <p>Max Loan: {category.maxLoan}</p>
      <p>Loan Period: {category.loanPeriod}</p>
    </div>
  );
};

// Main Loan Categories Component
const LoanCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: 'Wedding Loans',
      maxLoan: 'PKR 5 Lakh',
      loanPeriod: '3 years',
      subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
    },
    {
      name: 'Home Construction Loans',
      maxLoan: 'PKR 10 Lakh',
      loanPeriod: '5 years',
      subcategories: ['Structure', 'Finishing', 'Loan'],
    },
    {
      name: 'Business Startup Loans',
      maxLoan: 'PKR 10 Lakh',
      loanPeriod: '5 years',
      subcategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
    },
    {
      name: 'Education Loans',
      maxLoan: 'Based on requirement',
      loanPeriod: '4 years',
      subcategories: ['University Fees', 'Child Fees Loan'],
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Loan Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => (
          <LoanCategoryCard key={category.name} category={category} onClick={() => handleCategoryClick(category)} />
        ))}
      </div>

      {/* Category Details Section */}
      {selectedCategory && (
        <div className="mt-5 p-5 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">{selectedCategory.name} - Details</h2>
          <p className="mt-2">Max Loan: {selectedCategory.maxLoan}</p>
          <p>Loan Period: {selectedCategory.loanPeriod}</p>
          <h3 className="mt-4 font-semibold">Subcategories:</h3>
          <ul className="list-disc pl-5">
            {selectedCategory.subcategories.map((sub, index) => (
              <li key={index}>{sub}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoanCategories;
