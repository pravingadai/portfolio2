import { useState, useEffect, useRef, RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

interface UseInViewResult {
  ref: RefObject<HTMLDivElement>;
  inView: boolean;
}

export function useInView({
  threshold = 0,
  triggerOnce = false,
  rootMargin = "0px",
}: UseInViewOptions = {}): UseInViewResult {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const enteredView = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    if (triggerOnce && enteredView.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          enteredView.current = true;
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}
