import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Stethoscope, 
  DollarSign, 
  Clock, 
  Calendar,
  Star,
  Shield,
  Edit,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle,
  Building
} from 'lucide-react';
import { Sidebar } from './index';

const ViewDoctorProfile = () => {
  const navigate = useNavigate();

  // Mock doctor data - in real app this would come from API/props
  const [doctorData] = useState({
    // Basic Information
    fullName: 'Dr. Ram Chauhan',
    email: 'ram.chauhan@hospital.com',
    phone: '+91 98765 43210',
    registrationNumber: 'MH12345',
    specializations: ['Cardiology', 'Internal Medicine'],
    qualifications: ['MBBS', 'MD Cardiology', 'Fellowship in Interventional Cardiology'],
    yearsOfExperience: 15,
    consultationFee: 800,
    followUpFee: 400,
    
    // Availability
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    avgConsultationDuration: 20,
    maxDailyAppointments: 25,
    bufferTimeBetweenAppointments: 10,
    
    // Features
    acceptsInsurance: true,
    providesHomeVisits: false,
    emergencyAvailable: true,
    
    // Stats
    rating: 4.8,
    totalReviews: 156,
    totalPatients: 2150,
    isVerified: true,
    
    // Additional info
    clinic: 'Apollo Hospital, Mumbai',
    about: 'Experienced cardiologist with over 15 years of practice. Specializes in interventional cardiology and preventive cardiac care.',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  const handleEdit = () => {
    navigate('/doctor/profile');
  };

  const handleBack = () => {
    navigate('/doctor/dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Doctor Profile</h1>
                  <p className="text-gray-600">View and manage your professional information</p>
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-[#3B0DA3] text-white rounded-lg hover:bg-[#2F077C] transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            
            {/* Profile Header Card */}
            <div className="bg-white rounded-xl shadow-sm border mb-8">
              <div className="bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] h-32 rounded-t-xl relative">
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <img
                      src={doctorData.profileImage}
                      alt={doctorData.fullName}
                      className="w-32 h-32 rounded-full border-4 border-white object-cover"
                    />
                    {doctorData.isVerified && (
                      <div className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full border-2 border-white">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-20 p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-3xl font-bold text-gray-900">{doctorData.fullName}</h2>
                      {doctorData.isVerified && (
                        <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          <Shield className="w-4 h-4 mr-1" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    <p className="text-lg text-[#3B0DA3] font-medium mb-2">{doctorData.specializations.join(', ')}</p>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{doctorData.clinic}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{doctorData.yearsOfExperience} years exp.</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(doctorData.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-900">{doctorData.rating}</span>
                      <span className="text-gray-500">({doctorData.totalReviews} reviews)</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-[#3B0DA3]">{doctorData.totalPatients}</div>
                        <div className="text-sm text-gray-600">Patients</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-[#3B0DA3]">₹{doctorData.consultationFee}</div>
                        <div className="text-sm text-gray-600">Consultation</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {doctorData.about && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-700">{doctorData.about}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                    <User className="w-5 h-5 text-[#3B0DA3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-gray-900">{doctorData.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-gray-900">{doctorData.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Registration Number</div>
                      <div className="text-gray-900">{doctorData.registrationNumber}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Qualifications */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-[#3B0DA3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Qualifications</h3>
                </div>
                
                <div className="space-y-3">
                  {doctorData.qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#3B0DA3] rounded-full"></div>
                      <span className="text-gray-700">{qualification}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-[#3B0DA3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Specializations</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {doctorData.specializations.map((spec, index) => (
                    <div key={index} className="bg-[#3B0DA3] bg-opacity-10 text-[#3B0DA3] px-4 py-2 rounded-lg font-medium">
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Details */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-[#3B0DA3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Consultation Details</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Consultation Fee</div>
                    <div className="text-xl font-semibold text-gray-900">₹{doctorData.consultationFee}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Follow-up Fee</div>
                    <div className="text-xl font-semibold text-gray-900">₹{doctorData.followUpFee}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Duration</div>
                    <div className="text-lg font-semibold text-gray-900">{doctorData.avgConsultationDuration} min</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Daily Limit</div>
                    <div className="text-lg font-semibold text-gray-900">{doctorData.maxDailyAppointments} patients</div>
                  </div>
                </div>
              </div>

              {/* Working Schedule */}
              <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#3B0DA3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Working Schedule</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div
                      key={day}
                      className={`px-4 py-3 rounded-lg text-center text-sm font-medium ${
                        doctorData.workingDays.includes(day)
                          ? 'bg-[#3B0DA3] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Avg. Consultation</div>
                      <div className="font-semibold text-gray-900">{doctorData.avgConsultationDuration} minutes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Buffer Time</div>
                      <div className="font-semibold text-gray-900">{doctorData.bufferTimeBetweenAppointments} minutes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Max Daily Patients</div>
                      <div className="font-semibold text-gray-900">{doctorData.maxDailyAppointments}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Services */}
              <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#3B0DA3] bg-opacity-10 rounded-lg">
                    <Star className="w-5 h-5 text-[#3B0DA3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Additional Services</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${doctorData.acceptsInsurance ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-gray-700">Accept Insurance</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${doctorData.providesHomeVisits ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-gray-700">Home Visits</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${doctorData.emergencyAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-gray-700">Emergency Available</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom spacing for mobile */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorProfile;