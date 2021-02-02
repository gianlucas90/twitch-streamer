import './StreamerItem.css';
import React from 'react';

const StreamerItem = ({ name, description, img, url }) => {
  return (
    <a className="streamer-item" href={`https://www.twitch.tv/${url}`}>
      <div className="wrapper">
        <div className="img-container">
          <img className="img" src={img} alt={`img-${name}`} />
        </div>
        <div className="info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </a>
  );
};

export default StreamerItem;
