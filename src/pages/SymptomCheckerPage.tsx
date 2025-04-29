import React, { useState } from 'react';
import { ChevronRight, Activity, Search, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { commonSymptoms } from '../data/mockData';
import { SymptomCheckerResult } from '../types';

const SymptomCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SymptomCheckerResult | null>(null);

  const filteredSymptoms = searchTerm 
    ? commonSymptoms.filter(symptom => 
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : commonSymptoms;

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock result based on selected symptoms
      const mockResult: SymptomCheckerResult = {
        possibleConditions: [
          {
            name: selectedSymptoms.includes('Headache') ? 'Tension Headache' : 'Common Cold',
            probability: 0.85,
            urgency: 'low'
          },
          {
            name: selectedSymptoms.includes('Fever') ? 'Influenza' : 'Allergic Rhinitis',
            probability: 0.65,
            urgency: 'medium'
          }
        ],
        recommendedSpecialists: [
          selectedSymptoms.includes('Chest pain') ? 'Cardiology' : 'General Medicine',
          selectedSymptoms.includes('Joint pain') ? 'Orthopedics' : 'Internal Medicine'
        ],
        suggestedActions: [
          'Schedule a consultation with a primary care physician',
          'Monitor symptoms and stay hydrated',
          'Take over-the-counter pain relievers if needed'
        ]
      };
      
      setResult(mockResult);
      setIsLoading(false);
      setStep(4);
    }, 2000);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s === step
                  ? 'bg-blue-600 text-white'
                  : s < step
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s < step ? (
                <CheckCircle size={16} />
              ) : (
                s
              )}
            </div>
            {s < 3 && (
              <div 
                className={`w-20 h-1 ${
                  s < step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          What symptoms are you experiencing?
        </h2>
        <p className="text-gray-600 mb-6">
          Select all the symptoms that apply to you. This will help our AI provide a more accurate assessment.
        </p>
        
        <div className="mb-6">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black"
              placeholder="Search symptoms..."
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSymptoms.map((symptom) => (
              <div 
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`p-3 rounded-md cursor-pointer border transition-colors ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-white border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedSymptoms.includes(symptom) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className={`ml-3 ${
                    selectedSymptoms.includes(symptom) ? 'text-blue-800' : 'text-gray-700'
                  }`}>
                    {symptom}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Tell us about yourself
        </h2>
        <p className="text-gray-600 mb-6">
          This information helps our AI provide more personalized recommendations.
        </p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black"
              placeholder="Enter your age"
              min="0"
              max="120"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Additional Details
        </h2>
        <p className="text-gray-600 mb-6">
          A few more questions to help our AI provide more accurate insights.
        </p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How long have you been experiencing these symptoms?
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black"
            >
              <option value="">Select duration</option>
              <option value="today">Today</option>
              <option value="days">A few days</option>
              <option value="week">About a week</option>
              <option value="weeks">Several weeks</option>
              <option value="month">A month or longer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selected Symptoms
            </label>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              {selectedSymptoms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(symptom => (
                    <div 
                      key={symptom}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {symptom}
                      <button 
                        onClick={() => toggleSymptom(symptom)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No symptoms selected</p>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
            <AlertCircle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="ml-3 text-sm text-yellow-700">
              <span className="font-medium">Important:</span> This tool provides preliminary insights only and is not a substitute for professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!result) return null;
    
    return (
      <div className="animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          AI Assessment Results
        </h2>
        <p className="text-gray-600 mb-6">
          Based on the symptoms you've shared, our AI has analyzed possible conditions. Remember, this is not a diagnosis.
        </p>
        
        <div className="space-y-6 mb-8">
          {/* Possible Conditions */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-gray-200 px-4 py-3">
              <h3 className="font-medium text-gray-900">Possible Conditions</h3>
            </div>
            <div className="p-4">
              {result.possibleConditions.map((condition, index) => (
                <div 
                  key={index}
                  className={`p-3 ${index > 0 ? 'border-t border-gray-100' : ''}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-gray-900">{condition.name}</h4>
                    <div 
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        condition.urgency === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : condition.urgency === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {condition.urgency === 'high' 
                        ? 'Seek immediate care' 
                        : condition.urgency === 'medium'
                        ? 'Consult soon'
                        : 'Low urgency'}
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${Math.round(condition.probability * 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {Math.round(condition.probability * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommended Specialists */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-gray-200 px-4 py-3">
              <h3 className="font-medium text-gray-900">Recommended Specialists</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {result.recommendedSpecialists.map((specialist, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight size={18} className="text-blue-500 mr-2" />
                    <span>{specialist}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Suggested Actions */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-gray-200 px-4 py-3">
              <h3 className="font-medium text-gray-900">Suggested Next Steps</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {result.suggestedActions.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-100 rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <span className="text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle size={24} className="text-yellow-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Health Disclaimer
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This AI assessment is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => {
              setStep(1);
              setSelectedSymptoms([]);
              setAge('');
              setGender('');
              setDuration('');
              setResult(null);
            }}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Start New Assessment
          </button>
          <button
            onClick={() => navigate('/doctors')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <span>Find Doctors</span>
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Analyzing your symptoms...
        </h2>
        <p className="text-gray-600">
          Our AI is processing your information to provide preliminary insights.
        </p>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Activity size={32} className="text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">AI Symptom Checker</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {isLoading ? (
              renderLoading()
            ) : (
              <>
                {step < 4 && renderStepIndicator()}
                
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderResults()}
                
                {step < 4 && (
                  <div className="flex justify-between mt-8">
                    {step > 1 ? (
                      <button
                        onClick={handleBack}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    <button
                      onClick={handleNext}
                      disabled={step === 1 && selectedSymptoms.length === 0}
                      className={`px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center ${
                        step === 1 && selectedSymptoms.length === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      <span>{step === 3 ? 'Get Results' : 'Continue'}</span>
                      <ChevronRight size={18} className="ml-1" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;