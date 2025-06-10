'use client';

import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

type Project = {
  id: number;
  title: string;
  sub_title?: string;
  description?: string;
  icon?: string;
  is_home_page: boolean;
  date?: string; // ISO format
  sort_index?: number;
};

const defaultForm: Omit<Project, 'id'> = {
  title: '',
  sub_title: '',
  description: '',
  icon: '',
  is_home_page: false,
  date: new Date().toISOString(),
  sort_index: 0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Omit<Project, 'id'>>(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProjects(data);
    } catch (error: any) {
      console.log(error.message || 'Unknown Error');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //@ts-ignore
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'sort_index'
            ? parseInt(value) || 0
            : value,
    }));
  };

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
    if (form.date) {
      form.date = new Date(form.date).toISOString();
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to save project');

      alert(editingId ? 'Project updated' : 'Project created');

      setForm(defaultForm);
      setEditingId(null);
      setIsModalOpen(false);
      fetchProjects();
    } catch (error: any) {
      alert(error.message || 'Save failed');
    }
  };

  const handleEdit = (project: Project) => {
    const { id, ...formFields } = project;
    if (project.date) {
      project.date = new Date(project.date).toISOString().split('T')[0];
    }

    setForm({
      ...formFields,
      sort_index: formFields.sort_index ?? 0,
    });
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setProjects((prev) => prev.filter((proj) => proj.id !== id));
      alert('Project deleted successfully');
    } catch (error: any) {
      alert(error.message ?? 'Delete failed!');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <button
          onClick={() => {
            setForm(defaultForm);
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Project
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setForm(defaultForm);
          setEditingId(null);
        }}
        title={editingId ? 'Edit Project' : 'Add New Project'}
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
              placeholder="Enter project title"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              name="sub_title"
              value={form.sub_title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Description of the project"
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
              placeholder="e.g. project-icon or class name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sort Index</label>
            <input
              type="number"
              name="sort_index"
              value={form.sort_index ?? 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_home_page"
              checked={form.is_home_page}
              onChange={handleChange}
              className="h-4 w-4"
              id="is_home_page"
            />
            <label htmlFor="is_home_page" className="text-sm">
              Show on Home Page
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {editingId ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </Modal>

      <h2 className="text-2xl font-semibold mb-4">Project List</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                {project.sub_title && (
                  <p className="text-sm text-gray-500">{project.sub_title}</p>
                )}
                {project.description && (
                  <p className="text-sm mt-1 text-gray-600">{project.description}</p>
                )}
                {project.is_home_page && (
                  <span className="text-xs text-green-700 font-medium block">
                    • Show on homepage
                  </span>
                )}
                {project.date && (
                  <p className="text-xs text-gray-400">
                    Date: {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                )}
                {project.sort_index !== undefined && (
                  <p className="text-xs text-gray-400">Sort Index: {project.sort_index}</p>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-gray-500 italic">No projects available.</p>
        )}
      </div>
    </div>
  );
}
