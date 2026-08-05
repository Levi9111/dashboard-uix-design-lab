import { useForm } from 'react-hook-form';
import { useCreateFAQMutation } from '../redux/api/faqsApi';
import ToastMessage from './ui/ToastMessage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  Sparkles, 
  Shield, 
  Zap, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Layers, 
  Check 
} from 'lucide-react';

type FaqFormData = {
  question: string;
  answer: string;
  icon?: string;
};

const iconOptions = [
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Shield', icon: Shield },
  { name: 'Zap', icon: Zap },
  { name: 'Users', icon: Users },
  { name: 'HelpCircle', icon: HelpCircle },
  { name: 'CreditCard', icon: CreditCard },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'Layers', icon: Layers },
];

const CreateFaq = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FaqFormData>({
    defaultValues: {
      icon: 'HelpCircle',
    },
  });

  const selectedIcon = watch('icon');
  const navigate = useNavigate();
  const [createFaq, { isLoading }] = useCreateFAQMutation();

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const onSubmit = async (data: FaqFormData) => {
    try {
      const result = await createFaq(data).unwrap();
      if (result.success) {
        setToast({
          show: true,
          message: 'FAQ created successfully',
          type: 'success',
        });
        reset();
        setTimeout(() => {
          navigate('/manage-faqs/all-faqs');
        }, 1200);
      } else {
        setToast({
          show: true,
          message: 'Failed to create FAQ',
          type: 'error',
        });
      }
    } catch {
      setToast({
        show: true,
        message: 'Failed to create FAQ',
        type: 'error',
      });
    } finally {
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    }
  };

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='glass-panel p-8 rounded-3xl border border-white/10 space-y-6'
      >
        <div className='flex items-center gap-3 border-b border-white/10 pb-5'>
          <div className='p-3 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400'>
            <HelpCircle className='w-6 h-6' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white font-outfit'>Add Frequently Asked Question</h2>
            <p className='text-xs text-gray-400'>Create accordion Q&A content with recommended Lucide icon tags</p>
          </div>
        </div>

        {/* Icon selector */}
        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3'>
            Select FAQ Display Icon
          </label>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {iconOptions.map((item) => {
              const IconComp = item.icon;
              const isSelected = selectedIcon === item.name;
              return (
                <button
                  key={item.name}
                  type='button'
                  onClick={() => setValue('icon', item.name)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition text-xs font-semibold ${
                    isSelected
                      ? 'bg-pink-600/20 border-pink-500 text-pink-300 shadow-md shadow-pink-900/30'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-pink-400' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                  {isSelected && <Check className='w-3.5 h-3.5 text-pink-400 ml-auto' />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question */}
        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
            Question Title
          </label>
          <input
            type='text'
            {...register('question', { required: 'Question is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:bg-white/10 transition text-sm'
            placeholder='e.g. How does the monthly design subscription work?'
          />
          {errors.question && (
            <p className='text-red-400 text-xs mt-1'>{errors.question.message}</p>
          )}
        </div>

        {/* Answer */}
        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
            Detailed Answer
          </label>
          <textarea
            rows={5}
            {...register('answer', { required: 'Answer is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:bg-white/10 transition text-sm resize-none'
            placeholder='Provide a clear, detailed answer for client inquiries...'
          />
          {errors.answer && (
            <p className='text-red-400 text-xs mt-1'>{errors.answer.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className='pt-4 border-t border-white/10 flex justify-end gap-4'>
          <button
            type='button'
            onClick={() => reset()}
            className='px-5 py-3 rounded-xl border border-white/15 text-gray-400 hover:text-white transition text-sm font-semibold'
          >
            Reset Form
          </button>
          <button
            disabled={isLoading}
            type='submit'
            className='px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-pink-600/30 transition transform hover:-translate-y-0.5'
          >
            {isLoading ? 'Creating FAQ...' : 'Save FAQ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFaq;
