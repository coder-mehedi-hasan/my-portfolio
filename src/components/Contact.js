import React from 'react';
import Header from './Header';

const Contact = () => {
    return (
        <div id='contact' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;