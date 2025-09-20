import React, { useState } from 'react';
import { Menu, X, Home, Calendar, FileText, HelpCircle, Bell, User } from 'lucide-react';

const PNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '#' },
    { icon: Calendar, label: 'Appointments', href: '#' },
    { icon: FileText, label: 'Reports', href: '#' },
    { icon: HelpCircle, label: 'Support', href: '#' }
  ];

  return (
    <div className="relative">
      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            <div className="relative">
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-cyan-400">
                <path
                  d="M8 16 L12 12 L16 20 L20 8 L24 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full"></div>
            </div>
            <span className="text-xl font-semibold">
              <span className="text-cyan-400">Med</span>
              <span className="text-[#3B0DA3]">Sahay</span>
            </span>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-1">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMobileMenu}>
          <div className="bg-white w-80 h-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Menu Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <svg width="40" height="40" viewBox="0 0 40 40" className="text-cyan-400">
                    <path
                      d="M10 20 L15 15 L20 25 L25 10 L30 20"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full"></div>
                </div>
                <span className="text-2xl font-semibold">
                  <span className="text-cyan-400">Med</span>
                  <span className="text-[#3B0DA3]">Sahay</span>
                </span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  onClick={toggleMobileMenu}
                >
                  <div className="p-2 rounded-lg bg-[#3B0DA3] bg-opacity-10 group-hover:bg-opacity-20 transition-colors">
                    <item.icon className="w-6 h-6 text-[#3B0DA3]" />
                  </div>
                  <span className="text-lg font-medium text-gray-800">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-white shadow-sm px-8 py-4 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-cyan-400">
              <path
                d="M10 20 L15 15 L20 25 L25 10 L30 20"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full"></div>
          </div>
          <span className="text-2xl font-semibold">
            <span className="text-cyan-400">Med</span>
            <span className="text-[#3B0DA3]">Sahay</span>
          </span>
        </div>

        {/* Desktop Menu Items */}
        <div className="flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <item.icon className="w-5 h-5 text-[#3B0DA3] group-hover:text-[#2F077C]" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-1">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default PNavbar;