import React, { useState } from 'react';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';
import videojs from 'video.js';
export const VideoApp = (props) => {
  const videoReference = React.useRef(null);
  const playerReference = React.useRef(null);
  const { onReady, watchEpisode, qualityUsing } = props;
  const [epChosenDetails] = watchEpisode.sources.filter(
    (ep) => qualityUsing === ep.quality
  );
  // console.log(random);
  const [url, setUrl] = useState(epChosenDetails.url);
  // console.log(onReady);

  React.useEffect(() => {
    const [epChosenDetails] = watchEpisode.sources.filter(
      (ep) => qualityUsing === ep.quality
    );
    setUrl(epChosenDetails.url);
    console.log(url);
  }, [qualityUsing, watchEpisode, url]);

  React.useEffect(() => {
    // Initializing video.js player
    if (!playerReference.current) {
      const videoElement = videoReference.current;
      if (!videoElement) return;
      const player = (playerReference.current = videojs(
        videoElement,
        {
          preload: true,
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          stabilityThreshold: 2,
          autoResumeDuration: 5,
          sources: [
            {
              src: url,
              type: 'application/x-mpegURL',
            },
          ],
        },
        () => {
          videojs.log('Video player is ready');
          onReady && onReady(player);
        }
      ));
    }

    // console.log(playerReference);
    // return () => player.dispose();
    // return () => {
    //   if (playerReference.current) {
    //     playerReference.current.dispose();
    //     playerReference.current = null;
    //   }
    // };
  }, [videoReference, onReady, url]);

  // Destroy video.js player on component unmount
  React.useEffect(() => {
    const player = playerReference.current;
    console.log(playerReference.current);
    return () => {
      if (player) {
        player.dispose();
        playerReference.current = null;
      }
    };
  }, [playerReference]);
  // wrap player with data-vjs-player` attribute
  // so no additional wrapper are created in the DOM
  return (
    <div data-vjs-player>
      <video
        ref={videoReference}
        className='video-js vjs-big-playcentered vjs-theme-forest'
      />
    </div>
  );
};

export default VideoApp;
