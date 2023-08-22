import React from 'react';
import Header from './Header';
import TitleOfPage from './TitleOfPage';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import iknow from '../files/images/Screenshot_6.png'
import philip from '../files/images/Screenshot_1.png'
import softlay from '../files/images/Screenshot_2.png'
import romofyi from '../files/images/Screenshot_3.png'

const Work = () => {
    return (
        <div id='work' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className="row w-100">
                                <div className="col-lg-5 h-100">
                                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                        <div>
                                            <TitleOfPage title={"my wok"} des={"I will do 100+ projects. I will provide some projects for you."} />
                                            <Link className='btn btn-danger' style={{ background: "#ff4800", cursor: "pointer" }} to='all/projects' >All Projects</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <Swiper
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        centeredSlides={true}
                                        slidesPerView={'auto'}
                                        coverflowEffect={{
                                            rotate: 50,
                                            stretch: 0,
                                            depth: 100,
                                            modifier: 1,
                                            slideShadows: true,
                                        }}
                                        pagination={true}
                                        modules={[EffectCoverflow, Pagination]}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide>
                                            <div className="p-1">
                                                <div className='rounded work-overflow position-relative border overflow-hidden'>
                                                    <img src={iknow} alt="" className='img-fluid' />
                                                    <Link to='all/projects' className='position-absolute work-overflow-content h-100 w-100 d-flex justify-content-center align-items-center btn' style={{ background: "linear-gradient(rgb(80, 4, 63,0.7), rgb(69, 9, 118,0.8))", zIndex: "1", top: "0", left: "0", transition: ".4s", opacity: "0" }}>
                                                        <span className='color-me' style={{ cursor: "pointer" }}>Go to projects <i class="fa-solid fa-arrow-right-to-bracket"></i></span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="p-1">
                                                <div className='rounded work-overflow position-relative border overflow-hidden'>
                                                    <img src={philip} alt="" className='img-fluid' />
                                                    <Link to='all/projects' className='position-absolute work-overflow-content h-100 w-100 d-flex justify-content-center align-items-center btn' style={{ background: "linear-gradient(rgb(80, 4, 63,0.7), rgb(69, 9, 118,0.8))", zIndex: "1", top: "0", left: "0", transition: ".4s", opacity: "0" }}>
                                                        <span className='color-me' style={{ cursor: "pointer" }}>Go to projects <i class="fa-solid fa-arrow-right-to-bracket"></i></span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="p-1">
                                                <div className='rounded work-overflow position-relative border overflow-hidden'>
                                                    <img src={softlay} alt="" className='img-fluid' />
                                                    <Link to='all/projects' className='position-absolute work-overflow-content h-100 w-100 d-flex justify-content-center align-items-center btn' style={{ background: "linear-gradient(rgb(80, 4, 63,0.7), rgb(69, 9, 118,0.8))", zIndex: "1", top: "0", left: "0", transition: ".4s", opacity: "0" }}>
                                                        <span className='color-me' style={{ cursor: "pointer" }}>Go to projects <i class="fa-solid fa-arrow-right-to-bracket"></i></span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="p-1">
                                                <div className='rounded work-overflow position-relative border overflow-hidden'>
                                                    <img src={romofyi} alt="" className='img-fluid' />
                                                    <Link to='all/projects' className='position-absolute work-overflow-content h-100 w-100 d-flex justify-content-center align-items-center btn' style={{ background: "linear-gradient(rgb(80, 4, 63,0.7), rgb(69, 9, 118,0.8))", zIndex: "1", top: "0", left: "0", transition: ".4s", opacity: "0" }}>
                                                        <span className='color-me' style={{ cursor: "pointer" }}>Go to projects <i class="fa-solid fa-arrow-right-to-bracket"></i></span>
                                                    </Link>
                                                </div>
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
    );
};

export default Work;