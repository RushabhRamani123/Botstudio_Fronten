import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OtpInput from './Otp'; // Assuming you have this component
interface FormInputs {
  email: string;
}
const EmailCheckComponent: React.FC = () => {
  const { handleSubmit } = useForm<FormInputs>();
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormInputs> = () => {
    console.log('Open email app');
  };

  const handleEnterCodeManually = ():void => {
    setShowOtpInput(true);
  };

  const handleOtpComplete = (otp: string): void => {
    console.log('OTP entered:', otp);
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-16">
      <Card className="border-none w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 p-3 rounded-md">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Check your email</h2>
          <p className="text-gray-600 text-center">
            We sent a password reset link to<br />
            <span className="font-semibold">olivia@untitledui.com</span>
          </p>
        </CardHeader>
        <CardContent>
          {!showOtpInput ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button
                type="button"
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={handleEnterCodeManually}
              >
                Enter code manually
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-center text-gray-600">
                Enter the 6-digit code sent to your email
              </p>
              <OtpInput length={6} onComplete={handleOtpComplete} />
            </div>
          )}
          <p className="text-sm text-center mt-4 text-gray-600">
            Didn't receive the email?{' '}
            <a href="#" className="text-purple-600 hover:underline">
              Click to resend
            </a>
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="#" className="text-sm text-gray-600 hover:underline flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to log in
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailCheckComponent;