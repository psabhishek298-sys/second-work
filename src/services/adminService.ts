import { supabase } from '../lib/supabase';
import { Project, ContactPayload } from '../data/projects';
import { GOOGLE_TESTIMONIALS, TestimonialData } from '../data/testimonials';

export type TestimonialItem = TestimonialData;

export interface ClientLogoItem {
  id: string;
  created_at?: string;
  name: string;
  logo_url: string;
  order?: number;
}

export interface EnquiryItem extends ContactPayload {
  id: string;
  created_at: string;
  status: 'unread' | 'read' | 'archived';
}

// Upload file to Supabase storage bucket
export async function uploadImage(file: File, pathFolder = 'uploads'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${pathFolder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('techplus-assets')
      .upload(fileName, file, { cacheControl: '3600', upsert: true });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('techplus-assets')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
  }
}

// PROJECTS CRUD
export async function fetchProjectsDB(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    location: item.location,
    category: item.category,
    year: item.year || '',
    area: item.area || '',
    status: item.status || 'Completed',
    tagline: item.tagline || '',
    description: item.description || '',
    concept: item.concept || '',
    materials: item.materials || [],
    coverImage: item.cover_image,
    heroImage: item.hero_image || item.cover_image,
    gallery: item.gallery || [],
    stats: item.stats || [],
    featured: !!item.featured,
    order: item.order || 0
  }));
}

export async function createProjectDB(project: Omit<Project, 'id'>): Promise<{ success: boolean; data?: any; error?: string }> {
  const payload: any = {
    title: project.title,
    slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
    location: project.location,
    category: project.category,
    year: project.year || '',
    area: project.area || '',
    status: project.status || 'Completed',
    tagline: project.tagline || '',
    description: project.description || '',
    cover_image: project.coverImage,
    hero_image: project.heroImage || project.coverImage,
    gallery: project.gallery || [],
    featured: !!project.featured,
    order: project.order || 0
  };

  const { data, error } = await supabase.from('projects').insert([payload]).select().single();
  if (error) {
    console.error('Error creating project:', error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

export async function updateProjectDB(id: string, project: Partial<Project>): Promise<{ success: boolean; error?: string }> {
  const payload: any = {};
  if (project.title !== undefined) payload.title = project.title;
  if (project.slug !== undefined) payload.slug = project.slug;
  if (project.location !== undefined) payload.location = project.location;
  if (project.category !== undefined) payload.category = project.category;
  if (project.year !== undefined) payload.year = project.year;
  if (project.area !== undefined) payload.area = project.area;
  if (project.status !== undefined) payload.status = project.status;
  if (project.tagline !== undefined) payload.tagline = project.tagline;
  if (project.description !== undefined) payload.description = project.description;
  if (project.concept !== undefined) payload.concept = project.concept;
  if (project.materials !== undefined) payload.materials = project.materials;
  if (project.coverImage !== undefined) payload.cover_image = project.coverImage;
  if (project.heroImage !== undefined) payload.hero_image = project.heroImage;
  if (project.gallery !== undefined) payload.gallery = project.gallery;
  if (project.featured !== undefined) payload.featured = project.featured;
  if (project.order !== undefined) payload.order = project.order;

  const { error } = await supabase.from('projects').update(payload).eq('id', id);
  if (error) {
    console.error('Error updating project:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteProjectDB(id: string): Promise<boolean> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  return !error;
}

// TESTIMONIALS CRUD
export async function fetchTestimonialsDB(): Promise<TestimonialItem[]> {
  try {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      return [...GOOGLE_TESTIMONIALS];
    }
    return data;
  } catch {
    return [...GOOGLE_TESTIMONIALS];
  }
}

export async function createTestimonialDB(item: Omit<TestimonialItem, 'id'>): Promise<TestimonialItem | null> {
  const { data, error } = await supabase.from('testimonials').insert([item]).select().single();
  if (error) return null;
  return data;
}

export async function updateTestimonialDB(id: string, item: Partial<TestimonialItem>): Promise<boolean> {
  const { error } = await supabase.from('testimonials').update(item).eq('id', id);
  return !error;
}

export async function deleteTestimonialDB(id: string): Promise<boolean> {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  return !error;
}

// CLIENT LOGOS CRUD
export async function fetchClientLogosDB(): Promise<ClientLogoItem[]> {
  const { data, error } = await supabase.from('client_logos').select('*').order('order', { ascending: true });
  if (error || !data) return [];
  return data;
}

export async function createClientLogoDB(item: Omit<ClientLogoItem, 'id'>): Promise<ClientLogoItem | null> {
  const { data, error } = await supabase.from('client_logos').insert([item]).select().single();
  if (error) return null;
  return data;
}

export async function updateClientLogoDB(id: string, item: Partial<ClientLogoItem>): Promise<boolean> {
  const { error } = await supabase.from('client_logos').update(item).eq('id', id);
  return !error;
}

export async function deleteClientLogoDB(id: string): Promise<boolean> {
  const { error } = await supabase.from('client_logos').delete().eq('id', id);
  return !error;
}

// ENQUIRIES CRUD
export async function fetchEnquiriesDB(): Promise<EnquiryItem[]> {
  const { data, error } = await supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map((item: any) => ({
    id: item.id,
    created_at: item.created_at,
    name: item.name,
    email: item.email,
    phone: item.phone,
    projectType: item.project_type,
    message: item.message,
    budget: item.budget,
    location: item.location,
    status: item.status || 'unread'
  }));
}

export async function createEnquiryDB(payload: ContactPayload): Promise<boolean> {
  const dbPayload = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    project_type: payload.projectType,
    message: payload.message,
    budget: payload.budget,
    location: payload.location,
    status: 'unread'
  };
  const { error } = await supabase.from('contact_enquiries').insert([dbPayload]);
  return !error;
}

export async function updateEnquiryStatusDB(id: string, status: 'unread' | 'read' | 'archived'): Promise<boolean> {
  const { error } = await supabase.from('contact_enquiries').update({ status }).eq('id', id);
  return !error;
}

export async function deleteEnquiryDB(id: string): Promise<boolean> {
  const { error } = await supabase.from('contact_enquiries').delete().eq('id', id);
  return !error;
}

// CATEGORIES CRUD
import { DEFAULT_CATEGORIES, Category as CategoryType } from '../data/categories';

export type CategoryItem = CategoryType;

const CATEGORIES_STORAGE_KEY = 'techplus_categories';

export async function fetchCategoriesDB(): Promise<CategoryItem[]> {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });
    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // fallback to storage
  }

  try {
    const local = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback to default
  }

  return [...DEFAULT_CATEGORIES];
}

export async function createCategoryDB(item: Omit<CategoryItem, 'id'>): Promise<CategoryItem> {
  const newCat: CategoryItem = {
    id: 'cat-' + Date.now(),
    name: item.name,
    slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: item.description || ''
  };

  try {
    const { data, error } = await supabase.from('categories').insert([newCat]).select().single();
    if (!error && data) {
      return data;
    }
  } catch {
    // ignore
  }

  const current = await fetchCategoriesDB();
  const updated = [...current, newCat];
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return newCat;
}

export async function updateCategoryDB(id: string, item: Partial<CategoryItem>): Promise<boolean> {
  try {
    await supabase.from('categories').update(item).eq('id', id);
  } catch {
    // ignore
  }

  try {
    const current = await fetchCategoriesDB();
    const updated = current.map(c => c.id === id ? { ...c, ...item } : c);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return true;
}

export async function deleteCategoryDB(id: string): Promise<boolean> {
  try {
    await supabase.from('categories').delete().eq('id', id);
  } catch {
    // ignore
  }

  try {
    const current = await fetchCategoriesDB();
    const updated = current.filter(c => c.id !== id);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return true;
}

