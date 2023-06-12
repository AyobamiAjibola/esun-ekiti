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
        src={`https://www.youtube.com/embed/${videoLink}`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
