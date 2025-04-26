import axios, { AxiosError } from 'axios';


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
}


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});


const handleAxiosError = (error: AxiosError): { message: string } => {
  let errorMessage = 'An error occurred'; 

  if (error.response) {
    
    console.error('Response Error:', error.response.data);
    console.error('Response Status:', error.response.status);
    const errorData = error.response.data as { message?: string };
    errorMessage = errorData?.message || 'An error occurred';
  } else if (error.request) {
    
    console.error('Request Error:', error.request);
    errorMessage = 'No response from server';
  } else {
    
    console.error('Unknown Error:', error.message);
    errorMessage = error.message || 'Something went wrong';
  }

  return { message: errorMessage };
};


export const getUsers = async (searchTerm?: string): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<User[]>('/users');
    let users = response.data;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      users = users.filter(user =>
        user.firstName.toLowerCase().includes(lowerSearch) ||
        user.lastName.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
      );
    }

    return users;
  } catch (error) {
    const errorData = handleAxiosError(error as AxiosError);
    throw new Error(errorData.message);
  }
};


export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    const errorData = handleAxiosError(error as AxiosError);
    throw new Error(errorData.message);
  }
};

// Add a new user
export const createUser = async (newUser: User): Promise<User | { message: string }> => {
  try {
    const response = await axiosInstance.post('/users', newUser); 
    return response.data;
  } catch (error) {
    const errorData = handleAxiosError(error as AxiosError);
    return { message: errorData.message };  
  }
};


export const updateUser = async (id: string, updatedUser: User): Promise<User | { message: string }> => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    const errorData = handleAxiosError(error as AxiosError);
    return { message: errorData.message };
  }
};


export const deleteUser = async (id: string): Promise<void | { message: string }> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    const errorData = handleAxiosError(error as AxiosError);
    return { message: errorData.message };
  }
};
