import axios from 'axios';
import SingleTileMovies from '../../../components/MovieComponent/SingleTileMovies';
import styles from '../../../styles/Movies/SearchMovies.module.css';

export default function SearchMovies({ searchedResults, title }) {
  console.log(searchedResults);
  return (
    <div className={styles.searchMovies}>
      <span>Searched Results for {title}</span>
      <div className={`grid grid--6-cols`}>
        {searchedResults.map((movie, ind) => (
          <SingleTileMovies
            movieInfo={movie}
            key={`SearchedResultFor-${title}-${ind + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { title } = context.query;
  const res = await axios.get(
    `https://api.consumet.org/movies/flixhq/${title}`
  );
  const searchedResults = res.data.results;
  console.log(searchedResults);
  return {
    props: {
      searchedResults,
      title,
    },
  };
}
