import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, FolderKanban, Check, Eye } from 'lucide-react';
import api from '../../utils/api';
import { fallbackProjects } from '../Portfolio';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State variables
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    image: '',
    githubUrl: '',
    liveUrl: '',
    featuresText: '', // Input separated by newlines
    techStackText: '', // Input separated by commas
    featured: false,
  });

  const [formError, setFormError] = useState('');
  const [formSaving, setFormSaving] = useState(false);

  // Fetch projects on mount
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.log('Using local offline projects mock list for admin...');
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Open modal for inserting
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormError('');
    setFormData({
      title: '',
      description: '',
      category: 'Full Stack',
      image: '',
      githubUrl: '',
      liveUrl: '',
      featuresText: '',
      techStackText: '',
      featured: false,
    });
    setModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (proj) => {
    setEditingId(proj._id);
    setFormError('');
    setFormData({
      title: proj.title,
      description: proj.description,
      category: proj.category,
      image: proj.image,
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featuresText: proj.features ? proj.features.join('\n') : '',
      techStackText: proj.techStack ? proj.techStack.join(', ') : '',
      featured: !!proj.featured,
    });
    setModalOpen(true);
  };

  // Handle inputs changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSaving(true);

    // Convert text inputs to array collections
    const features = formData.featuresText
      .split('\n')
      .map(x => x.trim())
      .filter(x => x.length > 0);

    const techStack = formData.techStackText
      .split(',')
      .map(x => x.trim())
      .filter(x => x.length > 0);

    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      features,
      techStack,
      featured: formData.featured,
    };

    try {
      if (editingId) {
        // PUT Update project
        const res = await api.put(`/projects/${editingId}`, payload);
        if (res.data.success) {
          setModalOpen(false);
          fetchProjects();
        }
      } else {
        // POST Create new project
        const res = await api.post('/projects', payload);
        if (res.data.success) {
          setModalOpen(false);
          fetchProjects();
        }
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errorMsg = errors ? errors.map(e => e.message).join(', ') : (err.response?.data?.message || err.message || 'Error occurred');
      setFormError(`Failed to save: ${errorMsg}`);
    } finally {
      setFormSaving(false);
    }
  };

  // Delete Project Operation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this project from your portfolio?')) return;
    
    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.data.success) {
        fetchProjects();
      }
    } catch (err) {
      alert(`Deletion failure: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Project Portfolio CMS</h2>
          <p className="text-sm text-slate-500 mt-1">
            Display, insert, update, or remove candidate projects.
          </p>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 shadow shadow-primary-500/25 transition-all duration-200"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Grid listing */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj._id} className="glass-card rounded-2xl overflow-hidden border border-slate-200/40 dark:border-dark-cardBorder/40 flex flex-col shadow-xs">
              <div className="h-44 overflow-hidden relative bg-slate-100 dark:bg-dark-bg">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="px-2.5 py-0.5 bg-slate-900/80 text-white backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 bg-amber-500/95 text-slate-950 rounded text-[10px] font-bold uppercase tracking-wider flex items-center">
                      <Check className="h-3 w-3 mr-0.5" /> Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow text-left">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1">{proj.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{proj.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-4 mb-6">
                  {proj.techStack.map(tag => (
                    <span key={tag} className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-500 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-dark-cardBorder/35 flex justify-end space-x-2">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-dark-bg/60 hover:text-primary-500 rounded-xl transition-all"
                    title="Edit Details"
                  >
                    <Edit2 className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all"
                    title="Delete Project"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Form Overlay Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs" onClick={() => setModalOpen(false)}>
          <div className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-dark-cardBorder/50 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-cardBorder/40 flex justify-between items-center bg-slate-50/50 dark:bg-dark-bg/25">
              <h3 className="font-bold text-lg flex items-center">
                <FolderKanban className="h-5.5 w-5.5 text-primary-500 mr-2" />
                <span>{editingId ? 'Edit Project Details' : 'Add New Portfolio Project'}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-200/50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh] flex flex-col space-y-4 text-left">
              {formError && (
                <div className="p-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl text-sm font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Title</label>
                  <input
                    type="text"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="NexusCRM - Client Portal"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="CRM">CRM</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="API-based">API-based</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scope Description</label>
                <textarea
                  rows="3"
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Summarize the core purpose and utility of this project..."
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Image Path or URL</label>
                <input
                  type="text"
                  required
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Source Code URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Prototype URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://demo.vercel.app..."
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Technical Specifications (One feature bullet per line)
                </label>
                <textarea
                  rows="3"
                  name="featuresText"
                  value={formData.featuresText}
                  onChange={handleChange}
                  placeholder="Interactive kanban board for sales pipeline tracking&#10;Advanced client record filtering and bulk logs"
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tech Stack (Tags separated by commas)
                </label>
                <input
                  type="text"
                  required
                  name="techStackText"
                  value={formData.techStackText}
                  onChange={handleChange}
                  placeholder="React.js, Node.js, Express.js, MongoDB, Tailwind CSS"
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 py-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded"
                />
                <label htmlFor="featured" className="text-sm font-semibold select-none cursor-pointer">
                  Feature this project prominently on portfolio page
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-dark-cardBorder/40 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-dark-cardBorder/50 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-dark-bg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 shadow-md shadow-primary-500/10"
                >
                  {formSaving && <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>}
                  <span>Save Project Specifications</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
