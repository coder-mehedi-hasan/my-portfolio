import React from 'react';

const TitleOfPage = ({title, espect, des}) => {
    return (
        <>
            <h3 className='m-0 text-capitalize fw-semibold text-light fs-1'>{title}<span className='color-me'>.</span></h3>
            <p className='color-me m-0 fw-medium'>{espect}</p>
            <p className='text-light text-justify fw-light my-3' style={{ fontSize: "14px" }}>{des}</p>
        </>
    );
};

export default TitleOfPage;