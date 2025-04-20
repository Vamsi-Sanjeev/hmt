import { useState } from 'react';
import { Calendar, Video, Award, ExternalLink, Filter, Download } from 'lucide-react';

const WORKSHOPS = [
  {
    id: '1',
    title: 'Traditional Block Printing Techniques',
    instructor: 'Amrita Patel',
    category: 'Craft',
    summary: 'Master the ancient art of hand block printing using natural dyes and traditional patterns. Learn about color mixing, fabric preparation, and printing techniques passed down through generations.',
    isPaid: true,
    price: 1500,
    liveSessionLink: 'https://meet.google.com/abc-defg-hij',
    recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certificateUrl: '/certificates/block-printing-certificate.pdf',
    date: '2024-03-25T10:00:00Z',
    duration: '2 hours'
  },
  {
    id: '2',
    title: 'Digital Marketing for Artisans',
    instructor: 'Priya Singh',
    category: 'Digital Skills',
    summary: 'Learn how to showcase your crafts effectively on social media, build an online presence, and reach customers worldwide. Perfect for artisans looking to expand their digital footprint.',
    isPaid: false,
    liveSessionLink: 'https://meet.google.com/xyz-uvwx-yz',
    recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certificateUrl: '/certificates/digital-marketing-certificate.pdf',
    date: '2024-03-27T14:00:00Z',
    duration: '1.5 hours'
  },
  {
    id: '3',
    title: 'Sustainable Craft Materials',
    instructor: 'Rajesh Kumar',
    category: 'Sustainability',
    summary: 'Discover eco-friendly alternatives for craft materials and learn sustainable practices in traditional crafts. Focus on reducing waste and environmental impact while maintaining quality.',
    isPaid: true,
    price: 1200,
    liveSessionLink: 'https://meet.google.com/pqr-stuv-wxy',
    recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certificateUrl: '/certificates/sustainability-certificate.pdf',
    date: '2024-03-29T09:00:00Z',
    duration: '2.5 hours'
  },
  {
    id: '4',
    title: 'Business Planning for Craftspeople',
    instructor: 'Maya Desai',
    category: 'Business',
    summary: 'Learn essential business skills including pricing strategies, inventory management, and basic accounting tailored specifically for artisans and craftspeople.',
    isPaid: true,
    price: 2000,
    liveSessionLink: 'https://meet.google.com/def-ghij-klm',
    recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certificateUrl: '/certificates/business-planning-certificate.pdf',
    date: '2024-03-30T11:00:00Z',
    duration: '3 hours'
  }
];

export default function WorkshopsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Craft', 'Business', 'Sustainability', 'Digital Skills'];

  const filteredWorkshops = selectedCategory === 'All'
    ? WORKSHOPS
    : WORKSHOPS.filter(workshop => workshop.category === selectedCategory);

  return (
    <div className="py-8">
      <div className="pattern-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Workshop Portal</h1>
        <p className="text-gray-600 max-w-2xl">
          Join expert-led workshops to enhance your craft skills, learn business strategies,
          and connect with fellow artisans.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Filter size={20} className="text-gray-600" />
        <div className="flex overflow-x-auto space-x-4 pb-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredWorkshops.map(workshop => (
          <div key={workshop.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{workshop.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    Instructor: {workshop.instructor}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    workshop.isPaid
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {workshop.isPaid ? `₹${workshop.price}` : 'Free'}
                  </span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                    {workshop.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{workshop.summary}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {new Date(workshop.date).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-gray-400">•</span>
                </div>
                <div>{workshop.duration}</div>
              </div>

              {workshop.recordingUrl && (
                <div className="mb-6 rounded-lg overflow-hidden bg-gray-100">
                  <iframe
                    width="100%"
                    height="215"
                    src={workshop.recordingUrl}
                    title={workshop.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <a
                  href={workshop.liveSessionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Video size={18} />
                  Join Live Session
                </a>
                
                <a
                  href={workshop.certificateUrl}
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download size={18} />
                  Download Certificate
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}