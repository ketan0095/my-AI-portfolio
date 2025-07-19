'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Users } from 'lucide-react';
import {
  motion,
  useInView,
  type SpringOptions,
  type UseInViewOptions,
} from 'motion/react';
import React, { useCallback, useEffect, useState } from 'react';

const linkedinButtonVariants = cva(
  'cursor-pointer relative overflow-hidden will-change-transform backface-visibility-hidden transform-gpu transition-transform duration-200 ease-out hover:scale-105 group whitespace-nowrap focus-visible:outline-hidden inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[#0077B5] hover:bg-[#005885] text-white border-[#0077B5] dark:bg-[#0077B5] dark:border-[#005885] dark:text-white dark:hover:bg-[#005885]',
        outline:
          'bg-background text-[#0077B5] border border-[#0077B5] hover:bg-[#0077B5] hover:text-white',
        ghost:
          'bg-transparent text-[#0077B5] hover:bg-[#0077B5]/10 border-transparent',
      },
      size: {
        default:
          'h-8.5 rounded-md px-3 gap-2 text-[0.8125rem] leading-none [&_svg]:size-4 gap-2',
        sm: 'h-7 rounded-md px-2.5 gap-1.5 text-xs leading-none [&_svg]:size-3.5 gap-1.5',
        lg: 'h-10 rounded-md px-4 gap-2.5 text-sm leading-none [&_svg]:size-5 gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface LinkedinButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof linkedinButtonVariants> {
  roundConnections?: boolean;
  fixedWidth?: boolean;
  initialConnections?: number;
  connectionsClass?: string;
  animationDuration?: number;
  animationDelay?: number;
  autoAnimate?: boolean;
  onAnimationComplete?: () => void;
  showLinkedinIcon?: boolean;
  filled?: boolean;
  profileUrl: string; // Required LinkedIn profile URL
  label?: string;
  useInViewTrigger?: boolean;
  inViewOptions?: UseInViewOptions;
  transition?: SpringOptions;
}

function LinkedinButton({
  initialConnections = 0,
  connectionsClass = '',
  fixedWidth = true,
  animationDuration = 2,
  animationDelay = 0,
  autoAnimate = true,
  className,
  variant = 'default',
  size = 'default',
  showLinkedinIcon = true,
  roundConnections = false,
  filled = false,
  profileUrl, // Required
  onClick,
  label = '',
  useInViewTrigger = false,
  inViewOptions = { once: true },
  transition,
  ...props
}: LinkedinButtonProps) {
  const [targetConnections, setTargetConnections] = useState<number | null>(null);
  const [currentConnections, setCurrentConnections] = useState(initialConnections);
  const [isAnimating, setIsAnimating] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(filled ? 100 : 0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const formatNumber = (num: number) => {
    const units = ['k', 'M', 'B', 'T'];
    if (roundConnections && num >= 1000) {
      let unitIndex = -1;
      let value = num;
      while (value >= 1000 && unitIndex < units.length - 1) {
        value /= 1000;
        unitIndex++;
      }
      const formatted = value % 1 === 0 ? value.toString() : value.toFixed(1);
      return `${formatted}${units[unitIndex]}`;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Mock API call - in real implementation, you'd fetch from LinkedIn API or your backend
  useEffect(() => {
    // Simulate fetching connection count
    // fetch actual connections here
    const mockConnections = 1204;
    setTimeout(() => {
      setTargetConnections(mockConnections);
    }, 100);
  }, []);

  const startAnimation = useCallback(() => {
    if (isAnimating || hasAnimated || targetConnections === null) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = 0;
    const endValue = targetConnections;
    const duration = animationDuration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const newConnections = Math.round(
        startValue + (endValue - startValue) * easeOutQuart
      );
      setCurrentConnections(newConnections);
      setConnectionProgress(progress * 100);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentConnections(endValue);
        setConnectionProgress(100);
        setIsAnimating(false);
        setHasAnimated(true);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, animationDelay * 1000);
  }, [
    isAnimating,
    hasAnimated,
    targetConnections,
    animationDuration,
    animationDelay,
  ]);

  const ref = React.useRef(null);
  const isInView = useInView(ref, inViewOptions);

  useEffect(() => {
    if (targetConnections === null) return;
    if (useInViewTrigger) {
      if (isInView && !hasAnimated) {
        startAnimation();
      }
    } else if (autoAnimate && !hasAnimated) {
      startAnimation();
    }
  }, [
    autoAnimate,
    useInViewTrigger,
    isInView,
    hasAnimated,
    startAnimation,
    targetConnections,
  ]);

  const navigateToProfile = () => {
    if (!profileUrl) return;
    try {
      const link = document.createElement('a');
      link.href = profileUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      try {
        window.open(profileUrl, '_blank', 'noopener,noreferrer');
      } catch {
        window.location.href = profileUrl;
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
      return;
    }
    if (profileUrl) {
      navigateToProfile();
    } else if (!hasAnimated) {
      startAnimation();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (profileUrl) {
        navigateToProfile();
      } else if (!hasAnimated) {
        startAnimation();
      }
    }
  };

  return (
    <button
      ref={ref}
      className={cn(linkedinButtonVariants({ variant, size, className }))}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={profileUrl ? `Connect on LinkedIn: ${label}` : label}
      {...props}
    >
      {showLinkedinIcon && (
        <svg 
          role="img" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )}

      {/* <span>{label}</span> */}

      <div className="relative inline-flex shrink-0">
 
        <Users
          className="fill-[#ffffff] text-[#ffffff]"
          aria-hidden="true"
          style={{
            clipPath: `inset(${100 - connectionProgress}% 0 0 0)`,
            color: "white"
          }}
        />
      </div>

      {targetConnections !== null && (
        <div
          className={cn(
            'relative flex flex-col overflow-hidden font-semibold',
            connectionsClass
          )}
        >
          <motion.div
            animate={{ opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              ...transition,
            }}
            className="tabular-nums"
          >
            <span>{currentConnections > 0 && formatNumber(currentConnections)}</span>
          </motion.div>
          {fixedWidth && (
            <span className="h-0 overflow-hidden tabular-nums opacity-0">
              {targetConnections !== null ? formatNumber(targetConnections) : ''}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export { LinkedinButton, linkedinButtonVariants };
export type { LinkedinButtonProps };