import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Navigation2, X, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MapNavigation2 = () => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackNavigation = () => {
    window.scrollTo(0, 0);
    navigate('/patient/map-navigation');
  };

  const handleClose = () => {
    window.scrollTo(0, 0);
    navigate('/patient/map-navigation');
  };

  const handleStartNavigation = () => {
    // Handle start navigation logic here
    console.log('Starting navigation...');
  };

  // Handle touch events for swipe down
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - dragY;
    
    if (deltaY > 0) { // Only allow downward dragging
      const panel = e.currentTarget;
      panel.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    const panel = e.currentTarget;
    const transform = panel.style.transform;
    const translateY = transform ? parseInt(transform.match(/translateY\((\d+)px\)/)?.[1] || 0) : 0;
    
    if (translateY > 100) { // If dragged down more than 100px, close
      handleClose();
    } else { // Otherwise, snap back
      panel.style.transform = 'translateY(0px)';
    }
    
    setIsDragging(false);
    setDragY(0);
  };

  return (
    <div className="bg-gray-100 min-h-screen relative" style={{ scrollBehavior: 'smooth' }}>
      {/* Map Background - Same as MapNavigation */}
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
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4">
          <button 
            onClick={handleBackNavigation}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Appointment Details Modal */}
        <div 
          className="absolute bottom-0 left-4 right-4 z-30 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out mb-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            {/* Token Number Card */}
            <div className="bg-[#3B0DA3] rounded-2xl p-6 mb-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white text-opacity-80 text-sm mb-1">Your Token Number</p>
                  <h2 className="text-4xl font-bold">A-23</h2>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm">On Track</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-opacity-80 text-sm mb-1">Expected Time</p>
                  <h3 className="text-2xl font-bold">10:55 am</h3>
                </div>
              </div>
            </div>

            {/* Queue Status */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Queue Status</h3>
              
              <div className="space-y-3">
                {/* Currently Serving */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      12
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Currently Serving</p>
                      <p className="text-sm text-gray-600">A-12 - Ramesh Kumar</p>
                    </div>
                  </div>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Active</span>
                </div>

                {/* Next Up */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      13
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Next Up</p>
                      <p className="text-sm text-gray-600">Token A-14</p>
                    </div>
                  </div>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Ready</span>
                </div>

                {/* After Next */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      14
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">After Next</p>
                      <p className="text-sm text-gray-600">Token A-15</p>
                    </div>
                  </div>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Waiting</span>
                </div>

                {/* Your Turn */}
                <div className="bg-[#3B0DA3] rounded-xl p-4 flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold text-sm">
                      15
                    </div>
                    <div>
                      <p className="font-semibold">You</p>
                      <p className="text-sm text-white text-opacity-80">3rd in position</p>
                    </div>
                  </div>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-semibold">Your Turn</span>
                </div>
              </div>
            </div>

            {/* Leave Home By */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-6 h-6 text-cyan-600" />
                <h4 className="font-semibold text-gray-900">Leave Home By</h4>
              </div>
              <p className="text-2xl font-bold text-cyan-600 mb-1">9:45 am</p>
              <p className="text-sm text-gray-600">To reach on time for your appointment</p>
            </div>

            {/* Clinic Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Clinic Information</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-[#3B0DA3] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🏥</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Chauhan Clinic</h4>
                    <p className="text-sm text-gray-600">Dr. Ram Chauhan - Cardiologist</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 mb-4">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mt-1"></div>
                  <p className="text-sm text-gray-600">123 Health Street, SVP Road, City 12345</p>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                  <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg">
                    <Navigation2 className="w-4 h-4" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg">
                <X className="w-5 h-5" />
                <span>Cancel Appointment</span>
              </button>
              
              <button className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg">
                <Calendar className="w-5 h-5" />
                <span>Reschedule</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex space-x-3">
              <button 
                onClick={handleClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Close
              </button>
              <button 
                onClick={handleStartNavigation}
                className="flex-1 bg-[#3B0DA3] hover:bg-[#2F077C] text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Start Navigation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapNavigation2;