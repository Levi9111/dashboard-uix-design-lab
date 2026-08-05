import { useState } from 'react';
import {
  useGetAllPricingPlansQuery,
  useCreatePricingPlanMutation,
  useDeletePricingPlanMutation,
  type IPricingPlan,
} from '../redux/api/pricingApi';
import LoadingDesign from './designs/LoadingDesign';
import { Plus, Trash2, CheckCircle, Sparkles, Tag } from 'lucide-react';
import ToastMessage from './ui/ToastMessage';
import AlertModal from './ui/AlertModal';

const ManagePricing = () => {
  const { data, isLoading, refetch } = useGetAllPricingPlansQuery();
  const [createPricingPlan, { isLoading: isCreating }] = useCreatePricingPlanMutation();
  const [deletePricingPlan] = useDeletePricingPlanMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const [formData, setFormData] = useState({
    title: '',
    price: 99,
    period: 'monthly',
    description: '',
    featuresStr: '',
    isPopular: false,
    ctaText: 'Get Started',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const featuresArray = formData.featuresStr
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const result = await createPricingPlan({
        title: formData.title,
        price: Number(formData.price),
        period: formData.period,
        description: formData.description,
        features: featuresArray,
        isPopular: formData.isPopular,
        ctaText: formData.ctaText,
      }).unwrap();

      if (result.success) {
        setToast({ show: true, message: 'Pricing plan created successfully', type: 'success' });
        setShowAddModal(false);
        setFormData({
          title: '',
          price: 99,
          period: 'monthly',
          description: '',
          featuresStr: '',
          isPopular: false,
          ctaText: 'Get Started',
        });
        refetch();
      }
    } catch {
      setToast({ show: true, message: 'Failed to create pricing plan', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!selectedIdToDelete) return;
    try {
      await deletePricingPlan(selectedIdToDelete).unwrap();
      setToast({ show: true, message: 'Plan deleted successfully', type: 'success' });
      refetch();
    } catch {
      setToast({ show: true, message: 'Failed to delete plan', type: 'error' });
    } finally {
      setSelectedIdToDelete(null);
    }
  };

  if (isLoading) return <LoadingDesign />;

  const plans = data?.data || [];

  return (
    <div className='py-28 max-w-7xl mx-auto px-6 space-y-10'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} />

      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel p-8 rounded-3xl border border-white/10'>
        <div>
          <div className='flex items-center gap-2 text-purple-400 text-sm font-semibold mb-2'>
            <Tag className='w-4 h-4' />
            <span>COMMERCIAL OFFERINGS</span>
          </div>
          <h1 className='text-3xl font-extrabold text-white font-outfit'>Manage Pricing Plans</h1>
          <p className='text-gray-400 text-sm mt-1'>
            Control dynamic subscription and package options rendered across the UIX Design Lab website.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className='flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-600/30 transition transform hover:-translate-y-0.5'
        >
          <Plus className='w-5 h-5' />
          <span>Add New Plan</span>
        </button>
      </div>

      {/* Pricing Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((plan: IPricingPlan) => (
          <div
            key={plan._id}
            className={`relative glass-panel p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
              plan.isPopular
                ? 'border-purple-500/50 shadow-2xl shadow-purple-950/40 bg-gradient-to-b from-purple-950/20 to-transparent'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {plan.isPopular && (
              <div className='absolute -top-3.5 right-6 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/30 flex items-center gap-1.5'>
                <Sparkles className='w-3.5 h-3.5' /> Most Popular
              </div>
            )}

            <div>
              <h3 className='text-2xl font-bold text-white font-outfit'>{plan.title}</h3>
              <p className='text-sm text-gray-400 mt-2 min-h-[40px]'>{plan.description}</p>

              <div className='my-6 flex items-baseline gap-1'>
                <span className='text-4xl font-extrabold text-white font-outfit'>${plan.price}</span>
                <span className='text-gray-400 text-sm'>/ {plan.period}</span>
              </div>

              <div className='space-y-3 pt-4 border-t border-white/10'>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className='flex items-center gap-3 text-sm text-gray-300'>
                    <CheckCircle className='w-4 h-4 text-purple-400 shrink-0' />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='pt-8 flex items-center justify-between gap-4 border-t border-white/10 mt-8'>
              <span className='text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10'>
                CTA: {plan.ctaText || 'Get Started'}
              </span>
              <button
                onClick={() => plan._id && setSelectedIdToDelete(plan._id)}
                className='p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition'
                title='Delete Plan'
              >
                <Trash2 className='w-4 h-4' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md'>
          <div className='w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/20 shadow-2xl relative space-y-6'>
            <h2 className='text-2xl font-bold text-white font-outfit'>Create New Pricing Plan</h2>
            <form onSubmit={handleCreate} className='space-y-4'>
              <div>
                <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
                  Plan Title
                </label>
                <input
                  type='text'
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder='e.g. Starter, Growth, Enterprise'
                  className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
                    Price ($)
                  </label>
                  <input
                    type='number'
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500'
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
                    Billing Period
                  </label>
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className='w-full px-4 py-3 rounded-xl bg-gray-900 border border-white/15 text-white outline-none focus:border-purple-500'
                  >
                    <option value='monthly'>Monthly</option>
                    <option value='yearly'>Yearly</option>
                    <option value='one-time'>One-time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
                  Description
                </label>
                <input
                  type='text'
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder='Ideal for early stage startups...'
                  className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
                  Features (One per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.featuresStr}
                  onChange={(e) => setFormData({ ...formData, featuresStr: e.target.value })}
                  placeholder='Dedicated UI Designer&#10;Unlimited Revisions&#10;24/7 Priority Support'
                  className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500 resize-none'
                />
              </div>

              <div className='flex items-center gap-3'>
                <input
                  type='checkbox'
                  id='isPopular'
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className='w-5 h-5 accent-purple-600 rounded cursor-pointer'
                />
                <label htmlFor='isPopular' className='text-sm text-gray-300 font-medium cursor-pointer'>
                  Mark as "Most Popular" Plan
                </label>
              </div>

              <div className='flex justify-end gap-3 pt-4 border-t border-white/10'>
                <button
                  type='button'
                  onClick={() => setShowAddModal(false)}
                  className='px-5 py-2.5 rounded-xl border border-white/15 text-gray-400 hover:text-white transition'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isCreating}
                  className='px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition'
                >
                  {isCreating ? 'Creating...' : 'Save Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedIdToDelete && (
        <AlertModal
          message='Are you sure you want to delete this pricing plan?'
          onConfirm={handleDelete}
          onCancel={() => setSelectedIdToDelete(null)}
        />
      )}
    </div>
  );
};

export default ManagePricing;
