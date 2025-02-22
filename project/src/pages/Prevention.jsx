import { Shield, Bug, Syringe, Apple, Brain, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const preventionCards = [
  {
    icon: <Shield className="h-8 w-8 text-[rgb(9,180,128)]" />,
    title: 'Vaccination Programs',
    description: 'Stay up-to-date with recommended vaccines and immunizations.',
    link: '/prevention/vaccineprograms'
  },
  {
    icon: <Bug className="h-8 w-8 text-[rgb(9,180,128)]" />,
    title: 'Infection Control',
    description: 'Learn about proper hygiene and infection prevention methods.',
    link: '/prevention/infectioncontrol'
  },
  {
    icon: <Syringe className="h-8 w-8 text-[rgb(9,180,128)]" />,
    title: 'Health Screenings',
    description: 'Regular check-ups and preventive health screenings.',
    link: '/prevention/healthscreening'
  },
  {
    icon: <Apple className="h-8 w-8 text-[rgb(9,180,128)]" />,
    title: 'Nutrition Guidance',
    description: 'Healthy eating habits and dietary recommendations.',
    link: '/prevention/nutritionguidance'
  },
  {
    icon: <Brain className="h-8 w-8 text-[rgb(9,180,128)]" />,
    title: 'Mental Health',
    description: 'Stress management and mental wellness tips.',
    link: '/prevention/mental-health'
  },
  {
    icon: <Heart className="h-8 w-8 text-[rgb(9,180,128)]" />,
    title: 'Lifestyle Changes',
    description: 'Exercise routines and healthy lifestyle modifications.',
    link: '/prevention/lifestyle'
  }
];

const Prevention = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disease Prevention</h1>
          <p className="text-xl text-gray-600">Protect your health with preventive care and healthy habits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preventionCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-[#09B480] bg-opacity-30 rounded-full mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <a
                  href={card.link} onClick={()=> navigate(card.onClick)}
                  className="text-blue-500 hover:text-blue-600 font-medium flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prevention Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Daily Habits</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Regular hand washing</li>
                <li>Balanced diet and hydration</li>
                <li>Adequate sleep (7-9 hours)</li>
                <li>Regular exercise</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Regular Check-ups</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Annual physical examination</li>
                <li>Dental check-ups</li>
                <li>Vision screening</li>
                <li>Blood pressure monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prevention;