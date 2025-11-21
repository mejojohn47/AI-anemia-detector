import React, { useState, useRef } from 'react';
import Button from './Button';
import { CameraIcon, UploadIcon } from '../icons';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmImage = () => {
    if (preview) {
      // Extract base64 data without prefix for API
      const base64Data = preview.split(',')[1];
      onImageSelected(base64Data);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full gap-6 animate-fade-in h-full justify-center">
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview ? (
        <div 
          onClick={triggerFileSelect}
          className="w-full aspect-square md:aspect-video max-w-md bg-slate-50 border-3 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-all group p-8"
        >
          <div className="p-5 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 mb-4">
            <CameraIcon className="w-12 h-12 text-rose-500" />
          </div>
          <p className="text-slate-700 font-semibold text-lg">Tap to Upload or Capture</p>
          <p className="text-slate-400 text-sm mt-2 text-center">Clear image of nail bed or inner eyelid</p>
        </div>
      ) : (
        <div className="w-full max-w-md relative">
           <div className="aspect-square md:aspect-video w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white relative bg-slate-100">
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
           </div>
           <button 
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/70 transition-colors"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>
      )}

      <div className="w-full max-w-md space-y-3">
        {!preview ? (
           <Button variant="outline" fullWidth onClick={triggerFileSelect} className="py-4">
             <UploadIcon className="w-5 h-5" />
             Select Image from Gallery
           </Button>
        ) : (
          <Button variant="primary" fullWidth onClick={confirmImage} className="py-4 text-lg">
             Analyze Image
           </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;