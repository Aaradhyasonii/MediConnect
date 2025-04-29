import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Doctor, Appointment } from '../types';
import { doctors } from '../data/mockData';

// Define context type
interface AppContextType {
  user: { name: string; isLoggedIn: boolean } | null;
  doctors: Doctor[];
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  login: (name: string) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; isLoggedIn: boolean } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Read user from localStorage when app loads with proper error handling
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const login = (name: string) => {
    const userData = { name, isLoggedIn: true };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      user,
      doctors,
      appointments,
      addAppointment,
      cancelAppointment,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};