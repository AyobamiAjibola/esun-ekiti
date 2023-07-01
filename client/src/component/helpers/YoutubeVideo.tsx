import React from 'react';

interface Props {
    videoLink: string;
    title: any,
    height: any,
    width: any
}

const YouTubeVideo = ({videoLink, title, width, height}: Props) => {

  return (
    <div>
      <iframe
        width={width}
        height={height}
        src={videoLink ? videoLink : ''}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
