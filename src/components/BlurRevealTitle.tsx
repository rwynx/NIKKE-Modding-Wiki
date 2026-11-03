import React, { useEffect, useRef, useState } from 'react';

interface BlurRevealTitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export const BlurRevealTitle: React.FC<BlurRevealTitleProps> = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        inView
          ? 'opacity-100 filter-none translate-y-0'
          : 'opacity-0 blur-[10px] translate-y-2'
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, filter, transform',
      }}
    >
      {children}
    </Tag>
  );
};
