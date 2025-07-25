import React from 'react'
import bigVideo from '../assets/bigvideo.mp4';

const videocomponent = () => {
  return (
    <div>
      <video src={bigVideo} autoPlay muted loop></video>
    </div>
  )
}

export default videocomponent