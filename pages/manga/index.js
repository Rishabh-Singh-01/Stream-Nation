export default function mangaHome() {
  return (
    <div className='sectionPaddingMax'>
      <div>
        THIS IS THE FRONT PAGE OF THE MANGA SECTION <br /> (SINCE THE SITE IS
        STILL IN BETA VERSION THIS PAGE IS BEING WORKED ON!! EVERY OTHER FEATURE
        IS WORKING)
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
