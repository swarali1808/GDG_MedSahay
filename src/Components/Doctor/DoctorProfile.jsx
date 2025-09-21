import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Award, 
  Stethoscope, 
  DollarSign, 
  Clock, 
  Calendar,
  MapPin,
  Star,
  Shield,
  Save,
  ArrowLeft,
  Plus,
  X
} from 'lucide-react';
import { Sidebar } from './index';

const DoctorProfile = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Basic Information
    registrationNumber: '',
    specializations: [],
    qualifications: [],
    yearsOfExperience: '',
    consultationFee: '',
    followUpFee: '',
    
    // Availability
    workingDays: [],
    avgConsultationDuration: '15',
    maxDailyAppointments: '',
    bufferTimeBetweenAppointments: '5',
    
    // Features
    acceptsInsurance: false,
    providesHomeVisits: false,
    emergencyAvailable: false,
    
    // Documents
    verificationDocuments: []
  });

  const [newSpecialization, setNewSpecialization] = useState('');
  const [newQualification, setNewQualification] = useState('');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const consultationTypes = ['in_person'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayAdd = (field, value, setterField) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setterField('');
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleWorkingDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor Profile Data:', formData);
    // TODO: Submit to backend
    navigate('/doctor/dashboard');
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
                  <p className="text-gray-600">Set up your doctor profile to start accepting patients</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Step 1 of 1</div>
                <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-full h-full bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                <User className="w-5 h-5 text-[#3B0DA3]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Registration Number *
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="Enter your registration number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="Years of experience"
                  required
                />
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                <Stethoscope className="w-5 h-5 text-[#3B0DA3]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Specializations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="Add a specialization (e.g., Cardiology, Dermatology)"
                />
                <button
                  type="button"
                  onClick={() => handleArrayAdd('specializations', newSpecialization, setNewSpecialization)}
                  className="px-6 py-3 bg-[#3B0DA3] text-white rounded-lg hover:bg-[#2F077C] transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              
              {formData.specializations.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.specializations.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-[#3B0DA3] bg-opacity-10 text-[#3B0DA3] px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium">{spec}</span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove('specializations', index)}
                        className="hover:bg-red-100 hover:text-red-600 rounded p-1 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                <GraduationCap className="w-5 h-5 text-[#3B0DA3]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Qualifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="Add a qualification (e.g., MBBS, MD, MS)"
                />
                <button
                  type="button"
                  onClick={() => handleArrayAdd('qualifications', newQualification, setNewQualification)}
                  className="px-6 py-3 bg-[#3B0DA3] text-white rounded-lg hover:bg-[#2F077C] transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              
              {formData.qualifications.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.qualifications.map((qual, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-[#3B0DA3] bg-opacity-10 text-[#3B0DA3] px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium">{qual}</span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove('qualifications', index)}
                        className="hover:bg-red-100 hover:text-red-600 rounded p-1 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Consultation Fees */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                <DollarSign className="w-5 h-5 text-[#3B0DA3]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Consultation Fees</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee (₹) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.consultationFee}
                  onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="Enter consultation fee"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.followUpFee}
                  onChange={(e) => handleInputChange('followUpFee', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="Enter follow-up fee (optional)"
                />
              </div>
            </div>
          </div>

          {/* Working Days */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                <Calendar className="w-5 h-5 text-[#3B0DA3]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Working Days</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {weekDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleWorkingDayToggle(day)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    formData.workingDays.includes(day)
                      ? 'bg-[#3B0DA3] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Settings */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                <Clock className="w-5 h-5 text-[#3B0DA3]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Consultation Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Consultation Duration (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  value={formData.avgConsultationDuration}
                  onChange={(e) => handleInputChange('avgConsultationDuration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="15"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Daily Appointments
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxDailyAppointments}
                  onChange={(e) => handleInputChange('maxDailyAppointments', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="Optional"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer Time (minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bufferTimeBetweenAppointments}
                  onChange={(e) => handleInputChange('bufferTimeBetweenAppointments', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                <Star className="w-5 h-5 text-[#3B0DA3]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Additional Services</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptsInsurance}
                  onChange={(e) => handleInputChange('acceptsInsurance', e.target.checked)}
                  className="w-5 h-5 text-[#3B0DA3] border-gray-300 rounded focus:ring-[#3B0DA3]"
                />
                <span className="text-gray-700">Accept Insurance</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.providesHomeVisits}
                  onChange={(e) => handleInputChange('providesHomeVisits', e.target.checked)}
                  className="w-5 h-5 text-[#3B0DA3] border-gray-300 rounded focus:ring-[#3B0DA3]"
                />
                <span className="text-gray-700">Provide Home Visits</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emergencyAvailable}
                  onChange={(e) => handleInputChange('emergencyAvailable', e.target.checked)}
                  className="w-5 h-5 text-[#3B0DA3] border-gray-300 rounded focus:ring-[#3B0DA3]"
                />
                <span className="text-gray-700">Available for Emergencies</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Complete Profile</span>
            </button>
          </div>
        </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;