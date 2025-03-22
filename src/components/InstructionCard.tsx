
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InstructionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  className?: string;
}

const InstructionCard = ({ title, description, icon, index, className }: InstructionCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'glass-card p-6 transition-all duration-500 opacity-0 transform translate-y-8',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-blue/10 p-4 mb-4">
          <div className="text-blue">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default InstructionCard;
