// Comprehensive Mock Data for Aura Static Application

export const mockArtists = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    username: 'elena_creates',
    email: 'elena@aura.app',
    bio: 'Digital artist exploring the intersection of nature and technology. Creating immersive experiences through generative art.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=400&fit=crop',
    location: 'Barcelona, Spain',
    medium: 'Digital',
    experience: 'Professional',
    social: {
      instagram: '@elena_creates',
      twitter: '@elena_art',
      website: 'elenarodriguez.art'
    },
    verified: true,
    followers: 12400,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    username: 'marcus_sculptor',
    email: 'marcus@aura.app',
    bio: 'Contemporary sculptor working with sustainable materials. Pushing boundaries of form and space.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=400&fit=crop',
    location: 'Berlin, Germany',
    medium: 'Sculpture',
    experience: 'Professional',
    social: {
      instagram: '@marcussculpts',
      website: 'marcuschen.studio'
    },
    verified: true,
    followers: 8900,
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    name: 'Aisha Patel',
    username: 'aisha_canvas',
    email: 'aisha@aura.app',
    bio: 'Abstract expressionist painter. Colors are my language, canvas is my voice.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=400&fit=crop',
    location: 'Mumbai, India',
    medium: 'Canvas',
    experience: 'Emerging',
    social: {
      instagram: '@aishapaints',
      twitter: '@aisha_art'
    },
    verified: false,
    followers: 3200,
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    name: 'Sophie Laurent',
    username: 'sophie_digital',
    email: 'sophie@aura.app',
    bio: 'New media artist and creative technologist. Building worlds through code and imagination.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200&h=400&fit=crop',
    location: 'Paris, France',
    medium: 'Digital',
    experience: 'Professional',
    social: {
      instagram: '@sophie_laurent',
      website: 'sophielaurent.digital'
    },
    verified: true,
    followers: 15600,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    name: 'Jamal Washington',
    username: 'jamal_mixed',
    email: 'jamal@aura.app',
    bio: 'Mixed media artist telling stories through collage and found objects. Every piece has a narrative.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&h=400&fit=crop',
    location: 'Brooklyn, NY',
    medium: 'Canvas',
    experience: 'Mid-Career',
    social: {
      instagram: '@jamal_creates',
      twitter: '@jamalwash'
    },
    verified: false,
    followers: 5700,
    createdAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z'
  },
  {
    id: '6',
    name: 'Yuki Tanaka',
    username: 'yuki_ceramic',
    email: 'yuki@aura.app',
    bio: 'Ceramic artist blending traditional Japanese techniques with modern minimalism.',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=400&fit=crop',
    location: 'Kyoto, Japan',
    medium: 'Sculpture',
    experience: 'Professional',
    social: {
      instagram: '@yuki_ceramics',
      website: 'yukitanaka.jp'
    },
    verified: true,
    followers: 11200,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
];

export const mockArtworks = [
  {
    id: '1',
    title: 'Ethereal Dreams',
    artist: 'Elena Rodriguez',
    artistId: '1',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop',
    medium: 'Digital Art',
    year: 2024,
    likes: 342
  },
  {
    id: '2',
    title: 'Urban Decay',
    artist: 'Marcus Chen',
    artistId: '2',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=900&fit=crop',
    medium: 'Sculpture',
    year: 2024,
    likes: 198
  },
  {
    id: '3',
    title: 'Color Symphony',
    artist: 'Aisha Patel',
    artistId: '3',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=700&h=800&fit=crop',
    medium: 'Oil on Canvas',
    year: 2024,
    likes: 276
  },
  {
    id: '4',
    title: 'Digital Horizons',
    artist: 'Sophie Laurent',
    artistId: '4',
    image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=900&h=700&fit=crop',
    medium: 'Generative Art',
    year: 2024,
    likes: 421
  },
  {
    id: '5',
    title: 'Memory Fragments',
    artist: 'Jamal Washington',
    artistId: '5',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1100&fit=crop',
    medium: 'Mixed Media',
    year: 2023,
    likes: 189
  },
  {
    id: '6',
    title: 'Zen Forms',
    artist: 'Yuki Tanaka',
    artistId: '6',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=650&h=900&fit=crop',
    medium: 'Ceramic',
    year: 2024,
    likes: 312
  },
  {
    id: '7',
    title: 'Neon Nights',
    artist: 'Elena Rodriguez',
    artistId: '1',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=750&h=950&fit=crop',
    medium: 'Digital Art',
    year: 2024,
    likes: 567
  },
  {
    id: '8',
    title: 'Sustainable Structure',
    artist: 'Marcus Chen',
    artistId: '2',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=800&fit=crop',
    medium: 'Recycled Materials',
    year: 2024,
    likes: 234
  },
  {
    id: '9',
    title: 'Abstract Emotion',
    artist: 'Aisha Patel',
    artistId: '3',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=850&h=650&fit=crop',
    medium: 'Acrylic on Canvas',
    year: 2024,
    likes: 298
  },
  {
    id: '10',
    title: 'Code Poetry',
    artist: 'Sophie Laurent',
    artistId: '4',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&h=900&fit=crop',
    medium: 'Interactive Installation',
    year: 2024,
    likes: 445
  },
  {
    id: '11',
    title: 'Stories Untold',
    artist: 'Jamal Washington',
    artistId: '5',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop',
    medium: 'Collage',
    year: 2024,
    likes: 267
  },
  {
    id: '12',
    title: 'Minimalist Essence',
    artist: 'Yuki Tanaka',
    artistId: '6',
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=650&h=850&fit=crop',
    medium: 'Porcelain',
    year: 2024,
    likes: 389
  }
];

export const mockCommunityPosts = [
  {
    id: '1',
    type: 'Open Call',
    author: 'Elena Rodriguez',
    authorId: '1',
    title: 'Digital Art Residency - Applications Open',
    content: 'Excited to announce that Studio X is accepting applications for our 2024 Digital Art Residency. 3-month program with full studio access, mentorship, and exhibition opportunities.',
    date: '2024-01-15',
    tags: ['Residency', 'Digital Art', 'Open Call'],
    likes: 89,
    comments: 23
  },
  {
    id: '2',
    type: 'Project Update',
    author: 'Marcus Chen',
    authorId: '2',
    title: 'New Series: Regeneration',
    content: 'Thrilled to share my latest body of work exploring themes of environmental renewal. These sculptures are made entirely from reclaimed industrial materials. Opening March 10th at Galerie Berlin.',
    date: '2024-01-14',
    tags: ['Exhibition', 'Sculpture', 'Sustainability'],
    likes: 156,
    comments: 41
  },
  {
    id: '3',
    type: 'Open Call',
    author: 'Sophie Laurent',
    authorId: '4',
    title: 'Looking for Creative Coders',
    content: 'Seeking 2-3 creative coders for collaborative project merging AI and interactive installations. Remote-friendly. DM for details.',
    date: '2024-01-13',
    tags: ['Collaboration', 'Creative Coding', 'AI'],
    likes: 203,
    comments: 67
  },
  {
    id: '4',
    type: 'Project Update',
    author: 'Aisha Patel',
    authorId: '3',
    title: 'Studio Visit: Behind the Canvas',
    content: 'Posted a new video showing my process for the \"Color Symphony\" series. Watch how I build layers and create depth in abstract expressionism.',
    date: '2024-01-12',
    tags: ['Process', 'Video', 'Abstract'],
    likes: 78,
    comments: 19
  },
  {
    id: '5',
    type: 'Open Call',
    author: 'Yuki Tanaka',
    authorId: '6',
    title: 'Workshop: Traditional Ceramic Techniques',
    content: 'Teaching a 2-day workshop on Japanese ceramic methods in Kyoto. Limited to 8 participants. April 20-21. Registration opens next week.',
    date: '2024-01-11',
    tags: ['Workshop', 'Ceramics', 'Education'],
    likes: 134,
    comments: 52
  }
];
