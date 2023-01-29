import styles from '../../styles/Anime/RecentEpisodes.module.css';
import SingleTile from './singleTile';

export default function RecentEpisodes({ recentEp, recent, searchTitle }) {
  const allRecentEpisodes = recentEp;
  return (
    <div className={styles.recentEpisodesContainer}>
      <span className={styles.latest}>
        {recent ? 'Latest Episodes' : `Searched Results for ${searchTitle}`}
      </span>
      <div className={`${styles.recentEpisodes} grid grid--4-cols`}>
        {allRecentEpisodes.map((ep, i) => (
          <SingleTile
            key={`${ep.id}--recentEpisode-${i + 1}`}
            ep={ep}
            recent={recent}
          />
        ))}
      </div>
    </div>
  );
}
