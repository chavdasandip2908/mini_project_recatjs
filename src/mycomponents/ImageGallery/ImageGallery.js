import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import ImageSearch from './ImageSerch';

export default function ImageGallery() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState('');

    useEffect(() => {
        // Call API for images
        fetch(`https://pixabay.com/api/?key=42418648-fee0333589a47961c973d49d5&q=${term}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(data => {
                setImages(data.hits);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [term]);

    return (
        <div style={{
            backgroundImage:
                `linear-gradient(112.5deg, rgb(168,165,165) 0%, rgb(168,165,165) 10%,rgb(195,195,195) 10%, rgb(195,195,195) 53%,rgb(176,176,176) 53%, rgb(176,176,176) 55%,rgb(157,157,157) 55%, rgb(157,157,157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%), 
linear-gradient(157.5deg, rgb(168,165,165) 0%, rgb(168,165,165) 10%,rgb(195,195,195) 10%, rgb(195,195,195) 53%,rgb(176,176,176) 53%, rgb(176,176,176) 55%,rgb(157,157,157) 55%, rgb(157,157,157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%), 
linear-gradient(135deg, rgb(168,165,165) 0%, rgb(168,165,165) 10%,rgb(195,195,195) 10%, rgb(195,195,195) 53%,rgb(176,176,176) 53%, rgb(176,176,176) 55%,rgb(157,157,157) 55%, rgb(157,157,157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%), 
linear-gradient(90deg, rgb(195,195,195),rgb(228, 228, 228))`,
            backgroundBlendMode: 'overlay, overlay, overlay, normal',
            width: "100vw"
        }}>
            <div
                className='container my-4'

            >
                <ImageSearch setText={setTerm} />
                {!isLoading && images.length === 0 && <h3 className='text-center mt-4'>Image not found</h3>}
                {
                    isLoading ? (
                        <div className='d-flex justify-content-center align-items-center vh-100'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {images.map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </div>
                    )
                }
            </div >
        </div>
    );
}
