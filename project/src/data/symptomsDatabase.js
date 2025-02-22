// Comprehensive database of diseases and their symptoms
export const diseaseDatabase = {
    'Common Cold': {
      symptoms: ['Runny nose', 'Sneezing', 'Sore throat', 'Cough', 'Mild fever', 'Congestion'],
      severity: 'mild',
      urgency: 'low',
      description: 'A viral infection of the upper respiratory tract',
      recommendations: [
        'Rest and hydration',
        'Over-the-counter cold medications',
        'Warm salt water gargle',
        'Humidifier use'
      ]
    },
    'Influenza': {
      symptoms: ['High fever', 'Body aches', 'Fatigue', 'Headache', 'Dry cough', 'Chills', 'Muscle pain'],
      severity: 'moderate',
      urgency: 'medium',
      description: 'A viral infection that attacks your respiratory system',
      recommendations: [
        'Antiviral medications if prescribed',
        'Rest and isolation',
        'Increased fluid intake',
        'Pain relievers'
      ]
    },
    'COVID-19': {
      symptoms: ['Fever', 'Dry cough', 'Fatigue', 'Loss of taste/smell', 'Shortness of breath', 'Body aches', 'Headache'],
      severity: 'severe',
      urgency: 'high',
      description: 'A respiratory illness caused by the SARS-CoV-2 virus',
      recommendations: [
        'Immediate isolation',
        'Contact healthcare provider',
        'Monitor oxygen levels',
        'Get tested'
      ]
    },
    'Bronchitis': {
      symptoms: ['Persistent cough', 'Chest discomfort', 'Fatigue', 'Mild fever', 'Wheezing', 'Mucus production'],
      severity: 'moderate',
      urgency: 'medium',
      description: 'Inflammation of the bronchial tubes',
      recommendations: [
        'Rest and hydration',
        'Humidifier use',
        'Over-the-counter medications',
        'Avoid irritants'
      ]
    },
    'Pneumonia': {
      symptoms: ['High fever', 'Severe cough', 'Chest pain', 'Difficulty breathing', 'Fatigue', 'Confusion'],
      severity: 'severe',
      urgency: 'high',
      description: 'Infection that inflames air sacs in the lungs',
      recommendations: [
        'Immediate medical attention',
        'Antibiotics if bacterial',
        'Rest and hydration',
        'Breathing exercises'
      ]
    },
    'Migraine': {
      symptoms: ['Severe headache', 'Nausea', 'Light sensitivity', 'Sound sensitivity', 'Visual aura', 'Dizziness'],
      severity: 'moderate',
      urgency: 'medium',
      description: 'A severe throbbing headache often accompanied by other symptoms',
      recommendations: [
        'Rest in dark room',
        'Pain medication',
        'Stress management',
        'Trigger avoidance'
      ]
    },
    'Food Poisoning': {
      symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach cramps', 'Fever', 'Weakness'],
      severity: 'moderate',
      urgency: 'medium',
      description: 'Illness caused by eating contaminated food',
      recommendations: [
        'Hydration',
        'Rest',
        'Bland diet',
        'Electrolyte replacement'
      ]
    },
    'Allergic Reaction': {
      symptoms: ['Skin rash', 'Itching', 'Swelling', 'Wheezing', 'Runny nose', 'Watery eyes'],
      severity: 'varies',
      urgency: 'varies',
      description: 'Immune system response to allergens',
      recommendations: [
        'Antihistamines',
        'Avoid triggers',
        'Cool compress',
        'Seek emergency care if severe'
      ]
    },
    'Anxiety Attack': {
      symptoms: ['Rapid heartbeat', 'Sweating', 'Trembling', 'Shortness of breath', 'Chest pain', 'Dizziness'],
      severity: 'moderate',
      urgency: 'medium',
      description: 'A period of intense fear or discomfort',
      recommendations: [
        'Deep breathing exercises',
        'Grounding techniques',
        'Professional counseling',
        'Stress management'
      ]
    },
    'Gastritis': {
      symptoms: ['Stomach pain', 'Nausea', 'Bloating', 'Loss of appetite', 'Indigestion', 'Vomiting'],
      severity: 'moderate',
      urgency: 'medium',
      description: 'Inflammation of the stomach lining',
      recommendations: [
        'Dietary changes',
        'Acid-reducing medications',
        'Stress reduction',
        'Small, frequent meals'
      ]
    }
  };
  
  // All possible symptoms for the checklist
  export const allSymptoms = [
    'Runny nose', 'Sneezing', 'Sore throat', 'Cough', 'Mild fever', 'High fever',
    'Body aches', 'Fatigue', 'Headache', 'Loss of taste/smell', 'Shortness of breath',
    'Chest pain', 'Wheezing', 'Confusion', 'Nausea', 'Vomiting', 'Diarrhea',
    'Stomach cramps', 'Weakness', 'Skin rash', 'Itching', 'Swelling', 'Watery eyes',
    'Rapid heartbeat', 'Sweating', 'Trembling', 'Dizziness', 'Chest discomfort',
    'Mucus production', 'Visual aura', 'Light sensitivity', 'Sound sensitivity',
    'Bloating', 'Loss of appetite', 'Indigestion', 'Stomach pain', 'Congestion',
    'Chills', 'Muscle pain', 'Difficulty breathing', 'Severe cough'
  ];