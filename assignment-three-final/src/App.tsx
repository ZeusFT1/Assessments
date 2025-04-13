import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';

const App: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { theme } = useThemeStore();

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={accessToken ? <Dashboard /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
