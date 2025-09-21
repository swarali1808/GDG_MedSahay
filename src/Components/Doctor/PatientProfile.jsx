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
  LuArrowLeft,
  LuPencil,
  LuPlus,
  LuCalendar,
  LuMapPin,
  LuActivity,
  LuCheck
} from 'react-icons/lu';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

// Static patient data (same as PatientList but with more detailed info)
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
    address: "123 Marine Drive, Mumbai, Maharashtra",
    profilePicture: null,
    pastIllness: "Hypertension, Common Cold",
    allergies: "Peanuts, Dust",
    vaccinations: "COVID-19, Flu Vaccine",
    emergencyContact: "+91 9876543200",
    bloodGroup: "O+",
    weight: "75 kg",
    height: "5'8\"",
    medicalHistory: [
      {
        date: "2024-09-20",
        condition: "Hypertension",
        treatment: "Prescribed BP medication",
        doctor: "Dr. Ram Sharma"
      },
      {
        date: "2024-08-15",
        condition: "Common Cold",
        treatment: "Rest and fluids",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-1",
        date: "2024-09-20",
        disease: "Hypertension",
        medicine: "Amlodipine 5mg",
        remarks: "Take once daily in the morning",
        medicalTests: "Blood pressure monitoring",
        doctor: "Dr. Ram Sharma"
      },
      {
        _id: "rx-2", 
        date: "2024-08-15",
        disease: "Common Cold",
        medicine: "Paracetamol 500mg",
        remarks: "Take twice daily after meals",
        medicalTests: "None required",
        doctor: "Dr. Ram Sharma"
      }
    ]
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
    address: "456 FC Road, Pune, Maharashtra",
    profilePicture: null,
    pastIllness: "Diabetes Type 2, Migraine",
    allergies: "None known",
    vaccinations: "COVID-19, Flu, HPV",
    emergencyContact: "+91 9876543201",
    bloodGroup: "A+",
    weight: "62 kg",
    height: "5'4\"",
    medicalHistory: [
      {
        date: "2024-09-19",
        condition: "Diabetes Type 2",
        treatment: "Insulin adjustment",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-3",
        date: "2024-09-19",
        disease: "Diabetes Type 2",
        medicine: "Metformin 500mg",
        remarks: "Take twice daily with meals",
        medicalTests: "HbA1c, Blood glucose",
        doctor: "Dr. Ram Sharma"
      }
    ]
  },
  {
    _id: "patient-3",
    name: "Amit Kumar",
    age: 45,
    gender: "Male",
    phoneNumber: "+91 9876543212",
    email: "amit.kumar@email.com",
    lastVisit: "2024-09-21",
    visitCount: 2,
    region: "Delhi",
    address: "789 CP Road, Delhi, India",
    profilePicture: null,
    pastIllness: "Chest Pain, Anxiety",
    allergies: "None known",
    vaccinations: "COVID-19, Flu",
    emergencyContact: "+91 9876543202",
    bloodGroup: "B+",
    weight: "80 kg",
    height: "5'10\"",
    medicalHistory: [
      {
        date: "2024-09-21",
        condition: "Chest Pain",
        treatment: "Emergency evaluation, ECG",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-4",
        date: "2024-09-21",
        disease: "Chest Pain",
        medicine: "Aspirin 75mg",
        remarks: "Take once daily, emergency protocol",
        medicalTests: "ECG, Cardiac markers",
        doctor: "Dr. Ram Sharma"
      }
    ]
  },
  {
    _id: "patient-4",
    name: "Sunita Reddy",
    age: 52,
    gender: "Female",
    phoneNumber: "+91 9876543213",
    email: "sunita.reddy@email.com",
    lastVisit: "2024-09-18",
    visitCount: 7,
    region: "Hyderabad",
    address: "321 Banjara Hills, Hyderabad, Telangana",
    profilePicture: null,
    pastIllness: "Arthritis, Hypertension",
    allergies: "Penicillin",
    vaccinations: "COVID-19, Flu, Pneumonia",
    emergencyContact: "+91 9876543203",
    bloodGroup: "AB+",
    weight: "68 kg",
    height: "5'5\"",
    medicalHistory: [
      {
        date: "2024-09-18",
        condition: "Arthritis",
        treatment: "Anti-inflammatory medication",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-5",
        date: "2024-09-18",
        disease: "Arthritis",
        medicine: "Ibuprofen 400mg",
        remarks: "Take twice daily after meals",
        medicalTests: "Joint X-ray",
        doctor: "Dr. Ram Sharma"
      }
    ]
  },
  {
    _id: "patient-5",
    name: "Vikram Singh",
    age: 29,
    gender: "Male",
    phoneNumber: "+91 9876543214",
    email: "vikram.singh@email.com",
    lastVisit: "2024-09-17",
    visitCount: 4,
    region: "Mumbai",
    address: "654 Andheri West, Mumbai, Maharashtra",
    profilePicture: null,
    pastIllness: "Migraine, Stress",
    allergies: "None known",
    vaccinations: "COVID-19, Flu",
    emergencyContact: "+91 9876543204",
    bloodGroup: "O-",
    weight: "72 kg",
    height: "5'9\"",
    medicalHistory: [
      {
        date: "2024-09-17",
        condition: "Migraine",
        treatment: "Pain management, stress counseling",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-6",
        date: "2024-09-17",
        disease: "Migraine",
        medicine: "Sumatriptan 50mg",
        remarks: "Take as needed for headache",
        medicalTests: "None required",
        doctor: "Dr. Ram Sharma"
      }
    ]
  },
  {
    _id: "patient-6",
    name: "Meera Shah",
    age: 38,
    gender: "Female",
    phoneNumber: "+91 9876543215",
    email: "meera.shah@email.com",
    lastVisit: "2024-09-16",
    visitCount: 6,
    region: "Mumbai",
    address: "987 Worli, Mumbai, Maharashtra",
    profilePicture: null,
    pastIllness: "Migraine, Fatigue",
    allergies: "Dairy",
    vaccinations: "COVID-19, Flu",
    emergencyContact: "+91 9876543205",
    bloodGroup: "A-",
    weight: "60 kg",
    height: "5'6\"",
    medicalHistory: [
      {
        date: "2024-09-16",
        condition: "Chronic Fatigue",
        treatment: "Vitamins and rest",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-7",
        date: "2024-09-16",
        disease: "Chronic Fatigue",
        medicine: "Vitamin B12",
        remarks: "Take once daily",
        medicalTests: "Blood work",
        doctor: "Dr. Ram Sharma"
      }
    ]
  },
  {
    _id: "patient-7",
    name: "Rajesh Kumar",
    age: 42,
    gender: "Male",
    phoneNumber: "+91 9876543216",
    email: "rajesh.kumar@email.com",
    lastVisit: "2024-09-15",
    visitCount: 8,
    region: "Pune",
    address: "147 Koregaon Park, Pune, Maharashtra",
    profilePicture: null,
    pastIllness: "Diabetes, Back Pain",
    allergies: "None known",
    vaccinations: "COVID-19, Flu, Hepatitis B",
    emergencyContact: "+91 9876543206",
    bloodGroup: "B-",
    weight: "78 kg",
    height: "5'7\"",
    medicalHistory: [
      {
        date: "2024-09-15",
        condition: "Lower Back Pain",
        treatment: "Physiotherapy referral",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-8",
        date: "2024-09-15",
        disease: "Back Pain",
        medicine: "Diclofenac 50mg",
        remarks: "Take twice daily after meals",
        medicalTests: "Spine X-ray",
        doctor: "Dr. Ram Sharma"
      }
    ]
  },
  {
    _id: "patient-8",
    name: "Kavita Joshi",
    age: 31,
    gender: "Female",
    phoneNumber: "+91 9876543217",
    email: "kavita.joshi@email.com",
    lastVisit: "2024-09-14",
    visitCount: 3,
    region: "Mumbai",
    address: "258 Bandra East, Mumbai, Maharashtra",
    profilePicture: null,
    pastIllness: "Anxiety, Insomnia",
    allergies: "Shellfish",
    vaccinations: "COVID-19, Flu",
    emergencyContact: "+91 9876543207",
    bloodGroup: "AB-",
    weight: "55 kg",
    height: "5'3\"",
    medicalHistory: [
      {
        date: "2024-09-14",
        condition: "Anxiety Disorder",
        treatment: "Counseling and medication",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-9",
        date: "2024-09-14",
        disease: "Anxiety",
        medicine: "Sertraline 25mg",
        remarks: "Take once daily in morning",
        medicalTests: "None required",
        doctor: "Dr. Ram Sharma"
      }
    ]
  },
  {
    _id: "patient-9",
    name: "Deepak Agarwal",
    age: 55,
    gender: "Male",
    phoneNumber: "+91 9876543218",
    email: "deepak.agarwal@email.com",
    lastVisit: "2024-09-13",
    visitCount: 12,
    region: "Delhi",
    address: "369 Vasant Kunj, Delhi, India",
    profilePicture: null,
    pastIllness: "Hypertension, High Cholesterol",
    allergies: "Aspirin",
    vaccinations: "COVID-19, Flu, Pneumonia",
    emergencyContact: "+91 9876543208",
    bloodGroup: "O+",
    weight: "85 kg",
    height: "5'11\"",
    medicalHistory: [
      {
        date: "2024-09-13",
        condition: "High Cholesterol",
        treatment: "Statin therapy",
        doctor: "Dr. Ram Sharma"
      }
    ],
    prescriptions: [
      {
        _id: "rx-10",
        date: "2024-09-13",
        disease: "High Cholesterol",
        medicine: "Atorvastatin 20mg",
        remarks: "Take once daily at bedtime",
        medicalTests: "Lipid profile",
        doctor: "Dr. Ram Sharma"
      }
    ]
  }
];

// Header Component
const Header = ({ patient }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/doctor/patients')}
              className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <LuArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Patient Profile</h1>
              <p className="text-sm text-gray-500">{patient?.name || 'Loading...'}</p>
            </div>
          </div>
          
          <div className="ml-4 flex items-center gap-4 md:ml-6">
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

// Patient Basic Info Component
const PatientBasicInfo = ({ patient }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
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

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-[#3B0DA3] rounded-lg shadow overflow-hidden text-white">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 backdrop-blur-lg flex items-center justify-center text-4xl font-bold border-4 border-white border-opacity-30">
              {getInitials(patient.name)}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{patient.name}</h2>
            <p className="text-lg opacity-90 mb-4">Patient ID: {patient._id}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-3">
                <p className="text-sm opacity-80">Age</p>
                <p className="text-xl font-bold">{patient.age}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-3">
                <p className="text-sm opacity-80">Gender</p>
                <p className="text-xl font-bold">{patient.gender}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-3">
                <p className="text-sm opacity-80">Visits</p>
                <p className="text-xl font-bold">{patient.visitCount}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-3">
                <p className="text-sm opacity-80">Last Visit</p>
                <p className="text-sm font-bold">{formatDate(patient.lastVisit)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact & Basic Info Component
const ContactInfo = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Contact & Basic Information</h3>
        <button className="text-[#3B0DA3] hover:text-[#2D0A82]">
          <LuPencil className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <LuPhone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{patient.phoneNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <LuMail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{patient.email}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <LuMapPin className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{patient.address}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <LuActivity className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="font-medium">{patient.bloodGroup}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <LuUser className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Height / Weight</p>
              <p className="font-medium">{patient.height} / {patient.weight}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <LuPhone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Emergency Contact</p>
              <p className="font-medium">{patient.emergencyContact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Medical History Component
const MedicalHistory = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-medium text-red-800 mb-2">Past Illness</h4>
          <p className="text-sm text-red-700">{patient.pastIllness}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Allergies</h4>
          <p className="text-sm text-yellow-700">{patient.allergies}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Vaccinations</h4>
          <p className="text-sm text-green-700">{patient.vaccinations}</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-800 mb-3">Recent Medical Records</h4>
        <div className="space-y-3">
          {patient.medicalHistory.map((record, index) => (
            <div key={index} className="border-l-4 border-[#3B0DA3] pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{record.condition}</p>
                  <p className="text-sm text-gray-600">{record.treatment}</p>
                  <p className="text-xs text-gray-500">Treated by: {record.doctor}</p>
                </div>
                <span className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Prescription Form Modal
const PrescriptionForm = ({ isOpen, onClose, patient, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    disease: "",
    medicine: "",
    remarks: "",
    medicalTests: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPrescription = {
      _id: `rx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      disease: formData.disease,
      medicine: formData.medicine,
      remarks: formData.remarks,
      medicalTests: formData.medicalTests,
      doctor: "Dr. Ram Sharma"
    };
    
    onSubmitSuccess(newPrescription);
    setFormData({ disease: "", medicine: "", remarks: "", medicalTests: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">New Prescription</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disease/Condition
            </label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#3B0DA3] focus:border-[#3B0DA3]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medicine
            </label>
            <input
              type="text"
              name="medicine"
              value={formData.medicine}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#3B0DA3] focus:border-[#3B0DA3]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks/Instructions
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#3B0DA3] focus:border-[#3B0DA3]"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medical Tests (Optional)
            </label>
            <input
              type="text"
              name="medicalTests"
              value={formData.medicalTests}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#3B0DA3] focus:border-[#3B0DA3]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#3B0DA3] rounded-md hover:bg-[#2D0A82]"
            >
              Add Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Prescriptions Component
const Prescriptions = ({ patient, onAddPrescription }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Prescription History</h3>
        <button
          onClick={onAddPrescription}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B0DA3] text-white rounded-md hover:bg-[#2D0A82] transition-colors"
        >
          <LuPlus className="w-4 h-4" />
          Add Prescription
        </button>
      </div>
      
      <div className="space-y-4">
        {patient.prescriptions && patient.prescriptions.length > 0 ? (
          patient.prescriptions.map((prescription, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{prescription.disease}</h4>
                  <p className="text-sm text-gray-600">{prescription.medicine}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(prescription.date).toLocaleDateString()}</p>
                  <button className="text-[#3B0DA3] hover:text-[#2D0A82] mt-1">
                    <LuPencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-700">Instructions: </span>
                  <span className="text-sm text-gray-600">{prescription.remarks}</span>
                </div>
                {prescription.medicalTests && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Tests: </span>
                    <span className="text-sm text-gray-600">{prescription.medicalTests}</span>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-700">Prescribed by: </span>
                  <span className="text-sm text-gray-600">{prescription.doctor}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <LuFileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No prescriptions found</p>
            <p className="text-sm text-gray-400">Click "Add Prescription" to create the first one</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main PatientProfile Component
const PatientProfile = () => {
  const { patientId } = useParams();
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [patientData, setPatientData] = useState(null);

  // Find patient data
  React.useEffect(() => {
    const patient = staticPatients.find(p => p._id === patientId);
    setPatientData(patient);
  }, [patientId]);

  const handleAddPrescription = () => {
    setShowPrescriptionForm(true);
  };

  const handlePrescriptionSubmitSuccess = (newPrescription) => {
    // Update patient data with new prescription
    setPatientData(prev => ({
      ...prev,
      prescriptions: [...(prev.prescriptions || []), newPrescription]
    }));
  };

  if (!patientData) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuUser className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Patient not found</h3>
            <p className="text-gray-500">The requested patient could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <Header patient={patientData} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="space-y-6">
            {/* Patient Basic Info */}
            <PatientBasicInfo patient={patientData} />
            
            {/* Contact & Basic Info */}
            <ContactInfo patient={patientData} />
            
            {/* Two column layout for Medical History and Prescriptions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MedicalHistory patient={patientData} />
              <Prescriptions 
                patient={patientData} 
                onAddPrescription={handleAddPrescription}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Prescription Form Modal */}
      <PrescriptionForm
        isOpen={showPrescriptionForm}
        onClose={() => setShowPrescriptionForm(false)}
        patient={patientData}
        onSubmitSuccess={handlePrescriptionSubmitSuccess}
      />
    </div>
  );
};

export default PatientProfile;