'use client';
import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

type Testimonial = {
    id: number;
    author_name: string;
    author_designation: string;
    author_company_name: string;
    author_image: string;
    feedback?: string;
};

const defaultForm: Omit<Testimonial, 'id'> = {
    author_name: '',
    author_designation: '',
    author_company_name: '',
    author_image: '',
    feedback: '',
};

export default function AdminTestimonialsPage() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [form, setForm] = useState(defaultForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    const fetchAll = async () => {
        const res = await fetch('/api/testimonials');
        setItems(await res.json());
    };

    useEffect(() => { fetchAll(); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async () => {
        const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
        const method = editingId ? 'PUT' : 'POST';
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        if (!res.ok) return alert('Error saving');
        setOpen(false); setEditingId(null); setForm(defaultForm); fetchAll();
        alert(editingId ? 'Updated' : 'Created successfully');
    };

    const handleEdit = (item: Testimonial) => {
        const { id, ...rest } = item;
        setForm(rest); setEditingId(id); setOpen(true);
    };

    const handleDelete = async (id: number) => {
        await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
        setItems(i => i.filter(item => item.id !== id));
        alert('Deleted');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Testimonials</h1>
                <button onClick={() => { setForm(defaultForm); setEditingId(null); setOpen(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New</button>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)} title={editingId ? 'Edit Testimonials' : 'Add New Testimonial'}>
                <div className="space-y-4">
                    <input name="author_name" value={form.author_name} onChange={handleChange} placeholder="Name" className="w-full px-3 py-2 border rounded" />
                    <input name="author_designation" value={form.author_designation} onChange={handleChange} placeholder="Designation" className="w-full px-3 py-2 border rounded" />
                    <input name="author_company_name" value={form.author_company_name} onChange={handleChange} placeholder="Company" className="w-full px-3 py-2 border rounded" />
                    <input name="author_image" value={form.author_image} onChange={handleChange} placeholder="Image URL" className="w-full px-3 py-2 border rounded" />
                    <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Feedback" className="w-full px-3 py-2 border rounded" />
                    <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        {editingId ? 'Update' : 'Create'}
                    </button>
                </div>
            </Modal>

            <div className="space-y-4">
                {items.length === 0 && <p className="text-center text-gray-500 italic">No testimonials added.</p>}
                {items.map(item => (
                    <div key={item.id} className="border rounded p-4 flex justify-between items-center shadow-sm">
                        <div>
                            <div className="font-bold">{item.author_name} — {item.author_designation}</div>
                            <div className="text-sm">{item.author_company_name}</div>
                            {item.feedback && <div className="text-sm mt-1">{item.feedback}</div>}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-yellow-400 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
