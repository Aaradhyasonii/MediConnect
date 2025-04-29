import React, { useState } from 'react';
import { Search, Stethoscope, Calendar, Activity, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { specialties, doctors } from '../data/mockData';
import AIChat from '../components/ai/AIChat';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showAiChat, setShowAiChat] = useState(false);

  const features = [
    {
      icon: <Stethoscope size={32} className="text-blue-600" />,
      title: 'Find Specialists',
      description: 'Connect with top doctors across various specialties for in-person or virtual visits.'
    },
    {
      icon: <Calendar size={32} className="text-blue-600" />,
      title: 'Easy Scheduling',
      description: 'Book appointments instantly with our intuitive calendar system. No more waiting on hold.'
    },
    {
      icon: <Activity size={32} className="text-blue-600" />,
      title: 'AI Symptom Checker',
      description: 'Get preliminary insights about your symptoms before your doctor visit.'
    },
    {
      icon: <MessageSquare size={32} className="text-blue-600" />,
      title: 'Secure Messaging',
      description: 'Communicate directly with your healthcare providers in a secure environment.'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 z-10 opacity-60"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20 pt-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fadeIn">
              Modern Healthcare at Your Fingertips
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fadeIn animation-delay-200">
              Book appointments with top doctors, check your symptoms with AI, and manage your health journey—all in one place.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg animate-fadeIn animation-delay-400">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                  <select
                    id="specialty"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <input
                      id="search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="Doctor name, condition, etc."
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Link
                    to="/doctors"
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <span>Find Doctors</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/symptom-checker"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 transition-colors rounded-md text-white font-medium flex items-center justify-center"
              >
                <Activity size={20} className="mr-2" />
                Check Symptoms
              </Link>
              <button
                onClick={() => setShowAiChat(true)}
                className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors backdrop-blur-sm rounded-md text-white font-medium flex items-center justify-center border border-white border-opacity-40"
              >
                <MessageSquare size={20} className="mr-2" />
                Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Healthcare Made Simple
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform brings together doctors, patients, and AI technology to create a seamless healthcare experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Specialists
            </h2>
            <Link
              to="/doctors"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span className="font-medium">View All</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      {doctor.rating} ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                  <Link
                    to={`/doctors/${doctor.id}`}
                    className="block w-full py-2 bg-blue-50 text-blue-600 rounded text-center font-medium hover:bg-blue-100 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take control of your health?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of patients who have simplified their healthcare journey with MediConnect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Create an Account
            </Link>
            <Link
              to="/doctors"
              className="px-8 py-3 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition-colors"
            >
              Find a Doctor
            </Link>
          </div>
        </div>
      </section>

      {/* AI Chat Modal */}
      {showAiChat && (
        <AIChat onClose={() => setShowAiChat(false)} />
      )}
    </div>
  );
};

export default HomePage;