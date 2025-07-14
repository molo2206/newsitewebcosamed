// components/common/ActionButton.tsx
import type { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ActionButton = ({
  icon,
  label,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[110px] h-[40px] px-4 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
