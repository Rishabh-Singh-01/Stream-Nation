import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Anime/SingleTile.module.css';

export default function SingleTile({ ep, recent }) {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  // console.log('////////////////');
  // console.log(ep);

  return (
    <Link
      href={recent ? `/anime/watch/${ep.episodeId}` : `/anime/${ep.id}`}
      className={styles.recentEpisode}
    >
      <div className={styles.recentEpisodeImageCont}>
        <Image
          // className={styles.recentEpisodeImg}
          // loader={myLoader}
          src={recent ? ep.animeImg : ep.image}
          alt={`${recent ? ep.animeTitle : ep.title} cover image`}
          fill
          sizes='(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw'
          cover
        />
        {recent ? (
          <span className={styles.episodeNum}>Ep {ep.episodeNum} </span>
        ) : (
          <span className={styles.episodeNum}>{ep.releaseDate}</span>
        )}
        <span className={styles.subOrDub}>{ep.subOrDub}</span>
      </div>
      <span className={styles.recentEpisodeTitle}>
        {recent ? ep.animeTitle : ep.title}
      </span>
    </Link>
  );
}
