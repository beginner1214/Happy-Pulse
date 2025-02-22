import { useState } from 'react';
import { Apple, Coffee, Fish, Leaf, Calculator } from 'lucide-react';

const nutritionPlans = [
  {
    id: 1,
    name: 'Heart-Healthy Diet',
    description: 'Optimal nutrition for cardiovascular health',
    icon: <Heart className="h-6 w-6" />,
    recommendations: [
      'Limit saturated fats',
      'Increase fiber intake',
      'Reduce sodium consumption',
      'Choose lean proteins',
      'Include omega-3 rich foods'
    ],
    mealPlan: {
      breakfast: 'Oatmeal with berries and nuts',
      lunch: 'Grilled salmon with quinoa',
      dinner: 'Mediterranean vegetable stew',
      snacks: 'Fresh fruits, unsalted nuts'
    }
  },
  {
    id: 2,
    name: 'Diabetes Management',
    description: 'Blood sugar control through diet',
    icon: <Apple className="h-6 w-6" />,
    recommendations: [
      'Monitor carbohydrate intake',
      'Choose low glycemic foods',
      'Regular meal timing',
      'Portion control',
      'Include protein with meals'
    ],
    mealPlan: {
      breakfast: 'Greek yogurt with chia seeds',
      lunch: 'Turkey and avocado wrap',
      dinner: 'Grilled chicken with vegetables',
      snacks: 'Hard-boiled eggs, celery with almond butter'
    }
  },
  {
    id: 3,
    name: 'Weight Management',
    description: 'Balanced nutrition for healthy weight',
    icon: <Calculator className="h-6 w-6" />,
    recommendations: [
      'Calorie awareness',
      'Balanced macronutrients',
      'Portion control',
      'Regular hydration',
      'Mindful eating practices'
    ],
    mealPlan: {
      breakfast: 'Smoothie bowl with protein',
      lunch: 'Mixed green salad with grilled tofu',
      dinner: 'Lean beef stir-fry with brown rice',
      snacks: 'Apple slices, protein bar'
    }
  },
  {
    id: 4,
    name: 'Plant-Based Nutrition',
    description: 'Vegetarian and vegan options',
    icon: <Leaf className="h-6 w-6" />,
    recommendations: [
      'Complete protein sources',
      'Iron-rich foods',
      'B12 supplementation',
      'Calcium alternatives',
      'Healthy plant fats'
    ],
    mealPlan: {
      breakfast: 'Tofu scramble with vegetables',
      lunch: 'Chickpea and quinoa bowl',
      dinner: 'Lentil curry with brown rice',
      snacks: 'Hummus with vegetables, trail mix'
    }
  }
];

const NutritionGuidance = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    age: '',
    weight: '',
    height: '',
    activity: 'moderate'
  });

  const handleCalculatorSubmit = (e) => {
    e.preventDefault();
    // Add BMR and calorie calculations here
    setShowCalculator(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nutrition Guidance</h1>
          <p className="text-xl text-gray-600">Personalized nutrition plans for optimal health</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Nutrition Plans</h2>
                <div className="space-y-4">
                  {nutritionPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                        selectedPlan?.id === plan.id
                          ? 'bg-[#09B480] text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`${
                          selectedPlan?.id === plan.id ? 'text-white' : 'text-[#09B480]'
                        }`}>
                          {plan.icon}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">{plan.name}</h3>
                          <p className={`text-sm ${
                            selectedPlan?.id === plan.id ? 'text-white' : 'text-gray-500'
                          }`}>
                            {plan.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCalculator(true)}
              className="mt-4 w-full bg-[#09B480] text-white p-4 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calorie Calculator
            </button>
          </div>

          {selectedPlan && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
                  <p className="text-gray-600 mt-2">{selectedPlan.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Key Recommendations</h3>
                    <ul className="space-y-2">
                      {selectedPlan.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="h-2 w-2 bg-[#09B480] rounded-full mr-2"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Sample Meal Plan</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Breakfast:</strong> {selectedPlan.mealPlan.breakfast}</p>
                      <p><strong>Lunch:</strong> {selectedPlan.mealPlan.lunch}</p>
                      <p><strong>Dinner:</strong> {selectedPlan.mealPlan.dinner}</p>
                      <p><strong>Snacks:</strong> {selectedPlan.mealPlan.snacks}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#09B480] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                  Get Detailed Meal Plan
                </button>
              </div>
            </div>
          )}
        </div>

        {showCalculator && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Calorie Calculator</h2>
              <form onSubmit={handleCalculatorSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    value={calculatorData.age}
                    onChange={(e) => setCalculatorData({...calculatorData, age: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09B480] focus:ring focus:ring-[#09B480] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    value={calculatorData.weight}
                    onChange={(e) => setCalculatorData({...calculatorData, weight: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09B480] focus:ring focus:ring-[#09B480] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                  <input
                    type="number"
                    value={calculatorData.height}
                    onChange={(e) => setCalculatorData({...calculatorData, height: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09B480] focus:ring focus:ring-[#09B480] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                  <select
                    value={calculatorData.activity}
                    onChange={(e) => setCalculatorData({...calculatorData, activity: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09B480] focus:ring focus:ring-[#09B480] focus:ring-opacity-50"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light Activity</option>
                    <option value="moderate">Moderate Activity</option>
                    <option value="active">Very Active</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#09B480] text-white py-2 px-4 rounded-lg hover:bg-opacity-90"
                  >
                    Calculate
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCalculator(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionGuidance;