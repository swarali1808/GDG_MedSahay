import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, FileText, Settings, X } from 'lucide-react';

const PatientSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Home', href: '/patient/dashboard' },
    { icon: Calendar, label: 'Appointments', href: '/patient/appointments' },
    { icon: FileText, label: 'Reports', href: '/patient/reports' },
    { icon: Settings, label: 'Settings', href: '/patient/settings' },
  ];
  
  // Logo component
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
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ease-in-out"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-gray-100 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 ease-in-out z-50 shadow-2xl backdrop-blur-sm`}>
        <div className="h-full flex flex-col">
          {/* Logo and Close Button */}
          <div className="p-4 flex items-center justify-between">
            <MedSahayLogo />
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 hover:rotate-90">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-6">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-400 ease-in-out transform hover:scale-105 active:scale-95 ${
                        isActive ? 'text-[#3B0DA3] bg-white shadow-md' : 'text-gray-700 hover:bg-white hover:text-[#3B0DA3] hover:shadow-md'
                      }`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        onClose();
                      }}
                    >
                      <Icon className={`h-6 w-6 transition-all duration-200 ${isActive ? 'text-[#3B0DA3]' : 'text-[#3B0DA3]'}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default PatientSidebar;