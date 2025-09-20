import React, { useState, useEffect } from 'react';
import { ArrowLeft, Navigation, Volume2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';

const MapNavigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackNavigation = () => {
    window.scrollTo(0, 0);
    navigate('/patient/dashboard2');
  };

  const handleViewAppointmentDetails = () => {
    window.scrollTo(0, 0);
    navigate('/patient/map-navigation2');
  };

  return (
    <div className="bg-gray-100 min-h-screen relative" style={{ scrollBehavior: 'smooth' }}>
      {/* Sidebar */}
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Map Background Area */}
      <div className="relative h-screen">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
          {/* Map Pattern Overlay */}
          <div className="absolute inset-0 opacity-30">
            {/* Road Lines */}
            <div className="absolute top-20 left-0 w-full h-1 bg-blue-400 transform rotate-12"></div>
            <div className="absolute top-40 left-0 w-full h-1 bg-blue-500 transform -rotate-6"></div>
            <div className="absolute top-60 left-0 w-full h-1 bg-blue-400 transform rotate-3"></div>
            
            {/* Area Labels */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-lg font-bold text-gray-800">KHIRA NAGAR</div>
              <div className="text-sm text-gray-600">खिरा नगर</div>
            </div>
            
            <div className="absolute top-1/3 right-8 text-center">
              <div className="text-lg font-bold text-gray-800">SANTACRUZ</div>
              <div className="text-lg font-bold text-gray-800">(WEST)</div>
              <div className="text-sm text-gray-600">सांताक्रूज़</div>
              <div className="text-sm text-gray-600">वेस्ट</div>
            </div>
            
            <div className="absolute bottom-1/3 left-8 text-center">
              <div className="text-lg font-bold text-gray-800">SANTACRUZ,</div>
              <div className="text-lg font-bold text-gray-800">MUMBAI</div>
              <div className="text-sm text-gray-600">सांताक्रूज़</div>
              <div className="text-sm text-gray-600">मुंबई</div>
            </div>
            
            <div className="absolute bottom-16 right-8 text-center">
              <div className="text-lg font-bold text-gray-800">KHAR WEST</div>
              <div className="text-sm text-gray-600">खार वेस्ट</div>
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 animate-fade-in">
          <button 
            onClick={handleBackNavigation}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-400 ease-in-out transform hover:scale-110 active:scale-95 btn-smooth"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex space-x-3">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-400 ease-in-out transform hover:scale-110 active:scale-95 btn-smooth">
              <Navigation className="w-6 h-6 text-gray-700" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-400 ease-in-out transform hover:scale-110 active:scale-95 btn-smooth">
              <Volume2 className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Route Line */}
        <div className="absolute top-1/2 left-4 w-3/4 h-1 bg-blue-600 transform -translate-y-1/2 rotate-12 z-10 shadow-lg"></div>

        {/* Clinic Location Pin */}
        <div className="absolute bottom-1/2 right-1/3 z-15">
          <div className="relative">
            {/* Purple pin */}
            <div className="w-8 h-8 bg-[#3B0DA3] rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            
            {/* Clinic Info Popup */}
            <div className="absolute -top-16 -left-16 bg-white rounded-lg p-3 shadow-xl min-w-48">
              <h4 className="font-semibold text-gray-900 text-sm">Chauhan Clinic</h4>
              <p className="text-xs text-gray-600">Dr. Ram Chauhan</p>
            </div>
          </div>
        </div>

        {/* Bottom Info Panel */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {/* Purple Route Line */}
          <div className="w-full h-1 bg-[#3B0DA3]"></div>
          
          {/* Info Card */}
          <div className="bg-white rounded-t-3xl px-6 py-6 shadow-2xl animate-slide-in-bottom">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">10 mins</h2>
                <p className="text-gray-600 text-sm">ETA • 0.9 km</p>
              </div>
              <div className="text-right">
                <p className="text-[#3B0DA3] font-semibold">Leave in</p>
                <p className="text-[#3B0DA3] font-bold text-xl">5 mins</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-600 text-sm">Current traffic</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">To be on time</p>
              </div>
            </div>
            
            {/* View Appointment Details Button */}
            <button 
              onClick={handleViewAppointmentDetails}
              className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl py-4 px-6 flex items-center justify-between transition-all duration-300 ease-in-out shadow-md hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-[#3B0DA3]" />
                <span className="font-semibold text-gray-900">View Appointment Details</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapNavigation;