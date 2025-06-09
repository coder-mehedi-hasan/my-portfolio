import React from 'react';

const TestimonialsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-[#0e141b] font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="w-full rounded-xl overflow-hidden mb-6 ">
                    <img
                        src="/testimonial-banner.png"
                        alt="Testimonial Logo"
                        className=""
                    />
                </div>
                <h2 className="text-2xl font-bold px-4">My work</h2>
                <h3 className="text-lg font-semibold px-4 pt-1 pb-6">Testimonials</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="border rounded-xl bg-white p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="text-sm">
                                    <p className="font-medium text-[#0e141b]">{t.name}</p>
                                    <p className="text-[#4e7397]">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-sm text-[#0e141b]">"{t.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const testimonials = [
    {
        name: 'John',
        role: 'CTO @ Acme',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        text:
            "We worked with Jane to build a new e-commerce platform. She was a key part of the team, helping us design the system architecture and leading the development of the front-end. She's a fantastic problem-solver and always delivers high-quality code.",
    },
    {
        name: 'Sarah',
        role: 'Founder @ Bloom',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        text:
            "Jane is an exceptional developer, she built a beautiful website for my business from scratch. She's a great communicator and always keeps me updated on progress. I highly recommend her to anyone looking for a skilled and reliable developer.",
    },
];

export default TestimonialsPage;
