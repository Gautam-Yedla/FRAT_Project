// src/components/DateRangeFilter.js
import React, { useState } from 'react';
import './DateRangeFilter.css'; // Importing the styles

const DateRangeFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ startDate, endDate });
  };

  return (
    <div className="date-range-filter">
      <h3>Filter by Date Range</h3>
      <div className="date-inputs">
        <div className="date-input-group">
          <label htmlFor="start-date" className="date-label">Start Date:</label>
          <input 
            type="date" 
            id="start-date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            className="date-input" 
          />
        </div>
        <div className="date-input-group">
          <label htmlFor="end-date" className="date-label">End Date:</label>
          <input 
            type="date" 
            id="end-date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            className="date-input" 
          />
        </div>
      </div>
      <button onClick={handleFilterChange} className="apply-button">Apply Filter</button>
    </div>
  );
};

export default DateRangeFilter;
