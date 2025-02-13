const Button = ({
  text,
  onClick,
  className,
  disabled
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white p-2 rounded-lg ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
export default Button