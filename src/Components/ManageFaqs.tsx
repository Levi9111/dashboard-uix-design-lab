import { useForm } from 'react-hook-form';
import { PlanetText } from './elements/PlanetText';

type FAQFormData = {
  question: string;
  answer: string;
};

const ManageFaqs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FAQFormData>();

  const onSubmit = (data: FAQFormData) => {
    console.log('Submitted FAQ:', data);
    reset();
  };

  return (
    <div className='py-24 px-4'>
      <PlanetText
        title='Manage Frequently Asked Questions'
        subtitle='Add or update questions that help users understand your services better.'
      />

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
          className='w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:scale-[1.02] transition-transform'
        >
          Submit FAQ
        </button>
      </form>
    </div>
  );
};

export default ManageFaqs;
