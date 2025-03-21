import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa"; // ✅ Import modern icons
import "./ErrorMsg.css"; 

const ErrorMsg = ({ variant = "info", children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // ✅ Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // ✅ Choose an icon based on the variant
  const getIcon = () => {
    if (variant === "success") return <FaCheckCircle className="success-icon" />;
    if (variant === "danger") return <FaTimesCircle className="danger-icon" />;
    return <FaInfoCircle className="info-icon" />;
  };

  return visible ? (
    <div className={`error-msg ${variant}`}>
      {getIcon()} {/* ✅ Render the chosen icon */}
      <strong>{children}</strong>
    </div>
  ) : null;
};

export default ErrorMsg;
