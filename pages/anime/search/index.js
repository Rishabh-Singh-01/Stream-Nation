import axios from 'axios';
import Genre from '../../../components/Genre';
import RecentEpisodes from '../../../components/AnimeComponents/RecentEpisodes';
import styles from '../../../styles/AnimeHome.module.css';

export default function search({ searchedResults, searchTitle }) {
  return (
    <div className={`${styles.main} sectionPaddingMax`}>
      {searchTitle === '' || searchTitle === ' ' ? (
        'No Searched Result found !! Please put in a title .'
      ) : (
        <RecentEpisodes
          recentEp={searchedResults}
          recent={false}
          searchTitle={searchTitle}
        />
      )}
      <div className={styles.sideContainer}>
        <Genre />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const searchTitle = context.query.title;
  if (searchTitle === '' || searchTitle === ' ')
    return {
      props: {
        searchTitle,
      },
    };
  console.log(searchTitle);
  const res = await axios.get(
    `https://api.consumet.org/anime/gogoanime/${searchTitle}`
  );
  const { results } = res.data;
  console.log(results);
  return {
    props: {
      searchedResults: results,
      searchTitle,
    },
  };
}
