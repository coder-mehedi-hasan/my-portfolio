'use client';
import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

type Resume = {
    id: number;
    url?: string;
    is_active: boolean;
};

const defaultForm: Omit<Resume, 'id'> = {
    url: '',
    is_active: false,
};

export default function AdminResumePage() {
    const [items, setItems] = useState<Resume[]>([]);
    const [form, setForm] = useState(defaultForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    const fetchAll = async () => {
        const res = await fetch('/api/resume');
        setItems(await res.json());
    };

    useEffect(() => { fetchAll(); }, []);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async () => {
        const url = editingId ? `/api/resume/${editingId}` : '/api/resume';
        const method = editingId ? 'PUT' : 'POST';
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        if (!res.ok) return alert('Error saving');
        setOpen(false); setEditingId(null); setForm(defaultForm); fetchAll();
        alert(editingId ? 'Updated' : 'Created');
    };

    const handleEdit = (item: Resume) => {
        const { id, url, is_active } = item;
        setForm({ url: url ?? '', is_active });
        setEditingId(id); setOpen(true);
    };

    const handleDelete = async (id: number) => {
        await fetch(`/api/resume/${id}`, { method: 'DELETE' });
        setItems(i => i.filter(it => it.id !== id));
        alert('Deleted');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Resume Files</h1>
                <button onClick={() => { setForm(defaultForm); setEditingId(null); setOpen(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded">Add New</button>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)} title={editingId ? 'Edit Resume' : 'Add Resume'}>
                <div className="space-y-4">
                    <input name="url" value={form.url} onChange={handleChange} placeholder="PDF URL" className="w-full px-3 py-2 border rounded" />
                    <label className="flex items-center">
                        <input name="is_active" checked={form.is_active} onChange={handleChange} type="checkbox" className="mr-2" />
                        Is Active?
                    </label>
                    <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        {editingId ? 'Update' : 'Create'}
                    </button>
                </div>
            </Modal>

            <div className="space-y-4">
                {items.length === 0 && <p className="text-center text-gray-500 italic">No resume entries.</p>}
                {items.map(item => (
                    <div key={item.id} className="border rounded p-4 flex justify-between items-center shadow-sm">
                        <div>
                            {item.url ? <a href={item.url} target="_blank" className="text-blue-600">{item.url}</a> : <span className="italic">No URL</span>}
                            {item.is_active && <span className="text-xs text-green-700 ml-2">• Active</span>}
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
