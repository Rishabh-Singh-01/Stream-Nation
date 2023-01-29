import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Anime/AnimeInformationPage.module.css';

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function AnimeInformationPage({ animeInfo }) {
  console.log(animeInfo);

  return (
    <>
      <div className={styles.animeInformation}>
        <div className={styles.primaryInfo}>
          <div className={styles.primaryInfoHead}>
            <div>
              <span className={styles.primaryInfoHeadTitle}>
                {animeInfo.title}
              </span>
              <span className={styles.primaryInfoHeadSubOrDub}>
                {animeInfo.subOrDub}
              </span>
              <span className={styles.primaryInfoHeadDisc}>&bull;</span>
              <span className={styles.primaryInfoHeadType}>
                {animeInfo.type.includes('ANIME') ? 'ANIME' : animeInfo.type}
              </span>
              <span className={styles.primaryInfoHeadDisc}>&bull;</span>
              <span className={styles.primaryInfoHeadEpisodes}>
                Total Eps: <span>{animeInfo.totalEpisodes}</span>
              </span>
              <div className={styles.watchBtns}>
                <Link
                  href={`/anime/watch/${
                    animeInfo.episodes[animeInfo.episodes.length - 1].id
                  }`}
                  className={styles.watchLatestEpisode}
                >
                  Latest Episode
                </Link>
                <Link
                  href={`/anime/watch/${animeInfo.episodes[0].id}`}
                  className={styles.watchFirstEpisode}
                >
                  First Episode
                </Link>
              </div>
            </div>
            <Image
              className={styles.animeInfoPageImg}
              loader={myLoader}
              src={animeInfo.image}
              alt={`${animeInfo.title} profile image`}
              width={200}
              height={250}
              // fill
              sizes='(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw'
              // placeholder={blur}
            />
          </div>
          <p className={styles.primaryInfoHeadDescription}>
            {animeInfo.description}
          </p>
        </div>
        <div className={styles.secondaryInfo}>
          <span className={styles.secondaryInfoDetails}>Details</span>
          <div>
            Other Names: <span>{animeInfo.otherName}</span>
          </div>
          <div>
            Status: <span>{animeInfo.status}</span>
          </div>
          <div>
            Released On: <span>{animeInfo.releaseDate}</span>
          </div>
          <div>
            Type:
            <span>
              {animeInfo.type
                .split(' ')
                .map((word) => word.at(0) + word.slice(1).toLowerCase())
                .join(' ')}
            </span>
          </div>
          <div className={styles.secondaryInfoGenreCont}>
            Genres:
            {animeInfo.genres.map((genre, ind) => (
              <span
                // className={styles.secondaryInfoGenre}
                key={`Genres-${animeInfo.title}-${genre}-${ind + 1}`}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* <div className={styles.lineSeperator}></div> */}
      <div>
        <span className={styles.episodeListTitle}>Episodes List: </span>
        <div className={`${styles.episodeList} grid grid--7-cols`}>
          {animeInfo.episodes.map((ep) => (
            <Link
              href={`/anime/watch/${ep.id}`}
              key={`EpList-${animeInfo.title}-ep-${ep.number}`}
            >
              Episode: <span>{ep.number}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { animeId } = context.query;
  // console.log(context.query);

  const res = await axios.get(
    `https://api.consumet.org/anime/gogoanime/info/${animeId}`
  );
  const animeInfo = res.data;
  // console.log(animeInfo);
  // const animeInfo = await res.json();
  return {
    props: {
      animeInfo,
    },
  };
}
