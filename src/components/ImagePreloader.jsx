import { useEffect } from 'react';

const ImagePreloader = ({ images }) => {
  useEffect(() => {
    images.forEach(imageUrl => {
      if (typeof imageUrl === 'string') {
        const img = new Image();
        img.src = imageUrl;
      }
    });
  }, [images]);

  return null;
};

export default ImagePreloader; 