import axios from 'axios';
import Link from 'next/link';
import WatchVid from '../../../components/WatchVid';
import styles from '../../../styles/Anime/AnimeWatchEpisode.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import AnimeWatchEpComp from '../../../components/AnimeComponents/AnimeWatchEpComp';
// import {
//   faCircleChevronLeft,
//   faCircleChevronRight,
// } from '@fortawesome/free-solid-svg-icons';

export default function watch({ watchEpisode, movieTitle }) {
  console.log(watchEpisode.sources);
  return (
    <div className={'sectionPaddingMax'}>
      <h3 className={styles.watchTitleHeading}>
        <Link href={`/anime`} className={styles.animeTitle}>
          {movieTitle}{' '}
        </Link>
      </h3>
      <div className={styles.video}>
        <WatchVid watchEpisode={watchEpisode} qualityUsing={'1080'} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { title, epId } = context.query;
  const mediaId = `movie/watch-${title}-${epId}`;
  const res = await axios.get('https://api.consumet.org/movies/flixhq/watch', {
    params: {
      mediaId,
      episodeId: epId,
    },
  });
  const watchEpisode = res.data;
  console.log(res.data.sources);
  return {
    props: {
      watchEpisode,
      movieTitle: title,
    },
  };
}
