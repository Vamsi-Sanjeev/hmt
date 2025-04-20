import { useState, useMemo } from 'react';
import { MapPin, Search, Award, Star, GraduationCap } from 'lucide-react';
import artisansData from '../data/artisans.json';
import productsData from '../data/products.json';
import ArtisanModal from '../components/ArtisanModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  artisanId: string;
  image: string;
  category: string;
}

interface Artisan {
  id: string;
  name: string;
  photo: string;
  story: string;
  craft: string;
  location: string;
  experience: string;
  specialties: string[];
  awards: string[];
  rating: number;
  workshops: number;
}

interface ArtisanWithProducts extends Artisan {
  products: Product[];
}

export default function ArtisansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('All');
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanWithProducts | null>(null);

  const artisansWithProducts = useMemo(() => {
    return artisansData.artisans.map(artisan => ({
      ...artisan,
      products: productsData.products.filter(product => product.artisanId === artisan.id)
    }));
  }, []);

  const crafts = useMemo(() => 
    ['All', ...new Set(artisansData.artisans.map(artisan => artisan.craft))],
    []
  );

  const filteredArtisans = useMemo(() => 
    artisansWithProducts.filter(artisan => {
      const matchesSearch = 
        artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.story.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCraft = selectedCraft === 'All' || artisan.craft === selectedCraft;
      return matchesSearch && matchesCraft;
    }),
    [artisansWithProducts, searchTerm, selectedCraft]
  );

  return (
    <div className="py-8">
      <div className="pattern-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Meet Our Master Artisans</h1>
        <p className="text-gray-600 max-w-2xl">
          Discover skilled craftspeople preserving traditional techniques while creating contemporary pieces.
          Each artisan brings generations of expertise and cultural heritage to their work.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, location, or specialty..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="input-field md:w-48"
          value={selectedCraft}
          onChange={(e) => setSelectedCraft(e.target.value)}
        >
          {crafts.map(craft => (
            <option key={craft} value={craft}>{craft}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtisans.map((artisan, index) => (
          <div 
            key={artisan.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <img
                src={artisan.photo}
                alt={artisan.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{artisan.rating}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h2 className="text-white text-xl font-semibold mb-1">{artisan.name}</h2>
                <p className="text-white/90 flex items-center text-sm">
                  <MapPin size={14} className="mr-1" />
                  {artisan.location}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Award size={16} className="mr-1" />
                  <span className="text-sm">{artisan.awards.length} Awards</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={16} className="mr-1" />
                  <span className="text-sm">{artisan.workshops} Workshops</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{artisan.story}</p>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {artisan.specialties.map((specialty, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                  {artisan.craft}
                </span>
                <button
                  onClick={() => setSelectedArtisan(artisan)}
                  className="btn-primary"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedArtisan && (
        <ArtisanModal
          artisan={selectedArtisan}
          onClose={() => setSelectedArtisan(null)}
        />
      )}
    </div>
  );
}