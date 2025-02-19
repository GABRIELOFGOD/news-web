import { ReactNode } from "react";

const Button = ({
  text,
  onClick,
  className,
  disabled
}: {
  text: ReactNode | string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white p-2 rounded-lg flex justify-center items-center ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
export default Button