import React from 'react';
import Header from './Header';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import TitleOfPage from './TitleOfPage';


const Services = () => {
    return (
        <div id='services' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className="row w-100 align-items-center">
                                <div className="col-lg-5">
                                    <TitleOfPage title={"My services"} espect={"What I will do for you?"} des={"I will do Web Development & Web Design with includes HTML, CSS, JavaScript, Bootstrap, React Js, Node Js, Express Js, MongoDB or My SQL etc. On the other hand ASP .net Core, C Sharp, My SQL etc."} />
                                </div>
                                <div className="col-lg-7 h-100">
                                    <div className="row align-items-center">
                                        <Swiper className='h-100'
                                            spaceBetween={50}
                                            slidesPerView={2.5}
                                            
                                        >

                                            <SwiperSlide className='m-0'>
                                                <div className='p-2 py-4 h-100 m-2' style={{ backgroundColor: "rgb(30 3 52)" }}>
                                                    <p className='m-0 color-me fs-4 text-start'><i class="fa-solid fa-layer-group"></i></p>
                                                    <p className='fw-semibold fs-6 text-light text-start'>Full Stack Web Development(MERN)</p>
                                                    <p className='m-0 fw-light text-light' style={{ textAlign: "justify", fontSize: "14px" }}>Including HTML, CSS, Bootstrap, React, Node JS, Express JS, MongoDB etc.</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className='m-0'>
                                                <div className='p-2 py-4 h-100 m-2' style={{ backgroundColor: "rgb(30 3 52)" }}>
                                                    <p className='m-0 color-me fs-4 text-start'><i class="fa-solid fa-cubes"></i></p>
                                                    <p className='fw-semibold fs-6 text-light text-start'>Full Stack Web Development(ASP)</p>
                                                    <p className='m-0 fw-light text-light' style={{ textAlign: "justify", fontSize: "14px" }}>Including HTML, CSS, Bootstrap, C Sharp, ASP .net Core, MySQL etc.</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className='m-0'>
                                                <div className='p-2 py-4 h-100 m-2' style={{ backgroundColor: "rgb(30 3 52)" }}>
                                                    <p className='m-0 color-me fs-4 text-start'><i class="fa-solid fa-laptop-code"></i></p>
                                                    <p className='fw-semibold fs-6 text-light text-start'>Front End Development</p>
                                                    <p className='m-0 fw-light text-light' style={{ textAlign: "justify", fontSize: "14px" }}>Including HTML, CSS, Bootstrap 5, JavaScript, React JS etc.</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className='m-0'>
                                                <div className='p-2 py-4 h-100 m-2' style={{ backgroundColor: "rgb(30 3 52)" }}>
                                                    <p className='m-0 color-me fs-4 text-start'><i class="fa-solid fa-database"></i></p>
                                                    <p className='fw-semibold fs-6 text-light text-start'>Backend End Development</p>
                                                    <p className='m-0 fw-light text-light' style={{ textAlign: "justify", fontSize: "14px" }}>Including Node JS, Express JS, MongoDB/MySQL etc.</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className='m-0 h-100'>
                                                <div className='p-2 py-4 h-100 m-2' style={{ backgroundColor: "rgb(30 3 52)" }}>
                                                    <p className='m-0 color-me fs-4 text-start'><i class="fa-solid fa-terminal"></i></p>
                                                    <p className='fw-semibold fs-6 text-light text-start'>Backend End Development(ASP)</p>
                                                    <p className='m-0 fw-light text-light' style={{ textAlign: "justify", fontSize: "14px" }}>Including C Sharp, ASP .net Core, MySQL etc.</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className='m-0'>
                                                <div className='p-2 py-4 h-100 m-2' style={{ backgroundColor: "rgb(30 3 52)" }}>
                                                    <p className='m-0 color-me fs-4 text-start'><i class="fa-regular fa-pen-to-square"></i></p>
                                                    <p className='fw-semibold fs-6 text-light text-start'>PSD TO HTML</p>
                                                    <p className='m-0 fw-light text-light' style={{ textAlign: "justify", fontSize: "14px" }}>Including HTML, CSS, Bootstrap 5, JavaScript.</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className='m-0'>
                                                <div className='p-2 py-4 h-100 m-2' style={{ backgroundColor: "rgb(30 3 52)" }}>
                                                    <p className='m-0 fs-4 color-me'><i class="fa-regular fa-pen-to-square"></i></p>
                                                    <p className='fw-semibold fs-6 text-light text-start'>Figma TO HTML</p>
                                                    <p className='m-0 fw-light text-light' style={{ textAlign: "justify", fontSize: "14px" }}>Including HTML, CSS, Bootstrap 5, JavaScript.</p>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
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

export default Services;