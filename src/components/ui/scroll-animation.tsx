import { cn } from '@/lib/utils';
import {
  motion,
  HTMLMotionProps,
  SVGMotionProps,
  Variant,
  useReducedMotion,
} from 'motion/react';
import React, { forwardRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const generateVariants = (
  direction: Direction
): { hidden: Variant; visible: Variant } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'down' ? 24 : -24;

  return {
    hidden: { opacity: 0, [axis]: value },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

const defaultViewport = { amount: 0.15, once: true };

type MotionComponentProps = HTMLMotionProps<any> & SVGMotionProps<any>;

interface componentProps extends Omit<MotionComponentProps, 'children'> {
  children: React.ReactNode;
  className?: string;
  variants?: {
    hidden?: Variant;
    visible?: Variant;
  };
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  delay?: number;
  direction?: Direction;
}

const component = forwardRef<HTMLDivElement, componentProps>(
  (
    {
      children,
      className,
      variants,
      viewport = defaultViewport,
      delay = 0,
      direction = 'down',
      ...rest
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();
    const baseVariants = variants || generateVariants(direction);
    const modifiedVariants = {
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          ...(baseVariants.visible as { transition?: any }).transition,
          delay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        whileInView='visible'
        initial={reducedMotion ? false : 'hidden'}
        animate={reducedMotion ? 'visible' : undefined}
        variants={modifiedVariants}
        viewport={{ ...defaultViewport, ...viewport }}
        className={cn(className)}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

component.displayName = 'component';

export default component;
export { component as ScrollAnimation };
