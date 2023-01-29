export default function SeriesInformationPage({ seriesId }) {
  return (
    <div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      <div>This is a selected movie</div>
      {seriesId}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { seriesId } = context.query;
  console.log(seriesId);
  return {
    props: {
      seriesId,
    },
  };
}
