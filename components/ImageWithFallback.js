import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/ImageWithFallback.module.css';

const ImageWithFallback = ({ fallback: fallbackImage, alt, src, ...props }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const defaultFallbackImage =
    'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';

  return (
    <Image
      className={styles.posterImage}
      alt={alt}
      loader={myLoader}
      sizes='(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw'
      onError={setError}
      src={error ? fallbackImage || defaultFallbackImage : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
