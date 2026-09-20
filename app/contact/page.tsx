'use client';

import React, { FormEvent, useState } from 'react';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:contact@mehedih.com?subject=${subject}&body=${body}`;
        setStatus('success');
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] text-[#111211] font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <SectionTitle
                    title="Get in touch"
                    description="I'm currently available for freelance work and new opportunities. Feel free to reach out via the contact form or any of the methods below."
                />

                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-white hover:text-black border border-black transition"
                    >
                        Submit
                    </button>

                    {status === 'success' && (
                        <p className="text-green-600 text-center">Your email draft is ready to review and send.</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-600 text-center">Something went wrong. Please try again.</p>
                    )}
                </form>

                <div className="text-center text-sm text-[#4e7397] mt-6 space-y-2">
                    <p>or</p>
                    <p>
                        <a href="mailto:contact@mehedih.com" className="text-blue-600 hover:underline">
                            email me directly at contact@mehedih.com
                        </a>
                    </p>
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

export default Contact;
