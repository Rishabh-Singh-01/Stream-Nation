import Link from 'next/link';
import styles from '../../styles/Anime/Popular.module.css';
import ImageWithFallback from '../ImageWithFallback';

export default function Popular({ popularEp }) {
  const allPopularEpisodes = popularEp.slice(0, 10);

  return (
    <div className={styles.popular}>
      <span className={styles.popularHeading}>Most Popular</span>
      {allPopularEpisodes.map((ep, i) => (
        <Link
          href={`/anime/${encodeURIComponent(ep.animeId)}`}
          key={`${ep.id}--popularEpisode-${i + 1}`}
          className={`${styles.popularEpisode} ${
            (i + 1) % 2 !== 0 ? styles.colored : styles.backgroundColored
          }`}
        >
          <span className={styles.popularSerNo}>
            {i !== 9 ? '0' + (i + 1) : '10'}
          </span>
          <div className={styles.popularMain}>
            <ImageWithFallback
              className={styles.popularMainImg}
              src={ep.animeImg}
              alt={`${ep.animeTitle} Profile Image`}
              width={50}
              height={60}
            />
            <div>
              <div className={styles.popularMainInfoTitle}>{ep.animeTitle}</div>
              <span className={styles.popularMainInfoDate}>
                Released: {ep.releasedDate}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
