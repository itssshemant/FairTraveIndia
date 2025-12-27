import { useEffect, useState } from "react";

export default function TopLoader({ visible }: { visible: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      return;
    }

    setProgress(30);

    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 10 : p));
    }, 200);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-green-500 transition-all duration-300"
        style={{
          width: visible ? `${progress}%` : "100%",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
