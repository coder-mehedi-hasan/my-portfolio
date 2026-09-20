import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Testimonials',
    description:
        'Client testimonials and reviews about the work of Md Mehedi Hasan, a full-stack developer.',
    alternates: {
        canonical: '/testimonials',
    },
};

const TestimonialsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#fafaf9] text-[#111211] font-body">
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

                <div className="px-4">
                    <div className="border rounded-xl bg-white p-6 text-center">
                        <p className="text-base font-medium text-[#0e141b]">Professional references are available on request.</p>
                        <p className="mt-2 text-sm text-[#4e7397]">I only publish names and feedback with permission. Contact me for a relevant reference.</p>
                        <a href="mailto:contact@mehedih.com" className="mt-4 inline-flex rounded-full bg-[#111211] px-5 py-2 text-sm font-bold text-white">Request a reference</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;
