import React from 'react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-[#0e141b]">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div
                    className="w-full min-h-80 rounded-xl bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('https://cdn.usegalileo.ai/sdxl10/a5bb73e3-7266-4371-b738-a49cab5ed568.png')",
                    }}
                />

                <h1 className="text-4xl font-bold text-center pt-6 pb-3">Mehedi Hasan</h1>
                <p className="text-[#4e7397] text-sm text-center pb-3">Full-stack Developer</p>
                <p className="text-base text-center pb-3">
                    I am a full-stack developer with 10 years of experience, specializing in both front-end and back-end development. I have worked with a range of technologies including
                    JavaScript, Python, React, Node.js, Express, and MongoDB. I am passionate about creating user-friendly interfaces and ensuring that my applications are easy to
                    maintain and scale.
                </p>

                <SectionTitle title="Experience" />
                <ExperienceItem
                    role="Senior Full-stack Developer, TechSolutions"
                    duration="2015-2020"
                />
                <ExperienceItem
                    role="Junior Full-stack Developer, CodeCraft"
                    duration="2013-2015"
                />

                <SectionTitle title="Education" />
                <EducationItem
                    degree="Bachelor of Computer Science, University of Dhaka"
                    year="2010-2013"
                />

                <SectionTitle title="Skills" />
                <div className="flex flex-wrap gap-3 p-3 pr-4">
                    {[
                        'JavaScript', 'Python', 'React', 'Node.js', 'Express', 'MongoDB',
                        'HTML', 'CSS', 'Bootstrap', 'Material-UI', 'RESTful APIs', 'GraphQL'
                    ].map(skill => (
                        <span
                            key={skill}
                            className="px-4 h-8 flex items-center rounded-xl bg-[#e7edf3] text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-[22px] font-bold tracking-tight pt-5 pb-3 px-4">{title}</h2>
);

const ExperienceItem: React.FC<{ role: string; duration: string }> = ({ role, duration }) => (
    <div className="flex items-center justify-between bg-slate-50 px-4 py-2 min-h-[72px]">
        <div className="flex items-center gap-4">
            <div className="size-12 bg-[#e7edf3] flex items-center justify-center rounded-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                >
                    <path d="M216,56H176V48a24..." />
                </svg>
            </div>
            <div>
                <p className="text-base font-medium leading-normal line-clamp-1">{role}</p>
                <p className="text-[#4e7397] text-sm leading-normal line-clamp-2">{duration}</p>
            </div>
        </div>
        <button className="text-base font-medium">Details</button>
    </div>
);

const EducationItem: React.FC<{ degree: string; year: string }> = ({ degree, year }) => (
    <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 min-h-[72px]">
        <div className="size-12 bg-[#e7edf3] flex items-center justify-center rounded-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M251.76,88.94l-120-64..." />
            </svg>
        </div>
        <div>
            <p className="text-base font-medium leading-normal line-clamp-1">{degree}</p>
            <p className="text-[#4e7397] text-sm leading-normal line-clamp-2">{year}</p>
        </div>
    </div>
);

export default About;
