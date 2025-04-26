import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth'; 
import { useNavigate } from 'react-router-dom'; 
import { FaMoon, FaSun } from 'react-icons/fa'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); 

  const setAuth = useAuthStore((state) => state.setAuth); 
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setError('');
    
    if (email === 'academy@gmail.com' && password === 'academy123') {
      
      setAuth('fake-access-token', 3600);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className={`p-8 rounded-lg shadow-lg w-96 ${darkMode ? 'bg-gray-700 text-white' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Login</h2>
          <button onClick={toggleDarkMode} className={`text-xl ${darkMode ? 'text-white' : 'text-black'}`}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Email</label>
            <input
              type="email"
              id="email"
              className={`w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-600 text-white' : 'text-black'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-600 text-white' : 'text-black'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
