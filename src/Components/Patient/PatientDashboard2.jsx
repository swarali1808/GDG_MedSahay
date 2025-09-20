import React, { useState, useEffect } from 'react';
import { Search, Mic, Clock, Calendar, FileText, User, Bell, Activity, Map, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import PatientSidebar
import PatientSidebar from './PatientSidebar';

const PatientDashboard2 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMapNavigation = () => {
    window.scrollTo(0, 0);
    navigate('/patient/map-navigation');
  };
  
  // Dummy data for the dashboard
  const userName = "Richa";
  const activeAppointments = 1;
  const upcomingVisits = 2;
  
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Ram Chauhan",
      specialty: "Cardiology",
      hospital: "City Hospital",
      date: "Today",
      time: "2:30 PM"
    },
    {
      id: 2,
      doctor: "Dr. Swati D.",
      specialty: "Dermatology",
      hospital: "Metro Clinic",
      date: "Tomorrow",
      time: "10:00 AM"
    }
  ];
  
  const recentlyVisited = [
    { id: 1, name: "Dr. Hiren" },
    { id: 2, name: "Dr. Diya" },
    { id: 3, name: "Dr. Radha" }
  ];
  
  const notifications = [
    {
      id: 1,
      type: "reminder",
      title: "Medicine Reminder",
      message: "Take your morning medication",
      icon: "notification"
    },
    {
      id: 2,
      type: "lab",
      title: "Lab Results Ready",
      message: "Blood test results available",
      icon: "lab"
    }
  ];
  
  // Common symptoms for quick selection
  const commonSymptoms = ["Fever", "Cough", "Headache", "Fatigue"];

  // Custom logo component to match the design
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
          <button 
            onClick={() => navigate('/patient/pre-profile')}
            className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#3B0DA3] to-[#2F077C] rounded-full hover:from-[#2F077C] hover:to-[#3B0DA3] transition-all duration-300 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto lg:max-w-3xl xl:max-w-4xl">
        {/* Search Bar */}
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Search doctors, appointments..."
            className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        {/* Greeting Card */}
        <div className="bg-[#3B0DA3] text-white rounded-2xl p-5 flex justify-between items-center mb-5 shadow-xl">
          <div>
            <h2 className="text-xl font-bold">Good Morning, {userName}!</h2>
            <p className="text-white text-opacity-80">How are you feeling today?</p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <User className="w-7 h-7 text-white" />
          </div>
        </div>
        
        {/* Live Token Status */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#3B0DA3] shadow-xl mb-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Live Token Status</h3>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">LIVE</span>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-[#3B0DA3] mb-2">A-23</div>
            <p className="text-gray-600 text-sm mb-4">Your current token number</p>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1">Estimated reaching time</p>
              <p className="text-xl font-bold text-gray-800">in 15 minutes</p>
            </div>
          </div>
        </div>
        
        {/* Check on Maps */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden">
          {/* Map Background Pattern - Simplified version */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full">
              {/* Simple map-like pattern */}
              <div className="absolute top-4 left-6 w-16 h-12 bg-white bg-opacity-30 rounded"></div>
              <div className="absolute top-8 right-8 w-12 h-8 bg-white bg-opacity-20 rounded"></div>
              <div className="absolute bottom-6 left-12 w-20 h-10 bg-white bg-opacity-25 rounded"></div>
              <div className="absolute bottom-4 right-6 w-14 h-6 bg-white bg-opacity-30 rounded"></div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Check on Maps</h3>
                <p className="text-blue-100 text-sm">View traffic conditions to clinic</p>
              </div>
              <Map className="w-8 h-8 text-white" />
            </div>
            
            <button 
              onClick={handleMapNavigation}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Open in Google Maps
            </button>
          </div>
        </div>
        
        {/* Health Overview */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">Health Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-xl">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-2 shadow-lg">
              <Calendar className="h-5 w-5 text-cyan-500" />
            </div>
            <h3 className="text-3xl font-bold">{activeAppointments}</h3>
            <p className="text-gray-600 text-sm text-center">Active Appointments</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-xl">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 shadow-lg">
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-3xl font-bold">{upcomingVisits}</h3>
            <p className="text-gray-600 text-sm text-center">Upcoming Visits</p>
          </div>
        </div>
        
        {/* Recently Visited */}
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recently Visited</h2>
            <a href="#" className="text-sm text-cyan-500 font-medium">View All</a>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {recentlyVisited.map(doctor => (
              <div key={doctor.id} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1 text-center">{doctor.name}</p>
                <button className="bg-[#3B0DA3] text-white py-1 px-3 rounded-md text-xs font-medium shadow-lg hover:bg-[#2F077C] transition-colors">
                  Rebook
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Notifications & Reminders */}
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications & Reminders</h2>
          
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className="p-4 bg-blue-50 rounded-xl flex items-start shadow-lg">
                <div className={`p-2 rounded-lg mr-3 shadow-md ${
                  notification.type === "reminder" ? "bg-blue-100" : "bg-green-100"
                }`}>
                  {notification.type === "reminder" ? (
                    <Bell className="h-5 w-5 text-blue-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard2;