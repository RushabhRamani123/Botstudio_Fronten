import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { useToast } from "../../hooks/use-toast"
import { Toaster } from "../ui/toaster"

interface OTPInputProps {
  length?: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4 }) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    inputRefs.current[0]?.focus();
  }, [length]);

  const handleChange = (index: number, value: string): void => {
    console.log(index + " " + value);
    if (isNaN(Number(value))) return;
    const newOTP = [...otp];
    newOTP[index] = value.slice(0, 1);
    setOTP(newOTP);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOTP = [...otp];
        console.log(newOTP);
        newOTP[index] = '';
        setOTP(newOTP);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
    const newOTP = [...otp];
    pastedData.forEach((value, index) => {
      if (index < length && !isNaN(Number(value))) {
        newOTP[index] = value;
      }
    });
    setOTP(newOTP);
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  const handleVerify = () => {
    if (otp.join('') === '123456') {
      toast({
        title: "OTP Verified",
        description: "Your email has been verified successfully.",
        variant:"default",
      })
    } else {
      toast({
        title: "Incorrect OTP",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg">
          <div className="flex space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-2xl text-center border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <button 
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
            onClick={handleVerify}
          >
            Verify email
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default OTPInput;