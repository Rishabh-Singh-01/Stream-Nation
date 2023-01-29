import axios from 'axios';
import SingleTileManga from '../../components/MangaComponents/SingleTileManga.js';
import { MANGA } from '@consumet/extensions';

const mangasee123 = new MANGA.Mangasee123();
export default function mangaSearch({ title, results }) {
  console.log(results);
  return (
    <div className='sectionPaddingMax'>
      <div>This is the search page of query {title}</div>
      <span>Searched Results for {title}</span>
      <div className={`grid grid--6-cols`}>
        {results.map((manga, ind) => (
          <SingleTileManga
            mangaInfo={manga}
            key={`Searched Result for the manga-${title}-${ind + 1}`}
          />
          //   <div key={`${ind + 1}`}>{manga.title}</div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { title } = context.query;
  console.log('////////////////////////////');
  console.log(title);
  const res = await axios.get(
    `https://api.consumet.org/manga/mangasee123/${title}`
  );
  // const res = await mangasee123.search(title);
  const { results } = res.data;
  console.log(results);
  return {
    props: {
      title,
      results,
    },
  };
}
