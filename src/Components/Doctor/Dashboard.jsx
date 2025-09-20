import React, { useState } from 'react';
import { 
  LuLayoutDashboard, 
  LuCalendarClock, 
  LuFileText, 
  LuUsers,
  LuSettings, 
  LuLogOut,
  LuSearch,
  LuBell,
  LuChevronLeft,
  LuChevronRight,
  LuChevronDown
} from 'react-icons/lu';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

// Main Dashboard Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePatient, setActivePatient] = useState('DW');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric'
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#3B0DA3]">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Visit statistics */}
              <VisitStatistics />
              
              {/* Patient list and Consultation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <PatientList activePatient={activePatient} setActivePatient={setActivePatient} />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <ConsultationView patientId={activePatient} />
                </div>
              </div>
            </div>
            
            {/* Right column - sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <CalendarWidget date={formattedDate} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <UpcomingEvents />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <WorkPlanStatus />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <div className="flex-1 flex md:ml-0">
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LuSearch className="h-5 w-5" />
                </div>
                <input
                  id="search-field"
                  className="block w-full h-full pl-10 pr-3 py-2 border-transparent bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent text-sm rounded-lg"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-4 md:ml-6">
            {/* Notification bell */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
              <LuBell className="h-6 w-6" />
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <img 
                  className="h-8 w-8 rounded-full border-2 border-gray-200"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Dr. Ram" 
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Dr. Ram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// VisitStatistics Component
const VisitStatistics = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-[#3B0DA3] rounded-lg shadow overflow-hidden">
      <div className="flex flex-col md:flex-row p-6 text-white">
        <div className="flex-1 mb-4 md:mb-0">
          <div>
            <h2 className="text-xl font-bold mb-4">Good Morning <span className="text-2xl">Dr. Ram Sharma!</span></h2>
            <div className="mb-6">
              <p className="text-lg font-medium">Visits for Today</p>
              <p className="text-6xl font-bold mt-2">104</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1">
                <p className="text-sm">New Patients</p>
                <p className="text-3xl font-bold">40</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  51% <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1">
                <p className="text-sm">Old Patients</p>
                <p className="text-3xl font-bold">64</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  20% <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Doctor" 
            className="h-40 w-40 object-cover rounded-full border-4 border-white border-opacity-30"
          />
        </div>
      </div>
    </div>
  );
};

// Calendar Component
const CalendarWidget = ({ date }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const days = generateCalendarDays();
  const highlightedDates = [8, 14]; // Dates with appointments
  
  function generateCalendarDays() {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Calendar</h3>
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <LuChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm">{date}</span>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <LuChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="text-xs font-medium text-gray-500">{day}</div>
        ))}
        
        {/* Fill in empty days at the beginning */}
        {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        
        {/* Calendar days */}
        {days.map((day) => {
          const isToday = day === 14; // Match the image where day 14 is highlighted
          const hasAppointment = highlightedDates.includes(day);
          
          return (
            <div key={day} className="relative flex justify-center">
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full text-sm
                ${isToday ? 'bg-[#3B0DA3] text-white' : ''}
              `}>
                {day}
              </div>
              {hasAppointment && !isToday && (
                <div className="absolute bottom-0 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              )}
              {hasAppointment && isToday && (
                <div className="absolute bottom-0 w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Patient List Component
const PatientList = ({ activePatient, setActivePatient }) => {
  const patients = [
    {
      id: 'DW', 
      name: 'Denzel White', 
      time: '9:00 AM', 
      type: 'Report', 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-800'
    },
    {
      id: 'SM', 
      name: 'Stacy Mitchell', 
      time: '9:15 AM', 
      type: 'Weekly Visit',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800'
    },
    {
      id: 'AD', 
      name: 'Amy Dunham', 
      time: '9:30 AM', 
      type: 'Routine Checkup',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      id: 'DJ', 
      name: 'Demi Joan', 
      time: '9:50 AM', 
      type: 'Report',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    {
      id: 'SM2', 
      name: 'Susan Myers', 
      time: '10:15 AM', 
      type: 'Weekly Visit',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800'
    }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Patient List</h3>
        <div className="relative">
          <button className="flex items-center space-x-1 text-sm bg-gray-100 px-3 py-1 rounded-md">
            <span>Today</span>
            <LuChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3 mt-4">
        {patients.map((patient) => (
          <div 
            key={patient.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer ${
              activePatient === patient.id ? 'bg-gray-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setActivePatient(patient.id)}
          >
            <div className={`h-10 w-10 ${patient.bgColor} ${patient.textColor} rounded-full flex items-center justify-center font-medium mr-3`}>
              {patient.id}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">{patient.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  patient.time.includes('9:') ? 'bg-cyan-100 text-cyan-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {patient.time}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{patient.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Consultation View Component
const ConsultationView = ({ patientId }) => {
  // This would be fetched based on the patientId in a real app
  const patientData = {
    id: 'DW',
    name: 'Denzel White',
    age: '28 Years 3 Months',
    gender: 'Male',
    symptoms: [
      { id: 1, name: 'Fever', iconColor: 'text-blue-600' },
      { id: 2, name: 'Cough', iconColor: 'text-blue-600' },
      { id: 3, name: 'Heart Burn', iconColor: 'text-blue-600' }
    ],
    lastChecked: {
      doctor: 'Dr Evenly',
      date: '21 April 2021',
      prescription: '#27896TD'
    },
    observation: 'High fever and cough at normal hemoglobin levels.',
    prescription: 'Paracetamol - 2 times a day\nDiazepam - Day and Night before meal\nWizayl'
  };
  
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Consultation</h3>
      
      {patientId === 'DW' ? (
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-medium mr-3">
                {patientData.id}
              </div>
              <div>
                <h4 className="font-medium">{patientData.name}</h4>
                <p className="text-xs text-gray-500">{patientData.gender} - {patientData.age}</p>
              </div>
            </div>
            <button className="text-gray-500">
              <HiDotsHorizontal />
            </button>
          </div>
          
          {/* Symptoms */}
          <div className="flex space-x-4 mb-6">
            {patientData.symptoms.map(symptom => (
              <div key={symptom.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 ${symptom.iconColor} bg-blue-100 rounded-full flex items-center justify-center mb-1`}>
                  {symptom.id === 1 && <div className="h-3 w-3 bg-red-500 rounded-full"></div>}
                  {symptom.id === 2 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8H19C20.1 8 21 8.9 21 10V14C21 15.1 20.1 16 19 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 8H17V16H3C2.4 16 2 15.6 2 15V9C2 8.4 2.4 8 3 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {symptom.id === 3 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 8L12 4L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 16L12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs">{symptom.name}</span>
              </div>
            ))}
          </div>
          
          {/* Last Checked */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Last Checked</span>
              <span className="text-gray-500">{patientData.lastChecked.doctor} on {patientData.lastChecked.date}</span>
            </div>
            <div className="text-sm text-gray-500">
              Prescription {patientData.lastChecked.prescription}
            </div>
          </div>
          
          {/* Observation */}
          <div className="mb-4">
            <h5 className="font-medium text-sm mb-1">Observation</h5>
            <p className="text-sm text-gray-600">{patientData.observation}</p>
          </div>
          
          {/* Prescription */}
          <div>
            <h5 className="font-medium text-sm mb-1">Prescription</h5>
            <p className="text-sm text-gray-600 whitespace-pre-line">{patientData.prescription}</p>
          </div>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Select a patient to view details</p>
        </div>
      )}
    </div>
  );
};

// Upcoming Events Component
const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Monthly doctor's meet",
      date: "8 August, 2025",
      time: "04:00 PM",
      avatarText: "M",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800"
    }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Upcoming</h3>
        <a href="#" className="text-xs text-[#3B0DA3] hover:underline">View All</a>
      </div>
      
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2">
              <div className={`h-10 w-10 ${event.bgColor} rounded-full flex items-center justify-center ${event.textColor} font-medium mr-3`}>
                {event.avatarText}
              </div>
              <div>
                <h5 className="font-medium text-sm">{event.title}</h5>
                <p className="text-xs text-gray-500 mt-1">
                  {event.date} | {event.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
      )}
    </div>
  );
};

// Work Plan Status Component
const WorkPlanStatus = () => {
  const workPlanData = [
    { id: 1, title: 'Consultations', percentage: 75, color: 'bg-emerald-500' },
    { id: 2, title: 'Analysis', percentage: 60, color: 'bg-indigo-500' },
    { id: 3, title: 'Meetings', percentage: 90, color: 'bg-cyan-500' }
  ];
  
  const totalCompletion = 72;
  
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Work Plan Status</h3>
      
      <div className="space-y-4">
        {workPlanData.map(item => (
          <div key={item.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{item.title}</span>
              <span className="text-gray-800 font-medium">{item.percentage}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Today's Completion */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Today's Completion</p>
        </div>
        <div className="relative h-14 w-14">
          {/* Circular progress indicator */}
          <svg className="w-full h-full" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle 
              cx="18" 
              cy="18" 
              r="15" 
              fill="none" 
              className="stroke-current text-gray-100" 
              strokeWidth="3"
            />
            
            {/* Progress arc */}
            <circle 
              cx="18" 
              cy="18" 
              r="15" 
              fill="none" 
              className="stroke-current text-[#3B0DA3]" 
              strokeWidth="3"
              strokeDasharray="94.2"
              strokeDashoffset={94.2 - (94.2 * totalCompletion / 100)}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
            
            {/* Percentage text */}
            <text 
              x="18" 
              y="18" 
              dominantBaseline="central" 
              textAnchor="middle" 
              className="text-[#3B0DA3] font-bold text-sm"
            >
              {totalCompletion}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;