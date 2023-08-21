import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id='header' className='position-absolute w-100 py-1'>
            <div className='row justify-content-between' >
                <div className="col-md-5">
                    <p className='m-0 fw-medium fs-3 text-light text-center text-md-start'>mehedi <span className='fw-light'>hasan</span>.</p>
                </div>
                <div className="col-md-5">
                    <p className='text-center text-lg-end m-0 py-1'>
                        <Link className='text-decoration-0 mx-3' to="https://www.facebook.com/mehedihasan2360" target='_blank'><i class="fa-brands fa-facebook-f"></i></Link>
                        <Link className='text-decoration-0 mx-3' to="https://www.instagram.com/mdmehedihasan2360" target='_blank'><i class="fa-brands fa-instagram"></i></Link>
                        <Link className='text-decoration-0 mx-3' to="https://www.linkedin.com/in/md-mehedi-hasan-1b93b6261" target='_blank'><i class="fa-brands fa-linkedin-in"></i></Link>
                        <Link className='text-decoration-0 mx-3' to="https://wa.me/01913382360" target='_blank'><i class="fa-brands fa-whatsapp"></i></Link>
                        <Link className='text-decoration-0 mx-3 me-0' to="mailto:mdmehedihasan2360@gmail.com" target='_blank'><i class="fa-solid fa-envelope"></i></Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;