import React, { useEffect, useState } from 'react'
import axios from 'axios';

import DummyImage from '../Image/dummy-image.jpg'
import addCropImg from '../Image/additem.png'
import { BEURL } from './common';

import { useNavigate } from 'react-router-dom';
import '../Dashboard/Product.css'

const Index = () => {
    const navigate = useNavigate();
    const activeUser = window.localStorage.getItem("activeUser");
    const [crops, setCrops] = useState([]);


    useEffect(() => {
        // call api for get all crops
        axios.get(`${BEURL}/api/crops?userid=${activeUser}`)
            .then(response => {
                console.log('Response:', response.data);
                setCrops(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // here dummy data for 
    const products = [
        { id: 1, name: "Product 1", price: "$20" },
        { id: 2, name: "Product 2", price: "$35" },
        { id: 3, name: "Product 3", price: "$35" },
        { id: 4, name: "Product 4", price: "$35" },
        { id: 5, name: "Product 5", price: "$35" },
        { id: 6, name: "Product 6", price: "$35" },
    ];

    const cropType = ["winter", "summer", "monsoon"];

    const handleButtonClick = (id) => {
        navigate('/krishi-cash/produt-details', { state: { itemId: id } });
    };

    const [showForm, setShowForm] = useState(false);
    const [cropData, setCropData] = useState({
        name: '',
        year: '',
        type: 'Select',
        image: '',
        userid: activeUser
    });

    const handleInputChange = async (e) => {
        const { name, files } = e.target;

        if (name === 'image' && files.length > 0) {
            const imageFile = files[0];
            try {
                const resizedImage = await convertImageToBase64(imageFile);
                setCropData({ ...cropData, [name]: resizedImage });
            } catch (error) {
                console.error('Error resizing image:', error);
            }
        } else {
            const value = e.target.value;
            setCropData({ ...cropData, [name]: value });
        }
    };


    const convertImageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
            if (!imageFile) {
                reject("No image file provided");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(imageFile);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 500; // Maximum size in pixels
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(blob);

                        fileReader.onloadend = () => {
                            const base64data = fileReader.result;
                            resolve(base64data);
                        };
                    }, 'image/jpeg', 0.7); // Adjust quality if needed
                };
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted data:", cropData);

        try {
            const response = await axios.post(`${BEURL}/api/crops`, cropData);
            console.log('Crop added successfully:', response);
            // Optionally, you can perform additional actions after successful response
        } catch (error) {
            console.error('Error adding crop:', error);
            // Optionally, you can handle error scenarios here
        }
        // Reset the form fields
        setCropData({ name: '', year: '', type: 'Select', image: '', userid: activeUser });
        // Hide the form
        setShowForm(false);
    };


    return (
        <div className='container-fluid mx-3 overflow-auto  '>
            <div className="row">
                {crops.map(product => (
                    <div key={product._id} className="col-md-3 col-sm-12 my-3" style={{maxWidth:"22rem"}} onClick={() => { handleButtonClick(product._id) }}>
                        <div className="card h-100 shadow-sm rounded text-center bg-light ">
                            <img src={product.image} alt="" className="card-img-top img-thumbnail" />
                            <div className="card-body d-flex flex-column justify-content-between align-items-start">
                                <div className="card-body w-100 ">
                                    <h6 className="card-title fs-5 ">{product.name}</h6>
                                    <div className="d-flex flex-row align-items-center  flex-nowrap justify-content-around ">
                                        <p className="card-text fs-6 m-0"><b>Type :</b> {product.type}</p>
                                        <p className="card-text fs-6 m-0"> <b>Year :</b> {product.year}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-md-3 col-sm-12 my-3" style={{maxWidth:"22rem"}} onClick={() => { setShowForm(true) }}>
                    <div className="card h-100 shadow-sm rounded text-center bg-light ">
                        <div className="card-body d-flex flex-column justify-content-between align-items-start">
                            {/* <i className="fa-solid fa-plus fs-6 "></i> */}
                            <img className='card-img-top img-thumbnail' src={addCropImg} alt="no..." />
                        </div>
                    </div>
                </div>
            </div>
            {showForm && (
                <div className='d-flex position-fixed top-0 flex-column justify-content-center align-items-center w-100'>
                    <form onSubmit={handleSubmit} className=' bg-body-tertiary border rounded p-3 mt-3 ' style={{ maxWidth: '100vw', width: '30rem' }}>
                        <h2 className='text-center '>Add New Crop</h2>
                        <div className="mb-3">
                            <label htmlFor="cropName" className="form-label">Crop Name</label>
                            <input type="text" className="form-control" id="cropName" name="name" value={cropData.CropName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cropYear" className="form-label">Crop Year</label>
                            <input type="text" className="form-control" id="cropYear" name="year" value={cropData.CropYear} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cropType" className="form-label">Crop Type</label>
                            <select className="form-select" id="cropType" name="type" value={cropData.type} onChange={handleInputChange}>
                                <option value="Select">Select</option>
                                {cropType.map((t, index) => {
                                    return <option key={index} value={t}>{t}</option>
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cropImage" className="form-label">Crop Image</label>
                            <input type="file" className="form-control" name="image" onChange={handleInputChange} />
                        </div>
                        <div className='gap-1 d-flex flex-row justify-content-end '>
                            <button className="btn btn-secondary " onClick={() => setShowForm(false)}>Close</button>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            )
            }
        </div >
    )
}

export default Index;