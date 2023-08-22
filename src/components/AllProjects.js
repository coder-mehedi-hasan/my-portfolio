import React from 'react';
import Header from './Header';

const AllProjects = () => {
    return (
        <div id='allprojects' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className="row">
                                <div>
                                    <h3 className='text-light fs-1 text-center'>What Clients Say<span className='color-me'>.</span></h3>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProjects;