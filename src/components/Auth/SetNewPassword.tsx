import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Lock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

const SetNewPasswordComponent: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<PasswordFormData>({
    mode: 'onChange'
  });

  const password = watch('password', '');

  const onSubmit: SubmitHandler<PasswordFormData> = (data) => {
    console.log('Password reset submitted:', data);
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <Card className="w-full max-w-md shadow-none border-none">
        <CardHeader className="space-y-1 items-center">
          <div className="rounded-md shadow-sm border bg-white p-3 inline-block">
            <Lock className="h-6 w-6 text-gray-500" />
          </div>
          <h2 className="text-2xl font-semibold text-center">Set new password</h2>
          <p className="text-sm text-gray-500 text-center">
            Your new password must be different to previously used passwords.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { 
                    value: 8, 
                    message: 'Password must be at least 8 characters' 
                  },
                  pattern: {
                    value: /[!@#$%^&*(),.?":{}|<>]/,
                    message: 'Password must contain at least one special character'
                  }
                })}
                className="w-full focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'The passwords do not match'
                })}
                className="w-full focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="minChars" 
                  checked={password.length >= 8}
                  // readOnly
                />
                <label htmlFor="minChars" className={`text-sm ${password.length >= 8 ? 'text-green-500' : 'text-gray-500'}`}>
                  Must be at least 8 characters
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="specialChar"
                  checked={/[!@#$%^&*(),.?":{}|<>]/.test(password)}
                  // readOnly
                />
                <label htmlFor="specialChar" className={`text-sm ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>
                  Must contain one special character
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Reset password
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
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

export default SetNewPasswordComponent;