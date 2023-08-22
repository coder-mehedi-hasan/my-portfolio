import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div id='error' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div>
                                <h3 className=' text-center text-light fw-semibold' style={{ fontSize: "50px" }}>This Page Is Not Found</h3>
                                <div className='d-flex justify-content-end'>
                                <Link className='btn rounded-pill px-3 text-light' style={{background:"#ff4800"}} to='/'>Go to home page <i class="fa-solid fa-arrow-up-right-from-square"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;