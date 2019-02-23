import React from 'react';

const Thumbnail = (props) => {

  const thumbStyle = {
    height: '32px',
    width: '32px'
  }

  return (
    <div>
      <img style={thumbStyle} src={props.adventures.length ? props.adventures[Math.floor(props.adventures.length * Math.random())].image_URL : null}></img>
    </div>
  )
}

export default Thumbnail;

//Math.floor(props.images.length * Math.random())