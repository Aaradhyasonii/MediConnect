import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, Filter, MapPin, Calendar, Star } from 'lucide-react';
import { specialties } from '../data/mockData';
import { Doctor } from '../types';

const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();
  const { doctors } = useApp();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let results = doctors;
    
    if (searchTerm) {
      results = results.filter(
        doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialty) {
      results = results.filter(doctor => doctor.specialty === selectedSpecialty);
    }
    
    setFilteredDoctors(results);
  }, [searchTerm, selectedSpecialty, doctors]);

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Doctors</h1>
          <p className="text-gray-600 mb-8">
            Connect with top specialists across various medical fields.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black"
                    placeholder="Search by name or specialty"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              
              <div className="flex-1">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black">
                    <option>Any Time</option>
                    <option>Today</option>
                    <option>Next 3 Days</option>
                    <option>This Week</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black">
                    <option>Any Rating</option>
                    <option>4+ Stars</option>
                    <option>3+ Stars</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-black">
                    <option>Relevance</option>
                    <option>Highest Rated</option>
                    <option>Most Reviews</option>
                    <option>Experience</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          {/* Doctor List */}
          <div className="space-y-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-48 md:h-40 object-cover object-center rounded-md"
                      />
                    </div>
                    
                    <div className="md:w-3/4 md:pl-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h2>
                          <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                          
                          <div className="flex items-center mb-3">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  fill={i < Math.floor(doctor.rating) ? 'currentColor' : 'none'}
                                  className={i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="text-gray-600 text-sm ml-2">
                              {doctor.rating} ({doctor.reviewCount} reviews)
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            <span className="font-medium">{doctor.experience} years</span> of experience
                          </p>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                          <button 
                            onClick={() => navigate('/appointments', { state: { doctor } })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <Calendar size={18} className="mr-2" />
                            Book Appointment
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h3 className="font-medium text-gray-900 mb-1">About</h3>
                        <p className="text-gray-600 line-clamp-3">{doctor.bio}</p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {doctor.availability.days.join(', ')}
                        </div>
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <MapPin size={14} className="mr-1" />
                          Virtual & In-Person
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <img
                  src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="No doctors found"
                  className="w-48 h-48 object-cover mx-auto mb-6 rounded-full opacity-75"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or select a different specialty.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialty('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;