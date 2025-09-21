import React, { useState } from 'react';
import { 
  LuSearch,
  LuBell,
  LuUser,
  LuClock,
  LuPhone,
  LuMail,
  LuHistory,
  LuFileText,
  LuEye,
  LuFilter
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

// Static patient data (using same structure as appointments)
const staticPatients = [
  {
    _id: "patient-1",
    name: "Rahul Sharma",
    age: 28,
    gender: "Male",
    phoneNumber: "+91 9876543210",
    email: "rahul.sharma@email.com",
    lastVisit: "2024-09-20",
    visitCount: 3,
    region: "Mumbai",
    profilePicture: null,
    pastIllness: "Hypertension",
    allergies: "Peanuts",
    vaccinations: "COVID-19, Flu",
    status: "Regular"
  },
  {
    _id: "patient-2", 
    name: "Priya Patel",
    age: 34,
    gender: "Female",
    phoneNumber: "+91 9876543211",
    email: "priya.patel@email.com",
    lastVisit: "2024-09-19",
    visitCount: 5,
    region: "Pune",
    profilePicture: null,
    pastIllness: "Diabetes Type 2",
    allergies: "None",
    vaccinations: "COVID-19, Flu, HPV",
    status: "Frequent"
  },
  {
    _id: "patient-3",
    name: "Amit Kumar",
    age: 45,
    gender: "Male",
    phoneNumber: "+91 9876543212",
    email: "amit.kumar@email.com",
    lastVisit: "2024-09-18",
    visitCount: 2,
    region: "Delhi",
    profilePicture: null,
    pastIllness: "Asthma",
    allergies: "Dust, Pollen",
    vaccinations: "COVID-19",
    status: "Regular"
  },
  {
    _id: "patient-4",
    name: "Sunita Reddy",
    age: 52,
    gender: "Female",
    phoneNumber: "+91 9876543213",
    email: "sunita.reddy@email.com",
    lastVisit: "2024-09-17",
    visitCount: 8,
    region: "Hyderabad",
    profilePicture: null,
    pastIllness: "Arthritis",
    allergies: "Shellfish",
    vaccinations: "COVID-19, Flu, Pneumonia",
    status: "Frequent"
  },
  {
    _id: "patient-5",
    name: "Vikram Singh",
    age: 29,
    gender: "Male",
    phoneNumber: "+91 9876543214",
    email: "vikram.singh@email.com",
    lastVisit: "2024-09-21",
    visitCount: 1,
    region: "Mumbai",
    profilePicture: null,
    pastIllness: "None",
    allergies: "None",
    vaccinations: "COVID-19",
    status: "New"
  },
  {
    _id: "patient-6",
    name: "Meera Shah",
    age: 38,
    gender: "Female", 
    phoneNumber: "+91 9876543215",
    email: "meera.shah@email.com",
    lastVisit: "2024-09-16",
    visitCount: 4,
    region: "Mumbai",
    profilePicture: null,
    pastIllness: "Migraine",
    allergies: "Dairy",
    vaccinations: "COVID-19, Flu",
    status: "Regular"
  }
];

// Patient Card Component
const PatientCard = ({ patient, onViewDetails }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return "??";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Regular": return "bg-green-100 text-green-800";
      case "Frequent": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header with status and view button */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
        <button
          onClick={() => onViewDetails(patient._id)}
          className="text-[#3B0DA3] hover:text-[#2D0A82] transition-colors"
          title="View Details"
        >
          <LuEye className="w-5 h-5" />
        </button>
      </div>

      {/* Patient Avatar and Info */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-[#3B0DA3] text-white flex items-center justify-center text-2xl font-bold mb-3">
          {getInitials(patient.name)}
        </div>
        <h3 className="font-semibold text-gray-800 text-lg">{patient.name}</h3>
        <p className="text-sm text-gray-500">Last visit: {formatDate(patient.lastVisit)}</p>
      </div>

      {/* Patient Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <LuUser className="w-5 h-5 text-[#3B0DA3] mx-auto mb-1" />
          <p className="text-xs text-gray-600">{patient.age} Yrs</p>
          <p className="text-xs text-gray-600">{patient.gender}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <LuClock className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">{patient.visitCount} Visits</p>
          <p className="text-xs text-gray-600">{patient.region}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t pt-3 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <LuPhone className="w-4 h-4 mr-2 text-gray-400" />
          <span className="truncate">{patient.phoneNumber}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LuMail className="w-4 h-4 mr-2 text-gray-400" />
          <span className="truncate">{patient.email}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t">
        <button className="flex items-center justify-center text-xs text-[#3B0DA3] py-2 px-3 rounded-md border border-[#3B0DA3] hover:bg-[#3B0DA3] hover:text-white transition-colors">
          <LuHistory className="w-4 h-4 mr-1" />
          History
        </button>
        <button className="flex items-center justify-center text-xs text-[#3B0DA3] py-2 px-3 rounded-md border border-[#3B0DA3] hover:bg-[#3B0DA3] hover:text-white transition-colors">
          <LuFileText className="w-4 h-4 mr-1" />
          Records
        </button>
      </div>
    </div>
  );
};

// Filter Component
const FilterDropdown = ({ selectedFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filters = ["All Patients", "New Patients", "Regular Patients", "Frequent Visitors"];

  const selectFilter = (filter) => {
    onFilterChange(filter);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
      >
        <LuFilter className="w-4 h-4 text-gray-500" />
        {selectedFilter}
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1">
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={() => selectFilter(filter)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Header Component
const Header = ({ searchTerm, setSearchTerm, selectedFilter, setSelectedFilter }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="flex-1 flex md:ml-0 max-w-md">
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LuSearch className="h-5 w-5" />
                </div>
                <input
                  id="search-field"
                  className="block w-full h-full pl-10 pr-3 py-2 border-transparent bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent text-sm rounded-lg"
                  placeholder="Search patients..."
                  type="search"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="ml-4 flex items-center gap-4 md:ml-6">
            {/* Filter Dropdown */}
            <FilterDropdown 
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
            
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

// Patient Statistics Component
const PatientStatistics = ({ patients, filteredPatients }) => {
  const totalPatients = patients.length;
  const newPatients = patients.filter(p => p.status === "New").length;
  const frequentPatients = patients.filter(p => p.status === "Frequent").length;
  const averageAge = Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length);
  
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-[#3B0DA3] rounded-lg shadow overflow-hidden">
      <div className="flex flex-col md:flex-row p-6 text-white">
        <div className="flex-1 mb-4 md:mb-0">
          <div>
            <h2 className="text-xl font-bold mb-4">Patient Management <span className="text-2xl">Dashboard</span></h2>
            <div className="mb-6">
              <p className="text-lg font-medium">Total Patients</p>
              <p className="text-6xl font-bold mt-2">{totalPatients}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1 min-w-[140px]">
                <p className="text-sm">New Patients</p>
                <p className="text-3xl font-bold">{newPatients}</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <LuUser className="w-3 h-3 mr-1" />
                  Recent
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1 min-w-[140px]">
                <p className="text-sm">Frequent Visitors</p>
                <p className="text-3xl font-bold">{frequentPatients}</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <LuClock className="w-3 h-3 mr-1" />
                  Regular
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex-1 min-w-[140px]">
                <p className="text-sm">Average Age</p>
                <p className="text-3xl font-bold">{averageAge}</p>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <LuUser className="w-3 h-3 mr-1" />
                  Years
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

// Main PatientList Component
const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Patients");

  const handleViewPatientDetails = (patientId) => {
    navigate(`/doctor/patient/${patientId}`);
  };

  const filterPatients = (patients) => {
    let filtered = patients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== "All Patients") {
      const statusMap = {
        "New Patients": "New",
        "Regular Patients": "Regular", 
        "Frequent Visitors": "Frequent"
      };
      const targetStatus = statusMap[selectedFilter];
      if (targetStatus) {
        filtered = filtered.filter(patient => patient.status === targetStatus);
      }
    }

    return filtered;
  };

  const filteredPatients = filterPatients(staticPatients);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="space-y-6">
            {/* Patient statistics */}
            <PatientStatistics 
              patients={staticPatients}
              filteredPatients={filteredPatients}
            />
            
            {/* Patients List */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Patients ({filteredPatients.length})
                </h3>
                <span className="text-sm text-gray-500">
                  {selectedFilter}
                </span>
              </div>
              
              {filteredPatients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPatients.map((patient) => (
                    <PatientCard
                      key={patient._id}
                      patient={patient}
                      onViewDetails={handleViewPatientDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <LuUser className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
                  <p className="text-gray-500">
                    {searchTerm ? 
                      "Try adjusting your search terms or filters." : 
                      "No patients match the selected filter."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientList;