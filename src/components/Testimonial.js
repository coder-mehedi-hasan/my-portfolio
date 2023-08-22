import React from 'react';
import Header from './Header';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import rony from '../files/images/channels4_profile.jpg'



const Testimonial = () => {
    return (
        <div id='testimonial' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className='w-100'>
                                <div>
                                    <h3 className='text-light fs-1 text-center'>What Clients Say<span className='color-me'>.</span></h3>
                                </div>
                                <div>
                                    <>
                                        <Swiper
                                            effect={'flip'}
                                            grabCursor={true}
                                            pagination={true}
                                            navigation={true}
                                            modules={[EffectFlip, Pagination, Navigation]}
                                            className="mySwiper"
                                        >
                                            <SwiperSlide className='p-5'>
                                                <div className='row'>
                                                    <div className="col-md-4 d-flex justify-content-center align-items-center border-secondary border-end">
                                                        <div>
                                                            <img src={rony} alt="" style={{ height: "100px", width: "100px", borderRadius: "100%" }} />
                                                            <p className='m-0 mt-2  text-center text-light fw-semibold'>Rony Taluder</p>
                                                            <p className='text-center text-light fw-light' style={{fontSize:"14px"}}>Mentor</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h3 className='text-start' style={{fontSize:"75px"}}><i class="fa-solid fa-quote-left"></i></h3>
                                                        <p className='fw-light text-start text-light' style={{fontSize:"15px"}}>
                                                        Great experience, highly recommend. Worked through all my questions with me and was very timely in his responsiveness.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;