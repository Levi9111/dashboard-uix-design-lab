import { motion } from 'framer-motion';

type AlertModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const AlertModal = ({ message, onConfirm, onCancel }: AlertModalProps) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className='bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-lg'
      >
        <p className='text-gray-800 font-medium mb-4'>{message}</p>
        <div className='flex justify-center gap-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition'
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AlertModal;
