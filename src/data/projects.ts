export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  category: string;
  year: string;
  area: string;
  status: string;
  tagline: string;
  description: string;
  concept: string;
  materials: string[];
  coverImage: string;
  heroImage: string;
  gallery: string[];
  stats: ProjectStat[];
  featured: boolean;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  projectType?: string;
  message: string;
  budget?: string;
  location?: string;
}

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'The Courtyard House',
    slug: 'the-courtyard-house',
    location: 'Kerala, India',
    category: 'Residential',
    year: '2025',
    area: '5,800 sq.ft',
    status: 'Completed',
    tagline: 'A modern tropical sanctuary centered on light, rain and breeze.',
    description:
      'The Courtyard House reinterprets traditional Kerala Nalukettu architecture through a minimal contemporary lens. Cast in exposed rammed earth, raw board-marked concrete, and reclaimed teak, the house breathes with its natural surroundings. A central sunken courtyard collects seasonal monsoons while serving as a natural thermal cooling chimney for all interior living pavilions.',
    concept:
      'Biophilic spatial progression where indoor boundaries dissolve into private courtyards, creating micro-climates of contemplative calm and dynamic light play throughout the day.',
    materials: ['Exposed Rammed Earth', 'Board-Formed Concrete', 'Reclaimed Teak', 'Black Basalt Stone', 'Low-E Glazing'],
    coverImage: '/photos/imgi_2_baner9.jpg',
    heroImage: '/photos/imgi_3_baner10.jpg',
    gallery: [
      '/photos/imgi_4_baner1.jpg',
      '/photos/imgi_4_project1.jpg',
      '/photos/imgi_5_baner5.jpg',
      '/photos/imgi_6_baner6.jpg',
      '/photos/imgi_7_baner3.jpg',
    ],
    stats: [
      { label: 'Site Area', value: '18,500 sq.ft' },
      { label: 'Built Area', value: '5,800 sq.ft' },
      { label: 'Completion', value: 'Q1 2025' },
      { label: 'Typology', value: 'Private Villa' },
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'proj-02',
    title: 'Urban Pavilion',
    slug: 'urban-pavilion',
    location: 'Bangalore, India',
    category: 'Commercial',
    year: '2024',
    area: '24,000 sq.ft',
    status: 'Completed',
    tagline: 'A sculptural civic workplace framed by porous cantilevered volumes.',
    description:
      'Urban Pavilion creates an open, transparent cultural and commercial headquarters in the heart of Bangalore. Designed with floating cantilevered planes, deep solar brise-soleil shading, and landscaped internal stepped terraces, the structure fosters collaborative collision and natural cross-ventilation in a dense urban fabric.',
    concept:
      'Permeable architectural envelope that transforms the private office typology into a porous urban living room that engages with street trees and natural daylight.',
    materials: ['High-Performance Anodized Aluminum', 'Cast-in-Place Architectural Concrete', 'Acoustic Timber Slats', 'Double-Glazed Curtain Wall'],
    coverImage: '/photos/imgi_8_baner4.jpg',
    heroImage: '/photos/imgi_9_baner7.jpg',
    gallery: [
      '/photos/imgi_10_baner8.jpg',
      '/photos/imgi_10_project3.jpg',
      '/photos/imgi_11_project4.jpg',
      '/photos/imgi_14_project7.jpg',
    ],
    stats: [
      { label: 'Site Area', value: '32,000 sq.ft' },
      { label: 'Built Area', value: '24,000 sq.ft' },
      { label: 'Completion', value: 'Q3 2024' },
      { label: 'Typology', value: 'Commercial HQ' },
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'proj-03',
    title: 'Coastal Retreat',
    slug: 'coastal-retreat',
    location: 'Goa, India',
    category: 'Hospitality',
    year: '2024',
    area: '14,500 sq.ft',
    status: 'Completed',
    tagline: 'Ethereal oceanfront villas sculpted from monolithic laterite stone.',
    description:
      'Hovering above the Arabian Sea clifftops in North Goa, Coastal Retreat is a collection of six bespoke luxury villas. Using locally quarried deep red laterite stone and natural lime wash, the architecture emerges organically from the rugged cliff, framing dramatic panoramic ocean sunsets and cooling monsoon breezes.',
    concept:
      'Monolithic volumes carved to celebrate the horizon, ocean acoustics, and natural maritime light through rhythmic pergolas and infinity water mirrors.',
    materials: ['Dressed Laterite Stone', 'Hand-Applied Lime Plaster', 'Charred Cedar Wood', 'Terrazzo Flooring', 'Bronze Hardware'],
    coverImage: '/photos/imgi_2_baner9.jpg',
    heroImage: '/photos/imgi_3_baner10.jpg',
    gallery: [
      '/photos/imgi_4_baner1.jpg',
      '/photos/imgi_4_project1.jpg',
      '/photos/imgi_5_baner5.jpg',
      '/photos/imgi_6_baner6.jpg',
    ],
    stats: [
      { label: 'Site Area', value: '45,000 sq.ft' },
      { label: 'Built Area', value: '14,500 sq.ft' },
      { label: 'Completion', value: 'Q4 2024' },
      { label: 'Typology', value: 'Boutique Resort' },
    ],
    featured: true,
    order: 3,
  },
  {
    id: 'proj-04',
    title: 'Monsoon Residence',
    slug: 'monsoon-residence',
    location: 'Kozhikode, India',
    category: 'Residential',
    year: '2025',
    area: '4,200 sq.ft',
    status: 'Completed',
    tagline: 'An architecture tailored to monsoon rhythms, cantilevers and deep shadows.',
    description:
      'Designed specifically to celebrate the dramatic tropical downpours of the Malabar coast, Monsoon Residence features expansive 4-meter cantilevered concrete eaves, cascading rain chains (kusari-doi), and tranquil reflection pools that echo the sounds of falling rain.',
    concept:
      'The choreography of water as an architectural material: sound, reflection, and cooling humidity channelled through thoughtful spatial geometry.',
    materials: ['Off-White Smooth Stucco', 'Dark Fluted Granite', 'Custom Brass Rain Chains', 'Honed Teak Slat Ceilings'],
    coverImage: '/photos/imgi_7_baner3.jpg',
    heroImage: '/photos/imgi_8_baner4.jpg',
    gallery: [
      '/photos/imgi_9_baner7.jpg',
      '/photos/imgi_10_baner8.jpg',
      '/photos/imgi_10_project3.jpg',
      '/photos/imgi_11_project4.jpg',
    ],
    stats: [
      { label: 'Site Area', value: '12,000 sq.ft' },
      { label: 'Built Area', value: '4,200 sq.ft' },
      { label: 'Completion', value: 'Q2 2025' },
      { label: 'Typology', value: 'Private Residence' },
    ],
    featured: true,
    order: 4,
  },
  {
    id: 'proj-05',
    title: 'The Minimal Office',
    slug: 'the-minimal-office',
    location: 'Kochi, India',
    category: 'Commercial',
    year: '2023',
    area: '8,600 sq.ft',
    status: 'Completed',
    tagline: 'Quiet luxury workplace built on spatial purity and acoustic serenity.',
    description:
      'A tech and creative studio headquarters in Kochi defined by disciplined monochromatic surfaces, bespoke integrated micro-cement desks, and rhythmic fluted glass partitions that balance open collaboration with acoustic privacy.',
    concept:
      'Reduction to the essential: eliminating visual clutter to heighten focus, tactile engagement, and clarity of thought.',
    materials: ['Seamless Micro-Cement', 'Fluted Glass', 'Brushed Stainless Steel', 'Natural Felt Acoustic Panels'],
    coverImage: '/photos/imgi_14_project7.jpg',
    heroImage: '/photos/imgi_2_baner9.jpg',
    gallery: [
      '/photos/imgi_3_baner10.jpg',
      '/photos/imgi_4_baner1.jpg',
      '/photos/imgi_4_project1.jpg',
    ],
    stats: [
      { label: 'Site Area', value: '10,000 sq.ft' },
      { label: 'Built Area', value: '8,600 sq.ft' },
      { label: 'Completion', value: 'Q4 2023' },
      { label: 'Typology', value: 'Studio Headquarters' },
    ],
    featured: false,
    order: 5,
  },
  {
    id: 'proj-06',
    title: 'The Stone Sanctuary',
    slug: 'the-stone-sanctuary',
    location: 'Wayanad, India',
    category: 'Hospitality',
    year: '2025',
    area: '16,000 sq.ft',
    status: 'Completed',
    tagline: 'A wellness mountain sanctuary nestled into misty forested slopes.',
    description:
      'Perched in the Western Ghats, The Stone Sanctuary embeds itself into the hill topography. Handcrafted stone retaining walls terrace the slope into meditation pavilions, mineral thermal baths, and open yoga platforms that look out into pristine cloud forests.',
    concept:
      'Architecture as an extension of geological topography — quiet, protective, and grounding.',
    materials: ['Fieldstone Masonry', 'Charred Yakisugi Wood', 'Corten Steel Accents', 'Local Slate Tile'],
    coverImage: '/photos/imgi_5_baner5.jpg',
    heroImage: '/photos/imgi_6_baner6.jpg',
    gallery: [
      '/photos/imgi_7_baner3.jpg',
      '/photos/imgi_8_baner4.jpg',
      '/photos/imgi_9_baner7.jpg',
    ],
    stats: [
      { label: 'Site Area', value: '3.5 Acres' },
      { label: 'Built Area', value: '16,000 sq.ft' },
      { label: 'Completion', value: 'Q1 2025' },
      { label: 'Typology', value: 'Eco Resort & Spa' },
    ],
    featured: false,
    order: 6,
  },
  {
    id: 'proj-07',
    title: 'Atelier Gallery & Loft',
    slug: 'atelier-gallery-loft',
    location: 'Mumbai, India',
    category: 'Interiors',
    year: '2024',
    area: '3,800 sq.ft',
    status: 'Completed',
    tagline: 'An adaptive reuse art gallery and collector residence in a heritage mill.',
    description:
      'Transforming an early 20th-century cotton mill in South Mumbai into a contemporary art gallery and penthouse loft. Original cast-iron columns and exposed brickwork are preserved against sleek monolithic marble islands and museum-grade lighting tracks.',
    concept:
      'A deliberate dialogue between industrial historic patina and surgical contemporary minimalism.',
    materials: ['Historic Exposed Brick', 'Cast Iron', 'Nero Marquina Marble', 'White Oak Plank Floors'],
    coverImage: '/photos/imgi_10_baner8.jpg',
    heroImage: '/photos/imgi_10_project3.jpg',
    gallery: [
      '/photos/imgi_11_project4.jpg',
      '/photos/imgi_14_project7.jpg',
      '/photos/imgi_2_baner9.jpg',
    ],
    stats: [
      { label: 'Space Area', value: '3,800 sq.ft' },
      { label: 'Ceiling Height', value: '5.2 meters' },
      { label: 'Completion', value: 'Q2 2024' },
      { label: 'Typology', value: 'Gallery & Loft' },
    ],
    featured: false,
    order: 7,
  },
  {
    id: 'proj-08',
    title: 'Terra Courtyard Gardens',
    slug: 'terra-courtyard-gardens',
    location: 'Chennai, India',
    category: 'Landscape',
    year: '2024',
    area: '22,000 sq.ft',
    status: 'Completed',
    tagline: 'Sculptural native botanical landscapes and reflecting water courts.',
    description:
      'A comprehensive landscape architecture project integrating native drought-tolerant coastal flora, stepped water courts, and rammed earth sculptural seating walls for a private cultural foundation in Chennai.',
    concept:
      'Ecological restoration merged with architectural discipline to craft contemplative outdoor rooms.',
    materials: ['Granite Setts', 'Corten Steel Edging', 'Native Flora & Bamboos', 'Black Pebble Water Channels'],
    coverImage: '/photos/imgi_3_baner10.jpg',
    heroImage: '/photos/imgi_4_baner1.jpg',
    gallery: [
      '/photos/imgi_4_project1.jpg',
      '/photos/imgi_5_baner5.jpg',
    ],
    stats: [
      { label: 'Landscape Area', value: '22,000 sq.ft' },
      { label: 'Native Species', value: '48 species' },
      { label: 'Completion', value: 'Q3 2024' },
      { label: 'Typology', value: 'Landscape & Garden' },
    ],
    featured: false,
    order: 8,
  },
];
