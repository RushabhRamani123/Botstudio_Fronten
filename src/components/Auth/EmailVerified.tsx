import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const EmailVerificationUI: React.FC = () => {
  return (
    <Card className="border-none shadow-none w-full max-w-md mx-auto">
      <CardContent className="pt-6 text-center">
        <div className="mb-4">
          <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Email verified</h2>
        <p className="text-gray-600 mb-4">
          Your password has been successfully reset.
          <br />
          Click below to log in magically.
        </p>
        <Button className="w-full bg-purple-500 hover:bg-purple-600">Continue</Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center pt-0">
        <p className="text-sm text-gray-600 mb-2">
          Didn't receive the email? <a href="#" className="text-purple-500 hover:underline">Click to resend</a>
        </p>
        <a href="#" className="text-sm text-gray-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to log in
        </a>
      </CardFooter>
    </Card>
  );
};

export default EmailVerificationUI;