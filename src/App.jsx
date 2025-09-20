import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SignupPage from './Pages/SignupPage'
import SignInPage from './Pages/SignInPage'
import { Dashboard } from './components/doctor'
import PatientDashboard from './Components/Patient/PatientDashboard'
import PatientDashboard2 from './Components/Patient/PatientDashboard2'
import PatientAppointments from './Components/Patient/PatientAppointments'
import PBookAppointment from './Components/Patient/PBookAppointment'
import ConfirmationApp from './Components/Patient/ConfirmationApp'
import MapNavigation from './Components/Patient/MapNavigation'
import MapNavigation2 from './Components/Patient/MapNavigation2'
import PatientProfile from './Components/Patient/PatientProfile'
import PrePatientProfile from './Components/Patient/PrePatientProfile'

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
        <Route path="/patient/dashboard2" element={<PatientDashboard2 />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/book-appointment" element={<PBookAppointment />} />
        <Route path="/patient/confirmation" element={<ConfirmationApp />} />
        <Route path="/patient/map-navigation" element={<MapNavigation />} />
        <Route path="/patient/map-navigation2" element={<MapNavigation2 />} />
        <Route path="/patient/reports" element={<PatientDashboard />} />
        <Route path="/patient/chat" element={<PatientDashboard />} />
        <Route path="/patient/pre-profile" element={<PrePatientProfile />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/settings" element={<PatientDashboard />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
