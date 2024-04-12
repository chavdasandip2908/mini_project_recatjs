import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Grid } from 'react-loader-spinner';

// import image
import Avtar from '../Image/signupimage.svg'
import "../Forms/Form.css"
import { BEURL } from '../Dashboard/common';
import { useNavigate } from 'react-router-dom';



function Index() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        ...(isSignUp && { cpassword: "" })
    });

    useEffect(() => {
        const userToken = window.localStorage.getItem('krishi-cash-user-token');
        if (userToken) {
            navigate("/krishi-cash/home");
        }
    });

    const registerApi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BEURL}/api/users/register`, userData);
            toast.success(response.data.message, { duration: 3000 });
            setIsLoading(false);
            setIsSignUp(false);
            // console.log('user register successfully:', response);
        } catch (error) {
            console.error('Error register user:', error);
            setIsLoading(false);
            toast.error(error.message, { duration: 3000 });
        }
    }
    const loginApi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BEURL}/api/users/login`, userData);
            window.localStorage.setItem('krishi-cash-user-token', response.data.token);
            toast.success("User login successfully", { duration: 3000 });
            setIsLoading(false);
            // console.log('user login successfully:', response);
            navigate("/krishi-cash/home");
        } catch (error) {
            console.error('Error login user:', error);
            setIsLoading(false);
            toast.error(error.message, { duration: 3000 });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);

        // if isSignUp is true call api for register
        if (isSignUp) {
            registerApi();
        }
        else {
            loginApi();
        }

        Object.keys(userData).forEach(key => {
            userData[key] = '';
        });
        console.log(userData);
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <section className="vh-100 w-100 bg-cu">
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
                <div className="container-fluid h-custom vh-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={Avtar} className="img-fluid" alt="loading..." />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 px-5 ">
                            <form onSubmit={handleSubmit}>
                                {/* Email input */}
                                <div className=" mb-5">
                                    <h1 className="w-100 text-center text-secondary-emphasis ">{isSignUp ? "Sign up" : "Sign in"}</h1>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" name='email' inputMode='email' className="form-control form-control-lg"
                                        value={userData.email} onChange={handleInputChange} placeholder="Enter a email address" />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                {/* Password input */}
                                <div className="form-outline mb-3">
                                    <input type="password" name='password' className="form-control form-control-lg"
                                        value={userData.password} onChange={handleInputChange} placeholder="Enter password" />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                {
                                    isSignUp &&
                                    <div className="form-outline mb-3">
                                        <input type="password" name='cpassword' className="form-control form-control-lg"
                                            value={userData.cpassword} onChange={handleInputChange} placeholder="Re-enter password" />
                                        <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                                    </div>
                                }

                                {/* <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div> */}

                                <div className="text-center text-lg-start mt-3 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>{isSignUp ? "Sign Up" : "Sign In"}</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">{isSignUp ?
                                        <>
                                            Do you have an account? &nbsp;
                                            <span className="link-danger cursor-pointer" onClick={() => setIsSignUp(false)} >Sign In</span>
                                        </>
                                        :
                                        <>
                                            Don't have an account? &nbsp;
                                            <span className="link-danger cursor-pointer" onClick={() => setIsSignUp(true)}>Sign Up</span>
                                        </>
                                    } </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            )}
        </section >


    )
}

export default Index
