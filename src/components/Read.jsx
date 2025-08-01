import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { showUsers, deleteUser } from '../app/features/userDetailSlice';
import Swal from 'sweetalert2';
import View from './View';
import Edit from './Edit';

// we use useSelector to acces data from global state

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, searchUser } = useSelector((state) => state.app);  // app is from the reducer of store which is giving us user details 
  console.log('Users:', users, 'SearchUser:', searchUser);


  // {users,loading} means we just want users and loading from app

  useEffect(() => {
    dispatch(showUsers());
  }, []);

  // Show loading alert only for the initial fetch
  // This effect will show a loading alert when the component mounts and data is being fetched

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        Swal.fire({
          title: 'Loading...',
          text: 'Please wait while we fetch the user data. This is taking longer than expected.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        if (users && users.length === 0) {
          Swal.update({
            title: 'Data Not Found',
            text: 'No user data was found.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            didClose: () => {
              Swal.close();
            },
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              // No additional action needed
            }
          });
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else if (!loading && Swal.isVisible()) {
      Swal.close();
    }
  }, [loading, users]);

  const [viewId, setViewId] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (element) => {
    setViewId(element.id);
    setIsViewing(true);
  };

  const handleCloseView = () => {
    setIsViewing(false);
    setViewId(null);
  };

  const handleEdit = (element) => {
    setEditId(element.id);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditId(null);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire({
          title: 'Deleted!',
          text: 'The user has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const selectedUser = users.find((element) => element.id === viewId) || null;
  const selectedEditUser = users.find((element) => element.id === editId) || null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {isViewing && <View user={selectedUser} isOpen={isViewing} onClose={handleCloseView} />}
          {isEditing && <Edit user={selectedEditUser} isOpen={isEditing} onClose={handleCloseEdit} />}
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">User List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center text-gray-500 col-span-full">Loading users...</p>
            ) : users && users.length > 0 ? (
              (() => {
                const filteredUsers = users.filter((e) => {
                  console.log('Filtering:', e.name, 'includes', searchUser, ':', e.name.toLowerCase().includes(searchUser.toLowerCase()));
                  if (searchUser.length === 0) {
                    return true;
                  } else {
                    return e.name.toLowerCase().includes(searchUser.toLowerCase());
                  }
                });
                
                return filteredUsers.length > 0 ? (
                  filteredUsers.map((element, index) => (
                    <div key={element.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">User {index + 1}</h3>
                      <p className="text-gray-700"><strong>Name:</strong> {element.name || 'N/A'}</p>
                      <p className="text-gray-700"><strong>Email:</strong> {element.email || 'N/A'}</p>
                      <p className="text-gray-700"><strong>Age:</strong> {element.age || 'N/A'}</p>
                      <p className="text-gray-700"><strong>Gender:</strong> {element.gender || 'N/A'}</p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          className="px-3 py-1 bg-slate-500 text-white rounded-md hover:bg-slate-600"
                          onClick={() => handleView(element)}
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={() => handleDelete(element.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          onClick={() => handleEdit(element)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    {searchUser.length > 0 ? `No users found matching "${searchUser}"` : 'No users found.'}
                  </p>
                );
              })()
            ) : (
              <p className="text-center text-gray-500 col-span-full">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Read;