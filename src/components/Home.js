import React from 'react';
import Header from './Header';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import roundtext from '../files/images/rounded-text.png'
import profileImg from '../files/images/new2-removebg.png'

const Home = () => {
    return (
        <div id='home' style={{ height: "100vh"}} className='position-relative'>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className="row w-100">
                                <div className="col-lg-7">
                                    <p className=' p-0 text-center text-md-start text-uppercase fw-medium text-light'>Hello, My name is</p>
                                    <h3 className='fw-bold m-0  text-center text-md-start text-light fs-1'>Md. Mehedi Hasan</h3>
                                    <p className='fs-3 fw-medium text-center text-md-start text-capitalize' style={{ color: "#ff4800" }}>
                                        <Typewriter
                                            options={{
                                                strings: ['full stack web developer', 'MERN stack developer', "ASP .net Developer", "web designer"],
                                                autoStart: true,
                                                loop: true,
                                            }}
                                        />
                                    </p>
                                    <p className='text-light my-md-5 p-0 fw-light text-center text-md-start text-justify '>
                                        I'm a Full Stack Web developer who is passionate about making error-free websites with 100% client satisfaction. I like to solve real-world problems. I am strategic, and goal-oriented, and always work with an end goal in mind.
                                    </p>
                                    <Link to="work" className='position-relative text-light roundtext'>
                                        <div className='arrow fs-3 fw-light'>
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </div>
                                        <img src={roundtext} alt="myproject" className='img-fluid'/>
                                    </Link>
                                </div>
                                <div className="col-lg-5">
                                    <div className="profile ">
                                    <img src={profileImg} alt="" className='d-none d-lg-block position-absolute' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;