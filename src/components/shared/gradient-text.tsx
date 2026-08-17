interface Props {
  children: string;
  className?: string;
}

export default function GradientText({ children, className = '' }: Props) {
  return (
    <span className={`text-gradient-gold ${className}`}>
      {children}
    </span>
  );
}
