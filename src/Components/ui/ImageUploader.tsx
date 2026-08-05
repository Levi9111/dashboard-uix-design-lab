import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUploader = ({ value, onChange, label = 'Upload Image' }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onChange(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading image file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider'>
          {label}
        </label>
        <button
          type='button'
          onClick={() => setShowUrlInput(!showUrlInput)}
          className='text-[11px] text-purple-400 hover:underline flex items-center gap-1 font-semibold'
        >
          <LinkIcon className='w-3 h-3' />
          {showUrlInput ? 'Use File Upload' : 'Paste Direct URL'}
        </button>
      </div>

      {showUrlInput ? (
        <div className='relative'>
          <ImageIcon className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
          <input
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder='https://res.cloudinary.com/...'
            className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-purple-500 text-sm'
          />
        </div>
      ) : (
        <div>
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          {value ? (
            <div className='relative rounded-2xl overflow-hidden border border-white/20 bg-gray-900 group h-44 flex items-center justify-center'>
              <img
                src={value}
                alt='Uploaded Preview'
                className='w-full h-full object-cover group-hover:opacity-75 transition duration-300'
              />

              <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3'>
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition flex items-center gap-1.5 text-xs font-semibold'
                >
                  <RefreshCw className='w-4 h-4' /> Change File
                </button>
                <button
                  type='button'
                  onClick={() => onChange('')}
                  className='p-2.5 rounded-xl bg-red-500/80 hover:bg-red-600 text-white backdrop-blur-md transition text-xs font-semibold'
                >
                  <X className='w-4 h-4' /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-300 flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.06] hover:border-purple-500/50'
              }`}
            >
              <div className='w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center'>
                {isUploading ? (
                  <RefreshCw className='w-6 h-6 animate-spin' />
                ) : (
                  <UploadCloud className='w-6 h-6' />
                )}
              </div>

              <div>
                <p className='text-sm font-semibold text-white'>
                  {isUploading ? 'Processing image file...' : 'Click or Drag & Drop image file'}
                </p>
                <p className='text-xs text-gray-400 mt-0.5'>
                  Supports PNG, JPG, WEBP, SVG or GIF (Max 10MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
