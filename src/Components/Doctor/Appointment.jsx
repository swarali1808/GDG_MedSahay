import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LuSearch,
  LuBell,
  LuChevronLeft,
  LuChevronRight,
  LuClock,
  LuUserCheck,
  LuActivity,
  LuCheck,
  LuCalendarClock,
  LuFileText
} from 'react-icons/lu';
import Sidebar from './Sidebar';

// Status mapping for visual representation
const statusColors = {
  "Not Arrived": "#516E9C",
  "Queued": "#FFC525", 
  "Ongoing": "#07A537",
  "Completed": "#3B82F6",
  "Delayed": "#EA4335",
};

// Main Appointment Component
const Appointment = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Static appointment data
  const appointments = {
    notArrived: [
      {
        _id: "1",
        appointment_token: "A-105",
        patient_name: "Rahul Sharma",
        patient_age: 28,
        region: "Mumbai",
        status: "Not Arrived",
        appointment_time: "9:00 AM",
        patient_phone: "+91 9876543210",
        emergency: false
      },
      {
        _id: "2", 
        appointment_token: "A-106",
        patient_name: "Priya Patel",
        patient_age: 34,
        region: "Pune",
        status: "Not Arrived",
        appointment_time: "9:30 AM",
        patient_phone: "+91 9876543211",
        emergency: false
      },
      {
        _id: "3",
        appointment_token: "A-107", 
        patient_name: "Amit Kumar",
        patient_age: 45,
        region: "Delhi",
        status: "Not Arrived",
        appointment_time: "10:00 AM",
        patient_phone: "+91 9876543212",
        emergency: true
      }
    ],
    queued: [
      {
        _id: "4",
        appointment_token: "A-102",
        patient_name: "Sunita Reddy",
        patient_age: 52,
        region: "Hyderabad",
        status: "Queued", 
        appointment_time: "8:30 AM",
        patient_phone: "+91 9876543213",
        emergency: false
      },
      {
        _id: "5",
        appointment_token: "A-103",
        patient_name: "Vikram Singh",
        patient_age: 29,
        region: "Mumbai",
        status: "Queued",
        appointment_time: "8:45 AM", 
        patient_phone: "+91 9876543214",
        emergency: false
      }
    ],
    ongoing: [
      {
        _id: "6",
        appointment_token: "A-101",
        patient_name: "Meera Shah",
        patient_age: 38,
        region: "Mumbai", 
        status: "Ongoing",
        appointment_time: "8:00 AM",
        patient_phone: "+91 9876543215",
        emergency: false
      }
    ],
    completed: [
      {
        _id: "7",
        appointment_token: "A-098",
        patient_name: "Rajesh Kumar",
        patient_age: 42,
        region: "Pune",
        status: "Completed",
        appointment_time: "7:30 AM",
        patient_phone: "+91 9876543216", 
        emergency: false
      },
      {
        _id: "8",
        appointment_token: "A-099",
        patient_name: "Kavita Joshi",
        patient_age: 31,
        region: "Mumbai",
        status: "Completed",
        appointment_time: "7:45 AM",
        patient_phone: "+91 9876543217",
        emergency: false
      },
      {
        _id: "9",
        appointment_token: "A-100", 
        patient_name: "Deepak Agarwal",
        patient_age: 55,
        region: "Delhi",
        status: "Completed",
        appointment_time: "8:15 AM",
        patient_phone: "+91 9876543218",
        emergency: false
      }
    ]
  };

  // Handle appointment status updates
  const updateAppointmentStatus = (appointmentId, isForward) => {
    console.log(`${isForward ? 'Advancing' : 'Reversing'} appointment ${appointmentId}`);
    // In real app, this would make API call
  };

  const viewPatientProfile = (patientId, appointmentId) => {
    // Navigate to patient profile page with the patient's ID
    // Extract patient ID from appointment data to match PatientProfile routing
    const allAppointments = [
      ...appointments.notArrived,
      ...appointments.queued,
      ...appointments.ongoing,
      ...appointments.completed
    ];
    
    const appointment = allAppointments.find(apt => apt._id === appointmentId);
    if (appointment) {
      // Create a consistent patient ID format for routing
      let patientRouteId = '';
      switch(appointment.patient_name) {
        case 'Rahul Sharma':
          patientRouteId = 'patient-1';
          break;
        case 'Priya Patel':
          patientRouteId = 'patient-2';
          break;
        case 'Amit Kumar':
          patientRouteId = 'patient-3';
          break;
        case 'Sunita Reddy':
          patientRouteId = 'patient-4';
          break;
        case 'Vikram Singh':
          patientRouteId = 'patient-5';
          break;
        case 'Meera Shah':
          patientRouteId = 'patient-6';
          break;
        case 'Rajesh Kumar':
          patientRouteId = 'patient-7';
          break;
        case 'Kavita Joshi':
          patientRouteId = 'patient-8';
          break;
        case 'Deepak Agarwal':
          patientRouteId = 'patient-9';
          break;
        default:
          patientRouteId = 'patient-1';
      }
      navigate(`/doctor/patient/${patientRouteId}`);
    }
  };

  const filterAppointments = (appointmentList) => {
    if (!searchTerm) return appointmentList;
    return appointmentList.filter(
      (appointment) =>
        appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.appointment_token.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric',
    day: 'numeric'
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
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} selectedDate={selectedDate} setSelectedDate={setSelectedDate} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left column - main content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Appointment statistics */}
              <AppointmentStatistics appointments={appointments} />
              
              {/* Appointment Lists */}
              <div className="space-y-6">
                <AppointmentList 
                  title="Not Arrived Appointments"
                  appointmentList={appointments.notArrived}
                  statusColor={statusColors["Not Arrived"]}
                  updateAppointmentStatus={updateAppointmentStatus}
                  viewPatientProfile={viewPatientProfile}
                  filterAppointments={filterAppointments}
                />
                
                <AppointmentList 
                  title="Queued Appointments"
                  appointmentList={appointments.queued}
                  statusColor={statusColors["Queued"]}
                  updateAppointmentStatus={updateAppointmentStatus}
                  viewPatientProfile={viewPatientProfile}
                  filterAppointments={filterAppointments}
                />
                
                <AppointmentList 
                  title="Ongoing Appointments"
                  appointmentList={appointments.ongoing}
                  statusColor={statusColors["Ongoing"]}
                  updateAppointmentStatus={updateAppointmentStatus}
                  viewPatientProfile={viewPatientProfile}
                  filterAppointments={filterAppointments}
                />
                
                <AppointmentList 
                  title="Completed Appointments"
                  appointmentList={appointments.completed}
                  statusColor={statusColors["Completed"]}
                  updateAppointmentStatus={updateAppointmentStatus}
                  viewPatientProfile={viewPatientProfile}
                  filterAppointments={filterAppointments}
                />
              </div>
            </div>
            
            {/* Right column - sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <AppointmentCalendar date={formattedDate} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <TodaysSummary appointments={appointments} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ toggleSidebar, selectedDate, setSelectedDate, searchTerm, setSearchTerm }) => {
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
            <div className="flex-1 flex md:ml-0 max-w-md">
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LuSearch className="h-5 w-5" />
                </div>
                <input
                  id="search-field"
                  className="block w-full h-full pl-10 pr-3 py-2 border-transparent bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent text-sm rounded-lg"
                  placeholder="Search patient name or token..."
                  type="search"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-4 md:ml-6">
            {/* Date picker */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
            </div>
            
            {/* Notification bell */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
              <LuBell className="h-6 w-6" />
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button 
                onClick={() => navigate('/doctor/profile')}
                className="flex items-center hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
              >
                <img 
                  className="h-8 w-8 rounded-full border-2 border-gray-200"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Dr. Ram" 
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Dr. Ram</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Appointment Statistics Component
const AppointmentStatistics = ({ appointments }) => {
  const totalAppointments = Object.values(appointments).reduce((total, arr) => total + arr.length, 0);
  const completedToday = appointments.completed.length;
  const ongoingCount = appointments.ongoing.length;
  const queuedCount = appointments.queued.length;
  
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-[#3B0DA3] rounded-lg shadow overflow-hidden">
      <div className="flex flex-col md:flex-row p-6 text-white">
        <div className="flex-1 mb-4 md:mb-0">
          <div>
            <h2 className="text-xl font-bold mb-4">Good Morning <span className="text-2xl">Dr. Ram Sharma!</span></h2>
            <div className="mb-6">
              <p className="text-lg font-medium">Total Appointments Today</p>
              <p className="text-6xl font-bold mt-2">{totalAppointments}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1 min-w-[140px]">
                <p className="text-sm">Completed</p>
                <p className="text-3xl font-bold">{completedToday}</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <LuCheck className="w-3 h-3 mr-1" />
                  Done
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1 min-w-[140px]">
                <p className="text-sm">In Queue</p>
                <p className="text-3xl font-bold">{queuedCount}</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <LuClock className="w-3 h-3 mr-1" />
                  Waiting
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1 min-w-[140px]">
                <p className="text-sm">Ongoing</p>
                <p className="text-3xl font-bold">{ongoingCount}</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <LuActivity className="w-3 h-3 mr-1" />
                  Active
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

// Reusable appointment list component
const AppointmentList = ({ title, appointmentList, statusColor, updateAppointmentStatus, viewPatientProfile, filterAppointments }) => {
  const filteredAppointments = filterAppointments(appointmentList || []);

  if (!appointmentList || appointmentList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {title} ({filteredAppointments.length})
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-xs text-gray-500 uppercase tracking-wider border-b">
              <th className="px-4 py-3 text-left">SR. NO.</th>
              <th className="px-4 py-3 text-left">TOKEN</th>
              <th className="px-4 py-3 text-left">PATIENT NAME</th>
              <th className="px-4 py-3 text-left">AGE</th>
              <th className="px-4 py-3 text-left">TIME</th>
              <th className="px-4 py-3 text-left">REGION</th>
              <th className="px-4 py-3 text-left">STATUS</th>
              <th className="px-4 py-3 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAppointments.length > 0 ? (
              filteredAppointments
                .sort((a, b) => 
                  parseInt(a.appointment_token.substring(a.appointment_token.lastIndexOf("-") + 1)) -
                  parseInt(b.appointment_token.substring(b.appointment_token.lastIndexOf("-") + 1))
                )
                .map((appointment, index) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {appointment.appointment_token.substring(appointment.appointment_token.lastIndexOf("-") + 1)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                        onClick={() => viewPatientProfile(appointment.patient, appointment._id)}
                      >
                        {appointment.patient_name}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{appointment.patient_age}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{appointment.appointment_time}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{appointment.region}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
                        style={{ backgroundColor: statusColors[appointment.status] }}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {appointment.status !== "Not Arrived" && (
                          <button
                            className="bg-gray-500 hover:bg-gray-600 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors"
                            onClick={() => updateAppointmentStatus(appointment._id, false)}
                            title="Move to previous status"
                          >
                            <LuChevronLeft className="w-4 h-4" />
                          </button>
                        )}

                        {appointment.status !== "Completed" && (
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors"
                            onClick={() => updateAppointmentStatus(appointment._id, true)}
                            title="Move to next status"
                          >
                            <LuChevronRight className="w-4 h-4" />
                          </button>
                        )}
                        
                        {appointment.emergency && (
                          <span className="text-red-500 font-bold text-lg" title="Emergency">⚠️</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No matching appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Appointment Calendar Component
const AppointmentCalendar = ({ date }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const days = generateCalendarDays();
  const highlightedDates = [14, 21]; // Dates with appointments
  
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
          <span className="text-sm">{date.split(' ').slice(0, 2).join(' ')}</span>
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
          const isToday = day === 21; // Today's date
          const hasAppointment = highlightedDates.includes(day);
          
          return (
            <div key={day} className="relative flex justify-center">
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer hover:bg-gray-100
                ${isToday ? 'bg-[#3B0DA3] text-white hover:bg-[#3B0DA3]' : ''}
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

// Today's Summary Component
const TodaysSummary = ({ appointments }) => {
  const totalToday = Object.values(appointments).reduce((total, arr) => total + arr.length, 0);
  const completed = appointments.completed.length;
  const pending = appointments.notArrived.length + appointments.queued.length + appointments.ongoing.length;
  
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Today's Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <LuCalendarClock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Total Appointments</p>
              <p className="text-sm text-gray-600">Today</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600">{totalToday}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <LuCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Completed</p>
              <p className="text-sm text-gray-600">Finished consultations</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-green-600">{completed}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <LuClock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Pending</p>
              <p className="text-sm text-gray-600">Waiting & ongoing</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-yellow-600">{pending}</span>
        </div>
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Add Walk-in Patient",
      icon: <LuUserCheck className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => console.log("Add walk-in patient")
    },
    {
      id: 2,
      title: "Emergency Alert",
      icon: <LuActivity className="w-5 h-5" />,
      color: "bg-red-500 hover:bg-red-600",
      action: () => console.log("Emergency alert")
    },
    {
      id: 3,
      title: "View Reports",
      icon: <LuFileText className="w-5 h-5" />,
      color: "bg-green-500 hover:bg-green-600",
      action: () => console.log("View reports")
    }
  ];
  
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={action.action}
            className={`w-full flex items-center p-3 rounded-lg text-white transition-colors ${action.color}`}
          >
            <div className="mr-3">
              {action.icon}
            </div>
            <span className="font-medium">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Appointment;