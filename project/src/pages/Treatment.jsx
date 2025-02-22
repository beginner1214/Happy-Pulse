import { useState } from 'react';
import { Stethoscope, Pill, FileText, Calendar, Clock, User } from 'lucide-react';

const treatments = [
  {
    id: 1,
    name: 'Medication Management',
    description: 'Personalized medication schedules and reminders',
    icon: <Pill className="h-6 w-6" />,
    details: {
      schedule: 'Daily',
      duration: '3 months',
      nextCheckup: '2024-03-15'
    }
  },
  {
    id: 2,
    name: 'Physical Therapy',
    description: 'Rehabilitation exercises and therapy sessions',
    icon: <User className="h-6 w-6" />,
    details: {
      schedule: 'Twice weekly',
      duration: '6 weeks',
      nextSession: '2024-02-28'
    }
  },
  {
    id: 3,
    name: 'Regular Check-ups',
    description: 'Scheduled appointments with healthcare providers',
    icon: <Stethoscope className="h-6 w-6" />,
    details: {
      frequency: 'Monthly',
      lastVisit: '2024-01-15',
      nextVisit: '2024-02-15'
    }
  }
];

const Treatment = () => {
  const [selectedTreatment, setSelectedTreatment] = useState(treatments[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Treatment Plans</h1>
          <p className="text-xl text-gray-600">Personalized healthcare solutions for your needs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Treatment Plans</h2>
                <div className="space-y-4">
                  {treatments.map((treatment) => (
                    <button
                      key={treatment.id}
                      onClick={() => setSelectedTreatment(treatment)}
                      className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                        selectedTreatment.id === treatment.id
                          ? 'bg-[#09B480] bg-opacity-30 border-[#09B480]'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      } border`}
                    >
                      <div className="flex items-center">
                        <div className={`${
                          selectedTreatment.id === treatment.id ? 'text-green-500' : 'text-gray-400'
                        }`}>
                          {treatment.icon}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">{treatment.name}</h3>
                          <p className="text-sm text-gray-500">{treatment.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-semibold">{selectedTreatment.name}</h2>
                <p className="text-gray-600">{selectedTreatment.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Schedule Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>Schedule: {selectedTreatment.details.schedule}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>Duration: {selectedTreatment.details.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Progress Tracking</h3>
                    <div className="bg-[#09B480] bg-opacity-30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 text-grey-500 mr-2" />
                        <span className="font-medium text-grey-500">Treatment Progress</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-grey-400 bg-green-200">
                              In Progress
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-[#09B480]">
                              60%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                          <div style={{ width: '60%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#09B480]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-600">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            1
                          </div>
                          <span>Review current medication schedule</span>
                        </li>
                        <li className="flex items-center text-gray-600">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            2
                          </div>
                          <span>Schedule next check-up</span>
                        </li>
                        <li className="flex items-center text-gray-600">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            3
                          </div>
                          <span>Track progress and symptoms</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <button className="w-full bg-[#09B480] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
                    Update Treatment Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatment;