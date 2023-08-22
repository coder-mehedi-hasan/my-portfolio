import React from 'react';
import Header from './Header';
import projects from '../files/workInfo.json'
import { Link } from 'react-router-dom';

const AllProjects = () => {
    return (
        <div id='allprojects' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className="row w-100 mt-5" style={{ maxHeight: "90vh", overflowY: "scroll" }}>
                                {
                                    projects.map((item, index) => {
                                        return (
                                            <div className="col-md-6 py-4 overflow-hidden project-item" style={{ maxHeight: "260px" }}>
                                                <div className="position-relative overflow-hidden">
                                                    <img src={item.img} alt="" className='img-fluid'/>
                                                    <div className="w-100 project-item-content position-absolute d-flex align-items-center justify-content-center" style={{ top: "0", left: "0" }}>
                                                        <div>
                                                         <Link className='btn mx-2 px-3 rounded-pill text-light' target='_blank' style={{background:"#ff4800",transition:".4s"}} to={item.liveLink}>Live Link</Link>
                                                         <Link className='btn mx-2 px-3 rounded-pill text-light' target='_blank' style={{background:"#ff4800",transition:".4s"}} to={item.gitLink}>Github Link </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProjects;