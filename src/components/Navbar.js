import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="rounded-pill" id='navbar' >
            <ul className='p-2 m-0'>
                <li class="nav-item m-0">
                    <NavLink  class="nav-link" aria-current="page" to="/"><i class="fa-solid fa-house"></i>
                    <span className='tootltip'>Home</span>
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="nav-link" to="about"><i class="fa-regular fa-user"></i>
                    <span className='tootltip'>About</span>
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="nav-link" to="services"><i class="fa-solid fa-link"></i>
                    <span className='tootltip'>Services</span>
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="nav-link" to="work"><i class="fa-solid fa-chart-column"></i>
                    <span className='tootltip'>Work</span>
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="nav-link" to="testimonial"><i class="fa-regular fa-message"></i>
                    <span className='tootltip'>Testimonials</span>
                    </NavLink>
                </li>
                <li class="nav-item m-0">
                    <NavLink class="nav-link" to="contact"><i class="fa-solid fa-envelope"></i>
                    <span className='tootltip'>Contact</span>
                    </NavLink>
                </li>
            </ul>
        </nav >

    );
};

export default Navbar;