import { Shield, Virus, Droplets, Users } from 'lucide-react';

const preventionMethods = [
  {
    title: 'Hand Hygiene',
    icon: <Droplets className="h-6 w-6" />,
    steps: [
      'Wash hands for at least 20 seconds',
      'Use alcohol-based sanitizers',
      'Clean before and after activities',
      'Regular nail maintenance'
    ],
    importance: 'Primary defense against pathogens'
  },
  {
    title: 'Personal Protective Equipment',
    icon: <Shield className="h-6 w-6" />,
    steps: [
      'Wear masks in crowded places',
      'Use gloves when necessary',
      'Maintain protective eyewear',
      'Proper disposal of used PPE'
    ],
    importance: 'Creates barrier against infections'
  },
  {
    title: 'Environmental Cleaning',
    icon: <Virus className="h-6 w-6" />,
    steps: [
      'Regular surface disinfection',
      'Proper ventilation',
      'Waste management',
      'Clean high-touch surfaces'
    ],
    importance: 'Reduces pathogen survival'
  },
  {
    title: 'Social Measures',
    icon: <Users className="h-6 w-6" />,
    steps: [
      'Maintain physical distancing',
      'Follow respiratory etiquette',
      'Stay home when sick',
      'Regular health monitoring'
    ],
    importance: 'Prevents community spread'
  }
];

const InfectionControl = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Infection Control</h1>
          <p className="text-xl text-gray-600">Essential practices for preventing infections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {preventionMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-secondary-green bg-opacity-10 rounded-lg">
                    {method.icon}
                  </div>
                  <h2 className="ml-4 text-xl font-semibold">{method.title}</h2>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Key Steps</h3>
                  <ul className="space-y-2">
                    {method.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center">
                        <span className="h-2 w-2 bg-secondary-green rounded-full mr-2"></span>
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Why it's important</h3>
                  <p className="text-gray-600">{method.importance}</p>
                </div>

                <button className="mt-6 w-full bg-secondary-green text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Guidelines & Protocols</h3>
              <ul className="space-y-2 text-gray-600">
                <li>WHO Standards</li>
                <li>CDC Recommendations</li>
                <li>Local Health Guidelines</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Training Materials</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Video Tutorials</li>
                <li>Interactive Modules</li>
                <li>Practice Assessments</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Support Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>24/7 Helpline</li>
                <li>Expert Consultation</li>
                <li>Community Forums</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfectionControl;