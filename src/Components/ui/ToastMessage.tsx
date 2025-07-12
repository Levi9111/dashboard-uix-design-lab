import { motion, AnimatePresence } from 'framer-motion';

type ToastMessageProps = {
  message: string;
  type: 'success' | 'error';
  show: boolean;
};

const ToastMessage = ({ message, type, show }: ToastMessageProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={`fixed bottom-6 left-6 z-50 px-6 py-3 rounded-xl text-white shadow-lg ${
            type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastMessage;
