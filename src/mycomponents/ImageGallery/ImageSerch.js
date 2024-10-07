import React, { useState } from 'react';

function ImageSearch({ setText }) {
  const [searchText, setSearchText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (searchText) setText(searchText);
  }

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center my-4'>
        <form onSubmit={handleSubmit} className='d-flex w-75 gap-3'>
          {/* Search input */}
          <input 
            className='form-control p-2 shadow-sm border-0' 
            style={{
              borderRadius: '30px', 
              fontSize: '1.2rem', 
              transition: 'all 0.3s ease-in-out', 
              outline: 'none',
              backgroundColor: '#f1f3f5'
            }} 
            type='text' 
            placeholder='Search for images...' 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
          />

          {/* Submit button */}
          <button 
            className='btn text-light shadow-sm' 
            style={{
              backgroundColor: '#04a31d',
              borderRadius: '30px', 
              padding: '10px 30px', 
              fontSize: '1.2rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease-in-out',
            }} 
            type='submit'
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#037018'} // Darker shade on hover
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#04a31d'}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageSearch;
