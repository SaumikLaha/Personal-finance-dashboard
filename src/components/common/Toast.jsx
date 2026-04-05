import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // 🔥 important
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-gray-900 text-white px-5 py-2 rounded-lg shadow-lg z-50 animate-slide-in">
      {message}
    </div>
  );
}

export default Toast;