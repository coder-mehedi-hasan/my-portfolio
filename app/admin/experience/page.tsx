'use client';
import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

type Experience = {
  id: number;
  designation: string;
  company_name: string;
  location: string;
  description?: string;
  icon?: string;
  is_home_page: boolean;
};

const defaultForm: Omit<Experience, 'id'> = {
  designation: '',
  company_name: '',
  location: '',
  description: '',
  icon: '',
  is_home_page: false,
};

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchAll = async () => {
    const res = await fetch('/api/experience');
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    const url = editingId ? `/api/experience/${editingId}` : '/api/experience';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) return alert('Error saving');
    setModalOpen(false);
    setEditingId(null);
    setForm(defaultForm);
    fetchAll();
    alert(editingId ? 'Updated' : 'Created successfully');
  };

  const handleEdit = (item: Experience) => {
    const { id, ...rest } = item;
    setForm(rest);
    setEditingId(id);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(i => i.id !== id));
    alert('Deleted');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experience Management</h1>
        <button
          onClick={() => { setForm(defaultForm); setEditingId(null); setModalOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Experience
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setModalOpen(false); setEditingId(null); setForm(defaultForm); }}
        title={editingId ? 'Edit Experience' : 'Add New Experience'}
      >
        <div className="space-y-4">
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            placeholder="Company"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="Icon class (optional)"
            className="w-full px-3 py-2 border rounded-md"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_home_page"
              checked={form.is_home_page}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Show on Home Page</span>
          </label>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {editingId ? 'Update Experience' : 'Create Experience'}
          </button>
        </div>
      </Modal>

      <h2 className="text-2xl font-semibold mb-4">Experience List</h2>
      <div className="space-y-4">
        {items.length === 0 && (
          <p className="text-center text-gray-500 italic">No experience entries.</p>
        )}
        {items.map(item => (
          <div key={item.id} className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{item.designation} @ {item.company_name}</h3>
                <p className="text-sm text-gray-500">{item.location}</p>
                {item.is_home_page && <span className="text-xs text-green-700">• Featured</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-yellow-400 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
