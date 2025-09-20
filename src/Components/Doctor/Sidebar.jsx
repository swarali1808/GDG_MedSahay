import LogoImage from '../../assets/CommonImgs/HorizontalLogo.png'; // Logo image
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuCalendarClock, 
  LuFileText, 
  LuUsers,
  LuSettings, 
  LuLogOut,
  LuChevronRight,
  LuMenu
} from 'react-icons/lu';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 1, name: 'Dashboard', icon: <LuLayoutDashboard size={22} />, path: '/doctor/dashboard' },
    { id: 2, name: 'Appointments', icon: <LuCalendarClock size={22} />, path: '/doctor/appointments' },
    { id: 3, name: 'Reports', icon: <LuFileText size={22} />, path: '/doctor/reports' },
    { id: 4, name: 'Patient list', icon: <LuUsers size={22} />, path: '/doctor/patients' },
    { id: 5, name: 'Settings', icon: <LuSettings size={22} />, path: '/doctor/settings' },
    { id: 6, name: 'Log Out', icon: <LuLogOut size={22} />, path: '/logout' },
  ];

  // Check if mobile view on initial load and on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <button 
      onClick={() => setMobileOpen(!mobileOpen)}
      className="lg:hidden fixed z-50 bottom-6 left-6 bg-[#3B0DA3] text-white p-3 rounded-full shadow-lg"
    >
      <LuMenu size={24} />
    </button>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && <MobileMenuButton />}
      
      {/* Mobile sidebar overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <div 
        className={`bg-[#3B0DA3] text-white h-full transition-all duration-300 ease-in-out ${
          expanded ? 'w-64' : 'w-20'
        } ${
          isMobile ? 'fixed top-0 left-0 z-50 h-full' : 'relative'
        } ${
          isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() => !isMobile && setExpanded(false)}
      >
        {/* Logo */}
        <div className={`px-2 py-6 ${expanded ? 'justify-center' : 'justify-center'} flex`}>
          {expanded ? (
            <Link to="/" className="block w-full">
              <div className="flex justify-center items-center">
                <img src={LogoImage} alt="MedSahay" className="w-full max-h-12 object-contain" />
              </div>
            </Link>
          ) : (
            <Link to="/" className="block">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[#2F077C] text-teal-400">
                <span className="text-xl font-bold">M</span>
              </div>
            </Link>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-2 pt-4 pb-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id}>
                  <Link 
                    to={item.path}
                    className={`flex items-center py-3 px-3 rounded-lg overflow-hidden ${
                      isActive
                        ? 'bg-white bg-opacity-10 text-white'
                        : 'text-white text-opacity-70 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${expanded ? 'mr-3' : 'mx-auto'}`}>{item.icon}</span>
                    {expanded && (
                      <span className="font-medium whitespace-nowrap">{item.name}</span>
                    )}
                    {expanded && isActive && (
                      <span className="ml-auto">
                        <LuChevronRight size={16} />
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;