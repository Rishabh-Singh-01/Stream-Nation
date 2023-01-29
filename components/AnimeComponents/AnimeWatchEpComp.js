import WatchVid from '../WatchVid';
import styles from '../../styles/Anime/AnimeWatchEpisodeComp.module.css';
import { useState } from 'react';
import Link from 'next/link';
// import VideoApp from '../VideoApp';

export default function AnimeWatchEpComp({ props }) {
  const [qualityUsing, setQualityUsing] = useState('1080p');
  console.log(qualityUsing);
  const { watchEpisode, animeTitleAndEpisodeNo, animeId } = props;
  const episodeNo = animeTitleAndEpisodeNo.slice(-2).join(' ');
  const animeTitle = animeTitleAndEpisodeNo
    .slice(0, animeTitleAndEpisodeNo.length - 2)
    .join(' ');
  console.log(animeTitle);
  return (
    <div className={styles.animeWatchEpisode}>
      <div className={styles.animeWatchTitle}>
        <h3 className={styles.animeWatchTitleHead}>
          <Link href={`/anime/${animeId}`} className={styles.animeTitle}>
            {animeTitle}{' '}
          </Link>
          <span>: {episodeNo}</span>
        </h3>
        <div className={styles.epQuality}>
          <label className={styles.epQualityLabel}>Quality:</label>
          <select
            name='Quality'
            value={qualityUsing}
            onChange={(e) => setQualityUsing(e.target.value)}
            className={styles.epQualityDropdown}
          >
            {watchEpisode.sources.map((ep, ind) => (
              <option
                className={styles.epQualityDropdownOptions}
                value={ep.quality}
                key={ind}
              >
                {ep.quality}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.video}>
        <WatchVid watchEpisode={watchEpisode} qualityUsing={qualityUsing} />
      </div>
    </div>
  );
}
