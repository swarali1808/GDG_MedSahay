import React, { useState } from 'react';
import { ArrowLeft, User, Mail, CheckCircle, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';

const PrePatientProfile = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock Gmail data (would be fetched from authentication/signup)
  const gmailData = {
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face', // Sample profile picture
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com'
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto lg:max-w-6xl">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/patient/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#1C1C1C]">My Profile</h1>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <MoreVertical size={20} className="text-gray-700" />
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-gray-700 rounded"></span>
              <span className="w-full h-0.5 bg-gray-700 rounded"></span>
              <span className="w-full h-0.5 bg-gray-700 rounded"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto lg:max-w-6xl px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col items-center text-center">
            {/* Profile Picture with Green Dot */}
            <div className="relative w-20 h-20 mb-4">
              {gmailData.profilePicture ? (
                <img
                  src={gmailData.profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3B0DA3] to-[#2F077C] rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
              )}
              {/* Green online dot */}
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Basic Details */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#1C1C1C]">{gmailData.fullName}</h2>
              <div className="flex items-center justify-center space-x-2 text-[#666]">
                <span className="text-sm">{gmailData.email}</span>
              </div>
              
              {/* Email Verified Badge */}
              <div className="flex items-center justify-center space-x-1 mt-3">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm text-green-600 font-medium">Email Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Status */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-orange-700">Your profile is partially complete.</span>
          </div>
        </div>

        {/* Complete Profile Button */}
        <button
          onClick={() => navigate('/patient/profile')}
          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white rounded-xl py-4 px-6 font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] mb-6"
        >
          <User size={20} />
          <span>Complete My Profile</span>
        </button>

        {/* Profile Overview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          <h3 className="text-base font-semibold text-[#1C1C1C] mb-4">Profile Overview</h3>
          
          {/* Basic Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#1C1C1C]">Basic Information</h4>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Incomplete</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Date of Birth</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Gender</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Phone Number</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#1C1C1C]">Medical Information</h4>
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Missing</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Blood Group</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Allergies</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Medical History</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#1C1C1C]">Contact & Address</h4>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Incomplete</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Address</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Emergency Contact</span>
                <span className="text-sm text-[#666]">Not provided</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrePatientProfile;