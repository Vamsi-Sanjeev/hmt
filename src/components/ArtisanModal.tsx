import { X, MapPin, Star, Award, GraduationCap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  artisanId: string;
  image: string;
  category: string;
}

interface ArtisanModalProps {
  artisan: {
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
    products: Product[];
  };
  onClose: () => void;
}

export default function ArtisanModal({ artisan, onClose }: ArtisanModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="w-full h-[500px] overflow-hidden rounded-t-xl">
            <img
              src={artisan.photo}
              alt={artisan.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{artisan.rating} Rating</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{artisan.name}</h2>
              <p className="text-gray-600 flex items-center">
                <MapPin size={16} className="mr-1" />
                {artisan.location}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <Award size={16} className="text-yellow-600 mr-1" />
                <span className="text-yellow-700">{artisan.awards.length} Awards</span>
              </div>
              <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                <GraduationCap size={16} className="text-indigo-600 mr-1" />
                <span className="text-indigo-700">{artisan.workshops} Workshops</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Story</h3>
            <p className="text-gray-600">{artisan.story}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {artisan.specialties.map((specialty, i) => (
                <span 
                  key={i}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Awards & Recognition</h3>
            <div className="space-y-2">
              {artisan.awards.map((award, i) => (
                <div 
                  key={i}
                  className="flex items-center text-gray-700"
                >
                  <Award size={16} className="text-yellow-600 mr-2" />
                  {award}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Featured Products</h3>
            <div className="grid grid-cols-2 gap-4">
              {artisan.products.map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-lg p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium text-gray-700 mb-1">{product.name}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <p className="text-sm font-medium text-indigo-600 mt-2">₹{product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
              {artisan.craft} • {artisan.experience}
            </span>
            <button className="btn-primary">
              Contact Artisan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}