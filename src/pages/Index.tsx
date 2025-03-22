
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MessageSquare, MapPin, Send } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import InstructionCard from '@/components/InstructionCard';

const Index = () => {
  const navigate = useNavigate();
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Animation on page load
  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  const instructionSteps = [
    {
      title: 'Describe the Situation',
      description: 'Provide details about your emergency situation so we can understand how to help.',
      icon: <MessageSquare size={28} />,
    },
    {
      title: 'Share Your Location',
      description: 'Enter your precise address to ensure emergency services can find you quickly.',
      icon: <MapPin size={28} />,
    },
    {
      title: 'Submit Report',
      description: 'Send your emergency report, and we'll ensure it reaches the right responders.',
      icon: <Send size={28} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-white to-blue-light/30"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div 
              className={`transition-all duration-700 transform ${
                isHeroVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="inline-block animate-pulse-gentle mb-3 px-3 py-1 bg-blue/10 rounded-full text-blue font-medium">
                Emergency Reporting Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
                RescueHub: We're Here to Help
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Report emergencies quickly and efficiently to get the help you need. 
                Our platform connects you directly with emergency services.
              </p>
              <Button 
                variant="emergency"
                size="lg"
                icon={<AlertTriangle className="h-5 w-5" />}
                onClick={() => navigate('/report')}
                className="shadow-lg"
              >
                Report an Emergency
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instructions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Follow these simple steps to report an emergency situation and receive assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {instructionSteps.map((step, index) => (
              <InstructionCard
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blue-light/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Ready to Report an Emergency?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't wait. If you're experiencing an emergency situation, 
              report it now to get the help you need quickly.
            </p>
            <Button 
              variant="emergency"
              size="lg"
              icon={<AlertTriangle className="h-5 w-5" />}
              onClick={() => navigate('/report')}
              className="shadow-lg"
            >
              Report an Emergency
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
