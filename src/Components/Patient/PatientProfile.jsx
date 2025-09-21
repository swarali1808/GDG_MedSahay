import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';

const PatientProfile = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [showManualEdit, setShowManualEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [completionData, setCompletionData] = useState({
    completion_percentage: 0,
    missing_critical_fields: [],
    is_complete: false
  });
  
  const [formData, setFormData] = useState({
    // User Profile - Backend API fields
    full_name: '',
    email: '',
    phone_number: '',
    alternative_phone: '',
    dob: '',
    gender: '',
    blood_group: '',
    permanent_address: '',
    current_location: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    preferred_language: 'English',
    abha_id: '',
    medical_history: [],
    allergies: []
  });

  // API Service Functions
  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    console.log('Debug - Token from localStorage:', token); // Debug log
    
    // For debugging, allow requests without token
    if (!token) {
      console.warn('No access token found. Making request without auth for testing.');
      return {
        'Content-Type': 'application/json'
      };
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    console.log('Debug - Auth headers:', headers); // Debug log
    return headers;
  };

  const getCurrentProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      const headers = getAuthHeaders();
      // Always try request, even without token for debugging
      
      console.log('Debug - Making request to:', 'http://localhost:8000/api/v1/profile/current');
      console.log('Debug - With headers:', headers);
      
      const response = await fetch('http://localhost:8000/api/v1/profile/current', {
        method: 'GET',
        headers: headers
      });

      console.log('Debug - Response status:', response.status);
      console.log('Debug - Response headers:', response.headers);

      if (response.status === 401) {
        // Token is invalid or expired
        console.log('Debug - 401 Unauthorized, clearing tokens');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setError('Session expired. Please login again.');
        navigate('/login');
        return null;
      }

      if (response.status === 404) {
        // Profile doesn't exist yet, return empty profile
        console.log('Debug - 404 Profile not found, creating empty profile');
        setFormData({
          full_name: '',
          email: '',
          phone_number: '',
          alternative_phone: '',
          dob: '',
          gender: '',
          blood_group: '',
          permanent_address: '',
          current_location: {
            address: '',
            city: '',
            state: '',
            pincode: '',
            landmark: ''
          },
          preferred_language: 'English',
          abha_id: '',
          medical_history: [],
          allergies: []
        });
        return null;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Debug - API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Debug - Received profile data:', data);
      
      // Update form data with profile data
      if (data.profile_data) {
        setFormData(prev => ({
          ...prev,
          ...data.profile_data
        }));
      }
      
      // Update completion data
      setCompletionData({
        completion_percentage: data.completion_percentage || 0,
        missing_critical_fields: data.missing_critical_fields || [],
        is_complete: data.is_complete || false
      });

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(`Failed to load profile data: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError('');

      // Clean and prepare the data for backend
      const cleanedData = {
        full_name: profileData.full_name || '',
        email: profileData.email || '',
        phone_number: profileData.phone_number || '',
        alternative_phone: profileData.alternative_phone || '',
        dob: profileData.dob || null,
        gender: profileData.gender || '',
        blood_group: profileData.blood_group || '',
        permanent_address: profileData.permanent_address || '',
        preferred_language: profileData.preferred_language || 'English',
        abha_id: profileData.abha_id || '',
        medical_history: Array.isArray(profileData.medical_history) ? profileData.medical_history : [],
        allergies: Array.isArray(profileData.allergies) ? profileData.allergies : []
      };

      // Only include current_location if it has data
      if (profileData.current_location && 
          Object.values(profileData.current_location).some(val => val && val.trim() !== '')) {
        cleanedData.current_location = {
          address: profileData.current_location.address || '',
          city: profileData.current_location.city || '',
          state: profileData.current_location.state || '',
          pincode: profileData.current_location.pincode || '',
          landmark: profileData.current_location.landmark || ''
        };
      }

      const headers = getAuthHeaders();
      
      console.log('Debug - Cleaned data being sent:', JSON.stringify(cleanedData, null, 2));
      console.log('Debug - Making request to:', 'http://localhost:8000/api/v1/profile/update');
      
      const response = await fetch('http://localhost:8000/api/v1/profile/update', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(cleanedData)
      });

      console.log('Debug - Update response status:', response.status);

      if (response.status === 401) {
        // Token is invalid or expired
        console.log('Debug - 401 Unauthorized during update, clearing tokens');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setError('Session expired. Please login again.');
        navigate('/login');
        return null;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Debug - Update API Error:', response.status, errorText);
        
        // Try to parse error as JSON, fallback to text
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.detail || errorJson.message || 'Unknown server error';
        } catch {
          errorMessage = errorText || 'Unknown server error';
        }
        
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Debug - Update response data:', data);
      
      // Update completion data
      setCompletionData({
        completion_percentage: data.completion_percentage || 0,
        missing_critical_fields: data.missing_critical_fields || [],
        is_complete: data.is_complete || false
      });

      // Show success message
      setSuccessMessage('Profile saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(`Failed to save profile: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData) => {
    try {
      console.log('Debug - Creating new profile with data:', profileData);
      
      const response = await fetch('http://localhost:8000/api/v1/profile/create', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Debug - Create API Error:', response.status, errorText);
        throw new Error(`Create failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Debug - Create response data:', data);
      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const updateSingleField = async (fieldName, fieldValue) => {
    try {
      const headers = getAuthHeaders();
      if (!headers) {
        navigate('/login');
        return null;
      }

      const response = await fetch(`http://localhost:8000/api/v1/profile/update-field?field_name=${fieldName}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ field_value: fieldValue })
      });

      if (response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/login');
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update completion percentage
      setCompletionData(prev => ({
        ...prev,
        completion_percentage: data.completion_percentage || prev.completion_percentage
      }));

      return data;
    } catch (error) {
      console.error('Error updating field:', error);
      return null;
    }
  };

  // Load profile data on component mount
  useEffect(() => {
    // For debugging, comment out auth check temporarily
    /*
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      setError('Please login to access your profile');
      navigate('/login');
      return;
    }
    */
    
    // Always try to fetch profile for debugging
    getCurrentProfile();
  }, []); // Remove navigate from dependencies to fix warning

  const formFields = [
    { key: 'full_name', label: 'Full Name', placeholder: 'Enter your full name', required: true },
    { key: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
    { key: 'phone_number', label: 'Phone Number', placeholder: 'Enter your phone number', required: true },
    { key: 'alternative_phone', label: 'Alternative Phone', placeholder: 'Enter alternative contact number' },
    { key: 'dob', label: 'Date of Birth', placeholder: 'Select date', required: true },
    { key: 'gender', label: 'Gender', placeholder: 'Select gender', required: true },
    { key: 'blood_group', label: 'Blood Group', placeholder: 'Enter your blood group', required: true },
    { key: 'permanent_address', label: 'Permanent Address', placeholder: 'Enter your complete address' },
    { key: 'current_location.address', label: 'Current Address', placeholder: 'Enter current address', required: true },
    { key: 'current_location.city', label: 'Current City', placeholder: 'Enter your current city' },
    { key: 'current_location.state', label: 'State', placeholder: 'Enter your state' },
    { key: 'current_location.pincode', label: 'Pincode', placeholder: 'Enter pincode' },
    { key: 'abha_id', label: 'ABHA ID', placeholder: 'Enter ABHA Health ID' },
    { key: 'preferred_language', label: 'Preferred Language', placeholder: 'Select language' }
  ];

  const filledFields = completionData.completion_percentage > 0 
    ? Math.round((completionData.completion_percentage / 100) * formFields.length)
    : Object.values(formData).filter(value => {
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some(v => v !== '' && v !== false);
        }
        return value !== '' && value !== false;
      }).length;
  const totalFields = formFields.length;
  const progressPercentage = completionData.completion_percentage || ((filledFields / totalFields) * 100);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  };

  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      setNestedValue(newData, key, value);
      return newData;
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => navigate('/patient/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} className="text-gray-700 sm:w-6 sm:h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1C1C1C]">Medical Profile</h1>
              <p className="text-xs sm:text-sm text-[#666] hidden sm:block">
                Complete your medical profile information
                {(() => {
                  try {
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    return user.fullName ? ` - ${user.fullName}` : '';
                  } catch {
                    return '';
                  }
                })()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setShowManualEdit(!showManualEdit)}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-medium ${
                showManualEdit 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] text-white'
              }`}
            >
              <span className="hidden sm:inline">{showManualEdit ? '✓ Edit Mode Active' : 'Enable Editing'}</span>
              <span className="sm:hidden">{showManualEdit ? '✓ Edit' : 'Edit'}</span>
            </button>
            
            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                navigate('/login');
              }}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 text-xs sm:text-sm font-medium"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">⏻</span>
            </button>
            
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              <div className="w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-gray-700 rounded"></span>
                <span className="w-full h-0.5 bg-gray-700 rounded"></span>
                <span className="w-full h-0.5 bg-gray-700 rounded"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Single Panel Layout */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {loading && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-4">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B0DA3]"></div>
              <span className="ml-3 text-gray-600">Loading profile...</span>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
          
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-2">Complete Your Medical Profile</h2>
            
            {/* Debug Info - Remove in production */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
              <strong>Debug Info:</strong><br/>
              Token: {localStorage.getItem('access_token') ? 'Present' : 'Missing'}<br/>
              User: {localStorage.getItem('user') ? 'Present' : 'Missing'}<br/>
              {localStorage.getItem('user') && (
                <>User Data: {localStorage.getItem('user')}</>
              )}
              <br/>
              <button 
                onClick={() => {
                  // Set a test token for debugging
                  localStorage.setItem('access_token', 'test_token_123');
                  localStorage.setItem('user', JSON.stringify({fullName: 'Test User', role: 'patient'}));
                  window.location.reload();
                }}
                className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
              >
                Set Test Token
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="mt-2 ml-2 px-2 py-1 bg-green-500 text-white rounded text-xs"
              >
                Go to Login
              </button>
              <button 
                onClick={async () => {
                  // Test API without auth
                  try {
                    const response = await fetch('http://localhost:8000/api/v1/profile/health');
                    const data = await response.json();
                    console.log('Health check:', data);
                    alert('Health check: ' + JSON.stringify(data));
                  } catch (err) {
                    console.error('Health check failed:', err);
                    alert('Health check failed: ' + err.message);
                  }
                }}
                className="mt-2 ml-2 px-2 py-1 bg-purple-500 text-white rounded text-xs"
              >
                Test Health
              </button>
              <button 
                onClick={async () => {
                  // Try create profile instead of update
                  try {
                    const testData = {
                      full_name: 'Test User',
                      email: 'test@example.com',
                      phone_number: '1234567890'
                    };
                    
                    const response = await fetch('http://localhost:8000/api/v1/profile/create', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(testData)
                    });
                    
                    if (response.ok) {
                      const data = await response.json();
                      console.log('Create profile success:', data);
                      alert('Create profile success!');
                    } else {
                      const errorText = await response.text();
                      console.log('Create profile error:', response.status, errorText);
                      alert('Create profile error: ' + errorText);
                    }
                  } catch (err) {
                    console.error('Create profile failed:', err);
                    alert('Create profile failed: ' + err.message);
                  }
                }}
                className="mt-2 ml-2 px-2 py-1 bg-orange-500 text-white rounded text-xs"
              >
                Test Create
              </button>
            </div>
            
            {/* Progress Tracker */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-[#666]">Profile Completion</span>
                <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] bg-clip-text text-transparent">
                  {filledFields} of {totalFields} fields filled
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {formFields.map((field, index) => (
              <div 
                key={field.key} 
                className={`bg-gray-50 rounded-xl border p-3 sm:p-4 transition-all duration-300 border-gray-200 hover:border-[#3B0DA3] focus-within:border-[#3B0DA3] focus-within:bg-purple-50 ${
                  field.key.includes('Address') || field.key === 'permanentAddress' ? 'md:col-span-2' : ''
                }`}
              >
                <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-2">
                  {field.label}
                </label>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex-1">
                    {field.key === 'gender' || field.key === 'preferred_language' ? (
                      <select
                        value={getNestedValue(formData, field.key)}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">{field.placeholder}</option>
                        {field.key === 'gender' && (
                          <>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </>
                        )}
                        {field.key === 'preferred_language' && (
                          <>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Marathi">Marathi</option>
                            <option value="Tamil">Tamil</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <input
                        type={field.key === 'dob' ? 'date' : field.key === 'email' ? 'email' : field.key.includes('phone') ? 'tel' : 'text'}
                        value={getNestedValue(formData, field.key) || ''}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all duration-300"
                        disabled={!showManualEdit}
                      />
                    )}
                  </div>
                  
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      const input = document.querySelector(`input[value="${getNestedValue(formData, field.key) || ''}"], select[value="${getNestedValue(formData, field.key) || ''}"]`);
                      input?.focus();
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#666] hover:bg-gray-200 hover:text-[#3B0DA3] transition-all duration-300 hover:scale-105"
                  >
                    <Edit3 size={12} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
                
                {/* Field Completion Indicator */}
                {getNestedValue(formData, field.key) && (
                  <div className="flex items-center mt-2 text-green-600 fadeIn">
                    <Check size={14} className="mr-1 sm:w-4 sm:h-4" />
                    <span className="text-xs">Completed</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-6 sm:mt-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {successMessage}
              </div>
            )}
            
            <button
              onClick={async () => {
                try {
                  setError('');
                  setSuccessMessage('');
                  
                  // Prepare data for backend (remove empty nested objects)
                  const profileData = { ...formData };
                  
                  // Clean up current_location if all fields are empty
                  if (profileData.current_location && 
                      Object.values(profileData.current_location).every(val => !val)) {
                    delete profileData.current_location;
                  }
                  
                  try {
                    // Try updating first
                    await updateProfile(profileData);
                  } catch (updateError) {
                    // If update fails, try creating
                    console.log('Update failed, trying to create profile:', updateError.message);
                    if (updateError.message.includes('500') || updateError.message.includes('404')) {
                      console.log('Attempting to create new profile...');
                      await createProfile(profileData);
                      setSuccessMessage('Profile created successfully!');
                      setTimeout(() => setSuccessMessage(''), 3000);
                    } else {
                      throw updateError;
                    }
                  }
                  
                  if (!error) {
                    // Profile saved successfully, stay on page to show success message
                    // User can navigate manually or we can auto-navigate after delay
                    setTimeout(() => {
                      if (completionData.is_complete) {
                        navigate('/patient/dashboard');
                      }
                    }, 2000);
                  }
                } catch (err) {
                  // Error is already set in updateProfile function
                  console.error('Final error:', err);
                }
              }}
              disabled={loading}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#3B0DA3] to-[#2F077C] hover:shadow-lg'
              }`}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;