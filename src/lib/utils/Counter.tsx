"use client";
import { useEffect, useState } from "react";

type CounterProps = {
  to: number;
  duration?: number;
};

const Counter = ({ to, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = to;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <>{count}</>;
};

export default Counter;
