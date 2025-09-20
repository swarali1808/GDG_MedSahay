import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, Edit3, Check, X, MessageCircle, User, Bot, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';

const PatientProfile = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [showManualEdit, setShowManualEdit] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([
    { type: 'ai', message: 'Hello! I\'m here to help you complete your medical profile. Let\'s start with your basic information. What is your full name?' }
  ]);
  
  const [formData, setFormData] = useState({
    // User Profile
    fullName: '',
    role: 'patient',
    email: '',
    phoneNumber: '',
    alternativePhone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    permanentAddress: '',
    currentLocation: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    // Family Members
    familyMembers: [
      { name: '', relationship: '', age: '', gender: '', medicalConditions: '' }
    ],
    // Medical History
    medicalHistory: [
      { condition: '', severity: '', diagnosedDate: '', treatingDoctor: '', ongoingStatus: '' }
    ],
    // Allergies
    allergies: [
      { allergen: '', reactionType: '', severity: '', notes: '' }
    ],
    // Prescriptions
    prescriptions: [
      { medicine: '', dosage: '', doctor: '', datePrescribed: '', status: 'active' }
    ],
    // Vital Signs
    vitalSigns: {
      bp: '',
      hr: '',
      temperature: '',
      weight: '',
      height: '',
      bmi: '',
      oxygenSaturation: '',
      recordedDate: ''
    },
    // Health IDs
    abhaId: '',
    healthId: '',
    // Preferences
    language: 'English',
    notifications: {
      sms: true,
      email: true,
      whatsapp: false,
      push: true
    }
  });

  const formFields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', prompt: 'What is your full name? Please say it clearly.' },
    { key: 'role', label: 'Role', placeholder: 'Select role', prompt: 'Are you registering as a patient or doctor?' },
    { key: 'email', label: 'Email', placeholder: 'Enter your email address', prompt: 'What is your email address?' },
    { key: 'phoneNumber', label: 'Phone Number', placeholder: 'Enter your phone number', prompt: 'What is your phone number?' },
    { key: 'alternativePhone', label: 'Alternative Phone', placeholder: 'Enter alternative contact number', prompt: 'Do you have an alternative phone number?' },
    { key: 'dateOfBirth', label: 'Date of Birth', placeholder: 'Select date', prompt: 'What is your date of birth?' },
    { key: 'gender', label: 'Gender', placeholder: 'Select gender', prompt: 'What is your gender?' },
    { key: 'bloodGroup', label: 'Blood Group', placeholder: 'Enter your blood group', prompt: 'What is your blood group?' },
    { key: 'permanentAddress', label: 'Permanent Address', placeholder: 'Enter your complete address', prompt: 'What is your permanent address?' },
    { key: 'currentLocation.address', label: 'Current Address', placeholder: 'Enter current address', prompt: 'What is your current address?' },
    { key: 'currentLocation.city', label: 'Current City', placeholder: 'Enter your current city', prompt: 'Which city do you currently live in?' },
    { key: 'currentLocation.state', label: 'State', placeholder: 'Enter your state', prompt: 'Which state are you in?' },
    { key: 'currentLocation.pincode', label: 'Pincode', placeholder: 'Enter pincode', prompt: 'What is your area pincode?' },
    { key: 'abhaId', label: 'ABHA ID', placeholder: 'Enter ABHA Health ID', prompt: 'Do you have an ABHA Health ID?' },
    { key: 'language', label: 'Preferred Language', placeholder: 'Select language', prompt: 'What is your preferred language?' }
  ];

  const filledFields = Object.values(formData).filter(value => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== '' && v !== false);
    }
    return value !== '' && value !== false;
  }).length;
  const totalFields = formFields.length;
  const progressPercentage = (filledFields / totalFields) * 100;

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  };

  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      setNestedValue(newData, key, value);
      return newData;
    });
  };

  const startVoiceInput = () => {
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      
      // Simulate AI response and move to next question
      const currentField = formFields[currentFieldIndex];
      if (currentField) {
        // Add user response to conversation
        setConversation(prev => [...prev, 
          { type: 'user', message: 'Voice input received...' },
          { type: 'ai', message: getNextQuestion() }
        ]);
        
        // Move to next field
        if (currentFieldIndex < formFields.length - 1) {
          setCurrentFieldIndex(prev => prev + 1);
        }
      }
    }, 2000);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setConversation(prev => [
        ...prev,
        { type: 'user', message: userInput },
        { type: 'ai', message: getNextQuestion() }
      ]);
      setUserInput('');
      
      // Auto-fill form based on conversation context
      const currentField = formFields[currentFieldIndex];
      if (currentField) {
        handleInputChange(currentField.key, userInput);
        if (currentFieldIndex < formFields.length - 1) {
          setCurrentFieldIndex(prev => prev + 1);
        }
      }
    }
  };

  const getNextQuestion = () => {
    const nextIndex = currentFieldIndex + 1;
    if (nextIndex < formFields.length) {
      return formFields[nextIndex].prompt;
    }
    return 'Great! We\'ve completed your basic profile. You can now review and edit any information if needed.';
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => navigate('/patient/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} className="text-gray-700 sm:w-6 sm:h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1C1C1C]">Medical Profile</h1>
              <p className="text-xs sm:text-sm text-[#666] hidden sm:block">Complete your profile with AI assistance</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setShowManualEdit(!showManualEdit)}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-medium ${
                showManualEdit 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white'
              }`}
            >
              <span className="hidden sm:inline">{showManualEdit ? '✓ Manual Edit Active' : 'Edit Form Manually'}</span>
              <span className="sm:hidden">{showManualEdit ? '✓ Edit' : 'Edit'}</span>
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              <div className="w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-gray-700 rounded"></span>
                <span className="w-full h-0.5 bg-gray-700 rounded"></span>
                <span className="w-full h-0.5 bg-gray-700 rounded"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 min-h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)]">
          
          {/* Left Panel - Dynamic Form */}
          <div className="order-2 lg:order-1 bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 overflow-y-auto max-h-[60vh] lg:max-h-none">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-2">Medical Profile Form</h2>
              
              {/* Progress Tracker */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium text-[#666]">Profile Completion</span>
                  <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] bg-clip-text text-transparent">
                    {filledFields} of {totalFields} fields filled
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 sm:space-y-4">
              {formFields.map((field, index) => (
                <div 
                  key={field.key} 
                  className={`bg-gray-50 rounded-xl border p-3 sm:p-4 transition-all duration-300 ${
                    index === currentFieldIndex ? 'border-[#3B0DA3] bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-2">
                    {field.label}
                    {index === currentFieldIndex && (
                      <span className="ml-2 text-xs bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </label>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex-1">
                      {field.key === 'gender' || field.key === 'role' || field.key === 'language' ? (
                        <select
                          value={getNestedValue(formData, field.key)}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all duration-300"
                        >
                          <option value="">{field.placeholder}</option>
                          {field.key === 'gender' && (
                            <>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </>
                          )}
                          {field.key === 'role' && (
                            <>
                              <option value="patient">Patient</option>
                              <option value="doctor">Doctor</option>
                            </>
                          )}
                          {field.key === 'language' && (
                            <>
                              <option value="English">English</option>
                              <option value="Hindi">Hindi</option>
                              <option value="Marathi">Marathi</option>
                              <option value="Tamil">Tamil</option>
                            </>
                          )}
                        </select>
                      ) : (
                        <input
                          type={field.key === 'dateOfBirth' ? 'date' : field.key === 'email' ? 'email' : field.key.includes('Phone') ? 'tel' : 'text'}
                          value={getNestedValue(formData, field.key) || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all duration-300"
                          disabled={!showManualEdit && index !== currentFieldIndex}
                        />
                      )}
                    </div>
                    
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        const input = document.querySelector(`input[value="${getNestedValue(formData, field.key) || ''}"], select[value="${getNestedValue(formData, field.key) || ''}"]`);
                        input?.focus();
                      }}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#666] hover:bg-gray-200 hover:text-[#3B0DA3] transition-all duration-300 hover:scale-105"
                    >
                      <Edit3 size={12} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  
                  {/* Field Completion Indicator */}
                  {getNestedValue(formData, field.key) && (
                    <div className="flex items-center mt-2 text-green-600 fadeIn">
                      <Check size={14} className="mr-1 sm:w-4 sm:h-4" />
                      <span className="text-xs">Completed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="mt-4 sm:mt-6">
              <button
                onClick={() => {
                  console.log('Profile data:', formData);
                  navigate('/patient/dashboard');
                }}
                className="w-full py-3 sm:py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
              >
                Save Profile
              </button>
            </div>
          </div>

          {/* Right Panel - AI Conversational Assistant */}
          <div className="order-1 lg:order-2 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col h-[40vh] lg:h-auto">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white p-3 sm:p-4 rounded-t-xl">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">AI Medical Assistant</h3>
                  <p className="text-xs sm:text-sm opacity-90">I'll help you complete your profile</p>
                </div>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} fadeIn`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 sm:py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white'
                        : 'bg-gray-100 text-[#1C1C1C]'
                    }`}
                  >
                    <p className="text-xs sm:text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Voice Input & Text Input Area */}
            <div className="p-3 sm:p-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Voice Input Button */}
                <button
                  onClick={startVoiceInput}
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#3B0DA3] to-[#2F077C] rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                    isListening ? 'animate-pulse' : ''
                  }`}
                >
                  <Mic size={16} className="sm:w-5 sm:h-5" />
                </button>
                
                {/* Text Input */}
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your response or use voice..."
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all duration-300"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3B0DA3] rounded-lg flex items-center justify-center text-white hover:bg-[#2F077C] transition-all duration-300 hover:scale-105"
                  >
                    <Send size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              
              {isListening && (
                <div className="mt-2 sm:mt-3 text-center">
                  <div className="inline-flex items-center space-x-2 text-[#3B0DA3]">
                    <div className="w-2 h-2 bg-[#3B0DA3] rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-medium">Listening...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;