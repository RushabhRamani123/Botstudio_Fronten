import TestimonialCarousel from "./Testimonial";
import SignupForm from "./SignupForm";
function Signup(): JSX.Element {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full lg:w-1/2">
        <SignupForm />
      </div>
      <div className="hidden md:block relative w-full md:w-1/2 bg-custom-woman bg-cover bg-center h-min-screen">
        <TestimonialCarousel />
      </div>
    </div>
  );
}
export default Signup;