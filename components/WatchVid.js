import styles from '../styles/WatchVid.module.css';
import React, { useEffect, useState } from 'react';
import VideoApp from './VideoApp';

export default function WatchVid({ watchEpisode, qualityUsing }) {
  const playerReference = React.useRef(null);
  const playerReady = (player) => {
    playerReference.current = player;

    // handling video player
    player.on('waiting', () => {
      console.log('Video Player is waiting');
    });

    player.on('dispose', () => {
      console.log('Video player will dispose');
    });
  };

  return (
    <div className={styles.watchVid}>
      <VideoApp
        // options={videoJsOptions}
        watchEpisode={watchEpisode}
        qualityUsing={qualityUsing}
        onReady={playerReady}
      />
    </div>
  );
}

//   const player = videojs(playerRef.current, {
//     preload: true,
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     stabilityThreshold: 2,
//     autoResumeDuration: 5,
//     sources: [
//       {
//         src: url,
//         type: 'application/x-mpegURL',
//       },
//     ],
//   });
//   return () => {
//     player.dispose();
//   };
// }, [url]);
