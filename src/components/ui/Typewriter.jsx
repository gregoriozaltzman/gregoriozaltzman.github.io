import { useState, useEffect } from "react";

export default function Typewriter({
  text = "",
  delay = 0,
  speed = 28,
  className = "",
  cursor = true,
  onComplete,
}) {
  const [displayed, setDisplayed] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      setHasStarted(true);
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setIsFinished(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed, onComplete]);

  return (
    <span className={`inline font-mono ${className}`}>
      {displayed}
      {cursor && (!isFinished || hasStarted) && (
        <span className="inline-block w-1.5 h-3.5 bg-white/70 ml-1 translate-y-0.5 animate-pulse" />
      )}
    </span>
  );
}
