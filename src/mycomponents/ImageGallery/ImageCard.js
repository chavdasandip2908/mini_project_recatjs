import React from 'react'

export default function ImageCard({ image }) {

  const tags = image.tags.split(",");

  function getCurrentDateTime() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return formattedDateTime;
  }

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `iamge-gallary-${getCurrentDateTime()}.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };


  return (
    <div className="col-12 col-sm-4 g-3 rounded overflow-hidden shadow-lg  ">
      <button onClick={() => handleDownload(image.webformatURL)} className='position-absolute top-1 end-0 border-0 bg-transparent fs-3 me-2 text-light '><i class="fa-solid fa-download"></i></button>
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
      <div className="px-6 py-4 overflow-auto">
        {
          tags.map((tag, index) => (
            <div className=" badge badge-secondary p-1 px-2 mx-1">
              #{tag}
            </div>
          ))
        }
      </div>
    </div>
  )
}
