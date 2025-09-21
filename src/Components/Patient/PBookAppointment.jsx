import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, User, Star, Sun, CloudSun, Moon, Stethoscope, DollarSign } from 'lucide-react';
import PatientSidebar from './PatientSidebar';

const PBookAppointment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get doctor data from location state or default
  const doctorData = location.state?.doctor || {
    id: 1,
    name: "Dr. Ram Chauhan",
    qualifications: "MBBS, MD - Cardiology",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 120,
    price: "Rs. 450/-",
    clinic: "Chauhan Clinic"
  };

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Time slots data with longer durations
  const timeSlots = [
    { 
      id: 'morning',
      title: 'Morning',
      duration: '9 AM to 12 PM',
      available: true,
      icon: <Sun className="w-6 h-6 text-yellow-500" />
    },
    { 
      id: 'afternoon',
      title: 'Afternoon',
      duration: '1 PM to 4 PM',
      available: true,
      icon: <CloudSun className="w-6 h-6 text-orange-500" />
    },
    { 
      id: 'evening',
      title: 'Evening',
      duration: '5 PM to 10 PM',
      available: true,
      icon: <Moon className="w-6 h-6 text-purple-500" />
    }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set default selected time slot
    setSelectedTimeSlot('morning');
  }, []);

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const selectDate = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const isToday = (day) => {
    const today = new Date();
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate.toDateString() === today.toDateString();
  };

  const isSelected = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate.toDateString() === selectedDate.toDateString();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Day headers
    const dayHeaders = dayNames.map(day => (
      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
        {day}
      </div>
    ));

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center py-2 text-gray-400">
          {new Date(currentDate.getFullYear(), currentDate.getMonth(), -firstDay + i + 1).getDate()}
        </div>
      );
    }

    // Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day);
      const isSelectedDay = isSelected(day);
      
      days.push(
        <button
          key={day}
          onClick={() => selectDate(day)}
          className={`text-center py-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
            isSelectedDay
              ? 'bg-[#3B0DA3] text-white'
              : isCurrentDay
              ? 'bg-blue-100 text-blue-600 font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-7 gap-1">
          {dayHeaders}
          {days}
        </div>
      </div>
    );
  };

  const handleContinueBooking = () => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    // Navigate to confirmation page with booking details
    navigate('/patient/confirmation', {
      state: {
        doctor: doctorData,
        date: selectedDate,
        timeSlot: selectedTimeSlot
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      {/* Sidebar */}
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-lg px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button 
          className="p-2 focus:outline-none" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        
        <h1 className="text-lg font-bold text-gray-900">Select Date & Time</h1>
        
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200"
            onClick={() => navigate('/patient/profile')}
            title="View Profile"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#3B0DA3] to-[#2F077C] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
          
          <button 
            className="p-2 focus:outline-none" 
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto lg:max-w-2xl xl:max-w-3xl">
        {/* Doctor Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 mb-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            {/* Doctor Avatar */}
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            
            {/* Doctor Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{doctorData.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{doctorData.qualifications}</p>
              
              {/* Specialty */}
              <div className="flex items-center mb-2">
                <Stethoscope className="w-4 h-4 text-cyan-500 mr-2" />
                <span className="text-sm font-medium text-[#3B0DA3]">{doctorData.specialty}</span>
              </div>
              
              {/* Clinic */}
              <p className="text-sm text-gray-600 mb-2">{doctorData.clinic}</p>
              
              {/* Rating and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{doctorData.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({doctorData.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-700 mr-1" />
                  <span className="text-sm font-bold text-gray-700">{doctorData.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Select Date Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Date</h2>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h3 className="text-lg font-semibold text-gray-800">
              {formatDate(currentDate)}
            </h3>
            
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Calendar */}
          {renderCalendar()}
        </div>

        {/* Available Time Slots Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Available Time Slots</h2>
          
          <div className="space-y-4">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                disabled={!slot.available}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-400 ease-in-out border-2 transform hover:scale-105 active:scale-95 btn-smooth ${
                  selectedTimeSlot === slot.id
                    ? 'bg-[#3B0DA3] text-white border-[#3B0DA3] shadow-lg'
                    : slot.available
                    ? 'bg-white text-gray-700 border-gray-200 hover:border-[#3B0DA3] hover:shadow-md'
                    : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{slot.icon}</span>
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        selectedTimeSlot === slot.id ? 'text-white' : 'text-gray-800'
                      }`}>
                        {slot.title}
                      </h3>
                      <p className={`text-sm ${
                        selectedTimeSlot === slot.id ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {slot.duration}
                      </p>
                    </div>
                  </div>
                  {selectedTimeSlot === slot.id && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#3B0DA3] rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="space-y-4 pb-8">
          <button 
            onClick={handleContinueBooking}
            disabled={!selectedTimeSlot}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-400 ease-in-out transform hover:scale-105 active:scale-95 btn-smooth ${
              selectedTimeSlot
                ? 'bg-[#3B0DA3] text-white hover:bg-[#2F077C] shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Booking
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-xl font-medium text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Back to Doctor Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default PBookAppointment;