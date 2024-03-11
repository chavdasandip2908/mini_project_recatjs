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

    const deleteCrop = (id) => {
        console.log(id);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

                                            <div className='position-absolute d-none bg-light d-flex flex-column flex-nowrap align-content-center justify-content-center align-items-stretch ' id={item.id}>
                                                <button type="button" className="border bg-light rounded-1   "
                                                    onClick={() => handleShow()}> Edit
                                                </button>
                                                <button type="button" className="border bg-light rounded-1 "
                                                    onClick={() => deleteCrop(item.id)}> Delete
                                                </button>
                                            </div>
                                            <Modal
                                                show={show}
                                                onHide={handleClose}
                                                backdrop="static"
                                                keyboard={false}
                                            >
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control type="email" placeholder="Enter email" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" placeholder="Password" />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <button className='btn bg-success text-light' onClick={handleClose}>
                                                        Submit
                                                    </button>
                                                    <button className='btn bg-body-secondary' onClick={handleClose}>
                                                        Close
                                                    </button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
        </>
    );
}

export default Product;

