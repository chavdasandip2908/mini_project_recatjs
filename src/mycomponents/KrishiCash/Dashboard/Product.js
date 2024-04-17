import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import $ from 'jquery';

import '../Dashboard/Product.css'
import axios from 'axios';
import { BEURL, signoutHandler } from './common';
import { Grid } from 'react-loader-spinner';
import DataNotPresentPage from './DataNotPresentPage';

const Product = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const cropsId = location.state.itemId;
    const [isLoading, setIsLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cropIncomes, setCropIncomes] = useState([]);
    const [isSmall, setIsSmall] = useState(false);
    const [token, setToken] = useState("");
    const headers = useMemo(() => ({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }), [token]);

    const fetchCropsIncomeData = useCallback((cropsId) => {
        setIsLoading(true);
        axios.get(`${BEURL}/api/crops/${cropsId}`, { headers })
            .then(response => {
                setCropIncomes(response.data.cropsincomeid);
                setIsLoading(false);
                // toast.success("fetch Cropincomes successfully ", { duration: 3000 });
                // console.log('Response:', response);
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.code === 'INVALID_TOKEN') {
                    signoutHandler(navigate);
                }
                else if (error.isAxiosError && error.response) {
                    toast.error(error.response.data.error, { duration: 3000 });
                } else {
                    toast.error(error.message, { duration: 3000 });
                }

                setIsLoading(false);
            });
    }, [headers, navigate]);

    useEffect(() => {
        setToken(window.localStorage.getItem('krishi-cash-user-token'));
        if (window.localStorage.getItem('krishi-cash-user-token')) {
            if (!cropsId) {
                alert('No crop selected');
                navigate('/krishi-cash/home');
            } else {
                // call api for get cropIncome data
                fetchCropsIncomeData(cropsId);
            }
        }
        else {
            navigate('/krishi-cash');
        }
    }, [cropsId, fetchCropsIncomeData, navigate])


    // this useEffect for represent responsive table 
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth < 768) {

                setIsSmall(true)

            } else {
                setIsSmall(false)
            }
        };

        // Call handleResize on component mount and window resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const AddCropsIncomeAPI = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BEURL}/api/cropincomes`, { ...cropData, cropid: cropsId }, { headers });
            toast.success(response.data.message, { duration: 3000 });
            // console.log('Crop added successfully:', response);
            fetchCropsIncomeData(cropsId);
            setIsLoading(false);
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
    const updateCropsIncomeAPI = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${BEURL}/api/cropincomes/${editId}`, { ...cropData, cropid: cropsId }, { headers });
            toast.success(response.data.message, { duration: 3000 });
            // console.log('Crop added successfully:', response);
            fetchCropsIncomeData(cropsId);
            setIsLoading(false);
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
    const deleteCropsIncomeAPI = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${BEURL}/api/cropincomes/${deleteId}`, { headers });
            toast.success(response.data.message, { duration: 3000 });
            console.log('Crop added successfully:', response);
            fetchCropsIncomeData(cropsId);
            setIsLoading(false);
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
    const displayAction = (id) => {
        let ele = document.getElementById(id);
        ele.classList.toggle("d-none");
    }

    const [cropData, setCropData] = useState({
        "price": "",
        "weight": "",
        "date": new Date().toISOString().slice(0, 10)
    });
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const handleSubmit = async () => {
        if (!cropData.price || !cropData.weight || !cropData.date) {
            alert("Please fill all fields!");
            return;
        }
        if (editId == null) {
            // call post api for add data
            AddCropsIncomeAPI();
        }
        else {
            // call update api for edit data
            updateCropsIncomeAPI();
        }
        setCropData({
            "price": "",
            "weight": "",
            "date": new Date().toISOString().slice(0, 10)
        });
        setIsFormVisible(false);
    };
    const handleDeleteConfirm = () => {
        deleteCropsIncomeAPI();
        setDeleteId(null);
    };

    const closeFormBtn = () => {
        setIsFormVisible(false);
        setEditId(null);
        setCropData({
            "price": "",
            "weight": "",
            "date": new Date().toISOString().slice(0, 10)
        });
    };



    return (
        <>
            <Toaster />
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100 w-100">
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
                <div className="container " >
                    <div className="d-flex mt-5 flex-row flex-nowrap justify-content-between align-items-center">
                        <div className="ms-1 cursor-pointer" onClick={() => { navigate('/krishi-cash/home') }}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>
                        <button className='btn btn-success float-end m-2' onClick={() => setIsFormVisible(true)}>+ Add New Income</button>
                    </div>

                    {
                        cropIncomes.length === 0 ?
                            <DataNotPresentPage /> :
                            <table className={isSmall ? "table-sm mt-3 table table-bordered table-striped " : "table-lg mt-3 table table-bordered table-striped "} id="tableOne">
                                <thead className="thead-dark table-responsive-stack-thead">
                                    <tr>
                                        <th>Date</th>
                                        <th>Price Per Mounds</th>
                                        <th>Weight Per Mounds</th>
                                        <th>Weight Per KG</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cropIncomes.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <span className="movi fw-bold text-secondary-emphasis ">Date</span>
                                                        <span>{item.date}</span>
                                                    </td>
                                                    <td>
                                                        <span className="movi fw-bold text-secondary-emphasis ">Price Per Mounds</span>
                                                        <span>{item.price}</span>
                                                    </td>
                                                    <td>
                                                        <span className="movi fw-bold text-secondary-emphasis ">Weight Per Mounds</span>
                                                        <span>{(item.weight / 20).toFixed(2)}</span>
                                                    </td>
                                                    <td>
                                                        <span className="movi fw-bold text-secondary-emphasis ">Weight Per KG</span>
                                                        <span>{item.weight}</span>
                                                    </td>
                                                    <td>
                                                        <span className="movi fw-bold text-secondary-emphasis ">Total</span>
                                                        <span>{((item.weight / 20) * item.price).toFixed(2)}</span>
                                                    </td>
                                                    <td>
                                                        <span className="movi fw-bold text-secondary-emphasis ">Date</span>
                                                        <button className='btn' onClick={() => { displayAction(item._id) }}><i className="fa-solid fa-ellipsis-vertical"></i></button>

                                                        <div onClick={() => { displayAction(item._id) }} className='position-absolute d-none bg-light d-flex flex-column flex-nowrap align-content-start justify-content-center align-items-stretch gap-1 ' id={item._id} style={{ width: "5rem", marginLeft: "4rem" }}>
                                                            <button type="button" className="border btn-warning btn rounded-1   "
                                                                onClick={() => { setCropData(item); setEditId(item._id); setIsFormVisible(true) }}> Edit
                                                            </button>

                                                            <button type="button" className="border btn-danger btn rounded-1 "
                                                                onClick={() => setDeleteId(item._id)}> Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                    }
                </div >
            )}
            {/* Edit Popup */}
            {
                isFormVisible && (
                    <div className="popup position-fixed d-flex justify-content-center align-items-center w-100 mt-2">
                        <div className="popup-content d-flex flex-column justify-content-center align-items-center bg-secondary-subtle p-2 rounded-1 shadow-lg  ">
                            <h2>{editId ? "Edit Crop Income" : "New Crop Income"}</h2>
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input className='form-control' type="date" value={cropData.date} onChange={(e) => setCropData({ ...cropData, date: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input className='form-control' inputMode='numeric' type="number" value={cropData.price} onChange={(e) => setCropData({ ...cropData, price: e.target.value })} placeholder='crop income per mounds' />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Weight</label>
                                <input className='form-control' inputMode='numeric' type="number" value={cropData.weight} onChange={(e) => setCropData({ ...cropData, weight: e.target.value })} placeholder='crop weight in Kg' />
                            </div>
                            <div className='mt-2 d-flex justify-content-end  align-items-center w-100 gap-2 '>
                                <button className='btn btn-secondary' onClick={() => { closeFormBtn() }}>Cancel</button>
                                <button className='btn btn-success' onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
                            </div>
                        </div>
                    </div>

                )
            }

            {/* Delete Confirmation Popup */}
            {
                deleteId && (
                    <div className="popup position-fixed d-flex justify-content-center align-items-center w-100 mt-2">
                        <div className="popup-content d-flex flex-column justify-content-center align-items-center bg-secondary-subtle p-2 rounded-1 shadow-lg px-4 ">
                            <h2>Confirm Delete</h2>
                            <p className='fw-medium  '>Are you sure you want to delete this crop income?</p>
                            <div className='mt-2 d-flex justify-content-end  align-items-center w-100 gap-2 '>
                                <button className='btn btn-danger' onClick={handleDeleteConfirm}>Yes</button>
                                <button className='btn btn-secondary' onClick={() => setDeleteId(null)}>No</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Product;

