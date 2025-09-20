import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SignupPage from './Pages/SignupPage'
import SignInPage from './Pages/SignInPage'
import { Dashboard } from './components/doctor'
import PatientDashboard from './Components/Patient/PatientDashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SignInPage />} />
        
        {/* Doctor routes */}
        <Route path="/doctor/dashboard" element={<Dashboard />} />
        <Route path="/doctor/appointments" element={<Dashboard />} />
        <Route path="/doctor/reports" element={<Dashboard />} />
        <Route path="/doctor/patients" element={<Dashboard />} />
        <Route path="/doctor/settings" element={<Dashboard />} />
        
        {/* Patient routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientDashboard />} />
        <Route path="/patient/reports" element={<PatientDashboard />} />
        <Route path="/patient/chat" element={<PatientDashboard />} />
        <Route path="/patient/profile" element={<PatientDashboard />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
