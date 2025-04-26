import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import EditUserPage from './pages/EditUserPage';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { theme } = useThemeStore();

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}>
      <Router>
        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={accessToken ? <Dashboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/dashboard/new"
            element={accessToken ? <NewUser /> : <Navigate to="/" replace />}
          />
          
          {/* Route for EditUserPage with dynamic ID */}
          <Route
            path="/dashboard/edit/:id"
            element={accessToken ? <EditUserRoute /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Router>

      {/* Add the ToastContainer to show toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};


const EditUserRoute = () => {
  const { id } = useParams<{ id: string }>();

  
  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  return <EditUserPage id={id} />;
};

export default App;
