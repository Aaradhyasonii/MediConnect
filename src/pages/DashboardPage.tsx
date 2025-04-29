// import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MoreVertical, User, X, RefreshCw, MessageSquare, FileText, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, appointments, doctors, cancelAppointment } = useApp();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
          <User size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Please Sign In
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your dashboard.
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const pastAppointments = appointments.filter(app => app.status === 'completed');

  const getDoctorById = (id: string) => {
    return doctors.find(doctor => doctor.id === id) || null;
  };

  const handleCancelAppointment = () => {
    if (appointmentToCancel) {
      cancelAppointment(appointmentToCancel);
      setShowCancelModal(false);
      setAppointmentToCancel(null);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* User Info */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <User size={40} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Welcome, {user.name}
                </h1>
                <p className="text-gray-600">
                  Manage your appointments, medical records, and more.
                </p>
              </div>
              <div className="md:ml-auto mt-4 md:mt-0 flex space-x-3">
                <Link
                  to="/support"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  <MessageSquare size={18} className="mr-2" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList className="bg-white rounded-lg shadow-sm p-1 flex space-x-1 mb-4">
              <TabsTrigger value="appointments" className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>Appointments</span>
              </TabsTrigger>
              <TabsTrigger value="records" className="flex items-center">
                <FileText size={18} className="mr-2" />
                <span>Medical Records</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center">
                <Activity size={18} className="mr-2" />
                <span>Health Monitoring</span>
              </TabsTrigger>
            </TabsList>
            
            {/* import { useNavigate } from 'react-router-dom'; */}
            const navigate = useNavigate();

            <TabsContent value="appointments" className="p-0">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Your Appointments</h2>
                  <button onClick={() => navigate('/appointments')}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md font-medium hover:bg-blue-100 transition-colors flex items-center">
                    <Calendar size={18} className="mr-2" />Book New Appointment</button>

                </div>
                
                <div className="p-6">
                  {/* Upcoming Appointments */}
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
                  
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {upcomingAppointments.map(appointment => {
                        const doctor = getDoctorById(appointment.doctorId);
                        if (!doctor) return null;
                        
                        return (
                          <div 
                            key={appointment.id} 
                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex flex-col md:flex-row md:items-center">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                                <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                                <div className="flex flex-wrap mt-2">
                                  <div className="flex items-center mr-4">
                                    <Calendar size={16} className="text-gray-500 mr-1" />
                                    <span className="text-sm text-gray-600">
                                      {new Date(appointment.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock size={16} className="text-gray-500 mr-1" />
                                    <span className="text-sm text-gray-600">{appointment.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2 mt-4 md:mt-0">
                                <Link
                                  to={`/appointments?reschedule=${appointment.id}`}
                                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                                >
                                  <RefreshCw size={14} className="mr-1" />
                                  Reschedule
                                </Link>
                                <button 
                                  onClick={() => {
                                    setAppointmentToCancel(appointment.id);
                                    setShowCancelModal(true);
                                  }}
                                  className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                                >
                                  Cancel
                                </button>
                                <div className="relative">
                                  <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                                    <MoreVertical size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg mb-8">
                      <Calendar size={32} className="text-gray-400 mx-auto mb-2" />
                      <h3 className="text-gray-800 font-medium mb-1">No Upcoming Appointments</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        You don't have any scheduled appointments.
                      </p>
                      <p className="text-gray-600 text-sm mb-4">
                        Book an Appointment
                      </p>
                    </div>
                  )}
                  
                  {/* Past Appointments */}
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Past Appointments</h3>
                  
                  {pastAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {pastAppointments.map(appointment => {
                        const doctor = getDoctorById(appointment.doctorId);
                        if (!doctor) return null;
                        
                        return (
                          <div 
                            key={appointment.id} 
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                          >
                            <div className="flex flex-col md:flex-row md:items-center">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:mr-4 opacity-75"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-700">{doctor.name}</h4>
                                <p className="text-blue-500 text-sm">{doctor.specialty}</p>
                                <div className="flex flex-wrap mt-2">
                                  <div className="flex items-center mr-4">
                                    <Calendar size={16} className="text-gray-500 mr-1" />
                                    <span className="text-sm text-gray-600">
                                      {new Date(appointment.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock size={16} className="text-gray-500 mr-1" />
                                    <span className="text-sm text-gray-600">{appointment.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2 mt-4 md:mt-0">
                                <button className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors flex items-center">
                                  <FileText size={14} className="mr-1" />
                                  View Summary
                                </button>
                                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                                  Book Again
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <FileText size={32} className="text-gray-400 mx-auto mb-2" />
                      <h3 className="text-gray-800 font-medium mb-1">No Past Appointments</h3>
                      <p className="text-gray-600 text-sm">
                        You haven't had any appointments yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="records" className="p-0">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Medical Records
                </h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your medical records will appear here once you've had appointments with our doctors.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="p-0">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Activity size={48} className="text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Health Monitoring
                </h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Track your health metrics and receive personalized insights and recommendations.
                </p>
                <Link
                  to="/health-monitoring"
                  className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Set Up Health Monitoring
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCancelModal(false)}
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <Calendar size={28} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Cancel Appointment
              </h2>
              <p className="text-gray-600 mt-1">
                Are you sure you want to cancel this appointment?
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-700">
                You can reschedule if you'd like to select a different date or time instead.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800">
                  Cancellations within 24 hours of your appointment may be subject to a fee.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancelAppointment}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;