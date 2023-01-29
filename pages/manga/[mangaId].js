import styles from '../../styles/Anime/AnimeInformationPage.module.css';
import axios from 'axios';
import Link from 'next/link';
import ImageWithFallback from '../../components/ImageWithFallback';
import { useEffect, useState } from 'react';
import { MANGA } from '@consumet/extensions';

export default function MangaInformationPage({ mangaInfo }) {
  console.log(mangaInfo);
  const [extraMetaInfo, setExtraMetaInfo] = useState([]);
  useEffect(() => {
    (async function () {
      const metaMangaId = mangaInfo.id.split('-').join('_').toLowerCase();
      try {
        const res = await axios.get(
          `https://api.consumet.org/manga/mangahere/info`,
          {
            params: {
              id: metaMangaId,
            },
          }
        );
        if (res.status === '200') return;
        console.log(res.data);
        setExtraMetaInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [mangaInfo]);
  return (
    <>
      <div className={styles.animeInformation}>
        <div className={styles.primaryInfo}>
          <div className={styles.primaryInfoHead}>
            <div>
              <span className={styles.primaryInfoHeadTitle}>
                {mangaInfo.title}
              </span>
              <span className={styles.primaryInfoHeadEpisodes}>
                Total Chapters: <span>{mangaInfo.chapters.length}</span>
              </span>
              <span className={styles.primaryInfoHeadDisc}>&bull;</span>
              <span className={styles.primaryInfoHeadSubOrDub}>
                {extraMetaInfo.rating ? `${extraMetaInfo.rating} / 5` : 'NA'}
              </span>
              <div className={styles.watchBtns}>
                <Link
                  href={`/manga/read/${mangaInfo?.chapters[0]?.id}`}
                  className={styles.watchLatestEpisode}
                >
                  Latest Chapter
                </Link>
                <Link
                  href={`/manga/read/${
                    mangaInfo?.chapters[mangaInfo.chapters.length - 1]?.id
                  }`}
                  className={styles.watchFirstEpisode}
                >
                  First Chapter
                </Link>
              </div>
            </div>
            <ImageWithFallback
              src={mangaInfo.image}
              alt={`${mangaInfo.title} profile image`}
              width={200}
              height={250}
            />
          </div>
          <p className={styles.primaryInfoHeadDescription}>
            {mangaInfo.description}
          </p>
        </div>
        <div className={styles.secondaryInfo}>
          <span className={styles.secondaryInfoDetails}>Details</span>
          <div>
            Other Names: <span>{mangaInfo.altTitles?.at(0) || 'NA'}</span>
          </div>
          <div>
            Author: <span>{extraMetaInfo.authors?.at(0) || 'NA'}</span>
          </div>
          <div>
            Status:{' '}
            <span>{mangaInfo.status || extraMetaInfo.status || 'NA'}</span>
          </div>

          <div>
            Last Release On:{' '}
            <span>{mangaInfo.chapters.at(0).releaseDate.split(' ').at(0)}</span>
          </div>
          <div className={styles.secondaryInfoGenreCont}>
            Genres:
            {mangaInfo.genres.map((genre, ind) => (
              <span
                // className={styles.secondaryInfoGenre}
                key={`Genres-${mangaInfo.title}-${genre}-${ind + 1}`}
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
          {mangaInfo.chapters.map((ch, ind) => (
            <Link
              href={`/manga/read/${ch.id}`}
              key={`ChapterList-${mangaInfo.title}-ch-${ch.title}-${ind + 1}`}
            >
              Chapter:{' '}
              <span>
                {ch.title.split(' ').at(-1) || ch.id.split('-').at(-1)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // here changing the provider for meta data only from mangasee123 to mangahere as there ids are almost identical with a bit of changing
  // all pics and search are coming from mangasee123 only
  const { mangaId } = context.query;
  //   const id = mangaId.split('-').join('-').toLowerCase();
  const res = await axios.get(
    `https://api.consumet.org/manga/mangasee123/info`,
    {
      params: {
        id: mangaId,
      },
    }
  );
  const mangaInfo = res.data;
  console.log(mangaInfo);
  return {
    props: {
      mangaId,
      mangaInfo,
    },
  };
}
