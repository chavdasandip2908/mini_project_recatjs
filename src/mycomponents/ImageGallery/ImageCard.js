import React from 'react';

export default function ImageCard({ image }) {
  const tags = image.tags.split(',');

  function getCurrentDateTime() {
    const now = new Date();
    const formattedDateTime = now.toISOString().replace(/[-:.]/g, '');
    return formattedDateTime;
  }

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `image-gallery-${getCurrentDateTime()}.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div
        className="card h-100 shadow-sm border-0 rounded overflow-hidden position-relative"
        style={{ transition: 'transform 0.3s ease-in-out' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <button
          onClick={() => handleDownload(image.webformatURL)}
          className="btn position-absolute top-0 end-0 m-2 p-2 text-white  z-1"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', border: 'none', cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
        >
          <i className="fas fa-download"></i>
        </button>

        {/* Aspect Ratio Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '75%' // This sets a 4:3 aspect ratio (3/4 = 75%)
        }}>
          <img
            className="card-img-top img-fluid"
            src={image.webformatURL}
            alt="Loading..."
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover' // Ensures the image fits the container
            }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title">Photo by <span className="text-primary">{image.user}</span></h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Views:</strong> {image.views}</li>
            <li className="list-group-item"><strong>Downloads:</strong> {image.downloads}</li>
            <li className="list-group-item"><strong>Likes:</strong> {image.likes}</li>
          </ul>
        </div>
        <div className="card-footer">
          <div className="d-flex flex-wrap">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1 mb-1" style={{ fontSize: '0.8rem' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
