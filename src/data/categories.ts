export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count?: number;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-all', name: 'All Works', slug: 'all', description: 'Comprehensive catalog of spatial interventions.', count: 8 },
  { id: 'cat-res', name: 'Residential', slug: 'residential', description: 'Bespoke homes, private villas and retreats.', count: 2 },
  { id: 'cat-com', name: 'Commercial', slug: 'commercial', description: 'Workplaces, civic pavilions and studios.', count: 2 },
  { id: 'cat-hos', name: 'Hospitality', slug: 'hospitality', description: 'Luxury resorts, boutique hotels and spas.', count: 2 },
  { id: 'cat-int', name: 'Interiors', slug: 'interiors', description: 'Curated architectural interior spaces.', count: 1 },
  { id: 'cat-lan', name: 'Landscape', slug: 'landscape', description: 'Biophilic terrains, courtyards and gardens.', count: 1 },
];
