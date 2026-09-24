import { Project, Category, ContactPayload, FALLBACK_PROJECTS } from '../data/projects';

export const CATEGORIES: Category[] = [
  { id: 'cat-all', name: 'All Works', slug: 'all', description: 'Comprehensive catalog of spatial interventions.', count: 8 },
  { id: 'cat-res', name: 'Residential', slug: 'residential', description: 'Bespoke homes, private villas and retreats.', count: 2 },
  { id: 'cat-com', name: 'Commercial', slug: 'commercial', description: 'Workplaces, civic pavilions and studios.', count: 2 },
  { id: 'cat-hos', name: 'Hospitality', slug: 'hospitality', description: 'Luxury resorts, boutique hotels and spas.', count: 2 },
  { id: 'cat-int', name: 'Interiors', slug: 'interiors', description: 'Curated architectural interior spaces.', count: 1 },
  { id: 'cat-lan', name: 'Landscape', slug: 'landscape', description: 'Biophilic terrains, courtyards and gardens.', count: 1 },
];

export const api = {
  async getProjects(category?: string, featured?: boolean): Promise<Project[]> {
    let list = [...FALLBACK_PROJECTS];
    if (category && category.toLowerCase() !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured !== undefined) {
      list = list.filter((p) => p.featured === featured);
    }
    return list;
  },

  async getProjectBySlug(slug: string): Promise<{ project: Project; prevSlug: string | null; nextSlug: string | null }> {
    const index = FALLBACK_PROJECTS.findIndex((p) => p.slug === slug);
    if (index === -1) {
      throw new Error(`Project ${slug} not found`);
    }
    const project = FALLBACK_PROJECTS[index];
    const prevSlug = index > 0 ? FALLBACK_PROJECTS[index - 1].slug : FALLBACK_PROJECTS[FALLBACK_PROJECTS.length - 1].slug;
    const nextSlug = index < FALLBACK_PROJECTS.length - 1 ? FALLBACK_PROJECTS[index + 1].slug : FALLBACK_PROJECTS[0].slug;
    return { project, prevSlug, nextSlug };
  },

  async getCategories(): Promise<Category[]> {
    return CATEGORIES;
  },

  async sendContact(data: ContactPayload): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const existing = JSON.parse(localStorage.getItem('techplus_inquiries') || '[]');
      existing.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem('techplus_inquiries', JSON.stringify(existing));
    } catch {
      // ignore
    }

    return {
      success: true,
      message: 'Thank you for reaching out to TECHPLUS. Your inquiry has been recorded and our team will get back to you shortly.',
    };
  },
};

