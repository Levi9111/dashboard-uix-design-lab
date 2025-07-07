'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

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
    <Link href={link} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default Route;
