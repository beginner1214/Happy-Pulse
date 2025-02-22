import { Search } from 'lucide-react';

const SymptomList = ({ 
  searchTerm, 
  setSearchTerm, 
  filteredSymptoms, 
  selectedSymptoms, 
  handleSymptomToggle 
}) => {
  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09B480]"
          />
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredSymptoms.map((symptom, index) => (
          <div
            key={index}
            onClick={() => handleSymptomToggle(symptom)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedSymptoms.includes(symptom)
                ? 'bg-[#09B480] text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {symptom}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomList;