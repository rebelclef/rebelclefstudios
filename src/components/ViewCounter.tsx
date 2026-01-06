import React, { useEffect, useState } from "react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function RollingDigit({ value, delay }: { value: number; delay: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Delay start to create a ripple/wave effect across digits
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      style={{
        height: "1em",
        width: "0.65em",
        overflow: "hidden",
        display: "inline-block",
        verticalAlign: "bottom",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          lineHeight: "1em",
          // Elastic ease-out for a mechanical "click" into place feel
          transition: "transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: `translateY(-${displayValue * 10}%)`,
        }}
      >
        {DIGITS.map((digit) => (
          <div
            key={digit}
            style={{
              height: "1em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ViewCounter({ total }: { total: number }) {
  const [count, setCount] = useState(total);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const loop = () => {
      const nextDelay = Math.random() * 2000 + 3000; // 3-5 seconds
      timeout = setTimeout(() => {
        const increment = Math.floor(Math.random() * 7) + 1; // 1-7 views
        setCount((prev) => prev + increment);
        loop();
      }, nextDelay);
    };

    const startTimer = setTimeout(loop, 2500); // Wait for initial animation
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeout);
    };
  }, []);

  const formatted = new Intl.NumberFormat("en-US").format(count);
  const chars = formatted.split("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontWeight: "bold",
        lineHeight: 1,
        color: "white",
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ display: "flex", fontSize: "4.5rem", fontVariantNumeric: "tabular-nums" }}>
        {chars.map((char, index) => {
          if (/[0-9]/.test(char)) {
            return (
              <RollingDigit
                key={`digit-${index}`}
                value={parseInt(char, 10)}
                delay={index * 50}
              />
            );
          }
          return <span key={`char-${index}`}>{char}</span>;
        })}
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.3em",
          fontSize: "2rem",
          marginTop: "1rem",
          fontWeight: "normal",
          letterSpacing: "0.05em",
        }}
      >
        {["views", "and", "counting..."].map((word, i) => (
          <span
            key={word}
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 1s ease-out, transform 1s ease-out",
              transitionDelay: `${i * 150}ms`,
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}