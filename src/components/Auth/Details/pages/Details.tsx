import React, { useState, ChangeEvent } from 'react';

interface DetailsFormProps {
  onComplete: (name: string, email: string) => void;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ onComplete }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email) {
      onComplete(name, email);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Your details</h2>
      <p className="text-sm text-gray-500 mb-8">Please provide your name and email.</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Full name"
          className="w-full p-3 border border-gray-300 rounded-md text-sm"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="mb-8">
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 border border-gray-300 rounded-md text-sm"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-[#53389e] text-white py-3 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
      >
        Continue
      </button>
    </form>
  );
};

export default DetailsForm;