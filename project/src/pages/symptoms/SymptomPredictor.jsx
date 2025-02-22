import { useState } from 'react';
import { Activity } from 'lucide-react';
import { diseaseDatabase, allSymptoms } from '../../data/symptomsDatabase';
import { getPredictions } from '../../utils/symptomPredictor';
import SymptomList from "../../components/SymptomComponents/SymptomList";
import PredictionResults from '../../components/SymptomComponents/PredictionResults';

const SymptomPredictor = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handlePredict = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }

    const results = getPredictions(selectedSymptoms, diseaseDatabase);
    setPredictions(results);
    setShowResults(true);
  };

  const filteredSymptoms = allSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <SymptomList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredSymptoms={filteredSymptoms}
          selectedSymptoms={selectedSymptoms}
          handleSymptomToggle={handleSymptomToggle}
        />

        <button
          onClick={handlePredict}
          className="mt-6 w-full bg-[#09B480] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Predict Condition
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {showResults ? (
          <PredictionResults
            predictions={predictions}
            selectedSymptoms={selectedSymptoms}
            getSeverityColor={getSeverityColor}
          />
        ) : (
          <div className="text-center text-gray-500">
            <Activity className="h-16 w-16 mx-auto mb-4" />
            <p>Select symptoms and click "Predict Condition" to get an assessment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomPredictor;