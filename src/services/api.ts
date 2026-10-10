import { Project, Category, ContactPayload, FALLBACK_PROJECTS } from '../data/projects';
import { fetchProjectsDB, createEnquiryDB, fetchCategoriesDB } from './adminService';

export const api = {
  async getProjects(category?: string, featured?: boolean): Promise<Project[]> {
    try {
      const dbProjects = await fetchProjectsDB();
      let list = dbProjects.length > 0 ? dbProjects : [...FALLBACK_PROJECTS];
      
      if (category && category.toLowerCase() !== 'all') {
        list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase() || p.category.toLowerCase().replace(/[^a-z0-9]/g, '') === category.toLowerCase().replace(/[^a-z0-9]/g, ''));
      }
      if (featured !== undefined) {
        list = list.filter((p) => p.featured === featured);
      }
      return list;
    } catch {
      return [...FALLBACK_PROJECTS];
    }
  },

  async getProjectBySlug(slug: string): Promise<{ project: Project; prevSlug: string | null; nextSlug: string | null }> {
    const projects = await this.getProjects();
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) {
      throw new Error(`Project ${slug} not found`);
    }
    const project = projects[index];
    const prevSlug = index > 0 ? projects[index - 1].slug : projects[projects.length - 1].slug;
    const nextSlug = index < projects.length - 1 ? projects[index + 1].slug : projects[0].slug;
    return { project, prevSlug, nextSlug };
  },

  async getCategories(): Promise<Category[]> {
    try {
      const [cats, projs] = await Promise.all([fetchCategoriesDB(), this.getProjects()]);
      return cats.map((cat) => {
        let count = 0;
        if (cat.slug === 'all') {
          count = projs.length;
        } else {
          count = projs.filter(
            (p) => p.category.toLowerCase() === cat.name.toLowerCase() ||
                   p.category.toLowerCase() === cat.slug.toLowerCase() ||
                   p.category.toLowerCase().replace(/[^a-z0-9]/g, '') === cat.slug.toLowerCase().replace(/[^a-z0-9]/g, '')
          ).length;
        }
        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description || '',
          count
        };
      });
    } catch {
      return [];
    }
  },

  async sendContact(data: ContactPayload): Promise<{ success: boolean; message: string; data?: any }> {
    const success = await createEnquiryDB(data);
    return {
      success,
      message: success
        ? 'Thank you for reaching out to TECHPLUS. Your inquiry has been recorded and our team will get back to you shortly.'
        : 'Failed to send inquiry. Please try again.',
    };
  },
};


