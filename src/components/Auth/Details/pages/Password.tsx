import React, { useState, useRef } from 'react'; // Added missing imports
interface PasswordFormProps {
  onComplete: (password: string) => void;
}
const PasswordForm: React.FC<PasswordFormProps> = ({ onComplete }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const confirmInputRef = useRef<HTMLInputElement>(null);

  const calculatePasswordStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/\d/)) strength++;
    if (pwd.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
    if (newPassword.length >= 8 && confirmInputRef.current) {
      confirmInputRef.current.focus();
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword && passwordStrength >= 3) {
      onComplete(password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Choose a password</h2>
      <p className="text-sm text-gray-500 mb-8">Must be at least 8 characters.</p>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Choose a password"
          className="w-full p-3 border border-gray-300 rounded-md text-sm"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="mb-8">
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-3 border border-gray-300 rounded-md text-sm"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          ref={confirmInputRef}
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-[#53389e] text-white py-3 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
        disabled={passwordStrength < 3 || password !== confirmPassword}
      >
        Continue
      </button>
    </form>
  );
};
export default PasswordForm;