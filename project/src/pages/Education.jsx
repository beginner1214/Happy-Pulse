import React, { useState } from 'react';
import { Play, BookOpen, Video, Users, Search, Filter } from 'lucide-react';
import ReactPlayer from 'react-player';

const diseases = [
  {
    id: 1,
    name: 'COVID-19',
    description: 'Understanding COVID-19, its variants, and prevention methods',
    videoUrl: 'https://www.youtube.com/watch?v=BtN-goy9VOY',
    resources: ['WHO Guidelines', 'CDC Updates', 'Latest Research'],
    experts: ['Dr. Sarah Johnson', 'Dr. Michael Chen'],
    category: 'Infectious Disease'
  },
  {
    id: 2,
    name: 'Diabetes Management',
    description: 'Comprehensive guide to managing diabetes and lifestyle changes',
    videoUrl: 'https://www.youtube.com/watch?v=wZAjVQWbMlE',
    resources: ['Dietary Guidelines', 'Exercise Plans', 'Blood Sugar Monitoring'],
    experts: ['Dr. Emily White', 'Dr. Robert Garcia'],
    category: 'Chronic Disease'
  },
  {
    id: 3,
    name: 'Heart Disease Prevention',
    description: 'Learn about cardiovascular health and preventive measures',
    videoUrl: 'https://www.youtube.com/watch?v=e3H3SV7F2I4',
    resources: ['Heart Health Guide', 'Risk Factors', 'Prevention Strategies'],
    experts: ['Dr. James Wilson', 'Dr. Lisa Chen'],
    category: 'Cardiovascular'
  },
  {
    id: 4,
    name: 'Mental Health Awareness',
    description: 'Understanding mental health and available support systems',
    videoUrl: 'https://www.youtube.com/watch?v=3zpjJbT1D5c',
    resources: ['Mental Health Resources', 'Therapy Options', 'Self-Care Guide'],
    experts: ['Dr. Amanda Brown', 'Dr. David Miller'],
    category: 'Mental Health'
  },
  {
    id: 5,
    name: 'Cancer Awareness',
    description: 'Early detection and prevention of various types of cancer',
    videoUrl: 'https://www.youtube.com/watch?v=9cvzVGqmIN8',
    resources: ['Cancer Prevention Guide', 'Screening Tests', 'Treatment Options'],
    experts: ['Dr. Jennifer Lee', 'Dr. Thomas Anderson'],
    category: 'Oncology'
  },
  {
    id: 6,
    name: 'Respiratory Health',
    description: 'Managing respiratory conditions and improving lung health',
    videoUrl: 'https://www.youtube.com/watch?v=kRsQX3qpdzg',
    resources: ['Breathing Exercises', 'Air Quality Tips', 'Medication Guide'],
    experts: ['Dr. Maria Rodriguez', 'Dr. Paul Thompson'],
    category: 'Respiratory'
  }
];

const categories = ['All', 'Infectious Disease', 'Chronic Disease', 'Cardiovascular', 'Mental Health', 'Oncology', 'Respiratory'];

const Education = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState(null);

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || disease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Education Center</h1>
          <p className="text-xl text-gray-600">Learn about various health conditions from expert sources</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09B480]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09B480]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 gap-8">
          {filteredDiseases.map((disease) => (
            <div key={disease.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{disease.name}</h2>
                <p className="text-gray-600 mb-6">{disease.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-w-16 aspect-h-9">
                    <ReactPlayer
                      url={disease.videoUrl}
                      width="100%"
                      height="300px"
                      light={true}
                      playIcon={<Play className="h-16 w-16 text-white" />}
                      controls
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-[#09B480]" />
                        Learning Resources
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {disease.resources.map((resource, index) => (
                          <li key={index}>{resource}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-[#09B480]" />
                        Expert Contributors
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {disease.experts.map((expert, index) => (
                          <li key={index}>{expert}</li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => setSelectedDisease(disease)}
                      className="w-full bg-[#09B480] text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Video className="h-5 w-5 mr-2" />
                      Watch Full Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No results found for your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;