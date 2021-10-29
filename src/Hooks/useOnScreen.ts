import React, { useState, useEffect } from 'react'

export function useOnScreen<T extends HTMLElement> (ref: React.MutableRefObject<T>): boolean {
	const [isOnScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      {
        // threshold: [0.25, 0.5, 0.75],
        threshold: [0.75],
      }
    )

      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      }
    })

    return isOnScreen;
  };
