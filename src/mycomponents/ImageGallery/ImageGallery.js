import React, { useEffect, useState } from 'react'
import ImageCard from './ImageCard';
import ImageSerch from './ImageSerch';

export default function ImageGallery() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState('');
    useEffect(() => {
        // call api for images
        fetch(`https://pixabay.com/api/?key=${"42418648-fee0333589a47961c973d49d5"}&q=${term}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(data => {
                setImages(data.hits)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }, [term]);

    return (
        <div className='w-100'>
            <ImageSerch setText={setTerm} />
            <div className="container-fluid mx-auto " style={{ height: '100vh' }}>
                {!isLoading && images.length === 0 && <h3 className='d-flex justify-content-center align-items-center' >Image not Found</h3>}
                {
                    isLoading ?
                        <div className='d-flex justify-content-center align-items-center' >
                            <div class="spinner-border " role="status">
                                <span class="sr-only">Loading...</span>
                            </div></div> :
                        <div className="row">
                            {images.map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </div>
                }

            </div>
        </div>
    )
}
