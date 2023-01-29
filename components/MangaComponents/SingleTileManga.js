import Link from 'next/link';
import styles from '../../styles/Manga/SingleTileManga.module.css';
import ImageWithFallback from '../ImageWithFallback';

export default function SingleTileMovies({ mangaInfo }) {
  return (
    <Link className={styles.singleTileManga} href={`/manga/${mangaInfo.id}`}>
      <div className={styles.imageCont}>
        <ImageWithFallback
          src={mangaInfo.image}
          fill
          alt={`${mangaInfo.title} cover image`}
        />
      </div>
      <div className={styles.mangaDetails}>
        <p className={styles.mangaTitle}>{mangaInfo.title}</p>
      </div>
    </Link>
  );
}
