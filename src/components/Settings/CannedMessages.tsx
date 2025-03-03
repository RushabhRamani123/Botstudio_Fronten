import React, { useState } from 'react';

const CannedMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for canned messages
  const [cannedMessages, setCannedMessages] = useState([
    // Add your canned messages here
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Manage</h1>
        <h2 className="text-xl font-semibold mb-4">Canned Messages</h2>
        <p className="text-gray-600">You can save canned message templates and use them in live chat.</p>
      </div>

      {/* Quick Guide */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-2">Quick Guide</h3>
        <p className="text-gray-600 mb-4">How to create Canned Message?</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create Canned Message
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search canned messages by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Canned Messages Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Favourite</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cannedMessages.length > 0 ? (
              cannedMessages.map((message, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.text}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.createdBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-yellow-500 hover:text-yellow-700">⭐</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No canned messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CannedMessages;