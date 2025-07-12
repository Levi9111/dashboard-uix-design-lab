import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Route = ({
  link,
  onClick,
  title,
  children,
  className,
}: {
  link: string;
  onClick?: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Link
      to={link}
      className={clsx(
        'fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50',
        className,
      )}
      title={title}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Route;
