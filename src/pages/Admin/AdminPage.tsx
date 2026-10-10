import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  fetchProjectsDB, createProjectDB, updateProjectDB, deleteProjectDB,
  fetchTestimonialsDB, createTestimonialDB, updateTestimonialDB, deleteTestimonialDB, TestimonialItem,
  fetchClientLogosDB, createClientLogoDB, updateClientLogoDB, deleteClientLogoDB, ClientLogoItem,
  fetchEnquiriesDB, updateEnquiryStatusDB, deleteEnquiryDB, EnquiryItem,
  fetchCategoriesDB, createCategoryDB, updateCategoryDB, deleteCategoryDB, CategoryItem,
  uploadImage
} from '../../services/adminService';
import { Project } from '../../data/projects';
import {
  FolderKanban, MessageSquareQuote, Image as ImageIcon, Inbox, LogOut, Plus, Trash2, Edit2, X, ShieldCheck, Lock, Mail, RefreshCw, Upload, Layers
} from 'lucide-react';
import './Admin.css';

const STATIC_CATEGORIES = ['Residential', 'Commercial', 'Hospitality', 'Interiors', 'Landscape'];

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active tab state
  const [activeTab, setActiveTab] = useState<'projects' | 'categories' | 'testimonials' | 'logos' | 'enquiries'>('projects');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [logos, setLogos] = useState<ClientLogoItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Modal / Form states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    location: '',
    category: 'Residential',
    year: new Date().getFullYear().toString(),
    area: '',
    status: 'Completed',
    tagline: '',
    description: '',
    coverImage: '',
    gallery: []
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Category Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryForm, setCategoryForm] = useState<Partial<CategoryItem>>({
    name: '', slug: '', description: ''
  });

  // Testimonial Modal
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<TestimonialItem>>({
    name: '', role: '', location: '', quote: '', avatar: ''
  });

  // Client Logo Modal
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<ClientLogoItem | null>(null);
  const [logoForm, setLogoForm] = useState<Partial<ClientLogoItem>>({
    name: '', logo_url: ''
  });

  // Check auth status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch data when authenticated & tab changes
  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session, activeTab]);

  const loadData = async () => {
    setDataLoading(true);
    if (activeTab === 'projects') {
      const [projRes, catRes] = await Promise.all([fetchProjectsDB(), fetchCategoriesDB()]);
      setProjects(projRes);
      setCategories(catRes);
    } else if (activeTab === 'categories') {
      const res = await fetchCategoriesDB();
      setCategories(res);
    } else if (activeTab === 'testimonials') {
      const res = await fetchTestimonialsDB();
      setTestimonials(res);
    } else if (activeTab === 'logos') {
      const res = await fetchClientLogosDB();
      setLogos(res);
    } else if (activeTab === 'enquiries') {
      const res = await fetchEnquiriesDB();
      setEnquiries(res);
    }
    setDataLoading(false);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(error.message);
    }
    setLoading(false);
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // PROJECT HANDLERS
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.location || !projectForm.category) {
      alert('Please fill in required fields (Title, Location, Category)');
      return;
    }

    const payload = {
      ...projectForm,
      coverImage: projectForm.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200',
      heroImage: projectForm.heroImage || projectForm.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200'
    };

    let result;
    if (editingProject) {
      result = await updateProjectDB(editingProject.id, payload);
    } else {
      result = await createProjectDB(payload as Omit<Project, 'id'>);
    }

    if (!result.success) {
      alert(`Supabase Error: ${result.error || 'Failed to save project'}`);
    } else {
      setIsProjectModalOpen(false);
      setEditingProject(null);
      loadData();
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProjectDB(id);
      loadData();
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    if (isGallery) {
      const newUrls: string[] = [...(projectForm.gallery || [])];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i], 'projects');
        if (url) newUrls.push(url);
      }
      setProjectForm(prev => ({ ...prev, gallery: newUrls }));
    } else {
      const url = await uploadImage(files[0], 'projects');
      if (url) {
        setProjectForm(prev => ({ ...prev, coverImage: url, heroImage: url }));
      }
    }
    setUploadingImage(false);
  };

  // CATEGORY HANDLERS
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name?.trim()) {
      alert('Category name is required');
      return;
    }
    const slug = categoryForm.slug?.trim() ||
      categoryForm.name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const payload = { name: categoryForm.name.trim(), slug, description: categoryForm.description?.trim() || '' };

    try {
      if (editingCategory) {
        await updateCategoryDB(editingCategory.id, payload);
      } else {
        await createCategoryDB(payload as Omit<CategoryItem, 'id'>);
      }
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      loadData();
    } catch (err) {
      alert('Failed to save category. Please try again.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Delete this category? Projects using it won\'t be affected.')) {
      await deleteCategoryDB(id);
      loadData();
    }
  };

  // TESTIMONIAL HANDLERS
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.quote) {
      alert('Please fill in Name and Quote');
      return;
    }
    if (editingTestimonial) {
      await updateTestimonialDB(editingTestimonial.id, testimonialForm);
    } else {
      await createTestimonialDB(testimonialForm as Omit<TestimonialItem, 'id'>);
    }
    setIsTestimonialModalOpen(false);
    setEditingTestimonial(null);
    loadData();
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm('Delete this testimonial?')) {
      await deleteTestimonialDB(id);
      loadData();
    }
  };

  // LOGO HANDLERS
  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoForm.logo_url) {
      alert('Please upload a logo image');
      return;
    }
    const finalLogo = {
      name: logoForm.name?.trim() || 'Client Logo',
      logo_url: logoForm.logo_url
    };
    if (editingLogo) {
      await updateClientLogoDB(editingLogo.id, finalLogo);
    } else {
      await createClientLogoDB(finalLogo as Omit<ClientLogoItem, 'id'>);
    }
    setIsLogoModalOpen(false);
    setEditingLogo(null);
    loadData();
  };

  const handleDeleteLogo = async (id: string) => {
    if (confirm('Delete client logo?')) {
      await deleteClientLogoDB(id);
      loadData();
    }
  };

  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!session && !loading) {
    return (
      <div className="ios-admin-login-wrap">
        <div className="ios-login-card">
          <div className="ios-login-header">
            <div className="ios-badge">
              <ShieldCheck size={28} className="ios-icon-blue" />
            </div>
            <h2>TechPlus Admin</h2>
            <p>Sign in to manage portfolio, clients & enquiries</p>
          </div>

          <form onSubmit={handleLogin} className="ios-form">
            {loginError && <div className="ios-error">{loginError}</div>}
            <div className="ios-input-group">
              <label><Mail size={16} /> Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@techplus.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="ios-input-group">
              <label><Lock size={16} /> Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="ios-btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-admin-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className="ios-sidebar">
        <div className="ios-brand">
          <div className="ios-logo-dot"></div>
          <div>
            <h2>Techno+</h2>
            <span style={{ fontSize: '11px', color: '#8E8E93', display: 'block', marginTop: '1px' }}>Studio CMS</span>
          </div>
        </div>

        <nav className="ios-nav">
          <button
            className={`ios-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderKanban size={18} />
            <span>Portfolio Projects</span>
          </button>
          <button
            className={`ios-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Layers size={18} />
            <span>Categories</span>
            <span className="ios-pill" style={{ background: '#3a3a3c' }}>{categories.length}</span>
          </button>
          <button
            className={`ios-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <MessageSquareQuote size={18} />
            <span>Testimonials</span>
          </button>
          <button
            className={`ios-nav-item ${activeTab === 'logos' ? 'active' : ''}`}
            onClick={() => setActiveTab('logos')}
          >
            <ImageIcon size={18} />
            <span>Client Logos</span>
          </button>
          <button
            className={`ios-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <Inbox size={18} />
            <span>Contact Enquiries</span>
            {enquiries.filter(e => e.status === 'unread').length > 0 && (
              <span className="ios-pill">{enquiries.filter(e => e.status === 'unread').length}</span>
            )}
          </button>
        </nav>

        <div className="ios-sidebar-footer">
          <button onClick={handleLogout} className="ios-btn-ghost">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ios-content">
        <header className="ios-header">
          <div>
            <h1>
              {activeTab === 'projects' && 'Portfolio & Projects'}
              {activeTab === 'categories' && 'Project Categories'}
              {activeTab === 'testimonials' && 'Client Testimonials'}
              {activeTab === 'logos' && 'Client Logos'}
              {activeTab === 'enquiries' && 'Contact Enquiries'}
            </h1>
            <p>Manage website content effortlessly</p>
          </div>

          <div className="ios-actions">
            <button onClick={loadData} className="ios-btn-secondary" title="Refresh">
              <RefreshCw size={16} className={dataLoading ? 'spin' : ''} />
            </button>
            {activeTab === 'projects' && (
              <button onClick={() => {
                setEditingProject(null);
                setProjectForm({
                  title: '', location: '', category: 'Residential', year: new Date().getFullYear().toString(),
                  area: '', status: 'Completed', tagline: '', description: '', coverImage: '', gallery: []
                });
                setIsProjectModalOpen(true);
              }} className="ios-btn-primary">
                <Plus size={16} /> Add Project
              </button>
            )}
            {activeTab === 'categories' && (
              <button onClick={() => {
                setEditingCategory(null);
                setCategoryForm({ name: '', slug: '', description: '' });
                setIsCategoryModalOpen(true);
              }} className="ios-btn-primary">
                <Plus size={16} /> Add Category
              </button>
            )}
            {activeTab === 'testimonials' && (
              <button onClick={() => {
                setEditingTestimonial(null);
                setTestimonialForm({ name: '', role: '', location: '', quote: '', avatar: '' });
                setIsTestimonialModalOpen(true);
              }} className="ios-btn-primary">
                <Plus size={16} /> Add Testimonial
              </button>
            )}
            {activeTab === 'logos' && (
              <button onClick={() => {
                setEditingLogo(null);
                setLogoForm({ name: '', logo_url: '' });
                setIsLogoModalOpen(true);
              }} className="ios-btn-primary">
                <Plus size={16} /> Add Client Logo
              </button>
            )}
          </div>
        </header>

        {/* TAB 1: PROJECTS */}
        {/* TAB: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="ios-list">
            {categories.length === 0 ? (
              <div className="ios-empty">No categories yet. Click "Add Category" to create one.</div>
            ) : (
              categories.map(cat => (
                <div key={cat.id} className="ios-list-item">
                  <div className="ios-avatar" style={{ background: 'linear-gradient(135deg,#1a1a1a,#333)', color: '#fff', fontWeight: 700, fontSize: 16 }}>
                    <Layers size={18} />
                  </div>
                  <div className="ios-list-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: 0 }}>{cat.name}</h4>
                      <span style={{ fontSize: 11, background: '#f0f0f0', color: '#555', borderRadius: 4, padding: '2px 8px', fontFamily: 'monospace' }}>/{cat.slug}</span>
                    </div>
                    {cat.description && (
                      <p style={{ marginTop: 4, fontSize: 13, color: '#666', lineHeight: 1.5 }}>{cat.description}</p>
                    )}
                  </div>
                  <div className="ios-list-actions">
                    <button onClick={() => {
                      setEditingCategory(cat);
                      setCategoryForm({ name: cat.name, slug: cat.slug, description: cat.description });
                      setIsCategoryModalOpen(true);
                    }} className="ios-btn-icon"><Edit2 size={15} /></button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="ios-btn-icon text-red"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="ios-grid">
            {projects.length === 0 ? (
              <div className="ios-empty">No projects added yet. Click "Add Project" to create one.</div>
            ) : (
              projects.map(proj => (
                <div key={proj.id} className="ios-card">
                  <div className="ios-card-img-wrap">
                    <img src={proj.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600'} alt={proj.title} />
                    <span className="ios-category-tag">{proj.category}</span>
                  </div>
                  <div className="ios-card-body">
                    <h3>{proj.title}</h3>
                    <p className="ios-sub">{proj.location} • {proj.year}</p>
                    <p className="ios-desc">{proj.tagline || proj.description.slice(0, 80)}...</p>
                  </div>
                  <div className="ios-card-footer">
                    <button onClick={() => {
                      setEditingProject(proj);
                      setProjectForm(proj);
                      setIsProjectModalOpen(true);
                    }} className="ios-btn-icon"><Edit2 size={15} /></button>
                    <button onClick={() => handleDeleteProject(proj.id)} className="ios-btn-icon text-red"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="ios-list">
            {testimonials.length === 0 ? (
              <div className="ios-empty">No testimonials added yet.</div>
            ) : (
              testimonials.map(item => (
                <div key={item.id} className="ios-list-item">
                  <div className="ios-avatar" style={{ background: '#1a1a18', color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>
                    {item.name.charAt(0)}
                  </div>
                  <div className="ios-list-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: 0 }}>{item.name}</h4>
                      <span className="ios-sub" style={{ fontSize: '12px', color: '#888' }}>({item.role || item.location || 'Google Review'})</span>
                      <span style={{ color: '#F4B400', fontSize: '13px', letterSpacing: '1px' }}>★★★★★</span>
                    </div>
                    <p style={{ marginTop: '4px', fontSize: '13px', lineHeight: 1.5, color: '#444' }}>"{item.quote}"</p>
                  </div>
                  <div className="ios-list-actions">
                    <button onClick={() => {
                      setEditingTestimonial(item);
                      setTestimonialForm(item);
                      setIsTestimonialModalOpen(true);
                    }} className="ios-btn-icon"><Edit2 size={15} /></button>
                    <button onClick={() => handleDeleteTestimonial(item.id)} className="ios-btn-icon text-red"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: CLIENT LOGOS */}
        {activeTab === 'logos' && (
          <div className="ios-grid-logos">
            {logos.length === 0 ? (
              <div className="ios-empty">No client logos added.</div>
            ) : (
              logos.map(logo => (
                <div key={logo.id} className="ios-logo-card">
                  <img src={logo.logo_url} alt={logo.name} />
                  <p>{logo.name}</p>
                  <div className="ios-logo-actions">
                    <button onClick={() => handleDeleteLogo(logo.id)} className="ios-btn-icon text-red"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="ios-list">
            {enquiries.length === 0 ? (
              <div className="ios-empty">No contact enquiries received yet.</div>
            ) : (
              enquiries.map(enq => (
                <div key={enq.id} className={`ios-list-item enquiry-card ${enq.status}`}>
                  <div className="ios-list-content">
                    <div className="ios-enq-header">
                      <h4>{enq.name} <span className="ios-sub">&lt;{enq.email}&gt;</span></h4>
                      <span className="ios-date">{new Date(enq.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="ios-enq-meta">
                      <strong>Phone:</strong> {enq.phone || 'N/A'} | <strong>Type:</strong> {enq.projectType || 'General'} | <strong>Location:</strong> {enq.location || 'N/A'}
                    </p>
                    <p className="ios-enq-msg">{enq.message}</p>
                  </div>
                  <div className="ios-list-actions">
                    <button onClick={async () => {
                      await updateEnquiryStatusDB(enq.id, enq.status === 'unread' ? 'read' : 'unread');
                      loadData();
                    }} className="ios-btn-secondary">
                      {enq.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                    </button>
                    <button onClick={async () => {
                      if (confirm('Delete enquiry?')) {
                        await deleteEnquiryDB(enq.id);
                        loadData();
                      }
                    }} className="ios-btn-icon text-red"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* PROJECT MODAL */}
      {isProjectModalOpen && (
        <div className="ios-modal-overlay">
          <div className="ios-modal studio-project-modal">
            <div className="ios-modal-header">
              <h2>{editingProject ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setIsProjectModalOpen(false)} className="ios-btn-icon"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveProject} className="ios-modal-form">
              <div className="studio-form-grid">
                {/* Main Form Fields */}
                <div className="studio-main-fields">
                  <div className="ios-input-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title || ''}
                      onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="Project Title"
                      className="studio-title-input"
                    />
                  </div>

                  <div className="ios-form-row">
                    <div className="ios-input-group">
                      <label>Location (City, Country) *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.location || ''}
                        onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                        placeholder="e.g. Kochi, India"
                      />
                    </div>
                    <div className="ios-input-group">
                      <label>Year</label>
                      <input
                        type="text"
                        value={projectForm.year || ''}
                        onChange={e => setProjectForm({ ...projectForm, year: e.target.value })}
                        placeholder="YYYY"
                      />
                    </div>
                  </div>

                  <div className="ios-input-group">
                    <label>Tagline</label>
                    <input
                      type="text"
                      value={projectForm.tagline || ''}
                      onChange={e => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      placeholder="Short summary or concept tagline"
                    />
                  </div>

                  <div className="ios-input-group">
                    <label>Description</label>
                    <textarea
                      rows={4}
                      value={projectForm.description || ''}
                      onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Describe the architectural concept..."
                    ></textarea>
                  </div>
                </div>

                {/* Sidebar Controls */}
                <div className="studio-sidebar-fields">
                  <div className="studio-field-card">
                    <div className="ios-input-group">
                      <label>Category *</label>
                      <select
                        value={projectForm.category || 'Residential'}
                        onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                      >
                        {(categories.length > 0 ? categories.map(c => c.name) : STATIC_CATEGORIES).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="ios-input-group" style={{ marginTop: '16px' }}>
                      <label>Built-up Area</label>
                      <input
                        type="text"
                        value={projectForm.area || ''}
                        onChange={e => setProjectForm({ ...projectForm, area: e.target.value })}
                        placeholder="e.g. 3,600 sq.ft"
                      />
                    </div>

                    <div className="studio-checkbox-group" style={{ marginTop: '16px' }}>
                      <label className="studio-checkbox-label">
                        <input
                          type="checkbox"
                          checked={!!projectForm.featured}
                          onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        />
                        <span>Feature on Homepage</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="studio-media-section">
                <label className="studio-section-label">Media & Images</label>
                <div className="ios-file-upload studio-drop-zone">
                  <input type="file" accept="image/*" onChange={e => handleProjectImageUpload(e, false)} />
                  {projectForm.coverImage ? (
                    <img src={projectForm.coverImage} alt="Cover Preview" className="ios-preview" />
                  ) : (
                    <div className="studio-upload-prompt">
                      <Upload size={28} />
                      <p><strong>Drag & drop high-res images</strong> or click to browse files</p>
                    </div>
                  )}
                  <span>{uploadingImage ? 'Uploading...' : ''}</span>
                </div>

                {/* Gallery Upload */}
                <div className="ios-input-group" style={{ marginTop: '16px' }}>
                  <label>Additional Gallery Photos (Multiple)</label>
                  <input type="file" accept="image/*" multiple onChange={e => handleProjectImageUpload(e, true)} />
                  <div className="ios-gallery-preview">
                    {(projectForm.gallery || []).map((url, idx) => (
                      <div key={idx} className="ios-thumb">
                        <img src={url} alt="Gallery" />
                        <button type="button" onClick={() => {
                          const updated = projectForm.gallery?.filter((_, i) => i !== idx);
                          setProjectForm({ ...projectForm, gallery: updated });
                        }}><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ios-modal-footer">
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="ios-btn-secondary">Cancel</button>
                <button type="submit" className="ios-btn-primary">Publish Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIAL MODAL */}
      {isTestimonialModalOpen && (
        <div className="ios-modal-overlay">
          <div className="ios-modal">
            <div className="ios-modal-header">
              <h2>{editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="ios-btn-icon"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveTestimonial} className="ios-modal-form">
              <div className="ios-input-group">
                <label>Client Name *</label>
                <input type="text" required value={testimonialForm.name || ''} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="John Doe" />
              </div>
              <div className="ios-input-group">
                <label>Role / Location</label>
                <input type="text" value={testimonialForm.role || ''} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} placeholder="Villa Owner, Kochi" />
              </div>
              <div className="ios-input-group">
                <label>Client Quote *</label>
                <textarea rows={3} required value={testimonialForm.quote || ''} onChange={e => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} placeholder="TechPlus transformed our dream home..."></textarea>
              </div>
              <div className="ios-input-group">
                <label>Avatar / Image Upload</label>
                <input type="file" accept="image/*" onChange={async e => {
                  if (e.target.files?.[0]) {
                    const url = await uploadImage(e.target.files[0], 'testimonials');
                    if (url) setTestimonialForm({ ...testimonialForm, avatar: url });
                  }
                }} />
              </div>
              <div className="ios-modal-footer">
                <button type="button" onClick={() => setIsTestimonialModalOpen(false)} className="ios-btn-secondary">Cancel</button>
                <button type="submit" className="ios-btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="ios-modal-overlay">
          <div className="ios-modal" style={{ maxWidth: '480px' }}>
            <div className="ios-modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="ios-btn-icon"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveCategory} className="ios-modal-form">
              <div className="ios-input-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name || ''}
                  onChange={e => {
                    const name = e.target.value;
                    const autoSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    setCategoryForm({ ...categoryForm, name, slug: autoSlug });
                  }}
                  placeholder="e.g. Residential"
                />
              </div>
              <div className="ios-input-group">
                <label>Slug (URL identifier)</label>
                <input
                  type="text"
                  value={categoryForm.slug || ''}
                  onChange={e => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  placeholder="e.g. residential"
                  style={{ fontFamily: 'monospace', fontSize: 13 }}
                />
                <small style={{ color: '#888', fontSize: 11, marginTop: 4, display: 'block' }}>Auto-generated from name. Used in URLs for filtering.</small>
              </div>
              <div className="ios-input-group">
                <label>Description</label>
                <textarea
                  rows={3}
                  value={categoryForm.description || ''}
                  onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Short description shown in portfolio filters..."
                />
              </div>
              <div className="ios-modal-footer">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="ios-btn-secondary">Cancel</button>
                <button type="submit" className="ios-btn-primary">{editingCategory ? 'Update Category' : 'Create Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLIENT LOGO MODAL */}
      {isLogoModalOpen && (
        <div className="ios-modal-overlay">
          <div className="ios-modal" style={{ maxWidth: '440px' }}>
            <div className="ios-modal-header">
              <h2>Add Client Logo</h2>
              <button onClick={() => setIsLogoModalOpen(false)} className="ios-btn-icon"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveLogo} className="ios-modal-form">
              <div className="ios-input-group">
                <label>Upload Logo Image *</label>
                <div className="ios-file-upload studio-drop-zone">
                  <input type="file" accept="image/*" onChange={async e => {
                    if (e.target.files?.[0]) {
                      setUploadingImage(true);
                      const url = await uploadImage(e.target.files[0], 'logos');
                      if (url) setLogoForm({ ...logoForm, logo_url: url });
                      setUploadingImage(false);
                    }
                  }} />
                  {logoForm.logo_url ? (
                    <img src={logoForm.logo_url} alt="Logo Preview" style={{ maxHeight: 70, objectFit: 'contain' }} />
                  ) : (
                    <div className="studio-upload-prompt">
                      <Upload size={28} />
                      <p><strong>Click or Drop Client Logo Image</strong></p>
                    </div>
                  )}
                </div>
              </div>
              <div className="ios-modal-footer">
                <button type="button" onClick={() => setIsLogoModalOpen(false)} className="ios-btn-secondary">Cancel</button>
                <button type="submit" className="ios-btn-primary" disabled={uploadingImage || !logoForm.logo_url}>
                  {uploadingImage ? 'Uploading...' : 'Save Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
