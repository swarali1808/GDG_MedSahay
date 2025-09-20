import React, { useState, useEffect } from 'react';
import { Search, Star, User, Clock, Calendar, MapPin, Stethoscope, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';

const PatientAppointments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter options
  const filterOptions = ['All', 'Available Today', 'Nearby', 'Top'];

  // Dummy data for available doctors
  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Ram Chauhan",
      qualifications: "MBBS, MD - Cardiology",
      specialty: "Cardiologist",
      availability: "Available today",
      rating: 4.9,
      reviews: 120,
      price: "Rs. 450/-",
      status: "available",
      category: "nearby",
      image: null
    },
    {
      id: 2,
      name: "Dr. Swati D.",
      qualifications: "MBBS, MD - Dermatology",
      specialty: "Dermatologist",
      availability: "Next available: Tomorrow 10 AM",
      rating: 4.7,
      reviews: 95,
      price: "Rs. 680/-",
      status: "scheduled",
      category: "top",
      image: null
    },
    {
      id: 3,
      name: "Dr. Radha Joshi",
      qualifications: "MBBS, MS - Orthopedics",
      specialty: "Orthopedic Surgeon",
      availability: "Busy until Friday",
      rating: 4.8,
      reviews: 180,
      price: "Rs. 700/-",
      status: "busy",
      category: "top",
      image: null
    },
    {
      id: 4,
      name: "Dr. Priya Sharma",
      qualifications: "MBBS, FCPS - Family Medicine",
      specialty: "General Physician",
      availability: "Available today",
      rating: 4.5,
      reviews: 78,
      price: "Rs. 300/-",
      status: "available",
      category: "available-today",
      image: null
    },
    {
      id: 5,
      name: "Dr. Anil Kumar",
      qualifications: "MBBS, DNB - Internal Medicine",
      specialty: "Internal Medicine",
      availability: "Available today",
      rating: 4.3,
      reviews: 65,
      price: "Rs. 350/-",
      status: "available",
      category: "available-today",
      image: null
    },
    {
      id: 6,
      name: "Dr. Meera Patel",
      qualifications: "MBBS, MD - Pediatrics",
      specialty: "Pediatrician",
      availability: "Next available: Today 4 PM",
      rating: 4.6,
      reviews: 142,
      price: "Rs. 400/-",
      status: "scheduled",
      category: "nearby",
      image: null
    }
  ];

  // Filter doctors based on search query and active filter
  const filteredDoctors = availableDoctors.filter(doctor => {
    // First apply search filter
    const matchesSearch = searchQuery === '' || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.qualifications.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Then apply category filter
    let matchesFilter = true;
    if (activeFilter !== 'All') {
      switch (activeFilter) {
        case 'Available Today':
          matchesFilter = doctor.category === 'available-today' || doctor.status === 'available';
          break;
        case 'Nearby':
          matchesFilter = doctor.category === 'nearby';
          break;
        case 'Top':
          matchesFilter = doctor.category === 'top' || doctor.rating >= 4.7;
          break;
        default:
          matchesFilter = true;
      }
    }
    
    return matchesSearch && matchesFilter;
  });

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

  // Doctor Card Component
  const DoctorCard = ({ doctor }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'available':
          return 'text-green-600';
        case 'scheduled':
          return 'text-blue-600';
        case 'busy':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'available':
          return <div className="w-2 h-2 bg-green-600 rounded-full"></div>;
        case 'scheduled':
          return <Calendar className="w-3 h-3 text-blue-600" />;
        case 'busy':
          return <Clock className="w-3 h-3 text-red-600" />;
        default:
          return <div className="w-2 h-2 bg-gray-600 rounded-full"></div>;
      }
    };

    const isAvailable = doctor.status === 'available' || doctor.status === 'scheduled';

    const handleBookAppointment = () => {
      if (isAvailable) {
        window.scrollTo(0, 0);
        navigate('/patient/book-appointment', { 
          state: { 
            doctor: {
              ...doctor,
              clinic: `${doctor.name.split(' ')[1]} Clinic`
            }
          } 
        });
      }
    };

    return (
      <div className="bg-white rounded-2xl p-5 shadow-xl mb-4">
        <div className="flex items-start space-x-4">
          {/* Doctor Avatar */}
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-gray-500" />
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{doctor.qualifications}</p>
            
            {/* Specialty with icon */}
            <div className="flex items-center mb-2">
              <Stethoscope className="w-4 h-4 text-cyan-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">{doctor.specialty}</span>
            </div>
            
            {/* Availability */}
            <div className="flex items-center mb-3">
              <span className={`mr-2 ${getStatusColor(doctor.status)}`}>
                {getStatusIcon(doctor.status)}
              </span>
              <span className={`text-sm font-medium ${getStatusColor(doctor.status)}`}>
                {doctor.availability}
              </span>
            </div>
            
            {/* Rating and Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-700 mr-1" />
                  <span className="text-sm font-bold text-gray-700">{doctor.price}</span>
                </div>
              </div>
            </div>
            
            {/* Book Button */}
            <button 
              onClick={handleBookAppointment}
              className={`w-full py-3 rounded-lg font-medium transition-colors shadow-lg ${
                isAvailable 
                  ? 'bg-[#3B0DA3] text-white hover:bg-[#2F077C]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isAvailable}
            >
              {isAvailable ? 'Book now' : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-lg px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button 
          className="p-2 focus:outline-none hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out" 
          onClick={() => setSidebarOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        
        <h1 className="text-lg font-bold text-gray-900">Book Appointment</h1>
        
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
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search clinics, doctors, specializations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all duration-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
          {filterOptions.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 shadow-md ${
                activeFilter === filter
                  ? 'bg-[#3B0DA3] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Available Doctors Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Doctors</h2>
          
          {/* Doctor Cards */}
          <div className="space-y-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No doctors found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional spacing for better mobile experience */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default PatientAppointments;