import { AlertCircle, Info, ThermometerSnowflake } from 'lucide-react';

const PredictionResults = ({ predictions, selectedSymptoms, getSeverityColor }) => {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <AlertCircle className="h-16 w-16 mx-auto mb-4" />
        <p>No matching conditions found. Please consult a healthcare provider for proper diagnosis.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Possible Conditions</h2>
      {predictions.map((prediction, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{prediction.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(prediction.severity)}`}>
              {prediction.severity.charAt(0).toUpperCase() + prediction.severity.slice(1)}
            </span>
          </div>

          <div className="mb-4">
            <div className="text-gray-600 mb-2">{prediction.description}</div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-xs font-semibold inline-block text-[#09B480]">
                  Confidence
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-[#09B480]">
                    {Math.round(prediction.confidence)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${prediction.confidence}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#09B480]"
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold flex items-center mb-2">
                <Info className="h-4 w-4 mr-2 text-[#09B480]" />
                Common Symptoms
              </h4>
              <div className="flex flex-wrap gap-2">
                {prediction.symptoms.map((symptom, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full text-sm ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-[#09B480] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold flex items-center mb-2">
                <ThermometerSnowflake className="h-4 w-4 mr-2 text-[#09B480]" />
                Recommendations
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {prediction.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {prediction.urgency === 'high' && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium text-red-700">Seek immediate medical attention</span>
              </div>
              <p className="text-red-600">
                Based on your symptoms, we recommend consulting a healthcare provider as soon as possible.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PredictionResults;