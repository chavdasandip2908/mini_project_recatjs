import React from 'react'
import DummyImage from '../Image/dummy-image.jpg'
import { useNavigate } from 'react-router-dom';
import '../Dashboard/Product.css'

const Index = () => {
    const navigate = useNavigate();
    // here dummy data for 
    const products = [
        { id: 1, name: "Product 1", price: "$20" },
        { id: 2, name: "Product 2", price: "$35" },
        { id: 3, name: "Product 3", price: "$35" },
        { id: 4, name: "Product 4", price: "$35" },
        { id: 5, name: "Product 5", price: "$35" },
        { id: 6, name: "Product 6", price: "$35" },
    ];

    const handleButtonClick = (id) => {
        navigate('/krishi-cash/produt-details', { state: { itemId: id } });
    };


    return (
        <div className='container-fluid mx-3 overflow-auto  '>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-3 col-sm-12 my-3" onClick={() => { handleButtonClick(product.id) }}>
                        <div className="card h-100 shadow-sm rounded text-center bg-light ">
                            <img src={DummyImage} alt="" className="card-img-top img-thumbnail" />
                            <div className="card-body d-flex flex-column justify-content-between align-items-start">
                                <div className="card-body">
                                    <h6 className="card-title fs-5 ">{product.name}</h6>
                                    <p className="card-text fs-6">Total : {product.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Index;