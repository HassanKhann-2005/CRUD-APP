import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../app/features/userDetailSlice';
import Swal from 'sweetalert2';

const Edit = ({ user, isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '', // Ensure age is a string to handle empty input
        gender: user.gender || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age') {
      // Sanitize age input: remove decimal points and negative signs, allow only digits
      const sanitizedValue = value.replace(/[^0-9]/g, ''); // Keep only numbers
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    // Validate email
    if (!formData.email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address with @ symbol.',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Validate age
    if (formData.age === '' || parseInt(formData.age) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Age',
        text: 'Please enter a valid age greater than 0.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (user && user.id) {
      dispatch(editUser({ id: user.id, data: formData }));
      Swal.fire({
        title: 'Success!',
        text: 'Data saved successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          onClose();
        },
      });
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">Edit User</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="1" // HTML5 attribute to suggest minimum value
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;