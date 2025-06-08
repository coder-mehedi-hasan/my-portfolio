'use client';

import React, { useEffect, useState } from 'react';

type Skill = {
    id: number;
    title: string;
    sub_title?: string;
    description?: string;
    icon?: string;
    is_home_page: boolean;
};

const defaultForm: Omit<Skill, 'id'> = {
    title: '',
    sub_title: '',
    description: '',
    icon: '',
    is_home_page: false,
};

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [form, setForm] = useState<Omit<Skill, 'id'>>(defaultForm);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Load skills
    useEffect(() => {
        fetch('/api/skills')
            .then(res => res.json())
            .then(data => setSkills(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async () => {
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/skills/${editingId}` : `/api/skills`;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            alert('Error saving skill');
            return;
        }

        setForm(defaultForm);
        setEditingId(null);
        const updated = await res.json();

        if (editingId) {
            setSkills(prev =>
                prev.map(skill => (skill.id === updated.id ? updated : skill))
            );
        } else {
            setSkills(prev => [...prev, updated]);
        }
    };

    const handleEdit = (skill: Skill) => {
        setForm({ ...skill });
        setEditingId(skill.id);
    };

    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setSkills(prev => prev.filter(skill => skill.id !== id));
        } else {
            alert('Failed to delete skill');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Skill' : 'Add New Skill'}</h1>

            <div className="space-y-4 mb-6">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="sub_title"
                    placeholder="Subtitle"
                    value={form.sub_title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                />
                <input
                    type="text"
                    name="icon"
                    placeholder="Icon"
                    value={form.icon}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="is_home_page"
                        checked={form.is_home_page}
                        onChange={handleChange}
                    />
                    Show on Home Page
                </label>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    {editingId ? 'Update Skill' : 'Create Skill'}
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-2">Skill List</h2>
            <div className="grid gap-3">
                {skills.map(skill => (
                    <div key={skill.id} className="border p-4 rounded shadow-sm">
                        <div className="font-bold">{skill.title}</div>
                        {skill.sub_title && <div className="text-sm text-gray-600">{skill.sub_title}</div>}
                        <div className="text-sm">{skill.description}</div>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => handleEdit(skill)} className="btn btn-sm btn-warning">Edit</button>
                            <button onClick={() => handleDelete(skill.id)} className="btn btn-sm btn-error">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
