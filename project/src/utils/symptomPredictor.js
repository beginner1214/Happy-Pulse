// Utility functions for symptom prediction

// Calculate the confidence score for a disease based on matching symptoms
export const calculateConfidence = (selectedSymptoms, diseaseSymptoms) => {
    const matchingSymptoms = diseaseSymptoms.filter(symptom => 
      selectedSymptoms.includes(symptom)
    );
    
    // Calculate base confidence from matching symptoms
    let confidence = (matchingSymptoms.length / diseaseSymptoms.length) * 100;
    
    // Adjust confidence based on the proportion of selected symptoms that match
    const selectedSymptomMatchRatio = matchingSymptoms.length / selectedSymptoms.length;
    confidence = confidence * selectedSymptomMatchRatio;
    
    return confidence;
  };
  
  // Get top disease predictions based on symptoms
  export const getPredictions = (selectedSymptoms, diseaseDatabase) => {
    if (selectedSymptoms.length === 0) return [];
  
    const predictions = Object.entries(diseaseDatabase)
      .map(([disease, data]) => {
        const confidence = calculateConfidence(selectedSymptoms, data.symptoms);
        return {
          name: disease,
          confidence,
          ...data
        };
      })
      .filter(prediction => prediction.confidence > 20) // Only include predictions with >20% confidence
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3); // Get top 3 predictions
  
    return predictions;
  };