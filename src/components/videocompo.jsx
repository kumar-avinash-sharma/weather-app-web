import React from 'react'
import bigVideo from '../assets/bigvideo.mp4';

const videocompo = () => {
  return (
    <div>
      <video src={bigVideo} autoPlay muted loop></video>
    </div>
  )
}

export default videocompo