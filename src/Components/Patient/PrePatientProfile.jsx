import React, { useState } from 'react';
import { ArrowLeft, User, Mail, CheckCircle, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';

const PrePatientProfile = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Static user data from the provided profile
  const userData = {
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    full_name: 'Tanay Mehta',
    email: 'mehtatanay04@gmail.com',
    phone_number: '07900162280',
    alternative_phone: '07900162280',
    dob: '2004-10-15',
    gender: 'Male',
    blood_group: 'O+',
    permanent_address: '251,FLR-1,CRYSTAL BUILDING,MUGBHAT LANE,GIRGAON',
    current_location: {
      address: '251,FLR-1,CRYSTAL BUILDING,MUGBHAT LANE,GIRGAON',
      city: 'MUMBAI',
      state: 'Maharashtra',
      pincode: '400 004'
    },
    abha_id: '123456789',
    preferred_language: 'English',
    profile_completion_percentage: 93, // 13 of 14 fields completed
    medical_history: [],
    allergies: [],
    is_verified: true
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
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
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
              <h2 className="text-xl font-bold text-[#1C1C1C]">{userData.full_name}</h2>
              <div className="flex items-center justify-center space-x-2 text-[#666]">
                <span className="text-sm">{userData.email}</span>
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
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700">Your profile is {userData.profile_completion_percentage}% complete (13 of 14 fields).</span>
          </div>
        </div>

        {/* Complete Profile Button */}
        <button
          onClick={() => navigate('/patient/pre-profile')}
          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white rounded-xl py-4 px-6 font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] mb-6"
        >
          <User size={20} />
          <span>Edit Profile</span>
        </button>

        {/* Profile Overview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          <h3 className="text-base font-semibold text-[#1C1C1C] mb-4">Profile Overview</h3>
          
          {/* Basic Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#1C1C1C]">Basic Information</h4>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Complete</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Date of Birth</span>
                <span className="text-sm text-[#1C1C1C] font-medium">15-10-2004</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Gender</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Phone Number</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.phone_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Alternative Phone</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.alternative_phone}</span>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#1C1C1C]">Medical Information</h4>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Complete</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Blood Group</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.blood_group}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">ABHA ID</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.abha_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Allergies</span>
                <span className="text-sm text-[#1C1C1C] font-medium">
                  {userData.allergies.length > 0 ? userData.allergies.join(', ') : 'None reported'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Medical History</span>
                <span className="text-sm text-[#1C1C1C] font-medium">
                  {userData.medical_history.length > 0 ? userData.medical_history.join(', ') : 'None reported'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#1C1C1C]">Contact & Address</h4>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Complete</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Permanent Address</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.permanent_address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Current Address</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.current_location.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">City</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.current_location.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">State</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.current_location.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Pincode</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.current_location.pincode}</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#1C1C1C]">Additional Information</h4>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">1 field missing</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Preferred Language</span>
                <span className="text-sm text-[#1C1C1C] font-medium">{userData.preferred_language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#666]">Emergency Contact</span>
                <span className="text-sm text-orange-600 font-medium">Not provided</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrePatientProfile;