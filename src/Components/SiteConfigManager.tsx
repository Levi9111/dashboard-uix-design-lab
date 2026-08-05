import { useState, useEffect } from 'react';
import { useGetSiteConfigQuery, useUpdateSiteConfigMutation } from '../redux/api/siteConfigApi';
import LoadingDesign from './designs/LoadingDesign';
import { Mail, Phone, MapPin, Calendar, Send, Share2, Save, CheckCircle2 } from 'lucide-react';
import ToastMessage from './ui/ToastMessage';

const SiteConfigManager = () => {
  const { data: configResponse, isLoading, refetch } = useGetSiteConfigQuery();
  const [updateSiteConfig, { isLoading: isUpdating }] = useUpdateSiteConfigMutation();

  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const [formData, setFormData] = useState({
    primaryEmail: '',
    phone: '',
    location: '',
    calendlyUrl: '',
    telegramLink: '',
    telegramBotToken: '',
    telegramChatId: '',
    socialLinks: {
      behance: '',
      instagram: '',
      linkedin: '',
      dribbble: '',
    },
  });

  useEffect(() => {
    if (configResponse?.data) {
      const c = configResponse.data;
      setFormData({
        primaryEmail: c.primaryEmail || '',
        phone: c.phone || '',
        location: c.location || '',
        calendlyUrl: c.calendlyUrl || '',
        telegramLink: c.telegramLink || '',
        telegramBotToken: c.telegramBotToken || '',
        telegramChatId: c.telegramChatId || '',
        socialLinks: {
          behance: c.socialLinks?.behance || '',
          instagram: c.socialLinks?.instagram || '',
          linkedin: c.socialLinks?.linkedin || '',
          dribbble: c.socialLinks?.dribbble || '',
        },
      });
    }
  }, [configResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateSiteConfig(formData).unwrap();
      if (result.success) {
        setToast({ show: true, message: 'Site configuration updated successfully', type: 'success' });
        refetch();
      }
    } catch {
      setToast({ show: true, message: 'Failed to update site configuration', type: 'error' });
    }
  };

  if (isLoading) return <LoadingDesign />;

  return (
    <div className='py-28 max-w-5xl mx-auto px-6 space-y-10'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} />

      {/* Header */}
      <div className='glass-panel p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
        <div>
          <div className='flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2'>
            <CheckCircle2 className='w-4 h-4' />
            <span>GLOBAL SITE SETTINGS</span>
          </div>
          <h1 className='text-3xl font-extrabold text-white font-outfit'>Site Configuration Hub</h1>
          <p className='text-gray-400 text-sm mt-1'>
            Manage website email address, phone, location, Calendly integration, Telegram bot, and social links.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isUpdating}
          className='flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-600/30 transition transform hover:-translate-y-0.5 shrink-0'
        >
          <Save className='w-5 h-5' />
          <span>{isUpdating ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Contact Information */}
        <div className='glass-panel p-8 rounded-3xl border border-white/10 space-y-6'>
          <h2 className='text-xl font-bold text-white font-outfit flex items-center gap-2 border-b border-white/10 pb-4'>
            <Mail className='w-5 h-5 text-purple-400' />
            <span>Primary Contact & Location</span>
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Primary Gmail / Contact Email
              </label>
              <div className='relative'>
                <Mail className='w-5 h-5 text-gray-400 absolute left-4 top-3.5' />
                <input
                  type='email'
                  required
                  value={formData.primaryEmail}
                  onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                  placeholder='hello@uixdesignlab.com'
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Phone Number
              </label>
              <div className='relative'>
                <Phone className='w-5 h-5 text-gray-400 absolute left-4 top-3.5' />
                <input
                  type='text'
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder='+1 (555) 000-0000'
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500'
                />
              </div>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Physical Address / Location
              </label>
              <div className='relative'>
                <MapPin className='w-5 h-5 text-gray-400 absolute left-4 top-3.5' />
                <input
                  type='text'
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder='San Francisco, CA & Global Remote'
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Integration Hub (Calendly & Telegram) */}
        <div className='glass-panel p-8 rounded-3xl border border-white/10 space-y-6'>
          <h2 className='text-xl font-bold text-white font-outfit flex items-center gap-2 border-b border-white/10 pb-4'>
            <Send className='w-5 h-5 text-indigo-400' />
            <span>Booking & Webhook Integration</span>
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Calendly Booking URL
              </label>
              <div className='relative'>
                <Calendar className='w-5 h-5 text-gray-400 absolute left-4 top-3.5' />
                <input
                  type='url'
                  required
                  value={formData.calendlyUrl}
                  onChange={(e) => setFormData({ ...formData, calendlyUrl: e.target.value })}
                  placeholder='https://calendly.com/your-lab'
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-indigo-500'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Telegram Direct Link
              </label>
              <div className='relative'>
                <Send className='w-5 h-5 text-gray-400 absolute left-4 top-3.5' />
                <input
                  type='url'
                  required
                  value={formData.telegramLink}
                  onChange={(e) => setFormData({ ...formData, telegramLink: e.target.value })}
                  placeholder='https://t.me/yourusername'
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-indigo-500'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Telegram Bot Token (Notifications)
              </label>
              <input
                type='password'
                value={formData.telegramBotToken}
                onChange={(e) => setFormData({ ...formData, telegramBotToken: e.target.value })}
                placeholder='123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ'
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-indigo-500 font-mono text-sm'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Telegram Chat ID (Notification Target)
              </label>
              <input
                type='text'
                value={formData.telegramChatId}
                onChange={(e) => setFormData({ ...formData, telegramChatId: e.target.value })}
                placeholder='-1001234567890'
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-indigo-500 font-mono text-sm'
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='glass-panel p-8 rounded-3xl border border-white/10 space-y-6'>
          <h2 className='text-xl font-bold text-white font-outfit flex items-center gap-2 border-b border-white/10 pb-4'>
            <Share2 className='w-5 h-5 text-pink-400' />
            <span>Social Presence Links</span>
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Behance Profile URL
              </label>
              <input
                type='url'
                value={formData.socialLinks.behance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, behance: e.target.value },
                  })
                }
                placeholder='https://behance.net/uixdesignlab'
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-pink-500'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Instagram Profile URL
              </label>
              <input
                type='url'
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder='https://instagram.com/uixdesignlab'
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-pink-500'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                LinkedIn Page URL
              </label>
              <input
                type='url'
                value={formData.socialLinks.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder='https://linkedin.com/company/uixdesignlab'
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-pink-500'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
                Dribbble Portfolio URL
              </label>
              <input
                type='url'
                value={formData.socialLinks.dribbble}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, dribbble: e.target.value },
                  })
                }
                placeholder='https://dribbble.com/uixdesignlab'
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-pink-500'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteConfigManager;
