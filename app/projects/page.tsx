import React from 'react';

const Project: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-[#0e141b] font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <SectionTitle title="Projects" description="A selection of projects I've worked on." />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                    {projects.map((project, idx) => (
                        <div key={idx} className="flex flex-col gap-3 pb-3">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{ backgroundImage: `url('${project.image}')` }}
                            ></div>
                            <div>
                                <p className="text-base font-medium leading-normal">{project.title}</p>
                                <p className="text-[#4e7397] text-sm font-normal leading-normal">{project.stack}</p>
                                <p className="text-[#4e7397] text-sm font-normal leading-normal">{project.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
    <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[32px] font-bold leading-tight">{title}</p>
            {description && <p className="text-[#4e7397] text-sm font-normal leading-normal">{description}</p>}
        </div>
    </div>
);

const projects = [
    {
        title: 'Design Systems',
        stack: 'React, Material-UI',
        year: '2022',
        image: 'https://cdn.usegalileo.ai/sdxl10/2f32fffd-a5ed-4a2f-ae7b-ef71900a3481.png',
    },
    {
        title: 'E-commerce Platform',
        stack: 'Node.js, Express, MongoDB',
        year: '2021',
        image: 'https://cdn.usegalileo.ai/sdxl10/68313253-5226-4159-ad89-09877519d697.png',
    },
    {
        title: 'Healthcare Management System',
        stack: 'Angular, Bootstrap',
        year: '2020',
        image: 'https://cdn.usegalileo.ai/sdxl10/9c091188-d8ec-46bc-b5b3-3831efcdeac1.png',
    },
    {
        title: 'Food Delivery App',
        stack: 'Flutter, Firebase',
        year: '2019',
        image: 'https://cdn.usegalileo.ai/sdxl10/2325b04b-1b57-4483-8e62-b99253c0d407.png',
    },
    {
        title: 'Travel Booking Platform',
        stack: 'Vue.js, Vuetify',
        year: '2018',
        image: 'https://cdn.usegalileo.ai/sdxl10/c67f35ad-6d41-449d-84ad-6f41559213b6.png',
    },
];

export default Project;
