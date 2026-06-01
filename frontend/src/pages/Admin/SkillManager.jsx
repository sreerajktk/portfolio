import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Award, Check } from 'lucide-react';
import api from '../../utils/api';
import { fallbackSkills } from '../Portfolio';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical',
    proficiency: 80,
    icon: 'Cpu',
  });

  const [formError, setFormError] = useState('');
  const [formSaving, setFormSaving] = useState(false);

  // Available Lucide Icon identifiers
  const availableIcons = [
    'Flame', 'Zap', 'Atom', 'Cpu', 'Server', 'Database', 'Globe',
    'Layout', 'HardDrive', 'Link', 'Smartphone', 'Layers', 'Sliders',
    'Megaphone', 'Briefcase', 'MessageSquare', 'Users', 'HelpCircle',
    'UserCheck', 'TrendingUp', 'Clock'
  ];

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await api.get('/skills');
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (err) {
      console.log('Using offline skills list for admin dashboard...');
      setSkills(fallbackSkills);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormError('');
    setFormData({
      name: '',
      category: 'Technical',
      proficiency: 80,
      icon: 'Cpu',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingId(skill._id);
    setFormError('');
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || 'Cpu',
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'proficiency' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSaving(true);

    try {
      if (editingId) {
        const res = await api.put(`/skills/${editingId}`, formData);
        if (res.data.success) {
          setModalOpen(false);
          fetchSkills();
        }
      } else {
        const res = await api.post('/skills', formData);
        if (res.data.success) {
          setModalOpen(false);
          fetchSkills();
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this skill from Sreeraj portfolio?')) return;

    try {
      const res = await api.delete(`/skills/${id}`);
      if (res.data.success) {
        fetchSkills();
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
          <h2 className="text-2xl font-bold tracking-tight">Technical & Soft Skills CMS</h2>
          <p className="text-sm text-slate-500 mt-1">
            Display, add, edit, or remove candidate abilities.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 shadow shadow-primary-500/25 transition-all duration-200"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add New Skill</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* 1. Technical Skills Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-slate-200 dark:border-dark-cardBorder/50 pb-2">
              Technical & Architecture Skills
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skills
                .filter(s => s.category === 'Technical')
                .map((skill) => (
                  <div key={skill._id} className="glass-card p-4 rounded-xl flex items-center justify-between border border-slate-200/40 dark:border-dark-cardBorder/35">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-sm truncate">{skill.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Rating: {skill.proficiency}%</span>
                    </div>

                    <div className="flex items-center space-x-1.5 ml-2 flex-shrink-0">
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-slate-100 dark:hover:bg-dark-bg/60 rounded-lg transition"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* 2. Soft Skills Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-slate-200 dark:border-dark-cardBorder/50 pb-2">
              Collaborative & Soft Skills
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skills
                .filter(s => s.category === 'Soft')
                .map((skill) => (
                  <div key={skill._id} className="glass-card p-4 rounded-xl flex items-center justify-between border border-slate-200/40 dark:border-dark-cardBorder/35">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-sm truncate">{skill.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Category: Soft</span>
                    </div>

                    <div className="flex items-center space-x-1.5 ml-2 flex-shrink-0">
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-slate-100 dark:hover:bg-dark-bg/60 rounded-lg transition"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </div>
      )}

      {/* Dynamic Overlay Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs" onClick={() => setModalOpen(false)}>
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-dark-cardBorder/50 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-cardBorder/40 flex justify-between items-center bg-slate-50/50 dark:bg-dark-bg/25">
              <h3 className="font-bold text-lg flex items-center">
                <Award className="h-5.5 w-5.5 text-primary-500 mr-2" />
                <span>{editingId ? 'Edit Skill parameters' : 'Create New Portfolio Skill'}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-200/50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-4 text-left">
              {formError && (
                <div className="p-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl text-sm font-medium">
                  {formError}
                </div>
              )}

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skill Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g. Redux Toolkit"
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skill Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                >
                  <option value="Technical">Technical</option>
                  <option value="Soft">Soft</option>
                </select>
              </div>

              {formData.category === 'Technical' && (
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Proficiency Level Rating</span>
                    <span className="text-primary-500 font-extrabold">{formData.proficiency}%</span>
                  </div>
                  <input
                    type="range"
                    name="proficiency"
                    min="0"
                    max="100"
                    value={formData.proficiency}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary-500 mt-2"
                  />
                </div>
              )}

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Vector Icon</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm font-medium focus:outline-none"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
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
                  <span>Save Skill Parameters</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillManager;
