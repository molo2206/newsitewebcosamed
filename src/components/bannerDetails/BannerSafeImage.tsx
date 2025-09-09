import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  className?: string; // permet de passer des classes tailwind
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.png',
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt || 'Image'}
      onError={() => setImgSrc(fallbackSrc)}
      className={`w-full h-auto max-h-[500px] object-cover rounded-md ${className}`}
      {...props}
    />
  );
};
