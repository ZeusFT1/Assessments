import { useQuery } from '@tanstack/react-query';
import { getUserById, updateUser } from '@/services/userService';
import { User } from '@/services/userService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EditUserPage = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const { data, error, isLoading } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const handleSave = async () => {
    if (user) {
      const updated = await updateUser(user.id, user);
      if ('id' in updated) {
        navigate('/dashboard');
      } else {
        alert('Error updating user: ' + updated.message);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No user found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="flex flex-col gap-4"
      >
        <label>
          First Name:
          <input
            type="text"
            value={user?.firstName || ''}
            onChange={(e) =>
              setUser((prev) => (prev ? { ...prev, firstName: e.target.value } : prev))
            }
            className="border p-2 w-full"
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={user?.lastName || ''}
            onChange={(e) =>
              setUser((prev) => (prev ? { ...prev, lastName: e.target.value } : prev))
            }
            className="border p-2 w-full"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={user?.email || ''}
            onChange={(e) =>
              setUser((prev) => (prev ? { ...prev, email: e.target.value } : prev))
            }
            className="border p-2 w-full"
          />
        </label>

        {/* Status Dropdown */}
        <label>
          Status:
          <select
            value={user?.status || 'active'}
            onChange={(e) =>
              setUser((prev) => (prev ? { ...prev, status: e.target.value } : prev))
            }
            className="border p-2 w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;
