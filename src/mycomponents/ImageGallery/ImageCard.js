import React from 'react'

export default function ImageCard({ image }) {

  const tags = image.tags.split(",");

  
  return (
    <div className="col-4 g-3 rounded overflow-hidden shadow-lg  ">
      <img className='w-100 rounded' src={image.webformatURL} alt="loading./.." />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2  px-3 fw-bold ">Photo by <span className='text-primary'>{image.user}</span></div>
        <ul className='list-group bg-transparent '>
          <li className='list-group-item border-0 bg-transparent'>
            <strong>Views : </strong>
            {image.views}
          </li>
          <li className='list-group-item border-0 bg-transparent'>
            <strong>Downloads : </strong>
            {image.downloads}
          </li>
          <li className='list-group-item border-0 bg-transparent'>
            <strong>Likes : </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {
          tags.map((tag, index) => (
            <span className="inline-block bg-secondary rounded-5 px-3 py-1 fw-bold mx-1">
              #{tag}
            </span>
          ))
        }
      </div>
    </div>
  )
}
