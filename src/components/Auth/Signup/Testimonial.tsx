import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
const testimonials = [
  {
    quote: "We've been using Untitled to kick start every new project and can't imagine working without it. It's incredible.",
    author: "Caitlyn King",
    position: "Lead Designer, Layers",
    company: "Web Development Agency"
  },
  {
    quote: "Untitled has streamlined our workflow and improved our team's productivity tenfold. It's a game-changer!",
    author: "Alex Johnson",
    position: "CTO, TechNova",
    company: "Software Solutions"
  },
  {
    quote: "The support team at Untitled is top-notch. They've been incredibly responsive and helpful throughout our journey.",
    author: "Samantha Lee",
    position: "Project Manager, Innovate Inc.",
    company: "Digital Innovation Firm"
  }
];
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  const currentTestimonial = testimonials[currentIndex];
  return (
    <Card className="border-none absolute bottom-6 left-6 right-6 lg:left-12 lg:right-12 bg-gray-400 bg-opacity-60 rounded-lg shadow-lg">
      <CardContent className="p-6">
        <p className="text-lg font-medium text-white">
          "{currentTestimonial.quote}"
        </p>
        <div className="mt-4">
          <p className="font-semibold text-white">{currentTestimonial.author}</p>
          <p className="text-sm text-white">{currentTestimonial.position}</p>
          <p className="text-sm text-white">{currentTestimonial.company}</p>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="h-5 w-5 text-white" fill="currentColor" />
            ))}
          </div>
          <div className="ml-auto flex space-x-2">
            <button 
              className="border p-2 rounded-full text-white hover:bg-gray-300 transition-colors"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              className="border p-2 rounded-full text-white hover:bg-gray-300 transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default TestimonialCarousel;