import React from 'react';
import { Search, Mic, Clock, Calendar, FileText } from 'lucide-react';

// Import PNavbar from the correct location
// Based on the file structure, PNavbar is in Doctor/Patient folder
import PNavbar from '../Doctor/Patient/PNavbar';

const PatientDashboard = () => {
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
      {/* Custom Navbar for Mobile - to match design exactly */}
      <div className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button className="p-2">
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
      
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <PNavbar />
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-3 pb-20 max-w-md mx-auto lg:max-w-3xl xl:max-w-4xl">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search doctors, appointments..."
            className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        {/* Greeting Card */}
        <div className="bg-[#3B0DA3] text-white rounded-2xl p-5 flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold">Good Morning, {userName}!</h2>
            <p className="text-white text-opacity-80">How are you feeling today?</p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
            {/* User avatar with doctor icon matching design */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
        
        {/* AI Health Assistant */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-[#3B0DA3] rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
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
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#3B0DA3] text-white p-2 rounded-lg">
              <Mic className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {commonSymptoms.map((symptom, index) => (
              <button
                key={index}
                className="bg-blue-100 text-[#3B0DA3] rounded-full px-4 py-1 text-sm font-medium"
              >
                {symptom}
              </button>
            ))}
          </div>
          
          <button className="w-full bg-[#3B0DA3] text-white py-3 rounded-lg font-medium hover:bg-[#2F077C] transition-colors">
            Book Appointment
          </button>
        </div>
        
        {/* Health Overview */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">Health Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-cyan-500" />
            </div>
            <h3 className="text-3xl font-bold">{activeAppointments}</h3>
            <p className="text-gray-600 text-sm text-center">Active Appointments</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-3xl font-bold">{upcomingVisits}</h3>
            <p className="text-gray-600 text-sm text-center">Upcoming Visits</p>
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Upcoming Appointments</h2>
          </div>
          
          <div className="space-y-5">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
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
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recently Visited</h2>
            <a href="#" className="text-sm text-cyan-500 font-medium">View All</a>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {recentlyVisited.map(doctor => (
              <div key={doctor.id} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gray-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1 text-center">{doctor.name}</p>
                <button className="bg-[#3B0DA3] text-white py-1 px-3 rounded-md text-xs font-medium">
                  Rebook
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Notifications & Reminders */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications & Reminders</h2>
          
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className="p-4 bg-blue-50 rounded-xl flex items-start">
                <div className={`p-2 rounded-lg mr-3 ${
                  notification.type === "reminder" ? "bg-blue-100" : "bg-green-100"
                }`}>
                  {notification.type === "reminder" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                      <line x1="9" y1="9" x2="10" y2="9"></line>
                      <line x1="9" y1="13" x2="15" y2="13"></line>
                      <line x1="9" y1="17" x2="15" y2="17"></line>
                    </svg>
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
        
        {/* Bottom navigation spacer for mobile */}
        <div className="h-16 lg:hidden"></div>
      </div>
      
      {/* Mobile Bottom Navigation - matches the design */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 z-10">
        <a href="/patient/dashboard" className="flex flex-col items-center py-1 px-3 text-[#3B0DA3]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs mt-1 font-medium">Home</span>
        </a>
        <a href="/patient/appointments" className="flex flex-col items-center py-1 px-3 text-gray-500">
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Appointments</span>
        </a>
        <a href="/patient/reports" className="flex flex-col items-center py-1 px-3 text-gray-500">
          <FileText className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Reports</span>
        </a>
        <a href="/patient/chat" className="flex flex-col items-center py-1 px-3 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span className="text-xs mt-1 font-medium">Chat</span>
        </a>
      </div>
    </div>
  );
};

export default PatientDashboard;