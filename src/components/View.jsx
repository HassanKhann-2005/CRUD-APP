import React,{useState, useEffect } from 'react';

const View = ({ user, isOpen: initialOpen = false, onClose }) => {

    const [open, setopen] = useState(initialOpen);

    useEffect(() => {
        setopen(initialOpen);
    }, [initialOpen]);

    const handleClose = () => {
        setopen(false);
        if (onClose) onClose();
    };
    // Don't render if not open or if user is null/undefined
    if (!open || !user) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">User Details</h3>
                <div className="space-y-4">
                    <p className="text-gray-700"><strong>Name:</strong> {user?.name || 'N/A'}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {user?.email || 'N/A'}</p>
                    <p className="text-gray-700"><strong>Age:</strong> {user?.age || 'N/A'}</p>
                    <p className="text-gray-700"><strong>Gender:</strong> {user?.gender || 'N/A'}</p>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default View;