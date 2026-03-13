import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

function PhotoPreview({ imgUrl, show, onClose }) {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4'
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className='absolute top-5 right-5 text-white hover:text-gray-300 transition p-2 cursor-pointer'
        aria-label="Close preview"
      >
        <X size={32} />
      </button>
      <img
        src={imgUrl}
        alt="preview"
        className='max-w-2xl max-h-[80vh] rounded-lg object-contain shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
function PhotoViewer({ imgUrl, index, onDelete, showDelete = false }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex item-center justify-center relative w-fit shadow-md">
      <img
        key={index}
        src={imgUrl}
        alt={`Tour Photo ${index + 1}`}
        className="w-25 h-auto mt-2 rounded-md object-cover mx-2 cursor-pointer"
        onClick={() => setShowPreview(true)}
      />
      {showDelete ? (
        <Trash2
          className="absolute right-2 top-2 h-5 w-5 text-red-500 cursor-pointer"
          onClick={() => onDelete(imgUrl)}
        />
      ) : null}
      <PhotoPreview
        imgUrl={imgUrl}
        show={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}

export default PhotoViewer;