import axios from 'axios';
import styles from '../../../styles/Anime/AnimeWatchEpisode.module.css';
import AnimeWatchEpComp from '../../../components/AnimeComponents/AnimeWatchEpComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function animeWatchEpisode(props) {
  console.log(props);
  return (
    <div className={styles.animeWatchEpisode}>
      <AnimeWatchEpComp props={props} />
      <div className={styles.animeWatchEpisodeNavBtnsComp}>
        <span className={styles.animeWatchEpisodeNavBtn}>
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className={`${styles.animeWatchEpNavBtnIcon} ${styles.animeWatchEpNavBtnIconPrev}`}
          />
          Previous Ep
        </span>
        <span className={styles.animeWatchEpisodeNavBtn}>
          Next Ep
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className={`${styles.animeWatchEpNavBtnIcon} ${styles.animeWatchEpNavBtnIconNext}`}
          />
        </span>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { episodeId } = context.query;

  console.log(episodeId);
  const res = await axios.get(
    `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`
    // {
    //   crossdomain: true,
    //   // headers: {
    //   //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //   //   'Access-Control-Allow-Origin': '*',
    //   // },
    // }
    // {
    //   headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
    // }
  );
  // const res = await axios.get()
  const watchEpisode = res.data;
  const animeTitleAndEpisodeNo = episodeId
    .split('-')
    .map((word) => word.at(0).toUpperCase() + word.slice(1));
  const animeId = episodeId.split('-').slice(0, -2).join('-');
  // console.log(animeId);
  // let retrievedAnimeId = '';
  // const shallowArray = episodeId.split('-');
  // for (let i = 0; i <= shallowArray.length - 1; i++) {
  //   const word = shallowArray[i];
  //   if (word === 'episode') break;
  //   if (retrievedAnimeId === '') retrievedAnimeId = word;
  //   else retrievedAnimeId = retrievedAnimeId + '-' + word;
  // }

  // console.log(shallowArray[shallowArray.length - 1]);

  // const response = await axios.get(
  //   `https://api.consumet.org/anime/gogoanime/info/${retrievedAnimeId}`
  // );

  // const epAnimeInfo = response.data;

  // const res1 = await axios.get(watchEpisode.headers.referer, {
  //   header: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // });
  return {
    props: {
      watchEpisode,
      animeTitleAndEpisodeNo,
      animeId,
      // epAnimeInfo,
      // episodeNo: shallowArray[shallowArray.length - 1],
    },
  };
}
