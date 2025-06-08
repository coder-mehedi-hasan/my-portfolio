'use client';

import React, { FormEvent, useState, useTransition } from 'react';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const payload = { name, email, message }
        console.log(payload);
        setStatus("error");
        return;
        startTransition(async () => {
            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error('Message failed');

                setName('');
                setEmail('');
                setMessage('');
                setStatus('success');
            } catch (error) {
                console.error(error);
                setStatus('error');
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-[#0e141b] font-body">
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
                        disabled={isPending}
                        className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-white hover:text-black border border-black transition disabled:opacity-50"
                    >
                        {isPending ? 'Sending...' : 'Submit'}
                    </button>

                    {status === 'success' && (
                        <p className="text-green-600 text-center">Message sent successfully!</p>
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
                    <p>
                        <a href="#" className="text-blue-600 hover:underline">
                            join my newsletter for updates on my work
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
