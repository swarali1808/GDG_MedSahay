import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Eye, MapPin, Calendar, CreditCard, Clock, User, Check, Stethoscope, AlertCircle } from 'lucide-react';
import PatientSidebar from './PatientSidebar';

const ConfirmationApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking data from location state or default
  const bookingData = location.state || {
    doctor: {
      name: "Dr. Ram Chauhan",
      qualifications: "MBBS, MD - Cardiology",
      specialty: "Cardiologist",
      clinic: "Chauhan Clinic",
      price: "Rs. 450/-"
    },
    date: new Date(),
    timeSlot: 'morning'
  };

  // Generate token number and estimated time based on time slot
  const generateBookingDetails = (timeSlot) => {
    const tokenNumbers = {
      morning: 'A - 23',
      afternoon: 'B - 15',
      evening: 'C - 8'
    };

    const estimatedTimes = {
      morning: '10:05 am',
      afternoon: '2:30 pm',
      evening: '6:45 pm'
    };

    return {
      tokenNumber: tokenNumbers[timeSlot] || 'A - 23',
      estimatedTime: estimatedTimes[timeSlot] || '10:05 am'
    };
  };

  const bookingDetails = generateBookingDetails(bookingData.timeSlot);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format date
  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  // Logo component
  const MedSahayLogo = () => (
    <div className="flex items-center space-x-1">
      <div className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-cyan-400">
          <path
            d="M6 12 L9 9 L12 15 L15 6 L18 12"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full"></div>
      </div>
      <span className="text-xl font-semibold">
        <span className="text-cyan-400">Med</span>
        <span className="text-[#3B0DA3]">Sahay</span>
      </span>
    </div>
  );

  const handleBackToHome = () => {
    window.scrollTo(0, 0);
    navigate('/patient/dashboard2');
  };

  const handleViewAppointment = () => {
    window.scrollTo(0, 0);
    // Navigate to appointments page to view the booked appointment
    navigate('/patient/appointments');
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      {/* Sidebar */}
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-lg px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button 
          className="p-2 focus:outline-none" 
          onClick={() => setSidebarOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        
        <MedSahayLogo />
        
        <div className="flex items-center space-x-2">
          <button className="relative p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-1">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto lg:max-w-2xl xl:max-w-3xl">
        {/* Success Header */}
        <div className="bg-[#3B0DA3] rounded-2xl p-8 mb-6 text-center text-white">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Check className="w-7 h-7 text-[#3B0DA3]" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-white text-opacity-90">Your appointment has been successfully booked</p>
          
          {/* Quick Action Icons */}
          <div className="flex justify-center space-x-6 mt-6">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          {/* Doctor Info */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{bookingData.doctor.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{bookingData.doctor.qualifications}</p>
              <div className="flex items-center">
                <Stethoscope className="w-4 h-4 text-cyan-500 mr-2" />
                <span className="text-sm font-medium text-[#3B0DA3]">{bookingData.doctor.specialty}</span>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            {/* Clinic Location */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{bookingData.doctor.clinic}</h4>
                <p className="text-sm text-gray-600">123 Health Street, SVP Road</p>
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{formatDate(bookingData.date)}</h4>
                <p className="text-sm text-gray-600">{bookingDetails.estimatedTime}</p>
              </div>
            </div>

            {/* Token Number */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Token Number</h4>
                <p className="text-sm text-gray-600">{bookingDetails.tokenNumber}</p>
              </div>
            </div>

            {/* Consultation Fee */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Consultation Fee</h4>
                <p className="text-sm text-gray-600">{bookingData.doctor.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-orange-50 rounded-2xl p-5 mb-8 border border-orange-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">Important Notes</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Please arrive 15 minutes before your appointment</li>
                <li>• Bring your medical records and insurance card</li>
                <li>• You can reschedule up to 24 hours in advance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pb-8">
          <button 
            onClick={handleBackToHome}
            className="w-full py-4 rounded-xl font-semibold text-lg bg-[#3B0DA3] text-white hover:bg-[#2F077C] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <button 
            onClick={handleViewAppointment}
            className="w-full py-3 rounded-xl font-medium text-[#3B0DA3] border-2 border-[#3B0DA3] hover:bg-[#3B0DA3] hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>View Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationApp;