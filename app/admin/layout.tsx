"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('admin-auth');
        if (token !== 'valid') {
            router.replace('/admin/login');
        }
        setPending(false);
    }, []);

    if (pending) return "Loading>>>>";

    return (
        <>{children}</>
    )
}
