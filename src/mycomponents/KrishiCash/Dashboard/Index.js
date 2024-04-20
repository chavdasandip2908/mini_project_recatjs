import React, { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Grid } from 'react-loader-spinner';


import addCropImg from '../Image/additem.png'
import DataNotPresentPage from './DataNotPresentPage';
import { BEURL, signoutHandler } from './common';

import { useNavigate } from 'react-router-dom';
import '../Dashboard/Product.css'

const Index = () => {
    const navigate = useNavigate();
    const [crops, setCrops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");


    const headers = useMemo(() => ({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }), [token]);


    const fetchCropData = useCallback(() => {
        setIsLoading(true);
        axios.get(`${BEURL}/api/crops`, { headers })
            .then(response => {
                // console.log('Response:', response.data);
                setCrops(response.data);
                setIsLoading(false);
                // toast.success("fetch Crops successfully ", { duration: 3000 });

            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response.data.code === 'INVALID_TOKEN') {
                    signoutHandler(navigate);
                }
                if (error.isAxiosError && error.response) {
                    toast.error(error.response.data.error, { duration: 3000 });
                } else {
                    toast.error(error.message, { duration: 3000 });
                }
                setIsLoading(false);
            });
    }, [headers, navigate]);

    const updateCropApi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${BEURL}/api/crops/${isEditCropId}`, cropData, { headers })
            toast.success(response.data.message, { duration: 3000 });
            fetchCropData();
            setIsEditCropId("")
            // console.log('Crop updated successfully:', response);
        } catch (error) {
            console.error('Error updating crop:', error);
            if (error.isAxiosError && error.response) {
                toast.error(error.response.data.error, { duration: 3000 });
            } else {
                toast.error(error.message, { duration: 3000 });
            }
            setIsLoading(false);
        }
    }

    const newCropAddApi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BEURL}/api/crops`, cropData, { headers });
            fetchCropData();
            toast.success(response.data.message, { duration: 3000 });
            setIsLoading(false);
            // console.log('Crop added successfully:', response);
        } catch (error) {
            console.error('Error adding crop:', error);
            if (error.isAxiosError && error.response) {
                toast.error(error.response.data.error, { duration: 3000 });
            } else {
                toast.error(error.message, { duration: 3000 });
            }
            setIsLoading(false);
        }
    }

    const delteCropApi = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${BEURL}/api/crops/${id}`, cropData, { headers });
            fetchCropData();
            toast.success(response.data.message, { duration: 3000 });
            setIsLoading(false);
            // console.log('Crop added successfully:', response);
        } catch (error) {
            if (error.isAxiosError && error.response) {
                toast.error(error.response.data.error, { duration: 3000 });
            } else {
                toast.error(error.message, { duration: 3000 });
            }
            console.error('Error adding crop:', error);
            setIsLoading(false);
        }
    }


    useEffect(() => {
        // call api for get all crops
        setToken(window.localStorage.getItem('krishi-cash-user-token'));
        if (window.localStorage.getItem('krishi-cash-user-token')) {
            fetchCropData();
        }
        else {
            navigate('/krishi-cash');
        }
    }, [token, fetchCropData, navigate]);

    const displayAction = (id) => {
        let ele = document.getElementById(id);
        ele.classList.toggle("d-none");
    }

    const cropType = ["winter", "summer", "monsoon"];

    const handleButtonClick = (id) => {
        navigate('/krishi-cash/produt-details', { state: { itemId: id } });
    };

    const [showForm, setShowForm] = useState(false);
    const [cropData, setCropData] = useState({
        name: '',
        year: '',
        type: 'Select',
        image: ''
    });
    const [isEditCropId, setIsEditCropId] = useState(null);
    const [isDeleteCropId, setIsDeleteCropId] = useState(null);

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
        // setLoading(true);

        if (isEditCropId !== null) {
            // call api 
            updateCropApi();

        } else {
            newCropAddApi();
        }
        // Reset the form fields
        setCropData({ name: '', year: '', type: 'Select', image: '' });
        // Hide the form
        setShowForm(false);
    };

    const handleEdit = (item) => {
        // set item object value in cropData state
        Object.keys(cropData).forEach((key) => {
            cropData[key] = item[key];
        })
        setIsEditCropId(item._id)
        setShowForm(true);
    };
    const handleDelete = (id) => {
        setIsDeleteCropId(id);
    };

    const addNewCrop = () => {
        setShowForm(true);
        setIsEditCropId(null);
        setCropData({
            name: '',
            year: '',
            type: 'Select',
            image: ''
        });
    }

    return (
        <div className='container-fluid mx-3 overflow-auto vh-100' style={{ background: "#2a9c5014" }}>
            <Toaster />
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Grid
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass="grid-wrapper"
                    />
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="col">
                            <button className='btn btn-danger float-end my-3 mx-3' onClick={() => signoutHandler(navigate)}>sign out</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {
                                crops.length === 0 &&
                                <DataNotPresentPage />
                            }
                        </div>
                    </div>
                    <div className="row">
                        {crops.map(product => (
                            <div key={product._id} className="col-md-3 col-sm-12 my-3" style={{ maxWidth: "22rem" }} >
                                <div className="card h-100 shadow-sm rounded text-center bg-light ">
                                    <img style={{ aspectRatio: "16/10", objectFit: "cover" }} src={product.image} alt="" className="card-img-top img-thumbnail cursor-pointer" onClick={() => { handleButtonClick(product._id) }} />
                                    <div className="card-body d-flex flex-column justify-content-between align-items-start">
                                        <div className="card-body w-100  ">
                                            <button className="d-flex flex-row-reverse position-absolute end-0 me-3 btn bg-transparent " onClick={() => { displayAction(product._id) }}><i className="fa-solid fa-ellipsis-vertical"></i></button>
                                            <div className='position-absolute d-flex flex-column end-0 mt-4 me-3 gap-1 d-none' onClick={() => { displayAction(product._id) }} id={product._id}>
                                                <button type="button" className="border  rounded-1 btn-warning btn"
                                                    onClick={() => handleEdit(product)}> Edit
                                                </button>

                                                <button type="button" className="border  rounded-1 btn-danger btn "
                                                    onClick={() => handleDelete(product._id)}> Delete
                                                </button>
                                            </div>
                                            <div className="d-flex flex-column ">
                                                <h6 className="card-title fs-5 ">{product.name}</h6>
                                                <div className="d-flex flex-row align-items-center  flex-nowrap justify-content-around ">
                                                    <p className="card-text fs-6 m-0"><b>Type :</b> {product.type}</p>
                                                    <p className="card-text fs-6 m-0"> <b>Year :</b> {product.year}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-md-3 col-sm-12 my-3  " style={{ maxWidth: "22rem" }} onClick={() => { addNewCrop() }}>
                            <div className="card h-100 shadow-sm rounded text-center bg-light ">
                                <div className="card-body d-flex flex-column justify-content-between align-items-start">
                                    {/* <i className="fa-solid fa-plus fs-6 "></i> */}
                                    <img className='card-img-top img-thumbnail' src={addCropImg} alt="no..." />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showForm && (
                <div className='d-flex flex-column justify-content-center align-items-center w-100 position-fixed top-0 start-50 translate-middle-x '>
                    <form onSubmit={handleSubmit} className=' bg-body-tertiary border rounded p-3 mt-3 ' style={{ maxWidth: '90vw', width: '30rem' }}>
                        <h2 className='text-center '>{isEditCropId ? "Update Crop" : "Add New Crop"}</h2>
                        <div className="mb-3">
                            <label htmlFor="cropName" className="form-label">Crop Name</label>
                            <input type="text" className="form-control" id="cropName" name="name" value={cropData.name} onChange={handleInputChange} placeholder='enter crop name' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cropYear" className="form-label">Crop Year</label>
                            <input type="number" inputMode='numeric' className="form-control" id="cropYear" name="year" value={cropData.year} onChange={handleInputChange} placeholder='enter year for crop' />
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

            {/* Delete Confirmation Popup */}
            {
                isDeleteCropId && (
                    <div className="popup position-fixed d-flex justify-content-center align-items-center top-0 w-100 mt-2">
                        <div className="popup-content d-flex flex-column justify-content-center align-items-center bg-secondary-subtle p-2 rounded-1 shadow-lg px-4 ">
                            <h2>Confirm Delete</h2>
                            <p className='fw-medium  '>Are you sure you want to delete this crop income?</p>
                            <div className='mt-2 d-flex justify-content-end  align-items-center w-100 gap-2 '>
                                <button className='btn btn-danger' onClick={() => { delteCropApi(isDeleteCropId); setIsDeleteCropId(null) }}>Yes</button>
                                <button className='btn btn-secondary' onClick={() => setIsDeleteCropId(null)}>No</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Index;