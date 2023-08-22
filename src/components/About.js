import React, { useState } from 'react';
import Header from './Header';
import CountUp from 'react-countup';

//box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
const About = () => {
    return (
        <div id='about' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className="row w-100">
                                <div className="col-md-6">
                                    <h3 className='color-me fw-bold fs-1 m-0'>About Me</h3>
                                    <p className='text-light fw-medium fs-6'>Why You Hire Me?</p>
                                    <p className='text-justify text-light'>Over the past years, I created 100s of websites for my clients. I pride myself on doing quality work and maintain excellent communication. Most of the time I work with MERN but some technologies I enjoy working with include ASP .net, SQL, SASS etc. </p>
                                    <div className="row mt-5">
                                        <div className="col">
                                            <div className='m-1 h-100' style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
                                                <h3 className='fs-3 text-center m-0 color-me fw-bold'><CountUp start={0} end={2} />+</h3>
                                                <p className='p-0 text-uppercase fw-semibold text-center' style={{color:"#f5f5f5"}}>years of experience</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='m-1 h-100' style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
                                                <h3 className='fs-3 m-0 color-me fw-bold text-center'><CountUp start={0} end={99} />+</h3>
                                                <p className='p-0 text-uppercase fw-semibold text-center' style={{color:"#f5f5f5"}}>finished Projects</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='m-1 h-100' style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
                                                <h3 className='fs-3 m-0 color-me fw-bold text-center'><CountUp start={0} end={0} />+</h3>
                                                <p className='p-0 text-uppercase fw-semibold text-center' style={{color:"#f5f5f5"}}>satisfied clients</p>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className='m-1 h-100' style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
                                                <h3 className='fs-3 m-0 color-me fw-bold text-center'><CountUp start={0} end={1000} />+</h3>
                                                <p className='p-0 text-uppercase fw-semibold text-center' style={{color:"#f5f5f5"}}>hours of works</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 about-me">
                                    <div className='about-info'>
                                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="btn mx-3 ms-0 p-0 py-2 border-0 text-light active" id="pills-skills-tab" data-bs-toggle="pill" data-bs-target="#pills-skills" type="button" role="tab" aria-controls="pills-skills" aria-selected="true">Skills</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="btn mx-3 p-0 py-2 border-0 text-light" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="btn mx-3 p-0 py-2 border-0 text-light" id="pills-education-tab" data-bs-toggle="pill" data-bs-target="#pills-education" type="button" role="tab" aria-controls="pills-education" aria-selected="false">Education</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-skills" role="tabpanel" aria-labelledby="pills-skills-tab" tabindex="0">
                                            <p className='text-light skill-content p-0'>
                                                Front End Development :
                                                <i title='HTML' class="fa-brands fa-html5"></i>
                                                <i title='CSS' class="fa-brands fa-css3"></i>
                                                <i title='JavaScript' class="fa-brands fa-square-js"></i>
                                                <i title='Bootstrap' class="fa-brands fa-bootstrap"></i>
                                                <i title='SASS' class="fa-brands fa-sass"></i>
                                                <i title='React Js' class="fa-brands fa-react"></i>
                                                <i title='tailwind'>TW</i>
                                            </p>
                                            <p className='text-light skill-content'>
                                                Backend Development :
                                                <i title='node js' class="fa-brands fa-node-js"></i>
                                                <i title='express js'>EX</i>
                                                <i title='asp .net core'>ASP</i>
                                                <i title='c sharp'>C#</i>
                                                <i title='mongo db database'>MB</i>
                                                <i title='my Sql database'>MySQL</i>
                                                <i title='github' class="fa-brands fa-git"></i>
                                            </p>
                                            <p className='text-light skill-content'>
                                                Problem Solving :
                                                <i title='c sharp'>C#</i>
                                                <i title='JavaScript' class="fa-brands fa-square-js"></i>
                                            </p>
                                            <p className='text-light skill-content'>
                                                Graphics :
                                                <i class="fa-brands fa-figma"></i>
                                                <i title='photoshop'>PS</i>
                                            </p>
                                        </div>
                                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                                            <p className='m-0 mb-1 text-light fw-light'>Name: Md Mehedi Hasan</p>
                                            <p className='m-0 mb-1 text-light fw-light'>Email: mdmehedihasan2360@gmail.com</p>
                                            <p className='m-0 mb-1 text-light fw-light'>Phone: +8801913382360</p>
                                            <p className='m-0 mb-1 text-light fw-light'>Date Of Birth: 25th October 2003</p>
                                            <p className='m-0 mb-1 text-light fw-light'>Blood Group: B+</p>
                                            <p className='m-0 mb-1 text-light fw-light'>Nationality: Bangladeshi</p>
                                            <p className='m-0 mb-1 text-light fw-light'>Religion: Islam</p>
                                        </div>
                                        <div class="tab-pane fade" id="pills-education" role="tabpanel" aria-labelledby="pills-education-tab" tabindex="0">
                                            <div className='my-2'> 
                                                <i class="fa-solid fa-book-open color-me"></i>
                                                <p className='m-0 fw-light text-light'>2018-2022</p>
                                                <p className='m-0 fw-semibold fs-2 text-light'>Diploma In Engineering</p>
                                            </div>
                                            <div className='my-2'>
                                                <i class="fa-solid fa-book color-me"></i>
                                                <p className='m-0 fw-light text-light'>2016-2018</p>
                                                <p className='m-0 fw-semibold fs-2 text-light'>Secondary School Certificate</p>
                                            </div>
                                        </div>
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

export default About;