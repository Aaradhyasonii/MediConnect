import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, MessageCircle, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Doctor } from '../types';
import { v4 as uuidv4 } from 'uuid';

const AppointmentsPage: React.FC = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;
  const { doctors, user, appointments, addAppointment } = useApp();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calendar helpers
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && 
           currentMonth === selectedDate.getMonth() && 
           currentYear === selectedDate.getFullYear();
  };

  const isPastDate = (day: number) => {
    const today = new Date();
    const checkDate = new Date(currentYear, currentMonth, day);
    return checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleDateSelect = (day: number) => {
    if (isPastDate(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  // Available time slots (would come from API in real app)
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM'
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBookAppointment();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !user) return;
    
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    addAppointment({
      id: uuidv4(),
      doctorId: selectedDoctor.id,
      patientName: user.name,
      date: formattedDate,
      time: selectedTime,
      status: 'upcoming',
      notes: notes
    });
    
    setShowConfirmation(true);
  };

  const resetForm = () => {
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setNotes('');
    setCurrentStep(1);
    setShowConfirmation(false);
  };

  const renderDoctorSelection = () => {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 ">
          Select a Doctor
        </h2>
        <p className="text-gray-600 mb-6">
          Choose from our network of qualified healthcare professionals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedDoctor?.id === doctor.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-xs ml-1">
                      {doctor.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDateSelection = () => {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Select Date & Time
        </h2>
        <p className="text-gray-600 mb-6">
          Choose an available appointment slot that works for you.
        </p>
        
        {selectedDoctor && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center">
            <img 
              src={selectedDoctor.image} 
              alt={selectedDoctor.name} 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-medium text-gray-900">{selectedDoctor.name}</h3>
              <p className="text-blue-600 text-sm">{selectedDoctor.specialty}</p>
              <p className="text-gray-600 text-sm mt-1">
                Available: {selectedDoctor.availability.days.join(', ')}
              </p>
            </div>
            <button 
              onClick={() => setSelectedDoctor(null)}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
        )}
        
        {/* Calendar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Select Date</h3>
            <div className="flex items-center">
              <button 
                onClick={previousMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <span className="mx-2 text-gray-800 font-medium">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
            
            {/* Empty cells for days before the first day of the month */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="h-10 border border-transparent rounded-md"></div>
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const past = isPastDate(day);
              return (
                <div 
                  key={`day-${day}`} 
                  onClick={() => !past && handleDateSelect(day)}
                  className={`
                    h-10 flex items-center justify-center rounded-md cursor-pointer font-medium text-sm
                    ${isToday(day) && !isSelected(day) ? 'border border-blue-500 text-blue-600' : ''}
                    ${isSelected(day) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                    ${past ? 'text-gray-400 cursor-not-allowed hover:bg-transparent' : 'text-gray-800'}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Time Slots */}
        {selectedDate && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Select Time</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <div 
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`
                    p-2 border rounded-md text-center text-sm cursor-pointer
                    ${selectedTime === time 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-300 text-gray-800 hover:border-blue-400'
                    }
                  `}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderConfirmation = () => {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Confirm Your Appointment
        </h2>
        <p className="text-gray-600 mb-6">
          Please review your appointment details below.
        </p>
        
        {selectedDoctor && selectedDate && selectedTime && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-4 bg-blue-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Appointment Details</h3>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-blue-600 text-sm">{selectedDoctor.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar size={18} className="text-blue-600 mr-3" />
                  <div>
                    <p className="text-gray-700">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock size={18} className="text-blue-600 mr-3" />
                  <div>
                    <p className="text-gray-700">{selectedTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User size={18} className="text-blue-600 mr-3" />
                  <div>
                    <p className="text-gray-700">{user?.name || 'Guest'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black"
            rows={4}
            placeholder="Any additional information you'd like to share with the doctor..."
          ></textarea>
        </div>
        
        <div className="bg-blue-50 rounded-md p-4 mb-6 flex items-start">
          <MessageCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="ml-3 text-sm text-blue-800">
            You'll receive a confirmation email once your appointment is scheduled. You can cancel or reschedule your appointment up to 24 hours before the scheduled time.
          </p>
        </div>
      </div>
    );
  };

  const renderSuccessConfirmation = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return null;
    
    return (
      <div className="text-center py-6 animate-fadeIn">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Appointment Scheduled!
        </h2>
        <p className="text-gray-600 mb-6">
          Your appointment has been successfully booked.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6 max-w-md mx-auto">
          <div className="p-4">
            <div className="text-center mb-4">
              <img 
                src={selectedDoctor.image} 
                alt={selectedDoctor.name} 
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
              <h3 className="font-medium text-gray-900 mt-2">{selectedDoctor.name}</h3>
              <p className="text-blue-600 text-sm">{selectedDoctor.specialty}</p>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <Calendar size={18} className="text-blue-600 mr-3" />
                <div>
                  <p className="text-gray-700">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock size={18} className="text-blue-600 mr-3" />
                <div>
                  <p className="text-gray-700">{selectedTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={resetForm}
            className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Book Another Appointment
          </button>
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            View My Appointments
          </Link>
        </div>
      </div>
    );
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? 'bg-blue-600 text-white'
                  : step < currentStep
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step < currentStep ? (
                <Check size={16} />
              ) : (
                step
              )}
            </div>
            {step < 3 && (
              <div 
                className={`w-20 h-1 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar size={28} className="text-blue-600 mr-2" />
            Book an Appointment
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {!showConfirmation ? (
              <>
                {renderStepIndicator()}
                
                {currentStep === 1 && renderDoctorSelection()}
                {currentStep === 2 && renderDateSelection()}
                {currentStep === 3 && renderConfirmation()}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !selectedDoctor) ||
                      (currentStep === 2 && (!selectedDate || !selectedTime))
                    }
                    className={`px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors ${
                      (currentStep === 1 && !selectedDoctor) ||
                      (currentStep === 2 && (!selectedDate || !selectedTime))
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {currentStep === 3 ? 'Book Appointment' : 'Continue'}
                  </button>
                </div>
              </>
            ) : (
              renderSuccessConfirmation()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;