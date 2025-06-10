'use client';

import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

type Skill = {
    id: number;
    title: string;
    sub_title?: string;
    description?: string;
    icon?: string;
    is_home_page: boolean;
    sort_index: number;
};

const defaultForm: Omit<Skill, 'id'> = {
    title: '',
    sub_title: '',
    description: '',
    icon: '',
    is_home_page: false,
    sort_index: 0,
};

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [form, setForm] = useState<Omit<Skill, 'id'>>(defaultForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchSkills = async () => {
        try {
            const res = await fetch('/api/skills');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setSkills(data);
        } catch (error: any) {
            console.log(error.message || 'Unknown Error');
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        //@ts-ignore
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    const handleSubmit = async () => {
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/skills/${editingId}` : `/api/skills`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to save skill');

            alert(editingId ? 'Skill updated' : 'Skill created');

            setForm(defaultForm);
            setEditingId(null);
            setIsModalOpen(false);
            fetchSkills();
        } catch (error: any) {
            alert(error.message || 'Save failed');
        }
    };

    const handleEdit = (skill: Skill) => {
        const { id, ...formFields } = skill;
        setForm(formFields);
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');

            setSkills((prev) => prev.filter((skill) => skill.id !== id));
            alert('Skill deleted successfully');
        } catch (error: any) {
            alert(error.message ?? 'Delete failed!');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Skills Management</h1>
                <button
                    onClick={() => {
                        setForm(defaultForm);
                        setEditingId(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add New Skill
                </button>
            </div>

            {/* Modal for Form */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setForm(defaultForm);
                    setEditingId(null);
                }}
                title={editingId ? 'Edit Skill' : 'Add New Skill'}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter skill title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Subtitle</label>
                        <input
                            type="text"
                            name="sub_title"
                            value={form.sub_title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Description of the skill"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Icon</label>
                        <input
                            type="text"
                            name="icon"
                            value={form.icon}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="e.g. react-icon or class name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Sort Index</label>
                        <input
                            type="number"
                            name="sort_index"
                            value={form.sort_index}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="e.g. 1, 2, 3..."
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="is_home_page"
                            checked={form.is_home_page}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label className="text-sm">Show on Home Page</label>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {editingId ? 'Update Skill' : 'Create Skill'}
                    </button>
                </div>
            </Modal>

            {/* Skill List */}
            <h2 className="text-2xl font-semibold mb-4">Skill List</h2>
            <div className="space-y-4">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow transition"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold">{skill.title}</h3>
                                {skill.sub_title && (
                                    <p className="text-sm text-gray-500">{skill.sub_title}</p>
                                )}
                                {skill.description && (
                                    <p className="text-sm mt-1 text-gray-600">{skill.description}</p>
                                )}
                                <p className="text-xs text-gray-400 mt-1">Sort Index: {skill.sort_index}</p>
                                {skill.is_home_page && (
                                    <span className="text-xs text-green-700 font-medium">
                                        • Shown on homepage
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(skill.id)}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {skills.length === 0 && (
                    <p className="text-center text-gray-500 italic">No skills available.</p>
                )}
            </div>
        </div>
    );
}
