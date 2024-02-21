import React, { useState } from 'react'

function ImageSerch({ setText }) {
  const [serchText, setSerchText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (serchText) setText(serchText)
  }

  return (
    <div>
      <div className='bg-transparent text-center my-4 fs-5'  >
        <form onSubmit={handleSubmit} className='mx-auto w-25 px-3 gap-1 ' style={{ minWidth: 'fit-content' }}>
          <input className='bg-transparent border-0 border-bottom p-1 my-1 w-75  ' style={{ outline: "0" }} type='text' placeholder='search....' value={serchText} onChange={(e) => setSerchText(e.target.value)} />
          <button className=' border-0 border-bottom rounded p-1 px-2 my-1 fw-bold text-light w-25 ' style={{ background: "#04a31d" }} type='submit'>Submit</button>
        </form >
      </div>
    </div>
  )
}

export default ImageSerch
