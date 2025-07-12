import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Route = ({
  link,
  onClick,
  children,
  className,
}: {
  link: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Link to={link} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default Route;
