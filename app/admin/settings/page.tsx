// app/admin/settings/page.tsx
'use client';
import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

type Setting = {
    id: number;
    key: string;
    value: string;
};

const defaultForm: Omit<Setting, 'id'> = { key: '', value: '' };

export default function AdminSettingsPage() {
    const [items, setItems] = useState<Setting[]>([]);
    const [form, setForm] = useState(defaultForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    const fetchAll = async () => {
        const res = await fetch('/api/settings');
        setItems(await res.json());
    };

    useEffect(() => { fetchAll(); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async () => {
        const url = editingId ? `/api/settings/${editingId}` : '/api/settings';
        const method = editingId ? 'PUT' : 'POST';
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        if (!res.ok) return alert('Error saving');
        setOpen(false); setEditingId(null); setForm(defaultForm); fetchAll();
        alert(editingId ? 'Updated' : 'Created');
    };

    const handleEdit = (item: Setting) => {
        const { id, key, value } = item;
        setForm({ key, value });
        setEditingId(id); setOpen(true);
    };

    const handleDelete = async (id: number) => {
        await fetch(`/api/settings/${id}`, { method: 'DELETE' });
        setItems(i => i.filter(it => it.id !== id));
        alert('Deleted');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <button onClick={() => { setForm(defaultForm); setEditingId(null); setOpen(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New</button>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)} title={editingId ? 'Edit Setting' : 'Add Setting'}>
                <div className="space-y-4">
                    <input name="key" value={form.key} onChange={handleChange} placeholder="Key" className="w-full px-3 py-2 border rounded" required />
                    <textarea name="value" value={form.value} onChange={handleChange} placeholder="Value" className="w-full px-3 py-2 border rounded" required />
                    <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        {editingId ? 'Update' : 'Create'}
                    </button>
                </div>
            </Modal>

            <div className="space-y-4">
                {items.length === 0 && <p className="text-center text-gray-500 italic">No settings found.</p>}
                {items.map(item => (
                    <div key={item.id} className="border rounded p-4 flex justify-between items-center shadow-sm">
                        <div>
                            <strong>{item.key}</strong>: <span>{item.value}</span>
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
