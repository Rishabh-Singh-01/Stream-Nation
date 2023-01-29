import axios from 'axios';
import Link from 'next/link';
import ImageWithFallback from '../../../components/ImageWithFallback';
import SingleTileMovies from '../../../components/MovieComponent/SingleTileMovies';
// import styles from '../../../styles/Movies/MovieInformationPage.module.css';
import styles from '../../../styles/Anime/AnimeInformationPage.module.css';

export default function MovieInformationPage({ movieInformation }) {
  console.log(movieInformation);
  return (
    <>
      {/* // <div className={styles.movieInformationPage}> */}
      <div className={styles.animeInformation}>
        <div className={styles.primaryInfo}>
          <div className={styles.primaryInfoHead}>
            <div>
              <span className={styles.primaryInfoHeadTitle}>
                {movieInformation.title}
              </span>
              <span className={styles.primaryInfoHeadSubOrDub}>
                {movieInformation.duration || 'NA'}
              </span>
              <span className={styles.primaryInfoHeadDisc}>&bull;</span>
              <span className={styles.primaryInfoHeadType}>
                {movieInformation.type}
              </span>
              <span className={styles.primaryInfoHeadDisc}>&bull;</span>
              <span className={styles.primaryInfoHeadEpisodes}>
                Rating : <span>{movieInformation.rating || 'NA'}</span>
              </span>
              <div className={styles.watchBtns}>
                {/* // Change the damn link for it to work */}
                <Link
                  href={`/movies/movie/watch?title=${movieInformation.title.toLowerCase()}&epId=${
                    movieInformation.episodes.at(0).id
                  }`}
                  className={styles.watchLatestEpisode}
                >
                  Watch Now
                </Link>
                {/* <Link
                href={`/anime/watch/${movieInformation.episodes[0].id}`}
                className={styles.watchFirstEpisode}
              >
                First Episode
              </Link> */}
              </div>
            </div>
            <ImageWithFallback
              src={movieInformation.image}
              alt={`${movieInformation.title} profile image`}
              width={200}
              height={250}
            />
          </div>
          <p className={styles.primaryInfoHeadDescription}>
            {movieInformation.description}
          </p>
        </div>
        <div className={styles.secondaryInfo}>
          <span className={styles.secondaryInfoDetails}>Details</span>
          <div>
            Production: <span>{movieInformation.production}</span>
          </div>
          <div>
            Country: <span>{movieInformation.country}</span>
          </div>
          <div>
            Released On: <span>{movieInformation.releaseDate}</span>
          </div>
          <div>
            Type:
            <span>{movieInformation.type}</span>
          </div>
          <div className={styles.secondaryInfoGenreCont}>
            Genres:
            {movieInformation.genres.map((genre, ind) => (
              <span
                // className={styles.secondaryInfoGenre}
                key={`Genres-${movieInformation.title}-${genre}-${ind + 1}`}
              >
                {genre}
              </span>
            ))}
          </div>
          <div className={styles.secondaryInfoGenreCont}>
            Cast :
            {movieInformation.casts.map((genre, ind) => (
              <span
                // className={styles.secondaryInfoGenre}
                key={`Genres-${movieInformation.title}-${genre}-${ind + 1}`}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <span className={styles.episodeListTitle}>Movie List: </span>
        <div className={`${styles.episodeList} grid grid--7-cols`}>
          {movieInformation.episodes.map((ep, i) => (
            <Link
              href={`/movies/movie/watch?title=${movieInformation.title.toLowerCase()}&epId=${
                movieInformation.episodes.at(0).id
              }`}
              key={`EpList-${movieInformation.title}-ep-${ep.number}`}
            >
              Watch Movie: <span>{i + 1}</span>
              {/* Watch */}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.recommendationContainer}>
        <span className={styles.recommendationTitle}>
          You would also like :
        </span>
        <div className={`${styles.recommendationsSec} grid grid--6-cols`}>
          {movieInformation.recommendations.map((movie, ind) => (
            <SingleTileMovies
              key={`RecommendationMovie-${movieInformation.title}-${ind + 1}`}
              movieInfo={movie}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { movieId } = context.query;

  const res = await axios.get(
    `https://api.consumet.org/movies/flixhq/info?id=movie/${movieId}`
  );
  return {
    props: {
      movieInformation: res.data,
    },
  };
}

{
}

/* <div className={styles.lineSeperator}></div> */
// {movieInformation.id}
// <div className={styles.imageCont}>
//   {/* <ImageWithFallback
//     src={movieInformation.image}
//     alt={`${movieInformation.title} cover image`}
//     fill
//     sizes='(max-width: 768px) 100vw,
//           (max-width: 1200px) 50vw,
//           33vw'
//   /> */}
// </div>
// </div>
