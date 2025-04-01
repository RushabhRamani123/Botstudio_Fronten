import React from 'react';
import LoginForm from './LoginForm';
import Testimonial from './Testimonial';

const Login: React.FC = () => {

  return (
    <div className="flex w-full min-h-screen">
      <Testimonial />
      <LoginForm />
    </div>
  );
};

export default Login;