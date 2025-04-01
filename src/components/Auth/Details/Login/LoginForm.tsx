/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "../../../ui/card";
import { useForm } from "react-hook-form";
import Google from "../../../../../public/google.svg";
import { Toaster } from "../../../ui/toaster";

const LoginForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full lg:w-1/2">
      <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF] p-4">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full ${errors.email ? "border-red-500" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#7F56D9] focus:ring-[#7F56D9] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember for 30 days
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-[#7F56D9] hover:text-[#6941C6]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <Button className="w-full bg-[#7F56D9] hover:bg-[#6941C6] text-white py-2 text-lg">
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-3 py-2 text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <img
                src={Google}
                alt="Google logo"
                className="w-[40px] h-[24px]"
              />
              Sign in with Google
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-[#7F56D9] hover:text-[#6941C6]"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginForm;
