import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers, User, deleteUser } from '@/services/userService';
import { toast } from 'react-toastify'; 

const getInitials = (first: string, last: string): string => {
  return `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();

  
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { data: users = [], isLoading, isError } = useQuery<User[], Error>({
    queryKey: ['users', searchTerm],
    queryFn: () => getUsers(searchTerm),
  });

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const handleLogout = () => {
    logout();
  };

  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        queryClient.invalidateQueries({ queryKey: ['users', searchTerm] });
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Error deleting user');
      } finally {
        setShowModal(false);
        setUserToDelete(null);
      }
    }
  };

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-black min-h-screen'}>
      {/* Nav */}
      <nav className="bg-[#3251D0] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/new')}
            className="bg-white text-[#3251D0] font-semibold px-4 py-2 rounded hover:bg-gray-200"
          >
            Create User
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={toggleTheme}
            className="bg-white text-[#3251D0] font-semibold px-4 py-2 rounded hover:bg-gray-200"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>

      {/* Search */}
      <div className="p-6">
        <input
          type="text"
          placeholder="Search users..."
          className={`w-full max-w-md p-2 border border-gray-300 rounded shadow-sm ${theme === 'dark' ? 'text-black' : ''}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Error / Loading */}
      {isLoading ? (
        <div className="text-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">Error loading users.</div>
      ) : (
        <div className={`px-6 pb-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {Array.isArray(users) && users.length === 0 ? (
            <div>No users found.</div>
          ) : (
            Array.isArray(users) &&
            users.map((user) => (
              <div
                key={user.id}
                className={theme === 'dark' ? 'bg-gray-800 p-4 rounded shadow flex flex-col gap-2' : 'bg-white p-4 rounded shadow flex flex-col gap-2'}
              >
                {/* Initials Bubble */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#3251D0] text-white text-xl font-bold mx-auto">
                  {getInitials(user.firstName, user.lastName)}
                </div>

                <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-sm">{user.email}</p>
                <p className="text-sm capitalize">{user.status}</p>
                <p className="text-sm">{user.dob}</p>

                {/* Buttons */}
                <div className="flex gap-2 mt-2 ml-auto">
                  <button
                    onClick={() => navigate(`/dashboard/edit/${user.id}`)}
                    className="bg-[#3251D0] text-white text-sm px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteUser(user)}
                    className="bg-red-500 text-white text-sm px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-black">Confirm Deletion</h2>
            <p className="mb-4 text-black">
              Are you sure you want to delete{' '}
              <span className="font-bold">{userToDelete?.firstName} {userToDelete?.lastName}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
