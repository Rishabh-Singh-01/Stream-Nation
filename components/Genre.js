import styles from '../styles/Genre.module.css';

export default function Genre() {
  const genreArray = [
    'Action',
    'Adventure',
    'Cars',
    'Comedy',
    'Dementia',
    'Demons',
    'Drama',
    'Ecchi',
    'Fantasy',
    'Game',
    'Harem',
    'Historical',
    'Horror',
    'Isekai',
    'Josei',
    'Kids',
    'Magic',
    'Martial Arts',
    'Mecha',
    'Military',
    'Music',
    'Mystery',
    'Parody',
    'Police',
  ];

  return (
    <div className={styles.genre}>
      <span>Genres</span>
      <ul className={`${styles.genreMain}`}>
        {genreArray.map((genreName, ind) => (
          <li key={`GenreList--${ind + 1}`}>{genreName}</li>
        ))}
      </ul>
    </div>
  );
}
