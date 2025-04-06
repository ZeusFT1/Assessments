import React, { useState } from 'react';

const usersData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'active',
    dob: '1990-05-15',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'locked',
    dob: '1988-10-22',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    status: 'active',
    dob: '1995-02-10',
  },{
    firstName: 'Bob',
    lastName: '',
    email: 'bob.martin@example.com',
    status: 'locked',
    dob: '1980-08-05',
  },{
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    status: 'active',
    dob: '1992-11-30',
  },{
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@example.com',
    status: 'locked',
    dob: '1987-07-14',
  },{
    firstName: 'Eve',
    lastName: '',
    email: 'eve.green@example.com',
    status: 'active',
    dob: '1993-09-21',
  },{
    firstName: 'Frank',
    lastName: 'White',
    email: 'frank.white@example.com',
    status: 'active',
    dob: '1994-01-25',
  },{
    firstName: 'Grace',
    lastName: 'Black',
    email: 'grace.black@example.com',
    status: 'locked',
    dob: '1985-03-17',
  },{
    firstName: 'Hannah',
    lastName: '',
    email: 'hannah.purple@example.com',
    status: 'active',
    dob: '1996-12-03',
  },
];

const getInitials = (first, last) => {
  return `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Split the search term into words and filter users based on each word
  const filteredUsers = usersData.filter(user => {
    const searchWords = searchTerm.toLowerCase().split(' '); // Split search term into words

    // Check if all search words match any part of the user's first name, last name, or email
    return searchWords.every(word =>
      user.firstName.toLowerCase().includes(word) ||
      user.lastName.toLowerCase().includes(word) ||
      user.email.toLowerCase().includes(word)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav */}
      <nav className="bg-[#3251D0] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-3">
          <button className="bg-white text-[#3251D0] font-semibold px-4 py-2 rounded hover:bg-gray-200">Create User</button>
          <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600">Logout</button>
          <button className="text-xl">🌙</button>
        </div>
      </nav>

      {/* Search */}
      <div className="p-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full max-w-md p-2 border border-gray-300 rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Cards */}
      <div className="px-6 pb-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow flex flex-col gap-2"
          >
            {/* Initials Bubble */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#3251D0] text-white text-xl font-bold mx-auto">
              {getInitials(user.firstName, user.lastName)}
            </div>

            <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-gray-700">Email: {user.email}</p>
            <p className="text-sm text-gray-700 capitalize">Status: {user.status}</p>
            <p className="text-sm text-gray-700">Date of Birth: {user.dob}</p>

            {/* Buttons */}
            <div className="flex gap-2 mt-2 ml-auto">
              <button className="bg-[#3251D0] text-white text-sm px-4 py-1 rounded hover:bg-blue-700">Edit</button>
              <button className="bg-red-500 text-white text-sm px-4 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
