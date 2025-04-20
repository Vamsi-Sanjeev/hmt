export interface Artisan {
  id: string;
  name: string;
  photo: string;
  story: string;
  location: string;
  craft: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  artisanShare: number;
  image: string;
  artisanId: string;
}

export interface Workshop {
  id: string;
  title: string;
  instructor: string;
  category: 'Craft' | 'Business' | 'Sustainability' | 'Digital Skills';
  summary: string;
  isPaid: boolean;
  price?: number;
  liveSessionLink?: string;
  recordingUrl?: string;
  certificateAvailable: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  replies: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  type: 'Video' | 'Course' | 'PDF' | 'Government Scheme';
}