"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('admin-auth');
        if (token !== 'valid') {
            router.replace('/login');
        }
        setPending(false);
    }, []);

    if (pending) return <div>Loading...</div>;

    return (

        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <nav className="space-y-2">
                    <Link href="/admin" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Dashboard
                    </Link>
                    <Link href="/admin/skills" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Skills
                    </Link>
                    <Link href="/admin/projects" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Projects
                    </Link>
                    <Link href="/admin/experience" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Experience
                    </Link>
                    <Link href="/admin/testimonials" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Testimonials
                    </Link>
                    <Link href="/admin/blogs" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Blogs
                    </Link>
                    <Link href="/admin/education" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Education
                    </Link>
                    <Link href="/admin/resume" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Resume
                    </Link>
                    <Link href="/admin/settings" className="block hover:bg-gray-700 rounded px-3 py-2">
                        Settings
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-6">{children}</main>
        </div>
        // </MantineProvider>
    );
}
