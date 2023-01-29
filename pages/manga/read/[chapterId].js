import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ImageWithFallback from '../../../components/ImageWithFallback';
import styles from '../../../styles/Manga/ReadMangaChapter.module.css';
import { useRouter } from 'next/router';
import { MANGA } from '@consumet/extensions';

const mangasee123 = new MANGA.Mangasee123();

export default function ReadMangaChapter({ chapterId, readMangaInfo }) {
  const router = useRouter();
  const [mangaInfo, setMangaInfo] = useState([]); // for chapter info
  const [panelSize, setPanelSize] = useState('50%');
  const allPanelSizes = {
    Smaller: '30%',
    Small: '40%',
    Normal: '50%',
    Large: '60%',
    Larger: '70%',
  };

  const onChangeChapterHandler = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    router.push(`/manga/read/${e.target.value}`);
  };

  useEffect(() => {
    (async function () {
      const mangaId = chapterId.split('-').slice(0, -2).join('-');
      const res = await axios.get(
        `https://api.consumet.org/manga/mangasee123/info`,
        {
          params: {
            id: mangaId,
          },
        }
      );
      console.log(res.data);
      setMangaInfo(res.data);
    })();
  }, [chapterId]);
  return (
    <div className='sectionPaddingMax'>
      <div className={styles.animeWatchTitle}>
        <h3 className={styles.animeWatchTitleHead}>
          <Link href={`/manga`} className={styles.animeTitle}>
            {chapterId.split('-').slice(0, -2).join(' ')}{' '}
          </Link>
          <span className={styles.chapterDisplay}>
            : {chapterId.split('-').slice(-2).join(' ')}
          </span>
        </h3>
        <div className={styles.epQuality}>
          <label className={styles.epQualityLabel}>Manga Panel Size:</label>
          <select
            name='Quality'
            value={panelSize}
            onChange={(e) => setPanelSize(e.target.value)}
            className={styles.epQualityDropdown}
          >
            {Object.entries(allPanelSizes).map(([key, value]) => (
              <option
                key={`PanelSize-${key}`}
                className={styles.eqQualityDropdownOptions}
                value={value}
              >
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* // THIS MARKS THE STARTING OF CHAPTER NAVIGATION BTNS */}
      <div className={styles.chapterSelectorCont}>
        <div>
          {mangaInfo.chapters ? (
            mangaInfo.chapters.at(-1).id !== chapterId ? (
              <span className={styles.animeWatchEpisodeNavBtn}>
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className={`${styles.animeWatchEpNavBtnIcon} ${styles.animeWatchEpNavBtnIconPrev}`}
                />
                Previous
              </span>
            ) : (
              <></>
            )
          ) : (
            <span className={styles.loadingNextPrevBtn}></span>
          )}
        </div>
        <div>
          <select
            name='Quality'
            value={chapterId}
            onChange={onChangeChapterHandler}
            className={`${styles.epQualityDropdown} ${styles.dropdownChapter}`}
          >
            {mangaInfo.chapters?.map((ch) => (
              <option value={ch.id} key={`Select-${ch.id}`}>
                {ch.title || `Chapter ${ch.id.split('-').at(-1)}`}
              </option>
            )) || <option>{`Chapter ${chapterId.split('-').at(-1)}`}</option>}
          </select>
        </div>
        <div>
          {mangaInfo.chapters ? (
            mangaInfo.chapters?.at(0).id !== chapterId ? (
              <span className={styles.animeWatchEpisodeNavBtn}>
                Next
                <FontAwesomeIcon
                  icon={faCircleChevronRight}
                  className={`${styles.animeWatchEpNavBtnIcon} ${styles.animeWatchEpNavBtnIconNext}`}
                />
              </span>
            ) : (
              <></>
            )
          ) : (
            <span className={styles.loadingNextPrevBtn}></span>
          )}
        </div>
      </div>
      {/* THIS MARKS THE ENDING OF CHAPTER NAIGAITON BTN */}
      <div className={styles.imagesTopCont}>
        <div className={styles.imageContainer} style={{ width: panelSize }}>
          {readMangaInfo.map((panel) => (
            <ImageWithFallback
              key={`${chapterId}-pageno-${panel.page}`}
              src={panel.img}
              fill
              alt={`Manga Panel of ${chapterId}-pageno-${panel.page}`}
              className={styles.image}
            />
          ))}
        </div>
      </div>

      {/* // THIS MARKS THE STARTING OF CHAPTER NAVIGATION BTNS */}
      <div className={styles.chapterSelectorCont}>
        <div>
          {mangaInfo.chapters ? (
            mangaInfo.chapters.at(-1).id !== chapterId ? (
              <span className={styles.animeWatchEpisodeNavBtn}>
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className={`${styles.animeWatchEpNavBtnIcon} ${styles.animeWatchEpNavBtnIconPrev}`}
                />
                Previous
              </span>
            ) : (
              <></>
            )
          ) : (
            <span className={styles.loadingNextPrevBtn}></span>
          )}
        </div>
        <div>
          <select
            name='Quality'
            value={chapterId}
            onChange={onChangeChapterHandler}
            className={`${styles.epQualityDropdown} ${styles.dropdownChapter}`}
          >
            {mangaInfo.chapters?.map((ch) => (
              <option value={ch.id} key={`Select-${ch.id}`}>
                {ch.title || `Chapter ${ch.id.split('-').at(-1)}`}
              </option>
            )) || <option>{`Chapter ${chapterId.split('-').at(-1)}`}</option>}
          </select>
        </div>
        <div>
          {mangaInfo.chapters ? (
            mangaInfo.chapters?.at(0).id !== chapterId ? (
              <span className={styles.animeWatchEpisodeNavBtn}>
                Next
                <FontAwesomeIcon
                  icon={faCircleChevronRight}
                  className={`${styles.animeWatchEpNavBtnIcon} ${styles.animeWatchEpNavBtnIconNext}`}
                />
              </span>
            ) : (
              <></>
            )
          ) : (
            <span className={styles.loadingNextPrevBtn}></span>
          )}
        </div>
      </div>
      {/* THIS MARKS THE ENDING OF CHAPTER NAIGAITON BTN */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { chapterId } = context.query;
  const res = await axios.get(
    `https://api.consumet.org/manga/mangasee123/read`,
    {
      params: {
        chapterId,
      },
    }
  );

  return {
    props: {
      chapterId,
      readMangaInfo: res.data,
    },
  };
}
