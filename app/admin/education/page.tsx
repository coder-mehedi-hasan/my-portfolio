'use client';
import Modal from '@/components/Modal';
import React, { useState, useEffect } from 'react';

type Education = {
  id: number;
  name: string;
  institute_name: string;
  start_date?: string;
  end_date?: string;
  institute_address?: string;
};

const defaultForm: Omit<Education, 'id'> = {
  name: '',
  institute_name: '',
  start_date: '',
  end_date: '',
  institute_address: '',
};

export default function AdminEducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const fetchAll = async () => {
    const res = await fetch('/api/education');
    setItems(await res.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async () => {
    const url = editingId ? `/api/education/${editingId}` : '/api/education';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (!res.ok) return alert('Error saving');
    setOpen(false); setEditingId(null); setForm(defaultForm); fetchAll();
    alert(editingId ? 'Updated' : 'Created');
  };

  const handleEdit = (item: Education) => {
    const { id, ...rest } = item;
    setForm(rest); setEditingId(id); setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/education/${id}`, { method: 'DELETE' });
    setItems(i => i.filter(it => it.id !== id));
    alert('Deleted');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Education</h1>
        <button onClick={() => { setForm(defaultForm); setEditingId(null); setOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New</button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={editingId ? 'Edit Education' : 'Add Education'}>
        <div className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Degree/Name" className="w-full px-3 py-2 border rounded" />
          <input name="institute_name" value={form.institute_name} onChange={handleChange} placeholder="Institute" className="w-full px-3 py-2 border rounded" />
          <input name="start_date" value={form.start_date} onChange={handleChange} placeholder="Start Date" className="w-full px-3 py-2 border rounded" />
          <input name="end_date" value={form.end_date} onChange={handleChange} placeholder="End Date" className="w-full px-3 py-2 border rounded" />
          <input name="institute_address" value={form.institute_address} onChange={handleChange} placeholder="Address" className="w-full px-3 py-2 border rounded" />
          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {editingId ? 'Update' : 'Create'}
          </button>
        </div>
      </Modal>

      <div className="space-y-4">
        {items.length === 0 && <p className="text-center text-gray-500 italic">No education entries.</p>}
        {items.map(item => (
          <div key={item.id} className="border rounded p-4 flex justify-between items-center shadow-sm">
            <div>
              <div className="font-bold">{item.name} at {item.institute_name}</div>
              <div className="text-sm">{item.start_date} – {item.end_date || 'Present'}</div>
              {item.institute_address && <div className="text-sm">{item.institute_address}</div>}
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
