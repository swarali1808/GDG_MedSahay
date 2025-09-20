import React, { useState, useEffect } from 'react';
import { Search, Mic, Clock, Calendar, FileText, User, Bell, Activity, Stethoscope, MessageCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import PatientSidebar
import PatientSidebar from './PatientSidebar';

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Dummy data for the dashboard
  const userName = "Richa";
  const activeAppointments = 2;
  const upcomingVisits = 1;
  
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
    <div className="bg-gray-50 min-h-screen">
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
        
        {/* AI Health Assistant */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xl mb-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-[#3B0DA3] rounded-full flex items-center justify-center mr-3 shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Health Assistant</h3>
              <p className="text-sm text-gray-600">Describe your symptoms</p>
            </div>
          </div>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Type your symptoms here or use voice input..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#3B0DA3] text-white p-2 rounded-lg shadow-lg">
              <Mic className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {commonSymptoms.map((symptom, index) => (
              <button
                key={index}
                className="bg-blue-100 text-[#3B0DA3] rounded-full px-4 py-1 text-sm font-medium shadow-md"
              >
                {symptom}
              </button>
            ))}
          </div>
          
          <Link 
            to="/patient/appointments"
            className="w-full bg-[#3B0DA3] text-white py-3 rounded-lg font-medium hover:bg-[#2F077C] transition-colors shadow-lg block text-center"
          >
            Book Appointment
          </Link>
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
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Upcoming Appointments</h2>
          </div>
          
          <div className="space-y-5">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3 shadow-lg">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                  <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.hospital}</p>
                  <p className="text-sm text-cyan-500 font-medium">{appointment.date}, {appointment.time}</p>
                </div>
              </div>
            ))}
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
                <button className="bg-[#3B0DA3] text-white py-1 px-3 rounded-md text-xs font-medium shadow-lg">
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

export default PatientDashboard;