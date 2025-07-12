import { useForm } from 'react-hook-form';
import { useCreateFaqMutation } from '../redux/api/faqsApi';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type FAQFormData = {
  question: string;
  answer: string;
};

const CreateFaq = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FAQFormData>();

  const [createFaq, { isLoading }] = useCreateFaqMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FAQFormData) => {
    try {
      await createFaq(data).unwrap();
      reset();
    } catch (error) {
      console.error('Error creating FAQ:', error);
    }
  };

  const goToAllFaqs = () => {
    navigate('/manage-faqs/all-faqs');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-xl mx-auto mt-12 bg-white/5 border border-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6'
      >
        {/* Question */}
        <div>
          <label className='block text-white mb-1 font-medium'>Question</label>
          <input
            type='text'
            {...register('question', { required: 'Question is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-purple-400 transition'
            placeholder='e.g. What services do you offer?'
          />
          {errors.question && (
            <p className='text-red-400 text-sm mt-1'>
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Answer */}
        <div>
          <label className='block text-white mb-1 font-medium'>Answer</label>
          <textarea
            rows={4}
            {...register('answer', { required: 'Answer is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-purple-400 transition resize-none'
            placeholder='Explain your answer here...'
          />
          {errors.answer && (
            <p className='text-red-400 text-sm mt-1'>{errors.answer.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Submitting...' : 'Submit FAQ'}
        </button>
      </form>
      <button
        onClick={goToAllFaqs}
        className='fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50'
        title='Go to All FAQs'
      >
        <ArrowRight className='w-5 h-5' />
      </button>
    </>
  );
};

export default CreateFaq;
