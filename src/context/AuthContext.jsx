import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/auth/me');
          setUser(data);
        } catch (error) {
          console.error('Failed to authenticate:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);
      
      if (user.role === 'Employee') {
        newSocket.emit('joinRoom', user._id);
      } else if (user.role === 'Team Member') {
        newSocket.emit('joinRoom', user.team_id);
      }
      
      newSocket.on('statusUpdated', (feedback) => {
        setNotifications(prev => [...prev, `Your feedback "${feedback.title}" status changed to ${feedback.status}`]);
        setTimeout(() => setNotifications(prev => prev.slice(1)), 8000);
      });
      
      newSocket.on('newFeedback', (feedback) => {
        setNotifications(prev => [...prev, `New feedback assigned to your team: "${feedback.title}"`]);
        setTimeout(() => setNotifications(prev => prev.slice(1)), 8000);
      });

      return () => newSocket.close();
    }
  }, [user]);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if(socket) socket.close();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && (
        <>
          {children}
          {notifications.length > 0 && (
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
              {notifications.map((msg, i) => (
                <div key={i} className="bg-gray-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-gray-700 glass transform transition-all translate-y-0 opacity-100 flex items-center gap-3 w-80">
                  <div className="flex-shrink-0">
                     <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                  </div>
                  <p className="font-medium text-sm leading-tight">{msg}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </AuthContext.Provider>
  );
};
