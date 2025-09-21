import React, { useState, useEffect } from 'react';
import { Search, Mic, Clock, Calendar, FileText, User, Bell, Activity, Stethoscope, MessageCircle, RefreshCw, Send, X, MapPin, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import PatientSidebar
import PatientSidebar from './PatientSidebar';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [showConversationHistory, setShowConversationHistory] = useState(false);
  const [chatConnectionStatus, setChatConnectionStatus] = useState('connected'); // connected, connecting, error
  const [dashboardData, setDashboardData] = useState({
    userName: "Rahul",
    activeAppointments: 2,
    upcomingVisits: 3,
    notificationsCount: 4
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      appointment_id: 1,
      doctor_name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      hospital_name: "Apollo Hospital",
      appointment_date: "Today",
      appointment_time: "2:30 PM"
    },
    {
      appointment_id: 2,
      doctor_name: "Dr. Amit Patel",
      specialty: "Orthopedic",
      hospital_name: "Fortis Healthcare",
      appointment_date: "Tomorrow",
      appointment_time: "10:00 AM"
    },
    {
      appointment_id: 3,
      doctor_name: "Dr. Sunita Reddy",
      specialty: "Dermatologist",
      hospital_name: "Max Hospital",
      appointment_date: "Dec 23",
      appointment_time: "4:15 PM"
    }
  ]);
  const [recentlyVisited, setRecentlyVisited] = useState([
    {
      doctor_id: 1,
      doctor_name: "Dr. Rajesh Kumar",
      specialty: "General Physician"
    },
    {
      doctor_id: 2,
      doctor_name: "Dr. Meera Shah",
      specialty: "Pediatrician"
    },
    {
      doctor_id: 3,
      doctor_name: "Dr. Vikram Singh",
      specialty: "ENT Specialist"
    }
  ]);
  const [notifications, setNotifications] = useState([
    {
      notification_id: 1,
      type: "reminder",
      title: "Medication Reminder",
      message: "Time to take your blood pressure medication"
    },
    {
      notification_id: 2,
      type: "lab",
      title: "Lab Results Ready",
      message: "Your blood test results are now available"
    },
    {
      notification_id: 3,
      type: "appointment",
      title: "Appointment Confirmation",
      message: "Your appointment with Dr. Priya Sharma is confirmed for today at 2:30 PM"
    },
    {
      notification_id: 4,
      type: "reminder",
      title: "Health Checkup Due",
      message: "Annual health checkup is due next week"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  
  // Common symptoms for quick selection
  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Back Pain'
  ];
  
  // Get auth token from localStorage
  const getAuthToken = () => {
    const token = localStorage.getItem('access_token');
    console.log('Retrieved token:', token ? 'Token exists' : 'No token found');
    return token;
  };

  // Check if user is authenticated
  const checkAuth = () => {
    const token = getAuthToken();
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      console.log('No valid auth found, redirecting to login');
      setAuthError(true);
      navigate('/login');
      return false;
    }
    return true;
  };

  // Fetch dashboard overview data
  const fetchDashboardData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No auth token available');
        setAuthError(true);
        return;
      }

      console.log('Fetching dashboard data...');
      const response = await fetch('http://localhost:8000/api/v1/patients/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Dashboard API response status:', response.status);

      if (response.status === 401) {
        console.error('Token expired or invalid');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setAuthError(true);
        navigate('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Dashboard data received:', data);
        setDashboardData({
          userName: data.user_name,
          activeAppointments: data.active_appointments,
          upcomingVisits: data.upcoming_visits,
          notificationsCount: data.notifications_count
        });
      } else {
        console.error('Dashboard API error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Fetch upcoming appointments
  const fetchUpcomingAppointments = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }

      console.log('Fetching upcoming appointments...');
      const response = await fetch('http://localhost:8000/api/v1/patients/appointments/upcoming', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Appointments API response status:', response.status);

      if (response.status === 401) {
        console.error('Token expired or invalid');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setAuthError(true);
        navigate('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Appointments data received:', data);
        setUpcomingAppointments(data);
      } else {
        console.error('Appointments API error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Fetch recent doctors
  const fetchRecentDoctors = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }

      console.log('Fetching recent doctors...');
      const response = await fetch('http://localhost:8000/api/v1/patients/doctors/recent', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Recent doctors API response status:', response.status);

      if (response.status === 401) {
        console.error('Token expired or invalid');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setAuthError(true);
        navigate('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Recent doctors data received:', data);
        setRecentlyVisited(data);
      } else {
        console.error('Recent doctors API error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recent doctors:', error);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }

      console.log('Fetching notifications...');
      const response = await fetch('http://localhost:8000/api/v1/patients/notifications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Notifications API response status:', response.status);

      if (response.status === 401) {
        console.error('Token expired or invalid');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setAuthError(true);
        navigate('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Notifications data received:', data);
        setNotifications(data);
      } else {
        console.error('Notifications API error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Load all data when component mounts
  useEffect(() => {
    const loadData = async () => {
      console.log('Component mounted, checking authentication...');
      
      // First check if user is authenticated
      if (!checkAuth()) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Set user name from stored user data or use static data
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setDashboardData(prev => ({
            ...prev,
            userName: userData.full_name ? userData.full_name.split(' ')[0] : 'Rahul'
          }));
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }

      // Use static data instead of API calls for now
      // await Promise.all([
      //   fetchDashboardData(),
      //   fetchUpcomingAppointments(),
      //   fetchRecentDoctors(),
      //   fetchNotifications()
      // ]);
      
      // Simulate loading time
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    loadData();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Auto-send message when chat input is pre-filled from symptom selection
  useEffect(() => {
    if (chatOpen && chatInput && chatInput.startsWith("I'm experiencing")) {
      // Small delay to ensure the chat modal is fully opened
      const timer = setTimeout(() => {
        if (chatInput.trim() && !chatLoading) {
          console.log('Auto-sending message:', chatInput);
          sendChatMessage();
        }
      }, 800); // Increased delay to ensure proper initialization

      return () => clearTimeout(timer);
    }
  }, [chatOpen, chatInput]);

  // Test API connectivity when chat opens
  useEffect(() => {
    if (chatOpen && conversations.length === 0) {
      // Try to fetch conversations when chat opens to test connectivity
      fetchConversations();
    }
  }, [chatOpen]);

  // Handler functions for UI interactions
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  const handleInputChange = (value) => {
    setSymptomInput(value);
    
    // Auto-start chat when user types symptoms
    if (value.trim().length > 3) {
      setChatOpen(true);
      setChatInput(`I'm experiencing: ${value.trim()}`);
    }
  };

  const handleSymptomSelect = async (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      const newSymptoms = [...selectedSymptoms, symptom];
      setSelectedSymptoms(newSymptoms);
      
      // Perform symptom analysis when multiple symptoms are selected
      if (newSymptoms.length >= 2) {
        const analysis = await analyzeSymptoms(newSymptoms);
        if (analysis) {
          // Auto-start chat with detailed analysis
          setChatOpen(true);
          setChatInput(`I'm experiencing these symptoms: ${newSymptoms.join(', ')}. Severity: ${analysis.severity}. Please provide guidance.`);
        } else {
          // Fallback to basic chat
          setChatOpen(true);
          setChatInput(`I'm experiencing the following symptoms: ${newSymptoms.join(', ')}`);
        }
      } else {
        // Single symptom - basic chat
        setChatOpen(true);
        setChatInput(`I'm experiencing the following symptoms: ${newSymptoms.join(', ')}`);
      }
    }
  };

  const handleSymptomRemove = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  // Chatbot functions
  const fetchConversations = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }

      console.log('Fetching conversation history...');
      const response = await fetch('http://localhost:8000/api/v1/ai/conversations?limit=10', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Conversations API response status:', response.status);

      if (response.status === 401) {
        console.error('Token expired or invalid for conversations');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setAuthError(true);
        navigate('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Conversations data received:', data);
        setConversations(data.conversations || []);
      } else {
        console.error('Conversations API error:', response.status, response.statusText);
        // Don't fail silently, show empty conversations
        setConversations([]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    }
  };

  const analyzeSymptoms = async (symptoms) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No auth token available for symptom analysis');
        return null;
      }

      console.log('Analyzing symptoms:', symptoms);
      const response = await fetch('http://localhost:8000/api/v1/ai/symptoms/analyze', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: symptoms,
          duration: "",
          additional_info: ""
        }),
      });

      console.log('Symptom analysis API response status:', response.status);

      if (response.status === 401) {
        console.error('Token expired or invalid for symptom analysis');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setAuthError(true);
        navigate('/login');
        return null;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Symptom analysis received:', data);
        return data;
      } else {
        console.error('Symptom analysis API error:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      return null;
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const currentMessage = chatInput; // Store the current message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: currentMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);
    setChatConnectionStatus('connecting');

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      console.log('Sending chat message to AI...');
      console.log('Message:', currentMessage);
      console.log('Conversation ID:', conversationId);

      const response = await fetch('http://localhost:8000/api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversation_id: conversationId,
          message_type: 'text',
          include_user_context: true
        }),
      });

      console.log('Chat API response status:', response.status);

      if (response.status === 401) {
        console.error('Authentication failed for chat API');
        setChatConnectionStatus('error');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setAuthError(true);
        navigate('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Chat response received:', data);
        setChatConnectionStatus('connected');
        
        // Update conversation ID if it's a new conversation
        if (!conversationId && data.conversation_id) {
          console.log('Setting new conversation ID:', data.conversation_id);
          setConversationId(data.conversation_id);
        }

        const aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          message: data.ai_message || 'I received your message, but I\'m having trouble generating a response right now.',
          timestamp: new Date().toISOString(),
          responseType: data.response_type,
          extractedSymptoms: data.extracted_symptoms,
          severityAssessment: data.severity_assessment,
          emergencyAlert: data.emergency_alert,
          followUpQuestions: data.follow_up_questions,
          suggestedSpecialties: data.suggested_specialties
        };

        setChatMessages(prev => [...prev, aiMessage]);

        // Handle emergency alerts
        if (data.emergency_alert) {
          alert('Emergency Alert: ' + data.ai_message);
        }

      } else {
        setChatConnectionStatus('error');
        // Handle different error status codes
        let errorMessage = 'Sorry, I encountered an error. Please try again.';
        
        if (response.status === 500) {
          errorMessage = 'The AI service is temporarily unavailable. Please try again in a moment.';
        } else if (response.status === 429) {
          errorMessage = 'Too many requests. Please wait a moment before trying again.';
        }
        
        throw new Error(`Chat API error: ${response.status} - ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      setChatConnectionStatus('error');
      
      let errorText = 'Sorry, I encountered an error. Please try again.';
      
      if (error.message.includes('Failed to fetch')) {
        errorText = 'Connection error. Please check your internet connection and try again.';
      } else if (error.message.includes('401')) {
        errorText = 'Authentication error. Please refresh the page and try again.';
      } else if (error.message.includes('500')) {
        errorText = 'The AI service is temporarily unavailable. Please try again in a moment.';
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        message: errorText,
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
      
      // Reset connection status after a delay if it was in error state
      if (chatConnectionStatus === 'error') {
        setTimeout(() => {
          setChatConnectionStatus('connected');
        }, 3000);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };
  
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
      {/* Show loading state during authentication check */}
      {authError && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Authentication required. Redirecting to login...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B0DA3] mx-auto"></div>
          </div>
        </div>
      )}
      
      {!authError && (
        <>
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
                {dashboardData.notificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200"
                onClick={() => navigate('/patient/profile')}
                title="View Profile"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#3B0DA3] to-[#2F077C] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
      
      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto lg:max-w-3xl xl:max-w-4xl animate-fade-in">
        {/* Search Bar */}
        <div className="relative mb-5 group">
          <input
            type="text"
            placeholder="Search doctors, appointments..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent transition-all duration-500 ease-in-out hover:shadow-xl focus:shadow-2xl transform focus:scale-105"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-300 group-focus-within:text-[#3B0DA3]" />
        </div>
        
        {/* Greeting Card */}
        <div 
          className="bg-[#3B0DA3] text-white rounded-2xl p-5 flex justify-between items-center mb-5 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer animate-slide-in-left"
          onClick={() => navigate('/patient/profile')}
        >
          <div>
            <h2 className="text-xl font-bold">Good Morning, {dashboardData.userName}!</h2>
            <p className="text-white text-opacity-80">How are you feeling today?</p>
            <p className="text-white text-opacity-60 text-sm mt-1">Click to view your profile</p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden shadow-md transition-all duration-500 ease-in-out hover:bg-opacity-30 hover:rotate-12">
            <User className="w-7 h-7 text-white" />
          </div>
        </div>
        
        {/* AI Health Assistant */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xl mb-5 hover:shadow-2xl transition-all duration-500 ease-in-out animate-slide-in-right">
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
              placeholder="Type your symptoms here or select from below..."
              value={symptomInput}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-300 ease-in-out hover:shadow-lg"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#3B0DA3] text-white p-2 rounded-lg shadow-lg hover:bg-[#2F077C] transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 hover:rotate-3">
              <Mic className="w-4 h-4" />
            </button>
          </div>
          
          {/* Selected Symptoms Display */}
          {selectedSymptoms.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className="bg-[#3B0DA3] text-white rounded-full px-3 py-1 text-sm font-medium flex items-center shadow-md"
                  >
                    {symptom}
                    <button
                      onClick={() => handleSymptomRemove(symptom)}
                      className="ml-2 text-white hover:text-red-200 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {commonSymptoms.map((symptom, index) => (
              <button
                key={index}
                onClick={() => handleSymptomSelect(symptom)}
                disabled={selectedSymptoms.includes(symptom)}
                className={`rounded-full px-4 py-1 text-sm font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-110 active:scale-95 ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-[#3B0DA3] text-white'
                    : 'bg-blue-100 text-[#3B0DA3] hover:bg-blue-200'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
          
          <Link 
            to="/patient/appointments"
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-lg block text-center ${
              selectedSymptoms.length > 0
                ? 'bg-[#3B0DA3] text-white hover:bg-[#2F077C] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (selectedSymptoms.length === 0) {
                e.preventDefault();
              }
            }}
          >
            Book Appointment
          </Link>
        </div>
        
        {/* Health Overview */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">Health Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-2 shadow-lg transition-all duration-500 ease-in-out hover:bg-cyan-200 hover:rotate-12">
              <Calendar className="h-5 w-5 text-cyan-500" />
            </div>
            <h3 className="text-3xl font-bold">{dashboardData.activeAppointments}</h3>
            <p className="text-gray-600 text-sm text-center">Active Appointments</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 shadow-lg transition-all duration-500 ease-in-out hover:bg-purple-200 hover:rotate-12">
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-3xl font-bold">{dashboardData.upcomingVisits}</h3>
            <p className="text-gray-600 text-sm text-center">Upcoming Visits</p>
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Upcoming Appointments</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B0DA3] mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading appointments...</p>
            </div>
          ) : upcomingAppointments.length > 0 ? (
            <div className="space-y-5">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.appointment_id} className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{appointment.doctor_name}</h4>
                    <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.hospital_name}</p>
                    <p className="text-sm text-cyan-500 font-medium">{appointment.appointment_date}, {appointment.appointment_time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No upcoming appointments</div>
          )}
        </div>
        
        {/* Recently Visited */}
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recently Visited</h2>
            <a href="#" className="text-sm text-cyan-500 font-medium">View All</a>
          </div>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3B0DA3] mx-auto"></div>
              <p className="text-gray-600 mt-2 text-sm">Loading recent doctors...</p>
            </div>
          ) : recentlyVisited.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {recentlyVisited.map(doctor => (
                <div key={doctor.doctor_id} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-1 text-center">{doctor.doctor_name}</p>
                  <button className="bg-[#3B0DA3] text-white py-1 px-3 rounded-md text-xs font-medium shadow-lg">
                    Rebook
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No recent visits</div>
          )}
        </div>
        
        {/* Notifications & Reminders */}
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications & Reminders</h2>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3B0DA3] mx-auto"></div>
              <p className="text-gray-600 mt-2 text-sm">Loading notifications...</p>
            </div>
          ) : notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map(notification => (
                <div key={notification.notification_id} className="p-4 bg-blue-50 rounded-xl flex items-start shadow-lg">
                  <div className={`p-2 rounded-lg mr-3 shadow-md ${
                    notification.type === "reminder" ? "bg-blue-100" : 
                    notification.type === "lab" ? "bg-green-100" : "bg-purple-100"
                  }`}>
                    {notification.type === "reminder" ? (
                      <Bell className="h-5 w-5 text-blue-600" />
                    ) : notification.type === "lab" ? (
                      <FileText className="h-5 w-5 text-green-600" />
                    ) : (
                      <Bell className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No new notifications</div>
          )}
        </div>
          </div>

          {/* AI Chatbot Floating Button */}
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-[#3B0DA3] text-white rounded-full shadow-2xl hover:bg-[#2F077C] transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 z-50 flex items-center justify-center"
          >
            <MessageCircle className="w-8 h-8" />
          </button>

          {/* AI Chatbot Modal */}
          {chatOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
              <div className="bg-white rounded-t-3xl w-full max-w-md h-[70vh] flex flex-col shadow-2xl transform transition-all duration-300 ease-in-out">
                {/* Chat Header */}
                <div className="bg-[#3B0DA3] text-white p-4 rounded-t-3xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">MedSahay AI</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm opacity-80">Your health assistant</p>
                        <div className={`w-2 h-2 rounded-full ${
                          chatConnectionStatus === 'connected' ? 'bg-green-400' :
                          chatConnectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
                          'bg-red-400'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        fetchConversations();
                        setShowConversationHistory(!showConversationHistory);
                      }}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                      title="Conversation History"
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setChatOpen(false)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Conversation History Panel */}
                {showConversationHistory && (
                  <div className="border-b border-gray-200 p-4 max-h-40 overflow-y-auto bg-gray-50">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Previous Conversations</h4>
                    {conversations && conversations.length > 0 ? (
                      <div className="space-y-2">
                        {conversations.map((conv) => (
                          <div
                            key={conv.conversation_id}
                            onClick={() => {
                              console.log('Switching to conversation:', conv.conversation_id);
                              setConversationId(conv.conversation_id);
                              setShowConversationHistory(false);
                              setChatMessages([]); // Clear current messages
                              // You could load the conversation messages here
                            }}
                            className="p-2 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                          >
                            <p className="text-xs text-gray-600">
                              {new Date(conv.started_at).toLocaleDateString()} - {conv.conversation_type || 'General'}
                            </p>
                            {conv.collected_symptoms && conv.collected_symptoms.length > 0 && (
                              <p className="text-xs text-blue-600 mt-1">
                                Symptoms: {conv.collected_symptoms.slice(0, 3).join(', ')}
                                {conv.collected_symptoms.length > 3 && '...'}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">No previous conversations</p>
                        <button
                          onClick={() => {
                            fetchConversations();
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Refresh
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                      <Activity className="w-12 h-12 mx-auto mb-4 text-[#3B0DA3]" />
                      <p className="text-lg font-medium">Hello! I'm MedSahay AI</p>
                      <p className="text-sm">How can I help you with your health today?</p>
                    </div>
                  )}
                  
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-[#3B0DA3] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        
                        {/* Show emergency alert */}
                        {message.emergencyAlert && (
                          <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded-lg">
                            <p className="text-red-700 text-xs font-medium">⚠️ Emergency Alert - Seek immediate medical attention</p>
                          </div>
                        )}
                        
                        {/* Show extracted symptoms */}
                        {message.extractedSymptoms && message.extractedSymptoms.length > 0 && (
                          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-700 text-xs font-medium">Detected symptoms:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {message.extractedSymptoms.map((symptom, index) => (
                                <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Show severity assessment */}
                        {message.severityAssessment && (
                          <div className={`mt-2 p-2 border rounded-lg ${
                            message.severityAssessment === 'severe' ? 'bg-red-50 border-red-200' :
                            message.severityAssessment === 'moderate' ? 'bg-yellow-50 border-yellow-200' :
                            'bg-green-50 border-green-200'
                          }`}>
                            <p className={`text-xs font-medium ${
                              message.severityAssessment === 'severe' ? 'text-red-700' :
                              message.severityAssessment === 'moderate' ? 'text-yellow-700' :
                              'text-green-700'
                            }`}>
                              Severity: {message.severityAssessment.charAt(0).toUpperCase() + message.severityAssessment.slice(1)}
                            </p>
                          </div>
                        )}

                        {/* Show recommended specialty */}
                        {message.suggestedSpecialties && message.suggestedSpecialties.length > 0 && (
                          <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded-lg">
                            <p className="text-purple-700 text-xs font-medium">Recommended specialist:</p>
                            <p className="text-purple-600 text-xs">{message.suggestedSpecialties[0]}</p>
                          </div>
                        )}
                        
                        {/* Show follow-up questions */}
                        {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.followUpQuestions.map((question, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setChatInput(question);
                                  sendChatMessage();
                                }}
                                className="block w-full text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                              >
                                💡 {question}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs opacity-60 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message or describe symptoms..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3B0DA3] focus:border-transparent"
                      disabled={chatLoading}
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim() || chatLoading}
                      className="p-2 bg-[#3B0DA3] text-white rounded-full hover:bg-[#2F077C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Quick symptom buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {commonSymptoms.map((symptom, index) => (
                      <button
                        key={index}
                        onClick={() => setChatInput(`I have ${symptom.toLowerCase()}`)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PatientDashboard;