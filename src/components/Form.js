import React, { useState } from 'react';
import '../components/Form.css';

const Form = () => {
  const [pincode, setPincode] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFormElements, setShowFormElements] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate pincode
    if (!/^\d{6}$/.test(pincode)) {
      setError('Postal code must be 6 digits.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const json = await response.json();

      if (json && json[0].Status === 'Success') {
        setData(json[0].PostOffice);
        setFilteredData(json[0].PostOffice);
        setShowFormElements(false); // Hide form elements after successful API call
        setShowDetails(true); // Show details after successful API call
      } else {
        setError('No data found for the provided pincode.');
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setData([]);
      setFilteredData([]);
    }

    setIsLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const filtered = data.filter((item) =>
      item.Name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className='main-container'>
      {showFormElements && (
        <form className='inside-form' onSubmit={handleSubmit}>
          <h2>Enter Pincode</h2>
          <input
            type="text"
            className='entry'
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
          />
          <button className='lookupbtn' type="submit">Lookup</button>
        </form>
      )}

      {showDetails && (
        <>
          <h2>Pincode: {pincode}</h2>
          <h2>Message to Be displayed : </h2>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder=" Filter by Post Office Name"
          />

          <div className="grid-container">
            {filteredData.map((item, index) => (
              <div key={index} className="grid-item">
                <div className='h1'>Name - {item.Name}</div>
                <div className='h1'>Branch Type - {item.BranchType}</div>
                <div className='h1'>Delievery Status - {item.deliveryStatus}</div>
                <div className='h1'>District -{item.District}</div>
                <div className='h1'>state - {item.State}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {isLoading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Form;
