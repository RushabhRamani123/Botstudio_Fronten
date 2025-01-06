import { useForm, SubmitHandler } from "react-hook-form";
interface FormValues {
  email: string;
}
const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 12.879A3 3 0 0116.243 4.757m5.657 5.657A9 9 0 1111.414 2.93a9.003 9.003 0 015.657 5.657z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Forgot password?
        </h2>
        <p className="text-sm text-center text-gray-600">
          No worries, we'll send you reset instructions.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              type="email"
              autoComplete="email"
              className={`block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#7F56D9] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Reset password
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <a href="#" className="font-medium hover:text-[#7F56D9]">
            Back to log in
          </a>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;