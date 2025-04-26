import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createUser, User } from '@/services/userService';
import { z } from 'zod';
import { toast } from 'react-toastify';

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  status: z.string().min(1, 'Status is required'),
  dob: z.string().min(1, 'Date of birth is required'),
});

type FormData = z.infer<typeof userSchema>;

const NewUser: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User created successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error('Error creating user: ' + error.message);
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const userToCreate: User = {
        id: '', 
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        status: data.status,
        dob: data.dob,
      };

      await mutateAsync(userToCreate);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      <h1 className="text-2xl font-semibold mb-4">Create New User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form Fields */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Status Dropdown */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium">Status</label>
          <select
            id="status"
            {...register('status')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register('dob')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-500 text-white font-semibold px-6 py-2 rounded"
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default NewUser;
