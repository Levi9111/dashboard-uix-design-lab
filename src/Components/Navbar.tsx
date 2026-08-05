import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import logo from '../../public/logos/logo.svg';
import logo from '/logos/logo.svg';
import Button from './elements/Button';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Manage Projects', path: '/manage-projects' },
  { title: 'Manage FAQs', path: '/manage-faqs' },
  { title: 'Manage Reviews', path: '/manage-reviews' },
  { title: 'Visuals', path: '/visuals' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrolled(currentScrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoOpacity = Math.max(0.5, 1 - scrollY / 100);
  const logoScale = Math.max(0.85, 1 - scrollY / 200);
  const buttonOpacity = Math.max(0.7, 1 - scrollY / 80);
  const buttonScale = Math.max(0.9, 1 - scrollY / 150);

  const linkVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1 * i + 0.4,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 120,
        damping: 10,
      },
    }),
    hover: {
      y: -3,
      color: '#ffffff',
      scale: 1.05,
      transition: { duration: 0.2, type: 'spring', stiffness: 300 },
    },
  };

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 hidden lg:flex items-center transition-all duration-300 ${
        scrolled ? 'h-[72px] py-1' : 'h-[100px] py-3'
      }`}
      style={{
        background: scrolled
          ? 'rgba(20, 20, 20, 0.7)'
          : 'rgba(20, 20, 20, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: scrolled
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid transparent',
      }}
    >
      <div className='flex items-center justify-between w-full max-w-7xl mx-auto px-6 transition-all duration-300'>
        {/* Logo and Title */}
        <motion.div
          className='flex items-center gap-3'
          style={{ opacity: logoOpacity, scale: logoScale }}
        >
          <Link to='/'>
            <motion.img
              src={logo}
              alt='Logo'
              width={56}
              height={56}
              className='w-12 h-12'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          {logoOpacity > 0.3 && (
            <motion.span
              className='text-2xl font-semibold text-white'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              Dashboard
            </motion.span>
          )}
        </motion.div>

        {/* Navigation Links */}
        <motion.ul className='flex gap-8 items-center'>
          {navLinks.map((link, i) => (
            <motion.li
              key={link.title}
              custom={i}
              variants={linkVariants}
              initial='hidden'
              animate='visible'
              whileHover='hover'
              className={`text-lg font-medium cursor-pointer relative group ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-silver-mist'
              }`}
            >
              <Link to={link.path}>{link.title}</Link>
              <div
                className={`absolute left-0 -bottom-1 h-0.5 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${
                  location.pathname === link.path
                    ? 'scale-x-100 bg-white'
                    : 'bg-white/60'
                }`}
              />
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            opacity: buttonOpacity,
            scale: buttonScale,
          }}
        >
          <Link to='/user-management'>
            <Button>All Users</Button>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
