import React from 'react';
import LoginForm from './LoginForm';
import Testimonial from './Testimonial';

const Login: React.FC = () => {
  const handleSubmit = (data: { email: string; password: string }) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex w-full min-h-screen">
      <Testimonial />
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;