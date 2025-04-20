import { useState } from 'react';
import { BookOpen, Video, FileText, Award, ExternalLink, Search, Filter } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Craft' | 'Digital' | 'Business' | 'Government';
  type: 'Video' | 'Course' | 'PDF' | 'Government Scheme';
  source: string;
  url: string;
  thumbnail?: string;
}

const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Traditional Weaving Techniques Masterclass',
    description: 'Comprehensive video series covering traditional Indian weaving patterns, tools, and methods. Perfect for beginners and intermediate craftspeople.',
    category: 'Craft',
    type: 'Video',
    source: 'YouTube',
    url: 'https://youtube.com/watch?v=example1',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d'
  },
  {
    id: '2',
    title: 'Digital Marketing for Artisans',
    description: 'Learn how to promote your craft business online through social media, content marketing, and e-commerce platforms.',
    category: 'Digital',
    type: 'Course',
    source: 'Coursera',
    url: 'https://coursera.org/example-course',
    thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c2a2'
  },
  {
    id: '3',
    title: 'Artisan Business Development Scheme 2024',
    description: 'Government initiative providing financial support, training, and market access to traditional craftspeople.',
    category: 'Government',
    type: 'Government Scheme',
    source: 'Ministry of Textiles',
    url: 'https://example.gov.in/scheme',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
  },
  {
    id: '4',
    title: 'Craft Business Financial Planning Guide',
    description: 'Comprehensive PDF guide on financial management, pricing strategies, and business planning for artisans.',
    category: 'Business',
    type: 'PDF',
    source: 'CraftBusiness.org',
    url: 'https://example.com/financial-guide.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c'
  },
  {
    id: '5',
    title: 'Sustainable Crafting Practices',
    description: 'Learn eco-friendly techniques and sustainable material sourcing for traditional crafts.',
    category: 'Craft',
    type: 'Course',
    source: 'Udemy',
    url: 'https://udemy.com/example-course',
    thumbnail: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519'
  }
];

const getIcon = (type: Resource['type']) => {
  switch (type) {
    case 'Video':
      return Video;
    case 'Course':
      return BookOpen;
    case 'PDF':
      return FileText;
    case 'Government Scheme':
      return Award;
    default:
      return BookOpen;
  }
};

const getCategoryStyle = (category: Resource['category']) => {
  switch (category) {
    case 'Craft':
      return 'bg-amber-100 text-amber-800';
    case 'Digital':
      return 'bg-purple-100 text-purple-800';
    case 'Business':
      return 'bg-blue-100 text-blue-800';
    case 'Government':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | Resource['category']>('All');

  const categories: ('All' | Resource['category'])[] = ['All', 'Craft', 'Digital', 'Business', 'Government'];

  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8">
      <div className="pattern-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Resource Library</h1>
        <p className="text-gray-600 max-w-2xl">
          Access curated learning materials, guides, and government schemes to enhance your craft
          skills and grow your business.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-600" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as typeof selectedCategory)}
            className="input-field md:w-48"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => {
          const Icon = getIcon(resource.type);
          const categoryStyle = getCategoryStyle(resource.category);
          
          return (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {resource.thumbnail && (
                <div className="relative h-48 rounded-t-xl overflow-hidden">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center text-white">
                    <Icon size={20} className="mr-2" />
                    <span className="text-sm font-medium">{resource.source}</span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold">{resource.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyle}`}>
                    {resource.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <Icon size={18} className="mr-2" />
                    <span className="text-sm">{resource.type}</span>
                  </div>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Open Resource
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}