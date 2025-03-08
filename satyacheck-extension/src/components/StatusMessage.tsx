import React from "react";
import { StatusState } from "../types/types";

interface StatusMessageProps {
  status: StatusState;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status.type) {
      case "loading":
        return "text-amber-600"; // Orange
      case "success":
        return "text-green-600"; // Green
      case "error":
        return "text-red-600"; // Red
      default:
        return "text-gray-600"; // Gray
    }
  };

  return (
    <div className={`mt-4 p-2 font-medium ${getStatusClasses()}`}>
      {status.message}
    </div>
  );
};

export default StatusMessage;
