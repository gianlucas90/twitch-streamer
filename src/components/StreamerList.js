import './StreamerList.css';
import React from 'react';
import StreamerItem from './StreamerItem';

const StreamerList = ({ list }) => {
  console.log(list);
  const channels = list.map((channel) => {
    return (
      <StreamerItem
        key={channel.id}
        name={channel.display_name}
        description={channel.description}
        img={channel.profile_image_url}
        url={channel.login}
      />
    );
  });

  return <div className="streamer-list">{channels}</div>;
};

export default StreamerList;
