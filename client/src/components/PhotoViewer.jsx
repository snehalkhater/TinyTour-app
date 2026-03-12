import React, { useState } from 'react';
import { X, Trash } from 'lucide-react';

function PhotoPreview({ imgUrl, show, onclose }) {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4'
      onClick={handleBackdropClick}
    >
      <button
        onClick={onclose}
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

function PhotoViewer({ imgUrl, index, showDelete = false, onDelete }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="relative shadow-md m-1 rounded-xl">
      {showDelete && (
        <button
          className='absolute right-2 top-2 z-10 text-red-600 hover:text-red-700 transition p-1'
          onClick={(e) => {
            e.stopPropagation();
            onDelete(imgUrl);
          }}
          aria-label="Delete photo"
        >
          <Trash size={14} />
        </button>
      )}
      <img
        src={imgUrl}
        alt={`Tour Photo ${index + 1}`}
        className="w-24 h-24 rounded-xl object-cover cursor-pointer border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300"
        onClick={() => setShowPreview(true)}
      />
      <PhotoPreview imgUrl={imgUrl} show={showPreview} onclose={() => setShowPreview(false)} />
    </div>
  )
}

export default PhotoViewer;