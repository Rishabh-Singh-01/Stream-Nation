import Genre from '../../components/Genre';
import Popular from '../../components/AnimeComponents/Popular';
import RecentEpisodes from '../../components/AnimeComponents/RecentEpisodes';
import styles from '../../styles/AnimeHome.module.css';

export default function Home({ recentEp, popularEp }) {
  return (
    <div className={`${styles.main} sectionPaddingMax`}>
      <RecentEpisodes recentEp={recentEp} recent={true} searchTitle={null} />
      <div className={styles.sideContainer}>
        <Popular popularEp={popularEp} />
        <Genre />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // THIS IS FOR RECENT EPISODES COMPONENT

  // USING NEWER API
  // const res = await axios.get(
  //   'https://api.consumet.org/anime/gogoanime/recent-episodes'
  // );
  // const recentEp = res.data;
  // console.log(res.data);

  // USING OLDER API  BUT GIVES SUB / DUB
  const responseRecent = await fetch(
    'https://gogoanime.consumet.stream/recent-release'
  );
  const resRecent = await responseRecent.json();
  const recentEp = resRecent;
  // console.log(res);

  // THIS IS FOR POPULAR COMPONENT

  const responsePopular = await fetch(
    'https://gogoanime.consumet.stream/popular'
  );
  const popularEp = await responsePopular.json();

  return {
    props: {
      recentEp,
      popularEp,
    },
  };
}
