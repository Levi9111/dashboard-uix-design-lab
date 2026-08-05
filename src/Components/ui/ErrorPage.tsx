import { motion } from 'framer-motion';

export default function ErrorPage() {
  return (
    <div className='relative flex items-center justify-center min-h-screen  text-white overflow-hidden'>
      {/* Central Animated 404 Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className='z-10 text-center px-6'
      >
        <motion.h1
          className='text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-blue-400 drop-shadow-xl'
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          404
        </motion.h1>

        <motion.p
          className='text-xl md:text-2xl mt-4 text-slate-300'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Lost in space. This galaxy doesn’t exist.
        </motion.p>

        <motion.a
          href='/'
          className='inline-block mt-8 px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Return to Earth
        </motion.a>
      </motion.div>
    </div>
  );
}
