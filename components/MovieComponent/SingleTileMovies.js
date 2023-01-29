import Link from 'next/link';
import styles from '../../styles/Movies/SingleTileMovies.module.css';
import ImageWithFallback from '../ImageWithFallback';

export default function SingleTileMovies({ movieInfo }) {
  // console.log('////////////////');

  return (
    <Link className={styles.singleTileMovies} href={`/movies/${movieInfo.id}`}>
      <div className={styles.imageCont}>
        <ImageWithFallback
          src={movieInfo.image}
          fill
          alt={`${movieInfo.title} cover image`}
        />
      </div>
      <div className={styles.movieDetails}>
        <p className={styles.movieTitle}>{movieInfo.title}</p>
        <div className={styles.extraMovieDetails}>
          {movieInfo.releaseDate || movieInfo.season ? (
            <>
              {movieInfo.type === 'Movie' ? (
                <span className={styles.episodeNum}>
                  {movieInfo.releaseDate}{' '}
                </span>
              ) : (
                <span className={styles.episodeNum}>{movieInfo.season}</span>
              )}
              {movieInfo.duration ? <span>&bull;</span> : <></>}
            </>
          ) : (
            <></>
          )}
          {movieInfo.type === 'Movie' ? (
            <span className={styles.episodeNum}>
              {movieInfo.duration ? (
                <>
                  {movieInfo.duration.includes('m')
                    ? `${movieInfo.duration.slice(0, -1)} min`
                    : `${movieInfo.duration} min`}{' '}
                </>
              ) : (
                <></>
              )}
            </span>
          ) : (
            <span className={styles.episodeNum}>{movieInfo.latestEpisode}</span>
          )}

          <span className={styles.movieType}>
            {movieInfo.type === 'Movie' ? 'Movie' : 'TV'}
          </span>
        </div>
      </div>
    </Link>
  );
}
