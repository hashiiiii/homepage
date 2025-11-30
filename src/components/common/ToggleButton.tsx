import type React from "react";

interface ToggleButtonProps {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  onClick,
  disabled = false,
  ariaLabel,
  children,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg p-2 transition-all duration-200 ${
        disabled ? "bg-tn-bg-secondary/50 cursor-not-allowed opacity-50" : "bg-tn-bg-secondary hover:bg-tn-bg-hover"
      } ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
