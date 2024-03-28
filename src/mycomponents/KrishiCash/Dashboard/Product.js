import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';
import $ from 'jquery';

const Product = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const cropsId = location.state.itemId;

    useEffect(() => {
        console.log(cropsId);
    }, [cropsId])

    useEffect(() => {
        // inspired by http://jsfiddle.net/arunpjohny/564Lxosz/1/
        $('.table-responsive-stack').each(function (i) {
            var id = $(this).attr('id');
            $(this).find("th").each(function (i) {
                $('#' + id + ' td:nth-child(' + (i + 1) + ')').prepend('<span class="table-responsive-stack-thead">' + $(this).text() + ':</span> ');
                $('.table-responsive-stack-thead').hide();
            });
        });

        $('.table-responsive-stack').each(function () {
            var thCount = $(this).find("th").length;
            var rowGrow = 100 / thCount + '%';
            $(this).find("th, td").css('flex-basis', rowGrow);
        });

        function flexTable() {
            if (window.innerWidth < 768) {
                $(".table-responsive-stack").each(function () {
                    $(this).find(".table-responsive-stack-thead").show();
                    $(this).find('thead').hide();
                });
            } else {
                $(".table-responsive-stack").each(function () {
                    $(this).find(".table-responsive-stack-thead").hide();
                    $(this).find('thead').show();
                });
            }
        }

        flexTable();

        window.onresize = function (event) {
            flexTable();
        };
    }, []);


    // here dummy data of product
    const crops = [{
        "id": "1",
        "date": "12-05-2001",
        "name": "Product A",
        "price": "$9.99",
        "weight": "30"
    }, {
        "id": "2",
        "date": "14-05-2002",
        "name": "Product B",
        "price": "$19.99",
        "weight": "15"
    }];

    const displayAction = (id) => {
        let ele = document.getElementById(id);
        ele.classList.toggle("d-none");
    }

    const updateCropIncome = (id) => {
        console.log(id);
    }

    const deleteCropIncome = (id) => {
        console.log(id);
    }

    const [editData, setEditData] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const handleEdit = (data) => {
        setEditData(data);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    const handleEditSubmit = () => {
        console.log(editData);
        setEditData(null);
    };

    const handleDeleteConfirm = () => {
        console.log(deleteId);
        setDeleteId(null);
    };

    return (
        <>
            <div className="container " >
                <div className="position-absolute top-0 mt-3 " onClick={() => { navigate('/krishi-cash') }}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <table className="mt-5 table table-bordered table-striped table-responsive-stack" id="tableOne">
                    <thead className="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>Price Per Mounds</th>
                            <th>Weight in KG</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            crops.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.weight}</td>
                                        <td>
                                            <button className='btn' onClick={() => { displayAction(item.id) }}><i className="fa-solid fa-ellipsis-vertical"></i></button>

                                            <div onClick={() => { displayAction(item.id) }} className='position-absolute d-none bg-light d-flex flex-column flex-nowrap align-content-center justify-content-center align-items-stretch ' id={item.id}>
                                                <button type="button" className="border bg-light rounded-1   "
                                                    onClick={() => handleEdit(item)}> Edit
                                                </button>

                                                <button type="button" className="border bg-light rounded-1 "
                                                    onClick={() => handleDelete(item.id)}> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
            {/* Edit Popup */}
            {editData && (
                <div className="popup position-fixed d-flex justify-content-center align-items-center w-100 mt-2">
                    <div className="popup-content d-flex flex-column justify-content-center align-items-center bg-secondary-subtle p-2 rounded-1 shadow-lg  ">
                        <h2>Edit Crop Income</h2>
                        <div className="mb-3">
                            <label class="form-label">Price</label>
                            <input className='form-control' type="text" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label class="form-label">Weight</label>
                            <input className='form-control' type="number" value={editData.weight} onChange={(e) => setEditData({ ...editData, weight: e.target.value })} />
                        </div>
                        <div className='mt-2 d-flex justify-content-end  align-items-center w-100 gap-2 '>
                            <button className='btn btn-secondary' onClick={() => setEditData(null)}>Cancel</button>
                            <button className='btn btn-success' onClick={handleEditSubmit}>OK</button>
                        </div>
                    </div>
                </div>

            )}

            {/* Delete Confirmation Popup */}
            {deleteId && (
                <div className="popup position-fixed d-flex justify-content-center align-items-center w-100 mt-2">
                    <div className="popup-content d-flex flex-column justify-content-center align-items-center bg-secondary-subtle p-2 rounded-1 shadow-lg  ">
                        <h2>Confirm Delete</h2>
                        <p className='fw-bold '>Are you sure you want to delete this crop income?</p>
                        <div className='mt-2 d-flex justify-content-end  align-items-center w-100 gap-2 '>
                            <button className='btn btn-danger' onClick={handleDeleteConfirm}>Yes</button>
                            <button className='btn btn-secondary' onClick={() => setDeleteId(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;

