import { useState } from 'react';
import { Calendar, Activity, Heart, FileText, AlertCircle } from 'lucide-react';

const screenings = [
  {
    id: 1,
    name: 'Annual Physical Examination',
    description: 'Comprehensive health check-up',
    frequency: 'Yearly',
    ageGroup: 'All adults',
    includes: [
      'Blood pressure check',
      'Cholesterol screening',
      'Blood sugar test',
      'BMI calculation',
      'Vision and hearing tests'
    ],
    importance: 'Early detection of health issues'
  },
  {
    id: 2,
    name: 'Cancer Screening',
    description: 'Early detection of various cancers',
    frequency: 'Varies by type',
    ageGroup: '40+ years',
    includes: [
      'Mammogram',
      'Colonoscopy',
      'Prostate screening',
      'Skin cancer check',
      'Cervical cancer screening'
    ],
    importance: 'Early detection improves treatment outcomes'
  },
  {
    id: 3,
    name: 'Cardiovascular Screening',
    description: 'Heart health assessment',
    frequency: 'Every 2 years',
    ageGroup: '35+ years',
    includes: [
      'ECG',
      'Stress test',
      'Lipid profile',
      'Blood pressure monitoring',
      'Heart rhythm check'
    ],
    importance: 'Prevention of heart disease'
  },
  {
    id: 4,
    name: 'Bone Density Scan',
    description: 'Osteoporosis screening',
    frequency: 'Every 2-5 years',
    ageGroup: '65+ years',
    includes: [
      'DEXA scan',
      'Fracture risk assessment',
      'Calcium level check',
      'Vitamin D testing',
      'Joint examination'
    ],
    importance: 'Prevention of fractures and bone loss'
  }
];

const HealthScreening = () => {
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Screening Programs</h1>
          <p className="text-xl text-gray-600">Regular check-ups for better health outcomes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Available Screenings</h2>
                <div className="space-y-4">
                  {screenings.map((screening) => (
                    <button
                      key={screening.id}
                      onClick={() => setSelectedScreening(screening)}
                      className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                        selectedScreening?.id === screening.id
                          ? 'bg-[#09B480] text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{screening.name}</span>
                        <Activity className="h-5 w-5" />
                      </div>
                      <p className={`text-sm mt-1 ${
                        selectedScreening?.id === screening.id ? 'text-white' : 'text-gray-500'
                      }`}>
                        {screening.frequency}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {selectedScreening && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{selectedScreening.name}</h2>
                  <p className="text-gray-600 mt-2">{selectedScreening.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-[#09B480]" />
                      Includes
                    </h3>
                    <ul className="space-y-2">
                      {selectedScreening.includes.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="h-2 w-2 bg-[#09B480] rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-[#09B480]" />
                        Frequency
                      </h3>
                      <p className="text-gray-600">{selectedScreening.frequency}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-[#09B480]" />
                        Importance
                      </h3>
                      <p className="text-gray-600">{selectedScreening.importance}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-[#09B480] mr-2" />
                    <h3 className="font-semibold">Recommended Age Group</h3>
                  </div>
                  <p className="text-gray-600">{selectedScreening.ageGroup}</p>
                </div>

                <button
                  onClick={() => setShowScheduler(true)}
                  className="w-full bg-[#09B480] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Schedule Screening
                </button>

                {showScheduler && (
                  <div className="mt-6 p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Schedule Appointment</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09B480] focus:ring focus:ring-[#09B480] focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Time
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09B480] focus:ring focus:ring-[#09B480] focus:ring-opacity-50">
                          <option>Morning (9 AM - 12 PM)</option>
                          <option>Afternoon (12 PM - 3 PM)</option>
                          <option>Evening (3 PM - 6 PM)</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#09B480] text-white py-2 px-4 rounded-lg hover:bg-opacity-90"
                      >
                        Confirm Appointment
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthScreening;