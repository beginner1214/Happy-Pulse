import { useState } from 'react';
import { Calendar, Shield, Info, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const vaccines = [
  {
    name: 'COVID-19 Vaccine',
    description: 'Protection against coronavirus variants',
    schedule: 'Initial series + boosters',
    eligibility: 'Ages 5+',
    status: 'Required'
  },
  {
    name: 'Influenza Vaccine',
    description: 'Annual flu protection',
    schedule: 'Yearly',
    eligibility: 'All ages',
    status: 'Recommended'
  },
  {
    name: 'MMR Vaccine',
    description: 'Measles, Mumps, Rubella protection',
    schedule: 'Two doses',
    eligibility: 'Children',
    status: 'Required'
  },
  {
    name: 'Tdap Vaccine',
    description: 'Tetanus, Diphtheria, Pertussis protection',
    schedule: 'Every 10 years',
    eligibility: 'Adults',
    status: 'Required'
  }
];

const VaccinePrograms = () => {
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vaccination Programs</h1>
          <p className="text-xl text-gray-600">Stay protected with recommended immunizations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {vaccines.map((vaccine, index) => (
              <div
                key={index}
                className={`p-6 bg-white rounded-xl shadow-md cursor-pointer transition-all ${
                  selectedVaccine === vaccine ? 'ring-2 ring-secondary-green' : ''
                }`}
                onClick={() => setSelectedVaccine(vaccine)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{vaccine.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    vaccine.status === 'Required' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {vaccine.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{vaccine.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{vaccine.schedule}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedVaccine && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">{selectedVaccine.name}</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-secondary-green" />
                    Key Information
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Eligibility: {selectedVaccine.eligibility}</li>
                    <li>Schedule: {selectedVaccine.schedule}</li>
                    <li>Status: {selectedVaccine.status}</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-secondary-green" />
                    Important Notes
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Consult with healthcare provider before vaccination</li>
                    <li>Report any adverse reactions immediately</li>
                    <li>Keep vaccination records updated</li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowScheduler(true)}
                  className="w-full bg-secondary-green text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Schedule Vaccination
                </button>

                {showScheduler && (
                  <div className="mt-4 p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Schedule Appointment</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-green focus:ring focus:ring-secondary-green focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Time
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-green focus:ring focus:ring-secondary-green focus:ring-opacity-50">
                          <option>Morning (9 AM - 12 PM)</option>
                          <option>Afternoon (12 PM - 3 PM)</option>
                          <option>Evening (3 PM - 6 PM)</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-secondary-green text-white py-2 px-4 rounded-lg hover:bg-opacity-90"
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

export default VaccinePrograms;