import React from 'react'

const Loader = () => {

  const [isLoading, setIsLoading] = useState(false);

  // Simulating data fetching with setTimeout
  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated loading time of 2 seconds
  };

  return (
    <div className='loader'>
      {isLoading ? (
        <div className="loader">
          Loading...
        </div>
      ) : (
        <button onClick={fetchData}>Fetch Data</button>
      )}
    </div>
  )
}

export default Loader