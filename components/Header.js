import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '@fortawesome/fontawesome-svg-core/styles.css';
// import '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import {
  faMagnifyingGlass,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
// import Image from 'next/image';
import Spinner from './Spinner';
import ImageWithFallback from './ImageWithFallback';

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [displaySearchResultComp, setDisplaySearchResultComp] = useState(false);
  const [gotSearchResults, setGotSearchResults] = useState(false);
  const sectionDetector = router.asPath.split('/').at(1);

  // useeffect for the searching fucntion on the client side

  useEffect(() => {
    // intial rendering problems
    if (!search) {
      setGotSearchResults(false);
      setDisplaySearchResultComp(false);
      setSearchedResults([]);
      return;
    }

    // this block will take care all the errors with a display of type please a alphabet using css or js
    if (search.startsWith('/')) {
      setDisplaySearchResultComp(true);
      setGotSearchResults(true);
      setSearchedResults([]);
      return;
    }

    setDisplaySearchResultComp(true);
    setGotSearchResults(false);
    setSearchedResults([]);
    const searchFunction = setTimeout(async () => {
      let res;
      if (sectionDetector === 'anime') {
        res = await axios.get(
          `https://api.consumet.org/anime/gogoanime/${search}`
        );
      } else if (sectionDetector === 'movies') {
        res = await axios.get(
          `https://api.consumet.org/movies/flixhq/${search}`
        );
      } else {
        res = await axios.get(
          `https://api.consumet.org/manga/mangasee123/${search}`
        );
      }
      if (res.status === 200) setGotSearchResults(true);
      const { results } = res?.data;
      if (res.status === 200 && results === undefined) {
        // to ensure if res.data is not some result it wont give some error
        setSearchedResults([]);
      } else {
        const slicedResult = results.slice(0, 5);
        setSearchedResults(slicedResult);
      }
    }, 1000);
    // console.log(searchedResults);
    return () => clearTimeout(searchFunction);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const renderElements = (gotSearchResults, searchedResults) => {
    if (gotSearchResults && searchedResults.length) {
      console.log(searchedResults);
      return (
        <>
          {searchedResults.map((result, ind) => (
            <Link
              href={`/${sectionDetector}/${result.id}`}
              key={ind + 1}
              className={styles.renderElement}
              onClick={(_) => setSearch('')}
            >
              <div>
                <span className={styles.renderElementTitle}>
                  {result.title}
                </span>
                <div
                  className={
                    sectionDetector === 'movies'
                      ? styles.renderElementExtra
                      : ''
                  }
                >
                  {sectionDetector ? (
                    <>
                      <span className={styles.renderElementDate}>
                        {result.type}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  {result.releaseDate ? (
                    <span className={styles.renderElementDate}>
                      {result.releaseDate}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <ImageWithFallback
                src={result.image}
                alt={`${result.title} cover image`}
                width={40}
                height={40}
              />
            </Link>
          ))}
          <Link
            className={styles.renderElementViewResults}
            href={`/${sectionDetector}/search?title=${search}`}
            onClick={(_) => setSearch('')}
          >
            View other Results &rarr;
          </Link>
        </>
      );
    } else if (gotSearchResults && !searchedResults.length) {
      return <div>No result found</div>;
    } else {
      return <Spinner />;
    }
  };

  return (
    <nav className={styles.header}>
      <div className={styles.headerLogo}>
        <ImageWithFallback
          src='/fullLogoHeader.png'
          height={43}
          width={250}
          alt='Website Logo'
          className={styles.logo}
        />
      </div>
      <div>
        <ul className={styles.headerNavigate}>
          <li>
            <Link href={'/movies'}>Movies</Link>
          </li>
          <li>
            <Link href={'/anime'}>Anime</Link>
          </li>
          <li>
            <Link href={'/manga'}>Manga</Link>
          </li>
        </ul>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchQueryResultCont}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={styles.formSearch}
          >
            <div className={styles.searchBarCont}>
              <input
                className={styles.headerSearchBar}
                placeholder={`Search ${sectionDetector} ...`}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <div
                className={
                  displaySearchResultComp
                    ? styles.displaySearchBlock
                    : styles.displayHidden
                }
              >
                <FontAwesomeIcon
                  className={styles.searchCancelBtn}
                  onClick={() => setSearch('')}
                  icon={faXmarkCircle}
                />
              </div>
            </div>
            <Link
              href={`/${sectionDetector}/search?title=${search}`}
              className={styles.formSearchBtn}
              onClick={() => setSearch('')}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
            <div
              className={`${styles.searchResultDropdown} ${
                displaySearchResultComp
                  ? styles.displaySearchBlock
                  : styles.displayHidden
              }`}
            >
              {renderElements(gotSearchResults, searchedResults)}
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

////////////////////////////////// form is fully disabled as it doesnt work with enter key stroke

// const onSubmitSearchHandler = (e) => {
//   e.preventDefault();
//   // console.log(`/////////////${sectionDetector}//////////${search}`);

//   // wasnt able to find a way to use router.push for everycond
//   // thus totally dissabled this fucntion till i find a better solution using next router
//   // window.location.href = `http://localhost:3000/${sectionDetector}/search?title=${search}`;
//   // setSearch('');
// };
