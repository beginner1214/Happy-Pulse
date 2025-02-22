import { useState } from 'react';
import { Search, AlertCircle, ThermometerSnowflake } from 'lucide-react';
import SymptomPredictor from './symptoms/SymptomPredictor';

const Symptoms = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Symptom Checker</h1>
          <p className="text-xl text-gray-600">Identify and understand your symptoms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Common Symptoms</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium text-red-700">Seek immediate medical attention if you experience:</span>
              </div>
              <ul className="list-disc list-inside text-red-600 space-y-2">
                <li>Difficulty breathing or shortness of breath</li>
                <li>Chest pain or pressure</li>
                <li>Sudden confusion or difficulty speaking</li>
                <li>Severe abdominal pain</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ThermometerSnowflake className="h-5 w-5 text-[#09B480] mr-2" />
                <span className="font-medium text-[#09B480]">Track your symptoms</span>
              </div>
              <p className="text-gray-600">
                Keep a record of your symptoms, including when they started and any changes in severity.
                This information will be valuable for your healthcare provider.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Symptom Predictor</h2>
            <p className="text-gray-600 mb-6">
              Use our advanced symptom predictor to get insights about possible conditions based on your symptoms.
            </p>
            <SymptomPredictor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;