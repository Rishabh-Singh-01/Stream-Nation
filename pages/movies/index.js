import styles from '../../styles/Movies/MoviesHome.module.css';
import { MOVIES } from '@consumet/extensions';
import axios from 'axios';
import SingleTileMovies from '../../components/MovieComponent/SingleTileMovies';
import { useState } from 'react';

// const flixhq = new MOVIES.FlixHQ();

export default function MoviesHome({ trendingMovies }) {
  const trendingTypeMovie = trendingMovies.slice(0, 24);
  const trendingTypeShows = trendingMovies.slice(24, 48);
  const [displayType, setDisplayType] = useState('Movies');

  // console.log(trendingMovies);
  console.log(trendingMovies[0]);
  console.log(trendingMovies[30]);
  return (
    <div className={styles.moviesHome}>
      <div className={styles.moviesTrending}>
        <div className={styles.moviesHomeHeading}>
          <span className={styles.trendingHeading}>
            Trending {displayType === 'Movies' ? 'Movies' : 'TV Shows'}
          </span>
          <div className={styles.displayTypeBtnsCont}>
            <span
              className={`${styles.displayType} ${
                displayType === 'Movies' ? styles.selectedDisplayTypeBtn : ''
              }`}
              onClick={() => setDisplayType('Movies')}
            >
              Movies
            </span>
            <span
              className={`${styles.displayType} ${
                displayType === 'TV' ? styles.selectedDisplayTypeBtn : ''
              }`}
              onClick={() => setDisplayType('TV')}
            >
              TV Shows
            </span>
          </div>
        </div>
        <div className='grid grid--6-cols'>
          {displayType === 'Movies'
            ? trendingTypeMovie.map((movie, ind) => (
                <SingleTileMovies
                  key={`TrendingMovie-${ind + 1}`}
                  movieInfo={movie}
                />
              ))
            : trendingTypeShows.map((movie, ind) => (
                <SingleTileMovies
                  key={`TrendingMovie-${ind + 1}`}
                  movieInfo={movie}
                />
              ))}
        </div>
      </div>
      <div className={styles.recentMovies}></div>
      <div>Movies</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Getting Trending topic
  const res = await axios.get(
    `https://api.consumet.org/movies/flixhq/trending`
  );

  // const res2 = await axios.get();
  const trendingMovies = res.data.results;
  return {
    props: {
      trendingMovies,
    },
  };
}
