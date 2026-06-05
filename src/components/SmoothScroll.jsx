import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  // Professional high-end smooth scroll settings
  const lenisOptions = {
    duration: 1.0,     // Speed of the scroll animation (in seconds)
    lerp: 0.08,        // Smoothness/inertia (lower = smoother, higher = more instant)
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1, // Scale wheel scroll distance
    touchMultiplier: 2, // Boost touch scroll responsiveness
    infinite: false,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}